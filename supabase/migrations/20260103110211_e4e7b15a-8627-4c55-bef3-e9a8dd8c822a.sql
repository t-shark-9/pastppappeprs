-- Fix note creation: notes page writes a `subject` field but the table currently lacks it
ALTER TABLE public.notes
ADD COLUMN IF NOT EXISTS subject TEXT NOT NULL DEFAULT 'other';

CREATE INDEX IF NOT EXISTS idx_notes_user_subject
ON public.notes (user_id, subject);