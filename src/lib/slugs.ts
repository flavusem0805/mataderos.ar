import { BUSINESSES } from './data';
import { EMPRENDEDORES, type LocationType } from './emprendedores';

export type SumateMode = 'comercio' | 'emprendedor';

export type SumateDesiredPlan =
  | 'ficha_gratuita'
  | 'web_oficial'
  | 'gratis_verificado'
  | 'fundadores';

export interface SumateSubmissionPayload {
  mode: SumateMode;
  desiredPlan: SumateDesiredPlan;
  displayName: string;
  slug: string;
  category: string;
  zoneOrFeria: string;
  locationType?: LocationType;
  addressOrPuesto: string;
  hoursSummary: string;
  tagline: string;
  whatsapp: string;
  contactEmail?: string;
  instagram?: string;
  hasPdfCatalog?: boolean;
  acceptedTerms: boolean;
}

export interface SlugCheckResult {
  slug: string;
  isPlaceholder: boolean;
  available: boolean;
  reason: 'empty' | 'too_short' | 'reserved' | 'taken' | 'ok';
  suggestions: string[];
}

export const RESERVED_SLUGS: ReadonlySet<string> = new Set([
  'www',
  'mail',
  'webmail',
  'info',
  'noreply',
  'no-reply',
  'smtp',
  'imap',
  'pop',
  'ftp',
  'cdn',
  'assets',
  'static',
  'media',
  'admin',
  'panel',
  'dashboard',
  'api',
  'auth',
  'login',
  'entrar',
  'onboarding',
  'sumate',
  'directorio',
  'agenda',
  'notas',
  'emprendedores',
  'emprendedor',
  'comercios',
  'comercio',
  'privacidad',
  'terminos',
  'ayuda',
  'soporte',
  'contacto',
  'app',
  'dev',
  'staging',
  'test',
  'localhost',
  'root',
  'mataderos',
  'mataderosar',
  'feriademataderos',
  'elplata',
  'cineteatroelplata',
  'tulocal',
  'tunombre',
  'tunegocio'
]);

export const BUILT_IN_TAKEN_SLUGS: string[] = Array.from(
  new Set([
    ...BUSINESSES.map((item) => item.slug.toLowerCase()),
    ...EMPRENDEDORES.map((item) => item.slug.toLowerCase())
  ])
);

const MAX_COMERCIO_SLUG = 28;
const MAX_EMPRENDEDOR_SLUG = 40;

export function normalizeComercioSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, MAX_COMERCIO_SLUG);
}

export function normalizeEmprendedorSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_EMPRENDEDOR_SLUG)
    .replace(/-+$/g, '');
}

export function normalizeSlugByMode(input: string, mode: SumateMode): string {
  return mode === 'comercio'
    ? normalizeComercioSlug(input)
    : normalizeEmprendedorSlug(input);
}

function compactKey(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function buildTakenLookup(takenSlugs: string[]): Set<string> {
  const lookup = new Set<string>();
  for (const slug of BUILT_IN_TAKEN_SLUGS) {
    lookup.add(slug.toLowerCase());
    lookup.add(compactKey(slug));
  }
  for (const slug of takenSlugs) {
    const clean = slug.trim().toLowerCase();
    if (!clean) continue;
    lookup.add(clean);
    lookup.add(compactKey(clean));
  }
  return lookup;
}

export function checkSlugAvailability(
  rawInput: string,
  takenSlugs: string[],
  mode: SumateMode
): SlugCheckResult {
  const slug = normalizeSlugByMode(rawInput, mode);
  const placeholder = mode === 'comercio' ? 'tulocal' : 'tu-emprendimiento';

  if (!slug) {
    return {
      slug: placeholder,
      isPlaceholder: true,
      available: false,
      reason: 'empty',
      suggestions: []
    };
  }

  if (slug.length < 3) {
    return {
      slug,
      isPlaceholder: false,
      available: false,
      reason: 'too_short',
      suggestions: []
    };
  }

  const lookup = buildTakenLookup(takenSlugs);
  const compact = compactKey(slug);
  const isReserved = RESERVED_SLUGS.has(slug) || RESERVED_SLUGS.has(compact);
  const isTaken = lookup.has(slug) || lookup.has(compact);

  if (!isReserved && !isTaken) {
    return {
      slug,
      isPlaceholder: false,
      available: true,
      reason: 'ok',
      suggestions: []
    };
  }

  const suffixes =
    mode === 'comercio'
      ? ['mataderos', 'barrio', 'ok', 'caba']
      : ['-mataderos', '-barrio', '-caba', '-feria'];

  const maxLen = mode === 'comercio' ? MAX_COMERCIO_SLUG : MAX_EMPRENDEDOR_SLUG;
  const suggestions: string[] = [];

  for (const suffix of suffixes) {
    const base = slug.slice(0, Math.max(3, maxLen - suffix.length)).replace(/-+$/g, '');
    const candidate = `${base}${suffix}`;
    const candidateCompact = compactKey(candidate);
    if (!RESERVED_SLUGS.has(candidate) && !RESERVED_SLUGS.has(candidateCompact) && !lookup.has(candidate) && !lookup.has(candidateCompact)) {
      suggestions.push(candidate);
    }
    if (suggestions.length >= 3) break;
  }

  return {
    slug,
    isPlaceholder: false,
    available: false,
    reason: isReserved ? 'reserved' : 'taken',
    suggestions
  };
}

export function normalizeWhatsappAr(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('549')) return digits;
  if (digits.startsWith('54')) return `549${digits.slice(2)}`;
  if (digits.startsWith('011')) return `54911${digits.slice(3)}`;
  if (digits.startsWith('15') && digits.length === 10) return `54911${digits.slice(2)}`;
  if (digits.startsWith('11') && digits.length === 10) return `549${digits}`;
  if (digits.startsWith('0')) return `549${digits.slice(1)}`;
  return digits;
}

