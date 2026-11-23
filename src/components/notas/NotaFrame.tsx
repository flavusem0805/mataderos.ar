import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { NotaNav } from '@/components/notas/NotaNav';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/notas', label: 'Notas' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/emprendedores', label: 'Emprendedores' },
  { href: '/#directorio', label: 'Comercios' },
  { href: '/sumate', label: 'Sumate' }
];

export function NotaFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pampa text-carbon">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-40 border-b border-pampa/20 bg-chicago text-pampa" data-surface="dark">
        <div className="editorial-container flex min-h-[64px] items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center gap-3 font-display text-2xl font-semibold uppercase tracking-tight"
          >
            <Image
              src="/logo-emblem.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 border border-pampa/40"
            />
            <span>Mataderos.ar</span>
          </Link>
          <NotaNav links={LINKS} />
        </div>
      </header>
      <main id="contenido" className="min-w-0">
        {children}
      </main>
      <footer className="border-t border-carbon/20 bg-carbon text-pampa" data-surface="dark">
        <div className="editorial-container flex min-h-[48px] flex-wrap items-center justify-between gap-4 py-4 font-mono text-sm sm:text-base">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
              Volver al portal
            </Link>
            <Link href="/sumate" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
              Sumate
            </Link>
            <Link href="/terminos" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
              Términos
            </Link>
            <Link href="/privacidad" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
              Privacidad
            </Link>
          </div>
          <span>Comuna 9 · CABA</span>
        </div>
      </footer>
    </div>
  );
}

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(LINK_RE)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    const label = match[1];
    const href = match[2];
    const external = href.startsWith('http');
    nodes.push(
      external ? (
        <a key={index} href={href} className="text-chicago underline decoration-carbon/30 underline-offset-4" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link key={index} href={href} className="text-chicago underline decoration-carbon/30 underline-offset-4">
          {label}
        </Link>
      )
    );
    last = start + match[0].length;
    index += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}
