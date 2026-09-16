import { ReviewStatus } from '@/components/content/MaterialDetails';
import { ExternalLink } from '@/components/content/ExternalLink';
import { examGuides } from '@/data';
import type { ExamGuide } from '@/data';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

type PageProps = { params: Promise<{ exam: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return examGuides.map(({ slug }) => ({ exam: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam: slug } = await params;
  const exam = examGuides.find((item) => item.slug === slug);
  return exam
    ? { title: `${exam.title}: подготовка`, description: exam.description, alternates: { canonical: `/exams/${exam.slug}` }, openGraph: { title: `${exam.title}: подготовка`, description: exam.description } }
    : { title: 'Экзамен не найден', robots: { index: false } };
}

function scoreLabel(exam: ExamGuide) {
  if (!exam.scoreScale) return 'Шкала уточняется';
  return `${exam.scoreScale.min}–${exam.scoreScale.max} ${exam.scoreScale.unit}`;
}

function ExamResults({ exam }: { exam: ExamGuide }) {
  return <section className="mt-12" aria-labelledby="results-heading">
    <h2 id="results-heading" className="text-2xl font-bold">Результат и срок действия</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border p-5"><p className="text-sm text-muted-foreground">Шкала</p><p className="mt-1 text-lg font-semibold">{scoreLabel(exam)}</p>{exam.scoreScale?.note && <p className="mt-2 text-sm leading-6 text-muted-foreground">{exam.scoreScale.note}</p>}</div>
      <div className="rounded-xl border p-5"><p className="text-sm text-muted-foreground">Срок действия</p><p className="mt-1 text-lg font-semibold">{exam.validity ?? 'Уточняется'}</p></div>
    </div>
    <div className="mt-4 rounded-xl border p-5">
      <h3 className="font-semibold">Связь с CEFR</h3>
      {exam.scoreMapping.length ? <dl className="mt-3 grid gap-2 sm:grid-cols-2">{exam.scoreMapping.map((mapping) => <div key={mapping.cefr} className="flex justify-between gap-4 border-b py-2 text-sm last:border-0"><dt className="font-medium">{mapping.cefr}</dt><dd className="text-right text-muted-foreground">{mapping.score}</dd></div>)}</dl> : <p className="mt-2 text-sm text-muted-foreground">Для этого экзамена соответствие шкале CEFR не указано.</p>}
    </div>
  </section>;
}

function ExamFormat({ exam }: { exam: ExamGuide }) {
  return <section className="mt-12" aria-labelledby="format-heading">
    <h2 id="format-heading" className="text-2xl font-bold">Формат</h2>
    <p className="mt-2 text-sm text-muted-foreground">Общая продолжительность: {exam.duration}</p>
    <div className="mt-4 grid gap-3 sm:hidden">
      {exam.parts.map((part) => <article key={part.id} className="rounded-xl border p-4"><h3 className="font-semibold">{part.title}</h3><dl className="mt-3 grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-sm"><dt className="text-muted-foreground">Время</dt><dd>{part.duration ?? 'Уточняется'}</dd><dt className="text-muted-foreground">Заданий</dt><dd>{part.questionCount ?? 'Уточняется'}</dd><dt className="text-muted-foreground">Доля</dt><dd>{part.scoreShare === null ? 'Уточняется' : `${part.scoreShare}%`}</dd><dt className="text-muted-foreground">Типы заданий</dt><dd>{part.taskTypes.length ? part.taskTypes.join(', ') : 'Уточняется'}</dd></dl></article>)}
    </div>
    <div className="mt-4 hidden overflow-x-auto rounded-xl border sm:block" tabIndex={0} aria-label="Прокручиваемая таблица частей экзамена">
      <table className="w-full min-w-[680px] text-left text-sm"><caption className="sr-only">Части экзамена</caption><thead className="bg-muted/50"><tr><th scope="col" className="px-4 py-3 font-semibold">Часть</th><th scope="col" className="px-4 py-3 font-semibold">Время</th><th scope="col" className="px-4 py-3 font-semibold">Заданий</th><th scope="col" className="px-4 py-3 font-semibold">Доля результата</th><th scope="col" className="px-4 py-3 font-semibold">Типы заданий</th></tr></thead><tbody>{exam.parts.map((part) => <tr key={part.id} className="border-t align-top"><th scope="row" className="px-4 py-3 font-medium">{part.title}</th><td className="px-4 py-3 text-muted-foreground">{part.duration ?? 'Уточняется'}</td><td className="px-4 py-3 text-muted-foreground">{part.questionCount ?? 'Уточняется'}</td><td className="px-4 py-3 text-muted-foreground">{part.scoreShare === null ? 'Уточняется' : `${part.scoreShare}%`}</td><td className="px-4 py-3 text-muted-foreground">{part.taskTypes.length ? part.taskTypes.join(', ') : 'Уточняется'}</td></tr>)}</tbody></table>
    </div>
  </section>;
}

function Registration({ exam }: { exam: ExamGuide }) {
  return <section className="mt-12" aria-labelledby="registration-heading">
    <h2 id="registration-heading" className="text-2xl font-bold">Регистрация и стоимость</h2>
    {exam.registration ? <div className="mt-4 grid gap-4 sm:grid-cols-3"><div className="rounded-xl border p-5"><p className="text-sm text-muted-foreground">Стоимость</p><p className="mt-1 text-sm leading-6">{exam.registration.costNote ?? 'Уточняется'}</p></div><div className="rounded-xl border p-5"><p className="text-sm text-muted-foreground">Расписание</p><p className="mt-1 text-sm leading-6">{exam.registration.frequency ?? 'Уточняется'}</p></div><div className="rounded-xl border p-5"><p className="text-sm text-muted-foreground">Формат сдачи</p><p className="mt-1 text-sm leading-6">{exam.registration.format ?? 'Уточняется'}</p></div></div> : <p className="mt-4 rounded-xl border border-dashed p-5 text-sm text-muted-foreground">Информация о регистрации пока не добавлена.</p>}
    {exam.registration && <ExternalLink href={exam.registration.website} className="mt-4 text-sm font-semibold text-primary hover:underline">Регистрация на официальном сайте</ExternalLink>}
  </section>;
}

function FamilyMembers({ exam }: { exam: ExamGuide }) {
  if (exam.levelStatus !== 'family' || !exam.familyMembers) return null;
  return <section className="mt-12" aria-labelledby="qualifications-heading"><h2 id="qualifications-heading" className="text-2xl font-bold">Экзамены в этой серии</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{exam.familyMembers.map((member) => { const qualification = examGuides.find((item) => item.id === member.id); return <article key={member.id} className="rounded-xl border p-5"><p className="text-sm font-semibold text-primary">CEFR {member.cefrLevels.join('–')}</p><h3 className="mt-1 text-lg font-semibold">{member.title}</h3>{qualification ? <Link href={`/exams/${qualification.slug}`} className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">Открыть страницу экзамена →</Link> : <p className="mt-3 text-sm text-muted-foreground">Страница этого экзамена пока не добавлена.</p>}</article>; })}</div></section>;
}

export default async function ExamPage({ params }: PageProps) {
  const { exam: slug } = await params;
  const exam = examGuides.find((item) => item.slug === slug);
  if (!exam) notFound();
  return <><SiteHeader /><main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><Link href="/exams" className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">← К списку экзаменов</Link><section className="mt-5 rounded-2xl border bg-muted/30 p-4 sm:mt-8 sm:p-7"><p className="text-sm font-semibold text-primary">{exam.levelStatus === 'family' ? 'Серия экзаменов' : 'Отдельный экзамен'} · CEFR {exam.cefrLevels.join('–')}</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{exam.title}</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground sm:text-lg">{exam.description}</p><p className="mt-5 text-sm text-muted-foreground">Организатор: {exam.organization}</p><div className="mt-3"><ReviewStatus item={exam} /></div><ExternalLink href={exam.officialUrl} className="mt-6 w-full justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto">Официальный сайт экзамена</ExternalLink></section><FamilyMembers exam={exam} />{exam.levelStatus === 'single' && <><ExamResults exam={exam} /><ExamFormat exam={exam} /><Registration exam={exam} /></>}<section className="mt-12"><h2 className="text-2xl font-bold">Этапы подготовки</h2><ol className="mt-5 space-y-4 border-l pl-6">{exam.preparationStrategy.map((item, index) => <li key={item.phase} className="relative"><span className="absolute -left-[2.05rem] flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index + 1}</span><h3 className="font-semibold">{item.phase}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.focus}</p></li>)}</ol></section><section className="mt-12"><h2 className="text-2xl font-bold">Официальные материалы</h2><ul className="mt-4 space-y-3">{exam.officialMaterials.map((material) => <li key={material.url}><ExternalLink href={material.url} className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">{material.title}</ExternalLink></li>)}</ul></section></main><SiteFooter /></>;
}
