/**
 * MarkdownRenderer
 * Lightweight markdown renderer for chat messages.
 * Supports: bold, italic, inline code, code blocks, headers, lists, links.
 */

import React from 'react';

interface Props {
  content: string;
  className?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseInline(text: string): string {
  // Bold **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Italic *text*
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Inline code `code`
  text = text.replace(
    /`([^`]+)`/g,
    '<code class="ai-md-inline-code">$1</code>'
  );
  // Links [text](url)
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="ai-md-link">$1</a>'
  );
  return text;
}

function parseMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  const html: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block fences
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        inCodeBlock = true;
        codeLines = [];
      } else {
        inCodeBlock = false;
        html.push(
          `<pre class="ai-md-pre"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
        );
        codeLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h3 class="ai-md-h3">${parseInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2 class="ai-md-h2">${parseInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h1 class="ai-md-h1">${parseInline(line.slice(2))}</h1>`);
      continue;
    }

    // Unordered list
    if (/^[-*+] /.test(line)) {
      if (!inList) {
        html.push('<ul class="ai-md-ul">');
        inList = true;
      }
      html.push(`<li class="ai-md-li">${parseInline(line.slice(2))}</li>`);
      continue;
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      if (!inList) {
        html.push('<ol class="ai-md-ol">');
        inList = true;
      }
      html.push(`<li class="ai-md-li">${parseInline(line.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }

    // Close list if we encounter a non-list line
    if (inList) {
      html.push('</ul>');
      inList = false;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html.push('<hr class="ai-md-hr" />');
      continue;
    }

    // Empty line = paragraph break
    if (line.trim() === '') {
      html.push('<br/>');
      continue;
    }

    // Regular paragraph
    html.push(`<p class="ai-md-p">${parseInline(line)}</p>`);
  }

  if (inList) html.push('</ul>');
  if (inCodeBlock && codeLines.length > 0) {
    html.push(
      `<pre class="ai-md-pre"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`
    );
  }

  return html.join('');
}

const MarkdownRenderer: React.FC<Props> = ({ content, className = '' }) => {
  const html = parseMarkdown(content);
  return (
    <div
      className={`ai-markdown ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
