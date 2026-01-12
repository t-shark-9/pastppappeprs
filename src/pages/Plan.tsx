import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";

export default function Plan() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Header */}
        <div className="flex items-center gap-4">
          <BackButton
            fallbackPath="/"
            size="icon"
            tooltip="Back"
          />
          <h1 className="text-4xl md:text-5xl font-bold">Our Plan</h1>
        </div>

        {/* Mission Statement */}
        <Card className="shadow-medium border-primary/20">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    We believe that IB students deserve better tools to succeed in their academic journey. 
                    The International Baccalaureate program is challenging, demanding, and often overwhelming. 
                    Our goal is simple: <span className="font-semibold text-foreground">make IB students' lives easier</span> by 
                    providing intelligent, AI-powered assistance that guides them through every step of their writing process.
                  </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Vision</h2>
          
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Become the Go-To Platform for IB Students</h3>
                <p className="text-muted-foreground leading-relaxed">
                    We're building more than just a writing tool. Our vision is to create a comprehensive platform that 
                    supports IB students throughout their entire academic journey—from Extended Essays to Internal 
                    Assessments, from note-taking to exam preparation.
                  </p>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">What's Next</h2>
          
          <div className="space-y-4">
            <Card className="shadow-soft border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 1: Core Writing Platform (Current)</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>AI-powered planning, outlining, and drafting tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Block-based editor with LaTeX, tables, and images</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>Guest access with local storage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>IB guide resources and grading criteria</span>
                      </li>
                    </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 2: Enhanced Learning Tools (Coming Soon)</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent-foreground mt-1">○</span>
                        <span>Advanced flashcard system with spaced repetition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-foreground mt-1">○</span>
                        <span>Citation management and bibliography generation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-foreground mt-1">○</span>
                        <span>Collaborative features for peer review</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent-foreground mt-1">○</span>
                        <span>Subject-specific templates and examples</span>
                      </li>
                    </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-l-4 border-l-success">
              <CardContent className="pt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phase 3: Complete IB Ecosystem (Future)</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">○</span>
                        <span>CAS tracking and reflection tools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">○</span>
                        <span>TOK knowledge questions generator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">○</span>
                        <span>Exam preparation and practice questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-success mt-1">○</span>
                        <span>Mobile app for on-the-go studying</span>
                      </li>
                    </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Driven */}
        <Card className="shadow-medium bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Built With Student Feedback</h3>
              <p className="text-muted-foreground leading-relaxed">
                  Our roadmap is shaped by IB students like you. We actively listen to your suggestions and 
                  prioritize features that will make the biggest impact on your academic success. Your feedback 
                  directly influences what we build next.
                </p>
                <Button onClick={() => navigate('/homepage/improvements')} className="mt-4">
                  Share Your Ideas
                </Button>
              </div>
            </CardContent>
          </Card>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Join Us on This Journey</h2>
          <p className="text-muted-foreground">
            Be part of building the future of IB education.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/work")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
