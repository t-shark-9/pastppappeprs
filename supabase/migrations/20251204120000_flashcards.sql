-- Create notes table (migrate from localStorage)
CREATE TABLE public.notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Untitled',
  content JSONB, -- BlockNote blocks as JSON
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flashcard_decks table
CREATE TABLE public.flashcard_decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id UUID REFERENCES public.notes(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create flashcards table with SM-2 SRS fields
CREATE TABLE public.flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL, -- question/term
  back TEXT NOT NULL, -- answer/definition
  source_block_id TEXT, -- BlockNote block ID for linking back to notes
  -- SM-2 algorithm fields
  interval INTEGER DEFAULT 1, -- days until next review
  repetitions INTEGER DEFAULT 0, -- number of successful reviews
  ease_factor NUMERIC(4,2) DEFAULT 2.5, -- difficulty multiplier
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_review_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create review_logs for analytics and history
CREATE TABLE public.flashcard_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flashcard_id UUID NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quality INTEGER NOT NULL CHECK (quality >= 0 AND quality <= 5), -- SM-2 quality rating (0-5)
  reviewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notes
CREATE POLICY "Users can view own notes" ON public.notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes" ON public.notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes" ON public.notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes" ON public.notes
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for flashcard_decks
CREATE POLICY "Users can view own decks" ON public.flashcard_decks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own decks" ON public.flashcard_decks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own decks" ON public.flashcard_decks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own decks" ON public.flashcard_decks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for flashcards (via deck ownership)
CREATE POLICY "Users can view own flashcards" ON public.flashcards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks 
      WHERE flashcard_decks.id = flashcards.deck_id 
      AND flashcard_decks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create flashcards in own decks" ON public.flashcards
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks 
      WHERE flashcard_decks.id = deck_id 
      AND flashcard_decks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own flashcards" ON public.flashcards
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks 
      WHERE flashcard_decks.id = flashcards.deck_id 
      AND flashcard_decks.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own flashcards" ON public.flashcards
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.flashcard_decks 
      WHERE flashcard_decks.id = flashcards.deck_id 
      AND flashcard_decks.user_id = auth.uid()
    )
  );

-- RLS Policies for flashcard_reviews
CREATE POLICY "Users can view own reviews" ON public.flashcard_reviews
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reviews" ON public.flashcard_reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_notes_user_id ON public.notes(user_id);
CREATE INDEX idx_flashcard_decks_user_id ON public.flashcard_decks(user_id);
CREATE INDEX idx_flashcard_decks_note_id ON public.flashcard_decks(note_id);
CREATE INDEX idx_flashcards_deck_id ON public.flashcards(deck_id);
CREATE INDEX idx_flashcards_next_review ON public.flashcards(next_review_date);
CREATE INDEX idx_flashcard_reviews_flashcard_id ON public.flashcard_reviews(flashcard_id);