export function publicAddressLabel(slug: string, mode: SumateMode): string {
  return mode === 'comercio'
    ? `${slug}.mataderos.ar`
    : `mataderos.ar/emprendedores/${slug}`;
}

export function planDisplayLabel(plan: SumateDesiredPlan): string {
  switch (plan) {
    case 'ficha_gratuita':
      return 'Ficha gratuita en guía de comercios';
    case 'web_oficial':
      return 'Web oficial (.mataderos.ar · TBD)';
    case 'gratis_verificado':
      return 'Landing gratuita verificada';
    case 'fundadores':
      return 'Primera Ronda · Fundadores';
  }
}

export function validateSumatePayload(
  payload: Partial<SumateSubmissionPayload>,
  takenSlugs: string[]
): { valid: boolean; errors: string[]; normalized?: SumateSubmissionPayload } {
  const errors: string[] = [];
  const mode: SumateMode = payload.mode === 'emprendedor' ? 'emprendedor' : 'comercio';
  const defaultPlan: SumateDesiredPlan =
    mode === 'comercio' ? 'ficha_gratuita' : 'fundadores';
  const desiredPlan: SumateDesiredPlan = payload.desiredPlan ?? defaultPlan;

  const displayName = String(payload.displayName ?? '').trim();
  if (displayName.length < 2) {
    errors.push('Ingresá un nombre de al menos 2 caracteres.');
  }

  const slugResult = checkSlugAvailability(
    String(payload.slug ?? displayName),
    takenSlugs,
    mode
  );
  if (!slugResult.available) {
    if (slugResult.reason === 'taken') {
      errors.push('Ese nombre web ya está en uso en Mataderos.ar.');
    } else if (slugResult.reason === 'reserved') {
      errors.push('Ese nombre web está reservado por el portal.');
    } else {
      errors.push('Elegí una dirección web válida de al menos 3 letras o números.');
    }
  }

  const category = String(payload.category ?? '').trim();
  if (!category) {
    errors.push('Seleccioná un rubro.');
  }

  const zoneOrFeria = String(payload.zoneOrFeria ?? '').trim();
  const addressOrPuesto = String(payload.addressOrPuesto ?? '').trim();
  if (addressOrPuesto.length < 3) {
    errors.push(
      mode === 'comercio'
        ? 'Indicá la dirección del local en el barrio.'
        : 'Indicá puesto, feria o referencia barrial.'
    );
  }

  const hoursSummary = String(payload.hoursSummary ?? '').trim();
  if (hoursSummary.length < 3) {
    errors.push('Indicá los días y horarios de atención.');
  }

  const tagline = String(payload.tagline ?? '').trim();
  if (tagline.length < 8) {
    errors.push('Sumá una descripción corta de qué ofrecés (mínimo 8 caracteres).');
  }

  const whatsapp = normalizeWhatsappAr(String(payload.whatsapp ?? ''));
  if (whatsapp.length < 8) {
    errors.push('Ingresá un número de WhatsApp válido (con código de área).');
  }

  const rawEmail = String(payload.contactEmail ?? '').trim().toLowerCase();
  const contactEmail = rawEmail.length > 0 ? rawEmail : undefined;
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    errors.push('Si ingresás un correo electrónico, revisá que tenga un formato válido.');
  }

  if (!payload.acceptedTerms) {
    errors.push('Necesitamos que aceptes los Términos y la Política de privacidad.');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    normalized: {
      mode,
      desiredPlan,
      displayName,
      slug: slugResult.slug,
      category,
      zoneOrFeria: zoneOrFeria || 'Mataderos · Comuna 9',
      locationType: payload.locationType,
      addressOrPuesto,
      hoursSummary,
      tagline,
      whatsapp,
      contactEmail,
      instagram: payload.instagram?.trim() || undefined,
      hasPdfCatalog: Boolean(payload.hasPdfCatalog),
      acceptedTerms: true
    }
  };
}

export function formatWhatsappSummary(payload: SumateSubmissionPayload): string {
  const lines = [
    payload.mode === 'comercio'
      ? 'Hola! Quiero sumar mi comercio a Mataderos.ar:'
      : 'Hola! Quiero sumar mi emprendimiento a Mataderos.ar:',
    `- Modalidad: ${planDisplayLabel(payload.desiredPlan)}`,
    `- Nombre: ${payload.displayName}`,
    `- Dirección elegida: https://${publicAddressLabel(payload.slug, payload.mode)}`,
    `- Rubro: ${payload.category}`,
    `- Zona / referencia: ${payload.zoneOrFeria}`,
    `- Dirección / puesto: ${payload.addressOrPuesto}`,
    `- Horarios: ${payload.hoursSummary}`,
    `- Propuesta: ${payload.tagline}`,
    `- WhatsApp comercial: +${payload.whatsapp}`
  ];

  if (payload.contactEmail) {
    lines.push(`- Email: ${payload.contactEmail}`);
  }
  if (payload.instagram) {
    lines.push(`- Instagram: ${payload.instagram}`);
  }
  if (payload.mode === 'emprendedor' && payload.hasPdfCatalog) {
    lines.push('- Catálogo PDF: listo para adjuntar en este chat');
  }

  return lines.join('\n');
}
