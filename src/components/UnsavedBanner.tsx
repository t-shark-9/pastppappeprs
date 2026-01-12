import { useNavigate, useLocation } from "react-router-dom";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CloudOff, Briefcase } from "lucide-react";

export function UnsavedBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isGhostMode, ghostAssignments, ghostUserType } = useGhostSession();
  const { user } = useAuth();
  
  const isOfficeMode = ghostUserType === 'office';

  // Define SEO/public pages where banner should NOT appear
  const publicPages = [
    "/",
    "/about",
    "/plan",
    "/imprint",
    "/privacy",
    "/terms",
    "/contact",
    "/grade-boundaries",
    "/educational-systems",
    "/ia-guides",
    "/ia-experience",
    "/exam-resources",
    "/extended-essay",
    "/theory-of-knowledge",
    "/auth"
  ];

  // Check if current path is a public page or starts with a public path
  const isPublicPage = publicPages.some(page => 
    location.pathname === page || 
    location.pathname.startsWith(page + "/")
  );

  // Don't show on public/SEO pages
  if (isPublicPage) {
    return null;
  }

  // Only show if in ghost mode and not signed in
  if (!isGhostMode || user || ghostAssignments.length === 0) {
    return null;
  }

  const handleClick = () => {
    // Store flag to indicate we should migrate ghost data after auth
    localStorage.setItem("tooessay_migrate_ghost_after_auth", "true");
    navigate("/auth");
  };

  return (
    <div className="fixed top-9 left-1/2 -translate-x-1/2 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isOfficeMode ? "outline" : "destructive"}
            size="sm"
            onClick={handleClick}
            className={isOfficeMode ? "shadow-lg border-primary/50" : "shadow-lg animate-pulse hover:animate-none"}
          >
            {isOfficeMode ? (
              <Briefcase className="h-4 w-4 mr-2" />
            ) : (
              <CloudOff className="h-4 w-4 mr-2" />
            )}
            {isOfficeMode ? 'Local Mode' : `Unsaved (${ghostAssignments.length})`}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <p>{isOfficeMode 
            ? 'Your documents are stored locally. Create an account to sync across devices.'
            : "You aren't signed in. Click to save your work to an account."}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
