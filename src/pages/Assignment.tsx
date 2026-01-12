import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, ArrowRight, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/ui/back-button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getSchoolProgram } from "@/components/prompts/SchoolProgramPrompt";

// Complete IB DP Subject Structure (reused from CreateAssignment)
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
      { value: "economics", label: "Economics", taskTypes: ["ia", "ee"] },
      { value: "geography", label: "Geography", taskTypes: ["ia", "ee"] },
      { value: "history", label: "History", taskTypes: ["ia", "ee"] },
      { value: "psychology", label: "Psychology", taskTypes: ["ia", "ee"] },
      { value: "philosophy", label: "Philosophy", taskTypes: ["ia", "ee"] },
      { value: "global_politics", label: "Global Politics", taskTypes: ["ia", "ee"] },
    ],
  },
  {
    name: "Group 4: Sciences",
    subjects: [
      { value: "biology", label: "Biology", taskTypes: ["ia", "ee"] },
      { value: "chemistry", label: "Chemistry", taskTypes: ["ia", "ee"] },
      { value: "physics", label: "Physics", taskTypes: ["ia", "ee"] },
      { value: "computer_science", label: "Computer Science", taskTypes: ["ia", "ee"] },
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
      { value: "film", label: "Film", taskTypes: ["ia", "ee"] },
    ],
  },
];

// Task type labels
const taskTypeLabels: Record<string, string> = {
  tok_exhibition: "ToK Exhibition",
  tok_essay: "ToK Essay",
  ia: "Internal Assessment (IA)",
  ee: "Extended Essay (EE)",
  essay: "Essay",
  commentary: "Commentary",
  other: "Other",
};

// Get label for a subject value
const getSubjectLabel = (value: string): string => {
  for (const group of subjectGroups) {
    if ((group as any).subjects) {
      const found = (group as any).subjects.find((s: any) => s.value === value);
      if (found) return found.label;
    }
    if ((group as any).subgroups) {
      for (const subgroup of (group as any).subgroups) {
        const found = subgroup.subjects.find((s: any) => s.value === value);
        if (found) return found.label;
      }
    }
  }
  return value; // Return original if not found
};

// Get available task types for a subject
const getAvailableTaskTypes = (subjectValue: string): string[] => {
  for (const group of subjectGroups) {
    if ((group as any).subjects) {
      const found = (group as any).subjects.find((s: any) => s.value === subjectValue);
      if (found) return found.taskTypes;
    }
    if ((group as any).subgroups) {
      for (const subgroup of (group as any).subgroups) {
        const found = subgroup.subjects.find((s: any) => s.value === subjectValue);
        if (found) return found.taskTypes;
      }
    }
  }
  return ["essay", "ia", "ee", "other"]; // Default
};

