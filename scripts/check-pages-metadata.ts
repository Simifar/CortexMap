import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const preview = await Bun.file('.pages-preview.json').json() as { siteUrl: string; basePath: string };
const root = resolve('out');
const errors: string[] = [];

async function htmlFiles(directory: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

function routeFor(file: string): string {
  const path = relative(root, file).replaceAll('\\', '/');
  if (path === 'index.html') return '/';
  return `/${path.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
}

function firstTag(html: string, pattern: RegExp): string | undefined {
  return html.match(pattern)?.[1];
}

function comparableUrl(value: string): string {
  const url = new URL(value);
  url.pathname = url.pathname.replace(/\/$/, '');
  return url.toString();
}

const siteUrl = new URL(preview.siteUrl);
const files = await htmlFiles(root);
for (const file of files) {
  const route = routeFor(file);
  if (route === '/404' || route === '/_not-found') continue;

  const html = await readFile(file, 'utf8');
  const canonical = firstTag(html, /<link rel="canonical" href="([^"]+)"/);
  const openGraphUrl = firstTag(html, /<meta property="og:url" content="([^"]+)"/);
  const expected = new URL(route.replace(/^\/+/, ''), siteUrl).toString();

  if (!canonical || comparableUrl(canonical) !== comparableUrl(expected)) errors.push(`${route}: canonical ${canonical ?? '<missing>'} != ${expected}`);
  if (!openGraphUrl || comparableUrl(openGraphUrl) !== comparableUrl(expected)) errors.push(`${route}: og:url ${openGraphUrl ?? '<missing>'} != ${expected}`);

  if (route === '/search' || route === '/favorites') {
    const robots = firstTag(html, /<meta name="robots" content="([^"]+)"/);
    if (!robots?.includes('noindex')) errors.push(`${route}: expected noindex robots metadata`);
  }
}

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const sitemapDates = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
if (sitemapDates.some((date) => date === '2026-08-13T00:00:00.000Z')) errors.push('sitemap.xml: stale 2026-08-13 lastmod remains');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  if (!url.href.startsWith(siteUrl.href)) errors.push(`sitemap.xml: URL outside site base ${url.href}`);
}

if (errors.length > 0) throw new Error(`Metadata verification failed:\n${errors.join('\n')}`);
console.log(`Metadata verified for ${files.length} HTML pages; sitemap has ${sitemapDates.length} evidence-backed lastmod values.`);
