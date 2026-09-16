import type { AccessStatus, ResourceCategory } from '@/data';

export const resourceCategoryLabels: Record<ResourceCategory, string> = {
  grammar: 'Грамматика',
  reading: 'Чтение',
  listening: 'Аудирование',
  speaking: 'Говорение',
  dictionary: 'Словари',
  practice: 'Тренировка',
  pronunciation: 'Произношение',
  exams: 'Экзамены',
};

export const accessStatusLabels: Record<AccessStatus, string> = {
  free: 'Бесплатно',
  paid: 'Платный доступ',
  mixed: 'Есть бесплатные и платные возможности',
};