export default function Assignment() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { getGhostAssignment, updateGhostAssignment } = useGhostSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectLabel, setSubjectLabel] = useState("");
  const [taskType, setTaskType] = useState("");
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const [subjectPopoverOpen, setSubjectPopoverOpen] = useState(false);

  const isGhostAssignment = id?.startsWith('ghost_');
  const editMode = searchParams.get('edit') === 'true';
  
  // Check if user is IB user
  const schoolProgram = getSchoolProgram();
  const isIBUser = schoolProgram?.schoolProgram === 'ib' || !user;

  useEffect(() => {
    if (authLoading) return;

    if (!id) {
      toast.error("No assignment ID provided");
      navigate("/work");
      return;
    }

    loadAssignment();
  }, [user, authLoading, id, navigate]);

  const loadAssignment = async () => {
    if (!id) {
      navigate("/work");
      return;
    }

    try {
      setLoading(true);
      
      // Handle ghost assignments
      if (isGhostAssignment) {
        const ghostAssignment = getGhostAssignment(id);
        if (!ghostAssignment) {
          toast.error("Assignment not found");
          navigate("/work");
          return;
        }
        
        setAssignment(ghostAssignment);
        setTitle(ghostAssignment.title || "");
        setSubject(ghostAssignment.subject || "");
        setSubjectLabel(getSubjectLabel(ghostAssignment.subject || ""));
        setTaskType(ghostAssignment.task_type || "");
        setDeadline(ghostAssignment.deadline ? new Date(ghostAssignment.deadline) : undefined);
        
        // If edit mode is explicitly requested, show edit form
        if (editMode) {
          setLoading(false);
          return;
        }
        
        // Otherwise redirect based on status
        switch (ghostAssignment.status) {
          case "draft":
          case "planning":
            navigate(`/work/assignment/${id}/plan`);
            break;
          case "outlining":
          case "outline":
            navigate(`/work/assignment/${id}/outline`);
            break;
          case "writing":
          case "reviewing":
          case "complete":
            navigate(`/work/assignment/${id}/draft`);
            break;
          default:
            navigate(`/work/assignment/${id}/plan`);
        }
        return;
      }

      // Handle real assignments
      const { data: assignmentData, error } = await supabase
        .from("assignments")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;

      if (!assignmentData) {
        toast.error("Assignment not found");
        navigate("/work");
        return;
      }

      setAssignment(assignmentData);
      setTitle(assignmentData.title || "");
      setSubject(assignmentData.subject || "");
      setSubjectLabel(getSubjectLabel(assignmentData.subject || ""));
      setTaskType(assignmentData.task_type || "");
      setDeadline(assignmentData.deadline ? new Date(assignmentData.deadline) : undefined);
      
      // If edit mode is explicitly requested, show edit form
      if (editMode) {
        setLoading(false);
        return;
      }

      // Otherwise redirect based on status
      switch (assignmentData.status) {
        case "draft":
        case "planning":
          navigate(`/work/assignment/${id}/plan`);
          break;
        case "outlining":
          navigate(`/work/assignment/${id}/outline`);
          break;
        case "writing":
        case "reviewing":
        case "complete":
          navigate(`/work/assignment/${id}/draft`);
          break;
        default:
          navigate(`/work/assignment/${id}/plan`);
      }
    } catch (error: any) {
      toast.error("Failed to load assignment");
      navigate("/work");
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (value: string, label: string) => {
    setSubject(value);
    setSubjectLabel(label);
    setSubjectPopoverOpen(false);
    // Reset task type if it's not valid for new subject
    const availableTypes = getAvailableTaskTypes(value);
    if (!availableTypes.includes(taskType)) {
      setTaskType("");
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    try {
      setIsSaving(true);

      if (isGhostAssignment) {
        // Update ghost assignment - ghost users CAN change subject and task type
        updateGhostAssignment(id!, {
          title,
          subject,
          task_type: taskType,
          deadline: deadline?.toISOString(),
        });
        toast.success("Assignment updated");
      } else {
        // Update real assignment - authenticated users can also change subject/task type
        const { error } = await supabase
          .from("assignments")
          .update({
            title,
            subject: subject as any,
            task_type: taskType as any,
            deadline: deadline?.toISOString(),
          })
          .eq("id", id);

        if (error) throw error;
        toast.success("Assignment updated");
      }
    } catch (error: any) {
      toast.error("Failed to update assignment");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = () => {
    navigate(`/work/assignment/${id}/plan`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const availableTaskTypes = getAvailableTaskTypes(subject);

  // If not in edit mode, the redirect would have happened in loadAssignment
  // So if we're here, we're in edit mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-3xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/work"
            size="icon"
            tooltip="Back to Dashboard"
          />
          <div>
            <h1 className="text-4xl font-bold">Edit Assignment</h1>
            <p className="text-muted-foreground">Update assignment details</p>
          </div>
        </div>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>
              Edit the details of your assignment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Biology IA - Enzyme Activity"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              {isIBUser ? (
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
                <Input
                  id="subject"
                  value={subjectLabel || subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    setSubjectLabel(e.target.value);
                  }}
                  placeholder="e.g., English, Mathematics, History..."
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="taskType">Task Type</Label>
              {isIBUser ? (
                <Select 
                  value={taskType} 
                  onValueChange={setTaskType}
                >
                  <SelectTrigger id="taskType">
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTaskTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {taskTypeLabels[type] || type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="taskType"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  placeholder="e.g., Essay, Report, Project..."
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Deadline</Label>
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
                    onSelect={setDeadline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                variant="outline"
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
              <Button onClick={handleContinue} className="flex-1">
                Continue to Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
