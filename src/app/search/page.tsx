import { Suspense } from 'react';
import SearchView, { SearchQueryView } from '@/components/catalog/SearchView';
import { createRouteMetadata } from '@/lib/metadata';
export const metadata = createRouteMetadata({ title: 'Поиск', description: 'Поиск по экзаменам, уровням CEFR, учебникам и ресурсам CortexMap.', path: '/search', robots: { index: false, follow: true } });

export default function Page() {
  return <Suspense fallback={<SearchView />}><SearchQueryView /></Suspense>;
}
