'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  href: string;
  label: string;
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href.startsWith('/#')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NotaNav({ links }: { links: NavItem[] }) {
  const pathname = usePathname() ?? '/';

  return (
    <>
      <nav aria-label="Secciones" className="hidden items-center gap-1 lg:flex">
        {links.map((link) => {
          const active = isActivePath(pathname, link.href);
          if (link.href === '/sumate') {
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`ml-2 inline-flex min-h-[48px] items-center rounded-[4px] border px-4 text-base font-semibold color-field ${
                  active
                    ? 'border-pampa bg-pampa text-chicago'
                    : 'border-pampa/50 hover:bg-pampa hover:text-chicago'
                }`}
              >
                {link.label}
              </Link>
            );
          }
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex min-h-[48px] items-center px-3 text-base font-medium underline-offset-4 hover:underline ${
                active ? 'underline font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <details className="relative lg:hidden">
        <summary className="flex min-h-[48px] cursor-pointer list-none items-center px-3 font-semibold [&::-webkit-details-marker]:hidden">
          Menú
        </summary>
        <nav
          aria-label="Secciones"
          className="absolute right-0 z-50 mt-1 w-[min(18rem,80vw)] border border-pampa/30 bg-chicago-dark"
        >
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-[48px] items-center border-t border-pampa/15 px-4 ${
                  active ? 'bg-pampa/15 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </details>
    </>
  );
}
