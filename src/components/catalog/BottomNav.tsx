import { ClipboardList, GraduationCap, Heart, Home, LibraryBig } from 'lucide-react';
import { SectionLink } from '@/components/layout/SectionLink';

const links = [
  { href: '/', label: 'Главная', Icon: Home },
  { href: '/plans', label: 'Уровни', Icon: ClipboardList },
  { href: '/exams', label: 'Экзамены', Icon: GraduationCap },
  { href: '/resources', label: 'Ресурсы', Icon: LibraryBig },
  { href: '/favorites', label: 'Избранное', Icon: Heart },
];

const linkClass = 'group flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1.5 text-[10px] font-semibold leading-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground aria-[current=page]:shadow-sm sm:min-h-14 sm:gap-1 sm:px-2 sm:text-xs sm:leading-4';

export function BottomNav() {
  return <nav aria-label="Нижняя навигация" className="fixed inset-x-4 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-3xl border border-border/80 bg-background/90 p-2 shadow-[0_12px_32px_rgb(15_23_42/0.18)] backdrop-blur supports-[backdrop-filter]:bg-background/75">
    <div className="grid grid-cols-5 gap-1">
      {links.map(({ href, label, Icon }) => <SectionLink key={href} href={href} className={linkClass}><Icon aria-hidden="true" className="h-5 w-5 shrink-0 sm:h-4 sm:w-4" /><span className="bottom-nav-label whitespace-nowrap" style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.75rem)', lineHeight: '0.75rem' }}>{label}</span></SectionLink>)}
    </div>
  </nav>;
}
