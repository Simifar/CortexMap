const storageKey = 'cortexmap:favorites';
const itemPrefix = `${storageKey}:item:`;
type Snapshot = { ids: string[]; ready: boolean; persistent: boolean };
type StorageAdapter = Pick<Storage, 'getItem' | 'setItem'> & Partial<Pick<Storage, 'removeItem' | 'key'>> & { readonly length?: number };

function parseIds(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === 'string' && id.length > 0))] : [];
  } catch { return []; }
}

function readIds(storage: StorageAdapter): string[] {
  const ids = new Set(parseIds(storage.getItem(storageKey)));
  if (typeof storage.length !== 'number' || typeof storage.key !== 'function') return [...ids];

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key?.startsWith(itemPrefix)) continue;
    const id = key.slice(itemPrefix.length);
    if (storage.getItem(key) === '1') ids.add(id);
    else ids.delete(id);
  }
  return [...ids];
}

export function createFavoritesStore(getStorage: () => StorageAdapter, watchStorage: (onChange: (key: string | null) => void) => () => void) {
  const serverSnapshot: Snapshot = { ids: [], ready: false, persistent: true };
  let snapshot = serverSnapshot;
  let stopWatching: (() => void) | undefined;
  const listeners = new Set<() => void>();

  function publish(ids: string[], persistent: boolean) {
    if (snapshot.ready && snapshot.persistent === persistent && ids.length === snapshot.ids.length && ids.every((id, index) => id === snapshot.ids[index])) return;
    snapshot = { ids, ready: true, persistent };
    listeners.forEach((listener) => listener());
  }
  function refresh() {
    // Preserve unsaved changes in memory when browser storage is unavailable.
    if (snapshot.ready && !snapshot.persistent) return;
    try { publish(readIds(getStorage()), true); }
    catch { publish(snapshot.ids, false); }
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (listeners.size === 1) {
        stopWatching = watchStorage((key) => { if (key === storageKey || key === null || key.startsWith(itemPrefix)) refresh(); });
        refresh();
      }
      return () => { listeners.delete(listener); if (!listeners.size) { stopWatching?.(); stopWatching = undefined; } };
    },
    toggle(id: string) {
      refresh();
      const present = !snapshot.ids.includes(id);
      const ids = present ? [...snapshot.ids, id] : snapshot.ids.filter((value) => value !== id);
      try {
        const storage = getStorage();
        // Per-item entries avoid unrelated cross-tab toggles overwriting one another.
        storage.setItem(`${itemPrefix}${id}`, present ? '1' : '0');
        storage.setItem(storageKey, JSON.stringify(ids));
        publish(ids, true);
      } catch { publish(ids, false); }
    },
  };
}

export const favoritesStore = createFavoritesStore(
  () => window.localStorage,
  (onChange) => {
    const listener = (event: StorageEvent) => {
      try { if (event.storageArea === window.localStorage) onChange(event.key); } catch { /* Storage may be blocked. */ }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  },
);
