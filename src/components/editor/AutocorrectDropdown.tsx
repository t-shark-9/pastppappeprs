import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { SpellCheck } from 'lucide-react';

interface AutocorrectSuggestion {
  word: string;
  score: number;
}

interface AutocorrectDropdownProps {
  isOpen: boolean;
  suggestions: AutocorrectSuggestion[];
  selectedIndex: number;
  position: { top: number; left: number } | null;
  currentWord: string;
  onSelect: (word: string) => void;
  onClose: () => void;
  onNavigate: (direction: 'up' | 'down') => void;
}

export function AutocorrectDropdown({
  isOpen,
  suggestions,
  selectedIndex,
  position,
  currentWord,
  onSelect,
  onClose,
  onNavigate,
}: AutocorrectDropdownProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        onNavigate('down');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        onNavigate('up');
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          onSelect(suggestions[selectedIndex].word);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, suggestions, onSelect, onClose, onNavigate]);

  // Scroll selected item into view
  useEffect(() => {
    if (menuRef.current && isOpen) {
      const selectedElement = menuRef.current.children[selectedIndex + 1] as HTMLElement; // +1 for header
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, isOpen]);

  if (!isOpen || !position || suggestions.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed z-[9999]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <ul
        ref={menuRef}
        role="listbox"
        className={cn(
          "min-w-[180px] max-w-[280px] bg-popover border border-border rounded-lg shadow-lg",
          "overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
          "duration-150"
        )}
      >
        {/* Header */}
        <li className="px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border flex items-center gap-2 bg-muted/50">
          <SpellCheck className="h-3 w-3" />
          <span>Suggestions for "{currentWord}"</span>
        </li>

        {/* Suggestions */}
        {suggestions.map((suggestion, index) => {
          const isHighlighted = index === selectedIndex;
          const confidence = Math.round(suggestion.score * 100);
          
          return (
            <li
              key={suggestion.word}
              role="option"
              aria-selected={isHighlighted}
              className={cn(
                "px-3 py-2 cursor-pointer flex items-center justify-between gap-2",
                "transition-colors duration-75",
                isHighlighted
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
              onClick={() => onSelect(suggestion.word)}
            >
              <span className="font-medium">{suggestion.word}</span>
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                confidence >= 80 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : confidence >= 60
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-muted text-muted-foreground"
              )}>
                {confidence}%
              </span>
            </li>
          );
        })}

        {/* Footer hint */}
        <li className="px-3 py-1.5 text-[10px] text-muted-foreground border-t border-border bg-muted/30 flex items-center gap-3">
          <span>↑↓ navigate</span>
          <span>Tab/Enter select</span>
          <span>Esc dismiss</span>
        </li>
      </ul>
    </div>
  );
}
