import type { FotoId } from './notas/media';

export type EventBarrio = 'Mataderos' | 'Liniers' | 'Parque Avellaneda';

/**
 * Distingue actividades dentro de los límites de Mataderos de actividades
 * ubicadas en los otros dos barrios de la Comuna 9 (Liniers y Parque Avellaneda).
 */
export type EventAmbito = 'Mataderos' | 'Comuna 9';

export type EventCategory = 'Feria' | 'Cultura' | 'Comercio' | 'Comunidad';

export interface AgendaSource {
  label: string;
  url: string;
  /** Aviso editorial explícito cuando el dato proviene de una fuente única o red social. */
  note?: string;
}

export interface AgendaItem {
  id: string;
  venueId: string;
  venueName: string;
  title: string;
  description: string;
  category: EventCategory;
  barrio: EventBarrio;
  ambito: EventAmbito;
  place: string;
  mapsQuery: string;
  /** ISO 8601 con huso horario de Buenos Aires (-03:00). */
  startsAt: string;
  /** ISO 8601 con huso horario de Buenos Aires (-03:00). */
  endsAt: string;
  /** True para campañas o ciclos continuos de varios días (ej: SALE MATADEROS). */
  isMultiDay?: boolean;
  /** Etiqueta compacta para campañas continuas (ej: 'Hasta el dom 29/11'). */
  dateBadge?: string;
  /** Texto legible del horario publicado. */
  timeLabel: string;
  /** Condición de acceso o valor de localidad con fuente. */
  priceLabel: string;
  /** Indica si la actividad es de acceso libre y gratuito. */
  isFree: boolean;
  /** Etiqueta corta destacada en la ficha. */
  highlightTag: string;
  source?: AgendaSource;
  /** Slug de nota relacionada en /notas/[slug]. */
  relatedNotaSlug?: string;
  /** Foto verificada local (solo si corresponde fielmente al lugar). */
  photoId?: FotoId;
}

/**
 * Agenda verificada de noviembre y diciembre de 2026.
 * Estructura alineada con la tabla `public.events` de Supabase para migrar sin refactor.
 */
