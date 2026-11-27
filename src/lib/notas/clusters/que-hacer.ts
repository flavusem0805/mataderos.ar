import type { Nota } from '../types';

export const QUE_HACER: Nota[] = [
  {
    slug: 'que-hacer-en-mataderos',
    type: 'pilar',
    title: 'Qué hacer en Mataderos: guía del barrio',
    description:
      'Qué hacer en Mataderos, Comuna 9: feria del domingo, La Recova, El Resero, Museo Criollo, Cine Teatro El Plata, Alberdi y Nueva Chicago.',
    dek: 'Una tarde alcanza para el casco. Un domingo completo suma la feria. El Plata, Alberdi y la cancha piden otro ritmo, no otra ciudad.',
    category: 'Guía',
    publishedAt: '2026-03-29',
    image: 'plaza17',
    datos: {
      title: 'Cinco paradas que sí están',
      rows: [
        { label: 'Feria', value: 'Domingos, Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Casco', value: 'La Recova, El Resero y el Museo Criollo' },
        { label: 'Sala', value: 'Cine Teatro El Plata, Av. Alberdi 5765' },
        { label: 'Comercio', value: 'Av. Juan B. Alberdi y el corredor de Emilio Castro' },
        { label: 'Club', value: 'Nueva Chicago, Justo Suárez 6900' }
      ]
    },
    fuentes: [
      {
        title: 'Feria de Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/feriademataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Museo Criollo de los Corrales',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/museo-criollo-de-los-corrales',
        publisher: 'Turismo Buenos Aires'
      },
      {
        title: 'Reapertura del Cine Teatro El Plata',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Estadio',
        url: 'https://canuevachicago.com.ar/estadio/',
        publisher: 'Club Atlético Nueva Chicago'
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
        text: 'Qué hacer en Mataderos depende del día. El domingo el barrio se explica solo: la feria ocupa el casco, hay música, comida y una sortija, y a metros están el museo y El Resero. De lunes a sábado la misma esquina está más vacía y se ve la arquitectura, mientras la vida comercial pasa por la avenida Alberdi y, en otro tramo, por Emilio Castro. Esta guía no arma un ranking de “imperdibles”. Arma un mapa de decisiones para no cruzar la ciudad y quedarse solo en el primer puesto.'
      },
      {
        kind: 'p',
        text: 'Las notas que salen de acá bajan a tres planes concretos. [Un domingo en Mataderos](/notas/domingo-en-mataderos) es el itinerario hora por hora. [Alberdi y Emilio Castro](/notas/avenida-alberdi-y-emilio-castro) es el barrio entre semana y los corredores. El [Cine Teatro El Plata](/notas/cine-teatro-el-plata) es la sala de Alberdi 5765, con su historia de cierre y reapertura. El casco tiene guía propia de [patrimonio](/notas/patrimonio-de-mataderos). La feria, también: [horarios, comida y puestos](/notas/feria-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Si tenés un domingo'
      },
      {
        kind: 'p',
        text: 'Llegá después de las once a Lisandro de la Torre y la avenida de los Corrales. Las fichas oficiales de la Ciudad publican el cierre a las 18 o a las 19, y la feria se suspende si llueve: el detalle está en [horarios](/notas/feria-de-mataderos-horarios). En la primera hora conviene mirar la torre, dar la vuelta a la planta en U y acercarte a El Resero antes de que el pasillo se cierre. Si el museo abre, es el momento. Después, puestos, algo de comer en el patio y el escenario o la sortija según lo que esté pasando.'
      },
      {
        kind: 'p',
        text: 'No hace falta ver todo. Un error típico es querer sumar la cancha de Nueva Chicago, El Plata y un café de Emilio Castro al mismo domingo de feria. Las distancias no son las de un pueblo chico caminable en veinte minutos de punta a punta, y el casco en hora pico se camina despacio. Elegí el casco como cuerpo del día. Dejá Alberdi para la vuelta si te queda luz, o para otro día. El itinerario escrito está en la nota del domingo.'
      },
      {
        kind: 'h2',
        text: 'Si venís entre semana'
      },
      {
        kind: 'p',
        text: 'Sin feria, el casco rinde en cuarenta minutos: fachada, plazoleta, museo si abre. El interés se corre a la avenida Juan B. Alberdi, el centro comercial a cielo abierto del barrio, donde está El Plata en el 5765. Emilio Castro es otro corredor, más de vereda y de locales nuevos, y no compite con la feria: vive de martes a domingo con otra clientela. La nota de los dos corredores dice cómo no mezclarlos.'
      },
      {
        kind: 'p',
        text: 'El Plata reabrió en octubre de 2021 como sala del Complejo Teatral de Buenos Aires, después de haber cerrado en 1987. La programación cambia. La dirección no. Si la búsqueda es “qué hacer de noche en Mataderos”, la sala es la respuesta con edificio propio. Un bar o una pizzería de Alberdi —[El Cedrón](/notas/el-cedron-de-mataderos) es la esquina documentada— completa mejor esa noche que un puesto de feria que no existe el miércoles.'
      },
      {
        kind: 'h2',
        text: 'Si venís por el fútbol o por la historia'
      },
      {
        kind: 'p',
        text: 'El estadio de Nueva Chicago está en Justo Suárez 6900, en el borde de Los Perales. No está al lado de la recova. Se va a propósito, el día de partido, o se pasa de largo. La historia del club, los colores y la fecha de 1911 están en su nota. El boxeador que le da nombre a la avenida es otra historia, la de [Justo Suárez](/notas/justo-suarez-el-torito-de-mataderos). Juntar “Torito” en una sola parada confunde al club con el púgil.'
      },
      {
        kind: 'p',
        text: 'Quien quiera entender por qué el barrio es así antes de sacar fotos tiene la [historia de Mataderos](/notas/historia-de-mataderos): 1889, Nueva Chicago, la faena de 1900 y el nombre fijado en 1972. No es una parada. Es el contexto. Se lee en el viaje de ida y se reconoce en la torre.'
      },
      {
        kind: 'h2',
        text: 'Qué no prometer'
      },
      {
        kind: 'p',
        text: 'Mataderos no es un circuito de milongas comparable a Almagro, ni un paseo de diseño, ni un barrio que se recorra “como San Telmo pero con caballos”. El folklore del domingo es real y está documentado. El tango aparece en la memoria porteña de sus bares, no como una grilla que esta guía pueda inventar. La nota de [cultura, folklore y bares](/notas/cultura-folklore-y-bares-de-mataderos) dice esa diferencia sin rellenar huecos.'
      },
      {
        kind: 'p',
        text: 'Tampoco hace falta consumir para estar. La feria tiene entrada libre. El Resero se mira desde la vereda. Alberdi se camina. El portal, además, lista comercios de cercanía con ficha propia: eso es la vida del barrio el lunes, y no entra en una guía de visitantes aunque la sostenga. Si vivís acá, la pregunta “qué hacer” se responde en la vereda de tu corredor. Si venís de visita, empezá por el casco y no por el mapa entero.'
      },
      {
        kind: 'h2',
        text: 'Con chicos, con mayores y sin apuro'
      },
      {
        kind: 'p',
        text: 'La feria se camina, no se recorre en un vehículo. Con un cochecito conviene entrar temprano, bordear la plazoleta y no cruzar Lisandro de la Torre cuando corre la sortija. El museo, si abre, es el tramo bajo techo: seis salas, un patio y menos sol que la avenida. El Resero se mira desde la reja; no hace falta alzar a nadie por encima del cerco. Un domingo de calor pide agua y una pausa a la sombra de la recova antes del mediodía lleno. Un domingo de viento, en esa esquina abierta, se siente antes en la cara que en el pronóstico.'
      },
      {
        kind: 'p',
        text: 'Con personas mayores el mismo orden rinde más que un itinerario largo. Casco, monumento, una sentada para comer y el escenario desde un banco, si hay. Alberdi puede esperar. La cancha de Nueva Chicago, en Justo Suárez 6900, es un traslado aparte y no un “ya que estamos”. Decir que Mataderos se hace a pie es verdad dentro del casco y mentira si se pretende unir el estadio, Emilio Castro y la feria en una sola caminata cómoda.'
      },
      {
        kind: 'h2',
        text: 'Comer, comprar y volver'
      },
      {
        kind: 'p',
        text: 'Comer en la feria es de pie o en la mesa del puesto, sin reserva. El detalle está en la nota de gastronomía de la feria: no hay carta oficial ni precio de lista. Comprar artesanía pide una vuelta completa antes de la primera decisión, efectivo y una pregunta sobre el material. Volver es la parte que más gente subestima. El colectivo no para en el medio del cruce a las cinco de la tarde. Se camina hasta Alberdi, Directorio, Eva Perón o el eje por el que se llegó, y se aborda ahí. Un auto guardado “a dos cuadras” a las once puede estar a veinte minutos de bocina a las seis.'
      },
      {
        kind: 'p',
        text: 'Si el plan incluye El Plata a la noche, separá los tiempos. La feria cierra de tarde. La sala, cuando hay función, suele ser de viernes a domingo y con horario propio, el que publique el Complejo Teatral esa semana. Forzar un asado en el puesto y una butaca a las ocho solo cierra si la cartelera lo permite y si aceptás salir del casco hacia Alberdi 5765 sin paseo intermedio. Si no hay función, la fachada se mira otro día y el domingo se queda en el casco.'
      },
      {
        kind: 'h2',
        text: 'Tres maneras de no perder el viaje'
      },
      {
        kind: 'p',
        text: 'La primera: no viajar un domingo de lluvia. La suspensión está escrita en la ficha de turismo y no hay feria techada de reemplazo. La segunda: no buscar el barrio en una sola foto. La torre, el caballo y la pareja de baile son tres cosas distintas y están a metros, pero Alberdi y la cancha no salen en ese encuadre. La tercera: leer la historia una vez, aunque sea en el viaje. Sin el 14 de abril de 1889, sin Nueva Chicago y sin la faena de 1900, la feria parece un evento que podría estar en cualquier plaza. Está ahí porque el edificio ya estaba. Esa es la diferencia entre visitar un paseo y visitar Mataderos.'
      },
      {
        kind: 'p',
        text: 'Una cuarta manera, menos obvia: volver un día de semana aunque el domingo haya salido bien. Sin puestos se ve la torre, se lee la placa y se entiende el tamaño real de la plazoleta. Esa segunda visita es corta y cambia la foto que te llevaste. Si solo podés venir una vez, que sea el domingo. Si podés venir dos, la segunda no repitas la feria: cruzá a Alberdi, mirá El Plata por fuera y sentate en una esquina que no viva del turismo. Ahí Mataderos deja de ser un destino y vuelve a ser un barrio, que es lo que esta guía promete cuando dice “qué hacer” y no “qué consumir”. El mapa queda así de chico a propósito: cinco paradas con dirección, tres corredores que no se pisan, y un domingo que se suspende si llueve. Con eso se puede venir. Sin eso, se viene igual y se pierde la mitad. La mitad que se pierde suele ser el edificio: la gente se acuerda del baile y se olvida de que estaba parado frente a un monumento de 1979. Esta guía existe para que las dos cosas viajen juntas: el domingo de la feria y el edificio que lo hace posible.'
      }
    ]
  },
  {
    slug: 'domingo-en-mataderos',
    type: 'satelite',
    pillarSlug: 'que-hacer-en-mataderos',
    title: 'Domingo en Mataderos: itinerario de un día',
    description:
      'Itinerario para un domingo en Mataderos: a qué hora llegar a la feria, cómo ordenar museo, Resero, puestos y vuelta sin auto.',
    dek: 'Un orden posible: casco temprano, museo si abre, feria, comida, baile o sortija, y salida antes de que el colectivo se sienta lejos.',
    category: 'Guía',
    publishedAt: '2026-06-18',
    image: 'corridaSortija',
    datos: {
      title: 'Orden sugerido',
      rows: [
        { label: '11 a 12', value: 'Llegada al cruce, torre, plazoleta y El Resero' },
        { label: 'Mañana de feria', value: 'Museo Criollo si está abierto' },
        { label: 'Mediodía', value: 'Puestos y comida en el patio' },
        { label: 'Tarde', value: 'Escenario, baile o corrida de sortija' },
        { label: 'Vuelta', value: 'A pie hasta el colectivo, no en auto por el casco' }
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
        title: 'Museo Criollo de los Corrales',
        url: 'https://turismo.buenosaires.gob.ar/es/otros-establecimientos/museo-criollo-de-los-corrales',
        publisher: 'Turismo Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'Un domingo en Mataderos se arma alrededor de un solo cruce. No es un rally de diez direcciones. Lisandro de la Torre y la avenida de los Corrales concentran la feria, la recova, el museo y el monumento. El resto —Alberdi, la cancha, Emilio Castro— puede sumarse si sobra tiempo y ganas de caminar, no como obligación del día. Este itinerario es un orden, no un horario de tren.'
      },
      {
        kind: 'h2',
        text: 'Antes de salir'
      },
      {
        kind: 'p',
        text: 'Mirá el cielo. Si llueve, la feria se suspende: lo dice la guía de turismo. Mirá también qué ficha estás usando para la hora. La página de la feria dice 11 a 18, domingos y feriados patrios. Turismo dice 11 a 19 de marzo a diciembre. Las dos son oficiales y la nota de [horarios](/notas/feria-de-mataderos-horarios) explica cómo convivir con esa diferencia. Salí para estar ahí después de las once, con efectivo, calzado para adoquín y sin apuro de auto en la puerta.'
      },
      {
        kind: 'p',
        text: 'El viaje es en colectivo hasta las avenidas del sudoeste y una caminata final. No hay molinete. El casco, entre las doce y las seis, funciona como peatonal de hecho. Si venís con cochecito o con un pibe chico, entrá por una bocacalle lateral.'
      },
      {
        kind: 'h2',
        text: 'La primera hora, antes de comprar nada'
      },
      {
        kind: 'p',
        text: 'Apenas llegues, dale una vuelta a la planta en U de [La Recova](/notas/la-recova-de-mataderos) y parate frente a [El Resero](/notas/el-resero-de-mataderos). Esa media hora se vuelve incómoda más tarde, cuando los puestos y el público tapan la fachada. Si el [Museo Criollo](/notas/museo-criollo-de-los-corrales) abre —el teléfono publicado es 4687-1949—, metelo ahora. Turismo recomienda justamente el domingo para sumarlo a la feria. Después ya no vas a querer volver sobre tus pasos.'
      },
      {
        kind: 'h2',
        text: 'Puestos, comida y el momento del galope'
      },
      {
        kind: 'p',
        text: 'Recorré el paseo de artesanías en un sentido antes de decidir una compra. La nota de [artesanías](/notas/artesanias-de-la-feria-de-mataderos) dice qué preguntar. Comé en el patio o en un puesto cuando tengas hambre, no cuando una lista te lo ordene: no hay reserva ni menú único, y eso está contado en [qué comer](/notas/que-comer-en-la-feria-de-mataderos). Dejá un rato sin nada en la mano para el escenario o para la [sortija](/notas/corrida-de-sortija-en-mataderos). El baile y el malambo se ven mejor sin una bandeja.'
      },
      {
        kind: 'p',
        text: 'Si el día está largo y el cuerpo acompaña, la vuelta puede bajar por Alberdi y pasar por la fachada de [El Plata](/notas/cine-teatro-el-plata). No cuentes con una función justo a la salida de la feria. La sala tiene su propia cartelera, de viernes a domingo en muchas temporadas, y no está sincronizada con el cierre de los puestos. Forzar las dos cosas el mismo día sale bien cuando la función es a la noche y mal cuando se pretende encajarla a las siete.'
      },
      {
        kind: 'h2',
        text: 'La salida'
      },
      {
        kind: 'p',
        text: 'Andate caminando hasta una avenida con colectivo, no busques un remise en el medio del cruce. Si el plan era también la cancha de [Nueva Chicago](/notas/club-atletico-nueva-chicago), ese es otro traslado, hacia Justo Suárez 6900, y solo tiene sentido si hay partido. El domingo de feria ya es un día completo. La guía madre, con las otras formas de venir, es [qué hacer en Mataderos](/notas/que-hacer-en-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Si el día se desarma'
      },
      {
        kind: 'p',
        text: 'Puede llover a la una, puede cerrar el museo, puede no haber sortija. El domingo no se cae por eso. Queda la fachada, queda El Resero y quedan los puestos que hayan abierto antes del agua. Si la suspensión es total, no insistas en el casco vacío esperando un milagro: mové el plan a [Alberdi](/notas/avenida-alberdi-y-emilio-castro) y a El Plata, o dejá la feria para el domingo siguiente. Forzar un “algo de folklore igual” bajo la lluvia es la manera de enojarse con un barrio que avisó la regla.'
      },
      {
        kind: 'p',
        text: 'Si todo funciona y el tiempo sobra, el plus sensato es una sola cosa, no tres. O la vuelta por Alberdi, o una mesa, o el museo si no entraste a la mañana. Sumar la cancha sin partido es un galpón cerrado y un traslado. Sumar Emilio Castro “porque está cerca” suele ser mentira en el cansancio de las cinco de la tarde. Un domingo bien cerrado es el que termina con la torre todavía en la cabeza, no con una lista tachada.'
      }
    ]
  },
  {
    slug: 'avenida-alberdi-y-emilio-castro',
    type: 'satelite',
    pillarSlug: 'que-hacer-en-mataderos',
    title: 'Avenida Alberdi y Emilio Castro: cómo recorrer Mataderos',
    description:
      'Cómo recorrer Mataderos por Av. Alberdi y Av. Emilio Castro: el centro comercial, El Plata, el casco y qué corredor sirve para qué.',
    dek: 'Alberdi es el centro comercial de toda la semana. Emilio Castro es otro corredor. El casco de la feria es un tercero. No son la misma caminata.',
    category: 'Guía',
    publishedAt: '2026-08-06',
    image: 'avenidaMataderos',
    datos: {
      title: 'Tres corredores',
      rows: [
        { label: 'Casco', value: 'Lisandro de la Torre y Av. de los Corrales' },
        { label: 'Comercio', value: 'Av. Juan B. Alberdi, con El Plata en el 5765' },
        { label: 'Vereda nueva', value: 'Av. Emilio Castro' },
        { label: 'Club', value: 'Justo Suárez 6900, aparte de los tres' }
      ]
    },
    fuentes: [
      {
        title: 'Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/laciudad/barrios/mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Cine Teatro El Plata',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'El Cedrón',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/historias-de-mi-comuna-el-cedron-la-pizza-y-la-impronta-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
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
        text: 'Mataderos no se recorre por una sola avenida. Quien llega pensando en “la calle principal” suele caer en Juan B. Alberdi, y no le falta razón: es el centro comercial a cielo abierto, con bancos, locales de toda la vida y el Cine Teatro El Plata en el 5765. Quien llega por la feria cae en cambio en Lisandro de la Torre. Y quien vive del lado de Emilio Castro tiene otro mapa, de boulevard y vereda. Esta nota separa los tres para que el mapa deje de ser una mancha.'
      },
      {
        kind: 'h2',
        text: 'Alberdi, de lunes a sábado'
      },
      {
        kind: 'p',
        text: 'La avenida Juan B. Alberdi es donde el barrio compra, cobra y sale de noche sin necesidad de que sea domingo. El Plata, reabierto en 2021, le da una sala de escala metropolitana a una avenida de barrio. [El Cedrón](/notas/el-cedron-de-mataderos), en el 6100, esquina Murguiondo, es la pizzería que la Ciudad documenta como esquina tradicional, heredera de un bodegón que se llamó Primera Curva por el giro del tranvía. Caminar Alberdi es ver ese comercio, no ver la feria. Un domingo de feria la avenida sigue existiendo, pero el flujo grande está en el casco.'
      },
      {
        kind: 'p',
        text: 'El hospital Salaberry, inaugurado en 1915 según el diario La Nación citado por la ficha del barrio, pertenece a esta historia de equipamiento civil y no a un paseo. No es una parada turística. Sirve para recordar que el barrio armó salud, comercio y sala además de corrales. La [historia](/notas/historia-de-mataderos) lo cuenta en su lugar.'
      },
      {
        kind: 'h2',
        text: 'Emilio Castro, sin disfrazarlo de casco'
      },
      {
        kind: 'p',
        text: 'Emilio Castro cruza el barrio con otra lógica: más residencial en tramos, con locales que se fueron sumando sobre el boulevard. No tiene la torre del mercado ni la declaratoria del APH 21. Tratarlo como “el otro casco histórico” es un error de guía. Es un corredor para vivir y para sentarse, útil entre semana, débil como reemplazo de la feria si alguien viajó un domingo a ver el Resero. La distancia entre un café de Castro y la recova no es un paseo corto con niños cansados.'
      },
      {
        kind: 'p',
        text: 'El portal lista comercios de esos corredores con ficha y horario. Esa guía de cercanía no se duplica acá. Acá el punto es geográfico: si tu trámite o tu mesa están en Castro, no bajes en la feria y camines “porque Mataderos es chico”. Mirá el mapa antes. La guía de [qué hacer](/notas/que-hacer-en-mataderos) dice cuándo vale la pena sumar un corredor y cuándo sobra.'
      },
      {
        kind: 'h2',
        text: 'El casco, que no es una avenida más'
      },
      {
        kind: 'p',
        text: 'Lisandro de la Torre y la avenida de los Corrales son el cruce patrimonial. Ahí están La Recova, El Resero, el museo y, el domingo, la feria. El [casco histórico](/notas/casco-historico-de-mataderos) tiene una ley que lo delimita. Alberdi no entra en ese polígono. Se pueden hacer los dos el mismo día si se acepta el traslado a pie o en colectivo corto. No se pueden hacer como si fueran la misma vereda.'
      },
      {
        kind: 'p',
        text: 'Un orden sensato entre semana: Alberdi y El Plata de tarde, casco al final del día con luz, o al revés si el museo es la prioridad. Un orden sensato el domingo: casco y feria, y Alberdi solo si la vuelta del colectivo ya pasa por ahí. Emilio Castro queda para quien duerme en el barrio o vuelve otro día. Eva Perón es otro eje de circulación del cuadrante, útil para llegar, no un paseo con monumento al final. Nombrarla alcanza para no omitirla; inventarle un circuito no.'
      },
      {
        kind: 'p',
        text: 'Una forma de no perderse es nombrar el corredor en voz alta antes de bajar. “Bajo en Alberdi” no es “bajo en la feria”. “Bajo en Castro” no es “bajo en el Resero”. El mapa del teléfono ayuda si el punto está marcado: Lisandro de la Torre y avenida de los Corrales para el casco, Alberdi 5765 para El Plata, Alberdi 6100 para El Cedrón, Justo Suárez 6900 para la cancha. Cuatro pines. El resto es caminata entre ellos, no un quinto monumento escondido.'
      },
      {
        kind: 'p',
        text: 'Y si vivís en el medio, esta nota no te descubre el barrio: te da el lenguaje para explicárselo a quien viene. El casco es el domingo y el monumento. Alberdi es la semana. Castro es la vereda propia. Mezclarlos en una sola recomendación —“andá a Mataderos, está todo junto”— es el favor que después se paga con un colectivo de más y un amigo cansado. Separarlos es la cortesía.'
      }
    ]
  },
  {
    slug: 'cine-teatro-el-plata',
    type: 'satelite',
    pillarSlug: 'que-hacer-en-mataderos',
    title: 'Cine Teatro El Plata: historia y cómo visitarlo',
    description:
      'Historia del Cine Teatro El Plata de Mataderos, en Av. Alberdi 5765: apertura en 1945, cierre en 1987 y reapertura en octubre de 2021.',
    dek: 'Fue La Scala y le decían el Gran Rex de Mataderos. Cerró en 1987. Los vecinos lo pelearon durante años. Volvió a abrir en octubre de 2021.',
    category: 'Cultura',
    publishedAt: '2026-09-24',
    image: 'elPlata',
    datos: {
      title: 'La sala',
      rows: [
        { label: 'Dirección', value: 'Av. Juan B. Alberdi 5765' },
        { label: 'Apertura', value: '1945, como La Scala' },
        { label: 'Cierre como cine', value: '1987' },
        { label: 'Reapertura', value: 'Octubre de 2021, fiesta el sábado 16' },
        { label: 'Dependencia', value: 'Complejo Teatral de Buenos Aires' },
        { label: 'Capacidad actual', value: 'Más de 500 localidades entre platea y pullman, más dos microcines' },
        { label: 'Instagram', value: '@cineteatroelplata' }
      ]
    },
    fuentes: [
      {
        title: 'La Ciudad reabre el Cine Teatro El Plata',
        url: 'https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Reabrió el Cine Teatro El Plata',
        url: 'https://defensoria.org.ar/archivo_noticias/reabrio-el-cine-teatro-el-plata/',
        publisher: 'Defensoría del Pueblo de la Ciudad de Buenos Aires'
      },
      {
        title: 'Después de 34 años reabrió el Cine Teatro El Plata',
        url: 'https://www.diariodecultura.com.ar/turismo-cultural/despues-de-34-anos-reabre-hoy-el-cine-teatro-el-plata-rescatado-por-vecinos-de-mataderos/',
        publisher: 'Diario de Cultura'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El Cine Teatro El Plata está en la avenida Juan B. Alberdi 5765, en el tramo comercial de Mataderos. No está en el casco de la feria y la foto de una calle de puestos no es su fachada: conviene decirlo porque las imágenes del barrio se mezclan. La sala es un edificio art decó sobre Alberdi, inaugurado en 1945 con el nombre La Scala y conocido como el Gran Rex de Mataderos. En su mejor época llegaba a unas 1.500 butacas y estrenaba en simultáneo con los cines del centro.'
      },
      {
        kind: 'h2',
        text: 'Qué fue entre 1945 y 1987'
      },
      {
        kind: 'p',
        text: 'Por el escenario pasaron, según el relato que recogen las crónicas de la reapertura, Aníbal Troilo, Alberto Olmedo, Jorge Porcel, Roberto Goyeneche, Julio Sosa, Azucena Maizani y Martín Karadagian, en festivales y funciones que el barrio tomaba como propias. La comparación con el Gran Rex no era solo de apodo: la arquitectura se le parecía y la escala, para un barrio del oeste, era enorme. En 1987 dejó de funcionar como cine, la misma suerte de muchas salas porteñas. Después fue templo evangélico y depósito de artículos para el hogar, ocupación que las crónicas extienden hasta 2001.'
      },
      {
        kind: 'p',
        text: 'La Ciudad, al reabrirlo, puso en boca del ministro de Cultura de entonces la frase institucional: el edificio nace en 1945 y en 1987 cesó sus funciones. Los vecinos se movilizaron durante años. María Denti, de la coordinadora vecinal, mencionó a Roberto Gutiérrez —vecino que había trabajado en la sala en los años sesenta— como una de las almas de ese reclamo. No fue un capricho de catálogo patrimonial. Fue una pelea de cuadra.'
      },
      {
        kind: 'h2',
        text: 'El cierre largo y la reapertura de 2021'
      },
      {
        kind: 'p',
        text: 'En 2004 la participación vecinal ya era visible. Las obras empezaron en 2011, por etapas. En 2013 un fallo judicial ordenó convertirlo en centro cultural. Hubo una reapertura temporaria y en 2015 volvió a cerrar. La Defensoría del Pueblo tramitó el reclamo y dictó la Resolución 1224/17, recomendando a los ministerios de Cultura y de Desarrollo Urbano reiniciar y terminar la obra de Alberdi 5765. En 2019 el gobierno porteño retomó los trabajos inconclusos.'
      },
      {
        kind: 'p',
        text: 'La reapertura fue en octubre de 2021. El sábado 16 hubo fiesta en la vereda, con escenario y pantalla sobre el frente, desde las 16. La sala pasó al Complejo Teatral de Buenos Aires. La programación de ese tramo iba del 22 de octubre al 12 de diciembre, de viernes a domingo. La capacidad ya no es la de 1945: la Defensoría y Diario de Cultura describen más de 500 localidades entre platea y pullman —una cuenta detalla 366 plateas, nueve espacios para silla de ruedas y 114 butacas de pullman— más un microcine de unas 170 butacas y otro espacio chico. Teatro, danza, títeres, música y cine son el rubro que la Ciudad anunció, no una vuelta al cine de estreno diario.'
      },
      {
        kind: 'h2',
        text: 'Cómo ir ahora'
      },
      {
        kind: 'p',
        text: 'La dirección sigue siendo Alberdi 5765. La cartelera cambia con la temporada y la sala la publica en su Instagram, [@cineteatroelplata](https://www.instagram.com/cineteatroelplata/). Esta nota no copia esa grilla ni esas fotos. Conviene mirarla antes de viajar, sobre todo si se quiere combinar con el [domingo de feria](/notas/domingo-en-mataderos), que ocurre en otro punto del barrio. De noche, El Plata es la parada cultural más clara de [Alberdi](/notas/avenida-alberdi-y-emilio-castro). De día, la fachada se puede mirar aunque no haya función.'
      },
      {
        kind: 'p',
        text: 'La foto de esta nota es la fachada del Cine Teatro El Plata, publicada por el Gobierno de la Ciudad en la crónica de la reapertura de octubre de 2021. El edificio que hay que ir a ver está sobre Alberdi 5765. La guía de [qué hacer en Mataderos](/notas/que-hacer-en-mataderos) lo deja en ese corredor, no detrás de la torre del mercado.'
      }
    ]
  }
];
