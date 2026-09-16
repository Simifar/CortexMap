import { expect, test } from 'bun:test';
import { levels, textbooks, resources, examGuides } from '../src/data';
import { validateCatalog } from '../src/data/validate';
import { officialUrlSchema } from '../src/data/types';
import baseline from '../docs/catalog-baseline.json';
import before from '../docs/catalog-before-model-migration.json';
const catalog = { levels, textbooks, resources, examGuides };
const copy = () => structuredClone(catalog);

test('every published record has current review metadata', () => {
  const topics = levels.flatMap((level) => [...level.grammar, ...level.vocabulary, ...level.skills]);
  const records = [...levels, ...topics, ...textbooks, ...resources, ...examGuides];
  expect(records.length).toBe(144);
  expect(records.every((record) => record.reviewStatus === 'verified')).toBe(true);
  expect(records.every((record) => record.verifiedAt === '2026-09-16' && record.linkCheckedAt === '2026-09-16')).toBe(true);
});

test('migration preserves every published ID and URL', () => {
  const collections = { levels, textbooks, resources, exams: examGuides };
  const prefixes = { levels: '/plans/', textbooks: '/textbooks/', resources: '/resources/', exams: '/exams/' };
  const current = Object.entries(collections).flatMap(([collection, records]) => records.map(({ id, slug }) => ({ collection, id, slug, url: prefixes[collection as keyof typeof prefixes] + slug })));
  expect(current).toEqual(expect.arrayContaining(baseline));
  for (const oldLevel of before.levels) {
    const level = levels.find(item => item.id === oldLevel.id)!;
    expect(level.textbookIds).toEqual(expect.arrayContaining(oldLevel.textbookIds));
    const topics = [...level.grammar, ...level.vocabulary, ...level.skills].map(topic => topic.id);
    expect(topics).toEqual(expect.arrayContaining([...oldLevel.grammar, ...oldLevel.vocabulary, ...oldLevel.skills].map(topic => topic.id)));
  }
});
test('titles can change independently of IDs, slugs and level references', () => {
  const changed = copy(); changed.textbooks[0].title = 'Новое название книги'; changed.resources[0].title = 'Новое название ресурса';
  expect(() => validateCatalog(changed)).not.toThrow();
  expect(changed.textbooks[0].id).toBe(textbooks[0].id);
  expect(changed.textbooks[0].slug).toBe(textbooks[0].slug);
  expect(changed.levels[0].textbookIds).toEqual(levels[0].textbookIds);
});
test('validation rejects missing or repeated relationships', () => {
  for (const kind of ['textbookIds', 'resourceIds'] as const) {
    const changed = copy(); changed.levels[0][kind] = ['missing'];
    expect(() => validateCatalog(changed)).toThrow();
    changed.levels[0][kind] = kind === 'textbookIds' ? [textbooks[0].id, textbooks[0].id] : [resources[0].id, resources[0].id];
    expect(() => validateCatalog(changed)).toThrow();
  }
  const linked = copy(); linked.levels[0].resourceIds = [resources[0].id];
  expect(() => validateCatalog(linked)).not.toThrow();
});
test('topic IDs are unique across all levels and cannot collide with catalog IDs', () => {
  const changed = copy(); changed.levels[1].grammar[0].id = changed.levels[0].grammar[0].id;
  expect(() => validateCatalog(changed)).toThrow('duplicate id');
  changed.levels[1].grammar[0].id = changed.resources[0].id;
  expect(() => validateCatalog(changed)).toThrow('duplicate id');
});
test('material URLs reject unsafe schemes and credentials', () => {
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'file:///tmp/book', 'ftp://example.com/book', 'https://name:password@example.com']) expect(officialUrlSchema.safeParse(url).success).toBe(false);
  expect(officialUrlSchema.safeParse('https://example.com/book').success).toBe(true);
  const changed = copy(); changed.examGuides[0].officialMaterials[0].url = 'javascript:alert(1)';
  expect(() => validateCatalog(changed)).toThrow();
});
test('unassessed CEFR levels and missing review dates are explicit', () => {
  expect(resources.every(resource => resource.cefrLevels.length === 0 && resource.levelStatus === 'unassessed')).toBe(true);
  const changed = copy(); changed.resources[0].cefrLevels = ['B1'];
  expect(() => validateCatalog(changed)).toThrow('CEFR');
  changed.resources[0].levelStatus = 'assessed'; expect(() => validateCatalog(changed)).not.toThrow();
  changed.resources[0].reviewStatus = 'verified'; changed.resources[0].verifiedAt = null; expect(() => validateCatalog(changed)).toThrow('dates');
});
test('verified records need guidance, dated review and explicit access details', () => {
  const changed = copy(); const resource = changed.resources[0];
  resource.reviewStatus = 'verified'; resource.verifiedAt = '2026-09-09'; resource.linkCheckedAt = '2026-09-09';
  resource.audience = null; resource.howToUse = null; resource.limitations = null; resource.registration = 'unknown';
  expect(() => validateCatalog(changed)).toThrow('guidance');
  resource.audience = 'Описание аудитории'; resource.howToUse = 'Рекомендация по использованию'; resource.limitations = []; resource.registration = 'no';
  expect(() => validateCatalog(changed)).not.toThrow();
  resource.verifiedAt = '2099-01-01'; expect(() => validateCatalog(changed)).toThrow('future');
});
test('exam family status matches familyMembers', () => {
  const single = copy(); single.examGuides[0].familyMembers = [{ id: 'member', slug: 'member', title: 'Участник', cefrLevels: ['B2'] }];
  expect(() => validateCatalog(single)).toThrow('familyMembers');
  const family = copy(); family.examGuides[0].levelStatus = 'family'; family.examGuides[0].familyMembers = null;
  expect(() => validateCatalog(family)).toThrow('familyMembers');
  const empty = copy(); empty.examGuides[0].levelStatus = 'family'; empty.examGuides[0].familyMembers = [];
  expect(() => validateCatalog(empty)).toThrow('familyMembers');
  const valid = copy(); valid.examGuides[0].levelStatus = 'family'; valid.examGuides[0].familyMembers = [{ id: 'member', slug: 'member', title: 'Участник', cefrLevels: ['B2'] }];
  expect(() => validateCatalog(valid)).not.toThrow();
});
test('exam parts are non-empty with unique ids', () => {
  const empty = copy(); empty.examGuides[0].parts = [];
  expect(() => validateCatalog(empty)).toThrow();
  const dup = copy(); dup.examGuides[0].parts[1].id = dup.examGuides[0].parts[0].id;
  expect(() => validateCatalog(dup)).toThrow('part id');
});
test('verified exams need scoreMapping for every declared CEFR level', () => {
  const pending = copy(); pending.examGuides[0].reviewStatus = 'pending'; pending.examGuides[0].verifiedAt = null; pending.examGuides[0].scoreMapping = [];
  expect(() => validateCatalog(pending)).not.toThrow();
  const verified = copy(); const exam = verified.examGuides[0];
  exam.reviewStatus = 'verified'; exam.verifiedAt = '2026-09-09'; exam.linkCheckedAt = '2026-09-09';
  exam.scoreMapping = [];
  expect(() => validateCatalog(verified)).toThrow('scoreMapping');
  exam.scoreMapping = exam.cefrLevels.map((cefr) => ({ cefr, score: 'см. шкалу' }));
  expect(() => validateCatalog(verified)).not.toThrow();
});
test('exam registration website must be an official URL', () => {
  const changed = copy();
  changed.examGuides[0].registration = { costNote: null, frequency: null, format: null, website: 'javascript:alert(1)' };
  expect(() => validateCatalog(changed)).toThrow();
});
