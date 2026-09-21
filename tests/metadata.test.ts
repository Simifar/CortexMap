import { expect, test } from 'bun:test';
import { createRouteMetadata } from '../src/lib/metadata';
import { parseSiteUrl } from '../src/lib/site';

test('public site URLs require a safe HTTP(S) origin and a clean path', () => {
  expect(parseSiteUrl('https://simifar.github.io/CortexMap')).toBeInstanceOf(URL);
  expect(parseSiteUrl('https://simifar.github.io/CortexMap').pathname).toBe('/CortexMap/');
  expect(() => parseSiteUrl('mailto:owner@example.com')).toThrow('NEXT_PUBLIC_SITE_URL');
  expect(() => parseSiteUrl('https://user:pass@example.com/')).toThrow('NEXT_PUBLIC_SITE_URL');
});

test('route metadata uses the route-specific absolute URL', () => {
  const metadata = createRouteMetadata({
    title: 'Экзамены',
    description: 'Описание',
    path: '/exams',
  });

  expect(metadata.alternates?.canonical).toBe('https://simifar.github.io/CortexMap/exams');
  expect(metadata.openGraph?.url).toBe('https://simifar.github.io/CortexMap/exams');
});

test('non-indexable metadata keeps an explicit canonical and robots policy', () => {
  const metadata = createRouteMetadata({
    title: 'Поиск',
    description: 'Описание',
    path: '/search',
    robots: { index: false, follow: true },
  });

  expect(metadata.alternates?.canonical).toBe('https://simifar.github.io/CortexMap/search');
  expect(metadata.robots).toEqual({ index: false, follow: true });
});
