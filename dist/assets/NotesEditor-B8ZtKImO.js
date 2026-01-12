import { j as jsxRuntimeExports, bG as Heading, b3 as Type, aT as Bold, aU as Italic, aV as Underline, aW as Strikethrough, bt as Code, az as Sparkles, b1 as List, bv as Sigma, b7 as Image, ax as FileText, bx as Palette, r as reactExports, aj as ChevronDown, bw as Atom, b9 as Table, b5 as Link, b4 as Quote, $ as LoaderCircle, bH as Settings, by as FileUp, bB as Share2, aP as ChevronLeft, a2 as ChevronRight, aG as Brain, aQ as Plus, bI as RotateCcw, bJ as Eye, aC as Trash2, X, _ as RefreshCw } from './vendor-react-BeQHm2Hb.js';
import { D as DropdownMenu, f as DropdownMenuTrigger, B as Button, g as DropdownMenuContent, l as DropdownMenuLabel, m as DropdownMenuSeparator, n as DropdownMenuGroup, h as DropdownMenuItem, u as useAuth, e as useFeatureFlags, a as useIsMobile, s as supabase, k as TooltipProvider, T as Tooltip, c as TooltipTrigger, d as TooltipContent } from './index-C9tyh6tO.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { B as BlockNoteEditor } from './BlockNoteEditor-DmwbzBh6.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useAutoSave } from './use-auto-save-DEAQNb2a.js';
import { u as useCollaboration, E as ExportDropdown, S as ShareModal, C as CollaboratorAvatars, R as ResizablePanelGroup, b as ResizablePanel, c as ResizableHandle, I as ImportToBlockNoteModal } from './CollaboratorAvatars-C1VWiRcD.js';
import { C as Card, d as CardContent } from './card-BTaNjRSt.js';
import { S as ScrollArea } from './scroll-area-DHtqER3G.js';
import { I as Input } from './input-2hnN3JAu.js';
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from './dialog-BQ4GVXEh.js';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from './select-DtVQdYEt.js';
import { u as useNavigate, c as useParams } from './vendor-react-router-D-UwvF_4.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-export-COR0N_gy.js';
import './vendor-blocknote-BAmltmDn.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-datefns-Cgc6WLhj.js';
import './vendor-syncfusion-B9hbBizT.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';
import './label-BfT9c56I.js';
import './tabs-D8pTTJCu.js';
import './badge-B04EGB2M.js';
import './textarea-1gnjGx7F.js';
import './vendor-recharts-Cv4BIV0T.js';
import './popover-sIxpjwXN.js';
import './switch-CK-TAwbC.js';
import './vendor-katex-LkNY165q.js';
import './vendor-fuse-Gm-adH5Q.js';

