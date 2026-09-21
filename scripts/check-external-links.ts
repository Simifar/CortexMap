import { examGuides, levels, resources, textbooks } from '../src/data';
import { checkExternalLink, type LinkCategory, type LinkCheckResult } from '../src/lib/external-links';

type LinkReference = { url: string; references: string[] };
const delayMs = 300;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const linkMap = new Map<string, string[]>();

function addLink(url: string, reference: string) {
  const references = linkMap.get(url) ?? [];
  references.push(reference);
  linkMap.set(url, references);
}

for (const level of levels) {
  addLink(level.officialUrl, `${level.id}:officialUrl`);
  for (const topic of [...level.grammar, ...level.vocabulary, ...level.skills]) addLink(topic.officialUrl, `${topic.id}:officialUrl`);
}
for (const textbook of textbooks) addLink(textbook.officialUrl, `${textbook.id}:officialUrl`);
for (const resource of resources) addLink(resource.officialUrl, `${resource.id}:officialUrl`);
for (const exam of examGuides) {
  addLink(exam.officialUrl, `${exam.id}:officialUrl`);
  if (exam.registration) addLink(exam.registration.website, `${exam.id}:registration.website`);
  for (const material of exam.officialMaterials) addLink(material.url, `${exam.id}:officialMaterials.${material.title}`);
}

const links: LinkReference[] = [...linkMap.entries()].map(([url, references]) => ({ url, references }));
const results: Array<LinkCheckResult & LinkReference> = [];

for (const link of links) {
  const result = await checkExternalLink(link.url);
  results.push({ ...result, ...link });
  const status = result.status ? `HTTP ${result.status}` : result.detail ?? 'no response';
  console.log(`${result.category.toUpperCase()} ${status} ${link.url} [${link.references.join(', ')}]`);
  if (link !== links.at(-1)) await sleep(delayMs);
}

const categories: LinkCategory[] = ['ok', 'redirected', 'blocked', 'timeout', 'network-error', 'broken'];
console.log('\nExternal link summary:');
for (const category of categories) console.log(`- ${category}: ${results.filter((result) => result.category === category).length}`);
console.log(`- unique URLs: ${links.length}`);
console.log(`- URL references: ${results.reduce((total, result) => total + result.references.length, 0)}`);

const broken = results.filter((result) => result.category === 'broken');
if (broken.length > 0) {
  console.error(`\nConfirmed broken links: ${broken.map((result) => result.url).join(', ')}`);
  process.exitCode = 1;
}
