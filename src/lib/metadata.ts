import type { Metadata } from 'next';
import { absoluteSiteUrl, siteName } from './site';

type RouteMetadataOptions = {
  title: string;
  description: string;
  path: string;
  robots?: Metadata['robots'];
};

export function createRouteMetadata({ title, description, path, robots }: RouteMetadataOptions): Metadata {
  const url = absoluteSiteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName,
      title,
      description,
      url,
      images: [absoluteSiteUrl('opengraph-image.png')],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteSiteUrl('opengraph-image.png')],
    },
    ...(robots ? { robots } : {}),
  };
}
