import { useEffect, useRef, useCallback } from 'react';

interface UseInlineGhostTextOptions {
  editor: any;
  suggestion: string;
  enabled?: boolean;
  onAccept?: () => void;
  onClear?: () => void;
}

/**
 * Hook that manages inline ghost text (autocomplete suggestions) in the BlockNote editor.
 * The ghost text appears as grayed-out text directly after the cursor position.
 */
export function useInlineGhostText({
  editor,
  suggestion,
  enabled = true,
  onAccept,
  onClear,
}: UseInlineGhostTextOptions) {
  const ghostTextRef = useRef<HTMLSpanElement | null>(null);
  const lastSuggestionRef = useRef<string>('');

  // Create or update ghost text element
  const updateGhostText = useCallback(() => {
    if (!editor || !enabled) {
      removeGhostText();
      return;
    }

    if (!suggestion) {
      removeGhostText();
      return;
    }

    // Get the current selection/cursor position
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      removeGhostText();
      return;
    }

    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      // If there's a selection (not just a cursor), don't show ghost text
      removeGhostText();
      return;
    }

    // Check if we're inside the BlockNote editor
    const editorContainer = document.querySelector('.bn-container');
    if (!editorContainer || !editorContainer.contains(range.startContainer)) {
      removeGhostText();
      return;
    }

    // Remove existing ghost text
    removeGhostText();

    // Create new ghost text element
    const ghostSpan = document.createElement('span');
    ghostSpan.className = 'inline-ghost-text';
    ghostSpan.textContent = suggestion;
    ghostSpan.setAttribute('data-ghost-text', 'true');
    ghostSpan.setAttribute('contenteditable', 'false');
    ghostSpan.style.cssText = `
      color: #888888;
      opacity: 0.7;
      pointer-events: none;
      user-select: none;
      font-style: italic;
      background-color: transparent;
      display: inline;
      position: relative;
      z-index: 1;
    `;

    try {
      // Insert ghost text at cursor position
      range.insertNode(ghostSpan);
      ghostTextRef.current = ghostSpan;
      lastSuggestionRef.current = suggestion;

      // Move cursor before the ghost text so it doesn't interfere with typing
      range.setStartBefore(ghostSpan);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      // Silently handle insertion errors (can happen during navigation)
      console.debug('Failed to insert ghost text:', error);
      try {
        if (ghostSpan.parentNode) {
          ghostSpan.remove();
        }
      } catch {
        // Ignore cleanup errors
      }
    }
  }, [editor, suggestion, enabled]);

  // Remove ghost text element
  const removeGhostText = useCallback(() => {
    if (ghostTextRef.current) {
      try {
        // Check if the element is still in the DOM before removing
        if (ghostTextRef.current.parentNode) {
          ghostTextRef.current.remove();
        }
      } catch (error) {
        // Silently ignore removal errors (element may already be removed)
        console.debug('Ghost text cleanup skipped:', error);
      }
      ghostTextRef.current = null;
    }
    // Also clean up any orphaned ghost text elements
    try {
      document.querySelectorAll('[data-ghost-text="true"]').forEach(el => {
        if (el.parentNode) {
          el.remove();
        }
      });
    } catch (error) {
      // Silently ignore cleanup errors during navigation
      console.debug('Orphaned ghost text cleanup skipped:', error);
    }
  }, []);

  // Accept the current suggestion
  const acceptSuggestion = useCallback(() => {
    if (!suggestion || !editor) return false;

    // Remove ghost text first
    removeGhostText();

    // Insert the suggestion as actual content
    try {
      editor.insertInlineContent([
        { type: 'text', text: suggestion, styles: {} }
      ]);

      // Ensure both the UI and state are cleared after accepting
      onAccept?.();
      onClear?.();
      lastSuggestionRef.current = '';

      return true;
    } catch (error) {
      console.error('Failed to accept suggestion:', error);
      return false;
    }
  }, [editor, suggestion, removeGhostText, onAccept, onClear]);

  // Handle keyboard events
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're inside the BlockNote editor
      const activeElement = document.activeElement;
      const editorContainer = document.querySelector('.bn-container');
      
      // Only handle Tab within the editor when there's a suggestion
      if (e.key === 'Tab' && !e.shiftKey) {
        // If inside editor with a suggestion, accept it
        if (editorContainer && editorContainer.contains(activeElement) && suggestion) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          acceptSuggestion();
          return false;
        }
        // Otherwise, let Tab work normally (don't intercept)
        return;
      }

      // For other keys, only handle if inside editor
      if (!editorContainer || !editorContainer.contains(activeElement)) {
        return;
      }

      if (e.key === 'Escape' && suggestion) {
        e.preventDefault();
        e.stopPropagation();
        removeGhostText();
        onClear?.();
        return;
      }

      // Remove ghost text when user starts typing
      if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1) {
        removeGhostText();
        onClear?.();
      }
    };

    // Use capture phase to intercept before BlockNote and browser default
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [enabled, suggestion, acceptSuggestion, removeGhostText, onClear]);

  // Update ghost text when suggestion changes
  useEffect(() => {
    if (suggestion !== lastSuggestionRef.current) {
      updateGhostText();
    }
  }, [suggestion, updateGhostText]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      removeGhostText();
    };
  }, [removeGhostText]);

  // Listen for editor changes to clear ghost text
  useEffect(() => {
    if (!editor) return;

    const handleChange = () => {
      removeGhostText();
    };

    editor.onChange?.(handleChange);
  }, [editor, removeGhostText]);

  return {
    acceptSuggestion,
    removeGhostText,
    hasGhostText: !!ghostTextRef.current,
  };
}
