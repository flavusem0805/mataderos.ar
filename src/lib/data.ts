export type BusinessCategory =
  | 'Mascotas'
  | 'Gastronomía'
  | 'Hogar y Ferretería'
  | 'Salud y Estética';

export type NeighborhoodZone =
  | 'Polo Emilio Castro'
  | 'Av. Alberdi'
  | 'Casco Histórico'
  | 'Av. Eva Perón';

export interface BusinessService {
  icon: string;
  title: string;
  description: string;
  badge: string;
}

export interface BusinessReview {
  author: string;
  neighborhoodNote: string;
  rating: number;
  text: string;
}

export interface BusinessHoursRow {
  days: string;
  schedule: string;
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: BusinessCategory;
  zone: NeighborhoodZone;
  address: string;
  nearCorner: string;
  description: string;
  longDescription: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  hoursSummary: string;
  hours: BusinessHoursRow[];
  isOpenNow: boolean;
  hasSubdomain: boolean;
  featured: boolean;
  heroImage: string;
  emoji: string;
  yearsInNeighborhood: string;
  paymentMethods: string;
  services: BusinessService[];
  reviews: BusinessReview[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  zone: string;
  readTime: string;
  publishedLabel: string;
  imageUrl: string;
  mentionedBusinessSlug?: string;
}

export interface NeighborhoodEvent {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  category: 'Feria' | 'Cultura' | 'Deporte y Clubes';
  description: string;
  highlightTag: string;
}

export interface ZoneSpot {
  id: NeighborhoodZone;
  title: string;
  subtitle: string;
  atmosphere: string;
  landmarks: string[];
  highlightMetric: string;
  imageUrl: string;
}

export interface HeritageMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  symbol: string;
}

export const TICKER_ITEMS: string[] = [
  'Domingos en La Recova: Feria de Mataderos de 11 a 19 hs con entrada libre',
  'Nueva apertura en Polo Emilio Castro: Tostadores de la Castro ya atiende hasta las 20:30 hs',
  'Cine Teatro El Plata (Av. Alberdi 5765): programación cultural toda la semana',
  '¿Tenés local en Mataderos? Sumá tu ficha gratuita o activá tuweb.mataderos.ar',
  'Veterinaria Flavio: envíos sin cargo en el día en Mataderos y Liniers'
];

