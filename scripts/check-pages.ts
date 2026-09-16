import { readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import baseline from '../docs/catalog-baseline.json';
const { siteUrl, basePath } = await Bun.file('.pages-preview.json').json();
const root = resolve('out');
const origin = new URL(siteUrl).origin;
const errors: string[] = [];
async function walk(dir: string): Promise<string[]> { return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(entry=>entry.isDirectory()?walk(join(dir,entry.name)):[join(dir,entry.name)]))).flat(); }
async function resolveRoute(pathname: string) {
  const decoded = decodeURIComponent(pathname);
  if (basePath && decoded !== basePath && !decoded.startsWith(basePath+'/')) return false;
  const path = join(root, decoded.slice(basePath.length));
  try { const info=await stat(path);return info.isDirectory()?await Bun.file(join(path,'index.html')).exists():true; } catch { return false; }
}
const routeCache = new Map<string, Promise<boolean>>();
function existsRoute(pathname: string) {
  if (!routeCache.has(pathname)) routeCache.set(pathname, resolveRoute(pathname));
  return routeCache.get(pathname)!;
}
const files=await walk(root);
for (const record of baseline) if (!await existsRoute(basePath+record.url+'/')) errors.push('Missing route '+record.url);
for (const path of ['/search/','/resources/','/textbooks/','/favorites/','/404.html','/robots.txt','/sitemap.xml','/.nojekyll']) if (!await existsRoute(basePath+path)) errors.push('Missing '+path);
for (const file of files.filter(file=>file.endsWith('.html'))) {
  const html=await Bun.file(file).text();
  for (const match of html.matchAll(/(?:href|src|action|content)="([^"<>]+)"/g)) {
    const target=match[1].replaceAll('&amp;','&');
    if (!target.startsWith('/') && !target.startsWith(origin+'/') && !target.startsWith('https://cortexmap.ru/')) continue;
    const url = new URL(target,siteUrl);
    if (url.origin === 'https://cortexmap.ru' && origin !== 'https://cortexmap.ru') errors.push(file+': old domain remains');
    if(url.origin===origin && !await existsRoute(url.pathname)) errors.push(file+': missing target '+target);
  }
}
const sitemap=await Bun.file('out/sitemap.xml').text();
for(const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if(!match[1].startsWith(siteUrl.replace(/\/$/,'')+'/')) errors.push('Wrong sitemap base '+match[1]);
  if(!await existsRoute(new URL(match[1]).pathname))errors.push('Missing sitemap route '+match[1]);
}
for(const file of files)if(/(?:^|[\\/])(?:\.env|server\.js|package\.json|bun\.lock)$/.test(file))errors.push('Unexpected deployment file '+file);
if(errors.length)throw new Error(errors.join('\n'));
console.log(`Static export verified: ${files.filter(file=>file.endsWith('.html')).length} HTML files, ${baseline.length} published routes, internal links/assets and sitemap.`);
