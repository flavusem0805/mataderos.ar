import { ACTUALIDAD } from './clusters/actualidad';
import { CULTURA } from './clusters/cultura';
import { FERIA } from './clusters/feria';
import { HISTORIA } from './clusters/historia';
import { PATRIMONIO } from './clusters/patrimonio';
import { QUE_HACER } from './clusters/que-hacer';
import { FOTOS } from './media';
import type { Bloque, Nota, NotaResuelta } from './types';

const ORDER = [
  'historia-de-mataderos',
  'feria-de-mataderos',
  'que-hacer-en-mataderos',
  'patrimonio-de-mataderos',
  'cultura-folklore-y-bares-de-mataderos'
];

function wordsIn(text: string): number {
  const plain = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  return plain.split(/\s+/).filter(Boolean).length;
}

function countWords(blocks: Bloque[]): number {
  return blocks.reduce((total, block) => total + wordsIn(block.text), 0);
}

function resolve(nota: Nota): NotaResuelta {
  const words = countWords(nota.blocks);
  return {
    ...nota,
    image: nota.image ? FOTOS[nota.image] : undefined,
    words,
    readMinutes: Math.max(1, Math.round(words / 200))
  };
}

function assertEditorial(list: NotaResuelta[]) {
  const slugs = new Set(list.map((nota) => nota.slug));
  const bySlug = new Map(list.map((nota) => [nota.slug, nota]));

  for (const nota of list) {
    const min = nota.type === 'pilar' ? 1500 : nota.type === 'satelite' ? 600 : 200;
    const max = nota.type === 'pilar' ? 2500 : 1000;
    if (nota.words < min || nota.words > max) {
      throw new Error(`Extensión fuera de rango en ${nota.slug}: ${nota.words} palabras (esperado ${min}-${max}).`);
    }
    if (nota.fuentes.length === 0) {
      throw new Error(`La nota ${nota.slug} debe incluir al menos una fuente verificada.`);
    }
    if ((nota.type === 'pilar' || nota.type === 'satelite') && !nota.image) {
      throw new Error(`La nota ${nota.slug} requiere una imagen verificada.`);
    }
    if (nota.type === 'satelite') {
      if (!nota.pillarSlug || !slugs.has(nota.pillarSlug)) {
        throw new Error(`Satélite sin pilar válido: ${nota.slug}`);
      }
      const pilar = bySlug.get(nota.pillarSlug);
      if (!pilar || pilar.type !== 'pilar') {
        throw new Error(`Pilar inválido para ${nota.slug}`);
      }
      if (nota.publishedAt <= pilar.publishedAt) {
        throw new Error(`La fecha de ${nota.slug} tiene que ser posterior a la de su guía.`);
      }
    }
    if (nota.type === 'actualidad' && nota.pillarSlug) {
      const pilar = bySlug.get(nota.pillarSlug);
      if (!pilar || pilar.type !== 'pilar') {
        throw new Error(`Pilar inválido para ${nota.slug}`);
      }
      if (nota.publishedAt <= pilar.publishedAt) {
        throw new Error(`La fecha de ${nota.slug} tiene que ser posterior a la de su guía.`);
      }
    }
    const links = nota.blocks.flatMap((block) => [...block.text.matchAll(/\]\((\/notas\/[^)]+)\)/g)].map((match) => match[1]));
    for (const href of links) {
      const slug = href.replace('/notas/', '');
      if (!slugs.has(slug)) {
        throw new Error(`Enlace interno roto en ${nota.slug}: ${href}`);
      }
    }
  }
}

const RAW: Nota[] = [...ACTUALIDAD, ...HISTORIA, ...FERIA, ...QUE_HACER, ...PATRIMONIO, ...CULTURA];
const RESUELTAS = RAW.map(resolve);
assertEditorial(RESUELTAS);

export const NOTAS: NotaResuelta[] = [...RESUELTAS].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt)
);

