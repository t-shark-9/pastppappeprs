import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Subject mapping based on the indexing system
const SUBJECT_MAP: Record<string, Record<string, string>> = {
  '00': { '00': 'tok', '01': 'ee', '02': 'tok_essay', '03': 'tok_exhibition' },
  '01': { '01': 'lang_a_literature', '02': 'lang_a_lang_lit', '03': 'literature_performance', '04': 'latin', '05': 'classical_greek' },
  '02': { 
    '01': 'english_b', '02': 'french_b', '03': 'spanish_b', '04': 'german_b', '05': 'italian_b',
    '06': 'japanese_b', '07': 'mandarin_b', '08': 'arabic_ab', '09': 'chinese_ab', '10': 'hindi_ab',
    '11': 'japanese_ab', '12': 'korean_ab', '13': 'portuguese_ab', '14': 'russian_ab', '15': 'spanish_ab'
  },
  '03': { 
    '01': 'business_management', '02': 'economics', '03': 'geography', '04': 'history',
    '05': 'global_politics', '06': 'philosophy', '07': 'psychology', '08': 'social_cultural_anthropology',
    '09': 'world_religions', '10': 'digital_society'
  },
  '04': { 
    '01': 'biology', '02': 'chemistry', '03': 'physics', '04': 'computer_science',
    '05': 'design_technology', '06': 'ess', '07': 'sehs'
  },
  '05': { '01': 'math_aa', '02': 'math_ai' },
  '06': { '01': 'visual_arts', '02': 'music', '03': 'theatre', '04': 'dance', '05': 'film', '06': 'drama' }
};

// Year mapping for the 2-digit year codes
const YEAR_MAP: Record<string, number> = {
  '10': 2010, '11': 2011, '12': 2012, '13': 2013, '14': 2014,
  '15': 2015, '16': 2016, '17': 2017, '18': 2018, '19': 2019,
  '20': 2020, '21': 2021, '22': 2022, '23': 2023, '24': 2024,
  '25': 2025, '26': 2026, '27': 2027, '28': 2028,
  '40': 2014, '41': 2015, '42': 2016, '43': 2017, '44': 2018,
  '50': 2019, '54': 2020, '01': 2001, '30': 2013, '45': 2019
};

// Session mapping based on year code patterns
function getSession(yearCode: string): string | null {
  const code = parseInt(yearCode, 10);
  if (code >= 40 && code <= 49) return 'November';
  if (code >= 50 && code <= 59) return 'May';
  if (code >= 10 && code <= 29) return 'May';
  if (code >= 30 && code <= 39) return 'November';
  return null;
}

