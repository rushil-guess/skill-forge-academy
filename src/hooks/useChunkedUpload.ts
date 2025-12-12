import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface UseChunkedUploadReturn {
  uploadVideo: (file: File, courseId: string, videoTitle: string) => Promise<string | null>;
  progress: UploadProgress;
  isUploading: boolean;
  error: string | null;
  cancelUpload: () => void;
}

export const useChunkedUpload = (): UseChunkedUploadReturn => {
  const [progress, setProgress] = useState<UploadProgress>({ loaded: 0, total: 0, percentage: 0 });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const cancelUpload = useCallback(() => {
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsUploading(false);
    setProgress({ loaded: 0, total: 0, percentage: 0 });
  }, [abortController]);

  const uploadVideo = useCallback(async (file: File, courseId: string, videoTitle: string): Promise<string | null> => {
    setIsUploading(true);
    setError(null);
    setProgress({ loaded: 0, total: file.size, percentage: 0 });

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const fileExtension = file.name.split('.').pop();
      const fileName = `${user.id}/${courseId}/${Date.now()}-${videoTitle.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExtension}`;

      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      let uploadedBytes = 0;

      // For files smaller than chunk size, upload directly
      if (file.size <= CHUNK_SIZE) {
        const { error: uploadError } = await supabase.storage
          .from('course-videos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        setProgress({ loaded: file.size, total: file.size, percentage: 100 });
      } else {
        // For larger files, simulate chunked upload with progress
        // Note: Supabase Storage doesn't support true resumable uploads yet,
        // so we upload the whole file but track progress in chunks
        const uploadPromise = new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              uploadedBytes = event.loaded;
              const percentage = Math.round((event.loaded / event.total) * 100);
              setProgress({
                loaded: event.loaded,
                total: event.total,
                percentage,
              });
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          });

          xhr.addEventListener('error', () => reject(new Error('Upload failed')));
          xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));

          controller.signal.addEventListener('abort', () => xhr.abort());

          // Get the upload URL
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
              reject(new Error('No session'));
              return;
            }

            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const uploadUrl = `${supabaseUrl}/storage/v1/object/course-videos/${fileName}`;

            xhr.open('POST', uploadUrl);
            xhr.setRequestHeader('Authorization', `Bearer ${session.access_token}`);
            xhr.setRequestHeader('x-upsert', 'false');
            xhr.send(file);
          });
        });

        await uploadPromise;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('course-videos')
        .getPublicUrl(fileName);

      setIsUploading(false);
      return urlData.publicUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      setIsUploading(false);
      return null;
    }
  }, []);

  return {
    uploadVideo,
    progress,
    isUploading,
    error,
    cancelUpload,
  };
};
