import { useState } from "react";
import type * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Type, 
  Heading, 
  List, 
  Image, 
  Sigma, 
  Sparkles, 
  Quote, 
  FileText, 
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link,
  Table,
  Atom,
  Palette,
  Calendar
} from "lucide-react";

interface StandingToolbarProps {
  onCommand: (command: string, selectedText?: string) => void;
  disabled?: boolean;
  editor?: any; // BlockNote editor instance
}

export function StandingToolbar({ onCommand, disabled = false, editor }: StandingToolbarProps) {
  
  // Function to get currently selected text
  const getSelectedText = () => {
    if (!editor) return '';
    try {
      const selectedText = editor.getSelectedText();
      return selectedText || '';
    } catch (error) {
      console.warn('Could not get selected text:', error);
      return '';
    }
  };
  
  // Function to check if text is selected
  const hasTextSelection = () => {
    return getSelectedText().trim().length > 0;
  };
  const textCommands = [
    { label: "Heading 1", command: "heading1", icon: <Heading className="h-4 w-4" />, appliesToSelection: false },
    { label: "Heading 2", command: "heading2", icon: <Heading className="h-4 w-4" />, appliesToSelection: false },
    { label: "Heading 3", command: "heading3", icon: <Heading className="h-4 w-4" />, appliesToSelection: false },
    { label: "Paragraph", command: "paragraph", icon: <Type className="h-4 w-4" />, appliesToSelection: false },
    { 
      label: "Bold", 
      command: "bold", 
      icon: <Bold className="h-4 w-4" />, 
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Make "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? '...' : ''}" bold` : "Make text bold"
    },
    { 
      label: "Italic", 
      command: "italic", 
      icon: <Italic className="h-4 w-4" />, 
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Make "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? '...' : ''}" italic` : "Make text italic"
    },
    { 
      label: "Underline", 
      command: "underline", 
      icon: <Underline className="h-4 w-4" />, 
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Underline "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? '...' : ''}"` : "Underline text"
    },
    { 
      label: "Strikethrough", 
      command: "strikethrough", 
      icon: <Strikethrough className="h-4 w-4" />, 
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Strike through "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? '...' : ''}"` : "Strike through text"
    },
    { 
      label: "Inline Code", 
      command: "code", 
      icon: <Code className="h-4 w-4" />, 
      appliesToSelection: true,
      tooltip: hasTextSelection() ? `Format "${getSelectedText().slice(0, 15)}${getSelectedText().length > 15 ? '...' : ''}" as code` : "Format as inline code"
    },
  ];

  const listCommands = [
    { label: "Bullet List", command: "bulletlist", icon: <List className="h-4 w-4" /> },
    { label: "Numbered List", command: "numberedlist", icon: <List className="h-4 w-4" /> },
    { label: "To-Do List", command: "checklist", icon: <List className="h-4 w-4" /> },
  ];

  const mathCommands = [
    { label: "Inline Math", command: "inlinemath", icon: <Sigma className="h-4 w-4" /> },
    { label: "Block Math", command: "blockmath", icon: <Sigma className="h-4 w-4" /> },
    { label: "Fraction", command: "fraction", icon: <Sigma className="h-4 w-4" /> },
    { label: "Square Root", command: "sqrt", icon: <Sigma className="h-4 w-4" /> },
    { label: "Integral", command: "integral", icon: <Sigma className="h-4 w-4" /> },
    { label: "Sum", command: "sum", icon: <Sigma className="h-4 w-4" /> },
  ];

  const mediaCommands = [
    { label: "Image", command: "image", icon: <Image className="h-4 w-4" /> },
    { label: "Drawing", command: "drawing", icon: <Image className="h-4 w-4" /> },
    { label: "Molecule", command: "molecule", icon: <Atom className="h-4 w-4" /> },
    { label: "Table", command: "table", icon: <Table className="h-4 w-4" /> },
    { label: "Link", command: "link", icon: <Link className="h-4 w-4" /> },
  ];

  const aiCommands = [
    { 
      label: "Define", 
      command: "define", 
      icon: <Sparkles className="h-4 w-4" />,
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Define "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? '...' : ''}"` : "Select text to define"
    },
    { 
      label: "Explain", 
      command: "explain", 
      icon: <Sparkles className="h-4 w-4" />,
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Explain "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? '...' : ''}"` : "Select text to explain"
    },
    { 
      label: "Synonym", 
      command: "synonym", 
      icon: <Sparkles className="h-4 w-4" />,
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Find synonyms for "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? '...' : ''}"` : "Select text to find synonyms"
    },
    { 
      label: "Rephrase", 
      command: "rephrase", 
      icon: <Sparkles className="h-4 w-4" />,
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Rephrase "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? '...' : ''}"` : "Select text to rephrase"
    },
    { 
      label: "Grammar Check", 
      command: "grammar", 
      icon: <Sparkles className="h-4 w-4" />,
      requiresSelection: true,
      tooltip: hasTextSelection() ? `Check grammar of "${getSelectedText().slice(0, 20)}${getSelectedText().length > 20 ? '...' : ''}"` : "Select text to check grammar"
    },
    { 
      label: "AI Feedback", 
      command: "feedback", 
      icon: <Sparkles className="h-4 w-4" />,
      requiresSelection: false,
      tooltip: "Get AI feedback on current block"
    },
  ];

  const documentCommands = [
    { label: "Title Page", command: "titlepage", icon: <FileText className="h-4 w-4" /> },
    { label: "Table of Contents", command: "toc", icon: <FileText className="h-4 w-4" /> },
    { label: "Bibliography", command: "bibliography", icon: <FileText className="h-4 w-4" /> },
    { label: "Citation", command: "citation", icon: <Quote className="h-4 w-4" /> },
    { label: "Page Break", command: "pagebreak", icon: <FileText className="h-4 w-4" /> },
  ];

  const fontCommands = [
    { label: "Sans Serif", command: "font sans", icon: <Type className="h-4 w-4" /> },
    { label: "Serif", command: "font serif", icon: <Type className="h-4 w-4" /> },
    { label: "Monospace", command: "font mono", icon: <Type className="h-4 w-4" /> },
    { label: "Comic Sans", command: "font comic", icon: <Type className="h-4 w-4" /> },
    { label: "Georgia", command: "font georgia", icon: <Type className="h-4 w-4" /> },
    { label: "Times New Roman", command: "font times", icon: <Type className="h-4 w-4" /> },
    { label: "Arial", command: "font arial", icon: <Type className="h-4 w-4" /> },
    { label: "Courier New", command: "font courier", icon: <Type className="h-4 w-4" /> },
  ];

  const CommandDropdown = ({ 
    label, 
    icon, 
    commands 
  }: { 
    label: string; 
    icon: React.ReactNode; 
    commands: Array<{ 
      label: string; 
      command: string; 
      icon: React.ReactNode;
      requiresSelection?: boolean;
      appliesToSelection?: boolean;
      tooltip?: string;
    }> 
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`h-8 transition-all duration-200 ease-in-out overflow-hidden ${
              isHovered 
                ? 'w-auto px-3 gap-2' 
                : 'w-8 px-0'
            }`}
            disabled={disabled}
            onMouseEnter={() => {
              setIsHovered(true);
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              // Small delay before closing to allow moving to dropdown
              setTimeout(() => {
                if (!document.querySelector('[data-radix-popper-content-wrapper]:hover')) {
                  setIsOpen(false);
                }
              }, 150);
            }}
          >
            {icon}
            <span className={`whitespace-nowrap transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0 w-0'
            }`}>
              {isHovered && label}
            </span>
            <ChevronDown className={`h-3 w-3 transition-all duration-200 ${
              isHovered ? 'opacity-100 ml-1' : 'opacity-0 w-0'
            }`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-48"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => {
            setIsOpen(false);
            setIsHovered(false);
          }}
        >
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {commands.map((cmd) => {
            const isDisabled = cmd.requiresSelection && !hasTextSelection();
            const selectedText = getSelectedText();
            
            return (
              <DropdownMenuItem 
                key={cmd.command}
                onClick={() => {
                  if (!isDisabled) {
                    onCommand(cmd.command, selectedText);
                  }
                }}
                className={`flex items-center gap-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isDisabled}
                title={cmd.tooltip}
              >
                {cmd.icon}
                {cmd.label}
                {cmd.requiresSelection && selectedText && (
                  <span className="ml-auto text-xs text-muted-foreground max-w-24 truncate">
                    "{selectedText.slice(0, 15)}{selectedText.length > 15 ? '...' : ''}"
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

  return (
    <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <CommandDropdown 
            label="Text" 
            icon={<Type className="h-4 w-4" />} 
            commands={textCommands} 
          />
          <CommandDropdown 
            label="Lists" 
            icon={<List className="h-4 w-4" />} 
            commands={listCommands} 
          />
          <CommandDropdown 
            label="Math" 
            icon={<Sigma className="h-4 w-4" />} 
            commands={mathCommands} 
          />
          <CommandDropdown 
            label="Media" 
            icon={<Image className="h-4 w-4" />} 
            commands={mediaCommands} 
          />
          <CommandDropdown 
            label="AI" 
            icon={<Sparkles className="h-4 w-4" />} 
            commands={aiCommands} 
          />
          <CommandDropdown 
            label="Document" 
            icon={<FileText className="h-4 w-4" />} 
            commands={documentCommands} 
          />
          <CommandDropdown 
            label="Fonts" 
            icon={<Palette className="h-4 w-4" />} 
            commands={fontCommands} 
          />
        </div>
      </div>
    </div>
  );
}