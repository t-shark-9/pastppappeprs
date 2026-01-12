/**
 * NOTE: SyncfusionEditor - Future Preview Mode Editor
 * 
 * This could be a second editor mode ("Preview") if:
 * 1. Zooming function is removed
 * 2. The page automatically sizes to fit the screen/viewport
 * 
 * Currently hidden behind the "Preview" toggle in the Draft page.
 * The code is kept but the editor is used for preview purposes only.
 * 
 * TODO: Implement auto-sizing pages to viewport width
 * TODO: Remove zoom functionality completely
 */

import { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Inject
} from '@syncfusion/ej2-react-documenteditor';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Minus,
  ChevronDown,
  Type,
  Pilcrow,
  FileText,
  Quote,
  Link,
  Image,
  Pencil,
  Table,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { ChartDialog } from './ChartDialog';

// Import Syncfusion styles
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';

interface SyncfusionEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  title?: string;
  onTitleChange?: (title: string) => void;
  onEditorReady?: (editor: SyncfusionEditorRef) => void;
  onAICommand?: (command: string, selectedText: string) => void;
  readOnly?: boolean;
}

// Expose methods to parent component
export interface SyncfusionEditorRef {
  save: (filename?: string) => void;
  print: () => void;
  openFile: () => void;
  getContent: () => string | undefined;
  getWordCount: () => number;
  getPageCount: () => number;
  getHeadings: () => Array<{ id: string; level: number; text: string }>;
}

// Default blank document with double spacing
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

// Convert BlockNote JSON to plain text for initial content
const parseInitialContent = (content: string): string => {
  if (!content) return '';
  
  // Check if it's SFDT format (contains sections) - return empty to let open() handle it
  if (content.includes('"sections"') || content.includes('"sn":')) {
    return ''; // SFDT will be handled by documentEditor.open()
  }
  
  // Check if it looks like corrupted/escaped JSON
  if (content.includes('|"') || content.includes('"|') || content.includes('\\"')) {
    return ''; // Corrupted content, start fresh
  }
  
  if (content.startsWith('[')) {
    try {
      const blocks = JSON.parse(content);
      return blocks.map((block: any) => {
        if (block.content) {
          if (typeof block.content === 'string') return block.content;
          if (Array.isArray(block.content)) {
            return block.content.map((item: any) => 
              typeof item === 'string' ? item : (item.text || '')
            ).join('');
          }
        }
        return '';
      }).filter(Boolean).join('\n\n');
    } catch {
      return ''; // Invalid JSON, start fresh
    }
  }
  
  // Check if content looks like plain text (no JSON structures)
  if (!content.includes('{') && !content.includes('[')) {
    return content;
  }
  
  return ''; // Default to empty for safety
};

// Font options
const FONTS = [
  "Times New Roman",
  "Arial",
  "Calibri",
  "Georgia",
  "Verdana",
  "Courier New",
];

const FONT_SIZES = ["10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36"];

