# Notes Page Guide

The Notes page (`src/pages/Notes.tsx`) provides a note-taking environment with integrated flashcard generation using spaced repetition. This guide covers the architecture, flashcard system, and key implementation patterns.

## Table of Contents

1. [Overview](#overview)
2. [Page Architecture](#page-architecture)
3. [Flashcard System](#flashcard-system)
4. [Table of Contents Generation](#table-of-contents-generation)
5. [Flashcard Pattern Detection](#flashcard-pattern-detection)
6. [Spaced Repetition Algorithm](#spaced-repetition-algorithm)
7. [AI Flashcard Generation](#ai-flashcard-generation)
8. [Collaboration Integration](#collaboration-integration)
9. [Storage Patterns](#storage-patterns)

---

## Overview

The Notes page enables students to:

- Take structured notes with rich text formatting
- Automatically generate table of contents from headings
- Create flashcards using `::` notation (e.g., "Term::Definition")
- Generate AI-powered flashcards from note content
- Study with spaced repetition algorithm
- Collaborate with others in real-time
- Import/export notes

### Key Dependencies

```typescript
import { BlockNoteEditor } from "@/components/editors/BlockNoteEditor";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useAutoSave } from "@/hooks/use-auto-save";
```

---

## Page Architecture

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        Header Bar                                │
│  [Back] [Title] [Collaborators] [Share] [Import] [Export] [Save]│
├─────────────────────────────────────────────────────────────────┤
│              │                              │                    │
│   Left       │        Main Editor           │    Right Panel     │
│   Panel      │                              │                    │
│              │    ┌─────────────────────┐   │   ┌────────────┐  │
│  Table of    │    │                     │   │   │ Flashcard  │  │
│  Contents    │    │   BlockNoteEditor   │   │   │   Decks    │  │
│              │    │                     │   │   │            │  │
│  - Heading 1 │    │   Note content...   │   │   │ [Create]   │  │
│    - H2      │    │                     │   │   │ [Study]    │  │
│    - H2      │    │                     │   │   │ [AI Gen]   │  │
│              │    └─────────────────────┘   │   └────────────┘  │
│              │                              │                    │
├─────────────────────────────────────────────────────────────────┤
│                    Standing Toolbar                              │
└─────────────────────────────────────────────────────────────────┘
```

### Component Structure

```tsx
<div className="flex h-screen flex-col">
  {/* Header */}
  <header className="border-b px-4 py-2 flex items-center gap-4">
    <Button variant="ghost" onClick={() => navigate(-1)}>
      <ChevronLeft className="h-4 w-4" />
    </Button>
    <h1 className="text-lg font-semibold flex-1">Notes</h1>
    <CollaboratorAvatars activeUsers={activeUsers} />
    <ShareModal {...shareProps} />
    <ExportDropdown content={content} title="Notes" />
    <Button onClick={handleSave}>
      {saving ? <Loader2 className="animate-spin" /> : <Save />}
    </Button>
  </header>

  {/* Main Content */}
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel defaultSize={leftPanelCollapsed ? 3 : leftPanelSize}>
      {/* Table of Contents */}
    </ResizablePanel>
    
    <ResizableHandle withHandle />
    
    <ResizablePanel defaultSize={55}>
      <BlockNoteEditor {...editorProps} />
    </ResizablePanel>
    
    <ResizableHandle withHandle />
    
    <ResizablePanel defaultSize={rightPanelCollapsed ? 3 : rightPanelSize}>
      {/* Flashcard Panel */}
    </ResizablePanel>
  </ResizablePanelGroup>
</div>
```

---

## Flashcard System

### Interfaces

```typescript
interface Flashcard {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  created_at: string;
  
  // Spaced repetition fields
  interval: number;        // Days until next review
  ease_factor: number;     // Difficulty multiplier (default 2.5)
  next_review_date: string;
  review_count: number;
  last_reviewed_at?: string;
}

interface FlashcardDeck {
  id: string;
  user_id: string;
  note_id?: string;
  title: string;
  created_at: string;
  card_count?: number;
}
```

### State Management

```typescript
// Deck states
const [decks, setDecks] = useState<FlashcardDeck[]>([]);
const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

// Dialog states
const [showCreateDeckDialog, setShowCreateDeckDialog] = useState(false);
const [showAddCardDialog, setShowAddCardDialog] = useState(false);
const [newDeckTitle, setNewDeckTitle] = useState("");
const [newCardFront, setNewCardFront] = useState("");
const [newCardBack, setNewCardBack] = useState("");

// Loading states
const [generatingCards, setGeneratingCards] = useState(false);
const [convertingCards, setConvertingCards] = useState(false);
```

### Creating a Deck

```typescript
const createDeck = async () => {
  if (!newDeckTitle.trim()) return;

  try {
    // Guest user: save to localStorage
    if (!user) {
      const newDeck = {
        id: `local_deck_${Date.now()}`,
        title: newDeckTitle.trim(),
        created_at: new Date().toISOString(),
      };
      const updatedDecks = [newDeck, ...decks];
      setDecks(updatedDecks);
      localStorage.setItem('flashcard_decks', JSON.stringify(updatedDecks));
      setSelectedDeckId(newDeck.id);
      setNewDeckTitle("");
      setShowCreateDeckDialog(false);
      toast.success("Deck created!");
      return;
    }

    // Logged in user: save to Supabase
    const { data, error } = await supabase
      .from("flashcard_decks")
      .insert({
        user_id: user.id,
        title: newDeckTitle.trim(),
        note_id: noteId,
      })
      .select()
      .single();

    if (error) throw error;

    setDecks([data, ...decks]);
    setSelectedDeckId(data.id);
    setNewDeckTitle("");
    setShowCreateDeckDialog(false);
    toast.success("Deck created!");
  } catch (error) {
    toast.error("Failed to create deck");
  }
};
```

### Adding Flashcards

```typescript
const addFlashcard = async () => {
  if (!newCardFront.trim() || !newCardBack.trim() || !selectedDeckId) return;

  const newCard: Flashcard = {
    id: `card_${Date.now()}`,
    deck_id: selectedDeckId,
    front: newCardFront.trim(),
    back: newCardBack.trim(),
    created_at: new Date().toISOString(),
    interval: 1,
    ease_factor: 2.5,
    next_review_date: new Date().toISOString(),
    review_count: 0,
  };

  try {
    if (!user) {
      // Save to localStorage for guest
      const updatedCards = [newCard, ...flashcards];
      setFlashcards(updatedCards);
      localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
    } else {
      // Save to Supabase
      const { data, error } = await supabase
        .from("flashcards")
        .insert(newCard)
        .select()
        .single();

      if (error) throw error;
      setFlashcards([data, ...flashcards]);
    }

    setNewCardFront("");
    setNewCardBack("");
    setShowAddCardDialog(false);
    toast.success("Flashcard added!");
  } catch (error) {
    toast.error("Failed to add flashcard");
  }
};
```

---

## Table of Contents Generation

### Extracting Headings

```typescript
const tableOfContents = useMemo(() => {
  if (!blockNoteEditor?.document) return [];
  
  const headings: Array<{ id: string; level: number; text: string }> = [];
  
  blockNoteEditor.document.forEach((block: any, index: number) => {
    if (block.type === 'heading') {
      const level = block.props?.level || 1;
      let text = '';
      
      // Extract text from block content
      if (block.content && Array.isArray(block.content)) {
        text = block.content
          .map((item: any) => {
            if (typeof item === 'string') return item;
            if (item && typeof item === 'object' && 'text' in item) {
              return item.text;
            }
            return '';
          })
          .join('')
          .trim();
      }
      
      headings.push({
        id: block.id || `heading-${index}`,
        level,
        text: text || '(Untitled)',
      });
    }
  });
  
  return headings;
}, [blockNoteEditor?.document]);
```

### Rendering Table of Contents

```tsx
<div className="space-y-1">
  {tableOfContents.map((heading) => (
    <button
      key={heading.id}
      onClick={() => scrollToHeading(heading.id)}
      className={cn(
        "w-full text-left px-2 py-1 rounded text-sm hover:bg-muted",
        heading.level === 1 && "font-semibold",
        heading.level === 2 && "pl-4",
        heading.level === 3 && "pl-6 text-muted-foreground"
      )}
    >
      {heading.text}
    </button>
  ))}
</div>
```

### Scroll to Heading

```typescript
const scrollToHeading = (blockId: string) => {
  if (!blockNoteEditor) return;
  
  try {
    const blockElement = document.querySelector(`[data-id="${blockId}"]`);
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  } catch (error) {
    console.error("Failed to scroll to heading:", error);
  }
};
```

---

## Flashcard Pattern Detection

### The `::` Pattern

Users can create flashcards inline using the `Term::Definition` pattern:

```
Mitochondria::The powerhouse of the cell
DNA::Deoxyribonucleic acid, carries genetic information
```

### Detection Logic

```typescript
const flashcardPatterns = useMemo(() => {
  if (!blockNoteEditor?.document) return [];
  
  const patterns: Array<{ 
    blockId: string; 
    front: string; 
    back: string; 
    fullText: string;
  }> = [];
  
  const extractText = (content: any[]): string => {
    return content
      .map((item: any) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object' && 'text' in item) {
          return item.text;
        }
        return '';
      })
      .join('');
  };
  
  blockNoteEditor.document.forEach((block: any) => {
    if (block.content && Array.isArray(block.content)) {
      const text = extractText(block.content);
      // Match pattern: Front::Back
      const match = text.match(/^(.+?)::(.+)$/);
      if (match) {
        patterns.push({
          blockId: block.id,
          front: match[1].trim(),
          back: match[2].trim(),
          fullText: text,
        });
      }
    }
  });
  
  return patterns;
}, [blockNoteEditor?.document]);
```

### Converting Patterns to Flashcards

```tsx
<Button
  variant="outline"
  size="sm"
  disabled={flashcardPatterns.length === 0 || convertingCards}
  onClick={convertPatternsToFlashcards}
>
  {convertingCards ? (
    <Loader2 className="h-4 w-4 animate-spin mr-2" />
  ) : (
    <Wand2 className="h-4 w-4 mr-2" />
  )}
  Convert {flashcardPatterns.length} patterns
</Button>
```

```typescript
const convertPatternsToFlashcards = async () => {
  if (!selectedDeckId || flashcardPatterns.length === 0) return;
  
  setConvertingCards(true);
  
  try {
    const newCards = flashcardPatterns.map(pattern => ({
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      deck_id: selectedDeckId,
      front: pattern.front,
      back: pattern.back,
      created_at: new Date().toISOString(),
      interval: 1,
      ease_factor: 2.5,
      next_review_date: new Date().toISOString(),
      review_count: 0,
    }));

    if (!user) {
      const updatedCards = [...newCards, ...flashcards];
      setFlashcards(updatedCards);
      localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
    } else {
      const { data, error } = await supabase
        .from("flashcards")
        .insert(newCards)
        .select();

      if (error) throw error;
      setFlashcards([...data, ...flashcards]);
    }

    toast.success(`Created ${newCards.length} flashcards!`);
  } catch (error) {
    toast.error("Failed to convert patterns");
  } finally {
    setConvertingCards(false);
  }
};
```

---

## Spaced Repetition Algorithm

### SM-2 Algorithm Implementation

The flashcard system uses a simplified SM-2 (SuperMemo 2) algorithm:

```typescript
const updateFlashcardReview = (card: Flashcard, quality: number) => {
  // quality: 0-5 (0-2 = again, 3 = hard, 4 = good, 5 = easy)
  
  let { interval, ease_factor, review_count } = card;
  
  if (quality < 3) {
    // Failed: reset interval
    interval = 1;
  } else {
    // Passed: increase interval
    if (review_count === 0) {
      interval = 1;
    } else if (review_count === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
    
    // Adjust ease factor
    ease_factor = Math.max(
      1.3,
      ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    );
  }
  
  const next_review_date = new Date();
  next_review_date.setDate(next_review_date.getDate() + interval);
  
  return {
    ...card,
    interval,
    ease_factor,
    next_review_date: next_review_date.toISOString(),
    review_count: review_count + 1,
    last_reviewed_at: new Date().toISOString(),
  };
};
```

### Review Button States

```tsx
const ReviewButtons = ({ onReview }: { onReview: (quality: number) => void }) => (
  <div className="flex gap-2">
    <Button 
      variant="destructive" 
      size="sm"
      onClick={() => onReview(1)}
    >
      Again
    </Button>
    <Button 
      variant="secondary" 
      size="sm"
      onClick={() => onReview(3)}
    >
      Hard
    </Button>
    <Button 
      variant="default" 
      size="sm"
      onClick={() => onReview(4)}
    >
      Good
    </Button>
    <Button 
      variant="outline" 
      className="border-green-500 text-green-500"
      size="sm"
      onClick={() => onReview(5)}
    >
      Easy
    </Button>
  </div>
);
```

### Getting Due Cards

```typescript
const getDueCards = (cards: Flashcard[]): Flashcard[] => {
  const now = new Date();
  return cards.filter(card => {
    const nextReview = new Date(card.next_review_date);
    return nextReview <= now;
  }).sort((a, b) => 
    new Date(a.next_review_date).getTime() - new Date(b.next_review_date).getTime()
  );
};
```

---

## AI Flashcard Generation

### Generating from Content

```typescript
const generateFlashcardsFromContent = async () => {
  if (!selectedDeckId) {
    toast.error("Please select a deck first");
    return;
  }
  
  setGeneratingCards(true);
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-flashcards`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          content: content,
          maxCards: 10,
        }),
      }
    );

    if (!response.ok) throw new Error('Failed to generate flashcards');

    const { flashcards: generatedCards } = await response.json();
    
    // Add to deck
    const newCards = generatedCards.map((card: { front: string; back: string }) => ({
      id: `card_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      deck_id: selectedDeckId,
      front: card.front,
      back: card.back,
      created_at: new Date().toISOString(),
      interval: 1,
      ease_factor: 2.5,
      next_review_date: new Date().toISOString(),
      review_count: 0,
    }));

    if (!user) {
      const updatedCards = [...newCards, ...flashcards];
      setFlashcards(updatedCards);
      localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
    } else {
      const { data, error } = await supabase
        .from("flashcards")
        .insert(newCards)
        .select();

      if (error) throw error;
      setFlashcards([...data, ...flashcards]);
    }

    toast.success(`Generated ${newCards.length} flashcards!`);
  } catch (error) {
    toast.error("Failed to generate flashcards");
  } finally {
    setGeneratingCards(false);
  }
};
```

### UI Component

```tsx
<Button
  variant="outline"
  onClick={generateFlashcardsFromContent}
  disabled={generatingCards || !content}
>
  {generatingCards ? (
    <>
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Generating...
    </>
  ) : (
    <>
      <Sparkles className="h-4 w-4 mr-2" />
      AI Generate
    </>
  )}
</Button>
```

---

## Collaboration Integration

### Setup

```typescript
const {
  ydoc,
  provider,
  isConnected,
  activeUsers,
  collaborators,
  isOwner,
  canEdit,
  addCollaborator,
  removeCollaborator,
  updateCollaboratorRole,
} = useCollaboration({
  documentType: 'note',
  documentId: noteId || '',
  enabled: !!noteId && !!user,
});
```

### Passing to Editor

```tsx
<BlockNoteEditor
  initialContent={content}
  onChange={setContent}
  onEditorReady={(editor) => setBlockNoteEditor(editor)}
  collaboration={ydoc && provider ? {
    ydoc,
    provider,
    user: {
      name: user?.email || 'Anonymous',
      color: getUserColor(user?.id || 'guest'),
    },
  } : undefined}
/>
```

---

## Storage Patterns

### Dual Storage Strategy

Notes support both localStorage (guest users) and Supabase (logged in users):

```typescript
const loadNotes = async () => {
  const storageKey = user?.id || 'guest';
  
  try {
    if (!user) {
      // Guest: localStorage only
      const savedNotes = localStorage.getItem(`notes_${storageKey}`);
      if (savedNotes) setContent(savedNotes);
      setLoading(false);
      return;
    }

    // Logged in: try Supabase first
    const { data: noteData, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (noteData) {
      setNoteId(noteData.id);
      setContent(typeof noteData.content === 'string' 
        ? noteData.content 
        : JSON.stringify(noteData.content));
    } else {
      // Fallback to localStorage
      const savedNotes = localStorage.getItem(`notes_${storageKey}`);
      if (savedNotes) setContent(savedNotes);
    }
  } finally {
    setLoading(false);
  }
};
```

### Auto-Save with Dual Storage

```typescript
const autoSaveNotes = async () => {
  const storageKey = `notes_${user?.id || 'guest'}`;
  
  try {
    // Always save to localStorage as backup
    localStorage.setItem(storageKey, content);
    
    // Save to Supabase if logged in
    if (user?.id) {
      if (noteId) {
        await supabase
          .from("notes")
          .update({ content, updated_at: new Date().toISOString() })
          .eq("id", noteId);
      } else {
        const { data } = await supabase
          .from("notes")
          .insert({ user_id: user.id, title: "My Notes", content })
          .select()
          .single();
        
        if (data) setNoteId(data.id);
      }
    }
  } catch (error) {
    console.error("Auto-save failed:", error);
  }
};
```

---

## Best Practices

### 1. Memoize Expensive Computations

```typescript
const tableOfContents = useMemo(() => {
  // Extract headings from content
}, [blockNoteEditor?.document]);

const flashcardPatterns = useMemo(() => {
  // Find :: patterns
}, [blockNoteEditor?.document]);
```

### 2. Persist Panel States

```typescript
useEffect(() => {
  localStorage.setItem('notes-left-panel-collapsed', leftPanelCollapsed.toString());
}, [leftPanelCollapsed]);
```

### 3. Handle Guest Users Gracefully

```typescript
if (!user) {
  // localStorage operations
} else {
  // Supabase operations
}
```

### 4. Provide Loading States

```typescript
{loading ? (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
) : (
  <BlockNoteEditor {...props} />
)}
```

---

## Related Documentation

- [Editor Patterns](./EDITOR_PATTERNS.md) - BlockNote editor details
- [Draft Page Guide](./DRAFT_PAGE_GUIDE.md) - Essay editor with AI feedback
- [AI Commands Guide](./AI_COMMANDS_GUIDE.md) - AI command reference
- [UX/UI Patterns](./UX_UI_PATTERNS.md) - Design system
