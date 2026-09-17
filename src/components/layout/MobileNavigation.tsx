import Link from 'next/link';

type NavigationLink = {
  href: string;
  label: string;
};

export function MobileNavigation({ links }: { links: NavigationLink[] }) {
  return <details className="group sm:hidden">
    <summary
      aria-label="Меню разделов"
      className="inline-flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-5 w-5 group-open:hidden">
        <path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="hidden h-5 w-5 group-open:block">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
      </svg>
    </summary>
    <span aria-hidden="true" className="pointer-events-none fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-40 bg-foreground/10" />
    <nav
      aria-label="Основная навигация"
      className="fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] z-50 border-b border-border bg-background p-4 shadow-lg"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2">
        {links.map((link) => <Link
          key={link.href}
          href={link.href}
          className="flex min-h-12 items-center justify-center rounded-lg border border-border bg-card px-3 text-center text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2"
        >{link.label}</Link>)}
      </div>
    </nav>
  </details>;
}
