import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssessmentCriterion } from "@/data/iaCriteriaData";
import "./GradingCriteriaTable.css";

interface GradingCriteriaTableProps {
  criterion: AssessmentCriterion;
}

export function GradingCriteriaTable({ criterion }: GradingCriteriaTableProps) {
  return (
    <Card className="grading-criteria-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{criterion.name}</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{criterion.maxMarks} marks</Badge>
            <Badge variant="outline">{criterion.weighting}%</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grading-criteria-table-wrapper">
          <table className="grading-criteria-table">
            <thead>
              <tr>
                <th className="marks-column">Marks</th>
                <th className="descriptor-column">Level Descriptor</th>
              </tr>
            </thead>
            <tbody>
              {criterion.levels.map((level, index) => (
                <tr key={index} className={`level-${level.marks.replace('-', '_')}`}>
                  <td className="marks-cell">
                    <span className="marks-badge">{level.marks}</span>
                  </td>
                  <td className="descriptor-cell">
                    <div className="descriptor-content">
                      {level.descriptor.split('\n').map((line, i) => (
                        <p key={i} className={line.startsWith('•') ? 'bullet-point' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {criterion.clarifications && (
          <div className="clarifications-section">
            <h4 className="clarifications-title">Clarifications</h4>
            <div className="clarifications-content">
              {criterion.clarifications.split('\n\n').map((paragraph, i) => (
                <div key={i} className="clarification-paragraph">
                  {paragraph.split('\n').map((line, j) => (
                    <p key={j} className={line.startsWith('•') ? 'bullet-point' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
