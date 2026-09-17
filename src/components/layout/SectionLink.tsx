'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';

export function SectionLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const targetHref = `${href}#page-start`;

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = new URL(event.currentTarget.href);
    if (target.pathname !== window.location.pathname) return;

    event.preventDefault();
    window.history.replaceState(window.history.state, '', `${target.pathname}${target.search}${target.hash}`);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  return <Link href={targetHref} scroll onClick={handleClick} className={className}>{children}</Link>;
}
