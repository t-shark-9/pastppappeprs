import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useRef } from "react";

interface BackButtonProps {
  /** Falls angegeben, wird diese Route als Fallback verwendet, wenn keine Historie existiert */
  fallbackPath?: string;
  /** Zusätzlicher Text neben dem Icon (optional) */
  label?: string;
  /** Button-Variante */
  variant?: "default" | "outline" | "ghost" | "secondary" | "link" | "destructive";
  /** Button-Größe */
  size?: "default" | "sm" | "lg" | "icon";
  /** Tooltip-Text */
  tooltip?: string;
  /** CSS-Klassen */
  className?: string;
  /** Vollständig custom onClick Handler (überschreibt Standard-Verhalten) */
  onClick?: () => void;
}

export function BackButton({ 
  fallbackPath = "/", 
  label,
  variant = "ghost",
  size = "icon",
  tooltip,
  className,
  onClick
}: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationHistoryRef = useRef<string[]>([]);

  // Track navigation history in sessionStorage
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Load history from sessionStorage on mount
    const savedHistory = sessionStorage.getItem('tooessay_nav_history');
    if (savedHistory) {
      try {
        navigationHistoryRef.current = JSON.parse(savedHistory);
      } catch {
        navigationHistoryRef.current = [];
      }
    }

    // Add current path to history if it's different from the last one
    const lastPath = navigationHistoryRef.current[navigationHistoryRef.current.length - 1];
    if (currentPath !== lastPath) {
      navigationHistoryRef.current.push(currentPath);
      
      // Keep only last 10 paths to avoid memory issues
      if (navigationHistoryRef.current.length > 10) {
        navigationHistoryRef.current = navigationHistoryRef.current.slice(-10);
      }
      
      // Save to sessionStorage
      sessionStorage.setItem('tooessay_nav_history', JSON.stringify(navigationHistoryRef.current));
    }

    // Add keyboard shortcut for left arrow key
    const handleKeyDown = (e: KeyboardEvent) => {
      // Left arrow key to go back
      if (e.key === 'ArrowLeft' && e.altKey && !onClick) {
        e.preventDefault();
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    const currentPath = location.pathname;

    // Work area navigation hierarchy (formerly dashboard)
    // Draft/SimpleDraft → Outline → Plan → Assignment → Work
    if (currentPath.includes('/draft') || currentPath.includes('/simple-draft')) {
      const assignmentId = currentPath.split('/')[3]; // /work/assignment/:id/draft
      if (assignmentId) {
        navigate(`/work/assignment/${assignmentId}/outline`);
        return;
      }
    }
    
    if (currentPath.includes('/outline')) {
      const assignmentId = currentPath.split('/')[3];
      if (assignmentId) {
        navigate(`/work/assignment/${assignmentId}/plan`);
        return;
      }
    }
    
    if (currentPath.includes('/plan')) {
      const assignmentId = currentPath.split('/')[3];
      if (assignmentId) {
        navigate(`/work/assignment/${assignmentId}?edit=true`);
        return;
      }
    }
    
    if (currentPath.startsWith('/work/assignment/') && !currentPath.includes('/plan') && !currentPath.includes('/outline') && !currentPath.includes('/draft')) {
      navigate('/work');
      return;
    }

    // Notes editor goes to notes overview
    if (currentPath.startsWith('/work/notes/edit')) {
      navigate('/work/notes');
      return;
    }

    // Study page goes to flashcards
    if (currentPath.startsWith('/work/study')) {
      navigate('/work/flashcards');
      return;
    }

    // All other work pages go to work
    if (currentPath.startsWith('/work/notes') || 
        currentPath.startsWith('/work/books') || 
        currentPath.startsWith('/work/study') ||
        currentPath.startsWith('/work/flashcards') ||
        currentPath.startsWith('/work/assignments') ||
        currentPath.startsWith('/work/past-papers') ||
        currentPath.startsWith('/work/trash') ||
        currentPath.startsWith('/work/settings') ||
        currentPath.startsWith('/work/improvements') ||
        currentPath.startsWith('/work/molecule') ||
        currentPath.startsWith('/work/drawings')) {
      navigate('/work');
      return;
    }

    // Homepage directory hierarchy navigation
    // For paths like /homepage/grade-boundaries/biology → /homepage/grade-boundaries
    if (currentPath.startsWith('/homepage/')) {
      const pathParts = currentPath.split('/').filter(Boolean);
      
      // If we're at /homepage/something/nested, go up one level
      if (pathParts.length > 2) {
        const parentPath = '/' + pathParts.slice(0, -1).join('/');
        navigate(parentPath);
        return;
      }
      
      // If we're at /homepage/something, go to homepage
      if (pathParts.length === 2) {
        navigate('/');
        return;
      }
    }

    // For public pages, use history or fallback
    const history = navigationHistoryRef.current;
    
    // If we have at least 2 items in history (current + previous)
    if (history.length >= 2) {
      // Remove current page
      history.pop();
      // Get previous page
      const previousPath = history[history.length - 1];
      
      // Navigate to previous page
      if (previousPath && previousPath !== location.pathname) {
        navigate(previousPath);
        return;
      }
    }
    
    // Fallback: navigate to fallback path
    navigate(fallbackPath);
  };

  const button = (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      <ArrowLeft className={label ? "h-4 w-4 mr-2" : "h-4 w-4"} />
      {label && <span>{label}</span>}
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
