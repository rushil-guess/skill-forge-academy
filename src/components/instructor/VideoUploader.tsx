import { useState, useRef } from 'react';
import { Upload, X, Video, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useChunkedUpload } from '@/hooks/useChunkedUpload';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VideoUploaderProps {
  courseId: string;
  onUploadComplete?: (videoData: { url: string; title: string; description: string }) => void;
}

const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export const VideoUploader = ({ courseId, onUploadComplete }: VideoUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { uploadVideo, progress, isUploading, error, cancelUpload } = useChunkedUpload();

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      return 'Invalid file type. Please upload MP4, WebM, MOV, or AVI files.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 500MB.';
    }
    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast({
        title: 'Invalid File',
        description: validationError,
        variant: 'destructive',
      });
      return;
    }
    setSelectedFile(file);
    if (!videoTitle) {
      setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !videoTitle.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a video title.',
        variant: 'destructive',
      });
      return;
    }

    const videoUrl = await uploadVideo(selectedFile, courseId, videoTitle);

    if (videoUrl) {
      // Save video metadata to database
      const { error: dbError } = await supabase.from('course_videos').insert({
        course_id: courseId,
        title: videoTitle,
        description: videoDescription,
        video_url: videoUrl,
        upload_status: 'completed',
      });

      if (dbError) {
        toast({
          title: 'Error',
          description: 'Failed to save video metadata.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Video uploaded successfully!',
      });

      onUploadComplete?.({
        url: videoUrl,
        title: videoTitle,
        description: videoDescription,
      });

      // Reset form
      setSelectedFile(null);
      setVideoTitle('');
      setVideoDescription('');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setVideoTitle('');
    setVideoDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      <div
        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_VIDEO_TYPES.join(',')}
          onChange={handleInputChange}
          className="absolute inset-0 cursor-pointer opacity-0"
          disabled={isUploading}
        />

        {selectedFile ? (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
            </div>
            {!isUploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFile();
                }}
                className="text-destructive hover:text-destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Drop your video here</p>
              <p className="text-sm text-muted-foreground">
                or click to browse (MP4, WebM, MOV, AVI up to 500MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Details */}
      {selectedFile && (
        <div className="space-y-4 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="videoTitle">Video Title *</Label>
            <Input
              id="videoTitle"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Enter video title"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoDescription">Description (Optional)</Label>
            <Textarea
              id="videoDescription"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              placeholder="Enter video description"
              rows={3}
              disabled={isUploading}
            />
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-3 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm text-muted-foreground">{progress.percentage}%</span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatFileSize(progress.loaded)} / {formatFileSize(progress.total)}</span>
            <Button variant="ghost" size="sm" onClick={cancelUpload} className="h-auto p-0 text-destructive">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !isUploading && (
        <Button onClick={handleUpload} size="lg" className="w-full">
          <Upload className="mr-2 h-5 w-5" />
          Upload Video
        </Button>
      )}
    </div>
  );
};
