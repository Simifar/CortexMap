import type { MetadataRoute } from 'next';
import { withBasePath } from '@/lib/paths';
import { siteDescription, siteName } from '@/lib/site';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — справочник по английскому языку`,
    short_name: siteName,
    description: siteDescription,
    start_url: withBasePath('/'),
    scope: withBasePath('/'),
    display: 'standalone',
    background_color: '#fbfaf6',
    theme_color: '#102f61',
    lang: 'ru',
    orientation: 'any',
    categories: ['education', 'reference'],
    icons: [
      {
        src: withBasePath('/icons/icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icons/icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: withBasePath('/icons/icon-maskable-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
