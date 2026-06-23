import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Blog content lives as markdown in /content/posts (one file per post).
// Filename (minus ".md") is the URL slug. Frontmatter shape below maps 1:1
// to a TinaCMS collection, so the visual editor can bolt on later with no
// change to how content is stored or rendered.
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO "YYYY-MM-DD"
  excerpt: string;
  category: string;
  tags: string[];
};

export type Post = PostMeta & { html: string };

function readPostFile(file: string): {
  meta: PostMeta;
  body: string;
  draft: boolean;
} {
  const slug = file.replace(/\.md$/i, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      category: String(data.category ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    },
    body: content,
    // Posts with `draft: true` are never built or served (they 404), so a
    // draft is safe to commit to git without exposing it on the live site.
    draft: data.draft === true,
  };
}

function listFiles(): string[] {
  try {
    return fs.readdirSync(POSTS_DIR).filter((f) => /\.md$/i.test(f));
  } catch {
    return [];
  }
}

// Files that are publishable (drafts excluded).
function publishedFiles(): string[] {
  return listFiles().filter((f) => !readPostFile(f).draft);
}

// All published posts, newest first.
export function getAllPosts(): PostMeta[] {
  return publishedFiles()
    .map((f) => readPostFile(f).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostSlugs(): string[] {
  return publishedFiles().map((f) => f.replace(/\.md$/i, ""));
}

export function getPost(slug: string): Post | null {
  const file = `${slug}.md`;
  if (!publishedFiles().includes(file)) return null;
  const { meta, body } = readPostFile(file);
  return { ...meta, html: marked.parse(body, { async: false }) };
}
