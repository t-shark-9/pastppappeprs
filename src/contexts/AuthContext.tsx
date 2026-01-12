import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, fullName: string, role: string, schoolName?: string, schoolProgram?: string, educationType?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Trigger ghost data migration after login
        if (event === 'SIGNED_IN' && session?.user) {
          // Set flag for migration hook to pick up
          localStorage.setItem("tooessay_migrate_ghost_after_auth", "true");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: string, schoolName?: string, schoolProgram?: string, educationType?: string) => {
    // Validate inputs
    if (!email || !password || !fullName || !role) {
      return { error: { message: "All fields are required" } };
    }
    
    if (password.length < 6) {
      return { error: { message: "Password must be at least 6 characters" } };
    }
    
    // Accept student, teacher, or private (private maps to student role in DB)
    if (!['student', 'teacher', 'private'].includes(role)) {
      return { error: { message: "Invalid role selected" } };
    }
    
    // Map 'private' to 'student' for database (enum only has student/teacher/admin)
    const dbRole = role === 'private' ? 'student' : role;
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          role: dbRole,
          user_type: role, // Store original selection for UI purposes
          school_name: schoolName || '',
          school_program: schoolProgram || '',
          education_type: educationType || '',
        },
      },
    });
    
    if (!error) {
      window.gtag?.('event', 'sign_up', {
        method: 'email'
      });
      // Set flag so migration happens after redirect
      localStorage.setItem("tooessay_migrate_ghost_after_auth", "true");
      setTimeout(() => navigate("/work"), 100);
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (!error) {
      window.gtag?.('event', 'login', {
        method: 'email'
      });
      // Set flag so migration happens after redirect
      localStorage.setItem("tooessay_migrate_ghost_after_auth", "true");
      setTimeout(() => navigate("/work"), 100);
    }
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
