import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { DirectoryExplorer } from '@/components/directorio/DirectoryExplorer';
import { fetchBusinesses } from '@/lib/supabase';
import { getEmprendedores } from '@/lib/emprendedores';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Directorio de comercios y emprendedores de Mataderos · Mataderos.ar',
  description:
    'Directorio de comercios de calle, puestos de la Feria de Mataderos y emprendedores verificados de la Comuna 9. Filtrá por rubro, zona, horario y modalidad.',
  alternates: { canonical: 'https://mataderos.ar/directorio' },
  openGraph: {
    title: 'Directorio de comercios y emprendedores · Mataderos.ar',
    description:
      'Encontrá comercios abiertos sobre Av. Alberdi, Emilio Castro, La Recova y Eva Perón, además de emprendedores verificados de la Feria de Mataderos.',
    url: 'https://mataderos.ar/directorio',
    locale: 'es_AR',
    type: 'website'
  }
};

export default async function DirectorioPage() {
  const businesses = await fetchBusinesses();
  const emprendedores = getEmprendedores();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Directorio de comercios y emprendedores de Mataderos',
        description:
          'Directorio de comercios locales y emprendedores verificados de Mataderos, Comuna 9, CABA.',
        url: 'https://mataderos.ar/directorio',
        inLanguage: 'es-AR'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
          { '@type': 'ListItem', position: 2, name: 'Directorio', item: 'https://mataderos.ar/directorio' }
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

      <section className="border-b border-carbon/15 bg-pampa py-5 sm:py-10">
        <div className="editorial-container flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-wider text-chicago sm:text-sm">
              Mataderos · Comuna 9
            </p>
            <h1 className="mt-1 font-display text-[clamp(2rem,6vw,4rem)] font-semibold uppercase leading-[0.92]">
              Directorio
            </h1>
            <p className="mt-2 hidden max-w-[60ch] font-serif text-lg leading-relaxed text-carbon/90 sm:block">
              Comercios del barrio y emprendedores verificados de la Feria, en un solo lugar.
            </p>
          </div>

          <Link
            href="/sumate"
            className="hidden min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-5 font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa sm:inline-flex"
          >
            Sumá tu comercio o emprendimiento
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-pampa-surface py-5 sm:py-10">
        <div className="editorial-container">
          <DirectoryExplorer businesses={businesses} emprendedores={emprendedores} />
        </div>
      </section>
    </NotaFrame>
  );
}
