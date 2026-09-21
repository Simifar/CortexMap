import { withBasePath } from '@/lib/paths';
import Link from 'next/link';
import { ArrowRight, ClipboardList, GraduationCap, LibraryBig, Search } from 'lucide-react';
import { examGuides, levels, resources, type ResourceCategory } from '@/data';
import { SiteHeader } from '@/components/catalog/SiteHeader';
import { SiteFooter } from '@/components/catalog/SiteFooter';
import { CefrLevelIcon } from '@/components/content/CefrLevelIcon';
import { ExamCard } from '@/components/content/ExamCard';
import { SearchInput } from '@/components/catalog/SearchInput';
import { createRouteMetadata } from '@/lib/metadata';

export const metadata = createRouteMetadata({
  title: 'CortexMap — подготовка к экзаменам по английскому',
  description: 'Справочник по IELTS, TOEFL и Cambridge English: формат экзаменов, шкалы оценивания, планы подготовки и официальные материалы.',
  path: '/',
});

const resourceCategories: { category: ResourceCategory; label: string }[] = [
  { category: 'grammar', label: 'Грамматика' },
  { category: 'reading', label: 'Чтение' },
  { category: 'listening', label: 'Аудирование' },
  { category: 'speaking', label: 'Говорение' },
  { category: 'dictionary', label: 'Словари' },
  { category: 'pronunciation', label: 'Произношение' },
];

const starts = [
  { href: '/exams', icon: GraduationCap, title: 'Выбрать экзамен', text: 'Сравнить назначение, формат и шкалу оценивания.' },
  { href: '/plans', icon: ClipboardList, title: 'Составить план подготовки', text: 'Проверить темы и навыки для нужного уровня CEFR.' },
  { href: '/textbooks', icon: LibraryBig, title: 'Подобрать учебник', text: 'Найти пособия для общего английского и экзаменов.' },
];

export default function HomePage() {
  const featuredResources = ['resource-ielts-org', 'resource-cambridge-english', 'resource-bbc-learning-english']
    .map((id) => resources.find((resource) => resource.id === id))
    .filter((resource): resource is (typeof resources)[number] => Boolean(resource));

  return <>
    <SiteHeader />
    <main>
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Справочник по языковым экзаменам</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Подготовка к экзаменам по английскому языку</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Сравните IELTS, TOEFL и экзамены Cambridge English, изучите формат заданий и соберите план подготовки по своему уровню.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm"><div className="rounded-xl border border-border bg-background px-2 py-3"><strong className="block text-lg">{examGuides.length}</strong><span className="text-muted-foreground">экзаменов</span></div><div className="rounded-xl border border-border bg-background px-2 py-3"><strong className="block text-lg">{levels.length}</strong><span className="text-muted-foreground">уровней CEFR</span></div><div className="rounded-xl border border-border bg-background px-2 py-3"><strong className="block text-lg">{resources.length}</strong><span className="text-muted-foreground">ресурсов</span></div></div>
          </div>
          <form action={withBasePath('/search/')} className="mt-8 max-w-3xl"><SearchInput /></form>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm"><span className="mr-1 text-muted-foreground">Популярные запросы:</span>{['IELTS', 'TOEFL', 'B2 First', 'C1 Advanced'].map((query) => <Link key={query} href={`/search?q=${encodeURIComponent(query)}`} className="rounded-full border border-border bg-background px-3 py-1.5 font-medium transition hover:border-primary/40 hover:text-primary">{query}</Link>)}</div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">С чего начать подготовку</h2><p className="mt-2 text-muted-foreground">Выберите задачу, которая соответствует вашему текущему этапу.</p></div><Link href="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Поиск по справочнику <Search className="h-4 w-4" /></Link></div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{starts.map(({ href, icon: Icon, title, text }) => <Link key={href} href={href} className="group flex min-w-0 items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><Icon className="h-5 w-5" /></span><span className="min-w-0"><span className="font-semibold group-hover:text-primary">{title}</span><span className="mt-1 block text-sm leading-5 text-muted-foreground">{text}</span><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Открыть <ArrowRight className="h-3.5 w-3.5" /></span></span></Link>)}</div>
      </section>

      <section className="border-y border-border bg-muted/30"><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Основные экзамены</h2><p className="mt-2 text-muted-foreground">Сравните назначение, структуру, шкалу оценивания и условия сдачи.</p></div><div className="flex flex-wrap gap-x-4 gap-y-2"><Link href="/exams/compare" className="text-sm font-semibold text-primary hover:underline">Сравнить экзамены</Link><Link href="/exams" className="text-sm font-semibold text-primary hover:underline">Все экзамены →</Link></div></div><div className="mt-7 grid gap-4 md:grid-cols-3">{examGuides.slice(0, 3).map((exam) => <ExamCard key={exam.id} exam={exam} />)}</div></div></section>

      <section><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Планы по уровням CEFR</h2><p className="mt-2 text-muted-foreground">Используйте их, чтобы найти пробелы в грамматике, лексике и языковых навыках.</p></div><Link href="/plans" className="text-sm font-semibold text-primary hover:underline">Все уровни →</Link></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{levels.map((level) => <Link key={level.id} href={`/plans/${level.slug}`} className="group rounded-xl border border-border bg-background p-4 transition hover:border-primary/45 hover:shadow-sm sm:p-5"><div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><CefrLevelIcon level={level.title} className="h-4 w-4" /></span><div className="min-w-0"><h3 className="font-bold group-hover:text-primary">{level.title} <span className="font-medium text-muted-foreground">· {level.fullName.split(' / ')[0]}</span></h3><p className="mt-0.5 text-xs text-muted-foreground">Ориентировочный срок: {level.duration}</p></div></div><div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground"><span>{level.grammar.length} тем по грамматике</span><span>{level.skills.length} практических навыка</span></div></Link>)}</div></div></section>

      <section className="border-t border-border bg-muted/30"><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Материалы для подготовки</h2><p className="mt-2 text-muted-foreground">Официальные сайты экзаменов и внешние ресурсы для практики отдельных навыков.</p></div><Link href="/resources" className="text-sm font-semibold text-primary hover:underline">Каталог ресурсов →</Link></div><div className="-mx-4 mt-5 flex max-w-[calc(100%+2rem)] snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:max-w-full sm:flex-wrap sm:px-0">{resourceCategories.map(({ category, label }) => <Link key={category} href={`/resources?category=${category}`} className="flex min-h-11 min-w-max shrink-0 snap-start items-center rounded-lg border border-border bg-background px-3 text-sm font-medium transition hover:border-primary/40 hover:bg-accent">{label}</Link>)}</div><div className="mt-5 grid gap-4 md:grid-cols-3">{featuredResources.map((resource) => <Link key={resource.id} href={`/resources/${resource.slug}`} className="group flex min-w-0 items-start justify-between gap-3 rounded-xl border border-border bg-background p-4 transition hover:border-primary/40 hover:shadow-sm"><div className="min-w-0"><p className="text-xs font-semibold text-primary">{resource.tags[0]} · {resource.access === 'paid' ? 'платный доступ' : resource.access === 'mixed' ? 'частично бесплатно' : 'бесплатно'}</p><h3 className="mt-1 font-semibold group-hover:text-primary">{resource.title}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{resource.description}</p></div><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" /></Link>)}</div></div></section>
    </main>
    <SiteFooter />
  </>;
}
