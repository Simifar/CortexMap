import { Suspense } from 'react';
import type { Metadata } from 'next';
import CompareView, { CompareFallback } from '@/components/content/CompareView';

export const metadata: Metadata = {
  title: 'Сравнение экзаменов',
  description: 'Сравнение формата, шкал и условий сдачи языковых экзаменов.',
  alternates: { canonical: '/exams/compare' },
};

export default function ComparePage() {
  return <Suspense fallback={<CompareFallback />}><CompareView /></Suspense>;
}
