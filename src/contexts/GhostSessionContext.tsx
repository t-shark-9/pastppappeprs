import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type GhostUserType = 'student' | 'teacher' | 'office' | 'private';

interface GhostAssignment {
  id: string;
  title: string;
  subject: string;
  task_type: string;
  status: string;
  created_at: string;
  updated_at?: string;
  deadline?: string;
  schoolProgram?: string;
  draft_content?: string;
  plan?: any;
  outline?: any;
  draft?: any;
}

interface GhostSessionContextType {
  ghostSessionId: string | null;
  isGhostMode: boolean;
  isGhostLoading: boolean;
  ghostUserType: GhostUserType;
  setGhostUserType: (type: GhostUserType) => void;
  ghostAssignments: GhostAssignment[];
  createGhostAssignment: (data: Partial<GhostAssignment>) => GhostAssignment;
  updateGhostAssignment: (id: string, data: Partial<GhostAssignment>) => void;
  deleteGhostAssignment: (id: string) => void;
  getGhostAssignment: (id: string) => GhostAssignment | undefined;
  clearGhostData: () => void;
}

const GhostSessionContext = createContext<GhostSessionContextType | undefined>(undefined);

const GHOST_SESSION_KEY = "tooessay_ghost_session";
const GHOST_ASSIGNMENTS_KEY = "tooessay_ghost_assignments";
const GHOST_USER_TYPE_KEY = "tooessay_ghost_user_type";

function generateSessionId(): string {
  // Generate a UUID-like session ID
  return 'ghost_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
}

export function GhostSessionProvider({ children }: { children: ReactNode }) {
  const [ghostSessionId, setGhostSessionId] = useState<string | null>(null);
  const [ghostAssignments, setGhostAssignments] = useState<GhostAssignment[]>([]);
  const [isGhostMode, setIsGhostMode] = useState(false);
  const [isGhostLoading, setIsGhostLoading] = useState(true);
  const [ghostUserType, setGhostUserTypeState] = useState<GhostUserType>('private');

  const setGhostUserType = (type: GhostUserType) => {
    setGhostUserTypeState(type);
    localStorage.setItem(GHOST_USER_TYPE_KEY, type);
    // Initialize ghost mode when user selects a type
    ensureGhostSession();
  };

  // Initialize ghost session from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem(GHOST_SESSION_KEY);
    const storedAssignments = localStorage.getItem(GHOST_ASSIGNMENTS_KEY);
    const storedUserType = localStorage.getItem(GHOST_USER_TYPE_KEY);

    if (storedSessionId) {
      setGhostSessionId(storedSessionId);
      setIsGhostMode(true);
    }

    if (storedAssignments) {
      try {
        setGhostAssignments(JSON.parse(storedAssignments));
      } catch (e) {
        console.error("Failed to parse ghost assignments:", e);
      }
    }
    
    if (storedUserType) {
      setGhostUserTypeState(storedUserType as GhostUserType);
    }
    
    setIsGhostLoading(false);
  }, []);

  // Persist ghost assignments to localStorage whenever they change
  useEffect(() => {
    if (ghostAssignments.length > 0) {
      localStorage.setItem(GHOST_ASSIGNMENTS_KEY, JSON.stringify(ghostAssignments));
    }
  }, [ghostAssignments]);

  const ensureGhostSession = (): string => {
    let sessionId = ghostSessionId;
    if (!sessionId) {
      sessionId = generateSessionId();
      setGhostSessionId(sessionId);
      setIsGhostMode(true);
      localStorage.setItem(GHOST_SESSION_KEY, sessionId);
    }
    return sessionId;
  };

  const createGhostAssignment = (data: Partial<GhostAssignment>): GhostAssignment => {
    ensureGhostSession();
    
    const newAssignment: GhostAssignment = {
      id: 'ghost_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
      title: data.title || "Untitled Draft",
      subject: data.subject || "other",
      task_type: data.task_type || "essay",
      status: data.status || "writing",
      created_at: new Date().toISOString(),
      plan: data.plan,
      outline: data.outline,
      draft: data.draft,
    };

    setGhostAssignments(prev => {
      const updated = [...prev, newAssignment];
      localStorage.setItem(GHOST_ASSIGNMENTS_KEY, JSON.stringify(updated));
      return updated;
    });

    return newAssignment;
  };

  const updateGhostAssignment = (id: string, data: Partial<GhostAssignment>) => {
    setGhostAssignments(prev => {
      const updated = prev.map(assignment =>
        assignment.id === id ? { ...assignment, ...data } : assignment
      );
      localStorage.setItem(GHOST_ASSIGNMENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deleteGhostAssignment = (id: string) => {
    setGhostAssignments(prev => {
      const updated = prev.filter(assignment => assignment.id !== id);
      localStorage.setItem(GHOST_ASSIGNMENTS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const getGhostAssignment = (id: string): GhostAssignment | undefined => {
    return ghostAssignments.find(assignment => assignment.id === id);
  };

  const clearGhostData = () => {
    setGhostSessionId(null);
    setGhostAssignments([]);
    setIsGhostMode(false);
    setGhostUserTypeState('student');
    localStorage.removeItem(GHOST_SESSION_KEY);
    localStorage.removeItem(GHOST_ASSIGNMENTS_KEY);
    localStorage.removeItem(GHOST_USER_TYPE_KEY);
  };

  return (
    <GhostSessionContext.Provider
      value={{
        ghostSessionId,
        isGhostMode,
        isGhostLoading,
        ghostUserType,
        setGhostUserType,
        ghostAssignments,
        createGhostAssignment,
        updateGhostAssignment,
        deleteGhostAssignment,
        getGhostAssignment,
        clearGhostData,
      }}
    >
      {children}
    </GhostSessionContext.Provider>
  );
}

export function useGhostSession() {
  const context = useContext(GhostSessionContext);
  if (context === undefined) {
    throw new Error("useGhostSession must be used within a GhostSessionProvider");
  }
  return context;
}