export const BUSINESSES: Business[] = [
  {
    id: '1',
    slug: 'veterinariaflavio',
    name: 'Veterinaria Flavio',
    category: 'Mascotas',
    zone: 'Av. Alberdi',
    address: 'Av. Juan B. Alberdi 6200',
    nearCorner: 'A 2 cuadras de Murguiondo · Estacionamiento en puerta',
    description:
      'Clínica veterinaria, vacunación, peluquería canina sin jaulas y envíos de alimento sin cargo en Mataderos.',
    longDescription:
      'Más de una década cuidando perros y gatos del barrio con trato cercano, seguimiento clínico real y asesoramiento nutricional personalizado.',
    tagline: 'Cuidamos a tu mascota en el corazón de Mataderos hace más de 10 años.',
    phone: '(011) 4687-4210',
    whatsapp: '5491146874210',
    hoursSummary: 'Abierto · Cierra 20:00 hs',
    hours: [
      { days: 'Lunes a Viernes', schedule: '09:30 a 13:00 · 16:00 a 20:00 hs' },
      { days: 'Sábados', schedule: '09:30 a 14:00 hs' },
      { days: 'Domingos y Feriados', schedule: 'Urgencias coordinadas por WhatsApp' }
    ],
    isOpenNow: true,
    hasSubdomain: true,
    featured: true,
    heroImage:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1000&q=80',
    emoji: '🐾',
    yearsInNeighborhood: '12 años en Mataderos',
    paymentMethods: 'Efectivo, Débito, Transferencia y Mercado Pago',
    services: [
      {
        icon: '🩺',
        title: 'Clínica General y Vacunación',
        description:
          'Consultas clínicas, libretas sanitarias, esquemas de vacunación completos y certificados de viaje.',
        badge: 'Orden de llegada o turno'
      },
      {
        icon: '🦴',
        title: 'Pet Shop y Alimentos Balanceados',
        description:
          'Primeras marcas, dietas medicadas y pipetas. Entrega en el día sin cargo dentro de Mataderos.',
        badge: 'Envío gratis en el barrio'
      },
      {
        icon: '✂️',
        title: 'Peluquería Canina sin Jaulas',
        description:
          'Baños higiénicos y medicados, cortes de raza y cuidado de uñas en ambiente tranquilo.',
        badge: 'Turnos de martes a sábados'
      },
      {
        icon: '🔬',
        title: 'Laboratorio y Ecografías',
        description:
          'Análisis de sangre rápidos, estudios programados y seguimiento geriátrico para mascotas mayores.',
        badge: 'Resultados en el día'
      }
    ],
    reviews: [
      {
        author: 'Laura G.',
        neighborhoodNote: 'Vecina de calle Oliden',
        rating: 5,
        text: 'Atienden a mi perro hace 6 años sobre Alberdi. Súper cálidos, claros con cada diagnóstico y precios justos.'
      },
      {
        author: 'Martín R.',
        neighborhoodNote: 'Vecino de Emilio Castro',
        rating: 5,
        text: 'Les pedí alimento balanceado por WhatsApp a la mañana y al mediodía ya lo tenía en la puerta de casa.'
      }
    ]
  },
  {
    id: '2',
    slug: 'tostadorescastro',
    name: 'Tostadores de la Castro',
    category: 'Gastronomía',
    zone: 'Polo Emilio Castro',
    address: 'Av. Emilio Castro 7420',
    nearCorner: 'Entre Fonrouge y Guardia Nacional · Mesas en vereda',
    description:
      'Café de especialidad recién molido, laminados de masa madre y brunch de fin de semana en el polo gastronómico.',
    longDescription:
      'Un punto de encuentro luminoso sobre el boulevard de Emilio Castro. Granos tostados en Buenos Aires, pastelería horneada cada mañana y sector pet-friendly.',
    tagline: 'Café de especialidad y pastelería artesanal en el corredor de Emilio Castro.',
    phone: '(011) 4644-8912',
    whatsapp: '5491146448912',
    hoursSummary: 'Abierto · Cierra 20:30 hs',
    hours: [
      { days: 'Martes a Viernes', schedule: '08:00 a 20:30 hs' },
      { days: 'Sábados y Domingos', schedule: '09:00 a 21:00 hs' },
      { days: 'Lunes', schedule: 'Cerrado por tueste y descanso' }
    ],
    isOpenNow: true,
    hasSubdomain: true,
    featured: true,
    heroImage:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
    emoji: '☕',
    yearsInNeighborhood: 'Nueva apertura 2026',
    paymentMethods: 'QR, Tarjetas, Efectivo y Cuenta DNI',
    services: [
      {
        icon: '☕',
        title: 'Barra de Espresso y Filtrados',
        description:
          'Flat white, cold brew y métodos filtrados con granos de Colombia y Brasil molidos en el momento.',
        badge: 'Leche vegetal sin recargo'
      },
      {
        icon: '🥐',
        title: 'Laminados y Panadería de Autor',
        description:
          'Croissants de manteca, roll de canela, chipá tibio y tortas de estación salidas del horno.',
        badge: 'Horneado diario 08:00 hs'
      },
      {
        icon: '💻',
        title: 'Mesas con Wifi y Enchufes',
        description:
          'Sector interior tranquilo para trabajar o estudiar tomando un buen café sin apuros.',
        badge: 'Pet friendly en vereda'
      },
      {
        icon: '📦',
        title: 'Cajas de Desayuno y Take Away',
        description:
          'Armá tu caja para regalar en el barrio o encargá tu pedido por WhatsApp para retirar sin fila.',
        badge: 'Retiro express'
      }
    ],
    reviews: [
      {
        author: 'Sofía M.',
        neighborhoodNote: 'Vecina de Av. Emilio Castro',
        rating: 5,
        text: 'El mejor flat white de la zona y los croissants están increíbles. Qué lindo ver crecer así el barrio.'
      },
      {
        author: 'Diego P.',
        neighborhoodNote: 'Vecino de Liniers / Mataderos',
        rating: 5,
        text: 'Vengo a trabajar dos veces por semana a la mañana. Muy buena música, café excelente y atención de diez.'
      }
    ]
  },
  {
    id: '3',
    slug: 'cantinaloscorrales',
    name: 'Cantina Los Corrales',
    category: 'Gastronomía',
    zone: 'Casco Histórico',
    address: 'Av. de los Corrales 6480',
    nearCorner: 'A 1 cuadra de La Recova y el Monumento al Resero',
    description:
      'Bodegón criollo con empanadas al horno de barro, pastas amasadas a mano y cortes a la parrilla.',
    longDescription:
      'Heredera del espíritu de las viejas fondas del Mercado de Hacienda, con porciones generosas para compartir en familia y vermut de la casa.',
    tagline: 'Cocina porteña, horno de barro y espíritu de bodegón frente al casco histórico.',
    phone: '(011) 4686-3305',
    whatsapp: '5491146863305',
    hoursSummary: 'Abierto · Turno noche hasta 00:00',
    hours: [
      { days: 'Miércoles a Viernes', schedule: '12:00 a 15:30 · 20:00 a 00:00 hs' },
      { days: 'Sábados', schedule: '12:00 a 16:00 · 20:00 a 00:30 hs' },
      { days: 'Domingos (Día de Feria)', schedule: '11:30 a 17:30 hs horario corrido' }
    ],
    isOpenNow: true,
    hasSubdomain: true,
    featured: true,
    heroImage:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    emoji: '🍷',
    yearsInNeighborhood: '28 años de historia',
    paymentMethods: 'Efectivo (10% desc.), Débito y Mercado Pago',
    services: [
      {
        icon: '🥟',
        title: 'Empanadas Cortadas a Cuchillo',
        description:
          'Carne suave o picante, humita y jamón y queso cocidas en horno de barro tradicional.',
        badge: 'Clásico de los domingos'
      },
      {
        icon: '🥩',
        title: 'Parrilla y Milanesas para Compartir',
        description:
          'Asado banderita, bife de chorizo y milanesa napolitana tamaño familiar con papas fritas.',
        badge: 'Porciones abundantes'
      },
      {
        icon: '🍝',
        title: 'Pastas Caseras del Barrio',
        description:
          'Ravioles de ricota y nuez, tallarines al huevo y estofado de larga cocción.',
        badge: 'Amasado propio'
      },
      {
        icon: '🥂',
        title: 'Reservas para Reuniones y Clubes',
        description:
          'Salón amplio para cumpleaños familiares, peñas y cenas de amigos en Mataderos.',
        badge: 'Reservá por WhatsApp'
      }
    ],
    reviews: [
      {
        author: 'Carlos V.',
        neighborhoodNote: 'Socio de Nueva Chicago',
        rating: 5,
        text: 'Pasás por la Feria el domingo y cerrás almorzando acá. Las empanadas al barro no tienen rival.'
      },
      {
        author: 'Patricia L.',
        neighborhoodNote: 'Vecina de Los Corrales',
        rating: 5,
        text: 'Bodegón auténtico como los de antes, limpio, rápido y con atención de mozos que conocen a todos.'
      }
    ]
  },
  {
    id: '4',
    slug: 'ferreteria-el-resero',
    name: 'Ferretería Industrial El Resero',
    category: 'Hogar y Ferretería',
    zone: 'Casco Histórico',
    address: 'Av. Lisandro de la Torre 2140',
    nearCorner: 'Esquina Bragado · A pasos del parque',
    description:
      'Herramientas eléctricas, bulonería, plomería, pinturería y asesoramiento técnico para arreglos del hogar.',
    longDescription:
      'Ferretería histórica de Mataderos con stock permanente para consorcios, talleres y reparaciones domésticas.',
    tagline: 'Todo en herramientas, electricidad y pinturería en Lisandro de la Torre.',
    phone: '(011) 4687-1180',
    whatsapp: '5491146871180',
    hoursSummary: 'Abierto · Cierra 19:30 hs',
    hours: [
      { days: 'Lunes a Viernes', schedule: '08:30 a 13:00 · 14:30 a 19:30 hs' },
      { days: 'Sábados', schedule: '09:00 a 14:00 hs' }
    ],
    isOpenNow: true,
    hasSubdomain: false,
    featured: false,
    heroImage:
      'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=900&q=80',
    emoji: '🛠️',
    yearsInNeighborhood: '34 años en el barrio',
    paymentMethods: 'Efectivo, Tarjetas y Factura A/B',
    services: [],
    reviews: []
  },
  {
    id: '5',
    slug: 'centro-kine-alberdi',
    name: 'Centro Kine Alberdi',
    category: 'Salud y Estética',
    zone: 'Av. Alberdi',
    address: 'Murguiondo 1490',
    nearCorner: 'A metros de Av. Juan B. Alberdi',
    description:
      'Rehabilitación traumatológica, RPG, kinesiología deportiva y osteopatía con turnos programados.',
    longDescription:
      'Consultorio moderno atendido por licenciados de la zona, con equipamiento de fisioterapia y gimnasio terapéutico.',
    tagline: 'Kinesiología y recuperación funcional en pleno centro comercial.',
    phone: '(011) 4686-9040',
    whatsapp: '5491146869040',
    hoursSummary: 'Cerrado · Abre 08:30 hs',
    hours: [{ days: 'Lunes a Viernes', schedule: '08:30 a 19:00 hs' }],
    isOpenNow: false,
    hasSubdomain: false,
    featured: false,
    heroImage:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
    emoji: '🏥',
    yearsInNeighborhood: '7 años en Mataderos',
    paymentMethods: 'Obras sociales y particular',
    services: [],
    reviews: []
  },
  {
    id: '6',
    slug: 'vivero-jardin-sur',
    name: 'Vivero & Jardín Sur',
    category: 'Hogar y Ferretería',
    zone: 'Av. Eva Perón',
    address: 'Av. Eva Perón 5910',
    nearCorner: 'Entre Larrazábal y Fonrouge',
    description:
      'Plantas de interior, cítricos, sustratos orgánicos, macetas de barro y asesoramiento para balcones.',
    longDescription:
      'Vivero urbano con especies adaptadas al clima porteño y entregas programadas en toda la Comuna 9.',
    tagline: 'Verde para patios, terrazas y balcones de Mataderos.',
    phone: '(011) 4682-7741',
    whatsapp: '5491146827741',
    hoursSummary: 'Cerrado · Abre 09:00 hs',
    hours: [{ days: 'Martes a Domingos', schedule: '09:00 a 18:30 hs' }],
    isOpenNow: false,
    hasSubdomain: false,
    featured: false,
    heroImage:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    emoji: '🌿',
    yearsInNeighborhood: '15 años en Eva Perón',
    paymentMethods: 'Efectivo, Débito y QR',
    services: [],
    reviews: []
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'corredor-emilio-castro-cafeteria-especialidad',
    title:
      'El corredor de Av. Emilio Castro suma una nueva cafetería de especialidad y pastelería artesanal',
    excerpt:
      'Con deck sobre la vereda, café de tueste local y opciones para trabajar con wifi, el polo gastronómico sigue consolidándose como punto de encuentro vecinal.',
    content: [
      'A lo largo de las últimas temporadas, la Avenida Emilio Castro dejó de ser solo una arteria residencial tranquila para transformarse en el paseo gastronómico más dinámico del oeste porteño. Esta semana se sumó Tostadores de la Castro, una esquina luminosa pensada tanto para vecinos que salen a desayunar como para quienes trabajan de forma remota.',
      'El local apuesta por granos tostados en Buenos Aires y laminados de masa madre horneados cada mañana desde las ocho. Además, sumaron mesas pet-friendly sobre el boulevard arbolado para quienes pasean con sus mascotas.',
      'Con esta apertura, ya son más de veinte las propuestas entre cafés, heladerías artesanales, cervecerías y restaurantes que mantienen encendida la avenida de martes a domingo, evitando que los vecinos tengan que trasladarse a otros barrios para salir a comer.'
    ],
    category: 'Nueva Apertura',
    zone: 'Polo Emilio Castro',
    readTime: '3 min',
    publishedLabel: 'Hoy',
    imageUrl:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    mentionedBusinessSlug: 'tostadorescastro'
  },
  {
    id: 'art-2',
    slug: 'renovacion-av-alberdi-nuevos-comercios',
    title:
      'Renovación sobre Av. Juan B. Alberdi: los locales y servicios que se renuevan entre Murguiondo y Larrazábal',
    excerpt:
      'Desde veterinarias ampliadas y centros kinesiológicos hasta ópticas y casas de indumentaria, el centro comercial a cielo abierto sigue latiendo fuerte.',
    content: [
      'El tramo central de Av. Juan B. Alberdi continúa siendo el corazón económico de Mataderos. Comerciantes de la cuadra destacan que el movimiento peatonal de lunes a sábado creció gracias a la combinación de bancos, cercanía con el Cine Teatro El Plata y comercios históricos que modernizaron su atención.',
      'Entre los cambios más valorados por los vecinos está la incorporación de turnos y pedidos directos por WhatsApp, algo que comercios consolidados como Veterinaria Flavio implementaron con envíos sin cargo dentro del barrio.',
      'Desde Mataderos.ar seguimos relevando cada nueva vidriera para que los vecinos conozcan de primera mano qué abre cerca de casa.'
    ],
    category: 'Comercio Local',
    zone: 'Av. Alberdi',
    readTime: '4 min',
    publishedLabel: 'Hace 2 días',
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    mentionedBusinessSlug: 'veterinariaflavio'
  },
  {
    id: 'art-3',
    slug: 'agenda-feria-mataderos-y-cine-el-plata',
    title:
      'Fin de semana en La Recova y el Cine Teatro El Plata: música criolla, artesanías y función nocturna',
    excerpt:
      'Repasamos los horarios de la Feria de Artesanías y Tradiciones Populares Argentinas junto con la cartelera cultural de la Comuna 9.',
    content: [
      'Cada domingo, la intersección de Av. de los Corrales y Lisandro de la Torre vuelve a ser el punto de encuentro cultural más convocante de Buenos Aires. Desde las 11 de la mañana abren más de 300 puestos de platería, ponchos, mates, cuero y comidas regionales.',
      'A partir de las 14 hs comienzan los espectáculos folclóricos en el escenario central frente al Monumento al Resero, con entrada libre y gratuita y pista abierta para bailar chacareras y zambas.',
      'Por la tarde-noche, la agenda continúa sobre Av. Alberdi 5765 en el recuperado Cine Teatro El Plata, con ciclos de cine argentino, teatro y conciertos barriales.'
    ],
    category: 'Agenda Cultural',
    zone: 'Casco Histórico',
    readTime: '2 min',
    publishedLabel: 'Este finde',
    imageUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    mentionedBusinessSlug: 'cantinaloscorrales'
  }
];

