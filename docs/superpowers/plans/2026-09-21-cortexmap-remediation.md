# CortexMap Audit Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Use `superpowers:systematic-debugging` for static-export and build failures, `superpowers:test-driven-development` before behavior changes, and `superpowers:verification-before-completion` before claiming completion.

**Goal:** Remediate the confirmed CortexMap audit findings in dependency order: static Pages runtime and build reliability first, then SEO/content/link validation/testing, then scalability, accessibility, and documentation.

**Architecture:** CortexMap remains a Russian-language privacy-first static reference site. Typed static catalog data is validated with Zod, rendered by Next.js App Router server pages, and enhanced only where needed by client components for search, comparison, and browser-local favorites. Both GitHub Pages static export and standalone Next.js behind Caddy must remain supported.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Bun, Zod, Lucide, GitHub Pages, Caddy.

**Spec:** The preceding CortexMap technical audit in the parent chat. This document is the execution handoff and contains the authoritative findings, constraints, sequence, and acceptance criteria.

## Global Constraints

- Work in `C:\Users\user\Documents\projects\CortexMap`.
- Do not add accounts, authentication, a database, AI tutoring, cloud synchronization, analytics, or a new backend.
- Keep UI strings Russian; keep code and comments English.
- Use Bun and preserve `bun.lock`; never introduce `package-lock.json`.
- Read `AGENTS.md` and the relevant local Next.js 16 documentation before changing Next routing or build configuration. Use Context7 for current library/CLI documentation when behavior is uncertain.
- Prefer server components; add client code only for browser interaction.
- Preserve App Router links, `withBasePath()` for native form actions/assets, static route generation, safe external links, and standalone copying of `.next/static` and `public`.
- Do not use destructive Git/filesystem operations. Preserve unrelated user changes.
- Do not push, deploy, open a PR, or change GitHub settings unless explicitly requested.
- Work sequentially and stop at a failed gate. Each task needs a focused test or repeatable verification before its commit.
- Use small commits and report each commit name.

## Current Baseline

- Branch: `main`; upstream: `origin/main`.
- HEAD: `e010d4d71e94c0ebdf9d864b05bb7d3f62e4db91` (`feat: copy favorite plans with embedded links`).
- Worktree at audit: clean.
- Observed versions: Next 16.3.5, React 19.2.3, Tailwind 4.1.18, TypeScript 5.9.3, Bun 1.3.14.
- Catalog: 6 levels, 8 exams, 22 textbooks, 20 resources, 144 records.
- Pages artifact: `out/`, base path `/CortexMap`.
- Standalone artifact: `.next/standalone/`.
- Persistent browser state: `localStorage` key `cortexmap:favorites`; no server state, API, database, or auth.
- Code Review Graph: 77 files, 268 nodes, 1821 edges, 20 untested hotspots; graph HEAD matches the repository HEAD.

## Architecture Map

```text
src/data/types.ts + src/data/*.ts
  -> src/data/validate.ts / validateCatalogData()
  -> server-rendered pages in src/app/
  -> static out/ OR standalone .next/standalone/

src/lib/search.ts -> client SearchView + URL filters + pagination
CompareView      -> client comparison from ?set= query parameters
favorites-store  -> useSyncExternalStore -> FavoritesList/FavoritesButton
                  -> localStorage + memory fallback + storage events

Pages workflow -> build:pages -> out/ -> check:pages -> upload
Standalone     -> build -> .next/standalone/server.js -> Caddy -> :3000
```

Important areas: `src/app/` routes/metadata; `src/data/` models/content; `src/components/layout/` shell/navigation; `src/components/catalog/` search/filters/favorites; `src/components/content/` cards/JSON-LD/compare; `src/lib/` search/paths/site/favorites; `scripts/` build/check/preview; `.github/workflows/` CI.

## Confirmed Findings

### H-01 — static RSC prefetch requests return 404

The browser requested paths such as `/CortexMap/plans/__next.plans.__PAGE__.txt`, while the export contains `out/plans/__next.plans/__PAGE__.txt`. The local static preview produced 6 console errors on the homepage and 19 after navigation. HTML pages load through full reloads, so client navigation is degraded rather than completely unavailable.

