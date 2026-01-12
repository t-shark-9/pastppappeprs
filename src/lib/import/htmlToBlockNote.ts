import { Block } from "@blocknote/core";
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
 * Converts HTML to BlockNote blocks
 * Handles headings, paragraphs, lists, images, code blocks, blockquotes, tables, and inline formatting
 */
export function htmlToBlockNote(html: string): Block[] {
  if (!html || html.trim() === "") {
    return [{ type: "paragraph", content: [] }] as Block[];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: Block[] = [];

  // Process inline formatting recursively
  const processInlineNodes = (node: Node, currentStyles: any = {}): InlineContent[] => {
    const result: InlineContent[] = [];

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text) {
        result.push({
          type: "text",
          text,
          styles: Object.keys(currentStyles).length > 0 ? { ...currentStyles } : undefined,
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      const newStyles = { ...currentStyles };

      // Update styles based on element
      if (tagName === "strong" || tagName === "b") newStyles.bold = true;
      if (tagName === "em" || tagName === "i") newStyles.italic = true;
      if (tagName === "u") newStyles.underline = true;
      if (tagName === "s" || tagName === "strike" || tagName === "del") newStyles.strike = true;
      if (tagName === "code") newStyles.code = true;

      // Handle links
      if (tagName === "a") {
        const href = element.getAttribute("href");
        if (href) {
          const linkText = element.textContent || "";
          result.push({
            type: "link",
            text: linkText,
            href,
            styles: Object.keys(newStyles).length > 0 ? { ...newStyles } : undefined,
          });
          return result;
        }
      }

      // Recursively process children
      Array.from(element.childNodes).forEach((child) => {
        result.push(...processInlineNodes(child, newStyles));
      });
    }

    return result;
  };

  // Process list items recursively
  const processList = (listElement: HTMLElement, ordered: boolean): Block[] => {
    const items: Block[] = [];
    
    Array.from(listElement.children).forEach((child) => {
      if (child.tagName.toLowerCase() === "li") {
        const content = processInlineNodes(child);
        const blockType = ordered ? "numberedListItem" : "bulletListItem";
        
        items.push({
          type: blockType,
          content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }],
        } as Block);

        // Handle nested lists
        const nestedLists = child.querySelectorAll("ul, ol");
        nestedLists.forEach((nestedList) => {
          const isOrdered = nestedList.tagName.toLowerCase() === "ol";
          items.push(...processList(nestedList as HTMLElement, isOrdered));
        });
      }
    });

    return items;
  };

  // Process table
  const processTable = (tableElement: HTMLElement): Block | null => {
    const rows: string[][] = [];
    
    // Process table rows
    const tableRows = tableElement.querySelectorAll("tr");
    tableRows.forEach((tr) => {
      const cells: string[] = [];
      const tableCells = tr.querySelectorAll("td, th");
      tableCells.forEach((cell) => {
        cells.push(cell.textContent?.trim() || "");
      });
      if (cells.length > 0) {
        rows.push(cells);
      }
    });

    if (rows.length === 0) return null;

    // BlockNote table structure
    return {
      type: "table",
      content: {
        type: "tableContent",
        rows: rows.map(row => ({
          cells: row.map(cell => [{ type: "text", text: cell, styles: {} }])
        }))
      }
    } as any;
  };

  // Main node processing
  const processNode = (node: Node): Block[] => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      return [];
    }

    const element = node as HTMLElement;
    const tagName = element.tagName.toLowerCase();
    const result: Block[] = [];

    // Skip Google Docs wrapper spans and style tags
    if (tagName === "span" && element.children.length > 0) {
      Array.from(element.childNodes).forEach((child) => {
        result.push(...processNode(child));
      });
      return result;
    }

    // Headings
    if (tagName === "h1" || tagName === "h2" || tagName === "h3") {
      const level = parseInt(tagName[1]) as 1 | 2 | 3;
      const content = processInlineNodes(element);
      result.push({
        type: "heading",
        props: { level },
        content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }],
      } as Block);
    }
    // Paragraphs
    else if (tagName === "p") {
      const content = processInlineNodes(element);
      // Only add non-empty paragraphs
      if (content.length > 0 && content.some(c => c.text.trim())) {
        result.push({
          type: "paragraph",
          content,
        } as Block);
      }
    }
    // Lists
    else if (tagName === "ul" || tagName === "ol") {
      const ordered = tagName === "ol";
      result.push(...processList(element, ordered));
    }
    // Images
    else if (tagName === "img") {
      const src = element.getAttribute("src");
      const alt = element.getAttribute("alt") || "";
      if (src) {
        result.push({
          type: "image",
          props: {
            url: src,
            caption: alt,
          },
        } as Block);
      }
    }
    // Code blocks
    else if (tagName === "pre") {
      const code = element.querySelector("code");
      const text = code ? code.textContent || "" : element.textContent || "";
      result.push({
        type: "codeBlock",
        props: {
          language: "plaintext",
        },
        content: [{ type: "text", text, styles: {} }],
      } as Block);
    }
    // Blockquotes
    else if (tagName === "blockquote") {
      const content = processInlineNodes(element);
      result.push({
        type: "paragraph",
        content: content.length > 0 ? content : [{ type: "text", text: "", styles: {} }],
      } as Block);
    }
    // Horizontal rule
    else if (tagName === "hr") {
      result.push({
        type: "paragraph",
        content: [{ type: "text", text: "---", styles: {} }],
      } as Block);
    }
    // Tables
    else if (tagName === "table") {
      const tableBlock = processTable(element);
      if (tableBlock) {
        result.push(tableBlock);
      }
    }
    // Divs and other containers - recursively process children
    else if (["div", "section", "article", "main", "body"].includes(tagName)) {
      Array.from(element.childNodes).forEach((child) => {
        result.push(...processNode(child));
      });
    }

    return result;
  };

  // Process body content
  Array.from(doc.body.childNodes).forEach((node) => {
    blocks.push(...processNode(node));
  });

  // Return at least an empty paragraph
  return blocks.length > 0 ? blocks : [{ type: "paragraph", content: [] } as Block];
}

