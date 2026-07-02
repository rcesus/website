# rccowie.com

A MySpace-style personal profile site built with Next.js. It's 2006 in your browser.

Live at **[www.rccowie.com](https://www.rccowie.com)**

---

## What it is

A personal website that recreates the look and feel of a classic MySpace profile — fixed 800px width, blue chrome, table-based sidebar layout, animated GIF contact buttons, and all. Under the hood it's a modern Next.js 16 app with TypeScript and Tailwind CSS 4.

Features:
- **Profile page** — "RC is in your extended network", bio, interests, details
- **Blog** — Markdown-based posts with YAML front matter, auto-sanitized slugs
- **Admin editor** — Password-protected UI to create/edit/delete posts locally
- **2026 Mode toggle** — Switch between default and article-style rendering on blog posts
- **Music player** — Auto-loads MP3s from `/public/music`, collapsible playlist
- **Contact** — Links to email, social media, and messaging platforms
- **Analytics** — Vercel Web Analytics for site traffic

---

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [gray-matter](https://github.com/jonschlinkert/gray-matter) + [marked](https://github.com/markedjs/marked) for blog content
- [Vercel Web Analytics](https://vercel.com/analytics) for traffic

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/rcesus/website.git
cd website
npm install
```

### 2. Environment Setup

Create `.env.local` in the root directory:

```env
ADMIN_PASSWORD=your-secure-password-here
```

This file is local-only and excluded from git.

### 3. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin) (login with your password)

---

## Content Management

Blog posts live in `/content/posts/` as Markdown files with YAML front matter:

```md
---
title: Post Title
date: 2026-01-01
excerpt: Short description for the archive.
category: Music
tags: [blink-182, pop-punk]
draft: false
---

Post content here.
```

Set `draft: true` to exclude a post from publishing (drafts 404 and are never built, so they're safe to commit).

**Slugs are auto-sanitized:** Spaces become hyphens, special characters are removed, and text is lowercased. A post titled "Test Slug With Spaces & Special!" becomes `test-slug-with-spaces-special`.

There are two ways to manage posts:

### Option A — Admin editor (local only)

The admin dashboard at [`/admin`](http://localhost:3000/admin) (login with `ADMIN_PASSWORD`) has a UI to create, edit, and delete posts at `/admin/editor`. It writes directly to `/content/posts/`.

> **This only works when running locally.** Vercel's production filesystem is read-only, so saving from the admin editor on the live site fails with a "read-only filesystem" error. Use the admin editor on your machine, then commit the generated `.md` files to git (see Option B) to publish.

### Option B — Edit Markdown directly

Create or edit `.md` files in `/content/posts/` by hand, then commit and push. The next deploy builds them into the live site. This is the path that actually publishes to production.

### Music Playlist

Drop MP3 files into `/public/music/` named `Artist - Title.mp3`

**Optional cover art:** `Artist - Title.jpg` (or `Artist - Album.jpg` as fallback)

The player auto-loads all files and pins Taking Back Sunday at the top.

### Profile Photos

Add to `/public/pictures/`:
- `rc.JPG` — your profile picture
- `{name}.jpg` — friend photos

### Customization

- **`src/app/page.tsx`** — bio ("About me"), interests ("Who I'd like to meet"), and the friends grid
- **`src/app/ProfileShell.tsx`** — sidebar: profile picture, age/location, personal quote, "Last Login", and the top-nav GitHub link (shared chrome across all pages)

---

## Deployment

Hosted on Vercel with auto-deploy: every push to `main` triggers a production build. Just commit and push.

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**Environment variables:** `ADMIN_PASSWORD` must be set in the Vercel project settings (**Settings → Environment Variables**) — `.env.local` is gitignored and never pushed. Changing it takes effect on the next deploy.

---

## Troubleshooting

**Music player not showing songs?**
- Ensure MP3s are in `public/music/` with pattern `Artist - Title.mp3`
- Restart dev server

**Blog posts not appearing?**
- Check YAML frontmatter is valid
- Set `draft: false` to publish
- Restart dev server

---

## Inspiration

- **Blog layout**: [ketoverlock/yourspace](https://github.com/ketoverlock/yourspace)
- **MySpace framework**: [wittenbrock/toms-myspace-page](https://github.com/wittenbrock/toms-myspace-page)

---

## Deployed on

[Vercel](https://vercel.com)
