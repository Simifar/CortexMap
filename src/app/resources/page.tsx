import { Suspense } from 'react';
import ResourcesView, { ResourcesQueryView } from '@/components/catalog/ResourcesView';
export const metadata = { title: 'Ресурсы для подготовки', description: 'Официальные сайты экзаменов и внешние сервисы для грамматики, чтения, аудирования, говорения и произношения.', alternates: { canonical: '/resources' } };

export default function Page() {
  return <Suspense fallback={<ResourcesView />}><ResourcesQueryView /></Suspense>;
}
