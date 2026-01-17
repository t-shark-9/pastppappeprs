import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const STORAGE_BUCKET = 'paper-uploads';

// Subject mapping based on the indexing system (3-digit type code)
const SUBJECT_BY_TYPE: Record<string, string> = {
  // Core
  '100': 'tok',
  '101': 'lang_a_literature',
  '102': 'biology',
  '103': 'chemistry',
  '104': 'physics',
  '105': 'math_aa',
  '106': 'math_ai',
  '107': 'economics',
  '108': 'history',
  '109': 'geography',
  '110': 'psychology',
  '111': 'business_management',
  '112': 'english_b',
  '113': 'french_b',
  '114': 'spanish_b',
  '115': 'computer_science',
  '116': 'design_technology',
  '117': 'ess',
  '118': 'sehs',
  '119': 'visual_arts',
  '120': 'music',
  '121': 'theatre',
  '122': 'film',
  '123': 'dance',
  '124': 'global_politics',
  '125': 'philosophy',
  '126': 'world_religions',
  '127': 'social_cultural_anthropology',
  '128': 'digital_society',
  '129': 'lang_a_lang_lit',
  '130': 'latin',
  '140': 'further_mathematics',
  '141': 'mathematical_studies',
  '142': 'math_hl',
  '143': 'math_sl',
  '150': 'itgs',
  '160': 'ee',
  '170': 'tok_essay',
  '171': 'tok_exhibition',
  '180': 'english_a',
  '181': 'german_b',
  '182': 'italian_b',
  '183': 'japanese_b',
  '184': 'mandarin_b',
  '185': 'arabic_ab',
  '186': 'chinese_ab',
  '187': 'hindi_ab',
  '188': 'japanese_ab',
  '189': 'korean_ab',
  '190': 'portuguese_ab',
  '191': 'russian_ab',
  '192': 'spanish_ab',
  '200': 'drama',
  '210': 'literature_performance',
  '220': 'classical_greek',
  '230': 'environmental_systems_and_societies',
  '240': 'studies_in_language_and_literature',
  '241': 'language_and_literature',
  '242': 'literature',
  '243': 'english_a_language_and_literature',
  '244': 'english_a_literature',
};

// Year mapping for the 2-digit year codes
const YEAR_MAP: Record<string, number> = {
  '01': 2001, '02': 2002, '03': 2003, '04': 2004, '05': 2005, '06': 2006, '07': 2007, '08': 2008, '09': 2009,
  '10': 2010, '11': 2011, '12': 2012, '13': 2013, '14': 2014, '15': 2015, '16': 2016, '17': 2017, '18': 2018, '19': 2019,
  '20': 2020, '21': 2021, '22': 2022, '23': 2023, '24': 2024, '25': 2025, '26': 2026,
  // November sessions (40-49)
  '40': 2010, '41': 2011, '42': 2012, '43': 2013, '44': 2014, '45': 2015, '46': 2016, '47': 2017, '48': 2018, '49': 2019,
  // May sessions (50-59) continuation
  '50': 2020, '51': 2021, '52': 2022, '53': 2023, '54': 2024, '55': 2025,
};

