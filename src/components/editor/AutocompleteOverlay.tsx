import React from 'react';
import { Sparkles } from 'lucide-react';

interface AutocompleteOverlayProps {
  suggestion: string;
  position: { top: number; left: number } | null;
  isLoading?: boolean;
}

export function AutocompleteOverlay({ suggestion, position, isLoading }: AutocompleteOverlayProps) {
  if (!position || (!suggestion && !isLoading)) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 99999,
      }}
    >
      {isLoading ? (
        <div className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-primary/10 backdrop-blur-sm text-sm text-primary font-medium shadow-lg border border-primary/20 animate-pulse">
          <Sparkles className="h-4 w-4" />
          <span>AI is thinking...</span>
        </div>
      ) : suggestion ? (
        <div className="inline-block">
          <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-muted/80 backdrop-blur-sm text-sm text-muted-foreground italic shadow-lg border border-border">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            {suggestion}
          </span>
          <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-medium shadow-md border">
            <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px] font-bold">Ctrl</kbd>+<kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px] font-bold">Enter</kbd>
          </span>
        </div>
      ) : null}
    </div>
  );
}
