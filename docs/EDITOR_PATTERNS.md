# BlockNote Editor Patterns

This guide documents the BlockNote rich text editor implementation used throughout the IBDP Guide platform. Understanding these patterns is essential for developers working on the Draft, Notes, or any editor-based features.

## Table of Contents

1. [Overview](#overview)
2. [BlockNoteEditor Component](#blocknoteeditor-component)
3. [Custom Blocks](#custom-blocks)
4. [AI Commands Integration](#ai-commands-integration)
5. [Collaboration Setup](#collaboration-setup)
6. [Toolbar Implementation](#toolbar-implementation)
7. [Content Serialization](#content-serialization)

---

## Overview

The platform uses [BlockNote](https://www.blocknotejs.org/) as the core rich text editor. BlockNote is a React-based block editor that provides a Notion-like editing experience with support for custom blocks, slash commands, and real-time collaboration.

### Key Files

| File | Purpose |
|------|---------|
| `src/components/editors/BlockNoteEditor.tsx` | Main editor component with AI integration |
| `src/components/editors/MathBlock.tsx` | Custom LaTeX/math equation block |
| `src/lib/blocknote-ai-commands.ts` | AI command handlers (define, explain, etc.) |
| `src/lib/mathBlockSpec.ts` | Math block specifications |
| `src/components/editor/FixedEditorToolbar.tsx` | Floating toolbar component |

---

## BlockNoteEditor Component

### Props Interface

```typescript
interface BlockNoteEditorProps {
  initialContent?: string | Block[];
  onChange?: (content: string) => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
  onEditorReady?: (editor: any) => void;
  onPageCountChange?: (count: number) => void;
  disablePagination?: boolean;
  onAICommandsReady?: (handlers: {
    define: (text: string) => Promise<void>;
    explain: (text: string) => Promise<void>;
    synonym: (text: string) => Promise<void>;
    rephrase: (text: string) => Promise<void>;
    grammar: (text: string) => Promise<void>;
  }) => void;
  // Context for subject-specific feedback
  userContext?: {
    schoolProgram?: string;
    subject?: string;
    taskType?: string;
  };
  // Collaboration props
  collaboration?: {
    ydoc: Y.Doc;
    provider: any;
    user?: {
      name: string;
      color: string;
    };
  };
}
```

### Basic Usage

```tsx
import { BlockNoteEditor } from "@/components/editors/BlockNoteEditor";

function MyEditorPage() {
  const [content, setContent] = useState("");
  
  return (
    <BlockNoteEditor
      initialContent={content}
      onChange={setContent}
      placeholder="Start writing..."
      userContext={{
        schoolProgram: "IB",
        subject: "Biology",
        taskType: "IA",
      }}
    />
  );
}
```

### With Title Input

```tsx
<BlockNoteEditor
  title={documentTitle}
  onTitleChange={setDocumentTitle}
  initialContent={content}
  onChange={setContent}
/>
```

### With AI Commands Ready Callback

```tsx
const [aiHandlers, setAIHandlers] = useState(null);

<BlockNoteEditor
  onAICommandsReady={(handlers) => {
    setAIHandlers(handlers);
  }}
/>

// Later, trigger AI commands from outside the editor
await aiHandlers.define(selectedText);
```

---

## Custom Blocks

### Page Break Block

The editor includes a custom page break block for document pagination:

```typescript
const pageBreakBlockSpec = createBlockSpec(
  {
    type: "pageBreak" as const,
    propSchema: {},
    content: "none",
  },
  {
    render: () => {
      const container = document.createElement("div");
      container.className = "page-break-visual";
      container.contentEditable = "false";
      
      // Creates visual representation of page break
      const endPage = document.createElement("div");
      endPage.className = "page-end-marker";
      
      const voidGap = document.createElement("div");
      voidGap.className = "page-void-gap";
      
      const startPage = document.createElement("div");
      startPage.className = "page-start-marker";
      
      container.appendChild(endPage);
      container.appendChild(voidGap);
      container.appendChild(startPage);
      
      return { dom: container };
    },
  }
);
```

### Math Block

For LaTeX equations, see `src/lib/mathBlockSpec.ts`:

```typescript
// Inline math: $equation$
export const inlineMathInlineSpec = { ... };

// Block math: $$equation$$
export const blockMathBlockSpec = { ... };

// Inline math block
export const inlineMathBlockSpec = { ... };
```

### Adding Custom Blocks to Schema

```typescript
const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    pageBreak: pageBreakBlockSpec,
    inlineMath: inlineMathBlockSpec,
    blockMath: blockMathBlockSpec,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    inlineMath: inlineMathInlineSpec,
  },
});
```

---

## AI Commands Integration

### Available Commands

| Command | Function | Description |
|---------|----------|-------------|
| `define` | `handleDefineCommand` | Get definition of selected term |
| `explain` | `handleExplainCommand` | Explain selected concept |
| `synonym` | `handleSynonymCommand` | Find synonyms for selected word |
| `rephrase` | `handleRephraseCommand` | Rephrase selected text |
| `grammar` | `handleGrammarCommand` | Fix grammar in selected text |

### Command Handler Pattern

All AI commands follow this pattern:

```typescript
export async function handleDefineCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // 1. Check for preview AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  // 2. Validate selection
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  // 3. Call Supabase Edge Function with streaming
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

  // 4. Stream response
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let aiText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    // Parse SSE format
    for (const line of chunk.split('\n')) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          aiText += content;
          insertContent(aiText);
        }
      }
    }
  }

  toast.success('Definition added!');
}
```

### Triggering from Toolbar

```tsx
const handleAICommand = (command: string, selectedText: string) => {
  switch (command) {
    case 'define':
      handleDefineCommandFromToolbar(selectedText);
      break;
    case 'explain':
      handleExplainCommandFromToolbar(selectedText);
      break;
    // ... other commands
  }
};

<FixedEditorToolbar 
  editor={editor}
  onAICommand={handleAICommand}
/>
```

---

## Collaboration Setup

### Using the Collaboration Hook

```typescript
import { useCollaboration } from "@/hooks/use-collaboration";

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
  documentType: 'draft', // or 'note'
  documentId: documentId,
  enabled: !!documentId,
});
```

### Passing to BlockNoteEditor

```tsx
// Get user color based on their ID
const getUserColor = (userId: string): string => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

<BlockNoteEditor
  collaboration={{
    ydoc,
    provider,
    user: {
      name: user?.email || 'Anonymous',
      color: getUserColor(user?.id || 'guest'),
    },
  }}
/>
```

### Collaborator Interface

```typescript
interface Collaborator {
  id: string;
  user_id: string;
  email: string;
  name?: string;
  role: 'owner' | 'editor' | 'viewer';
  isOnline?: boolean;
  color?: string;
}
```

---

## Toolbar Implementation

### FixedEditorToolbar Component

The toolbar provides formatting controls and AI commands:

```tsx
interface FixedEditorToolbarProps {
  editor: any;
  onAICommand: (command: string, selectedText: string) => void;
}
```

### Available Toolbar Actions

**Text Styling:**
- Bold, Italic, Underline, Strikethrough
- Code, Subscript, Superscript

**Block Types:**
- Heading 1, 2, 3
- Paragraph
- Bullet List, Numbered List, Check List
- Quote

**AI Commands:**
- Define, Explain, Synonym, Rephrase, Grammar

### Creating Custom Toolbar Buttons

```tsx
const ToolbarButton = ({ 
  icon: Icon, 
  label, 
  onClick, 
  active = false,
  disabled = false,
}: { 
  icon: any; 
  label: string; 
  onClick: () => void; 
  active?: boolean;
  disabled?: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={active ? "secondary" : "ghost"}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);
```

---

## Content Serialization

### HTML to Blocks

```typescript
function htmlToBlocks(html: string): Block[] {
  if (!html || html.trim() === "") {
    return [{ type: "paragraph", content: [] }] as Block[];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: Block[] = [];

  // Process each child node
  const children = doc.body.childNodes;
  for (let i = 0; i < children.length; i++) {
    const block = processNode(children[i]);
    if (block) blocks.push(block);
  }

  return blocks.length > 0 ? blocks : [{ type: "paragraph", content: [] }];
}
```

### Blocks to HTML

```typescript
function blocksToHTML(blocks: Block[]): string {
  let html = "";

  blocks.forEach((block: any) => {
    if (block.type === "heading") {
      const level = block.props?.level || 1;
      html += `<h${level}>`;
      block.content?.forEach((content: any) => {
        html += content.text || "";
      });
      html += `</h${level}>`;
    } else if (block.type === "paragraph") {
      html += "<p>";
      block.content?.forEach((content: any) => {
        let text = content.text || "";
        if (content.styles?.bold) text = `<strong>${text}</strong>`;
        if (content.styles?.italic) text = `<em>${text}</em>`;
        html += text;
      });
      html += "</p>";
    }
    // ... handle other block types
  });

  return html;
}
```

---

## Best Practices

### 1. Always Handle Empty Content

```typescript
const initialBlocks = content 
  ? JSON.parse(content) 
  : [{ type: "paragraph", content: [] }];
```

### 2. Use Debounced Saves

```typescript
const { debouncedSave } = useAutoSave({
  onSave: async () => {
    await saveContent(content);
  },
  delay: 2000, // 2 seconds debounce
});

useEffect(() => {
  if (content && !loading) {
    debouncedSave();
  }
}, [content, debouncedSave, loading]);
```

### 3. Track Editor Ready State

```typescript
const [editorReady, setEditorReady] = useState(false);

<BlockNoteEditor
  onEditorReady={(editor) => {
    editorRef.current = editor;
    setEditorReady(true);
  }}
/>
```

### 4. Handle Streaming AI Responses

Always use streaming for AI commands to provide real-time feedback:

```typescript
setIsAIStreaming(true);
await handleExplainCommand(selectedText, context, (text) => {
  // Update UI with streaming text
  setExplainBubble(prev => ({ ...prev, text }));
});
setIsAIStreaming(false);
```

---

## Related Documentation

- [Draft Page Guide](./DRAFT_PAGE_GUIDE.md) - Multi-panel editor layout
- [Notes Page Guide](./NOTES_PAGE_GUIDE.md) - Flashcard integration
- [AI Commands Guide](./AI_COMMANDS_GUIDE.md) - Detailed AI command reference
- [UX/UI Patterns](./UX_UI_PATTERNS.md) - Design system guidelines
