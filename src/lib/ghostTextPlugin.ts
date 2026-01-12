import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const ghostTextPluginKey = new PluginKey('ghostText');

interface GhostTextState {
  suggestion: string;
  position: number | null;
}

/**
 * Creates a ProseMirror plugin that displays ghost text (inline suggestions)
 * at the current cursor position. The ghost text appears in gray and can be
 * accepted by pressing Tab.
 */
export function createGhostTextPlugin() {
  return new Plugin<GhostTextState>({
    key: ghostTextPluginKey,
    state: {
      init() {
        return { suggestion: '', position: null };
      },
      apply(tr, state) {
        const meta = tr.getMeta(ghostTextPluginKey);
        if (meta !== undefined) {
          return meta;
        }
        // Clear suggestion on any document change or selection change
        if (tr.docChanged || tr.selectionSet) {
          return { suggestion: '', position: null };
        }
        return state;
      },
    },
    props: {
      decorations(state) {
        const pluginState = ghostTextPluginKey.getState(state);
        if (!pluginState?.suggestion || pluginState.position === null) {
          return DecorationSet.empty;
        }

        // Create an inline widget decoration for the ghost text
        const widget = Decoration.widget(
          pluginState.position,
          () => {
            const span = document.createElement('span');
            span.className = 'ghost-text-suggestion';
            span.textContent = pluginState.suggestion;
            span.setAttribute('data-ghost-text', 'true');
            return span;
          },
          { side: 1 } // Place after the cursor
        );

        return DecorationSet.create(state.doc, [widget]);
      },
    },
  });
}

/**
 * Sets the ghost text suggestion in the editor
 */
export function setGhostText(view: any, suggestion: string) {
  const { state, dispatch } = view;
  const { selection } = state;
  
  // Only show at end of selection (cursor position)
  const pos = selection.$head.pos;
  
  const tr = state.tr.setMeta(ghostTextPluginKey, {
    suggestion,
    position: pos,
  });
  
  dispatch(tr);
}

/**
 * Clears the ghost text suggestion
 */
export function clearGhostText(view: any) {
  const { state, dispatch } = view;
  const tr = state.tr.setMeta(ghostTextPluginKey, {
    suggestion: '',
    position: null,
  });
  dispatch(tr);
}

/**
 * Accepts the current ghost text suggestion by inserting it into the document
 */
export function acceptGhostText(view: any): string | null {
  const { state, dispatch } = view;
  const pluginState = ghostTextPluginKey.getState(state);
  
  if (!pluginState?.suggestion || pluginState.position === null) {
    return null;
  }
  
  const suggestion = pluginState.suggestion;
  
  // Insert the suggestion text at the position
  const tr = state.tr.insertText(suggestion, pluginState.position);
  
  // Clear the ghost text
  tr.setMeta(ghostTextPluginKey, { suggestion: '', position: null });
  
  dispatch(tr);
  
  return suggestion;
}

/**
 * Gets the current ghost text state
 */
export function getGhostTextState(view: any): GhostTextState | null {
  if (!view?.state) return null;
  return ghostTextPluginKey.getState(view.state) || null;
}
