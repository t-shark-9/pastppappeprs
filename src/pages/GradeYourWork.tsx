import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SchoolProgramPrompt, getSchoolProgram } from "@/components/prompts/SchoolProgramPrompt";
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ClipboardPaste,
  Target,
  TrendingUp,
  Award
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface Evaluation {
  overallScore: number;
  criteriaGrades?: Array<{
    criterion: string;
    earnedMarks: number;
    maxMarks: number;
    justification: string;
    improvements: string;
  }>;
  strengths: string[];
  improvements: Array<{
    criterion: string;
    issue: string;
    suggestion: string;
    priority: "high" | "medium" | "low";
  }>;
  nextSteps: string[];
}

const SUBJECTS = [
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "physics", label: "Physics" },
  { value: "math_aa", label: "Mathematics AA" },
  { value: "math_ai", label: "Mathematics AI" },
  { value: "economics", label: "Economics" },
  { value: "business_management", label: "Business Management" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "psychology", label: "Psychology" },
  { value: "lang_a_lang_lit", label: "Language A: Language & Literature" },
  { value: "lang_a_literature", label: "Language A: Literature" },
  { value: "english_b", label: "English B" },
  { value: "visual_arts", label: "Visual Arts" },
  { value: "computer_science", label: "Computer Science" },
  { value: "sehs", label: "Sports, Exercise and Health Science" },
];

const TASK_TYPES = [
  { value: "ia", label: "Internal Assessment (IA)" },
  { value: "ee", label: "Extended Essay (EE)" },
  { value: "tok_essay", label: "TOK Essay" },
  { value: "tok_exhibition", label: "TOK Exhibition" },
  { value: "essay", label: "Essay" },
  { value: "lab_report", label: "Lab Report" },
  { value: "commentary", label: "Commentary" },
];

