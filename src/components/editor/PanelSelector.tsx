import { Sparkles, Lightbulb, MessageSquare, ClipboardCheck, List } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type PanelType = 'feedback' | 'outline' | 'comments' | 'grading' | 'toc' | null;

interface PanelSelectorProps {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  side: 'left' | 'right';
  lastSelected?: PanelType;
  collapsed?: boolean;
  showGrading?: boolean; // Whether to show grading criteria panel (IB users only)
}

const allPanels = [
  { id: 'feedback' as const, icon: Sparkles, label: 'AI Feedback' },
  { id: 'outline' as const, icon: Lightbulb, label: 'Planning Notes' },
  { id: 'comments' as const, icon: MessageSquare, label: 'Comments' },
  { id: 'grading' as const, icon: ClipboardCheck, label: 'Grading Criteria' },
  { id: 'toc' as const, icon: List, label: 'Table of Contents' },
];

export function PanelSelector({ activePanel, onPanelChange, side, lastSelected, collapsed, showGrading = true }: PanelSelectorProps) {
  // Filter out grading panel if showGrading is false
  const panels = showGrading 
    ? allPanels 
    : allPanels.filter(p => p.id !== 'grading');

  const handleClick = (panelId: PanelType) => {
    // If clicking the same panel, collapse it (set to null)
    // If clicking a different panel, switch to it
    if (activePanel === panelId) {
      onPanelChange(null);
    } else {
      onPanelChange(panelId);
    }
  };

  // When collapsed, show only the last selected icon
  if (collapsed && lastSelected) {
    const panel = panels.find(p => p.id === lastSelected);
    if (panel) {
      const Icon = panel.icon;
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => onPanelChange(lastSelected)}
                className="p-2 rounded-md transition-colors hover:bg-muted text-muted-foreground"
              >
                <Icon className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Open {panel.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-row gap-1">
        {panels.map((panel) => {
          const Icon = panel.icon;
          const isActive = activePanel === panel.id;
          
          return (
            <Tooltip key={panel.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleClick(panel.id)}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    "hover:bg-muted",
                    isActive 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{panel.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export function getPanelTitle(panelType: PanelType): string {
  switch (panelType) {
    case 'feedback': return 'AI Feedback';
    case 'outline': return 'Planning Notes';
    case 'comments': return 'Comments';
    case 'grading': return 'Grading Criteria';
    case 'toc': return 'Table of Contents';
    default: return '';
  }
}

export function getPanelIcon(panelType: PanelType) {
  switch (panelType) {
    case 'feedback': return Sparkles;
    case 'outline': return Lightbulb;
    case 'comments': return MessageSquare;
    case 'grading': return ClipboardCheck;
    case 'toc': return List;
    default: return null;
  }
}
