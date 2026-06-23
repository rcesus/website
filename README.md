# rccowie.com

A MySpace-style personal profile site built with Next.js. It's 2006 in your browser.

Live at **[www.rccowie.com](https://www.rccowie.com)**

---

## What it is

A personal website that recreates the look and feel of a classic MySpace profile — fixed 800px width, blue chrome, table-based sidebar layout, animated GIF contact buttons, and all. Under the hood it's a modern Next.js 16 app with TypeScript and Tailwind CSS 4.

Features:
- **Profile page** — "RC is in your extended network", bio, friends grid, latest posts
- **Blog** — Markdown-based posts with YAML front matter, statically generated, sorted newest-first
- **Music player** — Web Audio API visualizer, auto-loads MP3s from `/public/music`, collapsible playlist
- **Contact** — Multi-provider email compose (Gmail, Outlook, or default mail app), Web Share API for "Forward to a Friend"

---

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript 5](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [gray-matter](https://github.com/jonschlinkert/gray-matter) + [marked](https://github.com/markedjs/marked) for blog content

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Blog posts

Posts live in `/content/posts/` as Markdown files with front matter:

```md
---
title: Post Title
date: 2026-01-01
excerpt: Short description.
category: Music
tags: [blink-182, pop-punk]
draft: false
---

Post content here.
```

Set `draft: true` to exclude a post from the build.

---

## Music player

Drop MP3 files into `/public/music/` named `Artist - Title.mp3`. Cover art should be `Artist - Title.jpg` (or any `Artist - *.jpg` as a fallback) in the same folder. The player builds the playlist automatically at runtime.

---

## Inspiration

- **Blog layout**: [ketoverlock/yourspace](https://github.com/ketoverlock/yourspace)
- **MySpace framework/structure**: [wittenbrock/toms-myspace-page](https://github.com/wittenbrock/toms-myspace-page)

---

## Deployed on

[Vercel](https://vercel.com)
