import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getLanguageFromProgram } from '@/i18n/config';

export function LanguageInitializer() {
  const { user } = useAuth();
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeLanguage = async () => {
      if (!user) return;

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('school_program')
          .eq('id', user.id)
          .maybeSingle();

        if (profile) {
          // Auto-detect language based on school program
          const languageToUse = getLanguageFromProgram(profile.school_program);
          
          if (i18n.language !== languageToUse) {
            i18n.changeLanguage(languageToUse);
          }
        }
      } catch (error) {
        console.error('Error initializing language:', error);
      }
    };

    initializeLanguage();
  }, [user, i18n]);

  return null;
}
