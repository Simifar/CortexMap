import { expect, test } from 'bun:test';

const headerSource = await Bun.file('src/components/layout/SiteHeader.tsx').text();
const searchInputSource = await Bun.file('src/components/catalog/SearchInput.tsx').text();

test('header uses the full-width search as its only secondary action', () => {
  expect(headerSource).toContain("import { withBasePath } from '@/lib/paths';");
  expect(headerSource).toContain("import { SearchInput } from '@/components/catalog/SearchInput';");
  expect(headerSource).toContain('role="search"');
  expect(headerSource).toContain("action={withBasePath('/search/')}");
  expect(headerSource).toContain('<SearchInput compact />');
  expect(headerSource).toContain('min-w-0 flex-1');

  expect(headerSource).not.toContain('aria-label="Основная навигация"');
  expect(headerSource).not.toContain('aria-label="Поиск"');
  expect(headerSource).not.toContain('aria-label="Избранное"');
});

test('compact search input submits the same q query as the advanced search', () => {
  expect(searchInputSource).toContain('compact?: boolean');
  expect(searchInputSource).toContain('id="header-search"');
  expect(searchInputSource).toContain('id="q"');
  expect(searchInputSource).toContain('name="q"');
  expect(searchInputSource).toContain('type="search"');
  expect(searchInputSource).toContain('enterKeyHint="search"');
  expect(searchInputSource).toContain('type="submit"');
  expect(searchInputSource).toContain('aria-label="Найти"');
});
