import { _ as __vitePreload } from './vendor-blocknote-BAmltmDn.js';
import { r as reactExports, j as jsxRuntimeExports, aS as Root, aT as Bold, aU as Italic, aV as Underline, aW as Strikethrough, aX as Subscript, aY as Superscript, aZ as Heading1, a_ as Heading2, a$ as Heading3, b0 as Pilcrow, b1 as List, b2 as ListOrdered, b3 as Type, b4 as Quote, b5 as Link, b6 as Minus, ax as FileText, b7 as Image, b8 as Pencil, b9 as Table, ba as ChartColumn, az as Sparkles, bb as AlignLeft, bc as AlignCenter, bd as AlignRight, be as AlignJustify, bf as Undo, bg as Redo, bh as DocumentEditorContainerComponent, bi as Inject, aj as ChevronDown, aw as Lightbulb, bj as MessageSquare, bk as ClipboardCheck, bl as Send, bm as CircleCheckBig, bn as Reply, ab as Circle, a9 as Check, bo as Ellipsis, bp as Pen, aC as Trash2, bq as ChevronUp, $ as LoaderCircle, br as CircleAlert, bs as ExternalLink, bt as Code, bu as SquareCheckBig, al as BookOpen, bv as Sigma, bw as Atom, bx as Palette, a0 as CloudOff, by as FileUp, aN as Save, a2 as ChevronRight, aP as ChevronLeft } from './vendor-react-BeQHm2Hb.js';
import { i as cn, T as Tooltip, c as TooltipTrigger, B as Button, d as TooltipContent, u as useAuth, s as supabase, k as TooltipProvider, D as DropdownMenu, f as DropdownMenuTrigger, g as DropdownMenuContent, h as DropdownMenuItem, b as useGhostSession, e as useFeatureFlags, a as useIsMobile } from './index-C9tyh6tO.js';
import { g as getTemplateForAssignment, a as generateDraftFromOutline, b as getOutlineSectionsFromStructure } from './structureTemplates-BsE3hUWM.js';
import { B as BackButton } from './back-button-CJe-DRZZ.js';
import { C as ChartDialog, B as BlockNoteEditor } from './BlockNoteEditor-DmwbzBh6.js';
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from './popover-sIxpjwXN.js';
import { T as Toolbar } from './vendor-syncfusion-B9hbBizT.js';
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from './card-BTaNjRSt.js';
import { eN as ue } from './vendor-misc-CQ2gQV2M.js';
import { u as useAutoSave } from './use-auto-save-DEAQNb2a.js';
import { T as Textarea } from './textarea-1gnjGx7F.js';
import { S as ScrollArea } from './scroll-area-DHtqER3G.js';
import { A as Avatar, a as AvatarFallback, u as useCollaboration, E as ExportDropdown, C as CollaboratorAvatars, S as ShareModal, R as ResizablePanelGroup, b as ResizablePanel, c as ResizableHandle, I as ImportToBlockNoteModal } from './CollaboratorAvatars-C1VWiRcD.js';
import { F as formatDistanceToNow } from './vendor-datefns-Cgc6WLhj.js';
import { B as Badge } from './badge-B04EGB2M.js';
import { i as iaCriteriaData } from './data-ia-DxRN8XI2.js';
import { c as useParams, u as useNavigate } from './vendor-react-router-D-UwvF_4.js';
import './vendor-prosemirror-l_ukq4jw.js';
import './vendor-yjs-BarRwqAh.js';
import './vendor-tiptap-tuOT8GNt.js';
import './vendor-mantine-CpjnkULY.js';
import './vendor-react-dom-b1tP6waW.js';
import './vendor-export-COR0N_gy.js';
import './vendor-utils-B8uxCDj6.js';
import './vendor-radix-BjF_gpzx.js';
import './vendor-i18n-BRT6rIp6.js';
import './vendor-ketcher-B9jnF8te.js';
import './vendor-supabase-B1aOSilF.js';
import './dialog-BQ4GVXEh.js';
import './input-2hnN3JAu.js';
import './label-BfT9c56I.js';
import './select-DtVQdYEt.js';
import './tabs-D8pTTJCu.js';
import './vendor-recharts-Cv4BIV0T.js';
import './switch-CK-TAwbC.js';
import './vendor-katex-LkNY165q.js';
import './vendor-fuse-Gm-adH5Q.js';

const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    decorative,
    orientation,
    className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
    ...props
  }
));
Separator.displayName = Root.displayName;

