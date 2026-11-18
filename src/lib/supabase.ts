import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  ARTICLES,
  BUSINESSES,
  EVENTS,
  type Article,
  type Business,
  type NeighborhoodEvent
} from './data';

let cachedClient: SupabaseClient | null = null;

/**
 * Devuelve el cliente de Supabase cuando las variables de entorno están configuradas.
 * Mientras no se carguen, la aplicación usa los datos curados locales sin errores.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  if (!cachedClient) {
    cachedClient = createClient(url, anonKey);
  }
  return cachedClient;
}

export async function fetchBusinesses(): Promise<Business[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return BUSINESSES;

  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .order('featured', { ascending: false });

  if (error || !data || data.length === 0) {
    return BUSINESSES;
  }

  return data.map((row) => ({
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    category: row.category,
    zone: row.zone,
    address: String(row.address),
    nearCorner: 'Mataderos, Comuna 9',
    description: String(row.description),
    longDescription: String(row.long_description ?? row.description),
    tagline: String(row.tagline ?? row.description),
    phone: String(row.phone ?? ''),
    whatsapp: String(row.whatsapp),
    hoursSummary: String(row.hours_summary ?? 'Consultar horario'),
    hours: Array.isArray(row.hours) ? row.hours : [],
    isOpenNow: Boolean(row.is_open_now),
    hasSubdomain: Boolean(row.has_subdomain),
    featured: Boolean(row.featured),
    heroImage: String(row.hero_image),
    emoji: '📍',
    yearsInNeighborhood: 'Comercio de Mataderos',
    paymentMethods: 'Consultar medios de pago',
    services: Array.isArray(row.services) ? row.services : [],
    reviews: Array.isArray(row.reviews) ? row.reviews : []
  }));
}

export async function fetchBusinessBySlug(slug: string): Promise<Business | null> {
  const normalized = slug.toLowerCase().trim();
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .eq('slug', normalized)
      .maybeSingle();

    if (data) {
      const list = await fetchBusinesses();
      return list.find((b) => b.slug === normalized) ?? null;
    }
  }

  return BUSINESSES.find((b) => b.slug === normalized) ?? null;
}

export async function fetchArticles(): Promise<Article[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return ARTICLES;

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return ARTICLES;
  }

  return data.map((row) => ({
    id: String(row.id),
    slug: String(row.slug),
    title: String(row.title),
    excerpt: String(row.excerpt),
    content: Array.isArray(row.content) ? row.content : [String(row.excerpt)],
    category: String(row.category),
    zone: String(row.zone),
    readTime: String(row.read_time ?? '3 min'),
    publishedLabel: 'Reciente',
    imageUrl: String(row.image_url)
  }));
}

export async function fetchEvents(): Promise<NeighborhoodEvent[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return EVENTS;

  const { data, error } = await supabase.from('events').select('*');
  if (error || !data || data.length === 0) {
    return EVENTS;
  }

  return data.map((row) => ({
    id: String(row.id),
    title: String(row.title),
    dateLabel: String(row.date_label),
    timeLabel: 'Consultar horario',
    location: String(row.location),
    category: (row.category as NeighborhoodEvent['category']) ?? 'Cultura',
    description: String(row.description),
    highlightTag: String(row.highlight_tag ?? 'Comunidad')
  }));
}
