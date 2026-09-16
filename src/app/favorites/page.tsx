import { examGuides, levels, resources, textbooks } from '@/data';
import { FavoritesList, type FavoriteContent } from '@/components/catalog/FavoritesList';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { resourceCategoryLabels } from '@/lib/catalog-labels';

const content: FavoriteContent[] = [...levels.map((item) => ({ id: item.id, title: `${item.title}: ${item.fullName}`, description: item.description, href: `/plans/${item.slug}`, type: 'Уровень CEFR', meta: item.title })), ...textbooks.map((item) => ({ id: item.id, title: item.title, description: item.description, href: `/textbooks/${item.slug}`, type: 'Учебник', meta: item.cefrLevels.join('–') })), ...examGuides.map((item) => ({ id: item.id, title: item.title, description: item.description, href: `/exams/${item.slug}`, type: 'Экзамен', meta: item.cefrLevels.join('–') })), ...resources.map((item) => ({ id: item.id, title: item.title, description: item.description, href: `/resources/${item.slug}`, type: 'Ресурс', meta: resourceCategoryLabels[item.category] }))];
export const metadata = { title: 'Избранное', description: 'Сохранённые материалы CortexMap в этом браузере.', robots: { index: false, follow: false } };
export default function FavoritesPage() { return <><SiteHeader /><main className="mx-auto max-w-4xl px-4 py-12 sm:px-6"><h1 className="text-4xl font-bold tracking-tight">Избранное</h1><p className="mt-3 text-muted-foreground">Список хранится только в этом браузере и не синхронизируется между устройствами.</p><FavoritesList content={content} /></main><SiteFooter /></>; }
