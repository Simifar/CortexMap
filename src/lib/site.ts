export const siteUrl = new URL((process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cortexmap.ru').replace(/\/?$/, '/'));
export function absoluteSiteUrl(path: string) { return new URL(path.replace(/^\//, ''), siteUrl).toString(); }
export const siteName = 'CortexMap';
export const siteDescription = 'Справочник по IELTS, TOEFL и Cambridge English: формат экзаменов, шкалы оценивания, планы подготовки и официальные материалы.';
