'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Foto } from '@/lib/notas/media';

export type GuiaSlug = 'actualidad' | 'historia' | 'feria' | 'que-hacer' | 'patrimonio' | 'cultura';

export interface NotaCardData {
  slug: string;
  title: string;
  extracto: string;
  fechaLabel: string;
  readMinutes: number;
  type: 'pilar' | 'satelite' | 'actualidad';
  category: string;
  guiaSlug?: GuiaSlug;
  guiaLabel?: string;
  filterSlugs: GuiaSlug[];
  placeLabel?: string;
  foto?: Foto;
}

export interface GuiaSummaryData {
  slug: GuiaSlug;
  label: string;
  pilarSlug: string;
  pilarTitle: string;
  category: string;
  totalLabel: string;
  foto?: Foto;
  placeLabel?: string;
}

export interface FiltroItem {
  slug: '' | GuiaSlug;
  label: string;
  href: string;
}

const CAMPOS: Record<GuiaSlug, string> = {
  actualidad: 'bg-cuero',
  historia: 'bg-chicago',
  feria: 'bg-ladrillo',
  'que-hacer': 'bg-cuero',
  patrimonio: 'bg-carbon',
  cultura: 'bg-chicago-dark'
};

function MarcaGuia({ nota }: { nota: NotaCardData }) {
  return (
    <p className="font-mono text-base text-chicago">
      {nota.type === 'actualidad' ? (
        <>
          <span className="border-b border-current">Actualidad</span>
          <span aria-hidden="true"> · </span>
          {nota.category === 'Actualidad' ? (nota.guiaLabel ?? 'Agenda') : nota.category}
        </>
      ) : (
        <>
          {nota.guiaLabel ?? nota.category}
          {nota.type === 'pilar' && (
            <>
              <span aria-hidden="true"> · </span>
              <span className="border-b border-current">Guía</span>
            </>
          )}
        </>
      )}
    </p>
  );
}

