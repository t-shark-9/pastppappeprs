import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { html, imageMap } = await req.json();
    
    if (!html) {
      return new Response(
        JSON.stringify({ error: 'HTML content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // System prompt with BlockNote schema instructions
    const systemPrompt = `You are an expert at converting HTML documents to BlockNote editor format.

BlockNote is a block-based editor with these block types:
- paragraph: { type: "paragraph", content: [inline content] }
- heading: { type: "heading", props: { level: 1|2|3 }, content: [inline content] }
- bulletListItem: { type: "bulletListItem", content: [inline content] }
- numberedListItem: { type: "numberedListItem", content: [inline content] }
- image: { type: "image", props: { url: "...", caption: "..." } }
- table: { type: "table", content: { type: "tableContent", rows: [{cells: [[inline content]]}] } }
- codeBlock: { type: "codeBlock", props: { language: "..." }, content: [inline content] }
- inlineMath: { type: "inlineMath", props: { latex: "..." } }
- blockMath: { type: "blockMath", props: { latex: "..." } }

Inline content format:
{ type: "text", text: "...", styles: { bold?: true, italic?: true, underline?: true, strike?: true } }
{ type: "link", text: "...", href: "...", styles?: {...} }

CRITICAL INSTRUCTIONS:
1. Convert ALL tables to BlockNote table format with proper row/cell structure
2. Detect mathematical notation (equations, formulas) and convert to LaTeX using inlineMath or blockMath blocks
3. Preserve all formatting (bold, italic, underline, strikethrough)
4. For images, use the provided image URL mappings
5. Maintain document hierarchy and structure
6. Convert code blocks with appropriate language tags
7. Handle nested lists properly
8. Extract math from text like "x² + 2x + 1" → LaTeX "x^2 + 2x + 1"

Return ONLY valid BlockNote JSON blocks array.`;

    const userPrompt = imageMap 
      ? `Convert this HTML to BlockNote blocks. Use these image URLs:\n${JSON.stringify(imageMap, null, 2)}\n\nHTML:\n${html}`
      : `Convert this HTML to BlockNote blocks:\n\n${html}`;

    // Use Lovable AI with tool calling for structured output
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: 'function',
            function: {
              name: 'convert_to_blocknote',
              description: 'Convert HTML content to BlockNote blocks array',
              parameters: {
                type: 'object',
                properties: {
                  blocks: {
                    type: 'array',
                    description: 'Array of BlockNote blocks',
                    items: {
                      type: 'object',
                      properties: {
                        type: { 
                          type: 'string',
                          enum: ['paragraph', 'heading', 'bulletListItem', 'numberedListItem', 'image', 'table', 'codeBlock', 'inlineMath', 'blockMath']
                        },
                        props: { 
                          type: 'object',
                          description: 'Block properties (level for headings, url/caption for images, latex for math)'
                        },
                        content: {
                          description: 'Block content - array of inline content or tableContent object'
                        }
                      },
                      required: ['type']
                    }
                  }
                },
                required: ['blocks'],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: 'function', function: { name: 'convert_to_blocknote' } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'AI rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response:', JSON.stringify(data, null, 2));

    // Extract blocks from tool call response
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== 'convert_to_blocknote') {
      throw new Error('Invalid AI response format');
    }

    const result = JSON.parse(toolCall.function.arguments);
    const blocks = result.blocks;

    if (!Array.isArray(blocks) || blocks.length === 0) {
      throw new Error('AI returned invalid or empty blocks array');
    }

    // Validate basic block structure
    for (const block of blocks) {
      if (!block.type) {
        throw new Error('Invalid block structure: missing type');
      }
    }

    return new Response(
      JSON.stringify({ blocks }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in convert-html-to-blocks:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to convert HTML to blocks'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
