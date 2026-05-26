```
 ███╗   ██╗██╗██████╗  ██████╗  ·  ██████╗ ██████╗ ██████╗ ███████╗███████╗
 ████╗  ██║██║██╔══██╗██╔═══██╗   ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝
 ██╔██╗ ██║██║██████╔╝██║   ██║   ██║     ██║   ██║██║  ██║█████╗  ███████╗
 ██║╚██╗██║██║██╔══██╗██║   ██║   ██║     ██║   ██║██║  ██║██╔══╝  ╚════██║
 ██║ ╚████║██║██║  ██║╚██████╔╝   ╚██████╗╚██████╔╝██████╔╝███████╗███████║
 ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝
```

# niro.codes

Personal portfolio site with a CRT terminal aesthetic. Dark/light themes, user-selectable phosphor accent color, built-in terminal simulation, and NIRO.EXE (Space Invaders clone).

> **Built openly with AI.** Design and architecture planned together with Hermes (Samantha). Implementation written with [Claude Code](https://claude.ai/code) (Sonnet 4.6). The code is mine — the AI pair programming is just honest.

---

## Stack

| Layer      | Tech                                       |
| ---------- | ------------------------------------------ |
| Framework  | Astro 6 (SSG/SSR hybrid)                   |
| Styling    | Tailwind CSS v4 + custom CRT design system |
| Components | Astro components + React islands           |
| Language   | TypeScript (strict)                        |
| Deploy     | Vercel                                     |
| DB         | Vercel Postgres (NIRO.EXE scores)          |
| Analytics  | Umami (self-hosted, optional)              |
| Tests      | Vitest + Playwright                        |

## Design system

Single phosphor accent color (`--phosphor-raw`) drives everything — text, glow shadows, image tinting, interactive states. Six curated swatches, persisted to `localStorage`. Dark and light themes both WCAG AA compliant: light theme automatically darkens the phosphor via `color-mix(in oklch)`.

CRT effects live in `src/styles/global.css`: scanlines, vignette, flicker animation, glow shadows. Tailwind handles layout. `::before`/`::after` CRT pseudo-elements stay in CSS — not Tailwind arbitrary values.

---

## Dev setup

```bash
npm install
npx lefthook install
npx playwright install chromium
```

```bash
npm run dev       # localhost:4321
npm run build
npm run preview
```

### Analytics (optional)

Copy `.env.example` to `.env` and fill in your Umami instance:

```
PUBLIC_UMAMI_URL=https://your-umami.example.com/script.js
PUBLIC_UMAMI_WEBSITE_ID=your-website-id
```

---

## Testing

```bash
npm run test           # Vitest unit tests
npm run test:e2e       # Playwright E2E (starts dev server)
```

## Code quality

```bash
npm run lint
npm run format
```

Git hooks via Lefthook — pre-commit: lint + format + unit tests. Pre-push: E2E. CI on push/PR to `main` via GitHub Actions.

---

## Structure

```
src/
  components/    # AppearanceControls, BootSequence, Head, NavPrompt, Sidebar, SlideEmbed
  content/       # Blog posts and project entries (MDX)
  layouts/       # BaseLayout (inner pages), CRTLayout (home/terminal)
  pages/         # about, blog, now, niro-exe, projects, tags
  scripts/       # termNav.ts — keyboard navigation
  styles/        # global.css — CRT design system, tokens, animations
  utils/         # shared helpers
e2e/             # Playwright smoke tests
```
