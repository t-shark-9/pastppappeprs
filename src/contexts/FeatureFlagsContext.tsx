import React, { createContext, useContext, useState, useEffect } from "react";

interface FeatureFlags {
  pdfDownload: boolean;
  equationEditor: boolean;
  draggableBullets: boolean;
  themeToggle: boolean;
  standingToolbar: boolean;
  // Panel visibility
  showLeftPanel: boolean;
  showRightPanel: boolean;
  // Menu header visibility
  showMenuHeader: boolean;
  // Floating formatting toolbar
  showFloatingToolbar: boolean;
}

interface FeatureFlagsContextType {
  flags: FeatureFlags;
  updateFlag: (flag: keyof FeatureFlags, value: boolean) => void;
  resetToDefaults: () => void;
}

const defaultFlags: FeatureFlags = {
  pdfDownload: true,
  equationEditor: true,
  draggableBullets: true,
  themeToggle: true,
  standingToolbar: false,
  showLeftPanel: true,
  showRightPanel: true,
  showMenuHeader: true,
  showFloatingToolbar: true,
};

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export function FeatureFlagsProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    const stored = localStorage.getItem('tooessay-feature-flags');
    return stored ? { ...defaultFlags, ...JSON.parse(stored) } : defaultFlags;
  });

  useEffect(() => {
    localStorage.setItem('tooessay-feature-flags', JSON.stringify(flags));
  }, [flags]);

  const updateFlag = (flag: keyof FeatureFlags, value: boolean) => {
    setFlags(prev => ({
      ...prev,
      [flag]: value
    }));
  };

  const resetToDefaults = () => {
    setFlags(defaultFlags);
    localStorage.removeItem('tooessay-feature-flags');
  };

  return (
    <FeatureFlagsContext.Provider value={{
      flags,
      updateFlag,
      resetToDefaults,
    }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider');
  }
  return context;
}