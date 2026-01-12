export interface PastPaper {
  id: string;
  subject: string;
  year: string;
  session: string;
  level: string;
  paperNumber: string;
  timezone: string;
  filepath: string;
  markSchemeFile: string | null;
  title: string;
}

export interface PapersIndex {
  generated: string;
  totalPapers: number;
  totalMarkSchemes: number;
  papers: PastPaper[];
}

export async function loadPapersIndex(): Promise<PapersIndex> {
  try {
    const response = await fetch('/papers/papers-index.json');
    if (!response.ok) {
      throw new Error(`Failed to load papers index: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading papers index:', error);
    throw error;
  }
}

export async function loadPaperContent(filepath: string): Promise<string> {
  try {
    const response = await fetch(`/papers/${filepath}`);
    if (!response.ok) {
      throw new Error(`Failed to load paper: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading paper content:', error);
    throw error;
  }
}

export async function loadMarkScheme(filepath: string): Promise<string> {
  try {
    const response = await fetch(`/papers/${filepath}`);
    if (!response.ok) {
      throw new Error(`Failed to load mark scheme: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading mark scheme:', error);
    throw error;
  }
}
