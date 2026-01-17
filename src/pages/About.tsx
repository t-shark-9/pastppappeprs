import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";

export default function About() {
  const navigate = useNavigate();

  return (
    <ArticleWrapper
      title="About TooEssay - AI-Powered IB Essay Writing Platform"
      description="Learn about TooEssay, the AI-powered essay writing platform designed specifically for IB Diploma Programme students. Discover our mission, features, and philosophy."
      datePublished="2024-01-01T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="About Us"
      keywords={[
        "TooEssay",
        "IB writing platform",
        "AI essay assistant",
        "IB Diploma Programme",
        "academic writing tools",
        "essay writing help"
      ]}
    >
      <BackButton fallbackPath="/" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-5xl font-bold">About Us</h1>
        </div>
      </header>

      <div className="space-y-12">
        {/* What We Do */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">
            What We Offer
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border-l-4 border-blue-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Writing Assistant</h3>
              <p className="leading-relaxed">
                Get intelligent suggestions and Socratic prompts that help you think deeper about your topics. 
                Our AI doesn't write for you—it coaches you to become a better writer.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-3">Structured Writing Process</h3>
              <p className="leading-relaxed">
                From planning to outlining to drafting—we guide you through each stage with purpose-built 
                tools that match how great essays are actually written.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-3">Advanced Block Editor</h3>
              <p className="leading-relaxed">
                Write with a modern, distraction-free editor that supports LaTeX equations, tables, images, 
                and AI commands—all in one seamless experience.
              </p>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-3">IB-Specific Resources</h3>
              <p className="leading-relaxed">
                Access official IB guides, subject-specific resources, and grading criteria—all organized 
                and easily searchable in one place.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-6 py-4">
              <h3 className="text-xl font-semibold mb-3">Smart Note-Taking</h3>
              <p className="leading-relaxed">
                Create notes with our block-based editor and generate flashcards automatically. 
                Study smarter with AI-powered learning tools.
              </p>
            </div>

            <div className="border-l-4 border-accent pl-6 py-4">
              <h3 className="text-xl font-semibold mb-3">Guest Access</h3>
              <p className="leading-relaxed">
                Try everything without signing up. Your work is saved locally, and you can create an account 
                later to sync across devices.
              </p>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            Our Philosophy
          </h2>
          
          <div className="bg-gradient-to-br from-primary/5 to-green-500/5 p-8 rounded-lg border-l-4 border-primary">
            <p className="text-lg mb-6">
              We don't believe in AI that writes essays for you. Instead, we've built a platform that:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span className="text-lg">
                  <strong className="font-semibold">Teaches critical thinking</strong> through Socratic questioning
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span className="text-lg">
                  <strong className="font-semibold">Guides your process</strong> without doing the work for you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span className="text-lg">
                  <strong className="font-semibold">Respects academic integrity</strong> while providing powerful assistance
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1.5">•</span>
                <span className="text-lg">
                  <strong className="font-semibold">Makes complex tools accessible</strong> to all IB students
                </span>
              </li>
            </ul>
            <p className="text-lg mt-8">
              Our platform is designed to help you develop the skills that will serve you long after the IB—critical 
              thinking, structured argumentation, and clear communication.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="text-center space-y-6 bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join IB students who are writing better essays with less stress.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button size="lg" onClick={() => navigate("/work")}>
                Start Writing
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    </ArticleWrapper>
  );
}