export default function GradeYourWork() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createGhostAssignment } = useGhostSession();
  
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [taskType, setTaskType] = useState("ia");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [creatingDraft, setCreatingDraft] = useState(false);
  const [showProgramPrompt, setShowProgramPrompt] = useState(false);
  const [hasSchoolProgram, setHasSchoolProgram] = useState(false);

  // Check for school program on mount
  useEffect(() => {
    const program = getSchoolProgram();
    setHasSchoolProgram(!!program);
  }, []);

  // Show prompt when selecting a subject if no program set
  const handleSubjectChange = (value: string) => {
    setSubject(value);
    if (!hasSchoolProgram) {
      setShowProgramPrompt(true);
    }
  };

  const wordCount = useMemo(() => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  }, [content]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContent(text);
      toast.success("Content pasted from clipboard");
    } catch (err) {
      toast.error("Failed to read clipboard. Please paste manually.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setContent(text);
        toast.success(`Loaded "${file.name}"`);
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a .txt or .md file");
    }
  };

  const handleEvaluate = async () => {
    if (!content.trim()) {
      toast.error("Please enter your work first");
      return;
    }
    if (!subject) {
      toast.error("Please select a subject");
      return;
    }

    setIsEvaluating(true);
    setEvaluation(null);

    try {
      // Get grading criteria for this subject and task type
      let gradingCriteria = null;
      
      if (taskType === 'ia') {
        // Load IA criteria
        const iaCriteriaModule = await import('@/data/iaCriteriaData');
        const SUBJECT_KEY_MAP: Record<string, string> = {
          'biology': 'biology',
          'chemistry': 'chemistry',
          'physics': 'physics',
          'business_management': 'businessManagement',
          'economics': 'economics',
          'history': 'history',
          'geography': 'geography',
          'psychology': 'psychology',
          'sehs': 'sehs',
          'math_aa': 'mathAA',
          'math_ai': 'mathAI',
          'lang_a_lang_lit': 'languageALangLit',
          'lang_a_literature': 'languageALangLit',
          'english_b': 'languageB',
          'visual_arts': 'visualArts',
          'computer_science': 'computerScience',
        };
        const subjectKey = SUBJECT_KEY_MAP[subject];
        if (subjectKey) {
          const criteriaData = iaCriteriaModule.iaCriteriaData[subjectKey as keyof typeof iaCriteriaModule.iaCriteriaData];
          if (criteriaData) {
            gradingCriteria = criteriaData.criteria.map(c => ({
              name: c.name,
              maxMarks: c.maxMarks,
              levels: c.levels.map(l => `${l.marks}: ${l.descriptor}`)
            }));
          }
        }
      } else if (taskType === 'ee' || taskType === 'tok_essay' || taskType === 'tok_exhibition') {
        // Load EE/TOK criteria from ee_tok_data
        const eeTokModule = await import('@/data/ee_tok_data');
        const eeData = taskType === 'ee' ? eeTokModule.extendedEssayData : eeTokModule.theoryOfKnowledgeData;
        if (eeData?.assessmentCriteria) {
          gradingCriteria = Object.entries(eeData.assessmentCriteria).map(([key, criterion]: [string, any]) => ({
            name: `${key}: ${criterion.name}`,
            maxMarks: parseInt(criterion.marks) || 6,
            levels: criterion.keyPoints.map((kp: string, i: number) => `${i + 1}: ${kp}`)
          }));
        }
      }

      const { data, error } = await supabase.functions.invoke("evaluate-draft", {
        body: {
          content: content.trim(),
          subject: subject,
          taskType: taskType,
          schoolProgram: user?.user_metadata?.school_program || 'ibdp',
          rubric: [],
          gradingCriteria: gradingCriteria,
        },
      });

      if (error) throw error;
      setEvaluation(data);
      toast.success("Evaluation complete!");
    } catch (error: any) {
      console.error("Evaluation error:", error);
      toast.error(error.message || "Failed to evaluate. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleContinueEditing = async () => {
    setCreatingDraft(true);
    try {
      // Create a ghost assignment with the content
      const ghostId = await createGhostAssignment({
        title: `${SUBJECTS.find(s => s.value === subject)?.label || 'My'} ${TASK_TYPES.find(t => t.value === taskType)?.label || 'Work'}`,
        subject: subject,
        task_type: taskType,
        schoolProgram: user?.user_metadata?.school_program || 'ibdp',
      });

      // Store the content for the draft
      localStorage.setItem(`draft_content_${ghostId}`, content);
      
      // Navigate to the draft page
      navigate(`/work/assignment/${ghostId}/draft`);
      toast.success("Opening editor with your work...");
    } catch (error) {
      console.error("Error creating draft:", error);
      toast.error("Failed to create draft. Please try again.");
    } finally {
      setCreatingDraft(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 6) return 'text-green-600';
    if (score >= 4) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton fallbackPath="/" />
          <div>
            <h1 className="text-3xl font-bold">Grade Your Work</h1>
            <p className="text-muted-foreground">Get instant AI feedback on your essay or IA</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Subject & Task Type Selection */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Assignment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={subject} onValueChange={handleSubjectChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject..." />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map(s => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Task Type</Label>
                    <Select value={taskType} onValueChange={setTaskType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TASK_TYPES.map(t => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Input */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your Work
                </CardTitle>
                <CardDescription>
                  Paste your essay or upload a text file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePaste}>
                    <ClipboardPaste className="h-4 w-4 mr-2" />
                    Paste from Clipboard
                  </Button>
                  <label>
                    <input
                      type="file"
                      accept=".txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload File
                      </span>
                    </Button>
                  </label>
                </div>

                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your work here..."
                  className="min-h-[300px] resize-none font-mono text-sm"
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{wordCount} words</span>
                  {wordCount < 100 && content.trim() && (
                    <span className="text-amber-600">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      Very short - more content may improve feedback
                    </span>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !content.trim() || !subject}
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing your work...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Grade My Work
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {!evaluation && !isEvaluating && (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Award className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">
                    Ready to Grade
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Enter your work on the left and click "Grade My Work" to receive detailed feedback based on IB criteria
                  </p>
                </CardContent>
              </Card>
            )}

            {isEvaluating && (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin mb-4" />
                  <h3 className="text-xl font-medium mb-2">
                    Analyzing Your Work
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Comparing against IB assessment criteria...
                  </p>
                </CardContent>
              </Card>
            )}

            {evaluation && (
              <>
                {/* Overall Score */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Overall Grade
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className={`text-6xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                        {evaluation.overallScore}/7
                      </div>
                      <div className="flex-1">
                        <Progress 
                          value={(evaluation.overallScore / 7) * 100} 
                          className="h-4"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {evaluation.overallScore >= 6 ? "Excellent work!" :
                           evaluation.overallScore >= 4 ? "Good progress, some improvements needed" :
                           "Needs significant improvement"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Criteria Breakdown */}
                {evaluation.criteriaGrades && evaluation.criteriaGrades.length > 0 && (
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Criteria Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {evaluation.criteriaGrades.map((grade, i) => (
                        <div key={i} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{grade.criterion}</span>
                            <span className={`font-bold ${getScoreColor((grade.earnedMarks / grade.maxMarks) * 7)}`}>
                              {grade.earnedMarks}/{grade.maxMarks}
                            </span>
                          </div>
                          <Progress 
                            value={(grade.earnedMarks / grade.maxMarks) * 100} 
                            className="h-2"
                          />
                          <p className="text-sm text-muted-foreground">{grade.justification}</p>
                          {grade.improvements && (
                            <p className="text-sm text-primary">💡 {grade.improvements}</p>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Strengths */}
                {evaluation.strengths && evaluation.strengths.length > 0 && (
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {evaluation.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Improvements */}
                {evaluation.improvements && evaluation.improvements.length > 0 && (
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-amber-600" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {evaluation.improvements.map((item, i) => (
                          <li key={i} className={`border rounded-lg p-3 ${getPriorityColor(item.priority)}`}>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="font-medium">{item.criterion}</span>
                                <p className="text-sm mt-1">{item.issue}</p>
                                <p className="text-sm mt-1 opacity-80">💡 {item.suggestion}</p>
                              </div>
                              <span className="text-xs uppercase font-medium shrink-0">
                                {item.priority}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Continue Editing CTA */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="py-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-lg font-medium">
                        Want to improve your work?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Continue editing in our full editor with AI assistance, formatting tools, and more.
                      </p>
                      <Button 
                        size="lg"
                        onClick={handleContinueEditing}
                        disabled={creatingDraft}
                      >
                        {creatingDraft ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Opening Editor...
                          </>
                        ) : (
                          <>
                            Continue Editing
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Contextual prompt for school program */}
      <SchoolProgramPrompt
        open={showProgramPrompt}
        onOpenChange={setShowProgramPrompt}
        onComplete={() => setHasSchoolProgram(true)}
        context="grading"
      />
    </div>
  );
}
