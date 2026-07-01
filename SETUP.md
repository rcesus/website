# Setup Guide

This repo contains the MySpace-inspired portfolio structure. Some personal/dynamic content is excluded from git to keep the repo generalized — here's how to add your own.

## 1. Blog Posts

Create a `content/posts/` directory and add markdown files. The filename (minus `.md`) becomes the URL slug.

**File format:** `content/posts/{slug}.md`

**Frontmatter (required):**
```yaml
---
title: Your Post Title
date: YYYY-MM-DD
excerpt: Brief summary for the archive
category: CategoryName
tags: [tag1, tag2, tag3]
draft: false
---

# Your markdown content here
```

**Example:**
```yaml
---
title: Why I Love Blink-182
date: 2024-01-15
excerpt: My thoughts on emo's greatest band
category: Music
tags: [music, opinion, emo]
draft: false
---

Blink-182 changed my life when...
```

Posts with `draft: true` won't be published (they 404 on the live site) but are safe to commit. Published posts are sorted newest-first.

## 2. Music Playlist

Drop MP3 files into `public/music/` with the naming pattern: `Artist - Title.mp3`

**Example:**
```
public/music/
  Taking Back Sunday - Cute Without the 'E' (Cut from the Team).mp3
  Brand New - The Quiet Things.mp3
  Dashboard Confessional - Screaming Infidelities.mp3
```

**Cover art (optional):** Place a matching image next to the MP3:
- Preferred: `Artist - Title.jpg` (exact match)
- Fallback: `Artist - Album.jpg` (first image by that artist)

The playlist auto-builds from the directory and is pinned with Taking Back Sunday at the top.

## 3. Profile Photos & Friends

Create `public/pictures/` and add:
- `rc.JPG` — your profile picture
- Friend photos: `{name}.jpg` — used in the friends list (if you implement one)
- Other images as needed

**Example:**
```
public/pictures/
  rc.JPG
  abraham.jpg
  amanda.jpg
  tams.jpg
```

## 4. Customize ProfileShell.tsx

Edit `src/app/ProfileShell.tsx` to replace hardcoded personal data:

**What to customize:**
- Lines 45-60: Profile information (age, location, personal quote)
- Lines 88-125: Interests section
- Lines 128-173: Details section (status, occupation, education, etc.)
- Lines 175-214: Schools section (education history)
- Line 31: GitHub link (change `rcesus` to your username)
- Line 52: Personal quote (change `":-)""` to your own)

The component loads the playlist from `lib/playlist.ts` and contact icons from `ContactIcons.tsx` — customize those too if needed.

## 5. Environment Variables

Create `.env.local` for local development (not committed):

```env
ADMIN_PASSWORD=your-secure-password-here
```

This is read by `/api/admin/auth` for the admin login. In production, set this via your deployment platform's secrets.

## 6. Running Locally

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## Git Workflow

Personal content is in `.gitignore`, so:
- You can commit drafts and test content locally without worrying about pushing personal info
- All your changes to `/content/posts/`, `/public/music/`, `/public/pictures/` are local-only
- If you clone this repo to a new machine, you'll need to re-populate these directories with your own content

To sync personal content across machines, keep those directories in a private backup or use a separate private repo.