const createBlankDocument = () => ({
  "sections": [{
    "blocks": [{
      "characterFormat": {},
      "paragraphFormat": { "styleName": "Normal" },
      "inlines": []
    }],
    "headersFooters": {},
    "sectionFormat": {
      "headerDistance": 36,
      "footerDistance": 36,
      "pageWidth": 612,
      "pageHeight": 792,
      "leftMargin": 72,
      "rightMargin": 72,
      "topMargin": 72,
      "bottomMargin": 72,
      "differentFirstPage": false,
      "differentOddAndEvenPages": false,
      "bidi": false
    }
  }],
  "characterFormat": {
    "fontSize": 12,
    "fontFamily": "Times New Roman"
  },
  "background": { "color": "#FFFFFFFF" },
  "styles": [{
    "type": "Paragraph",
    "name": "Normal",
    "next": "Normal",
    "characterFormat": {
      "fontFamily": "Times New Roman",
      "fontSize": 12
    },
    "paragraphFormat": {
      "afterSpacing": 0,
      "lineSpacing": 2,
      "lineSpacingType": "Multiple"
    }
  }],
  "defaultTabWidth": 36,
  "formatting": false,
  "protectionType": "NoProtection",
  "enforcement": false
});
const parseInitialContent = (content) => {
  if (!content) return "";
  if (content.includes('"sections"') || content.includes('"sn":')) {
    return "";
  }
  if (content.includes('|"') || content.includes('"|') || content.includes('\\"')) {
    return "";
  }
  if (content.startsWith("[")) {
    try {
      const blocks = JSON.parse(content);
      return blocks.map((block) => {
        if (block.content) {
          if (typeof block.content === "string") return block.content;
          if (Array.isArray(block.content)) {
            return block.content.map(
              (item) => typeof item === "string" ? item : item.text || ""
            ).join("");
          }
        }
        return "";
      }).filter(Boolean).join("\n\n");
    } catch {
      return "";
    }
  }
  if (!content.includes("{") && !content.includes("[")) {
    return content;
  }
  return "";
};
const FONTS = [
  "Times New Roman",
  "Arial",
  "Calibri",
  "Georgia",
  "Verdana",
  "Courier New"
];
const FONT_SIZES = ["10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36"];
const SyncfusionEditor = reactExports.forwardRef(({
  initialContent = "",
  onChange,
  placeholder = "Start typing your essay...",
  title,
  onTitleChange,
  onEditorReady,
  onAICommand,
  readOnly = false
}, ref) => {
  const containerRef = reactExports.useRef(null);
  const [isReady, setIsReady] = reactExports.useState(false);
  const [documentTitle, setDocumentTitle] = reactExports.useState(title || "Untitled");
  const isInitialized = reactExports.useRef(false);
  const contentChangeTimeout = reactExports.useRef(null);
  const [currentFont, setCurrentFont] = reactExports.useState("Times New Roman");
  const [currentSize, setCurrentSize] = reactExports.useState("12");
  const [openDropdown, setOpenDropdown] = reactExports.useState(null);
  const [chartDialogOpen, setChartDialogOpen] = reactExports.useState(false);
  const [chartInitialData, setChartInitialData] = reactExports.useState(void 0);
  const [chartInitialTitle, setChartInitialTitle] = reactExports.useState(void 0);
  const getEditor = () => containerRef.current?.documentEditor;
  const toggleBold = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleBold();
    }
  };
  const toggleItalic = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleItalic();
    }
  };
  const toggleUnderline = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleUnderline("Single");
    }
  };
  const toggleStrikethrough = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleStrikethrough();
    }
  };
  const setAlignment = (alignment) => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleTextAlignment(alignment);
    }
  };
  const toggleBulletList = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.applyBullet("●", "Symbol");
    }
  };
  const toggleNumberedList = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.applyNumbering("%1.", "Arabic");
    }
  };
  const applyHeading = (level) => {
    const editor = getEditor();
    if (editor) {
      editor.editor.applyStyle(`Heading ${level}`);
    }
  };
  const undo = () => {
    const editor = getEditor();
    if (editor) {
      editor.editorHistory.undo();
    }
  };
  const redo = () => {
    const editor = getEditor();
    if (editor) {
      editor.editorHistory.redo();
    }
  };
  const insertHorizontalRule = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.insertText("──────────────────────────────────────────");
      editor.editor.insertText("\n");
    }
  };
  const handleFontChange = (font) => {
    const editor = getEditor();
    if (editor) {
      editor.selection.characterFormat.fontFamily = font;
      setCurrentFont(font);
    }
  };
  const handleSizeChange = (size) => {
    const editor = getEditor();
    if (editor) {
      editor.selection.characterFormat.fontSize = parseInt(size);
      setCurrentSize(size);
    }
  };
  const getSelectedText = () => {
    const editor = getEditor();
    if (!editor) return "";
    try {
      return editor.selection.text || "";
    } catch {
      return "";
    }
  };
  const hasSelection = () => getSelectedText().trim().length > 0;
  const handleAI = (command) => {
    const text = getSelectedText();
    if (text && onAICommand) {
      onAICommand(command, text);
    }
    setOpenDropdown(null);
  };
  const toggleSubscript = () => {
    const editor = getEditor();
    if (editor) {
      const current = editor.selection.characterFormat.baselineAlignment;
      editor.selection.characterFormat.baselineAlignment = current === "Subscript" ? "Normal" : "Subscript";
    }
  };
  const toggleSuperscript = () => {
    const editor = getEditor();
    if (editor) {
      const current = editor.selection.characterFormat.baselineAlignment;
      editor.selection.characterFormat.baselineAlignment = current === "Superscript" ? "Normal" : "Superscript";
    }
  };
  const insertLink = () => {
    const editor = getEditor();
    if (editor) {
      const url = prompt("Enter URL:");
      if (url) {
        editor.editor.insertHyperlink(url, getSelectedText() || url);
      }
    }
  };
  const insertTable = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.insertTable(3, 3);
    }
  };
  const insertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const editor = getEditor();
          if (editor && typeof reader.result === "string") {
            editor.editor.insertImage(reader.result, 400, 300);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };
  const insertChartImage = (imageDataUrl) => {
    const editor = getEditor();
    if (editor) {
      editor.editor.insertImage(imageDataUrl, 500, 350);
    }
    setChartInitialData(void 0);
    setChartInitialTitle(void 0);
  };
  const createChartFromTable = () => {
    const editor = getEditor();
    if (!editor) return;
    const selection = editor.selection;
    if (!selection) {
      alert("Please place your cursor inside a table first.");
      return;
    }
    try {
      const tableContent = editor.selection?.getTable?.();
      const documentHelper = editor.documentHelper;
      const currentWidget = documentHelper?.currentWidget;
      let csvData = "";
      let tableFound = false;
      if (currentWidget) {
        let block = currentWidget.paragraph || currentWidget;
        while (block && !tableFound) {
          if (block.containerWidget?.isInsideTable || block.ownerTable) {
            tableFound = true;
            const table = block.ownerTable || block.containerWidget;
            if (table?.childWidgets) {
              table.childWidgets.forEach((row) => {
                const rowData = [];
                row.childWidgets?.forEach((cell) => {
                  let cellText = "";
                  cell.childWidgets?.forEach((para) => {
                    para.childWidgets?.forEach((line) => {
                      line.children?.forEach((element) => {
                        if (element.text) {
                          cellText += element.text;
                        }
                      });
                    });
                  });
                  rowData.push(cellText.trim());
                });
                if (rowData.length >= 2) {
                  csvData += rowData[0] + ", " + rowData[1] + "\n";
                }
              });
            }
            break;
          }
          block = block.containerWidget || block.previousWidget;
        }
      }
      if (csvData.trim()) {
        setChartInitialData(csvData.trim());
        setChartInitialTitle("Chart from Table");
        setOpenDropdown(null);
        setChartDialogOpen(true);
      } else {
        setChartInitialData(void 0);
        setChartInitialTitle(void 0);
        setOpenDropdown(null);
        setChartDialogOpen(true);
        alert("Could not extract table data. Please enter data manually or select a table with 2+ columns (label, value).");
      }
    } catch (error) {
      console.error("Error extracting table data:", error);
      setChartInitialData(void 0);
      setChartInitialTitle(void 0);
      setOpenDropdown(null);
      setChartDialogOpen(true);
    }
  };
  reactExports.useImperativeHandle(ref, () => ({
    save: (filename) => {
      if (containerRef.current?.documentEditor) {
        containerRef.current.documentEditor.save(filename || documentTitle || "Document", "Docx");
      }
    },
    print: () => {
      if (containerRef.current?.documentEditor) {
        containerRef.current.documentEditor.print();
      }
    },
    openFile: () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".docx,.doc,.sfdt";
      input.onchange = (e) => {
        const file = e.target.files?.[0];
        if (file && containerRef.current?.documentEditor) {
          if (file.name.endsWith(".sfdt")) {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") {
                containerRef.current?.documentEditor.open(reader.result);
              }
            };
            reader.readAsText(file);
          } else {
            containerRef.current.documentEditor.open(file);
          }
        }
      };
      input.click();
    },
    getContent: () => {
      return containerRef.current?.documentEditor?.serialize();
    },
    getWordCount: () => {
      return containerRef.current?.documentEditor?.documentHelper?.wordCount?.wordCount || 0;
    },
    getPageCount: () => {
      return containerRef.current?.documentEditor?.pageCount || 1;
    },
    getHeadings: () => {
      const editor = containerRef.current?.documentEditor;
      if (!editor || !editor.documentHelper) return [];
      const headings = [];
      const pages = editor.documentHelper?.pages || [];
      pages.forEach((page, pageIndex) => {
        page.bodyWidgets?.forEach((body) => {
          body.childWidgets?.forEach((block, blockIndex) => {
            if (block.paragraphFormat?.styleName?.toLowerCase().includes("heading")) {
              const styleName = block.paragraphFormat.styleName;
              const levelMatch = styleName.match(/heading\s*(\d+)/i);
              const level = levelMatch ? parseInt(levelMatch[1]) : 1;
              let text = "";
              block.childWidgets?.forEach((line) => {
                line.children?.forEach((child) => {
                  if (child.text) {
                    text += child.text;
                  }
                });
              });
              headings.push({
                id: `heading-${pageIndex}-${blockIndex}`,
                level,
                text: text.trim() || "(Untitled)"
              });
            }
          });
        });
      });
      return headings;
    }
  }), [documentTitle]);
  const handleContentChange = reactExports.useCallback(() => {
    if (!containerRef.current?.documentEditor || !onChange) return;
    if (contentChangeTimeout.current) {
      clearTimeout(contentChangeTimeout.current);
    }
    contentChangeTimeout.current = setTimeout(() => {
      try {
        const sfdt = containerRef.current?.documentEditor?.serialize();
        if (sfdt) {
          onChange(sfdt);
        }
      } catch (error) {
        console.error("Error serializing document:", error);
      }
    }, 500);
  }, [onChange]);
  reactExports.useEffect(() => {
    if (!containerRef.current?.documentEditor || !isReady || isInitialized.current) return;
    isInitialized.current = true;
    try {
      if (containerRef.current.documentEditor) {
        containerRef.current.documentEditor.zoomFactor = 1;
      }
      if (initialContent && initialContent.includes('"sections"')) {
        containerRef.current.documentEditor.open(initialContent);
      } else {
        const doc = createBlankDocument();
        const plainText = parseInitialContent(initialContent);
        if (plainText) {
          const paragraphs = plainText.split("\n\n").filter(Boolean);
          doc.sections[0].blocks = paragraphs.map((text) => ({
            characterFormat: { fontFamily: "Times New Roman", fontSize: 12 },
            paragraphFormat: {
              styleName: "Normal",
              afterSpacing: 0,
              lineSpacing: 2,
              lineSpacingType: "Multiple"
            },
            inlines: [{ text, characterFormat: { fontFamily: "Times New Roman", fontSize: 12 } }]
          }));
        }
        containerRef.current.documentEditor.open(JSON.stringify(doc));
      }
      containerRef.current.documentEditor.documentName = documentTitle;
    } catch (error) {
      console.error("Error initializing document:", error);
      containerRef.current.documentEditor.open(JSON.stringify(createBlankDocument()));
    }
  }, [isReady, initialContent, documentTitle]);
  reactExports.useEffect(() => {
    if (title !== void 0) {
      setDocumentTitle(title);
      if (containerRef.current?.documentEditor) {
        containerRef.current.documentEditor.documentName = title;
      }
    }
  }, [title]);
  const handleCreated = () => {
    setIsReady(true);
    if (containerRef.current?.documentEditor) {
      containerRef.current.documentEditor.layoutType = "Pages";
      if (readOnly) {
        containerRef.current.documentEditor.isReadOnly = true;
      }
    }
    if (onEditorReady && ref) {
      onEditorReady(ref);
    }
  };
  const ToolbarButton = ({
    onClick,
    icon: Icon,
    tooltip,
    active = false,
    disabled = false,
    className = ""
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: active ? "secondary" : "ghost",
        size: "sm",
        onClick,
        disabled,
        className: `h-8 w-8 p-0 ${className}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: tooltip })
  ] });
  const DropdownSection = ({
    trigger,
    label,
    children,
    id,
    className = ""
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: openDropdown === id, onOpenChange: (open) => setOpenDropdown(open ? id : null), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: `h-8 gap-1 px-2 ${className}`, children: [
        trigger,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: label }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-48 p-1", align: "start", children })
  ] });
  const MenuItem = ({
    icon: Icon,
    label,
    onClick,
    disabled = false,
    description
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
      onClick: () => {
        if (!disabled) {
          onClick();
          setOpenDropdown(null);
        }
      },
      disabled,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: description })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full w-full flex flex-col syncfusion-editor-container", children: [
    !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 flex items-center justify-center gap-0.5 p-1.5 bg-background border-b overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 px-2 py-1 bg-muted/50 rounded-lg flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Bold, tooltip: "Bold (⌘B)", onClick: toggleBold }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Italic, tooltip: "Italic (⌘I)", onClick: toggleItalic }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Underline, tooltip: "Underline (⌘U)", onClick: toggleUnderline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Strikethrough, tooltip: "Strikethrough", onClick: toggleStrikethrough, className: "hidden sm:flex" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Subscript, tooltip: "Subscript", onClick: toggleSubscript, className: "hidden lg:flex" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Superscript, tooltip: "Superscript", onClick: toggleSuperscript, className: "hidden lg:flex" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropdownSection,
        {
          id: "blocks",
          trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }),
          label: "Block Type",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Headings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Heading1, label: "Heading 1", onClick: () => applyHeading(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Heading2, label: "Heading 2", onClick: () => applyHeading(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Heading3, label: "Heading 3", onClick: () => applyHeading(3) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Pilcrow, label: "Normal", onClick: () => {
              const editor = getEditor();
              if (editor) editor.editor.applyStyle("Normal");
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Lists" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: List, label: "Bullet List", onClick: toggleBulletList }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: ListOrdered, label: "Numbered List", onClick: toggleNumberedList })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropdownSection,
        {
          id: "document",
          trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          label: "Document",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "References" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Quote,
                label: "Citation",
                description: "Add reference",
                onClick: () => {
                  window.postMessage({ type: "open-citation-dialog" }, "*");
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Link,
                label: "Link",
                description: "Add hyperlink",
                onClick: insertLink
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Insert" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Minus,
                label: "Horizontal Line",
                description: "Page divider",
                onClick: insertHorizontalRule
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1 hidden sm:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropdownSection,
        {
          id: "media",
          trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
          label: "Media & Insert",
          className: "hidden sm:flex",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Media" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Image,
                label: "Image",
                description: "Insert image",
                onClick: insertImage
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Pencil,
                label: "Drawing",
                description: "Sketch/diagram",
                onClick: () => {
                  window.postMessage({ type: "open-drawing-dialog" }, "*");
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Table,
                label: "Table",
                description: "Data table",
                onClick: insertTable
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Charts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: ChartColumn,
                label: "New Chart",
                description: "Create chart manually",
                onClick: () => {
                  setChartInitialData(void 0);
                  setChartInitialTitle(void 0);
                  setOpenDropdown(null);
                  setChartDialogOpen(true);
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: ChartColumn,
                label: "Chart from Table",
                description: "Generate from selected table",
                onClick: createChartFromTable
              }
            )
          ] })
        }
      ),
      onAICommand && /* @__PURE__ */ jsxRuntimeExports.jsx(
        DropdownSection,
        {
          id: "ai",
          trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          label: "AI Commands",
          className: "hidden md:flex",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: hasSelection() ? `AI: "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}"` : "Select text first" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Sparkles,
                label: "Define",
                description: "Get definition",
                onClick: () => handleAI("define"),
                disabled: !hasSelection()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Sparkles,
                label: "Explain",
                description: "Get explanation",
                onClick: () => handleAI("explain"),
                disabled: !hasSelection()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Sparkles,
                label: "Synonym",
                description: "Find alternatives",
                onClick: () => handleAI("synonym"),
                disabled: !hasSelection()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Sparkles,
                label: "Rephrase",
                description: "Rewrite text",
                onClick: () => handleAI("rephrase"),
                disabled: !hasSelection()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MenuItem,
              {
                icon: Sparkles,
                label: "Grammar",
                description: "Check & fix",
                onClick: () => handleAI("grammar"),
                disabled: !hasSelection()
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1 hidden sm:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => setAlignment("Left"), icon: AlignLeft, tooltip: "Align Left" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => setAlignment("Center"), icon: AlignCenter, tooltip: "Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => setAlignment("Right"), icon: AlignRight, tooltip: "Align Right" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: () => setAlignment("Justify"), icon: AlignJustify, tooltip: "Justify", className: "hidden md:flex" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1 hidden lg:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: currentFont,
            onChange: (e) => handleFontChange(e.target.value),
            className: "h-8 px-2 text-xs border rounded bg-background",
            children: FONTS.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: font, children: font }, font))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: currentSize,
            onChange: (e) => handleSizeChange(e.target.value),
            className: "h-8 w-14 px-1 text-xs border rounded bg-background",
            children: FONT_SIZES.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: size, children: size }, size))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1 hidden xl:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden xl:flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: undo, icon: Undo, tooltip: "Undo (⌘Z)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { onClick: redo, icon: Redo, tooltip: "Redo (⌘Y)" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 syncfusion-editor-container", style: { height: "100%", minHeight: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          /* Hide Syncfusion toolbar and status bar */
          .syncfusion-editor-container .e-de-toolbar,
          .syncfusion-editor-container .e-de-ctn-title,
          .syncfusion-editor-container .e-toolbar,
          .syncfusion-editor-container .e-de-status-bar,
          .syncfusion-editor-container .e-de-statusbar-footer {
            display: none !important;
          }
          
          /* Make the document editor take full height */
          .syncfusion-editor-container .e-documenteditorcontainer {
            height: 100% !important;
            border: none !important;
          }
          
          .syncfusion-editor-container .e-de-ctn {
            height: 100% !important;
          }
          
          /* Hide zoom controls */
          .syncfusion-editor-container .e-de-zoom {
            display: none !important;
          }
          
          /* Style the document area with gray background */
          .syncfusion-editor-container .e-de-viewer {
            background: #f0f0f0 !important;
          }
          
          /* Page styling with shadow and margins */
          .syncfusion-editor-container .e-de-page {
            box-shadow: 0 0 10px rgba(0,0,0,0.15) !important;
            margin: 20px auto !important;
            background: white !important;
          }
          
          /* Style the viewer wrapper */
          .syncfusion-editor-container .e-de-viewer-wrapper {
            background: #f0f0f0 !important;
          }
          
          /* Mobile responsive */
          @media (max-width: 768px) {
            .syncfusion-editor-container .e-de-page {
              margin: 10px auto !important;
              width: calc(100% - 20px) !important;
            }
          }
        ` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DocumentEditorContainerComponent,
        {
          id: "draft-syncfusion-editor",
          ref: containerRef,
          style: { display: "block", height: "100%" },
          height: "100%",
          enableToolbar: false,
          showPropertiesPane: false,
          enableLocalPaste: true,
          locale: "en-US",
          contentChange: handleContentChange,
          created: handleCreated,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inject, { services: [Toolbar] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChartDialog,
      {
        open: chartDialogOpen,
        onOpenChange: setChartDialogOpen,
        onInsertChart: insertChartImage,
        initialData: chartInitialData,
        initialTitle: chartInitialTitle
      }
    )
  ] });
});
SyncfusionEditor.displayName = "SyncfusionEditor";

