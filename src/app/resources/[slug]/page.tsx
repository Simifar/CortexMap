import { MaterialDetails } from '@/components/content/MaterialDetails';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from '@/components/content/ExternalLink';
import { resources } from '@/data';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { resourceCategoryLabels } from '@/lib/catalog-labels';
type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return resources.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const { slug } = await params; const resource = resources.find((item) => item.slug === slug); return resource ? { title: resource.title, description: resource.description, alternates: { canonical: `/resources/${resource.slug}` }, openGraph: { title: resource.title, description: resource.description } } : { title: 'Ресурс не найден', robots: { index: false } }; }
export default async function ResourcePage({ params }: PageProps) { const { slug } = await params; const resource = resources.find((item) => item.slug === slug); if (!resource) notFound(); return <><SiteHeader /><main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><Link href="/resources" className="inline-flex min-h-11 items-center text-sm font-medium text-primary hover:underline">← К каталогу ресурсов</Link><p className="mt-5 text-sm font-semibold text-primary sm:mt-8">{resourceCategoryLabels[resource.category]}</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{resource.title}</h1><p className="mt-5 max-w-2xl leading-7 text-muted-foreground sm:text-lg sm:leading-8">{resource.description}</p><p className="mt-6 text-sm leading-6 text-muted-foreground">{resource.cefrLevels.length ? `Уровни CEFR: ${resource.cefrLevels.join(', ')}.` : 'Ресурс не привязан к конкретному уровню CEFR.'}</p><MaterialDetails material={resource} /><ExternalLink href={resource.officialUrl} className="mt-8 w-full justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 sm:mt-10 sm:w-auto">Открыть официальный сайт</ExternalLink></main><SiteFooter /></>; }
