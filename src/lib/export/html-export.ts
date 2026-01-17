import katex from 'katex';
import { Block } from '@blocknote/core';

interface HTMLExportOptions {
  title: string;
  blocks: Block[];
  includeStyles?: boolean;
}

export function exportToHTML(options: HTMLExportOptions): void {
  const { title, blocks, includeStyles = true } = options;

  try {
    const contentHtml = blocksToHTML(blocks);
    
    const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  ${includeStyles ? getStyles() : ''}
</head>
<body>
  <article class="document">
    <header class="document-header">
      <h1>${escapeHtml(title)}</h1>
      <p class="document-meta">Generated: ${new Date().toLocaleDateString()}</p>
    </header>
    <div class="document-content">
      ${contentHtml}
    </div>
  </article>
</body>
</html>`;

    // Trigger download
    const blob = new Blob([htmlDocument], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_')}_draft.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Error generating HTML:', error);
    throw new Error('Failed to generate HTML. Please try again.');
  }
}

function blocksToHTML(blocks: Block[]): string {
  return blocks.map(block => blockToHTML(block)).join('');
}

function blockToHTML(block: Block): string {
  const type = block.type as string;
  const content = (block.content || []) as any[];

  switch (type) {
    case 'heading':
      const level = (block.props as any)?.level || 1;
      const headingText = contentToHTML(content);
      return `<h${level}>${headingText}</h${level}>`;
    
    case 'paragraph':
      const paragraphText = contentToHTML(content);
      return `<p>${paragraphText || '<br/>'}</p>`;
    
    case 'bulletListItem':
      const bulletText = contentToHTML(content);
      return `<ul><li>${bulletText}</li></ul>`;
    
    case 'numberedListItem':
      const numberedText = contentToHTML(content);
      return `<ol><li>${numberedText}</li></ol>`;
    
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
          return `<div class="math-block">${rendered}</div>`;
        }
        return `<span class="math-inline">${rendered}</span>`;
      } catch (error) {
        return `<span class="math-error">[Math Error: ${escapeHtml(latex)}]</span>`;
      }
    
    case 'image':
      const src = (block.props as any)?.url || '';
      const caption = (block.props as any)?.caption || '';
      return `<figure>
        <img src="${escapeHtml(src)}" alt="${escapeHtml(caption)}" />
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}
      </figure>`;
    
    case 'table':
      return `<table><tr><td>[Table content]</td></tr></table>`;
    
    default:
      const defaultText = contentToHTML(content);
      return `<p>${defaultText || ''}</p>`;
  }
}

function contentToHTML(content: any[]): string {
  if (!Array.isArray(content)) return '';
  
  return content.map(item => {
    if (typeof item === 'string') return escapeHtml(item);
    if (item.type === 'text') {
      let text = escapeHtml(item.text || '');
      const styles = item.styles || {};
      
      if (styles.bold) text = `<strong>${text}</strong>`;
      if (styles.italic) text = `<em>${text}</em>`;
      if (styles.underline) text = `<u>${text}</u>`;
      if (styles.code) text = `<code>${text}</code>`;
      
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

function getStyles(): string {
  return `<style>
    body {
      font-family: 'Times New Roman', Times, serif;
      line-height: 1.6;
      max-width: 8.5in;
      margin: 0 auto;
      padding: 1in;
      background: #f5f5f5;
    }
    
    .document {
      background: white;
      padding: 1in;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .document-header {
      border-bottom: 2px solid #333;
      padding-bottom: 1em;
      margin-bottom: 2em;
    }
    
    .document-header h1 {
      margin: 0;
      font-size: 24pt;
      color: #333;
    }
    
    .document-meta {
      margin: 0.5em 0 0 0;
      color: #666;
      font-size: 11pt;
    }
    
    .document-content h1 { font-size: 20pt; margin-top: 1.5em; margin-bottom: 0.5em; }
    .document-content h2 { font-size: 16pt; margin-top: 1.2em; margin-bottom: 0.5em; }
    .document-content h3 { font-size: 14pt; margin-top: 1em; margin-bottom: 0.5em; }
    
    .document-content p {
      margin-bottom: 1em;
    }
    
    .document-content ul, .document-content ol {
      margin-left: 1.5em;
      margin-bottom: 1em;
    }
    
    .document-content figure {
      text-align: center;
      margin: 1.5em 0;
    }
    
    .document-content figure img {
      max-width: 100%;
      height: auto;
    }
    
    .document-content figcaption {
      font-size: 0.9em;
      color: #666;
      margin-top: 0.5em;
      font-style: italic;
    }
    
    .math-block {
      text-align: center;
      margin: 1em 0;
      font-size: 1.2em;
    }
    
    .math-inline {
      display: inline;
    }
    
    .math-error {
      color: red;
      font-family: monospace;
    }
    
    code {
      background: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
    }
    
    table td, table th {
      border: 1px solid #ccc;
      padding: 0.5em;
    }
    
    @media print {
      body {
        background: white;
        padding: 0;
      }
      
      .document {
        box-shadow: none;
      }
    }
  </style>`;
}
