import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Buffer } from "https://deno.land/std@0.168.0/node/buffer.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

// AWS Signature V4 signing for R2
async function signRequest(
  method: string,
  url: URL,
  headers: Headers,
  body: Uint8Array | null,
  accessKeyId: string,
  secretAccessKey: string,
  region: string = 'auto'
): Promise<Headers> {
  const service = 's3';
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  
  headers.set('x-amz-date', amzDate);
  headers.set('host', url.host);
  
  // Create canonical request
  const signedHeaders = Array.from(headers.keys()).sort().join(';');
  const canonicalHeaders = Array.from(headers.keys())
    .sort()
    .map(key => `${key}:${headers.get(key)?.trim()}`)
    .join('\n') + '\n';
  
  let payloadHash: string;
  if (body) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new Uint8Array(body));
    payloadHash = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  } else {
    payloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; // empty string hash
  }
  
  headers.set('x-amz-content-sha256', payloadHash);
  
  const canonicalUri = url.pathname;
  const canonicalQueryString = url.searchParams.toString();
  
  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQueryString,
    canonicalHeaders,
    signedHeaders,
    payloadHash
  ].join('\n');
  
  // Create string to sign
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const canonicalRequestHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonicalRequest))
    .then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join(''));
  
  const stringToSign = [
    algorithm,
    amzDate,
    credentialScope,
    canonicalRequestHash
  ].join('\n');
  
  // Calculate signature
  const getSignatureKey = async (key: string, dateStamp: string, regionName: string, serviceName: string) => {
    const kDate = await crypto.subtle.sign('HMAC', 
      await crypto.subtle.importKey('raw', new TextEncoder().encode('AWS4' + key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
      new TextEncoder().encode(dateStamp));
    const kRegion = await crypto.subtle.sign('HMAC',
      await crypto.subtle.importKey('raw', new Uint8Array(kDate), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
      new TextEncoder().encode(regionName));
    const kService = await crypto.subtle.sign('HMAC',
      await crypto.subtle.importKey('raw', new Uint8Array(kRegion), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
      new TextEncoder().encode(serviceName));
    const kSigning = await crypto.subtle.sign('HMAC',
      await crypto.subtle.importKey('raw', new Uint8Array(kService), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
      new TextEncoder().encode('aws4_request'));
    return new Uint8Array(kSigning);
  };
  
  const signingKey = await getSignatureKey(secretAccessKey, dateStamp, region, service);
  const signature = await crypto.subtle.sign('HMAC',
    await crypto.subtle.importKey('raw', signingKey, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
    new TextEncoder().encode(stringToSign))
    .then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join(''));
  
  const authorizationHeader = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  headers.set('Authorization', authorizationHeader);
  
  return headers;
}

async function listR2Objects(
  endpoint: string,
  bucket: string,
  accessKeyId: string,
  secretAccessKey: string,
  continuationToken?: string,
  maxKeys: number = 1000
): Promise<{ keys: string[]; nextToken: string | null; isTruncated: boolean }> {
  const url = new URL(`/${bucket}`, endpoint);
  url.searchParams.set('list-type', '2');
  url.searchParams.set('max-keys', String(maxKeys));
  if (continuationToken) {
    url.searchParams.set('continuation-token', continuationToken);
  }
  
  const headers = new Headers();
  await signRequest('GET', url, headers, null, accessKeyId, secretAccessKey);
  
  const response = await fetch(url.toString(), { method: 'GET', headers });
  const text = await response.text();
  
  if (!response.ok) {
    throw new Error(`R2 list failed: ${response.status} - ${text}`);
  }
  
  // Parse XML response
  const keys: string[] = [];
  const keyMatches = text.matchAll(/<Key>([^<]+)<\/Key>/g);
  for (const match of keyMatches) {
    keys.push(match[1]);
  }
  
  const truncatedMatch = text.match(/<IsTruncated>([^<]+)<\/IsTruncated>/);
  const isTruncated = truncatedMatch?.[1] === 'true';
  
  const nextTokenMatch = text.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/);
  const nextToken = nextTokenMatch?.[1] || null;
  
  return { keys, nextToken, isTruncated };
}

async function getR2Object(
  endpoint: string,
  bucket: string,
  key: string,
  accessKeyId: string,
  secretAccessKey: string
): Promise<Uint8Array> {
  const url = new URL(`/${bucket}/${encodeURIComponent(key)}`, endpoint);
  
  const headers = new Headers();
  await signRequest('GET', url, headers, null, accessKeyId, secretAccessKey);
  
  const response = await fetch(url.toString(), { method: 'GET', headers });
  
  if (!response.ok) {
    throw new Error(`R2 get failed: ${response.status}`);
  }
  
  return new Uint8Array(await response.arrayBuffer());
}

// Simple ZIP parser for extracting PDFs
async function extractPDFsFromZip(zipData: Uint8Array): Promise<{ name: string; data: Uint8Array }[]> {
  const pdfs: { name: string; data: Uint8Array }[] = [];
  const view = new DataView(zipData.buffer);
  
  let offset = 0;
  while (offset < zipData.length - 4) {
    const signature = view.getUint32(offset, true);
    
    // Local file header signature
    if (signature === 0x04034b50) {
      const compressedSize = view.getUint32(offset + 18, true);
      const uncompressedSize = view.getUint32(offset + 22, true);
      const fileNameLength = view.getUint16(offset + 26, true);
      const extraFieldLength = view.getUint16(offset + 28, true);
      const compressionMethod = view.getUint16(offset + 8, true);
      
      const fileNameStart = offset + 30;
      const fileName = new TextDecoder().decode(zipData.slice(fileNameStart, fileNameStart + fileNameLength));
      
      const dataStart = fileNameStart + fileNameLength + extraFieldLength;
      const dataEnd = dataStart + compressedSize;
      
      if (fileName.toLowerCase().endsWith('.pdf') && !fileName.startsWith('__MACOSX')) {
        if (compressionMethod === 0) {
          // Stored (no compression)
          pdfs.push({
            name: fileName.split('/').pop() || fileName,
            data: zipData.slice(dataStart, dataEnd)
          });
        } else if (compressionMethod === 8) {
          // Deflate compression - use DecompressionStream
          try {
            const compressed = zipData.slice(dataStart, dataEnd);
            const ds = new DecompressionStream('deflate-raw');
            const writer = ds.writable.getWriter();
            writer.write(compressed);
            writer.close();
            
            const reader = ds.readable.getReader();
            const chunks: Uint8Array[] = [];
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
            }
            
            const totalLength = chunks.reduce((acc, c) => acc + c.length, 0);
            const result = new Uint8Array(totalLength);
            let pos = 0;
            for (const chunk of chunks) {
              result.set(chunk, pos);
              pos += chunk.length;
            }
            
            pdfs.push({
              name: fileName.split('/').pop() || fileName,
              data: result
            });
          } catch (e) {
            console.log(`Failed to decompress ${fileName}: ${e}`);
          }
        }
      }
      
      offset = dataEnd;
    } else {
      offset++;
    }
  }
  
  return pdfs;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(`[${new Date().toISOString()}] ${msg}`);
  };

  try {
    const { batchSize = 100, continuationToken, mode = 'full' } = await req.json().catch(() => ({}));
    
    log(`Starting R2 import. Batch size: ${batchSize}, Mode: ${mode}`);

    const r2Endpoint = Deno.env.get('R2_ENDPOINT')!;
    const r2AccessKeyId = Deno.env.get('R2_ACCESS_KEY_ID')!;
    const r2SecretAccessKey = Deno.env.get('R2_SECRET_ACCESS_KEY')!;
    const bucketName = Deno.env.get('R2_BUCKET_NAME')!;
    
    log(`Connecting to R2 bucket: ${bucketName}`);

    // Initialize Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    );

    // List objects from R2
    const listResult = await listR2Objects(
      r2Endpoint,
      bucketName,
      r2AccessKeyId,
      r2SecretAccessKey,
      continuationToken,
      1000
    );
    
    log(`Found ${listResult.keys.length} objects in R2`);

    const results = {
      processed: 0,
      uploaded: 0,
      skipped: 0,
      errors: [] as string[],
      nextContinuationToken: listResult.nextToken,
      hasMore: listResult.isTruncated,
    };

    if (listResult.keys.length === 0) {
      log('No objects found in R2 bucket');
      return new Response(JSON.stringify({ ...results, logs, duration: Date.now() - startTime }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Process files in batches
    let processedInBatch = 0;
    
    for (const key of listResult.keys) {
      if (processedInBatch >= batchSize) {
        log(`Batch limit reached (${batchSize}). Stopping for this run.`);
        results.hasMore = true;
        break;
      }

      results.processed++;
      log(`Processing: ${key}`);

      try {
        // Skip zip files - only process individual PDFs
        if (key.toLowerCase().endsWith('.zip') || key.toLowerCase().includes('.z0')) {
          log(`Skipping zip file: ${key}`);
          results.skipped++;
          continue;
        }
        
        if (key.toLowerCase().endsWith('.pdf')) {
          // Direct PDF file
          const pdfName = key.split('/').pop() || key;
          const metadata = parseFilename(pdfName);
          
          if (!metadata) {
            log(`Could not parse filename: ${key}`);
            results.skipped++;
            continue;
          }

          // Check if already exists in database
          const { data: existingRecord } = await supabaseAdmin
            .from('past_papers')
            .select('id')
            .eq('code', metadata.code)
            .maybeSingle();

          if (existingRecord) {
            log(`Already exists in DB, skipping: ${metadata.code}`);
            results.skipped++;
            continue;
          }

          // Download from R2
          const pdfBuffer = await getR2Object(r2Endpoint, bucketName, key, r2AccessKeyId, r2SecretAccessKey);

          // Upload to Supabase storage
          const storagePath = `${metadata.subject}/${metadata.year}/${pdfName}`;
          const { error: uploadError } = await supabaseAdmin.storage
            .from('past-papers')
            .upload(storagePath, pdfBuffer, {
              contentType: 'application/pdf',
              upsert: true,
            });

          if (uploadError) {
            log(`Upload error: ${uploadError.message}`);
            results.errors.push(`Upload failed: ${key} - ${uploadError.message}`);
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
            results.errors.push(`DB insert failed: ${key} - ${dbError.message}`);
          } else {
            log(`Uploaded: ${storagePath}`);
            results.uploaded++;
          }

          processedInBatch++;
        } else {
          log(`Skipping non-PDF/ZIP file: ${key}`);
          results.skipped++;
        }
      } catch (fileError: unknown) {
        const errMsg = fileError instanceof Error ? fileError.message : String(fileError);
        log(`Error processing ${key}: ${errMsg}`);
        results.errors.push(`${key}: ${errMsg}`);
      }
    }

    const duration = Date.now() - startTime;
    log(`Completed. Processed: ${results.processed}, Uploaded: ${results.uploaded}, Skipped: ${results.skipped}, Errors: ${results.errors.length}`);

    return new Response(JSON.stringify({ ...results, logs, duration }), {
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
