import Link from 'next/link';
import { Heart, Search } from 'lucide-react';
import { Container } from './Container';
import { BrandLogo } from './BrandLogo';
import { SectionLink } from './SectionLink';

const links = [{ href: '/plans', label: 'Уровни' }, { href: '/exams', label: 'Экзамены' }, { href: '/textbooks', label: 'Учебники' }, { href: '/resources', label: 'Ресурсы' }];
const linkClass = 'flex min-w-0 items-center justify-center whitespace-nowrap rounded-md px-1 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-2.5 sm:text-sm';

export function SiteHeader() {
  return <>
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] shadow-[0_1px_0_rgb(0_0_0/0.02)] backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <Container className="flex flex-wrap items-center gap-1 py-2 sm:h-16 sm:flex-nowrap sm:gap-4 sm:py-0">
        <Link href="/" aria-label="CortexMap — на главную" className="shrink-0 rounded-md text-primary focus-visible:outline-2 focus-visible:outline-offset-4">
          <BrandLogo hideNameOnSmallScreens />
        </Link>
        <nav aria-label="Основная навигация" className="order-3 grid w-full grid-cols-4 sm:order-none sm:flex sm:min-w-0 sm:flex-1">
          {links.map((link) => <SectionLink key={link.href} href={link.href} className={linkClass}>{link.label}</SectionLink>)}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:ml-0">
          <Link href="/search" aria-label="Поиск" className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2">
            <Search aria-hidden="true" className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden xl:inline">Поиск</span>
          </Link>
          <Link href="/favorites" aria-label="Избранное" className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
            <Heart aria-hidden="true" className="h-5 w-5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </Container>
    </header>
    <span id="page-start" aria-hidden="true" className="block scroll-mt-32 sm:scroll-mt-20" />
  </>;
}
