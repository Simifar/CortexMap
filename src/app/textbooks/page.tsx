import { Suspense } from 'react';
import TextbooksView, { TextbooksQueryView } from '@/components/catalog/TextbooksView';
import { createRouteMetadata } from '@/lib/metadata';
export const metadata = createRouteMetadata({ title: 'Учебники и пособия', description: 'Учебники общего английского и пособия для подготовки к экзаменам с официальными ссылками на страницы издателей.', path: '/textbooks' });

export default function Page() {
  return <Suspense fallback={<TextbooksView />}><TextbooksQueryView /></Suspense>;
}
