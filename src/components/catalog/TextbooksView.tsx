'use client';
import { useSearchParams } from 'next/navigation';
import { textbooks } from '@/data';
import { TextbookFilterForm } from '@/components/catalog/CatalogFilterForm';
import { ResultCount } from '@/components/catalog/ResultCount';
import { TextbookCard } from '@/components/content/TextbookCard';
import { Container } from '@/components/layout/Container';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { parseTextbookFilters } from '@/lib/catalog-filters';
export default function TextbooksView({ params = {} }: { params?: Record<string, string | string[] | undefined> }) { const filters = parseTextbookFilters(params); const publishers = [...new Set(textbooks.map((item) => item.publisher))].sort(); const formats = [...new Set(textbooks.map((item) => item.format))].sort(); const purposes = [...new Set(textbooks.flatMap((item) => item.purpose))].sort(); const results = textbooks.filter((item) => (!filters.level || item.cefrLevels.includes(filters.level)) && (!filters.publisher || item.publisher === filters.publisher) && (!filters.format || item.format === filters.format) && (!filters.purpose || item.purpose.includes(filters.purpose)));
  return <><SiteHeader /><main><Container className="py-8 sm:py-12"><p className="text-sm font-semibold text-primary">CATALOGUE</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Учебники</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Кураторский каталог. Мы не размещаем копии книг — ссылки ведут на официальные страницы издателей и правообладателей.</p><TextbookFilterForm key={JSON.stringify(params)} filters={filters} publishers={publishers} formats={formats} purposes={purposes} /><div className="mt-6"><ResultCount count={results.length} /></div>{results.length ? <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{results.map((textbook) => <TextbookCard key={textbook.id} textbook={textbook} />)}</div> : <div className="mt-4 rounded-xl border border-dashed p-6"><h2 className="font-semibold">Учебники не найдены</h2><p className="mt-2 text-sm text-muted-foreground">Уберите часть фильтров или выберите другой уровень.</p></div>}</Container></main><SiteFooter /></>; }

export function TextbooksQueryView() {
  const query = useSearchParams();
  const params: Record<string, string> = {};
  query.forEach((value, key) => { if (!(key in params)) params[key] = value; });
  return <TextbooksView params={params} />;
}
