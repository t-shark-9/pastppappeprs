# Draft Page Guide

The Draft page (`src/pages/Draft.tsx`) is the primary essay/assignment editor in the IBDP Guide platform. It features a multi-panel layout with AI feedback, collaboration, and grading criteria integration.

## Table of Contents

1. [Overview](#overview)
2. [Page Architecture](#page-architecture)
3. [Panel System](#panel-system)
4. [State Management](#state-management)
5. [Auto-Save Implementation](#auto-save-implementation)
6. [AI Evaluation System](#ai-evaluation-system)
7. [Ghost Session Support](#ghost-session-support)
8. [Collaboration Features](#collaboration-features)
9. [Import/Export Functionality](#importexport-functionality)

---

## Overview

The Draft page provides a comprehensive writing environment for IB students to:

- Write and edit essays/assignments with rich text formatting
- Receive AI-powered feedback and evaluation
- View grading criteria specific to their subject and task type
- Collaborate with teachers or peers in real-time
- Access planning notes and outline from earlier stages
- Import from Word/PDF and export completed work

### Key Dependencies

```typescript
import { BlockNoteEditor } from "@/components/editors/BlockNoteEditor";
import { useCollaboration } from "@/hooks/use-collaboration";
import { useAutoSave } from "@/hooks/use-auto-save";
import { useGhostSession } from "@/contexts/GhostSessionContext";
```

---

## Page Architecture

### Core Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        Header Bar                                │
│  [Back] [Title Input] [Collaborators] [Share] [Import] [Export] │
├─────────────────────────────────────────────────────────────────┤
│         │                              │                         │
│  Left   │        Main Editor           │    Right Panel          │
│  Panel  │                              │                         │
│         │    ┌─────────────────────┐   │   ┌─────────────────┐  │
│ Outline │    │                     │   │   │  AI Feedback    │  │
│   or    │    │   BlockNoteEditor   │   │   │      or         │  │
│ Comments│    │                     │   │   │ Grading Criteria│  │
│   or    │    │                     │   │   │      or         │  │
│ Feedback│    │                     │   │   │    Comments     │  │
│         │    └─────────────────────┘   │   └─────────────────┘  │
│         │                              │                         │
├─────────────────────────────────────────────────────────────────┤
│                        Editor Toolbar                            │
└─────────────────────────────────────────────────────────────────┘
```

### ResizablePanel Implementation

```tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal">
  {/* Left Panel - Collapsible */}
  <ResizablePanel
    defaultSize={leftPanelType ? leftPanelSize : 3}
    minSize={3}
    maxSize={40}
    collapsible={true}
    collapsedSize={3}
    onResize={(size) => setLeftPanelSize(size)}
  >
    {/* Panel content */}
  </ResizablePanel>

  <ResizableHandle withHandle />

  {/* Main Editor */}
  <ResizablePanel defaultSize={60}>
    <BlockNoteEditor {...props} />
  </ResizablePanel>

  <ResizableHandle withHandle />

  {/* Right Panel - Collapsible */}
  <ResizablePanel
    defaultSize={rightPanelType ? rightPanelSize : 3}
    minSize={3}
    maxSize={40}
    collapsible={true}
    collapsedSize={3}
    onResize={(size) => setRightPanelSize(size)}
  >
    {/* Panel content */}
  </ResizablePanel>
</ResizablePanelGroup>
```

---

## Panel System

### Panel Types

```typescript
export type PanelType = 'feedback' | 'outline' | 'comments' | 'grading' | null;

const panels = [
  { id: 'feedback', icon: Sparkles, label: 'AI Feedback' },
  { id: 'outline', icon: Lightbulb, label: 'Planning Notes' },
  { id: 'comments', icon: MessageSquare, label: 'Comments' },
  { id: 'grading', icon: ClipboardCheck, label: 'Grading Criteria' },
];
```

### PanelSelector Component

```tsx
import { PanelSelector, PanelType } from "@/components/editor/PanelSelector";

<PanelSelector
  activePanel={leftPanelType}
  onPanelChange={(panel) => setLeftPanelType(panel)}
  side="left"
  lastSelected={lastLeftPanel}
  collapsed={leftPanelType === null}
/>
```

### Panel Behavior

- **Toggle Logic:** Clicking the active panel collapses it (sets to `null`)
- **Memory:** Last selected panel is remembered in localStorage
- **Collapsed State:** When collapsed, shows only the last selected icon

```typescript
const handleClick = (panelId: PanelType) => {
  if (activePanel === panelId) {
    onPanelChange(null); // Collapse
  } else {
    onPanelChange(panelId); // Switch
  }
};
```

### Panel Components

| Panel | Component | Purpose |
|-------|-----------|---------|
| `feedback` | Inline in Draft.tsx | AI evaluation results |
| `outline` | Inline in Draft.tsx | Planning notes from earlier phase |
| `comments` | `CommentsPanel` | Block-level comments |
| `grading` | `GradingCriteriaPanel` | Subject-specific criteria |

### GradingCriteriaPanel

```tsx
import { GradingCriteriaPanel } from "@/components/editor/GradingCriteriaPanel";

<GradingCriteriaPanel
  subject={assignment?.subject}
  taskType={assignment?.task_type}
/>
```

---

## State Management

### Core State Variables

```typescript
// Document state
const [content, setContent] = useState("");
const [title, setTitle] = useState("");
const [assignment, setAssignment] = useState(null);
const [draftId, setDraftId] = useState<string | null>(null);

// Panel states (persisted to localStorage)
const [leftPanelType, setLeftPanelType] = useState<PanelType>(() => {
  const saved = localStorage.getItem('draft-left-panel-type');
  return saved === 'null' ? null : (saved as PanelType) || 'outline';
});
const [rightPanelType, setRightPanelType] = useState<PanelType>(() => {
  const saved = localStorage.getItem('draft-right-panel-type');
  return saved === 'null' ? null : (saved as PanelType) || 'feedback';
});

// Panel sizes (persisted)
const [leftPanelSize, setLeftPanelSize] = useState(() => {
  const saved = localStorage.getItem('draft-left-panel-size');
  return saved ? parseFloat(saved) : 20;
});
const [rightPanelSize, setRightPanelSize] = useState(() => {
  const saved = localStorage.getItem('draft-right-panel-size');
  return saved ? parseFloat(saved) : 20;
});

// AI state
const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
const [isEvaluating, setIsEvaluating] = useState(false);

// Planning notes from earlier phase
const [planNotes, setPlanNotes] = useState<CoachingResponse | null>(null);
const [outlineSections, setOutlineSections] = useState([]);
```

### Interfaces

```typescript
interface Evaluation {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  criteriaScores?: Record<string, number>;
}

interface CoachingResponse {
  questions: string[];
  thesisPattern: string;
  evidenceChecklist: string[];
}

interface OutlineSection {
  title: string;
  bullets: string[];
}
```

### Persistence Pattern

```typescript
// Persist panel states on change
useEffect(() => {
  localStorage.setItem('draft-left-panel-type', 
    leftPanelType === null ? 'null' : leftPanelType);
}, [leftPanelType]);

useEffect(() => {
  localStorage.setItem('draft-left-panel-size', leftPanelSize.toString());
}, [leftPanelSize]);
```

---

## Auto-Save Implementation

### Using the Hook

```typescript
import { useAutoSave } from "@/hooks/use-auto-save";

const { debouncedSave } = useAutoSave({
  onSave: autoSaveDraft,
  delay: 2000, // 2 seconds
});

useEffect(() => {
  if (content && !loading) {
    debouncedSave();
  }
}, [content, debouncedSave, loading]);
```

### Auto-Save Function

```typescript
const autoSaveDraft = async () => {
  // Calculate word count
  let wordCount = 0;
  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    wordCount = text.trim().split(/\s+/).filter(w => w).length;
  } catch {
    wordCount = 0;
  }

  // Upsert draft
  const { data: existingDraft } = await supabase
    .from("drafts")
    .select("id")
    .eq("assignment_id", id)
    .maybeSingle();

  if (existingDraft) {
    await supabase
      .from("drafts")
      .update({ content, word_count: wordCount })
      .eq("id", existingDraft.id);
  } else {
    await supabase.from("drafts").insert([{
      assignment_id: id,
      content,
      word_count: wordCount,
    }]);
  }

  // Update assignment title if changed
  if (title !== assignment?.title) {
    await supabase
      .from("assignments")
      .update({ title })
      .eq("id", id);
  }

  hasContentBeenSaved.current = true;
};
```

---

## AI Evaluation System

### Triggering Evaluation

```typescript
const runEvaluation = async () => {
  setIsEvaluating(true);
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/evaluate-draft`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          content,
          subject: assignment?.subject,
          taskType: assignment?.task_type,
        }),
      }
    );

    const evaluation = await response.json();
    setEvaluation(evaluation);
  } finally {
    setIsEvaluating(false);
  }
};
```

### Displaying Results

```tsx
{evaluation && (
  <div className="space-y-4">
    {/* Overall Score */}
    <div className="flex items-center gap-2">
      <div className="text-2xl font-bold">{evaluation.overallScore}/7</div>
      <Badge variant={evaluation.overallScore >= 5 ? "success" : "secondary"}>
        {evaluation.overallScore >= 5 ? "On Track" : "Needs Work"}
      </Badge>
    </div>

    {/* Strengths */}
    <div>
      <h4 className="font-medium text-green-600">Strengths</h4>
      <ul className="list-disc pl-4">
        {evaluation.strengths.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>

    {/* Areas for Improvement */}
    <div>
      <h4 className="font-medium text-amber-600">Areas for Improvement</h4>
      <ul className="list-disc pl-4">
        {evaluation.improvements.map((imp, i) => (
          <li key={i}>{imp}</li>
        ))}
      </ul>
    </div>
  </div>
)}
```

---

## Ghost Session Support

### Context Integration

Ghost sessions allow users to try the platform without creating an account:

```typescript
import { useGhostSession } from "@/contexts/GhostSessionContext";

const { 
  ghostAssignment, 
  updateGhostAssignment, 
  isGhostAssignment 
} = useGhostSession();
```

### Conditional Data Loading

```typescript
useEffect(() => {
  if (authLoading) return;
  
  // For ghost assignments, use context data
  if (isGhostAssignment) {
    if (ghostAssignment) {
      setAssignment({
        id: ghostAssignment.id,
        title: ghostAssignment.title,
        subject: ghostAssignment.subject,
        task_type: ghostAssignment.task_type,
        status: ghostAssignment.status,
      });
      setTitle(ghostAssignment.title);
      setContent(ghostAssignment.draft?.content || "");
      setLoading(false);
    } else {
      navigate("/dashboard");
    }
    return;
  }

  // For real assignments, require login and load from Supabase
  if (!user) {
    navigate("/auth");
    return;
  }

  loadData();
}, [user, authLoading, id, isGhostAssignment, ghostAssignment]);
```

### Ghost Save

```typescript
const autoSaveDraft = async () => {
  if (isGhostAssignment && id) {
    updateGhostAssignment(id, {
      title,
      draft: {
        content,
        word_count: wordCount,
      },
    });
    hasContentBeenSaved.current = true;
    return;
  }
  
  // Regular Supabase save...
};
```

---

## Collaboration Features

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
  documentType: 'draft',
  documentId: draftId || '',
  enabled: !!draftId,
});
```

### Collaborator Avatars

```tsx
import { CollaboratorAvatars } from "@/components/editor/CollaboratorAvatars";

<CollaboratorAvatars
  activeUsers={activeUsers}
  collaborators={collaborators}
  maxVisible={4}
/>
```

### Share Modal

```tsx
import { ShareModal } from "@/components/editor/ShareModal";

<ShareModal
  isOpen={showShareModal}
  onClose={() => setShowShareModal(false)}
  documentType="draft"
  documentId={draftId}
  documentTitle={title}
  collaborators={collaborators}
  isOwner={isOwner}
  onAddCollaborator={addCollaborator}
  onRemoveCollaborator={removeCollaborator}
  onUpdateRole={updateCollaboratorRole}
/>
```

---

## Import/Export Functionality

### Import Modal

```tsx
import { ImportDocumentModal } from "@/components/editor/ImportDocumentModal";

<ImportDocumentModal
  isOpen={showImportModal}
  onClose={() => setShowImportModal(false)}
  onImport={(importedContent) => {
    setContent(importedContent);
  }}
/>
```

### Export Dropdown

```tsx
import { ExportDropdown } from "@/components/editor/ExportDropdown";

<ExportDropdown
  content={content}
  title={title}
  formats={['pdf', 'docx', 'html']}
/>
```

---

## Real-Time Subscriptions

### Outline Changes

```typescript
useEffect(() => {
  const outlineSubscription = supabase
    .channel(`outline-changes-${id}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'outlines',
        filter: `assignment_id=eq.${id}`
      },
      async (payload) => {
        const { data } = await supabase
          .from("outlines")
          .select("sections")
          .eq("assignment_id", id)
          .maybeSingle();

        if (data?.sections) {
          setOutlineSections(data.sections);
        }
      }
    )
    .subscribe();

  return () => {
    outlineSubscription.unsubscribe();
  };
}, [id]);
```

---

## Best Practices

### 1. Panel State Persistence

Always persist panel states to localStorage for user convenience:

```typescript
useEffect(() => {
  localStorage.setItem('draft-left-panel-type', 
    leftPanelType === null ? 'null' : leftPanelType);
}, [leftPanelType]);
```

### 2. Content Ref for Cleanup

Use refs to track content for unmount cleanup:

```typescript
const contentRef = useRef("");
const hasContentBeenSaved = useRef(false);

useEffect(() => {
  contentRef.current = content;
}, [content]);

// Cleanup on unmount
useEffect(() => {
  return () => {
    if (!hasContentBeenSaved.current && !contentRef.current.trim() && id) {
      // Delete empty ghost assignment
      supabase.from("assignments").delete().eq("id", id);
    }
  };
}, [id]);
```

### 3. Loading States

Always show loading states for async operations:

```typescript
{loading ? (
  <div className="flex items-center justify-center h-full">
    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
  </div>
) : (
  <BlockNoteEditor {...props} />
)}
```

---

## Related Documentation

- [Editor Patterns](./EDITOR_PATTERNS.md) - BlockNote editor details
- [Notes Page Guide](./NOTES_PAGE_GUIDE.md) - Notes and flashcard system
- [AI Commands Guide](./AI_COMMANDS_GUIDE.md) - AI command reference
- [UX/UI Patterns](./UX_UI_PATTERNS.md) - Design system