Relevant files: `scripts/preview-pages.ts`, `scripts/check-pages.ts`, `scripts/build-pages.ts`, `next.config.ts`, `src/components/layout/SiteHeader.tsx`, `src/components/layout/SectionLink.tsx`.

### H-02 — dependency audit reports 37 vulnerabilities

`bun audit` reported 37 findings: 26 high, 10 moderate, 1 low. They are primarily transitive build/dev dependencies around ESLint, PostCSS, Tailwind, Browserslist, minimatch, js-yaml, nanoid, and related packages. Classify build/dev/runtime exposure instead of calling all of them production runtime vulnerabilities.

### M-01 — current generated state cannot run `bun run start`

`package.json` expects `.next/standalone/server.js`, but the current generated `.next` contains static/export state and no `.next/standalone`. Standalone and Pages builds must be isolated and independently verified.

### M-02 — SEO metadata is inconsistent

The current export showed correct internal canonicals but root `og:url` on `/exams/`, absent `og:url` on `/exams/ielts/`, root canonical inherited by `/search/` and `/favorites/`, and a hardcoded sitemap date `2026-08-13` older than current content dates. Relevant files: `src/app/layout.tsx`, dynamic route `generateMetadata()` functions, `src/lib/site.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`.

### M-03 — verification status is mass-assigned

Raw records are commonly `pending` with null dates, while bottom-of-file transforms in `levels.ts`, `exams.ts`, `textbooks.ts`, and `resources.ts` set exported records to `verified` with the shared date `2026-09-16`. This may reflect real editorial work, but the code loses per-record provenance and tests require one shared status/date.

### M-04 — external link checker is incomplete and brittle

`scripts/check-external-links.ts` stops at the first HTTP >= 400, treats anti-bot responses like broken links, has no retry or aggregate report, and does not cover every URL-bearing field. The current run stopped at Cambridge `/face2face` with HTTP 403.

### M-05 — lint/typecheck coverage is incomplete

`eslint src` omits scripts/configuration, TypeScript does not include all scripts/configuration, `noImplicitAny` is false, and multiple TypeScript/React/Next checks are disabled.

### M-06 — search ships and scans the entire catalog in the browser

`SearchView` is a client component importing `src/lib/search.ts`, which builds an in-memory index from every collection. This is acceptable at 144 records but scales linearly and repeats normalization per search term.

### M-07 — favorites can lose concurrent cross-tab updates

`favorites-store.ts` uses read-modify-write JSON in `localStorage`; two tabs can overwrite unrelated changes. Invalid JSON silently becomes an empty list. This needs explicit tests and a documented policy.

### M-08 — default site URL conflicts with Pages deployment

`src/lib/site.ts` defaults to `https://cortexmap.ru`, while package metadata and Pages use `https://simifar.github.io/CortexMap/`. A standalone build without `NEXT_PUBLIC_SITE_URL` can emit incorrect canonical, sitemap, robots, and JSON-LD URLs.

### L-01/L-02/L-03 — accessibility and maintenance gaps

No skip-link was found; main header links do not expose active navigation state; `PROJECT_REVIEW.md` and parts of `ROADMAP.md` are stale; `Breadcrumbs.tsx` has no detected imports; `lighthouserc.js` is not wired into CI.

## Review Focus

Every item below must have a test in the task that owns it:

1. Static navigation on `/CortexMap` must not produce internal console/network 4xx errors.
2. Standalone and Pages builds must be runnable independently.
3. Route-specific pages must emit route-specific canonical and `og:url` values.
4. A blocked external site must not hide the results for all other links.
5. Two independent favorites-store instances must not silently lose unrelated updates.

## Execution Tasks

### Task 0: Freeze baseline and commit the handoff

**Files:** read `AGENTS.md`, `package.json`, `next.config.ts`, `docs/github-pages.md`, `docs/content-model.md`, `src/`, `scripts/`, and `.github/workflows/`; current plan is this file.

- [ ] Run `git status --short`, `git rev-parse HEAD`, and `git branch --show-current`; record unrelated changes.
- [ ] Read the local Next.js 16 guide and use Context7 for any uncertain framework behavior.
- [ ] Run `bunx tsc --noEmit`, `bun run lint`, `bun test`, and `bun run validate-content`.
- [ ] If the worktree contains only this plan, commit it as `docs: add CortexMap audit remediation plan`.

