// Citation formatting utilities for multiple academic styles

export type CitationStyle = 'harvard' | 'vancouver' | 'apa' | 'mla' | 'chicago' | 'ieee';

export type SourceType = 'book' | 'journal' | 'website' | 'newspaper' | 'conference' | 'thesis' | 'other';

export interface Citation {
  id: string;
  type: SourceType;
  authors: string; // Comma-separated list of authors
  title: string;
  year: string;
  // Book/Journal specific
  publisher?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  edition?: string;
  // Website specific
  url?: string;
  accessDate?: string;
  websiteName?: string;
  // Newspaper specific
  newspaper?: string;
  // Conference specific
  conference?: string;
  location?: string;
  // Thesis specific
  university?: string;
  thesisType?: string; // PhD, Master's, etc.
  // DOI
  doi?: string;
}

export interface CitationData extends Citation {
  draft_id: string;
  user_id: string;
  style: CitationStyle;
  created_at: string;
  order_index: number;
}

// Parse author string to array
const parseAuthors = (authors: string): string[] => {
  return authors.split(',').map(a => a.trim()).filter(Boolean);
};

// Format author name (Last, First) -> various formats
const formatAuthorHarvard = (author: string): string => {
  const parts = author.trim().split(' ');
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const firstNames = parts.slice(0, -1).map(n => n[0] + '.').join(' ');
  return `${lastName}, ${firstNames}`;
};

const formatAuthorAPA = (author: string): string => {
  const parts = author.trim().split(' ');
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map(n => n[0] + '.').join(' ');
  return `${lastName}, ${initials}`;
};

const formatAuthorMLA = (author: string): string => {
  const parts = author.trim().split(' ');
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const firstNames = parts.slice(0, -1).join(' ');
  return `${lastName}, ${firstNames}`;
};

const formatAuthorVancouver = (author: string): string => {
  const parts = author.trim().split(' ');
  if (parts.length === 1) return parts[0];
  const lastName = parts[parts.length - 1];
  const initials = parts.slice(0, -1).map(n => n[0]).join('');
  return `${lastName} ${initials}`;
};

// Format multiple authors for different styles
const formatAuthorsHarvard = (authors: string): string => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return '';
  if (authorList.length === 1) return formatAuthorHarvard(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorHarvard(authorList[0])} and ${formatAuthorHarvard(authorList[1])}`;
  }
  return `${formatAuthorHarvard(authorList[0])} et al.`;
};

const formatAuthorsAPA = (authors: string): string => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return '';
  if (authorList.length === 1) return formatAuthorAPA(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorAPA(authorList[0])}, & ${formatAuthorAPA(authorList[1])}`;
  }
  const formatted = authorList.slice(0, -1).map(formatAuthorAPA).join(', ');
  return `${formatted}, & ${formatAuthorAPA(authorList[authorList.length - 1])}`;
};

