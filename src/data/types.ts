import { z } from 'zod';

export const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export type CefrLevel = (typeof cefrLevels)[number];
export const accessStatuses = ['free', 'paid', 'mixed'] as const;
export type AccessStatus = (typeof accessStatuses)[number];
export const resourceCategories = ['grammar', 'reading', 'listening', 'speaking', 'dictionary', 'practice', 'pronunciation', 'exams'] as const;
export type ResourceCategory = (typeof resourceCategories)[number];
export const skillAreas = ['grammar', 'vocabulary', 'reading', 'listening', 'speaking', 'writing', 'pronunciation'] as const;

const text = z.string().trim().min(1);
const id = text.regex(/^[a-z0-9-]+$/);
export const officialUrlSchema = z.url().refine((value) => {
  const url = new URL(value);
  return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
}, 'Use an HTTP(S) URL without embedded credentials');
const ids = z.array(id).refine((values) => new Set(values).size === values.length, 'Duplicate reference');
const levelList = z.array(z.enum(cefrLevels)).refine((values) => new Set(values).size === values.length, 'Duplicate CEFR level');
const reviewFields = {
  reviewStatus: z.enum(['pending', 'verified']),
  verifiedAt: z.iso.date().nullable(),
  linkCheckedAt: z.iso.date().nullable(),
};
const commonSchema = z.object({
  id, slug: id, title: text, description: text,
  cefrLevels: levelList.nonempty(), tags: z.array(text),
  access: z.enum(accessStatuses), officialUrl: officialUrlSchema,
  ...reviewFields,
});
const guidanceFields = {
  audience: text.nullable(),
  howToUse: text.nullable(),
  // Null means not assessed; [] means reviewed with no known limitations.
  limitations: z.array(text).nullable(),
  registration: z.enum(['yes', 'no', 'unknown']),
};

export const topicSchema = commonSchema.extend({ details: z.array(text).optional() });
export const levelPlanSchema = commonSchema.extend({
  fullName: text, cefrLevels: z.tuple([z.enum(cefrLevels)]),
  duration: text, color: text, icon: text,
  grammar: z.array(topicSchema), vocabulary: z.array(topicSchema), skills: z.array(topicSchema),
  textbookIds: ids, resourceIds: ids,
});
export const textbookSchema = commonSchema.extend({
  ...guidanceFields,
  authors: z.array(text).nonempty(), publisher: text, series: text,
  format: text, purpose: z.array(text).nonempty(),
  edition: text.nullable(), hasAnswers: z.enum(['yes', 'no', 'unknown']),
});
const examPartSchema = z.object({
  id, title: text,
  duration: text.nullable(),
  questionCount: z.number().int().positive().nullable(),
  taskTypes: z.array(text),
  scoreShare: z.number().min(0).max(100).nullable(),
});
const scoreScaleSchema = z.object({
  min: z.number(), max: z.number(), goodFrom: z.number().optional(),
  unit: text, note: text.nullable(),
});
const scoreMappingSchema = z.object({ cefr: z.enum(cefrLevels), score: text });
const examRegistrationSchema = z.object({
  costNote: text.nullable(), frequency: text.nullable(),
  format: text.nullable(), website: officialUrlSchema,
});
const familyMemberSchema = z.object({ id, slug: id, title: text, cefrLevels: levelList });
export const examGuideSchema = commonSchema.extend({
  officialName: text, organization: text,
  familySlug: z.string().regex(/^[a-z0-9-]+$/).nullable(),
  levelStatus: z.enum(['single', 'family']),
  familyMembers: z.array(familyMemberSchema).nullable(),
  duration: text,
  scoreScale: scoreScaleSchema.nullable(),
  scoreMapping: z.array(scoreMappingSchema),
  validity: text.nullable(),
  registration: examRegistrationSchema.nullable(),
  parts: z.array(examPartSchema).nonempty(),
  preparationStrategy: z.array(z.object({ phase: text, focus: text })).nonempty(),
  officialMaterials: z.array(z.object({ title: text, url: officialUrlSchema })).nonempty(),
});
export const resourceSchema = commonSchema.extend({
  ...guidanceFields,
  category: z.enum(resourceCategories),
  cefrLevels: levelList,
  levelStatus: z.enum(['unassessed', 'assessed']),
  format: text.nullable(),
  skillAreas: z.array(z.enum(skillAreas)),
});

export type Topic = z.infer<typeof topicSchema>;
export type LevelPlan = z.infer<typeof levelPlanSchema>;
export type Textbook = z.infer<typeof textbookSchema>;
export type ExamGuide = z.infer<typeof examGuideSchema>;
export type Resource = z.infer<typeof resourceSchema>;
