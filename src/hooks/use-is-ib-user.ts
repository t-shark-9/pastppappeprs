import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to check if the current user (signed-in or ghost) is an IB user
 * Returns { isIBUser, isLoading }
 */
export function useIsIBUser() {
  const { user } = useAuth();
  const [isIBUser, setIsIBUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIBStatus = async () => {
      // First check localStorage (works for both ghost and signed-in users)
      const localProgram = localStorage.getItem('tooessay_school_program');
      if (localProgram) {
        // Check if the program is IB
        setIsIBUser(localProgram.toLowerCase() === 'ib');
        setIsLoading(false);
        return;
      }

      // For signed-in users, also check profile and sync to localStorage
      if (user) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('school_program, education_type')
            .eq('id', user.id)
            .maybeSingle();

          if (profile?.school_program) {
            const isIB = profile.school_program.toLowerCase() === 'ib';
            setIsIBUser(isIB);
            // Sync to localStorage for consistency
            localStorage.setItem('tooessay_school_program', profile.school_program);
            if (profile.education_type) {
              localStorage.setItem('tooessay_education_type', profile.education_type);
            }
          } else {
            setIsIBUser(false);
          }
        } catch (error) {
          console.error('Error checking IB status:', error);
          setIsIBUser(false);
        }
      } else {
        // No program set at all
        setIsIBUser(false);
      }

      setIsLoading(false);
    };

    checkIBStatus();
  }, [user]);

  return { isIBUser, isLoading };
}

/**
 * Simple synchronous check for IB user status from localStorage
 * Use when you need a quick check without async
 */
export function isIBUserSync(): boolean {
  const localProgram = localStorage.getItem('tooessay_school_program');
  return localProgram?.toLowerCase() === 'ib';
}
