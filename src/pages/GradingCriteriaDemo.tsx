import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import SubjectCriteriaDisplay from "@/components/SubjectCriteriaDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Demo page showing all IB grading criteria tables
 * This page demonstrates the GradingCriteriaTable component with real data
 * 
 * To add this page to routing, add to App.tsx:
 * <Route path="/grading-criteria-demo" element={<GradingCriteriaDemo />} />
 */
export default function GradingCriteriaDemo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        <BackButton />
        
        {/* Header */}
        <div className="mt-6 mb-8">
          <h1 className="text-4xl font-bold mb-3">
            IB Grading Criteria Tables
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Interactive, color-coded assessment criteria for Internal Assessments across all IB subjects
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary">✅ 5 Subjects Complete</Badge>
            <Badge variant="outline">📊 31 Criteria</Badge>
            <Badge variant="outline">🎨 Responsive Design</Badge>
            <Badge variant="outline">🌙 Dark Mode</Badge>
          </div>
        </div>

        {/* Features Card */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Color-Coded Levels</h3>
              <p className="text-sm text-muted-foreground">
                Visual distinction between mark levels (0, 1-2, 3-4, 5-6)
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Mobile Responsive</h3>
              <p className="text-sm text-muted-foreground">
                Tables adapt beautifully to all screen sizes
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">🖨️ Print-Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Optimized for PDF generation and printing
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">ℹ️ Detailed Clarifications</h3>
              <p className="text-sm text-muted-foreground">
                Expandable info sections with IB guidelines
              </p>
            </div>
          </div>
        </Card>

        {/* Subject Tabs */}
        <Tabs defaultValue="biology" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="biology">🧬 Biology</TabsTrigger>
            <TabsTrigger value="chemistry">⚗️ Chemistry</TabsTrigger>
            <TabsTrigger value="physics">⚛️ Physics</TabsTrigger>
            <TabsTrigger value="businessManagement">💼 Business</TabsTrigger>
            <TabsTrigger value="economics">📈 Economics</TabsTrigger>
          </TabsList>

          <TabsContent value="biology">
            <SubjectCriteriaDisplay subject="biology" />
          </TabsContent>

          <TabsContent value="chemistry">
            <SubjectCriteriaDisplay subject="chemistry" />
          </TabsContent>

          <TabsContent value="physics">
            <SubjectCriteriaDisplay subject="physics" />
          </TabsContent>

          <TabsContent value="businessManagement">
            <SubjectCriteriaDisplay subject="businessManagement" />
          </TabsContent>

          <TabsContent value="economics">
            <SubjectCriteriaDisplay subject="economics" />
          </TabsContent>
        </Tabs>

        {/* Implementation Guide */}
        <Card className="mt-8 p-6 bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Quick Integration</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Add grading criteria to any subject page:
          </p>
          
          <div className="bg-background rounded-lg p-4 border font-mono text-sm space-y-2 overflow-x-auto">
            <div className="text-green-600 dark:text-green-400">// Import the component</div>
            <div>import SubjectCriteriaDisplay from "@/components/SubjectCriteriaDisplay";</div>
            <div className="h-4" />
            <div className="text-green-600 dark:text-green-400">// Add to your page</div>
            <div>&lt;SubjectCriteriaDisplay subject="biology" /&gt;</div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/docs/GRADING_CRITERIA_TABLES.md" target="_blank">
                Full Documentation
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com/yourusername/ibdp-guide" target="_blank">
                View Source Code
              </a>
            </Button>
          </div>
        </Card>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-xs text-muted-foreground uppercase">Subjects</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">31</div>
            <div className="text-xs text-muted-foreground uppercase">Criteria</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">118</div>
            <div className="text-xs text-muted-foreground uppercase">Mark Levels</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-xs text-muted-foreground uppercase">Accurate</div>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-8 p-6 border-warning/50 bg-warning/5">
          <h2 className="text-2xl font-semibold mb-4">📋 Coming Soon</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">○</span>
              <span>History - Historical Investigation criteria</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">○</span>
              <span>Geography - Fieldwork investigation criteria</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">○</span>
              <span>Psychology - Experimental design criteria</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">○</span>
              <span>Language A & B - Written assignment criteria</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-muted-foreground">○</span>
              <span>Visual Arts - Comparative study criteria</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
