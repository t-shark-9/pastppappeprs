import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import zh from './locales/zh.json';

// Language mapping based on school program
export const PROGRAM_LANGUAGE_MAP: Record<string, string> = {
  'ib': 'en', // International Baccalaureate - English default
  'abitur': 'de', // German Abitur
  'baccalaureat': 'fr', // French Baccalauréat
  'selectividad': 'es', // Spanish Selectividad/EvAU
  'gaokao': 'zh', // Chinese Gaokao
  'a-levels': 'en', // British A-Levels
  'ap': 'en', // American AP
  'school': 'en', // Default for school
  'university': 'en', // Default for university
  'private': 'en', // Default for private
};

// Supported languages with native names
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

// Get language from school program
export const getLanguageFromProgram = (schoolProgram: string | null | undefined): string => {
  if (!schoolProgram) return 'en';
  return PROGRAM_LANGUAGE_MAP[schoolProgram.toLowerCase()] || 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      de: { translation: de },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;
