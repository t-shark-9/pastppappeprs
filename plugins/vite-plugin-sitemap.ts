import type { Plugin } from 'vite';
import { generateSitemap } from '../scripts/generate-sitemap';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',
    closeBundle() {
      const fs = require('fs');
      const path = require('path');
      
      const sitemap = generateSitemap();
      const outputPath = path.resolve(__dirname, '../dist/sitemap.xml');
      
      fs.writeFileSync(outputPath, sitemap, 'utf-8');
      console.log('✅ Sitemap generated at dist/sitemap.xml');
    }
  };
}
