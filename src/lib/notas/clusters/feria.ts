import type { Nota } from '../types';

export const FERIA: Nota[] = [
  {
    slug: 'feria-de-mataderos',
    type: 'pilar',
    title: 'Feria de Mataderos: horarios, cómo llegar, qué comer y qué ver',
    description:
      'Guía de la Feria de Mataderos: horarios del domingo, dirección en Lisandro de la Torre y Av. de los Corrales, cómo llegar, gastronomía, artesanías y folklore.',
    dek: 'Todos los domingos el casco histórico se llena de puestos, escenario y gente. El horario oficial no es uno solo: hay que leer las dos páginas de la Ciudad y mirar el cielo.',
    category: 'Feria',
    publishedAt: '2026-03-18',
    image: 'baile',
    datos: {
      title: 'Para ir el domingo',
      rows: [
        { label: 'Nombre completo', value: 'Feria de las Artesanías y Tradiciones Populares Argentinas' },
        { label: 'Dónde', value: 'Av. Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Cuándo', value: 'Domingos y feriados patrios' },
        { label: 'Horario publicado por la Ciudad', value: '11 a 18 h en la ficha de la feria; 11 a 19 h en la guía de turismo, de marzo a diciembre' },
        { label: 'Lluvia', value: 'Se suspende' },
        { label: 'Entrada', value: 'Libre' },
        { label: 'Creación', value: '1986. Decreto 3186, del 25 de junio, publicado el 11 de agosto' }
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
        title: 'Decreto de creación de la Feria de las Tradiciones Populares Argentinas',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/53784',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      },
      {
        title: 'Mataderos festeja los 40 años de su tradicional feria',
        url: 'https://www.lanacion.com.ar/sociedad/mataderos-festeja-los-40-anos-de-su-tradicional-feria-nid12062026/',
        publisher: 'La Nación'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'La Feria de Mataderos es el motivo por el que mucha gente cruza la ciudad un domingo. El nombre oficial es más largo que el de la conversación: Feria de las Artesanías y Tradiciones Populares Argentinas. Funciona en el casco, sobre la avenida Lisandro de la Torre y la avenida de los Corrales, con la antigua administración y la plazoleta de El Resero como fondo. No es un mercado de pulgas ni una feria americana. Es un programa cultural que desde 1986 junta artesanos, cocinas regionales, música y danza en el lugar donde la ciudad faenaba hacienda.'
      },
      {
        kind: 'p',
        text: 'Esta guía ordena lo que hace falta para ir y lo que conviene saber para no quedarse en la foto del baile. Los horarios tienen nota propia porque las páginas oficiales no dicen exactamente lo mismo: [feria de Mataderos, horarios y cómo llegar](/notas/feria-de-mataderos-horarios). La comida está en [qué comer en la feria](/notas/que-comer-en-la-feria-de-mataderos). La prueba ecuestre del domingo es la [corrida de sortija](/notas/corrida-de-sortija-en-mataderos). Los puestos de plata, cuero y tejido están en [artesanías](/notas/artesanias-de-la-feria-de-mataderos). El edificio que enmarca todo eso se explica en [La Recova](/notas/la-recova-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Qué es y qué no es'
      },
      {
        kind: 'p',
        text: 'La ficha de la Ciudad la define como un clásico de la cultura popular: música y danzas folklóricas, artesanías, productos regionales y gastronomía de todo el país. Se creó en 1986 para promover y difundir tradiciones. El paseo de artesanías, el patio de comida y el escenario principal son las tres patas que cualquier domingo confirma. Turismo Buenos Aires agrega que fue declarada Patrimonio Cultural de la Ciudad por la Legislatura y que el punto de reunión son artistas que trabajan con oficios de sus provincias.'
      },
      {
        kind: 'p',
        text: 'No reemplaza al Mercado Nacional de Hacienda, que era otra institución y otro calendario. Durante años compartieron barrio y, en la memoria, se pisan. El mercado remataba hacienda entre semana durante casi todo el siglo XX. La feria ocupa el domingo y el espacio público de la recova. Quien quiera la historia del predio la tiene en el [Mercado Nacional de Hacienda](/notas/mercado-nacional-de-hacienda). Quien quiera pasar el día, sigue en esta página.'
      },
      {
        kind: 'h2',
        text: 'Cómo nació: el 8 de junio y el decreto del 25'
      },
      {
        kind: 'p',
        text: 'Hay dos documentos y no dicen la misma hora de nacimiento. La Nación, al cubrir los cuarenta años, fecha el inicio el 8 de junio de 1986 y habla de una tradición que se repite todos los domingos. El Boletín Oficial conserva el decreto del intendente que la crea: visto que la Secretaría de Cultura, dentro del Plan Cultural en Barrios, había previsto una feria de tradiciones en Mataderos, se dispone la Feria de las Tradiciones Populares Argentinas. La sanción es del 25 de junio de 1986 y la publicación, del 11 de agosto. El número que arrastra la norma posterior es el Decreto 3186/86.'
      },
      {
        kind: 'p',
        text: 'El texto original importa porque fija intención y reglas que después cambiaron. La feria debía instalarse en la Recova de Mataderos y alrededores, los domingos, de 9 a 22. La Dirección General de Turismo coordinaba los puestos. El objetivo era divulgar expresiones y costumbres de las regiones del país desde un ámbito estable. El horario de las nueve de la mañana a las diez de la noche no es el de ahora. Quedó en el decreto de creación y fue reemplazado por la franja del mediodía que publican las guías actuales. Contarlo evita el error de llegar a las nueve “porque así empezó”.'
      },
      {
        kind: 'h2',
        text: 'Horarios: leer las dos fichas'
      },
      {
        kind: 'p',
        text: 'La página de la Feria en buenosaires.gob.ar dice: domingos y feriados patrios, de 11 a 18, en Lisandro de la Torre y avenida de los Corrales. La guía de turismo de la Ciudad dice otra cosa, también oficial: de marzo a diciembre, domingo de 11 a 19, y se suspende por lluvia. El portal Mataderos.ar no va a elegir una de las dos y tachar la otra. Las dos están publicadas por el mismo gobierno. La diferencia es de una hora en el cierre y de un matiz en el calendario: feriados patrios en una ficha, temporada de marzo a diciembre en la otra.'
      },
      {
        kind: 'p',
        text: 'La conducta práctica es simple. Llegá después de las once, no armes el regreso justo a las seis, y si llueve no viajes hasta confirmar. El correo que publica turismo es feriademataderos_mc@buenosaires.gob.ar. El detalle de colectivos, corte de calles y qué llevar está en la nota de [horarios](/notas/feria-de-mataderos-horarios). Durante la jornada el casco se recorre a pie: entre el mediodía y la tarde el cruce de La Recova no es un lugar para buscar estacionamiento.'
      },
      {
        kind: 'h2',
        text: 'Qué se ve, en tres recorridos'
      },
      {
        kind: 'p',
        text: 'El primer recorrido es el de los puestos. Plata, cuero, tejido, madera, instrumentos y objetos de uso criollo ocupan Lisandro de la Torre. No todo lo que brilla es pieza de taller: conviene preguntar material y procedencia, y la nota de artesanías baja a eso. El segundo recorrido es la comida. Empanadas, locro, asado, humita, pastelitos y dulce de las economías regionales se venden en el patio y en puestos sueltos. No hay un menú único ni un precio de lista de la Ciudad: se come de pie o en mesa según el puesto, y se paga ahí. El tercer recorrido es el escenario, frente al conjunto de la administración, con conjuntos de folklore, malambo y parejas de baile. La foto que abre esta nota es de ese baile, tomada por Roberto Fiadone en noviembre de 2007.'
      },
      {
        kind: 'p',
        text: 'La sortija se corre sobre la avenida, con jinetes y una argolla. Es una prueba tradicional, no un show de cinco minutos escondido en un rincón. Si ese es el motivo del viaje, la nota específica dice cómo se mira y qué se está viendo. El [folklore y el baile](/notas/folklore-y-baile-en-mataderos) amplían la música, que no se agota en el escenario principal: hay guitarra y bombo en más de un puesto.'
      },
      {
        kind: 'h2',
        text: 'Cómo combinarla con el barrio'
      },
      {
        kind: 'p',
        text: 'El domingo da para feria, museo y monumento sin cambiar de cuadra. El Museo Criollo de los Corrales está en la propia recova, en la avenida de los Corrales 6476, y turismo recomienda visitarlo ese día precisamente para sumarlo al paseo. El Resero está en la plazoleta que la feria rodea. Hacer las tres cosas es el itinerario corto. Hacer además El Plata, Alberdi o la cancha de Nueva Chicago ya es otro día o una tarde larga: está ordenado en [qué hacer en Mataderos](/notas/que-hacer-en-mataderos) y en el [domingo paso a paso](/notas/domingo-en-mataderos).'
      },
      {
        kind: 'p',
        text: 'La feria no es el único modo de conocer el barrio, y el barrio no se apaga el lunes. Alberdi sigue siendo el centro comercial, Emilio Castro tiene su propia vida de vereda y el casco, entre semana, deja ver la arquitectura sin la multitud. Pero si la pregunta es “qué es Mataderos para alguien que viene una vez”, la respuesta sigue siendo este domingo: entrada libre, oficios a la vista y un edificio de 1900 usado como fondo, no como maqueta.'
      },
      {
        kind: 'h2',
        text: 'Qué llevar y qué dejar en casa'
      },
      {
        kind: 'p',
        text: 'Efectivo, además de la aplicación del teléfono. Calzado cerrado: hay adoquín, hay cable de puesto y hay momentos en que la sortija pide que te corras rápido. Agua en verano. Una bolsa plegable si pensás comprar tejido o cerámica, porque la vuelta es en colectivo y el puesto no es una casa de envíos. Dejá el auto lejos o no lo traigas. Dejá también la expectativa de un horario al minuto: el escenario no publica una grilla estable en las fichas oficiales, y la sortija se corre cuando los jinetes están, dentro de la franja del domingo.'
      },
      {
        kind: 'p',
        text: 'Si venís con alguien que quiere “ver todo”, partí el día en lugar de apurarlo. Una hora para el edificio y el museo, una para los puestos, una para comer y mirar el baile. El que se saltea el edificio se lleva un paseo que podría estar en otra plaza. El que se saltea el baile se lleva una feria de objetos. Las dos mitades juntas son la feria que el decreto de 1986 describió: tradiciones, no solo mercancía. La nota del domingo escribe ese orden con más detalle. Esta guía se queda en el mapa general.'
      },
      {
        kind: 'h2',
        text: 'Preguntas que se repiten'
      },
      {
        kind: 'p',
        text: '¿Es gratis? Sí. La entrada no se cobra. Se paga lo que se come y lo que se compra. ¿Está techada? No. La lluvia la suspende. ¿Hay que reservar? No hay reserva de puesto ni de escenario. ¿Se puede ir con perro? El casco es calle pública y el domingo está lleno de gente, de caballos y de comida en el piso: si el animal no está acostumbrado a eso, es mejor otro día y otra esquina. ¿El mercado de hacienda sigue rematando ahí el domingo? No confundas los calendarios. La feria es el programa cultural. El mercado fue el organismo ganadero cuya historia cierra, como entidad nacional, en los decretos de 1991 y 1992. El edificio es el que queda a la vista.'
      },
      {
        kind: 'p',
        text: '¿Hace falta saber de folklore para ir? No. Hace falta no cruzar la cinta de la sortija y no tratar el malambo como un rato de espera. Con eso, y con las fichas oficiales abiertas por si el horario de este mes dice 18 o 19, el domingo se entiende solo. El resto de las notas de esta guía están para cuando una de esas preguntas se vuelve la razón del viaje: la hora, el plato, la argolla o el puesto.'
      }
    ]
  },
  {
    slug: 'feria-de-mataderos-horarios',
    type: 'satelite',
    pillarSlug: 'feria-de-mataderos',
    title: 'Feria de Mataderos: horarios, dirección y cómo llegar',
    description:
      'Horarios de la Feria de Mataderos, dirección exacta, qué dicen las dos fichas oficiales de la Ciudad y cómo llegar un domingo sin auto.',
    dek: 'La dirección no cambia. La hora de cierre, según la página que leas, sí. Y si llueve, no hay feria.',
    category: 'Feria',
    publishedAt: '2026-05-07',
    image: 'corrales',
    datos: {
      title: 'Horario y llegada',
      rows: [
        { label: 'Dirección', value: 'Av. Lisandro de la Torre y Av. de los Corrales, Mataderos' },
        { label: 'Ficha de la feria', value: 'Domingos y feriados patrios, 11 a 18 h' },
        { label: 'Guía de turismo', value: 'Marzo a diciembre, domingos de 11 a 19 h' },
        { label: 'Lluvia', value: 'Se suspende' },
        { label: 'Contacto publicado', value: 'feriademataderos_mc@buenosaires.gob.ar' },
        { label: 'Horario original de 1986', value: 'Domingos de 9 a 22 h, ya no vigente' }
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
        title: 'Decreto de creación',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/53784',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: '“Feria de Mataderos horarios” es la búsqueda de quien ya decidió ir y no quiere errarle al domingo. La respuesta honesta ocupa un párrafo, no una sola hora. La ficha oficial de la feria publica domingos y feriados patrios de 11 a 18. La guía de turismo de la misma Ciudad publica, de marzo a diciembre, domingos de 11 a 19, y avisa que se suspende por lluvia. Las dos son fuentes de gobierno. Esta nota no esconde la diferencia.'
      },
      {
        kind: 'h2',
        text: 'Qué horario usar para salir de casa'
      },
      {
        kind: 'p',
        text: 'Salí para estar después de las once. Si tu colectivo llega a las once y cuarto, vas a encontrar puestos abriendo o ya abiertos, no un predio cerrado. Para la vuelta, no cuentes con que a las seis está todo guardado ni con que a las siete sigue el escenario: según la ficha que se esté aplicando ese día, el cierre puede ser las 18 o las 19. Una hora de margen evita perder el baile o quedarte sin colectivo con la feria ya desarmada.'
      },
      {
        kind: 'p',
        text: 'La lluvia no es un detalle. Turismo lo escribe en la ficha: se suspende. No es un techado. Si el pronóstico es de agua toda la mañana, el viaje desde el centro o desde el conurbano puede ser en vano. El correo publicado para la feria es feriademataderos_mc@buenosaires.gob.ar. La guía general, con qué ver además del reloj, está en [Feria de Mataderos](/notas/feria-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'La dirección, sin ambigüedad'
      },
      {
        kind: 'p',
        text: 'El punto es la intersección de la avenida Lisandro de la Torre y la avenida de los Corrales. Ahí están la antigua administración, la plazoleta de El Resero y el escenario. No es un predio cerrado con molinete: la feria ocupa calle y vereda. Por eso el auto es una mala idea entre el mediodía y la tarde. El entorno queda tomado por el público y se camina desde Alberdi o se baja del transporte público unas cuadras antes.'
      },
      {
        kind: 'p',
        text: 'El decreto de 1986 ya la situaba “en la Recova de Mataderos y lugares aledaños”. Una norma posterior, citada en el mismo expediente del Boletín, localiza la feria sobre el frente de Lisandro de la Torre. Quien busque “La Recova” y quien busque “la feria” tiene que llegar al mismo cruce. El edificio se explica en [La Recova de Mataderos](/notas/la-recova-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Cómo llegar y cómo moverse ahí'
      },
      {
        kind: 'p',
        text: 'Mataderos está en el sudoeste de la ciudad, en la Comuna 9. No hay un subte en la puerta de la feria. El viaje habitual es colectivo hasta Alberdi, Directorio, Eva Perón o Lisandro de la Torre, y una caminata final. El itinerario a pie, con el orden de las paradas, está en [un domingo en Mataderos](/notas/domingo-en-mataderos). Si venís con cochecito, con chicos chicos o con un perro, entrá por una bocacalle y no por el medio del cruce a la hora pico: entre las doce y las seis el flujo es el de una peatonal improvisada.'
      },
      {
        kind: 'p',
        text: 'El horario de 9 a 22 que figura en el artículo 2 del decreto de creación no rige. Sirve para entender que la feria se pensó como jornada entera y que el uso la recortó al mediodía y la tarde, que es cuando el público realmente la sostiene. Llegar a la mañana temprano “por las dudas” es la forma más segura de encontrar el casco vacío y los locales de Alberdi todavía en otra cosa.'
      },
      {
        kind: 'h2',
        text: 'Feriados y temporada'
      },
      {
        kind: 'p',
        text: 'La ficha de la feria suma feriados patrios, no cualquier feriado de calendario. La guía de turismo acota la temporada de marzo a diciembre. Enero y un feriado puente pueden no coincidir con lo que imaginás. Antes de un viaje largo en enero, o un 17 de agosto que cae lunes, mirá la ficha vigente o escribí al correo. Esta página puede envejecer en una hora: las páginas de la Ciudad son la fuente que hay que releer, y por eso están linkeadas arriba y no resumidas como si fueran eternas.'
      }
    ]
  },
  {
    slug: 'que-comer-en-la-feria-de-mataderos',
    type: 'satelite',
    pillarSlug: 'feria-de-mataderos',
    title: 'Qué comer en la Feria de Mataderos',
    description:
      'Qué se come en la Feria de Mataderos: comidas regionales, patio gastronómico, cómo pagar y qué no da por sentado un menú único.',
    dek: 'Se come lo que las provincias mandan a los puestos: asado, empanadas, humita, locro, dulce y pastelitos. No hay una carta oficial ni un precio de lista.',
    category: 'Gastronomía',
    publishedAt: '2026-06-11',
    image: 'feriaMazza',
    datos: {
      title: 'Para comer en la feria',
      rows: [
        { label: 'Dónde', value: 'Patio gastronómico y puestos sobre Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Qué publica la Ciudad', value: 'Platos tradicionales de distintas regiones' },
        { label: 'Cuándo', value: 'Durante el horario de la feria, domingo' },
        { label: 'Menú único', value: 'No existe: cada puesto ofrece lo suyo' },
        { label: 'Lluvia', value: 'Si se suspende la feria, no hay puestos' }
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
        title: 'Decreto de creación',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/53784',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'La comida de la Feria de Mataderos no es un restaurante con sucursal. Es un conjunto de puestos que la Ciudad llama patio gastronómico: productores y cocineros de distintas regiones ofrecen platos tradicionales mientras el escenario sigue con el folklore. No hay una carta colgada por el gobierno ni un precio que esta guía pueda fijar sin inventarlo. Lo que sí se puede decir es qué tipo de comida corresponde a esa feria y cómo comerla sin tratarla como un food court de shopping.'
      },
      {
        kind: 'h2',
        text: 'Qué se encuentra un domingo normal'
      },
      {
        kind: 'p',
        text: 'El decreto de 1986 ya hablaba de una feria de expresiones y costumbres de las regiones del país, no de un corredor de franquicias. En la práctica del paseo eso se traduce en la cocina que el público reconoce como criolla y regional: empanadas de horno y fritas, locro cuando la temporada lo pide, humita, tamales, asado y achuras, pastelitos, dulce de batata y de membrillo, quesos y fiambres de provincia, mate y las infusiones que cada puesto trae. Algunos fines de semana suman platos del norte, de Cuyo o del litoral según quién haya conseguido el puesto esa temporada. La oferta rota. Por eso una reseña que enumera “los diez imperdibles” envejece en un mes.'
      },
      {
        kind: 'p',
        text: 'La ficha oficial lo dice en una frase que alcanza: el patio gastronómico invita a degustar platos tradicionales de diversas regiones. Turismo Buenos Aires mete la gastronomía en el mismo paquete que las artesanías y el espectáculo. Si el puesto que te recomendaron el año pasado no está, el de al lado suele resolver la misma hambre con otra provincia. La guía general de la feria está en [Feria de Mataderos](/notas/feria-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Cómo se come, se paga y se camina'
      },
      {
        kind: 'p',
        text: 'Se pide en el mostrador del puesto, se paga ahí y se come de pie, en un banco o en la mesa que ese puesto tenga armada. No hay mozo de la feria ni una caja central. Llevá efectivo además de la billetera del teléfono: la señal y el posnet dependen de cada puestero, y un domingo lleno no es el momento de descubrir que solo aceptan transferencia. No dejes la comida encima de un tejido que otro está vendiendo. El pasillo es estrecho cuando pasa la sortija o cuando sale una tanda del escenario.'
      },
      {
        kind: 'p',
        text: 'El horario es el de la feria, con la salvedad ya dicha: 11 a 18 en una ficha y 11 a 19 en la otra. Los puestos de comida no madrugan respecto del resto. Llegar a las once y media permite comer antes de que el escenario junte la multitud de la media tarde. Si llueve y la feria se suspende, no hay patio alternativo cubierto que la Ciudad anuncie como reemplazo.'
      },
      {
        kind: 'h2',
        text: 'Qué no es la gastronomía de la feria'
      },
      {
        kind: 'p',
        text: 'No es la pizza de [El Cedrón](/notas/el-cedron-de-mataderos), que está sobre Alberdi al 6100 y tiene su propia historia de bodegón. No es tampoco el café de especialidad de Emilio Castro, que pertenece a otro corredor del barrio y se recorre entre semana. Mezclar las tres cosas en un solo “dónde comer en Mataderos” le hace un flaco favor a quien viaja el domingo solo por la feria: va a caminar veinte cuadras por un cortado que no necesitaba, o va a juzgar al barrio por un puesto de choripán.'
      },
      {
        kind: 'p',
        text: 'Tampoco es un museo del gusto de 1900. Los puesteros cocinan para el público de hoy, con recetas regionales que el programa de 1986 quiso poner en la vereda. El pasado ganadero del barrio está en el [Mercado de Hacienda](/notas/mercado-nacional-de-hacienda) y en el edificio, no en el punto de cocción de una entraña. Se puede comer muy bien y seguir sin saber nada de la faena. Esta nota prefiere que sepas las dos cosas: el plato es de ahora; el suelo, de los corrales.'
      },
      {
        kind: 'p',
        text: 'Si el plan es sentarse a un almuerzo largo y después ver el baile, calculá la fila del mediodía y no el tiempo de un restaurante con reserva. El [folklore](/notas/folklore-y-baile-en-mataderos) no espera a que termines el postre. Mucha gente come en un hueco entre dos conjuntos, de pie, y sigue. Ese es el modo para el que la feria está armada.'
      }
    ]
  },
  {
    slug: 'corrida-de-sortija-en-mataderos',
    type: 'satelite',
    pillarSlug: 'feria-de-mataderos',
    title: 'Corrida de sortija en la Feria de Mataderos',
    description:
      'Qué es la corrida de sortija en la Feria de Mataderos, dónde se corre sobre Lisandro de la Torre y cómo mirarla un domingo.',
    dek: 'Un jinete a galope intenta ensartar una argolla chica. En Mataderos se hace sobre la avenida, en medio de la feria, no en un club privado.',
    category: 'Tradición',
    publishedAt: '2026-08-20',
    image: 'sortija',
    datos: {
      title: 'Para ver la sortija',
      rows: [
        { label: 'Dónde', value: 'Sobre Av. Lisandro de la Torre, en el predio de la feria' },
        { label: 'Cuándo', value: 'Domingo de feria, en el horario del paseo' },
        { label: 'Qué es', value: 'Prueba criolla: ensartar una sortija a caballo' },
        { label: 'Entrada', value: 'La de la feria, libre' }
      ]
    },
    fuentes: [
      {
        title: 'Feria de Mataderos',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos',
        publisher: 'Turismo Buenos Aires'
      },
      {
        title: 'Feria de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/feriademataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Detalle de la corrida de sortija',
        url: 'https://commons.wikimedia.org/wiki/File:Detalle_Corrida_de_sortija.jpg',
        publisher: 'Wikimedia Commons, fotografía de Roberto Fiadone'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'La corrida de sortija es la prueba que más desconcierta a quien llega a la Feria de Mataderos por la música y se encuentra, de golpe, con caballos a galope en medio de la avenida. No es un accidente ni un desfile. Es una destreza criolla: el jinete corre hacia una argolla pequeña, colgada a la altura de la mano, e intenta ensartarla con un adminículo fino, en general un palillo o una varilla. Acertar es el punto. La foto de esta nota, de Roberto Fiadone, muestra la sortija armada sobre Lisandro de la Torre al 2500, en noviembre de 2007.'
      },
      {
        kind: 'h2',
        text: 'Qué estás viendo'
      },
      {
        kind: 'p',
        text: 'El caballo va rápido y el blanco es chico. Por eso la prueba se mira de costado y con distancia, no desde el medio de la cinta. Turismo Buenos Aires la nombra entre las propuestas del domingo, junto con las artesanías y el folklore. La Ciudad, en la ficha de la feria, habla de espectáculos de música y danza en el escenario y de un paseo que sostiene las tradiciones: la sortija es la parte ecuestre de ese programa, heredera del oficio a caballo que la [historia del barrio](/notas/historia-de-mataderos) explica por la faena, no por el turismo.'
      },
      {
        kind: 'p',
        text: 'No hace falta saber de jineteada para entender el resultado. Si la argolla queda ensartada, el corrido valió. Si pasó de largo, el siguiente jinete prueba. Hay turno, hay público que sabe los nombres y hay público que aplaude el galope igual. Las dos miradas caben. Lo que no cabe es cruzar la avenida en el momento de la corrida: el animal no va a esquivar una cámara.'
      },
      {
        kind: 'h2',
        text: 'Dónde pararse'
      },
      {
        kind: 'p',
        text: 'La cinta se arma sobre Lisandro de la Torre, en el tramo que ocupa la feria, frente al ex mercado. Fiadone ubicó el detalle de la sortija a la altura del 2500. Los jinetes salen de un extremo y llegan al arco donde cuelga la argolla. El mejor lugar es la vereda, detrás de la gente que ya dejó un claro, no el borde de la calzada. Si vas con chicos, adelantate a la explicación: el caballo pasa cerca y el ruido es parte de la prueba.'
      },
      {
        kind: 'p',
        text: 'El horario no está publicado minuto a minuto en las fichas oficiales. Ocurre dentro del domingo de feria, en la franja de 11 a 18 o 11 a 19 según la página de la Ciudad que consultes. Llegar a la una de la tarde y preguntar en el escenario o a los propios jinetes es más útil que una grilla inventada. La nota de [horarios](/notas/feria-de-mataderos-horarios) dice cómo confirmar el día; esta dice cómo mirar una vez que estás ahí.'
      },
      {
        kind: 'h2',
        text: 'Por qué está en este barrio y no en otro'
      },
      {
        kind: 'p',
        text: 'Mataderos pidió, desde 1889, gente que trabajara la hacienda a caballo. La sortija es un juego de esa habilidad, llevado a la fiesta. Ponerla en la feria de 1986 fue una decisión de programa cultural: el decreto quería tradiciones populares en la recova, no una exposición estática. El monumento de enfrente, [El Resero](/notas/el-resero-de-mataderos), muestra al mismo oficio en bronce y al paso. La sortija lo muestra al galope. Ver las dos cosas el mismo domingo cierra el argumento mejor que cualquier texto.'
      },
      {
        kind: 'p',
        text: 'Los jinetes de la foto de los gauchos en la feria, también de Fiadone, pertenecen a ese paisaje. No son extras. Algunos viven de otras tareas toda la semana y el domingo corren acá. Tratalos como a los artesanos del puesto de al lado: se puede preguntar, no se puede manotear el caballo para una foto. El resto del paseo —puestos, comida, baile— sigue alrededor y está reunido en la [guía de la feria](/notas/feria-de-mataderos).'
      }
    ]
  },
  {
    slug: 'artesanias-de-la-feria-de-mataderos',
    type: 'satelite',
    pillarSlug: 'feria-de-mataderos',
    title: 'Artesanías de la Feria de Mataderos: qué se encuentra',
    description:
      'Qué artesanías hay en la Feria de Mataderos, cómo recorrer el paseo de puestos y qué preguntar antes de comprar plata, cuero o tejido.',
    dek: 'El paseo junta oficios de distintas provincias. No todo lo que parece criollo está hecho a mano: conviene preguntar y mirar el revés de la pieza.',
    category: 'Feria',
    publishedAt: '2026-09-09',
    image: 'gauchos',
    datos: {
      title: 'El paseo de puestos',
      rows: [
        { label: 'Nombre del tramo', value: 'Paseo de Artesanías y Productos Regionales' },
        { label: 'Dónde', value: 'Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Cuándo', value: 'Domingo de feria' },
        { label: 'Qué dice la Ciudad', value: 'Piezas elaboradas de manera artesanal, de distintas provincias' }
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
        title: 'Decreto de creación',
        url: 'https://boletinoficial.buenosaires.gob.ar/normativaba/norma/53784',
        publisher: 'Boletín Oficial de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'La Feria de Mataderos se presenta, antes que nada, como feria de artesanías. El nombre completo lo dice: Feria de las Artesanías y Tradiciones Populares Argentinas. La Ciudad llama al recorrido Paseo de Artesanías y Productos Regionales, y describe artesanos de distintas provincias con piezas hechas de manera artesanal. Esta nota dice qué se puede esperar de ese paseo y qué preguntas evitan el souvenír genérico.'
      },
      {
        kind: 'h2',
        text: 'Qué oficios aparecen'
      },
      {
        kind: 'p',
        text: 'En un domingo habitual se ven platería —boleadoras chicas, cuchillos, rastras, mates con virola—, cuero y talabartería, tejidos y ponchos, madera, instrumentos, cerámica y alimentos que bordean la artesanía y la gastronomía. No es un padrón cerrado. El decreto de 1986 encargaba a Turismo el control de los puestos justamente para que la feria divulgara oficios y no se convirtiera en una feria de cualquier cosa. Cuarenta años después el criterio sigue siendo el que publican las fichas: pieza artesanal y producto regional.'
      },
      {
        kind: 'p',
        text: 'Eso no convierte cada mesa en un taller verificado delante tuyo. Hay piezas de autor, hay producción familiar y hay objetos que viajan de una feria a otra. La forma de comprar bien es la de siempre en estos paseos: preguntar quién lo hizo, con qué material y de qué provincia viene. Un mates de calabaza con virola de alpaca no es lo mismo que un mate industrial con un grabado. El puestero que trabaja lo cuenta. El que revende también, si se le pregunta sin agresividad.'
      },
      {
        kind: 'h2',
        text: 'Cómo recorrer sin perderse'
      },
      {
        kind: 'p',
        text: 'Los puestos ocupan Lisandro de la Torre y el entorno de la avenida de los Corrales. Conviene caminar un sentido entero antes de comprar el primer objeto que gusta: las mesas se parecen de lejos y se diferencian de cerca. El escenario y la sortija cortan el flujo; si vas con alguien, fijá un punto de encuentro en la plazoleta de [El Resero](/notas/el-resero-de-mataderos), que es el hito que no se mueve.'
      },
      {
        kind: 'p',
        text: 'Los precios se conversan en el puesto. No hay una tarifa de la feria. El regateo agresivo desentona con un oficio que está mostrando la pieza del mes; preguntar si hay otro tamaño o otro metal es otra cosa. Llevá efectivo. Y si la pieza es grande —un poncho, una montura en miniatura, un cuadro de filete—, pensá en el colectivo de vuelta antes de cerrar. La nota de [horarios y llegada](/notas/feria-de-mataderos-horarios) sirve para ese cálculo.'
      },
      {
        kind: 'h2',
        text: 'Artesanía, tradición y el edificio de atrás'
      },
      {
        kind: 'p',
        text: 'El programa de 1986 quiso que las tradiciones se vieran en un ámbito estable, y eligió la recova. Comprar un cuchillo ahí no es un acto histórico, pero el lugar no es intercambiable con una peatonal cualquiera. Detrás del puesto está la administración de 1900, monumento histórico nacional. La guía de [patrimonio](/notas/patrimonio-de-mataderos) cuenta ese edificio. La de la [feria](/notas/feria-de-mataderos) cuenta el domingo completo. Esta nota se queda en la mesa: mirar, preguntar, pagar y seguir.'
      },
      {
        kind: 'p',
        text: 'Si lo que buscás es comida y no objeto, pasá a [qué comer](/notas/que-comer-en-la-feria-de-mataderos). Si lo que buscás es música, el escenario está a metros y tiene su nota de [folklore y baile](/notas/folklore-y-baile-en-mataderos). Las tres cosas se hacen en la misma tarde. Ninguna obliga a comprar. La entrada es libre y mirar también lo es.'
      },
      {
        kind: 'h2',
        text: 'Plata, cuero y tejido, sin convertirlos en un catálogo'
      },
      {
        kind: 'p',
        text: 'La platería se reconoce por el peso y por el cierre, no por el brillo. Un cuchillo con hoja marcada y cabo de madera o de asta no se parece, en la mano, a una pieza hueca. El cuero se mira del revés: la costura pareja y el olor a material, no a plástico. El tejido se estira con cuidado; si la lana es fina y el dibujo sigue del otro lado, estás frente a un oficio y no a una manta impresa. Nada de esto reemplaza la palabra del puestero. La complementa, y evita el apuro de comprar el primer brillo de la fila.'
      },
      {
        kind: 'p',
        text: 'Los productos regionales —queso, dulce, fiambre— bordean la artesanía y la comida. Si el viaje es gastronómico, la nota de [qué comer](/notas/que-comer-en-la-feria-de-mataderos) es la que corresponde. Si el viaje es de objeto, no llenes la bolsa de comida que no vas a poder llevar en el colectivo junto con un poncho. Una pieza bien elegida vale más que tres recuerdos. La feria va a seguir ahí el domingo que viene.'
      }
    ]
  }
];
