# AGENTS.md — CortexMap

Guidance for AI coding agents working in this repository.

## Project overview

CortexMap is a Russian-language static reference website for navigating English-language learning
materials. It provides CEFR plans, exam guides, textbook catalogues, curated external resources,
and search. It does not provide interactive learning, user accounts, progress tracking,
gamification, or AI tutoring.

The site stores its own reference descriptions and links only to official or otherwise legitimate
external sources. It must not host, copy, or link to pirated copyrighted textbooks.

## Tech stack

- Next.js 16 App Router, React 19, TypeScript 5
- Tailwind CSS 4 and Lucide icons
- Static typed data in `src/data/`
- Package manager: Bun

## Commands

```bash
bun install
bun run dev
bun run build
bun run start
bun run lint
```

The build produces standalone output. Keep the copying of `.next/static` and `public` in the
`build` script intact.

## Code organization

```text
src/
  app/                  App Router pages and metadata
    plans/              CEFR plans and individual level pages
    exams/              Exam catalogue and guides
    textbooks/          Textbook catalogue
    resources/          External resource catalogue
    search/             Search results
  components/catalog/   Shared header, footer and catalogue UI
  data/                 Typed static content and domain models
```

## Conventions

- Use App Router links and URLs for navigation; do not introduce a SPA view switcher.
- Prefer server components. Add client components only for necessary browser interactions.
- Keep content data separate from rendering components.
- All external material links must lead to official or legitimate sources. Do not host or link to
  pirated textbooks.
- Use stable `id` and `slug` values for content records.
- UI strings are Russian; code and comments are English.
- Use the `@/*` import alias for `src/*` imports.
- Keep pages accessible: semantic headings, labelled controls, visible keyboard focus, and safe
  external links (`target="_blank"` with `rel="noreferrer"`).

## Verification

Run these before finishing a change:

```bash
bunx tsc --noEmit
bun run lint
bun run build
```

Run `bun test` for favorites, search, and filter regression checks. Manually verify any changed
route in the development server.

## Deployment

GitHub Pages uses `bun run build:pages` and publishes only `out/`. Run `bun run check:pages`
after export and `bun run preview:pages` to verify the actual static site. See
`docs/github-pages.md` for base paths and first deployment. Query-driven search and filters
run in browser components inside Suspense; keep static fallback content available.
Use `withBasePath` for native form actions; Next.js Link handles its own prefix.

`next.config.ts` uses standalone output. `Caddyfile` reverse-proxies traffic to the Next.js server.
Environment-specific scripts in `.zscripts/` target a Linux host and are not portable to this
Windows checkout; use package scripts instead.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
