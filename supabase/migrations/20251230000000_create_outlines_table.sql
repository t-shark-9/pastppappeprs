-- Create outlines table for storing assignment structure/sections
CREATE TABLE IF NOT EXISTS public.outlines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  sections JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(assignment_id)
);

-- Enable RLS
ALTER TABLE public.outlines ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own outlines"
  ON public.outlines
  FOR SELECT
  USING (
    assignment_id IN (
      SELECT id FROM public.assignments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own outlines"
  ON public.outlines
  FOR INSERT
  WITH CHECK (
    assignment_id IN (
      SELECT id FROM public.assignments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own outlines"
  ON public.outlines
  FOR UPDATE
  USING (
    assignment_id IN (
      SELECT id FROM public.assignments WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own outlines"
  ON public.outlines
  FOR DELETE
  USING (
    assignment_id IN (
      SELECT id FROM public.assignments WHERE user_id = auth.uid()
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_outlines_updated_at
  BEFORE UPDATE ON public.outlines
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
