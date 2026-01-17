/**
 * EditorSwitcher - Component to switch between different editor types
 * 
 * Provides a UI to select different editors while maintaining the same
 * content, panel system, and feature integration.
 */

import { useState, useCallback } from "react";
import type * as React from "react";
import { 
  Layout, 
  List,
  ChevronDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { EditorType, EDITOR_INFO } from "./index";
import { BlockNoteEditor } from "./BlockNoteEditor";
import { OutlineEditor } from "./OutlineEditor";

interface EditorSwitcherProps {
  initialEditor?: EditorType;
  initialContent?: any;
  onChange?: (content: any) => void;
  onEditorChange?: (editorType: EditorType) => void;
  onEditorReady?: (editor: any) => void;
  onPageCountChange?: (count: number) => void;
  onAICommandsReady?: (handlers: any) => void;
  userContext?: {
    schoolProgram?: string;
    subject?: string;
    taskType?: string;
  };
  className?: string;
}

const EDITOR_ICONS: Record<EditorType, React.ReactNode> = {
  blocknote: <Layout className="h-4 w-4" />,
  outline: <List className="h-4 w-4" />,
};

export function EditorSwitcher({
  initialEditor = 'blocknote',
  initialContent,
  onChange,
  onEditorChange,
  onEditorReady,
  onPageCountChange,
  onAICommandsReady,
  userContext,
  className,
}: EditorSwitcherProps) {
  // Validate initialEditor is a valid type
  const validTypes: EditorType[] = ['blocknote', 'outline'];
  const validInitialEditor = validTypes.includes(initialEditor) ? initialEditor : 'blocknote';
  
  const [currentEditor, setCurrentEditor] = useState<EditorType>(validInitialEditor);
  const [content, setContent] = useState(initialContent);

  const handleEditorChange = useCallback((newEditor: EditorType) => {
    setCurrentEditor(newEditor);
    onEditorChange?.(newEditor);
  }, [onEditorChange]);

  const handleContentChange = useCallback((newContent: any) => {
    setContent(newContent);
    onChange?.(newContent);
  }, [onChange]);

  const currentInfo = EDITOR_INFO[currentEditor];

  const renderEditor = () => {
    const commonProps = {
      onChange: handleContentChange,
      onEditorReady,
      onPageCountChange,
      onAICommandsReady,
      userContext,
    };

    switch (currentEditor) {
      case 'blocknote':
        return (
          <BlockNoteEditor 
            {...commonProps}
            initialContent={typeof content === 'string' ? undefined : content}
          />
        );
      case 'outline':
        return (
          <OutlineEditor 
            {...commonProps}
            initialContent={Array.isArray(content) ? content : undefined}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Editor Switcher Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                {EDITOR_ICONS[currentEditor]}
                <span className="font-medium">{currentInfo.name}</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel>Choose Editor</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {(Object.keys(EDITOR_INFO) as EditorType[]).map((type) => {
                const info = EDITOR_INFO[type];
                const isActive = type === currentEditor;
                
                return (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => handleEditorChange(type)}
                    className="flex items-start gap-3 p-3"
                  >
                    <div className="text-lg">{info.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{info.name}</span>
                        {isActive && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {info.description}
                      </p>
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {info.bestFor.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-[10px] px-1.5 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <span className="text-xs text-muted-foreground">
            {currentInfo.description}
          </span>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        {renderEditor()}
      </div>
    </div>
  );
}

export default EditorSwitcher;
