import { access, readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = join(process.cwd(), '.next', 'static', 'chunks');
const limitBytes = 400 * 1024;
async function files(path: string): Promise<string[]> { const entries = await readdir(path, { withFileTypes: true }); return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(path, entry.name)) : [join(path, entry.name)]))).flat(); }
const chunks = (await files(root)).filter((file) => file.endsWith('.js'));
const chunkSizes = new Map(await Promise.all(chunks.map(async (chunk) => [chunk, (await stat(chunk)).size] as const)));
const oversized = []; for (const chunk of chunks) { const size = chunkSizes.get(chunk) ?? 0; if (size > limitBytes) oversized.push(`${chunk}: ${Math.round(size / 1024)} KiB`); }
if (oversized.length) throw new Error(`JavaScript chunks exceed ${limitBytes / 1024} KiB:\n${oversized.join('\n')}`);
const totalBytes = [...chunkSizes.values()].reduce((total, size) => total + size, 0);
const largest = chunks.reduce((current, chunk) => (chunkSizes.get(chunk) ?? 0) > (chunkSizes.get(current) ?? 0) ? chunk : current, chunks[0]);
const formatKiB = (bytes: number) => `${(bytes / 1024).toFixed(1)} KiB`;
console.log(`Bundle size check passed: ${chunks.length} JavaScript chunks are below ${limitBytes / 1024} KiB. Aggregate: ${formatKiB(totalBytes)}; largest: ${formatKiB(chunkSizes.get(largest) ?? 0)} (${relative(root, largest).replaceAll('\\', '/')}).`);

const exportRoot = join(process.cwd(), 'out');
try { await access(exportRoot); } catch { process.exit(0); }
const exportChunkRoot = join(exportRoot, '_next', 'static', 'chunks');
const exportChunks = (await files(exportChunkRoot)).filter((file) => file.endsWith('.js'));
const exportChunkSizes = new Map(await Promise.all(exportChunks.map(async (chunk) => [chunk, (await stat(chunk)).size] as const)));
const htmlFiles = (await files(exportRoot)).filter((file) => file.endsWith('.html'));
const chunkUrl = /<script[^>]+src=["']([^"']+\.js(?:\?[^"']*)?)["']/g;
const routeSizes = await Promise.all(htmlFiles.map(async (file) => {
  const html = await readFile(file, 'utf8');
  const referenced = new Set<string>();
  for (const match of html.matchAll(chunkUrl)) {
    const cleanUrl = match[1].split('?')[0].split('#')[0];
    const marker = '/_next/static/chunks/';
    const markerIndex = cleanUrl.indexOf(marker);
    if (markerIndex >= 0) referenced.add(cleanUrl.slice(markerIndex + marker.length).replaceAll('/', '\\'));
  }
  const bytes = [...referenced].reduce((total, name) => total + (exportChunkSizes.get(join(exportChunkRoot, name)) ?? 0), 0);
  const htmlPath = relative(exportRoot, file).replaceAll('\\', '/');
  const route = htmlPath === 'index.html' ? '/' : `/${htmlPath.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
  return { route, bytes };
}));
const largestRoute = routeSizes.reduce((current, route) => route.bytes > current.bytes ? route : current, routeSizes[0]);
console.log(`Static route bundle measurement: ${routeSizes.length} HTML routes; largest initial client bundle: ${formatKiB(largestRoute?.bytes ?? 0)} (${largestRoute?.route ?? 'n/a'}).`);
