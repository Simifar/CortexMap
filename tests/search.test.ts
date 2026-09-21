import { expect, test } from 'bun:test';
import { parseCatalogFilters } from '../src/lib/catalog-filters';
import { searchCatalog, searchIndex } from '../src/lib/search';
import { paginateResults, searchPageHref } from '../src/lib/search-pagination';
import { levels } from '../src/data';
test('all grammar results remain reachable with an accurate total', () => {
  const all = searchCatalog({ q: 'грамматика' });
  expect(all.length).toBeGreaterThan(30);
  const first = paginateResults(all, '1'); const second = paginateResults(all, '2');
  expect(first.total).toBe(all.length); expect([...first.results, ...second.results]).toEqual(all);
});
test('pagination retains every filter and handles invalid pages', () => {
  const filters = { q: 'grammar & reading', level: 'B1', type: 'resource', category: 'reading', free: false } as const;
  const url = new URL(searchPageHref(filters, 2), 'https://example.com');
  expect(parseCatalogFilters(Object.fromEntries(url.searchParams))).toEqual(filters);
  expect(url.searchParams.get('page')).toBe('2');
  for (const value of ['0', '-1', 'NaN', '1.5', '99999999999999999999999']) expect(paginateResults([1, 2], value).page).toBe(1);
  expect(paginateResults(Array.from({ length: 46 }), '999').page).toBe(2);
  expect(paginateResults([], undefined).results).toEqual([]);
});
test('filters normalize URL input and reject unsupported enums', () => {
  expect(parseCatalogFilters({ q: [' B2 ', 'ignored'], level: 'b2', type: 'invalid', category: 'invalid', free: 'true' })).toEqual({ q: 'B2', level: 'B2', type: undefined, category: undefined, free: true });
});
test('every topic search result targets an existing topic anchor', () => {
  const anchors = new Set(levels.flatMap(level => [...level.grammar, ...level.vocabulary, ...level.skills].map(topic => '/plans/' + level.slug + '#' + topic.id)));
  for (const result of searchIndex.filter(item => item.type === 'topic')) expect(anchors.has(result.href)).toBe(true);
});
test('exam search includes parts, organizations and score scales', () => {
  expect(searchCatalog({ q: 'Listening', type: 'exam' }).some(result => result.id === 'ielts')).toBe(true);
  expect(searchCatalog({ q: 'ETS', type: 'exam' }).some(result => result.id === 'toefl')).toBe(true);
  expect(searchCatalog({ q: 'сопоставимый', type: 'exam' }).some(result => result.id === 'toefl')).toBe(true);
});
test('multi-term search still requires every term to match', () => {
  expect(searchCatalog({ q: 'IELTS nonexistent' }).some(result => result.id === 'ielts')).toBe(false);
});
