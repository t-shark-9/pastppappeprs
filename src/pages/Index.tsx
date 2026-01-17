import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { BookOpen, PenLine, Lightbulb, FileText, CheckCircle2, ArrowRight, Loader2, LogIn, MessageSquare, Menu, Info, Target, Mail, GraduationCap, Award, Download } from "lucide-react";
import { PreviewPlanningSection } from "@/components/preview/PreviewPlanningSection";
import { PreviewOutlineSection } from "@/components/preview/PreviewOutlineSection";
import { PreviewDraftSection } from "@/components/preview/PreviewDraftSection";
import { PreviewAIFeatures } from "@/components/preview/PreviewAIFeatures";
import { useGhostSession } from "@/contexts/GhostSessionContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createGhostAssignment } = useGhostSession();
  const [creatingGhost, setCreatingGhost] = useState(false);
  const isMobile = useIsMobile();

  const handleGetStarted = () => {
    navigate("/work");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      
      {/* Hero Section */}
      <div className="container max-w-6xl mx-auto px-6 py-16 space-y-16">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Making Writing Essays Too EASY
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} disabled={creatingGhost}>
              {creatingGhost ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Start Writing
                  <PenLine className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/download")}>
              <Download className="mr-2 h-5 w-5" />
              Download App
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-6 w-6" />
                      <CardTitle className="text-lg">1. Plan</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Define your thesis, audience, and key questions. Get Socratic prompts to sharpen your thinking.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6" />
                      <CardTitle className="text-lg">2. Outline</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Build your essay structure with draggable sections. AI suggests improvements without writing for you.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <PenLine className="h-6 w-6" />
                      <CardTitle className="text-lg">3. Draft</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Write with LaTeX math support, inline AI commands (/define, /explain), and rich formatting.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="shadow-soft hover:shadow-medium transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6" />
                      <CardTitle className="text-lg">4. Review</CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Get rubric-aligned feedback highlighting strengths and top 3 fixes with actionable micro-scaffolds.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What You Can Do</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Block-Based Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">LaTeX equations (inline and block)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">Images, tables, and drawings</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">Drag-and-drop reordering</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">Auto table of contents</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>AI Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">/define - Quick definitions</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">/explain - Concept clarification</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">/synonym - Word alternatives</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">/drawing - Add illustrations</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Document Import</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">HTML files with images</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">Markdown documents</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">ZIP archives (Google Docs)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <p className="text-sm">Auto image upload & linking</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Previews */}
        <div className="space-y-6 mt-16">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">See It In Action</h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <PreviewPlanningSection />
            <PreviewOutlineSection />
            <PreviewDraftSection />
            <PreviewAIFeatures />
          </div>

          <div className="text-center">
            <Button size="lg" onClick={handleGetStarted} disabled={creatingGhost}>
              {creatingGhost ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Try the Full Experience
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="py-16 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">IB Resources at Your Fingertips</h2>
            <p className="text-xl text-muted-foreground">
              Access comprehensive guides and data for your IB journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Grade Your Work - Featured */}
            <Card className="shadow-soft hover:shadow-md transition-shadow cursor-pointer border-primary/30 bg-primary/5" onClick={() => navigate("/grade")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Grade Your Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload your essay or IA and get instant AI feedback based on official IB assessment criteria.
                </p>
                <div className="flex items-center text-primary font-medium">
                  <span>Get Feedback Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/homepage/grade-boundaries")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Grade Boundaries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive grade boundaries for all IB subjects. Know exactly what scores you need for each grade level.
                </p>
                <div className="flex items-center text-primary font-medium">
                  <span>Explore All Subjects</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("/homepage/ia-guides")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  IA Writing Guides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Master your Internal Assessments with detailed guides, assessment criteria, and expert tips for every subject.
                </p>
                <div className="flex items-center text-primary font-medium">
                  <span>Start Your IA Journey</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer / Imprint */}
      <footer className="bg-black text-white py-12 mt-16">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="font-bold text-lg mb-4">IBDP Guide</h3>
              <p className="text-sm text-gray-400">
                Your comprehensive platform for IB Diploma Programme assignments, research, and academic excellence.
              </p>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/work')} className="text-gray-400 hover:text-white transition-colors">
                    Work
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/work/books')} className="text-gray-400 hover:text-white transition-colors">
                    Books
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/work/notes')} className="text-gray-400 hover:text-white transition-colors">
                    Notes
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/homepage/us/about')} className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/us/plan')} className="text-gray-400 hover:text-white transition-colors">
                    Our Plan
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/blog/essay-guide')} className="text-gray-400 hover:text-white transition-colors">
                    How to Write Essays
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/speed-reader')} className="text-gray-400 hover:text-white transition-colors">
                    Speed Reader
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/us/improvements')} className="text-gray-400 hover:text-white transition-colors">
                    Feedback
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/us/contact')} className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/grade-boundaries')} className="text-gray-400 hover:text-white transition-colors">
                    Grade Boundaries
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/ia-guides')} className="text-gray-400 hover:text-white transition-colors">
                    IA Writing Guides
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/blog/ia-experience')} className="text-gray-400 hover:text-white transition-colors">
                    IA Experience
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/blog/exam-resources')} className="text-gray-400 hover:text-white transition-colors">
                    Exam Resources
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/blog/educational-systems')} className="text-gray-400 hover:text-white transition-colors">
                    Educational Systems
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => navigate('/homepage/legal/privacy')} className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/legal/terms')} className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/homepage/legal/imprint')} className="text-gray-400 hover:text-white transition-colors">
                    Imprint
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} IBDP Guide. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Designed for International Baccalaureate Diploma Programme students worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
