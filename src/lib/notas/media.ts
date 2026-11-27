export interface Foto {
  src: string;
  alt: string;
  author: string;
  taken: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  changes: string;
  objectPosition?: string;
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
  elPlata: {
    src: '/notas/el-plata.jpg',
    alt: 'Fachada del Cine Teatro El Plata sobre la avenida Juan B. Alberdi, con el nombre EL PLATA en el frente.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'octubre de 2021',
    license: 'Nota oficial del GCBA',
    licenseUrl: 'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
    sourceUrl: 'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
    changes: 'Copia JPEG de la imagen publicada en esa nota. Archivo original: https://static.buenosaires.gob.ar/sites/default/files/media/image/2021/10/15/1ee37c06a4d00fbcf73555e0a4c19a6ae2919424.png'
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
    changes: 'Copia reducida para la web.',
    objectPosition: '50% 10%'
  },
  estadioChicago: {
    src: '/notas/estadio-chicago.jpg',
    alt: 'Tribuna del estadio de Nueva Chicago llena, con banderas verdes y negras y el campo de juego adelante.',
    author: 'mat4',
    taken: '2006',
    license: 'Dominio público',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Estadio_Nueva_Chicago.jpg',
    changes: 'Copia reducida para la web.'
  },
  tribunaChicago: {
    src: '/notas/tribuna-chicago.jpg',
    alt: 'Cancha de Nueva Chicago con la tribuna República de Mataderos y el escudo del club pintado en las plateas.',
    author: 'Herjherrera',
    taken: '16 de agosto de 2010',
    license: 'Dominio público',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tribuna_Rep_de_Mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  jacarandaAlberdi: {
    src: '/notas/jacaranda-alberdi.jpg',
    alt: 'Jacarandás en flor en Parque Alberdi, con la torre del ex Mercado de Hacienda al fondo.',
    author: 'Roberto Fiadone',
    taken: '18 de noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jacarand%C3%A1_Parque_Alberdi.jpg',
    changes: 'Copia reducida para la web.'
  },
  casaFenk: {
    src: '/notas/casa-fenk-alberdi.jpg',
    alt: 'Local Casa FENK sobre la avenida Alberdi, en Mataderos, con el cartel vertical en la fachada.',
    author: 'Just a Man',
    taken: '22 de enero de 2026',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Casa_FENK_en_Avenida_Alberdi,_Mataderos,_Ciudad_de_Buenos_Aires.jpg',
    changes: 'Copia reducida para la web.'
  },
  avenidaMataderos: {
    src: '/notas/barrio-defensoria.jpg',
    alt: 'Avenida comercial de Mataderos con el escudo del barrio en un cartel de la vereda, entre edificios y locales.',
    author: 'Defensoría del Pueblo de la Ciudad de Buenos Aires',
    taken: '12 de diciembre de 2012',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:DefPuebloCABA_-_Barrio_de_Mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  bustoSuarez: {
    src: '/notas/busto-suarez.jpg',
    alt: 'Busto de Justo Suárez en Mataderos.',
    author: 'Fma12',
    taken: '18 de agosto de 2011',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Busto_suarez_mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  cartelMataderos: {
    src: '/notas/cartel-mataderos.jpg',
    alt: 'Cartel del barrio de Mataderos.',
    author: 'Camila Mazza',
    taken: '20 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cartel_Mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  museoCriollo: {
    src: '/notas/museo-criollo.jpg',
    alt: 'Museo Criollo de los Corrales, en la recova de Mataderos.',
    author: 'Camila Mazza',
    taken: '20 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Museo_Criollo_de_los_Corrales.jpg',
    changes: 'Copia reducida para la web.'
  },
  feriaMazza: {
    src: '/notas/feria-mazza.jpg',
    alt: 'Puestos de la Feria de Mataderos.',
    author: 'Camila Mazza',
    taken: '20 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Feria_de_Mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  corridaSortija: {
    src: '/notas/corrida-sortija.jpg',
    alt: 'Corrida de sortija en la Feria de Mataderos.',
    author: 'Roberto Fiadone',
    taken: 'noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Corrida_de_Sortija.jpg',
    changes: 'Copia reducida para la web.'
  },
  preparandoSortija: {
    src: '/notas/preparando-sortija.jpg',
    alt: 'Preparativos de la corrida de sortija en la Feria de Mataderos.',
    author: 'Roberto Fiadone',
    taken: 'noviembre de 2007',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Preparando_corrida_de_sortija.jpg',
    changes: 'Copia reducida para la web.'
  },
  plaza17: {
    src: '/notas/plaza-17-mayo.jpg',
    alt: 'Plaza 17 de Mayo, en Mataderos.',
    author: 'Nestor Dinatale',
    taken: '21 de febrero de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Inauguraci%C3%B3n_Plaza_17_de_Mayo,_Mataderos,_Ciudad_de_Buenos_Aires.jpg',
    changes: 'Copia reducida para la web.'
  },
  cartelAdministracion: {
    src: '/notas/cartel-administracion.jpg',
    alt: 'Cartel de la antigua administración de los Mataderos.',
    author: 'Camila Mazza',
    taken: '20 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cartel_de_la_antigua_administracion.jpg',
    changes: 'Copia reducida para la web.'
  },
  antiguoEdificio: {
    src: '/notas/antiguo-edificio.jpg',
    alt: 'Antiguo edificio de la administración de los Mataderos.',
    author: 'Camila Mazza',
    taken: '20 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Antiguo_edificio_de_la_administraci%C3%B3n.jpg',
    changes: 'Copia reducida para la web.'
  },
  corralesViejos: {
    src: '/notas/corrales-viejos.jpg',
    alt: 'Los corrales de Mataderos hacia 1899.',
    author: 'Autor desconocido',
    taken: 'circa 1899',
    license: 'Dominio público',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Corrales_viejos_en_mataderos.jpg',
    changes: 'Copia reducida para la web.'
  },
  reseroInduni: {
    src: '/notas/resero-induni.jpg',
    alt: 'El Resero, monumento ecuestre frente a la antigua administración.',
    author: 'Noelia Induni',
    taken: '21 de agosto de 2015',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Resero.jpg',
    changes: 'Copia reducida para la web.'
  },
  barOviedo: {
    src: '/notas/bar-oviedo.jpg',
    alt: 'Bar Oviedo, en Mataderos.',
    author: 'Roberto Fiadone',
    taken: '14 de diciembre de 2014',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bar_Oviedo_Mataderos_01.JPG',
    changes: 'Copia reducida para la web.'
  },
  tribunaPerales: {
    src: '/notas/tribuna-perales.jpg',
    alt: 'Tribuna del estadio de Nueva Chicago que da al barrio Los Perales.',
    author: 'Herjherrera',
    taken: '16 de agosto de 2010',
    license: 'Dominio público',
    licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tribuna_que_da_al_barrio_Los_Perales.jpg',
    changes: 'Copia reducida para la web.'
  },
  adampolBaile: {
    src: '/notas/adampol-baile.jpg',
    alt: 'Pareja de baile frente al cartel de la Feria de Mataderos.',
    author: 'Carlos Adampol Galindo',
    taken: '13 de diciembre de 2009',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Feria_de_Mataderos,_Buenos_Aires,_Argentina_(4188165517).jpg',
    changes: 'Copia reducida para la web.'
  },
  adampolNino: {
    src: '/notas/adampol-nino.jpg',
    alt: 'Nene a caballo en la Feria de Mataderos.',
    author: 'Carlos Adampol Galindo',
    taken: '13 de diciembre de 2009',
    license: 'CC BY-SA 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Feria_de_Mataderos,_Buenos_Aires,_Argentina_(4188927458).jpg',
    changes: 'Copia reducida para la web.'
  },
  glorias: {
    src: '/notas/glorias.jpg',
    alt: 'Club Glorias Argentinas, en Mataderos.',
    author: 'Dubstar',
    taken: '23 de octubre de 2021',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Club_Glorias_Argentinas.jpg',
    changes: 'Copia reducida para la web.'
  },
  elCedron: {
    src: '/notas/el-cedron.jpg',
    alt: 'Puerta vidriada de la pizzería El Cedrón, en avenida Juan B. Alberdi y Murguiondo, con el fileteado «El Rey de la Pizza» y el nombre del bar.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'junio de 2013',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl:
      'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-el-cedron-la-pizza-y-la-impronta-de-mataderos',
    changes:
      'Redimensionada a 1600x1200 en JPEG desde el archivo original https://static.buenosaires.gob.ar/sites/default/files/media/image/2014/07/08/1f9ad9acaeece94b27e745a1a08c60d303ca8ba1.jpg'
  },
  muestraPcb: {
    src: '/notas/muestra-pcb.jpg',
    alt: 'Intérpretes de danza folklórica sobre el escenario durante una presentación del Programa Cultural en Barrios de la Ciudad.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'noviembre de 2026',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl: 'https://buenosaires.gob.ar/cultura/programa-cultural-en-barrios',
    changes:
      'Copia JPEG de la imagen publicada en https://buenosaires.gob.ar/sites/default/files/2026-11/Programa%20Cultural%20en%20Barrios.jpg'
  },
  nocheTemplosCiudad: {
    src: '/notas/noche-templos-ciudad.jpg',
    alt: 'Vecinos y visitantes recorriendo la nave iluminada de un templo porteño durante La Noche de los Templos.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'noviembre de 2026',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl:
      'https://buenosaires.gob.ar/noticias/los-imperdibles-para-disfrutar-la-noche-de-los-templos-en-la-ciudad-mas-linda-del-mundo',
    changes:
      'Copia JPEG de la imagen publicada en https://buenosaires.gob.ar/sites/default/files/2026-11/noche%20templos%202.jpg'
  },
  fiabCiudad: {
    src: '/notas/fiab-ciudad.jpg',
    alt: 'Puestos callejeros de las Ferias Itinerantes de Abastecimiento Barrial con vecinos haciendo compras sobre una vereda arbolada.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'agosto de 2026',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl: 'https://buenosaires.gob.ar/gcaba_historico/ferias-itinerantes',
    changes:
      'Redimensionada a 1600x1067 en JPEG desde el archivo original https://static.buenosaires.gob.ar/sites/default/files/2026-08/ferias%20itinerantes.jpg'
  },
  elPlataSala: {
    src: '/notas/el-plata-sala.jpg',
    alt: 'Escenario iluminado y primeras filas de butacas rojas de la sala principal del Cine Teatro El Plata, en Mataderos.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'octubre de 2021',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl:
      'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
    changes:
      'Copia JPEG de la imagen publicada en https://static.buenosaires.gob.ar/sites/default/files/media/image/2021/10/15/93e80245b21428963cefcfffcf3ccaaa32f42e00.jpg'
  },
  laEsperanzaMataderos: {
    src: '/notas/la-esperanza-mataderos.jpg',
    alt: 'Fachada en esquina de la confitería y panadería La Esperanza, en avenida de los Corrales 6602 esquina Timoteo Gordillo, Mataderos.',
    author: 'Roberto Fiadone (Wikimedia Commons)',
    taken: 'diciembre de 2014',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Confiter%C3%ADa_panader%C3%ADa_La_Esperanza_Mataderos.JPG',
    changes:
      'Recorte horizontal 3:2 y redimensión a 1600x1067 en JPEG desde el original 2975x2781 de Wikimedia Commons.'
  },
  consejoConsultivoComuna9: {
    src: '/notas/consejo-consultivo-comuna-9.jpg',
    alt: 'Reunión abierta de vecinos en mesas de trabajo e intercambio del Consejo Consultivo Comunal.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'octubre de 2026',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl:
      'https://buenosaires.gob.ar/gobierno-y-vinculo-ciudadano/gestion-comunal/comunas/comuna-9',
    changes:
      'Copia JPEG de la imagen publicada en https://buenosaires.gob.ar/sites/default/files/2026-10/Consejo%20consultivo%20comunal%209.jpg'
  },
  macedonioLeguizamon: {
    src: '/notas/macedonio-leguizamon.jpg',
    alt: 'Frente de la Escuela N.° 16 Dr. Martiniano Leguizamón, en Martiniano Leguizamón 1470, donde funciona por la tarde el Centro Cultural Macedonio Fernández.',
    author: 'Gobierno de la Ciudad de Buenos Aires',
    taken: 'mayo de 2022',
    license: 'CC BY 2.5 AR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.5/ar/',
    sourceUrl:
      'https://buenosaires.gob.ar/gcaba_historico/escuelas-centenarias-1922-2022/escuela-ndeg-16-de-20-dr-martiniano-leguizamon',
    changes:
      'Recorte horizontal 4:3 del original vertical 3120x4160 y redimensión a 1600x1200 en JPEG desde https://static.buenosaires.gob.ar/sites/default/files/media/image/2022/06/27/eadf8c12e80632a184598d28ea86b8c89e21f84f.jpg'
  },
} as const satisfies Record<string, Foto>;

export type FotoId = keyof typeof FOTOS;

/**
 * Nota interna. No se publica en /notas ni en /notas/creditos.
 * Archivo presente en el repo cuya ficha exacta no pudo confirmarse.
 */
export const FOTO_SIN_FICHA = {
  file: 'public/notas/feria-puestos.jpg',
  what: 'Primer plano de pastelitos fritos, 1200×800 px, sin metadatos de autor.',
  why: 'El tamaño coincide con varias fotos de Carlos Adampol Galindo tomadas el 13 de diciembre de 2009 en la Feria y publicadas en Flickr bajo CC BY-SA 2.0 (archivos de Wikimedia Commons 4188164021, 4188164713 y 4188927458), pero no se pudo confirmar cuál de esas tomas es esta. Hasta cruzar el archivo, la imagen no ilustra ninguna nota.'
};
