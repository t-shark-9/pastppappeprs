import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { BackButton } from "@/components/ui/back-button";
import { SchoolProgramPrompt, getSchoolProgram } from "@/components/prompts/SchoolProgramPrompt";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Page for creating a new assignment
export default function CreateAssignment() {
  const { user, loading: authLoading } = useAuth();
  const { createGhostAssignment, ghostUserType } = useGhostSession();
  const navigate = useNavigate();
  
  // Check if user is in office mode (ghost) or private mode (signed in)
  const isOfficeMode = !user && ghostUserType === 'office';
  const isPrivateUser = user?.user_metadata?.user_type === 'private';
  const isSimplifiedMode = isOfficeMode || isPrivateUser;

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isIBUser, setIsIBUser] = useState(false);
  const [showProgramPrompt, setShowProgramPrompt] = useState(false);
  const [hasSchoolProgram, setHasSchoolProgram] = useState(false);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectLabel, setSubjectLabel] = useState("");
  const [taskType, setTaskType] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [subjectPopoverOpen, setSubjectPopoverOpen] = useState(false);
  
  // Office document types
  const officeDocumentTypes = [
    { value: "report", label: "Report" },
    { value: "proposal", label: "Proposal" },
    { value: "memo", label: "Memo" },
    { value: "letter", label: "Letter" },
    { value: "presentation", label: "Presentation" },
    { value: "analysis", label: "Analysis" },
    { value: "documentation", label: "Documentation" },
    { value: "other", label: "Other" },
  ];

  // Complete IB DP Subject Structure
  const subjectGroups = [
    {
      name: "Core",
      subjects: [
        { value: "tok", label: "Theory of Knowledge", taskTypes: ["tok_exhibition", "tok_essay"] },
      ],
    },
    {
      name: "Group 1: Studies in Language and Literature",
      subjects: [
        { value: "lang_a_literature", label: "Language A: Literature", taskTypes: ["ia", "ee"] },
        { value: "lang_a_lang_lit", label: "Language A: Language and Literature", taskTypes: ["ia", "ee"] },
        { value: "literature_performance", label: "Literature and Performance", taskTypes: ["ia", "ee"] },
      ],
    },
    {
      name: "Group 2: Language Acquisition",
      subgroups: [
        {
          name: "Classical Languages",
          subjects: [
            { value: "latin", label: "Latin", taskTypes: ["ia", "ee"] },
            { value: "classical_greek", label: "Classical Greek", taskTypes: ["ia", "ee"] },
          ],
        },
        {
          name: "Language Ab Initio",
          subjects: [
            { value: "arabic_ab", label: "Arabic Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "chinese_ab", label: "Chinese Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "french_ab", label: "French Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "german_ab", label: "German Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "hindi_ab", label: "Hindi Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "japanese_ab", label: "Japanese Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "korean_ab", label: "Korean Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "portuguese_ab", label: "Portuguese Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "russian_ab", label: "Russian Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "spanish_ab", label: "Spanish Ab Initio", taskTypes: ["ia", "ee"] },
            { value: "other_ab", label: "Other Ab Initio Language", taskTypes: ["ia", "ee"] },
          ],
        },
        {
          name: "Language B",
          subjects: [
            { value: "english_b", label: "English B", taskTypes: ["ia", "ee"] },
            { value: "french_b", label: "French B", taskTypes: ["ia", "ee"] },
            { value: "german_b", label: "German B", taskTypes: ["ia", "ee"] },
            { value: "spanish_b", label: "Spanish B", taskTypes: ["ia", "ee"] },
            { value: "italian_b", label: "Italian B", taskTypes: ["ia", "ee"] },
            { value: "japanese_b", label: "Japanese B", taskTypes: ["ia", "ee"] },
            { value: "mandarin_b", label: "Mandarin B", taskTypes: ["ia", "ee"] },
            { value: "other_b", label: "Other Language B", taskTypes: ["ia", "ee"] },
          ],
        },
      ],
    },
    {
      name: "Group 3: Individuals and Societies",
      subjects: [
        { value: "business_management", label: "Business Management", taskTypes: ["ia", "ee"] },
        { value: "digital_society", label: "Digital Society", taskTypes: ["ia", "ee"] },
        { value: "economics", label: "Economics", taskTypes: ["ia", "ee"] },
        { value: "geography", label: "Geography", taskTypes: ["ia", "ee"] },
        { value: "global_politics", label: "Global Politics", taskTypes: ["ia", "ee"] },
        { value: "history", label: "History", taskTypes: ["ia", "ee"] },
        { value: "philosophy", label: "Philosophy", taskTypes: ["ia", "ee"] },
        { value: "psychology", label: "Psychology", taskTypes: ["ia", "ee"] },
        { value: "social_cultural_anthropology", label: "Social and Cultural Anthropology", taskTypes: ["ia", "ee"] },
        { value: "world_religions", label: "World Religions", taskTypes: ["ia", "ee"] },
      ],
    },
    {
      name: "Group 4: Sciences",
      subjects: [
        { value: "biology", label: "Biology", taskTypes: ["ia", "ee"] },
        { value: "chemistry", label: "Chemistry", taskTypes: ["ia", "ee"] },
        { value: "physics", label: "Physics", taskTypes: ["ia", "ee"] },
        { value: "computer_science", label: "Computer Science", taskTypes: ["ia", "ee"] },
        { value: "design_technology", label: "Design Technology", taskTypes: ["ia", "ee"] },
        { value: "ess", label: "Environmental Systems and Societies", taskTypes: ["ia", "ee"] },
        { value: "sehs", label: "Sports, Exercise and Health Science", taskTypes: ["ia", "ee"] },
      ],
    },
    {
      name: "Group 5: Mathematics",
      subjects: [
        { value: "math_aa", label: "Mathematics: Analysis and Approaches", taskTypes: ["ia", "ee"] },
        { value: "math_ai", label: "Mathematics: Applications and Interpretation", taskTypes: ["ia", "ee"] },
      ],
    },
    {
      name: "Group 6: The Arts",
      subjects: [
        { value: "visual_arts", label: "Visual Arts", taskTypes: ["ia", "ee"] },
        { value: "music", label: "Music", taskTypes: ["ia", "ee"] },
        { value: "theatre", label: "Theatre", taskTypes: ["ia", "ee"] },
        { value: "dance", label: "Dance", taskTypes: ["ia", "ee"] },
        { value: "film", label: "Film", taskTypes: ["ia", "ee"] },
      ],
    },
  ];

  // Get available task types based on selected subject
  const getAvailableTaskTypes = () => {
    if (!subject) return [];
    
    for (const group of subjectGroups) {
      // Check direct subjects
      if ((group as any).subjects) {
        const found = (group as any).subjects.find((s: any) => s.value === subject);
        if (found) return found.taskTypes;
      }
      // Check subgroups
      if ((group as any).subgroups) {
        for (const subgroup of (group as any).subgroups) {
          const found = subgroup.subjects.find((s: any) => s.value === subject);
          if (found) return found.taskTypes;
        }
      }
    }
    return ["ia", "ee"]; // Default
  };

  const taskTypeLabels: Record<string, string> = {
    tok_exhibition: "ToK Exhibition",
    tok_essay: "ToK Essay",
    ia: "Internal Assessment (IA)",
    ee: "Extended Essay (EE)",
  };

  // Load user profile to check if IB user and school program
  useEffect(() => {
    const loadUserProfile = async () => {
      // Check localStorage first (works for both logged in and ghost users)
      const localProgram = getSchoolProgram();
      if (localProgram) {
        setHasSchoolProgram(true);
        setIsIBUser(localProgram.schoolProgram === 'ib');
        // localStorage has program, no need to check profile
        return;
      }
      
      if (!user) {
        // If ghost user has no program set, default to false
        setIsIBUser(false);
        return;
      }
      
      // For signed-in users without localStorage program, check profile
      const { data, error } = await supabase
        .from('profiles')
        .select('school_program, education_type')
        .eq('id', user.id)
        .single();
      
      if (!error && data) {
        setUserProfile(data);
        if (data.school_program) {
          setHasSchoolProgram(true);
          const isIB = data.school_program?.toLowerCase() === 'ib';
          setIsIBUser(isIB);
          // Sync to localStorage for future use
          localStorage.setItem('tooessay_school_program', data.school_program);
          if (data.education_type) {
            localStorage.setItem('tooessay_education_type', data.education_type);
          }
        } else {
          setIsIBUser(false);
        }
      } else {
        setIsIBUser(false);
      }
    };
    
    loadUserProfile();
  }, [user]);

  // Reset task type when subject changes
  useEffect(() => {
    const availableTypes = getAvailableTaskTypes();
    if (taskType && !availableTypes.includes(taskType)) {
      setTaskType("");
    }
  }, [subject]);

  // Check if an IB subject is selected and prompt for school program if needed
  const isIBSubject = (subjectValue: string) => {
    // All subjects in the IB subject groups are IB subjects
    return subjectGroups.some(group => 
      group.subjects?.some(s => s.value === subjectValue) ||
      group.subgroups?.some(sg => sg.subjects.some(s => s.value === subjectValue))
    );
  };

  const handleSubjectSelect = (value: string, label: string) => {
    setSubject(value);
    setSubjectLabel(label);
    setSubjectPopoverOpen(false);
    
    // If no school program is set, prompt for it (for any subject, not just IB)
    if (!hasSchoolProgram && !isOfficeMode) {
      setShowProgramPrompt(true);
    }
  };

  const handleProgramComplete = (educationType: string, schoolProgram: string) => {
    setHasSchoolProgram(true);
    setIsIBUser(schoolProgram === 'ib');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Automatically skip planning if no subject is provided
      const skipPlanning = !subject || !taskType;
      
      if (!user) {
        // Create ghost assignment for unsigned users
        const ghostAssignment = createGhostAssignment({
          title: title || "Untitled Assignment",
          subject: subject || null as any,
          task_type: taskType || null as any,
          status: skipPlanning ? "outline" : "planning",
        });
        
        toast.success("Assignment created!");
        const targetPath = skipPlanning ? `/work/assignment/${ghostAssignment.id}/outline` : `/work/assignment/${ghostAssignment.id}/plan`;
        navigate(targetPath);
        return;
      }

      // For logged-in users, create real assignment
      // Get default rubric for this subject/task type (only if subject and task type are provided)
      let rubricId = null;
      if (subject && taskType) {
        const { data: rubrics } = await supabase
          .from("rubrics")
          .select("id")
          .eq("subject", subject as any)
          .eq("task_type", taskType as any)
          .eq("is_default", true)
          .limit(1);

        rubricId = rubrics?.[0]?.id || null;
      }

      const { data, error } = await supabase
        .from("assignments")
        .insert([{
          user_id: user.id,
          title: title || "Untitled Assignment",
          ...(subject && { subject: subject as any }),
          ...(taskType && { task_type: taskType as any }),
          rubric_id: rubricId,
          deadline: deadline?.toISOString(),
          status: (skipPlanning ? "outline" : "planning") as any,
        }])
        .select()
        .single();

      if (error) throw error;

      window.gtag?.('event', 'create_assignment', {
        subject: subject || 'none',
        task_type: taskType || 'none'
      });

      toast.success("Assignment created!");
      const targetPath = skipPlanning ? `/work/assignment/${data.id}/outline` : `/work/assignment/${data.id}/plan`;
      navigate(targetPath);
    } catch (error: any) {
      toast.error(error.message || "Failed to create assignment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6">
      <div className="container max-w-2xl mx-auto space-y-8">
        <div>
          <BackButton
            fallbackPath="/work"
            size="icon"
            tooltip="Back to Work"
            className="mb-4"
          />
          <h1 className="text-4xl font-bold tracking-tight">Create New Assignment</h1>
        </div>

        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Macbeth Literary Analysis"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Subject and Task Type - Hidden for private/office users */}
              {!isSimplifiedMode && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    {isIBUser ? (
                      // IB users get the full subject dropdown
                      <Popover open={subjectPopoverOpen} onOpenChange={setSubjectPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            id="subject"
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between font-normal",
                              !subject && "text-muted-foreground"
                            )}
                          >
                            {subjectLabel || "Select subject"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0 bg-background max-h-[400px] overflow-y-auto" align="start">
                          <Accordion type="multiple" className="w-full">
                            {subjectGroups.map((group, idx) => (
                              <AccordionItem key={idx} value={`group-${idx}`} className="border-b last:border-0">
                                <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 hover:no-underline">
                                  <span className="text-sm font-medium">{group.name}</span>
                                </AccordionTrigger>
                                <AccordionContent className="pb-0">
                                  <div className="space-y-1 px-2 pb-2">
                                    {/* Direct subjects */}
                                    {(group as any).subjects?.map((subj: any) => (
                                      <button
                                        key={subj.value}
                                        type="button"
                                        onClick={() => handleSubjectSelect(subj.value, subj.label)}
                                        className={cn(
                                          "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors",
                                          subject === subj.value && "bg-muted text-primary font-medium"
                                        )}
                                      >
                                        {subj.label}
                                      </button>
                                    ))}
                                    {/* Nested subgroups (for Group 2) */}
                                    {(group as any).subgroups?.map((subgroup: any, subIdx: number) => (
                                      <div key={subIdx} className="mt-2">
                                        <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                          {subgroup.name}
                                        </div>
                                        {subgroup.subjects.map((subj: any) => (
                                          <button
                                            key={subj.value}
                                            type="button"
                                            onClick={() => handleSubjectSelect(subj.value, subj.label)}
                                            className={cn(
                                              "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors pl-6",
                                              subject === subj.value && "bg-muted text-primary font-medium"
                                            )}
                                          >
                                            {subj.label}
                                          </button>
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      // Non-IB users get a simple text input
                      <Input
                        id="subject"
                        placeholder="e.g., English, Mathematics, History..."
                        value={subjectLabel || subject}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSubject(value);
                          setSubjectLabel(value);
                        }}
                      />
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="task-type">Task Type</Label>
                    {isIBUser ? (
                      // IB users get specific task types based on subject
                      <Select
                        value={taskType} 
                        onValueChange={setTaskType}
                        disabled={!subject}
                      >
                        <SelectTrigger id="task-type">
                          <SelectValue placeholder={subject ? "Select task type" : "Select a subject first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableTaskTypes().map((type) => (
                            <SelectItem key={type} value={type}>
                              {taskTypeLabels[type] || type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      // Non-IB users get a simple text input
                      <Input
                        id="task-type"
                        placeholder="e.g., Essay, Report (optional)"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Deadline (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Pick a deadline"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={(date) => {
                        setDeadline(date);
                        // Warn if deadline is in the past
                        if (date && date < new Date()) {
                          toast.warning("You are setting a deadline in the past.");
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Creating..." : (subject && taskType) ? "Start Planning" : "Start Writing"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Contextual prompt for school program */}
      <SchoolProgramPrompt
        open={showProgramPrompt}
        onOpenChange={setShowProgramPrompt}
        onComplete={handleProgramComplete}
        context="assignment"
      />
    </div>
  );
}
