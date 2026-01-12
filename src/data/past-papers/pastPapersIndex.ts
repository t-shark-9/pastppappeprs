// IB Past Papers Index
// Organized by subject, year, session, timezone, and level

export interface PastPaper {
  id: string;
  subject: string;
  subjectGroup: string;
  year: number;
  session: 'May' | 'November';
  timezone: 'TZ1' | 'TZ2' | 'TZA' | 'TZB';
  level: 'SL' | 'HL';
  paper: number; // Paper 1, 2, 3
  hasMarkScheme: boolean;
  fileName: string;
  markSchemeFileName?: string;
  topics?: string[];
}

export interface SubjectInfo {
  value: string;
  label: string;
  group: string;
  groupNumber: number;
  icon?: string;
}

// Subject definitions organized by group
export const PAST_PAPER_SUBJECTS: SubjectInfo[] = [
  // Group 1: Studies in Language and Literature
  { value: 'english_a_lang_lit', label: 'English A: Language and Literature', group: 'Group 1: Language and Literature', groupNumber: 1 },
  { value: 'english_a_lit', label: 'English A: Literature', group: 'Group 1: Language and Literature', groupNumber: 1 },
  
  // Group 2: Language Acquisition
  { value: 'chinese_b', label: 'Chinese B', group: 'Group 2: Language Acquisition', groupNumber: 2 },
  { value: 'french_b', label: 'French B', group: 'Group 2: Language Acquisition', groupNumber: 2 },
  { value: 'spanish_b', label: 'Spanish B', group: 'Group 2: Language Acquisition', groupNumber: 2 },
  { value: 'german_b', label: 'German B', group: 'Group 2: Language Acquisition', groupNumber: 2 },
  
  // Group 3: Individuals and Societies
  { value: 'business_management', label: 'Business Management', group: 'Group 3: Individuals and Societies', groupNumber: 3 },
  { value: 'economics', label: 'Economics', group: 'Group 3: Individuals and Societies', groupNumber: 3 },
  { value: 'geography', label: 'Geography', group: 'Group 3: Individuals and Societies', groupNumber: 3 },
  { value: 'history', label: 'History', group: 'Group 3: Individuals and Societies', groupNumber: 3 },
  { value: 'psychology', label: 'Psychology', group: 'Group 3: Individuals and Societies', groupNumber: 3 },
  { value: 'global_politics', label: 'Global Politics', group: 'Group 3: Individuals and Societies', groupNumber: 3 },
  
  // Group 4: Sciences
  { value: 'biology', label: 'Biology', group: 'Group 4: Sciences', groupNumber: 4 },
  { value: 'chemistry', label: 'Chemistry', group: 'Group 4: Sciences', groupNumber: 4 },
  { value: 'physics', label: 'Physics', group: 'Group 4: Sciences', groupNumber: 4 },
  { value: 'computer_science', label: 'Computer Science', group: 'Group 4: Sciences', groupNumber: 4 },
  { value: 'design_technology', label: 'Design Technology', group: 'Group 4: Sciences', groupNumber: 4 },
  { value: 'ess', label: 'Environmental Systems and Societies', group: 'Group 4: Sciences', groupNumber: 4 },
  { value: 'sehs', label: 'Sports, Exercise and Health Science', group: 'Group 4: Sciences', groupNumber: 4 },
  
  // Group 5: Mathematics
  { value: 'math_aa', label: 'Mathematics: Analysis and Approaches', group: 'Group 5: Mathematics', groupNumber: 5 },
  { value: 'math_ai', label: 'Mathematics: Applications and Interpretation', group: 'Group 5: Mathematics', groupNumber: 5 },
];

// Available years
export const AVAILABLE_YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];

// Sessions
export const SESSIONS = ['May', 'November'] as const;

// Levels
export const LEVELS = ['SL', 'HL'] as const;

// Timezones
export const TIMEZONES = ['TZ1', 'TZ2'] as const;

