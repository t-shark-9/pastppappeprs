import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } from 'docx';
import katex from 'katex';
import { Block } from '@blocknote/core';

interface DOCXExportOptions {
  title: string;
  blocks: Block[];
  author?: string;
}

export async function exportToDOCX(options: DOCXExportOptions): Promise<void> {
  const { title, blocks, author = "Student" } = options;

  try {
    const docParagraphs: Paragraph[] = [];

    // Add title page elements
    docParagraphs.push(
      new Paragraph({
        text: title,
        heading: HeadingLevel.TITLE,
        spacing: { after: 200 }
      })
    );

    if (author) {
      docParagraphs.push(
        new Paragraph({
          text: `Author: ${author}`,
          spacing: { after: 100 }
        })
      );
    }

    docParagraphs.push(
      new Paragraph({
        text: `Generated: ${new Date().toLocaleDateString()}`,
        spacing: { after: 400 }
      })
    );

    // Convert blocks to paragraphs
    for (const block of blocks) {
      const converted = await blockToDOCX(block);
      docParagraphs.push(...converted);
    }

    // Create document
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch = 1440 twentieths of a point
              right: 1440,
              bottom: 1440,
              left: 1440,
            }
          }
        },
        children: docParagraphs
      }]
    });

    // Generate and download
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}_draft.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate DOCX. Please try again.');
  }
}

async function blockToDOCX(block: Block): Promise<Paragraph[]> {
  const type = block.type as string;
  const content = (block.content || []) as any[];

  switch (type) {
    case 'heading':
      const level = (block.props as any)?.level || 1;
      const headingLevel = level === 1 ? HeadingLevel.HEADING_1 : 
                          level === 2 ? HeadingLevel.HEADING_2 : 
                          HeadingLevel.HEADING_3;
      return [
        new Paragraph({
          text: contentToPlainText(content),
          heading: headingLevel,
          spacing: { before: 240, after: 120 }
        })
      ];
    
    case 'paragraph':
      const paragraphRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: paragraphRuns.length > 0 ? paragraphRuns : [new TextRun('')],
          spacing: { after: 200 }
        })
      ];
    
    case 'bulletListItem':
      const bulletRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: bulletRuns,
          bullet: { level: 0 },
          spacing: { after: 100 }
        })
      ];
    
    case 'numberedListItem':
      const numberedRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: numberedRuns,
          numbering: { reference: 'default-numbering', level: 0 },
          spacing: { after: 100 }
        })
      ];
    
    case 'inlineMath':
    case 'blockMath':
      const latex = (block.props as any)?.latex || '';
      const isBlock = type === 'blockMath';
      try {
        // Render math as image
        const imageData = await mathToImage(latex, isBlock);
        return [
          new Paragraph({
            children: [
              new ImageRun({
                type: 'png',
                data: imageData,
                transformation: {
                  width: isBlock ? 400 : 200,
                  height: isBlock ? 100 : 50
                }
              })
            ],
            alignment: isBlock ? AlignmentType.CENTER : AlignmentType.LEFT,
            spacing: { before: 120, after: 120 }
          })
        ];
      } catch (error) {
        return [
          new Paragraph({
            children: [new TextRun({ text: `[Math: ${latex}]`, color: 'FF0000' })],
            spacing: { after: 100 }
          })
        ];
      }
    
    case 'image':
      const src = (block.props as any)?.url || '';
      const caption = (block.props as any)?.caption || '';
      try {
        const imageData = await fetchImageAsBuffer(src);
        const paragraphs: Paragraph[] = [
          new Paragraph({
            children: [
              new ImageRun({
                type: 'png',
                data: imageData,
                transformation: { width: 500, height: 300 }
              })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 }
          })
        ];
        
        if (caption) {
          paragraphs.push(
            new Paragraph({
              children: [new TextRun({ text: caption, italics: true, size: 20 })],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 }
            })
          );
        }
        
        return paragraphs;
      } catch (error) {
        return [
          new Paragraph({
            children: [new TextRun({ text: '[Image]', color: '999999' })],
            spacing: { after: 100 }
          })
        ];
      }
    
    default:
      const defaultRuns = await contentToTextRuns(content);
      return [
        new Paragraph({
          children: defaultRuns.length > 0 ? defaultRuns : [new TextRun('')],
          spacing: { after: 100 }
        })
      ];
  }
}

async function contentToTextRuns(content: any[]): Promise<TextRun[]> {
  if (!Array.isArray(content)) return [];
  
  return content.map(item => {
    if (typeof item === 'string') return new TextRun(item);
    if (item.type === 'text') {
      const text = item.text || '';
      const styles = item.styles || {};
      
      return new TextRun({
        text,
        bold: styles.bold || false,
        italics: styles.italic || false,
        underline: styles.underline ? {} : undefined,
        font: styles.code ? 'Courier New' : undefined
      });
    }
    return new TextRun('');
  });
}

function contentToPlainText(content: any[]): string {
  if (!Array.isArray(content)) return '';
  return content.map(item => {
    if (typeof item === 'string') return item;
    if (item.type === 'text') return item.text || '';
    return '';
  }).join('');
}

async function mathToImage(latex: string, isBlock: boolean): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      // Create temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.background = 'white';
      container.style.padding = '10px';
      document.body.appendChild(container);

      // Render with KaTeX
      const rendered = katex.renderToString(latex, {
        displayMode: isBlock,
        throwOnError: false,
        trust: true
      });
      container.innerHTML = rendered;

      // Convert to canvas
      const canvas = document.createElement('canvas');
      const scale = 2;
      canvas.width = container.offsetWidth * scale;
      canvas.height = container.offsetHeight * scale;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        document.body.removeChild(container);
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.scale(scale, scale);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw HTML to canvas (simplified - in production use html2canvas)
      ctx.fillStyle = 'black';
      ctx.font = '16px serif';
      ctx.fillText(latex, 10, 30);

      document.body.removeChild(container);

      // Convert canvas to buffer
      canvas.toBlob((blob) => {
        if (blob) {
          blob.arrayBuffer().then(buffer => {
            resolve(new Uint8Array(buffer));
          });
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      }, 'image/png');
    } catch (error) {
      reject(error);
    }
  });
}

async function fetchImageAsBuffer(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const blob = await response.blob();
  const buffer = await blob.arrayBuffer();
  return new Uint8Array(buffer);
}