/**
 * Validates file size and type
 */
export function validateHtmlFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!file.name.toLowerCase().endsWith(".html")) {
    return { valid: false, error: "Please upload an .html file" };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: "This file exceeds the 10MB limit" };
  }
  
  return { valid: true };
}

/**
 * Reads HTML file as text
 */
export async function readHtmlFile(file: File): Promise<string> {
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
 * Validates ZIP file size
 */
export function validateZipFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024; // 50MB for ZIP files (larger because of images)
  
  if (!file.name.toLowerCase().endsWith(".zip")) {
    return { valid: false, error: "Please upload a .zip file" };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: "This file exceeds the 50MB limit" };
  }
  
  return { valid: true };
}

/**
 * Extracts ZIP file and uploads images to Supabase storage
 * Returns HTML content with updated image URLs and image mapping
 */
export async function extractZipAndUploadImages(
  zipFile: File, 
  supabase: SupabaseClient
): Promise<{ html: string; imageMap: Record<string, string> }> {
  try {
    // Load ZIP file
    const zip = await JSZip.loadAsync(zipFile);
    
    // Find HTML file
    let htmlContent: string | null = null;
    
    for (const [fileName, file] of Object.entries(zip.files)) {
      if (fileName.toLowerCase().endsWith('.html') && !file.dir) {
        htmlContent = await file.async('text');
        break;
      }
    }
    
    if (!htmlContent) {
      throw new Error('No HTML file found in ZIP');
    }
    
    // Find all images referenced in HTML
    const imageMap: Record<string, string> = {};
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
    const imagePaths = new Set<string>();
    
    let match;
    while ((match = imgRegex.exec(htmlContent)) !== null) {
      const imagePath = match[1];
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
    
    // Replace image paths in HTML
    let updatedHtml = htmlContent;
    for (const [oldPath, newUrl] of Object.entries(imageMap)) {
      // Escape special regex characters in the path
      const escapedPath = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`src=["']${escapedPath}["']`, 'gi');
      updatedHtml = updatedHtml.replace(regex, `src="${newUrl}"`);
    }
    
    return { html: updatedHtml, imageMap };
  } catch (err) {
    console.error('ZIP extraction error:', err);
    throw new Error(`Failed to extract ZIP: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}