**Gate:** baseline is recorded and no unrelated user change was overwritten.

### Task 1: Add a deterministic regression for the static runtime failure

**Files:** inspect/modify `scripts/preview-pages.ts`, `scripts/check-pages.ts`; create `scripts/check-pages-runtime.ts` or a focused test under `tests/`; modify `package.json` only if a new command is needed.

- [ ] Start the existing static preview with `bun run preview:pages`.
- [ ] Use browser automation to open `/CortexMap/`, collect console/network events, click every header route, and record the exact RSC URLs and statuses.
- [ ] Add a repeatable check covering `/`, `/plans/`, `/exams/`, `/textbooks/`, `/resources/`, `/search/`, `/favorites/`, and one dynamic route.
- [ ] Fail on unexpected internal 4xx/5xx and console errors, but do not treat intentionally blocked third-party URLs as static-runtime failures.
- [ ] Run the new check against the current export and preserve the failure as the red regression.
- [ ] Commit `test: reproduce static navigation runtime failures`.

**Gate:** the check fails on H-01 before the fix and checks runtime behavior, not only HTML link existence.

### Task 2: Fix static navigation while preserving base paths and anchors

**Files:** after diagnosis, modify the smallest responsible subset of `next.config.ts`, `scripts/build-pages.ts`, `scripts/preview-pages.ts`, `src/components/layout/SectionLink.tsx`, `SiteHeader.tsx`, and `SiteFooter.tsx`; use the Task 1 regression.

- [ ] Inspect generated route manifests and current Next.js static-export/Link documentation before choosing a solution.
- [ ] Prefer the smallest fix that makes both prefetch and click navigation valid; do not hide errors by ignoring failed requests.
- [ ] Preserve same-route `#page-start` behavior, cross-route `/CortexMap` links, direct dynamic route loads, and mobile navigation.
- [ ] Run the runtime check, `bun run check:pages`, `bunx tsc --noEmit`, `bun run lint`, and `bun test`.
- [ ] Commit `fix: make static navigation compatible with exported routes`.

**Gate:** no internal browser console/network 4xx errors in the static preview; all static route checks remain green.

### Task 3: Isolate standalone and Pages artifacts

**Files:** modify `next.config.ts`, `package.json`, and if required `scripts/build-pages.ts`, `scripts/check-pages.ts`, `.gitignore`, `.github/workflows/content-check.yml`; optionally create `scripts/check-standalone.ts`.

- [ ] Confirm current Next.js `distDir` behavior from local docs.
- [ ] Use separate generated directories for standalone and Pages mode if supported; keep `out/` as the Pages artifact and preserve standalone copying of `.next/static` and `public`.
- [ ] Add an explicit assertion that `bun run build` creates `.next/standalone/server.js` before `start` runs.
- [ ] Run a normal standalone build and start; verify `/`, a dynamic route, `/robots.txt`, and `/sitemap.xml`.
- [ ] Run Pages build afterward; verify `out/` with `check:pages` and the static runtime check.
- [ ] Commit `fix: isolate standalone and static build artifacts`.

**Gate:** `build → start` and `build:pages → preview` both work independently.

### Task 4: Classify and remediate dependency vulnerabilities

**Files:** modify `package.json` and `bun.lock` only through Bun; inspect `.github/dependabot.yml` and `.github/workflows/content-check.yml`.

- [ ] Run `bun audit`; group advisories by direct dependency, transitive path, severity, and runtime/build/dev reachability.
- [ ] Consult current official release documentation before changing Next, ESLint, Tailwind/PostCSS, Bun, or affected packages.
- [ ] Update only compatible dependencies and regenerate the lockfile with Bun.
- [ ] Run `bun install --frozen-lockfile`, `bun audit`, TypeScript, lint, tests, standalone build, Pages build, and bundle checks.
- [ ] Document any remaining advisory instead of suppressing it.
- [ ] Commit `chore: remediate audited build dependencies`.

