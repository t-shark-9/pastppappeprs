-- Create table for draft comments (block-level commenting like MS Word/Google Docs)
CREATE TABLE public.draft_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  draft_id UUID NOT NULL REFERENCES public.drafts(id) ON DELETE CASCADE,
  block_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  quoted_text TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  parent_id UUID REFERENCES public.draft_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.draft_comments ENABLE ROW LEVEL SECURITY;

-- Create policies - users can manage comments on drafts they own or collaborate on
CREATE POLICY "Users can view comments on their drafts"
  ON public.draft_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM drafts d
      JOIN assignments a ON a.id = d.assignment_id
      WHERE d.id = draft_comments.draft_id 
      AND a.user_id = auth.uid()
    )
  );

CREATE POLICY "Collaborators can view draft comments"
  ON public.draft_comments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM document_collaborators dc
      WHERE dc.document_type = 'draft'
      AND dc.document_id = draft_comments.draft_id
      AND dc.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create comments on their drafts"
  ON public.draft_comments
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND (
      EXISTS (
        SELECT 1 FROM drafts d
        JOIN assignments a ON a.id = d.assignment_id
        WHERE d.id = draft_comments.draft_id 
        AND a.user_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM document_collaborators dc
        WHERE dc.document_type = 'draft'
        AND dc.document_id = draft_comments.draft_id
        AND dc.user_id = auth.uid()
        AND dc.role IN ('owner', 'editor')
      )
    )
  );

CREATE POLICY "Users can update their own comments"
  ON public.draft_comments
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments or draft owners can delete any"
  ON public.draft_comments
  FOR DELETE
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM drafts d
      JOIN assignments a ON a.id = d.assignment_id
      WHERE d.id = draft_comments.draft_id 
      AND a.user_id = auth.uid()
    )
  );

-- Create index for faster lookups
CREATE INDEX idx_draft_comments_draft_id ON public.draft_comments(draft_id);
CREATE INDEX idx_draft_comments_block_id ON public.draft_comments(draft_id, block_id);

-- Enable realtime for comments
ALTER PUBLICATION supabase_realtime ADD TABLE public.draft_comments;