function useDraftComments({ draftId }) {
  const { user } = useAuth();
  const [comments, setComments] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const fetchComments = reactExports.useCallback(async () => {
    if (!draftId) {
      setComments([]);
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.from("draft_comments").select("*").eq("draft_id", draftId).order("created_at", { ascending: true });
      if (error) throw error;
      const userIds = [...new Set((data || []).map((c) => c.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
      const profileMap = new Map(profiles?.map((p) => [p.id, p.full_name]) || []);
      const commentsWithNames = (data || []).map((c) => ({
        ...c,
        user_name: profileMap.get(c.user_id) || "Anonymous"
      }));
      const parentComments = commentsWithNames.filter((c) => !c.parent_id);
      const replies = commentsWithNames.filter((c) => c.parent_id);
      const threaded = parentComments.map((parent) => ({
        ...parent,
        replies: replies.filter((r) => r.parent_id === parent.id)
      }));
      setComments(threaded);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, [draftId]);
  const addComment = reactExports.useCallback(async (blockId, content, quotedText, parentId) => {
    if (!draftId || !user) {
      ue.error("You must be logged in to comment");
      return null;
    }
    try {
      const { data, error } = await supabase.from("draft_comments").insert({
        draft_id: draftId,
        block_id: blockId,
        user_id: user.id,
        content,
        quoted_text: quotedText || null,
        parent_id: parentId || null
      }).select().single();
      if (error) throw error;
      ue.success("Comment added");
      await fetchComments();
      return data;
    } catch (error) {
      console.error("Error adding comment:", error);
      ue.error("Failed to add comment");
      return null;
    }
  }, [draftId, user, fetchComments]);
  const updateComment = reactExports.useCallback(async (commentId, content) => {
    if (!user) return false;
    try {
      const { error } = await supabase.from("draft_comments").update({ content, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", commentId).eq("user_id", user.id);
      if (error) throw error;
      ue.success("Comment updated");
      await fetchComments();
      return true;
    } catch (error) {
      console.error("Error updating comment:", error);
      ue.error("Failed to update comment");
      return false;
    }
  }, [user, fetchComments]);
  const deleteComment = reactExports.useCallback(async (commentId) => {
    try {
      const { error } = await supabase.from("draft_comments").delete().eq("id", commentId);
      if (error) throw error;
      ue.success("Comment deleted");
      await fetchComments();
      return true;
    } catch (error) {
      console.error("Error deleting comment:", error);
      ue.error("Failed to delete comment");
      return false;
    }
  }, [fetchComments]);
  const toggleResolve = reactExports.useCallback(async (commentId, resolved) => {
    try {
      const { error } = await supabase.from("draft_comments").update({ resolved }).eq("id", commentId);
      if (error) throw error;
      ue.success(resolved ? "Comment resolved" : "Comment reopened");
      await fetchComments();
      return true;
    } catch (error) {
      console.error("Error toggling resolve:", error);
      ue.error("Failed to update comment");
      return false;
    }
  }, [fetchComments]);
  const getBlockComments = reactExports.useCallback((blockId) => {
    return comments.filter((c) => c.block_id === blockId);
  }, [comments]);
  const getCommentedBlockIds = reactExports.useCallback(() => {
    return [...new Set(comments.map((c) => c.block_id))];
  }, [comments]);
  reactExports.useEffect(() => {
    if (!draftId) return;
    fetchComments();
    const channel = supabase.channel(`draft-comments-${draftId}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "draft_comments",
        filter: `draft_id=eq.${draftId}`
      },
      () => {
        fetchComments();
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [draftId, fetchComments]);
  return {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    toggleResolve,
    getBlockComments,
    getCommentedBlockIds,
    refetch: fetchComments
  };
}

const panels = [
  { id: "feedback", icon: Sparkles, label: "AI Feedback" },
  { id: "outline", icon: Lightbulb, label: "Planning Notes" },
  { id: "comments", icon: MessageSquare, label: "Comments" },
  { id: "grading", icon: ClipboardCheck, label: "Grading Criteria" },
  { id: "toc", icon: List, label: "Table of Contents" }
];
function PanelSelector({ activePanel, onPanelChange, side, lastSelected, collapsed }) {
  const handleClick = (panelId) => {
    if (activePanel === panelId) {
      onPanelChange(null);
    } else {
      onPanelChange(panelId);
    }
  };
  if (collapsed && lastSelected) {
    const panel = panels.find((p) => p.id === lastSelected);
    if (panel) {
      const Icon = panel.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onPanelChange(lastSelected),
            className: "p-2 rounded-md transition-colors hover:bg-muted text-muted-foreground",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Open ",
          panel.label
        ] }) })
      ] }) });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-row gap-1", children: panels.map((panel) => {
    const Icon = panel.icon;
    const isActive = activePanel === panel.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleClick(panel.id),
          className: cn(
            "p-2 rounded-md transition-colors",
            "hover:bg-muted",
            isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground"
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: panel.label }) })
    ] }, panel.id);
  }) }) });
}
function getPanelTitle(panelType) {
  switch (panelType) {
    case "feedback":
      return "AI Feedback";
    case "outline":
      return "Planning Notes";
    case "comments":
      return "Comments";
    case "grading":
      return "Grading Criteria";
    case "toc":
      return "Table of Contents";
    default:
      return "";
  }
}
function getPanelIcon(panelType) {
  switch (panelType) {
    case "feedback":
      return Sparkles;
    case "outline":
      return Lightbulb;
    case "comments":
      return MessageSquare;
    case "grading":
      return ClipboardCheck;
    case "toc":
      return List;
    default:
      return null;
  }
}

function CommentItem({
  comment,
  onReply,
  onEdit,
  onDelete,
  onToggleResolve,
  onBlockClick,
  isReply = false,
  currentUserId,
  isHighlighted = false
}) {
  const [showReplies, setShowReplies] = reactExports.useState(true);
  const isOwner = currentUserId === comment.user_id;
  const initials = (comment.user_name || "A").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
    "group",
    isReply ? "ml-6 pl-4 border-l-2 border-border" : "",
    comment.resolved ? "opacity-60" : "",
    isHighlighted ? "ring-2 ring-primary ring-offset-2 rounded-lg" : ""
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
          isHighlighted ? "bg-primary/10" : ""
        ),
        onClick: () => onBlockClick(comment.block_id),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-xs bg-primary/10 text-primary", children: initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm truncate", children: comment.user_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: timeAgo }),
              comment.resolved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-green-600 flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
                "Resolved"
              ] })
            ] }),
            comment.quoted_text && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded border-l-2 border-primary/50 mb-2",
                children: [
                  '"',
                  comment.quoted_text.slice(0, 100),
                  comment.quoted_text.length > 100 ? "..." : "",
                  '"'
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm whitespace-pre-wrap", children: comment.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [
              !isReply && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 px-2 text-xs",
                  onClick: (e) => {
                    e.stopPropagation();
                    onReply(comment.id);
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-3 w-3 mr-1" }),
                    "Reply"
                  ]
                }
              ),
              !isReply && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 px-2 text-xs",
                  onClick: (e) => {
                    e.stopPropagation();
                    onToggleResolve(comment.id, !comment.resolved);
                  },
                  children: comment.resolved ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-3 w-3 mr-1" }),
                    "Reopen"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 mr-1" }),
                    "Resolve"
                  ] })
                }
              ),
              isOwner && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-7 w-7 p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-3 w-3" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => onEdit(comment), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3 mr-2" }),
                    "Edit"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    DropdownMenuItem,
                    {
                      onClick: () => onDelete(comment.id),
                      className: "text-destructive",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 mr-2" }),
                        "Delete"
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    comment.replies && comment.replies.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground ml-3 mb-1",
          onClick: () => setShowReplies(!showReplies),
          children: [
            showReplies ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }),
            comment.replies.length,
            " ",
            comment.replies.length === 1 ? "reply" : "replies"
          ]
        }
      ),
      showReplies && comment.replies.map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentItem,
        {
          comment: reply,
          onReply,
          onEdit,
          onDelete,
          onToggleResolve,
          onBlockClick,
          isReply: true,
          currentUserId
        },
        reply.id
      ))
    ] })
  ] });
}
function CommentsPanel({ draftId, selectedBlockId, selectedText, onBlockSelect, onHighlightBlock }) {
  const { user } = useAuth();
  const {
    comments,
    loading,
    addComment,
    updateComment,
    deleteComment,
    toggleResolve
  } = useDraftComments({ draftId: draftId || null });
  const [newComment, setNewComment] = reactExports.useState("");
  const [replyingTo, setReplyingTo] = reactExports.useState(null);
  const [editingComment, setEditingComment] = reactExports.useState(null);
  const [showResolved, setShowResolved] = reactExports.useState(false);
  const [highlightedBlockId, setHighlightedBlockId] = reactExports.useState(null);
  const displayComments = [...comments].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const filteredComments = showResolved ? displayComments : displayComments.filter((c) => !c.resolved);
  const unresolvedCount = comments.filter((c) => !c.resolved).length;
  const resolvedCount = comments.filter((c) => c.resolved).length;
  const targetBlockId = selectedBlockId ?? null;
  const hasSelection = !!(selectedText && selectedText.trim().length > 0);
  const showNewCommentBox = !replyingTo && !editingComment;
  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    if (editingComment) {
      await updateComment(editingComment.id, newComment);
      setEditingComment(null);
      setNewComment("");
      return;
    }
    if (replyingTo) {
      const parentComment = comments.find((c) => c.id === replyingTo);
      if (parentComment) {
        await addComment(parentComment.block_id, newComment, void 0, replyingTo);
      }
      setReplyingTo(null);
      setNewComment("");
      return;
    }
    if (!targetBlockId) return;
    await addComment(
      targetBlockId,
      newComment,
      hasSelection ? selectedText || void 0 : void 0
    );
    setNewComment("");
  };
  const handleBlockClick = (blockId) => {
    setHighlightedBlockId(blockId);
    onHighlightBlock?.(blockId);
    setTimeout(() => {
      setHighlightedBlockId(null);
    }, 2e3);
  };
  if (!draftId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
        "Comments"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Save your draft to enable comments." })
      ] }) })
    ] });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
        "Comments"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Sign in to view and add comments." })
      ] }) })
    ] });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-sm flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
        "Comments"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-6 w-6 border-b-2 border-primary" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-medium text-sm flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
          "Comments"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            unresolvedCount,
            " open"
          ] }),
          resolvedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "hover:text-foreground",
              onClick: () => setShowResolved(!showResolved),
              children: [
                showResolved ? "Hide" : "Show",
                " ",
                resolvedCount,
                " resolved"
              ]
            }
          )
        ] })
      ] }),
      hasSelection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs bg-primary/10 text-primary px-2 py-1.5 rounded border border-primary/20 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex-1 truncate", children: [
        'Selected: "',
        selectedText?.slice(0, 50),
        (selectedText?.length || 0) > 50 ? "..." : "",
        '"'
      ] }) })
    ] }),
    showNewCommentBox && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b bg-muted/30 shrink-0", children: [
      !targetBlockId && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Click inside the editor to choose where your comment should attach." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: hasSelection ? "Add a comment on the selected text..." : "Add a comment...",
            value: newComment,
            onChange: (e) => setNewComment(e.target.value),
            className: "min-h-[60px] text-sm resize-none",
            onKeyDown: (e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
              if (e.key === "Escape") {
                setNewComment("");
              }
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            onClick: handleSubmit,
            disabled: !targetBlockId || !newComment.trim(),
            className: "shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "⌘+Enter to submit • Esc to clear" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: filteredComments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: targetBlockId ? hasSelection ? "Add a comment on the selected text above." : "Add a comment above (it will attach to the current paragraph)." : "Click inside the editor to attach a comment." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: filteredComments.map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItem,
      {
        comment,
        onReply: setReplyingTo,
        onEdit: (c) => {
          setEditingComment(c);
          setNewComment(c.content);
        },
        onDelete: deleteComment,
        onToggleResolve: toggleResolve,
        onBlockClick: handleBlockClick,
        currentUserId: user?.id,
        isHighlighted: highlightedBlockId === comment.block_id
      },
      comment.id
    )) }) }) }),
    (replyingTo || editingComment) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-t bg-muted/30 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: editingComment ? "Editing comment" : "Replying to comment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "hover:text-foreground",
            onClick: () => {
              setReplyingTo(null);
              setEditingComment(null);
              setNewComment("");
            },
            children: "Cancel"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: editingComment ? "Edit your comment..." : "Write a reply...",
            value: newComment,
            onChange: (e) => setNewComment(e.target.value),
            className: "min-h-[60px] text-sm resize-none",
            autoFocus: true,
            onKeyDown: (e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "icon",
            onClick: handleSubmit,
            disabled: !newComment.trim(),
            className: "shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "⌘+Enter to submit" })
    ] })
  ] });
}

const SUBJECT_GUIDES = [
  // Core
  { subject: "tok", label: "Theory of Knowledge", pdfFile: "tok.pdf", txtFile: "tok.txt", year: 2022, availableFor: ["tok_essay", "tok_exhibition"] },
  // Group 1: Studies in Language and Literature
  { subject: "lang_a_lang_lit", label: "Language A: Language and Literature", pdfFile: "lang_a_lang_lit.pdf", txtFile: "lang_a_lang_lit.txt", year: 2021, availableFor: ["ia", "ee"] },
  { subject: "lang_a_literature", label: "Language A: Literature", pdfFile: "lang_a_lang_lit.pdf", txtFile: "lang_a_lang_lit.txt", year: 2021, availableFor: ["ia", "ee"] },
  // Uses same guide
  // Group 2: Language Acquisition (all use the same Language B guide)
  { subject: "english_b", label: "English B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "french_b", label: "French B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "german_b", label: "German B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "spanish_b", label: "Spanish B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "italian_b", label: "Italian B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "japanese_b", label: "Japanese B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "mandarin_b", label: "Mandarin B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  { subject: "other_b", label: "Other Language B", pdfFile: "language_b.pdf", txtFile: "language_b.txt", year: 2020, availableFor: ["ia", "ee"] },
  // Group 3: Individuals and Societies
  { subject: "business_management", label: "Business Management", pdfFile: "business_management.pdf", txtFile: "business_management.txt", year: 2024, availableFor: ["ia", "ee"] },
  { subject: "economics", label: "Economics", pdfFile: "economics.pdf", txtFile: "economics.txt", year: 2022, availableFor: ["ia", "ee"] },
  { subject: "geography", label: "Geography", pdfFile: "geography.pdf", txtFile: "geography.txt", year: 2019, availableFor: ["ia", "ee"] },
  { subject: "history", label: "History", pdfFile: "history.pdf", txtFile: "history.txt", year: 2020, availableFor: ["ia", "ee"] },
  // Group 4: Sciences
  { subject: "biology", label: "Biology", pdfFile: "biology.pdf", txtFile: "biology.txt", year: 2025, availableFor: ["ia", "ee"] },
  { subject: "chemistry", label: "Chemistry", pdfFile: "chemistry.pdf", txtFile: "chemistry.txt", year: 2025, availableFor: ["ia", "ee"] },
  { subject: "physics", label: "Physics", pdfFile: "physics.pdf", txtFile: "physics.txt", year: 2025, availableFor: ["ia", "ee"] },
  { subject: "sehs", label: "Sports, Exercise and Health Science", pdfFile: "sehs.pdf", txtFile: "sehs.txt", year: 2026, availableFor: ["ia", "ee"] },
  // Group 5: Mathematics
  { subject: "math_aa", label: "Mathematics: Analysis and Approaches", pdfFile: "math_aa.pdf", txtFile: "math_aa.txt", year: 2021, availableFor: ["ia", "ee"] },
  { subject: "math_ai", label: "Mathematics: Applications and Interpretation", pdfFile: "math_ai.pdf", txtFile: "math_ai.txt", year: 2021, availableFor: ["ia", "ee"] },
  // Group 6: The Arts
  { subject: "visual_arts", label: "Visual Arts", pdfFile: "visual_arts.pdf", txtFile: "visual_arts.txt", year: 2017, availableFor: ["ia", "ee"] }
];
const EXTENDED_ESSAY_GUIDE = {
  subject: "ee",
  label: "Extended Essay",
  pdfFile: "ee.pdf",
  txtFile: "ee.txt",
  year: 2018,
  availableFor: ["ee"]
};
function getGuideForSubject(subject, taskType) {
  if (taskType === "ee") {
    return EXTENDED_ESSAY_GUIDE;
  }
  if (subject === "tok") {
    return SUBJECT_GUIDES.find((g) => g.subject === "tok") || null;
  }
  return SUBJECT_GUIDES.find((g) => g.subject === subject) || null;
}

function GradingCriteriaTable({ criterion }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "grading-criteria-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: criterion.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
          criterion.maxMarks,
          " marks"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
          criterion.weighting,
          "%"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grading-criteria-table-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "grading-criteria-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "marks-column", children: "Marks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "descriptor-column", children: "Level Descriptor" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: criterion.levels.map((level, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `level-${level.marks.replace("-", "_")}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "marks-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "marks-badge", children: level.marks }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "descriptor-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "descriptor-content", children: level.descriptor.split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: line.startsWith("•") ? "bullet-point" : "", children: line }, i)) }) })
        ] }, index)) })
      ] }) }),
      criterion.clarifications && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "clarifications-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "clarifications-title", children: "Clarifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "clarifications-content", children: criterion.clarifications.split("\n\n").map((paragraph, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "clarification-paragraph", children: paragraph.split("\n").map((line, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: line.startsWith("•") ? "bullet-point" : "", children: line }, j)) }, i)) })
      ] })
    ] })
  ] });
}

