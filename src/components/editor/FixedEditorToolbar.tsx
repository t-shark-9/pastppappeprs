import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code,
  Subscript,
  Superscript,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Link,
  Sparkles,
  ChevronDown,
  Type,
  Sigma,
  Image,
  Table,
  Palette,
  Atom,
  Pencil,
  FileText,
  BookOpen,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FixedEditorToolbarProps {
  editor: any;
  onAICommand: (command: string, selectedText: string) => void;
}

export function FixedEditorToolbar({ editor, onAICommand }: FixedEditorToolbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getSelectedText = () => {
    if (!editor) return '';
    try {
      return editor.getSelectedText() || '';
    } catch {
      return '';
    }
  };

  const hasSelection = () => getSelectedText().trim().length > 0;

  // Text Styling Commands
  const toggleBold = () => editor?.toggleStyles({ bold: true });
  const toggleItalic = () => editor?.toggleStyles({ italic: true });
  const toggleUnderline = () => editor?.toggleStyles({ underline: true });
  const toggleStrike = () => editor?.toggleStyles({ strike: true });
  const toggleCode = () => editor?.toggleStyles({ code: true });
  const toggleSubscript = () => editor?.toggleStyles({ subscript: true });
  const toggleSuperscript = () => editor?.toggleStyles({ superscript: true });

  // Block Type Commands
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

  // AI Commands
  const handleAI = (command: string) => {
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
  }: { 
    icon: any; 
    label: string; 
    onClick: () => void; 
    active?: boolean;
    disabled?: boolean;
    className?: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={active ? "secondary" : "ghost"}
          size="sm"
          className={`h-8 w-8 p-0 ${className}`}
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

  const MenuItem = ({ 
    icon: Icon, 
    label, 
    onClick,
    disabled = false,
    description
  }: { 
    icon: any; 
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

  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-center gap-0.5 p-1.5 bg-background border-b overflow-x-auto">
      <div className="flex items-center gap-0.5 px-2 py-1 bg-muted/50 rounded-lg flex-shrink-0">
        {/* Text Formatting - Always visible (most important) */}
        <div className="flex items-center">
          <ToolbarButton icon={Bold} label="Bold (⌘B)" onClick={toggleBold} />
          <ToolbarButton icon={Italic} label="Italic (⌘I)" onClick={toggleItalic} />
          <ToolbarButton icon={Underline} label="Underline (⌘U)" onClick={toggleUnderline} />
          {/* Hide less common formatting on smaller screens */}
          <ToolbarButton icon={Strikethrough} label="Strikethrough" onClick={toggleStrike} className="hidden sm:flex" />
          <ToolbarButton icon={Code} label="Inline Code" onClick={toggleCode} className="hidden md:flex" />
          <ToolbarButton icon={Subscript} label="Subscript (⌘,)" onClick={toggleSubscript} className="hidden lg:flex" />
          <ToolbarButton icon={Superscript} label="Superscript (⌘.)" onClick={toggleSuperscript} className="hidden lg:flex" />
        </div>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Block Types Dropdown - Always visible */}
        <DropdownSection
          id="blocks"
          trigger={<Type className="h-4 w-4" />}
          label="Block Type"
        >
          <div className="space-y-0.5">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Headings</div>
            <MenuItem icon={Heading1} label="Heading 1" onClick={setHeading1} />
            <MenuItem icon={Heading2} label="Heading 2" onClick={setHeading2} />
            <MenuItem icon={Heading3} label="Heading 3" onClick={setHeading3} />
            <MenuItem icon={Pilcrow} label="Paragraph" onClick={setParagraph} />
            
            <Separator className="my-1" />
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Lists</div>
            <MenuItem icon={List} label="Bullet List" onClick={setBulletList} />
            <MenuItem icon={ListOrdered} label="Numbered List" onClick={setNumberedList} />
            <MenuItem icon={CheckSquare} label="Check List" onClick={setCheckList} />
          </div>
        </DropdownSection>

        {/* Document Dropdown - Always visible (citations/links are important) */}
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
              onClick={() => {
                const url = prompt("Enter URL:");
                if (url) {
                  editor?.createLink(url);
                }
              }} 
            />
            
            <Separator className="my-1" />
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Structure</div>
            <MenuItem 
              icon={FileText} 
              label="Title Page" 
              description="Insert title page"
              onClick={() => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks(
                    [
                      {
                        type: "heading",
                        props: { level: 1, textAlignment: "center" },
                        content: [{ type: "text", text: "Document Title", styles: {} }],
                      },
                      {
                        type: "paragraph",
                        props: { textAlignment: "center" },
                        content: [{ type: "text", text: "Author Name", styles: {} }],
                      },
                      {
                        type: "paragraph",
                        props: { textAlignment: "center" },
                        content: [{ type: "text", text: new Date().toLocaleDateString(), styles: {} }],
                      },
                    ],
                    block,
                    "after"
                  );
                }
              }} 
            />
            <MenuItem 
              icon={List} 
              label="Table of Contents" 
              description="Generate TOC"
              onClick={() => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  const allBlocks = editor?.document || [];
                  const headings = allBlocks.filter((b: any) => b.type === "heading");
                  
                  const tocBlocks: any[] = [
                    {
                      type: "heading",
                      props: { level: 2 },
                      content: [{ type: "text", text: "Table of Contents", styles: { bold: true } }],
                    },
                  ];

                  headings.forEach((heading: any) => {
                    const level = heading.props?.level || 1;
                    const text = heading.content?.map((c: any) => c.text || "").join("") || "Untitled";
                    const indent = "  ".repeat(level - 1);
                    
                    tocBlocks.push({
                      type: "paragraph",
                      content: [{ type: "text", text: `${indent}${text}`, styles: {} }],
                    });
                  });

                  editor?.insertBlocks(tocBlocks, block, "after");
                }
              }} 
            />
            <MenuItem 
              icon={BookOpen} 
              label="Bibliography" 
              description="References section"
              onClick={() => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks(
                    [
                      {
                        type: "heading",
                        props: { level: 2 },
                        content: [{ type: "text", text: "References", styles: { bold: true } }],
                      },
                      {
                        type: "paragraph",
                        content: [{ type: "text", text: "[1] Author, A. (Year). Title of work. Publisher.", styles: {} }],
                      },
                    ],
                    block,
                    "after"
                  );
                }
              }} 
            />
          </div>
        </DropdownSection>

        <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

        {/* Media Dropdown - Hide on very small screens */}
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
              onClick={() => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks([{ type: "image", props: { url: "", caption: "" } }], block, "after");
                }
              }} 
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
              onClick={() => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks([{ type: "table", props: {} }], block, "after");
                }
              }} 
            />
          </div>
        </DropdownSection>

        {/* AI Commands Dropdown - Hide on smaller screens */}
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

        {/* Math Dropdown - Hide on smaller screens (least essential for most users) */}
        <DropdownSection
          id="math"
          trigger={<Sigma className="h-4 w-4" />}
          label="Math & Science"
          className="hidden lg:flex"
        >
          <div className="space-y-0.5">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Math</div>
            <MenuItem 
              icon={Sigma} 
              label="Inline Math" 
              description="Math in text"
              onClick={() => {
                editor?.insertInlineContent([{ type: "inlineMathInline", props: { latex: "" } }]);
              }} 
            />
            <MenuItem 
              icon={Sigma} 
              label="Block Math" 
              description="Centered equation"
              onClick={() => {
                const block = editor?.getTextCursorPosition().block;
                if (block) {
                  editor?.insertBlocks([{ type: "blockMath", props: { latex: "", mode: "block", collapsed: false } }], block, "after");
                }
              }} 
            />
            
            <Separator className="my-1" />
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Science</div>
            <MenuItem 
              icon={Atom} 
              label="Molecule" 
              description="2D structure"
              onClick={() => {
                window.postMessage({ type: "open-molecule-dialog" }, "*");
              }} 
            />
          </div>
        </DropdownSection>

        {/* Fonts Dropdown - Hide on smaller screens (least essential) */}
        <DropdownSection
          id="fonts"
          trigger={<Palette className="h-4 w-4" />}
          label="Fonts"
          className="hidden xl:flex"
        >
          <div className="space-y-0.5">
            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Font Family</div>
            <MenuItem 
              icon={Type} 
              label="Sans Serif" 
              onClick={() => {
                const el = document.querySelector('.bn-editor');
                if (el) (el as HTMLElement).style.setProperty('--bn-font-family', 'ui-sans-serif, system-ui, sans-serif');
              }} 
            />
            <MenuItem 
              icon={Type} 
              label="Serif" 
              onClick={() => {
                const el = document.querySelector('.bn-editor');
                if (el) (el as HTMLElement).style.setProperty('--bn-font-family', 'ui-serif, Georgia, serif');
              }} 
            />
            <MenuItem 
              icon={Type} 
              label="Monospace" 
              onClick={() => {
                const el = document.querySelector('.bn-editor');
                if (el) (el as HTMLElement).style.setProperty('--bn-font-family', 'ui-monospace, monospace');
              }} 
            />
            <MenuItem 
              icon={Type} 
              label="Times New Roman" 
              onClick={() => {
                const el = document.querySelector('.bn-editor');
                if (el) (el as HTMLElement).style.setProperty('--bn-font-family', "'Times New Roman', Times, serif");
              }} 
            />
          </div>
        </DropdownSection>
      </div>
    </div>
  );
}
