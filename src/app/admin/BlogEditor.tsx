'use client';

import { useState, useEffect } from 'react';
import matter from 'gray-matter';

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
}

interface BlogEditorProps {
  initialData?: PostData;
  initialSlug?: string;
  onSave: (data: PostData, slug: string) => Promise<void>;
  onCancel?: () => void;
}

export default function BlogEditor({ initialData, initialSlug, onSave, onCancel }: BlogEditorProps) {
  const [data, setData] = useState<PostData>(
    initialData || {
      title: '',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      category: '',
      tags: [],
      content: '',
    }
  );
  const [tagsInput, setTagsInput] = useState(initialData?.tags.join(', ') || '');
  const [slug, setSlug] = useState(initialSlug || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data.title && !slug) {
      const generatedSlug = data.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [data.title, slug]);

  const handleParseMarkdown = (markdown: string) => {
    const { data: frontmatter, content } = matter(markdown);
    setData({
      title: String(frontmatter.title || data.title),
      date: String(frontmatter.date || data.date),
      excerpt: String(frontmatter.excerpt || data.excerpt),
      category: String(frontmatter.category || data.category),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : data.tags,
      content,
    });
    setTagsInput(
      Array.isArray(frontmatter.tags)
        ? frontmatter.tags.map(String).join(', ')
        : tagsInput
    );
  };

  const handleMarkdownPaste = async () => {
    const markdown = prompt('Paste your markdown content:');
    if (markdown) {
      handleParseMarkdown(markdown);
      setMessage('Markdown parsed!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        handleParseMarkdown(content);
        const slugFromFile = file.name.replace(/\.md$/i, '');
        setSlug(slugFromFile);
        setMessage(`File parsed! Slug: ${slugFromFile}`);
        setTimeout(() => setMessage(''), 3000);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim()) {
      setMessage('⚠️ Please enter a slug');
      return;
    }
    if (!data.title.trim()) {
      setMessage('⚠️ Please enter a title');
      return;
    }
    setSaving(true);
    try {
      await onSave(
        {
          ...data,
          tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
        },
        slug
      );
      setMessage('✓ Post saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="blog-editor-form">
      <div className="editor-section">
        <h3>Post Metadata</h3>

        <div className="form-group">
          <label htmlFor="slug">Slug (filename without .md)</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g., my-post-title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date (YYYY-MM-DD)</label>
            <input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              placeholder="e.g., Research"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            value={data.excerpt}
            onChange={(e) => setData({ ...data, excerpt: e.target.value })}
            rows={3}
            placeholder="Brief summary of the post"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g., ai, research, work"
          />
        </div>
      </div>

      <div className="editor-section">
        <h3>Content</h3>

        <div className="editor-toolbar">
          <button type="button" onClick={handleMarkdownPaste}>
            Paste Markdown
          </button>
          <label className="file-upload-btn">
            Upload .md File
            <input
              type="file"
              accept=".md,.markdown"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="content">Markdown Content</label>
          <textarea
            id="content"
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            rows={15}
            placeholder="Write or paste your markdown here..."
          />
        </div>
      </div>

      <div className="editor-actions">
        <button type="submit" disabled={saving} className="save-btn">
          {saving ? 'Saving...' : 'Save Post'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
        {message && <p className="editor-message">{message}</p>}
      </div>
    </form>
  );
}
