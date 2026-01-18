// Mapping of subject values to their guide file names and metadata
export interface SubjectGuide {
  subject: string;
  label: string;
  pdfFile: string;
  txtFile: string;
  year: number;
  availableFor: ('ia' | 'ee' | 'tok_essay' | 'tok_exhibition')[];
}

// Available subject guides - maps subject values from CreateAssignment to guide files
export const SUBJECT_GUIDES: SubjectGuide[] = [
  // Core
  { subject: 'tok', label: 'Theory of Knowledge', pdfFile: 'tok.pdf', txtFile: 'tok.txt', year: 2022, availableFor: ['tok_essay', 'tok_exhibition'] },
  
  // Group 1: Studies in Language and Literature
  { subject: 'lang_a_lang_lit', label: 'Language A: Language and Literature', pdfFile: 'lang_a_lang_lit.pdf', txtFile: 'lang_a_lang_lit.txt', year: 2021, availableFor: ['ia', 'ee'] },
  { subject: 'lang_a_literature', label: 'Language A: Literature', pdfFile: 'lang_a_lang_lit.pdf', txtFile: 'lang_a_lang_lit.txt', year: 2021, availableFor: ['ia', 'ee'] }, // Uses same guide
  
  // Group 2: Language Acquisition (all use the same Language B guide)
  { subject: 'english_b', label: 'English B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'french_b', label: 'French B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'german_b', label: 'German B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'spanish_b', label: 'Spanish B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'italian_b', label: 'Italian B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'japanese_b', label: 'Japanese B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'mandarin_b', label: 'Mandarin B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  { subject: 'other_b', label: 'Other Language B', pdfFile: 'language_b.pdf', txtFile: 'language_b.txt', year: 2020, availableFor: ['ia', 'ee'] },
  
  // Group 3: Individuals and Societies
  { subject: 'business_management', label: 'Business Management', pdfFile: 'business_management.pdf', txtFile: 'business_management.txt', year: 2024, availableFor: ['ia', 'ee'] },
  { subject: 'economics', label: 'Economics', pdfFile: 'economics.pdf', txtFile: 'economics.txt', year: 2022, availableFor: ['ia', 'ee'] },
  { subject: 'geography', label: 'Geography', pdfFile: 'geography.pdf', txtFile: 'geography.txt', year: 2019, availableFor: ['ia', 'ee'] },
  { subject: 'history', label: 'History', pdfFile: 'history.pdf', txtFile: 'history.txt', year: 2020, availableFor: ['ia', 'ee'] },
  
  // Group 4: Sciences
  { subject: 'biology', label: 'Biology', pdfFile: 'biology.pdf', txtFile: 'biology.txt', year: 2025, availableFor: ['ia', 'ee'] },
  { subject: 'chemistry', label: 'Chemistry', pdfFile: 'chemistry.pdf', txtFile: 'chemistry.txt', year: 2025, availableFor: ['ia', 'ee'] },
  { subject: 'physics', label: 'Physics', pdfFile: 'physics.pdf', txtFile: 'physics.txt', year: 2025, availableFor: ['ia', 'ee'] },
  { subject: 'sehs', label: 'Sports, Exercise and Health Science', pdfFile: 'sehs.pdf', txtFile: 'sehs.txt', year: 2026, availableFor: ['ia', 'ee'] },
  
  // Group 5: Mathematics
  { subject: 'math_aa', label: 'Mathematics: Analysis and Approaches', pdfFile: 'math_aa.pdf', txtFile: 'math_aa.txt', year: 2021, availableFor: ['ia', 'ee'] },
  { subject: 'math_ai', label: 'Mathematics: Applications and Interpretation', pdfFile: 'math_ai.pdf', txtFile: 'math_ai.txt', year: 2021, availableFor: ['ia', 'ee'] },
  
  // Group 6: The Arts
  { subject: 'visual_arts', label: 'Visual Arts', pdfFile: 'visual_arts.pdf', txtFile: 'visual_arts.txt', year: 2017, availableFor: ['ia', 'ee'] },
];

// Extended Essay guide (used for all subjects when taskType is 'ee')
export const EXTENDED_ESSAY_GUIDE: SubjectGuide = {
  subject: 'ee',
  label: 'Extended Essay',
  pdfFile: 'ee.pdf',
  txtFile: 'ee.txt',
  year: 2018,
  availableFor: ['ee'],
};

// Get the appropriate guide for a subject and task type
export function getGuideForSubject(subject: string, taskType: string): SubjectGuide | null {
  // For Extended Essays, always use the EE guide
  if (taskType === 'ee') {
    return EXTENDED_ESSAY_GUIDE;
  }
  
  // For ToK, use the ToK guide
  if (subject === 'tok') {
    return SUBJECT_GUIDES.find(g => g.subject === 'tok') || null;
  }
  
  // For IAs, find the subject-specific guide
  return SUBJECT_GUIDES.find(g => g.subject === subject) || null;
}

// Get all unique guides (for the Books page)
export function getAllUniqueGuides(): SubjectGuide[] {
  const seen = new Set<string>();
  const guides: SubjectGuide[] = [];
  
  // Add EE guide first
  guides.push(EXTENDED_ESSAY_GUIDE);
  seen.add(EXTENDED_ESSAY_GUIDE.pdfFile);
  
  // Add unique subject guides
  for (const guide of SUBJECT_GUIDES) {
    if (!seen.has(guide.pdfFile)) {
      seen.add(guide.pdfFile);
      guides.push(guide);
    }
  }
  
  return guides;
}

// Parse grading criteria section from full guide text
export interface CriterionSection {
  name: string;
  letter: string;
  content: string;
  levels: CriterionLevel[];
}

export interface CriterionLevel {
  level: string;
  marks: string;
  descriptor: string;
}

// Patterns to identify assessment criteria sections
const CRITERION_PATTERNS = [
  /Criterion\s+([A-E]):\s*(.+?)(?=\n)/gi,
  /^([A-E])\.\s*(.+?)(?=\n)/gim,
];

const LEVEL_DESCRIPTOR_PATTERN = /^(\d+(?:[-–]\d+)?)\s*(?:marks?)?[:\s]+(.+?)(?=^\d+[-–]?\d*\s*(?:marks?)?[:\s]|^Criterion|^$)/gims;

// Extract assessment criteria from raw text content
export function parseGradingCriteria(text: string, taskType: string): CriterionSection[] {
  const criteria: CriterionSection[] = [];
  
  // Find the assessment section
  let assessmentStart = -1;
  let assessmentEnd = text.length;
  
  // Look for the internal assessment or assessment criteria section
  const iaMarkers = [
    'Internal assessment criteria',
    'Assessment criteria',
    'Internal assessment details',
    'The assessment criteria',
  ];
  
  for (const marker of iaMarkers) {
    const idx = text.indexOf(marker);
    if (idx !== -1 && (assessmentStart === -1 || idx < assessmentStart)) {
      assessmentStart = idx;
    }
  }
  
  if (assessmentStart === -1) {
    return [];
  }
  
  // Find where the assessment section ends (usually at Appendices or Bibliography)
  const endMarkers = ['Appendices', 'Appendix', 'Bibliography', 'Glossary of command terms'];
  for (const marker of endMarkers) {
    const idx = text.indexOf(marker, assessmentStart + 100);
    if (idx !== -1 && idx < assessmentEnd) {
      assessmentEnd = idx;
    }
  }
  
  const assessmentText = text.substring(assessmentStart, assessmentEnd);
  
  // Split by criterion
  const criterionBlocks = assessmentText.split(/(?=Criterion\s+[A-E]:)/i);
  
  for (const block of criterionBlocks) {
    const headerMatch = block.match(/Criterion\s+([A-E]):\s*(.+?)(?:\n|$)/i);
    if (!headerMatch) continue;
    
    const letter = headerMatch[1].toUpperCase();
    const name = headerMatch[2].trim();
    
    // Extract the content after the header
    const contentStart = block.indexOf(headerMatch[0]) + headerMatch[0].length;
    const content = block.substring(contentStart).trim();
    
    // Parse level descriptors
    const levels: CriterionLevel[] = [];
    const levelMatches = content.matchAll(/^(\d+[-–]?\d*)\s*[:\s•]+(.+?)(?=^\d+[-–]?\d*\s*[:\s•]|^Criterion|$)/gims);
    
    for (const match of levelMatches) {
      levels.push({
        level: match[1],
        marks: match[1],
        descriptor: match[2].trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '),
      });
    }
    
    // If no structured levels found, keep the raw content
    if (levels.length === 0) {
      // Try to extract text between level numbers
      const simpleMatches = content.matchAll(/Level\s+(\d+[-–]?\d*)\s*(.+?)(?=Level\s+\d|$)/gis);
      for (const match of simpleMatches) {
        levels.push({
          level: match[1],
          marks: match[1],
          descriptor: match[2].trim().replace(/\n+/g, ' ').replace(/\s+/g, ' '),
        });
      }
    }
    
    criteria.push({
      name,
      letter,
      content: content.substring(0, 500) + (content.length > 500 ? '...' : ''),
      levels,
    });
  }
  
  return criteria;
}

// Fetch and parse grading criteria for a subject/task
export async function fetchGradingCriteria(subject: string, taskType: string): Promise<{
  guide: SubjectGuide | null;
  criteria: CriterionSection[];
  rawText: string;
  error?: string;
}> {
  const guide = getGuideForSubject(subject, taskType);
  
  if (!guide) {
    return {
      guide: null,
      criteria: [],
      rawText: '',
      error: `No grading criteria available for ${subject} (${taskType})`,
    };
  }
  
  try {
    const response = await fetch(`/guides/${guide.txtFile}`);
    if (!response.ok) {
      throw new Error(`Failed to load: ${response.status}`);
    }
    
    const text = await response.text();
    const criteria = parseGradingCriteria(text, taskType);
    
    return {
      guide,
      criteria,
      rawText: text,
    };
  } catch (error) {
    return {
      guide,
      criteria: [],
      rawText: '',
      error: `Failed to load grading criteria: ${error}`,
    };
  }
}

// Extract a summary of assessment weighting from the text
export function extractAssessmentOutline(text: string): string[] {
  const outline: string[] = [];
  
  // Look for assessment outline tables
  const outlineMatch = text.match(/Assessment\s+component\s+Weight.*?(?=\n\n|\n[A-Z])/gis);
  if (outlineMatch) {
    outline.push(...outlineMatch);
  }
  
  // Look for percentage weightings
  const weightings = text.match(/(?:Paper|Component|Criterion)\s*\d*\s*[-–:]\s*\d+%/gi);
  if (weightings) {
    outline.push(...weightings.slice(0, 10));
  }
  
  return outline;
}
