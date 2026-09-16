import { examGuides } from '@/data';
import { ExamCard } from '@/components/content/ExamCard';
import { Container } from '@/components/layout/Container';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import Link from 'next/link';
export const metadata = { title: 'Экзамены', description: 'Справочные маршруты подготовки к IELTS, TOEFL iBT и Cambridge English с официальными источниками.', alternates: { canonical: '/exams' } };
export default function ExamsPage() { return <><SiteHeader /><main><Container className="py-12"><p className="text-sm font-semibold text-primary">EXAM GUIDES</p><h1 className="mt-2 text-4xl font-bold tracking-tight">Подготовка к экзаменам</h1><p className="mt-4 max-w-2xl text-muted-foreground">Краткие, независимые от конкретного курса карты подготовки. Уточняйте актуальные даты, стоимость и правила только на официальных сайтах экзаменов.</p><Link href="/exams/compare" className="mt-5 inline-flex rounded-md border px-4 py-2 text-sm font-semibold text-primary hover:bg-accent">Сравнить экзамены</Link><div className="mt-10 grid gap-5 md:grid-cols-3">{examGuides.map((exam) => <ExamCard key={exam.id} exam={exam} />)}</div></Container></main><SiteFooter /></>; }
