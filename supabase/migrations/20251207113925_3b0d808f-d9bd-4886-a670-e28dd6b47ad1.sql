-- Add unique constraint for invitations by email
CREATE UNIQUE INDEX IF NOT EXISTS document_collaborators_invite_unique 
ON public.document_collaborators (document_type, document_id, invited_email) 
WHERE invited_email IS NOT NULL;