import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STORAGE_BUCKET = 'pastpapers';

// Hardcoded file lists by directory (since server doesn't expose directory listings)
const DIRECTORY_FILES: Record<string, string[]> = {
  '142': [
    "142-00-01-22-P3-001.pdf",
    "142-00-02-21-P1-001.pdf",
    "142-00-01-23-P3-001.pdf",
    "142-00-01-23-P3-002.pdf",
    "142-00-01-23-P3-003.pdf",
    "142-00-01-24-P3-001.pdf",
    "142-00-01-25-P3-001.pdf",
    "142-00-01-27-P1-001.pdf",
    "142-00-01-27-P3-001.pdf",
    "142-00-01-28-P1-001.pdf",
    "142-00-01-40-P1-001.pdf",
    "142-00-01-40-P2-001.pdf",
    "142-00-01-40-P3-001.pdf",
    "142-00-01-41-P1-001.pdf",
    "142-00-01-41-P2-001.pdf",
    "142-00-01-41-P3-001.pdf",
    "142-00-01-42-P1-001.pdf",
    "142-00-01-42-P2-001.pdf",
    "142-00-01-43-P1-001.pdf",
    "142-00-01-43-P2-001.pdf",
    "142-00-01-43-P3-001.pdf",
    "142-00-01-44-P1-001.pdf",
    "142-00-01-44-P2-001.pdf",
    "142-00-01-44-P3-001.pdf",
    "142-00-01-50-P3-001.pdf",
    "142-00-01-50-P3-002.pdf",
    "142-00-01-50-P3-003.pdf",
    "142-00-02-01-P1-001.pdf",
    "142-00-02-01-P1-002.pdf",
    "142-00-02-01-P1-004.pdf",
    "142-00-02-01-P1-005.pdf",
    "142-00-02-01-P2-001.pdf",
    "142-00-02-01-P2-002.pdf",
    "142-00-02-10-P2-001.pdf",
    "142-00-02-11-P1-001.pdf",
    "142-00-02-11-P2-001.pdf",
    "142-00-02-21-P2-001.pdf",
    "142-00-02-27-P1-001.pdf",
    "142-00-02-28-P1-001.pdf",
    "142-00-02-30-P1-001.pdf",
  ],
  '212': [
    "212-00-01-28-P1-001.pdf",
    "212-00-01-44-P1-001.pdf",
  ],
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
  '01': 2001, '10': 2010, '11': 2011, '12': 2012, '13': 2013, '14': 2014,
  '15': 2015, '16': 2016, '17': 2017, '18': 2018, '19': 2019,
  '20': 2020, '21': 2021, '22': 2022, '23': 2023, '24': 2024,
  '25': 2025, '26': 2026, '27': 2027, '28': 2028, '29': 2029,
  '30': 2013, '40': 2014, '41': 2015, '42': 2016, '43': 2017, '44': 2018, '45': 2019,
  '50': 2019, '54': 2020
};

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
  const cleanName = filename.replace('.pdf', '');
  const parts = cleanName.split('-');
  
  if (parts.length < 5) return null;
  
  const typeCode = parts[0];
  const groupCode = parts[1];
  const subjectCode = parts[2];
  const yearCode = parts[3];
  
  const subjectGroup = SUBJECT_MAP[groupCode];
  const subject = subjectGroup?.[subjectCode] || 'other';
  const year = YEAR_MAP[yearCode] || (2000 + parseInt(yearCode, 10));
  const session = getSession(yearCode);
  
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
  
  const level = typeCode.endsWith('1') ? 'HL' : typeCode.endsWith('2') ? 'SL' : null;
  
  let doc_type = 1;
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
    const { directory, baseUrl } = await req.json();

    if (!directory) {
      return new Response(JSON.stringify({ error: 'No directory provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    log(`Starting sync for directory: ${directory}`);
    log(`Base URL: ${baseUrl}`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    // Get files for this directory from hardcoded list
    const pdfFiles = DIRECTORY_FILES[directory] || [];
    
    log(`Found ${pdfFiles.length} PDF files for directory ${directory}`);

    if (pdfFiles.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          directory,
          total: 0,
          uploaded: 0,
          skipped: 0,
          errors: [],
          logs,
          message: `No files configured for directory ${directory}. Add files to DIRECTORY_FILES in the edge function.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = {
      total: pdfFiles.length,
      uploaded: 0,
      skipped: 0,
      errors: [] as string[],
    };

    // Process files one by one to avoid memory issues
    for (const filename of pdfFiles) {
      try {
        const storagePath = `${directory}/${filename}`;
        
        // Check if file already exists in storage
        const { data: existingFiles } = await supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .list(directory, { search: filename, limit: 1 });
        
        if (existingFiles && existingFiles.some(f => f.name === filename)) {
          log(`Skipping ${filename} - already in storage`);
          results.skipped++;
          continue;
        }

        // Fetch PDF from public URL
        const pdfUrl = `${baseUrl}/pastpapers/${directory}/${filename}`;
        log(`Fetching: ${pdfUrl}`);
        
        const pdfResponse = await fetch(pdfUrl);
        if (!pdfResponse.ok) {
          log(`Failed to fetch ${filename}: ${pdfResponse.status}`);
          results.errors.push(`${filename}: fetch failed (${pdfResponse.status})`);
          continue;
        }
        
        const pdfBuffer = await pdfResponse.arrayBuffer();
        log(`Downloaded ${filename}: ${pdfBuffer.byteLength} bytes`);

        // Upload to storage bucket
        const { error: uploadError } = await supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .upload(storagePath, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true,
          });

        if (uploadError) {
          log(`Upload error for ${filename}: ${uploadError.message}`);
          results.errors.push(`${filename}: ${uploadError.message}`);
          continue;
        }

        log(`Uploaded: ${storagePath}`);

        // Parse metadata and upsert into database
        const metadata = parseFilename(filename);
        if (metadata) {
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
              file_url: storagePath,
            }, { onConflict: 'code' });

          if (dbError) {
            log(`DB error for ${filename}: ${dbError.message}`);
          } else {
            log(`DB record upserted for ${filename}`);
          }
        }

        results.uploaded++;
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        log(`Error processing ${filename}: ${errMsg}`);
        results.errors.push(`${filename}: ${errMsg}`);
      }
    }

    log(`Sync complete: ${results.uploaded} uploaded, ${results.skipped} skipped, ${results.errors.length} errors`);

    return new Response(JSON.stringify({
      success: results.errors.length === 0,
      directory,
      ...results,
      logs,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    log(`Fatal error: ${errMsg}`);
    return new Response(JSON.stringify({ error: errMsg, logs }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
