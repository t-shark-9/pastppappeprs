import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import { GhostSessionProvider } from "@/contexts/GhostSessionContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FeatureFlagsProvider } from "@/contexts/FeatureFlagsContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteLoadingFallback } from "@/components/RouteLoadingFallback";
import { UnsavedBanner } from "@/components/UnsavedBanner";
import { GlobalHeader } from "@/components/GlobalHeader";
import { LanguageInitializer } from "@/components/LanguageInitializer";

// Lazy load all pages for code splitting
const Auth = lazy(() => import("./pages/Auth"));
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateAssignment = lazy(() => import("./pages/CreateAssignment"));
const Assignment = lazy(() => import("./pages/Assignment"));
const IdeaBuilder = lazy(() => import("./pages/IdeaBuilder"));
const Outline = lazy(() => import("./pages/Outline"));
const Draft = lazy(() => import("./pages/Draft"));
const SimpleDraft = lazy(() => import("./pages/SimpleDraft"));
const Drawings = lazy(() => import("./pages/Drawings"));
const NotesDashboard = lazy(() => import("./pages/NotesDashboard"));
const NotesEditor = lazy(() => import("./pages/NotesEditor"));
const AssignmentsDashboard = lazy(() => import("./pages/AssignmentsDashboard"));
const Study = lazy(() => import("./pages/Study"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const Improvements = lazy(() => import("./pages/Improvements"));
const Molecule = lazy(() => import("./pages/Molecule"));
const Books = lazy(() => import("./pages/Books"));
const HowToWriteEssay = lazy(() => import("./pages/HowToWriteEssay"));
const NotionWritingGuide = lazy(() => import("./pages/NotionWritingGuide"));
const SpeedReader = lazy(() => import("./pages/SpeedReader"));
const PastPapersHub = lazy(() => import("./pages/PastPapersHub"));
const PastPapers = lazy(() => import("./pages/PastPapersNew"));
const PastPapersAI = lazy(() => import("./pages/PastPapers"));
const PastPapersBrowser = lazy(() => import("./pages/PastPapersBrowser"));
const PastPapersQuestions = lazy(() => import("./pages/PastPapersQuestions"));
const Trash = lazy(() => import("./pages/Trash"));
const Admin = lazy(() => import("./pages/Admin"));
const ImportPastPapers = lazy(() => import("./pages/admin/ImportPastPapers"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const About = lazy(() => import("./pages/About"));
const Plan = lazy(() => import("./pages/Plan"));
const Imprint = lazy(() => import("./pages/Imprint"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Contact = lazy(() => import("./pages/Contact"));
const Documentation = lazy(() => import("./pages/Documentation"));
const GradeBoundaries = lazy(() => import("./pages/GradeBoundaries"));
const EducationalSystems = lazy(() => import("./pages/EducationalSystems"));
const GradingCriteriaSections = lazy(() => import("./pages/GradingCriteriaSections"));
const IAGuides = lazy(() => import("./pages/IAGuides"));
const IAWritingGuide = lazy(() => import("./pages/IAWritingGuide"));
const IAExperience = lazy(() => import("./pages/IAExperience"));
const IAStructureGuide = lazy(() => import("./pages/IAStructureGuide"));
const ExtendedEssayGuide = lazy(() => import("./pages/ExtendedEssayGuide"));
const TheoryOfKnowledgeGuide = lazy(() => import("./pages/TheoryOfKnowledgeGuide"));
const ExamResources = lazy(() => import("./pages/ExamResources"));
const EnglishALiteratureGradeBoundaries = lazy(() => import("./pages/grade-boundaries/EnglishALiterature"));
const BiologyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Biology"));
const ChemistryGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Chemistry"));
const PhysicsGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Physics"));
const MathAAGradeBoundaries = lazy(() => import("./pages/grade-boundaries/MathAA"));
const MathAIGradeBoundaries = lazy(() => import("./pages/grade-boundaries/MathAI"));
const GeographyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Geography"));
const ESSGradeBoundaries = lazy(() => import("./pages/grade-boundaries/ESS"));
const VisualArtsGradeBoundaries = lazy(() => import("./pages/grade-boundaries/VisualArts"));
const ComputerScienceGradeBoundaries = lazy(() => import("./pages/grade-boundaries/ComputerScience"));
const DesignTechnologyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/DesignTechnology"));
const SEHSGradeBoundaries = lazy(() => import("./pages/grade-boundaries/SEHS"));
const MusicGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Music"));
const FilmGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Film"));
const TheatreGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Theatre"));
const DanceGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Dance"));
const GlobalPoliticsGradeBoundaries = lazy(() => import("./pages/grade-boundaries/GlobalPolitics"));
const PhilosophyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Philosophy"));
const AnthropologyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Anthropology"));
const WorldReligionsGradeBoundaries = lazy(() => import("./pages/grade-boundaries/WorldReligions"));
const DigitalSocietyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/DigitalSociety"));
const HistoryGradeBoundaries = lazy(() => import("./pages/grade-boundaries/History"));
const EconomicsGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Economics"));
const BusinessManagementGradeBoundaries = lazy(() => import("./pages/grade-boundaries/BusinessManagement"));
const PsychologyGradeBoundaries = lazy(() => import("./pages/grade-boundaries/Psychology"));
const LanguageBGradeBoundaries = lazy(() => import("./pages/grade-boundaries/LanguageB"));
const EnglishALanguageAndLiteratureGradeBoundaries = lazy(() => import("./pages/grade-boundaries/EnglishALanguageAndLiterature"));
const LanguageALiteraturePerformanceGradeBoundaries = lazy(() => import("./pages/grade-boundaries/LanguageALiteraturePerformance"));
const ClassicalLanguagesGradeBoundaries = lazy(() => import("./pages/grade-boundaries/ClassicalLanguages"));
const LanguageAbInitioGradeBoundaries = lazy(() => import("./pages/grade-boundaries/LanguageAbInitio"));
const TOKGradeBoundaries = lazy(() => import("./pages/grade-boundaries/TOK"));
const ExtendedEssayGradeBoundaries = lazy(() => import("./pages/grade-boundaries/ExtendedEssay"));
const Us = lazy(() => import("./pages/Us"));
const Legal = lazy(() => import("./pages/Legal"));
const Blog = lazy(() => import("./pages/Blog"));
const Download = lazy(() => import("./pages/Download"));
const DynamicBlogPost = lazy(() => import("./pages/DynamicBlogPost"));
const WhyConfidenceIsBuiltThroughInterpretationNotMemorisation = lazy(() => import("./pages/WhyConfidenceIsBuiltThroughInterpretationNotMemorisation"));
const WordClone = lazy(() => import("./pages/WordClone"));
const GradeYourWork = lazy(() => import("./pages/GradeYourWork"));
const StudyPlanner = lazy(() => import("./pages/StudyPlanner"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <FeatureFlagsProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <GhostSessionProvider>
                <AuthProvider>
                  <LanguageInitializer />
                  <UnsavedBanner />
                  <GlobalHeader />
                  <div className="pt-9">
                    <Suspense fallback={<RouteLoadingFallback />}>
                      <Routes>
                        {/* Auth */}
                        <Route path="/auth" element={<Auth />} />
                        
                        {/* Homepage */}
                        <Route path="/" element={<Index />} />
                        <Route path="/homepage/grade" element={<GradeYourWork />} />
                        <Route path="/grade" element={<GradeYourWork />} /> {/* legacy alias */}
                        {/* Work Area (formerly Dashboard) */}
                        <Route path="/work" element={<Dashboard />} />
                        <Route path="/work/assignment/new" element={<CreateAssignment />} />
                        <Route path="/work/assignment/:id" element={<Assignment />} />
                        <Route path="/work/assignment/:id/plan" element={<IdeaBuilder />} />
                        <Route path="/work/assignment/:id/outline" element={<Outline />} />
                        <Route path="/work/assignment/:id/draft" element={<Draft />} />
                        <Route path="/work/assignment/:id/simple-draft" element={<SimpleDraft />} />
                        <Route path="/work/draft" element={<Draft />} />
                        <Route path="/work/drawings" element={<Drawings />} />
                        <Route path="/work/assignments" element={<AssignmentsDashboard />} />
                        <Route path="/work/notes" element={<NotesDashboard />} />
                        <Route path="/work/notes/edit/:noteId" element={<NotesEditor />} />
                        <Route path="/work/past-papers" element={<PastPapersHub />} />
                        <Route path="/work/past-papers/library" element={<PastPapersBrowser />} />
                        
                        {/* Prototype routes - features under development */}
                        <Route path="/prototype/past-papers/browse" element={<PastPapers />} />
                        <Route path="/prototype/past-papers/ai" element={<PastPapersAI />} />
                        
                        <Route path="/work/study" element={<Study />} />
                        <Route path="/work/flashcards" element={<Flashcards />} />
                        <Route path="/work/word-clone" element={<WordClone />} />
                        <Route path="/work/molecule" element={<Molecule />} />
                        <Route path="/molecule" element={<Molecule />} />
                        <Route path="/work/books" element={<Books />} />
                        <Route path="/work/docs" element={<Documentation />} />
                        <Route path="/work/trash" element={<Trash />} />
                        <Route path="/work/settings" element={<Settings />} />
                        <Route path="/work/account" element={<Account />} />
                        
                        {/* Admin */}
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/admin/import-past-papers" element={<ImportPastPapers />} />
                        
                        {/* Prototype - Download Desktop App */}
                        <Route path="/prototype" element={<Download />} />
                        
                        {/* Us Section */}
                        <Route path="/homepage/us" element={<Us />} />
                        <Route path="/homepage/us/about" element={<About />} />
                        <Route path="/homepage/us/plan" element={<Plan />} />
                        <Route path="/homepage/us/contact" element={<Contact />} />
                        <Route path="/homepage/us/improvements" element={<Improvements />} />
                        
                        {/* Legal Section */}
                        <Route path="/homepage/legal" element={<Legal />} />
                        <Route path="/homepage/legal/privacy" element={<Privacy />} />
                        <Route path="/homepage/legal/terms" element={<Terms />} />
                        <Route path="/homepage/legal/imprint" element={<Imprint />} />
                        
                        {/* Blog Section */}
                        <Route path="/homepage/blog" element={<Blog />} />
                        <Route path="/homepage/blog/essay-guide" element={<HowToWriteEssay />} />
                        <Route path="/homepage/blog/ia-experience" element={<IAExperience />} />
                        <Route path="/homepage/blog/exam-resources" element={<ExamResources />} />
                        <Route path="/homepage/blog/educational-systems" element={<EducationalSystems />} />
                        <Route path="/homepage/blog/interpretation-not-memorisation" element={<WhyConfidenceIsBuiltThroughInterpretationNotMemorisation />} />
                        <Route path="/homepage/blog/:slug" element={<DynamicBlogPost />} />
                        
                        {/* Tools */}
                        <Route path="/homepage/speed-reader" element={<SpeedReader />} />
                        <Route path="/homepage/past-papers-questions" element={<PastPapersQuestions />} />
                        <Route path="/past-papers-questions" element={<PastPapersQuestions />} />
                        <Route path="/homepage/notion-writing-guide" element={<NotionWritingGuide />} />
                        <Route path="/homepage/study-planner" element={<StudyPlanner />} />
                        
                        {/* Legacy routes for backward compatibility */}
                        <Route path="/homepage/about" element={<About />} />
                        <Route path="/homepage/plan" element={<Plan />} />
                        <Route path="/homepage/how-to-write-essay" element={<HowToWriteEssay />} />
                        <Route path="/homepage/essay-guide" element={<HowToWriteEssay />} />
                        <Route path="/homepage/improvements" element={<Improvements />} />
                        <Route path="/homepage/imprint" element={<Imprint />} />
                        <Route path="/homepage/privacy" element={<Privacy />} />
                        <Route path="/homepage/terms" element={<Terms />} />
                        <Route path="/homepage/contact" element={<Contact />} />
                        <Route path="/homepage/educational-systems" element={<EducationalSystems />} />
                        <Route path="/homepage/ia-experience" element={<IAExperience />} />
                        <Route path="/homepage/exam-resources" element={<ExamResources />} />
                        
                        {/* Grade Boundaries */}
                        <Route path="/homepage/grade-boundaries" element={<GradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/:subject/criteria" element={<GradingCriteriaSections />} />
                        <Route path="/homepage/grade-boundaries/:subject/criteria/:theme/:topic" element={<GradingCriteriaSections />} />
                        <Route path="/homepage/grade-boundaries/english-a-literature" element={<EnglishALiteratureGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/biology" element={<BiologyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/chemistry" element={<ChemistryGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/physics" element={<PhysicsGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/math-aa" element={<MathAAGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/math-ai" element={<MathAIGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/geography" element={<GeographyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/ess" element={<ESSGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/visual-arts" element={<VisualArtsGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/computer-science" element={<ComputerScienceGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/design-technology" element={<DesignTechnologyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/sehs" element={<SEHSGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/music" element={<MusicGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/film" element={<FilmGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/theatre" element={<TheatreGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/dance" element={<DanceGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/global-politics" element={<GlobalPoliticsGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/philosophy" element={<PhilosophyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/anthropology" element={<AnthropologyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/world-religions" element={<WorldReligionsGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/digital-society" element={<DigitalSocietyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/history" element={<HistoryGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/economics" element={<EconomicsGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/business-management" element={<BusinessManagementGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/psychology" element={<PsychologyGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/language-b" element={<LanguageBGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/english-a-language-literature" element={<EnglishALanguageAndLiteratureGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/language-a-literature-performance" element={<LanguageALiteraturePerformanceGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/classical-languages" element={<ClassicalLanguagesGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/ab-initio" element={<LanguageAbInitioGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/tok" element={<TOKGradeBoundaries />} />
                        <Route path="/homepage/grade-boundaries/extended-essay" element={<ExtendedEssayGradeBoundaries />} />
                        
                        {/* IA Guides */}
                        <Route path="/homepage/ia-guides" element={<IAGuides />} />
                        <Route path="/homepage/ia-guides/:subject" element={<IAWritingGuide />} />
                        <Route path="/homepage/ia-guides/:subject/:section" element={<IAWritingGuide />} />
                        <Route path="/homepage/ia-structure" element={<IAStructureGuide />} />
                        <Route path="/homepage/ia-structure/:subject" element={<IAStructureGuide />} />
                        <Route path="/homepage/ia-experience" element={<IAExperience />} />
                        
                        {/* Exam Resources */}
                        <Route path="/homepage/exam-resources" element={<ExamResources />} />
                        
                        {/* Core (EE & TOK) */}
                        <Route path="/homepage/core/extended-essay" element={<ExtendedEssayGuide />} />
                        <Route path="/homepage/core/extended-essay/:section" element={<ExtendedEssayGuide />} />
                        <Route path="/homepage/core/theory-of-knowledge" element={<TheoryOfKnowledgeGuide />} />
                        <Route path="/homepage/core/theory-of-knowledge/:section" element={<TheoryOfKnowledgeGuide />} />
                        
                        {/* Legacy redirects for backward compatibility */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/assignment/*" element={<NotFound />} />
                        <Route path="/settings" element={<Settings />} />
                        
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </div>
                </AuthProvider>
              </GhostSessionProvider>
            </BrowserRouter>
          </TooltipProvider>
        </FeatureFlagsProvider>
      </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
