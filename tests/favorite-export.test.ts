import { describe, expect, test } from 'bun:test';
import { formatFavoritePlan } from '../src/lib/favorite-export';

describe('favorite plan export', () => {
  test('groups saved items and creates message-friendly absolute links', () => {
    const text = formatFavoritePlan([
      { title: 'B1: Intermediate', href: '/plans/b1', type: 'Уровень CEFR', meta: 'B1' },
      { title: 'BBC Learning English', href: '/resources/bbc', type: 'Ресурс', meta: 'Аудирование' },
      { title: 'English Grammar in Use', href: '/textbooks/english-grammar-in-use', type: 'Учебник', meta: 'B1–B2' },
    ], (href) => `https://example.com/EnglishPath${href}`, 'https://example.com/EnglishPath/');

    expect(text).toBe(`📚 Мой план английского

🎯 Уровни CEFR
• B1: Intermediate · B1
https://example.com/EnglishPath/plans/b1

📖 Учебники
• English Grammar in Use · B1–B2
https://example.com/EnglishPath/textbooks/english-grammar-in-use

🔗 Ресурсы
• BBC Learning English · Аудирование
https://example.com/EnglishPath/resources/bbc

Собрано в CortexMap
https://example.com/EnglishPath/`);
  });

  test('omits empty sections', () => {
    const text = formatFavoritePlan(
      [{ title: 'IELTS', href: '/exams/ielts', type: 'Экзамен' }],
      (href) => `https://cortexmap.ru${href}`,
      'https://cortexmap.ru/',
    );

    expect(text).toContain('🎓 Экзамены');
    expect(text).not.toContain('🎯 Уровни CEFR');
    expect(text).not.toContain('📖 Учебники');
  });
});
