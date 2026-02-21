# CLAUDE.md — Portfolio

## Project Overview

**Name:** Portfolio
**Purpose:** Personal developer portfolio for Jeremie Quenet
**Format:** Single-page static HTML (no framework, no build step)
**Serving:** `python3 -m http.server 8090 --bind 0.0.0.0` from this folder, accessible via Tailscale

## Tech Stack

| Category | Technology |
|----------|------------|
| Structure | Single HTML file (`index.html`) |
| Fonts | DM Sans, DM Serif Display, IBM Plex Mono (Google Fonts) |
| Icons | Inline SVGs (Lucide-style) |
| Animations | CSS transitions + IntersectionObserver scroll fade-ins |
| Hosting | Local for now (Tailscale for remote preview) |

## Design System

**Style: Liquid Glass** — Matching the i24-Shifts aesthetic.

| Token | Hex | Purpose |
|-------|-----|---------|
| primary | `#5b9cf5` | Interactive elements |
| primary-light | `#7db4ff` | Stats, highlights |
| accent-teal | `#5bbfb5` | Teal icons/dots |
| accent-purple | `#9b7fea` | Purple icons/dots |
| accent-orange | `#e8a838` | Orange icons/dots |
| accent-green | `#5cb85c` | Status badges, green dots |
| dark-900 | `#0d0f14` | Page background |

**Glass panels:** `backdrop-filter: blur(40px) saturate(180%)`, `rgba(255,255,255,0.04)` bg, subtle border + inset highlight.

**Border radii:** `28px` cards (--radius-xl), `20px` inner elements (--radius-lg), `100px` badges/buttons.

## Page Structure

1. **Nav** — Fixed frosted glass header. Links: About, Projects, How I Work, Stack, Contact
2. **Hero** — "I build tools that people actually use." + 4 stats (5 products, 15K+ data points, 100+ users, 2 app stores)
3. **About Me** — 4 glass cards: Full-Stack Builder, Ship Don't Demo, AI-Augmented Workflow, Real-World Impact
4. **Projects** — 5 project cards with tags, highlights, status badges:
   - Miklat (Mobile App, In Review)
   - i24 Shifts (Web App PWA, Production)
   - Studio Countdown (Web App, Production)
   - i24 Daily Pics (Internal Tool, Production)
   - Israel Shelters Dataset (Data Pipeline, Complete)
5. **How I Work** — 4-step methodology + CLAUDE.md code preview block
6. **Tech Stack** — Grid of 12 technologies
7. **Contact** — Email (placeholder), GitHub, LinkedIn
8. **Footer** — "Built with Claude Code, naturally."

## Tone & Positioning

- **NOT a "prompt engineer portfolio"** — it's a developer portfolio where AI skills show through naturally
- AI is mentioned as a tool/workflow detail, not the headline
- Lead with problem-solving and real-world impact
- Claude Code is referenced subtly (About card, How I Work section, footer)
- Contact section is generic, not role-specific

## TODO

- [ ] Replace `jeremie@example.com` with real email
- [ ] Verify GitHub URL (`notjeremie`) and LinkedIn URL (`jeremiequenet`)
- [ ] Add project screenshots/visuals
- [ ] Add live project URLs when ready
- [ ] Consider deploying to a public host (Netlify, Vercel, GitHub Pages)

## Quick Commands

```bash
# Serve locally
python3 -m http.server 8090 --bind 0.0.0.0

# Access via Tailscale
# http://100.91.132.92:8090
```
