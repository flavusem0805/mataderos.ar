import type { Metadata } from 'next';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { NotasPortada } from '@/components/notas/NotasPortada';
import { NOTAS, canonicalNota, getNota, guiaPorParam, notasDeFiltro } from '@/lib/notas';

interface NotasPageProps {
  searchParams: Promise<{ guia?: string | string[] }>;
}

function leerGuia(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function seleccion(searchParams: NotasPageProps['searchParams']) {
  const params = await searchParams;
  const guia = guiaPorParam(leerGuia(params.guia));
  const lista = guia ? notasDeFiltro(guia) : NOTAS;
  return { guia, lista, destacada: lista[0], resto: lista.slice(1) };
}

export async function generateMetadata({ searchParams }: NotasPageProps): Promise<Metadata> {
  const { guia, destacada } = await seleccion(searchParams);
  const pilar = guia?.pillarSlug ? getNota(guia.pillarSlug) : undefined;
  const title = guia ? `${guia.label} · Notas de Mataderos` : 'Notas de Mataderos · actualidad, historia, feria y cultura';
  const description = guia
    ? guia.slug === 'actualidad'
      ? 'Actualidad y agenda con fuente de Mataderos y la Comuna 9: El Plata, Feria, centros culturales y comercio barrial.'
      : `Notas de ${guia.label}. ${pilar?.dek ?? ''}`.trim()
    : 'Actualidad, historia, feria, patrimonio y cultura de Mataderos, Comuna 9. Guías del barrio y notas, de la más reciente a la más antigua.';
  const url = guia ? `https://mataderos.ar/notas?guia=${guia.slug}` : 'https://mataderos.ar/notas';
  const image = destacada?.image
    ? [{ url: destacada.image.src, alt: destacada.image.alt }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      locale: 'es_AR',
      type: 'website',
      images: image
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image?.map((item) => item.url)
    }
  };
}

export default async function NotasIndexPage({ searchParams }: NotasPageProps) {
  const { guia, lista, destacada, resto } = await seleccion(searchParams);
  const url = guia ? `https://mataderos.ar/notas?guia=${guia.slug}` : 'https://mataderos.ar/notas';
  const json = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: guia ? `${guia.label} · Notas de Mataderos` : 'Notas de Mataderos',
    description: 'Actualidad, historia, feria, patrimonio y cultura de Mataderos.',
    inLanguage: 'es-AR',
    url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: lista.map((nota, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: nota.title,
        url: canonicalNota(nota.slug)
      }))
    }
  };

  return (
    <NotaFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
      <NotasPortada guia={guia} destacada={destacada} resto={resto} />
    </NotaFrame>
  );
}
