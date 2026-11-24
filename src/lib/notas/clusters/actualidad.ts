import type { Nota } from '../types';

export const ACTUALIDAD: Nota[] = [
  {
    slug: 'que-hacer-este-finde-en-mataderos-noviembre-2026',
    type: 'actualidad',
    pillarSlug: 'que-hacer-en-mataderos',
    title: 'Qué hacer este finde en Mataderos: milonga en El Plata, "Paraíso", mural y Feria',
    description:
      'Agenda del fin de semana del 27 al 29 de noviembre de 2026 en Mataderos: milonga gratuita y Paraíso en el Cine Teatro El Plata, estreno del mural de Chicago Pinta (fuente única en X) y Feria de Mataderos.',
    dek: 'Del viernes 27 al domingo 29 el barrio concentra tres noches en El Plata, un nuevo domingo de Feria y el anuncio de un mural en el casco. Todo con horarios, precios y fuentes.',
    category: 'Actualidad',
    publishedAt: '2026-11-24',
    image: 'elPlata',
    datos: {
      title: 'El fin de semana en Mataderos',
      rows: [
        { label: 'Viernes 27/11 · 19 h', value: 'Milonga en El Plata (Av. Alberdi 5765, en el hall) · Entrada libre y gratuita' },
        { label: 'Sábado 28/11 · 19 h', value: 'Paraíso, con Luciano Cáceres, en El Plata · Platea $22.500 · Pullman $15.000' },
        { label: 'Domingo 29/11 · 11 a 18 / 19 h', value: 'Feria de Mataderos (Lisandro de la Torre y Av. de los Corrales) · Entrada libre · Se suspende por lluvia' },
        { label: 'Domingo 29/11 · 12 h', value: 'Estreno del mural de Chicago Pinta en la Feria · Fuente única: @ChicagoPinta en X' },
        { label: 'Domingo 29/11 · 19 h', value: 'Segunda función de Paraíso en El Plata · Duración 70 min · +13 años' },
        { label: 'Hasta el domingo 29/11', value: 'SALE MATADEROS (~30 locales en Alberdi, De los Corrales y Directorio)' }
      ]
    },
    fuentes: [
      {
        title: 'Milonga en El Plata',
        url: 'https://linda.buenosaires.gob.ar/eventos/milonga-en-el-plata',
        publisher: 'Linda BA · Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'PARAÍSO – Programación Temporada 2026',
        url: 'https://complejoteatral.gob.ar/produccion/paraiso/',
        publisher: 'Complejo Teatral de Buenos Aires'
      },
      {
        title: 'Anuncio de estreno del mural en la Feria',
        url: 'https://x.com/ChicagoPinta/status/2123539602090950686',
        publisher: '@ChicagoPinta en X (fuente única)'
      },
      {
        title: 'Feria de Mataderos',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos',
        publisher: 'Turismo Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El último fin de semana de noviembre concentra cuatro planes concretos dentro de Mataderos entre el viernes 27 y el domingo 29: milonga gratuita y dos funciones teatrales en el [Cine Teatro El Plata](/notas/cine-teatro-el-plata), el anuncio del estreno de un mural en la Feria y una nueva jornada de la [Feria de Mataderos](/notas/feria-de-mataderos), que entra en sus últimos cuatro domingos de la temporada. Todas las fechas están cargadas en la [agenda del barrio](/agenda) con descarga al calendario.'
      },
      {
        kind: 'h2',
        text: 'Viernes 27 a las 19: milonga libre en El Plata'
      },
      {
        kind: 'p',
        text: 'El viernes a las 19 el hall del Cine Teatro El Plata (Av. Juan B. Alberdi 5765) vuelve a abrir pista para la Milonga en El Plata, con entrada libre y gratuita según la ficha oficial de [Linda BA](https://linda.buenosaires.gob.ar/eventos/milonga-en-el-plata). La velada, coordinada por Poly Pérez, suma a la Orquesta del Plata en vivo, artistas invitados, parejas de exhibición, DJ de milonga y una clase abierta para principiantes o bailarines con práctica.'
      },
      {
        kind: 'p',
        text: 'Como aclaramos en nuestra guía de [cultura de Mataderos](/notas/cultura-folklore-y-bares-de-mataderos), el barrio no cuenta con una grilla comercial fija de milongas toda la semana; por eso conviene agendar estas fechas puntuales programadas en el hall de Alberdi 5765.'
      },
      {
        kind: 'h2',
        text: 'Sábado 28 y domingo 29 a las 19: Paraíso en El Plata'
      },
      {
        kind: 'p',
        text: 'El sábado y el domingo a las 19 sube a escena en la misma sala [Paraíso](https://complejoteatral.gob.ar/produccion/paraiso/), el unipersonal protagonizado por Luciano Cáceres sobre texto de Inmaculada Alvear (versión de Dany Mañas y dirección de Ignacio Rodríguez de Anca), dentro de la temporada del Complejo Teatral de Buenos Aires. La obra dura 70 minutos y está recomendada para mayores de 13 años.'
      },
      {
        kind: 'p',
        text: 'Las entradas valen $22.500 en platea y $15.000 en pullman. El CTBA informa además un cupo gratuito del 2% de la sala en boletería para personas habilitadas por la Ley 3.546 presentando CUD y documento, y recuerda que una vez empezada la función no se permite ingresar.'
      },
      {
        kind: 'h2',
        text: 'Domingo 29: Feria de Mataderos y estreno del mural de Chicago Pinta'
      },
      {
        kind: 'p',
        text: 'El domingo 29 vuelve la Feria de Artesanías y Tradiciones Populares en Av. Lisandro de la Torre y Av. de los Corrales, frente a [La Recova](/notas/la-recova-de-mataderos) y [El Resero](/notas/el-resero-de-mataderos). Es el primero de los últimos cuatro domingos de la temporada 2026: quedan también el 6, el 13 y el 20 de diciembre, fecha de cierre. La entrada es libre, se suspende por lluvia y los matices entre fichas de horario (11 a 18 o 11 a 19) están detallados en [horarios de la feria](/notas/feria-de-mataderos-horarios).'
      },
      {
        kind: 'p',
        text: 'A las 12 del mediodía del domingo está anunciado el estreno del mural de Chicago Pinta en la Feria. Publicamos el horario aclarando su respaldo exacto: hasta el momento, la única fuente disponible es [su posteo en X](https://x.com/ChicagoPinta/status/2123539602090950686), sin gacetilla complementaria de la Ciudad.'
      },
      {
        kind: 'h2',
        text: 'Comercios en oferta y dos citas en la Comuna 9'
      },
      {
        kind: 'p',
        text: 'Hasta el domingo 29 sigue activo también [SALE MATADEROS](/notas/sale-mataderos-noviembre-2026), con unos treinta comercios adheridos sobre Alberdi, De los Corrales y Directorio. Y para quienes miren un poco más allá de los límites del barrio pero dentro de la Comuna 9, en Parque Avellaneda habrá jornadas abiertas por el Plan de Manejo (viernes 27 y sábado 28) y el encuentro de teatro callejero "El Teatro Late en la Calle" (sábado 28 y domingo 29 desde las 16), cargados en su propia sección de [Comuna 9 en la agenda](/agenda?ambito=comuna-9).'
      }
    ]
  },
  {
    slug: 'sale-mataderos-noviembre-2026',
    type: 'actualidad',
    pillarSlug: 'que-hacer-en-mataderos',
    title: 'SALE MATADEROS: la semana de descuentos del Centro Comercial Alberdi termina el domingo 29',
    description:
      'Primera edición de SALE MATADEROS, hasta el domingo 29 de noviembre de 2026: alrededor de 30 locales adheridos en Av. Alberdi, Av. de los Corrales y Av. Directorio.',
    dek: 'Unos treinta comercios de cercanía participan con descuentos y financiación hasta el domingo 29. Por primera vez la campaña suma a De los Corrales y Directorio.',
    category: 'Comercio',
    publishedAt: '2026-11-23',
    image: 'corrales',
    datos: {
      title: 'SALE MATADEROS en datos',
      rows: [
        { label: 'Vigencia', value: 'Del lunes 23 al domingo 29 de noviembre de 2026' },
        { label: 'Corredores', value: 'Av. Juan B. Alberdi, Av. de los Corrales y Av. Directorio' },
        { label: 'Locales adheridos', value: 'Alrededor de 30 comercios del barrio' },
        { label: 'Organiza', value: 'Centro Comercial Alberdi' },
        { label: 'Cómo identificarlos', value: 'Flyers en vidriera y listado en @centrocomercialalberdi' }
      ]
    },
    fuentes: [
      {
        title: 'SALE MATADEROS: una semana de descuentos para impulsar el comercio barrial',
        url: 'https://cemba.com.ar/sale-mataderos-una-semana-de-descuentos-para-impulsar-el-comercio-barrial/',
        publisher: 'CEMBA'
      },
      {
        title: 'Las compras para el arbolito se resuelven con las ofertas de Alberdi',
        url: 'https://cosasdebarrioweb.com.ar/2026/11/22/las-compras-para-el-arbolito-se-resuelven-con-las-ofertas-de-alberdi/',
        publisher: 'Cosas de Barrio'
      },
      {
        title: 'SALE MATADEROS: una semana de descuentos para impulsar el comercio barrial',
        url: 'https://www.transparenciablog.com.ar/sale-mataderos-una-semana-de-descuentos-para-impulsar-el-comercio-barrial/',
        publisher: 'Transparencia Comunal'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'Hasta el domingo 29 de noviembre corre la primera edición de SALE MATADEROS, la semana de ofertas y financiación organizada por el Centro Comercial Alberdi para impulsar el comercio de cercanía. La campaña arrancó el lunes 23, en coincidencia con el Black Friday, con promociones pensadas para compras cotidianas y regalos de fin de año dentro del barrio.'
      },
      {
        kind: 'h2',
        text: 'Tres avenidas bajo una misma campaña'
      },
      {
        kind: 'p',
        text: 'La principal novedad de esta edición es la ampliación territorial: además de los locales tradicionales de la avenida Juan B. Alberdi, se suman comercios de las avenidas De los Corrales y Directorio. Esa integración explica el nombre SALE MATADEROS y busca reflejar una red más amplia de negocios bajo la coordinación del Centro Comercial Alberdi, entidad con 74 años de trayectoria en la zona comprendida entre General Paz, Escalada, Eva Perón y Emilio Castro.'
      },
      {
        kind: 'p',
        text: 'De acuerdo con lo difundido por [CEMBA](https://cemba.com.ar/sale-mataderos-una-semana-de-descuentos-para-impulsar-el-comercio-barrial/) y medios zonales, participan unos treinta locales de rubros variados: indumentaria, calzado, blanquería, iluminación, artículos deportivos, artículos regionales, cotillón, regalería, productos navideños, gastronomía, mercería, limpieza y tecnología.'
      },
      {
        kind: 'h2',
        text: 'Cómo reconocer los locales y combinar el recorrido'
      },
      {
        kind: 'p',
        text: 'Los comercios adheridos están señalizados con flyers en vidriera y el listado completo de participantes y promociones se consulta en Instagram en @centrocomercialalberdi. Cada negocio define sus descuentos y alternativas de financiación en mostrador, sin registro previo.'
      },
      {
        kind: 'p',
        text: 'Para ubicar cada eje del barrio sin mezclar caminatas conviene repasar [Avenida Alberdi y Emilio Castro](/notas/avenida-alberdi-y-emilio-castro), o sumar las actividades del fin de semana en [qué hacer este finde en Mataderos](/notas/que-hacer-este-finde-en-mataderos-noviembre-2026) y en la [agenda](/agenda).'
      }
    ]
  },
  {
    slug: 'cierre-de-ano-macedonio-fernandez-diciembre-2026',
    type: 'actualidad',
    pillarSlug: 'cultura-folklore-y-bares-de-mataderos',
    title: 'Cierre de año en el Centro Cultural Macedonio Fernández: cuatro jornadas gratis en diciembre',
    description:
      'Muestras gratuitas de fin de año en el Centro Cultural Macedonio Fernández (Martiniano Leguizamón 1470, Mataderos): martes 1 y miércoles 9, jueves 10 y viernes 11 de diciembre de 18 a 20:45.',
    dek: 'El centro cultural de Martiniano Leguizamón 1470 cierra los talleres del Programa Cultural en Barrios con cuatro tardes abiertas al barrio, siempre de 18 a 20:45 y sin entrada.',
    category: 'Cultura',
    publishedAt: '2026-11-22',
    placeLabel: 'Centro Cultural Macedonio Fernández · Martiniano Leguizamón 1470',
    datos: {
      title: 'Cronograma en Martiniano Leguizamón 1470',
      rows: [
        { label: 'Sede', value: 'Centro Cultural Macedonio Fernández · Martiniano Leguizamón 1470, Mataderos' },
        { label: 'Horario y acceso', value: '18:00 a 20:45 h · Entrada libre y gratuita (sin reserva previa)' },
        { label: 'Martes 1/12', value: 'Ritmos y huellas: clase abierta de danzas y muestra de Grabado en Relieve' },
        { label: 'Miércoles 9/12', value: 'Crear, jugar y compartir: encuentro infantil y talleres de Maquillaje Artístico y Caracterización Teatral' },
        { label: 'Jueves 10/12', value: 'Música, encuentro y celebración: muestra anual de los talleres de Música y Canto' },
        { label: 'Viernes 11/12', value: 'El teatro toma la escena: escenas, obras e improvisaciones del taller de Teatro para Adultos' }
      ]
    },
    fuentes: [
      {
        title: 'Los barrios se llenan de arte y cultura',
        url: 'https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Muestras de fin de año de los talleres del Programa Cultural en Barrios',
        url: 'https://aquimataderosonline.com.ar/muestras-de-fin-de-ano-de-los-talleres-del-programa-cultural-en-barrios/',
        publisher: 'Aquí Mataderos'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El Centro Cultural Macedonio Fernández (Martiniano Leguizamón 1470), sede del Programa Cultural en Barrios en Mataderos, cierra el año con cuatro jornadas gratuitas abiertas a vecinos y familias. Todas comparten la misma franja horaria, de 18 a 20:45, y forman parte de la programación de fin de año publicada por el [Gobierno de la Ciudad](https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura).'
      },
      {
        kind: 'h2',
        text: 'Martes 1 de diciembre: danzas y grabado'
      },
      {
        kind: 'p',
        text: 'La primera fecha lleva el título "Ritmos y huellas" y funciona como clase abierta con los talleres de Freedance, Salsa, Bachata, Danzas Folclóricas Argentinas, Rock y Danzas Flamencas. En paralelo se exponen los trabajos realizados durante el año en el taller de Grabado en Relieve.'
      },
      {
        kind: 'h2',
        text: 'Miércoles 9, jueves 10 y viernes 11: infancia, música y teatro'
      },
      {
        kind: 'p',
        text: 'La segunda semana de diciembre reúne tres cierres consecutivos. El miércoles 9 será "Crear, jugar y compartir", una tarde pensada para que chicos y familias recorran lo trabajado en el año, con participación de los talleres de Maquillaje Artístico y Caracterización Teatral.'
      },
      {
        kind: 'p',
        text: 'El jueves 10 llega "Música, encuentro y celebración", a cargo de los talleres de Música y Canto, junto con una muestra de producciones anuales. El cierre será el viernes 11 con "El teatro toma la escena", donde quienes cursaron Teatro para Adultos presentan escenas, obras ensayadas e improvisaciones.'
      },
      {
        kind: 'h2',
        text: 'Cómo agendar las fechas'
      },
      {
        kind: 'p',
        text: 'Las cuatro actividades son abiertas al público, con entrada libre y gratuita, y no requieren inscripción previa. Cada jornada tiene su propia ficha descargable (.ics) en la [agenda de Mataderos](/agenda), junto con el resto de la programación cultural del barrio y las notas de [qué hacer este finde](/notas/que-hacer-este-finde-en-mataderos-noviembre-2026) y [cultura de Mataderos](/notas/cultura-folklore-y-bares-de-mataderos).'
      }
    ]
  }
];
