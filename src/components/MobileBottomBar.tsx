'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Home, Newspaper, Search } from 'lucide-react';

interface BottomNavItem {
  id: string;
  href: string;
  label: string;
  icon: typeof Home;
  match: (pathname: string) => boolean;
}

const ITEMS: BottomNavItem[] = [
  {
    id: 'nav-inicio',
    href: '/',
    label: 'Inicio',
    icon: Home,
    match: (pathname) => pathname === '/'
  },
  {
    id: 'nav-buscar',
    href: '/buscar',
    label: 'Buscar',
    icon: Search,
    match: (pathname) =>
      pathname === '/buscar' ||
      pathname.startsWith('/buscar/') ||
      pathname === '/emprendedores' ||
      pathname.startsWith('/emprendedores/')
  },
  {
    id: 'nav-agenda',
    href: '/agenda',
    label: 'Agenda',
    icon: Calendar,
    match: (pathname) => pathname === '/agenda' || pathname.startsWith('/agenda/')
  },
  {
    id: 'nav-notas',
    href: '/notas',
    label: 'Notas',
    icon: Newspaper,
    match: (pathname) => pathname === '/notas' || pathname.startsWith('/notas/')
  }
];

export function MobileBottomBar() {
  const pathname = usePathname() ?? '/';

  return (
    <nav
      aria-label="Navegación rápida móvil"
      data-surface="dark"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-pampa/25 bg-carbon text-pampa pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <div className="grid grid-cols-4 divide-x divide-pampa/15">
        {ITEMS.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              id={item.id}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-[60px] flex-col items-center justify-center gap-1 px-2 py-2 text-center color-field ${
                active
                  ? 'bg-chicago font-semibold text-pampa before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-pampa'
                  : 'bg-carbon text-pampa/80 hover:bg-pampa/10 hover:text-pampa'
              }`}
            >
              <Icon
                className="h-5 w-5 shrink-0"
                strokeWidth={active ? 2 : 1.5}
                aria-hidden="true"
              />
              <span className="font-mono text-xs uppercase tracking-wider leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