export const AGENDA_ITEMS: AgendaItem[] = [
  {
    id: 'sale-mataderos-2026',
    venueId: 'sale-mataderos',
    venueName: 'Alberdi, De los Corrales y Directorio',
    title: 'SALE MATADEROS: semana de descuentos en el comercio barrial',
    description:
      'Primera edición de la semana de promociones, descuentos y financiación organizada por el Centro Comercial Alberdi, ampliada a unos 30 locales adheridos sobre las avenidas Juan B. Alberdi, De los Corrales y Directorio. Los comercios participantes se identifican con flyers en vidriera y el listado se difunde en @centrocomercialalberdi.',
    category: 'Comercio',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Juan B. Alberdi, Av. de los Corrales y Av. Directorio',
    mapsQuery: 'Av. Juan B. Alberdi y Murguiondo, Mataderos, CABA, Argentina',
    startsAt: '2026-11-23T09:00:00-03:00',
    endsAt: '2026-11-29T21:00:00-03:00',
    isMultiDay: true,
    dateBadge: 'Hasta el dom 29/11',
    timeLabel: 'Del lunes 23 al domingo 29/11 · Horario comercial',
    priceLabel: 'Unos 30 locales adheridos',
    isFree: true,
    highlightTag: 'Comercio barrial',
    source: {
      label: 'CEMBA',
      url: 'https://cemba.com.ar/sale-mataderos-una-semana-de-descuentos-para-impulsar-el-comercio-barrial/'
    },
    relatedNotaSlug: 'sale-mataderos-noviembre-2026',
    photoId: 'corrales'
  },
  {
    id: 'milonga-el-plata-2026-11-27',
    venueId: 'el-plata',
    venueName: 'Cine Teatro El Plata',
    title: 'Milonga en El Plata',
    description:
      'Velada de tango en el hall del Cine Teatro El Plata con la Orquesta del Plata en vivo, artistas invitados, parejas de exhibición, DJ de milonga y clase abierta coordinada por Poly Pérez.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Hall del Cine Teatro El Plata · Av. Juan B. Alberdi 5765',
    mapsQuery: 'Cine Teatro El Plata, Av. Juan B. Alberdi 5765, CABA, Argentina',
    startsAt: '2026-11-27T19:00:00-03:00',
    endsAt: '2026-11-27T22:00:00-03:00',
    timeLabel: '19:00 hs',
    priceLabel: 'Entrada libre y gratuita',
    isFree: true,
    highlightTag: 'Entrada libre',
    source: {
      label: 'Linda BA',
      url: 'https://linda.buenosaires.gob.ar/eventos/milonga-en-el-plata'
    },
    relatedNotaSlug: 'que-hacer-este-finde-en-mataderos-noviembre-2026',
    photoId: 'elPlata'
  },
  {
    id: 'paraiso-el-plata-2026-11-28',
    venueId: 'el-plata',
    venueName: 'Cine Teatro El Plata',
    title: 'Paraíso, con Luciano Cáceres',
    description:
      'Unipersonal de Inmaculada Alvear (versión de Dany Mañas y dirección de Ignacio Rodríguez de Anca) en la programación del Complejo Teatral de Buenos Aires. Duración: 70 minutos. Recomendada para mayores de 13 años. No se permite el ingreso una vez iniciada la función.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Cine Teatro El Plata · Av. Juan B. Alberdi 5765',
    mapsQuery: 'Cine Teatro El Plata, Av. Juan B. Alberdi 5765, CABA, Argentina',
    startsAt: '2026-11-28T19:00:00-03:00',
    endsAt: '2026-11-28T20:10:00-03:00',
    timeLabel: '19:00 hs (70 min)',
    priceLabel: 'Platea $22.500 · Pullman $15.000',
    isFree: false,
    highlightTag: 'Platea $22.500',
    source: {
      label: 'Complejo Teatral',
      url: 'https://complejoteatral.gob.ar/produccion/paraiso/'
    },
    relatedNotaSlug: 'que-hacer-este-finde-en-mataderos-noviembre-2026',
    photoId: 'elPlata'
  },
  {
    id: 'feria-mataderos-2026-11-29',
    venueId: 'feria',
    venueName: 'Feria de Mataderos',
    title: 'Feria de Artesanías y Tradiciones Populares',
    description:
      'Puestos de artesanías, patio de comidas regionales, música y danza folklórica frente a La Recova y El Resero. Anteúltimo mes de la temporada 2026 (quedan los domingos 29/11, 6, 13 y 20/12). Entrada libre; se suspende por lluvia.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. de los Corrales',
    mapsQuery: 'Feria de Mataderos, Av. Lisandro de la Torre y Av. de los Corrales, CABA, Argentina',
    startsAt: '2026-11-29T11:00:00-03:00',
    endsAt: '2026-11-29T19:00:00-03:00',
    timeLabel: '11:00 a 18:00 / 19:00 hs',
    priceLabel: 'Entrada libre · Se suspende por lluvia',
    isFree: true,
    highlightTag: 'Temporada 2026',
    source: {
      label: 'Turismo BA',
      url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos'
    },
    relatedNotaSlug: 'que-hacer-este-finde-en-mataderos-noviembre-2026',
    photoId: 'baile'
  },
  {
    id: 'mural-chicago-pinta-2026-11-29',
    venueId: 'feria',
    venueName: 'Feria de Mataderos',
    title: 'Estreno del mural de Chicago Pinta',
    description:
      'Presentación anunciada del nuevo mural de Chicago Pinta en el ámbito de la Feria de Mataderos. Este aviso se carga únicamente a partir de la publicación de la propia cuenta en X, sin gacetilla oficial adicional.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Feria de Mataderos · Av. Lisandro de la Torre y Av. de los Corrales',
    mapsQuery: 'Feria de Mataderos, Av. Lisandro de la Torre y Av. de los Corrales, CABA, Argentina',
    startsAt: '2026-11-29T12:00:00-03:00',
    endsAt: '2026-11-29T14:00:00-03:00',
    timeLabel: '12:00 hs',
    priceLabel: 'Actividad abierta en la Feria',
    isFree: true,
    highlightTag: 'Fuente única (X)',
    source: {
      label: '@ChicagoPinta en X',
      url: 'https://x.com/ChicagoPinta/status/2123539602090950686',
      note: 'Fuente única: la convocatoria figura solo en el posteo de @ChicagoPinta en X.'
    },
    relatedNotaSlug: 'que-hacer-este-finde-en-mataderos-noviembre-2026',
    photoId: 'baile'
  },
  {
    id: 'paraiso-el-plata-2026-11-29',
    venueId: 'el-plata',
    venueName: 'Cine Teatro El Plata',
    title: 'Paraíso, con Luciano Cáceres',
    description:
      'Segunda función del unipersonal protagonizado por Luciano Cáceres, de Inmaculada Alvear, con dirección de Ignacio Rodríguez de Anca (CTBA). Duración: 70 minutos. Recomendada para mayores de 13 años.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Cine Teatro El Plata · Av. Juan B. Alberdi 5765',
    mapsQuery: 'Cine Teatro El Plata, Av. Juan B. Alberdi 5765, CABA, Argentina',
    startsAt: '2026-11-29T19:00:00-03:00',
    endsAt: '2026-11-29T20:10:00-03:00',
    timeLabel: '19:00 hs (70 min)',
    priceLabel: 'Platea $22.500 · Pullman $15.000',
    isFree: false,
    highlightTag: 'Platea $22.500',
    source: {
      label: 'Complejo Teatral',
      url: 'https://complejoteatral.gob.ar/produccion/paraiso/'
    },
    relatedNotaSlug: 'que-hacer-este-finde-en-mataderos-noviembre-2026',
    photoId: 'elPlata'
  },
  {
    id: 'macedonio-2026-12-01',
    venueId: 'macedonio',
    venueName: 'Centro Cultural Macedonio Fernández',
    title: 'Muestra de fin de año: Ritmos y huellas',
    description:
      'Clase abierta de cierre de año de los talleres de Freedance, Salsa, Bachata, Danzas Folclóricas Argentinas, Rock y Danzas Flamencas, junto con exposición del taller de Grabado en Relieve. Programa Cultural en Barrios.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Centro Cultural Macedonio Fernández · Martiniano Leguizamón 1470',
    mapsQuery: 'Centro Cultural Macedonio Fernandez, Martiniano Leguizamon 1470, Mataderos, CABA, Argentina',
    startsAt: '2026-12-01T18:00:00-03:00',
    endsAt: '2026-12-01T20:45:00-03:00',
    timeLabel: '18:00 a 20:45 hs',
    priceLabel: 'Entrada libre y gratuita',
    isFree: true,
    highlightTag: 'Muestras PCB · Gratis',
    source: {
      label: 'GCBA',
      url: 'https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura'
    },
    relatedNotaSlug: 'cierre-de-ano-macedonio-fernandez-diciembre-2026'
  },
  {
    id: 'feria-mataderos-2026-12-06',
    venueId: 'feria',
    venueName: 'Feria de Mataderos',
    title: 'Feria de Artesanías y Tradiciones Populares',
    description:
      'Primer domingo de diciembre frente a La Recova y El Resero: artesanías, comidas regionales, escenario folklórico y corrida de sortija. Entrada libre; se suspende por lluvia.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. de los Corrales',
    mapsQuery: 'Feria de Mataderos, Av. Lisandro de la Torre y Av. de los Corrales, CABA, Argentina',
    startsAt: '2026-12-06T11:00:00-03:00',
    endsAt: '2026-12-06T19:00:00-03:00',
    timeLabel: '11:00 a 18:00 / 19:00 hs',
    priceLabel: 'Entrada libre · Se suspende por lluvia',
    isFree: true,
    highlightTag: 'Temporada 2026',
    source: {
      label: 'Turismo BA',
      url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos'
    },
    relatedNotaSlug: 'feria-de-mataderos',
    photoId: 'baile'
  },
  {
    id: 'macedonio-2026-12-09',
    venueId: 'macedonio',
    venueName: 'Centro Cultural Macedonio Fernández',
    title: 'Muestra de fin de año: Crear, jugar y compartir',
    description:
      'Jornada de cierre abierta a familias y vecinos para compartir el recorrido anual de los talleres infantiles, con participación de los talleres de Maquillaje Artístico y Caracterización Teatral. Programa Cultural en Barrios.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Centro Cultural Macedonio Fernández · Martiniano Leguizamón 1470',
    mapsQuery: 'Centro Cultural Macedonio Fernandez, Martiniano Leguizamon 1470, Mataderos, CABA, Argentina',
    startsAt: '2026-12-09T18:00:00-03:00',
    endsAt: '2026-12-09T20:45:00-03:00',
    timeLabel: '18:00 a 20:45 hs',
    priceLabel: 'Entrada libre y gratuita',
    isFree: true,
    highlightTag: 'Muestras PCB · Gratis',
    source: {
      label: 'GCBA',
      url: 'https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura'
    },
    relatedNotaSlug: 'cierre-de-ano-macedonio-fernandez-diciembre-2026'
  },
  {
    id: 'macedonio-2026-12-10',
    venueId: 'macedonio',
    venueName: 'Centro Cultural Macedonio Fernández',
    title: 'Muestra de fin de año: Música, encuentro y celebración',
    description:
      'Presentación de cierre anual de los talleres de Música y Canto, junto con una muestra de los trabajos realizados durante el año. Actividad abierta al barrio del Programa Cultural en Barrios.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Centro Cultural Macedonio Fernández · Martiniano Leguizamón 1470',
    mapsQuery: 'Centro Cultural Macedonio Fernandez, Martiniano Leguizamon 1470, Mataderos, CABA, Argentina',
    startsAt: '2026-12-10T18:00:00-03:00',
    endsAt: '2026-12-10T20:45:00-03:00',
    timeLabel: '18:00 a 20:45 hs',
    priceLabel: 'Entrada libre y gratuita',
    isFree: true,
    highlightTag: 'Muestras PCB · Gratis',
    source: {
      label: 'GCBA',
      url: 'https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura'
    },
    relatedNotaSlug: 'cierre-de-ano-macedonio-fernandez-diciembre-2026'
  },
  {
    id: 'macedonio-2026-12-11',
    venueId: 'macedonio',
    venueName: 'Centro Cultural Macedonio Fernández',
    title: 'Muestra de fin de año: El teatro toma la escena',
    description:
      'Escenas, obras ensayadas e improvisaciones a cargo de quienes participaron durante el año del taller de Teatro para Adultos. Cierre de las muestras del Programa Cultural en Barrios en Mataderos.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Centro Cultural Macedonio Fernández · Martiniano Leguizamón 1470',
    mapsQuery: 'Centro Cultural Macedonio Fernandez, Martiniano Leguizamon 1470, Mataderos, CABA, Argentina',
    startsAt: '2026-12-11T18:00:00-03:00',
    endsAt: '2026-12-11T20:45:00-03:00',
    timeLabel: '18:00 a 20:45 hs',
    priceLabel: 'Entrada libre y gratuita',
    isFree: true,
    highlightTag: 'Muestras PCB · Gratis',
    source: {
      label: 'GCBA',
      url: 'https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura'
    },
    relatedNotaSlug: 'cierre-de-ano-macedonio-fernandez-diciembre-2026'
  },
  {
    id: 'feria-mataderos-2026-12-13',
    venueId: 'feria',
    venueName: 'Feria de Mataderos',
    title: 'Feria de Artesanías y Tradiciones Populares',
    description:
      'Anteúltimo domingo de la temporada 2026 en Lisandro de la Torre y Av. de los Corrales: artesanías, patio gastronómico y escenario folklórico. Entrada libre; se suspende por lluvia.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. de los Corrales',
    mapsQuery: 'Feria de Mataderos, Av. Lisandro de la Torre y Av. de los Corrales, CABA, Argentina',
    startsAt: '2026-12-13T11:00:00-03:00',
    endsAt: '2026-12-13T19:00:00-03:00',
    timeLabel: '11:00 a 18:00 / 19:00 hs',
    priceLabel: 'Entrada libre · Se suspende por lluvia',
    isFree: true,
    highlightTag: 'Temporada 2026',
    source: {
      label: 'Turismo BA',
      url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos'
    },
    relatedNotaSlug: 'feria-de-mataderos',
    photoId: 'baile'
  },
  {
    id: 'feria-mataderos-2026-12-20',
    venueId: 'feria',
    venueName: 'Feria de Mataderos',
    title: 'Feria de Mataderos · Último domingo de la temporada',
    description:
      'Último domingo de la temporada 2026 de la Feria de las Artesanías y Tradiciones Populares Argentinas frente a La Recova y El Resero. Entrada libre; se suspende por lluvia.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. de los Corrales',
    mapsQuery: 'Feria de Mataderos, Av. Lisandro de la Torre y Av. de los Corrales, CABA, Argentina',
    startsAt: '2026-12-20T11:00:00-03:00',
    endsAt: '2026-12-20T19:00:00-03:00',
    timeLabel: '11:00 a 18:00 / 19:00 hs',
    priceLabel: 'Entrada libre · Se suspende por lluvia',
    isFree: true,
    highlightTag: 'Cierre de temporada',
    source: {
      label: 'Turismo BA',
      url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos'
    },
    relatedNotaSlug: 'feria-de-mataderos',
    photoId: 'baile'
  }
];

