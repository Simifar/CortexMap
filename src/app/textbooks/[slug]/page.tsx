import { MaterialDetails } from '@/components/content/MaterialDetails';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/content/JsonLd';
import { ExternalLink } from '@/components/content/ExternalLink';
import { textbooks } from '@/data';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { absoluteSiteUrl } from '@/lib/site';
import { createRouteMetadata } from '@/lib/metadata';
type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return textbooks.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { slug } = await params; const book = textbooks.find((item) => item.slug === slug); return book ? createRouteMetadata({ title: book.title, description: book.description, path: `/textbooks/${book.slug}` }) : { title: 'Учебник не найден', robots: { index: false } }; }
export default async function TextbookPage({ params }: PageProps) { const { slug } = await params; const book = textbooks.find((item) => item.slug === slug); if (!book) notFound(); const jsonLd = { '@context': 'https://schema.org', '@type': 'Book', name: book.title, author: book.authors.map((name) => ({ '@type': 'Person', name })), publisher: { '@type': 'Organization', name: book.publisher }, description: book.description, url: absoluteSiteUrl(`/textbooks/${book.slug}`), sameAs: book.officialUrl, inLanguage: 'en' }; return <><SiteHeader /><main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><JsonLd data={jsonLd} /><Link href="/textbooks" className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">← Все учебники</Link><p className="mt-5 text-sm font-semibold text-primary sm:mt-8">CEFR {book.cefrLevels.join('–')}</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{book.title}</h1><p className="mt-3 text-muted-foreground">{book.authors.join(', ')}</p><p className="mt-5 max-w-2xl leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">{book.description}</p><dl className="mt-8 grid gap-4 rounded-xl border p-4 sm:mt-10 sm:grid-cols-2 sm:p-6"><div><dt className="text-sm text-muted-foreground">Издатель</dt><dd className="mt-1 font-semibold">{book.publisher}</dd></div><div><dt className="text-sm text-muted-foreground">Серия</dt><dd className="mt-1 font-semibold">{book.series}</dd></div><div><dt className="text-sm text-muted-foreground">Формат</dt><dd className="mt-1 font-semibold">{book.format}</dd></div><div><dt className="text-sm text-muted-foreground">Назначение</dt><dd className="mt-1 font-semibold">{book.purpose.join(', ')}</dd></div></dl><MaterialDetails material={book} /><ExternalLink href={book.officialUrl} className="mt-8 w-full justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:mt-10 sm:w-auto">Страница издателя</ExternalLink></main><SiteFooter /></>; }
