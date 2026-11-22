import type { Nota } from '../types';

export const PATRIMONIO: Nota[] = [
  {
    slug: 'patrimonio-de-mataderos',
    type: 'pilar',
    title: 'Patrimonio de Mataderos: La Recova, el Mercado, El Resero y el Museo Criollo',
    description:
      'Patrimonio y arquitectura de Mataderos: la antigua administración, el Mercado de Hacienda, El Resero de Sarniguet y el Museo Criollo de los Corrales.',
    dek: 'El casco no es una escenografía de la feria. Es un edificio italianizante de planta en U, un monumento ecuestre y un museo adentro, con decretos que los nombran.',
    category: 'Patrimonio',
    publishedAt: '2026-04-08',
    image: 'frente',
    datos: {
      title: 'El conjunto, en una ficha',
      rows: [
        { label: 'Edificio', value: 'Antigua administración de los Mataderos' },
        { label: 'Obra', value: 'Entre 1889 y 1901' },
        { label: 'Declaratoria del edificio', value: 'Monumento Histórico Nacional, Decreto 1021/1979' },
        { label: 'Monumento', value: 'El Resero, Emilio Jacinto Sarniguet, inaugurado en el lugar el 26 de mayo de 1934' },
        { label: 'Museo', value: 'Museo Criollo de los Corrales, desde el 9 de julio de 1964' },
        { label: 'Protección urbana', value: 'Distrito APH 21, Ley 3685' }
      ]
    },
    fuentes: [
      {
        title: 'Administración de los Mataderos',
        url: 'https://www.argentina.gob.ar/capital-humano/cultura/monumentos/administracion-de-los-mataderos',
        publisher: 'Gobierno de la Nación'
      },
      {
        title: 'Casco histórico de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/casco-historico-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Ley 3685 — Distrito APH 21',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/165471',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      },
      {
        title: 'El Resero, bien de interés histórico nacional',
        url: 'https://aquimataderosonline.com.ar/el-resero-bien-de-interes-historico-nacional/',
        publisher: 'Aquí Mataderos'
      },
      {
        title: 'Museo Criollo de los Corrales',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/museo-criollo-de-los-corrales',
        publisher: 'Turismo Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El patrimonio de Mataderos que se puede señalar con el dedo está concentrado en un cruce: Lisandro de la Torre y la avenida de los Corrales. Ahí la antigua administración de los mataderos abre una planta en U, abraza una plazoleta y deja ver una torre con reloj. En la plazoleta está El Resero. Dentro del edificio, el Museo Criollo de los Corrales. El domingo la feria lo tapa de puestos. Entre semana, o temprano, el conjunto se lee como arquitectura. Esta guía sirve para las dos visitas.'
      },
      {
        kind: 'p',
        text: 'Cada pieza tiene su nota. [La Recova](/notas/la-recova-de-mataderos) recorre el edificio y la declaratoria de 1979. [El Resero](/notas/el-resero-de-mataderos) sigue a Emilio Jacinto Sarniguet desde el encargo de 1929 hasta la inauguración de 1934. El [Museo Criollo](/notas/museo-criollo-de-los-corrales) dice qué hay en las salas y a qué dirección ir. El [casco histórico y el APH 21](/notas/casco-historico-de-mataderos) explica la protección urbana, que es más aburrida que una foto y más útil que un adjetivo. La historia de por qué ese edificio está ahí está en la guía de [historia de Mataderos](/notas/historia-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Un edificio, no un telón'
      },
      {
        kind: 'p',
        text: 'La ficha nacional del monumento describe un edificio italianizante, exento, en la confluencia de dos avenidas. La planta en U abraza la plazoleta. Una calle adoquinada la circunda. La torre central, con reloj de origen inglés y mirador, se ve de lejos y funciona como hito del barrio. En la fachada del cuerpo principal, grandes pilares reciben los arcos de medio punto de las galerías. Dos alas más bajas convergen en un espacio central con recovas. Eso es “La Recova” en el habla del domingo: no un mercado colonial de postal, sino las galerías de la administración de los mataderos.'
      },
      {
        kind: 'p',
        text: 'La misma ficha da el calendario de obra. En 1888, anegados los corrales del Sur, se decidió el traslado a campos dos o tres kilómetros al sur de Liniers. La piedra fundamental figura ahí el 18 de abril de 1889 —la Ciudad y la Legislatura usan el 14, y la diferencia está explicada en la historia del barrio—. El establecimiento se inauguró el 21 de marzo de 1900. Las construcciones ocuparon primero ocho de unas veinte hectáreas. El Decreto 1021 de 1979 declaró Monumento Histórico Nacional a la administración. Aquí Mataderos recuerda que ese decreto cubre los edificios de la administración de los antiguos mataderos, y que El Resero entró en otro reconocimiento, en 2019.'
      },
      {
        kind: 'h2',
        text: 'El Resero no es un militar'
      },
      {
        kind: 'p',
        text: 'Emilio Jacinto Sarniguet modeló un resero a caballo: el trabajador que conduce la hacienda, con el caballo al paso, las riendas flojas y la cabeza gacha. El intendente José Luis Cantilo le encargó la obra en 1929 para la entrada del mercado. En 1932 obtuvo el primer premio del Salón Nacional y, por el tamaño, se mostró fuera del Palais de Glace, sobre la calle Posadas. Llegó a Mataderos para los festejos de mayo de 1934 y se inauguró en la plazoleta el 26 de mayo. Aquí Mataderos subraya un dato que el centro de la ciudad suele pasar por alto: es la estatua ecuestre porteña de un trabajador, no de un militar.'
      },
      {
        kind: 'p',
        text: 'En 2019 el Decreto 769 la incluyó entre los bienes declarados de interés histórico y artístico nacional. El monumento ya estaba en el conjunto protegido del casco; esa declaratoria lo nombra solo. La nota específica cuenta el traslado, el concejal Fernando Ghío y el enrejado de 1995, cuando los chicos se subían al caballo. Acá alcanza con no confundirlo con un gaucho de marca. El resero es un oficio del [mercado](/notas/mercado-nacional-de-hacienda).'
      },
      {
        kind: 'h2',
        text: 'El museo dentro del monumento'
      },
      {
        kind: 'p',
        text: 'El Museo Criollo de los Corrales abrió el 9 de julio de 1964. La Ciudad lo atribuye al trabajo de un grupo encabezado por el doctor Antonio José Almada. Funciona en la recova, en la avenida de los Corrales 6476. Turismo describe seis salas, prendas de gaucho, uniformes, armas, animales embalsamados y más de tres mil objetos, más la pulpería, la capilla, la caballeriza y el patio del aljibe. La misma guía dice que el museo fue declarado Monumento Histórico Nacional. El decreto de 1979 que publica la Nación nombra la administración de los mataderos, o sea el edificio. Conviene no fusionar las dos frases: el contenedor es el monumento de 1979; el museo es la institución de 1964 que lo habita. En 2001 la Comisión de Patrimonio lo registró además como sitio de interés cultural, norma 310/01, con la leyenda “Tradición e Historia de la Ganadería Argentina”.'
      },
      {
        kind: 'p',
        text: 'Visitarlo un domingo permite combinarlo con la [feria](/notas/feria-de-mataderos). Visitarlo entre semana permite ver las salas sin la cola del paseo. El teléfono que publica turismo es 4687-1949. Los horarios de sala cambian más seguido que el edificio: antes de un viaje largo, ese teléfono o la ficha de turismo mandan sobre cualquier grilla copiada.'
      },
      {
        kind: 'h2',
        text: 'La protección que no se ve en la foto'
      },
      {
        kind: 'p',
        text: 'La Ley 3685, sancionada el 13 de diciembre de 2010, incorporó al Código de Planeamiento el Distrito APH 21, “Edificios Administrativos del Antiguo Matadero”. El carácter que la ley escribe es preciso: conjunto de arquitectura italianizante, recovas, mirador, confluencia de dos avenidas, planta en U y la plazoleta con El Resero. Los inmuebles catalogados tienen nivel estructural. Cualquier intervención sobre el monumento se consulta al organismo de aplicación. La publicidad en los edificios con recova solo puede ir en el plano de fachada detrás de los arcos, y no puede pasar del cinco por ciento de la fachada de planta baja. Esa norma es la razón por la que el domingo de feria, con todo su ruido, no puede clavarle un cartel gigante al arco.'
      },
      {
        kind: 'p',
        text: 'La Ciudad, además, viene anunciando obras de conservación de fachada: limpieza, recuperación de terminaciones, revoques, herrería, color y luminarias en las recovas norte y sur y en el cuerpo principal. Son trabajos de mantenimiento de un monumento vivo, no una reconstrucción de cero. El casco se usa. El museo abre. La feria apoya puestos en el espacio público regulado. Esa superposición es el patrimonio real de Mataderos, más interesante que una fachada vacía.'
      },
      {
        kind: 'p',
        text: 'Quien tenga una sola hora, que mire la torre, dé una vuelta a la U y se pare frente al caballo. Quien tenga una tarde, que entre al museo y después cruce a la feria si es domingo, o siga hacia Alberdi si es de semana. El orden de las paradas está en [qué hacer en Mataderos](/notas/que-hacer-en-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Cuarenta minutos, en orden'
      },
      {
        kind: 'p',
        text: 'Entrá por Lisandro de la Torre y parate lejos, para ver la torre entera antes de que un puesto o un árbol te la corten. Cruzá a la plazoleta y rodeá El Resero sin pegarte a la reja: el caballo se entiende de cuerpo entero, al paso, con la cabeza baja. Después caminá un ala de la U hasta el fondo y volvé por la otra. Si el museo está abierto, esos cuarenta minutos se convierten en una hora y media y valen más adentro que afuera. Si está cerrado, no insistas en una puerta lateral: la fachada y el monumento ya son la visita, y el teléfono 4687-1949 sirve para la próxima.'
      },
      {
        kind: 'p',
        text: 'El domingo ese recorrido se hace antes de la una. Después la feria no impide ver, pero impide ver seguido. Entre semana el mismo giro muestra el adoquín, las tipas que la norma del APH 21 protege y el reloj de la torre sin un parlante encima. Las dos visitas son legítimas. Decir que el casco “solo funciona el domingo” es quedarse con la feria y perder el edificio. Decir que la feria “tapa el patrimonio” es quedarse con la foto vacía y perder el uso para el que el monumento sigue abierto.'
      },
      {
        kind: 'h2',
        text: 'Errores de lectura que conviene evitar'
      },
      {
        kind: 'p',
        text: 'El primero: llamar Recova Vieja a este edificio. La Recova Vieja de la Plaza de Mayo se demolió en el siglo XIX y no tiene nada que ver con Mataderos. Acá la recova es la galería de la administración de los mataderos. El segundo: fechar El Resero en 1932 y dar por inaugurado el barrio ese año. 1932 es el premio en el Salón Nacional, con la estatua todavía en Posadas. En la plazoleta está desde el 26 de mayo de 1934. El tercero: atribuir el museo al autor del Martín Fierro. El José Hernández del poema no fundó esta casa. El impulso que citan la Ciudad y las crónicas es el de Antonio José Almada, en 1964.'
      },
      {
        kind: 'p',
        text: 'El cuarto error es de plano. El casco protegido no es todo Mataderos. Alberdi, Emilio Castro y la cancha tienen su vida y no entran en el polígono del APH 21. Ampliar la palabra “casco” hasta la General Paz vacía la declaratoria. Achicarla a una sola fachada esconde las alas, la plazoleta y el monumento, que la ley nombra juntos. Con esas cuatro correcciones, la esquina se puede mirar sin un guía y sin una leyenda de más. Y si hace falta una quinta: el reloj de la torre es de origen inglés según la ficha nacional, pero la hora que importa para la visita es la de la feria, no la de la maquinaria. Mirá el edificio. Confirmá el domingo en las páginas de la Ciudad.'
      }
    ]
  },
  {
    slug: 'la-recova-de-mataderos',
    type: 'satelite',
    pillarSlug: 'patrimonio-de-mataderos',
    title: 'La Recova de Mataderos: la antigua administración del mercado',
    description:
      'Qué es La Recova de Mataderos, cuándo se construyó la antigua administración y por qué es Monumento Histórico Nacional desde 1979.',
    dek: 'La Recova no es un mercado aparte. Es la galería de la antigua administración: arcos, alas y una torre con reloj inglés.',
    category: 'Arquitectura',
    publishedAt: '2026-05-28',
    image: 'frente',
    datos: {
      title: 'El edificio',
      rows: [
        { label: 'Nombre de uso', value: 'La Recova / antigua administración de los Mataderos' },
        { label: 'Dónde', value: 'Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Estilo', value: 'Italianizante, planta en U' },
        { label: 'Inauguración del establecimiento', value: '21 de marzo de 1900' },
        { label: 'Declaratoria', value: 'Decreto 1021/1979, Monumento Histórico Nacional' }
      ]
    },
    fuentes: [
      {
        title: 'Administración de los Mataderos',
        url: 'https://www.argentina.gob.ar/capital-humano/cultura/monumentos/administracion-de-los-mataderos',
        publisher: 'Gobierno de la Nación'
      },
      {
        title: 'Casco histórico de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/casco-historico-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Patrimonio del casco histórico',
        url: 'https://aquimataderosonline.com.ar/patrimonio-historico-arquitectonico-del-barrio-de-mataderos/',
        publisher: 'Aquí Mataderos'
      },
      {
        title: 'Ley 3685 — APH 21',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/165471',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'Cuando alguien dice “nos vemos en La Recova”, está citando las galerías de la antigua administración de los mataderos, no un edificio con ese nombre en el frente. El conjunto se construyó para el Nuevo Matadero Público y el mercado de hacienda, entre la piedra fundamental de 1889 y la puesta en marcha de 1900-1901. Hoy es Monumento Histórico Nacional y el fondo inevitable de la feria del domingo.'
      },
      {
        kind: 'h2',
        text: 'Cómo es el conjunto'
      },
      {
        kind: 'p',
        text: 'La ficha de la Nación lo describe como un edificio italianizante, separado de las construcciones vecinas. Está en la confluencia de dos avenidas. La planta en U abraza una plazoleta adoquinada, que es donde está El Resero. La torre central tiene un reloj de origen inglés y un mirador: es la señal que se ve desde varias cuadras. Los pilares de la fachada principal reciben arcos de medio punto. Dos alas más bajas se encuentran en el centro con recovas. “Recova”, en el uso porteño, es esa galería cubierta. En Mataderos el apodo se comió al nombre administrativo.'
      },
      {
        kind: 'p',
        text: 'Aquí Mataderos agrega el lenguaje del Código de Planeamiento: el distrito APH 21 lo define como conjunto italianizante de recovas y mirador, con alto valor simbólico, porque la instalación del mercado inició la urbanización de la zona. El nivel de protección es estructural. En Lisandro de la Torre 2407, esquina de los Corrales, el mismo relevamiento habla de una fachada de rasgos neorrenacentistas, mampostería de ladrillo y revoque con molduras de mano italiana. Son matices de un mismo conjunto, no dos monumentos rivales. La guía que los junta es [patrimonio de Mataderos](/notas/patrimonio-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Fechas y declaratoria'
      },
      {
        kind: 'p',
        text: 'La Nación fecha la piedra el 18 de abril de 1889 y la inauguración el 21 de marzo de 1900, con Julio A. Roca y el intendente Rodolfo Bullrich. La Ciudad y la Legislatura escriben el 14 de abril de 1889. Las dos fechas de abril están discutidas en la [historia del barrio](/notas/historia-de-mataderos); para mirar el edificio alcanza con saber que la obra es de ese cambio de siglo y que el 21 de marzo de 1900 es la inauguración que nadie discute. El Decreto 1021/1979 lo declaró Monumento Histórico Nacional. Los interiores, dice la ficha, están muy modificados por los usos sucesivos. Ahí funciona el Museo Criollo de los Corrales.'
      },
      {
        kind: 'p',
        text: 'La feria de 1986 eligió este ámbito a propósito. El decreto de creación la instala “en la Recova de Mataderos y lugares aledaños”. No es un alquiler casual de una plaza. Es el uso cultural de un monumento que ya no administra faena. El domingo los puestos se apoyan en el espacio público; la norma del APH 21 limita la publicidad sobre la fachada. El edificio se recorre por fuera en cualquier momento. Por dentro, en el horario del [museo](/notas/museo-criollo-de-los-corrales).'
      },
      {
        kind: 'h2',
        text: 'Qué mirar en diez minutos'
      },
      {
        kind: 'p',
        text: 'Parate en la plazoleta, de espaldas al caballo, y mirá el cuerpo central: pilares, arco, torre. Después caminá una de las alas hasta el final de la U y volvé por la otra. El adoquín que circunda la plazoleta es parte de la descripción oficial, no un detalle pintoresco. Si es domingo, hacé ese giro temprano: después de la una el flujo de la [feria](/notas/feria-de-mataderos) no deja ver el piso. La foto de Camila Mazza que ilustra esta nota muestra el frente en un día sin esa multitud, en agosto de 2015.'
      },
      {
        kind: 'p',
        text: 'La torre tiene foto propia de Roberto Fiadone, tomada en noviembre de 2007 desde la avenida de los Corrales hacia el noreste. Sirve para reconocer el hito antes de bajar del colectivo. Si la buscás y no aparece, todavía no llegaste al cruce: en Mataderos hay otras torres, pero ninguna con ese reloj y esa plazoleta delante.'
      }
    ]
  },
  {
    slug: 'el-resero-de-mataderos',
    type: 'satelite',
    pillarSlug: 'patrimonio-de-mataderos',
    title: 'El Resero de Mataderos: el monumento de Emilio Sarniguet',
    description:
      'Historia de El Resero en Mataderos: Emilio Jacinto Sarniguet, el premio de 1932, la inauguración del 26 de mayo de 1934 y la declaratoria de 2019.',
    dek: 'Es un trabajador a caballo, no un general. Sarniguet lo modeló para la entrada del mercado y el barrio lo inauguró en 1934.',
    category: 'Monumento',
    publishedAt: '2026-07-23',
    image: 'resero',
    datos: {
      title: 'El monumento',
      rows: [
        { label: 'Autor', value: 'Emilio Jacinto Sarniguet' },
        { label: 'Encargo', value: '1929, intendente José Luis Cantilo' },
        { label: 'Premio', value: 'Primer premio, Salón Nacional, 21 de septiembre de 1932' },
        { label: 'Inauguración en Mataderos', value: '26 de mayo de 1934' },
        { label: 'Dónde', value: 'Plazoleta en Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Declaratoria de 2019', value: 'Decreto 769/2019, interés histórico y artístico nacional' }
      ]
    },
    fuentes: [
      {
        title: 'Monumento ecuestre El Gaucho Resero',
        url: 'https://es.wikipedia.org/wiki/Monumento_ecuestre_El_Gaucho_Resero',
        publisher: 'Wikipedia en español'
      },
      {
        title: 'Historias de mi Comuna: Monumento El Resero',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-monumento-el-resero',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'El Resero, bien de interés histórico nacional',
        url: 'https://aquimataderosonline.com.ar/el-resero-bien-de-interes-historico-nacional/',
        publisher: 'Aquí Mataderos'
      },
      {
        title: 'Plazoleta El Resero',
        url: 'https://www.plazasdebuenosaires.com/plazoletaelresero.php',
        publisher: 'Plazas de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El Resero es la escultura que ordena la plazoleta de Mataderos. Un hombre a caballo, al paso, con poncho y sombrero, las riendas flojas y el animal con la cabeza baja. No galopa y no señala una batalla. Emilio Jacinto Sarniguet modeló a un resero: el trabajador que aparta y lleva la hacienda hasta el mercado, el frigorífico o el matadero. El barrio lo tiene enfrente de la antigua administración desde el 26 de mayo de 1934.'
      },
      {
        kind: 'h2',
        text: 'Del encargo al Salón Nacional'
      },
      {
        kind: 'p',
        text: 'En 1929 el intendente José Luis Cantilo le encargó a Sarniguet una estatua ecuestre para el Mercado de Liniers, el predio del actual casco. El escultor, nacido en 1887 y muerto en 1943, venía de trabajar animales: antes de ese encargo había obtenido un segundo premio nacional con Relinchando. La Ciudad cuenta que viajó al haras de la familia Solanet, en la estancia El Cardal, cerca de Ayacucho, para mirar caballos criollos, y que modeló después en un taller de Juncal y Uriburu. En la base quedaron la firma y la fecha de la obra.'
      },
      {
        kind: 'p',
        text: 'El 21 de septiembre de 1932 se presentó en el XXII Salón Nacional, en el Palais de Glace. No entraba por la puerta. La expusieron sobre la entrada de la calle Posadas y ahí se quedó cerca de un año y medio. Ganó el primer premio. El costo que registran las crónicas es de 20.000 pesos de entonces. Wikipedia y la ficha de plazas coinciden en el premio y en el problema del tamaño. La nota de [patrimonio](/notas/patrimonio-de-mataderos) ubica esta pieza dentro del conjunto; acá importa el camino del bronce.'
      },
      {
        kind: 'h2',
        text: 'Por qué está en Mataderos y no en Posadas'
      },
      {
        kind: 'p',
        text: 'El traslado no fue automático. Hizo falta la gestión del concejal Fernando Ghío, vecino del barrio, ante el intendente Mariano de Vedia y Mitre, y la del director del mercado, Edmundo Kelly. Ghío había llegado a la zona de chico, en 1898, y tenía un bar frente al lugar donde hoy está el monumento. La escultura llegó poco antes del 25 de mayo de 1934. Hubo fiesta patria y al día siguiente, el 26, la inauguración, con Sarniguet presente. Algunas fichas de archivo titulan la foto el 25 de mayo; las crónicas que reconstruyen el acto separan la fiesta de la inauguración del día siguiente. Esta nota sigue el 26 de mayo, que es la fecha que repiten Wikipedia, Aquí Mataderos y el catálogo de plazas.'
      },
      {
        kind: 'p',
        text: 'Antes, en ese punto de la plazoleta, estaba el recuerdo de la piedra fundamental del mercado. Se retiró para dejar el lugar al resero. El monumento fue el primero del barrio. La dirección de uso es Lisandro de la Torre al 2300, frente a la avenida de los Corrales. La foto de Roberto Fiadone de 2014, la de esta página, lo muestra contra la fachada rosa del conjunto: el caballo y la ventana de postigos en el mismo encuadre.'
      },
      {
        kind: 'h2',
        text: 'Qué mira y cómo se protegió después'
      },
      {
        kind: 'p',
        text: 'La vestimenta y el apero están resueltos con precisión de oficio, no de fantasía. El caballo anda. El jinete no posa para un prócer. Aquí Mataderos lo dice con una frase que vale la pena conservar: es la estatua ecuestre de la ciudad que muestra a un trabajador. En 1995 hubo que enrejarla. La Ciudad explica por qué: los chicos se subían, primero se elevó la plataforma y después el cerco se volvió inevitable. El bronce se mira desde afuera de esa reja.'
      },
      {
        kind: 'p',
        text: 'El Decreto 769, del 14 de noviembre de 2019, la declaró bien de interés histórico nacional y bien de interés artístico nacional, dentro de un listado grande de esculturas del espacio público. El edificio de atrás ya era monumento desde el Decreto 1021 de 1979. Juntos forman el centro simbólico del casco. Un domingo de [feria](/notas/feria-de-mataderos) el monumento queda en medio del público: se puede llegar, no siempre se puede fotografiar entero. Entre semana la plazoleta devuelve la escala real, que es la de un hombre a caballo y no la de un escenario.'
      }
    ]
  },
  {
    slug: 'museo-criollo-de-los-corrales',
    type: 'satelite',
    pillarSlug: 'patrimonio-de-mataderos',
    title: 'Museo Criollo de los Corrales: qué ver y dónde queda',
    description:
      'Museo Criollo de los Corrales en Mataderos: dirección, origen el 9 de julio de 1964, salas y cómo combinarlo con la feria del domingo.',
    dek: 'Está dentro de la recova, no en un edificio nuevo. Seis salas, una pulpería, una capilla y el patio del aljibe, a metros de El Resero.',
    category: 'Museo',
    publishedAt: '2026-09-03',
    image: 'frente',
    datos: {
      title: 'Visita',
      rows: [
        { label: 'Dirección', value: 'Av. de los Corrales 6476' },
        { label: 'Apertura', value: '9 de julio de 1964' },
        { label: 'Origen', value: 'Grupo encabezado por el doctor Antonio José Almada' },
        { label: 'Teléfono publicado', value: '4687-1949' },
        { label: 'Sitio de interés cultural', value: 'Norma 310/01, año 2001' }
      ]
    },
    fuentes: [
      {
        title: 'Museo Criollo de los Corrales',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/museo-criollo-de-los-corrales',
        publisher: 'Turismo Buenos Aires'
      },
      {
        title: 'Historias de mi Comuna: Museo Criollo de los Corrales',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-museo-criollo-de-los-corrales',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Sitio de interés cultural',
        url: 'https://buenosaires.gob.ar/areas/cultura/cpphc/sitios/detalle.php?id=72',
        publisher: 'Comisión para la Preservación del Patrimonio Histórico Cultural'
      },
      {
        title: 'Administración de los Mataderos',
        url: 'https://www.argentina.gob.ar/capital-humano/cultura/monumentos/administracion-de-los-mataderos',
        publisher: 'Gobierno de la Nación'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El Museo Criollo de los Corrales ocupa la recova del antiguo matadero, en la avenida de los Corrales 6476. No hay que buscar un cubo de hormigón nuevo: se entra al monumento. Abrió el 9 de julio de 1964 como entidad sin fines de lucro, por el trabajo de un grupo que la Ciudad encabeza en el doctor Antonio José Almada, un apasionado de las tradiciones. Otras crónicas lo llaman José A. Almada. Es la misma persona y el mismo museo.'
      },
      {
        kind: 'h2',
        text: 'Qué hay para ver'
      },
      {
        kind: 'p',
        text: 'Turismo Buenos Aires describe seis salas: prendas de gaucho, uniformes y armas, animales embalsamados de la región y más de tres mil objetos. Completan el recorrido una pulpería, una capilla, una caballeriza y el patio del aljibe. Es un museo de la cultura criolla y de la ganadería, no un museo de arte contemporáneo ni una muestra temporaria de la feria. La placa de sitio de interés cultural, norma 310/01 del año 2001, resume la intención: “Tradición e Historia de la Ganadería Argentina”.'
      },
      {
        kind: 'p',
        text: 'La ficha de turismo dice además que el museo fue declarado Monumento Histórico Nacional. El decreto que la Nación publica para este predio, el 1021 de 1979, nombra la administración de los mataderos: el edificio. El museo es quien lo usa desde 1964. Decir “el museo es el monumento” es una forma corta de la guía turística. Decir “el museo funciona en el monumento” es la forma que no mezcla una institución con una declaratoria. Las dos pueden leerse. Esta nota prefiere la segunda, y deja la arquitectura en [La Recova](/notas/la-recova-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Cuándo ir'
      },
      {
        kind: 'p',
        text: 'El domingo es la combinación que recomienda turismo: museo más [Feria de Mataderos](/notas/feria-de-mataderos), que está en la puerta. La cola y el ruido son parte de ese plan. Entre semana el casco está más quieto y las salas se ven con otra calma. El teléfono publicado es 4687-1949. Los días y las horas de apertura no están fijados en una ley: cambian, y un feriado de feria no garantiza que la sala abra el mismo rango que un domingo común. Llamar antes evita el viaje solo para encontrar la puerta cerrada.'
      },
      {
        kind: 'p',
        text: 'El Resero queda a metros, en la plazoleta que el edificio abraza. Se puede ver el monumento aunque el museo esté cerrado. No se puede ver las salas desde la vereda. Si el plan es el conjunto completo, la guía de [patrimonio](/notas/patrimonio-de-mataderos) lo ordena; si el plan es el día entero, el [domingo en Mataderos](/notas/domingo-en-mataderos) mete el museo en la primera hora, antes de que la feria llene la galería.'
      },
      {
        kind: 'h2',
        text: 'Quién lo sostuvo'
      },
      {
        kind: 'p',
        text: 'Además de Almada, las crónicas del museo recuerdan a quienes lo continuaron: Hugo Corradi, Emilio Ramos Marrero y Esteban Breglia aparecen en los relatos de la casa. No hace falta convertirlos en una lista de próceres. Alcanza con saber que no fue una oficina que se inauguró y se abandonó: llevó décadas de trabajo de un grupo chico, dentro de un edificio que el Estado ya había destinado a otra cosa. Hoy es la forma más directa de ver, bajo techo, los objetos del mundo que la feria representa al aire libre.'
      },
      {
        kind: 'h2',
        text: 'Qué mirar si hay poco tiempo'
      },
      {
        kind: 'p',
        text: 'Con media hora, no intentes las seis salas como un checklist. Entrá, buscá la pulpería y el patio del aljibe, y una vitrina de apero o de platería. Esos tres puntos alcanzan para entender de qué habla el museo: del trabajo rural que el barrio empleó, no de una sucesión de próceres. Si hay un guía del equipo, una pregunta bien hecha —qué objeto vino del mercado, cuál es de una provincia— rinde más que una recorrida muda. Si no hay guía, los carteles que haya mandan sobre la imaginación.'
      },
      {
        kind: 'p',
        text: 'Después salí a la plazoleta. [El Resero](/notas/el-resero-de-mataderos) está a metros y cierra la visita: el mismo oficio, en bronce, al aire libre. Volver a entrar “por si falta una sala” solo tiene sentido si el domingo todavía no llenó la galería. Si ya la llenó, dejá el resto para un día de semana y bajá a la [feria](/notas/feria-de-mataderos) con la cabeza hecha. El museo no compite con el paseo. Lo prepara.'
      }
    ]
  },
  {
    slug: 'casco-historico-de-mataderos',
    type: 'satelite',
    pillarSlug: 'patrimonio-de-mataderos',
    title: 'Casco histórico de Mataderos y el área de protección APH 21',
    description:
      'Qué protege el casco histórico de Mataderos: el Distrito APH 21, la Ley 3685 y qué se puede y qué no se puede hacer en La Recova.',
    dek: 'El casco no es un slogan. Es un polígono del Código de Planeamiento, con niveles de protección para el edificio, el monumento y hasta el tamaño de los carteles.',
    category: 'Patrimonio',
    publishedAt: '2026-10-08',
    image: 'corrales',
    datos: {
      title: 'La norma',
      rows: [
        { label: 'Distrito', value: 'APH 21, Edificios Administrativos del Antiguo Matadero' },
        { label: 'Ley', value: '3685, sancionada el 13 de diciembre de 2010' },
        { label: 'Publicación', value: '11 de febrero de 2011' },
        { label: 'Monumento nacional', value: 'Decreto 1021/1979, el edificio' },
        { label: 'Qué mira la ley', value: 'Planta en U, recovas, mirador, plazoleta y El Resero' }
      ]
    },
    fuentes: [
      {
        title: 'Ley 3685',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/165471',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      },
      {
        title: 'Casco histórico de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/casco-historico-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Patrimonio del casco',
        url: 'https://aquimataderosonline.com.ar/patrimonio-historico-arquitectonico-del-barrio-de-mataderos/',
        publisher: 'Aquí Mataderos'
      },
      {
        title: 'Administración de los Mataderos',
        url: 'https://www.argentina.gob.ar/capital-humano/cultura/monumentos/administracion-de-los-mataderos',
        publisher: 'Gobierno de la Nación'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: '“Casco histórico de Mataderos” se usa como si fuera un barrio dentro del barrio. En los papeles es más concreto. La Ley 3685 creó el Distrito APH 21, Edificios Administrativos del Antiguo Matadero, un polígono apoyado en la avenida Lisandro de la Torre y en el Parque Alberdi. Adentro entran el conjunto de la administración, la plazoleta y El Resero. Afuera, el resto de Mataderos tiene otras reglas. Saber el límite evita llamar “casco” a cualquier casa antigua de Alberdi.'
      },
      {
        kind: 'h2',
        text: 'Qué dice la ley que es este lugar'
      },
      {
        kind: 'p',
        text: 'El artículo de carácter es una buena definición de arquitectura, no un folleto. Habla de un conjunto italianizante con recovas y un mirador singular, en la confluencia de dos avenidas, de alto valor simbólico. La planta en U abraza una plazoleta donde se destaca el monumento El Resero. Los inmuebles catalogados llevan protección estructural. La intervención sobre el monumento se consulta con el organismo de aplicación. Aquí Mataderos agrega que también se protegen las tipas de la forestación y que se regulan veredas, toldos, publicidad, iluminación y mobiliario.'
      },
      {
        kind: 'p',
        text: 'La publicidad merece una cita porque se ve todos los domingos. En los edificios con recova, los letreros solo pueden ir en el plano de fachada por detrás de los arcos, y no pueden superar el cinco por ciento de la superficie de la fachada de planta baja. La [feria](/notas/feria-de-mataderos) vive de puestos y de carteles. La norma no los prohíbe: les marca el lugar. Esa es la diferencia entre un monumento usado y un monumento disfrazado.'
      },
      {
        kind: 'h2',
        text: 'Las dos declaratorias'
      },
      {
        kind: 'p',
        text: 'El edificio es Monumento Histórico Nacional por el Decreto 1021 de 1979. El Resero es bien de interés histórico y artístico nacional por el Decreto 769 de 2019. El APH 21 es norma de la Ciudad, de 2010, y ordena el entorno: qué se puede reformar, qué se cataloga, cómo se anuncia un comercio. Tres capas. La guía de [patrimonio](/notas/patrimonio-de-mataderos) las presenta juntas. [La Recova](/notas/la-recova-de-mataderos) se ocupa del edificio. [El Resero](/notas/el-resero-de-mataderos), de la escultura. Esta nota se ocupa de la regla que las mantiene en pie como conjunto.'
      },
      {
        kind: 'p',
        text: 'La Ciudad informa obras de conservación: limpieza, terminaciones originales, ornamentación, carpintería, herrería, color y luminarias en las recovas norte y sur y en el cuerpo principal. Son intervenciones de mantenimiento sobre un monumento que sigue abierto al museo y al domingo. No son una peatonal nueva ni un shopping patrimonial. Si visitás durante una obra, parte de la fachada puede estar en andamio. El conjunto se entiende igual.'
      },
      {
        kind: 'h2',
        text: 'Cómo caminarlo'
      },
      {
        kind: 'p',
        text: 'Entrá por Lisandro de la Torre hacia el cruce con la avenida de los Corrales. La U se recorre por fuera. La plazoleta es el centro. El Parque Alberdi, que la ley usa como borde del polígono, queda al lado y no debe confundirse con el monumento: es parque, no administración. Entre semana se ve la arquitectura. El domingo se ve la arquitectura más la feria, que es el uso público más intenso que el casco tiene desde 1986.'
      },
      {
        kind: 'p',
        text: 'El resto del barrio —Alberdi, Emilio Castro, la cancha, El Plata— no forma parte del APH 21. Tiene su propia guía de [recorrido](/notas/avenida-alberdi-y-emilio-castro). Llamar casco histórico a toda Mataderos diluye la única protección que esta esquina tiene escrita con número de ley.'
      },
      {
        kind: 'p',
        text: 'Para quien escribe o fotografía el lugar, el crédito correcto del conjunto es administración de los mataderos, Monumento Histórico Nacional por el Decreto 1021/1979, y El Resero, de Emilio Jacinto Sarniguet, inaugurado en la plazoleta el 26 de mayo de 1934. El APH 21 no se ve en la foto y sí se nota en lo que la foto no tiene: un cartel enorme tapando el arco. Si una obra de fachada tapa una ala, el conjunto sigue siendo el mismo. Se espera, se rodea y no se declara en ruinas un andamio de mantenimiento.'
      },
      {
        kind: 'p',
        text: 'Y para quien solo viene a la feria: el polígono no te pide entrada ni te echa. Te pide que el puesto no se clave al monumento y que la música no sea la única lectura de la esquina. Diez minutos de vuelta a la U, antes de comprar, alcanzan para honrar la ley sin leerla entera. El texto está en el Boletín, linkeado arriba, para quien quiera el artículo y el plano.'
      }
    ]
  }
];
