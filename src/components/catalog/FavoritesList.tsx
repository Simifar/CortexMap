'use client';

import Link from 'next/link';
import { Check, Copy, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FavoritesButton } from './FavoritesButton';
import { useFavorites } from '@/hooks/useFavorites';
import { formatFavoritePlan } from '@/lib/favorite-export';
import { withBasePath } from '@/lib/paths';

export type FavoriteContent = { id: string; title: string; description: string; href: string; type: string; meta?: string };

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back for browsers that expose Clipboard API but deny access.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  if (!copied) throw new Error('Copy command failed');
}

export function FavoritesList({ content }: { content: FavoriteContent[] }) {
  const { favoriteIds, ready, persistent } = useFavorites();
  const [actionStatus, setActionStatus] = useState<'idle' | 'copied' | 'shared' | 'error'>('idle');
  const resetTimer = useRef<number | undefined>(undefined);
  const favorites = content.filter((item) => favoriteIds.includes(item.id));

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const getPlan = () => {
    const homeUrl = new URL(withBasePath('/'), window.location.origin).toString();
    return formatFavoritePlan(
      favorites,
      (href) => new URL(withBasePath(href), window.location.origin).toString(),
      homeUrl,
    );
  };

  const showStatus = (status: typeof actionStatus) => {
    setActionStatus(status);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setActionStatus('idle'), 3500);
  };

  const handleCopy = async () => {
    try {
      await copyText(getPlan());
      showStatus('copied');
    } catch {
      showStatus('error');
    }
  };

  const handleShare = async () => {
    const plan = getPlan();
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Мой план английского — CortexMap', text: plan });
        showStatus('shared');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await copyText(plan);
      showStatus('copied');
    } catch {
      showStatus('error');
    }
  };

  if (!ready) return <p role="status" className="mt-8 text-sm text-muted-foreground">Загружаем избранное…</p>;
  return favorites.length ? <>
    {!persistent && <p role="status" className="mt-6 text-sm text-muted-foreground">Браузер не разрешил сохранить список. Изменения доступны до перезагрузки страницы.</p>}
    <div className="mt-6 flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold">В избранном: {favorites.length}</p>
        <p className="mt-1 text-sm text-muted-foreground">Скопируйте список со ссылками и отправьте его в Telegram или другой мессенджер.</p>
      </div>
      <div className="grid shrink-0 grid-cols-1 gap-2 min-[420px]:grid-cols-2">
        <button type="button" onClick={handleCopy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border bg-background px-4 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2">
          {actionStatus === 'copied' ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
          {actionStatus === 'copied' ? 'Скопировано' : 'Скопировать'}
        </button>
        <button type="button" onClick={handleShare} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2">
          {actionStatus === 'shared' ? <Check aria-hidden="true" className="h-4 w-4" /> : <Share2 aria-hidden="true" className="h-4 w-4" />}
          {actionStatus === 'shared' ? 'Отправлено' : 'Поделиться'}
        </button>
      </div>
    </div>
    <p role="status" aria-live="polite" className={`mt-2 min-h-5 text-sm ${actionStatus === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
      {actionStatus === 'copied' && 'Готово — теперь можно вставить план в сообщение.'}
      {actionStatus === 'shared' && 'План передан выбранному приложению.'}
      {actionStatus === 'error' && 'Не удалось подготовить план. Проверьте разрешение браузера и попробуйте ещё раз.'}
    </p>
    <div className="mt-3 space-y-3">{favorites.map((item) => <article key={item.id} className="flex flex-wrap items-start justify-between gap-4 rounded-lg border p-4"><div className="min-w-0 flex-1"><p className="text-xs font-semibold text-primary">{item.type}{item.meta ? ` · ${item.meta}` : ''}</p><h2 className="mt-1 font-semibold"><Link href={item.href} className="hover:text-primary hover:underline">{item.title}</Link></h2><p className="mt-1 text-sm text-muted-foreground">{item.description}</p></div><FavoritesButton contentId={item.id} /></article>)}</div>
  </> : <div className="mt-8 rounded-lg border border-dashed p-6"><h2 className="font-semibold">Избранное пока пусто</h2><p className="mt-2 text-sm text-muted-foreground">Сохраняйте экзамены, уровни CEFR, учебники и ресурсы, чтобы быстро вернуться к ним позже.</p><Link href="/exams" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">Перейти к экзаменам →</Link></div>;
}
