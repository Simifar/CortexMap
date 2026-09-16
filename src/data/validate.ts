import { examGuideSchema, levelPlanSchema, resourceSchema, textbookSchema, type ExamGuide, type LevelPlan, type Resource, type Textbook } from './types';

export type CatalogData = { levels: LevelPlan[]; textbooks: Textbook[]; resources: Resource[]; examGuides: ExamGuide[] };
function assertUnique(records: { id: string; slug: string }[], collection: string) {
  for (const field of ['id', 'slug'] as const) {
    const values = records.map(record => record[field]);
    if (new Set(values).size !== values.length) throw new Error(`${collection}: duplicate ${field}`);
  }
}

export function validateCatalog(catalog: CatalogData) {
  const { levels, textbooks, resources, examGuides } = catalog;
  for (const [name, records, schema] of [
    ['levels', levels, levelPlanSchema], ['textbooks', textbooks, textbookSchema],
    ['resources', resources, resourceSchema], ['exams', examGuides, examGuideSchema],
  ] as const) {
    for (const record of records) schema.parse(record);
    assertUnique(records, name);
  }
  const topics = levels.flatMap(level => [...level.grammar, ...level.vocabulary, ...level.skills]);
  const records = [...levels, ...textbooks, ...resources, ...examGuides, ...topics];
  assertUnique(records, 'catalog including topics');
  const today = new Date().toISOString().slice(0, 10);
  for (const record of records) {
    if (record.reviewStatus === 'verified' && (!record.verifiedAt || !record.linkCheckedAt)) throw new Error(`${record.id}: verified content needs review and link dates`);
    if (record.reviewStatus === 'pending' && record.verifiedAt !== null) throw new Error(`${record.id}: pending content cannot claim verification`);
    for (const date of [record.verifiedAt, record.linkCheckedAt]) if (date && date > today) throw new Error(`${record.id}: future verification date`);
  }
  for (const resource of resources) {
    if ((resource.levelStatus === 'assessed') !== (resource.cefrLevels.length > 0)) throw new Error(`${resource.id}: inconsistent CEFR assessment`);
  }
  for (const exam of examGuides) {
    if (exam.levelStatus === 'family' && (!exam.familyMembers || exam.familyMembers.length === 0)) throw new Error(`${exam.id}: family exam needs non-empty familyMembers`);
    if (exam.levelStatus === 'single' && exam.familyMembers !== null) throw new Error(`${exam.id}: single exam must have null familyMembers`);
    if (exam.parts.length === 0) throw new Error(`${exam.id}: exam parts must not be empty`);
    const partIds = exam.parts.map(part => part.id);
    if (new Set(partIds).size !== partIds.length) throw new Error(`${exam.id}: duplicate exam part id`);
    if (exam.reviewStatus === 'verified') {
      const mapped = new Set(exam.scoreMapping.map(entry => entry.cefr));
      for (const level of exam.cefrLevels) if (!mapped.has(level)) throw new Error(`${exam.id}: verified exam scoreMapping must cover ${level}`);
    }
  }
  for (const item of [...textbooks, ...resources]) {
    if (item.reviewStatus === 'verified' && (!item.audience || !item.howToUse || item.limitations === null || item.registration === 'unknown')) throw new Error(`${item.id}: verified material needs guidance and access details`);
  }
  const knownBooks = new Set(textbooks.map(item => item.id));
  const knownResources = new Set(resources.map(item => item.id));
  for (const level of levels) {
    for (const id of level.textbookIds) if (!knownBooks.has(id)) throw new Error(`${level.id}: missing textbook ${id}`);
    for (const id of level.resourceIds) if (!knownResources.has(id)) throw new Error(`${level.id}: missing resource ${id}`);
    for (const topic of [...level.grammar, ...level.vocabulary, ...level.skills]) {
      if (!topic.cefrLevels.includes(level.cefrLevels[0])) throw new Error(`${topic.id}: topic does not match parent level`);
    }
  }
}
