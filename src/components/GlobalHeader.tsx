import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, BookText, Zap, Menu, LogIn, Loader2, ChevronDown, PenLine, BookOpen, Award, Download, ClipboardCheck, CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export function GlobalHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { createGhostAssignment } = useGhostSession();
  const [creatingGhost, setCreatingGhost] = useState(false);

  // Hide header on work area, admin and auth pages
  const hiddenPaths = [
    '/work',
    '/admin',
    '/auth',
    '/dashboard', // legacy
    '/assignment', // legacy
    '/settings', // legacy
  ];

  // Check if current path should hide the header
  const shouldHideHeader = hiddenPaths.some(path => location.pathname.startsWith(path));

  const handleGetStarted = () => {
    navigate("/work");
  };

  if (shouldHideHeader) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Home Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/')}
                >
                  Home
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Home</p>
              </TooltipContent>
            </Tooltip>

            {/* Us Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Us</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => navigate('/homepage/us/about')}>
                  About
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/us/plan')}>
                  Plan
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/us/contact')}>
                  Contact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/us/improvements')}>
                  Improvements
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Blog Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <BookText className="h-4 w-4" />
                  <span className="text-sm">Blog</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => navigate('/homepage/blog/essay-guide')}>
                  How to Write an Essay
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/blog/ia-experience')}>
                  IA Experience
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/blog/exam-resources')}>
                  Exam Resources
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/blog/educational-systems')}>
                  Educational Systems
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* IA Guides */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/homepage/ia-guides')}
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>IA Writing Guides</p>
              </TooltipContent>
            </Tooltip>

            {/* Grade Boundaries */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/homepage/grade-boundaries')}
                >
                  <Award className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grade Boundaries</p>
              </TooltipContent>
            </Tooltip>

            {/* Speed Reader */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/homepage/speed-reader')}
                >
                  <Zap className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Speed Reader</p>
              </TooltipContent>
            </Tooltip>

            {/* Grade Your Work */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/homepage/grade')}
                >
                  <ClipboardCheck className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Grade Your Work</p>
              </TooltipContent>
            </Tooltip>

            {/* Study Planner */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/homepage/study-planner')}
                >
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Exam Study Planner</p>
              </TooltipContent>
            </Tooltip>

          </div>

          {/* Mobile Navigation */}
          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    Us
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => navigate('/homepage/us/about')}>
                      About
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/homepage/us/plan')}>
                      Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/homepage/us/contact')}>
                      Contact
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/homepage/us/improvements')}>
                      Improvements
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <BookText className="h-4 w-4 mr-2" />
                    Blog
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => navigate('/homepage/blog/essay-guide')}>
                      How to Write an Essay
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/homepage/blog/ia-experience')}>
                      IA Experience
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/homepage/blog/exam-resources')}>
                      Exam Resources
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/homepage/blog/educational-systems')}>
                      Educational Systems
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuItem onClick={() => navigate('/homepage/ia-guides')}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  IA Guides
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/grade-boundaries')}>
                  <Award className="h-4 w-4 mr-2" />
                  Grade Boundaries
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/speed-reader')}>
                  <Zap className="h-4 w-4 mr-2" />
                  Speed Reader
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/grade')}>
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Grade Your Work
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/homepage/study-planner')}>
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Study Planner
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="default" 
                  size="default"
                  onClick={handleGetStarted}
                  disabled={creatingGhost}
                  className="gap-2 px-4"
                >
                  {creatingGhost ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span>Start Writing</span>
                      <PenLine className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start Writing</p>
              </TooltipContent>
            </Tooltip>
            {!user && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                    <LogIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign In</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
