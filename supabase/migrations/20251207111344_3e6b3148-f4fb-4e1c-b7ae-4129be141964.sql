-- =============================================
-- PART 1: FLASHCARD TABLES
-- =============================================

-- Flashcard Decks table
CREATE TABLE public.flashcard_decks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own decks"
ON public.flashcard_decks
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_flashcard_decks_updated_at
BEFORE UPDATE ON public.flashcard_decks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Flashcards table
CREATE TABLE public.flashcards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  deck_id UUID NOT NULL REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  ease_factor NUMERIC NOT NULL DEFAULT 2.5,
  interval INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage flashcards in their decks"
ON public.flashcards
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.flashcard_decks
  WHERE flashcard_decks.id = flashcards.deck_id
  AND flashcard_decks.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.flashcard_decks
  WHERE flashcard_decks.id = flashcards.deck_id
  AND flashcard_decks.user_id = auth.uid()
));

CREATE TRIGGER update_flashcards_updated_at
BEFORE UPDATE ON public.flashcards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Flashcard Reviews table
CREATE TABLE public.flashcard_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  flashcard_id UUID NOT NULL REFERENCES public.flashcards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quality INTEGER NOT NULL CHECK (quality >= 0 AND quality <= 5),
  reviewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcard_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own reviews"
ON public.flashcard_reviews
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- =============================================
-- PART 2: NOTES TABLE
-- =============================================

CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Note',
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own notes"
ON public.notes
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_notes_updated_at
BEFORE UPDATE ON public.notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- PART 3: COLLABORATION TABLES
-- =============================================

-- Yjs Documents table (stores document state)
CREATE TABLE public.yjs_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type TEXT NOT NULL,
  document_id UUID NOT NULL,
  state TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (document_type, document_id)
);

ALTER TABLE public.yjs_documents ENABLE ROW LEVEL SECURITY;

-- Yjs Updates table (stores incremental updates)
CREATE TABLE public.yjs_updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type TEXT NOT NULL,
  document_id UUID NOT NULL,
  update_data TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.yjs_updates ENABLE ROW LEVEL SECURITY;

-- Document Collaborators table
CREATE TABLE public.document_collaborators (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_type TEXT NOT NULL,
  document_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('owner', 'editor', 'viewer')),
  invited_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  invited_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (document_type, document_id, user_id)
);

ALTER TABLE public.document_collaborators ENABLE ROW LEVEL SECURITY;

-- RLS for yjs_documents: collaborators can access
CREATE POLICY "Collaborators can view yjs documents"
ON public.yjs_documents
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.document_collaborators
  WHERE document_collaborators.document_type = yjs_documents.document_type
  AND document_collaborators.document_id = yjs_documents.document_id
  AND document_collaborators.user_id = auth.uid()
));

CREATE POLICY "Collaborators can insert yjs documents"
ON public.yjs_documents
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.document_collaborators
  WHERE document_collaborators.document_type = yjs_documents.document_type
  AND document_collaborators.document_id = yjs_documents.document_id
  AND document_collaborators.user_id = auth.uid()
  AND document_collaborators.role IN ('owner', 'editor')
));

CREATE POLICY "Collaborators can update yjs documents"
ON public.yjs_documents
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM public.document_collaborators
  WHERE document_collaborators.document_type = yjs_documents.document_type
  AND document_collaborators.document_id = yjs_documents.document_id
  AND document_collaborators.user_id = auth.uid()
  AND document_collaborators.role IN ('owner', 'editor')
));

-- RLS for yjs_updates
CREATE POLICY "Collaborators can view yjs updates"
ON public.yjs_updates
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.document_collaborators
  WHERE document_collaborators.document_type = yjs_updates.document_type
  AND document_collaborators.document_id = yjs_updates.document_id
  AND document_collaborators.user_id = auth.uid()
));

CREATE POLICY "Collaborators can insert yjs updates"
ON public.yjs_updates
FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM public.document_collaborators
  WHERE document_collaborators.document_type = yjs_updates.document_type
  AND document_collaborators.document_id = yjs_updates.document_id
  AND document_collaborators.user_id = auth.uid()
  AND document_collaborators.role IN ('owner', 'editor')
));

-- RLS for document_collaborators
CREATE POLICY "Users can view collaborations they're part of"
ON public.document_collaborators
FOR SELECT
USING (auth.uid() = user_id OR auth.uid() = invited_by);

CREATE POLICY "Owners can manage collaborators"
ON public.document_collaborators
FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.document_collaborators dc
  WHERE dc.document_type = document_collaborators.document_type
  AND dc.document_id = document_collaborators.document_id
  AND dc.user_id = auth.uid()
  AND dc.role = 'owner'
));

CREATE POLICY "Users can insert themselves as owner"
ON public.document_collaborators
FOR INSERT
WITH CHECK (auth.uid() = user_id AND role = 'owner');

-- =============================================
-- PART 4: ENABLE REALTIME
-- =============================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.yjs_documents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.yjs_updates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.document_collaborators;