export const SyncfusionEditor = forwardRef<SyncfusionEditorRef, SyncfusionEditorProps>(({ 
  initialContent = "", 
  onChange, 
  placeholder = "Start typing your essay...",
  title,
  onTitleChange,
  onEditorReady,
  onAICommand,
  readOnly = false
}, ref) => {
  const containerRef = useRef<DocumentEditorContainerComponent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(title || 'Untitled');
  const isInitialized = useRef(false);
  const contentChangeTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Toolbar state
  const [currentFont, setCurrentFont] = useState("Times New Roman");
  const [currentSize, setCurrentSize] = useState("12");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Chart dialog state
  const [chartDialogOpen, setChartDialogOpen] = useState(false);
  const [chartInitialData, setChartInitialData] = useState<string | undefined>(undefined);
  const [chartInitialTitle, setChartInitialTitle] = useState<string | undefined>(undefined);

  // Get the document editor instance
  const getEditor = () => containerRef.current?.documentEditor;

  // Formatting commands
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
      editor.editor.toggleUnderline('Single');
    }
  };

  const toggleStrikethrough = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleStrikethrough();
    }
  };

  const setAlignment = (alignment: 'Left' | 'Center' | 'Right' | 'Justify') => {
    const editor = getEditor();
    if (editor) {
      editor.editor.toggleTextAlignment(alignment);
    }
  };

  const toggleBulletList = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.applyBullet('●', 'Symbol');
    }
  };

  const toggleNumberedList = () => {
    const editor = getEditor();
    if (editor) {
      editor.editor.applyNumbering('%1.', 'Arabic');
    }
  };

  const applyHeading = (level: number) => {
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
      // Insert a horizontal line using a paragraph with bottom border
      (editor.editor as any).insertText('──────────────────────────────────────────');
      editor.editor.insertText('\n');
    }
  };

  const handleFontChange = (font: string) => {
    const editor = getEditor();
    if (editor) {
      editor.selection.characterFormat.fontFamily = font;
      setCurrentFont(font);
    }
  };

  const handleSizeChange = (size: string) => {
    const editor = getEditor();
    if (editor) {
      editor.selection.characterFormat.fontSize = parseInt(size);
      setCurrentSize(size);
    }
  };

  // Get selected text for AI commands
  const getSelectedText = (): string => {
    const editor = getEditor();
    if (!editor) return '';
    try {
      return editor.selection.text || '';
    } catch {
      return '';
    }
  };

  const hasSelection = () => getSelectedText().trim().length > 0;

  // AI command handler
  const handleAI = (command: string) => {
    const text = getSelectedText();
    if (text && onAICommand) {
      onAICommand(command, text);
    }
    setOpenDropdown(null);
  };

  // Additional formatting commands
  const toggleSubscript = () => {
    const editor = getEditor();
    if (editor) {
      const current = editor.selection.characterFormat.baselineAlignment;
      editor.selection.characterFormat.baselineAlignment = current === 'Subscript' ? 'Normal' : 'Subscript';
    }
  };

  const toggleSuperscript = () => {
    const editor = getEditor();
    if (editor) {
      const current = editor.selection.characterFormat.baselineAlignment;
      editor.selection.characterFormat.baselineAlignment = current === 'Superscript' ? 'Normal' : 'Superscript';
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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const editor = getEditor();
          if (editor && typeof reader.result === 'string') {
            editor.editor.insertImage(reader.result, 400, 300);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Insert chart image from the chart dialog
  const insertChartImage = (imageDataUrl: string) => {
    const editor = getEditor();
    if (editor) {
      editor.editor.insertImage(imageDataUrl, 500, 350);
    }
    // Reset initial data after insertion
    setChartInitialData(undefined);
    setChartInitialTitle(undefined);
  };

  // Extract table data and open chart dialog
  const createChartFromTable = () => {
    const editor = getEditor();
    if (!editor) return;

    // Check if cursor is inside a table
    const selection = editor.selection;
    if (!selection) {
      alert("Please place your cursor inside a table first.");
      return;
    }

    try {
      // Get table content by selecting all and reading
      const tableContent = (editor as any).selection?.getTable?.();
      
      // Alternative: Try to extract from current selection or table context
      // The Syncfusion API for table extraction is limited, so we'll use a workaround
      const documentHelper = (editor as any).documentHelper;
      const currentWidget = documentHelper?.currentWidget;
      
      let csvData = "";
      let tableFound = false;

      // Try to find the table the cursor is in
      if (currentWidget) {
        let block = currentWidget.paragraph || currentWidget;
        
        // Walk up to find table
        while (block && !tableFound) {
          if (block.containerWidget?.isInsideTable || block.ownerTable) {
            tableFound = true;
            const table = block.ownerTable || block.containerWidget;
            
            // Extract rows
            if (table?.childWidgets) {
              table.childWidgets.forEach((row: any) => {
                const rowData: string[] = [];
                row.childWidgets?.forEach((cell: any) => {
                  let cellText = "";
                  cell.childWidgets?.forEach((para: any) => {
                    para.childWidgets?.forEach((line: any) => {
                      line.children?.forEach((element: any) => {
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
        // Fallback: just open chart dialog without pre-filled data
        setChartInitialData(undefined);
        setChartInitialTitle(undefined);
        setOpenDropdown(null);
        setChartDialogOpen(true);
        alert("Could not extract table data. Please enter data manually or select a table with 2+ columns (label, value).");
      }
    } catch (error) {
      console.error("Error extracting table data:", error);
      // Fallback: open dialog without data
      setChartInitialData(undefined);
      setChartInitialTitle(undefined);
      setOpenDropdown(null);
      setChartDialogOpen(true);
    }
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    save: (filename?: string) => {
      if (containerRef.current?.documentEditor) {
        containerRef.current.documentEditor.save(filename || documentTitle || 'Document', 'Docx');
      }
    },
    print: () => {
      if (containerRef.current?.documentEditor) {
        containerRef.current.documentEditor.print();
      }
    },
    openFile: () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.docx,.doc,.sfdt';
      input.onchange = (e: Event) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && containerRef.current?.documentEditor) {
          if (file.name.endsWith('.sfdt')) {
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                containerRef.current?.documentEditor.open(reader.result);
              }
            };
            reader.readAsText(file);
          } else {
            containerRef.current.documentEditor.open(file as any);
          }
        }
      };
      input.click();
    },
    getContent: () => {
      return containerRef.current?.documentEditor?.serialize();
    },
    getWordCount: () => {
      return (containerRef.current?.documentEditor as any)?.documentHelper?.wordCount?.wordCount || 0;
    },
    getPageCount: () => {
      return containerRef.current?.documentEditor?.pageCount || 1;
    },
    getHeadings: () => {
      const editor = containerRef.current?.documentEditor;
      if (!editor || !(editor as any).documentHelper) return [];
      
      const headings: Array<{ id: string; level: number; text: string }> = [];
      const pages = (editor as any).documentHelper?.pages || [];
      
      pages.forEach((page: any, pageIndex: number) => {
        page.bodyWidgets?.forEach((body: any) => {
          body.childWidgets?.forEach((block: any, blockIndex: number) => {
            if (block.paragraphFormat?.styleName?.toLowerCase().includes('heading')) {
              const styleName = block.paragraphFormat.styleName;
              const levelMatch = styleName.match(/heading\s*(\d+)/i);
              const level = levelMatch ? parseInt(levelMatch[1]) : 1;
              
              let text = '';
              block.childWidgets?.forEach((line: any) => {
                line.children?.forEach((child: any) => {
                  if (child.text) {
                    text += child.text;
                  }
                });
              });
              
              headings.push({
                id: `heading-${pageIndex}-${blockIndex}`,
                level,
                text: text.trim() || '(Untitled)'
              });
            }
          });
        });
      });
      
      return headings;
    }
  }), [documentTitle]);

  // Handle content changes with debounce
  const handleContentChange = useCallback(() => {
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
        console.error('Error serializing document:', error);
      }
    }, 500);
  }, [onChange]);

  // Initialize document when ready
  useEffect(() => {
    if (!containerRef.current?.documentEditor || !isReady || isInitialized.current) return;
    
    isInitialized.current = true;
    
    try {
      // Disable zoom
      if (containerRef.current.documentEditor) {
        containerRef.current.documentEditor.zoomFactor = 1;
      }
      
      // Try to open as SFDT first (if previously saved)
      if (initialContent && initialContent.includes('"sections"')) {
        containerRef.current.documentEditor.open(initialContent);
      } else {
        const doc = createBlankDocument();
        const plainText = parseInitialContent(initialContent);
        if (plainText) {
          const paragraphs = plainText.split('\n\n').filter(Boolean);
          doc.sections[0].blocks = paragraphs.map(text => ({
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
      console.error('Error initializing document:', error);
      containerRef.current.documentEditor.open(JSON.stringify(createBlankDocument()));
    }
  }, [isReady, initialContent, documentTitle]);

  // Update content in read-only mode when initialContent changes (for preview sync)
  useEffect(() => {
    if (!containerRef.current?.documentEditor || !isReady || !readOnly || !isInitialized.current) return;
    
    try {
      // Reload content when it changes in preview mode
      if (initialContent && initialContent.includes('"sections"')) {
        containerRef.current.documentEditor.open(initialContent);
      } else {
        const doc = createBlankDocument();
        const plainText = parseInitialContent(initialContent);
        if (plainText) {
          const paragraphs = plainText.split('\n\n').filter(Boolean);
          doc.sections[0].blocks = paragraphs.map(text => ({
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
    } catch (error) {
      console.error('Error updating preview content:', error);
    }
  }, [initialContent, readOnly, isReady]);

  // Handle title changes
  useEffect(() => {
    if (title !== undefined) {
      setDocumentTitle(title);
      if (containerRef.current?.documentEditor) {
        containerRef.current.documentEditor.documentName = title;
      }
    }
  }, [title]);

  const handleCreated = () => {
    setIsReady(true);
    
    // Use Pages layout for proper page margins
    if (containerRef.current?.documentEditor) {
      containerRef.current.documentEditor.layoutType = 'Pages';
      
      // Set read-only mode if specified
      if (readOnly) {
        containerRef.current.documentEditor.isReadOnly = true;
      }
    }
    
    if (onEditorReady && ref) {
      onEditorReady(ref as unknown as SyncfusionEditorRef);
    }
  };

  // Toolbar button component
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    tooltip, 
    active = false,
    disabled = false,
    className = ""
  }: { 
    onClick: () => void; 
    icon: React.ComponentType<{ className?: string }>; 
    tooltip: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={active ? "secondary" : "ghost"}
          size="sm"
          onClick={onClick}
          disabled={disabled}
          className={`h-8 w-8 p-0 ${className}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltip}</TooltipContent>
    </Tooltip>
  );

  // Dropdown section component
  const DropdownSection = ({ 
    trigger, 
    label, 
    children,
    id,
    className = ""
  }: { 
    trigger: React.ReactNode; 
    label: string; 
    children: React.ReactNode;
    id: string;
    className?: string;
  }) => (
    <Popover open={openDropdown === id} onOpenChange={(open) => setOpenDropdown(open ? id : null)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className={`h-8 gap-1 px-2 ${className}`}>
              {trigger}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <PopoverContent className="w-48 p-1" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );

  // Menu item component
  const MenuItem = ({ 
    icon: Icon, 
    label, 
    onClick,
    disabled = false,
    description
  }: { 
    icon: React.ComponentType<{ className?: string }>; 
    label: string; 
    onClick: () => void;
    disabled?: boolean;
    description?: string;
  }) => (
    <button
      className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-accent ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => {
        if (!disabled) {
          onClick();
          setOpenDropdown(null);
        }
      }}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
      <div className="flex flex-col items-start">
        <span>{label}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </div>
    </button>
  );

  return (
    <div className="h-full w-full flex flex-col syncfusion-editor-container">
      {/* Formatting Toolbar - Hidden in read-only/preview mode */}
      {!readOnly && (
      <div className="sticky top-0 z-10 flex items-center justify-center gap-0.5 p-1.5 bg-background border-b overflow-x-auto">
        <div className="flex items-center gap-0.5 px-2 py-1 bg-muted/50 rounded-lg flex-shrink-0">
          {/* Text Formatting - Always visible */}
          <div className="flex items-center">
            <ToolbarButton icon={Bold} tooltip="Bold (⌘B)" onClick={toggleBold} />
            <ToolbarButton icon={Italic} tooltip="Italic (⌘I)" onClick={toggleItalic} />
            <ToolbarButton icon={Underline} tooltip="Underline (⌘U)" onClick={toggleUnderline} />
            <ToolbarButton icon={Strikethrough} tooltip="Strikethrough" onClick={toggleStrikethrough} className="hidden sm:flex" />
            <ToolbarButton icon={Subscript} tooltip="Subscript" onClick={toggleSubscript} className="hidden lg:flex" />
            <ToolbarButton icon={Superscript} tooltip="Superscript" onClick={toggleSuperscript} className="hidden lg:flex" />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Block Types Dropdown */}
          <DropdownSection
            id="blocks"
            trigger={<Type className="h-4 w-4" />}
            label="Block Type"
          >
            <div className="space-y-0.5">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Headings</div>
              <MenuItem icon={Heading1} label="Heading 1" onClick={() => applyHeading(1)} />
              <MenuItem icon={Heading2} label="Heading 2" onClick={() => applyHeading(2)} />
              <MenuItem icon={Heading3} label="Heading 3" onClick={() => applyHeading(3)} />
              <MenuItem icon={Pilcrow} label="Normal" onClick={() => {
                const editor = getEditor();
                if (editor) editor.editor.applyStyle('Normal');
              }} />
              
              <Separator className="my-1" />
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Lists</div>
              <MenuItem icon={List} label="Bullet List" onClick={toggleBulletList} />
              <MenuItem icon={ListOrdered} label="Numbered List" onClick={toggleNumberedList} />
            </div>
          </DropdownSection>

          {/* Document Dropdown */}
          <DropdownSection
            id="document"
            trigger={<FileText className="h-4 w-4" />}
            label="Document"
          >
            <div className="space-y-0.5">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">References</div>
              <MenuItem 
                icon={Quote} 
                label="Citation" 
                description="Add reference"
                onClick={() => {
                  window.postMessage({ type: "open-citation-dialog" }, "*");
                }} 
              />
              <MenuItem 
                icon={Link} 
                label="Link" 
                description="Add hyperlink"
                onClick={insertLink} 
              />
              
              <Separator className="my-1" />
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Insert</div>
              <MenuItem 
                icon={Minus} 
                label="Horizontal Line" 
                description="Page divider"
                onClick={insertHorizontalRule} 
              />
            </div>
          </DropdownSection>

          <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

          {/* Media Dropdown */}
          <DropdownSection
            id="media"
            trigger={<Image className="h-4 w-4" />}
            label="Media & Insert"
            className="hidden sm:flex"
          >
            <div className="space-y-0.5">
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Media</div>
              <MenuItem 
                icon={Image} 
                label="Image" 
                description="Insert image"
                onClick={insertImage} 
              />
              <MenuItem 
                icon={Pencil} 
                label="Drawing" 
                description="Sketch/diagram"
                onClick={() => {
                  window.postMessage({ type: "open-drawing-dialog" }, "*");
                }} 
              />
              <MenuItem 
                icon={Table} 
                label="Table" 
                description="Data table"
                onClick={insertTable} 
              />
              
              <Separator className="my-1" />
              <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Charts</div>
              <MenuItem 
                icon={BarChart3} 
                label="New Chart" 
                description="Create chart manually"
                onClick={() => {
                  setChartInitialData(undefined);
                  setChartInitialTitle(undefined);
                  setOpenDropdown(null);
                  setChartDialogOpen(true);
                }} 
              />
              <MenuItem 
                icon={BarChart3} 
                label="Chart from Table" 
                description="Generate from selected table"
                onClick={createChartFromTable} 
              />
            </div>
          </DropdownSection>

          {/* AI Commands Dropdown */}
          {onAICommand && (
            <DropdownSection
              id="ai"
              trigger={<Sparkles className="h-4 w-4" />}
              label="AI Commands"
              className="hidden md:flex"
            >
              <div className="space-y-0.5">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                  {hasSelection() ? `AI: "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? '...' : ''}"` : "Select text first"}
                </div>
                <MenuItem 
                  icon={Sparkles} 
                  label="Define" 
                  description="Get definition"
                  onClick={() => handleAI('define')} 
                  disabled={!hasSelection()}
                />
                <MenuItem 
                  icon={Sparkles} 
                  label="Explain" 
                  description="Get explanation"
                  onClick={() => handleAI('explain')} 
                  disabled={!hasSelection()}
                />
                <MenuItem 
                  icon={Sparkles} 
                  label="Synonym" 
                  description="Find alternatives"
                  onClick={() => handleAI('synonym')} 
                  disabled={!hasSelection()}
                />
                <MenuItem 
                  icon={Sparkles} 
                  label="Rephrase" 
                  description="Rewrite text"
                  onClick={() => handleAI('rephrase')} 
                  disabled={!hasSelection()}
                />
                <MenuItem 
                  icon={Sparkles} 
                  label="Grammar" 
                  description="Check & fix"
                  onClick={() => handleAI('grammar')} 
                  disabled={!hasSelection()}
                />
              </div>
            </DropdownSection>
          )}

          <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

          {/* Alignment */}
          <div className="hidden sm:flex items-center">
            <ToolbarButton onClick={() => setAlignment('Left')} icon={AlignLeft} tooltip="Align Left" />
            <ToolbarButton onClick={() => setAlignment('Center')} icon={AlignCenter} tooltip="Center" />
            <ToolbarButton onClick={() => setAlignment('Right')} icon={AlignRight} tooltip="Align Right" />
            <ToolbarButton onClick={() => setAlignment('Justify')} icon={AlignJustify} tooltip="Justify" className="hidden md:flex" />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1 hidden lg:block" />

          {/* Font selectors */}
          <div className="hidden lg:flex items-center gap-1">
            <select
              value={currentFont}
              onChange={(e) => handleFontChange(e.target.value)}
              className="h-8 px-2 text-xs border rounded bg-background"
            >
              {FONTS.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
            
            <select
              value={currentSize}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="h-8 w-14 px-1 text-xs border rounded bg-background"
            >
              {FONT_SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1 hidden xl:block" />

          {/* Undo/Redo */}
          <div className="hidden xl:flex items-center">
            <ToolbarButton onClick={undo} icon={Undo} tooltip="Undo (⌘Z)" />
            <ToolbarButton onClick={redo} icon={Redo} tooltip="Redo (⌘Y)" />
          </div>
        </div>
      </div>
      )}
      
      {/* Document Editor */}
      <div className="flex-1 syncfusion-editor-container" style={{ height: '100%', minHeight: 0 }}>
        <style>{`
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
        `}</style>
        
        <DocumentEditorContainerComponent
          id="draft-syncfusion-editor"
          ref={containerRef}
          style={{ display: 'block', height: '100%' }}
          height="100%"
          enableToolbar={false}
          showPropertiesPane={false}
          enableLocalPaste={true}
          locale="en-US"
          contentChange={handleContentChange}
          created={handleCreated}
        >
          <Inject services={[Toolbar]} />
        </DocumentEditorContainerComponent>
      </div>

      {/* Chart Dialog */}
      <ChartDialog
        open={chartDialogOpen}
        onOpenChange={setChartDialogOpen}
        onInsertChart={insertChartImage}
        initialData={chartInitialData}
        initialTitle={chartInitialTitle}
      />
    </div>
  );
});

SyncfusionEditor.displayName = 'SyncfusionEditor';

export default SyncfusionEditor;
