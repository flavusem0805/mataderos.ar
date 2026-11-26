import { whatsappUrl } from '@/lib/contact';

/**
 * Cantidad real de comercios fundadores confirmados.
 * Mientras sea menor a 20, la barra de confianza usa la variante de convocatoria abierta.
 */
export const FOUNDERS_LIVE_COUNT = 0;

export const SUMATE_HERO = {
  eyebrow: 'Para comercios, servicios y ferias de Mataderos',
  h1: 'Más clientes del barrio. Sin aprender marketing.',
  sub: 'Te ponemos en la guía donde los vecinos buscan, en Google y en WhatsApp. Cargamos tus fotos, horarios y catálogo. Vos atendés; del resto nos ocupamos.',
  primaryCtaLabel: 'Quiero que me encuentren',
  primaryCtaHref: whatsappUrl(
    'Hola, quiero que me encuentren más vecinos en Mataderos.ar. ¿Coordinamos una charla de 15 minutos?'
  ),
  secondaryCtaLabel: 'Ver planes y acceso anticipado',
  secondaryCtaHref: '#planes',
  trustLine: 'Ficha gratis · Acceso anticipado · Sin contrato · Te respondemos hoy'
};

export const SUMATE_TRUST_ITEMS: string[] =
  FOUNDERS_LIVE_COUNT >= 20
    ? ['20 comercios fundadores', 'Fotos reales', 'Datos verificados', 'Respuesta en el día']
    : ['Programa fundador abierto', 'Fotos reales', 'Datos verificados', 'Respuesta en el día'];

export const SUMATE_HOW_IT_WORKS = {
  eyebrow: 'Cómo funciona',
  title: 'En tres pasos simples, sin perder tiempo',
  subtitle:
    'No tenés que aprender herramientas ni armar textos largos. Nos ocupamos nosotros y te mostramos el resultado antes de publicar.',
  ctaLabel: 'Hablá con nosotros',
  ctaHref: whatsappUrl(
    'Hola, quiero hablar 15 minutos para sumar mi comercio a Mataderos.ar.'
  ),
  steps: [
    {
      number: '01',
      title: 'Hablás con nosotros (15 minutos).',
      body: 'Nos contás qué vendés y a quién. Por WhatsApp, sin formularios largos.'
    },
    {
      number: '02',
      title: 'Vamos a tu local.',
      body: 'Sacamos fotos, cargamos horarios, armamos tu catálogo y tu perfil de Google.'
    },
    {
      number: '03',
      title: 'Empezás a recibir consultas.',
      body: 'Te avisamos cuando alguien te escribe y te mandamos un reporte simple cada mes.'
    }
  ]
};

export const SUMATE_DELIVERABLES = {
  eyebrow: 'Qué hacemos por vos',
  title: 'Entregables concretos para que te escriban',
  subtitle:
    'La unidad que importa es la consulta: clic a WhatsApp, llamada, «cómo llegar» o pedido de turno.',
  items: [
    'Te hacemos visible cuando buscan tu rubro en Mataderos.',
    'Te ponemos en Google con horarios, fotos y botón de WhatsApp.',
    'Te armamos el link de bio con catálogo, menú o servicios.',
    'Te publicamos una oferta o novedad por mes.',
    'Te medimos las consultas y te contamos qué funcionó.',
    'Te damos el QR para el mostrador y la vidriera.'
  ]
};

export interface ComparisonRow {
  feature: string;
  instagram: 'Sí' | 'Parcial' | 'No';
  google: 'Sí' | 'Parcial' | 'No';
  mataderos: 'Sí' | 'Parcial' | 'No';
}

export const SUMATE_COMPARISON = {
  eyebrow: 'Por qué suma a lo que ya tenés',
  title: 'Instagram te muestra a quien ya te sigue. Mataderos.ar te encuentra a quien te busca.',
  caption: 'Comparativa entre Instagram, Google y Mataderos.ar para comercios del barrio',
  rows: [
    {
      feature: 'Te ven tus seguidores',
      instagram: 'Sí',
      google: 'No',
      mataderos: 'Sí'
    },
    {
      feature: 'Te busca quien no te conoce',
      instagram: 'No',
      google: 'Sí',
      mataderos: 'Sí'
    },
    {
      feature: 'Horarios, dirección y «abierto ahora»',
      instagram: 'No',
      google: 'Sí',
      mataderos: 'Sí'
    },
    {
      feature: 'Catálogo o menú + WhatsApp en un link',
      instagram: 'Parcial',
      google: 'No',
      mataderos: 'Sí'
    },
    {
      feature: 'Datos verificados por el barrio',
      instagram: 'No',
      google: 'Parcial',
      mataderos: 'Sí'
    },
    {
      feature: 'Reporte de consultas',
      instagram: 'Parcial',
      google: 'Parcial',
      mataderos: 'Sí'
    },
    {
      feature: 'Te lo dejamos listo nosotros',
      instagram: 'No',
      google: 'No',
      mataderos: 'Sí'
    }
  ] satisfies ComparisonRow[]
};

export const SUMATE_PLANS_COPY = {
  eyebrow: 'Planes · Acceso anticipado',
  title: 'Planes claros. Sin letra chica.',
  subtitle:
    'Elegí cuánto querés que hagamos por vos. La ficha básica es gratis para siempre y los planes gestionados están en etapa de acceso anticipado con condiciones preferenciales.',
  especialHeading: 'Feriantes y marcas del barrio',
  microcopy: [
    'Sin contrato de permanencia. Tus datos y fotos son tuyos.',
    'No compramos reseñas. No prometemos virales.',
    'Los valores y condiciones de cada plan en acceso anticipado se confirman por escrito antes de empezar.'
  ]
};

