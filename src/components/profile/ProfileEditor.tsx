import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, User, School, GraduationCap, BookOpen, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// All IB subjects including the new ones from the migration
const IB_SUBJECTS = [
  // Group 1: Studies in Language and Literature
  { value: "english_a", label: "English A: Literature", group: "Group 1" },
  { value: "lang_a_literature", label: "Language A: Literature", group: "Group 1" },
  { value: "lang_a_lang_lit", label: "Language A: Language & Literature", group: "Group 1" },
  { value: "literature_performance", label: "Literature & Performance", group: "Group 1" },
  
  // Group 2: Language Acquisition
  { value: "french_b", label: "French B", group: "Group 2" },
  { value: "spanish_b", label: "Spanish B", group: "Group 2" },
  { value: "swedish_b", label: "Swedish B", group: "Group 2" },
  { value: "english_b", label: "English B", group: "Group 2" },
  { value: "german_b", label: "German B", group: "Group 2" },
  { value: "italian_b", label: "Italian B", group: "Group 2" },
  { value: "japanese_b", label: "Japanese B", group: "Group 2" },
  { value: "mandarin_b", label: "Mandarin B", group: "Group 2" },
  { value: "other_b", label: "Other Language B", group: "Group 2" },
  { value: "latin", label: "Latin", group: "Group 2 - Classical" },
  { value: "classical_greek", label: "Classical Greek", group: "Group 2 - Classical" },
  { value: "french_ab", label: "French Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "spanish_ab", label: "Spanish Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "arabic_ab", label: "Arabic Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "chinese_ab", label: "Chinese Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "german_ab", label: "German Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "hindi_ab", label: "Hindi Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "japanese_ab", label: "Japanese Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "korean_ab", label: "Korean Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "portuguese_ab", label: "Portuguese Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "russian_ab", label: "Russian Ab Initio", group: "Group 2 - Ab Initio" },
  { value: "other_ab", label: "Other Ab Initio", group: "Group 2 - Ab Initio" },
  
  // Group 3: Individuals and Societies
  { value: "business_management", label: "Business Management", group: "Group 3" },
  { value: "economics", label: "Economics", group: "Group 3" },
  { value: "geography", label: "Geography", group: "Group 3" },
  { value: "history", label: "History", group: "Group 3" },
  { value: "digital_society", label: "Digital Society", group: "Group 3" },
  { value: "global_politics", label: "Global Politics", group: "Group 3" },
  { value: "philosophy", label: "Philosophy", group: "Group 3" },
  { value: "psychology", label: "Psychology", group: "Group 3" },
  { value: "social_cultural_anthropology", label: "Social & Cultural Anthropology", group: "Group 3" },
  { value: "world_religions", label: "World Religions", group: "Group 3" },
  
  // Group 4: Sciences
  { value: "biology", label: "Biology", group: "Group 4" },
  { value: "chemistry", label: "Chemistry", group: "Group 4" },
  { value: "physics", label: "Physics", group: "Group 4" },
  { value: "sehs", label: "Sports, Exercise & Health Science", group: "Group 4" },
  { value: "computer_science", label: "Computer Science", group: "Group 4" },
  { value: "design_technology", label: "Design Technology", group: "Group 4" },
  { value: "ess", label: "Environmental Systems & Societies", group: "Group 4" },
  
  // Group 5: Mathematics
  { value: "math_aa", label: "Mathematics: Analysis & Approaches", group: "Group 5" },
  { value: "math_ai", label: "Mathematics: Applications & Interpretation", group: "Group 5" },
  
  // Group 6: The Arts
  { value: "visual_arts", label: "Visual Arts", group: "Group 6" },
  { value: "drama", label: "Drama", group: "Group 6" },
  { value: "music", label: "Music", group: "Group 6" },
  { value: "theatre", label: "Theatre", group: "Group 6" },
  { value: "dance", label: "Dance", group: "Group 6" },
  { value: "film", label: "Film", group: "Group 6" },
  
  // Core
  { value: "tok", label: "Theory of Knowledge", group: "Core" },
  { value: "ee", label: "Extended Essay", group: "Core" },
  
  // Other
  { value: "other", label: "Other", group: "Other" },
];

import { EDUCATION_PROGRAMS, groupedPrograms } from "@/data/educationPrograms";

interface ProfileData {
  full_name: string | null;
  school_name: string | null;
  education_type: string | null;
}

interface ProfileEditorProps {
  onSave?: () => void;
  compact?: boolean;
}

export interface ProfileEditorRef {
  save: () => Promise<void>;
}

export const ProfileEditor = forwardRef<ProfileEditorRef, ProfileEditorProps>(({ onSave, compact = false }, ref) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is a private user (not a student/teacher)
  const isPrivateUser = user?.user_metadata?.user_type === 'private';
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: null,
    school_name: null,
    education_type: null,
  });
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customFields, setCustomFields] = useState<{ key: string; value: string }[]>([]);

  useImperativeHandle(ref, () => ({
    save: async () => {
      await handleSave(false);
    }
  }));

  useEffect(() => {
    loadProfile();
  }, [user]);

  // Autosave effect
  useEffect(() => {
    if (loading) return;
    
    const timeoutId = setTimeout(() => {
      handleSave(true);
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, [profile, selectedSubjects, customFields, loading]);

  const loadProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, school_name, education_type")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
        // Load subjects from user metadata if available
        const storedSubjects = user.user_metadata?.subjects || [];
        setSelectedSubjects(storedSubjects);
        const storedCustomFields = user.user_metadata?.custom_fields || [];
        setCustomFields(storedCustomFields);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (silent = false) => {
    if (!user) return;

    if (!silent) setSaving(true);
    try {
      // Update profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name,
          school_name: profile.school_name,
          education_type: profile.education_type,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Update user metadata for subjects and custom fields
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          school_name: profile.school_name,
          education_type: profile.education_type,
          school_program: profile.education_type, // Sync school_program with education_type
          subjects: selectedSubjects,
          custom_fields: customFields,
        },
      });

      if (authError) throw authError;

      // if (!silent) toast.success("Profile updated successfully");
      // onSave?.();
    } catch (error: any) {
      console.error("Error saving profile:", error);
      if (!silent) toast.error(error.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const addSubject = (subject: string) => {
    if (subject && !selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const updateCustomField = (index: number, field: "key" | "value", value: string) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            Sign in to edit your profile
          </p>
        </CardContent>
      </Card>
    );
  }

  const groupedSubjects = IB_SUBJECTS.reduce((acc, subject) => {
    if (!acc[subject.group]) acc[subject.group] = [];
    acc[subject.group].push(subject);
    return acc;
  }, {} as Record<string, typeof IB_SUBJECTS>);

  return (
    <div className={`space-y-${compact ? "4" : "6"}`}>
      {/* Basic Info */}
      <Card>
        <CardHeader className={compact ? "pb-3" : undefined}>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className={compact ? "text-lg" : undefined}>Basic Information</CardTitle>
          </div>
          <CardDescription>Your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={profile.full_name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, full_name: e.target.value })
                }
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={user.email || ""} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education - Hidden for private users */}
      {!isPrivateUser && (
        <Card>
          <CardHeader className={compact ? "pb-3" : undefined}>
            <div className="flex items-center gap-2">
              <School className="h-5 w-5 text-primary" />
              <CardTitle className={compact ? "text-lg" : undefined}>Education</CardTitle>
            </div>
            <CardDescription>Your school and program details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="school_name">School Name</Label>
                <Input
                  id="school_name"
                  value={profile.school_name || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, school_name: e.target.value })
                  }
                  placeholder="Enter your school name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education_type">Education Program</Label>
                <Select
                  value={profile.education_type || ""}
                  onValueChange={(value) =>
                    setProfile({ ...profile, education_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education program" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {Object.entries(groupedPrograms).map(([region, programs]) => (
                      <div key={region}>
                        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                          {region}
                        </div>
                        {programs.map((program) => (
                          <SelectItem key={program.value} value={program.value}>
                            {program.label}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subjects - Hidden for private users, only show for IB students */}
      {!isPrivateUser && profile.education_type === 'ib' && (
        <Card>
          <CardHeader className={compact ? "pb-3" : undefined}>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className={compact ? "text-lg" : undefined}>My Subjects</CardTitle>
            </div>
            <CardDescription>Add your IB subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected subjects */}
            {selectedSubjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map((subjectValue) => {
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

            {/* Add subject dropdown */}
            <Select onValueChange={addSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Add a subject..." />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {Object.entries(groupedSubjects).map(([group, subjects]) => (
                  <div key={group}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                      {group}
                    </div>
                    {subjects
                      .filter((s) => !selectedSubjects.includes(s.value))
                      .map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Custom Fields - Hidden for private users */}
      {!isPrivateUser && (
        <Card>
          <CardHeader className={compact ? "pb-3" : undefined}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <CardTitle className={compact ? "text-lg" : undefined}>Custom Fields</CardTitle>
              </div>
              <Button variant="outline" size="sm" onClick={addCustomField}>
                <Plus className="h-4 w-4 mr-1" />
                Add Field
              </Button>
            </div>
            <CardDescription>Add any additional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {customFields.map((field, index) => (
              <div key={index} className="flex gap-2 items-start">
                <Input
                  placeholder="Field name"
                  value={field.key}
                  onChange={(e) => updateCustomField(index, "key", e.target.value)}
                  className="w-1/3"
                />
                <Input
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) => updateCustomField(index, "value", e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCustomField(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {customFields.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No custom fields added yet
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Exit Button - Changes saved automatically */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={async () => {
            await handleSave();
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
