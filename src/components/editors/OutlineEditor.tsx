/**
 * OutlineEditor - Hierarchical Outliner Editor
 * 
 * An outliner-focused editor inspired by Workflowy, Roam, and Logseq:
 * - Hierarchical bullet points with infinite nesting
 * - Collapsible/expandable nodes
 * - Keyboard-driven navigation
 * - Drag and drop reordering
 * - Zoom into any node
 * - Backlinks and references
 * - Tags and filters
 */

import { useEffect, useState, useRef, useCallback } from "react";
import type { KeyboardEvent } from "react";
import type * as React from "react";
import { 
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  GripVertical,
  Hash,
  Link,
  Search,
  Home,
  ArrowLeft,
  Settings,
  Sparkles,
  MoreHorizontal,
  Copy,
  Scissors,
  Clipboard,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface OutlineNode {
  id: string;
  content: string;
  children: OutlineNode[];
  collapsed: boolean;
  completed?: boolean;
  tags?: string[];
}

interface OutlineEditorProps {
  initialContent?: OutlineNode[];
  onChange?: (content: OutlineNode[]) => void;
  placeholder?: string;
  onEditorReady?: (editor: any) => void;
  onPageCountChange?: (count: number) => void;
  onAICommandsReady?: (handlers: {
    define: (text: string) => Promise<void>;
    explain: (text: string) => Promise<void>;
    synonym: (text: string) => Promise<void>;
    rephrase: (text: string) => Promise<void>;
    grammar: (text: string) => Promise<void>;
  }) => void;
  userContext?: {
    schoolProgram?: string;
    subject?: string;
    taskType?: string;
  };
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultContent: OutlineNode[] = [
  {
    id: generateId(),
    content: "",
    children: [],
    collapsed: false,
  },
];

export function OutlineEditor({
  initialContent = defaultContent,
  onChange,
  placeholder = "Type something...",
  onEditorReady,
  onPageCountChange,
  onAICommandsReady,
  userContext,
}: OutlineEditorProps) {
  const { flags } = useFeatureFlags();
  const [nodes, setNodes] = useState<OutlineNode[]>(initialContent);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [zoomPath, setZoomPath] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  // Count total nodes for stats
  const countNodes = (nodeList: OutlineNode[]): number => {
    return nodeList.reduce((acc, node) => acc + 1 + countNodes(node.children), 0);
  };

  // Notify changes
  useEffect(() => {
    onChange?.(nodes);
    onPageCountChange?.(Math.ceil(countNodes(nodes) / 50));
  }, [nodes, onChange, onPageCountChange]);

  // Notify ready
  useEffect(() => {
    const editorAPI = {
      getContent: () => nodes,
      setContent: (content: OutlineNode[]) => setNodes(content),
      focus: () => {
        if (nodes.length > 0) {
          setFocusedId(nodes[0].id);
          inputRefs.current.get(nodes[0].id)?.focus();
        }
      },
    };
    onEditorReady?.(editorAPI);
    
    if (onAICommandsReady) {
      onAICommandsReady({
        define: async (text) => { toast.info(`Define: ${text}`); },
        explain: async (text) => { toast.info(`Explain: ${text}`); },
        synonym: async (text) => { toast.info(`Synonym: ${text}`); },
        rephrase: async (text) => { toast.info(`Rephrase: ${text}`); },
        grammar: async (text) => { toast.info(`Grammar: ${text}`); },
      });
    }
  }, [onEditorReady, onAICommandsReady]);

  // Find node by ID
  const findNode = (nodeList: OutlineNode[], id: string): OutlineNode | null => {
    for (const node of nodeList) {
      if (node.id === id) return node;
      const found = findNode(node.children, id);
      if (found) return found;
    }
    return null;
  };

  // Find parent of node
  const findParent = (nodeList: OutlineNode[], id: string, parent: OutlineNode | null = null): OutlineNode | null => {
    for (const node of nodeList) {
      if (node.id === id) return parent;
      const found = findParent(node.children, id, node);
      if (found !== undefined) return found;
    }
    return null;
  };

  // Get visible nodes (based on zoom level)
  const getVisibleNodes = (): OutlineNode[] => {
    if (zoomPath.length === 0) return nodes;
    let current: OutlineNode[] = nodes;
    for (const pathId of zoomPath) {
      const node = current.find(n => n.id === pathId);
      if (node) {
        current = node.children;
      }
    }
    return current;
  };

  // Update node in tree
  const updateNode = (nodeList: OutlineNode[], id: string, updates: Partial<OutlineNode>): OutlineNode[] => {
    return nodeList.map(node => {
      if (node.id === id) {
        return { ...node, ...updates };
      }
      return { ...node, children: updateNode(node.children, id, updates) };
    });
  };

  // Add node after ID
  const addNodeAfter = (id: string, asChild: boolean = false) => {
    const newNode: OutlineNode = {
      id: generateId(),
      content: "",
      children: [],
      collapsed: false,
    };

    setNodes(prev => {
      if (asChild) {
        return updateNode(prev, id, {
          children: [...(findNode(prev, id)?.children || []), newNode],
          collapsed: false,
        });
      }

      const addAfterRecursive = (nodeList: OutlineNode[]): OutlineNode[] => {
        const result: OutlineNode[] = [];
        for (const node of nodeList) {
          result.push(node);
          if (node.id === id) {
            result.push(newNode);
          }
          if (node.children.length > 0) {
            // Don't recursively add here, we need to process children separately
          }
        }
        return result.map(n => ({
          ...n,
          children: n.children.length > 0 ? addAfterRecursive(n.children) : n.children,
        }));
      };
      
      // Simple implementation: find and insert after
      const insert = (list: OutlineNode[]): OutlineNode[] => {
        const result: OutlineNode[] = [];
        for (const node of list) {
          const updatedNode = { ...node, children: insert(node.children) };
          result.push(updatedNode);
          if (node.id === id) {
            result.push(newNode);
          }
        }
        return result;
      };
      
      return insert(prev);
    });

    setTimeout(() => {
      setFocusedId(newNode.id);
      inputRefs.current.get(newNode.id)?.focus();
    }, 0);
  };

  // Delete node
  const deleteNode = (id: string) => {
    setNodes(prev => {
      const remove = (list: OutlineNode[]): OutlineNode[] => {
        return list.filter(n => n.id !== id).map(n => ({
          ...n,
          children: remove(n.children),
        }));
      };
      return remove(prev);
    });
  };

  // Toggle collapse
  const toggleCollapse = (id: string) => {
    setNodes(prev => updateNode(prev, id, { 
      collapsed: !findNode(prev, id)?.collapsed 
    }));
  };

  // Toggle completion
  const toggleComplete = (id: string) => {
    setNodes(prev => updateNode(prev, id, { 
      completed: !findNode(prev, id)?.completed 
    }));
  };

  // Zoom into node
  const zoomIn = (id: string) => {
    setZoomPath(prev => [...prev, id]);
  };

  // Zoom out
  const zoomOut = () => {
    setZoomPath(prev => prev.slice(0, -1));
  };

  // Handle key events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, node: OutlineNode) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addNodeAfter(node.id);
    } else if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      // Indent: make this a child of previous sibling
      // TODO: implement indentation
      toast.info("Indent with Tab (coming soon)");
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      // Outdent: make this a sibling of parent
      toast.info("Outdent with Shift+Tab (coming soon)");
    } else if (e.key === "Backspace" && node.content === "") {
      e.preventDefault();
      deleteNode(node.id);
    } else if (e.key === "ArrowUp" && e.metaKey) {
      e.preventDefault();
      // Move node up
      toast.info("Move up with ⌘↑ (coming soon)");
    } else if (e.key === "ArrowDown" && e.metaKey) {
      e.preventDefault();
      // Move node down
      toast.info("Move down with ⌘↓ (coming soon)");
    }
  };

  // Handle content change
  const handleContentChange = (id: string, content: string) => {
    // Parse tags from content
    const tagMatches = content.match(/#[\w-]+/g) || [];
    const tags = tagMatches.map(t => t.slice(1));
    
    setNodes(prev => updateNode(prev, id, { content, tags }));
  };

  // Filter nodes by search query
  const filterNodes = (nodeList: OutlineNode[]): OutlineNode[] => {
    if (!searchQuery) return nodeList;
    return nodeList.filter(node => {
      const matchesSearch = node.content.toLowerCase().includes(searchQuery.toLowerCase());
      const childrenMatch = filterNodes(node.children).length > 0;
      return matchesSearch || childrenMatch;
    }).map(node => ({
      ...node,
      children: filterNodes(node.children),
    }));
  };

  // Render a single node
  const renderNode = (node: OutlineNode, depth: number = 0) => {
    const hasChildren = node.children.length > 0;
    
    return (
      <div key={node.id} className="outline-node">
        <div 
          className={cn(
            "flex items-start gap-1 group py-0.5 rounded hover:bg-gray-50 dark:hover:bg-zinc-800/50",
            focusedId === node.id && "bg-blue-50 dark:bg-blue-900/20",
            dropTargetId === node.id && "bg-blue-100 dark:bg-blue-800/30"
          )}
          style={{ paddingLeft: `${depth * 24}px` }}
        >
          {/* Drag Handle */}
          <div 
            className="opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing p-1"
            draggable
            onDragStart={() => setDraggedId(node.id)}
            onDragEnd={() => { setDraggedId(null); setDropTargetId(null); }}
          >
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>

          {/* Collapse Toggle */}
          <button 
            className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded"
            onClick={() => hasChildren && toggleCollapse(node.id)}
          >
            {hasChildren ? (
              node.collapsed ? 
                <ChevronRight className="h-4 w-4 text-gray-500" /> : 
                <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              </div>
            )}
          </button>

          {/* Checkbox (optional) */}
          <button 
            className="p-1 opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded"
            onClick={() => toggleComplete(node.id)}
          >
            {node.completed ? (
              <CheckSquare className="h-4 w-4 text-green-500" />
            ) : (
              <Square className="h-4 w-4 text-gray-400" />
            )}
          </button>

          {/* Content Input */}
          <input
            ref={(el) => { if (el) inputRefs.current.set(node.id, el); }}
            type="text"
            value={node.content}
            onChange={(e) => handleContentChange(node.id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, node)}
            onFocus={() => setFocusedId(node.id)}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-sm py-1",
              node.completed && "line-through text-gray-400"
            )}
          />

          {/* Tags */}
          {node.tags && node.tags.length > 0 && (
            <div className="flex gap-1">
              {node.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => zoomIn(node.id)}>
                <Search className="h-4 w-4 mr-2" /> Zoom in
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => addNodeAfter(node.id, true)}>
                <Plus className="h-4 w-4 mr-2" /> Add child
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(node.content);
                toast.success("Copied to clipboard");
              }}>
                <Copy className="h-4 w-4 mr-2" /> Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                navigator.clipboard.writeText(node.content);
                deleteNode(node.id);
                toast.success("Cut to clipboard");
              }}>
                <Scissors className="h-4 w-4 mr-2" /> Cut
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => deleteNode(node.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Children */}
        {!node.collapsed && hasChildren && (
          <div 
            className="border-l border-gray-200 dark:border-zinc-700 ml-6"
            onDragOver={(e) => { e.preventDefault(); setDropTargetId(node.id); }}
            onDragLeave={() => setDropTargetId(null)}
            onDrop={() => {
              // TODO: implement drop
              setDropTargetId(null);
              setDraggedId(null);
            }}
          >
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const visibleNodes = filterNodes(getVisibleNodes());
  const totalCount = countNodes(nodes);
  const currentZoomNode = zoomPath.length > 0 ? findNode(nodes, zoomPath[zoomPath.length - 1]) : null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {/* Breadcrumb / Zoom Path */}
          <button 
            onClick={() => setZoomPath([])}
            className={cn(
              "p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded",
              zoomPath.length === 0 && "text-primary"
            )}
          >
            <Home className="h-4 w-4" />
          </button>
          
          {zoomPath.length > 0 && (
            <>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <button 
                onClick={zoomOut}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium truncate max-w-[200px]">
                {currentZoomNode?.content || "Untitled"}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          {showSearch && (
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-48 h-8 text-sm"
              autoFocus
            />
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => addNodeAfter(nodes[nodes.length - 1]?.id || '', false)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add item</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm">
                <Sparkles className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>AI Assist</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {visibleNodes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No items yet. Press the + button or just start typing.</p>
          </div>
        ) : (
          visibleNodes.map(node => renderNode(node, 0))
        )}
      </div>

      {/* Footer / Stats */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-zinc-700 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>{totalCount} items</span>
          {searchQuery && (
            <span className="text-primary">{visibleNodes.length} matching</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>Press Enter to add • Tab to indent • Backspace to delete empty</span>
        </div>
      </div>
    </div>
  );
}

export default OutlineEditor;
