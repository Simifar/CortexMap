import { readFile } from 'node:fs/promises';

type PagesConfig = { basePath: string };

const config = JSON.parse(await readFile('.pages-preview.json', 'utf8')) as PagesConfig;
const origin = 'http://127.0.0.1:4173';
const basePath = config.basePath.replace(/\/$/, '');
const routes = [
  { route: '/', payload: '__next.__PAGE__.txt' },
  { route: '/plans/', payload: '__next.plans.__PAGE__.txt' },
  { route: '/exams/', payload: '__next.exams.__PAGE__.txt' },
  { route: '/textbooks/', payload: '__next.textbooks.__PAGE__.txt' },
  { route: '/resources/', payload: '__next.resources.__PAGE__.txt' },
  { route: '/search/', payload: '__next.search.__PAGE__.txt' },
  { route: '/favorites/', payload: '__next.favorites.__PAGE__.txt' },
  { route: '/plans/a1/', payload: '__next.plans.$d$level.__PAGE__.txt' },
] as const;

const failures: string[] = [];

async function check(pathname: string, kind: 'HTML' | 'RSC') {
  const url = `${origin}${basePath}${pathname}`;
  try {
    const response = await fetch(url, { redirect: 'manual' });
    if (response.status >= 400) failures.push(`${kind} ${response.status} ${url}`);
    else if (response.status >= 300) failures.push(`${kind} unexpected redirect ${response.status} ${url}`);
  } catch (error) {
    failures.push(`${kind} network error ${url}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

for (const { route, payload } of routes) {
  await check(route, 'HTML');
  await check(`${route}${payload}`, 'RSC');
}

if (failures.length > 0) {
  throw new Error([
    'Static runtime requests failed. These are the URLs the exported App Router client must be able to fetch:',
    ...failures,
  ].join('\n'));
}

console.log(`Static runtime verified: ${routes.length} HTML routes and ${routes.length} RSC payloads returned without internal 4xx/5xx responses.`);
