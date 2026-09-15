"use client";

import { useState, useRef } from "react";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import styles from "./writer.module.css";
import { 
  Bold, Italic, List, ListOrdered, Quote, Code, 
  Link as LinkIcon, Heading1, Heading2, SquareTerminal, X, Download, AlertCircle, Info, ShieldAlert, AlertTriangle, Lightbulb, Video
} from "lucide-react";

export default function BlogWriter() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{success: boolean, message: string} | null>(null);
  
  // Tabs for mobile
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  
  // Tags UI state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter, Comma, or Space
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, '').toLowerCase();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const author = formData.get('author') as string;
      const summary = formData.get('summary') as string;

      const date = new Date().toISOString().split('T')[0];
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const yamlTags = tags.length > 0 
        ? `\ntags:\n${tags.map(t => `  - ${t}`).join('\n')}`
        : '\ntags: []';

      const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
author: "${author.replace(/"/g, '\\"')}"
summary: "${summary.replace(/"/g, '\\"')}"${yamlTags}
---

${content}
`;

      const blob = new Blob([fileContent], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus({ success: true, message: `Successfully generated ${slug}.md! Place it in src/content/blogs to publish.` });
      
      (e.target as HTMLFormElement).reset();
      setContent('');
      setTags([]);
    } catch (err) {
      console.error(err);
      setStatus({ success: false, message: 'Failed to generate markdown file.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span>HACKLOG</span>
          <span className={styles.highlightText}> STUDIO</span>
        </h1>
        <p style={{ opacity: 0.8, marginTop: '1rem' }}>Serverless Markdown Generator • Deploy Anywhere</p>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.metadataGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="title">Blog Title</label>
            <input className={styles.input} type="text" id="title" name="title" required placeholder="e.g. Defeating Ransomware in 2026" />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="author">Author Name</label>
            <input className={styles.input} type="text" id="author" name="author" required placeholder="e.g. Uday" />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="tags">Tags</label>
            <div className={styles.tagInputWrapper}>
              <div className={styles.tagPills}>
                {tags.map(tag => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className={styles.tagRemoveBtn}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input 
                  type="text" 
                  className={styles.tagInputField}
                  placeholder={tags.length === 0 ? "Type tag & hit Space..." : "Add tag..."}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="summary">Short Summary</label>
            <input className={styles.input} type="text" id="summary" name="summary" required placeholder="A brief 1-2 sentence overview..." />
          </div>
        </div>

        <div className={styles.inputGroup + ' ' + styles.fullWidth}>
          <label className={styles.label}>Content Editor</label>
          <div className={styles.editorContainer}>
            <div className={styles.toolbar}>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('# ', '')} title="Heading 1"><Heading1 size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('## ', '')} title="Heading 2"><Heading2 size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('**', '**')} title="Bold"><Bold size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('*', '*')} title="Italic"><Italic size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('- ', '')} title="Bullet List"><List size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('- [ ] ', '')} title="Task List"><SquareTerminal size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('1. ', '')} title="Numbered List"><ListOrdered size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('> ', '')} title="Quote"><Quote size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('`', '`')} title="Inline Code"><Code size={18} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('```\n', '\n```')} title="Code Block"><SquareTerminal size={18} style={{ color: 'var(--color-1)' }} /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('[', '](https://)')} title="Link"><LinkIcon size={18} /></button>
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 5px' }} />
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('> [!NOTE]\n> ', '')} title="Note Alert"><Info size={18} color="#38bdf8" /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('> [!TIP]\n> ', '')} title="Tip Alert"><Lightbulb size={18} color="#4ade80" /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('> [!IMPORTANT]\n> ', '')} title="Important Alert"><AlertCircle size={18} color="#a78bfa" /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('> [!WARNING]\n> ', '')} title="Warning Alert"><AlertTriangle size={18} color="#facc15" /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('> [!CAUTION]\n> ', '')} title="Caution Alert"><ShieldAlert size={18} color="#f87171" /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('![youtube](https://www.youtube.com/watch?v=)', '')} title="YouTube Video"><Video size={18} color="#ff0000" /></button>
              <button type="button" className={styles.toolbarBtn} onClick={() => insertText('<details>\n<summary>Click to expand</summary>\n\n', '\n\n</details>')} title="Collapsible">▼</button>
            </div>
            
            <div className={styles.tabs}>
              <button type="button" className={`${styles.tabBtn} ${activeTab === 'write' ? styles.active : ''}`} onClick={() => setActiveTab('write')}>Write</button>
              <button type="button" className={`${styles.tabBtn} ${activeTab === 'preview' ? styles.active : ''}`} onClick={() => setActiveTab('preview')}>Preview</button>
            </div>

            <div className={styles.splitView}>
              <div className={`${styles.pane} ${activeTab === 'write' ? styles.active : ''}`}>
                <textarea 
                  ref={textareaRef}
                  className={styles.textarea} 
                  id="content" 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required 
                  placeholder="Write your markdown here... Use the toolbar above to format."
                />
              </div>
              <div className={`${styles.pane} ${activeTab === 'preview' ? styles.active : ''}`}>
                <div className={styles.preview}>
                  {content ? (
                    <MarkdownRenderer content={content} />
                  ) : (
                    <div style={{ opacity: 0.5, fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
                      Live preview will appear here...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'GENERATING...' : <><Download size={18} style={{display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom'}} /> DOWNLOAD HACKLOG</>}
        </button>

        {status && (
          <div className={`${styles.message} ${status.success ? styles.success : styles.error}`}>
            {status.message}
          </div>
        )}
      </form>
    </main>
  );
}
