-- Add new columns to drafts table for structured sections
ALTER TABLE public.drafts 
ADD COLUMN IF NOT EXISTS title_page text,
ADD COLUMN IF NOT EXISTS contents_page text,
ADD COLUMN IF NOT EXISTS bibliography text;

-- Add comment to explain the structure
COMMENT ON COLUMN public.drafts.title_page IS 'Generated title page content including title, research question, subject, and word count';
COMMENT ON COLUMN public.drafts.contents_page IS 'Generated table of contents with section headings and page numbers';
COMMENT ON COLUMN public.drafts.bibliography IS 'Generated bibliography/references section with properly formatted citations';