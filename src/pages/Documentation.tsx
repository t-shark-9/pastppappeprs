import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, BookOpen, PenLine, Brain, FileText, GraduationCap, Users } from "lucide-react";

export default function Documentation() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground">Guides and resources to help you master the platform.</p>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto grid md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar Navigation */}
        <div className="hidden md:block">
          <Card className="h-full border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  orientation="vertical"
                  className="w-full flex-col h-auto bg-transparent space-y-2"
                >
                  <TabsList className="flex flex-col h-auto items-stretch bg-transparent space-y-1 p-0">
                    <TabsTrigger
                      value="overview"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:text-primary"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="writing"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:text-primary"
                    >
                      <PenLine className="mr-2 h-4 w-4" />
                      Writing Assignments
                    </TabsTrigger>
                    <TabsTrigger
                      value="study"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:text-primary"
                    >
                      <Brain className="mr-2 h-4 w-4" />
                      Study Tools
                    </TabsTrigger>
                    <TabsTrigger
                      value="guides"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:text-primary"
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      IB Subject Guides
                    </TabsTrigger>
                    <TabsTrigger
                      value="resources"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:text-primary"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Past Papers & Resources
                    </TabsTrigger>
                    <TabsTrigger
                      value="account"
                      className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted data-[state=active]:text-primary"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Account & Settings
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* content Area */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to the Platform</CardTitle>
                  <CardDescription>
                    Your all-in-one workspace for IB research, writing, and revision.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our platform is designed to help students streamline their workflow, from brainstorming essay ideas to revising for final exams.
                    Whether you are working on your Extended Essay, Internal Assessments, or preparing for papers, we have tools to support you.
                  </p>
                  <h3 className="text-lg font-semibold">Key Features</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Assignment Builder:</strong> A structured approach to writing essays (Plan, Outline, Draft).</li>
                    <li><strong>Study Tools:</strong> Flashcards, Speed Reader, and Notes.</li>
                    <li><strong>Past Papers:</strong> Access and practice with past examination papers.</li>
                    <li><strong>Grade Boundaries:</strong> Understand what is required to achieve your target grade.</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="writing" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Writing Assignments</CardTitle>
                  <CardDescription>
                    Master the writing process with our structured tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">1. The Idea Builder</h3>
                    <p className="text-muted-foreground">
                      Start here to brainstorm. The Idea Builder helps you generate and refine topics for your essays.
                      Use the "Magic" tools to get AI-powered suggestions based on your subject.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">2. Outlining</h3>
                    <p className="text-muted-foreground">
                      Structure your argument before you write. Drag and drop sections to organize your flow.
                      Each section can be detailed with key points and evidence.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">3. Drafting</h3>
                    <p className="text-muted-foreground">
                      Write your content with our distraction-free editor.
                      Use the "Evaluation" feature to get feedback on specific paragraphs or the whole essay.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="study" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Study Tools</CardTitle>
                  <CardDescription>
                    Boost your revision with active recall and organization tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Flashcards</h3>
                    <p className="text-muted-foreground">
                      Create decks for each subject. Use the AI generator to automatically create flashcards from your notes or topic lists.
                      Practice with spaced repetition to ensure long-term retention.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Notes Dashboard</h3>
                    <p className="text-muted-foreground">
                      Keep all your class notes and research in one place. The block-based editor supports rich text, images, and code snippets.
                      Organize notes by subject for easy retrieval.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Speed Reader</h3>
                    <p className="text-muted-foreground">
                      Train yourself to read faster and more efficiently. Import text and adjust the WPM (Words Per Minute) settings
                      to challenge yourself.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>IB Subject Guides</CardTitle>
                  <CardDescription>
                    Comprehensive guides for Internal Assessments (IA) and Core components.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Internal Assessments (IA)</h3>
                    <p className="text-muted-foreground">
                      We provide detailed structure guides for IAs across various subjects including Biology, Chemistry, Physics, Math AA/AI, Economics, and more.
                      Navigate to the "Guides" section from the homepage to access specific advice for each criterion.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Extended Essay (EE)</h3>
                    <p className="text-muted-foreground">
                      Our EE guide breaks down the 4,000-word essay into manageable stages. Learn about research questions, methodology, and reflection sessions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Theory of Knowledge (TOK)</h3>
                    <p className="text-muted-foreground">
                      Understand the TOK Essay and Exhibition. We offer specialized writing guides to help you unpack the prescribed titles and develop your arguments.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Past Papers & Resources</CardTitle>
                  <CardDescription>
                    Practice with real exam materials.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Past Papers Browser</h3>
                    <p className="text-muted-foreground">
                      Navigate through our extensive archive of past papers. Filter by subject, year, and level (SL/HL).
                      Paper 1, 2, and 3 are available for most major subjects.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Question Bank</h3>
                    <p className="text-muted-foreground">
                      Search for specific questions by topic. Our AI tools can help you:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                      <li><strong>Rewrite:</strong> Change the wording of a question.</li>
                      <li><strong>Simplify:</strong> Make a question easier to understand.</li>
                      <li><strong>Make Harder:</strong> Challenge yourself with a more complex version.</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">
                      Formatted outputs (LaTeX, HTML) are supported for mathematical and scientific questions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Grade Boundaries</h3>
                    <p className="text-muted-foreground">
                      Check the historical grade boundaries for your subjects to understand the score required for a 7.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Account & Settings</CardTitle>
                  <CardDescription>
                    Manage your profile and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Office vs. School Mode</h3>
                    <p className="text-muted-foreground">
                      <strong>Office Mode:</strong> Geared towards general productivity and document management.
                      <br />
                      <strong>School Mode:</strong> Tailored for IB students with specific assignments and subject guides.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Data Privacy</h3>
                    <p className="text-muted-foreground">
                      We take your privacy seriously. Your documents are stored securely. 
                      You can manage your data settings in the Account page.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
