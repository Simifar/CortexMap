import { Suspense } from 'react';
import SearchView, { SearchQueryView } from '@/components/catalog/SearchView';
export const metadata = { title: 'Поиск', description: 'Поиск по экзаменам, уровням CEFR, учебникам и ресурсам CortexMap.', robots: { index: false, follow: true } };

export default function Page() {
  return <Suspense fallback={<SearchView />}><SearchQueryView /></Suspense>;
}
