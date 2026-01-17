import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-upload-key',
};

// Subject mapping based on the indexing system
const SUBJECT_MAP: Record<string, Record<string, string>> = {
  '00': { '00': 'tok', '01': 'ee' },
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

// Type prefix mapping
const TYPE_MAP: Record<string, { doc_type: number; is_markscheme: boolean; is_resource: boolean }> = {
  'PP0': { doc_type: 1, is_markscheme: false, is_resource: false },
  'PP1': { doc_type: 1, is_markscheme: false, is_resource: false },
  'MS0': { doc_type: 2, is_markscheme: true, is_resource: false },
  'MS1': { doc_type: 2, is_markscheme: true, is_resource: false },
  'SP0': { doc_type: 3, is_markscheme: false, is_resource: false },
  'SPA': { doc_type: 3, is_markscheme: false, is_resource: false },
  'GD0': { doc_type: 4, is_markscheme: false, is_resource: true },
};

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
  // Format: [TYPE][VARIANT]-[GROUP]-[SUBJECT]-[YEAR]-[EXTRAS]-[SEQUENCE].[ext]
  // Example: PP0-04-02-2024-TZ1-P1-001.pdf
  
  const match = filename.match(/^([A-Z]{2}[A-Z0-9])-(\d{2})-(\d{2})-(\d{4}|xxxx)-?(.*)\.pdf$/i);
  if (!match) return null;

  const [, typePrefix, groupCode, subjectCode, yearStr, extras] = match;
  
  const typeInfo = TYPE_MAP[typePrefix.toUpperCase()] || { doc_type: 0, is_markscheme: false, is_resource: false };
  const subjectGroup = SUBJECT_MAP[groupCode];
  const subject = subjectGroup?.[subjectCode] || 'other';
  const year = yearStr === 'xxxx' ? 2024 : parseInt(yearStr, 10);
  
  // Parse extras for timezone and paper number
  let timezone: string | null = null;
  let paper_number: string | null = null;
  let session: string | null = null;
  
  if (extras) {
    const parts = extras.split('-').filter(Boolean);
    for (const part of parts) {
      if (part.startsWith('TZ')) {
        timezone = part;
      } else if (part.startsWith('P') && /^P\d+$/.test(part)) {
        paper_number = part.replace('P', '');
      } else if (['M', 'N', 'May', 'Nov', 'November'].includes(part)) {
        session = part.startsWith('M') ? 'May' : 'November';
      }
    }
  }

  // Determine level from type prefix
  const level = typePrefix.endsWith('1') ? 'HL' : 'SL';

  return {
    code: filename.replace('.pdf', ''),
    subject,
    year,
    session,
    paper_number,
    timezone,
    level,
    is_markscheme: typeInfo.is_markscheme,
    is_resource: typeInfo.is_resource,
    doc_type: typeInfo.doc_type,
    name: filename,
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(`[${new Date().toISOString()}] ${msg}`);
  };

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Optional: Validate upload key for security
    const uploadKey = req.headers.get('x-upload-key');
    const expectedKey = Deno.env.get('UPLOAD_SECRET_KEY');
    if (expectedKey && uploadKey !== expectedKey) {
      log('Invalid or missing upload key');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse multipart form data
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ error: 'Content-Type must be multipart/form-data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const filename = file.name;
    log(`Received file: ${filename}`);

    // Validate file type
    if (!filename.toLowerCase().endsWith('.pdf')) {
      return new Response(JSON.stringify({ error: 'Only PDF files are allowed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse filename for metadata
    const metadata = parseFilename(filename);
    if (!metadata) {
      log(`Could not parse filename: ${filename}`);
      return new Response(JSON.stringify({ 
        error: 'Invalid filename format', 
        expected: '[TYPE][VARIANT]-[GROUP]-[SUBJECT]-[YEAR]-[EXTRAS].pdf',
        example: 'PP0-04-02-2024-TZ1-P1-001.pdf'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    log(`Parsed metadata: subject=${metadata.subject}, year=${metadata.year}, code=${metadata.code}`);

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    // Check if already exists
    const { data: existingRecord } = await supabaseAdmin
      .from('past_papers')
      .select('id')
      .eq('code', metadata.code)
      .maybeSingle();

    if (existingRecord) {
      log(`Record already exists: ${metadata.code}`);
      return new Response(JSON.stringify({ 
        status: 'skipped', 
        message: 'File already exists in database',
        code: metadata.code 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Read file content
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);

    // Upload to Supabase Storage
    const storagePath = `${metadata.subject}/${metadata.year}/${filename}`;
    log(`Uploading to storage: ${storagePath}`);

    const { error: uploadError } = await supabaseAdmin.storage
      .from('past-papers')
      .upload(storagePath, fileData, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (uploadError) {
      log(`Storage upload error: ${uploadError.message}`);
      return new Response(JSON.stringify({ error: `Storage upload failed: ${uploadError.message}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
      log(`Database insert error: ${dbError.message}`);
      return new Response(JSON.stringify({ error: `Database insert failed: ${dbError.message}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    log(`Successfully uploaded and recorded: ${metadata.code}`);

    return new Response(JSON.stringify({
      status: 'success',
      code: metadata.code,
      subject: metadata.subject,
      year: metadata.year,
      file_url: publicUrlData.publicUrl,
      logs,
    }), {
      status: 200,
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