export const PILARES: NotaResuelta[] = ORDER.map((slug) => {
  const nota = RESUELTAS.find((item) => item.slug === slug);
  if (!nota) throw new Error(`Falta la guía ${slug}`);
  return nota;
});

export function satelitesDe(pillarSlug: string): NotaResuelta[] {
  return RESUELTAS.filter((nota) => nota.type === 'satelite' && nota.pillarSlug === pillarSlug).sort((a, b) =>
    a.publishedAt.localeCompare(b.publishedAt)
  );
}

export function getNota(slug: string): NotaResuelta | undefined {
  return RESUELTAS.find((nota) => nota.slug === slug);
}

export function notasRecientes(limit = 8): NotaResuelta[] {
  return NOTAS.slice(0, limit);
}

export function hermanos(nota: NotaResuelta, limit = 3): NotaResuelta[] {
  if (nota.type === 'actualidad') {
    return NOTAS.filter((item) => item.type === 'actualidad' && item.slug !== nota.slug).slice(0, limit);
  }
  if (!nota.pillarSlug) return [];
  return satelitesDe(nota.pillarSlug)
    .filter((item) => item.slug !== nota.slug)
    .slice(0, limit);
}

export const GUIAS = [
  { slug: 'historia', label: 'Historia', pillarSlug: 'historia-de-mataderos' },
  { slug: 'feria', label: 'Feria', pillarSlug: 'feria-de-mataderos' },
  { slug: 'que-hacer', label: 'Qué hacer', pillarSlug: 'que-hacer-en-mataderos' },
  { slug: 'patrimonio', label: 'Patrimonio', pillarSlug: 'patrimonio-de-mataderos' },
  { slug: 'cultura', label: 'Cultura', pillarSlug: 'cultura-folklore-y-bares-de-mataderos' }
] as const;

export type GuiaFiltro = (typeof GUIAS)[number];

export type PortadaFiltro =
  | GuiaFiltro
  | { readonly slug: 'actualidad'; readonly label: 'Actualidad'; readonly pillarSlug?: undefined };

export const ACTUALIDAD_FILTRO: PortadaFiltro = {
  slug: 'actualidad',
  label: 'Actualidad'
};

export function guiaPorParam(value: string | undefined): PortadaFiltro | undefined {
  if (!value) return undefined;
  if (value === 'actualidad') return ACTUALIDAD_FILTRO;
  return GUIAS.find((guia) => guia.slug === value || guia.pillarSlug === value);
}

export function guiaDe(nota: NotaResuelta): GuiaFiltro | undefined {
  const pillarSlug = nota.type === 'pilar' ? nota.slug : nota.pillarSlug;
  return GUIAS.find((guia) => guia.pillarSlug === pillarSlug);
}

/** Notas de una guía, guía incluida, de la más reciente a la más antigua. */
export function notasDeGuia(pillarSlug: string): NotaResuelta[] {
  return NOTAS.filter((nota) => nota.slug === pillarSlug || nota.pillarSlug === pillarSlug);
}

export function notasDeFiltro(filtro: PortadaFiltro): NotaResuelta[] {
  if (filtro.slug === 'actualidad') {
    return NOTAS.filter((nota) => nota.type === 'actualidad');
  }
  return notasDeGuia(filtro.pillarSlug);
}

function textoPlano(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
}

/** Bajada de la nota. Si no hay extracto, el primer párrafo. */
export function extractoDe(nota: NotaResuelta): string {
  const dek = nota.dek.trim();
  if (dek) return dek;
  const primero = nota.blocks.find((block) => block.kind === 'p');
  if (primero) return textoPlano(primero.text);
  return nota.description;
}

export function formatFecha(iso: string): string {
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${iso}T12:00:00Z`));
}

export function canonicalNota(slug: string): string {
  return `https://mataderos.ar/notas/${slug}`;
}

export type { NotaResuelta };
