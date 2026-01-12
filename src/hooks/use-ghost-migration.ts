import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useGhostMigration() {
  const { user } = useAuth();
  const { ghostAssignments, clearGhostData } = useGhostSession();
  const hasMigrated = useRef(false);

  useEffect(() => {
    const shouldMigrate = localStorage.getItem("tooessay_migrate_ghost_after_auth");
    
    if (user && shouldMigrate === "true" && ghostAssignments.length > 0 && !hasMigrated.current) {
      hasMigrated.current = true;
      migrateGhostData();
    }
  }, [user, ghostAssignments]);

  const migrateGhostData = async () => {
    if (!user) return;

    localStorage.removeItem("tooessay_migrate_ghost_after_auth");

    try {
      let migratedCount = 0;

      for (const ghostAssignment of ghostAssignments) {
        // Create real assignment
        const { data: newAssignment, error: assignmentError } = await supabase
          .from("assignments")
          .insert([{
            user_id: user.id,
            title: ghostAssignment.title,
            subject: ghostAssignment.subject as any,
            task_type: ghostAssignment.task_type as any,
            status: ghostAssignment.status as any,
          }])
          .select()
          .single();

        if (assignmentError) {
          console.error("Failed to migrate assignment:", assignmentError);
          continue;
        }

        // Migrate plan if exists
        if (ghostAssignment.plan) {
          await supabase.from("plans").insert([{
            assignment_id: newAssignment.id,
            ...ghostAssignment.plan,
          }]);
        }

        // Migrate outline if exists
        if (ghostAssignment.outline) {
          await supabase.from("outlines").insert([{
            assignment_id: newAssignment.id,
            sections: ghostAssignment.outline.sections || [],
          }]);
        }

        // Migrate draft if exists
        if (ghostAssignment.draft) {
          await supabase.from("drafts").insert([{
            assignment_id: newAssignment.id,
            content: ghostAssignment.draft.content,
            word_count: ghostAssignment.draft.word_count || 0,
          }]);
        }

        migratedCount++;
      }

      if (migratedCount > 0) {
        toast.success(`Saved ${migratedCount} draft${migratedCount > 1 ? 's' : ''} to your account!`);
        clearGhostData();
      }
    } catch (error) {
      console.error("Failed to migrate ghost data:", error);
      toast.error("Failed to save some drafts to your account");
    }
  };

  return { migrateGhostData };
}
