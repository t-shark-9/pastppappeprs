import { Block } from "@blocknote/core";
import { marked, type Token, type Tokens } from "marked";
import JSZip from "jszip";
import type { SupabaseClient } from "@supabase/supabase-js";

interface InlineContent {
  type: "text" | "link";
  text: string;
  href?: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    code?: boolean;
  };
}

/**
 * Converts Markdown to BlockNote blocks
 */
export function markdownToBlockNote(markdown: string): Block[] {
  if (!markdown || markdown.trim() === "") {
    return [{ type: "paragraph", content: [] }] as Block[];
  }

  const blocks: Block[] = [];
  
  // Parse markdown to tokens
  const tokens = marked.lexer(markdown);
  
  // Process each token
  for (const token of tokens) {
    const block = processToken(token);
    if (block) {
      if (Array.isArray(block)) {
        blocks.push(...block);
      } else {
        blocks.push(block);
      }
    }
  }

  return blocks.length > 0 ? blocks : [{ type: "paragraph", content: [] } as Block];
}

/**
 * Process markdown inline tokens to BlockNote inline content
 */
function processInlineTokens(tokens: Token[]): InlineContent[] {
  const result: InlineContent[] = [];

  for (const token of tokens) {
    if (token.type === "text") {
      const textToken = token as Tokens.Text;
      result.push({
        type: "text",
        text: textToken.text,
      });
    } else if (token.type === "strong") {
      const strongToken = token as Tokens.Strong;
      const innerTokens = strongToken.tokens || [];
      const innerContent = processInlineTokens(innerTokens);
      result.push(...innerContent.map(c => ({
        ...c,
        styles: { ...c.styles, bold: true }
      })));
    } else if (token.type === "em") {
      const emToken = token as Tokens.Em;
      const innerTokens = emToken.tokens || [];
      const innerContent = processInlineTokens(innerTokens);
      result.push(...innerContent.map(c => ({
        ...c,
        styles: { ...c.styles, italic: true }
      })));
    } else if (token.type === "del") {
      const delToken = token as Tokens.Del;
      const innerTokens = delToken.tokens || [];
      const innerContent = processInlineTokens(innerTokens);
      result.push(...innerContent.map(c => ({
        ...c,
        styles: { ...c.styles, strike: true }
      })));
    } else if (token.type === "codespan") {
      const codeToken = token as Tokens.Codespan;
      result.push({
        type: "text",
        text: codeToken.text,
        styles: { code: true }
      });
    } else if (token.type === "link") {
      const linkToken = token as Tokens.Link;
      const innerTokens = linkToken.tokens || [];
      const innerText = innerTokens.map(t => (t as any).text || "").join("");
      result.push({
        type: "link",
        text: innerText || linkToken.text,
        href: linkToken.href,
      });
    }
  }

  return result;
}

/**
 * Process a single markdown token to BlockNote block(s)
 */
function processToken(token: Token): Block | Block[] | null {
  switch (token.type) {
    case "heading": {
      const headingToken = token as Tokens.Heading;
      const level = Math.min(headingToken.depth, 3) as 1 | 2 | 3;
      const content = processInlineTokens(headingToken.tokens || []);
      return {
        type: "heading",
        props: { level },
        content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }],
      } as Block;
    }

    case "paragraph": {
      const paragraphToken = token as Tokens.Paragraph;
      const content = processInlineTokens(paragraphToken.tokens || []);
      if (content.length > 0 && content.some(c => c.text.trim())) {
        return {
          type: "paragraph",
          content,
        } as Block;
      }
      return null;
    }

    case "list": {
      const listToken = token as Tokens.List;
      const items: Block[] = [];
      
      for (const item of listToken.items) {
        const content = processInlineTokens(item.tokens || []);
        const blockType = listToken.ordered ? "numberedListItem" : "bulletListItem";
        
        items.push({
          type: blockType,
          content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }],
        } as Block);
      }
      
      return items;
    }

    case "code": {
      const codeToken = token as Tokens.Code;
      return {
        type: "codeBlock",
        props: {
          language: codeToken.lang || "plaintext",
        },
        content: [{ type: "text", text: codeToken.text, styles: {} }],
      } as Block;
    }

    case "blockquote": {
      const blockquoteToken = token as Tokens.Blockquote;
      const blocks: Block[] = [];
      
      for (const innerToken of blockquoteToken.tokens) {
        const block = processToken(innerToken);
        if (block) {
          if (Array.isArray(block)) {
            blocks.push(...block);
          } else {
            blocks.push(block);
          }
        }
      }
      
      return blocks;
    }

    case "image": {
      const imageToken = token as Tokens.Image;
      return {
        type: "image",
        props: {
          url: imageToken.href,
          caption: imageToken.text || "",
        },
      } as Block;
    }

    case "hr": {
      return {
        type: "paragraph",
        content: [{ type: "text", text: "---", styles: {} }],
      } as Block;
    }

    case "table": {
      const tableToken = token as Tokens.Table;
      const rows: string[][] = [];
      
      // Add header row
      if (tableToken.header && tableToken.header.length > 0) {
        rows.push(tableToken.header.map(cell => {
          const tokens = cell.tokens || [];
          return tokens.map(t => (t as any).text || "").join("");
        }));
      }
      
      // Add body rows
      for (const row of tableToken.rows) {
        rows.push(row.map(cell => {
          const tokens = cell.tokens || [];
          return tokens.map(t => (t as any).text || "").join("");
        }));
      }
      
      return {
        type: "table",
        content: {
          type: "tableContent",
          rows: rows.map(row => ({
            cells: row.map(cell => [{ type: "text", text: cell, styles: {} }])
          }))
        }
      } as any;
    }

    default:
      return null;
  }
}

