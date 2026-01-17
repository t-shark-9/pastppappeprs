import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SchoolNamePromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (schoolName: string) => void;
}

export function SchoolNamePrompt({ 
  open, 
  onOpenChange, 
  onComplete 
}: SchoolNamePromptProps) {
  const { user } = useAuth();
  const [schoolName, setSchoolName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!schoolName.trim()) {
      toast.error("Please enter your school/institution name");
      return;
    }

    setSaving(true);

    // Save to user profile if logged in
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({
          school_name: schoolName.trim(),
        })
        .eq("id", user.id);

      if (error) {
        console.error("Failed to save profile:", error);
      }
    }

    // Also save to localStorage
    localStorage.setItem("tooessay_school_name", schoolName.trim());

    setSaving(false);
    onComplete(schoolName.trim());
    onOpenChange(false);
  };

  const handleSkip = () => {
    onComplete("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/10">
              <School className="h-6 w-6 text-blue-500" />
            </div>
            <DialogTitle>What's your school/institution?</DialogTitle>
          </div>
          <DialogDescription>
            When sharing your work, it helps to include where you study. This is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="school-name">School/Institution Name</Label>
            <Input
              id="school-name"
              type="text"
              placeholder="e.g., International School of Geneva"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSave();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={handleSkip} className="sm:mr-auto">
            Skip
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Get current school name (from localStorage)
export function getSchoolName(): string | null {
  return localStorage.getItem("tooessay_school_name");
}
