const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    // Get the image data URLs from the request
    const imageDataUrlsJson = formData.get('imageDataUrls') as string;
    const imageDataUrls: string[] = imageDataUrlsJson ? JSON.parse(imageDataUrlsJson) : [];

    console.log(`Processing ${imageDataUrls.length} images`);

    // Upload all images and create a mapping
    const imageMap: Record<string, string> = {};
    
    for (let i = 0; i < imageDataUrls.length; i++) {
      const dataUrl = imageDataUrls[i];
      try {
        const uploadedUrl = await uploadDataUrlImage(dataUrl, supabaseUrl, supabaseKey, authHeader);
        imageMap[dataUrl] = uploadedUrl;
        console.log(`Uploaded image ${i + 1}/${imageDataUrls.length}`);
      } catch (error) {
        console.error(`Failed to upload image ${i + 1}:`, error);
      }
    }

    return new Response(JSON.stringify({ imageMap }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Import error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function uploadDataUrlImage(
  dataUrl: string,
  supabaseUrl: string,
  supabaseKey: string,
  authHeader: string
): Promise<string> {
  const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Invalid data URL');
  }

  const [, mimeType, base64Data] = matches;
  
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const extension = mimeType.split('/')[1] || 'png';
  const fileName = `imports/${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;

  const uploadResponse = await fetch(
    `${supabaseUrl}/storage/v1/object/editor-assets/${fileName}`,
    {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': mimeType,
        'x-upsert': 'false',
      },
      body: bytes,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload image');
  }

  return `${supabaseUrl}/storage/v1/object/public/editor-assets/${fileName}`;
}
