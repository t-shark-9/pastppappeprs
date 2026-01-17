import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Lightbulb, Loader2, ArrowRight, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useAutoSave } from "@/hooks/use-auto-save";

interface CoachingResponse {
  questions: string[];
  thesisPattern: string;
  evidenceChecklist: string[];
}

interface PlanSection {
  id: string;
  title: string;
  notes: string;
}

export default function IdeaBuilder() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState<any>(null);
  const [rubric, setRubric] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [coaching, setCoaching] = useState<CoachingResponse | null>(null);
  const [isCoaching, setIsCoaching] = useState(false);

  const [currentIdea, setCurrentIdea] = useState("");
  const [thesis, setThesis] = useState("");
  const [constraints, setConstraints] = useState("");
  const [sections, setSections] = useState<PlanSection[]>([
    { id: "1", title: "Key Points", notes: "" },
  ]);

  useEffect(() => {
    if (authLoading) return;

    loadAssignment();
  }, [user, authLoading, id]);

  // Check if this is a ghost assignment
  const isGhostAssignment = id?.startsWith('ghost_');

  const loadAssignment = async () => {
    try {
      // Handle ghost assignments
      if (isGhostAssignment) {
        const savedAssignments = localStorage.getItem('tooessay_ghost_assignments');
        if (savedAssignments) {
          const assignments = JSON.parse(savedAssignments);
          const ghostAssignment = assignments.find((a: any) => a.id === id);
          if (ghostAssignment) {
            setAssignment(ghostAssignment);
            // Load plan from localStorage
            const savedPlan = localStorage.getItem(`plan_${id}`);
            if (savedPlan) {
              const planData = JSON.parse(savedPlan);
              setThesis(planData.thesis || "");
              setConstraints(planData.constraints || "");
            }
          }
        }
        setLoading(false);
        return;
      }

      const { data: assignmentData, error: assignmentError } = await supabase
        .from("assignments")
        .select("*")
        .eq("id", id)
        .single();

      if (assignmentError) throw assignmentError;
      setAssignment(assignmentData);

      // Load rubric
      if (assignmentData.rubric_id) {
        const { data: rubricData, error: rubricError } = await supabase
          .from("rubrics")
          .select("*")
          .eq("id", assignmentData.rubric_id)
          .single();

        if (!rubricError && rubricData) {
          setRubric(rubricData);
        }
      }

      // Load existing plan if any
      const { data: planData } = await supabase
        .from("plans")
        .select("*")
        .eq("assignment_id", id)
        .single();

      if (planData) {
        setThesis(planData.thesis || "");
        setConstraints(planData.constraints || "");
        if (planData.sections && Array.isArray(planData.sections)) {
          // Safely cast JSON to PlanSection[] with validation
          const validSections = (planData.sections as unknown[]).filter(
            (s): s is PlanSection => 
              typeof s === 'object' && s !== null && 
              'id' in s && 'title' in s && 'notes' in s
          );
          setSections(validSections);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };

  const handleGetCoaching = async () => {
    if (!currentIdea.trim()) {
      toast.error("Please describe your idea first");
      return;
    }

    setIsCoaching(true);

    try {
      const { data, error } = await supabase.functions.invoke("coach-plan", {
        body: {
          subject: assignment.subject,
          taskType: assignment.task_type,
          currentIdea,
          rubric: rubric?.criteria || [],
          schoolProgram: user?.user_metadata?.school_program,
          userRole: user?.user_metadata?.user_type
        },
      });

      if (error) throw error;
      setCoaching(data);
      toast.success("Coaching received!");
    } catch (error: any) {
      console.error("Coaching error:", error);
      toast.error(error.message || "Failed to get coaching");
    } finally {
      setIsCoaching(false);
    }
  };

  const autoSavePlan = async () => {
    try {
      if (isGhostAssignment) {
        const planData = {
          thesis,
          constraints,
          sections
        };
        localStorage.setItem(`plan_${id}`, JSON.stringify(planData));
        return;
      }

      const { data: existingPlan } = await supabase
        .from("plans")
        .select("id")
        .eq("assignment_id", id)
        .single();

      if (existingPlan) {
        await supabase
          .from("plans")
          .update({
            thesis,
            constraints,
            sections: sections as any,
          })
          .eq("id", existingPlan.id);
      } else {
        await supabase.from("plans").insert({
          assignment_id: id,
          thesis,
          constraints,
          sections: sections as any,
        });
      }
    } catch (error: any) {
      console.error("Auto-save failed:", error);
    }
  };

  const { debouncedSave } = useAutoSave({
    onSave: autoSavePlan,
    delay: 2000,
  });

  // Trigger auto-save when content changes
  useEffect(() => {
    if (thesis || constraints || sections.length > 0) {
      debouncedSave();
    }
  }, [thesis, constraints, sections, debouncedSave]);

  const handleContinueToOutline = async () => {
    try {
      await autoSavePlan();

      if (!isGhostAssignment) {
        // Update assignment status
        await supabase
          .from("assignments")
          .update({ status: "outlining" })
          .eq("id", id);
      } else {
        // Update ghost assignment status
        const savedAssignments = localStorage.getItem('tooessay_ghost_assignments');
        if (savedAssignments) {
          const assignments = JSON.parse(savedAssignments);
          const updated = assignments.map((a: any) => 
            a.id === id ? { ...a, status: "outlining" } : a
          );
          localStorage.setItem('tooessay_ghost_assignments', JSON.stringify(updated));
        }
      }

      window.gtag?.('event', 'save_plan', {
        assignment_id: id
      });

      toast.success("Plan saved!");
      navigate(`/work/assignment/${id}/outline`);
    } catch (error: any) {
      toast.error("Failed to save plan");
    }
  };

  const handleSkipToWriting = async () => {
    try {
      await autoSavePlan();

      if (!isGhostAssignment) {
        // Update assignment status
        await supabase
          .from("assignments")
          .update({ status: "writing" })
          .eq("id", id);
      } else {
        // Update ghost assignment status
        const savedAssignments = localStorage.getItem('tooessay_ghost_assignments');
        if (savedAssignments) {
          const assignments = JSON.parse(savedAssignments);
          const updated = assignments.map((a: any) => 
            a.id === id ? { ...a, status: "writing" } : a
          );
          localStorage.setItem('tooessay_ghost_assignments', JSON.stringify(updated));
        }
      }

      window.gtag?.('event', 'skip_to_writing', {
        assignment_id: id
      });

      toast.success("Moving to draft...");
      navigate(`/work/assignment/${id}/draft`);
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const addSection = () => {
    const newSection: PlanSection = {
      id: Date.now().toString(),
      title: "",
      notes: "",
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((s) => s.id !== sectionId));
    }
  };

  const updateSection = (sectionId: string, field: keyof PlanSection, value: string) => {
    setSections(sections.map((s) => 
      s.id === sectionId ? { ...s, [field]: value } : s
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-6">
      <div className="container max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BackButton
              fallbackPath={`/work/assignment/${id}?edit=true`}
              size="icon"
              tooltip="Edit Assignment Details"
            />
            <h1 className="text-4xl font-bold tracking-tight">{assignment?.title}</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={() => navigate(`/work/assignment/${id}`)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Develop Your Idea
                    </CardTitle>
                  </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idea">What's your current idea or research question?</Label>
                  <Textarea
                    id="idea"
                    placeholder="Describe your initial thoughts, what interests you about this topic, and what you'd like to explore..."
                    value={currentIdea}
                    onChange={(e) => setCurrentIdea(e.target.value)}
                    rows={6}
                  />
                </div>

                <Button
                  onClick={handleGetCoaching}
                  disabled={isCoaching || !currentIdea.trim()}
                  className="w-full"
                >
                  {isCoaching ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Getting Coaching...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Get AI Coaching
                    </>
                  )}
                </Button>
              </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Describe your initial thoughts and get AI coaching to refine your approach</p>
              </TooltipContent>
            </Tooltip>

            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Plan Details</CardTitle>
                <CardDescription>
                  Based on the coaching, refine your approach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thesis">Working Thesis / Research Question</Label>
                  <Textarea
                    id="thesis"
                    placeholder="Your main argument or research question..."
                    value={thesis}
                    onChange={(e) => setThesis(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="constraints">Constraints & Requirements</Label>
                  <Textarea
                    id="constraints"
                    placeholder="Word count, specific requirements, etc."
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <Label>Plan Sections</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSection}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add Section
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {sections.map((section) => (
                      <Card key={section.id} className="border-2 group">
                        <CardContent className="pt-4 space-y-3">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Section title..."
                              value={section.title}
                              onChange={(e) => updateSection(section.id, "title", e.target.value)}
                              className="font-semibold"
                            />
                            {sections.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                                onClick={() => removeSection(section.id)}
                                title="Delete section"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                          <Textarea
                            placeholder="Notes and key ideas for this section..."
                            value={section.notes}
                            onChange={(e) => updateSection(section.id, "notes", e.target.value)}
                            rows={3}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => navigate("/work")} className="flex-1">
                  Exit
                </Button>
                <Button onClick={handleContinueToOutline} className="flex-1">
                  Go to Outline
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" onClick={handleSkipToWriting}>
                Skip to Writing
              </Button>
            </div>
          </div>

          {/* Coaching Panel */}
          <div className="lg:col-span-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="shadow-medium sticky top-6">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Coach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!coaching ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">
                          Describe your idea and click "Get AI Coaching" to receive personalized guidance
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-3 text-sm">Clarifying Questions</h3>
                          <ul className="space-y-2">
                            {coaching.questions.map((question, i) => (
                              <li key={i} className="text-sm p-3 rounded-lg bg-accent/10 border border-accent/20">
                                {question}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2 text-sm">Thesis Pattern</h3>
                          <p className="text-sm p-3 rounded-lg bg-primary/10 border border-primary/20 italic">
                            {coaching.thesisPattern}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3 text-sm">Evidence Checklist</h3>
                          <ul className="space-y-2">
                            {coaching.evidenceChecklist.map((item, i) => (
                              <li key={i} className="text-sm flex items-start gap-2">
                                <span className="text-success mt-0.5">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Questions and guidance to develop your idea</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
