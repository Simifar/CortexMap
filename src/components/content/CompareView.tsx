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

export function CompareFallback() {
  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h1 className="text-4xl font-bold tracking-tight">Сравнение экзаменов</h1><p className="mt-4 text-muted-foreground">Загружаем данные…</p></main>;
}

export default function CompareView() {
  const query = useSearchParams();
  const requestedSlugs = query.has('set') ? query.getAll('set') : null;
  const exams = selectedExams(requestedSlugs);
  const invalid = requestedSlugs !== null && !exams;
  const rows: { label: string; value: (exam: ExamGuide) => string }[] = [
    { label: 'Цель', value: (exam) => exam.tags.join(', ') },
    { label: 'Формат сдачи', value: (exam) => exam.registration?.format ?? 'Уточняется' },
    { label: 'Шкала', value: scale },
    { label: 'CEFR', value: (exam) => exam.cefrLevels.join('–') },
    { label: 'Срок действия', value: (exam) => exam.validity ?? 'Уточняется' },
    { label: 'Стоимость', value: (exam) => exam.registration?.costNote ?? 'Уточняется' },
  ];

  const checkedSlugs = requestedSlugs ?? defaultSlugs;
  return <><SiteHeader /><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><Link href="/exams" className="text-sm font-medium text-primary hover:underline">← К списку экзаменов</Link><p className="mt-8 text-sm font-semibold text-primary">СРАВНЕНИЕ</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Сравнение экзаменов</h1><p className="mt-4 max-w-2xl text-muted-foreground">Выберите не менее двух экзаменов, чтобы сопоставить их назначение, формат, шкалу оценивания, срок действия результата и стоимость.</p><form action={withBasePath('/exams/compare/')} className="mt-7 max-w-3xl rounded-xl border bg-muted/30 p-4"><fieldset><legend className="text-sm font-semibold">Какие экзамены сравнить</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{examGuides.map((exam) => <label key={exam.id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border bg-background px-3 text-sm"><input type="checkbox" name="set" value={exam.slug} defaultChecked={checkedSlugs.includes(exam.slug)} className="h-4 w-4" />{exam.title}</label>)}</div></fieldset><button type="submit" className="mt-4 min-h-11 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Обновить сравнение</button></form>{invalid ? <div className="mt-10 rounded-xl border border-dashed p-6"><h2 className="font-semibold">Недостаточно экзаменов для сравнения</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Выберите не менее двух вариантов.</p></div> : exams && <section className="mt-10" aria-labelledby="comparison-heading"><h2 id="comparison-heading" className="text-2xl font-bold">Выбранные экзамены</h2><div className="mt-4 overflow-x-auto rounded-xl border"><table className="w-full min-w-[760px] text-left text-sm"><caption className="sr-only">Сравнительная таблица экзаменов</caption><thead className="bg-muted/50"><tr><th scope="col" className="w-40 px-4 py-3 font-semibold">Параметр</th>{exams.map((exam) => <th scope="col" key={exam.id} className="px-4 py-3 font-semibold"><Link href={`/exams/${exam.slug}`} className="text-primary hover:underline">{exam.title}</Link></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-t align-top"><th scope="row" className="px-4 py-3 font-medium">{row.label}</th>{exams.map((exam) => <td key={exam.id} className="px-4 py-3 leading-6 text-muted-foreground">{row.value(exam)}</td>)}</tr>)}</tbody></table></div></section>}</main><SiteFooter /></>;
}
