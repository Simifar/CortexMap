'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { examGuides, type ExamGuide } from '@/data';
import { withBasePath } from '@/lib/paths';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

const defaultSlugs = ['ielts', 'toefl'];

function selectedExams(set: string | null): ExamGuide[] | null {
  if (set === null) return examGuides.filter((exam) => defaultSlugs.includes(exam.slug));
  const slugs = [...new Set(set.split(',').map((value) => value.trim()).filter(Boolean))];
  if (slugs.length < 2) return null;
  const exams = slugs.map((slug) => examGuides.find((exam) => exam.slug === slug));
  if (exams.some((exam) => !exam)) return null;
  return exams.filter((exam): exam is ExamGuide => Boolean(exam));
}

function scale(exam: ExamGuide) {
  return exam.scoreScale ? `${exam.scoreScale.min}–${exam.scoreScale.max} ${exam.scoreScale.unit}` : 'Уточняется';
}

export function CompareFallback() {
  return <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><h1 className="text-4xl font-bold tracking-tight">Сравнить экзамены</h1><p className="mt-4 text-muted-foreground">Загрузка сравнения...</p></main>;
}

export default function CompareView() {
  const query = useSearchParams();
  const set = query.get('set');
  const exams = selectedExams(set);
  const invalid = set !== null && !exams;
  const rows: { label: string; value: (exam: ExamGuide) => string }[] = [
    { label: 'Цель', value: (exam) => exam.tags.join(', ') },
    { label: 'Формат', value: (exam) => exam.registration?.format ?? 'Уточняется' },
    { label: 'Шкала', value: scale },
    { label: 'CEFR', value: (exam) => exam.cefrLevels.join('–') },
    { label: 'Срок действия', value: (exam) => exam.validity ?? 'Уточняется' },
    { label: 'Стоимость', value: (exam) => exam.registration?.costNote ?? 'Уточняется' },
    { label: 'Где сдают', value: (exam) => exam.registration?.format ?? 'Уточняется' },
  ];

  return <><SiteHeader /><main className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><Link href="/exams" className="text-sm font-medium text-primary hover:underline">← Все экзамены</Link><p className="mt-8 text-sm font-semibold text-primary">СРАВНЕНИЕ</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Сравнить экзамены</h1><p className="mt-4 max-w-2xl text-muted-foreground">Выберите два или больше экзаменов, чтобы сопоставить формат и условия. Цены и требования вузов уточняйте на официальных сайтах.</p><form action={withBasePath('/exams/compare/')} className="mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-end"><label className="flex-1 text-sm font-medium">Экзамены через запятую<input name="set" defaultValue={set ?? defaultSlugs.join(',')} placeholder="ielts,toefl" className="mt-2 block w-full rounded-md border bg-background px-3 py-2 font-normal focus-visible:outline-2" /></label><button type="submit" className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Сравнить</button></form>{invalid ? <div className="mt-10 rounded-xl border border-dashed p-6"><h2 className="font-semibold">Не удалось собрать сравнение</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Укажите минимум два известных экзамена, например <code>ielts,toefl</code>.</p></div> : exams && <section className="mt-10" aria-labelledby="comparison-heading"><h2 id="comparison-heading" className="text-2xl font-bold">Сравнение выбранных экзаменов</h2><div className="mt-4 overflow-x-auto rounded-xl border"><table className="w-full min-w-[760px] text-left text-sm"><caption className="sr-only">Сравнительная таблица экзаменов</caption><thead className="bg-muted/50"><tr><th scope="col" className="w-40 px-4 py-3 font-semibold">Параметр</th>{exams.map((exam) => <th scope="col" key={exam.id} className="px-4 py-3 font-semibold"><Link href={`/exams/${exam.slug}`} className="text-primary hover:underline">{exam.title}</Link></th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-t align-top"><th scope="row" className="px-4 py-3 font-medium">{row.label}</th>{exams.map((exam) => <td key={exam.id} className="px-4 py-3 leading-6 text-muted-foreground">{row.value(exam)}</td>)}</tr>)}</tbody></table></div></section>}</main><SiteFooter /></>;
}