**Gate:** no unexplained high-severity advisory remains and the frozen lockfile passes all project checks.

### Task 5: Make metadata and sitemap authoritative

**Files:** create/modify `src/lib/site.ts` and, if useful, `src/lib/metadata.ts`; modify `src/app/layout.tsx`, every dynamic route `generateMetadata()`, `src/app/sitemap.ts`, and `src/app/robots.ts`; add `tests/metadata.test.ts` or an equivalent deterministic check.

- [ ] Validate `NEXT_PUBLIC_SITE_URL` as HTTP(S) at build time and fail clearly for invalid production values.
- [ ] Centralize public URL generation and route metadata.
- [ ] Ensure every indexable route has its own canonical and `og:url`.
- [ ] Keep search/favorites noindex and explicitly test the chosen canonical policy for them.
- [ ] Derive sitemap `lastModified` from relevant content/release dates rather than one stale literal.
- [ ] Verify metadata, manifest, robots, sitemap, JSON-LD, and base paths in both root and `/CortexMap` exports.
- [ ] Commit `fix: align route metadata and sitemap URLs`.

**Gate:** no internal route emits root-domain metadata or an unexplained stale sitemap date.

### Task 6: Preserve per-record editorial verification provenance

**Files:** modify `src/data/levels.ts`, `exams.ts`, `textbooks.ts`, `resources.ts`; modify `src/data/types.ts`, `src/data/validate.ts` only if required; update `tests/catalog.test.ts`, `docs/content-model.md`, and `ROADMAP.md`.

- [ ] Inventory which records have real review/link evidence. Do not infer verification from the shared date.
- [ ] Remove blanket promotion from `pending` to `verified`, or replace it with explicit per-record values backed by editorial evidence.
- [ ] Keep uncertain records `pending` and ensure the UI communicates that state honestly.
- [ ] Preserve validation for dated verified records, future dates, relationships, and verified exam score mappings.
- [ ] Replace the test that requires every record to share one status/date with tests for the intended per-record semantics.
- [ ] Commit `fix: preserve per-record editorial verification status`.

**Gate:** no record is verified solely because it passed through a collection-level map.

### Task 7: Make external-link checking complete and diagnostic

**Files:** modify `scripts/check-external-links.ts`; add focused tests or extract a pure classifier to `src/lib/`; update `.github/workflows/external-links.yml` only if its command contract changes.

- [ ] Extract explicit result categories: `ok`, `redirected`, `blocked`, `timeout`, `network-error`, `broken`.
- [ ] Collect and deduplicate every URL-bearing field from levels, topics, textbooks, exams, registration, official materials, and resources while retaining record IDs.
- [ ] Implement HEAD, GET fallback for 405/unsupported responses, bounded timeout, and retry/backoff.
- [ ] Continue after failures and print a grouped final report; exit non-zero only for policy-defined broken links.
- [ ] Add tests for 200, redirect, 403, 405→200, timeout, network error, and 404.
- [ ] Commit `fix: make external link checks complete and actionable`.

**Gate:** a blocked Cambridge-like URL does not hide all other link results.

### Task 8: Add browser and accessibility regression coverage

**Files:** create `playwright.config.ts` and `tests/e2e/` only if the dependency is viable; otherwise keep a repeatable browser-runner check. Modify `package.json`, `bun.lock`, and CI only if adding Playwright. Modify layout/navigation files for accessibility fixes.

- [ ] Decide based on CI installation/time whether to add `@playwright/test`; do not add a large dependency without verifying it.
- [ ] Cover home, all header routes, one dynamic page per catalog type, search, compare valid/invalid states, favorites add/remove/persistence, 404, and `/CortexMap`.
- [ ] Assert no unexpected console errors and no internal network 4xx/5xx.
- [ ] Add a skip-link targeting `#page-start` or the main landmark.
- [ ] Add `aria-current="page"` to the active main navigation item where route state is known.
- [ ] Verify keyboard order, visible focus, labels, table scrolling, reduced motion, and 320/390/768 px layouts.
- [ ] Commit `test: add browser and accessibility regression coverage`.

**Gate:** H-01 becomes an automated regression, not a manual-only observation.

### Task 9: Improve favorites reliability and search scalability

