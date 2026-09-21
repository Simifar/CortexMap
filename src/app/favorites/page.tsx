import { examGuides, levels, resources, textbooks } from '@/data';
import { FavoritesList, type FavoriteContent } from '@/components/catalog/FavoritesList';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { resourceCategoryLabels } from '@/lib/catalog-labels';
import { createRouteMetadata } from '@/lib/metadata';

const content: FavoriteContent[] = [...levels.map((item) => ({ id: item.id, title: `${item.title}: ${item.fullName}`, description: item.description, href: `/plans/${item.slug}`, type: 'Уровень CEFR', meta: item.title })), ...textbooks.map((item) => ({ id: item.id, title: item.title, description: item.description, href: `/textbooks/${item.slug}`, type: 'Учебник', meta: item.cefrLevels.join('–') })), ...examGuides.map((item) => ({ id: item.id, title: item.title, description: item.description, href: `/exams/${item.slug}`, type: 'Экзамен', meta: item.cefrLevels.join('–') })), ...resources.map((item) => ({ id: item.id, title: item.title, description: item.description, href: `/resources/${item.slug}`, type: 'Ресурс', meta: resourceCategoryLabels[item.category] }))];
export const metadata = createRouteMetadata({ title: 'Избранное', description: 'Сохранённые материалы CortexMap в этом браузере.', path: '/favorites', robots: { index: false, follow: false } });
export default function FavoritesPage() { return <><SiteHeader /><main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Избранное</h1><p className="mt-3 leading-7 text-muted-foreground">Список хранится только в этом браузере и не синхронизируется между устройствами или установленной веб-версией.</p><FavoritesList content={content} /></main><SiteFooter /></>; }
