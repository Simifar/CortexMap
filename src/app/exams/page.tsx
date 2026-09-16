import { examGuides } from '@/data';
import { ExamCard } from '@/components/content/ExamCard';
import { Container } from '@/components/layout/Container';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import Link from 'next/link';
export const metadata = { title: 'Экзамены по английскому языку', description: 'Формат, шкалы оценивания и материалы для подготовки к IELTS, TOEFL iBT и экзаменам Cambridge English.', alternates: { canonical: '/exams' } };
export default function ExamsPage() { return <><SiteHeader /><main><Container className="py-8 sm:py-12"><p className="text-sm font-semibold text-primary">ЭКЗАМЕНЫ</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Экзамены по английскому языку</h1><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Выберите экзамен, чтобы изучить его структуру, шкалу оценивания, срок действия результата и рекомендуемые этапы подготовки. Актуальные даты, стоимость и правила регистрации проверяйте на официальном сайте организатора.</p><Link href="/exams/compare" className="mt-5 inline-flex min-h-11 items-center rounded-md border px-4 text-sm font-semibold text-primary hover:bg-accent">Сравнить экзамены</Link><div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">{examGuides.map((exam) => <ExamCard key={exam.id} exam={exam} />)}</div></Container></main><SiteFooter /></>; }
