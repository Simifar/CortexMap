import { Suspense } from 'react';
import ResourcesView, { ResourcesQueryView } from '@/components/catalog/ResourcesView';
import { createRouteMetadata } from '@/lib/metadata';
export const metadata = createRouteMetadata({ title: 'Ресурсы для подготовки', description: 'Официальные сайты экзаменов и внешние сервисы для грамматики, чтения, аудирования, говорения и произношения.', path: '/resources' });

export default function Page() {
  return <Suspense fallback={<ResourcesView />}><ResourcesQueryView /></Suspense>;
}