const formatAuthorsMLA = (authors: string): string => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return '';
  if (authorList.length === 1) return formatAuthorMLA(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorMLA(authorList[0])}, and ${authorList[1]}`;
  }
  return `${formatAuthorMLA(authorList[0])}, et al.`;
};

const formatAuthorsVancouver = (authors: string): string => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return '';
  if (authorList.length <= 6) {
    return authorList.map(formatAuthorVancouver).join(', ');
  }
  return `${authorList.slice(0, 6).map(formatAuthorVancouver).join(', ')}, et al`;
};

const formatAuthorsChicago = (authors: string): string => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return '';
  if (authorList.length === 1) return formatAuthorMLA(authorList[0]);
  if (authorList.length === 2) {
    return `${formatAuthorMLA(authorList[0])} and ${authorList[1]}`;
  }
  return `${formatAuthorMLA(authorList[0])}, et al.`;
};

const formatAuthorsIEEE = (authors: string): string => {
  const authorList = parseAuthors(authors);
  if (authorList.length === 0) return '';
  return authorList.map(author => {
    const parts = author.trim().split(' ');
    if (parts.length === 1) return parts[0];
    const lastName = parts[parts.length - 1];
    const initials = parts.slice(0, -1).map(n => n[0] + '.').join(' ');
    return `${initials} ${lastName}`;
  }).join(', ');
};

// Format inline citation (in-text)
export const formatInlineCitation = (citation: Citation, style: CitationStyle, index?: number): string => {
  const authorList = parseAuthors(citation.authors);
  const firstAuthor = authorList[0]?.split(' ').pop() || 'Unknown';
  
  switch (style) {
    case 'harvard':
      return authorList.length > 2 
        ? `(${firstAuthor} et al., ${citation.year})`
        : `(${authorList.map(a => a.split(' ').pop()).join(' & ')}, ${citation.year})`;
    
    case 'apa':
      return authorList.length > 2
        ? `(${firstAuthor} et al., ${citation.year})`
        : `(${authorList.map(a => a.split(' ').pop()).join(' & ')}, ${citation.year})`;
    
    case 'mla':
      return authorList.length > 2
        ? `(${firstAuthor} et al.)`
        : `(${authorList.map(a => a.split(' ').pop()).join(' and ')})`;
    
    case 'vancouver':
      return `[${index !== undefined ? index + 1 : '?'}]`;
    
    case 'chicago':
      return `(${firstAuthor} ${citation.year})`;
    
    case 'ieee':
      return `[${index !== undefined ? index + 1 : '?'}]`;
    
    default:
      return `(${firstAuthor}, ${citation.year})`;
  }
};

// Format full bibliography entry
export const formatBibliographyEntry = (citation: Citation, style: CitationStyle, index?: number): string => {
  switch (style) {
    case 'harvard':
      return formatHarvard(citation);
    case 'vancouver':
      return formatVancouver(citation, index);
    case 'apa':
      return formatAPA(citation);
    case 'mla':
      return formatMLA(citation);
    case 'chicago':
      return formatChicago(citation);
    case 'ieee':
      return formatIEEE(citation, index);
    default:
      return formatHarvard(citation);
  }
};

// Harvard Style
const formatHarvard = (c: Citation): string => {
  const authors = formatAuthorsHarvard(c.authors);
  
  switch (c.type) {
    case 'book':
      let book = `${authors} (${c.year}) ${c.title}.`;
      if (c.edition) book += ` ${c.edition} edn.`;
      if (c.location && c.publisher) book += ` ${c.location}: ${c.publisher}.`;
      else if (c.publisher) book += ` ${c.publisher}.`;
      return book;
    
    case 'journal':
      let journal = `${authors} (${c.year}) '${c.title}', ${c.journal}`;
      if (c.volume) journal += `, ${c.volume}`;
      if (c.issue) journal += `(${c.issue})`;
      if (c.pages) journal += `, pp. ${c.pages}`;
      journal += '.';
      if (c.doi) journal += ` doi: ${c.doi}`;
      return journal;
    
    case 'website':
      let website = `${authors} (${c.year}) ${c.title}.`;
      if (c.websiteName) website += ` ${c.websiteName}.`;
      website += ` Available at: ${c.url}`;
      if (c.accessDate) website += ` (Accessed: ${c.accessDate})`;
      return website;
    
    default:
      return `${authors} (${c.year}) ${c.title}. ${c.publisher || ''}`;
  }
};

// Vancouver Style (numbered)
const formatVancouver = (c: Citation, index?: number): string => {
  const num = index !== undefined ? `${index + 1}. ` : '';
  const authors = formatAuthorsVancouver(c.authors);
  
  switch (c.type) {
    case 'book':
      let book = `${num}${authors}. ${c.title}.`;
      if (c.edition) book += ` ${c.edition} ed.`;
      if (c.location) book += ` ${c.location}:`;
      if (c.publisher) book += ` ${c.publisher};`;
      book += ` ${c.year}.`;
      return book;
    
    case 'journal':
      let journal = `${num}${authors}. ${c.title}. ${c.journal}. ${c.year}`;
      if (c.volume) journal += `;${c.volume}`;
      if (c.issue) journal += `(${c.issue})`;
      if (c.pages) journal += `:${c.pages}`;
      journal += '.';
      return journal;
    
    case 'website':
      let website = `${num}${authors}. ${c.title} [Internet].`;
      if (c.websiteName) website += ` ${c.websiteName};`;
      website += ` ${c.year}`;
      if (c.accessDate) website += ` [cited ${c.accessDate}]`;
      if (c.url) website += `. Available from: ${c.url}`;
      return website;
    
    default:
      return `${num}${authors}. ${c.title}. ${c.publisher || ''}; ${c.year}.`;
  }
};

// APA Style
const formatAPA = (c: Citation): string => {
  const authors = formatAuthorsAPA(c.authors);
  
  switch (c.type) {
    case 'book':
      let book = `${authors} (${c.year}). ${c.title}`;
      if (c.edition) book += ` (${c.edition} ed.)`;
      book += '.';
      if (c.publisher) book += ` ${c.publisher}.`;
      if (c.doi) book += ` https://doi.org/${c.doi}`;
      return book;
    
    case 'journal':
      let journal = `${authors} (${c.year}). ${c.title}. ${c.journal}`;
      if (c.volume) journal += `, ${c.volume}`;
      if (c.issue) journal += `(${c.issue})`;
      if (c.pages) journal += `, ${c.pages}`;
      journal += '.';
      if (c.doi) journal += ` https://doi.org/${c.doi}`;
      return journal;
    
    case 'website':
      let website = `${authors} (${c.year}). ${c.title}.`;
      if (c.websiteName) website += ` ${c.websiteName}.`;
      if (c.url) website += ` ${c.url}`;
      return website;
    
    default:
      return `${authors} (${c.year}). ${c.title}. ${c.publisher || ''}`;
  }
};

