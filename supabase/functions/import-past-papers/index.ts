import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaperEntry {
  code: string;
  name: string;
  path: string;
  level: string;
  timezone: string;
  session: string | null;
  paper_number: string;
  is_markscheme: boolean;
  is_resource: boolean;
  doc_type: number;
}

// Flat specimen paper format (array of objects with name, group, subject)
interface SpecimenPaperFlat {
  name: string;
  group: string;
  subject: string;
}

interface PapersData {
  past_papers: Record<string, Record<string, PaperEntry[]>>;
  // Can be nested like past_papers OR a flat array
  specimen_papers?: Record<string, Record<string, PaperEntry[]>> | SpecimenPaperFlat[];
}

interface PaperRecord {
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

async function importPapers(supabase: SupabaseClient, data: PapersData, clearExisting: boolean) {
  let totalInserted = 0;
  const errors: string[] = [];

  // Optionally clear existing data
  if (clearExisting) {
    console.log('Clearing existing past papers...');
    const { error: deleteError } = await supabase.from('past_papers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) {
      console.error('Error clearing existing data:', deleteError);
      errors.push(`Failed to clear existing data: ${deleteError.message}`);
    }
  }

  // Batch insert for better performance
  const batchSize = 100;
  const records: PaperRecord[] = [];

  // Process past_papers
  if (data.past_papers && typeof data.past_papers === 'object') {
    console.log('Processing past_papers...');
    for (const [year, subjects] of Object.entries(data.past_papers)) {
      const yearNum = parseInt(year, 10);
      if (isNaN(yearNum) || !subjects || typeof subjects !== 'object') continue;
      
      for (const [subject, papers] of Object.entries(subjects)) {
        // Skip if papers is not an array
        if (!Array.isArray(papers)) {
          console.warn(`Skipping non-array subject: ${year}/${subject}`);
          continue;
        }
        
        const normalizedSubject = subject.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
        
        for (const paper of papers) {
          if (!paper || !paper.code) continue;
          records.push({
            code: paper.code,
            name: paper.name || paper.code,
            subject: normalizedSubject,
            year: yearNum,
            level: paper.level || null,
            timezone: paper.timezone || null,
            session: paper.session || null,
            paper_number: paper.paper_number || null,
            is_markscheme: paper.is_markscheme || false,
            is_resource: paper.is_resource || false,
            doc_type: paper.doc_type || 0,
            file_url: null,
          });
        }
      }
    }
  }

  // Process specimen_papers if present
  if (data.specimen_papers) {
    console.log('Processing specimen_papers...');
    
    // Check if it's a flat array format [{name, group, subject}]
    if (Array.isArray(data.specimen_papers)) {
      console.log(`Found ${data.specimen_papers.length} specimen papers (flat array format)`);
      for (const paper of data.specimen_papers) {
        if (!paper || !paper.name) continue;
        const normalizedSubject = paper.subject.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
        // Generate a unique code from name
        const code = `specimen_${paper.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}`;
        records.push({
          code: code,
          name: paper.name,
          subject: normalizedSubject,
          year: 2024, // Default year for specimens
          level: null,
          timezone: null,
          session: 'Specimen',
          paper_number: null,
          is_markscheme: paper.name.toLowerCase().includes('markscheme') || paper.name.toLowerCase().includes('ms'),
          is_resource: false,
          doc_type: 0,
          file_url: null,
        });
      }
    } else if (typeof data.specimen_papers === 'object') {
      // Nested format like past_papers: {year: {subject: [papers]}}
      for (const [year, subjects] of Object.entries(data.specimen_papers)) {
        const yearNum = parseInt(year, 10);
        if (isNaN(yearNum) || !subjects || typeof subjects !== 'object') continue;
        
        for (const [subject, papers] of Object.entries(subjects as Record<string, PaperEntry[]>)) {
          if (!Array.isArray(papers)) {
            console.warn(`Skipping non-array specimen subject: ${year}/${subject}`);
            continue;
          }
          
          const normalizedSubject = subject.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
          
          for (const paper of papers) {
            if (!paper || !paper.code) continue;
            records.push({
              code: `specimen_${paper.code}`,
              name: paper.name || paper.code,
              subject: normalizedSubject,
              year: yearNum,
              level: paper.level || null,
              timezone: paper.timezone || null,
              session: 'Specimen',
              paper_number: paper.paper_number || null,
              is_markscheme: paper.is_markscheme || false,
              is_resource: paper.is_resource || false,
              doc_type: paper.doc_type || 0,
              file_url: null,
            });
          }
        }
      }
    }
  }

  console.log(`Total records to insert: ${records.length}`);

  // Insert in batches
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
     
    const { error } = await supabase
      .from('past_papers')
      .upsert(batch as any, { onConflict: 'code', ignoreDuplicates: false });

    if (error) {
      console.error(`Error inserting batch ${i / batchSize}:`, error);
      errors.push(`Batch ${i / batchSize}: ${error.message}`);
    } else {
      totalInserted += batch.length;
    }
    
    // Log progress every 10 batches
    if ((i / batchSize) % 10 === 0) {
      console.log(`Progress: ${i + batch.length} / ${records.length}`);
    }
  }

  return { totalInserted, errors };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { json_url, papers_data, clear_existing = false } = body;
    
    let data: PapersData;
    
    if (json_url) {
      // Fetch JSON from URL
      console.log(`Fetching papers data from: ${json_url}`);
      const response = await fetch(json_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON from URL: ${response.status} ${response.statusText}`);
      }
      data = await response.json();
    } else if (papers_data) {
      // Use inline data
      data = papers_data;
    } else {
      return new Response(
        JSON.stringify({ error: 'Either json_url or papers_data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { totalInserted, errors } = await importPapers(supabase, data, clear_existing);

    console.log(`Import complete: ${totalInserted} inserted, ${errors.length} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        inserted: totalInserted,
        errors: errors.slice(0, 50),
        total_errors: errors.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