function FiguraCard({
  foto,
  campoKey,
  topLabel,
  bottomLabel,
  sizes,
  priority = false,
  className = 'aspect-[3/2]'
}: {
  foto?: Foto;
  campoKey: GuiaSlug;
  topLabel: string;
  bottomLabel: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (!foto) {
    return (
      <div
        aria-hidden="true"
        className={`flex flex-col justify-between p-5 text-pampa ${CAMPOS[campoKey]} ${className}`}
      >
        <span className="font-mono text-sm uppercase tracking-wider text-pampa/80">{topLabel}</span>
        <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold uppercase leading-[0.95]">
          {bottomLabel}
        </span>
      </div>
    );
  }

  return (
    <span className={`relative block w-full overflow-hidden bg-pampa-deep ${className}`}>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${foto.objectPosition ?? 'object-center'}`}
      />
    </span>
  );
}

function NotaDestacada({ nota }: { nota: NotaCardData }) {
  const campoKey: GuiaSlug = nota.type === 'actualidad' ? 'actualidad' : (nota.guiaSlug ?? 'historia');
  return (
    <article className="border border-carbon/25 bg-pampa-surface">
      <Link
        href={`/notas/${nota.slug}`}
        className="grid color-field hover:bg-pampa-deep lg:grid-cols-12"
      >
        <FiguraCard
          foto={nota.foto}
          campoKey={campoKey}
          topLabel={nota.placeLabel ?? nota.guiaLabel ?? nota.category}
          bottomLabel={nota.category}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[3/2] lg:col-span-7 lg:aspect-auto lg:min-h-[340px]"
        />
        <div className="flex flex-col justify-between p-5 sm:p-8 lg:col-span-5">
          <div>
            <MarcaGuia nota={nota} />
            <h2 className="mt-2 font-serif text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-tight">
              {nota.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-base leading-relaxed">{nota.extracto}</p>
          </div>
          <p className="mt-6 font-mono text-base">
            <span>{nota.fechaLabel}</span>
            <span aria-hidden="true"> · </span>
            <span>{nota.readMinutes} min de lectura</span>
          </p>
          <span className="inline-flex min-h-[48px] items-center font-semibold text-chicago">Leer nota</span>
        </div>
      </Link>
    </article>
  );
}

function TarjetaNota({ nota }: { nota: NotaCardData }) {
  const campoKey: GuiaSlug = nota.type === 'actualidad' ? 'actualidad' : (nota.guiaSlug ?? 'historia');
  return (
    <li className="min-w-0 border border-carbon/25 bg-pampa-surface">
      <Link href={`/notas/${nota.slug}`} className="flex h-full flex-col color-field hover:bg-pampa-deep">
        <FiguraCard
          foto={nota.foto}
          campoKey={campoKey}
          topLabel={nota.placeLabel ?? nota.guiaLabel ?? nota.category}
          bottomLabel={nota.category}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
        />
        <span className="flex flex-1 flex-col p-4">
          <MarcaGuia nota={nota} />
          <h3 className="mt-2 font-serif text-[1.35rem] font-semibold leading-snug">{nota.title}</h3>
          <p className="mt-2 line-clamp-2 text-base leading-relaxed">{nota.extracto}</p>
          <p className="mt-auto pt-4 font-mono text-base">
            {nota.fechaLabel}
            <span aria-hidden="true"> · </span>
            {nota.readMinutes} min de lectura
          </p>
          <span className="inline-flex min-h-[48px] items-center font-semibold text-chicago">Leer nota</span>
        </span>
      </Link>
    </li>
  );
}

function FiltroGuias({
  filtros,
  activa,
  onSelect
}: {
  filtros: FiltroItem[];
  activa: '' | GuiaSlug;
  onSelect: (slug: '' | GuiaSlug) => void;
}) {
  return (
    <nav aria-label="Filtrar por guía" className="border-b border-carbon/20">
      <ul className="flex flex-wrap">
        {filtros.map((filtro) => {
          const current = activa === filtro.slug;
          return (
            <li key={filtro.href}>
              <a
                href={filtro.href}
                aria-current={current ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onSelect(filtro.slug);
                }}
                className={`-mb-px inline-flex min-h-[48px] items-center border-b px-3 font-mono text-base ${
                  current ? 'border-carbon font-semibold' : 'border-transparent'
                }`}
              >
                {filtro.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function GuiasDelBarrio({ guias }: { guias: GuiaSummaryData[] }) {
  return (
    <section aria-labelledby="guias-titulo" className="border-t border-carbon/25 bg-pampa-deep">
      <div className="editorial-container py-12 sm:py-16">
        <h2
          id="guias-titulo"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95]"
        >
          Guías del barrio
        </h2>
        <ul className="mt-8 border-t border-carbon/25">
          {guias.map((guia) => (
            <li key={guia.slug} className="border-b border-carbon/25">
              <Link
                href={`/notas/${guia.pilarSlug}`}
                className="grid gap-4 py-6 color-field hover:bg-pampa md:grid-cols-12 md:items-center md:gap-8"
              >
                <FiguraCard
                  foto={guia.foto}
                  campoKey={guia.slug}
                  topLabel={guia.placeLabel ?? guia.label}
                  bottomLabel={guia.category}
                  sizes="(min-width: 768px) 38vw, 100vw"
                  className="aspect-[3/2] md:col-span-5 md:aspect-[16/10]"
                />
                <span className="flex flex-col md:col-span-7">
                  <span className="font-mono text-base text-chicago">
                    <span className="border-b border-current">Guía</span>
                    <span aria-hidden="true"> · </span>
                    {guia.label}
                  </span>
                  <h3 className="mt-2 max-w-[22ch] font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight">
                    {guia.pilarTitle}
                  </h3>
                  <span className="mt-3 font-mono text-base">{guia.totalLabel}</span>
                  <span className="inline-flex min-h-[48px] items-center font-semibold text-chicago">Leer la guía</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NotasPortada({
  notas,
  guias,
  filtros
}: {
  notas: NotaCardData[];
  guias: GuiaSummaryData[];
  filtros: FiltroItem[];
}) {
  const [guiaSlug, setGuiaSlug] = useState<'' | GuiaSlug>('');

  useEffect(() => {
    const valid = new Set(filtros.map((f) => f.slug));
    const sync = () => {
      const raw = (new URLSearchParams(window.location.search).get('guia') ?? '') as '' | GuiaSlug;
      setGuiaSlug(valid.has(raw) ? raw : '');
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, [filtros]);

  const selectGuia = (slug: '' | GuiaSlug) => {
    const url = slug ? `/notas?guia=${slug}` : '/notas';
    window.history.pushState(null, '', url);
    setGuiaSlug(slug);
  };

  const { activaFiltro, destacada, resto } = useMemo(() => {
    const found = filtros.find((f) => f.slug === guiaSlug && f.slug !== '');
    const lista = found && found.slug ? notas.filter((n) => n.filterSlugs.includes(found.slug as GuiaSlug)) : notas;
    return { activaFiltro: found, destacada: lista[0], resto: lista.slice(1) };
  }, [guiaSlug, notas, filtros]);

  const listado = activaFiltro ? `Notas de ${activaFiltro.label}` : 'Todas las notas';

  return (
    <>
      <div className="editorial-container py-10 sm:py-14">
        <p className="font-mono text-base text-chicago">Archivo editorial</p>
        <h1 className="mt-2 max-w-[11ch] text-balance font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold uppercase leading-[0.9] sm:max-w-[14ch]">
          Notas del barrio
        </h1>
        <p className="mt-4 max-w-[38ch] font-serif text-xl italic leading-snug sm:text-2xl">
          Actualidad, historia, feria, patrimonio y cultura de Mataderos y la Comuna 9.
        </p>

        <div className="mt-8">
          <FiltroGuias filtros={filtros} activa={activaFiltro?.slug ?? ''} onSelect={selectGuia} />
        </div>

        {destacada ? (
          <div className="mt-8">
            <NotaDestacada nota={destacada} />
          </div>
        ) : (
          <p className="mt-8 text-lg">No hay notas en esta guía.</p>
        )}

        {resto.length > 0 && (
          <section aria-label={listado} className="mt-10">
            <h2 className="sr-only">{listado}</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resto.map((nota) => (
                <TarjetaNota key={nota.slug} nota={nota} />
              ))}
            </ul>
          </section>
        )}
      </div>

      <GuiasDelBarrio guias={guias} />

      <section aria-labelledby="seguir-titulo" className="bg-chicago text-pampa" data-surface="dark">
        <div className="editorial-container py-12 sm:py-16">
          <h2
            id="seguir-titulo"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95]"
          >
            En el barrio
          </h2>
          <p className="mt-3 max-w-[36ch] font-serif text-xl italic leading-snug sm:text-2xl">
            Agenda actualizada con fuente y comercios de la guía.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/agenda"
              className="inline-flex min-h-[48px] w-full items-center justify-center bg-pampa px-5 font-semibold text-carbon color-field hover:bg-pampa-surface sm:w-auto"
            >
              Ver agenda completa
            </Link>
            <Link
              href="/directorio"
              className="inline-flex min-h-[48px] w-full items-center justify-center border border-pampa px-5 font-semibold color-field hover:bg-pampa hover:text-carbon sm:w-auto"
            >
              Comercios
            </Link>
          </div>
        </div>
      </section>

      <div className="editorial-container">
        <p className="font-mono text-base">
          <Link
            href="/notas/creditos"
            className="inline-flex min-h-[48px] items-center text-carbon/80 underline decoration-carbon/30 underline-offset-4"
          >
            Fotos y licencias
          </Link>
        </p>
      </div>
    </>
  );
}
