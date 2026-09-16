export type FavoriteExportItem = {
  title: string;
  href: string;
  type: string;
  meta?: string;
};

const sections = [
  { type: 'Уровень CEFR', title: '🎯 Уровни CEFR' },
  { type: 'Учебник', title: '📖 Учебники' },
  { type: 'Экзамен', title: '🎓 Экзамены' },
  { type: 'Ресурс', title: '🔗 Ресурсы' },
] as const;

export function formatFavoritePlan(
  items: FavoriteExportItem[],
  absoluteHref: (href: string) => string,
  homeHref: string,
) {
  const lines = ['📚 Мой план английского'];

  for (const section of sections) {
    const sectionItems = items.filter((item) => item.type === section.type);
    if (!sectionItems.length) continue;

    lines.push('', section.title);
    for (const item of sectionItems) {
      lines.push(`• ${item.title}${item.meta ? ` · ${item.meta}` : ''}`, absoluteHref(item.href));
    }
  }

  lines.push('', 'Собрано в CortexMap', homeHref);
  return lines.join('\n');
}
