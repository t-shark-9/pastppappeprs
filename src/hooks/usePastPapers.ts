import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PastPaper {
  id: string;
  code: string;
  name: string;
  subject: string;
  year: number;
  level: string | null;
  timezone: string | null;
  session: string | null;
  paper_number: string | null;
  is_markscheme: boolean;
  is_resource: boolean;
  doc_type: number;
  file_url: string | null;
}

interface UsePastPapersResult {
  papers: PastPaper[];
  years: number[];
  subjects: string[];
  loading: boolean;
  error: string | null;
}

export function usePastPapers(): UsePastPapersResult {
  const [papers, setPapers] = useState<PastPaper[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPapers() {
      try {
        setLoading(true);
        
        // Fetch ALL papers using pagination (Supabase default limit is 1000)
        const allPapers: PastPaper[] = [];
        const pageSize = 1000;
        let page = 0;
        let hasMore = true;
        
        while (hasMore) {
          const { data, error: fetchError } = await supabase
            .from('past_papers')
            .select('*')
            .order('year', { ascending: false })
            .order('subject', { ascending: true })
            .range(page * pageSize, (page + 1) * pageSize - 1);

          if (fetchError) throw fetchError;
          
          if (data && data.length > 0) {
            allPapers.push(...(data as PastPaper[]));
            page++;
            hasMore = data.length === pageSize;
          } else {
            hasMore = false;
          }
        }

        const papersData = allPapers;
        setPapers(papersData);

        // Extract unique years
        const uniqueYears = [...new Set(papersData.map(p => p.year))].sort((a, b) => b - a);
        setYears(uniqueYears);

        // Extract unique subjects
        const uniqueSubjects = [...new Set(papersData.map(p => p.subject))].sort();
        setSubjects(uniqueSubjects);

      } catch (err) {
        console.error('Error fetching papers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load papers');
      } finally {
        setLoading(false);
      }
    }

    fetchPapers();
  }, []);

  return { papers, years, subjects, loading, error };
}

// Helper to group papers by year and subject
export function groupPapersByYear(
  papers: PastPaper[]
): Record<string, Record<string, PastPaper[]>> {
  const grouped: Record<string, Record<string, PastPaper[]>> = {};
  
  for (const paper of papers) {
    const yearKey = paper.year.toString();
    if (!grouped[yearKey]) grouped[yearKey] = {};
    if (!grouped[yearKey][paper.subject]) grouped[yearKey][paper.subject] = [];
    grouped[yearKey][paper.subject].push(paper);
  }
  
  return grouped;
}

// Helper to group papers by subject and year
export function groupPapersBySubject(
  papers: PastPaper[]
): Record<string, Record<string, PastPaper[]>> {
  const grouped: Record<string, Record<string, PastPaper[]>> = {};
  
  for (const paper of papers) {
    if (!grouped[paper.subject]) grouped[paper.subject] = {};
    const yearKey = paper.year.toString();
    if (!grouped[paper.subject][yearKey]) grouped[paper.subject][yearKey] = [];
    grouped[paper.subject][yearKey].push(paper);
  }
  
  return grouped;
}
