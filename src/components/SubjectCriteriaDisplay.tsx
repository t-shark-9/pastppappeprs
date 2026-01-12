import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { GradingCriteriaTable } from "./GradingCriteriaTable";
import iaCriteriaData from "../data/iaCriteriaData";

interface SubjectCriteriaDisplayProps {
  subject: keyof typeof iaCriteriaData;
}

const SubjectCriteriaDisplay = ({ subject }: SubjectCriteriaDisplayProps) => {
  const criteriaData = iaCriteriaData[subject];

  if (!criteriaData) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        Grading criteria not available for this subject.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold">{criteriaData.subject} IA Assessment Criteria</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {criteriaData.guideReference} • Published {criteriaData.yearPublished}
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Total: {criteriaData.totalMarks} marks
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-primary/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{criteriaData.criteria.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Criteria</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{criteriaData.totalMarks}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Marks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">20%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Final Grade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {subject === 'economics' ? '20h' : subject === 'businessManagement' ? '20h' : '10h'}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Duration</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Assessment Criteria Tables */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Assessment Criteria Breakdown</h3>
        {criteriaData.criteria.map((criterion, index) => (
          <GradingCriteriaTable key={index} criterion={criterion} />
        ))}
      </div>

      {/* Additional Information for Economics */}
      {subject === 'economics' && (
        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            Portfolio Structure
          </h3>
          <div className="space-y-3 text-sm">
            <p>The Economics IA consists of a portfolio of <strong>three commentaries</strong>, each based on:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>A different unit of the syllabus (excluding Unit 1: Introduction to economics)</li>
              <li>A different source (news article, report, etc.)</li>
              <li>A contemporary article (published within one year before writing)</li>
            </ul>
            <p className="pt-2 border-t mt-4">
              <strong>Word limit:</strong> Each commentary must not exceed <strong>800 words</strong>. 
              Diagrams, labels, tables, equations, and citations are not included in the word count.
            </p>
            <p>
              <strong>Total assessment:</strong> Each commentary is worth 14 marks, plus 3 marks for meeting 
              rubric requirements, for a total of <strong>45 marks</strong>.
            </p>
          </div>
        </Card>
      )}

      {/* Additional Information for Business Management */}
      {subject === 'businessManagement' && (
        <Card className="p-6 bg-muted/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            🏢 Research Project Structure
          </h3>
          <div className="space-y-3 text-sm">
            <p>The Business Management IA is a <strong>business research project</strong> that must:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Integrate one of the four key concepts: <strong>change, creativity, ethics, or sustainability</strong></li>
              <li>Include <strong>3-5 supporting documents</strong> that provide depth and range</li>
              <li>Apply relevant business management tools and theories</li>
              <li>Analyze and evaluate data from supporting documents</li>
            </ul>
            <p className="pt-2 border-t mt-4">
              <strong>Word limit:</strong> 2,000 words maximum
            </p>
            <p>
              <strong>Duration:</strong> 20 hours of teaching time allocated
            </p>
            <p>
              <strong>Weighting:</strong> 25% of final assessment
            </p>
          </div>
        </Card>
      )}

      {/* Tips Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          Scoring Tips
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Badge className="mt-0.5 bg-destructive">0</Badge>
            <p>Work does not meet minimum standards - focus on understanding basic requirements</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="mt-0.5 bg-warning">1-2</Badge>
            <p>Basic level - shows knowledge but limited application and depth</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="mt-0.5 bg-primary">3-4</Badge>
            <p>Satisfactory level - demonstrates understanding with some analysis</p>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="mt-0.5 bg-success">5-6</Badge>
            <p>Excellent level - shows thorough analysis, clear explanation, and strong integration</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SubjectCriteriaDisplay;