const SUBJECT_KEY_MAP = {
  "biology": "biology",
  "chemistry": "chemistry",
  "physics": "physics",
  "business_management": "businessManagement",
  "economics": "economics",
  "history": "history",
  "geography": "geography",
  "psychology": "psychology",
  "sehs": "sehs",
  "math_aa": "mathAA",
  "math_ai": "mathAI",
  "lang_a_lang_lit": "languageALangLit",
  "lang_a_literature": "languageALangLit",
  "english_b": "languageB",
  "french_b": "languageB",
  "german_b": "languageB",
  "spanish_b": "languageB",
  "italian_b": "languageB",
  "japanese_b": "languageB",
  "mandarin_b": "languageB",
  "other_b": "languageB",
  "visual_arts": "visualArts",
  "computer_science": "computerScience"
};
function GradingCriteriaPanel({ subject, taskType }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [criteria, setCriteria] = reactExports.useState([]);
  const [subjectData, setSubjectData] = reactExports.useState(null);
  const [guide, setGuide] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!subject || !taskType) {
      setCriteria([]);
      setSubjectData(null);
      setGuide(null);
      setError(null);
      return;
    }
    const loadCriteria = () => {
      setLoading(true);
      setError(null);
      try {
        const guideInfo = getGuideForSubject(subject, taskType);
        setGuide(guideInfo);
        if (taskType === "ia") {
          const subjectKey = SUBJECT_KEY_MAP[subject];
          const data = subjectKey ? iaCriteriaData[subjectKey] : null;
          if (data) {
            setSubjectData(data);
            setCriteria(data.criteria);
            setError(null);
          } else {
            setError(`IA criteria not yet available for ${guideInfo?.label || subject}`);
            setCriteria([]);
            setSubjectData(null);
          }
        } else {
          setError(`Detailed criteria available in the full guide`);
          setCriteria([]);
          setSubjectData(null);
        }
      } catch (err) {
        setError("Failed to load grading criteria");
      } finally {
        setLoading(false);
      }
    };
    loadCriteria();
  }, [subject, taskType]);
  const openPdfGuide = () => {
    if (guide) {
      window.open(`/guides/${guide.pdfFile}`, "_blank");
    }
  };
  if (!subject || !taskType) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium mb-2", children: "Grading Criteria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: "Select an assignment to view its grading criteria." })
    ] });
  }
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 mx-auto mb-4 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Loading grading criteria..." })
    ] });
  }
  if (error && criteria.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium mb-2", children: "Grading Criteria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-4", children: error }),
      guide && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "mt-4",
          onClick: openPdfGuide,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3 mr-2" }),
            "View Full Guide",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 ml-2" })
          ]
        }
      )
    ] });
  }
  const taskTypeLabel = taskType === "ia" ? "Internal Assessment" : taskType === "ee" ? "Extended Essay" : taskType === "tok_essay" ? "ToK Essay" : taskType === "tok_exhibition" ? "ToK Exhibition" : taskType;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "Grading Criteria" })
      ] }),
      subjectData && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: subjectData.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: taskTypeLabel }),
        subjectData.yearPublished && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: subjectData.yearPublished }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "default", className: "text-xs", children: [
          subjectData.totalMarks,
          " marks total"
        ] })
      ] }),
      guide && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "w-full text-xs",
          onClick: openPdfGuide,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3 mr-2" }),
            "View Full Guide (PDF)",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 ml-2" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-4", children: criteria.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: 'Click "View Full Guide" for complete details.' }) }) : criteria.map((criterion, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(GradingCriteriaTable, { criterion }, idx)) }) })
  ] });
}