export const ZONES: ZoneSpot[] = [
  {
    id: 'Polo Emilio Castro',
    title: 'Polo Gastronómico Emilio Castro',
    subtitle: 'El boulevard moderno del barrio',
    atmosphere:
      'Cafés de especialidad, cervecerías, hamburgueserías y veredas anchas arboladas que concentran el movimiento joven y familiar.',
    landmarks: ['Boulevard Emilio Castro', 'Parque Alberdi cercano', 'Salidas nocturnas'],
    highlightMetric: '20+ propuestas gastronómicas',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'Av. Alberdi',
    title: 'Centro Comercial Av. Alberdi',
    subtitle: 'La arteria donde pasa todo',
    atmosphere:
      'El gran eje comercial de Mataderos: veterinarias, librerías, indumentaria, bancos y el histórico Cine Teatro El Plata en pleno corazón.',
    landmarks: ['Esquina Alberdi y Murguiondo', 'Cine Teatro El Plata', 'Escudo Oficial'],
    highlightMetric: 'Corazón comercial Comuna 9',
    imageUrl:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'Casco Histórico',
    title: 'La Recova y Av. de los Corrales',
    subtitle: 'Identidad criolla y patrimonio vivo',
    atmosphere:
      'El alma fundacional del barrio: la Antigua Administración del Mercado de Hacienda, El Resero, los bodegones y la Feria de los domingos.',
    landmarks: ['Monumento al Resero', 'La Recova pintada a la cal', 'Feria de Mataderos'],
    highlightMetric: 'Monumento Histórico Nacional',
    imageUrl:
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'Av. Eva Perón',
    title: 'Corredor Av. Eva Perón',
    subtitle: 'Oficios, viveros y vida de barrio',
    atmosphere:
      'Talleres de toda la vida, viveros, panaderías de esquina y clubes sociales que sostienen el pulso cotidiano de los vecinos.',
    landmarks: ['Viveros y madereras', 'Clubes sociales', 'Comercios de cercanía'],
    highlightMetric: 'Tradición vecinal cotidiana',
    imageUrl:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80'
  }
];

