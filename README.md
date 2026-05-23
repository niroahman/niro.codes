# niro.codes

Portfolio site. CRT terminal aesthetic, dark/light themes, Space Invaders clone (NIRO.EXE).

**Stack:** Astro · Tailwind CSS v4 · React · TypeScript · Vercel · Postgres · Umami

**Domain:** niro.codes — niro.fi redirects here

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

## Testing

```bash
npm run test           # Vitest unit tests
npm run test:watch     # watch mode
npm run test:coverage  # coverage report
npm run test:e2e       # Playwright E2E (starts dev server)
npm run test:e2e:ui    # Playwright UI mode
```

## Code quality

```bash
npm run lint           # ESLint
npm run lint:fix
npm run format         # Prettier
npm run format:check
```

Git hooks via Lefthook:

- **pre-commit** — lint + format check + unit tests
- **pre-push** — E2E tests

CI runs on push/PR to `main` via GitHub Actions.

---

## Project structure

```
src/
  components/    # Astro + React components
  layouts/       # BaseLayout, CRTLayout
  pages/         # File-based routing
  scripts/       # Client-side TS utilities
  styles/        # globals.css (CRT design system)
  content/       # Blog posts (.md)
e2e/             # Playwright tests
```
