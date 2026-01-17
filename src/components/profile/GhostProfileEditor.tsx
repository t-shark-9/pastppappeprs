import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, User, GraduationCap, BookOpen, X, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Comprehensive IB subject list
const IB_SUBJECTS = [
  { value: "lang_a_literature", label: "Language A: Literature", group: "Group 1" },
  { value: "lang_a_lang_lit", label: "Language A: Language and Literature", group: "Group 1" },
  { value: "english_b", label: "English B", group: "Group 2" },
  { value: "french_b", label: "French B", group: "Group 2" },
  { value: "spanish_b", label: "Spanish B", group: "Group 2" },
  { value: "german_b", label: "German B", group: "Group 2" },
  { value: "mandarin_b", label: "Mandarin B", group: "Group 2" },
  { value: "french_ab", label: "French Ab Initio", group: "Group 2" },
  { value: "spanish_ab", label: "Spanish Ab Initio", group: "Group 2" },
  { value: "business_management", label: "Business Management", group: "Group 3" },
  { value: "economics", label: "Economics", group: "Group 3" },
  { value: "geography", label: "Geography", group: "Group 3" },
  { value: "history", label: "History", group: "Group 3" },
  { value: "psychology", label: "Psychology", group: "Group 3" },
  { value: "philosophy", label: "Philosophy", group: "Group 3" },
  { value: "global_politics", label: "Global Politics", group: "Group 3" },
  { value: "biology", label: "Biology", group: "Group 4" },
  { value: "chemistry", label: "Chemistry", group: "Group 4" },
  { value: "physics", label: "Physics", group: "Group 4" },
  { value: "computer_science", label: "Computer Science", group: "Group 4" },
  { value: "ess", label: "ESS", group: "Group 4" },
  { value: "sehs", label: "Sports, Exercise and Health Science", group: "Group 4" },
  { value: "math_aa", label: "Math AA", group: "Group 5" },
  { value: "math_ai", label: "Math AI", group: "Group 5" },
  { value: "visual_arts", label: "Visual Arts", group: "Group 6" },
  { value: "music", label: "Music", group: "Group 6" },
  { value: "theatre", label: "Theatre", group: "Group 6" },
  { value: "film", label: "Film", group: "Group 6" },
  { value: "tok", label: "Theory of Knowledge", group: "Core" },
  { value: "ee", label: "Extended Essay", group: "Core" },
];

import { EDUCATION_PROGRAMS, groupedPrograms } from "@/data/educationPrograms";

interface GhostProfile {
  name: string;
  educationType: string;
  subjects: string[];
}

interface GhostProfileEditorProps {
  onSave?: () => void;
  compact?: boolean;
}

export interface GhostProfileEditorRef {
  save: () => void;
}

const GHOST_PROFILE_KEY = "tooessay-ghost-profile";

export const GhostProfileEditor = forwardRef<GhostProfileEditorRef, GhostProfileEditorProps>(({ onSave, compact = false }, ref) => {
  const { isGhostMode, ghostUserType } = useGhostSession();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<GhostProfile>({
    name: "",
    educationType: "",
    subjects: [],
  });

  // Check if user is a private/office ghost user (no education features)
  const isPrivateUser = ghostUserType === 'office';
  
  // Check if user selected IB
  const isIBStudent = profile.educationType === "ib";

  useImperativeHandle(ref, () => ({
    save: () => {
      handleSave(false);
    }
  }));

  useEffect(() => {
    // Load ghost profile from localStorage
    const stored = localStorage.getItem(GHOST_PROFILE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Migrate old format if needed
        setProfile({
          name: parsed.name || "",
          educationType: parsed.educationType || parsed.schoolProgram || "",
          subjects: parsed.subjects || [],
        });
      } catch (e) {
        console.error("Error parsing ghost profile:", e);
      }
    }
  }, []);

  // Autosave effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSave(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [profile]);

  const handleSave = (silent = false) => {
    setSaving(true);
    try {
      localStorage.setItem(GHOST_PROFILE_KEY, JSON.stringify(profile));
      // Also save education type for other components
      if (profile.educationType) {
        localStorage.setItem("tooessay_school_program", profile.educationType);
        localStorage.setItem("tooessay_education_type", profile.educationType === "bachelor-degree" || profile.educationType === "master-degree" || profile.educationType === "phd-program" ? "university" : "school");
      }
      // if (!silent) toast.success("Profile saved locally"); // Silent for autosave
      // onSave?.();
    } catch (error) {
      if (!silent) toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const addSubject = (subject: string) => {
    if (subject && !profile.subjects.includes(subject)) {
      setProfile({ ...profile, subjects: [...profile.subjects, subject] });
    }
  };

  const removeSubject = (subject: string) => {
    setProfile({
      ...profile,
      subjects: profile.subjects.filter((s) => s !== subject),
    });
  };



  // Group IB subjects
  const groupedSubjects = IB_SUBJECTS.reduce((acc, subject) => {
    if (!acc[subject.group]) acc[subject.group] = [];
    acc[subject.group].push(subject);
    return acc;
  }, {} as Record<string, typeof IB_SUBJECTS>);

  return (
    <div className={`space-y-${compact ? "4" : "6"}`}>
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          You're in guest mode. Your profile is saved locally and will be migrated when you sign up.
        </AlertDescription>
      </Alert>

      {/* Basic Info */}
      <Card>
        <CardHeader className={compact ? "pb-3" : undefined}>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className={compact ? "text-lg" : undefined}>Your Information</CardTitle>
          </div>
          <CardDescription>This helps personalize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name (optional)</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
        </CardContent>
      </Card>

      {/* Education Type - Hidden for private users */}
      {!isPrivateUser && (
        <Card>
          <CardHeader className={compact ? "pb-3" : undefined}>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className={compact ? "text-lg" : undefined}>Education Program</CardTitle>
            </div>
            <CardDescription>Select your educational program for tailored features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="educationType">Program</Label>
              <Select
                value={profile.educationType}
                onValueChange={(value) => setProfile({ ...profile, educationType: value, subjects: value !== "ib" ? [] : profile.subjects })}
              >
                <SelectTrigger>
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
          </CardContent>
        </Card>
      )}

      {/* IB Subjects - Only shown for IB students, never for private users */}
      {!isPrivateUser && isIBStudent && (
        <Card>
          <CardHeader className={compact ? "pb-3" : undefined}>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className={compact ? "text-lg" : undefined}>My IB Subjects</CardTitle>
            </div>
            <CardDescription>Select the subjects you're studying</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.subjects.map((subjectValue) => {
                  const subject = IB_SUBJECTS.find((s) => s.value === subjectValue);
                  return (
                    <Badge
                      key={subjectValue}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 flex items-center gap-1"
                    >
                      {subject?.label || subjectValue}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 hover:bg-destructive/20"
                        onClick={() => removeSubject(subjectValue)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            )}

            <Select onValueChange={addSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Add a subject..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {Object.entries(groupedSubjects).map(([group, subjects]) => (
                  <SelectGroup key={group}>
                    <SelectLabel>{group}</SelectLabel>
                    {subjects
                      .filter((s) => !profile.subjects.includes(s.value))
                      .map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Exit Button - Changes saved automatically */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={() => {
            handleSave();
            onSave?.();
          }} 
          className="w-full sm:w-auto"
        >
          Exit
        </Button>
      </div>
    </div>
  );
});
