# CLAUDE.md — Portfolio

## Project Overview

**Name:** Portfolio
**Purpose:** Personal developer portfolio for Jeremie Quenet
**URL:** https://notjeremie.dev
**Format:** Single-page static HTML (no framework, no build step)
**Repo:** github.com/notjeremie/portfolio (public)
**Deploy:** Vercel auto-deploy from GitHub

## Tech Stack

| Category | Technology |
|----------|------------|
| Structure | Single HTML file (`index.html`) |
| Fonts | DM Sans, DM Serif Display, IBM Plex Mono (Google Fonts) |
| Icons | Inline SVGs (Lucide-style) |
| Animations | CSS transitions + IntersectionObserver scroll fade-ins |
| Hosting | Vercel (notjeremie.dev) |

## Design System

**Style: Minimal Dark** — Inspired by ivangarcia.vercel.app. Solid dark cards, no heavy glass blur except nav/badges.

| Token | Hex | Purpose |
|-------|-----|---------|
| bg | `#0a0a0b` | Page background |
| bg-card | `#141417` | Card backgrounds |
| border | `rgba(255,255,255,0.08)` | Subtle borders |
| text | `#e8e8ed` | Primary text |
| text-secondary | `#8b8b96` | Secondary text |
| text-muted | `#55555e` | Muted text |
| accent | `#5b9cf5` | Interactive elements, links |
| accent-teal | `#5bbfb5` | Code strings |
| accent-purple | `#9b7fea` | Purple accents |
| accent-orange | `#e8a838` | Code values |
| accent-green | `#5cb85c` | Status badges |

**Liquid glass** (nav, badges only): `backdrop-filter: blur(40px) saturate(180%)`

**Border radii:** `16px` cards, `12px` inner elements, `100px` pills/badges

## Page Structure

1. **Nav** — Floating centered pill (liquid glass). Links: Projects, Experience, Contact + theme toggle
2. **Hero** — Photo + name + "Builds stuff that people actually need." + 4 stats + resume download link
   - Stats: 8 Products | 15K+ Shelters Mapped (→ miklat.app) | 2 App Stores | 24/7 Live Systems
3. **Projects** — Horizontal carousel (7 projects) with cover card images, click to open modal
   - Miklat, i24 Shifts, Studio Countdown, i24 Daily Pics, i24 Studio Schedule, i24 Maps, i24 MCR Extension
   - Modal: multi-image gallery with arrows/dots, fullscreen lightbox on click, portrait detection
4. **Section Divider** — Line + blue dot
5. **Experience** — About paragraphs + tools card + timeline (4 roles at i24NEWS + independent dev)
6. **Code Preview** — CLAUDE.md preview block (i24 Shifts example)
7. **Contact** — Icon grid (LinkedIn, Instagram, GitHub, Email) + "Get in touch" card + "Download resume" card
8. **Footer** — "Built with Claude Code, naturally."

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Entire portfolio site |
| `resume.docx` | Downloadable resume |
| `pp_jeremie_dev.png` | Profile photo |
| `img/` | 7 cover cards + 15 screenshots |
| `tools/screenshot-beautifier.html` | Screenshot beautifier + cover card generator tool |
| `.gitignore` | Excludes screenshots/, node_modules/, *.docx (except resume.docx) |

## Tone & Positioning

- **NOT a "prompt engineer portfolio"** — developer portfolio where AI skills show through naturally
- AI is mentioned as a tool/workflow detail, not the headline
- Lead with problem-solving and real-world impact
- Claude Code is referenced subtly (code preview section, footer)

## Quick Commands

```bash
# Serve locally
python3 -m http.server 8090 --bind 0.0.0.0

# Push changes
git add <files> && git commit -m "message" && git push
```
