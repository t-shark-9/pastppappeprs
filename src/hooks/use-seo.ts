import { useEffect } from 'react';
import { updatePageMeta, PAGE_META } from '@/utils/seo';

/**
 * Custom hook to update page SEO metadata
 * Usage: useSEO('dashboard') or useSEO('iaGuides')
 */
export function useSEO(page: keyof typeof PAGE_META) {
  useEffect(() => {
    const meta = PAGE_META[page];
    if (meta) {
      updatePageMeta(meta);
    }

    // Cleanup: Reset to default on unmount
    return () => {
      document.title = 'TooEssay';
    };
  }, [page]);
}
