'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { examGuides, type ExamGuide } from '@/data';
import { withBasePath } from '@/lib/paths';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

const defaultSlugs = ['ielts', 'toefl'];

function selectedExams(requestedSlugs: string[] | null): ExamGuide[] | null {
  const slugs = requestedSlugs === null ? defaultSlugs : [...new Set(requestedSlugs.filter(Boolean))];
  if (slugs.length < 2) return null;
  const exams = slugs.map((slug) => examGuides.find((exam) => exam.slug === slug));
  if (exams.some((exam) => !exam)) return null;
  return exams.filter((exam): exam is ExamGuide => Boolean(exam));
}

function scale(exam: ExamGuide) {
  return exam.scoreScale ? `${exam.scoreScale.min}–${exam.scoreScale.max} ${exam.scoreScale.unit}` : 'Уточняется';
}

const rows: { label: string; value: (exam: ExamGuide) => string }[] = [
  { label: 'Цель', value: (exam) => exam.tags.join(', ') },
  { label: 'Формат сдачи', value: (exam) => exam.registration?.format ?? 'Уточняется' },
  { label: 'Шкала', value: scale },
  { label: 'CEFR', value: (exam) => exam.cefrLevels.join('–') },
  { label: 'Срок действия', value: (exam) => exam.validity ?? 'Уточняется' },
  { label: 'Стоимость', value: (exam) => exam.registration?.costNote ?? 'Уточняется' },
];

export function CompareFallback() {
  return <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12"><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Сравнение экзаменов</h1><p className="mt-4 text-muted-foreground">Загружаем данные…</p></main>;
}

export default function CompareView() {
  const query = useSearchParams();
  const requestedSlugs = query.has('set') ? query.getAll('set') : null;
  const exams = selectedExams(requestedSlugs);
  const invalid = requestedSlugs !== null && !exams;
  const checkedSlugs = requestedSlugs ?? defaultSlugs;

  return <>
    <SiteHeader />
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link href="/exams" className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">← К списку экзаменов</Link>
      <p className="mt-5 text-sm font-semibold text-primary sm:mt-8">СРАВНЕНИЕ</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Сравнение экзаменов</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Выберите не менее двух экзаменов, чтобы сопоставить их назначение, формат, шкалу оценивания, срок действия результата и стоимость.</p>

      <form action={withBasePath('/exams/compare/')} className="mt-7 max-w-3xl rounded-xl border bg-muted/30 p-4 sm:p-5">
        <fieldset>
          <legend className="text-sm font-semibold">Какие экзамены сравнить</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {examGuides.map((exam) => <label key={exam.id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border bg-background px-3 text-sm"><input type="checkbox" name="set" value={exam.slug} defaultChecked={checkedSlugs.includes(exam.slug)} className="h-5 w-5 shrink-0 sm:h-4 sm:w-4" /><span className="min-w-0">{exam.title}</span></label>)}
          </div>
        </fieldset>
        <button type="submit" className="mt-4 min-h-12 w-full rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto">Обновить сравнение</button>
      </form>

      {invalid ? <div className="mt-8 rounded-xl border border-dashed p-5 sm:mt-10 sm:p-6"><h2 className="font-semibold">Недостаточно экзаменов для сравнения</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Выберите не менее двух вариантов.</p></div> : exams && <section className="mt-8 sm:mt-10" aria-labelledby="comparison-heading">
        <h2 id="comparison-heading" className="text-2xl font-bold">Выбранные экзамены</h2>
        <div className="mt-4 grid gap-4 md:hidden">
          {exams.map((exam) => <article key={exam.id} className="rounded-xl border bg-card p-4">
            <h3 className="text-lg font-semibold"><Link href={`/exams/${exam.slug}`} className="text-primary hover:underline">{exam.title}</Link></h3>
            <dl className="mt-3 divide-y">
              {rows.map((row) => <div key={row.label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 py-3 text-sm first:pt-0 last:pb-0"><dt className="font-medium">{row.label}</dt><dd className="min-w-0 text-muted-foreground">{row.value(exam)}</dd></div>)}
            </dl>
          </article>)}
        </div>
        <div className="mt-4 hidden w-full min-w-0 max-w-full overflow-x-auto rounded-xl border md:block" tabIndex={0} aria-label="Прокручиваемая сравнительная таблица">
          <table className="w-full min-w-[760px] text-left text-sm"><caption className="sr-only">Сравнительная таблица экзаменов</caption><thead className="bg-muted/50"><tr><th scope="col" className="w-40 px-4 py-3 font-semibold">Параметр</th>{exams.map((exam) => <th scope="col" key={exam.id} className="px-4 py-3 font-semibold"><Link href={`/exams/${exam.slug}`} className="text-primary hover:underline">{exam.title}</Link></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-t align-top"><th scope="row" className="px-4 py-3 font-medium">{row.label}</th>{exams.map((exam) => <td key={exam.id} className="px-4 py-3 leading-6 text-muted-foreground">{row.value(exam)}</td>)}</tr>)}</tbody></table>
        </div>
      </section>}
    </main>
    <SiteFooter />
  </>;
}
