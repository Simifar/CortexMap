import Link from 'next/link';
import { SiteFooter } from '@/components/catalog/SiteFooter';
import { SiteHeader } from '@/components/catalog/SiteHeader';

export default function NotFound() {
  return <><SiteHeader /><main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24"><p className="text-sm font-semibold text-primary">404</p><h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Страница не найдена</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">Возможно, ссылка устарела или такого материала нет в справочнике.</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">На главную</Link></main><SiteFooter /></>;
}