// MLA Style
const formatMLA = (c: Citation): string => {
  const authors = formatAuthorsMLA(c.authors);
  
  switch (c.type) {
    case 'book':
      let book = `${authors}. ${c.title}.`;
      if (c.edition) book += ` ${c.edition} ed.,`;
      if (c.publisher) book += ` ${c.publisher},`;
      book += ` ${c.year}.`;
      return book;
    
    case 'journal':
      let journal = `${authors}. "${c.title}." ${c.journal}`;
      if (c.volume) journal += `, vol. ${c.volume}`;
      if (c.issue) journal += `, no. ${c.issue}`;
      journal += `, ${c.year}`;
      if (c.pages) journal += `, pp. ${c.pages}`;
      journal += '.';
      if (c.doi) journal += ` doi:${c.doi}`;
      return journal;
    
    case 'website':
      let website = `${authors}. "${c.title}."`;
      if (c.websiteName) website += ` ${c.websiteName},`;
      website += ` ${c.year}`;
      if (c.url) website += `, ${c.url}`;
      if (c.accessDate) website += `. Accessed ${c.accessDate}`;
      website += '.';
      return website;
    
    default:
      return `${authors}. ${c.title}. ${c.publisher || ''}, ${c.year}.`;
  }
};

// Chicago Style
const formatChicago = (c: Citation): string => {
  const authors = formatAuthorsChicago(c.authors);
  
  switch (c.type) {
    case 'book':
      let book = `${authors}. ${c.title}.`;
      if (c.location && c.publisher) book += ` ${c.location}: ${c.publisher},`;
      else if (c.publisher) book += ` ${c.publisher},`;
      book += ` ${c.year}.`;
      return book;
    
    case 'journal':
      let journal = `${authors}. "${c.title}." ${c.journal}`;
      if (c.volume) journal += ` ${c.volume}`;
      if (c.issue) journal += `, no. ${c.issue}`;
      journal += ` (${c.year})`;
      if (c.pages) journal += `: ${c.pages}`;
      journal += '.';
      if (c.doi) journal += ` https://doi.org/${c.doi}.`;
      return journal;
    
    case 'website':
      let website = `${authors}. "${c.title}."`;
      if (c.websiteName) website += ` ${c.websiteName}.`;
      if (c.accessDate) website += ` Accessed ${c.accessDate}.`;
      if (c.url) website += ` ${c.url}.`;
      return website;
    
    default:
      return `${authors}. ${c.title}. ${c.publisher || ''}, ${c.year}.`;
  }
};

// IEEE Style (numbered)
const formatIEEE = (c: Citation, index?: number): string => {
  const num = index !== undefined ? `[${index + 1}] ` : '';
  const authors = formatAuthorsIEEE(c.authors);
  
  switch (c.type) {
    case 'book':
      let book = `${num}${authors}, ${c.title}.`;
      if (c.location) book += ` ${c.location}:`;
      if (c.publisher) book += ` ${c.publisher},`;
      book += ` ${c.year}.`;
      return book;
    
    case 'journal':
      let journal = `${num}${authors}, "${c.title}," ${c.journal}`;
      if (c.volume) journal += `, vol. ${c.volume}`;
      if (c.issue) journal += `, no. ${c.issue}`;
      if (c.pages) journal += `, pp. ${c.pages}`;
      journal += `, ${c.year}.`;
      return journal;
    
    case 'website':
      let website = `${num}${authors}, "${c.title},"`;
      if (c.websiteName) website += ` ${c.websiteName},`;
      if (c.accessDate) website += ` Accessed: ${c.accessDate}.`;
      website += ` [Online]. Available: ${c.url}`;
      return website;
    
    default:
      return `${num}${authors}, ${c.title}. ${c.publisher || ''}, ${c.year}.`;
  }
};

// Get style display name
export const getStyleDisplayName = (style: CitationStyle): string => {
  const names: Record<CitationStyle, string> = {
    harvard: 'Harvard',
    vancouver: 'Vancouver',
    apa: 'APA 7th',
    mla: 'MLA 9th',
    chicago: 'Chicago',
    ieee: 'IEEE',
  };
  return names[style];
};

// Get source type display name
export const getSourceTypeDisplayName = (type: SourceType): string => {
  const names: Record<SourceType, string> = {
    book: 'Book',
    journal: 'Journal Article',
    website: 'Website',
    newspaper: 'Newspaper',
    conference: 'Conference Paper',
    thesis: 'Thesis/Dissertation',
    other: 'Other',
  };
  return names[type];
};

// Generate unique ID
export const generateCitationId = (): string => {
  return `cite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
