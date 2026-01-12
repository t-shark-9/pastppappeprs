import React, { useEffect, useState, useRef, useCallback } from "react";
import { 
  useCreateBlockNote,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  DefaultReactSuggestionItem,
  useBlockNoteEditor,
  FormattingToolbarController,
  FormattingToolbar,
  getFormattingToolbarItems,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block, BlockNoteEditor as BNEditor, filterSuggestionItems, BlockNoteSchema, defaultBlockSpecs, defaultInlineContentSpecs, defaultStyleSpecs, createBlockSpec } from "@blocknote/core";
import { Image, FileText, BookOpen, List, Sigma, Atom, Sparkles, X, Quote, Type, BarChart3, FunctionSquare } from "lucide-react";
import { createReactStyleSpec } from "@blocknote/react";
import { handleDefineCommand, handleExplainCommand, handleSynonymCommand, handleRephraseCommand, handleGrammarCommand } from "@/lib/blocknote-ai-commands";
import { toast } from "sonner";
import { CitationModal } from "@/components/editor/CitationModal";
import { Citation, CitationStyle, formatInlineCitation } from "@/lib/citation-formatter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartDialog } from "./ChartDialog";
import { inlineMathBlockSpec, blockMathBlockSpec, inlineMathInlineSpec } from "@/lib/mathBlockSpec";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import * as Y from 'yjs';
import { useTextAutocomplete } from "@/hooks/use-text-autocomplete";
import { useInlineGhostText } from "@/hooks/use-inline-ghost-text";
import { useAutocorrect } from "@/hooks/use-autocorrect";
import { AutocorrectDropdown } from "@/components/editor/AutocorrectDropdown";
import { NotesSearchDialog } from "@/components/editor/NotesSearchDialog";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";

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
  // Comment callback - called when user wants to add a comment to selected text
  onAddComment?: (blockId: string, quotedText: string) => void;
  // Selection change callback - called when user selects text
  onSelectionChange?: (blockId: string | null, selectedText: string | null) => void;
  // Block to highlight (for comment click navigation)
  highlightBlockId?: string | null;
}

// Custom page break block spec
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
      container.setAttribute("data-content-type", "pageBreak");
      
      // Create end-of-page marker (bottom margin of ending page)
      const endPage = document.createElement("div");
      endPage.className = "page-end-marker";
      
      // Create void gap (gray space between pages)
      const voidGap = document.createElement("div");
      voidGap.className = "page-void-gap";
      const label = document.createElement("span");
      label.textContent = "Page Break — Experimental Feature";
      label.className = "page-break-label";
      voidGap.appendChild(label);
      
      // Create start-of-page marker (top margin of new page)
      const startPage = document.createElement("div");
      startPage.className = "page-start-marker";
      
      container.appendChild(endPage);
      container.appendChild(voidGap);
      container.appendChild(startPage);
      
      return { dom: container };
    },
  }
);

// Convert HTML string to BlockNote blocks
function htmlToBlocks(html: string): Block[] {
  if (!html || html.trim() === "") {
    return [{ type: "paragraph", content: [] }] as Block[];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: Block[] = [];

  const processNode = (node: Node): Block | null => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        return {
          type: "paragraph",
          content: [{ type: "text", text, styles: {} }],
        } as Block;
      }
      return null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      if (tagName === "h1") {
        return {
          type: "heading",
          props: { level: 1 },
          content: [{ type: "text", text: element.textContent || "", styles: {} }],
        } as Block;
      } else if (tagName === "h2") {
        return {
          type: "heading",
          props: { level: 2 },
          content: [{ type: "text", text: element.textContent || "", styles: {} }],
        } as Block;
      } else if (tagName === "h3") {
        return {
          type: "heading",
          props: { level: 3 },
          content: [{ type: "text", text: element.textContent || "", styles: {} }],
        } as Block;
      } else if (tagName === "p") {
        const content: any[] = [];
        const text = element.textContent || "";
        if (text.trim()) {
          content.push({ type: "text", text, styles: {} });
        }
        return {
          type: "paragraph",
          content,
        } as Block;
      } else if (tagName === "blockquote") {
        const content: any[] = [];
        const text = element.textContent || "";
        if (text.trim()) {
          content.push({ type: "text", text, styles: {} });
        }
        return {
          type: "quote",
          content,
        } as Block;
      } else if (tagName === "img") {
        return {
          type: "image",
          props: {
            url: element.getAttribute("src") || "",
            caption: element.getAttribute("alt") || "",
          },
        } as Block;
      }
    }

    return null;
  };

  const children = doc.body.childNodes;
  for (let i = 0; i < children.length; i++) {
    const block = processNode(children[i]);
    if (block) {
      blocks.push(block);
    }
  }

  return blocks.length > 0 ? blocks : [{ type: "paragraph", content: [] } as Block];
}

// Convert BlockNote blocks to HTML
function blocksToHTML(blocks: Block[]): string {
  let html = "";

  blocks.forEach((block: any) => {
    if (block.type === "heading") {
      const level = block.props?.level || 1;
      html += `<h${level}>`;
      if (block.content) {
        block.content.forEach((content: any) => {
          html += content.text || "";
        });
      }
      html += `</h${level}>`;
    } else if (block.type === "paragraph") {
      html += "<p>";
      if (block.content) {
        block.content.forEach((content: any) => {
          let text = content.text || "";
          if (content.styles?.bold) text = `<strong>${text}</strong>`;
          if (content.styles?.italic) text = `<em>${text}</em>`;
          if (content.styles?.underline) text = `<u>${text}</u>`;
          if (content.styles?.strike) text = `<s>${text}</s>`;
          html += text;
        });
      }
      html += "</p>";
    } else if (block.type === "quote") {
      html += "<blockquote>";
      if (block.content) {
        block.content.forEach((content: any) => {
          let text = content.text || "";
          if (content.styles?.bold) text = `<strong>${text}</strong>`;
          if (content.styles?.italic) text = `<em>${text}</em>`;
          if (content.styles?.underline) text = `<u>${text}</u>`;
          if (content.styles?.strike) text = `<s>${text}</s>`;
          html += text;
        });
      }
      html += "</blockquote>";
    } else if (block.type === "bulletListItem") {
      html += "<ul><li>";
      if (block.content) {
        block.content.forEach((content: any) => {
          html += content.text || "";
        });
      }
      html += "</li></ul>";
    } else if (block.type === "numberedListItem") {
      html += "<ol><li>";
      if (block.content) {
        block.content.forEach((content: any) => {
          html += content.text || "";
        });
      }
      html += "</li></ol>";
    } else if (block.type === "image") {
      html += `<img src="${block.props?.url || ""}" alt="${block.props?.caption || ""}" />`;
    } else if (block.type === "table") {
      html += "<table>";
      // Table handling would go here
      html += "</table>";
    }
  });

  return html;
}


