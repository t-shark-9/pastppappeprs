-- Create blogs table for dynamically generated blog posts
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'IB Study Tips',
  keywords TEXT[] DEFAULT '{}',
  author TEXT DEFAULT 'TooEssay Team',
  featured_image TEXT,
  source_url TEXT, -- Original inspiration URL (for reference, not copying)
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast slug lookups
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_status_idx ON public.blogs(status);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON public.blogs(published_at DESC);

-- Enable RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blogs
CREATE POLICY "Anyone can view published blogs" ON public.blogs
  FOR SELECT USING (status = 'published');

-- Policy: Only admins can insert/update/delete
CREATE POLICY "Admins can manage blogs" ON public.blogs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE users.id = auth.uid() 
      AND users.is_admin = true
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER blogs_updated_at_trigger
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_blogs_updated_at();
