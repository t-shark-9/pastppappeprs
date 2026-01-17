import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAPERS_DIR = path.join(__dirname, '..', 'public', 'papers');
const OUTPUT_FILE = path.join(PAPERS_DIR, 'papers-index.json');

const papers = [];
let paperCount = 0;
let markSchemeCount = 0;

function extractSubjectFromPath(pathParts, fileName) {
  // Check directory names first
  for (const part of pathParts) {
    const lowerPart = part.toLowerCase();
    if (lowerPart.includes('chemistry') || lowerPart.includes('experimental sciences')) {
      if (fileName.toLowerCase().includes('chemistry') || fileName.toLowerCase().includes('chem')) return 'Chemistry';
    }
    if (lowerPart.includes('biology')) {
      return 'Biology';
    }
    if (lowerPart.includes('physics')) {
      return 'Physics';
    }
    if (lowerPart.includes('business')) {
      return 'Business Management';
    }
    if (lowerPart.includes('economics')) {
      return 'Economics';
    }
    if (lowerPart.includes('geography')) {
      return 'Geography';
    }
    if (lowerPart.includes('history')) {
      return 'History';
    }
    if (lowerPart.includes('psychology')) {
      return 'Psychology';
    }
  }
  
  // Check filename
  const lowerFileName = fileName.toLowerCase();
  if (lowerFileName.includes('chemistry') || lowerFileName.includes('chem')) return 'Chemistry';
  if (lowerFileName.includes('biology')) return 'Biology';
  if (lowerFileName.includes('physics')) return 'Physics';
  if (lowerFileName.includes('business')) return 'Business Management';
  if (lowerFileName.includes('economics')) return 'Economics';
  if (lowerFileName.includes('geography')) return 'Geography';
  if (lowerFileName.includes('history')) return 'History';
  if (lowerFileName.includes('psychology')) return 'Psychology';
  
  return 'Unknown';
}

function scanDirectory(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relPath = path.join(relativePath, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath, relPath);
    } else if (entry.isFile() && entry.name.endsWith('.txt')) {
      const isMarkScheme = entry.name.includes('markscheme') || entry.name.includes('Markscheme');
      
      if (isMarkScheme) {
        markSchemeCount++;
      } else {
        paperCount++;
      }
      
      // Parse path to extract metadata
      const pathParts = relativePath.split(path.sep).filter(p => p);
      
      // Extract year from path
      let year = 'Unknown';
      let session = 'Unknown';
      
      // Look for year in path parts (format: "2023 Examination Session")
      for (const part of pathParts) {
        const yearMatch = part.match(/(\d{4})/);
        if (yearMatch) {
          year = yearMatch[1];
        }
        if (part.toLowerCase().includes('may') || part.toLowerCase().includes('m24') || part.toLowerCase().includes('m23')) {
          session = 'May';
        } else if (part.toLowerCase().includes('november') || part.toLowerCase().includes('n23') || part.toLowerCase().includes('n24')) {
          session = 'November';
        }
      }
      
      // Parse filename
      const fileName = entry.name.replace('.txt', '').replace(/_markscheme$/i, '').replace(/_Markscheme$/i, '');
      
      // Extract subject
      const subject = extractSubjectFromPath(pathParts, fileName);
      
      // Extract level
      let level = 'Unknown';
      if (fileName.match(/_hl_|_HL_| HL /i) || fileName.includes('__HL')) {
        level = 'HL';
      } else if (fileName.match(/_sl_|_SL_| SL /i) || fileName.includes('__SL')) {
        level = 'SL';
      }
      
      // Extract paper number
      let paperNum = 'Unknown';
      const paperMatch = fileName.match(/paper[_\s](\d)|p(\d)/i);
      if (paperMatch) {
        paperNum = paperMatch[1] || paperMatch[2];
      }
      
      // Extract timezone
      let timezone = 'TZ0';
      const tzMatch = fileName.match(/TZ(\d)/i);
      if (tzMatch) {
        timezone = `TZ${tzMatch[1]}`;
      }
      
      // Look for corresponding mark scheme
      const markSchemePath = path.join(relativePath, entry.name.replace('.txt', '_markscheme.txt'));
      const markSchemeFullPath = path.join(PAPERS_DIR, markSchemePath);
      const hasMarkScheme = fs.existsSync(markSchemeFullPath);
      
      if (!isMarkScheme) {
        papers.push({
          id: `${year}_${session}_${subject}_${level}_P${paperNum}_${timezone}`.toLowerCase().replace(/\s+/g, '_'),
          subject,
          year,
          session,
          level,
          paperNumber: paperNum,
          timezone,
          filepath: relPath.replace(/\\/g, '/'),
          markSchemeFile: hasMarkScheme ? markSchemePath.replace(/\\/g, '/') : null,
          title: `${subject} ${level} Paper ${paperNum} ${timezone}`,
        });
      }
    }
  }
}

console.log('Scanning papers directory...');
scanDirectory(PAPERS_DIR);

const output = {
  generated: new Date().toISOString(),
  totalPapers: paperCount,
  totalMarkSchemes: markSchemeCount,
  papers: papers.sort((a, b) => {
    // Sort by year desc, then session, then subject, then level, then paper number
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    if (a.session !== b.session) return a.session.localeCompare(b.session);
    if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    return a.paperNumber.localeCompare(b.paperNumber);
  })
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
console.log(`\n✅ Generated papers index with ${paperCount} papers and ${markSchemeCount} mark schemes`);
console.log(`📄 Output: ${OUTPUT_FILE}`);
console.log(`\nBreakdown by subject:`);
const subjectCounts = {};
papers.forEach(p => {
  subjectCounts[p.subject] = (subjectCounts[p.subject] || 0) + 1;
});
Object.entries(subjectCounts).forEach(([subject, count]) => {
  console.log(`  ${subject}: ${count} papers`);
});