export function BlockNoteEditor({
  initialContent,
  onChange,
  placeholder,
  title,
  onTitleChange,
  onEditorReady,
  onPageCountChange,
  disablePagination = false,
  onAICommandsReady,
  userContext,
  collaboration,
  onAddComment,
  onSelectionChange,
  highlightBlockId,
}: BlockNoteEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [isAIStreaming, setIsAIStreaming] = useState(false);
  const [isDrawingDialogOpen, setIsDrawingDialogOpen] = useState(false);
  const [isMoleculeDialogOpen, setIsMoleculeDialogOpen] = useState(false);
  const [pendingEditor, setPendingEditor] = useState<BNEditor | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [pageBoundaries, setPageBoundaries] = useState<number[]>([]);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<BNEditor | null>(null);
  const [blockFeedback, setBlockFeedback] = useState<Record<string, { feedback: string; loading: boolean }>>({});
  const [explainBubble, setExplainBubble] = useState<{
    visible: boolean;
    text: string;
    loading: boolean;
    position: { x: number; y: number };
    originalText: string;
  } | null>(null);
  const [isCitationModalOpen, setIsCitationModalOpen] = useState(false);
  
  // Chart dialog state
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [chartInitialData, setChartInitialData] = useState<string | undefined>(undefined);
  const [chartInitialTitle, setChartInitialTitle] = useState<string | undefined>(undefined);
  
  // State for tracking which block is being edited (for double-click edit functionality)
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  
  // Table selector state for "Chart from Table" feature
  const [tableSelectDialogOpen, setTableSelectDialogOpen] = useState(false);
  const [availableTables, setAvailableTables] = useState<{ id: string; preview: string; blockIndex: number; block: any }[]>([]);
  
  // Notes search dialog state
  const [notesSearchOpen, setNotesSearchOpen] = useState(false);

  // Autocomplete state (phrase/word completion - non-AI)
  const autocompleteEnabled = localStorage.getItem('tooessay-autocomplete-enabled') !== 'false'; // enabled by default
  const { 
    suggestion, 
    isLoading: isAutocompleteLoading, 
    requestSuggestion, 
    acceptSuggestion: acceptAISuggestion, 
    clearSuggestion 
  } = useTextAutocomplete({ 
    enabled: autocompleteEnabled,
    minChars: 3,
  });

  // Autocorrect state (spelling suggestions with Fuse.js)
  const autocorrectEnabled = localStorage.getItem('tooessay-autocorrect-enabled') !== 'false'; // enabled by default
  const {
    isOpen: isAutocorrectOpen,
    suggestions: autocorrectSuggestions,
    selectedIndex: autocorrectSelectedIndex,
    position: autocorrectPosition,
    currentWord: autocorrectCurrentWord,
    showSuggestions: showAutocorrectSuggestions,
    closeSuggestions: closeAutocorrect,
    selectNext: selectNextAutocorrect,
    selectPrevious: selectPreviousAutocorrect,
    acceptSuggestion: acceptAutocorrectSuggestion,
    getSuggestions: getAutocorrectSuggestions,
  } = useAutocorrect({
    enabled: autocorrectEnabled,
    threshold: 0.4,
    maxSuggestions: 5,
    minWordLength: 3,
  });

  // Track the word being typed for autocorrect
  const lastTypedWordRef = useRef<{ word: string; startOffset: number; endOffset: number } | null>(null);

  // Inline ghost text management - will be initialized after editor is ready
  const [editorReady, setEditorReady] = useState(false);

  // Feature flags for toolbar visibility
  const { flags } = useFeatureFlags();

  // Helper functions to handle AI commands from toolbar with selected text
  const handleDefineCommandFromToolbar = async (selectedText: string) => {
    const allBlocks = editor!.document;
    const context = allBlocks
      .map((block: any) =>
        Array.isArray(block.content)
          ? block.content.map((c: any) => c.text || "").join("")
          : ""
      )
      .join("\n");

    setIsAIStreaming(true);
    await handleDefineCommand(selectedText, context, (text: string) => {
      editor!.insertInlineContent([
        { type: "text", text: ` (${text})`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };

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

    const allBlocks = editor!.document;
    const context = allBlocks
      .map((block: any) =>
        Array.isArray(block.content)
          ? block.content.map((c: any) => c.text || "").join("")
          : ""
      )
      .join("\n");

    setIsAIStreaming(true);
    let accumulatedText = '';
    await handleExplainCommand(selectedText, context, (text: string) => {
      accumulatedText = text;
      setExplainBubble(prev => prev ? { ...prev, text: accumulatedText, loading: false } : null);
    });
    setIsAIStreaming(false);
  };

  const handleSynonymCommandFromToolbar = async (selectedText: string) => {
    const allBlocks = editor!.document;
    const context = allBlocks
      .map((block: any) =>
        Array.isArray(block.content)
          ? block.content.map((c: any) => c.text || "").join("")
          : ""
      )
      .join("\n");

    setIsAIStreaming(true);
    await handleSynonymCommand(selectedText, context, (text: string) => {
      editor!.insertInlineContent([
        { type: "text", text: ` (${text})`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };

  const handleRephraseCommandFromToolbar = async (selectedText: string) => {
    const allBlocks = editor!.document;
    const context = allBlocks
      .map((block: any) =>
        Array.isArray(block.content)
          ? block.content.map((c: any) => c.text || "").join("")
          : ""
      )
      .join("\n");

    setIsAIStreaming(true);
    await handleRephraseCommand(selectedText, context, (text: string) => {
      editor!.insertInlineContent([
        { type: "text", text: ` ${text}`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };

  const handleGrammarCommandFromToolbar = async (selectedText: string) => {
    const allBlocks = editor!.document;
    const context = allBlocks
      .map((block: any) =>
        Array.isArray(block.content)
          ? block.content.map((c: any) => c.text || "").join("")
          : ""
      )
      .join("\n");

    setIsAIStreaming(true);
    await handleGrammarCommand(selectedText, context, (text: string) => {
      editor!.insertInlineContent([
        { type: "text", text: ` ${text}`, styles: { italic: true } }
      ]);
    });
    setIsAIStreaming(false);
  };

  // Handle command execution from standing toolbar
  const handleCommand = (commandName: string, selectedText?: string) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const currentBlock = editor.getTextCursorPosition().block;
    
    // For AI commands that require selected text, use the provided selectedText or get it from editor
    const textToProcess = selectedText || editor.getSelectedText();
    
    switch (commandName) {
      case 'heading1':
        editor.updateBlock(currentBlock, { type: "heading", props: { level: 1 } });
        break;
      case 'heading2':
        editor.updateBlock(currentBlock, { type: "heading", props: { level: 2 } });
        break;
      case 'heading3':
        editor.updateBlock(currentBlock, { type: "heading", props: { level: 3 } });
        break;
      case 'paragraph':
        editor.updateBlock(currentBlock, { type: "paragraph" });
        break;
      case 'bulletList':
        editor.updateBlock(currentBlock, { type: "bulletListItem" });
        break;
      case 'numberedList':
        editor.updateBlock(currentBlock, { type: "numberedListItem" });
        break;
      case 'checkList':
        editor.updateBlock(currentBlock, { type: "checkListItem" });
        break;
      case 'blockMath':
        blockMathItem(editor).onItemClick();
        break;
      case 'inlineMath':
        inlineMathItem(editor).onItemClick();
        break;
      case 'inlineMathInline':
        inlineMathInlineItem(editor).onItemClick();
        break;
      case 'uploadImage':
        editor.insertBlocks([{ type: "image", props: { url: "", caption: "" } }], currentBlock, "after");
        break;
      case 'drawing':
        setIsDrawingDialogOpen(true);
        setPendingEditor(editor);
        break;
      case 'molecule':
        setIsMoleculeDialogOpen(true);
        setPendingEditor(editor);
        break;
      case 'define':
        if (textToProcess) {
          handleDefineCommandFromToolbar(textToProcess);
        } else {
          toast.error('Please select some text to define');
        }
        break;
      case 'explain':
        if (textToProcess) {
          handleExplainCommandFromToolbar(textToProcess);
        } else {
          toast.error('Please select some text to explain');
        }
        break;
      case 'synonym':
        if (textToProcess) {
          handleSynonymCommandFromToolbar(textToProcess);
        } else {
          toast.error('Please select some text to find synonyms');
        }
        break;
      case 'rephrase':
        if (textToProcess) {
          handleRephraseCommandFromToolbar(textToProcess);
        } else {
          toast.error('Please select some text to rephrase');
        }
        break;
      case 'grammar':
        if (textToProcess) {
          handleGrammarCommandFromToolbar(textToProcess);
        } else {
          toast.error('Please select some text to check grammar');
        }
        break;
      case 'feedback':
        feedbackItem(editor).onItemClick();
        break;
      case 'titlePage':
        titlePageItem(editor).onItemClick();
        break;
      case 'toc':
        tocItem(editor).onItemClick();
        break;
      case 'bibliography':
        bibliographyItem(editor).onItemClick();
        break;
      case 'citation':
        setIsCitationModalOpen(true);
        break;
      case 'bold':
        editor.toggleStyles({ bold: true });
        break;
      case 'italic':
        editor.toggleStyles({ italic: true });
        break;
      case 'underline':
        editor.toggleStyles({ underline: true });
        break;
      case 'strikethrough':
        editor.toggleStyles({ strike: true });
        break;
      case 'code':
        editor.toggleStyles({ code: true });
        break;
      case 'subscript':
        // Subscript not in default schema, skip or use custom style
        break;
      case 'superscript':
        // Superscript not in default schema, skip or use custom style
        break;
      case 'textColor':
        editor.toggleStyles({ textColor: "red" });
        break;
      case 'backgroundColor':
        editor.toggleStyles({ backgroundColor: "yellow" });
        break;
      case 'fontSans':
        const editorElement = document.querySelector('.bn-editor');
        if (editorElement) {
          (editorElement as HTMLElement).style.setProperty('--bn-font-family', 'ui-sans-serif, system-ui, sans-serif');
        }
        break;
      case 'fontSerif':
        const editorElementSerif = document.querySelector('.bn-editor');
        if (editorElementSerif) {
          (editorElementSerif as HTMLElement).style.setProperty('--bn-font-family', 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif');
        }
        break;
      case 'comment':
        // Trigger comment for selected text
        if (onAddComment) {
          const currentBlock = editor.getTextCursorPosition().block;
          const selectedText = editor.getSelectedText() || '';
          if (selectedText.trim()) {
            onAddComment(currentBlock.id, selectedText);
          } else {
            // No selection, comment on the whole block
            const blockContent = Array.isArray(currentBlock.content) 
              ? currentBlock.content.map((c: any) => c.text || '').join('')
              : '';
            if (blockContent.trim()) {
              onAddComment(currentBlock.id, blockContent.slice(0, 100));
            } else {
              toast.error('Please select some text or write content to comment on');
            }
          }
        } else {
          toast.error('Comments are not available');
        }
        break;
      default:
        console.warn('Unknown command:', commandName);
    }
  };



  // Convert initial HTML content to blocks, or use blocks directly if provided
  // If no content, create 5 empty blocks so the editor feels ready to use
  const defaultEmptyBlocks: Block[] = [
    { type: "paragraph", content: [] },
    { type: "paragraph", content: [] },
    { type: "paragraph", content: [] },
    { type: "paragraph", content: [] },
    { type: "paragraph", content: [] },
  ] as Block[];
  
  const initialBlocks = initialContent 
    ? (Array.isArray(initialContent) ? initialContent : htmlToBlocks(initialContent))
    : defaultEmptyBlocks;

  // Handler for per-block AI feedback
  const handleBlockEvaluate = async (blockId: string) => {
    const block = editor?.getBlock(blockId);
    if (!block) return;

    const blockText = await editor!.blocksToHTMLLossy([block]);
    const plainText = blockText.replace(/<[^>]*>/g, '').trim();
    
    if (!plainText || plainText.length < 10) {
      toast.error("Please write more content before requesting feedback");
      return;
    }

    setBlockFeedback(prev => ({ ...prev, [blockId]: { feedback: '', loading: true } }));

    try {
      const { data, error } = await supabase.functions.invoke('evaluate-block', {
        body: { 
          content: plainText,
          schoolProgram: userContext?.schoolProgram,
          subject: userContext?.subject,
          taskType: userContext?.taskType
        }
      });

      if (error) throw error;

      setBlockFeedback(prev => ({ 
        ...prev, 
        [blockId]: { feedback: data.feedback, loading: false } 
      }));
      toast.success("AI feedback received");
    } catch (error) {
      console.error('Error evaluating block:', error);
      toast.error("Failed to get feedback");
      setBlockFeedback(prev => {
        const newState = { ...prev };
        delete newState[blockId];
        return newState;
      });
    }
  };

  const closeFeedback = (blockId: string) => {
    setBlockFeedback(prev => {
      const newState = { ...prev };
      delete newState[blockId];
      return newState;
    });
  };

  // Handle messages from drawing and molecule editor iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "drawing-insert" && event.data.imageData) {
        if (pendingEditor) {
          // Insert the image as a block
          pendingEditor.insertBlocks(
            [
              {
                type: "image",
                props: {
                  url: event.data.imageData,
                  caption: "Drawing",
                },
              } as Block,
            ],
            pendingEditor.getTextCursorPosition().block,
            "after"
          );
          toast.success("Drawing inserted!");
        }
        setIsDrawingDialogOpen(false);
        setPendingEditor(null);
      }
      
      if (event.data?.type === "molecule-insert" && event.data.imageData) {
        const targetEditor = pendingEditor || editorRef.current;
        if (targetEditor) {
          if (editingBlockId) {
            // Editing existing molecule - replace the block
            try {
              targetEditor.updateBlock(editingBlockId, {
                type: "image",
                props: {
                  url: event.data.imageData,
                  caption: "Molecule",
                },
              } as any);
              toast.success("Molecule updated!");
            } catch (error) {
              console.error("Failed to update molecule block:", error);
              toast.error("Failed to update molecule");
            }
          } else {
            // Insert new molecule
            targetEditor.insertBlocks(
              [
                {
                  type: "image",
                  props: {
                    url: event.data.imageData,
                    caption: "Molecule",
                  },
                } as Block,
              ],
              targetEditor.getTextCursorPosition().block,
              "after"
            );
            toast.success("Molecule inserted!");
          }
        }
        setIsMoleculeDialogOpen(false);
        setPendingEditor(null);
        setEditingBlockId(null);
      }
      
      // Handle dialog open requests from FormattingToolbar
      if (event.data?.type === "open-drawing-dialog") {
        if (editorRef.current) {
          setPendingEditor(editorRef.current);
          setIsDrawingDialogOpen(true);
        }
      }
      
      if (event.data?.type === "open-molecule-dialog") {
        if (editorRef.current) {
          setPendingEditor(editorRef.current);
          setIsMoleculeDialogOpen(true);
        }
      }
      
      if (event.data?.type === "open-citation-dialog") {
        setIsCitationModalOpen(true);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [pendingEditor]);

  // Selection tracking and highlight effects are moved to after editor creation (see below)

  // Custom slash menu item for drawing
  const insertDrawingItem = (editor: BNEditor) => ({
    title: "Drawing",
    onItemClick: () => {
      setPendingEditor(editor);
      setIsDrawingDialogOpen(true);
    },
    aliases: ["draw", "sketch", "illustration"],
    group: "Media",
    icon: <Image size={18} />,
    subtext: "Insert a drawing from the illustration editor",
  });

  // Custom slash menu item for molecule
  const insertMoleculeItem = (editor: BNEditor) => ({
    title: "Molecule",
    onItemClick: () => {
      setPendingEditor(editor);
      setIsMoleculeDialogOpen(true);
    },
    aliases: ["molecule", "chemistry", "compound", "structure"],
    group: "Media",
    icon: <Atom size={18} />,
    subtext: "Insert a 2D molecular structure",
  });

  // Custom AI command: Define
  const defineItem = (editor: BNEditor) => ({
    title: "Define",
    onItemClick: async () => {
      let textToDefine = editor.getSelectedText();
      
      // If no selection, extract the sentence before the cursor
      if (!textToDefine) {
        const currentBlock = editor.getTextCursorPosition().block;
        const content = currentBlock.content as any;
        
        if (Array.isArray(content)) {
          const blockText = content.map((c: any) => c.text || "").join("") || "";
          // Remove the trailing "/" if present
          const cleanText = blockText.replace(/\/$/, "").trim();
          
          if (!cleanText) {
            toast.error("No text found to define");
            return;
          }
          
          textToDefine = cleanText;
        } else {
          toast.error("No text found to define");
          return;
        }
      }

      const allBlocks = editor.document;
      const context = allBlocks
        .map((block: any) =>
          Array.isArray(block.content)
            ? block.content.map((c: any) => c.text || "").join("")
            : ""
        )
        .join("\n");

      setIsAIStreaming(true);
      await handleDefineCommand(textToDefine, context, (text: string) => {
        editor.insertInlineContent([
          { type: "text", text: ` (${text})`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["define", "definition", "meaning"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Get a 1-sentence definition using AI",
  });

  // Custom AI command: Explain
  const explainItem = (editor: BNEditor) => ({
    title: "Explain",
    onItemClick: async () => {
      let textToExplain = editor.getSelectedText();
      
      // If no selection, extract the sentence before the cursor
      if (!textToExplain) {
        const currentBlock = editor.getTextCursorPosition().block;
        const content = currentBlock.content as any;
        
        if (Array.isArray(content)) {
          const blockText = content.map((c: any) => c.text || "").join("") || "";
          // Remove the trailing "/" if present
          const cleanText = blockText.replace(/\/$/, "").trim();
          
          if (!cleanText) {
            toast.error("No text found to explain");
            return;
          }
          
          textToExplain = cleanText;
        } else {
          toast.error("No text found to explain");
          return;
        }
      }

      // Get cursor position for bubble placement
      const selection = window.getSelection();
      let position = { x: window.innerWidth / 2, y: 300 };
      
      try {
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          if (rect && rect.bottom > 0) {
            // Position below the selection with some padding
            position = { 
              x: rect.left + rect.width / 2, 
              y: rect.bottom + 20 
            };
          }
        }
      } catch (e) {
        // Fallback to editor center if selection fails
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
        originalText: textToExplain
      });

      const allBlocks = editor.document;
      const context = allBlocks
        .map((block: any) =>
          Array.isArray(block.content)
            ? block.content.map((c: any) => c.text || "").join("")
            : ""
        )
        .join("\n");

      setIsAIStreaming(true);
      let accumulatedText = '';
      await handleExplainCommand(textToExplain, context, (text: string) => {
        accumulatedText = text;
        setExplainBubble(prev => prev ? { ...prev, text: accumulatedText, loading: false } : null);
      });
      setIsAIStreaming(false);
    },
    aliases: ["explain", "explanation", "clarify"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Get an explanation using AI in a chat bubble",
  });

  // Custom AI command: Synonym
  const synonymItem = (editor: BNEditor) => ({
    title: "Synonym",
    onItemClick: async () => {
      let textForSynonym = editor.getSelectedText();
      
      // If no selection, extract the word/phrase before the cursor
      if (!textForSynonym) {
        const currentBlock = editor.getTextCursorPosition().block;
        const content = currentBlock.content as any;
        
        if (Array.isArray(content)) {
          const blockText = content.map((c: any) => c.text || "").join("") || "";
          // Remove the trailing "/" if present
          const cleanText = blockText.replace(/\/$/, "").trim();
          
          if (!cleanText) {
            toast.error("No text found for synonyms");
            return;
          }
          
          textForSynonym = cleanText;
        } else {
          toast.error("No text found for synonyms");
          return;
        }
      }

      const allBlocks = editor.document;
      const context = allBlocks
        .map((block: any) =>
          Array.isArray(block.content)
            ? block.content.map((c: any) => c.text || "").join("")
            : ""
        )
        .join("\n");

      setIsAIStreaming(true);
      await handleSynonymCommand(textForSynonym, context, (text: string) => {
        editor.insertInlineContent([
          { type: "text", text: ` (${text})`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["synonym", "synonyms", "alternative"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Get synonym suggestions using AI",
  });

  // Custom AI command: Rephrase
  const rephraseItem = (editor: BNEditor) => ({
    title: "Rephrase",
    onItemClick: async () => {
      let textToRephrase = editor.getSelectedText();
      
      // If no selection, extract the sentence before the cursor
      if (!textToRephrase) {
        const currentBlock = editor.getTextCursorPosition().block;
        const content = currentBlock.content as any;
        
        if (Array.isArray(content)) {
          const blockText = content.map((c: any) => c.text || "").join("") || "";
          // Remove the trailing "/" if present
          const cleanText = blockText.replace(/\/$/, "").trim();
          
          if (!cleanText) {
            toast.error("No text found to rephrase");
            return;
          }
          
          textToRephrase = cleanText;
        } else {
          toast.error("No text found to rephrase");
          return;
        }
      }

      const allBlocks = editor.document;
      const context = allBlocks
        .map((block: any) =>
          Array.isArray(block.content)
            ? block.content.map((c: any) => c.text || "").join("")
            : ""
        )
        .join("\n");

      setIsAIStreaming(true);
      await handleRephraseCommand(textToRephrase, context, (text: string) => {
        editor.insertInlineContent([
          { type: "text", text: ` ${text}`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["rephrase", "reword", "rewrite"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Rephrase the text using AI",
  });

  // Custom AI command: Grammar
  const grammarItem = (editor: BNEditor) => ({
    title: "Grammar",
    onItemClick: async () => {
      let textToCorrect = editor.getSelectedText();
      
      // If no selection, extract the sentence before the cursor
      if (!textToCorrect) {
        const currentBlock = editor.getTextCursorPosition().block;
        const content = currentBlock.content as any;
        
        if (Array.isArray(content)) {
          const blockText = content.map((c: any) => c.text || "").join("") || "";
          // Remove the trailing "/" if present
          const cleanText = blockText.replace(/\/$/, "").trim();
          
          if (!cleanText) {
            toast.error("No text found to correct");
            return;
          }
          
          textToCorrect = cleanText;
        } else {
          toast.error("No text found to correct");
          return;
        }
      }

      const allBlocks = editor.document;
      const context = allBlocks
        .map((block: any) =>
          Array.isArray(block.content)
            ? block.content.map((c: any) => c.text || "").join("")
            : ""
        )
        .join("\n");

      setIsAIStreaming(true);
      await handleGrammarCommand(textToCorrect, context, (text: string) => {
        editor.insertInlineContent([
          { type: "text", text: ` ${text}`, styles: { italic: true } }
        ]);
      });
      setIsAIStreaming(false);
    },
    aliases: ["grammar", "correct", "fix grammar"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Correct grammar using AI",
  });

  // Custom command: Title Page
  const titlePageItem = (editor: BNEditor) => ({
    title: "Title Page",
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.insertBlocks(
        [
          {
            type: "heading",
            props: { level: 1, textAlignment: "center" },
            content: [{ type: "text", text: "Document Title", styles: {} }],
          } as Block,
          {
            type: "paragraph",
            props: { textAlignment: "center" },
            content: [{ type: "text", text: "Author Name", styles: {} }],
          } as Block,
          {
            type: "paragraph",
            props: { textAlignment: "center" },
            content: [{ type: "text", text: new Date().toLocaleDateString(), styles: {} }],
          } as Block,
          {
            type: "paragraph",
            content: [],
          } as Block,
        ],
        currentBlock,
        "after"
      );
      toast.success("Title page inserted");
    },
    aliases: ["title", "titlepage", "cover"],
    group: "Document",
    icon: <FileText size={18} />,
    subtext: "Insert a formatted title page",
  });

  // Custom command: Table of Contents
  const tocItem = (editor: BNEditor) => ({
    title: "Table of Contents",
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      const allBlocks = editor.document;
      
      // Extract all headings
      const headings = allBlocks.filter((block: any) => block.type === "heading");
      
      const tocBlocks: Block[] = [
        {
          type: "heading",
          props: { level: 2 },
          content: [{ type: "text", text: "Table of Contents", styles: { bold: true } }],
        } as Block,
      ];

      headings.forEach((heading: any) => {
        const level = heading.props?.level || 1;
        const text = heading.content?.map((c: any) => c.text || "").join("") || "Untitled";
        const indent = "  ".repeat(level - 1);
        
        tocBlocks.push({
          type: "paragraph",
          content: [{ type: "text", text: `${indent}${text}`, styles: {} }],
        } as Block);
      });

      tocBlocks.push({
        type: "paragraph",
        content: [],
      } as Block);

      editor.insertBlocks(tocBlocks, currentBlock, "after");
      toast.success("Table of contents generated");
    },
    aliases: ["toc", "contents", "index"],
    group: "Document",
    icon: <List size={18} />,
    subtext: "Generate table of contents from headings",
  });

  // Custom command: Bibliography
  const bibliographyItem = (editor: BNEditor) => ({
    title: "Bibliography",
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.insertBlocks(
        [
          {
            type: "heading",
            props: { level: 2 },
            content: [{ type: "text", text: "References", styles: { bold: true } }],
          } as Block,
          {
            type: "paragraph",
            content: [{ type: "text", text: "[1] Author, A. (Year). Title of work. Publisher.", styles: {} }],
          } as Block,
          {
            type: "paragraph",
            content: [{ type: "text", text: "[2] Author, B. (Year). Title of work. Publisher.", styles: {} }],
          } as Block,
          {
            type: "paragraph",
            content: [],
          } as Block,
        ],
        currentBlock,
        "after"
      );
      toast.success("Bibliography section inserted");
    },
    aliases: ["bib", "bibliography", "references", "works cited"],
    group: "Document",
    icon: <BookOpen size={18} />,
    subtext: "Insert bibliography/references section",
  });

  // Custom command: Citation
  const citationItem = (editor: BNEditor) => ({
    title: "Citation",
    onItemClick: () => {
      setIsCitationModalOpen(true);
    },
    aliases: ["cite", "citation", "reference", "source", "quote"],
    group: "Document",
    icon: <Quote size={18} />,
    subtext: "Add a citation/reference",
  });

  // Custom command: Inline Math
  const inlineMathItem = (editor: BNEditor) => ({
    title: "Math Block (Inline)",
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.insertBlocks(
        [
          {
            type: "inlineMath",
            props: {
              latex: "",
              mode: "inline",
              collapsed: false,
            },
          } as any,
        ],
        currentBlock,
        "after"
      );
      toast.success("Inline math block inserted");
    },
    aliases: ["inline math block", "inline equation block"],
    group: "Math",
    icon: <Sigma size={18} />,
    subtext: "Insert an inline math equation as a block",
  });

  // New true inline math that can be used within text
  const inlineMathInlineItem = (editor: BNEditor) => ({
    title: "Inline Math",
    onItemClick: () => {
      // Insert inline content at cursor position within the current paragraph
      (editor as any).insertInlineContent([
        {
          type: "inlineMathInline",
          props: {
            latex: "",
          },
        }
      ]);
      toast.success("Inline math inserted");
    },
    aliases: ["inline math", "inline equation", "inline formula", "math inline"],
    group: "Math",
    icon: <Sigma size={18} />,
    subtext: "Insert an inline math equation",
  });

  // Custom command: Block Math (renamed from "Block Math" to just "Math")
  const blockMathItem = (editor: BNEditor) => ({
    title: "Math",
    onItemClick: () => {
      const currentBlock = editor.getTextCursorPosition().block;
      editor.insertBlocks(
        [
          {
            type: "blockMath",
            props: {
              latex: "",
              mode: "block",
              collapsed: false,
            },
          } as any,
        ],
        currentBlock,
        "after"
      );
      toast.success("Math block inserted");
    },
    aliases: ["math", "equation", "latex", "formula", "block math", "display math"],
    group: "Insert",
    icon: <Sigma size={18} />,
    subtext: "Insert a math equation block",
  });

  // Custom command: Create new chart
  const chartItem = (editor: BNEditor) => ({
    title: "Chart",
    onItemClick: () => {
      setChartInitialData(undefined);
      setChartInitialTitle(undefined);
      setChartDialogOpen(true);
    },
    aliases: ["chart", "graph", "plot", "bar chart", "line chart", "pie chart"],
    group: "Insert",
    icon: <BarChart3 size={18} />,
    subtext: "Create a chart from data",
  });

  // Helper function to extract text from a table cell
  // Cells can be strings, arrays of inline content, or complex nested structures
  const extractCellText = (cell: any): string => {
    if (typeof cell === "string") {
      return cell;
    }
    if (Array.isArray(cell)) {
      return cell.map((item: any) => {
        if (typeof item === "string") return item;
        if (item?.text) return item.text;
        if (item?.content) return extractCellText(item.content);
        return "";
      }).join("");
    }
    if (cell?.text) return cell.text;
    if (cell?.content) return extractCellText(cell.content);
    return "";
  };

  // Helper function to extract CSV data from a table block
  const extractTableData = (tableBlock: any): string => {
    let csvData = "";
    const tableContent = tableBlock.content;
    
    // Handle both direct rows array and nested tableContent structure
    const rows = tableContent?.rows || (tableContent?.type === "tableContent" ? tableContent.rows : null);
    
    if (rows && Array.isArray(rows)) {
      rows.forEach((row: any, rowIndex: number) => {
        // Skip header row (first row) - it usually contains column names
        if (rowIndex === 0) return;
        
        if (row.cells && row.cells.length >= 2) {
          const label = extractCellText(row.cells[0]);
          const value = extractCellText(row.cells[1]);
          
          // Only add if we have a label and a numeric value
          if (label && value && !isNaN(parseFloat(value))) {
            csvData += `${label.trim()}, ${value.trim()}\n`;
          }
        }
      });
      
      // If no data rows found, try including the header row
      if (!csvData.trim() && rows.length > 0) {
        rows.forEach((row: any) => {
          if (row.cells && row.cells.length >= 2) {
            const label = extractCellText(row.cells[0]);
            const value = extractCellText(row.cells[1]);
            if (label && value && !isNaN(parseFloat(value))) {
              csvData += `${label.trim()}, ${value.trim()}\n`;
            }
          }
        });
      }
    }
    
    return csvData.trim();
  };

  // Helper function to get table preview text (first row or first few cells)
  const getTablePreview = (tableBlock: any): string => {
    const tableContent = tableBlock.content;
    const rows = tableContent?.rows || (tableContent?.type === "tableContent" ? tableContent.rows : null);
    
    if (rows && rows.length > 0 && rows[0].cells) {
      const headerCells = rows[0].cells.slice(0, 3).map((cell: any) => extractCellText(cell)).filter(Boolean);
      const preview = headerCells.join(" | ");
      return preview.length > 40 ? preview.substring(0, 40) + "..." : preview;
    }
    return "Table";
  };

  // Function to handle table selection for chart creation
  const handleTableSelect = (tableBlock: any) => {
    const csvData = extractTableData(tableBlock);
    
    if (csvData) {
      setChartInitialData(csvData);
      setChartInitialTitle("Chart from Table");
      setChartDialogOpen(true);
      toast.success("Table data extracted! Customize your chart.");
    } else {
      setChartInitialData(undefined);
      setChartInitialTitle("Chart from Table");
      setChartDialogOpen(true);
      toast.info("Could not extract numeric data from table. Enter data manually.");
    }
    setTableSelectDialogOpen(false);
  };

  // Custom command: Create chart from table (extracts data from table blocks)
  const chartFromTableItem = (editor: BNEditor) => ({
    title: "Chart from Table",
    onItemClick: () => {
      // Try to find a table block in the document to extract data from
      const allBlocks = editor.document;
      
      // Find table blocks
      const tableBlocks = allBlocks.filter((block: any) => block.type === "table");
      
      if (tableBlocks.length === 0) {
        // No tables found, just open chart dialog
        setChartInitialData(undefined);
        setChartInitialTitle("Chart from Table");
        setChartDialogOpen(true);
        toast.info("No tables found. Create a chart with manual data entry.");
        return;
      }
      
      // If only one table, use it directly
      if (tableBlocks.length === 1) {
        handleTableSelect(tableBlocks[0]);
        return;
      }
      
      // Multiple tables found - show selector dialog
      const tables = tableBlocks.map((block: any, index: number) => ({
        id: block.id,
        preview: getTablePreview(block),
        blockIndex: index + 1,
        block: block
      }));
      setAvailableTables(tables);
      setTableSelectDialogOpen(true);
    },
    aliases: ["chart from table", "table to chart", "graph from table", "plot from table"],
    group: "Insert",
    icon: <BarChart3 size={18} />,
    subtext: "Generate chart from a table in the document",
  });

  // Custom command: AI Feedback for current block
  const feedbackItem = (editor: BNEditor) => ({
    title: "AI Feedback",
    onItemClick: async () => {
      const currentBlock = editor.getTextCursorPosition().block;
      
      if (!currentBlock || !currentBlock.id) {
        toast.error("No block selected");
        return;
      }

      await handleBlockEvaluate(currentBlock.id);
    },
    aliases: ["feedback", "evaluate", "review", "assess"],
    group: "AI",
    icon: <Sparkles size={18} />,
    subtext: "Get AI feedback on this paragraph",
  });

  // Custom AI command: Convert text to LaTeX and insert into math block
  const latexItem = (editor: BNEditor) => ({
    title: "LaTeX",
    onItemClick: async () => {
      const currentBlock = editor.getTextCursorPosition().block;
      const content = currentBlock.content as any;
      
      let textToConvert = "";
      if (Array.isArray(content)) {
        textToConvert = content.map((c: any) => c.text || "").join("") || "";
        // Remove the trailing "/" or "/latex" if present
        textToConvert = textToConvert.replace(/\/?latex?\s*$/i, "").trim();
      }
      
      if (!textToConvert) {
        toast.error("No text found to convert to LaTeX");
        return;
      }
      
      setIsAIStreaming(true);
      
      try {
        const response = await fetch('/api/ai/latex', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: textToConvert }),
        });
        
        let latex = "";
        if (response.ok) {
          const data = await response.json();
          latex = data.latex || "";
        } else {
          // Fallback: try simple conversion for common patterns
          latex = textToConvert
            .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
            .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
            .replace(/\^(\d+)/g, '^{$1}')
            .replace(/_(\d+)/g, '_{$1}')
            .replace(/\*/g, '\\times ')
            .replace(/pi/gi, '\\pi ')
            .replace(/alpha/gi, '\\alpha ')
            .replace(/beta/gi, '\\beta ')
            .replace(/gamma/gi, '\\gamma ')
            .replace(/delta/gi, '\\delta ')
            .replace(/theta/gi, '\\theta ')
            .replace(/sum/gi, '\\sum ')
            .replace(/int/gi, '\\int ')
            .replace(/infinity/gi, '\\infty ');
        }
        
        // Remove the original block and insert a math block
        editor.removeBlocks([currentBlock]);
        editor.insertBlocks(
          [
            {
              type: "blockMath",
              props: {
                latex: latex || textToConvert,
                mode: "block",
                collapsed: false,
              },
            } as any,
          ],
          editor.getTextCursorPosition().block,
          "after"
        );
        
        toast.success("Converted to LaTeX and inserted as math block");
      } catch (error) {
        console.error('LaTeX conversion error:', error);
        // Still insert the original text as a math block
        editor.removeBlocks([currentBlock]);
        editor.insertBlocks(
          [
            {
              type: "blockMath",
              props: {
                latex: textToConvert,
                mode: "block",
                collapsed: false,
              },
            } as any,
          ],
          editor.getTextCursorPosition().block,
          "after"
        );
        toast.success("Inserted as math block");
      }
      
      setIsAIStreaming(false);
    },
    aliases: ["latex", "tex", "convert to math", "convert to latex"],
    group: "AI",
    icon: <Sigma size={18} />,
    subtext: "Convert current text to LaTeX math equation",
  });

  // Custom command: Search Notes
  const searchNotesItem = (editor: BNEditor) => ({
    title: "Search Notes",
    onItemClick: () => {
      setNotesSearchOpen(true);
    },
    aliases: ["search notes", "find notes", "notes", "lookup", "reference"],
    group: "Insert",
    icon: <BookOpen size={18} />,
    subtext: "Search and insert from your notes",
  });

  // Font family definitions
  const fonts = [
    { name: "Sans Serif", family: "ui-sans-serif, system-ui, sans-serif", aliases: ["sans", "sans-serif", "default font"] },
    { name: "Serif", family: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif", aliases: ["serif", "times", "georgia"] },
    { name: "Monospace", family: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", aliases: ["mono", "monospace", "code font", "courier"] },
    { name: "Comic Sans", family: "'Comic Sans MS', 'Comic Sans', cursive", aliases: ["comic", "comic sans", "fun font"] },
    { name: "Georgia", family: "Georgia, serif", aliases: ["georgia"] },
    { name: "Times New Roman", family: "'Times New Roman', Times, serif", aliases: ["times", "times new roman"] },
    { name: "Arial", family: "Arial, Helvetica, sans-serif", aliases: ["arial", "helvetica"] },
    { name: "Courier New", family: "'Courier New', Courier, monospace", aliases: ["courier", "courier new"] },
  ];

  // Create font slash menu items
  const fontItems = fonts.map((font) => (editor: BNEditor) => ({
    title: `Font: ${font.name}`,
    onItemClick: () => {
      // Apply font to selected text or current block
      const selection = editor.getSelection();
      if (selection) {
        // There's text selected, wrap it with font styling
        const selectedBlocks = selection.blocks;
        selectedBlocks.forEach((block: any) => {
          if (block.content && Array.isArray(block.content)) {
            const newContent = block.content.map((item: any) => ({
              ...item,
              styles: { ...item.styles, fontFamily: font.family }
            }));
            editor.updateBlock(block, { content: newContent });
          }
        });
      } else {
        // Insert a styled paragraph
        const currentBlock = editor.getTextCursorPosition().block;
        editor.insertBlocks(
          [
            {
              type: "paragraph",
              content: [{ type: "text", text: `Type here in ${font.name}...`, styles: {} }],
              props: {},
            } as Block,
          ],
          currentBlock,
          "after"
        );
      }
      // Apply CSS variable for the editor
      const editorElement = document.querySelector('.bn-editor');
      if (editorElement) {
        (editorElement as HTMLElement).style.setProperty('--bn-font-family', font.family);
      }
      toast.success(`Font changed to ${font.name}`);
    },
    aliases: ["font", ...font.aliases],
    group: "Fonts",
    icon: <Type size={18} />,
    subtext: `Switch to ${font.name} font`,
  }));

  // Get custom slash menu items combining defaults with our custom commands
  const getCustomSlashMenuItems = (editor: BNEditor): DefaultReactSuggestionItem[] => [
    ...getDefaultReactSlashMenuItems(editor),
    insertDrawingItem(editor),
    insertMoleculeItem(editor),
    chartItem(editor),
    chartFromTableItem(editor),
    defineItem(editor),
    explainItem(editor),
    synonymItem(editor),
    rephraseItem(editor),
    grammarItem(editor),
    feedbackItem(editor),
    latexItem(editor),
    searchNotesItem(editor),
    titlePageItem(editor),
    tocItem(editor),
    bibliographyItem(editor),
    citationItem(editor),
    blockMathItem(editor),
    ...fontItems.map(fontItem => fontItem(editor)),
  ];

  // Custom styles for subscript and superscript
  const Subscript = createReactStyleSpec(
    {
      type: "subscript",
      propSchema: "boolean",
    },
    {
      render: (props) => <sub ref={props.contentRef}></sub>,
    }
  );

  const Superscript = createReactStyleSpec(
    {
      type: "superscript",
      propSchema: "boolean",
    },
    {
      render: (props) => <sup ref={props.contentRef}></sup>,
    }
  );

  // Custom schema with subscript, superscript, page break, and math blocks
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      inlineMath: inlineMathBlockSpec(),
      blockMath: blockMathBlockSpec(),
      pageBreak: pageBreakBlockSpec(),
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      inlineMathInline: inlineMathInlineSpec,
    },
    styleSpecs: {
      ...defaultStyleSpecs,
      subscript: Subscript,
      superscript: Superscript,
    },
  });

  // Create the editor with optional collaboration support
  const editor = useCreateBlockNote({
    schema,
    initialContent: collaboration ? undefined : initialBlocks,
    // Collaboration config - BlockNote uses Yjs internally
    collaboration: collaboration ? {
      fragment: collaboration.ydoc.getXmlFragment('document'),
      user: collaboration.user || { name: 'Anonymous', color: '#888888' },
      provider: collaboration.provider,
    } : undefined,
  }) as any;

  // Store editor in ref for command handler access
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Track text selection changes for comments
  useEffect(() => {
    if (!editor || !onSelectionChange) return;

    const handleSelectionChangeEvent = () => {
      try {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) {
          onSelectionChange(null, null);
          return;
        }

        const range = sel.getRangeAt(0);
        const editorContainer = document.querySelector('.bn-container');

        const commonNode = range.commonAncestorContainer;
        const commonEl = commonNode instanceof Element ? commonNode : commonNode.parentElement;

        if (!editorContainer || !commonEl || !editorContainer.contains(commonEl)) {
          onSelectionChange(null, null);
          return;
        }

        const blockEl = commonEl.closest('[data-node-type="blockContainer"][data-id]') as HTMLElement | null;
        const blockId = blockEl?.getAttribute('data-id') ?? null;

        if (!blockId) {
          onSelectionChange(null, null);
          return;
        }

        const selectedText = sel.toString();
        if (selectedText && selectedText.trim()) {
          onSelectionChange(blockId, selectedText);
        } else {
          onSelectionChange(blockId, null);
        }
      } catch {
        onSelectionChange(null, null);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChangeEvent);
    handleSelectionChangeEvent();
    return () => document.removeEventListener('selectionchange', handleSelectionChangeEvent);
  }, [editor, onSelectionChange]);

  // Highlight block when highlightBlockId changes
  useEffect(() => {
    if (!highlightBlockId || !editor) return;
    
    // Find and scroll to the block
    const blockElement = document.querySelector(
      `[data-node-type="blockContainer"][data-id="${highlightBlockId}"]`
    );
    if (blockElement) {
      blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      blockElement.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'rounded');
      setTimeout(() => {
        blockElement.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'rounded');
      }, 2000);
    }
  }, [highlightBlockId, editor]);

  // Expose AI command handlers to parent component
  useEffect(() => {
    if (editor && onAICommandsReady) {
      onAICommandsReady({
        define: handleDefineCommandFromToolbar,
        explain: handleExplainCommandFromToolbar,
        synonym: handleSynonymCommandFromToolbar,
        rephrase: handleRephraseCommandFromToolbar,
        grammar: handleGrammarCommandFromToolbar,
      });
    }
  }, [editor, onAICommandsReady]);

  // Calculate word count whenever content changes
  useEffect(() => {
    if (!editor) return;

    const updateWordCount = () => {
      const blocks = editor.document;
      let text = "";

      blocks.forEach((block: any) => {
        if (block.content && Array.isArray(block.content)) {
          block.content.forEach((content: any) => {
            if (content.text) {
              text += content.text + " ";
            }
          });
        }
      });

      const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
      setWordCount(words.length);
    };

    updateWordCount();

    // Subscribe to changes
    editor.onChange(updateWordCount);
  }, [editor]);

  // Notify parent when content changes
  useEffect(() => {
    if (!editor) return;

    const handleChange = () => {
      const blocks = editor.document;
      const html = blocksToHTML(blocks);
      if (onChange) {
        onChange(html);
      }
    };

    editor.onChange(handleChange);
  }, [editor, onChange]);

  // Notify parent when editor is ready
  useEffect(() => {
    if (editor && onEditorReady) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  // Handle autocomplete suggestions
  useEffect(() => {
    if (!editor || !autocompleteEnabled) return;

    const handleAutocomplete = () => {
      try {
        // Don't request new suggestions while one is visible/loading
        if (suggestion || isAutocompleteLoading) return;

        // Only run when the editor is actually focused and selection is a cursor
        const editorContainer = document.querySelector('.bn-container');
        const activeElement = document.activeElement;
        const sel = window.getSelection();
        const isCollapsed = !!sel && sel.rangeCount > 0 && sel.getRangeAt(0).collapsed;

        if (!editorContainer || !activeElement || !editorContainer.contains(activeElement) || !isCollapsed) {
          clearSuggestion();
          return;
        }

        const cursorPosition = editor.getTextCursorPosition();
        const currentBlock = cursorPosition.block;

        // Get text from current block
        const blockText = currentBlock.content
          ? currentBlock.content.map((c: any) => c.text || '').join('')
          : '';

        // Only trigger if we have some text and block is a paragraph
        if (blockText.trim().length < 3 || currentBlock.type !== 'paragraph') {
          clearSuggestion();
          return;
        }

        // Request suggestion (context not needed for phrase-based autocomplete)
        requestSuggestion(blockText);
      } catch (error) {
        console.error('Autocomplete error:', error);
      }
    };

    editor.onChange(handleAutocomplete);
  }, [editor, autocompleteEnabled, requestSuggestion, clearSuggestion, suggestion, isAutocompleteLoading]);

  // Handle autocorrect for misspelled words - only when clicking on a word
  useEffect(() => {
    if (!editor || !autocorrectEnabled) return;

    const handleClickAutocorrect = (e: MouseEvent) => {
      // Only handle left-click (button 0)
      if (e.button !== 0) return;
      
      // Close autocorrect if clicking elsewhere
      if (isAutocorrectOpen) {
        closeAutocorrect();
      }
      
      // Use setTimeout to let the selection settle after click
      setTimeout(() => {
        try {
          // Get the current selection
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return;

          const range = selection.getRangeAt(0);

          // Only proceed if cursor is collapsed (clicked, not selecting)
          if (!range.collapsed) return;

          // Get the text node and offset
          let textNode: Node | null = range.startContainer;
          let cursorPos = range.startOffset;
          
          if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return;

          const text = textNode.textContent || '';

          // Find the word at cursor position
          let wordStart = cursorPos;
          let wordEnd = cursorPos;
          
          // Expand backwards to find word start
          while (wordStart > 0 && /[a-zA-Z']/.test(text[wordStart - 1])) {
            wordStart--;
          }
          
          // Expand forwards to find word end
          while (wordEnd < text.length && /[a-zA-Z']/.test(text[wordEnd])) {
            wordEnd++;
          }

          const word = text.slice(wordStart, wordEnd);

          if (word.length >= 3) {
            const suggestions = getAutocorrectSuggestions(word);
            
            if (suggestions.length > 0) {
              // Store the word position for replacement
              lastTypedWordRef.current = { word, startOffset: wordStart, endOffset: wordEnd };

              // Show suggestions at click position
              showAutocorrectSuggestions(word, {
                top: e.clientY + 5,
                left: e.clientX,
              });
            }
          }
        } catch (error) {
          console.error('Autocorrect error:', error);
        }
      }, 10);
    };

    const editorElement = document.querySelector('.bn-editor');
    if (editorElement) {
      editorElement.addEventListener('click', handleClickAutocorrect as EventListener);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('click', handleClickAutocorrect as EventListener);
      }
    };
  }, [editor, autocorrectEnabled, isAutocorrectOpen, closeAutocorrect, getAutocorrectSuggestions, showAutocorrectSuggestions]);

  // Handle autocorrect word replacement
  const handleAutocorrectSelect = useCallback((correctedWord: string) => {
    if (!editor || !lastTypedWordRef.current) return;

    try {
      const cursorPosition = editor.getTextCursorPosition();
      const currentBlock = cursorPosition.block;

      if (!currentBlock.content) return;

      // Get the current block's text content
      const blockContent = currentBlock.content;
      let newContent: any[] = [];
      let replaced = false;

      // Rebuild the content with the corrected word
      for (const item of blockContent) {
        if (item.type === 'text' && !replaced && item.text) {
          const text = item.text as string;
          const { word, startOffset, endOffset } = lastTypedWordRef.current;
          
          // Check if this text segment contains the word to replace
          const wordIndex = text.indexOf(word);
          if (wordIndex !== -1) {
            const newText = text.slice(0, wordIndex) + correctedWord + text.slice(wordIndex + word.length);
            newContent.push({ ...item, text: newText });
            replaced = true;
          } else {
            newContent.push(item);
          }
        } else {
          newContent.push(item);
        }
      }

      if (replaced) {
        editor.updateBlock(currentBlock, { content: newContent as any });
      }
    } catch (error) {
      console.error('Error replacing word:', error);
    }

    lastTypedWordRef.current = null;
    closeAutocorrect();
  }, [editor, closeAutocorrect]);

  // Use inline ghost text hook for displaying suggestions
  const { acceptSuggestion: acceptGhostText } = useInlineGhostText({
    editor: editorReady ? editor : null,
    suggestion,
    enabled: autocompleteEnabled && editorReady,
    onAccept: () => {
      acceptAISuggestion();
    },
    onClear: clearSuggestion,
  });

  // Set editor ready when it's available
  useEffect(() => {
    if (editor) {
      setEditorReady(true);
    }
  }, [editor]);

  // Monitor content height and calculate page boundaries (unless pagination is disabled)
  useEffect(() => {
    if (disablePagination) return;
    
    const container = editorContainerRef.current;
    if (!container) return;

    const PAGE_CONTENT_HEIGHT = 9 * 96; // 9 inches at 96 DPI

    const updatePageBoundaries = () => {
      const editorContent = container.querySelector('.bn-editor');
      if (!editorContent) return;
      
      const totalHeight = editorContent.scrollHeight;
      const numPages = Math.max(1, Math.ceil(totalHeight / PAGE_CONTENT_HEIGHT));
      
      setPageCount(numPages);
      onPageCountChange?.(numPages);
      setPageBoundaries(
        Array.from({ length: numPages - 1 }, (_, i) => (i + 1) * PAGE_CONTENT_HEIGHT)
      );
    };

    const observer = new ResizeObserver(() => {
      updatePageBoundaries();
    });

    observer.observe(container);
    
    // Initial calculation
    setTimeout(updatePageBoundaries, 100);

    return () => observer.disconnect();
  }, [editor, onPageCountChange, disablePagination]);

  useEffect(() => {
    if (disablePagination || pageBoundaries.length === 0) return;
    
    const editorElement = editorContainerRef.current?.querySelector('.bn-editor');
    if (!editorElement) return;
    
    const totalPageBreakHeight = pageBoundaries.length * (2 * 96 + 40);
    (editorElement as HTMLElement).style.paddingBottom = `${totalPageBreakHeight}px`;
  }, [pageBoundaries, disablePagination]);

  // Double-click handler for editing charts and molecules
  useEffect(() => {
    const container = editorContainerRef.current;
    if (!container || !editor) return;

    const handleDoubleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if we clicked on an image
      const imageElement = target.closest('img') || (target.tagName === 'IMG' ? target : null);
      if (!imageElement) return;

      // Find the block container
      const blockContainer = imageElement.closest('[data-node-type="blockContainer"][data-id]') as HTMLElement | null;
      if (!blockContainer) return;

      const blockId = blockContainer.getAttribute('data-id');
      if (!blockId) return;

      // Find the block in the editor
      const block = editor.getBlock(blockId);
      if (!block || block.type !== 'image') return;

      const caption = (block.props as any)?.caption || '';
      const imageUrl = (block.props as any)?.url || '';

      // Check if it's a molecule (caption is exactly "Molecule")
      if (caption === 'Molecule') {
        event.preventDefault();
        event.stopPropagation();
        setEditingBlockId(blockId);
        setPendingEditor(editor);
        setIsMoleculeDialogOpen(true);
        return;
      }

      // Check if it's a chart (caption starts with "Chart" or contains chart data marker)
      if (caption === 'Chart' || caption.startsWith('Chart:::') || caption.includes(':::chartData:::')) {
        event.preventDefault();
        event.stopPropagation();
        setEditingBlockId(blockId);
        
        // Extract chart data if embedded in caption
        if (caption.includes(':::chartData:::')) {
          const parts = caption.split(':::chartData:::');
          const displayTitle = parts[0];
          try {
            const chartData = JSON.parse(parts[1]);
            setChartInitialTitle(displayTitle || 'Chart');
            setChartInitialData(chartData.rawData);
          } catch {
            setChartInitialTitle(caption);
          }
        } else {
          // No embedded data, just open with the title
          setChartInitialTitle(caption === 'Chart' ? undefined : caption);
        }
        
        setChartDialogOpen(true);
        return;
      }
    };

    container.addEventListener('dblclick', handleDoubleClick);
    return () => container.removeEventListener('dblclick', handleDoubleClick);
  }, [editor]);

  return (
    <div className="relative">
      {/* Title Input */}
      {onTitleChange && (
        <input
          type="text"
          value={title || ""}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Untitled Document"
          className="w-full text-4xl font-bold border-none outline-none bg-transparent px-6 py-4 placeholder:text-muted-foreground/40"
        />
      )}

      <div className={disablePagination ? "endless-editor-container" : "page-editor-container"} ref={editorContainerRef}>
        <BlockNoteView 
            editor={editor} 
            theme="light" 
            slashMenu={false}
            formattingToolbar={!flags.showFloatingToolbar}
            onKeyDown={(event) => {
              // Tab is handled by useInlineGhostText hook
              // Escape is handled by useInlineGhostText hook
              
              // Cmd+, for subscript
              if ((event.metaKey || event.ctrlKey) && event.key === ",") {
                event.preventDefault();
                editor.toggleStyles({ subscript: true });
              }
              // Cmd+. for superscript
              if ((event.metaKey || event.ctrlKey) && event.key === ".") {
                event.preventDefault();
                editor.toggleStyles({ superscript: true });
              }
            }}
          >
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={async (query) =>
              filterSuggestionItems(getCustomSlashMenuItems(editor), query)
            }
          />
          {/* Custom Formatting Toolbar with LaTeX support */}
          {flags.showFloatingToolbar && (
            <FormattingToolbarController
              formattingToolbar={() => (
                <FormattingToolbar>
                  {getFormattingToolbarItems()}
                  {/* LaTeX Button */}
                  <button
                    className="bn-button"
                    title="Insert Inline Math (LaTeX)"
                    onClick={() => {
                      editor.insertInlineContent([{ type: "inlineMathInline", props: { latex: "" } }]);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 8px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    <Sigma size={16} />
                  </button>
                  {/* Multi-block LaTeX Conversion Button */}
                  <button
                    className="bn-button"
                    title="Convert Selected Blocks to LaTeX (each block becomes a separate math block)"
                    onClick={() => {
                      try {
                        // Get selected blocks
                        const selection = editor.getSelection();
                        if (!selection || selection.blocks.length === 0) {
                          // If no selection, try current block
                          const cursorBlock = editor.getTextCursorPosition().block;
                          if (cursorBlock && cursorBlock.content) {
                            const text = cursorBlock.content.map((c: any) => c.text || '').join('');
                            if (text.trim()) {
                              editor.updateBlock(cursorBlock, {
                                type: 'blockMath',
                                props: { latex: text.trim() },
                              });
                              toast.success('Converted block to LaTeX');
                            }
                          }
                          return;
                        }
                        
                        // Convert each selected block to a blockMath block
                        let convertedCount = 0;
                        for (const block of selection.blocks) {
                          if (block.content && Array.isArray(block.content)) {
                            const text = block.content.map((c: any) => c.text || '').join('');
                            if (text.trim()) {
                              editor.updateBlock(block, {
                                type: 'blockMath',
                                props: { latex: text.trim() },
                              });
                              convertedCount++;
                            }
                          }
                        }
                        
                        if (convertedCount > 0) {
                          toast.success(`Converted ${convertedCount} block${convertedCount > 1 ? 's' : ''} to LaTeX`);
                        } else {
                          toast.info('No text content found to convert');
                        }
                      } catch (error) {
                        console.error('LaTeX conversion error:', error);
                        toast.error('Failed to convert blocks to LaTeX');
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 8px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    <FunctionSquare size={16} />
                  </button>
                </FormattingToolbar>
              )}
            />
          )}
        </BlockNoteView>

        {/* Explain Bubble */}
        {explainBubble?.visible && (
          <div 
            className="fixed bg-card border rounded-lg p-4 shadow-xl z-50 w-[400px] max-h-[500px] flex flex-col animate-in fade-in slide-in-from-top-2"
            style={{
              left: Math.min(Math.max(explainBubble.position.x - 200, 10), window.innerWidth - 420),
              top: Math.min(explainBubble.position.y, window.innerHeight - 520),
            }}
          >
            <div className="space-y-3 overflow-hidden flex flex-col min-h-0">
              <div className="flex items-start justify-between gap-2 shrink-0">
                <div className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Explanation
                </div>
                <button 
                  onClick={() => setExplainBubble(null)} 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2 py-1 shrink-0">
                "{explainBubble.originalText}"
              </div>
              
              {explainBubble.loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 shrink-0">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  Thinking...
                </div>
              ) : (
                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed overflow-y-auto flex-1 min-h-0">
                  {explainBubble.text}
                </div>
              )}
              
              {!explainBubble.loading && explainBubble.text && (
                <div className="flex gap-2 pt-2 border-t shrink-0">
                  <Button 
                    size="sm" 
                    variant="default"
                    onClick={() => {
                      editor.insertInlineContent([
                        { type: "text", text: ` (${explainBubble.text})`, styles: { italic: true } }
                      ]);
                      setExplainBubble(null);
                      toast.success("Explanation inserted!");
                    }}
                  >
                    Insert
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setExplainBubble(null)}
                  >
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inline feedback cards */}
        {Object.entries(blockFeedback).map(([blockId, { feedback, loading }]) => (
          <div 
            key={blockId}
            className="fixed bg-card border rounded-lg p-4 shadow-lg z-50 max-w-md"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                Analyzing...
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-sm font-medium text-primary">AI Feedback</div>
                  <button 
                    onClick={() => closeFeedback(blockId)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm text-foreground whitespace-pre-wrap">{feedback}</div>
              </div>
            )}
          </div>
        ))}

        {/* Automatic page boundaries (only when pagination enabled) */}
        {!disablePagination && pageBoundaries.map((boundary, index) => {
          const pageBreakHeight = 2 * 96 + 40;
          const accumulatedOffset = index * pageBreakHeight;
          
          return (
            <div
              key={index}
              className="page-boundary-overlay"
              style={{ top: `calc(1in + ${boundary}px + ${accumulatedOffset}px)` }}
            >
              <div className="page-boundary-inner">
                <div className="page-bottom-margin" />
                <div className="page-gap">
                  <span className="page-label">Page {index + 2} — Experimental</span>
                </div>
                <div className="page-top-margin" />
              </div>
            </div>
          );
        })}

        {/* Word Count Footer */}
        <div className="px-6 py-2 border-t bg-muted/30 text-xs text-muted-foreground flex justify-between">
          {!disablePagination && <span>Page {pageCount}</span>}
          <span className={disablePagination ? "ml-auto" : ""}>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
        </div>
      </div>

      {/* Ghost text indicator when loading */}
      {isAutocompleteLoading && (
        <div className="fixed bottom-4 right-4 bg-primary/10 backdrop-blur-sm text-primary text-xs px-3 py-1.5 rounded-full border border-primary/20 z-50 flex items-center gap-2">
          <div className="animate-spin h-3 w-3 border-2 border-primary border-t-transparent rounded-full" />
          AI typing...
        </div>
      )}

      {/* Drawing Dialog */}
      <Dialog open={isDrawingDialogOpen} onOpenChange={setIsDrawingDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Drawing Editor</DialogTitle>
          </DialogHeader>
          <iframe
            src="/drawings/index.html"
            className="w-full h-[90vh] border-0"
            title="Drawing Editor"
          />
        </DialogContent>
      </Dialog>

      {/* Molecule Dialog */}
      <Dialog 
        open={isMoleculeDialogOpen} 
        onOpenChange={(open) => {
          setIsMoleculeDialogOpen(open);
          if (!open) {
            setEditingBlockId(null);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Molecule Editor</DialogTitle>
          </DialogHeader>
          <iframe
            src="/molecule"
            className="w-full h-[90vh] border-0"
            title="Molecule Editor"
          />
        </DialogContent>
      </Dialog>

      {/* Citation Modal */}
      <CitationModal
        open={isCitationModalOpen}
        onClose={() => setIsCitationModalOpen(false)}
        onInsert={(inlineText: string, citation: Citation, style: CitationStyle) => {
          const currentBlock = editor.getTextCursorPosition().block;
          
          // Insert inline citation text
          editor.insertBlocks(
            [
              {
                type: "paragraph",
                content: [{ type: "text", text: inlineText, styles: {} }],
              } as Block,
            ],
            currentBlock,
            "after"
          );
          
          setIsCitationModalOpen(false);
          toast.success("Citation inserted!");
        }}
      />

      {/* Table Selector Dialog for Chart from Table */}
      <Dialog open={tableSelectDialogOpen} onOpenChange={setTableSelectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select a Table</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {availableTables.map((table) => (
              <Button
                key={table.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleTableSelect(table.block)}
              >
                <div className="flex flex-col items-start gap-1">
                  <span className="font-medium">Table {table.blockIndex}</span>
                  <span className="text-xs text-muted-foreground">{table.preview || "Empty table"}</span>
                </div>
              </Button>
            ))}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setTableSelectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setTableSelectDialogOpen(false);
                setChartInitialData(undefined);
                setChartInitialTitle("Chart");
                setChartDialogOpen(true);
              }}
            >
              Enter Data Manually
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notes Search Dialog */}
      <NotesSearchDialog
        open={notesSearchOpen}
        onOpenChange={setNotesSearchOpen}
        onInsertText={(text: string) => {
          if (editor) {
            editor.insertInlineContent([{ type: "text", text, styles: {} }]);
            toast.success("Content inserted from notes");
          }
        }}
      />

      {/* Autocorrect Dropdown */}
      <AutocorrectDropdown
        isOpen={isAutocorrectOpen}
        suggestions={autocorrectSuggestions}
        selectedIndex={autocorrectSelectedIndex}
        position={autocorrectPosition}
        currentWord={autocorrectCurrentWord}
        onSelect={handleAutocorrectSelect}
        onClose={closeAutocorrect}
        onNavigate={(direction) => {
          if (direction === 'up') {
            selectPreviousAutocorrect();
          } else {
            selectNextAutocorrect();
          }
        }}
      />

      {/* Chart Dialog */}
      <ChartDialog
        open={chartDialogOpen}
        onOpenChange={(open) => {
          setChartDialogOpen(open);
          if (!open) {
            setEditingBlockId(null);
            setChartInitialData(undefined);
            setChartInitialTitle(undefined);
          }
        }}
        onInsertChart={(imageDataUrl: string, rawData?: string) => {
          const displayTitle = chartInitialTitle || "Chart";
          // Embed chart data in caption for future editing (hidden from user display)
          const captionWithData = rawData 
            ? `${displayTitle}:::chartData:::${JSON.stringify({ rawData })}`
            : displayTitle;
          
          if (editingBlockId) {
            // Editing existing chart - replace the block
            try {
              editor.updateBlock(editingBlockId, {
                type: "image",
                props: {
                  url: imageDataUrl,
                  caption: captionWithData,
                  previewWidth: 500,
                },
              } as any);
              toast.success("Chart updated!");
            } catch (error) {
              console.error("Failed to update chart block:", error);
              toast.error("Failed to update chart");
            }
          } else {
            // Insert new chart
            const currentBlock = editor.getTextCursorPosition().block;
            editor.insertBlocks(
              [
                {
                  type: "image",
                  props: {
                    url: imageDataUrl,
                    caption: captionWithData,
                    previewWidth: 500,
                  },
                } as any,
              ],
              currentBlock,
              "after"
            );
            toast.success("Chart inserted!");
          }
          
          setChartDialogOpen(false);
          setEditingBlockId(null);
          setChartInitialData(undefined);
          setChartInitialTitle(undefined);
        }}
        initialData={chartInitialData}
        initialTitle={chartInitialTitle}
      />

      <style>{`
        /* Page-based editor styling */
        .page-editor-container {
          width: 100%;
          background: hsl(var(--muted) / 0.5);
          padding: 2rem;
          position: relative;
          border-radius: 0.75rem;
        }

        .page-editor-container .bn-container {
          background: hsl(var(--card));
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 1in;
          max-width: 8.5in;
          margin: 0 auto;
          position: relative;
        }

        /* Endless editor styling (no pagination) */
        .endless-editor-container {
          width: 100%;
          background: white;
          position: relative;
        }

        .endless-editor-container .bn-container {
          background: white;
          padding: 2rem;
          max-width: 100%;
          position: relative;
        }

        .page-boundary-overlay {
          position: absolute;
          left: 0;
          right: 0;
          width: 100%;
          height: calc(2in + 2.5rem);
          pointer-events: none;
          z-index: 10;
          display: flex;
          justify-content: center;
          background: hsl(var(--muted));
        }

        .page-boundary-inner {
          width: 8.5in;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .page-bottom-margin {
          height: 1in;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .page-gap {
          height: 2.5rem;
          background: hsl(var(--muted));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .page-top-margin {
          height: 1in;
          background: white;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
        }

        .page-label {
          font-size: 0.7rem;
          color: hsl(var(--muted-foreground));
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          background: hsl(var(--background));
          border-radius: 0.25rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .bn-editor {
          padding: 0;
          font-family: var(--bn-font-family, ui-sans-serif, system-ui, sans-serif);
        }

        /* Font family classes for styled text */
        .bn-editor [data-font-sans] { font-family: ui-sans-serif, system-ui, sans-serif; }
        .bn-editor [data-font-serif] { font-family: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif; }
        .bn-editor [data-font-mono] { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
        .bn-editor [data-font-comic] { font-family: 'Comic Sans MS', 'Comic Sans', cursive; }
        .bn-editor [data-font-georgia] { font-family: Georgia, serif; }
        .bn-editor [data-font-times] { font-family: 'Times New Roman', Times, serif; }
        .bn-editor [data-font-arial] { font-family: Arial, Helvetica, sans-serif; }
        .bn-editor [data-font-courier] { font-family: 'Courier New', Courier, monospace; }
        
        /* KaTeX styling within BlockNote */
        .bn-inline-content code:has-text('$') {
          background-color: hsl(var(--muted));
          padding: 0.1rem 0.3rem;
          border-radius: 0.25rem;
          font-family: 'KaTeX_Main', 'Times New Roman', serif;
        }
      `}</style>
    </div>
  );
}
