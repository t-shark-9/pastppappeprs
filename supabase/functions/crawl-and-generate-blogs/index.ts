import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, blogPageUrl, blogUrl, blogTitle, maxBlogs = 5 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Action 1: Extract blog links from index page
    if (action === "extract-links") {
      if (!blogPageUrl) {
        throw new Error("blogPageUrl is required");
      }

      console.log(`Fetching blog index: ${blogPageUrl}`);
      const pageResponse = await fetch(blogPageUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      });

      if (!pageResponse.ok) {
        throw new Error(`Failed to fetch blog page: ${pageResponse.status}`);
      }

      const pageHtml = await pageResponse.text();
      const baseUrl = new URL(blogPageUrl).origin;

      // Extract ALL actual href links from the HTML using regex
      const hrefRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
      const allLinks: { url: string; title: string }[] = [];
      let match;

      while ((match = hrefRegex.exec(pageHtml)) !== null) {
        let url = match[1];
        const title = match[2].trim();

        // Skip empty, anchor, or javascript links
        if (!url || url.startsWith('#') || url.startsWith('javascript:') || url.startsWith('mailto:')) {
          continue;
        }

        // Make relative URLs absolute
        if (url.startsWith('/')) {
          url = baseUrl + url;
        } else if (!url.startsWith('http')) {
          url = baseUrl + '/' + url;
        }

        // Only include links that look like blog posts
        if (url.includes('/blog/') || url.includes('/article/') || url.includes('/post/')) {
          // Skip pagination, categories, tags
          if (url.includes('/page/') || url.includes('/category/') || url.includes('/tag/') || url.endsWith('/blog') || url.endsWith('/blog/')) {
            continue;
          }
          allLinks.push({ url, title: title || 'Untitled' });
        }
      }

      // Deduplicate by URL
      const uniqueLinks = Array.from(new Map(allLinks.map(l => [l.url, l])).values());
      
      console.log(`Found ${uniqueLinks.length} actual blog links from HTML`);

      if (uniqueLinks.length === 0) {
        // Fallback: try to find any internal links with content-like paths
        const fallbackRegex = /href=["']([^"']+)["']/gi;
        const fallbackLinks: { url: string; title: string }[] = [];
        
        while ((match = fallbackRegex.exec(pageHtml)) !== null) {
          let url = match[1];
          if (!url || url.startsWith('#') || url.startsWith('javascript:')) continue;
          
          if (url.startsWith('/')) url = baseUrl + url;
          else if (!url.startsWith('http')) continue;
          
          // Look for paths with multiple segments that might be blog posts
          const path = new URL(url).pathname;
          const segments = path.split('/').filter(Boolean);
          if (segments.length >= 2 && !url.includes('?') && !url.includes('.css') && !url.includes('.js')) {
            fallbackLinks.push({ url, title: segments[segments.length - 1].replace(/-/g, ' ') });
          }
        }
        
        const uniqueFallback = Array.from(new Map(fallbackLinks.map(l => [l.url, l])).values());
        console.log(`Fallback found ${uniqueFallback.length} potential content links`);
        
        return new Response(
          JSON.stringify({ links: uniqueFallback.slice(0, maxBlogs) }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ links: uniqueLinks.slice(0, maxBlogs) }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Action 2: Generate a single blog
    if (action === "generate-blog") {
      if (!blogUrl) {
        throw new Error("blogUrl is required");
      }

      console.log(`Generating blog from: ${blogUrl}`);

      // Fetch source content
      const blogResponse = await fetch(blogUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; TooEssayBot/1.0)" },
      });

      if (!blogResponse.ok) {
        throw new Error(`Failed to fetch source: ${blogResponse.status}`);
      }

      // Limit content to prevent memory issues
      const blogHtml = (await blogResponse.text()).substring(0, 15000);

      const generateResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "user",
              content: `Create an ORIGINAL blog post for IB students inspired by this source. Do NOT copy - create fresh content.

Source title: ${blogTitle || "Unknown"}
Source content (excerpt):
${blogHtml}

Write 800-1200 words in Markdown. Return ONLY valid JSON (no markdown blocks):
{"title":"SEO title","description":"150 char meta description","content":"# Markdown content","category":"IB Study Tips","keywords":["k1","k2"]}`
            }
          ],
        }),
      });

      if (!generateResponse.ok) {
        const err = await generateResponse.text();
        throw new Error(`AI error: ${err}`);
      }

      const genData = await generateResponse.json();
      const genContent = genData.choices?.[0]?.message?.content || "";
      
      // Clean and parse JSON
      const cleanedGen = genContent.replace(/```json\n?|\n?```/g, "").trim();
      const jsonMatch = cleanedGen.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        console.error("Failed to parse generated content:", genContent.substring(0, 500));
        throw new Error("Could not parse generated blog");
      }

      let blogData;
      try {
        blogData = JSON.parse(jsonMatch[0]);
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        throw new Error("Invalid JSON in generated blog");
      }

      // Generate slug from title
      const baseSlug = (blogData.title || "untitled")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .substring(0, 50);

      // Check for duplicate by similar title (first 30 chars) or slug
      const { data: existingBlogs } = await supabase
        .from("blogs")
        .select("id, title, slug")
        .or(`title.ilike.%${blogData.title.substring(0, 30)}%,slug.ilike.${baseSlug}%`)
        .limit(5);

      if (existingBlogs && existingBlogs.length > 0) {
        // Check for exact or very similar title match
        const isDuplicate = existingBlogs.some(existing => {
          const existingTitleLower = existing.title.toLowerCase();
          const newTitleLower = blogData.title.toLowerCase();
          // Consider duplicate if titles are very similar (80% match or exact)
          return existingTitleLower === newTitleLower || 
                 existingTitleLower.includes(newTitleLower.substring(0, 40)) ||
                 newTitleLower.includes(existingTitleLower.substring(0, 40));
        });

        if (isDuplicate) {
          console.log(`Duplicate blog detected: "${blogData.title}"`);
          return new Response(
            JSON.stringify({ 
              success: false, 
              skipped: true,
              reason: "Duplicate blog already exists",
              title: blogData.title 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }

      // Generate unique slug with timestamp
      const slug = `${baseSlug}-${Date.now().toString(36)}`;

      // Save to database
      const { error: insertError } = await supabase.from("blogs").insert({
        slug,
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        category: blogData.category || "IB Study Tips",
        keywords: blogData.keywords || [],
        status: "published",
      });

      if (insertError) {
        // Check if it's a duplicate slug error
        if (insertError.message.includes('duplicate') || insertError.code === '23505') {
          console.log(`Duplicate slug detected: ${slug}`);
          return new Response(
            JSON.stringify({ 
              success: false, 
              skipped: true,
              reason: "Blog with similar slug already exists",
              title: blogData.title 
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        console.error("Insert error:", insertError);
        throw new Error(`Failed to save: ${insertError.message}`);
      }

      console.log(`Saved blog: ${slug}`);

      return new Response(
        JSON.stringify({ success: true, slug, title: blogData.title }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    throw new Error("Invalid action. Use 'extract-links' or 'generate-blog'");

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
