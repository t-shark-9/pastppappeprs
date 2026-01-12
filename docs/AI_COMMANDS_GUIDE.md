# AI Commands Guide

This guide provides comprehensive documentation for the AI command system integrated into the IBDP Guide platform. The system provides intelligent text assistance within the BlockNote editor through streaming responses from Supabase Edge Functions.

## Table of Contents

1. [Overview](#overview)
2. [Available Commands](#available-commands)
3. [Command Implementation](#command-implementation)
4. [Streaming Response Pattern](#streaming-response-pattern)
5. [Edge Function Integration](#edge-function-integration)
6. [Toolbar Integration](#toolbar-integration)
7. [Explain Bubble UI](#explain-bubble-ui)
8. [Preview Mode Limitations](#preview-mode-limitations)
9. [Error Handling](#error-handling)
10. [Adding New Commands](#adding-new-commands)

---

## Overview

The AI command system provides intelligent text manipulation and assistance:

| Command | Purpose | Output |
|---------|---------|--------|
| Define | Get definition of a term | Inline parenthetical |
| Explain | Explain a concept in context | Floating bubble |
| Synonym | Find contextual synonyms | Inline parenthetical |
| Rephrase | Rewrite selected text | Inline replacement |
| Grammar | Fix grammar issues | Inline replacement |

### Key Files

```
src/lib/blocknote-ai-commands.ts     # Core command handlers
src/components/editor/FixedEditorToolbar.tsx  # Toolbar integration
src/components/editors/BlockNoteEditor.tsx    # Editor integration
supabase/functions/ai-assistant/     # Edge function backend
```

---

## Available Commands

### 1. Define Command

**Purpose:** Provides a concise definition of the selected term within context.

**Behavior:**
- Takes selected text and surrounding context
- Returns a single-sentence definition
- Inserts result in italics after selection

```typescript
export async function handleDefineCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void>
```

**Example:**
- Select: "mitochondria"
- Result: "(the powerhouse of the cell, responsible for ATP production)"

### 2. Explain Command

**Purpose:** Provides a detailed explanation of a concept, displayed in a floating bubble.

**Behavior:**
- Shows loading state in bubble
- Streams explanation in real-time
- Stays visible until dismissed

```typescript
export async function handleExplainCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void>
```

**Example:**
- Select: "Hardy-Weinberg equilibrium"
- Result: Multi-paragraph explanation in floating bubble

### 3. Synonym Command

**Purpose:** Suggests contextually appropriate synonyms for the selected word.

**Behavior:**
- Analyzes context for appropriate register
- Returns comma-separated alternatives
- Stops after first complete suggestion

```typescript
export async function handleSynonymCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void>
```

**Example:**
- Select: "important"
- Result: "(significant, crucial, vital)"

### 4. Rephrase Command

**Purpose:** Rewrites selected text while maintaining meaning.

**Behavior:**
- Considers surrounding context
- Maintains academic tone
- Streams full rephrased text

```typescript
export async function handleRephraseCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void>
```

### 5. Grammar Command

**Purpose:** Corrects grammar, spelling, and punctuation in selected text.

**Behavior:**
- Preserves original meaning
- Fixes all grammatical issues
- Streams corrected text

```typescript
export async function handleGrammarCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void>
```

---

## Command Implementation

### Standard Command Structure

All commands follow this implementation pattern:

```typescript
export async function handleDefineCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // 1. Check preview mode AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  // 2. Validate selection
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    // 3. Call Edge Function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'define',
          selection: selectedText,
          context,
        }),
      }
    );

    // 4. Validate response
    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    // 5. Stream response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';
    let sentenceComplete = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content && !sentenceComplete) {
              aiText += content;
              
              // Check for sentence completion (for define/synonym)
              const sentenceMatch = aiText.match(/^[^.!?]*[.!?]/);
              if (sentenceMatch) {
                sentenceComplete = true;
                aiText = sentenceMatch[0];
              }
              
              insertContent(aiText);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    toast.success('Definition added!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to get AI response');
  }
}
```

---

## Streaming Response Pattern

### SSE (Server-Sent Events) Format

The Edge Function returns data in SSE format:

```
data: {"choices":[{"delta":{"content":"The "}}]}
data: {"choices":[{"delta":{"content":"definition "}}]}
data: {"choices":[{"delta":{"content":"is..."}}]}
data: [DONE]
```

### Parsing SSE Stream

```typescript
const reader = response.body.getReader();
const decoder = new TextDecoder();
let aiText = '';

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') continue;

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          aiText += content;
          insertContent(aiText);
        }
      } catch (e) {
        // Ignore parse errors for malformed chunks
      }
    }
  }
}
```

### Sentence Completion Detection

For commands that should stop after one sentence (define, synonym):

```typescript
let sentenceComplete = false;

// In the parsing loop:
if (content && !sentenceComplete) {
  aiText += content;
  
  // Match first complete sentence
  const sentenceMatch = aiText.match(/^[^.!?]*[.!?]/);
  if (sentenceMatch) {
    sentenceComplete = true;
    aiText = sentenceMatch[0];
  }
  
  insertContent(aiText);
}
```

---

## Edge Function Integration

### Request Format

```typescript
const response = await fetch(
  `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({
      command: 'define' | 'explain' | 'synonym' | 'rephrase' | 'grammar',
      selection: string,  // Selected text
      context: string,    // Surrounding document content
    }),
  }
);
```

### Edge Function Location

```
supabase/functions/ai-assistant/index.ts
```

### Environment Variables

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

---

## Toolbar Integration

### FixedEditorToolbar Props

```typescript
interface FixedEditorToolbarProps {
  editor: any;
  onAICommand: (command: string, selectedText: string) => void;
}
```

### AI Command Dropdown

```tsx
const DropdownSection = ({ trigger, label, children, id }) => (
  <Popover 
    open={openDropdown === id} 
    onOpenChange={(open) => setOpenDropdown(open ? id : null)}
  >
    <PopoverTrigger asChild>
      {trigger}
    </PopoverTrigger>
    <PopoverContent className="w-48 p-1">
      {children}
    </PopoverContent>
  </Popover>
);

// AI Commands Section
<DropdownSection
  id="ai"
  label="AI Commands"
  trigger={
    <Button variant="ghost" size="sm" disabled={!hasSelection()}>
      <Sparkles className="h-4 w-4 mr-1" />
      AI
      <ChevronDown className="h-3 w-3 ml-1" />
    </Button>
  }
>
  <Button variant="ghost" className="w-full justify-start" onClick={() => handleAI('define')}>
    <BookOpen className="h-4 w-4 mr-2" /> Define
  </Button>
  <Button variant="ghost" className="w-full justify-start" onClick={() => handleAI('explain')}>
    <Lightbulb className="h-4 w-4 mr-2" /> Explain
  </Button>
  <Button variant="ghost" className="w-full justify-start" onClick={() => handleAI('synonym')}>
    <Type className="h-4 w-4 mr-2" /> Synonym
  </Button>
  <Button variant="ghost" className="w-full justify-start" onClick={() => handleAI('rephrase')}>
    <RotateCcw className="h-4 w-4 mr-2" /> Rephrase
  </Button>
  <Button variant="ghost" className="w-full justify-start" onClick={() => handleAI('grammar')}>
    <CheckCheck className="h-4 w-4 mr-2" /> Grammar
  </Button>
</DropdownSection>
```

### Getting Selected Text

```typescript
const getSelectedText = () => {
  if (!editor) return '';
  try {
    return editor.getSelectedText() || '';
  } catch {
    return '';
  }
};

const hasSelection = () => getSelectedText().trim().length > 0;
```

---

## Explain Bubble UI

### State Interface

```typescript
const [explainBubble, setExplainBubble] = useState<{
  visible: boolean;
  text: string;
  loading: boolean;
  position: { x: number; y: number };
  originalText: string;
} | null>(null);
```

### Positioning Logic

```typescript
const handleExplainCommandFromToolbar = async (selectedText: string) => {
  // Get cursor position for bubble placement
  const selection = window.getSelection();
  let position = { x: window.innerWidth / 2, y: 300 };
  
  try {
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      if (rect && rect.bottom > 0) {
        position = { 
          x: rect.left + rect.width / 2, 
          y: rect.bottom + 20 
        };
      }
    }
  } catch (e) {
    // Fallback to center of editor
    const editorContainer = document.querySelector('.bn-container');
    if (editorContainer) {
      const editorRect = editorContainer.getBoundingClientRect();
      position = {
        x: editorRect.left + editorRect.width / 2,
        y: Math.max(editorRect.top + 100, 300)
      };
    }
  }

  // Show loading bubble
  setExplainBubble({
    visible: true,
    text: '',
    loading: true,
    position,
    originalText: selectedText
  });

  // Stream response
  setIsAIStreaming(true);
  let accumulatedText = '';
  await handleExplainCommand(selectedText, context, (text: string) => {
    accumulatedText = text;
    setExplainBubble(prev => prev ? { 
      ...prev, 
      text: accumulatedText, 
      loading: false 
    } : null);
  });
  setIsAIStreaming(false);
};
```

### Bubble Component

```tsx
{explainBubble?.visible && (
  <div
    className="fixed z-50 max-w-md bg-popover border rounded-lg shadow-lg p-4"
    style={{
      left: `${explainBubble.position.x}px`,
      top: `${explainBubble.position.y}px`,
      transform: 'translateX(-50%)',
    }}
  >
    {/* Close button */}
    <button
      onClick={() => setExplainBubble(null)}
      className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
    >
      <X className="h-4 w-4" />
    </button>
    
    {/* Original term */}
    <div className="font-medium text-sm mb-2">
      "{explainBubble.originalText}"
    </div>
    
    {/* Content */}
    {explainBubble.loading ? (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Thinking...</span>
      </div>
    ) : (
      <div className="text-sm whitespace-pre-wrap">
        {explainBubble.text}
      </div>
    )}
  </div>
)}
```

---

## Preview Mode Limitations

### Check Pattern

Preview/demo modes may limit AI usage:

```typescript
// At the start of each command
if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
  return;
}
```

### Setting Up Preview Mode

```typescript
// In preview setup
(window as any).__previewAICheck = () => {
  const usageCount = parseInt(localStorage.getItem('preview_ai_usage') || '0');
  
  if (usageCount >= 3) {
    toast.error('AI usage limit reached in preview mode. Sign up for unlimited access.');
    return false;
  }
  
  localStorage.setItem('preview_ai_usage', (usageCount + 1).toString());
  return true;
};
```

---

## Error Handling

### Response Validation

```typescript
if (!response.ok) {
  throw new Error('Failed to get AI response');
}

if (!response.body) {
  throw new Error('No response body');
}
```

### Stream Parse Errors

```typescript
try {
  const parsed = JSON.parse(data);
  const content = parsed.choices?.[0]?.delta?.content;
  // ...
} catch (e) {
  // Ignore parse errors - some chunks may be incomplete
}
```

### User Feedback

```typescript
try {
  // AI operation
  toast.success('Definition added!');
} catch (error) {
  console.error('AI error:', error);
  toast.error('Failed to get AI response');
}
```

---

## Adding New Commands

### 1. Add Command Handler

Create a new async function in `src/lib/blocknote-ai-commands.ts`:

```typescript
export async function handleSummarizeCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // Check preview mode
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'summarize',  // New command type
          selection: selectedText,
          context,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    // Stream response
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiText += content;
              insertContent(aiText);
            }
          } catch (e) {}
        }
      }
    }

    toast.success('Text summarized!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to summarize text');
  }
}
```

### 2. Add to BlockNoteEditor

Update the imports and props interface:

```typescript
import { handleSummarizeCommand } from "@/lib/blocknote-ai-commands";

