import Link from 'next/link';
import { SearchInput } from '@/components/catalog/SearchInput';
import { withBasePath } from '@/lib/paths';
import { Container } from './Container';
import { BrandLogo } from './BrandLogo';

export function SiteHeader() {
  return <>
    <a href="#page-start" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground">Перейти к содержимому</a>
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgb(0_0_0/0.02)] backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex items-center gap-3 py-2 sm:h-16 sm:py-0">
        <Link href="/" aria-label="CortexMap — на главную" className="shrink-0 rounded-md text-primary focus-visible:outline-2 focus-visible:outline-offset-4">
          <BrandLogo hideNameOnSmallScreens />
        </Link>
        <form action={withBasePath('/search/')} role="search" className="min-w-0 flex-1">
          <SearchInput compact />
        </form>
      </Container>
    </header>
    <span id="page-start" tabIndex={-1} aria-hidden="true" className="block scroll-mt-32 outline-none sm:scroll-mt-20" />
  </>;
}
