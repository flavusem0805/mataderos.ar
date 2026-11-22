export interface Foto {
  src: string;
  alt: string;
  author: string;
  taken: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  changes: string;
}

export const FOTOS = {
  baile: {
    src: '/notas/baile-feria.jpg',
    alt: 'Pareja bailando folklore en la Feria de Mataderos, en el cruce de Lisandro de la Torre y la avenida de los Corrales.',
    author: 'Roberto Fiadone',
    taken: 'noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Baile_Feria_Mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  sortija: {
    src: '/notas/sortija.jpg',
    alt: 'Sortija armada para la corrida, sobre Lisandro de la Torre, en la Feria de Mataderos.',
    author: 'Roberto Fiadone',
    taken: 'noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Detalle_Corrida_de_sortija.jpg',
    changes: 'Copia reducida para la web. El archivo original también ofrece GFDL 1.2 y CC BY-SA 2.5; acá se usa CC BY-SA 3.0.'
  },
  frente: {
    src: '/notas/frente-recova.jpg',
    alt: 'Frente de la antigua administración de los Mataderos, con arquerías y cuerpo central.',
    author: 'Camila Mazza',
    taken: '20 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Frente_de_la_antigua_adminitraci%C3%B3n.jpg',
    changes: 'Copia reducida para la web.'
  },
  torre: {
    src: '/notas/torre-mercado.jpg',
    alt: 'Torre del ex Mercado Nacional de Hacienda, en Lisandro de la Torre y la avenida de los Corrales.',
    author: 'Roberto Fiadone',
    taken: '18 de noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Torre_del_ex_Mercado_Nacional_de_Hacienda.jpg',
    changes: 'Copia reducida para la web.'
  },
  corrales: {
    src: '/notas/vista-corrales.jpg',
    alt: 'Avenida de los Corrales un domingo de feria, con la administración de los Mataderos al fondo.',
    author: 'Ch nch',
    taken: '2 de octubre de 2011',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Vista_desde_Av._De_los_Corrales,_domingo_dia_de_Feria.jpg',
    changes: 'Copia reducida para la web. Subida a Wikimedia en el marco de Wiki Loves Monuments 2012.'
  },
  gauchos: {
    src: '/notas/gauchos-feria.jpg',
    alt: 'Jinetes en la Feria de Mataderos, sobre la avenida Lisandro de la Torre.',
    author: 'Roberto Fiadone',
    taken: '18 de noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gauchos_en_la_Feria_de_Mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  resero: {
    src: '/notas/resero.jpg',
    alt: 'El Resero, escultura ecuestre de Emilio Jacinto Sarniguet, frente a la antigua administración.',
    author: 'Roberto Fiadone',
    taken: '14 de diciembre de 2014',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Monumento_ecuestre_El_Gaucho_Resero_01.JPG',
    changes: 'Copia reducida para la web.'
  }
} as const satisfies Record<string, Foto>;

export type FotoId = keyof typeof FOTOS;

/** Archivo presente en el repo cuya ficha exacta no pudo confirmarse. No se publica en las notas. */
export const FOTO_SIN_FICHA = {
  file: 'public/notas/feria-puestos.jpg',
  what: 'Primer plano de pastelitos fritos, 1200×800 px, sin metadatos de autor.',
  why: 'El tamaño coincide con varias fotos de Carlos Adampol Galindo tomadas el 13 de diciembre de 2009 en la Feria y publicadas en Flickr bajo CC BY-SA 2.0 (archivos de Wikimedia Commons 4188164021, 4188164713 y 4188927458), pero no se pudo confirmar cuál de esas tomas es esta. Hasta cruzar el archivo, la imagen no ilustra ninguna nota.'
};