/**
 * Validates markdown file size
 */
export function validateMarkdownFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!file.name.toLowerCase().endsWith(".md") && !file.name.toLowerCase().endsWith(".markdown")) {
    return { valid: false, error: "Please upload a .md or .markdown file" };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: "This file exceeds the 10MB limit" };
  }
  
  return { valid: true };
}

/**
 * Reads markdown file as text
 */
export async function readMarkdownFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

/**
 * Extracts ZIP file containing markdown and images, uploads images to Supabase storage
 * Returns markdown content with updated image URLs and image mapping
 */
export async function extractMarkdownZipAndUploadImages(
  zipFile: File, 
  supabase: SupabaseClient
): Promise<{ markdown: string; imageMap: Record<string, string> }> {
  try {
    // Load ZIP file
    const zip = await JSZip.loadAsync(zipFile);
    
    // Find markdown file
    let markdownContent: string | null = null;
    
    for (const [fileName, file] of Object.entries(zip.files)) {
      const lowerName = fileName.toLowerCase();
      if ((lowerName.endsWith('.md') || lowerName.endsWith('.markdown')) && !file.dir) {
        markdownContent = await file.async('text');
        break;
      }
    }
    
    if (!markdownContent) {
      throw new Error('No markdown file found in ZIP');
    }
    
    // Find all images referenced in markdown
    const imageMap: Record<string, string> = {};
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const imagePaths = new Set<string>();
    
    let match;
    while ((match = imgRegex.exec(markdownContent)) !== null) {
      const imagePath = match[2];
      // Only process relative paths (not data URLs or external URLs)
      if (!imagePath.startsWith('data:') && !imagePath.startsWith('http://') && !imagePath.startsWith('https://')) {
        imagePaths.add(imagePath);
      }
    }
    
    // Upload each image
    for (const imagePath of imagePaths) {
      try {
        // Normalize path (remove leading ./ or /)
        const normalizedPath = imagePath.replace(/^\.?\//, '');
        
        // Find image in ZIP
        const imageFile = zip.file(normalizedPath);
        if (!imageFile) {
          console.warn(`Image not found in ZIP: ${normalizedPath}`);
          continue;
        }
        
        // Get image data
        const imageBlob = await imageFile.async('blob');
        
        // Determine file extension
        const extension = normalizedPath.split('.').pop()?.toLowerCase() || 'png';
        const contentType = extension === 'jpg' || extension === 'jpeg' ? 'image/jpeg' :
                           extension === 'png' ? 'image/png' :
                           extension === 'gif' ? 'image/gif' :
                           extension === 'webp' ? 'image/webp' :
                           'image/png';
        
        // Upload to Supabase storage
        const fileName = `imported-${Date.now()}-${Math.random().toString(36).substring(7)}.${extension}`;
        const { data, error } = await supabase.storage
          .from('editor-assets')
          .upload(fileName, imageBlob, {
            contentType,
            cacheControl: '3600',
          });
        
        if (error) {
          console.error(`Failed to upload image ${normalizedPath}:`, error);
          continue;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('editor-assets')
          .getPublicUrl(fileName);
        
        imageMap[imagePath] = publicUrl;
      } catch (err) {
        console.error(`Error processing image ${imagePath}:`, err);
      }
    }
    
    // Replace image paths in markdown
    let updatedMarkdown = markdownContent;
    for (const [oldPath, newUrl] of Object.entries(imageMap)) {
      // Escape special regex characters in the path
      const escapedPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`!\\[([^\\]]*)\\]\\(${escapedPath}\\)`, 'gi');
      updatedMarkdown = updatedMarkdown.replace(regex, `![$1](${newUrl})`);
    }
    
    return { markdown: updatedMarkdown, imageMap };
  } catch (err) {
    console.error('ZIP extraction error:', err);
    throw new Error(`Failed to extract markdown ZIP: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}
