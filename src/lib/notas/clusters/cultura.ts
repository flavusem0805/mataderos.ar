import type { Nota } from '../types';

export const CULTURA: Nota[] = [
  {
    slug: 'cultura-folklore-y-bares-de-mataderos',
    type: 'pilar',
    title: 'Cultura en Mataderos: folklore, tango y bares notables',
    description:
      'Folklore, baile, tango y bares de Mataderos: la feria del domingo, la sortija, El Cedrón de Alberdi y qué no inventar sobre la milonga del barrio.',
    dek: 'La música que el barrio documenta en vivo es el folklore del domingo. El tango está en la memoria de sus bares. Conviene no cambiarles el lugar.',
    category: 'Cultura',
    publishedAt: '2026-04-21',
    image: 'baile',
    datos: {
      title: 'Dónde está cada cosa',
      rows: [
        { label: 'Folklore y baile', value: 'Escenario de la feria, domingos, en el casco' },
        { label: 'Sortija', value: 'Sobre Lisandro de la Torre, el mismo domingo' },
        { label: 'Pizzería con historia', value: 'El Cedrón, Av. Alberdi 6100' },
        { label: 'Sala', value: 'Cine Teatro El Plata, Av. Alberdi 5765' },
        { label: 'Tango de grilla fija', value: 'No hay, en estas fuentes, un circuito de milongas equivalente al de otros barrios' }
      ]
    },
    fuentes: [
      {
        title: 'Feria de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/feriademataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'El Cedrón, la pizza y la impronta de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-el-cedron-la-pizza-y-la-impronta-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Feria de Mataderos',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos',
        publisher: 'Turismo Buenos Aires'
      },
      {
        title: 'La Ciudad reabre el Cine Teatro El Plata',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'La vida cultural de Mataderos que se puede citar sin inventar tiene tres patas. La primera es el folklore del domingo: música, danza y la corrida de sortija en la feria, creadas como programa en 1986 y sostenidas en el casco. La segunda es la memoria de los bares y de las pizzerías de avenida, con El Cedrón como la esquina que la propia Ciudad escribió. La tercera es la sala de Alberdi, El Plata, que volvió a abrir en 2021 después de un cierre de décadas. El tango aparece en los cuadros de esos bares y en los nombres que pasaron por El Plata. No aparece, en las fuentes de esta guía, como una red de milongas con dirección y día fijo.'
      },
      {
        kind: 'p',
        text: 'Esa distinción evita una guía mentirosa. Quien busca “tango en Mataderos” merece saber que el baile documentado de la esquina es la chacarera, la zamba y el malambo, no una milonga de las diez. Quien busca “bares notables” merece una ficha de verdad y no una lista de diez nombres copiados de otro barrio. Las notas de este racimo son [El Cedrón](/notas/el-cedron-de-mataderos), el [folklore y el baile](/notas/folklore-y-baile-en-mataderos) y los [bares y esquinas](/notas/bares-y-esquinas-de-mataderos). La feria completa está en su [guía](/notas/feria-de-mataderos). La sala, en [El Plata](/notas/cine-teatro-el-plata).'
      },
      {
        kind: 'h2',
        text: 'El domingo como política cultural'
      },
      {
        kind: 'p',
        text: 'La Feria de las Artesanías y Tradiciones Populares Argentinas no nació como un accidente de puesteros. El decreto del 25 de junio de 1986 la crea dentro del Plan Cultural en Barrios, en la Recova, para divulgar costumbres de las regiones del país. La ficha actual de la Ciudad describe el resultado: artesanos, patio de comida y un escenario con música y danza folklórica de artistas locales y de las provincias. Turismo suma la sortija. Es un programa público que usa un monumento del siglo XIX como sala al aire libre.'
      },
      {
        kind: 'p',
        text: 'Eso explica el tono. No es la programación de un centro cultural con abono. Es gratis, es dominical y se suspende por lluvia. Se canta con guitarra y bombo, se baila en pareja y en ronda, y el malambo se ve con el respeto que se le tiene a una destreza, no a un interludio. La foto de Roberto Fiadone de una pareja en el cruce, de 2007, sigue siendo un documento fiel de ese uso. Diecinueve años no cambiaron el gesto, aunque cambien los conjuntos.'
      },
      {
        kind: 'h2',
        text: 'Tango: dónde sí y dónde no'
      },
      {
        kind: 'p',
        text: 'El Plata, entre 1945 y 1987, recibió a Troilo, Goyeneche, Sosa y Maizani, según las crónicas de la reapertura. Eso es tango y es historia de una sala, no una milonga que siga en la misma puerta todos los jueves. El Cedrón cuelga, en el relato de la Ciudad, cuadros de Gardel, de Pedro Maffia y de Alberto Castillo: la pizzería porteña clásica se decora con el canon del tango aunque venda fainá. Esas dos presencias son reales. Convertirlas en “la noche tanguera de Mataderos”, con dirección y horario que nadie publicó, sería rellenar.'
      },
      {
        kind: 'p',
        text: 'El barrio tuvo, además, una cultura de pulpería y de esquina ligada al trabajo de los corrales, anterior al tango de salón y distinta del folklore de escenario. La [historia](/notas/historia-de-mataderos) la ubica en el personal a caballo y en el mercado. Parte de ese mundo está reunido, como objeto, en el [Museo Criollo](/notas/museo-criollo-de-los-corrales). Otra parte sigue en el habla y en los bares que quedaron. No hace falta un espectáculo para que exista.'
      },
      {
        kind: 'h2',
        text: 'Bares: una esquina documentada y el resto con cuidado'
      },
      {
        kind: 'p',
        text: 'El Cedrón es el caso con ficha. Antes fue el bodegón Primera Curva, por el giro del tranvía, en Alberdi al 6100. En 1930 un propietario de apellido Méndez renovó el local y puso mostrador de estaño. En 1935 Manuel Cedrón lo compró y lo nombró Bar El Cedrón. La fama de la pizza llegó en los años sesenta. La Legislatura lo declaró de interés cultural. Sigue en la esquina de Murguiondo, con azulejos y pocos arreglos. Esa historia da para una nota entera y la tiene.'
      },
      {
        kind: 'p',
        text: 'Otros nombres circulan en la conversación del barrio y en fotos sueltas. Esta guía no les inventa fecha de fundación ni especialidad. La nota de esquinas dice cómo reconocer una esquina con historia —mostrador, nombre viejo, relación con el tranvía o con el mercado— y se queda en lo que tiene fuente. Es preferible una pizzería bien contada a siete bares de relleno.'
      },
      {
        kind: 'h2',
        text: 'Cómo pasar una tarde cultural sin forzarla'
      },
      {
        kind: 'p',
        text: 'El domingo, el plan es la feria: escenario, sortija si está, una vuelta al museo si abre. La noche de viernes o sábado, el plan es mirar la cartelera de El Plata y, si hay hambre, una mesa sobre Alberdi. Entre semana, el casco vacío enseña más arquitectura que espectáculo. [Qué hacer en Mataderos](/notas/que-hacer-en-mataderos) ordena esos tres tiempos. La cultura del barrio no está escondida. Está a la vista, con horario de domingo y con una pizza que no necesita micrófono.'
      },
      {
        kind: 'h2',
        text: 'Un recorrido de tres horas, sin escenario inventado'
      },
      {
        kind: 'p',
        text: 'Si el domingo está confirmado y no llueve, tres horas alcanzan para lo cultural sin convertir el día en una maratón. La primera es para la planta en U y El Resero, porque después el público tapa la fachada. La segunda es para el escenario: llegá cuando haya conjunto, no a las once en punto, y quedate un malambo entero antes de sacar la foto e irte. La tercera es para una ronda que no esté en el micrófono, si la hay, o para el museo si abrió. Comer puede entrar en cualquiera de las tres, de pie, sin sentarse a un almuerzo que te haga perder el baile.'
      },
      {
        kind: 'p',
        text: 'Ese recorrido no incluye una milonga porque esta guía no tiene una dirección de milonga para ofrecer. Incluye tango solo como memoria: los nombres que las crónicas de 2021 ponen en El Plata entre 1945 y 1987, y los cuadros de Gardel, Maffia y Castillo en El Cedrón. Si esa noche hay función en Alberdi 5765, es un segundo traslado, no una continuación del escenario de la feria. La cartelera manda. El deseo de “cerrar el día con un tango” no alcanza para inventar la función.'
      },
      {
        kind: 'h2',
        text: 'Qué se escucha además del escenario'
      },
      {
        kind: 'p',
        text: 'En los puestos hay radios, hay guitarras de quien vende y hay el ruido de la sortija cuando sale un caballo. No es una banda sonora curada. Es el sonido de una feria que el decreto de 1986 quiso llena de tradiciones y que el uso llenó también de conversación, de aceite de fritura y de colectivo que frena lejos. Quien graba un video de treinta segundos en el escenario se lleva el momento más limpio. Quien se queda una hora se lleva el barrio, que es más desprolijo y más fiel.'
      },
      {
        kind: 'p',
        text: 'Entre semana ese sonido no existe. El casco queda para la arquitectura y Alberdi para el mostrador. Por eso la cultura de Mataderos no se resume en una agenda de lunes a lunes. Tiene un pico dominical enorme y una vida de esquina el resto de la semana. Pedirle al martes que se parezca al domingo es el error de quien vio una sola foto. Pedirle al domingo que tenga la pizza de El Cedrón en la puerta del escenario es el error inverso: la pizza está en el 6100 de Alberdi, y el camino entre las dos cosas es parte del barrio, no un detalle.'
      },
      {
        kind: 'h2',
        text: 'Cómo citarlo sin inflarlo'
      },
      {
        kind: 'p',
        text: 'Una formulación que se puede repetir sin vergüenza: Mataderos tiene una feria de folklore declarada en su origen por un decreto de 1986, una sala histórica reabierta en 2021 y al menos una esquina de pizza con declaratoria de interés cultural. Tiene, además, un museo criollo dentro del monumento y un monumento que representa un oficio, no una batalla. No hace falta sumar festivales imaginarios para que el conjunto pese. Quien escribe “la cuna del tango” o “el barrio de las milongas” está hablando de otra geografía. Quien escribe “el domingo de las tradiciones, en el lugar donde estaba el matadero” está hablando de este.'
      },
      {
        kind: 'p',
        text: 'Para cerrar el mapa sin agregarle locales: el domingo se entra por el casco y se sale por donde se pueda caminar hasta un colectivo. La noche, si la cartelera acompaña, es Alberdi. La esquina con papeles es El Cedrón, en el 6100. El museo guarda los objetos del mundo criollo que la feria representa en vivo. Cuatro direcciones, todas con fuente, alcanzan para pasar un día cultural en Mataderos sin pedir prestado el circuito de otro barrio. Lo que sobre se camina. Lo que no esté escrito, no se inventa en esta guía. Y lo que sí está escrito alcanza para un día: feria, museo si abre, El Plata si hay función, El Cedrón si hay hambre de esquina. Cuatro decisiones, ninguna inventada, y el barrio se deja ver sin disfraz de otro género ni de otra ciudad. Si al final del día solo viste una, que sea el domingo de feria: es la que mejor explica a las otras tres, y es la que el barrio sostiene desde 1986, cada domingo, sin cobrar entrada.'
      }
    ]
  },
  {
    slug: 'el-cedron-de-mataderos',
    type: 'satelite',
    pillarSlug: 'cultura-folklore-y-bares-de-mataderos',
    title: 'El Cedrón de Mataderos: la pizzería de Alberdi y Murguiondo',
    description:
      'Historia de la pizzería El Cedrón, en Av. Alberdi 6100: del bodegón Primera Curva al bar de Manuel Cedrón y la pizza de los años sesenta.',
    dek: 'La esquina existía antes de la pizza. Se llamaba Primera Curva por el tranvía. En 1935 pasó a ser El Cedrón.',
    category: 'Bares',
    publishedAt: '2026-07-30',
    image: 'corrales',
    datos: {
      title: 'La esquina',
      rows: [
        { label: 'Dónde', value: 'Av. Juan B. Alberdi 6100, esquina Murguiondo' },
        { label: 'Nombre anterior', value: 'Bodegón Primera Curva' },
        { label: '1930', value: 'Remodelación de Méndez y mostrador de estaño' },
        { label: '1935', value: 'Manuel Cedrón compra el negocio y lo nombra Bar El Cedrón' },
        { label: 'Años 60', value: 'Fama de pizzería' },
        { label: 'Reconocimiento', value: 'Declarada de interés cultural por la Legislatura' }
      ]
    },
    fuentes: [
      {
        title: 'El Cedrón, la pizza y la impronta de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-el-cedron-la-pizza-y-la-impronta-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/laciudad/barrios/mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El Cedrón es la esquina de Mataderos que la Ciudad eligió contar cuando quiso explicar la pizza y la impronta del barrio. Está en Juan Bautista Alberdi al 6100, en la esquina de Murguiondo. La Legislatura la declaró de interés cultural. No es un local de la feria ni un bar del casco: es comercio de Alberdi, con una historia que empieza antes de que la pizza fuera el producto famoso.'
      },
      {
        kind: 'h2',
        text: 'La Primera Curva'
      },
      {
        kind: 'p',
        text: 'Antes de la pizzería hubo un bodegón llamado Primera Curva. El nombre citaba el trazado de las vías del tranvía, que doblaba en esa zona. En 1930 un nuevo propietario, de apellido Méndez, renovó parte del local y puso un mostrador de estaño, que entonces era la moda. El dato sirve para imaginar el barrio de los años treinta: tranvía, bodegón y estaño, a cuadras de un mercado de hacienda que ya llevaba tres décadas. La [historia de Mataderos](/notas/historia-de-mataderos) es el fondo de esa esquina, no un anexo.'
      },
      {
        kind: 'p',
        text: 'Cinco años después, en 1935, Manuel Cedrón compró el negocio y lo llamó Bar El Cedrón. Modernizó el salón y sumó mesas con vista a Murguiondo. El nombre propio se volvió nombre del local, como tantas esquinas porteñas. La fama de la pizza no fue inmediata. La Ciudad la sitúa en los años sesenta, cuando el bar ya era un ícono de la pizza de barrio. Hasta entonces había sido bodegón y bar. La pizza le dio el siglo que le faltaba.'
      },
      {
        kind: 'h2',
        text: 'Qué se conserva del local'
      },
      {
        kind: 'p',
        text: 'La nota oficial insiste en que el tiempo parece ir más despacio adentro, porque hubo pocas restauraciones. Quedan azulejos y cuadros de figuras porteñas: Alberto Castillo, Carlos Gardel, Pedro Maffia. Se puede comer parado en el mostrador, como en cualquier pizzería de ley. Esos cuadros explican por qué la guía de [cultura](/notas/cultura-folklore-y-bares-de-mataderos) habla de tango en Mataderos con cuidado: Gardel está en la pared de una pizzería, no en una milonga anunciada por el gobierno del barrio.'
      },
      {
        kind: 'p',
        text: 'No publicamos acá un menú ni un horario de cocina. Cambian, y una guía que los congela miente al mes. La dirección no cambió. Quien vaya, que mire la carta en la puerta. Quien quiera el domingo de folklore, que no confunda esta esquina con el escenario de la [feria](/notas/feria-de-mataderos): están en corredores distintos, y la nota de [Alberdi y Emilio Castro](/notas/avenida-alberdi-y-emilio-castro) los separa.'
      },
      {
        kind: 'h2',
        text: 'Por qué importa más que una reseña'
      },
      {
        kind: 'p',
        text: 'El Cedrón documenta una forma de vida de avenida que la feria, sola, no muestra. El tranvía, el estaño, el apellido del dueño y la pizza de los sesenta son capas de un local que siguió abierto. En un barrio al que se entra por el folklore del domingo, esta esquina recuerda el lunes. Los [otros bares](/notas/bares-y-esquinas-de-mataderos) no tienen, en las fuentes que usamos, una ficha igual de precisa. Por eso esta nota no los arrastra como comparsa. Una esquina bien contada ordena el mapa; siete nombres sueltos lo ensucian.'
      },
      {
        kind: 'h2',
        text: 'Cómo llegar y qué pedir sin una carta congelada'
      },
      {
        kind: 'p',
        text: 'Alberdi 6100 se alcanza caminando desde el casco si el día da, o en un colectivo corto si el domingo ya fue largo. No está detrás de la torre. Está en el corredor comercial, esquina Murguiondo, que es otra parada del mapa de [Alberdi](/notas/avenida-alberdi-y-emilio-castro). Se entra, se mira el mostrador y se pide lo que la pizarra diga ese día. La pizza es la fama que la Ciudad fecha en los sesenta; el local es más viejo. Forzar un plato “de 1935” que nadie publicó es el mismo error que inventar un horario.'
      },
      {
        kind: 'p',
        text: 'Si vas en grupo, el mostrador resuelve mejor que una mesa larga a la hora pico de la avenida. Si vas después de la feria, calculá que el domingo de casco y la cena en Alberdi son dos energías distintas: una es de pie, la otra es de esquina. Las dos caben en el día. Ninguna reemplaza a la otra, y por eso esta nota no manda a nadie a buscar fainá en el escenario de la [feria](/notas/feria-de-mataderos).'
      }
    ]
  },
  {
    slug: 'folklore-y-baile-en-mataderos',
    type: 'satelite',
    pillarSlug: 'cultura-folklore-y-bares-de-mataderos',
    title: 'Folklore y baile en Mataderos: qué se ve el domingo',
    description:
      'Qué folklore y qué baile hay en la Feria de Mataderos: escenario del domingo, malambo, parejas y la diferencia con una milonga de tango.',
    dek: 'El escenario del casco programa música y danza folklórica todas las semanas de feria. Se mira de pie, entre los puestos, sin entrada.',
    category: 'Folklore',
    publishedAt: '2026-09-17',
    image: 'baile',
    datos: {
      title: 'El escenario',
      rows: [
        { label: 'Dónde', value: 'Feria de Mataderos, frente al casco' },
        { label: 'Cuándo', value: 'Domingos de feria, dentro del horario publicado' },
        { label: 'Qué anuncia la Ciudad', value: 'Música y danza folklórica, artistas locales y regionales' },
        { label: 'Entrada', value: 'Libre, la de la feria' },
        { label: 'Si llueve', value: 'Se suspende con la feria' }
      ]
    },
    fuentes: [
      {
        title: 'Feria de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/feriademataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Feria de Mataderos',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos',
        publisher: 'Turismo Buenos Aires'
      },
      {
        title: 'Decreto de creación de la feria',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/53784',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      },
      {
        title: 'Baile en la Feria de Mataderos',
        url: 'https://commons.wikimedia.org/wiki/File:Baile_Feria_Mataderos.jpg',
        publisher: 'Wikimedia Commons, fotografía de Roberto Fiadone'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El baile que se ve en Mataderos un domingo no es una milonga ni una clase. Es el escenario de la Feria de las Artesanías y Tradiciones Populares, armado frente a la antigua administración. La Ciudad lo describe sin vueltas: espectáculos de música y danza folklórica, con artistas locales y de las regiones. La foto de esta nota, tomada por Roberto Fiadone en noviembre de 2007 desde el norte del cruce, muestra una pareja en ese espacio. Sigue siendo la imagen correcta del lugar.'
      },
      {
        kind: 'h2',
        text: 'Qué entra en el programa'
      },
      {
        kind: 'p',
        text: 'Entran las formas que el folklore argentino ya reconoce: chacarera, zamba, chamamé, malambo, cueca, según el conjunto que toque ese día. No hay una grilla eterna con el mismo género a la misma hora. Hay un escenario que la feria sostiene desde 1986, cuando el decreto la creó para divulgar tradiciones y no para programar una sala estable de tango. El malambo se mira como destreza de zapateo y de boleadoras. La pareja se mira como baile social llevado al escenario. Las dos cosas conviven con los puestos y con la [sortija](/notas/corrida-de-sortija-en-mataderos), que es la otra destreza del domingo, a caballo.'
      },
      {
        kind: 'p',
        text: 'También hay música fuera del micrófono principal. Guitarras y bombos aparecen en el paseo, y a veces una rueda se arma sin que el escenario la anuncie. No es un segundo festival secreto. Es el desborde lógico de una feria que juntó a esa gente. La guía de la [feria](/notas/feria-de-mataderos) cuenta el conjunto; esta nota se queda en el baile.'
      },
      {
        kind: 'h2',
        text: 'Cómo mirarlo'
      },
      {
        kind: 'p',
        text: 'De pie, desde el claro que deja el público, sin subirse a un puesto para ver mejor. La entrada es la de la feria: no se cobra. El horario es el de la feria, con la salvedad de las 18 o las 19 según la ficha oficial. Los conjuntos no empiezan a las once en punto: la primera hora del domingo es de apertura. Quien viaja solo por el baile puede llegar un poco más tarde y preguntar en el escenario qué sigue. Quien viaja por todo el día tiene el [itinerario](/notas/domingo-en-mataderos).'
      },
      {
        kind: 'p',
        text: 'No hace falta vestirse de gaucho para mirar, ni hace falta no hacerlo si se viene de bailar. El público es mixto: familias del barrio, gente de otras provincias que tiene puesto, y visitantes que vieron una foto. El respeto práctico es el de cualquier escenario chico: no cruzar por delante en medio de un malambo y no tratar a los bailarines como extras de una producción.'
      },
      {
        kind: 'h2',
        text: 'Lo que este baile no es'
      },
      {
        kind: 'p',
        text: 'No es la milonga de tango que otros barrios publican con día y profesor. El tango en Mataderos tiene otra documentación: los nombres que pasaron por [El Plata](/notas/cine-teatro-el-plata) y los cuadros de [El Cedrón](/notas/el-cedron-de-mataderos). La guía de [cultura](/notas/cultura-folklore-y-bares-de-mataderos) separa las dos tradiciones a propósito. Buscar un bandoneón en el escenario de la feria es llegar al lugar equivocado por una buena razón. El lugar correcto, ese domingo, es este: guitarra, bombo y una pareja sobre el adoquín del casco.'
      },
      {
        kind: 'p',
        text: 'Si querés reconocer lo que estás viendo sin un glosario, alcanza con tres pistas. El malambo es un solo, con zapateo y a veces boleadoras, y el público se calla más que en el resto de la tarde. La chacarera y la zamba arman pareja y pañuelo. El chamamé se escucha antes de verse, por el acordeón. No siempre están los tres el mismo domingo. Cuando falta uno, no es que la feria “decaiga”: es que el conjunto de ese día trajo otra provincia. Quedate a la siguiente tanda antes de concluir que ya viste el folklore de Mataderos.'
      },
      {
        kind: 'p',
        text: 'Y si el baile te importa más que los puestos, no llegues con las manos ocupadas. La sortija puede cortar el paseo justo cuando sale el conjunto. El [itinerario del domingo](/notas/domingo-en-mataderos) deja ese rato libre a propósito. Esta nota solo agrega el modo de mirar: de frente, sin apuro, y con la torre de fondo, que es el escenario que ninguna sala cerrada les va a prestar.'
      }
    ]
  },
  {
    slug: 'bares-y-esquinas-de-mataderos',
    type: 'satelite',
    pillarSlug: 'cultura-folklore-y-bares-de-mataderos',
    title: 'Bares y esquinas de Mataderos: qué está documentado',
    description:
      'Bares y esquinas de Mataderos con fuente: El Cedrón en Alberdi y Murguiondo, la cultura de mostrador y qué no inventar de una lista de bares notables.',
    dek: 'Hay una esquina con historia escrita por la Ciudad. Hay un casco que fue pulpería de oficio. No hay, en esta guía, un ranking de diez bares.',
    category: 'Bares',
    publishedAt: '2026-10-22',
    image: 'frente',
    datos: {
      title: 'Esquinas con fuente',
      rows: [
        { label: 'El Cedrón', value: 'Alberdi 6100 y Murguiondo, interés cultural' },
        { label: 'Casco', value: 'La Recova y la plazoleta, no un bar pero sí el centro de la vida dominical' },
        { label: 'El Plata', value: 'Alberdi 5765, sala, no bar' },
        { label: 'Listas largas', value: 'No se publican sin ficha propia' }
      ]
    },
    fuentes: [
      {
        title: 'El Cedrón, la pizza y la impronta de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-el-cedron-la-pizza-y-la-impronta-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Feria de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/feriademataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/laciudad/barrios/mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Historias de mi Comuna: Monumento El Resero',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-monumento-el-resero',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'La búsqueda “bares notables Mataderos” promete una lista. Esta nota no la inventa. El programa de Bares Notables de la ciudad tiene su propio padrón, y meter en una guía nombres de memoria —con dirección aproximada y una especialidad creativa— es la forma más rápida de mandar a alguien a una cortina baja. Lo que sí hay, con ficha del gobierno porteño, es El Cedrón. Lo que también hay es una cultura de esquina y de pulpería ligada al mercado, más vieja que cualquier ranking.'
      },
      {
        kind: 'h2',
        text: 'La esquina que se puede citar'
      },
      {
        kind: 'p',
        text: '[El Cedrón](/notas/el-cedron-de-mataderos) está en Alberdi 6100, esquina Murguiondo. Fue el bodegón Primera Curva, por el tranvía. En 1935 Manuel Cedrón le puso su apellido. En los sesenta se volvió famoso por la pizza. La Legislatura lo declaró de interés cultural. Sigue teniendo azulejos, mostrador y cuadros de Gardel, Maffia y Castillo. Con eso ya se puede ir. El horario y el precio de una muzza se miran ahí, no en un artículo.'
      },
      {
        kind: 'p',
        text: 'Alberdi tiene muchos otros locales de comida, viejos y nuevos. El portal de comercios del barrio existe precisamente para las fichas que cambian: horarios, rubro, si atienden el domingo. Una nota de historia no los reemplaza. Si buscás dónde almorzar un martes, la guía de locales es más honesta que esta página. Si buscás qué esquina tiene papeles, es esta.'
      },
      {
        kind: 'h2',
        text: 'Esquinas que no son bares y funcionan como tales'
      },
      {
        kind: 'p',
        text: 'El domingo, la esquina más llena no tiene dueño: es el cruce de Lisandro de la Torre y la avenida de los Corrales. La feria hace de bar, de club y de teatro al aire libre. Se come en el puesto, se mira el baile y se conversa en la plazoleta. No reemplaza a El Cedrón. Ocupa el lugar social que en otros barrios ocupa una vereda de bares, durante ocho horas y una vez por semana. La [guía de la feria](/notas/feria-de-mataderos) es, en ese sentido, también una guía de vida nocturna que ocurre de tarde.'
      },
      {
        kind: 'p',
        text: 'Hay además un bar perdido en la historia del monumento. Fernando Ghío, el concejal que gestionó el traslado de El Resero en 1934, tenía un bar frente al lugar donde se inauguró la estatua. La Ciudad lo menciona al contar el monumento. El local no está descripto como una casa que siga abierta con ese nombre, y esta nota no le inventa continuidad. Sirve para otra cosa: en 1934 la plazoleta ya tenía enfrente un mostrador de vecino. El casco no fue nunca solo un monumento. Fue una esquina con gente.'
      },
      {
        kind: 'h2',
        text: 'Cómo leer una esquina sin ficha'
      },
      {
        kind: 'p',
        text: 'Un bodegón de Mataderos se reconoce por signos viejos, no por una medalla que nosotros le colguemos: mostrador largo, azulejo, un nombre que cita una curva, un oficio o un apellido, y una clientela que no está de turismo. Eso no alcanza para publicarlo como notable. Alcanza para mirarlo con respeto y no pedir que se convierta en escenario. La cultura de [folklore](/notas/folklore-y-baile-en-mataderos) tiene día y dirección. La cultura de mostrador tiene dirección cuando hay fuente, y silencio editorial cuando no la hay.'
      },
      {
        kind: 'p',
        text: 'La guía que junta estas decisiones es la de [cultura, folklore y bares](/notas/cultura-folklore-y-bares-de-mataderos). Quien quiera caminar los corredores sin quedarse solo en la pizza, sigue por [Alberdi y Emilio Castro](/notas/avenida-alberdi-y-emilio-castro). Quien quiera el domingo, deja el bar para la vuelta y entra al casco.'
      },
      {
        kind: 'p',
        text: 'Hay una forma práctica de usar esta página. Si alguien te pasa un nombre de bar en Mataderos, buscá si tiene ficha en el padrón de la Ciudad o en una nota con dirección y año. Si no aparece, andá igual si te lo recomendó un vecino, pero no lo cites como notable en voz alta. El Cedrón pasa esa prueba. El bar de Ghío frente al Resero pasa la prueba histórica y no la prueba de “sigue abierto”, porque nadie lo documenta como local vigente. La feria pasa otra prueba: no es un bar y durante ocho horas funciona como la vereda más concurrida del barrio.'
      },
      {
        kind: 'p',
        text: 'Esa economía de nombres es la cultura de mostrador que esta guía puede sostener. El resto se toma en el local, se paga en el local y no se convierte en párrafo. Cuando haya una segunda esquina con el mismo nivel de fuente que El Cedrón, tendrá su nota. Hasta entonces, el mapa de bares de Mataderos publicado acá tiene una estrella y varias advertencias, que es más útil que una constelación dibujada.'
      }
    ]
  }
];
