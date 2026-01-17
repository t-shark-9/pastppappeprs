import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Plus, BookOpen, LogOut, Clock, CheckCircle2, PenLine, FileText, Loader2, Trash2, CloudOff, Brain, ClipboardList, FileQuestion, FileEdit, MoreVertical, Edit, User, Home, Briefcase, FolderOpen, Presentation } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { useGhostMigration } from "@/hooks/use-ghost-migration";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSchoolProgram, SchoolProgramPrompt } from "@/components/prompts/SchoolProgramPrompt";

const SUBJECTS = [
  { value: "biology", label: "Biology", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  { value: "chemistry", label: "Chemistry", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { value: "physics", label: "Physics", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  { value: "math-aa", label: "Math AA", color: "bg-red-500/10 text-red-700 dark:text-red-400" },
  { value: "math-ai", label: "Math AI", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { value: "economics", label: "Economics", color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
  { value: "business", label: "Business Management", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  { value: "history", label: "History", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  { value: "geography", label: "Geography", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { value: "english", label: "English A", color: "bg-pink-500/10 text-pink-700 dark:text-pink-400" },
  { value: "language-b", label: "Language B", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" },
  { value: "visual-arts", label: "Visual Arts", color: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400" },
  { value: "tok", label: "Theory of Knowledge", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
  { value: "ee", label: "Extended Essay", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
  { value: "cas", label: "CAS", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { value: "other", label: "Other", color: "bg-gray-500/10 text-gray-700 dark:text-gray-400" },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: <FileEdit className="h-3 w-3" /> },
  planning: { label: "Planning", color: "bg-accent/20 text-accent-foreground", icon: <PenLine className="h-3 w-3" /> },
  outlining: { label: "Outlining", color: "bg-primary/20 text-primary", icon: <BookOpen className="h-3 w-3" /> },
  writing: { label: "Writing", color: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400", icon: <PenLine className="h-3 w-3" /> },
  reviewing: { label: "Reviewing", color: "bg-blue-500/20 text-blue-700 dark:text-blue-400", icon: <BookOpen className="h-3 w-3" /> },
  complete: { label: "Complete", color: "bg-green-500/20 text-green-700 dark:text-green-400", icon: <CheckCircle2 className="h-3 w-3" /> },
};

interface Assignment {
  id: string;
  title: string;
  subject: string;
  task_type: string;
  deadline: string | null;
  status: string;
  created_at: string;
  isGhost?: boolean;
}

interface Note {
  id: string;
  title: string;
  subject?: string;
  updated_at: string;
}

export default function Dashboard() {
  const { user, signOut, loading: authLoading } = useAuth();
  const { ghostAssignments, deleteGhostAssignment, createGhostAssignment, isGhostMode, ghostUserType } = useGhostSession();
  const { flags } = useFeatureFlags();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [isIBUser, setIsIBUser] = useState(() => {
    // Initialize immediately from local storage to prevent flicker
    const localProgram = getSchoolProgram();
    return localProgram?.schoolProgram === 'ib';
  });
  const [creatingGhost, setCreatingGhost] = useState(false);
  
  const [showProgramPrompt, setShowProgramPrompt] = useState(false);
  const [promptContext, setPromptContext] = useState<"assignment" | "template" | "grading" | "flashcards">("assignment");
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  // Check if user is in office mode (no school features)
  const isOfficeMode = !user && (ghostUserType === 'office');

  // SEO optimization
  useSEO('dashboard');

  // Initialize ghost migration hook
  useGhostMigration();

  const handleNavigation = (path: string, context: "assignment" | "template" | "grading" | "flashcards" = "assignment") => {
    // Check specific user type for signed in users
    let isPrivate = false;
    
    if (user) {
      // For signed in users, rely on metadata. Default to false (student) if missing.
      const type = user.user_metadata?.user_type;
      isPrivate = type === 'private' || type === 'office';
    } else {
      // For ghost users, use ghostUserType
      isPrivate = ghostUserType === 'private' || ghostUserType === 'office';
    }
    
    if (isPrivate) {
      navigate(path);
      return;
    }

    const currentProgram = getSchoolProgram();
    
    if (!currentProgram) {
      setPromptContext(context);
      setPendingNavigation(path);
      setShowProgramPrompt(true);
    } else {
      navigate(path);
    }
  };

  const handleProgramComplete = (type: string, program: string) => {
    if (program === 'ib') setIsIBUser(true);
    
    if (pendingNavigation) {
      navigate(pendingNavigation);
      setPendingNavigation(null);
    }
    setShowProgramPrompt(false);
  };

  useEffect(() => {
    if (authLoading) return;

    loadAssignments();
    loadRecentNotes();
    checkIBStatus();
  }, [user, authLoading, ghostAssignments]);

  const checkIBStatus = async () => {
    // 1. Check local storage (works for ghost & signed in)
    const localProgram = getSchoolProgram();
    if (localProgram && localProgram.schoolProgram === 'ib') {
      setIsIBUser(true);
      return;
    }
    
    // 2. If signed in, check profile
    if (user) {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('school_program')
          .eq('id', user.id)
          .maybeSingle();

        if (data && data.school_program === 'ib') {
          setIsIBUser(true);
        } else {
          setIsIBUser(false);
        }
      } catch (error) {
        console.error("Error checking IB status:", error);
        setIsIBUser(false);
      }
    } else {
      setIsIBUser(false);
    }
  };

  const loadRecentNotes = async () => {
    try {
      // Load from localStorage for guests
      if (!user) {
        const savedNotes = localStorage.getItem('guest_notes');
        if (savedNotes) {
          const notes = JSON.parse(savedNotes) as Note[];
          // Sort by updated_at and take top 3
          const sorted = notes.sort((a, b) => 
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          ).slice(0, 3);
          setRecentNotes(sorted);
        }
        return;
      }

      // Load from Supabase for logged in users
      const { data, error } = await supabase
        .from("notes")
        .select("id, title, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Failed to load recent notes:", error);
        return;
      }

      setRecentNotes(data || []);
    } catch (error) {
      console.error("Failed to load recent notes:", error);
    }
  };

  const loadAssignments = async () => {
    try {
      let combinedAssignments: Assignment[] = [];

      // Add ghost assignments first
      if (ghostAssignments.length > 0) {
        const ghostMapped = ghostAssignments.map(ga => ({
          id: ga.id,
          title: ga.title,
          subject: ga.subject,
          task_type: ga.task_type,
          deadline: null,
          status: ga.status,
          created_at: ga.created_at,
          isGhost: true,
        }));
        combinedAssignments = [...ghostMapped];
      }

      // If logged in, also fetch real assignments
      if (user) {
        // Get all assignments
        const { data: allAssignments, error: assignmentsError } = await supabase
          .from("assignments")
          .select("*")
          .order("created_at", { ascending: false });

        if (assignmentsError) throw assignmentsError;

        // Get all drafts to check which are deleted
        const { data: drafts, error: draftsError } = await supabase
          .from("drafts")
          .select("assignment_id, deleted_at");

        if (draftsError) throw draftsError;

        // Create a map of assignment_id -> deleted_at
        const draftStatusMap = new Map(
          drafts?.map(d => [d.assignment_id, d.deleted_at]) || []
        );

        // Filter out assignments that have deleted drafts
        const activeAssignments = (allAssignments || []).filter(assignment => {
          const deletedAt = draftStatusMap.get(assignment.id);
          // Keep assignment if it has no draft yet, or if draft is not deleted
          return !deletedAt;
        });

        combinedAssignments = [
          ...combinedAssignments,
          ...activeAssignments.map(a => ({ ...a, isGhost: false }))
        ];
      }

      setAssignments(combinedAssignments);
    } catch (error: any) {
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToTrash = async (assignmentId: string, isGhost: boolean, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    
    if (isGhost) {
      deleteGhostAssignment(assignmentId);
      setAssignments(assignments.filter(a => a.id !== assignmentId));
      toast.success("Draft deleted");
      return;
    }

    try {
      // Get the draft associated with this assignment
      const { data: draft, error: fetchError } = await supabase
        .from("drafts")
        .select("id")
        .eq("assignment_id", assignmentId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (draft) {
        // Soft delete the draft by setting deleted_at
        const { error: deleteError } = await supabase
          .from("drafts")
          .update({ deleted_at: new Date().toISOString() })
          .eq("id", draft.id);

        if (deleteError) throw deleteError;
      }

      // Remove from UI
      setAssignments(assignments.filter(a => a.id !== assignmentId));
      toast.success("Draft moved to trash");
    } catch (error: any) {
      console.error("Failed to move to trash:", error);
      toast.error("Failed to move draft to trash");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-muted text-muted-foreground",
      planning: "bg-accent/20 text-accent-foreground",
      outlining: "bg-primary/20 text-primary",
      writing: "bg-warning/20 text-warning-foreground",
      reviewing: "bg-secondary/50 text-secondary-foreground",
      complete: "bg-success/20 text-success",
    };
    return colors[status] || "bg-muted";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className={`container max-w-6xl mx-auto ${isMobile ? 'p-3' : 'p-6'} space-y-6 md:space-y-8`}>
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold tracking-tight`}>
              {isOfficeMode ? 'My Workspace' : 'My Work'}
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {user && !isMobile && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={() => navigate("/work/trash")} variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Trash</p>
                </TooltipContent>
              </Tooltip>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => navigate("/work/account")} variant="outline" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
            {user ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={signOut} variant="outline" size="sm">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sign Out</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button onClick={() => navigate("/auth")} variant="default" size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Ghost Mode Banner */}
        {isGhostMode && !user && (
          <Card className={isOfficeMode ? "border-primary/30 bg-primary/5" : "border-destructive/50 bg-destructive/5"}>
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                {isOfficeMode ? (
                  <Briefcase className="h-5 w-5 text-primary" />
                ) : (
                  <CloudOff className="h-5 w-5 text-destructive" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${isOfficeMode ? 'text-foreground' : 'text-destructive'}`}>
                    {isOfficeMode ? 'Office Mode' : "You're in guest mode"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isOfficeMode 
                      ? 'Your documents are saved locally. Sign in to sync across devices.'
                      : 'Your work is saved locally. Sign in to save it permanently.'}
                  </p>
                </div>
                <Button onClick={() => navigate("/auth")} size="sm">
                  {isOfficeMode ? 'Create Account' : 'Sign In to Save'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Main Documents/Assignments Card - Centered Top */}
          <div className="flex justify-center w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className={`cursor-pointer hover:shadow-lg transition-all border-2 border-primary/30 hover:border-primary bg-card w-full max-w-4xl`}
                  onClick={() => {
                    if (isOfficeMode) { 
                      navigate("/work/notes"); 
                    } else {
                      handleNavigation("/work/assignments", "assignment");
                    }
                  }}
                >
                  <CardHeader className="py-6 text-center">
                    <div className="flex flex-col items-center gap-3">
                      {isOfficeMode ? (
                        <FolderOpen className="h-10 w-10 text-primary" />
                      ) : (
                        <ClipboardList className="h-10 w-10 text-primary" />
                      )}
                      <div>
                        <CardTitle className="text-2xl">
                          {isOfficeMode ? 'My Documents' : 'My Assignments'}
                        </CardTitle>
                        {/* Text removed as requested */}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  {isOfficeMode 
                    ? 'Access all your documents, notes, and files in one place.'
                    : 'View and manage all your assignments in one place. Filter by subject, status, and deadline.'}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {/* Notes Card - show for all */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card"
                  onClick={() => handleNavigation("/work/notes", "template")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <CardTitle>{isOfficeMode ? 'Notes & Drafts' : 'My Notes'}</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Quick notes and ideas with BlockNote editor. Capture thoughts, brainstorm ideas, and organize information with block-based editing.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card"
                  onClick={() => handleNavigation("/work/flashcards", "flashcards")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <CardTitle>Flashcards</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Study with flashcards organized by subject. Create decks from your notes and use spaced repetition for effective learning.</p>
              </TooltipContent>
            </Tooltip>

            {/* Past Papers - IB Only */}
            {(!isOfficeMode && isIBUser) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card"
                    onClick={() => navigate("/work/past-papers")}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-5 w-5 text-primary" />
                        <CardTitle>Past Papers</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Browse and practice with past exam papers. Generate AI variations to test your understanding.</p>
                </TooltipContent>
              </Tooltip>
            )}

            {/* Books - IB Only */}
            {(!isOfficeMode && isIBUser) && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className="cursor-pointer hover:shadow-lg transition-all border-2 border-dashed hover:border-primary/50 bg-card"
                    onClick={() => navigate("/work/books")}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <CardTitle>Books</CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Browse recommended reading materials organized by subjects. Discover books relevant to your studies.</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Recent Assignments Section */}
        {assignments.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Continue Your Work</h2>
              <Button variant="ghost" size="sm" onClick={() => handleNavigation("/work/assignments", "assignment")}>
                View All
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignments.slice(0, 6).map((assignment) => {
                const subjectInfo = SUBJECTS.find(s => s.value === assignment.subject) || { label: assignment.subject, color: "bg-gray-500/10 text-gray-700" };
                const statusInfo = STATUS_CONFIG[assignment.status] || STATUS_CONFIG.draft;
                
                return (
                  <Card
                    key={assignment.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:border-primary/50 group"
                    onClick={() => navigate(`/work/assignment/${assignment.id}`)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {assignment.title || "Untitled Assignment"}
                        </CardTitle>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/work/assignment/${assignment.id}?edit=true`);
                            }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={(e) => handleMoveToTrash(assignment.id, assignment.isGhost || false, e)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Move to Trash
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mt-2">
                        <Badge className={subjectInfo.color} variant="secondary">
                          {subjectInfo.label}
                        </Badge>
                        <Badge className={statusInfo.color} variant="secondary">
                          <span className="mr-1">{statusInfo.icon}</span>
                          {statusInfo.label}
                        </Badge>
                        {assignment.isGhost && (
                          <Badge variant="outline" className="text-muted-foreground">
                            <CloudOff className="h-3 w-3 mr-1" />
                            Local
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(assignment.created_at), { addSuffix: true })}
                        </div>
                        {assignment.deadline && (
                          <div className="flex items-center gap-1">
                            <span>Due:</span>
                            {format(new Date(assignment.deadline), "MMM d, yyyy")}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <SchoolProgramPrompt
        open={showProgramPrompt}
        onOpenChange={setShowProgramPrompt}
        onComplete={handleProgramComplete}
        context={promptContext}
      />
    </div>
  );
}