export const EVENTS: NeighborhoodEvent[] = [
  {
    id: 'ev-1',
    title: 'Feria de Mataderos: Artesanías y Tradiciones',
    dateLabel: 'Todos los Domingos',
    timeLabel: '11:00 a 19:00 hs',
    location: 'Av. Lisandro de la Torre y Av. de los Corrales',
    category: 'Feria',
    description:
      'Más de 300 puestos de talabartería, mates, platería y comidas regionales con escenario folclórico abierto frente a La Recova.',
    highlightTag: 'Patrimonio Cultural'
  },
  {
    id: 'ev-2',
    title: 'Ciclo de Cine Nacional y Música en El Plata',
    dateLabel: 'Viernes y Sábados',
    timeLabel: '19:30 hs',
    location: 'Cine Teatro El Plata · Av. Juan B. Alberdi 5765',
    category: 'Cultura',
    description:
      'Funciones gratuitas y con entrada popular en la sala Art Déco recuperada más emblemática de la Comuna 9.',
    highlightTag: 'Entrada Libre'
  },
  {
    id: 'ev-3',
    title: 'Peña Criolla y Clases Abiertas de Folclore',
    dateLabel: 'Sábados por la tarde',
    timeLabel: '17:00 hs',
    location: 'Plazoleta El Resero y Centros Culturales del barrio',
    category: 'Cultura',
    description:
      'Encuentro de guitarras, bombos y parejas de baile abiertas para vecinos principiantes y familias.',
    highlightTag: 'Actividad Abierta'
  }
];

