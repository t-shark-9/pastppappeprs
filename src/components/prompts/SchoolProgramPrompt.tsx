import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SchoolProgramPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (educationType: string, schoolProgram: string) => void;
  context?: "assignment" | "template" | "grading" | "flashcards";
}

const contextMessages = {
  assignment: "To provide the right structure and templates for your assignment, we need to know your education program.",
  template: "Different programs have different requirements. Let us know your program to show relevant templates.",
  grading: "Grading criteria vary by program. Select yours to get accurate feedback.",
  flashcards: "We'll customize flashcards based on your curriculum.",
};

// All education programs in a single list - no two-step process
const EDUCATION_PROGRAMS = [
  { value: "ib", label: "IB (International Baccalaureate)", region: "International" },
  { value: "cambridge-international", label: "Cambridge International", region: "International" },
  { value: "a-levels", label: "A Levels", region: "UK" },
  { value: "igcse", label: "IGCSE / GCSE", region: "UK" },
  { value: "ap", label: "Advanced Placement (AP)", region: "USA" },
  { value: "us-high-school", label: "US High School Diploma", region: "USA" },
  { value: "canadian-high-school", label: "Canadian High School", region: "Canada" },
  { value: "abitur", label: "German Abitur", region: "Germany" },
  { value: "french-bac", label: "French Baccalauréat", region: "France" },
  { value: "swiss-matura", label: "Swiss Matura", region: "Switzerland" },
  { value: "dutch-vwo", label: "Dutch VWO", region: "Netherlands" },
  { value: "swedish-gymnasium", label: "Swedish Gymnasium", region: "Sweden" },
  { value: "spanish-bachillerato", label: "Spanish Bachillerato", region: "Spain" },
  { value: "italian-maturita", label: "Italian Maturità", region: "Italy" },
  { value: "polish-matura", label: "Polish Matura", region: "Poland" },
  { value: "russian-ege", label: "EGE (Russia)", region: "Russia" },
  { value: "australian-year-12", label: "Australian Year 12 / ATAR", region: "Australia" },
  { value: "nz-ncea", label: "NCEA (New Zealand)", region: "New Zealand" },
  { value: "indian-cbse", label: "CBSE (India)", region: "India" },
  { value: "indian-icse", label: "ICSE (India)", region: "India" },
  { value: "chinese-gaokao", label: "Gaokao (China)", region: "China" },
  { value: "japanese-high-school", label: "Japanese High School", region: "Japan" },
  { value: "korean-suneung", label: "Korean Suneung", region: "South Korea" },
  { value: "singapore-a-levels", label: "Singapore A Levels", region: "Singapore" },
  { value: "hong-kong-dse", label: "HKDSE (Hong Kong)", region: "Hong Kong" },
  { value: "brazilian-enem", label: "ENEM (Brazil)", region: "Brazil" },
  { value: "bachelor-degree", label: "University - Bachelor's", region: "University" },
  { value: "master-degree", label: "University - Master's", region: "University" },
  { value: "phd-program", label: "University - PhD", region: "University" },
  { value: "other", label: "Other", region: "Other" },
];

// Group programs by region
const groupedPrograms = EDUCATION_PROGRAMS.reduce((acc, program) => {
  if (!acc[program.region]) acc[program.region] = [];
  acc[program.region].push(program);
  return acc;
}, {} as Record<string, typeof EDUCATION_PROGRAMS>);

export function SchoolProgramPrompt({ 
  open, 
  onOpenChange, 
  onComplete,
  context = "assignment" 
}: SchoolProgramPromptProps) {
  const { user } = useAuth();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [saving, setSaving] = useState(false);

  // Derive education type from program
  const getEducationType = (program: string): string => {
    if (["bachelor-degree", "master-degree", "phd-program"].includes(program)) {
      return "university";
    }
    return "school";
  };

  const handleSave = async () => {
    if (!selectedProgram) {
      toast.error("Please select your education program");
      return;
    }

    setSaving(true);
    const educationType = getEducationType(selectedProgram);

    // Save to user profile if logged in
    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({
          education_type: educationType,
          school_program: selectedProgram,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Failed to save profile:", error);
      }
    }

    // Save to localStorage for all users (including ghost)
    localStorage.setItem("tooessay_education_type", educationType);
    localStorage.setItem("tooessay_school_program", selectedProgram);

    setSaving(false);
    onComplete(educationType, selectedProgram);
    onOpenChange(false);
  };

  const handleSkip = () => {
    onComplete("school", "other");
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
            <DialogTitle>What's your education program?</DialogTitle>
          </div>
          <DialogDescription>
            {contextMessages[context]}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={handleSkip} className="sm:mr-auto">
            Skip for now
          </Button>
          <Button onClick={handleSave} disabled={!selectedProgram || saving}>
            {saving ? "Saving..." : "Continue"}
          </Button>
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
