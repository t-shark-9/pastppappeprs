/**
 * Editor Exports
 * 
 * This file exports all available editor components.
 * Each editor provides a different writing experience while integrating
 * with the same panel system, AI features, and styling.
 */

// Original BlockNote-based editor
export { BlockNoteEditor } from './BlockNoteEditor';

// Outline Editor - Hierarchical outliner (Workflowy / Roam style)
export { OutlineEditor } from './OutlineEditor';

// Editor Switcher component
export { EditorSwitcher } from './EditorSwitcher';

// Editor type enum for type safety
export type EditorType = 'blocknote' | 'outline';

// Editor metadata for UI
export const EDITOR_INFO: Record<EditorType, {
  name: string;
  description: string;
  icon: string;
  bestFor: string[];
}> = {
  blocknote: {
    name: 'Block Editor',
    description: 'Notion-style block-based editor with slash commands',
    icon: '📝',
    bestFor: ['Essays', 'Notes', 'General writing'],
  },
  outline: {
    name: 'Outline Editor',
    description: 'Hierarchical outliner for structured thinking',
    icon: '📋',
    bestFor: ['Planning', 'Brainstorming', 'Organization'],
  },
};