export const HERITAGE_MILESTONES: HeritageMilestone[] = [
  {
    year: '1889 – 1901',
    title: 'Los Antiguos Corrales y La Recova',
    subtitle: 'El nacimiento de un barrio con carácter propio',
    description:
      'Con la piedra fundamental de los nuevos mataderos municipales y el Mercado Nacional de Hacienda, el oeste porteño se convirtió en el puente entre la pampa y la ciudad. Sus recovas en forma de "U" aún custodian ese origen.',
    symbol: '🏛️'
  },
  {
    year: '1932',
    title: 'El Monumento al Resero',
    subtitle: 'Obra de Emilio Sarguignet en bronce y granito',
    description:
      'Inaugurado frente a la Antigua Administración, el jinete arreando ganado se transformó en el emblema visual por excelencia de Mataderos y símbolo de la cultura del trabajo rural.',
    symbol: '🐎'
  },
  {
    year: 'Tradición Viva',
    title: 'El Torito, El Fileteado y El Club',
    subtitle: 'Identidad popular en cada esquina',
    description:
      'Desde la leyenda boxística de Justo Suárez ("El Torito de Mataderos") y los carros fileteados de hacienda hasta el verde y negro de Nueva Chicago, el orgullo vecinal se transmite de generación en generación.',
    symbol: '🌿'
  }
];
