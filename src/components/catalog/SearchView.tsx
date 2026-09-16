'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ResultCount } from '@/components/catalog/ResultCount';
import { SearchForm } from '@/components/catalog/SearchForm';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { hasActiveFilters, parseCatalogFilters, type CatalogType } from '@/lib/catalog-filters';
import { searchCatalog } from '@/lib/search';
import { paginateResults, searchPageHref } from '@/lib/search-pagination';

const typeLabels: Record<CatalogType, string> = {
  level: 'Уровень CEFR',
  topic: 'Тема',
  textbook: 'Учебник',
  exam: 'Экзамен',
  resource: 'Ресурс',
};

export default function SearchView({ params = {} }: { params?: Record<string, string | string[] | undefined> }) {
  const filters = parseCatalogFilters(params);
  const active = hasActiveFilters(filters);
  const { results, total, page, pages } = paginateResults(active ? searchCatalog(filters) : [], params.page);

  return <>
    <SiteHeader />
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Поиск по справочнику</h1>
      <p className="mt-3 leading-7 text-muted-foreground">Найдите экзамен, уровень CEFR, учебник, тему или внешний ресурс.</p>
      <SearchForm key={JSON.stringify(params)} filters={filters} />
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="text-muted-foreground">Популярные запросы:</span>
        {['IELTS', 'TOEFL', 'B2 First'].map((query) => <Link key={query} href={`/search?q=${encodeURIComponent(query)}`} className="rounded-full border px-3 py-1 hover:bg-accent">{query}</Link>)}
      </div>
      {active ? <section className="mt-10">
        <ResultCount count={total} />
        {results.length ? <div className="mt-4 space-y-3">{results.map((result) => <article key={result.id} className="rounded-lg border p-4">
          <p className="text-xs font-semibold text-primary">{typeLabels[result.type]} · {result.cefrLevels.length ? result.cefrLevels.join('–') : 'Без привязки к уровню'}</p>
          <h2 className="mt-1 font-semibold"><Link href={result.href} className="hover:text-primary hover:underline">{result.title}</Link></h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{result.description}</p>
        </article>)}</div> : <div className="mt-4 rounded-lg border border-dashed p-6">
          <h2 className="font-semibold">По вашему запросу ничего не найдено</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Сократите запрос или уберите часть фильтров. Например, вместо полного названия учебника можно указать «IELTS», «B2 First» или «грамматика».</p>
          <Link href="/search" className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">Очистить поиск</Link>
        </div>}
        {pages > 1 && <nav aria-label="Страницы результатов" className="mt-8 flex flex-wrap items-center gap-3">
          {page > 1 && <Link href={searchPageHref(filters, page - 1)} className="rounded-md border px-4 py-2 text-sm hover:bg-accent">← Назад</Link>}
          <span className="text-sm text-muted-foreground">Страница {page} из {pages}</span>
          {page < pages && <Link href={searchPageHref(filters, page + 1)} className="rounded-md border px-4 py-2 text-sm hover:bg-accent">Далее →</Link>}
        </nav>}
      </section> : <p className="mt-8 text-muted-foreground">Введите название экзамена, учебника или темы либо воспользуйтесь фильтрами.</p>}
    </main>
    <SiteFooter />
  </>;
}

export function SearchQueryView() {
  const query = useSearchParams();
  const params: Record<string, string> = {};
  query.forEach((value, key) => { if (!(key in params)) params[key] = value; });
  return <SearchView params={params} />;
}
