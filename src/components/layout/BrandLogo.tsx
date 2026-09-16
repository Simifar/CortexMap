import type { SVGProps } from 'react';

export function BrandMark({ className = 'h-8 w-8', ...props }: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className} {...props}>
    <path d="M8 16v35c9-1 17 1 24 7V24C25 18 17 15 8 16Zm48 0v35c-9-1-17 1-24 7V24c7-6 15-9 24-8Z" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 24V12m0 12C27 18 21 15 14 15m18 9c5-6 11-9 18-9M32 35c-5-5-10-8-16-8m16 8c5-5 10-8 16-8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="32" cy="8" r="5.5" fill="#2f80ed" />
    <circle cx="16" cy="27" r="4.5" fill="#9ed0ff" />
    <circle cx="48" cy="27" r="4.5" fill="#2f80ed" />
  </svg>;
}

export function BrandLogo({ className = '', hideNameOnSmallScreens = false }: { className?: string; hideNameOnSmallScreens?: boolean }) {
  return <span className={`inline-flex items-center gap-2 ${className}`}><BrandMark className="h-8 w-8 shrink-0" /><span className={`${hideNameOnSmallScreens ? 'hidden min-[360px]:inline' : ''} font-extrabold tracking-tight`}>CortexMap</span></span>;
}
