import { Suspense } from 'react';
import CompareView, { CompareFallback } from '@/components/content/CompareView';
import { createRouteMetadata } from '@/lib/metadata';

export const metadata = createRouteMetadata({
  title: 'Сравнение экзаменов',
  description: 'Сравнение формата, шкал и условий сдачи языковых экзаменов.',
  path: '/exams/compare',
});

export default function ComparePage() {
  return <Suspense fallback={<CompareFallback />}><CompareView /></Suspense>;
}