function parseFilename(filename: string): {
  code: string;
  subject: string;
  year: number;
  session: string | null;
  paper_number: string | null;
  timezone: string | null;
  level: string | null;
  is_markscheme: boolean;
  is_resource: boolean;
  doc_type: number;
  name: string;
} | null {
  // Format: 101-00-01-27-P3-001.pdf or 101-00-01-27-P3-MS-001_markscheme.pdf
  // [TYPE]-[GROUP]-[SUBJECT]-[YEAR]-[PAPER]-[EXTRAS]-[SEQUENCE]
  
  const cleanName = filename.replace('.pdf', '');
  const parts = cleanName.split('-');
  
  if (parts.length < 5) return null;
  
  const typeCode = parts[0]; // e.g., "101", "102"
  const groupCode = parts[1]; // e.g., "00", "01", "02"
  const subjectCode = parts[2]; // e.g., "01", "02"
  const yearCode = parts[3]; // e.g., "27", "10", "43"
  
  // Determine subject
  const subjectGroup = SUBJECT_MAP[groupCode];
  const subject = subjectGroup?.[subjectCode] || 'other';
  
  // Determine year
  const year = YEAR_MAP[yearCode] || (2000 + parseInt(yearCode, 10));
  
  // Determine session
  const session = getSession(yearCode);
  
  // Parse paper number and check for markscheme
  let paper_number: string | null = null;
  let is_markscheme = false;
  let is_resource = false;
  
  for (let i = 4; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('P') && /^P\d+$/.test(part)) {
      paper_number = part.replace('P', '');
    }
    if (part === 'MS' || filename.includes('markscheme')) {
      is_markscheme = true;
    }
    if (part === 'QUE' || part === 'TEX' || part === 'CAS') {
      is_resource = true;
    }
  }
  
  // Determine level from type code
  const level = typeCode.endsWith('1') ? 'HL' : typeCode.endsWith('2') ? 'SL' : null;
  
  // Determine doc_type
  let doc_type = 1; // Default: question paper
  if (is_markscheme) doc_type = 2;
  if (is_resource) doc_type = 4;
  
  return {
    code: cleanName,
    subject,
    year,
    session,
    paper_number,
    timezone: null,
    level,
    is_markscheme,
    is_resource,
    doc_type,
    name: filename,
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(`[${new Date().toISOString()}] ${msg}`);
  };

  try {
    const body = await req.json();
    const { 
      files, 
      baseUrl, 
      batchSize = 50,
      clearExisting = false 
    } = body;
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    // Clear existing non-specimen papers if requested
    if (clearExisting) {
      log('Clearing existing non-specimen papers from storage and database...');
      
      // Delete from database first (not specimen)
      const { data: papersToDelete, error: fetchError } = await supabaseAdmin
        .from('past_papers')
        .select('id, code, file_url')
        .not('session', 'eq', 'Specimen')
        .not('code', 'like', 'specimen_%')
        .not('code', 'like', '182-%'); // Skip specimen papers with 182 prefix
      
      if (fetchError) {
        log(`Error fetching papers to delete: ${fetchError.message}`);
      } else if (papersToDelete && papersToDelete.length > 0) {
        log(`Found ${papersToDelete.length} non-specimen papers to delete`);
        
        // Collect storage paths from file_urls
        const storagePaths: string[] = [];
        for (const paper of papersToDelete) {
          if (paper.file_url) {
            // Extract path from URL: https://xxx.supabase.co/storage/v1/object/public/past-papers/subject/year/file.pdf
            const match = paper.file_url.match(/\/past-papers\/(.+)$/);
            if (match) {
              storagePaths.push(match[1]);
            }
          }
        }
        
        // Delete files from storage in batches
        if (storagePaths.length > 0) {
          log(`Deleting ${storagePaths.length} files from storage...`);
          const batchSizeDelete = 100;
          for (let i = 0; i < storagePaths.length; i += batchSizeDelete) {
            const batch = storagePaths.slice(i, i + batchSizeDelete);
            const { error: storageError } = await supabaseAdmin.storage
              .from('past-papers')
              .remove(batch);
            if (storageError) {
              log(`Storage delete batch error: ${storageError.message}`);
            } else {
              log(`Deleted storage batch ${i / batchSizeDelete + 1}`);
            }
          }
        }
        
        // Delete from database
        const { error: deleteError } = await supabaseAdmin
          .from('past_papers')
          .delete()
          .not('session', 'eq', 'Specimen')
          .not('code', 'like', 'specimen_%')
          .not('code', 'like', '182-%');
        
        if (deleteError) {
          log(`Database delete error: ${deleteError.message}`);
        } else {
          log('Successfully cleared non-specimen papers from database');
        }
      } else {
        log('No non-specimen papers found to delete');
      }
      
      return new Response(JSON.stringify({
        message: 'Clear operation completed',
        logs,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!files || !Array.isArray(files) || files.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No files provided. Send { files: ["filename1.pdf", ...], baseUrl: "https://..." }',
        logs 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    log(`Received ${files.length} files to process`);

    const results = {
      processed: 0,
      uploaded: 0,
      skipped: 0,
      errors: [] as string[],
    };

    // Process files in smaller batches to avoid timeout
    const filesToProcess = files.slice(0, batchSize);
    
    for (const filename of filesToProcess) {
      results.processed++;
      
      try {
        const metadata = parseFilename(filename);
        
        if (!metadata) {
          log(`Could not parse: ${filename}`);
          results.skipped++;
          continue;
        }

        // Check if already exists
        const { data: existingRecord } = await supabaseAdmin
          .from('past_papers')
          .select('id')
          .eq('code', metadata.code)
          .maybeSingle();

        if (existingRecord) {
          log(`Already exists: ${metadata.code}`);
          results.skipped++;
          continue;
        }

        // Download from public URL
        const fileUrl = `${baseUrl}/${encodeURIComponent(filename)}`;
        log(`Fetching: ${fileUrl}`);
        
        const response = await fetch(fileUrl);
        if (!response.ok) {
          log(`Failed to fetch: ${filename} - ${response.status}`);
          results.errors.push(`Fetch failed: ${filename}`);
          continue;
        }

        const pdfBuffer = new Uint8Array(await response.arrayBuffer());
        
        // Upload to Supabase storage
        const storagePath = `${metadata.subject}/${metadata.year}/${filename}`;
        
        const { error: uploadError } = await supabaseAdmin.storage
          .from('past-papers')
          .upload(storagePath, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true,
          });

        if (uploadError) {
          log(`Upload error: ${uploadError.message}`);
          results.errors.push(`Upload: ${filename} - ${uploadError.message}`);
          continue;
        }

        // Get public URL
        const { data: publicUrlData } = supabaseAdmin.storage
          .from('past-papers')
          .getPublicUrl(storagePath);

        // Insert into database
        const { error: dbError } = await supabaseAdmin
          .from('past_papers')
          .upsert({
            code: metadata.code,
            name: metadata.name,
            subject: metadata.subject,
            year: metadata.year,
            session: metadata.session,
            paper_number: metadata.paper_number,
            timezone: metadata.timezone,
            level: metadata.level,
            is_markscheme: metadata.is_markscheme,
            is_resource: metadata.is_resource,
            doc_type: metadata.doc_type,
            file_url: publicUrlData.publicUrl,
          }, { onConflict: 'code' });

        if (dbError) {
          log(`DB error: ${dbError.message}`);
          results.errors.push(`DB: ${filename} - ${dbError.message}`);
        } else {
          log(`Uploaded: ${metadata.code}`);
          results.uploaded++;
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        log(`Error: ${filename} - ${errMsg}`);
        results.errors.push(`${filename}: ${errMsg}`);
      }
    }

    return new Response(JSON.stringify({
      ...results,
      remainingFiles: files.length - filesToProcess.length,
      logs,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    log(`Error: ${errMsg}`);
    return new Response(JSON.stringify({ error: errMsg, logs }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
