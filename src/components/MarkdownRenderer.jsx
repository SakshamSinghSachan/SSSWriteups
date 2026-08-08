import React, { useState } from "react";
import { Copy, Check, Shield } from "lucide-react";

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code">
      <div className="code-header">
        {language && <span className="code-lang">{language}</span>}
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderInline(text) {
  if (!text) return null;
  const elements = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    // Code `...`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      elements.push(<code key={key++}>{codeMatch[1]}</code>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }
    // Bold **...** or __...__
    const boldMatch = remaining.match(/^(\*\*|__)(.*?)\1/);
    if (boldMatch) {
      elements.push(<strong key={key++}>{renderInline(boldMatch[2])}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }
    // Italic *...* or _..._
    const italicMatch = remaining.match(/^(\*|_)(.*?)\1/);
    if (italicMatch) {
      elements.push(<em key={key++}>{renderInline(italicMatch[2])}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }
    // Link [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      elements.push(
        <a key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    const nextSpecial = remaining.search(/[`*_\[]/);
    if (nextSpecial === -1) {
      elements.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      elements.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      elements.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return elements;
}

export function extractHeadings(markdown) {
  if (!markdown) return [];
  const lines = markdown.split(/\r?\n/);
  const headings = [];
  let inCode = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim().replace(/[*_`]/g, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ level, text, id });
    }
  }

  return headings;
}

export function MarkdownRenderer({ content }) {
  if (!content) return null;

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({
        type: "code",
        language: lang,
        content: codeLines.join("\n"),
      });
      continue;
    }

    // Headings #, ##, ###
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const rawText = headingMatch[2].trim();
      const cleanText = rawText.replace(/[*_`]/g, "");
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      blocks.push({
        type: "heading",
        level,
        id,
        text: rawText,
      });
      i++;
      continue;
    }

    // Callout / Blockquote
    if (line.trim().startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const quoteText = quoteLines.join("\n");
      blocks.push({
        type: "blockquote",
        content: quoteText,
      });
      continue;
    }

    // List items
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const listItems = [];
      const isOrdered = /^\s*\d+\.\s+/.test(line);

      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "");
        listItems.push(itemText);
        i++;
      }
      blocks.push({
        type: "list",
        ordered: isOrdered,
        items: listItems,
      });
      continue;
    }

    // Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph
    const paragraphLines = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].match(/^#{1,6}\s+/) &&
      !lines[i].trim().startsWith(">") &&
      !/^\s*([-*]|\d+\.)\s+/.test(lines[i])
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }
    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" "),
    });
  }

  return (
    <div className="markdown-content">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const Tag = `h${block.level}`;
            return (
              <Tag key={idx} id={block.id} className="md-heading">
                {renderInline(block.text)}
              </Tag>
            );
          }
          case "code":
            return (
              <CodeBlock
                key={idx}
                code={block.content}
                language={block.language}
              />
            );
          case "blockquote":
            return (
              <div key={idx} className="callout">
                <Shield size={20} />
                <div>{renderInline(block.content)}</div>
              </div>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag key={idx} className="md-list">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderInline(item)}</li>
                ))}
              </ListTag>
            );
          }
          case "paragraph":
            return <p key={idx}>{renderInline(block.content)}</p>;
          default:
            return null;
        }
      })}
    </div>
  );
}
