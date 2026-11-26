import type { MetadataRoute } from 'next';
import { PORTAL_URL } from '@/lib/contact';
import { canonicalEmprendedor } from '@/lib/emprendedores';
import { NOTAS, canonicalNota } from '@/lib/notas';
import { getSupabaseClient } from '@/lib/supabase';

export const revalidate = 3600;

async function fetchPublishedSitemapEntries(): Promise<{
  businesses: Array<{ slug: string }>;
  emprendedores: Array<{ slug: string; verified_at?: string | null }>;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) return { businesses: [], emprendedores: [] };

  try {
    const [bizRes, empRes] = await Promise.allSettled([
      supabase.from('businesses').select('slug').eq('has_subdomain', true),
      supabase.from('emprendedores').select('slug, verified_at').eq('status', 'verified')
    ]);

    const businesses =
      bizRes.status === 'fulfilled' && Array.isArray(bizRes.value.data)
        ? (bizRes.value.data as Array<{ slug: string }>).filter((b) => Boolean(b.slug))
        : [];

    const emprendedores =
      empRes.status === 'fulfilled' && Array.isArray(empRes.value.data)
        ? (empRes.value.data as Array<{ slug: string; verified_at?: string | null }>).filter((e) =>
            Boolean(e.slug)
          )
        : [];

    return { businesses, emprendedores };
  } catch {
    return { businesses: [], emprendedores: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newest = NOTAS[0]?.publishedAt ?? '2026-11-26';
  const { businesses, emprendedores } = await fetchPublishedSitemapEntries();

  return [
    {
      url: PORTAL_URL,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${PORTAL_URL}/directorio`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${PORTAL_URL}/agenda`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${PORTAL_URL}/sumate`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${PORTAL_URL}/sumate/emprendedores`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${PORTAL_URL}/sumate/comercios`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${PORTAL_URL}/sumate/sponsors`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${PORTAL_URL}/emprendedores`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${PORTAL_URL}/terminos`,
      lastModified: newest,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    {
      url: `${PORTAL_URL}/privacidad`,
      lastModified: newest,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    {
      url: `${PORTAL_URL}/notas`,
      lastModified: newest,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${PORTAL_URL}/notas/creditos`,
      lastModified: newest,
      changeFrequency: 'yearly',
      priority: 0.2
    },
    ...businesses.map((biz) => ({
      url: `${PORTAL_URL}/comercio/${biz.slug}`,
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    })),
    ...emprendedores.map((emp) => ({
      url: canonicalEmprendedor(emp.slug),
      lastModified: emp.verified_at || newest,
      changeFrequency: 'weekly' as const,
      priority: 0.6
    })),
    ...NOTAS.map((nota) => ({
      url: canonicalNota(nota.slug),
      lastModified: nota.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: nota.type === 'pilar' ? 0.8 : 0.6
    }))
  ];
}
