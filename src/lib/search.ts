import { examGuides, levels, resources, textbooks, type CefrLevel, type ResourceCategory } from '@/data';
import type { CatalogFilters, CatalogType } from './catalog-filters';

export type SearchResult = { id: string; type: CatalogType; title: string; description: string; href: string; cefrLevels: CefrLevel[]; category?: ResourceCategory; access: 'free' | 'paid' | 'mixed' };
type IndexedSearchResult = SearchResult & { normalizedTitle: string; normalizedDescription: string; normalizedTerms: string[] };
const normalize = (value: string) => value.trim().toLocaleLowerCase('ru-RU');
const terms = (value: string) => normalize(value).split(/\s+/).filter(Boolean);
const createResult = (result: SearchResult, searchTerms: string[]): IndexedSearchResult => ({
  ...result,
  normalizedTitle: normalize(result.title),
  normalizedDescription: normalize(result.description),
  normalizedTerms: searchTerms.map(normalize),
});

export const searchIndex: IndexedSearchResult[] = [
  ...levels.map((level) => createResult({ id: level.id, type: 'level' as const, title: `${level.title}: ${level.fullName}`, description: level.description, href: `/plans/${level.slug}`, cefrLevels: level.cefrLevels, access: level.access }, [level.title, level.fullName, ...level.tags, ...level.cefrLevels])),
  ...levels.flatMap((level) => [...level.grammar, ...level.vocabulary, ...level.skills].map((topic) => createResult({ id: topic.id, type: 'topic' as const, title: topic.title, description: topic.description, href: `/plans/${level.slug}#${topic.id}`, cefrLevels: topic.cefrLevels, access: topic.access }, [topic.title, topic.description, ...topic.tags, ...topic.cefrLevels]))),
  ...textbooks.map((book) => createResult({ id: book.id, type: 'textbook' as const, title: book.title, description: book.description, href: `/textbooks/${book.slug}`, cefrLevels: book.cefrLevels, access: book.access }, [book.title, book.description, ...book.tags, ...book.purpose, book.series, book.publisher, ...book.authors, ...book.cefrLevels])),
  ...examGuides.map((exam) => createResult({ id: exam.id, type: 'exam' as const, title: exam.title, description: exam.description, href: `/exams/${exam.slug}`, cefrLevels: exam.cefrLevels, access: exam.access }, [exam.title, exam.description, exam.officialName, exam.organization, exam.duration, exam.validity ?? '', ...(exam.scoreScale ? [String(exam.scoreScale.min), String(exam.scoreScale.max), exam.scoreScale.unit, exam.scoreScale.note ?? ''] : []), ...exam.scoreMapping.flatMap((mapping) => [mapping.cefr, mapping.score]), ...exam.tags, ...exam.parts.flatMap((part) => [part.title, ...part.taskTypes]), ...(exam.familyMembers?.map((member) => member.title) ?? []), ...exam.cefrLevels])),
  ...resources.map((resource) => createResult({ id: resource.id, type: 'resource' as const, title: resource.title, description: resource.description, href: `/resources/${resource.slug}`, cefrLevels: resource.cefrLevels, category: resource.category, access: resource.access }, [resource.title, resource.description, resource.category, ...resource.tags, ...resource.cefrLevels])),
];

function score(result: IndexedSearchResult, queryTerms: string[]) {
  let total = 0;
  for (const term of queryTerms) {
    if (result.normalizedTitle === term) total += 100;
    else if (result.normalizedTitle.includes(term)) total += 50;
    else if (result.normalizedDescription.includes(term)) total += 20;
    else if (result.normalizedTerms.some((value) => value.includes(term))) total += 10;
    else return null;
  }
  return total;
}
export function searchCatalog(filters: CatalogFilters) {
  const queryTerms = terms(filters.q);
  return searchIndex
    .filter((result) => (!filters.level || result.cefrLevels.includes(filters.level)) && (!filters.type || result.type === filters.type) && (!filters.category || result.category === filters.category) && (filters.free === undefined || (filters.free ? result.access === 'free' : result.access !== 'free')))
    .map((result) => ({ result, score: queryTerms.length ? score(result, queryTerms) : 0 }))
    .filter((entry): entry is { result: IndexedSearchResult; score: number } => entry.score !== null)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title, 'ru'))
    .map(({ result }) => result);
}