export interface AgendaSpotGroup {
  id: string;
  label: string;
  kicker: string;
  barrioNote: string;
  ambito: EventAmbito;
  photoId?: FotoId;
  /** Coincide contra `item.venueId` o, para 'comuna-9', contra `item.ambito === 'Comuna 9'`. */
  match: (item: AgendaItem) => boolean;
}

export const AGENDA_SPOTS: AgendaSpotGroup[] = [
  {
    id: 'el-plata',
    label: 'El Plata',
    kicker: 'Av. Juan B. Alberdi 5765 · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    photoId: 'elPlata',
    match: (item) => item.venueId === 'el-plata'
  },
  {
    id: 'feria',
    label: 'Feria de Mataderos',
    kicker: 'Lisandro de la Torre y Av. de los Corrales · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    photoId: 'baile',
    match: (item) => item.venueId === 'feria'
  },
  {
    id: 'sale-mataderos',
    label: 'SALE MATADEROS',
    kicker: 'Alberdi, De los Corrales y Directorio · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    photoId: 'corrales',
    match: (item) => item.venueId === 'sale-mataderos'
  },
  {
    id: 'macedonio',
    label: 'Macedonio Fernández',
    kicker: 'Martiniano Leguizamón 1470 · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    match: (item) => item.venueId === 'macedonio'
  }
];