export const SUMATE_FOUNDERS = {
  eyebrow: 'Acceso anticipado · Cupo limitado',
  title: 'Estamos abriendo con 20 comercios fundadores.',
  body: 'Les damos 3 meses de acompañamiento, fotos sin cargo y condiciones preferenciales de lanzamiento. A cambio, medimos todo y publicamos el primer caso con su permiso.',
  metricsLabel: 'Lo que vamos a medir desde el primer mes',
  metrics: [
    'Consultas directas por WhatsApp',
    'Llamadas desde la ficha',
    'Clics en «cómo llegar»',
    'Vistas reales de tu ficha y catálogo'
  ],
  ctaLabel: 'Quiero ser comercio fundador',
  ctaHref: whatsappUrl(
    'Hola, quiero postular mi local para el programa de 20 comercios fundadores en acceso anticipado de Mataderos.ar.'
  )
};

export const SUMATE_SPONSORS = {
  eyebrow: 'Para sponsors y marcas locales',
  title: '¿Tenés una marca, un banco, una inmobiliaria o un colegio?',
  body: 'Llegá a los vecinos que buscan, comparan y compran en Mataderos. Audiencia local, formatos editoriales claros y condiciones en un solo lugar.',
  ctaLabel: 'Pedir media kit',
  ctaHref: whatsappUrl('Hola, quiero recibir el media kit de Mataderos.ar para sponsors.'),
  secondaryLinkLabel: 'Ver formatos para sponsors',
  secondaryLinkHref: '/sumate/sponsors',
  formats: [
    {
      title: 'Presencia en la portada del barrio',
      body: 'Espacios integrados con estética editorial limpia, sin banners invasivos ni pop-ups, frente a vecinos de Comuna 9.'
    },
    {
      title: 'Difusión en WhatsApp y agenda semanal',
      body: 'Mención auspiciada en la curaduría de actividades de fin de semana, Feria de Mataderos y novedades del barrio.'
    },
    {
      title: 'Contenido editorial patrocinado',
      body: 'Notas útiles vinculadas al barrio (servicios, vivienda, salud, educación) claramente identificadas como contenido patrocinado.'
    },
    {
      title: 'Acompañamiento en eventos locales',
      body: 'Cobertura y presencia asociada a fechas clave del calendario vecinal, ferias y actividades culturales.'
    }
  ]
};

export interface SumateFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SUMATE_FAQ: SumateFaqItem[] = [
  {
    id: 'faq-instagram',
    question: 'Ya tengo Instagram. ¿Para qué esto?',
    answer:
      'Instagram te muestra a quien ya te sigue. Mataderos.ar te encuentra a quien te busca. No compiten: se complementan.'
  },
  {
    id: 'faq-es-web',
    question: '¿Es una web?',
    answer:
      'Es tu página en la guía del barrio, tu ficha de Google y tu catálogo de WhatsApp en un solo lugar. La página en Mataderos.ar es una parte, no el todo.'
  },
  {
    id: 'faq-tiempo',
    question: 'No tengo tiempo.',
    answer: 'Por eso lo hacemos nosotros. Vos solo atendés las consultas.'
  },
  {
    id: 'faq-clientes',
    question: '¿Me aseguran clientes?',
    answer:
      'No vendemos humo. Te aseguramos trabajo, seguimiento y medición real de cada consulta: clics a WhatsApp, llamadas y visitas a tu ficha.'
  },
  {
    id: 'faq-irme',
    question: '¿Puedo irme?',
    answer: 'Sí. Sin contrato de permanencia. Te llevás tus fotos, textos y datos.'
  },
  {
    id: 'faq-precios',
    question: '¿Cómo funcionan los precios y la facturación?',
    answer:
      'La ficha básica en la guía es gratuita para siempre. Los planes gestionados y sponsors están en etapa de acceso anticipado: te enviamos la propuesta y acordamos condiciones comerciales y de facturación por escrito antes de contratar.'
  }
];

export const SUMATE_FINAL_CTA = {
  eyebrow: 'Charla sin compromiso',
  title: '¿Hablamos 15 minutos?',
  body: 'Contanos tu rubro y tu dirección. Te escribimos hoy por WhatsApp.',
  ctaLabel: 'Escribir por WhatsApp',
  ctaHref: whatsappUrl(
    'Hola, quiero sumar mi comercio a Mataderos.ar. Mi rubro es [RUBRO] y estoy en [DIRECCIÓN].'
  )
};

export const SUMATE_LEAD_FORM_COPY = {
  eyebrow: 'Contacto rápido',
  title: 'Dejanos 4 datos y te escribimos hoy',
  subtitle:
    'Sin registro ni contraseñas. Te contactamos por WhatsApp para coordinar una charla de 15 minutos.',
  submitLabel: 'Quiero que me contacten',
  submittingLabel: 'Enviando consulta...',
  successPrefix: 'Listo. Te escribimos hoy por WhatsApp. Si querés adelantar, escribinos vos:',
  errorPrefix: 'No pudimos enviar el formulario. Escribinos directo por WhatsApp:',
  legalPrefix: 'Acepto la',
  goals: [
    'Que me encuentren',
    'Tener página en Mataderos.ar',
    'Aparecer en Google',
    'Ordenar WhatsApp/catálogo',
    'No sé, quiero asesoramiento'
  ]
};
