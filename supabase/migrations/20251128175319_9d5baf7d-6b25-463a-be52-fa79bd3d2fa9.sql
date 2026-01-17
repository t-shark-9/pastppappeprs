-- Create improvements table
CREATE TABLE public.improvements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create improvement_votes table to track individual votes
CREATE TABLE public.improvement_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  improvement_id UUID NOT NULL REFERENCES public.improvements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(improvement_id, user_id)
);

-- Enable RLS
ALTER TABLE public.improvements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.improvement_votes ENABLE ROW LEVEL SECURITY;

-- Improvements policies - anyone can read, authenticated users can insert
CREATE POLICY "Anyone can view improvements"
  ON public.improvements
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create improvements"
  ON public.improvements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Vote policies - anyone can read, authenticated users can vote
CREATE POLICY "Anyone can view votes"
  ON public.improvement_votes
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can vote"
  ON public.improvement_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own votes"
  ON public.improvement_votes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_improvements_updated_at
  BEFORE UPDATE ON public.improvements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();