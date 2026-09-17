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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

export function formatFavoritePlanHtml(
  items: FavoriteExportItem[],
  absoluteHref: (href: string) => string,
  homeHref: string,
) {
  const parts = ['<div><strong>📚 Мой план английского</strong></div>'];

  for (const section of sections) {
    const sectionItems = items.filter((item) => item.type === section.type);
    if (!sectionItems.length) continue;

    parts.push(`<br><div><strong>${section.title}</strong></div>`);
    for (const item of sectionItems) {
      const title = escapeHtml(item.title);
      const meta = item.meta ? ` · ${escapeHtml(item.meta)}` : '';
      const href = escapeHtml(absoluteHref(item.href));
      parts.push(`<div>• <a href="${href}">${title}</a>${meta}</div>`);
    }
  }

  parts.push(`<br><div>Собрано в <a href="${escapeHtml(homeHref)}">CortexMap</a></div>`);
  return parts.join('');
}
