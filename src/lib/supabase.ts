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
let cachedKeySignature: string | null = null;

function cleanEnvValue(raw: string | undefined): string {
  if (!raw) return '';
  return raw.trim().replace(/^['"]+|['"]+$/g, '').trim();
}

function getSupabaseUrl(): string | undefined {
  const raw = cleanEnvValue(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (!raw) return undefined;

  const candidate = /^[a-z0-9-]+\.supabase\.co$/i.test(raw) ? `https://${raw}` : raw;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return undefined;
    if (!parsed.hostname || parsed.hostname.includes(' ')) return undefined;
    return parsed.origin;
  } catch {
    return undefined;
  }
}

function cleanSupabaseKey(raw: string | undefined): string | undefined {
  const val = cleanEnvValue(raw);
  if (!val || !/^[\x21-\x7E]+$/.test(val)) return undefined;
  return val;
}

function getSupabasePublicKey(): string | undefined {
  return (
    cleanSupabaseKey(process.env.SUPABASE_PUBLISHABLE_KEY) ||
    cleanSupabaseKey(process.env.SUPABASE_ANON_KEY) ||
    cleanSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    cleanSupabaseKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

function getSupabaseSecretKey(): string | undefined {
  return (
    cleanSupabaseKey(process.env.SUPABASE_SECRET_KEY) ||
    cleanSupabaseKey(process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}

function safeImageSrc(raw: unknown, fallback: string): string {
  const val = typeof raw === 'string' ? raw.trim() : '';
  if (!val || val === 'null' || val === 'undefined') return fallback;
  if (val.startsWith('/')) return val;
  try {
    const parsed = new URL(val);
    if (
      parsed.protocol === 'https:' &&
      (parsed.hostname === 'images.unsplash.com' || parsed.hostname.endsWith('.supabase.co'))
    ) {
      return val;
    }
  } catch {
    // Usa el fallback local seguro si la URL no es válida para next/image
  }
  return fallback;
}

/**
 * Devuelve el cliente de Supabase (solo servidor) cuando las variables de entorno están configuradas.
 * Mientras no se carguen o tengan un formato inválido, usa los datos curados locales sin romper el build.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const publicKey = getSupabasePublicKey();
  if (!url || !publicKey) return null;

  const signature = `${url}|${publicKey}`;
  if (!cachedClient || cachedKeySignature !== signature) {
    try {
      cachedClient = createClient(url, publicKey, { auth: { persistSession: false } });
      cachedKeySignature = signature;
    } catch {
      cachedClient = null;
      cachedKeySignature = null;
      return null;
    }
  }
  return cachedClient;
}

function mapBusinessRow(row: Record<string, unknown>): Business {
  return {
    id: String(row.id ?? ''),
    slug: String(row.slug ?? ''),
    name: String(row.name ?? ''),
    category: (row.category as Business['category']) ?? 'Servicios',
    zone: (row.zone as Business['zone']) ?? 'Av. Alberdi',
    address: String(row.address ?? ''),
    nearCorner: String(row.near_corner ?? 'Mataderos, Comuna 9'),
    description: String(row.description ?? ''),
    longDescription: String(row.long_description ?? row.description ?? ''),
    tagline: String(row.tagline ?? row.description ?? ''),
    phone: String(row.phone ?? ''),
    whatsapp: String(row.whatsapp ?? ''),
    hoursSummary: String(row.hours_summary ?? 'Consultar horario'),
    hours: Array.isArray(row.hours) ? row.hours : [],
    isOpenNow: Boolean(row.is_open_now),
    hasSubdomain: Boolean(row.has_subdomain),
    featured: Boolean(row.featured),
    heroImage: safeImageSrc(row.hero_image, '/notas/frente-recova.jpg'),
    emoji: '',
    yearsInNeighborhood: String(row.years_in_neighborhood ?? 'Comercio de Mataderos'),
    paymentMethods: String(row.payment_methods ?? 'Consultar medios de pago'),
    services: Array.isArray(row.services) ? row.services : [],
    reviews: Array.isArray(row.reviews) ? row.reviews : []
  };
}

export async function fetchBusinesses(): Promise<Business[]> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return BUSINESSES;

    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .order('featured', { ascending: false });

    if (error || !data || data.length === 0) {
      return BUSINESSES;
    }

    const mapped = (data as Record<string, unknown>[])
      .map(mapBusinessRow)
      .filter((item) => item.slug.length > 0 && item.name.length > 0);

    return mapped.length > 0 ? mapped : BUSINESSES;
  } catch {
    return BUSINESSES;
  }
}

export async function fetchBusinessBySlug(slug: string): Promise<Business | null> {
  const normalized = slug.toLowerCase().trim();
  try {
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
  } catch {
    // Fallback al listado curado local
  }

  return BUSINESSES.find((b) => b.slug === normalized) ?? null;
}

export async function fetchArticles(): Promise<Article[]> {
  try {
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
      imageUrl: safeImageSrc(row.image_url, '/notas/frente-recova.jpg')
    }));
  } catch {
    return ARTICLES;
  }
}

export async function fetchEvents(): Promise<NeighborhoodEvent[]> {
  try {
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
  } catch {
    return EVENTS;
  }
}

function isFotoId(value: unknown): value is FotoId {
  return typeof value === 'string' && value in FOTOS;
}

/**
 * Devuelve la agenda fechada desde Supabase (`public.events`) cuando existen filas
 * con `starts_at` y `ends_at` válidos. Mientras la base no esté poblada, usa `AGENDA_ITEMS`.
 */
export async function fetchAgendaItems(): Promise<AgendaItem[]> {
  try {
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

    const mapped = (data as Record<string, unknown>[])
      .filter((row) => {
        const barrio = (row.barrio as EventBarrio) ?? 'Mataderos';
        const startsTs = Date.parse(String(row.starts_at ?? ''));
        return barrio === 'Mataderos' && !Number.isNaN(startsTs);
      })
      .map((row) => {
        const barrio = (row.barrio as EventBarrio) ?? 'Mataderos';
        const ambito: EventAmbito =
          (row.ambito as EventAmbito) ?? (barrio === 'Mataderos' ? 'Mataderos' : 'Comuna 9');
        const startsAt = String(row.starts_at);
        const endsRaw = String(row.ends_at ?? startsAt);
        const endsAt = Number.isNaN(Date.parse(endsRaw)) ? startsAt : endsRaw;

        return {
          id: String(row.id),
          venueId: String(row.venue_id ?? row.id),
          venueName: String(row.venue_name ?? row.location ?? 'Mataderos'),
          title: String(row.title ?? ''),
          description: String(row.description ?? ''),
          category: (row.category as EventCategory) ?? 'Cultura',
          barrio,
          ambito,
          place: String(row.place ?? row.location ?? 'Mataderos'),
          mapsQuery: String(row.maps_query ?? `${row.location ?? 'Mataderos'}, ${barrio}, CABA, Argentina`),
          startsAt,
          endsAt,
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

    return mapped.length > 0 ? mapped : AGENDA_ITEMS;
  } catch {
    return AGENDA_ITEMS;
  }
}

function mapEmprendedorRow(row: Record<string, unknown>): Emprendedor {
  const photosRaw = Array.isArray(row.photos) ? row.photos : [];
  const photos = photosRaw
    .filter((entry): entry is Record<string, unknown> => Boolean(entry && typeof entry === 'object'))
    .map((entry) => ({
      src: safeImageSrc(entry.src, ''),
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
    heroImage: safeImageSrc(row.hero_image, '/notas/frente-recova.jpg'),
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
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return EMPRENDEDORES;

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
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
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
    }
  } catch {
    // Fallback limpio a los perfiles curados locales si la tabla aún no existe
  }

  return getEmprendedorBySlug(normalized) ?? null;
}

/**
 * Devuelve todos los slugs ocupados entre comercios, emprendedores y postulaciones activas
 * para evitar colisiones desde /sumate y #sumar-comercio.
 */
export async function fetchTakenSlugs(): Promise<string[]> {
  const taken = new Set<string>(BUILT_IN_TAKEN_SLUGS);
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return Array.from(taken);

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
 * Devuelve el cliente server-side para escrituras e indica si usa SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY.
 * Si cae a la publishable/anon key, las tablas sin policy de SELECT (como `sumate_submissions`) deben insertar
 * sin `.select()` para respetar RLS.
 */
export function getSupabaseWriteContext(): SupabaseWriteContext | null {
  try {
    const url = getSupabaseUrl();
    const secretKey = getSupabaseSecretKey();
    const publicKey = getSupabasePublicKey();
    if (!url) return null;
    if (secretKey) {
      return {
        client: createClient(url, secretKey, { auth: { persistSession: false } }),
        isServiceRole: true
      };
    }
    if (publicKey) {
      return {
        client: createClient(url, publicKey, { auth: { persistSession: false } }),
        isServiceRole: false
      };
    }
  } catch {
    return null;
  }
  return null;
}

/** Cliente server-side opcional para altas en rutas API cuando esté habilitado el modo DB. */
export function getSupabaseWriteClient(): SupabaseClient | null {
  return getSupabaseWriteContext()?.client ?? null;
}
