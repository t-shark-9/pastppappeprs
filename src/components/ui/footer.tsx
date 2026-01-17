import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t mt-16 py-8 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} TOOEssay</span>
            <span className="hidden md:inline">•</span>
            <button 
              onClick={() => navigate('/homepage/privacy')} 
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate('/homepage/terms')} 
              className="hover:text-foreground transition-colors"
            >
              Terms
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate('/homepage/imprint')} 
              className="hover:text-foreground transition-colors"
            >
              Imprint
            </button>
          </div>
          <div className="text-center md:text-right">
            <p>Made for IB students worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
