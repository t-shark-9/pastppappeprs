import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { groupedPrograms } from "@/data/educationPrograms";

interface SchoolProgramPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (educationType: string, schoolProgram: string) => void;
  context?: "assignment" | "template" | "grading" | "flashcards";
}

const contextMessages = {
  assignment: "To provide the right structure for your assignment, please tell us about your role.",
  template: "Different roles have different needs. Let us know who you are to show relevant templates.",
  grading: "Grading criteria vary by program. Select yours to get accurate feedback.",
  flashcards: "We'll customize flashcards based on your curriculum.",
};

export function SchoolProgramPrompt({ 
  open, 
  onOpenChange, 
  onComplete,
  context = "assignment" 
}: SchoolProgramPromptProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<'role' | 'program'>('role');
  const [role, setRole] = useState<'student' | 'teacher' | 'private' | null>(null);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [saving, setSaving] = useState(false);

  // Reset step when opened
  useEffect(() => {
    if (open) setStep('role');
  }, [open]);

  // Derive education type from program
  const getEducationType = (program: string): string => {
    if (["bachelor-degree", "master-degree", "phd-program"].includes(program)) {
      return "university";
    }
    return "school";
  };

  const handleRoleSelect = (selectedRole: 'student' | 'teacher' | 'private') => {
    setRole(selectedRole);
    
    if (selectedRole === 'private') {
      // Private users skip program selection
      saveData(selectedRole, "");
    } else {
      // Students/Teachers go to program selection
      setStep('program');
    }
  };

  const saveData = async (userRole: string, program: string) => {
    setSaving(true);
    const educationType = program ? getEducationType(program) : "";

    // Save to user profile if logged in
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({
          education_type: educationType,
          school_program: program,
          // user_type might not be in profiles table schema for update here, relying on metadata usually
        })
        .eq("id", user.id);

      // Also update metadata
      await supabase.auth.updateUser({
        data: {
          user_type: userRole,
          school_program: program,
        }
      });

      if (error) {
        console.error("Failed to save profile:", error);
      }
    }

    // Save to localStorage for all users (including ghost)
    localStorage.setItem("tooessay_ghost_user_type", userRole);
    localStorage.setItem("tooessay_education_type", educationType);
    if (program) {
      localStorage.setItem("tooessay_school_program", program);
    } else {
      localStorage.removeItem("tooessay_school_program");
    }

    setSaving(false);
    onComplete(educationType, program);
    onOpenChange(false);
  };

  const handleSaveProgram = () => {
    if (!selectedProgram) {
      toast.error("Please select your education program");
      return;
    }
    if (role) {
      saveData(role, selectedProgram);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle>
              {step === 'role' ? "How will you use TooEssay?" : "Select your Education Program"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {step === 'role' 
              ? contextMessages[context] 
              : "We'll customize your experience based on your curriculum."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 'role' ? (
            <div className="grid gap-3">
              <Card 
                className="cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
                onClick={() => handleRoleSelect('student')}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Student</h3>
                    <p className="text-xs text-muted-foreground">For school or university</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
                onClick={() => handleRoleSelect('teacher')}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Users className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Teacher</h3>
                    <p className="text-xs text-muted-foreground">For educators</p>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
                onClick={() => handleRoleSelect('private')}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Briefcase className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Private User</h3>
                    <p className="text-xs text-muted-foreground">Personal use (No grading)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education-program">Education Program</Label>
                <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                  <SelectTrigger id="education-program">
                    <SelectValue placeholder="Select your education program" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {Object.entries(groupedPrograms).map(([region, programs]) => (
                      <SelectGroup key={region}>
                        <SelectLabel>{region}</SelectLabel>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {step === 'program' && (
            <Button variant="ghost" onClick={() => setStep('role')} className="sm:mr-auto">
              Back
            </Button>
          )}
          {step === 'role' && (
            <Button variant="ghost" onClick={handleSkip} className="sm:mr-auto">
              Skip for now
            </Button>
          )}
          {step === 'program' && (
             <Button onClick={handleSaveProgram} disabled={!selectedProgram || saving}>
               {saving ? "Saving..." : "Continue"}
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


// Hook to check if user needs program prompt
export function useNeedsSchoolProgram() {
  const { user } = useAuth();
  const [hasProgram, setHasProgram] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkProgram = async () => {
      // Check localStorage first
      const localProgram = localStorage.getItem("tooessay_school_program");
      if (localProgram) {
        setHasProgram(true);
        setIsLoading(false);
        return;
      }
      
      // For logged-in users, check profile
      if (user) {
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("school_program")
            .eq("id", user.id)
            .maybeSingle();
          
          setHasProgram(!!profile?.school_program);
        } catch (error) {
          console.error("Error checking profile:", error);
          setHasProgram(false);
        }
      } else {
        setHasProgram(false);
      }
      setIsLoading(false);
    };
    
    checkProgram();
  }, [user]);
  
  return { needsPrompt: !hasProgram, isLoading };
}

// Get current school program (from profile or localStorage)
export function getSchoolProgram(): { educationType: string; schoolProgram: string } | null {
  const localProgram = localStorage.getItem("tooessay_school_program");
  
  if (localProgram) {
    const educationType = ["bachelor-degree", "master-degree", "phd-program"].includes(localProgram) 
      ? "university" 
      : "school";
    return { educationType, schoolProgram: localProgram };
  }
  
  return null;
}
