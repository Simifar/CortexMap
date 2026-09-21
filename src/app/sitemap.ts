import type { MetadataRoute } from 'next';
import { examGuides, levels, resources, textbooks } from '@/data';
import { absoluteSiteUrl } from '@/lib/site';

export const dynamic = 'force-static';

type DatedRecord = { verifiedAt: string | null; linkCheckedAt: string | null };

function latestDate(items: readonly DatedRecord[]): Date | undefined {
  const dates = items.flatMap((item) => [item.verifiedAt, item.linkCheckedAt]).filter((date): date is string => Boolean(date));
  return dates.length ? new Date(Math.max(...dates.map((date) => Date.parse(date)))) : undefined;
}

function recordsForPath(path: string): readonly DatedRecord[] {
  if (path.startsWith('/plans/')) return levels.filter((item) => path === `/plans/${item.slug}`);
  if (path.startsWith('/exams/')) return examGuides.filter((item) => path === `/exams/${item.slug}`);
  if (path.startsWith('/textbooks/')) return textbooks.filter((item) => path === `/textbooks/${item.slug}`);
  if (path.startsWith('/resources/')) return resources.filter((item) => path === `/resources/${item.slug}`);
  if (path === '/plans') return levels;
  if (path === '/exams') return examGuides;
  if (path === '/textbooks') return textbooks;
  if (path === '/resources') return resources;
  return [...levels, ...examGuides, ...textbooks, ...resources];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/plans', '/exams', '/textbooks', '/resources'];
  return [...routes, ...levels.map((item) => `/plans/${item.slug}`), ...examGuides.map((item) => `/exams/${item.slug}`), ...textbooks.map((item) => `/textbooks/${item.slug}`), ...resources.map((item) => `/resources/${item.slug}`)].map((path) => {
    const lastModified = latestDate(recordsForPath(path));
    return { url: absoluteSiteUrl(path), ...(lastModified ? { lastModified } : {}), changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.7 };
  });
}
