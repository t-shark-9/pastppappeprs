-- Add subject column to flashcard_decks table
ALTER TABLE public.flashcard_decks 
ADD COLUMN IF NOT EXISTS subject TEXT DEFAULT 'other';

-- Add note_id column to link decks to notes (optional)
ALTER TABLE public.flashcard_decks 
ADD COLUMN IF NOT EXISTS note_id UUID REFERENCES public.notes(id) ON DELETE SET NULL;

-- Create index for faster subject queries
CREATE INDEX IF NOT EXISTS idx_flashcard_decks_subject ON public.flashcard_decks(subject);
CREATE INDEX IF NOT EXISTS idx_flashcard_decks_note_id ON public.flashcard_decks(note_id);
