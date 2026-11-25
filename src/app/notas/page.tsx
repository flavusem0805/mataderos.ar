import type { Metadata } from 'next';
import { NotaFrame } from '@/components/notas/NotaFrame';
import {
  NotasPortada,
  type FiltroItem,
  type GuiaSlug,
  type GuiaSummaryData,
  type NotaCardData
} from '@/components/notas/NotasPortada';
import {
  ACTUALIDAD_FILTRO,
  GUIAS,
  NOTAS,
  canonicalNota,
  extractoDe,
  formatFecha,
  getNota,
  guiaDe,
  notasDeGuia,
  type NotaResuelta
} from '@/lib/notas';
import type { Foto } from '@/lib/notas/media';

export const metadata: Metadata = {
  title: 'Notas de Mataderos · actualidad, historia, feria y cultura',
  description:
    'Actualidad, historia, feria, patrimonio y cultura de Mataderos, Comuna 9. Guías del barrio y notas, de la más reciente a la más antigua.',
  alternates: { canonical: 'https://mataderos.ar/notas' },
  openGraph: {
    title: 'Notas de Mataderos · actualidad, historia, feria y cultura',
    description:
      'Actualidad, historia, feria, patrimonio y cultura de Mataderos, Comuna 9. Guías del barrio y notas, de la más reciente a la más antigua.',
    url: 'https://mataderos.ar/notas',
    locale: 'es_AR',
    type: 'website',
    images: NOTAS[0]?.image ? [{ url: NOTAS[0].image.src, alt: NOTAS[0].image.alt }] : undefined
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notas de Mataderos · actualidad, historia, feria y cultura',
    description:
      'Actualidad, historia, feria, patrimonio y cultura de Mataderos, Comuna 9. Guías del barrio y notas, de la más reciente a la más antigua.',
    images: NOTAS[0]?.image ? [NOTAS[0].image.src] : undefined
  }
};

function fotoDe(nota: NotaResuelta): Foto | undefined {
  if (nota.image?.src) return nota.image;
  if (nota.type !== 'actualidad' && nota.pillarSlug) {
    const pilar = getNota(nota.pillarSlug);
    if (pilar?.image?.src) return pilar.image;
  }
  return undefined;
}

const FILTROS: FiltroItem[] = [
  { slug: '', label: 'Todas', href: '/notas' },
  { slug: ACTUALIDAD_FILTRO.slug, label: ACTUALIDAD_FILTRO.label, href: '/notas?guia=actualidad' },
  ...GUIAS.map((guia) => ({
    slug: guia.slug,
    label: guia.label,
    href: `/notas?guia=${guia.slug}`
  }))
];

export default function NotasIndexPage() {
  const cards: NotaCardData[] = NOTAS.map((nota) => {
    const guia = guiaDe(nota);
    const filterSlugs: GuiaSlug[] = [];
    if (nota.type === 'actualidad') filterSlugs.push('actualidad');
    if (guia && !filterSlugs.includes(guia.slug)) filterSlugs.push(guia.slug);

    return {
      slug: nota.slug,
      title: nota.title,
      extracto: extractoDe(nota),
      fechaLabel: formatFecha(nota.publishedAt),
      readMinutes: nota.readMinutes,
      type: nota.type,
      category: nota.category,
      guiaSlug: guia?.slug,
      guiaLabel: guia?.label,
      filterSlugs,
      placeLabel: nota.placeLabel,
      foto: fotoDe(nota)
    };
  });

  const guias: GuiaSummaryData[] = GUIAS.flatMap((guia) => {
    const pilar = getNota(guia.pillarSlug);
    if (!pilar) return [];
    const total = notasDeGuia(guia.pillarSlug).length;
    return [
      {
        slug: guia.slug,
        label: guia.label,
        pilarSlug: pilar.slug,
        pilarTitle: pilar.title,
        category: pilar.category,
        totalLabel: total === 1 ? '1 nota' : `${total} notas`,
        foto: fotoDe(pilar),
        placeLabel: pilar.placeLabel
      }
    ];
  });

  const json = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Notas de Mataderos',
    description: 'Actualidad, historia, feria, patrimonio y cultura de Mataderos.',
    inLanguage: 'es-AR',
    url: 'https://mataderos.ar/notas',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: NOTAS.map((nota, index) => ({
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
      <NotasPortada notas={cards} guias={guias} filtros={FILTROS} />
    </NotaFrame>
  );
}