**Files:** modify `src/lib/favorites-store.ts`; update existing favorites tests; modify `src/lib/search.ts`, `src/components/catalog/SearchView.tsx`, and `scripts/analyze-bundle.ts` only after measurement.

- [ ] Add failing store tests for two instances, concurrent toggles, storage events, corrupted JSON, quota failure, and blocked storage.
- [ ] Implement a deterministic merge/version strategy, or explicitly document and test a chosen last-writer policy.
- [ ] Preserve the current in-memory fallback and user-visible warning.
- [ ] Measure current client bundle/search cost before optimizing.
- [ ] Precompute normalized search fields once per record and add aggregate/route-level bundle measurement while retaining the 400 KiB per-chunk guard.
- [ ] Commit separately: `fix: preserve concurrent local favorites updates` and `perf: reduce repeated catalog search work`.

**Gate:** favorites concurrency semantics are tested; search changes have before/after measurements.

### Task 10: Synchronize documentation and remove confirmed dead configuration

**Files:** update/archive `PROJECT_REVIEW.md` and `ROADMAP.md`; remove `src/components/layout/Breadcrumbs.tsx` only after confirming no consumer; wire `lighthouserc.js` into CI or remove it; inspect `components.json`, `.env.example`, and `.env` references.

- [ ] Update counts, routes, deployment facts, test counts, and known limitations.
- [ ] Mark historical audit documents as historical if retaining them.
- [ ] Make Lighthouse part of CI with a stable server/base path, or remove its unused configuration and document the decision.
- [ ] Confirm `DATABASE_URL` has no source/script consumer before removing stale environment documentation.
- [ ] Commit `docs: synchronize CortexMap audit and project documentation`.

**Gate:** documentation matches the repository and every retained root configuration has a consumer.

### Task 11: Full verification and final handoff

- [ ] Run from a clean worktree with a frozen lockfile:

```text
bun install --frozen-lockfile
bunx tsc --noEmit
bun run lint
bun test
bun run validate-content
bun run build
bun run check-bundle
bun run start
bun run build:pages
bun run check:pages
bun run preview:pages
bun audit
```

- [ ] Run browser smoke checks against standalone and `/CortexMap` static preview.
- [ ] Verify canonical, Open Graph, Twitter, manifest, robots, sitemap, JSON-LD, base paths, internal navigation, external links, favorites, compare, search, 404, and responsive layouts.
- [ ] Run `git diff --check` and `git status --short`; inspect every changed file for generated artifacts or unrelated edits.
- [ ] Confirm no push, deployment, PR, or external setting change occurred.
- [ ] Report commits, checks, residual advisories, deferred P2/P3 work, and any evidence that differs from this plan.
- [ ] Only claim completion after `verification-before-completion` validates every acceptance criterion.

## Commit Sequence

Expected local order:

1. `docs: add CortexMap audit remediation plan`
2. `test: reproduce static navigation runtime failures`
3. `fix: make static navigation compatible with exported routes`
4. `fix: isolate standalone and static build artifacts`
5. `chore: remediate audited build dependencies`
6. `fix: align route metadata and sitemap URLs`
7. `fix: preserve per-record editorial verification status`
8. `fix: make external link checks complete and actionable`
9. `test: add browser and accessibility regression coverage`
10. `fix: preserve concurrent local favorites updates`
11. `perf: reduce repeated catalog search work`
12. `docs: synchronize CortexMap audit and project documentation`

Do not squash unrelated tasks automatically. If a task is split, explain the reason and preserve the gate between parts.

## Definition of Done

- Static Pages navigation has no internal RSC/runtime 4xx errors.
- Standalone build/start and Pages export/preview work independently.
- High dependency advisories are remediated or explicitly classified and documented.
- Route metadata and sitemap are consistent under `/CortexMap`.
- Verification status reflects per-record editorial provenance.
- External links produce a complete diagnostic report.
- Browser, accessibility, favorites, search, and responsive regressions have automated or repeatable checks.
- Documentation matches the current repository.
- All required verification commands pass.
- The final worktree is clean except for intentionally uncommitted user changes.
- No deployment or push is claimed unless separately requested and verified.
