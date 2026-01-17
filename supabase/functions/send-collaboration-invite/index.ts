import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, documentId, documentType, permission, documentTitle } = await req.json();

    if (!email || !documentId || !documentType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, documentId, documentType" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending collaboration invite to ${email} for ${documentType} ${documentId}`);

    // Get inviter's name/email for the invitation
    const inviterName = user.user_metadata?.full_name || user.email || "Someone";

    // Determine the document URL - use origin from request or fallback
    const origin = req.headers.get("origin") || "https://tooessay.com";
    const documentPath = documentType === "draft" ? `/assignment/${documentId}/draft` : `/notes`;
    const documentUrl = `${origin}${documentPath}`;

    // Store the invitation in the database for users who haven't signed up yet
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("id", (await supabaseAdmin.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id || "")
      .maybeSingle();

    // Add collaborator entry (works for both existing and new users)
    const { error: collabError } = await supabaseAdmin
      .from("document_collaborators")
      .upsert({
        document_type: documentType,
        document_id: documentId,
        user_id: existingUser?.id || null,
        role: permission || "editor",
        invited_by: user.id,
        invited_email: email,
      }, {
        onConflict: "document_type,document_id,invited_email",
        ignoreDuplicates: false,
      });

    if (collabError) {
      console.error("Error adding collaborator:", collabError);
      // Continue anyway to send email
    }

    // Send the invitation email via Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TooEssay <noreply@tooessay.app>",
        to: [email],
        subject: `${inviterName} invited you to collaborate on ${documentTitle || "a document"}`,
        html: `
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
              <h2 style="color: #1a1a2e; margin-top: 0;">You're Invited to Collaborate!</h2>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>${inviterName}</strong> has invited you to collaborate on <strong>${documentTitle || "a document"}</strong> as ${permission === "editor" ? "an <strong>Editor</strong>" : "a <strong>Viewer</strong>"}.
              </p>
              
              <p style="font-size: 14px; color: #666; margin-bottom: 25px;">
                ${permission === "editor" 
                  ? "As an editor, you can view and make changes to this document in real-time." 
                  : "As a viewer, you can see the document and any real-time changes made by others."}
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${documentUrl}" style="display: inline-block; background: #6366f1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">
                  Open Document
                </a>
              </div>
              
              <p style="font-size: 12px; color: #999; margin-top: 20px;">
                If you don't have an account yet, you'll be prompted to create one when you click the link above.
              </p>
            </div>
            
            <div style="text-align: center; font-size: 12px; color: #999;">
              <p>TooEssay - Your AI writing coach for academic success</p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json();
      console.error("Resend API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send invitation email", details: errorData }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendData = await resendResponse.json();
    console.log("Invitation email sent successfully:", resendData.id);

    return new Response(
      JSON.stringify({ success: true, emailId: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
