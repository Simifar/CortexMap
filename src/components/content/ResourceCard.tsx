import type { Resource } from '@/data';
import { accessStatusLabels, resourceCategoryLabels } from '@/lib/catalog-labels';
import { ContentCard } from './ContentCard';
export function ResourceCard({ resource }: { resource: Resource }) { return <ContentCard href={`/resources/${resource.slug}`} favoriteId={resource.id} eyebrow={resourceCategoryLabels[resource.category]} title={resource.title} description={resource.description}><span className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${resource.access === 'free' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{accessStatusLabels[resource.access]}</span></ContentCard>; }
