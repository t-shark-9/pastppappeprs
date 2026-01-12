import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import katex from 'katex';
import { Block } from '@blocknote/core';

interface PDFExportOptions {
  title: string;
  blocks: Block[];
  author?: string;
  pageCount: number;
}

export async function exportToPDF(options: PDFExportOptions): Promise<void> {
  const { title, blocks } = options;

  try {
    // Create a temporary container for rendering
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = '8.5in'; // Letter width
    tempContainer.style.backgroundColor = 'white';
    tempContainer.style.fontFamily = 'Times New Roman, Times, serif';
    tempContainer.style.fontSize = '12pt';
    tempContainer.style.lineHeight = '1.6';
    tempContainer.style.color = 'black';
    tempContainer.style.padding = '1in';

    // Create the HTML structure without header
    const contentHtml = await blocksToHTML(blocks);
    
    tempContainer.innerHTML = `
      <div style="font-size: 12pt; line-height: 1.6;">
        ${contentHtml}
      </div>
    `;

    document.body.appendChild(tempContainer);

    // Convert to canvas with higher scale for better quality
    const canvas = await html2canvas(tempContainer, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: tempContainer.offsetWidth,
      height: tempContainer.offsetHeight,
      windowWidth: tempContainer.offsetWidth,
      windowHeight: tempContainer.offsetHeight
    });

    // Remove temporary container
    document.body.removeChild(tempContainer);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: 'letter'
    });

    const imgWidth = 8.5; // Letter width in inches
    const pageHeight = 11; // Letter height in inches
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add the image to PDF
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add more pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_')}_draft.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}

async function blocksToHTML(blocks: Block[]): Promise<string> {
  const html: string[] = [];

  for (const block of blocks) {
    html.push(await blockToHTML(block));
  }

  return html.join('');
}

async function blockToHTML(block: Block): Promise<string> {
  const type = block.type as string;
  const content = (block.content || []) as any[];

  switch (type) {
    case 'heading':
      const level = (block.props as any)?.level || 1;
      const headingText = await contentToText(content);
      const headingSizes: Record<number, string> = {
        1: '20pt',
        2: '16pt',
        3: '14pt'
      };
      const fontSize = headingSizes[level] || '14pt';
      return `<h${level} style="margin-top: 1.2em; margin-bottom: 0.6em; font-weight: bold; font-size: ${fontSize};">${headingText}</h${level}>`;
    
    case 'paragraph':
      const paragraphText = await contentToText(content);
      return `<p style="margin-bottom: 1em; font-size: 12pt;">${paragraphText || '<br/>'}</p>`;
    
    case 'bulletListItem':
      const bulletText = await contentToText(content);
      return `<ul style="margin-left: 1.5em; margin-bottom: 0.5em; font-size: 12pt;"><li style="margin-bottom: 0.3em;">${bulletText}</li></ul>`;
    
    case 'numberedListItem':
      const numberedText = await contentToText(content);
      return `<ol style="margin-left: 1.5em; margin-bottom: 0.5em; font-size: 12pt;"><li style="margin-bottom: 0.3em;">${numberedText}</li></ol>`;
    
    case 'inlineMath':
    case 'blockMath':
      const latex = (block.props as any)?.latex || '';
      const isBlock = type === 'blockMath';
      try {
        const rendered = katex.renderToString(latex, {
          displayMode: isBlock,
          throwOnError: false,
          trust: true
        });
        if (isBlock) {
          return `<div style="text-align: center; margin: 1.2em 0; font-size: 14pt;">${rendered}</div>`;
        }
        return `<span style="font-size: 12pt;">${rendered}</span>`;
      } catch (error) {
        return `<span style="color: red; font-size: 12pt;">[Math Error: ${escapeHtml(latex)}]</span>`;
      }
    
    case 'image':
      const src = (block.props as any)?.url || '';
      const caption = (block.props as any)?.caption || '';
      return `<figure style="margin: 1.5em 0; text-align: center;">
        <img src="${escapeHtml(src)}" style="max-width: 6in; max-height: 8in; width: auto; height: auto;" />
        ${caption ? `<figcaption style="font-size: 11pt; color: #666; margin-top: 0.5em;">${escapeHtml(caption)}</figcaption>` : ''}
      </figure>`;
    
    case 'table':
      // Basic table rendering - would need more complex logic for full support
      return `<table style="width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 11pt;">
        <tr><td style="border: 1px solid #ccc; padding: 0.5em;">[Table content]</td></tr>
      </table>`;
    
    default:
      const defaultText = await contentToText(content);
      return `<p style="font-size: 12pt;">${defaultText || ''}</p>`;
  }
}

async function contentToText(content: any[]): Promise<string> {
  if (!Array.isArray(content)) return '';
  
  return content.map(item => {
    if (typeof item === 'string') return escapeHtml(item);
    if (item.type === 'text') {
      let text = escapeHtml(item.text || '');
      const styles = item.styles || {};
      
      if (styles.bold) text = `<strong>${text}</strong>`;
      if (styles.italic) text = `<em>${text}</em>`;
      if (styles.underline) text = `<u>${text}</u>`;
      if (styles.code) text = `<code style="background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; font-size: 11pt; font-family: 'Courier New', monospace;">${text}</code>`;
      
      return text;
    }
    return '';
  }).join('');
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