// Generate past papers index from available data
// This function parses filenames like: Chemistry_paper_2__TZ1_HL_markscheme.txt
export function parseFileName(fileName: string): Partial<PastPaper> | null {
  // Pattern: Subject_paper_N__TZX_LEVEL[_markscheme].txt
  const regex = /^([A-Za-z_]+)_paper_(\d)__([A-Z0-9]+)_([A-Z]+)(_markscheme)?\.txt$/;
  const match = fileName.match(regex);
  
  if (!match) return null;
  
  const [, subject, paper, timezone, level, isMarkScheme] = match;
  
  return {
    subject: subject.toLowerCase().replace(/_/g, ' '),
    paper: parseInt(paper),
    timezone: timezone as 'TZ1' | 'TZ2',
    level: level as 'SL' | 'HL',
    hasMarkScheme: Boolean(isMarkScheme),
  };
}

// Sample past papers data - this would be populated from the GitHub repo
// Structure mirrors: CONVERTED_PAPERS/2023 Examination Session/May 2023.../Experimental sciences/
export const PAST_PAPERS_INDEX: PastPaper[] = [
  // 2024 May Session - Chemistry
  { id: 'chem-2024-may-p1-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'chem-2024-may-p1-tz1-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ1_SL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'chem-2024-may-p1-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'chem-2024-may-p1-tz2-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ2_SL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'chem-2024-may-p2-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'chem-2024-may-p2-tz1-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ1_SL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ1_SL_markscheme.txt' },
  { id: 'chem-2024-may-p2-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ2_HL_markscheme.txt' },
  { id: 'chem-2024-may-p2-tz2-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ2_SL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ2_SL_markscheme.txt' },
  { id: 'chem-2024-may-p3-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ1', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ1_HL_markscheme.txt' },
  { id: 'chem-2024-may-p3-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2024, session: 'May', timezone: 'TZ2', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ2_HL_markscheme.txt' },

  // 2023 May Session - Chemistry
  { id: 'chem-2023-may-p1-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'chem-2023-may-p1-tz1-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ1_SL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'chem-2023-may-p1-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'chem-2023-may-p1-tz2-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ2_SL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'chem-2023-may-p2-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'chem-2023-may-p2-tz1-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ1_SL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ1_SL_markscheme.txt' },
  { id: 'chem-2023-may-p2-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ2_HL_markscheme.txt' },
  { id: 'chem-2023-may-p2-tz2-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ2_SL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ2_SL_markscheme.txt' },
  { id: 'chem-2023-may-p3-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ1_HL_markscheme.txt' },
  { id: 'chem-2023-may-p3-tz1-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ1_SL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ1_SL_markscheme.txt' },
  { id: 'chem-2023-may-p3-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ2_HL_markscheme.txt' },

  // 2023 November Session - Chemistry
  { id: 'chem-2023-nov-p1-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'chem-2023-nov-p1-tz2-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Chemistry_paper_1__TZ2_SL.txt', markSchemeFileName: 'Chemistry_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'chem-2023-nov-p2-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'chem-2023-nov-p2-tz2-sl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Chemistry_paper_2__TZ2_SL.txt', markSchemeFileName: 'Chemistry_paper_2__TZ2_SL_markscheme.txt' },
  { id: 'chem-2023-nov-p3-tz1-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ1', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ1_HL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ1_HL_markscheme.txt' },
  { id: 'chem-2023-nov-p3-tz2-hl', subject: 'chemistry', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Chemistry_paper_3__TZ2_HL.txt', markSchemeFileName: 'Chemistry_paper_3__TZ2_HL_markscheme.txt' },

  // 2023 May Session - Biology
  { id: 'bio-2023-may-p1-tz1-hl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Biology_paper_1__TZ1_HL.txt', markSchemeFileName: 'Biology_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'bio-2023-may-p1-tz1-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Biology_paper_1__TZ1_SL.txt', markSchemeFileName: 'Biology_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'bio-2023-may-p1-tz2-hl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Biology_paper_1__TZ2_HL.txt', markSchemeFileName: 'Biology_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'bio-2023-may-p1-tz2-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Biology_paper_1__TZ2_SL.txt', markSchemeFileName: 'Biology_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'bio-2023-may-p2-tz1-hl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ1_HL.txt', markSchemeFileName: 'Biology_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'bio-2023-may-p2-tz1-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ1_SL.txt', markSchemeFileName: 'Biology_paper_2__TZ1_SL_markscheme.txt' },
  { id: 'bio-2023-may-p2-tz2-hl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ2_HL.txt', markSchemeFileName: 'Biology_paper_2__TZ2_HL_markscheme.txt' },
  { id: 'bio-2023-may-p2-tz2-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ2_SL.txt', markSchemeFileName: 'Biology_paper_2__TZ2_SL_markscheme.txt' },
  { id: 'bio-2023-may-p3-tz1-hl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 3, hasMarkScheme: true, fileName: 'Biology_paper_3__TZ1_HL.txt', markSchemeFileName: 'Biology_paper_3__TZ1_HL_markscheme.txt' },
  { id: 'bio-2023-may-p3-tz1-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 3, hasMarkScheme: true, fileName: 'Biology_paper_3__TZ1_SL.txt', markSchemeFileName: 'Biology_paper_3__TZ1_SL_markscheme.txt' },

  // 2023 November Session - Biology
  { id: 'bio-2023-nov-p1-tz2-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Biology_paper_1__TZ2_SL.txt', markSchemeFileName: 'Biology_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'bio-2023-nov-p2-tz1-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ1_SL.txt', markSchemeFileName: 'Biology_paper_2__TZ1_SL_markscheme.txt' },
  { id: 'bio-2023-nov-p2-tz2-hl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ2_HL.txt', markSchemeFileName: 'Biology_paper_2__TZ2_HL_markscheme.txt' },
  { id: 'bio-2023-nov-p2-tz2-sl', subject: 'biology', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Biology_paper_2__TZ2_SL.txt', markSchemeFileName: 'Biology_paper_2__TZ2_SL_markscheme.txt' },

  // 2023 May Session - Physics
  { id: 'phys-2023-may-p1-tz1-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Physics_paper_1__TZ1_HL.txt', markSchemeFileName: 'Physics_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'phys-2023-may-p1-tz1-sl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Physics_paper_1__TZ1_SL.txt', markSchemeFileName: 'Physics_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'phys-2023-may-p1-tz2-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Physics_paper_1__TZ2_HL.txt', markSchemeFileName: 'Physics_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'phys-2023-may-p1-tz2-sl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Physics_paper_1__TZ2_SL.txt', markSchemeFileName: 'Physics_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'phys-2023-may-p2-tz1-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Physics_paper_2__TZ1_HL.txt', markSchemeFileName: 'Physics_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'phys-2023-may-p2-tz1-sl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Physics_paper_2__TZ1_SL.txt', markSchemeFileName: 'Physics_paper_2__TZ1_SL_markscheme.txt' },
  { id: 'phys-2023-may-p2-tz2-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Physics_paper_2__TZ2_HL.txt', markSchemeFileName: 'Physics_paper_2__TZ2_HL_markscheme.txt' },
  { id: 'phys-2023-may-p2-tz2-sl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Physics_paper_2__TZ2_SL.txt', markSchemeFileName: 'Physics_paper_2__TZ2_SL_markscheme.txt' },

  // 2023 November Session - Physics
  { id: 'phys-2023-nov-p1-tz2-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Physics_paper_1__TZ2_HL.txt', markSchemeFileName: 'Physics_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'phys-2023-nov-p2-tz2-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2023, session: 'November', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Physics_paper_2__TZ2_HL.txt', markSchemeFileName: 'Physics_paper_2__TZ2_HL_markscheme.txt' },

  // 2023 May Session - Business Management
  { id: 'bm-2023-may-p1-tz1-hl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Business_management_paper_1__TZ1_HL.txt', markSchemeFileName: 'Business_management_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'bm-2023-may-p1-tz2-hl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Business_management_paper_1__TZ2_HL.txt', markSchemeFileName: 'Business_management_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'bm-2023-may-p1-tz2-sl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Business_management_paper_1__TZ2_SL.txt', markSchemeFileName: 'Business_management_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'bm-2023-may-p2-tz1-hl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Business_management_paper_2__TZ1_HL.txt', markSchemeFileName: 'Business_management_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'bm-2023-may-p2-tz1-sl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Business_management_paper_2__TZ1_SL.txt', markSchemeFileName: 'Business_management_paper_2__TZ1_SL_markscheme.txt' },
  { id: 'bm-2023-may-p2-tz2-hl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Business_management_paper_2__TZ2_HL.txt', markSchemeFileName: 'Business_management_paper_2__TZ2_HL_markscheme.txt' },
  { id: 'bm-2023-may-p2-tz2-sl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Business_management_paper_2__TZ2_SL.txt', markSchemeFileName: 'Business_management_paper_2__TZ2_SL_markscheme.txt' },

  // 2023 November Session - Business Management
  { id: 'bm-2023-nov-p2-tz1-hl', subject: 'business_management', subjectGroup: 'Individuals and societies', year: 2023, session: 'November', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Business_management_paper_2__TZ1_HL.txt', markSchemeFileName: 'Business_management_paper_2__TZ1_HL_markscheme.txt' },

  // 2023 May Session - Mathematics AA
  { id: 'math-aa-2023-may-p1-tz1-hl', subject: 'math_aa', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Mathematics_analysis_and_approaches_paper_1__TZ1_HL.txt', markSchemeFileName: 'Mathematics_analysis_and_approaches_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'math-aa-2023-may-p1-tz1-sl', subject: 'math_aa', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Mathematics_analysis_and_approaches_paper_1__TZ1_SL.txt', markSchemeFileName: 'Mathematics_analysis_and_approaches_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'math-aa-2023-may-p1-tz2-sl', subject: 'math_aa', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Mathematics_analysis_and_approaches_paper_1__TZ2_SL.txt', markSchemeFileName: 'Mathematics_analysis_and_approaches_paper_1__TZ2_SL_markscheme.txt' },
  { id: 'math-aa-2023-may-p2-tz1-hl', subject: 'math_aa', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 2, hasMarkScheme: true, fileName: 'Mathematics_analysis_and_approaches_paper_2__TZ1_HL.txt', markSchemeFileName: 'Mathematics_analysis_and_approaches_paper_2__TZ1_HL_markscheme.txt' },
  { id: 'math-aa-2023-may-p2-tz1-sl', subject: 'math_aa', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 2, hasMarkScheme: true, fileName: 'Mathematics_analysis_and_approaches_paper_2__TZ1_SL.txt', markSchemeFileName: 'Mathematics_analysis_and_approaches_paper_2__TZ1_SL_markscheme.txt' },

  // 2023 May Session - Mathematics AI
  { id: 'math-ai-2023-may-p1-tz1-hl', subject: 'math_ai', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Mathematics_applications_and_interpretation_paper_1__TZ1_HL.txt', markSchemeFileName: 'Mathematics_applications_and_interpretation_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'math-ai-2023-may-p1-tz1-sl', subject: 'math_ai', subjectGroup: 'Mathematics', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Mathematics_applications_and_interpretation_paper_1__TZ1_SL.txt', markSchemeFileName: 'Mathematics_applications_and_interpretation_paper_1__TZ1_SL_markscheme.txt' },

  // 2023 November Session - Mathematics AI
  { id: 'math-ai-2023-nov-p1-tz1-sl', subject: 'math_ai', subjectGroup: 'Mathematics', year: 2023, session: 'November', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Mathematics_applications_and_interpretation_paper_1__TZ1_SL.txt', markSchemeFileName: 'Mathematics_applications_and_interpretation_paper_1__TZ1_SL_markscheme.txt' },

  // 2023 May Session - Computer Science
  { id: 'cs-2023-may-p1-tz1-hl', subject: 'computer_science', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Computer_science_paper_1__TZ1_HL.txt', markSchemeFileName: 'Computer_science_paper_1__TZ1_HL_markscheme.txt' },
  { id: 'cs-2023-may-p1-tz1-sl', subject: 'computer_science', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Computer_science_paper_1__TZ1_SL.txt', markSchemeFileName: 'Computer_science_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'cs-2023-may-p1-tz2-hl', subject: 'computer_science', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Computer_science_paper_1__TZ2_HL.txt', markSchemeFileName: 'Computer_science_paper_1__TZ2_HL_markscheme.txt' },
  { id: 'cs-2023-may-p1-tz2-sl', subject: 'computer_science', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Computer_science_paper_1__TZ2_SL.txt', markSchemeFileName: 'Computer_science_paper_1__TZ2_SL_markscheme.txt' },

  // 2023 May Session - Design Technology
  { id: 'dt-2023-may-p1-tz1-sl', subject: 'design_technology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ1', level: 'SL', paper: 1, hasMarkScheme: true, fileName: 'Design_technology_paper_1__TZ1_SL.txt', markSchemeFileName: 'Design_technology_paper_1__TZ1_SL_markscheme.txt' },
  { id: 'dt-2023-may-p1-tz2-hl', subject: 'design_technology', subjectGroup: 'Experimental sciences', year: 2023, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Design_technology_paper_1__TZ2_HL.txt', markSchemeFileName: 'Design_technology_paper_1__TZ2_HL_markscheme.txt' },

  // 2022 May Session - Physics
  { id: 'phys-2022-may-p1-tz2-hl', subject: 'physics', subjectGroup: 'Experimental sciences', year: 2022, session: 'May', timezone: 'TZ2', level: 'HL', paper: 1, hasMarkScheme: true, fileName: 'Physics_paper_1__TZ2_HL.txt', markSchemeFileName: 'Physics_paper_1__TZ2_HL_markscheme.txt' },
];

// Helper functions
export function getSubjectsByGroup() {
  const groups: Record<string, SubjectInfo[]> = {};
  PAST_PAPER_SUBJECTS.forEach(subject => {
    if (!groups[subject.group]) {
      groups[subject.group] = [];
    }
    groups[subject.group].push(subject);
  });
  return groups;
}

export function getSubjectLabel(value: string): string {
  const subject = PAST_PAPER_SUBJECTS.find(s => s.value === value);
  return subject?.label || value;
}

export function getPapersForSubject(subject: string): PastPaper[] {
  return PAST_PAPERS_INDEX.filter(p => p.subject === subject);
}

export function getPapersForYear(year: number): PastPaper[] {
  return PAST_PAPERS_INDEX.filter(p => p.year === year);
}

export function filterPapers(filters: {
  subject?: string;
  year?: number;
  session?: 'May' | 'November';
  level?: 'SL' | 'HL';
  paper?: number;
}): PastPaper[] {
  return PAST_PAPERS_INDEX.filter(p => {
    if (filters.subject && p.subject !== filters.subject) return false;
    if (filters.year && p.year !== filters.year) return false;
    if (filters.session && p.session !== filters.session) return false;
    if (filters.level && p.level !== filters.level) return false;
    if (filters.paper && p.paper !== filters.paper) return false;
    return true;
  });
}

// Get unique values for filters
export function getAvailableYears(): number[] {
  return [...new Set(PAST_PAPERS_INDEX.map(p => p.year))].sort((a, b) => b - a);
}

export function getAvailableSubjects(): string[] {
  return [...new Set(PAST_PAPERS_INDEX.map(p => p.subject))];
}

export function getAvailableSessions(): string[] {
  return [...new Set(PAST_PAPERS_INDEX.map(p => p.session))];
}

// Statistics
export function getPaperStats() {
  const subjects = new Set(PAST_PAPERS_INDEX.map(p => p.subject));
  const years = new Set(PAST_PAPERS_INDEX.map(p => p.year));
  const withMarkSchemes = PAST_PAPERS_INDEX.filter(p => p.hasMarkScheme).length;
  
  return {
    totalPapers: PAST_PAPERS_INDEX.length,
    totalSubjects: subjects.size,
    totalYears: years.size,
    withMarkSchemes,
    oldestYear: Math.min(...years),
    newestYear: Math.max(...years),
  };
}
