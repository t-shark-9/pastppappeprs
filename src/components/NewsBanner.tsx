import { X } from "lucide-react";
import { useState } from "react";

export const NewsBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white py-2 overflow-hidden">
      <button
        onClick={handleDismiss}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hover:bg-white/20 rounded p-1 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="animate-marquee whitespace-nowrap inline-block">
        <span className="mx-8 text-sm font-medium">
          NEWS! Math equations try /inline math or /block math • Molecules try /molecule • New feedback page • AI functions try /define, /explain, /synonym
        </span>
        <span className="mx-8 text-sm font-medium">
          NEWS! Math equations try /inline math or /block math • Molecules try /molecule • New feedback page • AI functions try /define, /explain, /synonym
        </span>
      </div>
    </div>
  );
};
