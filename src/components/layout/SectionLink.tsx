'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SectionLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const pathname = usePathname();
  const targetHref = `${href}#page-start`;
  const currentPath = pathname.replace(/\/$/, '') || '/';
  const targetPath = href.replace(/\/$/, '') || '/';
  const isActive = currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = new URL(event.currentTarget.href);
    if (target.pathname !== window.location.pathname) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, '', `${target.pathname}${target.search}${target.hash}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  return <Link href={targetHref} scroll onClick={handleClick} aria-current={isActive ? 'page' : undefined} className={className}>{children}</Link>;
}
