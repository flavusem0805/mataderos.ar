import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import {
  DirectoryExplorer,
  type DirectoryKindFilter,
  type ZoneFilter
} from '@/components/buscar/DirectoryExplorer';
import { fetchBusinesses } from '@/lib/supabase';
import { getEmprendedores } from '@/lib/emprendedores';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Buscar Comercios y Emprendedores en Mataderos · Guía del Barrio · Mataderos.ar',
  description:
    'Buscador y guía de comercios de calle, puestos de la Feria de Mataderos y emprendedores verificados de la Comuna 9. Filtrá por rubro, corredor, horario y modalidad.',
  alternates: { canonical: 'https://mataderos.ar/buscar' },
  openGraph: {
    title: 'Buscar Comercios y Emprendedores · Guía de Mataderos.ar',
    description:
      'Encontrá comercios abiertos sobre Av. Alberdi, Emilio Castro, La Recova y Eva Perón, además de emprendedores verificados de la Feria de Mataderos.',
    url: 'https://mataderos.ar/buscar',
    locale: 'es_AR',
    type: 'website'
  }
};

interface BuscarPageProps {
  searchParams: Promise<{
    q?: string | string[];
    tipo?: string | string[];
    zona?: string | string[];
    rubro?: string | string[];
    abierto?: string | string[];
  }>;
}

function firstParam(val: string | string[] | undefined): string {
  return (Array.isArray(val) ? val[0] : val)?.trim() ?? '';
}

function parseKind(raw: string): DirectoryKindFilter {
  const lower = raw.toLowerCase();
  if (lower === 'comercios' || lower === 'comercio') return 'comercios';
  if (lower === 'emprendedores' || lower === 'emprendedor' || lower === 'feria') {
    return 'emprendedores';
  }
  return 'todos';
}

function parseZone(raw: string): ZoneFilter {
  if (raw === 'Av. Alberdi') return 'Av. Alberdi';
  if (raw === 'Polo Emilio Castro') return 'Polo Emilio Castro';
  if (raw === 'Casco Histórico') return 'Casco Histórico';
  if (raw === 'Av. Eva Perón') return 'Av. Eva Perón';
  return 'todas';
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const [businesses, params] = await Promise.all([fetchBusinesses(), searchParams]);
  const emprendedores = getEmprendedores();

  const initialQuery = firstParam(params.q);
  const initialKind = parseKind(firstParam(params.tipo));
  const initialZone = parseZone(firstParam(params.zona));
  const initialCategory = firstParam(params.rubro);
  const initialOpenOnly = firstParam(params.abierto) === '1' || firstParam(params.abierto) === 'true';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Guía y Buscador de Comercios y Emprendedores de Mataderos',
        description:
          'Buscador de comercios locales y emprendedores verificados de Mataderos, Comuna 9, CABA.',
        url: 'https://mataderos.ar/buscar',
        inLanguage: 'es-AR'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
          { '@type': 'ListItem', position: 2, name: 'Buscar en la Guía', item: 'https://mataderos.ar/buscar' }
        ]
      }
    ]
  };

  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-carbon/15 bg-pampa py-8 sm:py-12">
        <div className="editorial-container">
          <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
            <Link href="/" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
              Inicio
            </Link>
            <span className="mx-2 text-carbon/40" aria-hidden="true">
              /
            </span>
            <span className="text-carbon">Buscar en la guía</span>
          </nav>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-sm uppercase tracking-wider text-chicago">
                Guía del barrio · Locales a la calle y Feria de Mataderos
              </p>
              <h1 className="mt-2 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-semibold uppercase leading-[0.92]">
                Buscar comercios y emprendimientos
              </h1>
              <p className="mt-3 max-w-[62ch] font-serif text-lg leading-relaxed text-carbon/90 sm:text-xl">
                Encontrá locales por corredor, rubro o qué está abierto ahora, junto con los puestos y emprendedores verificados de la Feria.
              </p>
            </div>

            <Link
              href="/sumate"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-5 font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa"
            >
              Sumá tu comercio o emprendimiento
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-pampa-surface">
        <div className="editorial-container">
          <DirectoryExplorer
            businesses={businesses}
            emprendedores={emprendedores}
            initialQuery={initialQuery}
            initialKind={initialKind}
            initialZone={initialZone}
            initialCategory={initialCategory}
            initialOpenOnly={initialOpenOnly}
          />
        </div>
      </section>
    </NotaFrame>
  );
}
