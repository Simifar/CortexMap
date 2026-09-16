import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { withBasePath } from '@/lib/paths';
import { absoluteSiteUrl, siteDescription, siteName, siteUrl } from '@/lib/site';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap', preload: true });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteName, template: `%s — ${siteName}` },
  description: siteDescription,
  icons: { icon: withBasePath('/logo.svg'), shortcut: withBasePath('/logo.svg'), apple: withBasePath('/logo.svg') },
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'ru_RU', siteName, title: siteName, description: siteDescription, url: '/', images: [absoluteSiteUrl('opengraph-image.png')] },
  twitter: { card: 'summary_large_image', title: siteName, description: siteDescription, images: [absoluteSiteUrl('opengraph-image.png')] },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru" translate="no" suppressHydrationWarning><body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>{children}</body></html>;
}
