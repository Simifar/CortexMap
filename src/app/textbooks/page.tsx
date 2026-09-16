import { Suspense } from 'react';
import TextbooksView, { TextbooksQueryView } from '@/components/catalog/TextbooksView';
export const metadata = { title: 'Учебники и пособия', description: 'Учебники общего английского и пособия для подготовки к экзаменам с официальными ссылками на страницы издателей.', alternates: { canonical: '/textbooks' } };

export default function Page() {
  return <Suspense fallback={<TextbooksView />}><TextbooksQueryView /></Suspense>;
}
