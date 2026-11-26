import { whatsappUrl } from '@/lib/contact';

export type SumatePlanId = 'ficha' | 'encontrado' | 'presencia' | 'feria' | 'sponsor';

export interface SumatePlan {
  id: SumatePlanId;
  group: 'comercio' | 'especial';
  name: string;
  audience: string;
  promise: string;
  includes: string[];
  priceLabel: string;
  priceNote: string;
  featured?: boolean;
  ctaLabel: string;
  whatsappText: string;
  ctaHref: string;
}

const PLAN_DEFS: Omit<SumatePlan, 'ctaHref'>[] = [
  {
    id: 'ficha',
    group: 'comercio',
    name: 'Ficha del barrio',
    audience: 'Todo comercio, servicio o feriante',
    promise: '«Existís en la guía»',
    includes: [
      'Nombre, rubro y dirección o puesto',
      'Horarios de atención actualizados',
      'Botón directo a tu WhatsApp',
      'Ubicación en el mapa del barrio',
      '1 foto real de tu local o puesto'
    ],
    priceLabel: '$0',
    priceNote: 'Gratis para siempre',
    ctaLabel: 'Pedir mi ficha gratis',
    whatsappText:
      'Hola, quiero sumar mi comercio con la Ficha del barrio gratuita en Mataderos.ar.'
  },
  {
    id: 'encontrado',
    group: 'comercio',
    name: 'Encontrado',
    audience: 'Comercios y servicios',
    promise: '«Te encuentran y te escriben»',
    includes: [
      'Todo lo de Ficha del barrio + 8 fotos reales',
      'Prioridad destacada en tu rubro',
      'Página en Mataderos.ar (tunombre.mataderos.ar)',
      'Catálogo o menú + link para tu bio',
      '1 publicación mensual de oferta o novedad',
      'Reporte mensual de consultas'
    ],
    priceLabel: 'Consultar',
    priceNote: 'Acceso anticipado · Etapa de lanzamiento',
    featured: true,
    ctaLabel: 'Consultar plan Encontrado',
    whatsappText:
      'Hola, quiero consultar por el plan Encontrado (acceso anticipado) en Mataderos.ar.'
  },
  {
    id: 'presencia',
    group: 'comercio',
    name: 'Presencia',
    audience: 'Servicios de alto valor',
    promise: '«Nos ocupamos de tu marketing»',
    includes: [
      'Todo lo del plan Encontrado',
      'Google Business Profile gestionado',
      '4 publicaciones mensuales',
      'Seguimiento de reseñas y oferta mensual',
      'Reunión mensual de revisión de resultados'
    ],
    priceLabel: 'Consultar',
    priceNote: 'Acceso anticipado · Etapa de lanzamiento',
    ctaLabel: 'Consultar plan Presencia',
    whatsappText:
      'Hola, quiero consultar por el plan Presencia (acceso anticipado) en Mataderos.ar.'
  },
  {
    id: 'feria',
    group: 'especial',
    name: 'Feria',
    audience: 'Feriantes y artesanos',
    promise: '«El domingo te encuentran en el predio»',
    includes: [
      'Ficha de feriante en la guía y entre semana',
      '6 fotos reales de tus productos y puesto',
      'Ubicación de referencia en la Feria de Mataderos',
      'QR listo para imprimir y mostrar en el puesto',
      '2 publicaciones destacadas + catálogo por WhatsApp'
    ],
    priceLabel: 'Consultar',
    priceNote: 'Acceso anticipado · Por temporada',
    ctaLabel: 'Consultar plan Feria',
    whatsappText:
      'Hola, tengo un puesto o emprendimiento y quiero consultar por el plan Feria (acceso anticipado) en Mataderos.ar.'
  },
  {
    id: 'sponsor',
    group: 'especial',
    name: 'Sponsor',
    audience: 'Bancos, inmobiliarias, clínicas y colegios',
    promise: '«Sé parte del barrio»',
    includes: [
      'Presencia destacada en el portal del barrio',
      'Difusión en envíos de WhatsApp y newsletter',
      'Contenido editorial patrocinado con mención clara',
      'Acompañamiento en agenda y eventos de Mataderos'
    ],
    priceLabel: 'Consultar',
    priceNote: 'Acceso anticipado · Media kit disponible',
    ctaLabel: 'Pedir media kit',
    whatsappText: 'Hola, quiero recibir el media kit de Mataderos.ar para sponsors.'
  }
];

export const SUMATE_PLANS: SumatePlan[] = PLAN_DEFS.map((plan) => ({
  ...plan,
  ctaHref: whatsappUrl(plan.whatsappText)
}));

export const COMERCIO_PLANS: SumatePlan[] = SUMATE_PLANS.filter((plan) => plan.group === 'comercio');

export const ESPECIAL_PLANS: SumatePlan[] = SUMATE_PLANS.filter((plan) => plan.group === 'especial');

export const FERIA_Y_GRATIS_PLANS: SumatePlan[] = SUMATE_PLANS.filter(
  (plan) => plan.id === 'ficha' || plan.id === 'feria'
);

export function isSumatePlanId(value: string | undefined | null): value is SumatePlanId {
  return (
    value === 'ficha' ||
    value === 'encontrado' ||
    value === 'presencia' ||
    value === 'feria' ||
    value === 'sponsor'
  );
}

export function getSumatePlanById(id: SumatePlanId): SumatePlan {
  const found = SUMATE_PLANS.find((plan) => plan.id === id);
  return found ?? SUMATE_PLANS[0];
}

export function buildPlanWhatsappUrl(id: SumatePlanId): string {
  return getSumatePlanById(id).ctaHref;
}
