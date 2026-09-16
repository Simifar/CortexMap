import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
const staticExport = process.env.STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath)) throw new Error('NEXT_PUBLIC_BASE_PATH must be empty or /repository-name');
const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  distDir: staticExport ? "out" : ".next",
  basePath,
  trailingSlash: staticExport,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  experimental: { optimizePackageImports: ['lucide-react'] },
  images: { unoptimized: staticExport, formats: ['image/avif', 'image/webp'], qualities: [80] },
  ...(staticExport ? {} : { async headers() {
    return [
      ...['/', '/plans', '/plans/:level', '/exams', '/exams/:exam', '/textbooks', '/textbooks/:slug', '/resources', '/resources/:slug', '/sitemap.xml', '/robots.txt'].map((source) => ({ source, headers: [{ key: 'Cache-Control', value: 'public, s-maxage=86400, stale-while-revalidate=604800' }] })),
      {
        source: '/favorites',
        headers: [{ key: 'Cache-Control', value: 'private, no-store' }],
      },
      {
        source: '/search',
        headers: [{ key: 'Cache-Control', value: 'public, s-maxage=300, stale-while-revalidate=3600' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.(svg|png|jpg|jpeg|webp|avif|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  } }),
};

export default withBundleAnalyzer(nextConfig);
