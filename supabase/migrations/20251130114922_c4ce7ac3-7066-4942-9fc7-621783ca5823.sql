-- Create books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  subject subject_type NOT NULL,
  description TEXT,
  isbn TEXT,
  publisher TEXT,
  year INTEGER,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view books (read-only for students)
CREATE POLICY "Anyone can view books"
ON public.books
FOR SELECT
USING (true);

-- Add updated_at trigger
CREATE TRIGGER update_books_updated_at
BEFORE UPDATE ON public.books
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on subject for faster filtering
CREATE INDEX idx_books_subject ON public.books(subject);