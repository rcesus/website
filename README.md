# rccowie.com

A MySpace-style personal profile site built with Next.js. It's 2006 in your browser.

Live at **[www.rccowie.com](https://www.rccowie.com)**

---

## What it is

A personal website that recreates the look and feel of a classic MySpace profile — fixed 800px width, blue chrome, table-based sidebar layout, animated GIF contact buttons, and all. Under the hood it's a modern Next.js 16 app with TypeScript and Tailwind CSS 4.

Features:
- **Profile page** — "RC is in your extended network", bio, interests, details
- **Blog** — Markdown-based posts with YAML front matter, create/edit via admin dashboard
- **Music player** — Auto-loads MP3s from `/public/music`, collapsible playlist
- **Admin dashboard** — Password-protected editor to manage blog posts
- **Contact** — Links to email, social media, and messaging platforms

---

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [gray-matter](https://github.com/jonschlinkert/gray-matter) + [marked](https://github.com/markedjs/marked) for blog content

---

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd lolcowie-website
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

### Blog Posts

Posts live in `/content/posts/` as Markdown files:

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

Set `draft: true` to exclude a post from publishing.

**Via admin dashboard:** Visit `/admin/editor` to create, edit, and manage posts without touching files.

### Music Playlist

Drop MP3 files into `/public/music/` named `Artist - Title.mp3`

**Optional cover art:** `Artist - Title.jpg` (or `Artist - Album.jpg` as fallback)

The player auto-loads all files and pins Taking Back Sunday at the top.

### Profile Photos

Add to `/public/pictures/`:
- `rc.JPG` — your profile picture
- `{name}.jpg` — friend photos

### Customization

Edit `src/app/ProfileShell.tsx` to update:
- Profile info (age, location, interests, bio, schools)
- GitHub link (line 31)
- Personal quote (line 52)

---

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Your changes"
git push origin main
```

(`.env.local` is already in `.gitignore` — won't be pushed)

### Step 2: Deploy

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New"** → **"Project"**
3. Select your `lolcowie-website` repo
4. Vercel auto-detects Next.js — click **"Deploy"**
5. Wait ~2 minutes for build to complete

### Step 3: Set Environment Variables

1. Go to your Vercel project **Settings** → **"Environment Variables"**
2. Add a new variable:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** your-secure-password
   - **Environments:** Production, Preview, Development
3. Click **"Save"**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click the three-dot menu on the latest deployment
3. Select **"Redeploy"**

Your site is now live at `your-project.vercel.app`

### Custom Domain (Optional)

1. In Vercel project settings → **Domains**
2. Add your domain
3. Update your domain registrar's DNS to point to Vercel
4. Vercel auto-generates HTTPS certificate

---

## Admin Dashboard

Access at `/admin/editor` (login required)

Features:
- View all published posts
- Create new posts
- Edit existing posts
- Password-protected with CSRF tokens
- Rate limited (5 attempts per 15 minutes)

---

## Troubleshooting

**Can't log in?**
- Verify `.env.local` has `ADMIN_PASSWORD` set
- Restart dev server after changing `.env.local`
- Check caps lock on password

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
