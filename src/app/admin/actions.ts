'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { getAdminSession, clearAdminSession } from './auth';

// Validate slug to prevent path traversal attacks
function validateSlug(slug: string): void {
  if (!slug || typeof slug !== 'string') {
    throw new Error('Invalid slug');
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    throw new Error('Slug can only contain letters, numbers, hyphens, and underscores');
  }
  if (slug.length > 255) {
    throw new Error('Slug is too long');
  }
}

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
}

export async function checkAdminSession(): Promise<boolean> {
  const session = await getAdminSession();
  return session !== null;
}

export async function clearAdminSessionAction(): Promise<void> {
  await clearAdminSession();
}

async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized: No valid admin session');
  }
}

export async function savePost(data: PostData, slug: string) {
  await requireAdminSession();
  validateSlug(slug);
  const postsDir = path.join(process.cwd(), 'content/posts');

  const escapeYaml = (str: string) => {
    if (!str) return '""';
    if (str.includes(':') || str.includes('"') || str.includes('\n') || str.includes('#')) {
      return `"${str.replace(/"/g, '\\"')}"`;
    }
    return str;
  };

  const frontmatter = [
    '---',
    `title: ${escapeYaml(data.title)}`,
    `date: ${escapeYaml(data.date)}`,
    `excerpt: ${escapeYaml(data.excerpt)}`,
    `category: ${escapeYaml(data.category)}`,
    `tags: [${data.tags.map(t => `"${t.replace(/"/g, '\\"')}"`).join(', ')}]`,
    '---',
  ].join('\n');

  const markdown = `${frontmatter}\n\n${data.content}`;
  const filePath = path.join(postsDir, `${slug}.md`);

  await fs.writeFile(filePath, markdown, 'utf-8');
}

export async function listPosts() {
  await requireAdminSession();
  const postsDir = path.join(process.cwd(), 'content/posts');
  const files = await fs.readdir(postsDir);
  const posts = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(postsDir, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const matter = require('gray-matter');
    const { data } = matter(content);

    const dateStr = data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date || '');

    posts.push({
      slug,
      title: data.title || slug,
      date: dateStr,
      category: data.category || '',
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string) {
  await requireAdminSession();
  validateSlug(slug);
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDir, `${slug}.md`);
  const content = await fs.readFile(filePath, 'utf-8');
  const matter = require('gray-matter');
  const { data, content: postContent } = matter(content);

  return {
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    category: data.category || '',
    tags: data.tags || [],
    content: postContent,
  };
}

export async function deletePost(slug: string) {
  await requireAdminSession();
  validateSlug(slug);
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filePath = path.join(postsDir, `${slug}.md`);
  await fs.unlink(filePath);
}