function FixedEditorToolbar({ editor, onAICommand }) {
  const [openDropdown, setOpenDropdown] = reactExports.useState(null);
  const getSelectedText = () => {
    if (!editor) return "";
    try {
      return editor.getSelectedText() || "";
    } catch {
      return "";
    }
  };
  const hasSelection = () => getSelectedText().trim().length > 0;
  const toggleBold = () => editor?.toggleStyles({ bold: true });
  const toggleItalic = () => editor?.toggleStyles({ italic: true });
  const toggleUnderline = () => editor?.toggleStyles({ underline: true });
  const toggleStrike = () => editor?.toggleStyles({ strike: true });
  const toggleCode = () => editor?.toggleStyles({ code: true });
  const toggleSubscript = () => editor?.toggleStyles({ subscript: true });
  const toggleSuperscript = () => editor?.toggleStyles({ superscript: true });
  const setHeading1 = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "heading", props: { level: 1 } });
  };
  const setHeading2 = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "heading", props: { level: 2 } });
  };
  const setHeading3 = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "heading", props: { level: 3 } });
  };
  const setParagraph = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "paragraph" });
  };
  const setBulletList = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "bulletListItem" });
  };
  const setNumberedList = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "numberedListItem" });
  };
  const setCheckList = () => {
    const block = editor?.getTextCursorPosition().block;
    if (block) editor?.updateBlock(block, { type: "checkListItem" });
  };
  const handleAI = (command) => {
    const text = getSelectedText();
    if (text) {
      onAICommand(command, text);
    }
    setOpenDropdown(null);
  };
  const ToolbarButton = ({
    icon: Icon,
    label,
    onClick,
    active = false,
    disabled = false,
    className = ""
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: active ? "secondary" : "ghost",
        size: "sm",
        className: `h-8 w-8 p-0 ${className}`,
        onClick,
        disabled,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: label }) })
  ] });
  const DropdownSection = ({
    trigger,
    label,
    children,
    id,
    className = ""
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open: openDropdown === id, onOpenChange: (open) => setOpenDropdown(open ? id : null), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: `h-8 gap-1 px-2 ${className}`, children: [
        trigger,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: label }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-48 p-1", align: "start", children })
  ] });
  const MenuItem = ({
    icon: Icon,
    label,
    onClick,
    disabled = false,
    description
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
      onClick: () => {
        if (!disabled) {
          onClick();
          setOpenDropdown(null);
        }
      },
      disabled,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: description })
        ] })
      ]
    }
  );
  if (!editor) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 flex items-center justify-center gap-0.5 p-1.5 bg-background border-b overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 px-2 py-1 bg-muted/50 rounded-lg flex-shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Bold, label: "Bold (⌘B)", onClick: toggleBold }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Italic, label: "Italic (⌘I)", onClick: toggleItalic }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Underline, label: "Underline (⌘U)", onClick: toggleUnderline }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Strikethrough, label: "Strikethrough", onClick: toggleStrike, className: "hidden sm:flex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Code, label: "Inline Code", onClick: toggleCode, className: "hidden md:flex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Subscript, label: "Subscript (⌘,)", onClick: toggleSubscript, className: "hidden lg:flex" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { icon: Superscript, label: "Superscript (⌘.)", onClick: toggleSuperscript, className: "hidden lg:flex" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownSection,
      {
        id: "blocks",
        trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "h-4 w-4" }),
        label: "Block Type",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Headings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Heading1, label: "Heading 1", onClick: setHeading1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Heading2, label: "Heading 2", onClick: setHeading2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Heading3, label: "Heading 3", onClick: setHeading3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: Pilcrow, label: "Paragraph", onClick: setParagraph }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Lists" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: List, label: "Bullet List", onClick: setBulletList }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: ListOrdered, label: "Numbered List", onClick: setNumberedList }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { icon: SquareCheckBig, label: "Check List", onClick: setCheckList })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownSection,
      {
        id: "document",
        trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
        label: "Document",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "References" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Quote,
              label: "Citation",
              description: "Add reference",
              onClick: () => {
                window.postMessage({ type: "open-citation-dialog" }, "*");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Link,
              label: "Link",
              description: "Add hyperlink",
              onClick: () => {
                const url = prompt("Enter URL:");
                if (url) {
                  editor?.createLink(url);
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Structure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: FileText,
              label: "Title Page",
              description: "Insert title page",
              onClick: () => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks(
                    [
                      {
                        type: "heading",
                        props: { level: 1, textAlignment: "center" },
                        content: [{ type: "text", text: "Document Title", styles: {} }]
                      },
                      {
                        type: "paragraph",
                        props: { textAlignment: "center" },
                        content: [{ type: "text", text: "Author Name", styles: {} }]
                      },
                      {
                        type: "paragraph",
                        props: { textAlignment: "center" },
                        content: [{ type: "text", text: (/* @__PURE__ */ new Date()).toLocaleDateString(), styles: {} }]
                      }
                    ],
                    block,
                    "after"
                  );
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: List,
              label: "Table of Contents",
              description: "Generate TOC",
              onClick: () => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  const allBlocks = editor?.document || [];
                  const headings = allBlocks.filter((b) => b.type === "heading");
                  const tocBlocks = [
                    {
                      type: "heading",
                      props: { level: 2 },
                      content: [{ type: "text", text: "Table of Contents", styles: { bold: true } }]
                    }
                  ];
                  headings.forEach((heading) => {
                    const level = heading.props?.level || 1;
                    const text = heading.content?.map((c) => c.text || "").join("") || "Untitled";
                    const indent = "  ".repeat(level - 1);
                    tocBlocks.push({
                      type: "paragraph",
                      content: [{ type: "text", text: `${indent}${text}`, styles: {} }]
                    });
                  });
                  editor?.insertBlocks(tocBlocks, block, "after");
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: BookOpen,
              label: "Bibliography",
              description: "References section",
              onClick: () => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks(
                    [
                      {
                        type: "heading",
                        props: { level: 2 },
                        content: [{ type: "text", text: "References", styles: { bold: true } }]
                      },
                      {
                        type: "paragraph",
                        content: [{ type: "text", text: "[1] Author, A. (Year). Title of work. Publisher.", styles: {} }]
                      }
                    ],
                    block,
                    "after"
                  );
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "h-6 mx-1 hidden sm:block" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownSection,
      {
        id: "media",
        trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
        label: "Media & Insert",
        className: "hidden sm:flex",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Media" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Image,
              label: "Image",
              description: "Insert image",
              onClick: () => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks([{ type: "image", props: { url: "", caption: "" } }], block, "after");
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Pencil,
              label: "Drawing",
              description: "Sketch/diagram",
              onClick: () => {
                window.postMessage({ type: "open-drawing-dialog" }, "*");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Table,
              label: "Table",
              description: "Data table",
              onClick: () => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks([{ type: "table", props: {} }], block, "after");
                }
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownSection,
      {
        id: "ai",
        trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
        label: "AI Commands",
        className: "hidden md:flex",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: hasSelection() ? `AI: "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? "..." : ""}"` : "Select text first" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sparkles,
              label: "Define",
              description: "Get definition",
              onClick: () => handleAI("define"),
              disabled: !hasSelection()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sparkles,
              label: "Explain",
              description: "Get explanation",
              onClick: () => handleAI("explain"),
              disabled: !hasSelection()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sparkles,
              label: "Synonym",
              description: "Find alternatives",
              onClick: () => handleAI("synonym"),
              disabled: !hasSelection()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sparkles,
              label: "Rephrase",
              description: "Rewrite text",
              onClick: () => handleAI("rephrase"),
              disabled: !hasSelection()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sparkles,
              label: "Grammar",
              description: "Check & fix",
              onClick: () => handleAI("grammar"),
              disabled: !hasSelection()
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownSection,
      {
        id: "math",
        trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Sigma, { className: "h-4 w-4" }),
        label: "Math & Science",
        className: "hidden lg:flex",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Math" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sigma,
              label: "Inline Math",
              description: "Math in text",
              onClick: () => {
                editor?.insertInlineContent([{ type: "inlineMathInline", props: { latex: "" } }]);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Sigma,
              label: "Block Math",
              description: "Centered equation",
              onClick: () => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks([{ type: "blockMath", props: { latex: "", mode: "block", collapsed: false } }], block, "after");
                }
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Science" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Atom,
              label: "Molecule",
              description: "2D structure",
              onClick: () => {
                window.postMessage({ type: "open-molecule-dialog" }, "*");
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropdownSection,
      {
        id: "fonts",
        trigger: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "h-4 w-4" }),
        label: "Fonts",
        className: "hidden xl:flex",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-1 text-xs font-semibold text-muted-foreground", children: "Font Family" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Type,
              label: "Sans Serif",
              onClick: () => {
                const el = document.querySelector(".bn-editor");
                if (el) el.style.setProperty("--bn-font-family", "ui-sans-serif, system-ui, sans-serif");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Type,
              label: "Serif",
              onClick: () => {
                const el = document.querySelector(".bn-editor");
                if (el) el.style.setProperty("--bn-font-family", "ui-serif, Georgia, serif");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Type,
              label: "Monospace",
              onClick: () => {
                const el = document.querySelector(".bn-editor");
                if (el) el.style.setProperty("--bn-font-family", "ui-monospace, monospace");
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuItem,
            {
              icon: Type,
              label: "Times New Roman",
              onClick: () => {
                const el = document.querySelector(".bn-editor");
                if (el) el.style.setProperty("--bn-font-family", "'Times New Roman', Times, serif");
              }
            }
          )
        ] })
      }
    )
  ] }) });
}

