import type { MetadataRoute } from 'next';
import { NOTAS, canonicalNota } from '@/lib/notas';

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = NOTAS[0]?.publishedAt ?? '2026-11-22';
  return [
    {
      url: 'https://mataderos.ar',
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://mataderos.ar/notas',
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://mataderos.ar/notas/creditos',
      lastModified: newest,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    ...NOTAS.map((nota) => ({
      url: canonicalNota(nota.slug),
      lastModified: nota.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: nota.type === 'pilar' ? 0.8 : 0.6
    }))
  ];
}
