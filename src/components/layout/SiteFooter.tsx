import Link from 'next/link';
import { Container } from './Container';
import { BrandLogo } from './BrandLogo';
import { SectionLink } from './SectionLink';

const links = [{ href: '/plans', label: 'Уровни CEFR' }, { href: '/exams', label: 'Экзамены' }, { href: '/textbooks', label: 'Учебники' }, { href: '/resources', label: 'Ресурсы' }];

export function SiteFooter() {
  return <footer className="mt-auto border-t bg-muted/35 pb-[env(safe-area-inset-bottom)]">
    <Container className="grid gap-5 py-8 text-sm text-muted-foreground sm:grid-cols-[1fr_auto] sm:py-10">
      <div>
        <Link href="/" aria-label="CortexMap — на главную" className="inline-flex rounded-md text-primary focus-visible:outline-2 focus-visible:outline-offset-4"><BrandLogo /></Link>
        <p className="mt-2 max-w-md leading-6">Справочник по подготовке к IELTS, TOEFL и экзаменам Cambridge English.</p>
      </div>
      <nav aria-label="Навигация в подвале" className="grid grid-cols-2 gap-x-5 gap-y-3 min-[420px]:flex min-[420px]:flex-wrap sm:justify-end">
        {links.map((link) => <SectionLink key={link.href} href={link.href} className="inline-flex min-h-11 items-center hover:text-primary hover:underline min-[420px]:min-h-0">{link.label}</SectionLink>)}
      </nav>
    </Container>
  </footer>;
}
