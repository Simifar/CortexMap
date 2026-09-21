const defaultSiteUrl = 'https://simifar.github.io/CortexMap/';

export function parseSiteUrl(value: string): URL {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid HTTP(S) URL without credentials, query, or fragment');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a valid HTTP(S) URL without credentials, query, or fragment');
  }

  url.pathname = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
  return url;
}

export const siteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl);
export function absoluteSiteUrl(path: string) { return new URL(path.replace(/^\/+/, ''), siteUrl).toString(); }
export const siteName = 'CortexMap';
export const siteDescription = 'Справочник по IELTS, TOEFL и Cambridge English: формат экзаменов, шкалы оценивания, планы подготовки и официальные материалы.';
