-- Drop existing problematic policies
DROP POLICY IF EXISTS "Owners can manage collaborators" ON public.document_collaborators;
DROP POLICY IF EXISTS "Users can insert themselves as owner" ON public.document_collaborators;
DROP POLICY IF EXISTS "Users can view collaborations they're part of" ON public.document_collaborators;

-- Create a security definer function to check document ownership without recursion
CREATE OR REPLACE FUNCTION public.is_document_owner(
  _document_type text,
  _document_id uuid,
  _user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.document_collaborators
    WHERE document_type = _document_type
      AND document_id = _document_id
      AND user_id = _user_id
      AND role = 'owner'
  )
$$;

-- Create a security definer function to check if user is a collaborator
CREATE OR REPLACE FUNCTION public.is_document_collaborator(
  _document_type text,
  _document_id uuid,
  _user_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.document_collaborators
    WHERE document_type = _document_type
      AND document_id = _document_id
      AND (user_id = _user_id OR invited_by = _user_id)
  )
$$;

-- New RLS policies using the security definer functions

-- SELECT: Users can view collaborators for documents they're part of
CREATE POLICY "Users can view document collaborators"
ON public.document_collaborators
FOR SELECT
TO authenticated
USING (
  public.is_document_collaborator(document_type, document_id, auth.uid())
);

-- INSERT: Owners can add collaborators, or users can insert themselves as owner
CREATE POLICY "Users can add collaborators"
ON public.document_collaborators
FOR INSERT
TO authenticated
WITH CHECK (
  -- User is inserting themselves as owner
  (auth.uid() = user_id AND role = 'owner')
  OR
  -- User is the owner adding someone else
  public.is_document_owner(document_type, document_id, auth.uid())
);

-- UPDATE: Only owners can update collaborators
CREATE POLICY "Owners can update collaborators"
ON public.document_collaborators
FOR UPDATE
TO authenticated
USING (
  public.is_document_owner(document_type, document_id, auth.uid())
);

-- DELETE: Only owners can delete collaborators
CREATE POLICY "Owners can delete collaborators"
ON public.document_collaborators
FOR DELETE
TO authenticated
USING (
  public.is_document_owner(document_type, document_id, auth.uid())
);