import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { GraduationCap, School, BookOpen, User } from "lucide-react";

export type ProfileField = "school_name" | "school_program" | "education_type" | "full_name";

interface ProfileInfoPromptProps {
  isOpen: boolean;
  onClose: () => void;
  fieldsToRequest: ProfileField[];
  context?: "assignment" | "note" | "share" | "settings";
  onComplete?: () => void;
}

const EDUCATION_TYPES = [
  { value: "ibdp", label: "IB Diploma Programme (IBDP)" },
  { value: "ibcp", label: "IB Career-related Programme (IBCP)" },
  { value: "igcse", label: "IGCSE / Cambridge" },
  { value: "ap", label: "Advanced Placement (AP)" },
  { value: "abitur", label: "German Abitur" },
  { value: "a_levels", label: "A-Levels" },
  { value: "other", label: "Other" },
];

const SCHOOL_PROGRAMS = [
  { value: "ibdp", label: "IB Diploma Programme" },
  { value: "ibcp", label: "IB Career-related Programme" },
  { value: "myp", label: "IB Middle Years Programme" },
  { value: "pyp", label: "IB Primary Years Programme" },
  { value: "igcse", label: "IGCSE" },
  { value: "ap", label: "Advanced Placement" },
  { value: "abitur_bayern", label: "Abitur - Bayern" },
  { value: "abitur_nrw", label: "Abitur - NRW" },
  { value: "abitur_bw", label: "Abitur - Baden-Württemberg" },
  { value: "a_levels", label: "A-Levels (UK)" },
  { value: "other", label: "Other" },
];

const getContextMessage = (context?: string, fields?: ProfileField[]) => {
  switch (context) {
    case "assignment":
      return "To provide better guidance for your assignment, we need a bit more information about your educational background.";
    case "note":
      return "Help us personalize your note-taking experience with a few details.";
    case "share":
      return "To share your work, please provide your school name for proper attribution.";
    case "settings":
      return "Complete your profile information to get the most out of TooEssay.";
    default:
      return "Please complete your profile information.";
  }
};

const getFieldIcon = (field: ProfileField) => {
  switch (field) {
    case "school_name":
      return <School className="h-4 w-4" />;
    case "school_program":
      return <BookOpen className="h-4 w-4" />;
    case "education_type":
      return <GraduationCap className="h-4 w-4" />;
    case "full_name":
      return <User className="h-4 w-4" />;
  }
};

const getFieldLabel = (field: ProfileField) => {
  switch (field) {
    case "school_name":
      return "School Name";
    case "school_program":
      return "School Program";
    case "education_type":
      return "Education Type";
    case "full_name":
      return "Full Name";
  }
};

export function ProfileInfoPrompt({
  isOpen,
  onClose,
  fieldsToRequest,
  context,
  onComplete,
}: ProfileInfoPromptProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Record<ProfileField, string>>({
    school_name: "",
    school_program: "",
    education_type: "",
    full_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [existingData, setExistingData] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const loadExistingData = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, school_name, school_program, education_type")
        .eq("id", user.id)
        .maybeSingle();

      if (profile) {
        setExistingData(profile);
        setFormData({
          school_name: profile.school_name || "",
          school_program: profile.school_program || "",
          education_type: profile.education_type || "",
          full_name: profile.full_name || "",
        });
      }
    };

    if (isOpen) {
      loadExistingData();
    }
  }, [user, isOpen]);

  const handleSubmit = async () => {
    if (!user) return;

    // Check that all required fields are filled
    for (const field of fieldsToRequest) {
      if (!formData[field]) {
        toast.error(`Please fill in ${getFieldLabel(field)}`);
        return;
      }
    }

    setIsLoading(true);

    try {
      // Update profile in database
      const updateData: Record<string, string> = {};
      for (const field of fieldsToRequest) {
        if (formData[field]) {
          updateData[field] = formData[field];
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", user.id);

      if (error) throw error;

      // Also update user metadata for consistency
      await supabase.auth.updateUser({
        data: updateData,
      });

      toast.success("Profile updated successfully!");
      onComplete?.();
      onClose();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: ProfileField) => {
    // Skip if already has data
    if (existingData[field]) return null;

    switch (field) {
      case "school_name":
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="school_name" className="flex items-center gap-2">
              {getFieldIcon(field)}
              School Name
            </Label>
            <Input
              id="school_name"
              placeholder="e.g., International School of Geneva"
              value={formData.school_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, school_name: e.target.value }))
              }
            />
          </div>
        );

      case "school_program":
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="school_program" className="flex items-center gap-2">
              {getFieldIcon(field)}
              School Program
            </Label>
            <Select
              value={formData.school_program}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, school_program: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your program" />
              </SelectTrigger>
              <SelectContent>
                {SCHOOL_PROGRAMS.map((program) => (
                  <SelectItem key={program.value} value={program.value}>
                    {program.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "education_type":
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="education_type" className="flex items-center gap-2">
              {getFieldIcon(field)}
              Education Type
            </Label>
            <Select
              value={formData.education_type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, education_type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your education type" />
              </SelectTrigger>
              <SelectContent>
                {EDUCATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "full_name":
        return (
          <div key={field} className="space-y-2">
            <Label htmlFor="full_name" className="flex items-center gap-2">
              {getFieldIcon(field)}
              Full Name
            </Label>
            <Input
              id="full_name"
              placeholder="Your full name"
              value={formData.full_name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, full_name: e.target.value }))
              }
            />
          </div>
        );
    }
  };

  // Filter to only show fields that are missing
  const fieldsToShow = fieldsToRequest.filter((field) => !existingData[field]);

  // If all fields already exist, don't show the dialog
  useEffect(() => {
    if (isOpen && fieldsToShow.length === 0 && Object.keys(existingData).length > 0) {
      onComplete?.();
      onClose();
    }
  }, [isOpen, fieldsToShow.length, existingData, onComplete, onClose]);

  if (fieldsToShow.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Complete Your Profile
          </DialogTitle>
          <DialogDescription>
            {getContextMessage(context, fieldsToRequest)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {fieldsToShow.map(renderField)}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Skip for now
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Hook to check and request missing profile fields
export function useProfilePrompt() {
  const { user } = useAuth();
  const [missingFields, setMissingFields] = useState<ProfileField[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const checkMissingFields = async (requiredFields: ProfileField[]) => {
    if (!user) return [];

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, school_name, school_program, education_type")
        .eq("id", user.id)
        .maybeSingle();

      if (!profile) return requiredFields;

      const missing: ProfileField[] = [];
      for (const field of requiredFields) {
        if (!profile[field]) {
          missing.push(field);
        }
      }
      return missing;
    } catch (error) {
      console.error("Error checking profile:", error);
      return [];
    }
  };

  const loadProfile = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const missing = await checkMissingFields([
      "full_name",
      "school_name",
      "school_program",
      "education_type",
    ]);
    setMissingFields(missing);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  return {
    missingFields,
    isLoading,
    checkMissingFields,
    refreshProfile: loadProfile,
  };
}
