import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  AGENDA_ITEMS,
  type AgendaItem,
  type EventAmbito,
  type EventBarrio,
  type EventCategory
} from './agenda-data';
import {
  ARTICLES,
  BUSINESSES,
  EVENTS,
  type Article,
  type Business,
  type NeighborhoodEvent
} from './data';
import {
  EMPRENDEDORES,
  getEmprendedorBySlug,
  type Emprendedor,
  type EmprendedorCategory,
  type LocationType
} from './emprendedores';
import { BUILT_IN_TAKEN_SLUGS } from './slugs';
import { FOTOS, type FotoId } from './notas/media';

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

function mapBusinessRow(row: Record<string, unknown>): Business {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    category: row.category as Business['category'],
    zone: row.zone as Business['zone'],
    address: String(row.address),
    nearCorner: String(row.near_corner ?? 'Mataderos, Comuna 9'),
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
    emoji: '',
    yearsInNeighborhood: String(row.years_in_neighborhood ?? 'Comercio de Mataderos'),
    paymentMethods: String(row.payment_methods ?? 'Consultar medios de pago'),
    services: Array.isArray(row.services) ? row.services : [],
    reviews: Array.isArray(row.reviews) ? row.reviews : []
  };
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

  return (data as Record<string, unknown>[]).map(mapBusinessRow);
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
      return mapBusinessRow(data as Record<string, unknown>);
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

function isFotoId(value: unknown): value is FotoId {
  return typeof value === 'string' && value in FOTOS;
}

/**
 * Devuelve la agenda fechada desde Supabase (`public.events`) cuando existen filas
 * con `starts_at` y `ends_at`. Mientras la base no esté poblada, usa `AGENDA_ITEMS`.
 */
export async function fetchAgendaItems(): Promise<AgendaItem[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return AGENDA_ITEMS;

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .not('starts_at', 'is', null)
    .order('starts_at', { ascending: true });

  if (error || !data || data.length === 0) {
    return AGENDA_ITEMS;
  }

  return data
    .filter((row) => ((row.barrio as EventBarrio) ?? 'Mataderos') === 'Mataderos')
    .map((row) => {
    const barrio = (row.barrio as EventBarrio) ?? 'Mataderos';
    const ambito: EventAmbito =
      (row.ambito as EventAmbito) ?? (barrio === 'Mataderos' ? 'Mataderos' : 'Comuna 9');
    return {
      id: String(row.id),
      venueId: String(row.venue_id ?? row.id),
      venueName: String(row.venue_name ?? row.location),
      title: String(row.title),
      description: String(row.description),
      category: (row.category as EventCategory) ?? 'Cultura',
      barrio,
      ambito,
      place: String(row.place ?? row.location),
      mapsQuery: String(row.maps_query ?? `${row.location}, ${barrio}, CABA, Argentina`),
      startsAt: String(row.starts_at),
      endsAt: String(row.ends_at ?? row.starts_at),
      isMultiDay: Boolean(row.is_multiday),
      dateBadge: row.date_badge ? String(row.date_badge) : undefined,
      timeLabel: String(row.time_label ?? row.date_label ?? 'Consultar horario'),
      priceLabel: String(row.price_label ?? 'Consultar acceso'),
      isFree: Boolean(row.is_free),
      highlightTag: String(row.highlight_tag ?? 'Agenda'),
      source:
        row.source_url && row.source_label
          ? {
              label: String(row.source_label),
              url: String(row.source_url),
              note: row.source_note ? String(row.source_note) : undefined
            }
          : undefined,
      relatedNotaSlug: row.related_nota_slug ? String(row.related_nota_slug) : undefined,
      photoId: isFotoId(row.photo_id) ? row.photo_id : undefined
    };
  });
}

function mapEmprendedorRow(row: Record<string, unknown>): Emprendedor {
  const photosRaw = Array.isArray(row.photos) ? row.photos : [];
  const photos = photosRaw
    .filter((entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === 'object'))
    .map((entry) => ({
      src: String(entry.src ?? ''),
      alt: String(entry.alt ?? '')
    }))
    .filter((entry) => entry.src.length > 0);

  return {
    slug: String(row.slug ?? ''),
    displayName: String(row.display_name ?? row.displayName ?? ''),
    tagline: String(row.tagline ?? ''),
    offerText: String(row.offer_text ?? row.offerText ?? row.tagline ?? ''),
    category: (row.category as EmprendedorCategory) ?? 'Artesanías',
    locationType: (row.location_type as LocationType) ?? 'feria_puesto',
    feriaName: row.feria_name ? String(row.feria_name) : undefined,
    puestoLabel: row.puesto_label ? String(row.puesto_label) : undefined,
    address: row.address ? String(row.address) : undefined,
    zone: String(row.zone ?? 'Mataderos · Comuna 9'),
    locationNote: String(row.location_note ?? ''),
    whatsapp: String(row.whatsapp ?? ''),
    instagram: row.instagram ? String(row.instagram) : undefined,
    facebook: row.facebook ? String(row.facebook) : undefined,
    tiktok: row.tiktok ? String(row.tiktok) : undefined,
    otherUrl: row.other_url ? String(row.other_url) : undefined,
    heroImage: String(row.hero_image ?? '/notas/frente-recova.jpg'),
    heroAlt: String(row.hero_alt ?? row.display_name ?? 'Emprendimiento de Mataderos'),
    photos,
    catalogPdfName: row.catalog_pdf_name ? String(row.catalog_pdf_name) : undefined,
    catalogPdfSizeLabel: row.catalog_pdf_size_label ? String(row.catalog_pdf_size_label) : undefined,
    catalogPdfUrl: row.catalog_pdf_url ? String(row.catalog_pdf_url) : undefined,
    isFounder: Boolean(row.is_founder),
    verifiedAt: String(row.verified_at ?? '2026-11-22')
  };
}

