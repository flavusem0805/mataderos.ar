export type EmprendedorCategory =
  | 'Artesanías'
  | 'Indumentaria'
  | 'Alimentos y conservas'
  | 'Dulces y panadería'
  | 'Mate y tes'
  | 'Cuero y talabartería'
  | 'Joyería y bijou'
  | 'Hogar'
  | 'Plantas'
  | 'Oficio y servicios'
  | 'Otra';

export type LocationType = 'feria_puesto' | 'direccion' | 'ambos' | 'solo_redes';

export interface Emprendedor {
  slug: string;
  displayName: string;
  tagline: string;
  offerText: string;
  category: EmprendedorCategory;
  locationType: LocationType;
  feriaName?: string;
  puestoLabel?: string;
  address?: string;
  zone: string;
  locationNote: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  otherUrl?: string;
  heroImage: string;
  heroAlt: string;
  photos: { src: string; alt: string }[];
  catalogPdfName?: string;
  catalogPdfSizeLabel?: string;
  catalogPdfUrl?: string;
  isFounder: boolean;
  verifiedAt: string;
  /** Marca perfiles de ejemplo usados en Fase 0 hasta sumar los primeros feriantes reales. */
  isDemo?: boolean;
}

export const EMPRENDEDOR_CATEGORIES: EmprendedorCategory[] = [
  'Artesanías',
  'Indumentaria',
  'Alimentos y conservas',
  'Dulces y panadería',
  'Mate y tes',
  'Cuero y talabartería',
  'Joyería y bijou',
  'Hogar',
  'Plantas',
  'Oficio y servicios',
  'Otra'
];

export const LOCATION_TYPE_LABELS: Record<LocationType, string> = {
  feria_puesto: 'Puesto de feria',
  direccion: 'Dirección en el barrio',
  ambos: 'Feria y dirección',
  solo_redes: 'Solo redes'
};

export const EMPRENDEDORES: Emprendedor[] = [
  {
    slug: 'taller-cuero-la-recova',
    displayName: 'Taller de Cuero La Recova',
    tagline: 'Cintos, materas y billeteras cosidas a mano en cuero vacuno.',
    offerText:
      'Trabajamos cuero vacuno argentino de curtiembre local, cortado y cosido a mano con hilo encerado. Hacemos cintos a medida, materas, billeteras y arreglos de talabartería por encargo durante la semana. Todos los domingos nos encontrás en la Feria de Mataderos.',
    category: 'Cuero y talabartería',
    locationType: 'feria_puesto',
    feriaName: 'Feria de Mataderos',
    puestoLabel: 'Pasillo central · Sector artesanías (ejemplo)',
    zone: 'Mataderos · Comuna 9',
    locationNote: 'Domingos y feriados de 11 a 19 hs. Entregas en la semana por Mataderos y Liniers.',
    whatsapp: '5491135605731',
    instagram: 'https://instagram.com/mataderos.ar',
    heroImage: '/notas/frente-recova.jpg',
    heroAlt: 'Frente de La Recova en la Feria de Mataderos',
    photos: [
      {
        src: '/notas/frente-recova.jpg',
        alt: 'Entorno de La Recova donde funcionan los puestos de la feria'
      }
    ],
    catalogPdfName: 'catalogo-cuero-ejemplo.pdf',
    catalogPdfSizeLabel: 'PDF de muestra · 2,4 MB',
    isFounder: true,
    verifiedAt: '2026-11-22',
    isDemo: true
  },
  {
    slug: 'dulces-de-la-abuela-mataderos',
    displayName: 'Dulces de la Abuela',
    tagline: 'Mermeladas caseras, escabeches y alfajores de maicena.',
    offerText:
      'Elaboración artesanal en tandas chicas con fruta de estación y sin conservantes. Membrillo, alcayota con nuez, higo en almíbar y alfajores de maicena horneados el sábado a la tarde para llegar frescos al domingo de feria.',
    category: 'Dulces y panadería',
    locationType: 'ambos',
    feriaName: 'Feria de Mataderos',
    puestoLabel: 'Sector gastronomía regional (ejemplo)',
    address: 'Zona Av. Lisandro de la Torre y Directorio',
    zone: 'Mataderos · Comuna 9',
    locationNote: 'Domingos en la Feria de 11 a 19 hs. Retiro por pedido de miércoles a sábado.',
    whatsapp: '5491135605731',
    instagram: 'https://instagram.com/mataderos.ar',
    heroImage: '/notas/baile-feria.jpg',
    heroAlt: 'Domingo en la Feria de Mataderos',
    photos: [
      {
        src: '/notas/baile-feria.jpg',
        alt: 'Ambiente de domingo en la Feria de Mataderos'
      }
    ],
    isFounder: true,
    verifiedAt: '2026-11-22',
    isDemo: true
  }
];

export function getEmprendedores(): Emprendedor[] {
  return EMPRENDEDORES;
}

export function getEmprendedorBySlug(slug: string): Emprendedor | undefined {
  return EMPRENDEDORES.find((item) => item.slug === slug);
}

export function canonicalEmprendedor(slug: string): string {
  return `https://mataderos.ar/emprendedores/${slug}`;
}
