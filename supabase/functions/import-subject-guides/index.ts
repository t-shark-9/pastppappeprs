import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GuideData {
  subject: string;
  guideName: string;
  year: number;
  pdfBase64: string;
  textContent?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { guides }: { guides: GuideData[] } = await req.json();

    if (!guides || !Array.isArray(guides)) {
      return new Response(
        JSON.stringify({ error: "guides array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results: { success: boolean; guide: string; error?: string }[] = [];

    for (const guide of guides) {
      try {
        // Decode base64 PDF
        const pdfBytes = Uint8Array.from(atob(guide.pdfBase64), c => c.charCodeAt(0));
        
        // Create filename
        const fileName = `${guide.subject.toLowerCase().replace(/\s+/g, '-')}-${guide.year}.pdf`;
        
        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('grading-guides')
          .upload(fileName, pdfBytes, {
            contentType: 'application/pdf',
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          results.push({ success: false, guide: guide.guideName, error: uploadError.message });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('grading-guides')
          .getPublicUrl(fileName);

        // Insert into database
        const { error: insertError } = await supabase
          .from('subject_guides')
          .upsert({
            subject: guide.subject,
            guide_name: guide.guideName,
            year: guide.year,
            file_url: publicUrl,
            guide_text_content: guide.textContent || null
          }, {
            onConflict: 'subject,year'
          });

        if (insertError) {
          console.error('Insert error:', insertError);
          results.push({ success: false, guide: guide.guideName, error: insertError.message });
          continue;
        }

        results.push({ success: true, guide: guide.guideName });
        console.log(`Successfully imported: ${guide.guideName}`);

      } catch (err) {
        console.error(`Error processing ${guide.guideName}:`, err);
        results.push({ 
          success: false, 
          guide: guide.guideName, 
          error: err instanceof Error ? err.message : 'Unknown error' 
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return new Response(
      JSON.stringify({ 
        message: `Imported ${successCount} guides, ${failCount} failed`,
        results 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in import-subject-guides:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
