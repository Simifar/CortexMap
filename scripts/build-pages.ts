import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
const args = process.argv.slice(2);
function option(name: string) { const index = args.indexOf(name); return index < 0 ? undefined : args[index + 1]; }
const basePath = option('--base-path') ?? process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const siteUrl = option('--site-url') ?? process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:4173${basePath}/`;
const url = new URL(siteUrl);
if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new Error('Invalid public site URL');
if (url.pathname.replace(/\/$/, '') !== basePath) throw new Error('Site URL pathname must match base path');
const env = { ...process.env, STATIC_EXPORT: 'true', NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: url.toString() };
const build = Bun.spawn([process.execPath, 'x', '--no-install', 'next', 'build'], { env, stdout: 'inherit', stderr: 'inherit' });
const code = await build.exited;
if (code !== 0) process.exit(code);

async function flattenWindowsSegmentPayloads(routeDir: string, segmentDir: string) {
  let copied = 0;
  async function walk(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(path);
        continue;
      }
      if (!entry.name.endsWith('.txt')) continue;
      const parts = relative(routeDir, path).split(sep);
      if (parts.length < 2) continue;
      const target = join(routeDir, parts.join('.'));
      await mkdir(dirname(target), { recursive: true });
      await copyFile(path, target);
      copied += 1;
    }
  }
  await walk(segmentDir);
  return copied;
}

async function normalizeWindowsSegmentPayloads(root: string) {
  let copied = 0;
  async function scan(directory: string) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const path = join(directory, entry.name);
      if (entry.name.startsWith('__next')) copied += await flattenWindowsSegmentPayloads(directory, path);
      else await scan(path);
    }
  }
  await scan(root);
  return copied;
}

const normalizedPayloads = await normalizeWindowsSegmentPayloads(resolve('out'));
await writeFile('out/.nojekyll', '');
await writeFile('.pages-preview.json', JSON.stringify({ basePath, siteUrl: url.toString() }));
if (normalizedPayloads > 0) console.log(`Normalized ${normalizedPayloads} Windows static segment payload paths.`);
console.log('Static Pages build ready in out/');
