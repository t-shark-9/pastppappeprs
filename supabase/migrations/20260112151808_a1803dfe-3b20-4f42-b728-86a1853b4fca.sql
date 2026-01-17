-- Create storage bucket for grading guides
INSERT INTO storage.buckets (id, name, public)
VALUES ('grading-guides', 'grading-guides', true)
ON CONFLICT (id) DO NOTHING;

-- Create table to store guide metadata
CREATE TABLE IF NOT EXISTS public.subject_guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  guide_name TEXT NOT NULL,
  year INTEGER,
  file_url TEXT,
  guide_text_content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for subject lookup
CREATE INDEX IF NOT EXISTS idx_subject_guides_subject ON public.subject_guides(subject);

-- Enable RLS
ALTER TABLE public.subject_guides ENABLE ROW LEVEL SECURITY;

-- Allow public read access (these are IB guides, not user-specific)
CREATE POLICY "Subject guides are publicly readable"
ON public.subject_guides
FOR SELECT
USING (true);

-- Only admins can modify
CREATE POLICY "Only admins can modify subject guides"
ON public.subject_guides
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Storage policies for grading-guides bucket
CREATE POLICY "Grading guides are publicly readable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'grading-guides');

CREATE POLICY "Only admins can upload grading guides"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'grading-guides' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);