# IBDP Guide Developer Documentation

Welcome to the developer documentation for the IBDP Guide platform. This documentation provides comprehensive guides for maintaining and extending the platform.

## Quick Links

| Guide | Description |
|-------|-------------|
| [Editor Patterns](./EDITOR_PATTERNS.md) | BlockNote editor integration, custom blocks, AI commands |
| [Draft Page Guide](./DRAFT_PAGE_GUIDE.md) | Multi-panel essay editor with AI feedback |
| [Notes Page Guide](./NOTES_PAGE_GUIDE.md) | Note-taking with flashcard generation |
| [AI Commands Guide](./AI_COMMANDS_GUIDE.md) | AI command system and streaming responses |
| [UX/UI Patterns](./UX_UI_PATTERNS.md) | Design system, components, and accessibility |

## Project Overview

The IBDP Guide is a comprehensive educational platform for International Baccalaureate Diploma Programme students, featuring:

- **Rich Text Editors** - BlockNote-based editors with collaboration support
- **AI Integration** - Context-aware writing assistance (define, explain, rephrase)
- **Flashcard System** - Spaced repetition learning with AI generation
- **Grading Criteria** - Subject-specific assessment criteria reference
- **IA Writing Guides** - Comprehensive Internal Assessment guidance

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| shadcn/ui | Component Library |
| BlockNote | Rich Text Editor |
| Supabase | Backend (Auth, DB, Edge Functions) |
| Yjs | Real-time Collaboration |

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── editor/          # Editor-related components
│   │   ├── PanelSelector.tsx
│   │   ├── CommentsPanel.tsx
│   │   ├── GradingCriteriaPanel.tsx
│   │   ├── ShareModal.tsx
│   │   ├── FixedEditorToolbar.tsx
│   │   └── ...
│   └── editors/
│       ├── BlockNoteEditor.tsx
│       └── MathBlock.tsx
├── pages/
│   ├── Draft.tsx        # Essay editor
│   ├── Notes.tsx        # Notes with flashcards
│   ├── IAWritingGuide.tsx
│   └── ...
├── hooks/
│   ├── use-auto-save.ts
│   ├── use-collaboration.ts
│   └── ...
├── lib/
│   ├── blocknote-ai-commands.ts
│   ├── utils.ts
│   └── ...
├── contexts/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── GhostSessionContext.tsx
└── data/
    ├── iaGuidanceData.ts
    └── ibSubjectData.ts
```

## Getting Started

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd ibdp-guide

# Install dependencies
npm install

# Set up environment variables
cp env.txt .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

## Common Development Tasks

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Follow existing page patterns for layout

### Adding a New Component

1. Create component in appropriate folder
2. Use shadcn/ui primitives where possible
3. Follow TypeScript interfaces pattern
4. Include proper accessibility attributes

### Adding a New AI Command

See [AI Commands Guide](./AI_COMMANDS_GUIDE.md#adding-new-commands)

### Adding a New Subject

Update `src/data/iaGuidanceData.ts` with new subject data following the `IASubject` interface.

## Key Concepts

### Panel System

The Draft and Notes pages use a resizable panel system:

- Left Panel: Outline/Table of Contents
- Main Panel: BlockNote Editor
- Right Panel: AI Feedback/Flashcards/Grading Criteria

Panels remember their state in localStorage.

### Collaboration

Real-time collaboration uses Yjs with a Supabase provider:

```typescript
const { ydoc, provider, isConnected } = useCollaboration({
  documentType: 'draft',
  documentId: id,
  enabled: true,
});
```

### Auto-Save

Content auto-saves after 2 seconds of inactivity:

```typescript
const { debouncedSave } = useAutoSave({
  onSave: saveFunction,
  delay: 2000,
});
```

### Ghost Sessions

Unauthenticated users can try the platform with data stored in context/localStorage:

```typescript
const { ghostAssignment, isGhostAssignment } = useGhostSession();
```

## Testing

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

1. Follow existing code patterns
2. Use TypeScript with proper types
3. Test on both desktop and mobile
4. Ensure accessibility compliance
5. Update documentation for new features

## Support

For questions about the codebase, refer to the specific guides listed above or examine the existing implementations in the codebase.
