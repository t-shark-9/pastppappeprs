/**
 * SEO Utilities for TooEssay
 * Optimized for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
 */

interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Updates document metadata for SEO
 * Follows 2024-2025 best practices: Title under 60 chars, description under 160 chars
 */
export function updatePageMeta(meta: PageMeta) {
  // Update title (max 60 characters for optimal display)
  document.title = meta.title;

  // Update or create meta description
  updateMetaTag('name', 'description', meta.description);

  // Update keywords if provided
  if (meta.keywords) {
    updateMetaTag('name', 'keywords', meta.keywords);
  }

  // Update canonical URL
  if (meta.canonical) {
    updateLinkTag('canonical', meta.canonical);
  }

  // Update Open Graph tags
  updateMetaTag('property', 'og:title', meta.title);
  updateMetaTag('property', 'og:description', meta.description);
  updateMetaTag('property', 'og:url', meta.canonical || window.location.href);
  
  if (meta.ogImage) {
    updateMetaTag('property', 'og:image', meta.ogImage);
  }

  // Update Twitter Card tags
  updateMetaTag('name', 'twitter:title', meta.title);
  updateMetaTag('name', 'twitter:description', meta.description);
  
  if (meta.ogImage) {
    updateMetaTag('name', 'twitter:image', meta.ogImage);
  }
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(attribute: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Helper function to update or create link tags
 */
function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
  
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  
  element.href = href;
}

/**
 * SEO-optimized page metadata for all major pages
 */
export const PAGE_META = {
  dashboard: {
    title: 'Dashboard - TooEssay | Your Academic Writing Hub',
    description: 'Manage your IB Internal Assessments, Extended Essays, and academic projects. Track deadlines, get AI feedback, and achieve academic excellence with TooEssay.',
    keywords: 'IB dashboard, assignment tracker, academic writing manager, essay progress tracker',
    canonical: 'https://tooessay.app/dashboard'
  },
  iaGuides: {
    title: 'IB Internal Assessment Guides | All Subjects - TooEssay',
    description: 'Complete IB IA guides for Biology, Chemistry, Physics, Business, Economics, Psychology & all 30+ subjects. Expert criteria breakdown, examples, and AI coaching.',
    keywords: 'IB Internal Assessment guide, IB IA help, IA criteria, Biology IA, Chemistry IA, Business Management IA, Economics IA, Physics IA',
    canonical: 'https://tooessay.app/ia-guides'
  },
  extendedEssay: {
    title: 'Extended Essay Guide 2025 | IB EE Help - TooEssay',
    description: 'Master your IB Extended Essay with our comprehensive guide. Learn research methods, structure, criteria, and get AI-powered feedback for all EE subjects.',
    keywords: 'Extended Essay guide, IB EE help, EE structure, EE research, EE criteria, IB Extended Essay 2025',
    canonical: 'https://tooessay.app/extended-essay-guide'
  },
  theoryOfKnowledge: {
    title: 'Theory of Knowledge Essay Guide 2025 | TOK Help - TooEssay',
    description: 'Ace your TOK essay with expert guidance on knowledge questions, AOKs, WOKs, and essay structure. Get AI feedback aligned with IB TOK assessment criteria.',
    keywords: 'Theory of Knowledge guide, TOK essay help, TOK assessment criteria, knowledge questions, AOK, WOK, TOK 2025',
    canonical: 'https://tooessay.app/theory-of-knowledge-guide'
  },
  gradeBoundaries: {
    title: 'IB Grade Boundaries 2020-2025 | All Subjects - TooEssay',
    description: 'Historical IB grade boundaries for Biology, Chemistry, Physics, Math, Economics, Business & all subjects. Track your predicted grades with official IB data.',
    keywords: 'IB grade boundaries, IB grade calculator, IB predicted grades, IB Biology grades, IB Chemistry grades, IB Math grades',
    canonical: 'https://tooessay.app/grade-boundaries'
  },
  biology: {
    title: 'IB Biology IA Guide 2025 | Criteria, Ideas & Examples - TooEssay',
    description: 'Complete IB Biology Internal Assessment guide. Learn experimental design, data analysis, evaluation criteria, and get expert AI feedback for your Biology IA.',
    keywords: 'IB Biology IA, Biology Internal Assessment, Biology IA ideas, Biology IA criteria, IB Biology experiments',
    canonical: 'https://tooessay.app/ia-guides/biology'
  },
  chemistry: {
    title: 'IB Chemistry IA Guide 2025 | Criteria, Methods & Examples - TooEssay',
    description: 'Master your IB Chemistry IA with expert guidance on experimental design, titrations, kinetics, and equilibrium. AI-powered feedback for all Chemistry topics.',
    keywords: 'IB Chemistry IA, Chemistry Internal Assessment, Chemistry IA ideas, Chemistry IA criteria, IB Chemistry experiments',
    canonical: 'https://tooessay.app/ia-guides/chemistry'
  },
  business: {
    title: 'IB Business Management IA Guide 2025 | Complete Criteria - TooEssay',
    description: 'Excel in your IB Business IA with comprehensive guidance on research questions, analysis tools, real-world examples, and HL/SL criteria.',
    keywords: 'IB Business IA, Business Management IA, Business IA criteria, Business IA examples, IB Business research',
    canonical: 'https://tooessay.app/ia-guides/business-management'
  },
  economics: {
    title: 'IB Economics IA Guide 2025 | Commentary & Analysis Help - TooEssay',
    description: 'Write outstanding IB Economics commentaries with expert guidance on article selection, diagrams, evaluation, and all IA criteria. AI-powered feedback.',
    keywords: 'IB Economics IA, Economics commentary, Economics IA criteria, IB Economics diagrams, Economics IA examples',
    canonical: 'https://tooessay.app/ia-guides/economics'
  },
  physics: {
    title: 'IB Physics IA Guide 2025 | Experiments & Analysis - TooEssay',
    description: 'Design and execute perfect IB Physics experiments. Learn uncertainty analysis, data processing, and evaluation with AI-powered guidance.',
    keywords: 'IB Physics IA, Physics Internal Assessment, Physics IA ideas, Physics experiments, IB Physics uncertainty',
    canonical: 'https://tooessay.app/ia-guides/physics'
  },
  mathematics: {
    title: 'IB Math IA Guide 2025 | AA & AI Exploration - TooEssay',
    description: 'Create exceptional IB Math explorations for Analysis & Approaches or Applications & Interpretation. Get guidance on topics, criteria, and structure.',
    keywords: 'IB Math IA, Math exploration, Math AA IA, Math AI IA, IB Mathematics criteria, Math IA topics',
    canonical: 'https://tooessay.app/ia-guides/mathematics'
  },
  history: {
    title: 'IB History IA Guide 2025 | Historical Investigation - TooEssay',
    description: 'Conduct rigorous historical investigations with expert guidance on source analysis, historiography, and OPCVL. Master the IB History IA criteria.',
    keywords: 'IB History IA, Historical Investigation, History IA criteria, OPCVL, IB History sources, historiography',
    canonical: 'https://tooessay.app/ia-guides/history'
  },
  psychology: {
    title: 'IB Psychology IA Guide 2025 | Experimental Design - TooEssay',
    description: 'Design and execute ethical psychological experiments for your IB IA. Learn research methods, data analysis, and evaluation with AI support.',
    keywords: 'IB Psychology IA, Psychology experiments, Psychology IA criteria, IB Psychology research methods',
    canonical: 'https://tooessay.app/ia-guides/psychology'
  },
  speedReader: {
    title: 'Speed Reader - Read Faster & Comprehend Better | TooEssay',
    description: 'Improve your reading speed with our one-word-at-a-time display technique. Free online speed reading tool to help you read 2-3x faster while maintaining comprehension.',
    keywords: 'speed reading, fast reading, reading app, online reading tool, one word display, reading training, speed reader, improve reading speed',
    canonical: 'https://tooessay.app/speed-reader'
  },
  flashcards: {
    title: 'IB Flashcards - Spaced Repetition Study Tool | TooEssay',
    description: 'Study smarter with flashcards organized by IB subjects. Create decks from your notes, use spaced repetition, and master any topic for your exams.',
    keywords: 'IB flashcards, study flashcards, spaced repetition, IB study tool, exam preparation, flashcard decks',
    canonical: 'https://tooessay.app/flashcards'
  }
} as const;

/**
 * Generates breadcrumb structured data for SEO
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(breadcrumbList);
  
  // Remove existing breadcrumb schema if present
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing?.textContent?.includes('BreadcrumbList')) {
    existing.remove();
  }
  
  document.head.appendChild(script);
}

/**
 * Generates FAQ structured data for SEO
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(faqSchema);
  document.head.appendChild(script);
}

/**
 * Long-tail keyword generators for different subjects
 */
export const KEYWORD_GENERATORS = {
  ia: (subject: string) => [
    `${subject} IA guide`,
    `IB ${subject} Internal Assessment`,
    `${subject} IA criteria`,
    `${subject} IA ideas`,
    `best ${subject} IA topics`,
    `how to write ${subject} IA`,
    `${subject} IA examples`,
    `${subject} IA marking criteria`,
    `${subject} IA research question`
  ],
  ee: (subject: string) => [
    `Extended Essay ${subject}`,
    `EE ${subject} topics`,
    `${subject} Extended Essay examples`,
    `how to write ${subject} EE`,
    `${subject} EE research questions`
  ]
};