interface BlockNoteEditorProps {
  onAICommandsReady?: (handlers: {
    define: (text: string) => Promise<void>;
    explain: (text: string) => Promise<void>;
    synonym: (text: string) => Promise<void>;
    rephrase: (text: string) => Promise<void>;
    grammar: (text: string) => Promise<void>;
    summarize: (text: string) => Promise<void>;  // New
  }) => void;
}
```

### 3. Add Toolbar Button

In `FixedEditorToolbar.tsx`:

```tsx
<Button 
  variant="ghost" 
  className="w-full justify-start" 
  onClick={() => handleAI('summarize')}
>
  <FileText className="h-4 w-4 mr-2" /> Summarize
</Button>
```

### 4. Update Edge Function

Add handling for the new command in `supabase/functions/ai-assistant/index.ts`:

```typescript
const prompts = {
  // ... existing prompts
  summarize: `Summarize the following text concisely while preserving key points:
    
    Context: ${context}
    
    Text to summarize: ${selection}`,
};
```

---

## Best Practices

### 1. Always Validate Selection

```typescript
if (!selectedText.trim()) {
  toast.error('Please select some text first');
  return;
}
```

### 2. Show Streaming Progress

```typescript
let aiText = '';
while (reading) {
  aiText += content;
  insertContent(aiText);  // Update on each chunk
}
```

### 3. Handle Cleanup

```typescript
setIsAIStreaming(true);
try {
  await handleCommand(...);
} finally {
  setIsAIStreaming(false);
}
```

### 4. Provide Visual Feedback

```typescript
// Show loading state
setExplainBubble({ visible: true, loading: true, ... });

// Show completion
toast.success('Definition added!');
```

---

## Related Documentation

- [Editor Patterns](./EDITOR_PATTERNS.md) - BlockNote editor integration
- [Draft Page Guide](./DRAFT_PAGE_GUIDE.md) - Draft editor context
- [Notes Page Guide](./NOTES_PAGE_GUIDE.md) - Notes editor context
- [UX/UI Patterns](./UX_UI_PATTERNS.md) - Design system guidelines
