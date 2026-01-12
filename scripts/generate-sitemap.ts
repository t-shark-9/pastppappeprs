// Sitemap generator - runs at build time
// Add new public routes here when created

const SITE_URL = 'https://tooessay.app';

// Subject keys for IA guides
const IA_SUBJECTS = [
  'biology', 'chemistry', 'physics', 'business-management', 'economics', 
  'mathematics', 'history', 'psychology', 'computer_science', 
  'environmental_systems', 'global_politics', 'philosophy', 'film', 
  'dance', 'theatre', 'music', 'visual_arts', 'language_b', 'english_a'
];

// Grade boundary subjects
const GRADE_BOUNDARY_SUBJECTS = [
  'biology', 'chemistry', 'physics', 'math-aa', 'math-ai',
  'business-management', 'economics', 'history', 'psychology',
  'geography', 'language-b', 'language-a', 'visual-arts', 'sehs',
  'music', 'design-technology', 'computer-science', 'environmental-systems'
];

// Only include routes that don't require authentication
const PUBLIC_ROUTES = [
  // Core pages
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/auth', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  
  // Main guide pages
  { path: '/ia-guides', priority: '0.9', changefreq: 'weekly' },
  { path: '/extended-essay-guide', priority: '0.9', changefreq: 'weekly' },
  { path: '/theory-of-knowledge-guide', priority: '0.9', changefreq: 'weekly' },
  { path: '/grade-boundaries', priority: '0.8', changefreq: 'monthly' },
  
  // Resources
  { path: '/books', priority: '0.7', changefreq: 'monthly' },
  { path: '/exam-resources', priority: '0.7', changefreq: 'weekly' },
  { path: '/molecule', priority: '0.5', changefreq: 'monthly' },
  { path: '/drawings', priority: '0.5', changefreq: 'monthly' },
  
  // Individual IA subject guides
  ...IA_SUBJECTS.map(subject => ({
    path: `/ia-guides/${subject}`,
    priority: '0.8',
    changefreq: 'weekly'
  })),
  
  // Grade boundaries by subject
  ...GRADE_BOUNDARY_SUBJECTS.map(subject => ({
    path: `/grade-boundaries/${subject}`,
    priority: '0.7',
    changefreq: 'monthly'
  }))
];

export function generateSitemap(): string {
  const today = new Date().toISOString().split('T')[0];
  
  const urls = PUBLIC_ROUTES.map(route => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}

export default PUBLIC_ROUTES;
