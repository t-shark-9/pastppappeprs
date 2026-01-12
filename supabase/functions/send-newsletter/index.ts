import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "mail@tjark-osterloh.de";

// HTML escape function to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// URL sanitization function
function sanitizeUrl(url: string): string {
  // Only allow http and https protocols
  const urlPattern = /^https?:\/\//i;
  if (!urlPattern.test(url)) {
    return '#';
  }
  return escapeHtml(url);
}

interface NewsletterRequest {
  subject: string;
  heading: string;
  content: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    // Verify admin access
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user is admin
    if (user.email !== ADMIN_EMAIL) {
      return new Response(
        JSON.stringify({ error: "Admin access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { subject, heading, content, features, ctaText, ctaUrl }: NewsletterRequest = await req.json();

    if (!subject || !heading || !content) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: subject, heading, content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending newsletter:", subject);

    // Get all users from admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    if (listError) {
      console.error("Error listing users:", listError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch users" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emails = users
      .filter(u => u.email && u.email_confirmed_at)
      .map(u => u.email!);

    if (emails.length === 0) {
      return new Response(
        JSON.stringify({ error: "No confirmed users to send to" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending to ${emails.length} users`);

    // Sanitize all user inputs
    const safeHeading = escapeHtml(heading);
    const safeContent = escapeHtml(content);
    const safeFeatures = features ? features.map(f => escapeHtml(f)) : [];
    const safeCtaText = ctaText ? escapeHtml(ctaText) : '';
    const safeCtaUrl = ctaUrl ? sanitizeUrl(ctaUrl) : '';

    // Build features list HTML with sanitized content
    const featuresHtml = safeFeatures && safeFeatures.length > 0 
      ? `
        <div style="margin: 25px 0;">
          <h3 style="color: #1a1a2e; margin-bottom: 15px;">What's New:</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${safeFeatures.map(f => `
              <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center;">
                <span style="display: inline-block; width: 8px; height: 8px; background: #6366f1; border-radius: 50%; margin-right: 12px;"></span>
                ${f}
              </li>
            `).join('')}
          </ul>
        </div>
      `
      : '';

    // Build CTA button HTML with sanitized content
    const ctaHtml = safeCtaText && safeCtaUrl && safeCtaUrl !== '#'
      ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${safeCtaUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            ${safeCtaText}
          </a>
        </div>
      `
      : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a2e; margin: 0;">TooEssay</h1>
        </div>
        
        <div style="background: #f8f9fa; border-radius: 8px; padding: 30px; margin-bottom: 20px;">
          <h2 style="color: #1a1a2e; margin-top: 0;">${safeHeading}</h2>
          
          <p style="font-size: 16px; margin-bottom: 20px; white-space: pre-wrap;">${safeContent}</p>
          
          ${featuresHtml}
          
          ${ctaHtml}
        </div>
        
        <div style="text-align: center; font-size: 12px; color: #999;">
          <p>TooEssay - Your AI writing coach for academic success</p>
          <p style="margin-top: 10px;">
            <a href="{{unsubscribe_url}}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
          </p>
        </div>
      </body>
      </html>
    `;

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    let successCount = 0;
    let failCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      try {
        // Send to batch using BCC for efficiency
        const { data, error: sendError } = await resend.emails.send({
          from: "TooEssay <noreply@tooessay.app>",
          to: "noreply@tooessay.app", // Placeholder, actual delivery via BCC
          bcc: batch,
          subject: subject,
          html: htmlContent,
        });

        if (sendError) {
          console.error(`Batch ${i / batchSize + 1} error:`, sendError);
          failCount += batch.length;
          errors.push(`Batch ${i / batchSize + 1}: ${sendError.message}`);
        } else {
          console.log(`Batch ${i / batchSize + 1} sent:`, data?.id);
          successCount += batch.length;
        }
      } catch (batchError: any) {
        console.error(`Batch ${i / batchSize + 1} exception:`, batchError);
        failCount += batch.length;
        errors.push(`Batch ${i / batchSize + 1}: ${batchError?.message || "Unknown error"}`);
      }

      // Small delay between batches
      if (i + batchSize < emails.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`Newsletter sent: ${successCount} success, ${failCount} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        sent: successCount, 
        failed: failCount,
        total: emails.length,
        errors: errors.length > 0 ? errors : undefined
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending newsletter:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