export async function fetchEmprendedores(): Promise<Emprendedor[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return EMPRENDEDORES;

  try {
    const { data, error } = await supabase
      .from('emprendedores')
      .select('*')
      .order('is_founder', { ascending: false });

    if (error || !data || data.length === 0) {
      return EMPRENDEDORES;
    }

    const mapped = (data as Record<string, unknown>[])
      .filter((row) => (row.status ? String(row.status) === 'verified' : true))
      .map(mapEmprendedorRow)
      .filter((item) => item.slug.length > 0 && item.displayName.length > 0);

    return mapped.length > 0 ? mapped : EMPRENDEDORES;
  } catch {
    return EMPRENDEDORES;
  }
}

export async function fetchEmprendedorBySlug(slug: string): Promise<Emprendedor | null> {
  const normalized = slug.toLowerCase().trim();
  const supabase = getSupabaseClient();

  if (supabase) {
    try {
      const { data } = await supabase
        .from('emprendedores')
        .select('*')
        .eq('slug', normalized)
        .maybeSingle();

      if (data) {
        const row = data as Record<string, unknown>;
        if (!row.status || String(row.status) === 'verified') {
          return mapEmprendedorRow(row);
        }
      }
    } catch {
      // Fallback limpio a los perfiles curados locales si la tabla aún no existe
    }
  }

  return getEmprendedorBySlug(normalized) ?? null;
}

/**
 * Devuelve todos los slugs ocupados entre comercios, emprendedores y postulaciones activas
 * para evitar colisiones desde /sumate y #sumar-comercio.
 */
export async function fetchTakenSlugs(): Promise<string[]> {
  const taken = new Set<string>(BUILT_IN_TAKEN_SLUGS);
  const supabase = getSupabaseClient();
  if (!supabase) return Array.from(taken);

  try {
    // Preferimos la función RPC `get_taken_slugs()` (SECURITY DEFINER), que devuelve solo slugs
    // sin exponer datos personales de `sumate_submissions` ni perfiles pendientes.
    const rpcRes = await supabase.rpc('get_taken_slugs');
    if (!rpcRes.error && Array.isArray(rpcRes.data)) {
      for (const row of rpcRes.data as Array<{ slug?: string | null }>) {
        if (row.slug) taken.add(String(row.slug).toLowerCase());
      }
      return Array.from(taken);
    }

    const [bizRes, empRes, subRes] = await Promise.allSettled([
      supabase.from('businesses').select('slug'),
      supabase.from('emprendedores').select('slug'),
      supabase.from('sumate_submissions').select('slug, status')
    ]);

    if (bizRes.status === 'fulfilled' && Array.isArray(bizRes.value.data)) {
      for (const row of bizRes.value.data) {
        if (row.slug) taken.add(String(row.slug).toLowerCase());
      }
    }
    if (empRes.status === 'fulfilled' && Array.isArray(empRes.value.data)) {
      for (const row of empRes.value.data) {
        if (row.slug) taken.add(String(row.slug).toLowerCase());
      }
    }
    if (subRes.status === 'fulfilled' && Array.isArray(subRes.value.data)) {
      for (const row of subRes.value.data) {
        if (row.slug && row.status !== 'rejected') {
          taken.add(String(row.slug).toLowerCase());
        }
      }
    }
  } catch {
    // Mantiene la lista base local si la base aún no está migrada
  }

  return Array.from(taken);
}

export interface SupabaseWriteContext {
  client: SupabaseClient;
  isServiceRole: boolean;
}

/**
 * Devuelve el cliente server-side para escrituras e indica si usa SUPABASE_SERVICE_ROLE_KEY.
 * Si cae a la anon key, las tablas sin policy de SELECT (como `sumate_submissions`) deben insertar
 * sin `.select()` para respetar RLS.
 */
export function getSupabaseWriteContext(): SupabaseWriteContext | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) return null;
  if (serviceKey) {
    return {
      client: createClient(url, serviceKey, { auth: { persistSession: false } }),
      isServiceRole: true
    };
  }
  if (anonKey) {
    return {
      client: createClient(url, anonKey, { auth: { persistSession: false } }),
      isServiceRole: false
    };
  }
  return null;
}

/** Cliente server-side opcional para altas en rutas API cuando esté habilitado el modo DB. */
export function getSupabaseWriteClient(): SupabaseClient | null {
  return getSupabaseWriteContext()?.client ?? null;
}
