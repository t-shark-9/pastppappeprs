import mammoth from 'mammoth';

interface RichTextSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  link?: string;
}

interface NormalizedBlock {
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'image';
  level?: number;
  text?: string;
  richText?: RichTextSpan[];
  ordered?: boolean;
  items?: string[];
  rows?: string[][];
  src?: string;
  alt?: string;
}

export interface NormalizedImportedDoc {
  blocks: NormalizedBlock[];
  imageDataUrls: string[];
}

/**
 * Converts a .docx file to a normalized document structure
 * using mammoth.js in the browser
 */
export async function convertDocxToNormalized(file: File): Promise<NormalizedImportedDoc> {
  const arrayBuffer = await file.arrayBuffer();
  
  const imageDataUrls: string[] = [];
  
  // Convert docx to HTML with embedded images as data URLs
  const result = await mammoth.convertToHtml(
    { arrayBuffer },
    {
      convertImage: mammoth.images.imgElement(async (image) => {
        // Read image as data URL
        const buffer = await image.read();
        const base64 = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const dataUrl = `data:${image.contentType};base64,${base64}`;
        imageDataUrls.push(dataUrl);
        return { src: dataUrl };
      }),
    }
  );

  console.log('Mammoth HTML output:', result.value);
  console.log('Found images:', imageDataUrls.length);

  // Parse the HTML into normalized blocks
  const blocks = parseHtmlToBlocks(result.value);

  return { blocks, imageDataUrls };
}

/**
 * Converts an .html file to a normalized document structure
 */
export async function convertHtmlToNormalized(file: File): Promise<NormalizedImportedDoc> {
  const htmlText = await file.text();
  
  // Extract data URL images
  const imageDataUrls: string[] = [];
  const imgRegex = /<img[^>]+src="(data:[^"]+)"[^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(htmlText)) !== null) {
    imageDataUrls.push(match[1]);
  }

  const blocks = parseHtmlToBlocks(htmlText);

  return { blocks, imageDataUrls };
}

function parseHtmlToBlocks(html: string): NormalizedBlock[] {
  const blocks: NormalizedBlock[] = [];
  
  // Create a temporary DOM element
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Recursively process all nodes, capturing images wherever they appear
  const processNode = (node: Node, inBlock: boolean = false): boolean => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (tagName.match(/^h[1-6]$/)) {
        // Heading
        const level = parseInt(tagName[1]);
        const text = element.textContent || '';
        if (text.trim()) {
          blocks.push({
            type: 'heading',
            level,
            text: text.trim(),
            richText: extractRichTextFromElement(element),
          });
          return true;
        }
      } else if (tagName === 'p') {
        // Paragraph - check for images inside
        const hasImage = element.querySelector('img');
        const text = element.textContent || '';

        // If this paragraph only contains a <br>, preserve it as an empty paragraph block
        const hasOnlyBreak = !text.trim() && element.querySelector('br');

        if (hasImage) {
          // Process children separately to extract images and any inline text
          for (const child of Array.from(element.childNodes)) {
            processNode(child, false);
          }

          if (!hasOnlyBreak && text.trim()) {
            // Also preserve any text around the image
            blocks.push({
              type: 'paragraph',
              text: text.trim(),
              richText: extractRichTextFromElement(element),
            });
          }
          return true;
        }
        
        if (hasOnlyBreak) {
          // Blank line / spacing paragraph
          blocks.push({
            type: 'paragraph',
            text: '',
          });
          return true;
        }

        if (text.trim()) {
          blocks.push({
            type: 'paragraph',
            text: text.trim(),
            richText: extractRichTextFromElement(element),
          });
          return true;
        }
      } else if (tagName === 'ul' || tagName === 'ol') {
        // List
        const items: string[] = [];
        element.querySelectorAll('li').forEach((li) => {
          const text = li.textContent?.trim();
          if (text) items.push(text);
        });
        if (items.length > 0) {
          blocks.push({
            type: 'list',
            ordered: tagName === 'ol',
            items,
          });
          return true;
        }
      } else if (tagName === 'table') {
        // Table
        const rows: string[][] = [];
        element.querySelectorAll('tr').forEach((tr) => {
          const row: string[] = [];
          tr.querySelectorAll('td, th').forEach((cell) => {
            row.push(cell.textContent?.trim() || '');
          });
          if (row.length > 0) rows.push(row);
        });
        if (rows.length > 0) {
          blocks.push({ type: 'table', rows });
          return true;
        }
      } else if (tagName === 'img') {
        // Image - always capture it
        const src = element.getAttribute('src');
        if (src) {
          blocks.push({
            type: 'image',
            src,
            alt: element.getAttribute('alt') || '',
          });
          console.log('Found image block:', src.substring(0, 50));
          return true;
        }
      } else if (tagName === 'br') {
        // Line break - add empty paragraph for spacing
        if (!inBlock) {
          blocks.push({
            type: 'paragraph',
            text: '',
          });
          return true;
        }
      }
      
      // Process children for unhandled elements
      let hasContent = false;
      for (const child of Array.from(element.childNodes)) {
        if (processNode(child, inBlock)) {
          hasContent = true;
        }
      }
      return hasContent;
    }
    
    return false;
  };

  // Process body content
  for (const child of Array.from(doc.body.childNodes)) {
    processNode(child);
  }

  console.log('Parsed blocks:', blocks.length);
  console.log('Image blocks:', blocks.filter(b => b.type === 'image').length);

  return blocks;
}

function extractRichTextFromElement(element: Element): RichTextSpan[] | undefined {
  const spans: RichTextSpan[] = [];
  
  const processTextNode = (node: Node, formatting: Partial<RichTextSpan> = {}) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      // Don't trim here - preserve spaces between words
      if (text) {
        spans.push({ text, ...formatting });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tagName = el.tagName.toLowerCase();
      
      // Skip images in rich text extraction
      if (tagName === 'img') {
        return;
      }
      
      const newFormatting = { ...formatting };
      
      if (tagName === 'strong' || tagName === 'b') {
        newFormatting.bold = true;
      }
      if (tagName === 'em' || tagName === 'i') {
        newFormatting.italic = true;
      }
      if (tagName === 'u') {
        newFormatting.underline = true;
      }
      if (tagName === 'a') {
        newFormatting.link = el.getAttribute('href') || undefined;
      }
      
      for (const child of Array.from(el.childNodes)) {
        processTextNode(child, newFormatting);
      }
    }
  };

  for (const child of Array.from(element.childNodes)) {
    processTextNode(child);
  }

  return spans.length > 0 ? spans : undefined;
}