function StandingToolbar({ onCommand, disabled = false, editor }) {
  const getSelectedText = () => {
    if (!editor) return "";
    try {
      const selectedText = editor.getSelectedText();
      return selectedText || "";
    } catch (error) {
      console.warn("Could not get selected text:", error);
      return "";
    }
  };
  const hasTextSelection = () => {
    return getSelectedText().trim().length > 0;
  };
  const textCommands = [
    { label: "Heading 1", command: "heading1", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { className: "h-4 w-4" }), appliesToSelection: false },
    { label: "Heading 2", command: "heading2", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { className: "h-4 w-4" }), appliesToSelection: false },
    { label: "Heading 3", command: "heading3", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { className: "h-4 w-4" }), appliesToSelection: false },
    { label: "Paragraph", command: "paragraph", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }), appliesToSelection: false },
    {
      label: "Bold",
      command: "bold",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" }),
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Make "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}" bold` : "Make text bold"
    },
    {
      label: "Italic",
      command: "italic",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" }),
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Make "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}" italic` : "Make text italic"
    },
    {
      label: "Underline",
      command: "underline",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, { className: "h-4 w-4" }),
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Underline "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}"` : "Underline text"
    },
    {
      label: "Strikethrough",
      command: "strikethrough",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Strikethrough, { className: "h-4 w-4" }),
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Strike through "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}"` : "Strike through text"
    },
    {
      label: "Inline Code",
      command: "code",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "h-4 w-4" }),
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Format "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}" as code` : "Format as inline code"
    }
  ];
  const listCommands = [
    { label: "Bullet List", command: "bulletlist", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }) },
    { label: "Numbered List", command: "numberedlist", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }) },
    { label: "To-Do List", command: "checklist", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }) }
  ];
  const mathCommands = [
    { label: "Inline Math", command: "inlinemath", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }) },
    { label: "Block Math", command: "blockmath", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }) },
    { label: "Fraction", command: "fraction", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }) },
    { label: "Square Root", command: "sqrt", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }) },
    { label: "Integral", command: "integral", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }) },
    { label: "Sum", command: "sum", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }) }
  ];
  const mediaCommands = [
    { label: "Image", command: "image", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }) },
    { label: "Drawing", command: "drawing", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }) },
    { label: "Molecule", command: "molecule", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "h-4 w-4" }) },
    { label: "Table", command: "table", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Table, { className: "h-4 w-4" }) },
    { label: "Link", command: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-4 w-4" }) }
  ];
  const aiCommands = [
    {
      label: "Define",
      command: "define",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Define "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? "..." : ""}"` : "Select text to define"
    },
    {
      label: "Explain",
      command: "explain",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Explain "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? "..." : ""}"` : "Select text to explain"
    },
    {
      label: "Synonym",
      command: "synonym",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Find synonyms for "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? "..." : ""}"` : "Select text to find synonyms"
    },
    {
      label: "Rephrase",
      command: "rephrase",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Rephrase "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? "..." : ""}"` : "Select text to rephrase"
    },
    {
      label: "Grammar Check",
      command: "grammar",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Check grammar of "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? "..." : ""}"` : "Select text to check grammar"
    },
    {
      label: "AI Feedback",
      command: "feedback",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
      requiresSelection: false,
      tooltip: "Get AI feedback on current block"
    }
  ];
  const documentCommands = [
    { label: "Title Page", command: "titlepage", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) },
    { label: "Table of Contents", command: "toc", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) },
    { label: "Bibliography", command: "bibliography", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) },
    { label: "Citation", command: "citation", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-4 w-4" }) },
    { label: "Page Break", command: "pagebreak", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) }
  ];
  const fontCommands = [
    { label: "Sans Serif", command: "font sans", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Serif", command: "font serif", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Monospace", command: "font mono", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Comic Sans", command: "font comic", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Georgia", command: "font georgia", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Times New Roman", command: "font times", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Arial", command: "font arial", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) },
    { label: "Courier New", command: "font courier", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }) }
  ];
  const CommandDropdown = ({
    label,
    icon,
    commands
  }) => {
    const [isOpen, setIsOpen] = reactExports.useState(false);
    const [isHovered, setIsHovered] = reactExports.useState(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { open: isOpen, onOpenChange: setIsOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: `h-8 transition-all duration-200 ease-in-out overflow-hidden ${isHovered ? "w-auto px-3 gap-2" : "w-8 px-0"}`,
          disabled,
          onMouseEnter: () => {
            setIsHovered(true);
            setIsOpen(true);
          },
          onMouseLeave: () => {
            setIsHovered(false);
            setTimeout(() => {
              if (!document.querySelector("[data-radix-popper-content-wrapper]:hover")) {
                setIsOpen(false);
              }
            }, 150);
          },
          children: [
            icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `whitespace-nowrap transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0 w-0"}`, children: isHovered && label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-3 w-3 transition-all duration-200 ${isHovered ? "opacity-100 ml-1" : "opacity-0 w-0"}` })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DropdownMenuContent,
        {
          className: "w-48",
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => {
            setIsOpen(false);
            setIsHovered(false);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuGroup, { children: commands.map((cmd) => {
              const isDisabled = cmd.requiresSelection && !hasTextSelection();
              const selectedText = getSelectedText();
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                DropdownMenuItem,
                {
                  onClick: () => {
                    if (!isDisabled) {
                      onCommand(cmd.command, selectedText);
                    }
                  },
                  className: `flex items-center gap-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`,
                  disabled: isDisabled,
                  title: cmd.tooltip,
                  children: [
                    cmd.icon,
                    cmd.label,
                    cmd.requiresSelection && selectedText && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground max-w-24 truncate", children: [
                      '"',
                      selectedText.slice(0, 15),
                      selectedText.length > 15 ? "..." : "",
                      '"'
                    ] })
                  ]
                },
                cmd.command
              );
            }) })
          ]
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-6xl mx-auto px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "Text",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }),
        commands: textCommands
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "Lists",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }),
        commands: listCommands
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "Math",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }),
        commands: mathCommands
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "Media",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
        commands: mediaCommands
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "AI",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        commands: aiCommands
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "Document",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
        commands: documentCommands
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandDropdown,
      {
        label: "Fonts",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-4 w-4" }),
        commands: fontCommands
      }
    )
  ] }) }) });
}

const SUBJECTS = [
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "math-aa", label: "Math AA" },
  { value: "math-ai", label: "Math AI" },
  { value: "economics", label: "Economics" },
  { value: "business", label: "Business Management" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "english", label: "English A" },
  { value: "language-b", label: "Language B" },
  { value: "visual-arts", label: "Visual Arts" },
  { value: "tok", label: "Theory of Knowledge" },
  { value: "ee", label: "Extended Essay" },
  { value: "cas", label: "CAS" },
  { value: "other", label: "Other" }
];
function NotesEditor() {
  const navigate = useNavigate();
  const { noteId: routeNoteId } = useParams();
  const { user } = useAuth();
  const { flags } = useFeatureFlags();
  const isMobile = useIsMobile();
  const [content, setContent] = reactExports.useState("");
  const [noteId, setNoteId] = reactExports.useState(routeNoteId || null);
  const [noteTitle, setNoteTitle] = reactExports.useState("Untitled Note");
  const [noteSubject, setNoteSubject] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  const [showImportModal, setShowImportModal] = reactExports.useState(false);
  const [blockNoteEditor, setBlockNoteEditor] = reactExports.useState(null);
  const [commandHandler, setCommandHandler] = reactExports.useState(null);
  const [editorInstance, setEditorInstance] = reactExports.useState(null);
  const {
    ydoc,
    provider,
    activeUsers,
    collaborators,
    isOwner,
    addCollaborator,
    removeCollaborator,
    updateCollaboratorRole
  } = useCollaboration({
    documentType: "note",
    documentId: noteId || "",
    enabled: !!noteId
  });
  const getUserColor = (userId) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };
  const [leftPanelCollapsed, setLeftPanelCollapsed] = reactExports.useState(() => {
    const saved = localStorage.getItem("notes-left-panel-collapsed");
    return saved === "true";
  });
  const [leftPanelSize, setLeftPanelSize] = reactExports.useState(() => {
    const saved = localStorage.getItem("notes-left-panel-size");
    return saved ? parseFloat(saved) : 20;
  });
  const [rightPanelCollapsed, setRightPanelCollapsed] = reactExports.useState(() => {
    const saved = localStorage.getItem("notes-right-panel-collapsed");
    return saved === "true";
  });
  const [rightPanelSize, setRightPanelSize] = reactExports.useState(() => {
    const saved = localStorage.getItem("notes-right-panel-size");
    return saved ? parseFloat(saved) : 25;
  });
  const [decks, setDecks] = reactExports.useState([]);
  const [selectedDeckId, setSelectedDeckId] = reactExports.useState(null);
  const [flashcards, setFlashcards] = reactExports.useState([]);
  const [showCreateDeckDialog, setShowCreateDeckDialog] = reactExports.useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = reactExports.useState(false);
  const [newDeckTitle, setNewDeckTitle] = reactExports.useState("");
  const [newCardFront, setNewCardFront] = reactExports.useState("");
  const [newCardBack, setNewCardBack] = reactExports.useState("");
  const [newCardHeadingId, setNewCardHeadingId] = reactExports.useState(null);
  const [generatingCards, setGeneratingCards] = reactExports.useState(false);
  const [convertingCards, setConvertingCards] = reactExports.useState(false);
  const [showSubjectDialog, setShowSubjectDialog] = reactExports.useState(false);
  const [previousTitle, setPreviousTitle] = reactExports.useState("Untitled Note");
  const [selectedHeadingForCards, setSelectedHeadingForCards] = reactExports.useState(null);
  const [generatingCardsForHeading, setGeneratingCardsForHeading] = reactExports.useState(null);
  const [generatingAllCards, setGeneratingAllCards] = reactExports.useState(false);
  const [previewingCard, setPreviewingCard] = reactExports.useState(null);
  const [previewFlipped, setPreviewFlipped] = reactExports.useState(false);
  const tableOfContents = reactExports.useMemo(() => {
    if (!blockNoteEditor?.document) return [];
    const headings = [];
    blockNoteEditor.document.forEach((block, index) => {
      if (block.type === "heading") {
        const level = block.props?.level || 1;
        let text = "";
        if (block.content && Array.isArray(block.content)) {
          text = block.content.map((item) => {
            if (typeof item === "string") return item;
            if (item && typeof item === "object" && "text" in item) {
              return item.text;
            }
            return "";
          }).join("").trim();
        }
        headings.push({
          id: block.id || `heading-${index}`,
          level,
          text: text || "(Untitled)"
        });
      }
    });
    return headings;
  }, [blockNoteEditor?.document]);
  const flashcardPatterns = reactExports.useMemo(() => {
    if (!blockNoteEditor?.document) return [];
    const patterns = [];
    const extractText = (content2) => {
      return content2.map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "text" in item) {
          return item.text;
        }
        return "";
      }).join("");
    };
    blockNoteEditor.document.forEach((block) => {
      if (block.content && Array.isArray(block.content)) {
        const text = extractText(block.content);
        const match = text.match(/^(.+?)::(.+)$/);
        if (match) {
          patterns.push({
            blockId: block.id,
            front: match[1].trim(),
            back: match[2].trim(),
            fullText: text
          });
        }
      }
    });
    return patterns;
  }, [blockNoteEditor?.document]);
  reactExports.useEffect(() => {
    localStorage.setItem("notes-left-panel-collapsed", leftPanelCollapsed.toString());
  }, [leftPanelCollapsed]);
  reactExports.useEffect(() => {
    localStorage.setItem("notes-left-panel-size", leftPanelSize.toString());
  }, [leftPanelSize]);
  reactExports.useEffect(() => {
    localStorage.setItem("notes-right-panel-collapsed", rightPanelCollapsed.toString());
  }, [rightPanelCollapsed]);
  reactExports.useEffect(() => {
    localStorage.setItem("notes-right-panel-size", rightPanelSize.toString());
  }, [rightPanelSize]);
  const scrollToHeading = (blockId) => {
    if (!blockNoteEditor) return;
    try {
      const blockElement = document.querySelector(`[data-id="${blockId}"]`);
      if (blockElement) {
        blockElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (error) {
      console.error("Failed to scroll to heading:", error);
    }
  };
  reactExports.useEffect(() => {
    if (routeNoteId) {
      setNoteId(routeNoteId);
      loadNote(routeNoteId);
    }
    loadDecks();
  }, [user, routeNoteId]);
  const loadNote = async (id) => {
    try {
      if (!user) {
        const savedNotes = localStorage.getItem("guest_notes");
        if (savedNotes) {
          const notes = JSON.parse(savedNotes);
          const note = notes.find((n) => n.id === id);
          if (note) {
            setContent(note.content || "");
            setNoteTitle(note.title || "Untitled Note");
            setNoteSubject(note.subject || "");
          }
        }
        setLoading(false);
        return;
      }
      const { data: noteData, error } = await supabase.from("notes").select("*").eq("id", id).eq("user_id", user.id).single();
      if (error) {
        console.error("Supabase error:", error);
        ue.error("Failed to load note");
        navigate("/work/notes");
        return;
      }
      if (noteData) {
        setNoteTitle(noteData.title || "Untitled Note");
        setContent(typeof noteData.content === "string" ? noteData.content : JSON.stringify(noteData.content));
      }
    } catch (error) {
      console.error("Failed to load note:", error);
      ue.error("Failed to load note");
      navigate("/work/notes");
    } finally {
      setLoading(false);
    }
  };
  const loadDecks = async () => {
    try {
      if (!user) {
        const savedDecks = localStorage.getItem("flashcard_decks");
        if (savedDecks) {
          const decksData = JSON.parse(savedDecks);
          setDecks(decksData || []);
          if (decksData && decksData.length > 0 && !selectedDeckId) {
            setSelectedDeckId(decksData[0].id);
          }
        }
        return;
      }
      const { data, error } = await supabase.from("flashcard_decks").select("*").eq("user_id", user?.id).order("created_at", { ascending: false });
      if (error && error.code !== "PGRST116") {
        console.error("Failed to load decks:", error);
        return;
      }
      setDecks(data || []);
      if (data && data.length > 0 && !selectedDeckId) {
        setSelectedDeckId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load decks:", error);
    }
  };
  const loadFlashcards = reactExports.useCallback(async () => {
    if (!selectedDeckId) {
      setFlashcards([]);
      return;
    }
    try {
      if (!user) {
        const savedCards = localStorage.getItem(`flashcards_${selectedDeckId}`);
        if (savedCards) {
          setFlashcards(JSON.parse(savedCards) || []);
        } else {
          setFlashcards([]);
        }
        return;
      }
      const { data, error } = await supabase.from("flashcards").select("*").eq("deck_id", selectedDeckId).order("created_at", { ascending: false });
      if (error) {
        console.error("Failed to load flashcards:", error);
        return;
      }
      setFlashcards(data || []);
    } catch (error) {
      console.error("Failed to load flashcards:", error);
    }
  }, [selectedDeckId, user]);
  reactExports.useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);
  const autoSaveNotes = async () => {
    if (!noteId) return;
    try {
      if (!user) {
        const savedNotes = localStorage.getItem("guest_notes");
        const notes = savedNotes ? JSON.parse(savedNotes) : [];
        const noteIndex = notes.findIndex((n) => n.id === noteId);
        if (noteIndex >= 0) {
          notes[noteIndex].title = noteTitle;
          notes[noteIndex].subject = noteSubject;
          notes[noteIndex].content = content;
          notes[noteIndex].updated_at = (/* @__PURE__ */ new Date()).toISOString();
        } else {
          notes.push({
            id: noteId,
            title: noteTitle,
            subject: noteSubject || "other",
            content,
            user_id: "guest",
            created_at: (/* @__PURE__ */ new Date()).toISOString(),
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
        localStorage.setItem("guest_notes", JSON.stringify(notes));
        return;
      }
      if (user?.id && noteId) {
        await supabase.from("notes").update({
          title: noteTitle,
          subject: noteSubject || "other",
          content,
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", noteId);
      }
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };
  const handleTitleChange = (newTitle) => {
    setNoteTitle(newTitle);
    if (previousTitle === "Untitled Note" && newTitle !== "Untitled Note" && !noteSubject) {
      setTimeout(() => {
        if (newTitle.trim() && newTitle !== "Untitled Note") {
          setShowSubjectDialog(true);
        }
      }, 1500);
    }
  };
  const handleTitleBlur = () => {
    if (noteTitle !== "Untitled Note" && noteTitle.trim() && !noteSubject) {
      setShowSubjectDialog(true);
      setPreviousTitle(noteTitle);
    }
  };
  const { debouncedSave } = useAutoSave({
    onSave: autoSaveNotes,
    delay: 2e3
  });
  reactExports.useEffect(() => {
    if ((content || noteTitle !== "Untitled Note" || noteSubject) && !loading) {
      debouncedSave();
    }
  }, [content, noteTitle, noteSubject, debouncedSave, loading]);
  const createDeck = async () => {
    if (!newDeckTitle.trim()) return;
    try {
      if (!user) {
        const newDeck = {
          id: `local_deck_${Date.now()}`,
          title: newDeckTitle.trim(),
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        const updatedDecks = [newDeck, ...decks];
        setDecks(updatedDecks);
        localStorage.setItem("flashcard_decks", JSON.stringify(updatedDecks));
        setSelectedDeckId(newDeck.id);
        setNewDeckTitle("");
        setShowCreateDeckDialog(false);
        ue.success("Deck created!");
        return;
      }
      const { data, error } = await supabase.from("flashcard_decks").insert({
        user_id: user.id,
        title: newDeckTitle.trim(),
        note_id: noteId
      }).select().single();
      if (error) throw error;
      setDecks([data, ...decks]);
      setSelectedDeckId(data.id);
      setNewDeckTitle("");
      setShowCreateDeckDialog(false);
      ue.success("Deck created!");
    } catch (error) {
      console.error("Failed to create deck:", error);
      ue.error("Failed to create deck");
    }
  };
  const addCard = async () => {
    if (!newCardFront.trim() || !newCardBack.trim() || !selectedDeckId) return;
    try {
      if (!user) {
        const newCard = {
          id: `local_card_${Date.now()}`,
          deck_id: selectedDeckId,
          front: newCardFront.trim(),
          back: newCardBack.trim(),
          heading_id: newCardHeadingId || void 0,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          interval: 0,
          repetitions: 0,
          ease_factor: 2.5,
          next_review_date: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        const updatedCards = [newCard, ...flashcards];
        setFlashcards(updatedCards);
        localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
        setNewCardFront("");
        setNewCardBack("");
        setNewCardHeadingId(null);
        setShowAddCardDialog(false);
        ue.success("Card added!");
        return;
      }
      const { data, error } = await supabase.from("flashcards").insert({
        deck_id: selectedDeckId,
        front: newCardFront.trim(),
        back: newCardBack.trim(),
        heading_id: newCardHeadingId || null
      }).select().single();
      if (error) throw error;
      setFlashcards([data, ...flashcards]);
      setNewCardFront("");
      setNewCardBack("");
      setNewCardHeadingId(null);
      setShowAddCardDialog(false);
      ue.success("Card added!");
    } catch (error) {
      console.error("Failed to add card:", error);
      ue.error("Failed to add card");
    }
  };
  const deleteCard = async (cardId) => {
    try {
      if (!user) {
        const updatedCards = flashcards.filter((c) => c.id !== cardId);
        setFlashcards(updatedCards);
        if (selectedDeckId) {
          localStorage.setItem(`flashcards_${selectedDeckId}`, JSON.stringify(updatedCards));
        }
        ue.success("Card deleted");
        return;
      }
      const { error } = await supabase.from("flashcards").delete().eq("id", cardId);
      if (error) throw error;
      setFlashcards(flashcards.filter((c) => c.id !== cardId));
      ue.success("Card deleted");
    } catch (error) {
      console.error("Failed to delete card:", error);
      ue.error("Failed to delete card");
    }
  };
  const convertPatternsToCards = async () => {
    if (!selectedDeckId || flashcardPatterns.length === 0) {
      ue.error("No :: patterns found to convert");
      return;
    }
    setConvertingCards(true);
    try {
      const cardsToInsert = flashcardPatterns.map((pattern) => ({
        deck_id: selectedDeckId,
        front: pattern.front,
        back: pattern.back,
        source_block_id: pattern.blockId
      }));
      const { data: insertedCards, error } = await supabase.from("flashcards").insert(cardsToInsert).select();
      if (error) throw error;
      setFlashcards([...insertedCards || [], ...flashcards]);
      ue.success(`Converted ${insertedCards?.length || 0} patterns to flashcards!`);
    } catch (error) {
      console.error("Failed to convert patterns:", error);
      ue.error("Failed to convert patterns");
    } finally {
      setConvertingCards(false);
    }
  };
  const getContentUnderHeading = (headingId) => {
    if (!blockNoteEditor?.document) return "";
    const blocks = blockNoteEditor.document;
    let startIndex = -1;
    let headingLevel = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].id === headingId) {
        startIndex = i;
        headingLevel = blocks[i].props?.level || 1;
        break;
      }
    }
    if (startIndex === -1) return "";
    const contentBlocks = [];
    for (let i = startIndex + 1; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.type === "heading") {
        const currentLevel = block.props?.level || 1;
        if (currentLevel <= headingLevel) break;
      }
      contentBlocks.push(block);
    }
    const extractText = (blocks2) => {
      return blocks2.map((block) => {
        let text = "";
        if (block.content && Array.isArray(block.content)) {
          text = block.content.map((item) => {
            if (typeof item === "string") return item;
            if (item && typeof item === "object" && "text" in item) {
              return item.text;
            }
            return "";
          }).join("");
        }
        if (block.children && Array.isArray(block.children)) {
          text += "\n" + extractText(block.children);
        }
        return text;
      }).filter((t) => t.trim()).join("\n");
    };
    return extractText(contentBlocks);
  };
  const generateFlashcardsForHeading = async (headingId, headingText) => {
    if (!selectedDeckId) {
      ue.error("Please select a deck first");
      return;
    }
    setGeneratingCardsForHeading(headingId);
    try {
      const content2 = getContentUnderHeading(headingId);
      if (!content2.trim()) {
        ue.error("No content found under this heading");
        return;
      }
      const { data, error } = await supabase.functions.invoke("generate-flashcards", {
        body: { content: `Topic: ${headingText}

${content2}`, count: 5 }
      });
      if (error) throw error;
      if (!data?.flashcards || data.flashcards.length === 0) {
        ue.error("No flashcards could be generated");
        return;
      }
      const cardsToInsert = data.flashcards.map((card) => ({
        deck_id: selectedDeckId,
        front: card.front,
        back: card.back,
        source_block_id: headingId
      }));
      const { data: insertedCards, error: insertError } = await supabase.from("flashcards").insert(cardsToInsert).select();
      if (insertError) throw insertError;
      setFlashcards([...insertedCards || [], ...flashcards]);
      ue.success(`Generated ${insertedCards?.length || 0} flashcards for "${headingText}"!`);
    } catch (error) {
      console.error("Failed to generate flashcards for heading:", error);
      ue.error("Failed to generate flashcards");
    } finally {
      setGeneratingCardsForHeading(null);
    }
  };
  const generateFlashcardsForAllHeadings = async () => {
    if (!selectedDeckId || tableOfContents.length === 0) {
      ue.error("Please select a deck and ensure your notes have headings");
      return;
    }
    setGeneratingAllCards(true);
    let totalGenerated = 0;
    const allNewCards = [];
    try {
      for (const heading of tableOfContents) {
        const existingCards = flashcards.filter((c) => c.source_block_id === heading.id);
        if (existingCards.length > 0) {
          continue;
        }
        const content2 = getContentUnderHeading(heading.id);
        if (!content2.trim()) continue;
        try {
          const { data, error } = await supabase.functions.invoke("generate-flashcards", {
            body: { content: `Topic: ${heading.text}

${content2}`, count: 3 }
          });
          if (error || !data?.flashcards) continue;
          const existingFronts = /* @__PURE__ */ new Set([
            ...flashcards.map((c) => c.front.toLowerCase().trim()),
            ...allNewCards.map((c) => c.front.toLowerCase().trim())
          ]);
          const uniqueCards = data.flashcards.filter(
            (card) => !existingFronts.has(card.front.toLowerCase().trim())
          );
          if (uniqueCards.length === 0) continue;
          const cardsToInsert = uniqueCards.map((card) => ({
            deck_id: selectedDeckId,
            front: card.front,
            back: card.back,
            source_block_id: heading.id
          }));
          const { data: insertedCards, error: insertError } = await supabase.from("flashcards").insert(cardsToInsert).select();
          if (!insertError && insertedCards) {
            allNewCards.push(...insertedCards);
            totalGenerated += insertedCards.length;
          }
        } catch {
        }
      }
      setFlashcards([...allNewCards, ...flashcards]);
      ue.success(`Generated ${totalGenerated} flashcards across all headings!`);
    } catch (error) {
      console.error("Failed to generate flashcards:", error);
      ue.error("Failed to generate flashcards");
    } finally {
      setGeneratingAllCards(false);
    }
  };
  const flashcardsByHeading = reactExports.useMemo(() => {
    const grouped = { ungrouped: [] };
    tableOfContents.forEach((heading) => {
      grouped[heading.id] = [];
    });
    flashcards.forEach((card) => {
      if (card.source_block_id && grouped[card.source_block_id]) {
        grouped[card.source_block_id].push(card);
      } else {
        grouped.ungrouped.push(card);
      }
    });
    return grouped;
  }, [flashcards, tableOfContents]);
  const selectedDeck = decks.find((d) => d.id === selectedDeckId);
  const dueCards = flashcards.filter((c) => new Date(c.next_review_date) <= /* @__PURE__ */ new Date());
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card/50 backdrop-blur-sm shrink-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `container mx-auto ${isMobile ? "px-3 py-2" : "px-4 py-4"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: "/work/notes",
            size: "sm",
            label: !isMobile ? "Back" : void 0,
            className: "gap-1 md:gap-2"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: noteTitle,
            onChange: (e) => handleTitleChange(e.target.value),
            onBlur: handleTitleBlur,
            className: "text-lg md:text-2xl font-semibold border-0 px-0 focus-visible:ring-0 h-auto",
            placeholder: "Note title..."
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 md:gap-2", children: !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => setShowImportModal(true),
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "h-4 w-4" }),
              "Import"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExportDropdown,
          {
            blocks: blockNoteEditor?.document || [],
            title: "My Notes",
            pageCount: 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ShareModal,
          {
            isOwner,
            collaborators,
            documentTitle: "My Notes",
            onAddCollaborator: addCollaborator,
            onRemoveCollaborator: removeCollaborator,
            onUpdateRole: updateCollaboratorRole,
            trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
              "Share"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CollaboratorAvatars, { users: activeUsers })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-hidden", children: isMobile ? (
      /* Mobile: Full-width editor only */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-3 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg shadow-soft border border-border p-4", children: [
        flags.standingToolbar && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StandingToolbar,
          {
            onCommand: commandHandler || (() => {
            }),
            editor: editorInstance
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BlockNoteEditor,
          {
            initialContent: content,
            onChange: setContent,
            placeholder: "Start writing your notes...",
            disablePagination: true,
            onEditorReady: setBlockNoteEditor,
            collaboration: ydoc && provider ? {
              ydoc,
              provider,
              user: user ? {
                name: user.email || "Anonymous",
                color: getUserColor(user.id)
              } : void 0
            } : void 0
          }
        )
      ] }) }) })
    ) : (
      /* Desktop: Resizable three-column layout */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full", children: [
        !leftPanelCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizablePanel,
            {
              defaultSize: leftPanelSize,
              minSize: 15,
              maxSize: 35,
              onResize: (size) => setLeftPanelSize(size),
              className: "relative",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col bg-muted/30 border-r", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b bg-card/50 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Table of Contents" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-6 w-6",
                      onClick: () => setLeftPanelCollapsed(true),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 p-4", children: tableOfContents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground text-center py-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No headings yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add headings to create a table of contents" })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: tableOfContents.map((heading, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => scrollToHeading(heading.id),
                    className: "w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors group text-sm",
                    style: {
                      paddingLeft: `${(heading.level - 1) * 12 + 12}px`
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block truncate ${heading.level === 1 ? "font-semibold" : heading.level === 2 ? "font-medium" : "font-normal text-muted-foreground"}`, children: heading.text || "(Untitled)" })
                  },
                  `${heading.id}-${index}`
                )) }) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { withHandle: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: leftPanelCollapsed && rightPanelCollapsed ? 100 : leftPanelCollapsed ? 75 : rightPanelCollapsed ? 80 : 55, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col relative", children: [
          leftPanelCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "absolute top-4 left-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm",
              onClick: () => setLeftPanelCollapsed(false),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          ),
          rightPanelCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "absolute top-4 right-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm",
              onClick: () => setRightPanelCollapsed(false),
              title: "Show Flashcards",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-lg shadow-soft border border-border p-6", children: [
            flags.standingToolbar && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StandingToolbar,
              {
                onCommand: commandHandler || (() => {
                }),
                editor: editorInstance
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              BlockNoteEditor,
              {
                initialContent: content,
                onChange: setContent,
                placeholder: "Start writing your notes... Use term::definition to create flashcards",
                disablePagination: true,
                onEditorReady: setBlockNoteEditor,
                collaboration: ydoc && provider ? {
                  ydoc,
                  provider,
                  user: user ? {
                    name: user.email || "Anonymous",
                    color: getUserColor(user.id)
                  } : void 0
                } : void 0
              }
            )
          ] }) }) }) })
        ] }) }),
        !rightPanelCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { withHandle: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizablePanel,
            {
              defaultSize: rightPanelSize,
              minSize: 20,
              maxSize: 40,
              onResize: (size) => setRightPanelSize(size),
              className: "relative",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col bg-muted/30 border-l", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b bg-card/50 flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Flashcards" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      className: "h-6 w-6",
                      onClick: () => setRightPanelCollapsed(true),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          className: "flex-1 min-w-0 text-xs h-8",
                          onClick: () => setShowAddCardDialog(true),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 truncate hidden min-[200px]:inline", children: "Add Card" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Add flashcard" })
                    ] }) }),
                    tableOfContents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          className: "flex-1 min-w-0 text-xs h-8",
                          onClick: generateFlashcardsForAllHeadings,
                          disabled: generatingAllCards,
                          children: [
                            generatingAllCards ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 shrink-0 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 truncate hidden min-[200px]:inline", children: "Generate" })
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: "Generate flashcards for all headings" })
                    ] }) })
                  ] }),
                  flashcardPatterns.length > 0 && selectedDeckId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      variant: "secondary",
                      size: "sm",
                      className: "w-full text-xs h-7",
                      onClick: convertPatternsToCards,
                      disabled: convertingCards,
                      children: [
                        convertingCards ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3 mr-1" }),
                        "Convert ",
                        flashcardPatterns.length,
                        " :: patterns"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1 p-3", children: tableOfContents.length === 0 && flashcards.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground text-center py-8", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No flashcards yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add headings to your notes to organize flashcards" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-1", children: [
                    "Use ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted px-1 rounded", children: "term::definition" }),
                    " syntax"
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  tableOfContents.map((heading) => {
                    const headingCards = flashcardsByHeading[heading.id] || [];
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center justify-between gap-2 py-1 px-2 rounded bg-muted/50",
                          style: { paddingLeft: `${(heading.level - 1) * 8 + 8}px` },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium truncate flex-1", children: [
                              heading.text,
                              headingCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground ml-1", children: [
                                "(",
                                headingCards.length,
                                ")"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  variant: "ghost",
                                  size: "icon",
                                  className: "h-5 w-5 shrink-0",
                                  onClick: () => generateFlashcardsForHeading(heading.id, heading.text),
                                  disabled: generatingCardsForHeading === heading.id,
                                  children: generatingCardsForHeading === heading.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: headingCards.length > 0 ? "Add more flashcards" : "Create flashcards" }) })
                            ] }) })
                          ]
                        }
                      ),
                      headingCards.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Card,
                        {
                          className: "group cursor-pointer hover:border-primary/50 transition-colors ml-2",
                          onClick: () => {
                            setPreviewingCard(card);
                            setPreviewFlipped(false);
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate", children: card.front }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  variant: "ghost",
                                  size: "icon",
                                  className: "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    setPreviewingCard(card);
                                    setPreviewFlipped(false);
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" })
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Button,
                                {
                                  variant: "ghost",
                                  size: "icon",
                                  className: "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                                  onClick: (e) => {
                                    e.stopPropagation();
                                    deleteCard(card.id);
                                  },
                                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                                }
                              )
                            ] })
                          ] }) })
                        },
                        card.id
                      ))
                    ] }, heading.id);
                  }),
                  flashcardsByHeading.ungrouped.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 py-1 px-2 rounded bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
                      "Other (",
                      flashcardsByHeading.ungrouped.length,
                      ")"
                    ] }) }),
                    flashcardsByHeading.ungrouped.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Card,
                      {
                        className: "group cursor-pointer hover:border-primary/50 transition-colors ml-2",
                        onClick: () => {
                          setPreviewingCard(card);
                          setPreviewFlipped(false);
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate", children: card.front }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Button,
                              {
                                variant: "ghost",
                                size: "icon",
                                className: "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                                onClick: (e) => {
                                  e.stopPropagation();
                                  setPreviewingCard(card);
                                  setPreviewFlipped(false);
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" })
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Button,
                              {
                                variant: "ghost",
                                size: "icon",
                                className: "h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0",
                                onClick: (e) => {
                                  e.stopPropagation();
                                  deleteCard(card.id);
                                },
                                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                              }
                            )
                          ] })
                        ] }) })
                      },
                      card.id
                    ))
                  ] })
                ] }) }),
                selectedDeck && flashcards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t bg-card/50 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Total: ",
                    flashcards.length
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Due: ",
                    dueCards.length
                  ] })
                ] }) })
              ] })
            }
          )
        ] })
      ] })
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateDeckDialog, onOpenChange: setShowCreateDeckDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Deck" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Create a flashcard deck to organize your study materials." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Deck name...",
          value: newDeckTitle,
          onChange: (e) => setNewDeckTitle(e.target.value),
          onKeyDown: (e) => e.key === "Enter" && createDeck()
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowCreateDeckDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: createDeck, disabled: !newDeckTitle.trim(), children: "Create Deck" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddCardDialog, onOpenChange: setShowAddCardDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Flashcard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new flashcard to your collection." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Heading (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newCardHeadingId || "ungrouped", onValueChange: (val) => setNewCardHeadingId(val === "ungrouped" ? null : val), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a heading..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "ungrouped", children: "No heading (ungrouped)" }),
              tableOfContents.map((heading) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: heading.id, children: heading.text }, heading.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Front (Question/Term)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter the question or term...",
              value: newCardFront,
              onChange: (e) => setNewCardFront(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium mb-2 block", children: "Back (Answer/Definition)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Enter the answer or definition...",
              value: newCardBack,
              onChange: (e) => setNewCardBack(e.target.value),
              onKeyDown: (e) => e.key === "Enter" && addCard()
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowAddCardDialog(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addCard, disabled: !newCardFront.trim() || !newCardBack.trim(), children: "Add Card" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImportToBlockNoteModal,
      {
        open: showImportModal,
        onOpenChange: setShowImportModal,
        onInsert: (blocks) => {
          if (blockNoteEditor) {
            const currentBlocks = blockNoteEditor.document;
            blockNoteEditor.replaceBlocks(
              blockNoteEditor.document,
              [...currentBlocks, ...blocks]
            );
            ue.success("Content imported successfully");
          }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showSubjectDialog, onOpenChange: setShowSubjectDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "z-[100]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Select a Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          'Choose a subject to organize your note "',
          noteTitle,
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: noteSubject || void 0,
          onValueChange: (value) => {
            setNoteSubject(value);
            setShowSubjectDialog(false);
            ue.success(`Subject set to ${SUBJECTS.find((s) => s.value === value)?.label || value}`);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a subject..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "z-[101]", children: SUBJECTS.map((subject) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: subject.value, children: subject.label }, subject.value)) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowSubjectDialog(false), children: "Skip for now" }) })
    ] }) }),
    previewingCard && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "absolute top-4 right-4 h-10 w-10",
          onClick: () => setPreviewingCard(null),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "cursor-pointer transition-all duration-300 transform hover:scale-[1.02]",
            onClick: () => setPreviewFlipped(!previewFlipped),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-12 min-h-[300px] flex flex-col items-center justify-center text-center", children: !previewFlipped ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Question" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-semibold", children: previewingCard.front }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-8", children: "Click to reveal answer" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Answer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", children: previewingCard.back }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-8", children: "Click to show question" })
            ] }) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setPreviewingCard(null),
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "secondary",
              onClick: async () => {
                const cardToRegenerate = previewingCard;
                setPreviewingCard(null);
                ue.loading("Regenerating card...", { id: "regen" });
                try {
                  const { data, error } = await supabase.functions.invoke("generate-flashcards", {
                    body: { content: cardToRegenerate.front, count: 1, regenerate: true }
                  });
                  if (error) throw error;
                  if (data?.flashcards?.[0]) {
                    const { error: updateError } = await supabase.from("flashcards").update({
                      front: data.flashcards[0].front,
                      back: data.flashcards[0].back
                    }).eq("id", cardToRegenerate.id);
                    if (updateError) throw updateError;
                    setFlashcards((cards) => cards.map(
                      (c) => c.id === cardToRegenerate.id ? { ...c, front: data.flashcards[0].front, back: data.flashcards[0].back } : c
                    ));
                    ue.success("Card regenerated!", { id: "regen" });
                  }
                } catch (error) {
                  ue.error("Failed to regenerate card", { id: "regen" });
                }
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 mr-2" }),
                "Regenerate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "destructive",
              onClick: () => {
                deleteCard(previewingCard.id);
                setPreviewingCard(null);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
                "Delete Card"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

export { NotesEditor as default };
