import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/ui/back-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2, RotateCcw, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface DeletedDraft {
  id: string;
  assignment_id: string;
  deleted_at: string;
  assignment: {
    id: string;
    title: string;
    subject: string;
    task_type: string;
    deadline: string | null;
    status: string;
    created_at: string;
  };
}

export default function Trash() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [deletedDrafts, setDeletedDrafts] = useState<DeletedDraft[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate("/auth");
      return;
    }

    loadDeletedDrafts();
  }, [user, authLoading, navigate]);

  const loadDeletedDrafts = async () => {
    try {
      const { data, error } = await supabase
        .from("drafts")
        .select(`
          id,
          assignment_id,
          deleted_at,
          assignment:assignments!inner(
            id,
            title,
            subject,
            task_type,
            deadline,
            status,
            created_at
          )
        `)
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false });

      if (error) throw error;
      setDeletedDrafts(data as any || []);
    } catch (error: any) {
      console.error("Failed to load deleted drafts:", error);
      toast.error("Failed to load trash");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (draftId: string) => {
    try {
      const { error } = await supabase
        .from("drafts")
        .update({ deleted_at: null })
        .eq("id", draftId);

      if (error) throw error;

      setDeletedDrafts(deletedDrafts.filter(d => d.id !== draftId));
      toast.success("Draft restored successfully");
    } catch (error: any) {
      console.error("Failed to restore:", error);
      toast.error("Failed to restore draft");
    }
  };

  const handlePermanentDelete = async (draftId: string) => {
    if (!confirm("Are you sure you want to permanently delete this draft? This cannot be undone.")) {
      return;
    }

    try {
      // Get the assignment_id for this draft
      const draft = deletedDrafts.find(d => d.id === draftId);
      if (!draft) return;

      const assignmentId = draft.assignment_id;

      // Delete all related records in order to avoid foreign key issues
      await supabase.from("coaching_sessions").delete().eq("assignment_id", assignmentId);
      await supabase.from("reviews").delete().eq("assignment_id", assignmentId);
      await supabase.from("outlines").delete().eq("assignment_id", assignmentId);
      await supabase.from("plans").delete().eq("assignment_id", assignmentId);
      await supabase.from("drafts").delete().eq("assignment_id", assignmentId);
      
      // Finally delete the assignment itself
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("id", assignmentId);

      if (error) throw error;

      setDeletedDrafts(deletedDrafts.filter(d => d.id !== draftId));
      toast.success("Draft permanently deleted");
    } catch (error: any) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete draft");
    }
  };

  const handleEmptyTrash = async () => {
    if (!confirm("Are you sure you want to permanently delete ALL drafts in trash? This cannot be undone.")) {
      return;
    }

    try {
      // Get all assignment IDs
      const assignmentIds = deletedDrafts.map(d => d.assignment_id);
      
      // Delete all related records in order to avoid foreign key issues
      await supabase.from("coaching_sessions").delete().in("assignment_id", assignmentIds);
      await supabase.from("reviews").delete().in("assignment_id", assignmentIds);
      await supabase.from("outlines").delete().in("assignment_id", assignmentIds);
      await supabase.from("plans").delete().in("assignment_id", assignmentIds);
      await supabase.from("drafts").delete().in("assignment_id", assignmentIds);
      
      // Finally delete all the assignments
      const { error } = await supabase
        .from("assignments")
        .delete()
        .in("id", assignmentIds);

      if (error) throw error;

      setDeletedDrafts([]);
      toast.success("Trash emptied successfully");
    } catch (error: any) {
      console.error("Failed to empty trash:", error);
      toast.error("Failed to empty trash");
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
      <div className="container max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <BackButton
              fallbackPath="/dashboard"
              size="icon"
              tooltip="Back to Dashboard"
              className="mb-4"
            />
            <div className="flex items-center gap-3">
              <Trash2 className="h-8 w-8 text-muted-foreground" />
              <h1 className="text-4xl font-bold tracking-tight">Trash</h1>
            </div>
          </div>
          {deletedDrafts.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleEmptyTrash}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Empty Trash</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Deleted Drafts List */}
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2 mt-2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : deletedDrafts.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <Trash2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Trash is empty</h3>
              <p className="text-sm text-muted-foreground">
                Deleted drafts will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {deletedDrafts.map((draft) => (
              <Card
                key={draft.id}
                className="shadow-soft transition-all group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="truncate">
                        {draft.assignment.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <span className="capitalize">{draft.assignment.subject.replace("_", " ")}</span>
                        <span>•</span>
                        <span className="capitalize">{draft.assignment.task_type}</span>
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        Deleted {formatDate(draft.deleted_at)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(draft.assignment.status)}>
                      {draft.assignment.status === "complete" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : null}
                      {draft.assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {formatDate(draft.assignment.deadline)}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestore(draft.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Restore
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handlePermanentDelete(draft.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
