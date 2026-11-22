import Link from 'next/link';
import type { ReactNode } from 'react';

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/notas', label: 'Notas' },
  { href: '/notas/feria-de-mataderos', label: 'Feria' },
  { href: '/notas/que-hacer-en-mataderos', label: 'Qué hacer' },
  { href: '/notas/historia-de-mataderos', label: 'Historia' },
  { href: '/#directorio', label: 'Comercios' }
];

export function NotaFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pampa text-carbon">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="sticky top-0 z-40 border-b border-pampa/20 bg-chicago text-pampa" data-surface="dark">
        <div className="editorial-container flex min-h-[64px] items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-h-[48px] items-center font-display text-2xl font-semibold uppercase">
            Mataderos.ar
          </Link>
          <nav aria-label="Secciones" className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="inline-flex min-h-[48px] items-center px-3 text-base font-medium">
                {link.label}
              </Link>
            ))}
          </nav>
          <details className="relative lg:hidden">
            <summary className="flex min-h-[48px] cursor-pointer list-none items-center px-3 font-semibold [&::-webkit-details-marker]:hidden">
              Menú
            </summary>
            <nav aria-label="Secciones" className="absolute right-0 z-50 mt-1 w-[min(18rem,80vw)] border border-pampa/30 bg-chicago-dark">
              {LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="flex min-h-[48px] items-center border-t border-pampa/15 px-4">
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <main id="contenido" className="min-w-0">
        {children}
      </main>
      <footer className="border-t border-carbon/20 bg-carbon text-pampa" data-surface="dark">
        <div className="editorial-container flex min-h-[48px] flex-wrap items-center justify-between gap-3 py-4 font-mono text-base">
          <Link href="/" className="inline-flex min-h-[48px] items-center">
            Volver al portal
          </Link>
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
