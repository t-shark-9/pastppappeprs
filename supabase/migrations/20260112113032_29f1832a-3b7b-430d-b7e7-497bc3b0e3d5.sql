-- Create past_papers table for storing paper metadata
CREATE TABLE public.past_papers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  year INTEGER NOT NULL,
  level TEXT, -- HL, SL, HLSL
  timezone TEXT, -- TZ0, TZ1, TZ2
  session TEXT, -- May, November
  paper_number TEXT, -- 1, 2, 3
  is_markscheme BOOLEAN DEFAULT false,
  is_resource BOOLEAN DEFAULT false,
  doc_type INTEGER DEFAULT 0, -- 0: paper, 1: markscheme, 3: resource
  file_url TEXT, -- URL to the actual PDF in storage
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for common queries
CREATE INDEX idx_past_papers_subject ON public.past_papers(subject);
CREATE INDEX idx_past_papers_year ON public.past_papers(year);
CREATE INDEX idx_past_papers_level ON public.past_papers(level);
CREATE INDEX idx_past_papers_session ON public.past_papers(session);
CREATE INDEX idx_past_papers_subject_year ON public.past_papers(subject, year);

-- Enable RLS (public read access for past papers)
ALTER TABLE public.past_papers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to past papers
CREATE POLICY "Past papers are publicly readable" 
ON public.past_papers 
FOR SELECT 
USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage past papers" 
ON public.past_papers 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create storage bucket for past paper PDFs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('past-papers', 'past-papers', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to past paper files
CREATE POLICY "Past paper files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'past-papers');

-- Allow admins to upload past paper files
CREATE POLICY "Admins can upload past paper files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'past-papers' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);