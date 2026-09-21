import { describe, expect, test } from 'bun:test';
import { createFavoritesStore } from '../src/lib/favorites-store';
function setup(initial = '[]', failRead = false, failWrite = false) {
  let raw = initial;
  let changed: (key: string | null) => void = () => {};
  const store = createFavoritesStore(() => ({ getItem: () => { if (failRead) throw Error('blocked'); return raw; }, setItem: (_key, value) => { if (failWrite) throw Error('quota'); raw = value; } }), (listener) => { changed = listener; return () => {}; });
  return { store, read: () => raw, external: (value: string) => { raw = value; changed('cortexmap:favorites'); } };
}
describe('favorites', () => {
  test('multiple subscribers retain three additions and see immediate removal', () => {
    const { store, read } = setup();
    let list: string[] = []; let button: string[] = [];
    const stopList = store.subscribe(() => { list = store.getSnapshot().ids; });
    const stopButton = store.subscribe(() => { button = store.getSnapshot().ids; });
    store.toggle('a1'); store.toggle('a2'); store.toggle('b1'); store.toggle('a2');
    expect(list).toEqual(['a1', 'b1']); expect(button).toEqual(list); expect(JSON.parse(read())).toEqual(list);
    const reloaded = setup(read()).store; reloaded.subscribe(() => {});
    expect(reloaded.getSnapshot().ids).toEqual(list); stopList(); stopButton();
  });
  test('receives changes from another tab', () => {
    const { store, external } = setup(); store.subscribe(() => {});
    external('["b2"]'); expect(store.getSnapshot().ids).toEqual(['b2']);
    external('[]'); expect(store.getSnapshot().ids).toEqual([]);
  });
  test('blocked storage and write failures retain an in-memory list', () => {
    for (const [read, write] of [[true, true], [false, true]]) {
      const { store } = setup('[]', read, write); store.subscribe(() => {});
      store.toggle('a1'); store.toggle('a2'); store.toggle('a1');
      expect(store.getSnapshot()).toEqual({ ids: ['a2'], ready: true, persistent: false });
    }
  });
  test('invalid stored data does not crash and duplicates are removed', () => {
    for (const [raw, ids] of [['broken', []], ['{}', []], ['["a1", null, 2, "a1"]', ['a1']]] as const) {
      const { store } = setup(raw); store.subscribe(() => {}); expect(store.getSnapshot().ids).toEqual(ids);
    }
  });
  test('independent stores preserve unrelated concurrent toggles', () => {
    const values = new Map([['cortexmap:favorites', '[]']]);
    const listeners = new Set<(key: string | null) => void>();
    const staleAdapter = () => {
      let staleReads = 2;
      return {
        getItem: (key: string) => key === 'cortexmap:favorites' && staleReads-- > 0 ? '[]' : values.get(key) ?? null,
        setItem: (key: string, value: string) => { values.set(key, value); listeners.forEach((listener) => listener(key)); },
        removeItem: (key: string) => { values.delete(key); listeners.forEach((listener) => listener(key)); },
        get length() { return values.size; },
        key: (index: number) => [...values.keys()][index] ?? null,
      };
    };
    const create = () => createFavoritesStore(staleAdapter, (listener) => { listeners.add(listener); return () => listeners.delete(listener); });
    const first = create(); const second = create();
    first.subscribe(() => {}); second.subscribe(() => {});
    first.toggle('a1'); second.toggle('b1');
    expect(first.getSnapshot().ids).toEqual(['a1', 'b1']);
    expect(second.getSnapshot().ids).toEqual(['a1', 'b1']);
  });
});
