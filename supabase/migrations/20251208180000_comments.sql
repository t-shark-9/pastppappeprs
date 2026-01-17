-- Create comments table for block-level comments on drafts
CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  draft_id UUID NOT NULL REFERENCES public.drafts(id) ON DELETE CASCADE,
  block_id TEXT NOT NULL, -- BlockNote block ID
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES public.profiles(id),
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE, -- For replies
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX idx_comments_draft_id ON public.comments(draft_id);
CREATE INDEX idx_comments_block_id ON public.comments(block_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);
CREATE INDEX idx_comments_resolved ON public.comments(resolved) WHERE resolved = false;

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view comments on drafts they own or collaborate on
CREATE POLICY "Users can view comments on their drafts"
  ON public.comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.drafts d 
      WHERE d.id = comments.draft_id 
      AND d.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.draft_collaborators dc 
      WHERE dc.draft_id = comments.draft_id 
      AND dc.user_id = auth.uid()
    )
  );

-- Users can create comments on drafts they own or collaborate on
CREATE POLICY "Users can create comments on accessible drafts"
  ON public.comments FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND (
      EXISTS (
        SELECT 1 FROM public.drafts d 
        WHERE d.id = draft_id 
        AND d.user_id = auth.uid()
      )
      OR
      EXISTS (
        SELECT 1 FROM public.draft_collaborators dc 
        WHERE dc.draft_id = draft_id 
        AND dc.user_id = auth.uid()
      )
    )
  );

-- Users can update their own comments
CREATE POLICY "Users can update their own comments"
  ON public.comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Draft owners can resolve any comment, comment authors can resolve their own
CREATE POLICY "Draft owners and comment authors can resolve"
  ON public.comments FOR UPDATE
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.drafts d 
      WHERE d.id = comments.draft_id 
      AND d.user_id = auth.uid()
    )
  );

-- Users can delete their own comments
CREATE POLICY "Users can delete their own comments"
  ON public.comments FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
