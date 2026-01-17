import { useState, useEffect } from "react";
import { ClipboardCheck, FileText, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getGuideForSubject, SubjectGuide, SUBJECT_GUIDES } from "@/lib/grading-criteria";
import iaCriteriaData, { SubjectCriteria, AssessmentCriterion } from "@/data/iaCriteriaData";
import { GradingCriteriaTable } from "@/components/GradingCriteriaTable";

interface GradingCriteriaPanelProps {
  subject?: string;
  taskType?: string;
}

// Map subject keys to iaCriteriaData keys
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
  'french_b': 'languageB',
  'german_b': 'languageB',
  'spanish_b': 'languageB',
  'italian_b': 'languageB',
  'japanese_b': 'languageB',
  'mandarin_b': 'languageB',
  'other_b': 'languageB',
  'visual_arts': 'visualArts',
  'computer_science': 'computerScience',
};

export function GradingCriteriaPanel({ subject, taskType }: GradingCriteriaPanelProps) {
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState<AssessmentCriterion[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectCriteria | null>(null);
  const [guide, setGuide] = useState<SubjectGuide | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subject || !taskType) {
      setCriteria([]);
      setSubjectData(null);
      setGuide(null);
      setError(null);
      return;
    }

    const loadCriteria = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get guide metadata
        const guideInfo = getGuideForSubject(subject, taskType);
        setGuide(guideInfo);

        // For IA tasks, use our structured data
        if (taskType === 'ia') {
          const subjectKey = SUBJECT_KEY_MAP[subject];
          const data = subjectKey ? iaCriteriaData[subjectKey as keyof typeof iaCriteriaData] : null;
          
          if (data) {
            setSubjectData(data);
            setCriteria(data.criteria);
            setError(null);
          } else {
            setError(`IA criteria not yet available for ${guideInfo?.label || subject}`);
            setCriteria([]);
            setSubjectData(null);
          }
        } else if (taskType === 'ee' || taskType === 'tok' || taskType === 'tok_essay' || taskType === 'tok_exhibition') {
          // Load EE/TOK criteria dynamically
          const eeTokModule = await import('@/data/ee_tok_data');
          const eeData = (taskType === 'ee')
            ? eeTokModule.extendedEssayData
            : eeTokModule.theoryOfKnowledgeData;
          if (eeData?.assessmentCriteria) {
            const criteriaArray: AssessmentCriterion[] = Object.entries(eeData.assessmentCriteria).map(([key, c]: [string, any]) => ({
              name: c.name,
              maxMarks: parseInt(c.marks, 10) || 0,
              weighting: 0, // EE/TOK don't have weighting percentages
              levels: c.keyPoints.map((kp: string, idx: number) => ({
                marks: String(idx + 1),
                descriptor: kp,
              })),
            }));
            setCriteria(criteriaArray);
            setSubjectData({
              subject: eeData.title,
              type: taskType === 'ee' ? 'Extended Essay' : 'Theory of Knowledge',
              criteria: criteriaArray,
              totalMarks: criteriaArray.reduce((s, c) => s + c.maxMarks, 0),
              yearPublished: eeData.officialGuide?.year,
            } as any);
            setError(null);
          } else {
            setError(`Criteria not loaded for ${taskType.toUpperCase()}`);
            setCriteria([]);
            setSubjectData(null);
          }
        } else {
          // Fallback – other types
          setError(`Detailed criteria available in the full guide`);
          setCriteria([]);
          setSubjectData(null);
        }
      } catch (err) {
        setError('Failed to load grading criteria');
      } finally {
        setLoading(false);
      }
    };

    loadCriteria();
  }, [subject, taskType]);

  const openPdfGuide = () => {
    if (guide) {
      window.open(`/guides/${guide.pdfFile}`, '_blank');
    }
  };

  // No subject/taskType selected
  if (!subject || !taskType) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-sm font-medium mb-2">Grading Criteria</h3>
        <p className="text-xs">
          Select an assignment to view its grading criteria.
        </p>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
        <p className="text-sm">Loading grading criteria...</p>
      </div>
    );
  }

  // Error or no criteria available
  if (error && criteria.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-sm font-medium mb-2">Grading Criteria</h3>
        <p className="text-xs mb-4">
          {error}
        </p>
        {guide && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={openPdfGuide}
          >
            <FileText className="h-3 w-3 mr-2" />
            View Full Guide
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        )}
      </div>
    );
  }

  const taskTypeLabel = taskType === 'ia' ? 'Internal Assessment' 
    : taskType === 'ee' ? 'Extended Essay'
    : taskType === 'tok_essay' ? 'ToK Essay'
    : taskType === 'tok_exhibition' ? 'ToK Exhibition'
    : taskType;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-sm">Grading Criteria</h3>
        </div>
        
        {subjectData && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {subjectData.subject}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {taskTypeLabel}
            </Badge>
            {subjectData.yearPublished && (
              <Badge variant="outline" className="text-xs">
                {subjectData.yearPublished}
              </Badge>
            )}
            <Badge variant="default" className="text-xs">
              {subjectData.totalMarks} marks total
            </Badge>
          </div>
        )}

        {guide && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={openPdfGuide}
          >
            <FileText className="h-3 w-3 mr-2" />
            View Full Guide (PDF)
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        )}
      </div>

      {/* Criteria List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {criteria.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-xs">
                Click "View Full Guide" for complete details.
              </p>
            </div>
          ) : (
            criteria.map((criterion, idx) => (
              <GradingCriteriaTable key={idx} criterion={criterion} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
