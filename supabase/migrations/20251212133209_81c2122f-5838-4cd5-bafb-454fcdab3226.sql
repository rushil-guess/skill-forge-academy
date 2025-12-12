-- Create storage bucket for course videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('course-videos', 'course-videos', false, 524288000, ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo']);

-- Create storage policies for instructors to upload videos
CREATE POLICY "Instructors can upload videos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'course-videos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Instructors can update their videos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'course-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Instructors can delete their videos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'course-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Authenticated users can view videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'course-videos' AND auth.role() = 'authenticated');

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  instructor_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course videos table
CREATE TABLE public.course_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  is_preview BOOLEAN DEFAULT false,
  upload_status TEXT DEFAULT 'pending' CHECK (upload_status IN ('pending', 'uploading', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_videos ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view published courses"
ON public.courses
FOR SELECT
USING (is_published = true);

CREATE POLICY "Instructors can view their own courses"
ON public.courses
FOR SELECT
USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can create courses"
ON public.courses
FOR INSERT
WITH CHECK (auth.uid() = instructor_id);

CREATE POLICY "Instructors can update their own courses"
ON public.courses
FOR UPDATE
USING (auth.uid() = instructor_id);

CREATE POLICY "Instructors can delete their own courses"
ON public.courses
FOR DELETE
USING (auth.uid() = instructor_id);

-- Course videos policies
CREATE POLICY "Anyone can view videos of published courses"
ON public.course_videos
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.courses 
  WHERE courses.id = course_videos.course_id 
  AND (courses.is_published = true OR courses.instructor_id = auth.uid())
));

CREATE POLICY "Instructors can manage their course videos"
ON public.course_videos
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.courses 
  WHERE courses.id = course_videos.course_id 
  AND courses.instructor_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_videos_updated_at
BEFORE UPDATE ON public.course_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();