import { withBasePath } from '@/lib/paths';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpen, ClipboardList, GraduationCap, Headphones, LibraryBig, Search } from 'lucide-react';
import { examGuides, levels, resources, textbooks, type ResourceCategory } from '@/data';
import { SiteHeader } from '@/components/catalog/SiteHeader';
import { SiteFooter } from '@/components/catalog/SiteFooter';
import { CefrLevelIcon } from '@/components/content/CefrLevelIcon';
import { SearchInput } from '@/components/catalog/SearchInput';

export const metadata: Metadata = {
  title: 'CortexMap — навигатор по английскому языку',
  description: 'Планы CEFR, экзамены, учебники и проверенные легальные ресурсы для изучения английского языка.',
  alternates: { canonical: '/' },
};

const resourceCategories: { category: ResourceCategory; label: string }[] = [
  { category: 'grammar', label: 'Грамматика' },
  { category: 'reading', label: 'Чтение' },
  { category: 'listening', label: 'Аудирование' },
  { category: 'speaking', label: 'Общение' },
  { category: 'dictionary', label: 'Словари' },
  { category: 'pronunciation', label: 'Произношение' },
];

const starts = [
  { href: '/plans', icon: ClipboardList, title: 'Определить уровень', text: 'Сравнить A1–C2 и выбрать план.' },
  { href: '/textbooks', icon: LibraryBig, title: 'Найти учебник', text: 'Подобрать опору для занятий.' },
  { href: '/exams', icon: GraduationCap, title: 'Готовиться к экзамену', text: 'Разобрать формат и маршрут.' },
];

export default function HomePage() {
  const featuredResources = ['resource-bbc-learning-english', 'resource-cambridge-dictionary', 'resource-bbc-6-minute-english']
    .map((id) => resources.find((resource) => resource.id === id))
    .filter((resource): resource is (typeof resources)[number] => Boolean(resource));

  return <>
    <SiteHeader />
    <main>
      <section className="border-b border-border bg-muted/35">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">CortexMap · справочник английского</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Найдите следующий шаг в английском</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Планы по уровням, учебники, экзамены и проверенные материалы. Всё, чтобы самостоятельно собрать понятную программу, а не искать по случайным ссылкам.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm"><div className="rounded-xl border border-border bg-background px-2 py-3"><strong className="block text-lg">6</strong><span className="text-muted-foreground">уровней</span></div><div className="rounded-xl border border-border bg-background px-2 py-3"><strong className="block text-lg">{textbooks.length}</strong><span className="text-muted-foreground">учебника</span></div><div className="rounded-xl border border-border bg-background px-2 py-3"><strong className="block text-lg">{resources.length}</strong><span className="text-muted-foreground">ресурсов</span></div></div>
          </div>
          <form action={withBasePath('/search/')} className="mt-8 max-w-3xl"><SearchInput /></form>
          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm"><span className="mr-1 text-muted-foreground">Быстрый поиск:</span>{['A1', 'B2', 'IELTS', 'грамматика', 'аудирование'].map((query) => <Link key={query} href={`/search?q=${encodeURIComponent(query)}`} className="rounded-full border border-border bg-background px-3 py-1.5 font-medium transition hover:border-primary/40 hover:text-primary">{query}</Link>)}</div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">С чего начать</h2><p className="mt-2 text-muted-foreground">Выберите задачу — откроется нужный раздел справочника.</p></div><Link href="/search" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Расширенный поиск <Search className="h-4 w-4" /></Link></div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{starts.map(({ href, icon: Icon, title, text }) => <Link key={href} href={href} className="group flex min-w-0 items-start gap-4 rounded-xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><Icon className="h-5 w-5" /></span><span className="min-w-0"><span className="font-semibold group-hover:text-primary">{title}</span><span className="mt-1 block text-sm leading-5 text-muted-foreground">{text}</span><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">Открыть <ArrowRight className="h-3.5 w-3.5" /></span></span></Link>)}</div>
      </section>

      <section className="border-y border-border bg-muted/30"><div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Выберите уровень CEFR</h2><p className="mt-2 text-muted-foreground">Каждый план включает темы, навыки, ориентир по срокам и подходящие учебники.</p></div><Link href="/plans" className="text-sm font-semibold text-primary hover:underline">Все планы →</Link></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{levels.map((level) => <Link key={level.id} href={`/plans/${level.slug}`} className="group rounded-xl border border-border bg-background p-4 transition hover:border-primary/45 hover:shadow-sm sm:p-5"><div className="flex min-w-0 items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><CefrLevelIcon level={level.title} className="h-4 w-4" /></span><div className="min-w-0"><h3 className="font-bold group-hover:text-primary">{level.title} <span className="font-medium text-muted-foreground">· {level.fullName.split(' / ')[0]}</span></h3><p className="mt-0.5 text-xs text-muted-foreground">Ориентир: {level.duration}</p></div></div><div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground"><span>{level.grammar.length} тем по грамматике</span><span>{level.skills.length} навыка</span></div></Link>)}</div></div></section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-16"><div className="grid min-w-0 gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-10"><section className="min-w-0"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Практика по навыку</h2><p className="mt-2 text-muted-foreground">Легальные внешние сервисы и материалы.</p></div><Link href="/resources" className="text-sm font-semibold text-primary hover:underline">Все ресурсы →</Link></div><div className="-mx-4 mt-5 flex max-w-[calc(100%+2rem)] snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-6 sm:max-w-full sm:flex-wrap sm:px-0">{resourceCategories.map(({ category, label }) => <Link key={category} href={`/resources?category=${category}`} className="flex min-h-11 min-w-max shrink-0 snap-start items-center rounded-lg border border-border px-3 text-sm font-medium transition hover:border-primary/40 hover:bg-accent">{label}</Link>)}</div><div className="mt-5 divide-y divide-border rounded-xl border border-border bg-card">{featuredResources.map((resource) => <Link key={resource.id} href={`/resources/${resource.slug}`} className="group flex min-w-0 items-start justify-between gap-3 p-4 transition hover:bg-accent/40"><div className="min-w-0"><p className="text-xs font-semibold text-primary">{resource.tags[0]} · {resource.access === 'free' ? 'бесплатно' : 'платно'}</p><h3 className="mt-1 font-semibold group-hover:text-primary">{resource.title}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{resource.description}</p></div><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" /></Link>)}</div></section>
        <section className="min-w-0 lg:border-l lg:border-border lg:pl-10"><div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Экзаменационные цели</h2><p className="mt-2 text-muted-foreground">Формат, части экзамена и план подготовки.</p></div><Link href="/exams" className="text-sm font-semibold text-primary hover:underline">Все экзамены →</Link></div><div className="mt-6 space-y-3">{examGuides.map((exam) => <Link key={exam.id} href={`/exams/${exam.slug}`} className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-sm"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><GraduationCap className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="font-semibold group-hover:text-primary">{exam.title}</span><span className="mt-1 block line-clamp-2 text-sm text-muted-foreground">{exam.description}</span></span><span className="shrink-0 text-xs font-bold text-primary">{exam.cefrLevels.join('–')}</span></Link>)}</div><div className="mt-6 rounded-xl bg-primary p-5 text-primary-foreground"><BookOpen className="h-5 w-5" /><h3 className="mt-3 font-bold">Учебник уже выбран?</h3><p className="mt-1 text-sm leading-6 text-primary-foreground/80">Сверьте его с уровнем и задачей, прежде чем строить программу вокруг него.</p><Link href="/textbooks" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4">Открыть каталог <ArrowRight className="h-4 w-4" /></Link></div></section></div></section>
    </main>
    <SiteFooter />
  </>;
}
