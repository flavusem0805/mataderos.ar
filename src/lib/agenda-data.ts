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
  },
  // Nuevas fechas verificadas en Mataderos (noviembre–diciembre 2026). El orden cronológico lo resuelven TopRail, AgendaStrip y AgendaExplorer según startsAt.
  {
    id: 'noche-templos-san-vicente-2026-11-28',
    venueId: 'san-vicente',
    venueName: 'Parroquia San Vicente de Paúl',
    title: 'La Noche de los Templos en San Vicente de Paúl',
    description:
      '10ª edición de La Noche de los Templos en Mataderos. A las 20 hs concierto de apertura de Red Coral Argentina (dir. Hugo Castro); a las 21 hs muestra de arte religioso en mosaico (María del Carmen Dany), veneración de reliquias y visita guiada por la historia y los altares del templo; desde las 21:30 hs canciones para la meditación cada 30 min.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Manuel Artigas 6150',
    mapsQuery: 'Parroquia San Vicente de Paúl, Manuel Artigas 6150, Mataderos, CABA, Argentina',
    startsAt: '2026-11-28T20:00:00-03:00',
    endsAt: '2026-11-28T23:30:00-03:00',
    timeLabel: 'Desde las 20:00 hs',
    priceLabel: 'Entrada libre y gratuita',
    isFree: true,
    highlightTag: 'La Noche de los Templos',
    source: {
      label: 'Aquí Mataderos',
      url: 'https://aquimataderosonline.com.ar/la-noche-de-los-templos-celebra-la-diversidad-cultural-y-religiosa/'
    }
  },
  {
    id: 'antirrabica-salaberry-2026-11-29',
    venueId: 'plaza-salaberry',
    venueName: 'Plaza Salaberry',
    title: 'Vacunación antirrábica gratuita para perros y gatos',
    description:
      'Operativo móvil de Animales BA (GCBA) para perros y gatos mayores de 3 meses que no se hayan vacunado contra la rabia en el último año. Atención sin turno previo, por orden de llegada (llevar correa/bozal o transportadora).',
    category: 'Comunidad',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Juan B. Alberdi y Pilar',
    mapsQuery: 'Plaza Salaberry, Av. Juan B. Alberdi y Pilar, Mataderos, CABA, Argentina',
    startsAt: '2026-11-29T09:00:00-03:00',
    endsAt: '2026-11-29T12:30:00-03:00',
    timeLabel: '09:00 a 12:30 hs',
    priceLabel: 'Gratuita · Sin turno previo (orden de llegada)',
    isFree: true,
    highlightTag: 'Animales BA · Salud animal',
    source: {
      label: 'Animales BA (GCBA)',
      url: 'https://buenosaires.gob.ar/atencion-veterinaria-y-castraciones-gratuitas'
    }
  },
  {
    id: 'manualistas-alberdi-2026-11-29',
    venueId: 'parque-alberdi',
    venueName: 'Feria de Manualistas · Parque Alberdi',
    title: 'Feria de Manualistas en Parque Alberdi',
    description:
      'Feria oficial de interés social de la Ciudad con puestos de artesanías y manualidades en cuero, cerámica, madera, tejido, bijouterie, mates y decoración sobre el Parque Juan Bautista Alberdi.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. Directorio',
    mapsQuery: 'Parque Alberdi, Av. Lisandro de la Torre y Av. Directorio, Mataderos, CABA, Argentina',
    startsAt: '2026-11-29T10:00:00-03:00',
    endsAt: '2026-11-29T20:00:00-03:00',
    timeLabel: '10:00 a 20:00 hs',
    priceLabel: 'Acceso libre y gratuito',
    isFree: true,
    highlightTag: 'Feria barrial · GCBA',
    source: {
      label: 'Vamos Feria / GCBA',
      url: 'https://www.vamosferia.com/feria/oficial-5be24bfe-77c2-4f45-903a-489276b750b9-29112026'
    }
  },
  {
    id: 'fiab-mataderos-2026-12-01',
    venueId: 'fiab-mataderos',
    venueName: 'FIAB 10 · Mataderos',
    title: 'Feria Itinerante de Abastecimiento Barrial (FIAB 10)',
    description:
      'Puestos móviles oficiales de alimentos frescos, frutas, verduras, carnes, lácteos y panificados con precios de referencia acordados por el Gobierno porteño.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Basualdo 800 (entre Manuel Artigas y Av. Juan B. Alberdi)',
    mapsQuery: 'Basualdo 800, Mataderos, CABA, Argentina',
    startsAt: '2026-12-01T08:00:00-03:00',
    endsAt: '2026-12-01T14:00:00-03:00',
    timeLabel: '08:00 a 14:00 hs',
    priceLabel: 'Acceso libre · Abastecimiento GCBA',
    isFree: true,
    highlightTag: 'FIAB · Todos los martes',
    source: {
      label: 'Ferias de la Ciudad (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/ubicaciones-y-horarios'
    }
  },
  {
    id: 'arjona-bar-del-glorias-2026-12-03',
    venueId: 'bar-del-glorias',
    venueName: 'El Bar del Glorias',
    title: 'Arjona en Mataderos (show tributo)',
    description:
      'Recital tributo a Ricardo Arjona en el histórico bar notable del Club Glorias Argentinas. Entradas anticipadas a la venta a través de Passline.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Andalgalá 1982',
    mapsQuery: 'El Bar del Glorias, Andalgalá 1982, Mataderos, CABA, Argentina',
    startsAt: '2026-12-03T20:30:00-03:00',
    endsAt: '2026-12-03T23:00:00-03:00',
    timeLabel: '20:30 hs',
    priceLabel: 'Entradas desde $10.000 (Passline)',
    isFree: false,
    highlightTag: 'Música en vivo · Bar Notable',
    source: {
      label: 'Eleven Flow / Pogo',
      url: 'https://elevenflow.app/events/arjona-en-mataderos-20261203-c0o5'
    }
  },
  {
    id: 'antes-de-entrar-cultural-republica-2026-12-05',
    venueId: 'cultural-republica',
    venueName: 'Cultural de la República',
    title: 'Antes de entrar, dejen salir',
    description:
      'Comedia dramática de 60 minutos dirigida por Laura Montes de Oca: dos hermanos distanciados vuelven a encontrarse frente al enigma del paradero de su padre. Función presencial para adultos en sala independiente.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Larrazábal 1346',
    mapsQuery: 'Cultural de la República, Av. Larrazábal 1346, Mataderos, CABA, Argentina',
    startsAt: '2026-12-05T20:00:00-03:00',
    endsAt: '2026-12-05T21:15:00-03:00',
    timeLabel: '20:00 hs (60 min)',
    priceLabel: 'A la gorra consciente · Reserva sin cargo',
    isFree: true,
    highlightTag: 'Teatro independiente',
    source: {
      label: 'Alternativa Teatral',
      url: 'https://www.alternativateatral.com/obra97759-antes-de-entrar-dejen-salir'
    }
  },
  {
    id: 'alfredo-silva-glorias-2026-12-05',
    venueId: 'bar-del-glorias',
    venueName: 'El Bar del Glorias',
    title: 'Alfredo Silva · Cena show de humor',
    description:
      'El humorista Alfredo Silva presenta su espectáculo de humor en formato cena show en Mataderos, en la previa de su temporada de verano.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Andalgalá 1982',
    mapsQuery: 'El Bar del Glorias, Andalgalá 1982, Mataderos, CABA, Argentina',
    startsAt: '2026-12-05T20:30:00-03:00',
    endsAt: '2026-12-05T23:30:00-03:00',
    timeLabel: '20:30 hs',
    priceLabel: 'Cena show · Consultar reserva en el bar',
    isFree: false,
    highlightTag: 'Humor · Bar Notable',
    source: {
      label: 'Vive Click',
      url: 'https://vive.click/alfredo-silva-se-prepara-para-conquistar-la-costa-atlantica-con-una-nueva-propuesta-de-humor-y-revelo-los-detalles-de-su-espectaculo/'
    }
  },
  {
    id: 'manualistas-alberdi-2026-12-06',
    venueId: 'parque-alberdi',
    venueName: 'Feria de Manualistas · Parque Alberdi',
    title: 'Feria de Manualistas en Parque Alberdi',
    description:
      'Feria permanente de manualistas y emprendimientos artesanales de la Ciudad sobre el Parque Alberdi. Funciona domingos y feriados de 10 a 20 hs.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. Directorio',
    mapsQuery: 'Parque Alberdi, Av. Lisandro de la Torre y Av. Directorio, Mataderos, CABA, Argentina',
    startsAt: '2026-12-06T10:00:00-03:00',
    endsAt: '2026-12-06T20:00:00-03:00',
    timeLabel: '10:00 a 20:00 hs',
    priceLabel: 'Acceso libre y gratuito',
    isFree: true,
    highlightTag: 'Feria barrial · GCBA',
    source: {
      label: 'Espacio Público (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/espaciopublicoehigieneurbana/ferias/ferias-de-interes-social/ferias-de-manualistas'
    }
  },
  {
    id: 'palmeras-bar-del-glorias-2026-12-06',
    venueId: 'bar-del-glorias',
    venueName: 'El Bar del Glorias',
    title: 'Tributo a Los Palmeras · Almuerzo show y baile',
    description:
      'Mediodía de almuerzo show, imitaciones y baile en vivo con tributo a Los Palmeras (Producciones marianshow).',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Andalgalá 1982',
    mapsQuery: 'El Bar del Glorias, Andalgalá 1982, Mataderos, CABA, Argentina',
    startsAt: '2026-12-06T13:00:00-03:00',
    endsAt: '2026-12-06T16:30:00-03:00',
    timeLabel: '13:00 hs (mediodía)',
    priceLabel: 'Entrada $10.000 (Passline)',
    isFree: false,
    highlightTag: 'Música y baile · Bar Notable',
    source: {
      label: 'Passline',
      url: 'https://www.passline.com/eventos/tributo-a-los-palmeras-en-bar-del-glorias'
    }
  },
  {
    id: 'manualistas-alberdi-2026-12-08',
    venueId: 'parque-alberdi',
    venueName: 'Feria de Manualistas · Parque Alberdi',
    title: 'Feria de Manualistas en Parque Alberdi (Feriado 8/12)',
    description:
      'Edición por feriado nacional (Inmaculada Concepción de María) de la feria de manualistas del GCBA sobre Parque Alberdi, de 10 a 20 hs.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. Directorio',
    mapsQuery: 'Parque Alberdi, Av. Lisandro de la Torre y Av. Directorio, Mataderos, CABA, Argentina',
    startsAt: '2026-12-08T10:00:00-03:00',
    endsAt: '2026-12-08T20:00:00-03:00',
    timeLabel: '10:00 a 20:00 hs',
    priceLabel: 'Acceso libre y gratuito',
    isFree: true,
    highlightTag: 'Feriado · Feria GCBA',
    source: {
      label: 'Espacio Público (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/espaciopublicoehigieneurbana/ferias/ferias-de-interes-social/ferias-de-manualistas'
    }
  },
  {
    id: 'camilo-sesto-glorias-2026-12-10',
    venueId: 'bar-del-glorias',
    venueName: 'El Bar del Glorias',
    title: 'Camilo Sesto en Mataderos (tributo)',
    description:
      'Show tributo a Camilo Sesto en El Bar del Glorias de Mataderos. Entradas anticipadas a la venta mediante Passline.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Andalgalá 1982',
    mapsQuery: 'El Bar del Glorias, Andalgalá 1982, Mataderos, CABA, Argentina',
    startsAt: '2026-12-10T20:30:00-03:00',
    endsAt: '2026-12-10T23:00:00-03:00',
    timeLabel: '20:30 hs',
    priceLabel: 'Entradas desde $10.000 (Passline)',
    isFree: false,
    highlightTag: 'Música en vivo · Bar Notable',
    source: {
      label: 'Eleven Flow / Pogo',
      url: 'https://elevenflow.app/events/camilo-sesto-en-mataderos-20261210-z019'
    }
  },
  {
    id: 'manualistas-alberdi-2026-12-13',
    venueId: 'parque-alberdi',
    venueName: 'Feria de Manualistas · Parque Alberdi',
    title: 'Feria de Manualistas en Parque Alberdi',
    description:
      'Edición dominical de la feria oficial de manualidades, textiles, cerámica, madera y decoración en Parque Alberdi.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. Directorio',
    mapsQuery: 'Parque Alberdi, Av. Lisandro de la Torre y Av. Directorio, Mataderos, CABA, Argentina',
    startsAt: '2026-12-13T10:00:00-03:00',
    endsAt: '2026-12-13T20:00:00-03:00',
    timeLabel: '10:00 a 20:00 hs',
    priceLabel: 'Acceso libre y gratuito',
    isFree: true,
    highlightTag: 'Feria barrial · GCBA',
    source: {
      label: 'Espacio Público (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/espaciopublicoehigieneurbana/ferias/ferias-de-interes-social/ferias-de-manualistas'
    }
  },
  {
    id: 'fiab-mataderos-2026-12-15',
    venueId: 'fiab-mataderos',
    venueName: 'FIAB 10 · Mataderos',
    title: 'Feria Itinerante de Abastecimiento Barrial (FIAB 10)',
    description:
      'Feria itinerante semanal de abastecimiento de alimentos frescos en Basualdo al 800, con precios concertados por la Ciudad.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Basualdo 800 (entre Manuel Artigas y Av. Juan B. Alberdi)',
    mapsQuery: 'Basualdo 800, Mataderos, CABA, Argentina',
    startsAt: '2026-12-15T08:00:00-03:00',
    endsAt: '2026-12-15T14:00:00-03:00',
    timeLabel: '08:00 a 14:00 hs',
    priceLabel: 'Acceso libre · Abastecimiento GCBA',
    isFree: true,
    highlightTag: 'FIAB · Todos los martes',
    source: {
      label: 'Ferias de la Ciudad (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/ubicaciones-y-horarios'
    }
  },
  {
    id: 'dyango-bar-del-glorias-2026-12-17',
    venueId: 'bar-del-glorias',
    venueName: 'El Bar del Glorias',
    title: 'Tributo a Dyango en Mataderos',
    description:
      'Recital tributo a Dyango en el bar notable del Club Glorias Argentinas. Entradas anticipadas disponibles vía Passline.',
    category: 'Cultura',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Andalgalá 1982',
    mapsQuery: 'El Bar del Glorias, Andalgalá 1982, Mataderos, CABA, Argentina',
    startsAt: '2026-12-17T20:30:00-03:00',
    endsAt: '2026-12-17T23:00:00-03:00',
    timeLabel: '20:30 hs',
    priceLabel: 'Entradas desde $10.000 (Passline)',
    isFree: false,
    highlightTag: 'Música en vivo · Bar Notable',
    source: {
      label: 'Pogo / Passline',
      url: 'https://pogo.ar/evento/tributo-a-dyango-caba-2026-12-17/'
    }
  },
  {
    id: 'manualistas-alberdi-2026-12-20',
    venueId: 'parque-alberdi',
    venueName: 'Feria de Manualistas · Parque Alberdi',
    title: 'Feria de Manualistas en Parque Alberdi',
    description:
      'Paseo dominical de manualistas, emprendimientos artesanales y regalos de fin de año en Parque Alberdi.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. Directorio',
    mapsQuery: 'Parque Alberdi, Av. Lisandro de la Torre y Av. Directorio, Mataderos, CABA, Argentina',
    startsAt: '2026-12-20T10:00:00-03:00',
    endsAt: '2026-12-20T20:00:00-03:00',
    timeLabel: '10:00 a 20:00 hs',
    priceLabel: 'Acceso libre y gratuito',
    isFree: true,
    highlightTag: 'Feria barrial · GCBA',
    source: {
      label: 'Espacio Público (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/espaciopublicoehigieneurbana/ferias/ferias-de-interes-social/ferias-de-manualistas'
    }
  },
  {
    id: 'fiab-mataderos-2026-12-22',
    venueId: 'fiab-mataderos',
    venueName: 'FIAB 10 · Mataderos',
    title: 'Feria Itinerante de Abastecimiento Barrial (FIAB 10)',
    description:
      'Edición previa a las fiestas de la feria oficial de abastecimiento en Basualdo al 800, con venta de alimentos frescos de 8 a 14 hs.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Basualdo 800 (entre Manuel Artigas y Av. Juan B. Alberdi)',
    mapsQuery: 'Basualdo 800, Mataderos, CABA, Argentina',
    startsAt: '2026-12-22T08:00:00-03:00',
    endsAt: '2026-12-22T14:00:00-03:00',
    timeLabel: '08:00 a 14:00 hs',
    priceLabel: 'Acceso libre · Abastecimiento GCBA',
    isFree: true,
    highlightTag: 'FIAB · Semana navideña',
    source: {
      label: 'Ferias de la Ciudad (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/ubicaciones-y-horarios'
    }
  },
  {
    id: 'manualistas-alberdi-2026-12-27',
    venueId: 'parque-alberdi',
    venueName: 'Feria de Manualistas · Parque Alberdi',
    title: 'Feria de Manualistas en Parque Alberdi · Último domingo del año',
    description:
      'Último domingo de 2026 de la feria de manualistas del GCBA sobre Parque Alberdi, con puestos artesanales de 10 a 20 hs.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Lisandro de la Torre y Av. Directorio',
    mapsQuery: 'Parque Alberdi, Av. Lisandro de la Torre y Av. Directorio, Mataderos, CABA, Argentina',
    startsAt: '2026-12-27T10:00:00-03:00',
    endsAt: '2026-12-27T20:00:00-03:00',
    timeLabel: '10:00 a 20:00 hs',
    priceLabel: 'Acceso libre y gratuito',
    isFree: true,
    highlightTag: 'Último domingo del año',
    source: {
      label: 'Espacio Público (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/espaciopublicoehigieneurbana/ferias/ferias-de-interes-social/ferias-de-manualistas'
    }
  },
  {
    id: 'veterinaria-salaberry-2026-12-28',
    venueId: 'plaza-salaberry',
    venueName: 'Plaza Salaberry',
    title: 'Atención veterinaria gratuita para perros y gatos',
    description:
      'Unidad móvil veterinaria de Animales BA (GCBA) para atención clínica básica en Mataderos. Requiere turno previo sin excepción desde miBA (las agendas semanales habilitan los jueves a las 10 hs). Llevar chapita, collar/correa y bozal o transportadora.',
    category: 'Comunidad',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Av. Juan B. Alberdi y Pilar',
    mapsQuery: 'Plaza Salaberry, Av. Juan B. Alberdi y Pilar, Mataderos, CABA, Argentina',
    startsAt: '2026-12-28T09:00:00-03:00',
    endsAt: '2026-12-30T17:00:00-03:00',
    isMultiDay: true,
    dateBadge: '28 al 30 dic',
    timeLabel: 'Lun 28, mar 29 y mié 30/12 · Horario según turno miBA',
    priceLabel: 'Gratuita · Con turno previo vía miBA (habilita jueves 10 hs)',
    isFree: true,
    highlightTag: 'Animales BA · Turno previo',
    source: {
      label: 'Animales BA (GCBA)',
      url: 'https://buenosaires.gob.ar/atencion-veterinaria-y-castraciones-gratuitas'
    }
  },
  {
    id: 'fiab-mataderos-2026-12-29',
    venueId: 'fiab-mataderos',
    venueName: 'FIAB 10 · Mataderos',
    title: 'Feria Itinerante de Abastecimiento Barrial (FIAB 10)',
    description:
      'Último martes del año de la feria móvil oficial de abastecimiento en Mataderos sobre Basualdo al 800, de 8 a 14 hs.',
    category: 'Feria',
    barrio: 'Mataderos',
    ambito: 'Mataderos',
    place: 'Basualdo 800 (entre Manuel Artigas y Av. Juan B. Alberdi)',
    mapsQuery: 'Basualdo 800, Mataderos, CABA, Argentina',
    startsAt: '2026-12-29T08:00:00-03:00',
    endsAt: '2026-12-29T14:00:00-03:00',
    timeLabel: '08:00 a 14:00 hs',
    priceLabel: 'Acceso libre · Abastecimiento GCBA',
    isFree: true,
    highlightTag: 'FIAB · Último martes 2026',
    source: {
      label: 'Ferias de la Ciudad (GCBA)',
      url: 'https://buenosaires.gob.ar/gcaba_historico/ubicaciones-y-horarios'
    }
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
    id: 'san-vicente',
    label: 'San Vicente de Paúl',
    kicker: 'Manuel Artigas 6150 · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    match: (item) => item.venueId === 'san-vicente'
  },
  {
    id: 'bar-del-glorias',
    label: 'El Bar del Glorias',
    kicker: 'Andalgalá 1982 · Club Glorias Argentinas · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    match: (item) => item.venueId === 'bar-del-glorias'
  },
  {
    id: 'cultural-republica',
    label: 'Cultural de la República',
    kicker: 'Av. Larrazábal 1346 · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    match: (item) => item.venueId === 'cultural-republica'
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
  },
  {
    id: 'parque-alberdi',
    label: 'Parque Alberdi',
    kicker: 'Av. Lisandro de la Torre y Av. Directorio · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    match: (item) => item.venueId === 'parque-alberdi'
  },
  {
    id: 'plaza-salaberry',
    label: 'Plaza Salaberry',
    kicker: 'Av. Juan B. Alberdi y Pilar · Mataderos',
    barrioNote: 'Mataderos',
    ambito: 'Mataderos',
    match: (item) => item.venueId === 'plaza-salaberry'
  }
];
