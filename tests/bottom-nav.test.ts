import { expect, test } from 'bun:test';

test('global layout renders the floating bottom navigation and reserves its space', async () => {
  const layout = await Bun.file(new URL('../src/app/layout.tsx', import.meta.url)).text();
  const styles = await Bun.file(new URL('../src/app/globals.css', import.meta.url)).text();

  expect(layout).toContain("import { BottomNav } from '@/components/catalog/BottomNav';");
  expect(layout).toContain('<BottomNav />');
  expect(styles).toContain('padding-bottom: calc(5.5rem + env(safe-area-inset-bottom));');
});

test('bottom navigation exposes the approved destinations and iOS safe-area lift', async () => {
  const file = Bun.file(new URL('../src/components/catalog/BottomNav.tsx', import.meta.url));
  const exists = await file.exists();

  expect(exists).toBe(true);
  if (!exists) return;

  const component = await file.text();
  for (const label of ['Главная', 'Уровни', 'Экзамены', 'Ресурсы', 'Избранное']) expect(component).toContain(label);
  expect(component).toContain('env(safe-area-inset-bottom)');
  expect(component).toContain('whitespace-nowrap');
  expect(component).toContain('bottom-nav-label');
  expect(component).toContain("clamp(0.5rem, 1.2vw, 0.75rem)");
});
