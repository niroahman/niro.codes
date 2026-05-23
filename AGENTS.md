# AGENTS.md — niro.codes

Instructions for AI agents working in this repo.

---

## Project

Portfolio site for Niro Åhman. CRT terminal UI, dark/light themes, blog via
Astro content collections, Space Invaders clone (NIRO.EXE) with score
persistence via Vercel Postgres.

## Stack

| Layer      | Tech                                                        |
| ---------- | ----------------------------------------------------------- |
| Framework  | Astro 6 (SSG/SSR hybrid)                                    |
| Styling    | Tailwind CSS v4 (Vite plugin) + globals.css for CRT effects |
| Components | Astro components; React islands for interactive pieces      |
| Language   | TypeScript strict throughout                                |
| Deploy     | Vercel                                                      |
| DB         | Vercel Postgres (scores)                                    |
| Analytics  | Umami (self-hosted)                                         |
| Tests      | Vitest (unit) + Playwright (E2E)                            |
| Hooks      | Lefthook — pre-commit: lint+test, pre-push: E2E             |
| CI         | GitHub Actions (.github/workflows/ci.yml)                   |

## Commands

```bash
npm run dev            # dev server, localhost:4321
npm run build          # production build → dist/
npm run lint           # ESLint
npm run format:check   # Prettier check
npm run test           # Vitest unit tests
npm run test:e2e       # Playwright E2E
```

Always run `npm run build` and `npm run test` before committing.

## CSS architecture

CRT-specific CSS lives in `src/styles/globals.css`:

- CSS custom properties: `--phosphor`, `--phosphor-dim`, `--bg`, `--bg-outer`, `--amber`
- `--phosphor-dim` is computed: `color-mix(in srgb, var(--phosphor) 35%, #000)`
- Light theme override: `color-mix(in srgb, var(--phosphor) 70%, #000)`
- Keyframe animations: `flicker`, `blink`, `appear`, `fadein`
- CRT classes: `.crt`, `.glow`, `.reflection`, `.cursor`, `.line`, `.ascii`

**Never use `--green`** — that name is gone. Always `--phosphor`.

Tailwind handles layout and spacing on content pages. Do NOT attempt to
replicate `::before`/`::after` CRT effects with Tailwind arbitrary values —
keep them in globals.css.

## Phosphor color system

User-selectable accent color, saved to `localStorage: niro.codes:phosphor`.
Default: pink `#ff6eb4`. Separate from dark/light theme.

Curated palette (all work on `#050a05` dark bg):
| key | hex | label |
|---|---|---|
| pink | `#ff6eb4` | default |
| green | `#39ff14` | classic |
| amber | `#ffb300` | warm |
| cyan | `#00e5ff` | cool |
| lavender | `#c084fc` | purple |
| white | `#e8e8e8` | minimal |

Color picker lives in `AppearanceControls.astro` (commit 3c) — dark/light
toggle + phosphor swatches in one component. No-flash inline script in
`<head>` reads both `niro.codes:theme` and `niro.codes:phosphor` before paint.

## Layouts

- `CRTLayout.astro` — full-viewport CRT shell (home, terminal pages).
  `overflow: hidden`, scanlines, flicker.
- `BaseLayout.astro` — inner pages (blog, projects, about).
  Vignette + rounded corners only, `overflow-y: auto`.

## Conventions

- No comments unless the WHY is non-obvious
- No `console.log` left in committed code
- Astro components for structure; React islands (`client:visible` or
  `client:idle`) only where interactivity is required
- localStorage keys namespaced: `niro.codes:<key>`
- Unit tests colocated: `src/foo/bar.test.ts` alongside `bar.ts`
- E2E tests in `e2e/` directory

## Current build state

### Commit 1 — valmis (pending push)

Scaffold kunnossa. Ennen commitia pitää ajaa:

```bash
npm run format   # korjaa Prettier-ongelmat 6 tiedostossa
git add -A
git commit -m "init: scaffold Astro project with Tailwind, React, ESLint, Prettier, Vitest, Playwright, Lefthook, CI"
git push
```

### Commit 1b — kesken

Vercel-projekti luotu (`niro-codes` / niro-ahmans-projects).
GitHub-repo yhdistys epäonnistui CLI:stä — tee manuaalisesti:
**Vercel dashboard → niro-codes → Settings → Git → Connect GitHub repo**
tai tarkista GitHub → Settings → Applications → Vercel → Repository access.
Tämän jälkeen luodaan `vercel.json` + `.env.example`.

### Seuraavat vaiheet

- Commit 2: `feat: CRT design system` — `src/styles/globals.css` (`--phosphor` pink default, `color-mix` dim), Tailwind config
- Commit 3a: `BaseLayout.astro`
- Commit 3b: `CRTLayout.astro`
- Commit 3c: `AppearanceControls.astro` — dark/light toggle + phosphor color swatches
- Commit 4a: `BootSequence.astro`
- Commit 4b: `index.astro` — home menu (rakenne: AGENTS.md "Home menu structure")
- Commit 4c: `NavPrompt.astro` + `src/scripts/termNav.ts`

### Ei vielä toteutettu

- CRT design system
- Layoutit
- Teema + värinvalitsin
- Boot-sekvenssi + kotisivu
- Sisältösivut: blog, projects, about, /now
- NIRO.EXE -peli
- Vercel Postgres
- Umami-analytiikka

## Home menu structure

```
[1] about.exe          who is this guy
[2] projects/          things i've built
[3] blog.log           thoughts & writeups
[4] /now               what i'm doing now

- - - - - - - - - - - - - - - - - - - -
  [gh] github ↗          [li] linkedin ↗
- - - - - - - - - - - - - - - - - - - -

[▶] NIRO.EXE            [ INSERT COIN ]
```

External links (GitHub, LinkedIn) in a dashed border box — `border: 1px dashed var(--dim)`.
Open in background tab (`target="_blank" rel="noopener noreferrer"`).
Menu items typed as `{ key, label, description, href, external?: boolean }`.

## Projects content architecture

Astro content collection at `src/content/projects/` — MDX files.
Frontmatter drives the listing card, MDX body is the detail page.

**Frontmatter schema:**

```ts
title: string
description: string        // short, for listing card
image: string              // path to /public/projects/*.png
tech: string[]             // badge list
github?: string
demo?: string
slideUrl?: string          // Google Slides / Speaker Deck → iframe embed
date: Date
featured?: boolean         // show first in listing
```

**Listing page** (`/projects`): image + title + description + tech tags +
"details →" link. If `slideUrl` present, also "slides ↗" button on card.

**Detail page** (`/projects/[slug]`): full MDX body, hero image, tech stack,
links, slide deck embed via `<SlideEmbed>` React component.

`<SlideEmbed>` detects URL type (Google Slides, Speaker Deck) and renders
appropriate `<iframe>`. Lives at `src/components/SlideEmbed.tsx`.

## Content strategy notes

- Blog tone: judgment and original thinking, not tutorials or framework lists
- niro.codes itself is a project entry — document the full stack and build process
- Homelab = blog category for experiments, not a dedicated page
- /now page = dynamic, what Niro is working on/reading/focused on right now
