-- Add ghost_session_id column to assignments table for anonymous users
ALTER TABLE public.assignments 
  ALTER COLUMN user_id DROP NOT NULL,
  ADD COLUMN ghost_session_id TEXT;

-- Create index for faster lookups
CREATE INDEX idx_assignments_ghost_session_id ON public.assignments(ghost_session_id) WHERE ghost_session_id IS NOT NULL;

-- Add RLS policy for ghost sessions (anonymous access via session ID)
CREATE POLICY "Anonymous users can view their ghost assignments" 
  ON public.assignments 
  FOR SELECT 
  USING (
    ghost_session_id IS NOT NULL 
    AND ghost_session_id = current_setting('app.ghost_session_id', true)
  );

CREATE POLICY "Anonymous users can create ghost assignments" 
  ON public.assignments 
  FOR INSERT 
  WITH CHECK (
    ghost_session_id IS NOT NULL 
    AND user_id IS NULL
  );

CREATE POLICY "Anonymous users can update their ghost assignments" 
  ON public.assignments 
  FOR UPDATE 
  USING (
    ghost_session_id IS NOT NULL 
    AND ghost_session_id = current_setting('app.ghost_session_id', true)
  );

CREATE POLICY "Anonymous users can delete their ghost assignments" 
  ON public.assignments 
  FOR DELETE 
  USING (
    ghost_session_id IS NOT NULL 
    AND ghost_session_id = current_setting('app.ghost_session_id', true)
  );

-- Similar for plans table
ALTER TABLE public.plans DROP CONSTRAINT IF EXISTS plans_assignment_id_fkey;
ALTER TABLE public.plans 
  ADD CONSTRAINT plans_assignment_id_fkey 
  FOREIGN KEY (assignment_id) 
  REFERENCES public.assignments(id) 
  ON DELETE CASCADE;

-- Similar for outlines table  
ALTER TABLE public.outlines DROP CONSTRAINT IF EXISTS outlines_assignment_id_fkey;
ALTER TABLE public.outlines 
  ADD CONSTRAINT outlines_assignment_id_fkey 
  FOREIGN KEY (assignment_id) 
  REFERENCES public.assignments(id) 
  ON DELETE CASCADE;

-- Similar for drafts table
ALTER TABLE public.drafts DROP CONSTRAINT IF EXISTS drafts_assignment_id_fkey;
ALTER TABLE public.drafts 
  ADD CONSTRAINT drafts_assignment_id_fkey 
  FOREIGN KEY (assignment_id) 
  REFERENCES public.assignments(id) 
  ON DELETE CASCADE;

-- Add policies for related tables to work with ghost assignments
CREATE POLICY "Anonymous users can manage plans for ghost assignments" 
  ON public.plans 
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments 
      WHERE assignments.id = plans.assignment_id 
      AND assignments.ghost_session_id IS NOT NULL
      AND assignments.ghost_session_id = current_setting('app.ghost_session_id', true)
    )
  );

CREATE POLICY "Anonymous users can manage outlines for ghost assignments" 
  ON public.outlines 
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments 
      WHERE assignments.id = outlines.assignment_id 
      AND assignments.ghost_session_id IS NOT NULL
      AND assignments.ghost_session_id = current_setting('app.ghost_session_id', true)
    )
  );

CREATE POLICY "Anonymous users can manage drafts for ghost assignments" 
  ON public.drafts 
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments 
      WHERE assignments.id = drafts.assignment_id 
      AND assignments.ghost_session_id IS NOT NULL
      AND assignments.ghost_session_id = current_setting('app.ghost_session_id', true)
    )
  );
