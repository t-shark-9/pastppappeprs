import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { useSEO } from "@/hooks/use-seo";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  FileEdit, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Edit, 
  Search,
  Filter,
  Loader2,
  ArrowUpDown,
  BookOpen,
  CheckCircle2,
  PenLine,
  CloudOff
} from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  task_type: string;
  deadline: string | null;
  status: string;
  created_at: string;
  updated_at?: string;
  isGhost?: boolean;
}

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

export default function AssignmentsDashboard() {
  useSEO('dashboard');
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { ghostAssignments, deleteGhostAssignment, createGhostAssignment } = useGhostSession();
  
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingAssignment, setCreatingAssignment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"updated" | "created" | "title" | "deadline">("updated");

  useEffect(() => {
    if (authLoading) return;
    loadAssignments();
  }, [user, authLoading, ghostAssignments]);

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
          updated_at: ga.created_at,
          isGhost: true,
        }));
        combinedAssignments = [...ghostMapped];
      }

      // If logged in, also fetch real assignments
      if (user) {
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

        const draftStatusMap = new Map(
          drafts?.map(d => [d.assignment_id, d.deleted_at]) || []
        );

        // Filter out assignments that have deleted drafts
        const activeAssignments = (allAssignments || []).filter(assignment => {
          const deletedAt = draftStatusMap.get(assignment.id);
          return !deletedAt;
        });

        combinedAssignments = [
          ...combinedAssignments,
          ...activeAssignments.map(a => ({ ...a, isGhost: false }))
        ];
      }

      setAssignments(combinedAssignments);
    } catch (error) {
      console.error("Failed to load assignments:", error);
      toast.error("Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (creatingAssignment) return;
    setCreatingAssignment(true);

    try {
      if (!user) {
        // Guest mode - create ghost assignment
        const ghostAssignment = createGhostAssignment({
          title: "Untitled Assignment",
          subject: "other",
          task_type: "essay",
          status: "draft",
        });
        navigate(`/work/assignment/${ghostAssignment.id}?edit=true`);
      } else {
        // Logged in - navigate to create page
        navigate("/work/assignment/new");
      }
    } catch (error) {
      console.error("Failed to create assignment:", error);
      toast.error("Failed to create assignment");
    } finally {
      setCreatingAssignment(false);
    }
  };

  const handleMoveToTrash = async (assignmentId: string, isGhost: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isGhost) {
      deleteGhostAssignment(assignmentId);
      setAssignments(assignments.filter(a => a.id !== assignmentId));
      toast.success("Assignment deleted");
      return;
    }

    try {
      const { data: draft, error: fetchError } = await supabase
        .from("drafts")
        .select("id")
        .eq("assignment_id", assignmentId)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (draft) {
        const { error: deleteError } = await supabase
          .from("drafts")
          .update({ deleted_at: new Date().toISOString() })
          .eq("id", draft.id);

        if (deleteError) throw deleteError;
      }

      setAssignments(assignments.filter(a => a.id !== assignmentId));
      toast.success("Assignment moved to trash");
    } catch (error) {
      console.error("Failed to move to trash:", error);
      toast.error("Failed to move assignment to trash");
    }
  };

  const getSubjectInfo = (subjectValue: string) => {
    return SUBJECTS.find(s => s.value === subjectValue) || { label: subjectValue, color: "bg-gray-500/10 text-gray-700" };
  };

  const getStatusInfo = (status: string) => {
    return STATUS_CONFIG[status] || STATUS_CONFIG.draft;
  };

  // Filter and sort assignments
  const filteredAssignments = assignments
    .filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = filterSubject === "all" || assignment.subject === filterSubject;
      const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
      return matchesSearch && matchesSubject && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "created":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "deadline":
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case "updated":
        default:
          return new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime();
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <BackButton fallbackPath="/work" />
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileEdit className="h-6 w-6 text-primary" />
                My Assignments
              </h1>
              <p className="text-muted-foreground text-sm">
                {assignments.length} assignment{assignments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button onClick={handleCreateAssignment} disabled={creatingAssignment}>
            {creatingAssignment ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            New Assignment
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-[160px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                <SelectItem key={value} value={value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-[140px]">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Assignments Grid */}
        {filteredAssignments.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileEdit className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchQuery || filterSubject !== "all" || filterStatus !== "all" 
                  ? "No matching assignments" 
                  : "No assignments yet"}
              </h3>
              <p className="text-muted-foreground text-center mb-4 max-w-md">
                {searchQuery || filterSubject !== "all" || filterStatus !== "all"
                  ? "Try adjusting your filters or search query"
                  : "Create your first assignment to get started with IB essay writing"}
              </p>
              {!searchQuery && filterSubject === "all" && filterStatus === "all" && (
                <Button onClick={handleCreateAssignment}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assignment
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssignments.map((assignment) => {
              const subjectInfo = getSubjectInfo(assignment.subject);
              const statusInfo = getStatusInfo(assignment.status);
              
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
                        {formatDistanceToNow(new Date(assignment.updated_at || assignment.created_at), { addSuffix: true })}
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
        )}
      </div>
    </div>
  );
}
