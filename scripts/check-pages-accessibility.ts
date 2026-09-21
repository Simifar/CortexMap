import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

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

for (const file of await htmlFiles(root)) {
  const route = relative(root, file).replaceAll('\\', '/');
  const html = await readFile(file, 'utf8');
  if (!html.includes('<html lang="ru"')) errors.push(`${route}: missing Russian document language`);
  if (!html.match(/<a[^>]+href="#page-start"/)) errors.push(`${route}: missing skip-link target`);
  if (!html.match(/<main(?:\s|>)/)) errors.push(`${route}: missing main landmark`);
  const section = route.split('/')[0];
  if (['plans', 'exams', 'textbooks', 'resources'].includes(section) && !html.includes('aria-current="page"')) errors.push(`${route}: missing active navigation state`);
  for (const anchor of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!anchor[0].includes('rel="noreferrer"')) errors.push(`${route}: external link without rel="noreferrer"`);
  }
}

if (errors.length > 0) throw new Error(`Accessibility export checks failed:\n${errors.join('\n')}`);
console.log(`Accessibility export checks passed for ${(await htmlFiles(root)).length} HTML pages.`);