function Draft() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { getGhostAssignment, updateGhostAssignment, isGhostMode } = useGhostSession();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [editorMode, setEditorMode] = reactExports.useState(() => {
    const saved = localStorage.getItem("tooessay-editor-mode");
    if (saved === "preview") return "preview";
    const legacyPref = localStorage.getItem("tooessay-prefer-simple-editor");
    if (legacyPref === "true") return "preview";
    return "rich";
  });
  reactExports.useEffect(() => {
    localStorage.setItem("tooessay-editor-mode", editorMode);
  }, [editorMode]);
  const toggleEditorMode = () => {
    setEditorMode((prev) => prev === "rich" ? "preview" : "rich");
    ue.success(editorMode === "rich" ? "Preview mode enabled" : "Editing mode enabled");
  };
  const isGhostAssignment = reactExports.useMemo(() => {
    return id?.startsWith("ghost_") || false;
  }, [id]);
  const ghostAssignment = reactExports.useMemo(() => {
    if (isGhostAssignment && id) {
      return getGhostAssignment(id);
    }
    return null;
  }, [isGhostAssignment, id, getGhostAssignment]);
  const [assignment, setAssignment] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [content, setContent] = reactExports.useState("");
  const [title, setTitle] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [evaluation, setEvaluation] = reactExports.useState(null);
  const [isEvaluating, setIsEvaluating] = reactExports.useState(false);
  const [planNotes, setPlanNotes] = reactExports.useState(null);
  const [outlineSections, setOutlineSections] = reactExports.useState([]);
  const [showImportModal, setShowImportModal] = reactExports.useState(false);
  const [blockNoteEditor, setBlockNoteEditor] = reactExports.useState(null);
  const [syncfusionEditor, setSyncfusionEditor] = reactExports.useState(null);
  const [tableOfContents, setTableOfContents] = reactExports.useState([]);
  const [pageCount, setPageCount] = reactExports.useState(1);
  const [leftPanelType, setLeftPanelType] = reactExports.useState(() => {
    const saved = localStorage.getItem("draft-left-panel-type");
    if (saved === "null" || saved === null) return "outline";
    return saved;
  });
  const [rightPanelType, setRightPanelType] = reactExports.useState(() => {
    const saved = localStorage.getItem("draft-right-panel-type");
    if (saved === "null" || saved === null) return "feedback";
    return saved;
  });
  const [lastLeftPanel, setLastLeftPanel] = reactExports.useState(() => {
    const saved = localStorage.getItem("draft-last-left-panel");
    return saved || "outline";
  });
  const [lastRightPanel, setLastRightPanel] = reactExports.useState(() => {
    const saved = localStorage.getItem("draft-last-right-panel");
    return saved || "feedback";
  });
  const [leftPanelSize, setLeftPanelSize] = reactExports.useState(() => {
    const saved = localStorage.getItem("draft-left-panel-size");
    return saved ? parseFloat(saved) : 20;
  });
  const [rightPanelSize, setRightPanelSize] = reactExports.useState(() => {
    const saved = localStorage.getItem("draft-right-panel-size");
    return saved ? parseFloat(saved) : 20;
  });
  const hasContentBeenSaved = reactExports.useRef(false);
  const contentRef = reactExports.useRef("");
  const [draftId, setDraftId] = reactExports.useState(null);
  const [selectedBlockId, setSelectedBlockId] = reactExports.useState(null);
  const [selectedText, setSelectedText] = reactExports.useState(null);
  const [highlightBlockId, setHighlightBlockId] = reactExports.useState(null);
  const [aiCommandHandlers, setAICommandHandlers] = reactExports.useState(null);
  const {
    ydoc,
    provider,
    activeUsers,
    collaborators,
    isOwner,
    canEdit,
    addCollaborator,
    removeCollaborator,
    updateCollaboratorRole
  } = useCollaboration({
    documentType: "draft",
    documentId: draftId || "",
    enabled: !!draftId
  });
  useDraftComments({ draftId });
  const handleSelectionChange = (blockId, text) => {
    setSelectedBlockId(blockId);
    setSelectedText(text);
  };
  const handleHighlightBlock = (blockId) => {
    setHighlightBlockId(blockId);
    setTimeout(() => setHighlightBlockId(null), 2500);
  };
  const getUserColor = (userId) => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"];
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };
  reactExports.useEffect(() => {
    if (leftPanelType !== null) {
      setLastLeftPanel(leftPanelType);
      localStorage.setItem("draft-last-left-panel", leftPanelType);
    }
  }, [leftPanelType]);
  reactExports.useEffect(() => {
    if (rightPanelType !== null) {
      setLastRightPanel(rightPanelType);
      localStorage.setItem("draft-last-right-panel", rightPanelType);
    }
  }, [rightPanelType]);
  reactExports.useEffect(() => {
    if (authLoading) return;
    if (isGhostAssignment) {
      if (ghostAssignment) {
        setAssignment({
          id: ghostAssignment.id,
          title: ghostAssignment.title,
          subject: ghostAssignment.subject,
          task_type: ghostAssignment.task_type,
          status: ghostAssignment.status
        });
        setTitle(ghostAssignment.title);
        let draftContent = ghostAssignment.draft?.content || "";
        if (!draftContent && ghostAssignment.subject && ghostAssignment.task_type) {
          draftContent = getTemplateForAssignment(
            ghostAssignment.subject,
            ghostAssignment.task_type
          );
        }
        setContent(draftContent);
        setLoading(false);
      } else {
        navigate("/work");
      }
      return;
    }
    if (!user) {
      navigate("/auth");
      return;
    }
    loadData();
    const outlineSubscription = supabase.channel(`outline-changes-${id}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "outlines",
        filter: `assignment_id=eq.${id}`
      },
      async (payload) => {
        console.log("Outline changed:", payload);
        const { data: outlineData } = await supabase.from("outlines").select("sections").eq("assignment_id", id).maybeSingle();
        if (outlineData?.sections) {
          setOutlineSections(Array.isArray(outlineData.sections) ? outlineData.sections : []);
        }
      }
    ).subscribe();
    const planSubscription = supabase.channel(`plan-changes-${id}`).on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "plans",
        filter: `assignment_id=eq.${id}`
      },
      async (payload) => {
        console.log("Plan changed:", payload);
        const { data: planData } = await supabase.from("plans").select("coaching_response").eq("assignment_id", id).maybeSingle();
        if (planData?.coaching_response) {
          setPlanNotes(planData.coaching_response);
        }
      }
    ).subscribe();
    return () => {
      outlineSubscription.unsubscribe();
      planSubscription.unsubscribe();
    };
  }, [user, authLoading, id, navigate, isGhostAssignment, ghostAssignment]);
  const removeOutlineSection = async (sectionIndex) => {
    const newSections = outlineSections.filter((_, i) => i !== sectionIndex);
    setOutlineSections(newSections);
    await supabase.from("outlines").update({ sections: newSections }).eq("assignment_id", id);
  };
  const removeOutlineBullet = async (sectionIndex, bulletIndex) => {
    const newSections = outlineSections.map((section, i) => {
      if (i === sectionIndex) {
        return {
          ...section,
          bullets: section.bullets.filter((_, j) => j !== bulletIndex)
        };
      }
      return section;
    });
    setOutlineSections(newSections);
    await supabase.from("outlines").update({ sections: newSections }).eq("assignment_id", id);
  };
  const removePlanQuestion = async (questionIndex) => {
    if (!planNotes) return;
    const newPlanNotes = {
      ...planNotes,
      questions: planNotes.questions.filter((_, i) => i !== questionIndex)
    };
    setPlanNotes(newPlanNotes);
    await supabase.from("plans").update({ coaching_response: newPlanNotes }).eq("assignment_id", id);
  };
  const removeEvidenceItem = async (itemIndex) => {
    if (!planNotes) return;
    const newPlanNotes = {
      ...planNotes,
      evidenceChecklist: planNotes.evidenceChecklist.filter((_, i) => i !== itemIndex)
    };
    setPlanNotes(newPlanNotes);
    await supabase.from("plans").update({ coaching_response: newPlanNotes }).eq("assignment_id", id);
  };
  reactExports.useEffect(() => {
    contentRef.current = content;
  }, [content]);
  reactExports.useEffect(() => {
    localStorage.setItem("draft-left-panel-type", leftPanelType === null ? "null" : leftPanelType);
  }, [leftPanelType]);
  reactExports.useEffect(() => {
    localStorage.setItem("draft-right-panel-type", rightPanelType === null ? "null" : rightPanelType);
  }, [rightPanelType]);
  reactExports.useEffect(() => {
    localStorage.setItem("draft-left-panel-size", leftPanelSize.toString());
  }, [leftPanelSize]);
  reactExports.useEffect(() => {
    localStorage.setItem("draft-right-panel-size", rightPanelSize.toString());
  }, [rightPanelSize]);
  reactExports.useEffect(() => {
    if (isGhostAssignment) return;
    return () => {
      if (!hasContentBeenSaved.current && !contentRef.current.trim() && id) {
        supabase.from("assignments").delete().eq("id", id).then(({ error }) => {
          if (error) console.error("Failed to cleanup ghost assignment:", error);
        });
      }
    };
  }, [id, isGhostAssignment]);
  const loadData = async () => {
    try {
      const { data: assignmentData, error: assignmentError } = await supabase.from("assignments").select("*").eq("id", id).single();
      if (assignmentError) throw assignmentError;
      setAssignment(assignmentData);
      setTitle(assignmentData.title);
      const { data: draftData } = await supabase.from("drafts").select("*").eq("assignment_id", id).is("deleted_at", null).maybeSingle();
      if (draftData) {
        setDraftId(draftData.id);
        const existingContent = draftData.content || "";
        if (existingContent.trim()) {
          setContent(existingContent);
          hasContentBeenSaved.current = true;
        } else {
          const initKey = `draft-template-initialized:${draftData.id}`;
          const alreadyInitialized = localStorage.getItem(initKey) === "true";
          if (!alreadyInitialized) {
            let templateContent = "";
            try {
              const { data: outlineData } = await supabase.from("outlines").select("sections").eq("assignment_id", id).maybeSingle();
              if (outlineData?.sections && Array.isArray(outlineData.sections) && outlineData.sections.length > 0) {
                const sections = outlineData.sections;
                templateContent = generateDraftFromOutline(sections, {
                  title: assignmentData.title,
                  subject: assignmentData.subject,
                  taskType: assignmentData.task_type,
                  includeTitlePage: true,
                  includeBibliography: true,
                  includeTablesForIA: true
                });
                setOutlineSections(sections);
              } else {
                templateContent = getTemplateForAssignment(
                  assignmentData.subject,
                  assignmentData.task_type
                );
              }
            } catch {
              templateContent = getTemplateForAssignment(
                assignmentData.subject,
                assignmentData.task_type
              );
            }
            if (templateContent) {
              await supabase.from("drafts").update({ content: templateContent }).eq("id", draftData.id);
              localStorage.setItem(initKey, "true");
              setContent(templateContent);
              hasContentBeenSaved.current = true;
            } else {
              setContent(existingContent);
            }
          } else {
            setContent(existingContent);
          }
        }
      } else {
        let templateContent = "";
        try {
          const { data: outlineData } = await supabase.from("outlines").select("sections").eq("assignment_id", id).maybeSingle();
          if (outlineData?.sections && Array.isArray(outlineData.sections) && outlineData.sections.length > 0) {
            const sections = outlineData.sections;
            templateContent = generateDraftFromOutline(sections, {
              title: assignmentData.title,
              subject: assignmentData.subject,
              taskType: assignmentData.task_type,
              includeTitlePage: true,
              includeBibliography: true,
              includeTablesForIA: true
            });
            setOutlineSections(sections);
          } else {
            templateContent = getTemplateForAssignment(
              assignmentData.subject,
              assignmentData.task_type
            );
            const templateSections = getOutlineSectionsFromStructure(
              assignmentData.subject,
              assignmentData.task_type
            );
            if (templateSections.length > 0) {
              setOutlineSections(templateSections);
            }
          }
        } catch {
          templateContent = getTemplateForAssignment(
            assignmentData.subject,
            assignmentData.task_type
          );
        }
        const { data: newDraft, error: createError } = await supabase.from("drafts").insert({
          assignment_id: id,
          content: templateContent
        }).select().single();
        if (!createError && newDraft) {
          setDraftId(newDraft.id);
          setContent(templateContent);
          if (templateContent) {
            localStorage.setItem(`draft-template-initialized:${newDraft.id}`, "true");
            hasContentBeenSaved.current = true;
          }
        }
      }
      const { data: planData } = await supabase.from("plans").select("coaching_response").eq("assignment_id", id).maybeSingle();
      if (planData?.coaching_response) {
        setPlanNotes(planData.coaching_response);
      }
      try {
        const { data: outlineData, error: outlineError } = await supabase.from("outlines").select("sections").eq("assignment_id", id).maybeSingle();
        if (!outlineError && outlineData?.sections) {
          const sections = Array.isArray(outlineData.sections) ? outlineData.sections : [];
          setOutlineSections(sections);
        } else {
          const templateSections = getOutlineSectionsFromStructure(
            assignmentData.subject,
            assignmentData.task_type
          );
          if (templateSections.length > 0) {
            setOutlineSections(templateSections);
            try {
              await supabase.from("outlines").upsert({
                assignment_id: id,
                sections: templateSections
              });
            } catch {
              console.log("Could not save outline to database");
            }
          }
        }
      } catch (outlineLoadError) {
        const templateSections = getOutlineSectionsFromStructure(
          assignmentData.subject,
          assignmentData.task_type
        );
        if (templateSections.length > 0) {
          setOutlineSections(templateSections);
        }
      }
    } catch (error) {
      ue.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };
  const autoSaveDraft = async () => {
    if (isGhostAssignment && id) {
      let wordCount = 0;
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        wordCount = text.trim().split(/\s+/).filter((w) => w).length;
      } catch {
        wordCount = 0;
      }
      updateGhostAssignment(id, {
        title,
        draft: {
          content,
          word_count: wordCount
        }
      });
      hasContentBeenSaved.current = true;
      return;
    }
    try {
      let wordCount = 0;
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const text = tempDiv.textContent || tempDiv.innerText || "";
        wordCount = text.trim().split(/\s+/).filter((w) => w).length;
      } catch {
        wordCount = 0;
      }
      const { data: existingDraft } = await supabase.from("drafts").select("id").eq("assignment_id", id).maybeSingle();
      if (existingDraft) {
        await supabase.from("drafts").update({
          content,
          word_count: wordCount
        }).eq("id", existingDraft.id);
      } else {
        await supabase.from("drafts").insert([{
          assignment_id: id,
          content,
          word_count: wordCount
        }]);
      }
      if (title !== assignment?.title) {
        await supabase.from("assignments").update({ title }).eq("id", id);
        setAssignment({ ...assignment, title });
      }
      hasContentBeenSaved.current = true;
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };
  const { debouncedSave } = useAutoSave({
    onSave: autoSaveDraft,
    delay: 2e3
  });
  reactExports.useEffect(() => {
    if ((content || title) && !loading) {
      debouncedSave();
    }
  }, [content, title, debouncedSave, loading]);
  reactExports.useEffect(() => {
    if (editorMode === "preview" && syncfusionEditor) {
      const extractTOC = () => {
        try {
          const headings = syncfusionEditor.getHeadings?.() || [];
          setTableOfContents(headings);
        } catch (error) {
          console.error("Failed to extract headings:", error);
        }
      };
      extractTOC();
      const interval = setInterval(extractTOC, 2e3);
      return () => clearInterval(interval);
    } else if (editorMode === "rich" && blockNoteEditor?.document) {
      const extractBlockNoteTOC = () => {
        try {
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
          setTableOfContents(headings);
        } catch (error) {
          console.error("Failed to extract BlockNote headings:", error);
        }
      };
      extractBlockNoteTOC();
      const interval = setInterval(extractBlockNoteTOC, 2e3);
      return () => clearInterval(interval);
    }
  }, [editorMode, syncfusionEditor, blockNoteEditor, content]);
  const handleSave = async () => {
    setSaving(true);
    try {
      await autoSaveDraft();
      if (!isGhostAssignment) {
        await supabase.from("assignments").update({ status: "writing" }).eq("id", id);
      }
      window.gtag?.("event", "save_draft", {
        assignment_id: id
      });
      ue.success(isGhostAssignment ? "Draft saved locally!" : "Draft saved!");
    } catch (error) {
      ue.error("Failed to save draft");
    } finally {
      setSaving(false);
    }
  };
  const handleEvaluate = async () => {
    if (!content.trim()) {
      ue.error("Please write some content first");
      return;
    }
    setIsEvaluating(true);
    try {
      let textContent = "";
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        textContent = tempDiv.textContent || tempDiv.innerText || "";
      } catch {
        textContent = content;
      }
      const iaCriteriaData = await __vitePreload(() => import('./data-ia-DxRN8XI2.js').then(n => n.c),true?[]:void 0);
      const SUBJECT_KEY_MAP = {
        "biology": "biology",
        "chemistry": "chemistry",
        "physics": "physics",
        "business_management": "businessManagement",
        "economics": "economics",
        "history": "history",
        "geography": "geography",
        "psychology": "psychology",
        "sehs": "sehs",
        "math_aa": "mathAA",
        "math_ai": "mathAI",
        "lang_a_lang_lit": "languageALangLit",
        "lang_a_literature": "languageALangLit",
        "english_b": "languageB",
        "french_b": "languageB",
        "german_b": "languageB",
        "spanish_b": "languageB",
        "italian_b": "languageB",
        "japanese_b": "languageB",
        "mandarin_b": "languageB",
        "other_b": "languageB",
        "visual_arts": "visualArts",
        "computer_science": "computerScience"
      };
      let gradingCriteria = null;
      if (assignment.subject && assignment.task_type === "ia") {
        const subjectKey = SUBJECT_KEY_MAP[assignment.subject];
        if (subjectKey) {
          const criteriaData = iaCriteriaData.default[subjectKey];
          if (criteriaData) {
            gradingCriteria = criteriaData.criteria.map((c) => ({
              name: c.name,
              maxMarks: c.maxMarks,
              levels: c.levels.map((l) => `${l.marks}: ${l.descriptor}`)
            }));
          }
        }
      }
      const { data, error } = await supabase.functions.invoke("evaluate-draft", {
        body: {
          content: textContent.trim(),
          subject: assignment.subject,
          taskType: assignment.task_type,
          schoolProgram: user?.user_metadata?.school_program || (isGhostAssignment ? ghostAssignment?.schoolProgram : void 0),
          rubric: [],
          gradingCriteria
          // Include grading criteria
        }
      });
      if (error) throw error;
      setEvaluation(data);
      ue.success("Evaluation complete!");
    } catch (error) {
      console.error("Evaluation error:", error);
      ue.error(error.message || "Failed to evaluate draft");
    } finally {
      setIsEvaluating(false);
    }
  };
  const handleImportBlocks = (blocks) => {
    if (blockNoteEditor && blocks.length > 0) {
      blockNoteEditor.insertBlocks(blocks, blockNoteEditor.document[blockNoteEditor.document.length - 1]);
      ue.success("Content imported successfully!");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b bg-background shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `container max-w-full mx-auto ${isMobile ? "px-3 py-2" : "px-6 py-3"} flex items-center justify-between`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          BackButton,
          {
            fallbackPath: isGhostAssignment ? "/work" : `/work/assignment/${id}/outline`,
            size: "sm",
            label: !isMobile ? isGhostAssignment ? "Dashboard" : "Back" : void 0
          }
        ),
        !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-px bg-border" }),
        isGhostAssignment && !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-2 py-1 bg-destructive/10 rounded text-destructive text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudOff, { className: "h-3 w-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Guest Mode" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your work is saved locally. Sign in to keep it permanently." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: title || "",
            onChange: (e) => setTitle(e.target.value),
            placeholder: "Untitled Document",
            className: `${isMobile ? "text-xs" : "text-sm"} font-medium border-none outline-none bg-transparent flex-1 min-w-0 placeholder:text-muted-foreground/40`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 md:gap-2", children: [
        !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleEvaluate,
              disabled: isEvaluating,
              children: isEvaluating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Evaluating..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
                "Evaluate"
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setShowImportModal(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "h-4 w-4 mr-2" }),
                "Import"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ExportDropdown,
          {
            blocks: blockNoteEditor?.document || [],
            title: title || "Untitled Document",
            pageCount,
            author: user?.email || "Student"
          }
        ),
        !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: editorMode === "preview" ? "default" : "ghost",
              size: "sm",
              onClick: toggleEditorMode,
              className: `gap-2 ${editorMode === "preview" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                "Preview"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: editorMode === "preview" ? "Exit preview mode" : "Preview as PDF" }) })
        ] }),
        !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-l pl-3 ml-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CollaboratorAvatars, { users: activeUsers }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ShareModal,
            {
              isOwner,
              collaborators,
              documentTitle: title || "Untitled Draft",
              onAddCollaborator: addCollaborator,
              onRemoveCollaborator: removeCollaborator,
              onUpdateRole: updateCollaboratorRole
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            disabled: saving || !canEdit,
            size: "sm",
            children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
              !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2", children: "Save" })
            ] })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: isMobile ? (
      /* Mobile: Full-width editor only */
      editorMode === "rich" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-full mx-auto px-3 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        BlockNoteEditor,
        {
          initialContent: content,
          onChange: setContent,
          placeholder: "Start writing your draft here... Type / for commands",
          onEditorReady: setBlockNoteEditor,
          onPageCountChange: setPageCount,
          onAICommandsReady: setAICommandHandlers,
          disablePagination: true,
          onSelectionChange: handleSelectionChange,
          highlightBlockId,
          userContext: {
            schoolProgram: user?.user_metadata?.school_program || (isGhostAssignment ? ghostAssignment?.schoolProgram : void 0),
            subject: assignment?.subject || (isGhostAssignment ? ghostAssignment?.subject : void 0),
            taskType: assignment?.task_type || (isGhostAssignment ? ghostAssignment?.task_type : void 0)
          },
          collaboration: ydoc && provider ? {
            ydoc,
            provider,
            user: user ? {
              name: user.email?.split("@")[0] || "Anonymous",
              color: getUserColor(user.id)
            } : void 0
          } : void 0
        }
      ) }) }) : (
        /* SyncfusionEditor - full height on mobile */
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SyncfusionEditor,
          {
            initialContent: content,
            onChange: setContent,
            placeholder: "Start writing your draft here...",
            onEditorReady: setSyncfusionEditor
          }
        ) })
      )
    ) : (
      /* Desktop: Resizable three-column layout */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { direction: "horizontal", children: [
        leftPanelType !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizablePanel,
            {
              defaultSize: leftPanelSize,
              minSize: 15,
              maxSize: 35,
              onResize: (size) => {
                setLeftPanelSize(size);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto bg-muted/30 border-r", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 pb-3 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PanelSelector,
                  {
                    activePanel: leftPanelType,
                    onPanelChange: setLeftPanelType,
                    side: "left"
                  }
                ) }),
                leftPanelType === "outline" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editorMode === "preview" && tableOfContents.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Table of Contents" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: tableOfContents.map((heading, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm",
                      style: {
                        paddingLeft: `${(heading.level - 1) * 12 + 12}px`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block truncate ${heading.level === 1 ? "font-semibold" : heading.level === 2 ? "font-medium" : "font-normal text-muted-foreground"}`, children: heading.text || "(Untitled)" })
                    },
                    `${heading.id}-${index}`
                  )) }) })
                ] }) }) : editorMode === "preview" && tableOfContents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No headings yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add headings to create a table of contents" })
                ] }) : !planNotes && outlineSections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No planning notes available for this assignment" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  outlineSections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Planned Sections" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: outlineSections.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm group/section", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground mb-1 flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: section.title || `Section ${i + 1}` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removeOutlineSection(i),
                            className: "opacity-0 group-hover/section:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity",
                            title: "Remove section",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                          }
                        )
                      ] }),
                      section.bullets && section.bullets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 pl-3 space-y-1", children: section.bullets.map((point, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground flex items-start gap-1 group/bullet", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: point }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removeOutlineBullet(i, j),
                            className: "opacity-0 group-hover/bullet:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0",
                            title: "Remove bullet",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-2.5 w-2.5 text-destructive" })
                          }
                        )
                      ] }, j)) })
                    ] }, i)) }) })
                  ] }),
                  planNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Clarifying Questions" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: planNotes.questions.map((question, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm p-2 rounded bg-accent/10 border border-accent/20 flex items-start gap-2 group", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: question }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removePlanQuestion(i),
                            className: "opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0",
                            title: "Remove question",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                          }
                        )
                      ] }, i)) }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Thesis Pattern" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm p-2 rounded bg-primary/10 border border-primary/20 italic", children: planNotes.thesisPattern }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Evidence Checklist" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: planNotes.evidenceChecklist.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2 group", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success mt-0.5", children: "✓" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removeEvidenceItem(i),
                            className: "opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0",
                            title: "Remove item",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                          }
                        )
                      ] }, i)) }) })
                    ] })
                  ] })
                ] }) }),
                leftPanelType === "feedback" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !evaluation ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: 'Click "Evaluate" to receive feedback on your writing' })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-bold text-primary", children: [
                      evaluation.overallScore,
                      "/7"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Overall Score" })
                  ] }) }) }),
                  evaluation.criteriaGrades && evaluation.criteriaGrades.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Grading Criteria Assessment" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: evaluation.criteriaGrades.map((grade, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-lg border bg-card", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: grade.criterion }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-primary", children: [
                          grade.earnedMarks,
                          "/",
                          grade.maxMarks
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: grade.justification }),
                      grade.improvements && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-blue-600 dark:text-blue-400 italic", children: [
                        "💡 ",
                        grade.improvements
                      ] })
                    ] }, i)) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Strengths" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: evaluation.strengths.map((strength, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm p-2 rounded bg-success/10 border border-success/20", children: strength }, i)) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Areas for Improvement" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: evaluation.improvements.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm p-2 rounded bg-accent/10 border border-accent/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-1", children: item.criterion }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2 text-xs", children: item.issue }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic", children: item.suggestion })
                    ] }, i)) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Next Steps" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: evaluation.nextSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary mt-0.5", children: [
                        i + 1,
                        "."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                    ] }, i)) }) })
                  ] })
                ] }) }),
                leftPanelType === "comments" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CommentsPanel,
                  {
                    draftId: draftId || void 0,
                    selectedBlockId,
                    selectedText,
                    onBlockSelect: setSelectedBlockId,
                    onHighlightBlock: handleHighlightBlock
                  }
                ),
                leftPanelType === "grading" && /* @__PURE__ */ jsxRuntimeExports.jsx(GradingCriteriaPanel, { subject: assignment?.subject, taskType: assignment?.task_type }),
                leftPanelType === "toc" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }),
                    "Table of Contents"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: tableOfContents.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: tableOfContents.map((heading, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm",
                      style: {
                        paddingLeft: `${(heading.level - 1) * 12 + 12}px`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block truncate ${heading.level === 1 ? "font-semibold" : heading.level === 2 ? "font-medium" : "font-normal text-muted-foreground"}`, children: heading.text || "(Untitled)" })
                    },
                    `${heading.id}-${index}`
                  )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No headings yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add headings to create a table of contents" })
                  ] }) })
                ] }) })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { withHandle: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: leftPanelType === null && rightPanelType === null ? 100 : 55, minSize: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `h-full relative ${editorMode === "preview" ? "flex flex-col" : "overflow-y-auto"}`, children: [
          leftPanelType === null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "absolute top-4 left-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm",
              onClick: () => setLeftPanelType(lastLeftPanel),
              title: `Open ${getPanelTitle(lastLeftPanel)}`,
              children: (() => {
                const Icon = getPanelIcon(lastLeftPanel);
                return Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" });
              })()
            }
          ),
          rightPanelType === null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "absolute top-4 right-4 z-10 h-8 w-8 bg-card/80 backdrop-blur-sm border shadow-sm",
              onClick: () => setRightPanelType(lastRightPanel),
              title: `Open ${getPanelTitle(lastRightPanel)}`,
              children: (() => {
                const Icon = getPanelIcon(lastRightPanel);
                return Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" });
              })()
            }
          ),
          editorMode === "rich" && blockNoteEditor && /* @__PURE__ */ jsxRuntimeExports.jsx(
            FixedEditorToolbar,
            {
              editor: blockNoteEditor,
              onAICommand: (command, selectedText2) => {
                if (!aiCommandHandlers) return;
                switch (command) {
                  case "define":
                    aiCommandHandlers.define(selectedText2);
                    break;
                  case "explain":
                    aiCommandHandlers.explain(selectedText2);
                    break;
                  case "synonym":
                    aiCommandHandlers.synonym(selectedText2);
                    break;
                  case "rephrase":
                    aiCommandHandlers.rephrase(selectedText2);
                    break;
                  case "grammar":
                    aiCommandHandlers.grammar(selectedText2);
                    break;
                }
              }
            }
          ),
          editorMode === "rich" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl shadow-soft border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            BlockNoteEditor,
            {
              initialContent: content,
              onChange: setContent,
              placeholder: "Start writing your draft here... Type / for commands",
              onEditorReady: setBlockNoteEditor,
              onPageCountChange: setPageCount,
              onAICommandsReady: setAICommandHandlers,
              disablePagination: true,
              onSelectionChange: handleSelectionChange,
              highlightBlockId,
              userContext: {
                schoolProgram: user?.user_metadata?.school_program || (isGhostAssignment ? ghostAssignment?.schoolProgram : void 0),
                subject: assignment?.subject || (isGhostAssignment ? ghostAssignment?.subject : void 0),
                taskType: assignment?.task_type || (isGhostAssignment ? ghostAssignment?.task_type : void 0)
              },
              collaboration: ydoc && provider ? {
                ydoc,
                provider,
                user: user ? {
                  name: user.email?.split("@")[0] || "Anonymous",
                  color: getUserColor(user.id)
                } : void 0
              } : void 0
            }
          ) }) }) }) }) : (
            /* Preview mode - read-only document view */
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SyncfusionEditor,
              {
                initialContent: content,
                placeholder: "Document preview",
                onEditorReady: setSyncfusionEditor,
                readOnly: true
              }
            )
          )
        ] }) }),
        rightPanelType !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { withHandle: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResizablePanel,
            {
              defaultSize: rightPanelSize,
              minSize: 15,
              maxSize: 35,
              onResize: (size) => {
                setRightPanelSize(size);
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full overflow-y-auto bg-muted/30 border-l", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 pb-3 border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PanelSelector,
                  {
                    activePanel: rightPanelType,
                    onPanelChange: setRightPanelType,
                    side: "right"
                  }
                ) }),
                rightPanelType === "outline" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !planNotes && outlineSections.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No planning notes available for this assignment" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  outlineSections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Planned Sections" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: outlineSections.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm group/section", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground mb-1 flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: section.title || `Section ${i + 1}` }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removeOutlineSection(i),
                            className: "opacity-0 group-hover/section:opacity-100 p-1 hover:bg-destructive/10 rounded transition-opacity",
                            title: "Remove section",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                          }
                        )
                      ] }),
                      section.bullets && section.bullets.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 pl-3 space-y-1", children: section.bullets.map((point, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground flex items-start gap-1 group/bullet", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5", children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: point }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removeOutlineBullet(i, j),
                            className: "opacity-0 group-hover/bullet:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0",
                            title: "Remove bullet",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-2.5 w-2.5 text-destructive" })
                          }
                        )
                      ] }, j)) })
                    ] }, i)) }) })
                  ] }),
                  planNotes && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Clarifying Questions" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: planNotes.questions.map((question, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm p-2 rounded bg-accent/10 border border-accent/20 flex items-start gap-2 group", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: question }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removePlanQuestion(i),
                            className: "opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0",
                            title: "Remove question",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                          }
                        )
                      ] }, i)) }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Thesis Pattern" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm p-2 rounded bg-primary/10 border border-primary/20 italic", children: planNotes.thesisPattern }) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Evidence Checklist" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: planNotes.evidenceChecklist.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2 group", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success mt-0.5", children: "✓" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            onClick: () => removeEvidenceItem(i),
                            className: "opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity flex-shrink-0",
                            title: "Remove item",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" })
                          }
                        )
                      ] }, i)) }) })
                    ] })
                  ] })
                ] }) }),
                rightPanelType === "feedback" && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !evaluation ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-12 w-12 mx-auto mb-4 opacity-50" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: 'Click "Evaluate" to receive feedback on your writing' })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-4 border-b", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-4xl font-bold text-primary", children: [
                      evaluation.overallScore,
                      "/7"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Overall Score" })
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Strengths" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: evaluation.strengths.map((strength, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm p-2 rounded bg-success/10 border border-success/20", children: strength }, i)) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Areas for Improvement" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: evaluation.improvements.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm p-2 rounded bg-accent/10 border border-accent/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium mb-1", children: item.criterion }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2 text-xs", children: item.issue }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic", children: item.suggestion })
                    ] }, i)) }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm", children: "Next Steps" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: evaluation.nextSteps.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary mt-0.5", children: [
                        i + 1,
                        "."
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: step })
                    ] }, i)) }) })
                  ] })
                ] }) }),
                rightPanelType === "comments" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CommentsPanel,
                  {
                    draftId: draftId || void 0,
                    selectedBlockId,
                    selectedText,
                    onBlockSelect: setSelectedBlockId,
                    onHighlightBlock: handleHighlightBlock
                  }
                ),
                rightPanelType === "grading" && /* @__PURE__ */ jsxRuntimeExports.jsx(GradingCriteriaPanel, { subject: assignment?.subject, taskType: assignment?.task_type }),
                rightPanelType === "toc" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }),
                    "Table of Contents"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: tableOfContents.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: tableOfContents.map((heading, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      className: "w-full text-left px-3 py-2 rounded-md hover:bg-accent/50 transition-colors text-sm",
                      style: {
                        paddingLeft: `${(heading.level - 1) * 12 + 12}px`
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `block truncate ${heading.level === 1 ? "font-semibold" : heading.level === 2 ? "font-medium" : "font-normal text-muted-foreground"}`, children: heading.text || "(Untitled)" })
                    },
                    `${heading.id}-${index}`
                  )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No headings yet" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Add headings to create a table of contents" })
                  ] }) })
                ] }) })
              ] }) })
            }
          )
        ] })
      ] })
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ImportToBlockNoteModal,
      {
        open: showImportModal,
        onOpenChange: setShowImportModal,
        onInsert: handleImportBlocks
      }
    )
  ] });
}

export { Draft as default };
