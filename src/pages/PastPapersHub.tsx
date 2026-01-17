import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { 
  Library,
  Calendar,
  FolderOpen,
  FileText,
  Globe
} from "lucide-react";

export default function PastPapersHub() {
  const navigate = useNavigate();

  // Redirect directly to the library
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton fallbackPath="/work" />
        </div>

        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600">
              <Library className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            📚 IB Papers Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Browse the complete collection of IB past papers and specimen papers
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-xl">
            <Calendar className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm text-muted-foreground text-center">All Years</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-xl">
            <FolderOpen className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm text-muted-foreground text-center">All Subjects</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-xl">
            <FileText className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm text-muted-foreground text-center">Past Papers</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted/30 rounded-xl">
            <Globe className="h-8 w-8 text-orange-500 mb-2" />
            <span className="text-sm text-muted-foreground text-center">Specimen Papers</span>
          </div>
        </div>

        {/* Open Button */}
        <button
          onClick={() => navigate("/work/past-papers/library")}
          className="w-full py-4 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
        >
          <Library className="h-5 w-5" />
          Open Papers Library
        </button>
      </div>
    </div>
  );
}
