-- Collaboration tables for real-time document editing

-- Table for document collaborators (for drafts and notes)
CREATE TABLE public.document_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL CHECK (document_type IN ('draft', 'note')),
  document_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('owner', 'editor', 'viewer')),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invited_email TEXT, -- For invites before user exists
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(document_type, document_id, user_id)
);

-- Table to track Yjs document state for syncing
CREATE TABLE public.yjs_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_type TEXT NOT NULL CHECK (document_type IN ('draft', 'note')),
  document_id UUID NOT NULL,
  state BYTEA, -- Yjs document state vector
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(document_type, document_id)
);

-- Table for Yjs updates (for syncing)
CREATE TABLE public.yjs_updates (
  id BIGSERIAL PRIMARY KEY,
  document_type TEXT NOT NULL,
  document_id UUID NOT NULL,
  update_data BYTEA NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yjs_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.yjs_updates ENABLE ROW LEVEL SECURITY;

-- Function to check if user can access a document
CREATE OR REPLACE FUNCTION public.can_access_document(
  p_document_type TEXT,
  p_document_id UUID,
  p_user_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is owner of the document
  IF p_document_type = 'draft' THEN
    IF EXISTS (
      SELECT 1 FROM public.drafts d
      JOIN public.assignments a ON d.assignment_id = a.id
      WHERE d.id = p_document_id AND a.user_id = p_user_id
    ) THEN
      RETURN TRUE;
    END IF;
  ELSIF p_document_type = 'note' THEN
    IF EXISTS (
      SELECT 1 FROM public.notes
      WHERE id = p_document_id AND user_id = p_user_id
    ) THEN
      RETURN TRUE;
    END IF;
  END IF;
  
  -- Check if user is a collaborator
  RETURN EXISTS (
    SELECT 1 FROM public.document_collaborators
    WHERE document_type = p_document_type
    AND document_id = p_document_id
    AND user_id = p_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can edit a document
CREATE OR REPLACE FUNCTION public.can_edit_document(
  p_document_type TEXT,
  p_document_id UUID,
  p_user_id UUID
) RETURNS BOOLEAN AS $$
BEGIN
  -- Check if user is owner of the document
  IF p_document_type = 'draft' THEN
    IF EXISTS (
      SELECT 1 FROM public.drafts d
      JOIN public.assignments a ON d.assignment_id = a.id
      WHERE d.id = p_document_id AND a.user_id = p_user_id
    ) THEN
      RETURN TRUE;
    END IF;
  ELSIF p_document_type = 'note' THEN
    IF EXISTS (
      SELECT 1 FROM public.notes
      WHERE id = p_document_id AND user_id = p_user_id
    ) THEN
      RETURN TRUE;
    END IF;
  END IF;
  
  -- Check if user is editor or owner collaborator
  RETURN EXISTS (
    SELECT 1 FROM public.document_collaborators
    WHERE document_type = p_document_type
    AND document_id = p_document_id
    AND user_id = p_user_id
    AND role IN ('owner', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policies for document_collaborators
CREATE POLICY "Users can view collaborators of their documents" ON public.document_collaborators
  FOR SELECT USING (
    public.can_access_document(document_type, document_id, auth.uid())
  );

CREATE POLICY "Document owners can add collaborators" ON public.document_collaborators
  FOR INSERT WITH CHECK (
    -- Only owners can add collaborators
    (document_type = 'draft' AND EXISTS (
      SELECT 1 FROM public.drafts d
      JOIN public.assignments a ON d.assignment_id = a.id
      WHERE d.id = document_id AND a.user_id = auth.uid()
    ))
    OR
    (document_type = 'note' AND EXISTS (
      SELECT 1 FROM public.notes
      WHERE id = document_id AND user_id = auth.uid()
    ))
  );

CREATE POLICY "Document owners can update collaborators" ON public.document_collaborators
  FOR UPDATE USING (
    (document_type = 'draft' AND EXISTS (
      SELECT 1 FROM public.drafts d
      JOIN public.assignments a ON d.assignment_id = a.id
      WHERE d.id = document_id AND a.user_id = auth.uid()
    ))
    OR
    (document_type = 'note' AND EXISTS (
      SELECT 1 FROM public.notes
      WHERE id = document_id AND user_id = auth.uid()
    ))
  );

CREATE POLICY "Document owners can delete collaborators" ON public.document_collaborators
  FOR DELETE USING (
    (document_type = 'draft' AND EXISTS (
      SELECT 1 FROM public.drafts d
      JOIN public.assignments a ON d.assignment_id = a.id
      WHERE d.id = document_id AND a.user_id = auth.uid()
    ))
    OR
    (document_type = 'note' AND EXISTS (
      SELECT 1 FROM public.notes
      WHERE id = document_id AND user_id = auth.uid()
    ))
  );

-- RLS Policies for yjs_documents
CREATE POLICY "Users can view Yjs docs they have access to" ON public.yjs_documents
  FOR SELECT USING (
    public.can_access_document(document_type, document_id, auth.uid())
  );

CREATE POLICY "Editors can insert Yjs docs" ON public.yjs_documents
  FOR INSERT WITH CHECK (
    public.can_edit_document(document_type, document_id, auth.uid())
  );

CREATE POLICY "Editors can update Yjs docs" ON public.yjs_documents
  FOR UPDATE USING (
    public.can_edit_document(document_type, document_id, auth.uid())
  );

-- RLS Policies for yjs_updates
CREATE POLICY "Users can view Yjs updates they have access to" ON public.yjs_updates
  FOR SELECT USING (
    public.can_access_document(document_type, document_id, auth.uid())
  );

CREATE POLICY "Editors can insert Yjs updates" ON public.yjs_updates
  FOR INSERT WITH CHECK (
    public.can_edit_document(document_type, document_id, auth.uid())
  );

-- Update drafts RLS to allow collaborator access
DROP POLICY IF EXISTS "Users can view own drafts" ON public.drafts;
CREATE POLICY "Users can view drafts they have access to" ON public.drafts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.assignments
      WHERE assignments.id = drafts.assignment_id AND assignments.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.document_collaborators
      WHERE document_type = 'draft' AND document_id = drafts.id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own drafts" ON public.drafts;
CREATE POLICY "Users can update drafts they can edit" ON public.drafts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.assignments
      WHERE assignments.id = drafts.assignment_id AND assignments.user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.document_collaborators
      WHERE document_type = 'draft' AND document_id = drafts.id 
      AND user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- Update notes RLS to allow collaborator access
DROP POLICY IF EXISTS "Users can view own notes" ON public.notes;
CREATE POLICY "Users can view notes they have access to" ON public.notes
  FOR SELECT USING (
    user_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM public.document_collaborators
      WHERE document_type = 'note' AND document_id = notes.id AND user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own notes" ON public.notes;
CREATE POLICY "Users can update notes they can edit" ON public.notes
  FOR UPDATE USING (
    user_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM public.document_collaborators
      WHERE document_type = 'note' AND document_id = notes.id 
      AND user_id = auth.uid() AND role IN ('owner', 'editor')
    )
  );

-- Indexes for performance
CREATE INDEX idx_document_collaborators_document ON public.document_collaborators(document_type, document_id);
CREATE INDEX idx_document_collaborators_user ON public.document_collaborators(user_id);
CREATE INDEX idx_yjs_documents_document ON public.yjs_documents(document_type, document_id);
CREATE INDEX idx_yjs_updates_document ON public.yjs_updates(document_type, document_id);
CREATE INDEX idx_yjs_updates_created ON public.yjs_updates(created_at);

-- Enable realtime for collaboration
ALTER PUBLICATION supabase_realtime ADD TABLE public.yjs_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.document_collaborators;
