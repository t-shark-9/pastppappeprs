import { useState, useEffect } from "react";
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

// All internationally recognized education programs
const EDUCATION_PROGRAMS = [
  { value: "ib", label: "IB (International Baccalaureate)", region: "International" },
  { value: "cambridge-international", label: "Cambridge International", region: "International" },
  { value: "a-levels", label: "A Levels", region: "UK" },
  { value: "igcse", label: "IGCSE / GCSE", region: "UK" },
  { value: "ap", label: "Advanced Placement (AP)", region: "USA" },
  { value: "us-high-school", label: "US High School Diploma", region: "USA" },
  { value: "canadian-high-school", label: "Canadian High School", region: "Canada" },
  { value: "abitur", label: "German Abitur", region: "Europe" },
  { value: "french-bac", label: "French Baccalauréat", region: "Europe" },
  { value: "swiss-matura", label: "Swiss Matura", region: "Europe" },
  { value: "dutch-vwo", label: "Dutch VWO", region: "Europe" },
  { value: "swedish-gymnasium", label: "Swedish Gymnasium", region: "Europe" },
  { value: "spanish-bachillerato", label: "Spanish Bachillerato", region: "Europe" },
  { value: "italian-maturita", label: "Italian Maturità", region: "Europe" },
  { value: "polish-matura", label: "Polish Matura", region: "Europe" },
  { value: "russian-ege", label: "EGE (Russia)", region: "Europe" },
  { value: "australian-year-12", label: "Australian Year 12 / ATAR", region: "Asia Pacific" },
  { value: "nz-ncea", label: "NCEA (New Zealand)", region: "Asia Pacific" },
  { value: "indian-cbse", label: "CBSE (India)", region: "Asia Pacific" },
  { value: "indian-icse", label: "ICSE (India)", region: "Asia Pacific" },
  { value: "chinese-gaokao", label: "Gaokao (China)", region: "Asia Pacific" },
  { value: "japanese-high-school", label: "Japanese High School", region: "Asia Pacific" },
  { value: "korean-suneung", label: "Korean Suneung", region: "Asia Pacific" },
  { value: "singapore-a-levels", label: "Singapore A Levels", region: "Asia Pacific" },
  { value: "hong-kong-dse", label: "HKDSE (Hong Kong)", region: "Asia Pacific" },
  { value: "brazilian-enem", label: "ENEM (Brazil)", region: "Other" },
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

interface ProfileData {
  full_name: string | null;
  school_name: string | null;
  education_type: string | null;
}

interface ProfileEditorProps {
  onSave?: () => void;
  compact?: boolean;
}

export function ProfileEditor({ onSave, compact = false }: ProfileEditorProps) {
  const { user } = useAuth();
  
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

  useEffect(() => {
    loadProfile();
  }, [user]);

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

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
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
          subjects: selectedSubjects,
          custom_fields: customFields,
        },
      });

      if (authError) throw authError;

      toast.success("Profile updated successfully");
      onSave?.();
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error(error.message || "Failed to save profile");
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

      {/* Save Button */}
      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </>
        )}
      </Button>
    </div>
  );
}

export default ProfileEditor;
