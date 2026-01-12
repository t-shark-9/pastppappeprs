import { BackButton } from "@/components/ui/back-button";
import { CheckCircle, PenTool } from "lucide-react";
import { ArticleWrapper } from "@/components/seo/ArticleWrapper";

export default function HowToWriteEssay() {
  return (
    <ArticleWrapper
      title="How to Write a Good Essay - Complete IB Writing Guide"
      description="Master the art of essay writing with our comprehensive guide tailored for IB students. Learn structure, argumentation, and evidence-based writing techniques."
      datePublished="2024-01-15T00:00:00Z"
      dateModified="2024-12-24T00:00:00Z"
      category="IB Writing Guides"
      keywords={[
        "IB essay writing",
        "academic writing",
        "essay structure",
        "thesis statement",
        "extended essay",
        "TOK essay",
        "IB Diploma",
        "writing guide"
      ]}
    >
      <BackButton fallbackPath="/work" className="mb-6" />
      
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <PenTool className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold">How to Write a Good Essay</h1>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Master the art of essay writing with our comprehensive guide tailored for IB students.
        </p>
      </header>

      <div className="space-y-12">
        {/* Introduction */}
        <section>
          <p className="text-lg leading-relaxed mb-6">
            Writing a strong essay requires more than just good grammar—it demands clear thinking, 
            structured arguments, and compelling evidence. Whether you're working on an IB Extended Essay, 
            TOK essay, or subject-specific assignment, these principles will guide you to success.
          </p>
          <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
            <p className="font-medium">
              <strong>Remember:</strong> A great essay is not just about what you write, but how you think. 
              Focus on developing a clear argument and supporting it with evidence.
            </p>
          </div>
        </section>

        {/* Step 1 */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
            1. Understanding the Question
          </h2>
          <p className="text-lg mb-6">Break down the prompt to know exactly what's being asked.</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Identify Command Terms</h3>
              <p className="leading-relaxed">
                Look for words like "analyze," "evaluate," "discuss," or "compare." Each requires a different approach.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Highlight Key Terms</h3>
              <p className="leading-relaxed">
                Underline the main concepts and themes. These will guide your research and argument.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Define the Scope</h3>
              <p className="leading-relaxed">
                Understand any limitations—time period, geographical area, or specific perspectives you need to consider.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-green-600 dark:text-green-400">
            2. Research and Planning
          </h2>
          <p className="text-lg mb-6">Gather evidence and organize your thoughts.</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Start with Quality Sources</h3>
              <p className="leading-relaxed">
                Use academic journals, official IB resources, and credible books. Avoid relying solely on Wikipedia or unreliable websites.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Take Organized Notes</h3>
              <p className="leading-relaxed">
                Record key quotes, statistics, and ideas. Always note the source for proper citations later.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Create an Outline</h3>
              <p className="leading-relaxed">
                Map out your main argument, supporting points, and evidence. A strong outline makes writing much easier.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400">
            3. Writing Your Essay
          </h2>
          <p className="text-lg mb-6">Transform your ideas into a compelling argument.</p>
          
          <div className="space-y-8">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Introduction</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-purple-500" />
                  <span>Hook the reader with an engaging opening sentence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-purple-500" />
                  <span>Provide necessary background context</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-purple-500" />
                  <span>Present a clear thesis statement that answers the question</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-purple-500" />
                  <span>Outline the structure of your essay</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-semibold mb-4 text-orange-600 dark:text-orange-400">Body Paragraphs</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-orange-500" />
                  <span><strong>Topic sentence:</strong> Start each paragraph with a clear point</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-orange-500" />
                  <span><strong>Evidence:</strong> Support your point with quotes, data, or examples</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-orange-500" />
                  <span><strong>Analysis:</strong> Explain how the evidence supports your argument</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-orange-500" />
                  <span><strong>Link:</strong> Connect back to your thesis and transition to the next point</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-pink-500 pl-6">
              <h3 className="text-2xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Conclusion</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-pink-500" />
                  <span>Restate your thesis in new words</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-pink-500" />
                  <span>Summarize your main arguments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-pink-500" />
                  <span>Offer final insights or implications</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0 text-pink-500" />
                  <span>Leave the reader with something to think about</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-400">
            4. Revision and Polish
          </h2>
          <p className="text-lg mb-6">Refine your work to achieve excellence.</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Check Your Argument</h3>
              <p className="leading-relaxed">
                Does each paragraph support your thesis? Remove anything that doesn't strengthen your argument.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Verify Evidence</h3>
              <p className="leading-relaxed">
                Check all citations are correct and properly formatted. Ensure you've credited all sources.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Polish Language</h3>
              <p className="leading-relaxed">
                Fix grammar, spelling, and punctuation. Read aloud to catch awkward phrasing. Use varied sentence structures.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Get Feedback</h3>
              <p className="leading-relaxed">
                Have someone else read your essay. Fresh eyes catch mistakes and unclear arguments.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-lg border-l-4 border-yellow-500">
          <h2 className="text-2xl font-bold mb-6">Pro Tips for IB Essays</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Use Academic Language</h3>
              <p>
                Avoid informal language and contractions. Write in third person when possible.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Show Critical Thinking</h3>
              <p>
                Don't just describe—analyze. Question assumptions and explore multiple perspectives.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Follow Rubric Criteria</h3>
              <p>
                Know your assessment criteria. Structure your essay to meet each requirement.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Manage Your Time</h3>
              <p>
                Start early. Break the work into stages and set deadlines for each.
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="bg-red-50 dark:bg-red-900/10 p-8 rounded-lg border-l-4 border-red-500">
          <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">Common Mistakes to Avoid</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold text-xl">✗</span>
              <span>Writing without a clear plan or structure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold text-xl">✗</span>
              <span>Including irrelevant information that doesn't support your argument</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold text-xl">✗</span>
              <span>Using evidence without explaining its significance</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold text-xl">✗</span>
              <span>Plagiarizing or improperly citing sources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold text-xl">✗</span>
              <span>Introducing new ideas in the conclusion</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 dark:text-red-400 font-bold text-xl">✗</span>
              <span>Submitting without proofreading</span>
            </li>
          </ul>
        </section>
      </div>
    </ArticleWrapper>
  );
}