function getSession(yearCode: string): string | null {
  const code = parseInt(yearCode, 10);
  if (code >= 40 && code <= 49) return 'November';
  if (code >= 50 && code <= 59) return 'May';
  if (code >= 10 && code <= 29) return 'May';
  if (code >= 1 && code <= 9) return 'May';
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
  const levelCode = parts[1];
  const timezoneCode = parts[2];
  const yearCode = parts[3];
  
  // Look up subject by 3-digit type code
  let subject = SUBJECT_BY_TYPE[typeCode] || 'other';
  
  // Parse year
  const year = YEAR_MAP[yearCode] || (2000 + parseInt(yearCode, 10));
  const session = getSession(yearCode);
  
  // Parse level from levelCode (00 = both/unspecified, 01 = HL, 02 = SL)
  let level: string | null = null;
  if (levelCode === '01') level = 'HL';
  else if (levelCode === '02') level = 'SL';
  else if (levelCode === '00') level = 'HLSL';
  
  // Parse timezone
  let timezone: string | null = null;
  if (timezoneCode === '01') timezone = 'TZ1';
  else if (timezoneCode === '02') timezone = 'TZ2';
  else if (timezoneCode === '00') timezone = 'TZ0';
  
  let paper_number: string | null = null;
  let is_markscheme = false;
  let is_resource = false;
  
  for (let i = 4; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith('P') && /^P\d+$/.test(part)) {
      paper_number = part.replace('P', '');
    }
    if (part === 'MS' || filename.toLowerCase().includes('markscheme')) {
      is_markscheme = true;
    }
    if (part === 'QUE' || part === 'TEX' || part === 'CAS') {
      is_resource = true;
    }
  }
  
  let doc_type = 0; // Paper
  if (is_markscheme) doc_type = 1; // Mark scheme
  if (is_resource) doc_type = 3; // Resource
  
  return {
    code: cleanName,
    subject,
    year,
    session,
    paper_number,
    timezone,
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
    const body = await req.json().catch(() => ({}));
    const { dryRun = false, limit = 1000, offset = 0 } = body;

    log(`Starting index of paper-uploads bucket (dryRun=${dryRun}, limit=${limit}, offset=${offset})`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    // List files in paper-uploads bucket
    const { data: files, error: listError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .list('', { limit, offset, sortBy: { column: 'name', order: 'asc' } });

    if (listError) {
      throw new Error(`Failed to list files: ${listError.message}`);
    }

    log(`Found ${files?.length || 0} files in bucket`);

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        total: 0,
        indexed: 0,
        skipped: 0,
        errors: [],
        logs,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results = {
      total: files.length,
      indexed: 0,
      skipped: 0,
      errors: [] as string[],
    };

    // Get existing papers by code to avoid duplicates
    const filenames = files.map(f => f.name.replace('.pdf', ''));
    const { data: existingPapers } = await supabaseAdmin
      .from('past_papers')
      .select('code')
      .in('code', filenames);
    
    const existingCodes = new Set(existingPapers?.map(p => p.code) || []);
    log(`Found ${existingCodes.size} existing records`);

    // Process each file
    const papersToInsert = [];
    
    for (const file of files) {
      if (!file.name.endsWith('.pdf')) {
        results.skipped++;
        continue;
      }

      const metadata = parseFilename(file.name);
      if (!metadata) {
        log(`Could not parse: ${file.name}`);
        results.errors.push(`${file.name}: unparseable filename`);
        continue;
      }

      if (existingCodes.has(metadata.code)) {
        results.skipped++;
        continue;
      }

      // File URL is just the filename (flat structure in paper-uploads)
      papersToInsert.push({
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
        file_url: file.name, // Just filename for paper-uploads bucket
      });
    }

    log(`Prepared ${papersToInsert.length} papers for insertion`);

    if (!dryRun && papersToInsert.length > 0) {
      // Insert in batches of 100
      const batchSize = 100;
      for (let i = 0; i < papersToInsert.length; i += batchSize) {
        const batch = papersToInsert.slice(i, i + batchSize);
        const { error: insertError } = await supabaseAdmin
          .from('past_papers')
          .upsert(batch, { onConflict: 'code' });

        if (insertError) {
          log(`Batch insert error: ${insertError.message}`);
          results.errors.push(`Batch ${Math.floor(i/batchSize)}: ${insertError.message}`);
        } else {
          results.indexed += batch.length;
          log(`Inserted batch ${Math.floor(i/batchSize) + 1} (${batch.length} papers)`);
        }
      }
    } else if (dryRun) {
      results.indexed = papersToInsert.length;
      log(`Dry run - would insert ${papersToInsert.length} papers`);
    }

    log(`Index complete: ${results.indexed} indexed, ${results.skipped} skipped, ${results.errors.length} errors`);

    return new Response(JSON.stringify({
      success: results.errors.length === 0,
      ...results,
      logs,
      hasMore: files.length === limit,
      nextOffset: offset + files.length,
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
