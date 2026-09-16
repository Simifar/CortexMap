'use client';

import Link from 'next/link';
import { FavoritesButton } from './FavoritesButton';
import { useFavorites } from '@/hooks/useFavorites';

export type FavoriteContent = { id: string; title: string; description: string; href: string; type: string; meta?: string };
export function FavoritesList({ content }: { content: FavoriteContent[] }) {
  const { favoriteIds, ready, persistent } = useFavorites(); const favorites = content.filter((item) => favoriteIds.includes(item.id));
  if (!ready) return <p role="status" className="mt-8 text-sm text-muted-foreground">Загружаем избранное…</p>;
  return favorites.length ? <>{!persistent && <p role="status" className="mt-6 text-sm text-muted-foreground">Браузер не разрешил сохранить список. Изменения доступны до перезагрузки страницы.</p>}<p className="mt-6 text-sm text-muted-foreground">Сохранено: {favorites.length}</p><div className="mt-3 space-y-3">{favorites.map((item) => <article key={item.id} className="flex flex-wrap items-start justify-between gap-4 rounded-lg border p-4"><div><p className="text-xs font-semibold text-primary">{item.type}{item.meta ? ` · ${item.meta}` : ''}</p><h2 className="mt-1 font-semibold"><Link href={item.href} className="hover:text-primary hover:underline">{item.title}</Link></h2><p className="mt-1 text-sm text-muted-foreground">{item.description}</p></div><FavoritesButton contentId={item.id} /></article>)}</div></> : <div className="mt-8 rounded-lg border border-dashed p-6"><h2 className="font-semibold">Избранное пока пусто</h2><p className="mt-2 text-sm text-muted-foreground">Сохраняйте экзамены, уровни CEFR, учебники и ресурсы, чтобы быстро вернуться к ним позже.</p><Link href="/exams" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">Перейти к экзаменам →</Link></div>;
}
