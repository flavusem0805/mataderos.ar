import type { Nota } from '../types';

export const HISTORIA: Nota[] = [
  {
    slug: 'historia-de-mataderos',
    type: 'pilar',
    title: 'Historia de Mataderos: origen, Nueva Chicago y el barrio de los corrales',
    description:
      'Historia de Mataderos, Comuna 9: la piedra fundamental de 1889, el traslado desde los Corrales Viejos, Nueva Chicago, el Mercado de Hacienda y el nombre del barrio.',
    dek: 'El barrio no nació de un loteo. Nació de una mudanza: la ciudad corrió los mataderos hacia el oeste y alrededor de ese trabajo se armó un pueblo.',
    category: 'Historia',
    publishedAt: '2026-02-26',
    image: 'corralesViejos',
    datos: {
      title: 'Datos para ubicar la historia',
      rows: [
        { label: 'Aniversario barrial', value: '14 de abril' },
        { label: 'Piedra fundamental', value: '1889, Nuevo Matadero Público' },
        { label: 'Primera faena de vacunos', value: '21 de marzo de 1900' },
        { label: 'Mercado en funciones', value: '1 de mayo de 1901' },
        { label: 'Nombre oficial', value: 'Mataderos, impuesto en la nomenclatura en 1972' },
        { label: 'Comuna', value: '9, junto con Liniers y Parque Avellaneda' }
      ]
    },
    fuentes: [
      {
        title: 'Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/laciudad/barrios/mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: '14 de abril: Día del barrio de Mataderos',
        url: 'https://cultura.legislatura.gob.ar/cultura_posts/14-de-abril-dia-del-barrio-de-mataderos1018.html',
        publisher: 'Legislatura de la Ciudad de Buenos Aires'
      },
      {
        title: '1 de mayo de 1901: se inauguran los mataderos de Nueva Chicago',
        url: 'https://cultura.legislatura.gob.ar/cultura_posts/1-de-mayo-de-1901-se-inauguran-los-mataderos-de-nueva-chicago825.html',
        publisher: 'Legislatura de la Ciudad de Buenos Aires'
      },
      {
        title: 'Mercado Nacional de Hacienda',
        url: 'https://atom.mininterior.gob.ar/index.php/mercado-nacional-de-hacienda',
        publisher: 'Archivo General de la Nación'
      },
      {
        title: 'Junta de Estudios Históricos de Mataderos',
        url: 'https://buenosaireshistoria.org/juntas/junta-mataderos/',
        publisher: 'Buenos Aires Historia'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'Buscar “historia de Mataderos” suele devolver una fecha y un apodo: el 14 de abril y Nueva Chicago. Las dos cosas son ciertas y las dos se quedan cortas. El 14 de abril de 1889 es el aniversario que la Ciudad toma como nacimiento del barrio, porque ese día estaba previsto colocar la piedra fundamental del Nuevo Matadero Público. Nueva Chicago fue el nombre con el que se conoció la zona mientras la industria de la carne mandaba, una comparación con la ciudad estadounidense que en esos años era el modelo de los corrales modernos. El nombre que quedó en los mapas, Mataderos, es el que la gente ya usaba y el que la nomenclatura oficial porteña fijó mucho más tarde, en 1972.'
      },
      {
        kind: 'p',
        text: 'Esta guía recorre ese arco sin tratar al barrio como un decorado criollo. Mataderos se formó porque Buenos Aires necesitaba sacar la faena del sur cercano y porque el país vivía de exportar carne y cueros. Alrededor de los corrales nuevos se instalaron trabajadores que sabían mover hacienda a caballo, y de ese oficio salieron el paisaje, los apodos y buena parte de lo que hoy se visita el domingo. Las notas que cuelgan de esta guía bajan a cuatro asuntos: el [cambio de nombre](/notas/nueva-chicago-y-el-nombre-de-mataderos), el [Mercado Nacional de Hacienda](/notas/mercado-nacional-de-hacienda), [Justo Suárez](/notas/justo-suarez-el-torito-de-mataderos) y el [Club Atlético Nueva Chicago](/notas/club-atletico-nueva-chicago).'
      },
      {
        kind: 'h2',
        text: 'Por qué los mataderos se fueron del sur'
      },
      {
        kind: 'p',
        text: 'Hasta fines del siglo XIX la faena porteña estaba en los Corrales Viejos, en la zona que hoy es Parque de los Patricios. El crecimiento de la ciudad los dejó demasiado cerca. El Archivo General de la Nación ubica el antecedente del traslado en 1884, cuando los desbordes del Riachuelo empujaron a las autoridades a pensar un mercado más lejos. El intendente Antonio Crespo no es el nombre que conserva el archivo para esa decisión: el AGN atribuye al intendente Seeber la elección de solares cercanos a la estación Liniers. La Legislatura resume el hecho de otro modo, igual de claro: una ordenanza municipal decidió mudar los Mataderos Públicos desde los terrenos del actual Parque Patricios hasta una zona alejada.'
      },
      {
        kind: 'p',
        text: 'No fue un capricho de nomenclatura. Buenos Aires seguía siendo la puerta del país agroexportador y el consumo interno de carne también crecía. Hacía falta un establecimiento capaz de concentrar hacienda, pesarla, venderla y faenarla con alguna higiene, lejos del casco que se estaba urbanizando. El lugar elegido era, en la práctica, campo abierto al sudoeste, a una distancia que entonces parecía suficiente y que el siglo XX se comió en pocas décadas.'
      },
      {
        kind: 'h2',
        text: 'El 14 de abril de 1889, con una salvedad'
      },
      {
        kind: 'p',
        text: 'La ficha oficial del barrio dice que el 14 de abril de 1889 se colocó la piedra fundamental de los nuevos mataderos. La Legislatura celebra esa fecha como Día del barrio de Mataderos y habla de la piedra fundamental del “Nuevo Matadero Público”. El sitio de monumentos de la Nación, al describir la antigua administración, escribe en cambio el 18 de abril de 1889. La Junta de Estudios Históricos de Mataderos agrega un matiz que conviene no borrar: investigaciones posteriores indican que el acto debió posponerse por el clima, aunque esa jornada quedó como origen de la actividad que después formó el núcleo poblacional.'
      },
      {
        kind: 'p',
        text: 'Conviene leer las tres frases juntas y no elegir una para tapar a las otras. El aniversario cívico es el 14 de abril. Hay un desfasaje de cuatro días en una ficha patrimonial nacional. Y la junta local advierte que el tiempo puede haber corrido la ceremonia. Nada de eso cambia el hecho histórico de fondo: a partir de 1889 el oeste de la ciudad tuvo una obra pública pensada para reemplazar a los corrales del sur, y alrededor de esa obra empezó a vivir gente.'
      },
      {
        kind: 'p',
        text: 'La ficha de monumentos precisa el arranque de otra manera útil. En 1888, al anegarse los corrales del Sur, se decidió el traslado a campos ubicados dos o tres kilómetros al sur de Liniers. Las construcciones ocuparon al principio ocho de unas veinte hectáreas. El establecimiento se inauguró el 21 de marzo de 1900, con la presencia del presidente Julio A. Roca y del intendente Rodolfo Bullrich. Ese día, según el relato que la Ciudad toma de CEDOM y que la Legislatura repite con el diario de época, se faenó el primer vacuno. Durante un año los mataderos nuevos se dedicaron a esa hacienda. El 1 de mayo de 1901 se habilitaron instalaciones para ovinos y porcinos, y el Archivo General de la Nación toma esa fecha como el comienzo oficial del Mercado Nacional de Hacienda.'
      },
      {
        kind: 'h2',
        text: 'Nueva Chicago no era un barrio de postal'
      },
      {
        kind: 'p',
        text: 'Mientras la faena se afirmaba, el lugar se llamaba Nueva Chicago. La comparación no era turística. Chicago era, en la imaginación industrial de la época, la capital de los corrales y de los frigoríficos. Ponerle ese nombre al bajo fondo porteño decía qué se esperaba del predio: escala, sangre y trabajo, no una villa de veraneo. La Ciudad lo resume así: el parecido era con la ciudad norteamericana caracterizada por su industria de la carne.'
      },
      {
        kind: 'p',
        text: 'El apodo que usaba la gente era otro. Casi desde el principio se dijo Mataderos, porque eso era lo que había: el matadero. La Legislatura anota que el nombre popular se oficializó en 1972 y que “Nueva Chicago” sobrevivió en el club de fútbol. Esa supervivencia no es un detalle de camiseta. Es la prueba de que el nombre industrial quedó pegado a la institución que los pibes del puente fundaron en 1911, cuando el barrio todavía se presentaba con las dos denominaciones. La historia del [club](/notas/club-atletico-nueva-chicago) y la del [nombre](/notas/nueva-chicago-y-el-nombre-de-mataderos) se cuentan aparte porque cada una tiene sus documentos.'
      },
      {
        kind: 'h2',
        text: 'Un barrio de oficio, no de loteo'
      },
      {
        kind: 'p',
        text: 'La población primera vivía de la fuente de trabajo que acababa de instalarse. La Legislatura lo dice con una frase que explica el tono del barrio mejor que cualquier folleto: la actividad y el vínculo con el mercado pedían personal que supiera las tareas ganaderas y, sobre todo, que supiera hacerlas a caballo. De ahí la impronta criolla. No llegó como escenografía para una feria futura. Llegó porque el resero, el arreador y el peón de corrales eran el personal calificado de esa economía.'
      },
      {
        kind: 'p',
        text: 'Eso también explica por qué, décadas más tarde, el monumento que se eligió para la entrada del mercado no fue un militar a caballo sino un trabajador. [El Resero](/notas/el-resero-de-mataderos), de Emilio Jacinto Sarniguet, se inauguró en la plazoleta en 1934. No pertenece al capítulo de los orígenes, pero cierra el argumento: cuando el barrio quiso verse en bronce, se vio arreando hacienda. El edificio que tiene detrás, la antigua administración, es el cuerpo visible de la obra de 1889-1901 y se recorre en la guía de [patrimonio](/notas/patrimonio-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'El arroyo, el hospital y el crecimiento'
      },
      {
        kind: 'p',
        text: 'La industria dejó un apodo hídrico que la ficha de la Ciudad no edulcora. El arroyo Cildáñez fue, durante años, “el arroyo de la sangre”, porque hacia él iban los desperdicios de la faena. Hoy corre entubado y cuesta imaginarlo en la superficie, pero el puente de madera que lo cruzaba en Francisco Bilbao y San Fernando —la calle que hoy es Lisandro de la Torre— es el lugar donde el club sitúa su fundación. El arroyo era a la vez cloaca industrial y accidente geográfico del pueblo nuevo.'
      },
      {
        kind: 'p',
        text: 'La salud llegó detrás del trabajo, no antes. En 1912 se habilitaron instalaciones primitivas del hospital Juan F. Salaberry, armado con una colecta de amigos del consignatario de hacienda de ese nombre. La Nación, citada por la ficha oficial del barrio, fecha la inauguración el 3 de septiembre de 1915. Durante mucho tiempo fue el hospital del sudoeste. Su origen en una suscripción de la propia actividad ganadera dice cómo se financiaba la vida civil al lado de los corrales: con la gente del mercado, no con un plan urbano previo.'
      },
      {
        kind: 'p',
        text: 'En las décadas siguientes el barrio sumó club, boxeo, comercio sobre lo que hoy es la avenida Alberdi y una sala grande de cine. Justo Suárez, nacido en 1909 en una casa de la calle Guaminí, salió de ese mundo de mucangueros y cargadores de media res y se volvió ídolo nacional. El Cine Teatro El Plata abrió en 1945 sobre Alberdi. Nada de eso borra el origen: lo despliega. Mataderos dejó de ser solo el matadero sin dejar de ser el barrio del matadero.'
      },
      {
        kind: 'h2',
        text: 'Qué quedó en pie y qué se lee en otra guía'
      },
      {
        kind: 'p',
        text: 'El Mercado Nacional de Hacienda, como organismo, funcionó en la ciudad entre 1901 y su disolución en el proceso de reforma del Estado de comienzos de los noventa. El AGN reconstruye el trámite: la ley 23.696 y los decretos que lo declararon sujeto a privatización, hasta la adjudicación de la concesión a Mercado de Liniers S.A. en 1992. El predio y el remate siguieron siendo, para el barrio, el vecino enorme de Lisandro de la Torre. La feria dominical, creada en 1986 en la recova y sus alrededores, ocupó el espacio simbólico que el trabajo de los corrales había dejado libre los domingos.'
      },
      {
        kind: 'p',
        text: 'Quien llegue hoy por la [Feria de Mataderos](/notas/feria-de-mataderos) está parado sobre esa historia, no al lado. La torre, la planta en U y la plazoleta son el establecimiento de 1900. El baile y los puestos son una política cultural de 1986 que eligió ese escenario a propósito. Para caminar el barrio con un itinerario, la guía de [qué hacer en Mataderos](/notas/que-hacer-en-mataderos) ordena el domingo. Esta nota se queda en el origen: una mudanza sanitaria e industrial, un nombre prestado de Chicago, un apodo que ganó la pulseada y un oficio a caballo que todavía se reconoce en la esquina.'
      }
    ]
  },
  {
    slug: 'nueva-chicago-y-el-nombre-de-mataderos',
    type: 'satelite',
    pillarSlug: 'historia-de-mataderos',
    title: 'Nueva Chicago y el nombre de Mataderos: por qué el barrio se llama así',
    description:
      'Por qué Mataderos se llamó Nueva Chicago, desde cuándo se usa el nombre actual y por qué 1972 importa en la nomenclatura del barrio.',
    dek: 'Chicago prestó el apodo industrial. La faena prestó el nombre que se quedó. El club guardó los dos.',
    category: 'Historia',
    publishedAt: '2026-04-16',
    image: 'cartelMataderos',
    datos: {
      title: 'Los dos nombres',
      rows: [
        { label: 'Nombre de época', value: 'Nueva Chicago' },
        { label: 'Nombre popular', value: 'Mataderos, casi desde el inicio' },
        { label: 'Nomenclatura oficial', value: '1972, según la Legislatura' },
        { label: 'Dónde sobrevive el nombre viejo', value: 'Club Atlético Nueva Chicago' }
      ]
    },
    fuentes: [
      {
        title: '14 de abril: Día del barrio de Mataderos',
        url: 'https://cultura.legislatura.gob.ar/cultura_posts/14-de-abril-dia-del-barrio-de-mataderos1018.html',
        publisher: 'Legislatura de la Ciudad de Buenos Aires'
      },
      {
        title: 'Mataderos',
        url: 'https://buenosaires.gob.ar/gcaba_historico/laciudad/barrios/mataderos',
        publisher: 'Gobierno de la Ciudad de Buenos Aires'
      },
      {
        title: 'Historia del club',
        url: 'https://canuevachicago.com.ar/historia/',
        publisher: 'Club Atlético Nueva Chicago'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'El búsqueda “por qué se llama Mataderos” tiene una respuesta corta y otra que vale la pena. La corta: porque ahí funcionaron los mataderos públicos que reemplazaron a los Corrales Viejos. La larga explica por qué durante años los diarios escribieron Nueva Chicago y por qué ese nombre no desapareció del todo cuando el barrio ya era Mataderos para cualquiera que bajara del tranvía.'
      },
      {
        kind: 'h2',
        text: 'Qué quería decir Nueva Chicago'
      },
      {
        kind: 'p',
        text: 'A comienzos del siglo XX la comparación con Chicago era técnica. Esa ciudad del medio oeste estadounidense concentraba la industria de la carne a una escala que la Argentina agroexportadora miraba de frente. Llamar Nueva Chicago al establecimiento del oeste porteño era una forma de decir que los corrales nuevos no eran un galpón municipal más: aspiraban a ese modelo. La ficha del barrio lo deja en una oración: se lo conocía así por el parecido con la ciudad norteamericana caracterizada por su industria de la carne.'
      },
      {
        kind: 'p',
        text: 'El nombre circuló en la prensa. La Legislatura, al recordar el 1 de mayo de 1901, titula la efeméride con las palabras de la época: se inauguran los mataderos de Nueva Chicago. En ese momento el topónimo industrial era el que usaba el diario, no una curiosidad de anticuario. Quien repasa [la historia del barrio](/notas/historia-de-mataderos) ve que la faena de vacunos ya había empezado el 21 de marzo de 1900 y que 1901 agregó ovinos y porcinos. Nueva Chicago, en esos cables, era un lugar de trabajo con fecha de inauguración, no un mito.'
      },
      {
        kind: 'h2',
        text: 'El nombre que usaba la gente'
      },
      {
        kind: 'p',
        text: 'En paralelo, y casi desde el principio, se dijo Mataderos. La Legislatura es explícita: el nombre popular se oficializó en 1972. Hasta entonces la denominación había nacido “en forma tradicional”, como escribe la Ciudad, y se impuso en el uso antes de imponerse en el mapa. No hizo falta una campaña. El edificio faenaba. El barrio se llamó por lo que el edificio hacía.'
      },
      {
        kind: 'p',
        text: 'Ese desfase entre el nombre de los papeles y el nombre de la vereda dura décadas. Explica titulares viejos, el nombre del club y la confusión de quien lee una guía actual y encuentra las dos palabras en la misma cuadra. No son dos barrios. Son dos capas del mismo sitio. Una capa mira a la industria modelo del norte. La otra mira al galpón que tenía enfrente.'
      },
      {
        kind: 'h2',
        text: '1972 y lo que no cambió'
      },
      {
        kind: 'p',
        text: 'Oficializar Mataderos en 1972 ordenó la nomenclatura porteña. No refundó el barrio ni borró Nueva Chicago de la memoria institucional. El club fundado el 1 de julio de 1911 se llamó, en el acta, Foot Ball Club Los Unidos de Nueva Chicago, porque ese era el nombre del pago. Después pasó por otras denominaciones hasta fijar Club Atlético Nueva Chicago en 1930. Cuando el barrio ya se escribía Mataderos en los planos, la camiseta verde y negra seguía diciendo el nombre viejo. La historia de esa institución está en la nota del [club](/notas/club-atletico-nueva-chicago).'
      },
      {
        kind: 'p',
        text: 'Tampoco cambió el paisaje que justifica el nombre actual. La antigua administración, el mercado y más tarde la feria siguen contando la misma actividad. Quien pregunta por el nombre en la esquina de Lisandro de la Torre está, literalmente, frente a la respuesta: la torre del establecimiento que se mudó desde Parque Patricios. Para ver cómo ese edificio se protegió como monumento, conviene seguir hacia [La Recova](/notas/la-recova-de-mataderos) y hacia el [casco histórico](/notas/casco-historico-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'Cómo decirlo sin mezclar las fechas'
      },
      {
        kind: 'p',
        text: 'Una formulación que respeta las fuentes queda así. Nueva Chicago fue la denominación de la zona en los años en que se armó y se inauguró el nuevo matadero, por analogía con la industria cárnica de Chicago. Mataderos fue el nombre popular, nacido del uso, y el que la nomenclatura de la ciudad oficializó en 1972. El 14 de abril recuerda la piedra fundamental de 1889, no el bautismo de 1972. Son efemérides distintas y conviene no fundirlas en una sola oración.'
      },
      {
        kind: 'p',
        text: 'El apodo industrial quedó, además, en el habla del fútbol: decir “Chicago” en el oeste de la ciudad sigue significando el club de Mataderos, no la ciudad de Illinois. Esa economía del lenguaje es el resto visible de una comparación que, en 1900, era una política de obras públicas.'
      }
    ]
  },
  {
    slug: 'mercado-nacional-de-hacienda',
    type: 'satelite',
    pillarSlug: 'historia-de-mataderos',
    title: 'Mercado Nacional de Hacienda: qué fue y cómo empezó en Mataderos',
    description:
      'Qué fue el Mercado Nacional de Hacienda de Mataderos y Liniers: antecedentes de 1884, apertura en 1901, función y cierre del organismo en 1992.',
    dek: 'Durante casi todo el siglo XX el mercado fue el vecino que ordenaba el barrio: hacienda, consignatarios, peso y policía sanitaria en un solo predio.',
    category: 'Historia',
    publishedAt: '2026-05-21',
    image: 'torre',
    datos: {
      title: 'Fechas del mercado',
      rows: [
        { label: 'Antecedente del traslado', value: '1884, desbordes del Riachuelo' },
        { label: 'Piedra fundamental', value: '14 de abril de 1889' },
        { label: 'Comienzo oficial', value: '1 de mayo de 1901' },
        { label: 'Fin del organismo', value: 'Disolución y concesión, decretos de 1991-1992' },
        { label: 'Concesión', value: 'Mercado de Liniers S.A., Decreto 938/92' }
      ]
    },
    fuentes: [
      {
        title: 'Mercado Nacional de Hacienda',
        url: 'https://atom.mininterior.gob.ar/index.php/mercado-nacional-de-hacienda',
        publisher: 'Archivo General de la Nación'
      },
      {
        title: '1 de mayo de 1901: se inauguran los mataderos de Nueva Chicago',
        url: 'https://cultura.legislatura.gob.ar/cultura_posts/1-de-mayo-de-1901-se-inauguran-los-mataderos-de-nueva-chicago825.html',
        publisher: 'Legislatura de la Ciudad de Buenos Aires'
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
        text: 'En el habla del barrio, “el mercado” puede querer decir la feria del domingo o el predio donde durante un siglo se remató hacienda. No son la misma cosa. El Mercado Nacional de Hacienda fue un organismo del Estado, con fechas de existencia, misión y un final administrativo. La feria es una creación cultural de 1986 que usa la recova de ese conjunto. Esta nota se ocupa del primero.'
      },
      {
        kind: 'h2',
        text: 'De Parque Patricios a Liniers'
      },
      {
        kind: 'p',
        text: 'El Archivo General de la Nación fija los antecedentes en 1884. Los desbordes del Riachuelo llevaron a planear el traslado de los antiguos mercados desde Parque Patricios hacia una zona más alejada. El intendente Seeber señaló los solares cercanos a la estación Liniers. La piedra fundamental se colocó el 14 de abril de 1889, en 1890 se aprobó el inicio de las obras y el 1 de mayo de 1901 el lugar empezó a funcionar de manera oficial. El archivo anota que junto al mercado funcionó después un frigorífico.'
      },
      {
        kind: 'p',
        text: 'La cronología de la faena, contada por la Ciudad y por la Legislatura, encaja con esa apertura sin repetirla palabra por palabra. El 21 de marzo de 1900 se inauguró el establecimiento y se faenó el primer vacuno, con Roca y el intendente Bullrich. Durante ese primer tramo la matanza fue de vacunos. El 1 de mayo de 1901 se sumaron instalaciones para porcinos y ovinos. Quien arma la [historia de Mataderos](/notas/historia-de-mataderos) tiene que sostener las dos fechas: 1900 es la faena; 1901 es el mercado en funciones, que es la fecha que el archivo toma como nacimiento de la entidad.'
      },
      {
        kind: 'h2',
        text: 'Qué hacía, además de vender vacas'
      },
      {
        kind: 'p',
        text: 'La misión que describe el AGN no era solo concentrar animales. El mercado debía hacer posible las transacciones de ganado vacuno y porcino en pie y ejercer el poder de policía que correspondía al Estado. Fiscalizaba las operaciones para que el productor tuviera una transacción corregida, inscribía consignatarios, matarifes-abastecedores y frigoríficos, y certificaba el peso y el registro de la compra-venta. Era, en criollo, la balanza y el escribano de la carne que después comía la ciudad y que salía al mundo.'
      },
      {
        kind: 'p',
        text: 'Esa función explica el personal y el tono del barrio vecino. Hacían falta jinetes, no solo oficinistas. La figura del resero —el trabajador que aparta y conduce la hacienda hasta el mercado, el frigorífico o el matadero— no es un adorno de la feria: es el oficio que el predio empleaba. Por eso el monumento encargado en 1929 para la entrada se llama como ese oficio. La nota de [El Resero](/notas/el-resero-de-mataderos) sigue ese hilo.'
      },
      {
        kind: 'h2',
        text: 'El nombre y el fin del organismo'
      },
      {
        kind: 'p',
        text: 'El archivo registra otras formas del nombre: Mercado de Liniers y Mercado de Haciendas de Liniers. La doble pertenencia geográfica es real. El predio quedó en el límite que la ciudad vive como Mataderos y como Liniers, y durante años “Liniers” fue la marca comercial del remate aunque la administración histórica mire a la avenida de los Corrales. La ficha de monumentos ubica la antigua administración en la confluencia que el barrio reconoce como su casco.'
      },
      {
        kind: 'p',
        text: 'En 1950 el mercado y el frigorífico pasaron al Ministerio de Economía. Con la ley 13.991 se creó, con esos capitales, el Instituto Ganadero Argentino, luego Instituto Nacional de Carnes. El final de la entidad nacional llegó con la reforma del Estado. La ley 23.696 de 1989 y el Decreto 2476/90 lo declararon sujeto a privatización. El Decreto 1239/91 le modificó la estructura, el Decreto 2284/91 avanzó en la disolución y el Decreto 2515/91 autorizó la licitación de las instalaciones y de la actividad. El Decreto 938/92 adjudicó la concesión a Mercado de Liniers S.A. El AGN cierra ahí la historia del organismo: 1901-1992.'
      },
      {
        kind: 'p',
        text: 'El edificio de la administración siguió en pie, protegido desde 1979, y la [Feria de Mataderos](/notas/feria-de-mataderos) ya funcionaba en la recova desde 1986. El mercado como reparto de hacienda y la feria como reparto de artesanía y música convivieron un tiempo y no deben contarse como si fueran el mismo evento. Uno pesaba novillos. La otra, los domingos, llena de gente la misma esquina.'
      }
    ]
  },
  {
    slug: 'justo-suarez-el-torito-de-mataderos',
    type: 'satelite',
    pillarSlug: 'historia-de-mataderos',
    title: 'Justo Suárez, el Torito de Mataderos: vida del boxeador del barrio',
    description:
      'Quién fue Justo Suárez, el Torito de Mataderos: nacimiento en 1909, oficios en el matadero, carrera de boxeo y el apodo que el barrio sigue usando.',
    dek: 'Antes del ring cargaba medias reses. El apodo no se lo puso un periódico de Buenos Aires centro: se lo ganó en los corrales.',
    category: 'Personajes',
    publishedAt: '2026-06-25',
    image: 'bustoSuarez',
    datos: {
      title: 'Para no mezclar al Torito con el club',
      rows: [
        { label: 'Nombre', value: 'Justo Antonio Suárez' },
        { label: 'Nacimiento', value: '5 de enero de 1909' },
        { label: 'Casa', value: 'Guaminí 2740, según el perfil de La Prensa' },
        { label: 'Oficios de pibe', value: 'Canillita, lustrabotas, mucanguero, cargador de medias reses' },
        { label: 'Muerte', value: '1938' },
        { label: 'El otro Torito', value: 'También es apodo del Club Atlético Nueva Chicago' }
      ]
    },
    fuentes: [
      {
        title: 'El Torito de Mataderos',
        url: 'https://www.laprensa.com.ar/El-Torito-de-Mataderos-533297.note.aspx',
        publisher: 'Diario La Prensa'
      },
      {
        title: 'Mataderos celebra sus 132 años de vida',
        url: 'https://cosasdebarrioweb.com.ar/2021/04/27/mataderos-celebra-sus-132-anos-de-vida/',
        publisher: 'Cosas de Barrio'
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
        text: 'Justo Antonio Suárez es el primer gran ídolo popular del deporte argentino que el barrio puede reclamar con domicilio. Nació el 5 de enero de 1909, hijo de Martín Norberto Suárez y de Luisa María Catalina Sbarbaro, en una casa de Guaminí 2740, a pocas cuadras de la traza de lo que hoy es la General Paz. La Prensa reconstruye esa infancia sin adornarla: fue el hijo número quince de un padre que tuvo veinticinco entre dos matrimonios, y a los nueve años ya había dejado la escuela.'
      },
      {
        kind: 'h2',
        text: 'El oficio antes que el guante'
      },
      {
        kind: 'p',
        text: 'Trabajó de canillita y de lustrabotas, y de mucanguero: así se llamaba a los pibes que juntaban la grasa de los animales faenados y la vendían a los fabricantes de jabón, a diez centavos el balde. De adolescente entró al frigorífico Barreta y Mazzoni a cargar medias reses. La Prensa anota el dato que explica el físico: un morocho chico, de risa ancha, con la musculatura que deja acarrear cerca de doscientos kilos. El boxeo, en ese Mataderos, no era un deporte de club inglés. En la calle los asuntos se arreglaban a puño y a cuchillo, y de la trenza al ring había un paso.'
      },
      {
        kind: 'p',
        text: 'Esa procedencia importa para leer el apodo. “Torito de Mataderos” no describe solo un estilo de pelea. Describe de dónde salía. El barrio de la [historia de los corrales](/notas/historia-de-mataderos) producía ese cuerpo y ese público. Cuando después el club verde y negro heredó el mismo apodo, las dos historias quedaron pegadas y conviene separarlas: una es un boxeador muerto en 1938; la otra es una institución fundada en 1911. Las dos se dicen Torito. No son la misma persona.'
      },
      {
        kind: 'h2',
        text: 'La carrera, sin convertirla en récord de memoria'
      },
      {
        kind: 'p',
        text: 'Empezó en el fondo de su casa, con los hermanos Arturo, Gregorio, Obdulio y Edmundo, todos metidos en el pugilismo en algún momento. A Gregorio le decían el Molino de Mataderos. Obdulio fue campeón porteño de peso gallo. Justo subió por primera vez a un ring a los quince, en 1924, y empató con Damián Dobal en cinco rounds de dos minutos en el Club Social Argentino de Flores. El boxeo ya no estaba prohibido en la ciudad: la pelea de Luis Ángel Firpo con Jack Dempsey, en 1923 en Nueva York, lo había sacado de la sombra. Suárez admiraba a Firpo y peleaba con esa bravura.'
      },
      {
        kind: 'p',
        text: 'La Prensa sigue el ascenso de categoría sin romanticismo. Campeón de novicios de Buenos Aires en 1924, título argentino de los gallos al año siguiente, cetros argentino y sudamericano de los plumas en 1926, rey sudamericano de los livianos en 1927. Hasta 1928 armó una racha amateur de 48 presentaciones, con 43 triunfos —quince por nocaut—, tres empates y dos combates sin decisión. José Lectoure, entonces mánager y después nombre del Luna Park, se fijó en él. Esa es la escala real del personaje: un pibe del frigorífico que en cuatro años pasó de novicio a figura sudamericana.'
      },
      {
        kind: 'h2',
        text: 'Qué no hace falta inventar'
      },
      {
        kind: 'p',
        text: 'La fama internacional, el cruce con Kid Chocolate y la enfermedad que lo mató joven circulan en casi todos los perfiles. Esta nota se queda en lo que el perfil de La Prensa documenta con nombre, domicilio y cifras, y en el dato seco de la muerte en 1938. No hace falta un round inventado para entender por qué una avenida del barrio se llama Justo Suárez y por qué el estadio de Nueva Chicago da a esa calle. El club cuenta su propia historia en otra nota; el boxeador es el vecino que le prestó el nombre a la geografía.'
      },
      {
        kind: 'p',
        text: 'En la esquina de Alberdi y Murguiondo, [El Cedrón](/notas/el-cedron-de-mataderos) guarda la memoria porteña de otra manera, con cuadros y con pizza. Suárez pertenece al mismo paisaje de ídolos de barrio, anterior a la feria y posterior al primer hospital. Quien recorra el [domingo en Mataderos](/notas/domingo-en-mataderos) va a cruzar el apellido en una avenida antes de cruzar un monumento. Conviene saber que el apellido fue un oficio, no una marca.'
      }
    ]
  },
  {
    slug: 'club-atletico-nueva-chicago',
    type: 'satelite',
    pillarSlug: 'historia-de-mataderos',
    title: 'Club Atlético Nueva Chicago: historia, colores y estadio en Mataderos',
    description:
      'Historia del Club Atlético Nueva Chicago: fundación el 1 de julio de 1911, verde y negro, apodo Torito y estadio de Justo Suárez 6900.',
    dek: 'El club se fundó en un puente sobre el Cildáñez, se vistió con los colores de una chata de pasto y se quedó con el nombre que el barrio dejó atrás.',
    category: 'Clubes',
    publishedAt: '2026-07-14',
    image: 'tribunaChicago',
    datos: {
      title: 'Datos del club',
      rows: [
        { label: 'Fundación', value: '1 de julio de 1911' },
        { label: 'Nombre original', value: 'Foot Ball Club Los Unidos de Nueva Chicago' },
        { label: 'Nombre actual', value: 'Club Atlético Nueva Chicago, desde el 19 de febrero de 1930' },
        { label: 'Colores', value: 'Verde y negro' },
        { label: 'Estadio', value: 'Justo Suárez 6900, República de Mataderos' },
        { label: 'Primer partido en esa cancha', value: '27 de octubre de 1940' },
        { label: 'Clásico', value: 'All Boys' }
      ]
    },
    fuentes: [
      {
        title: 'Historia',
        url: 'https://canuevachicago.com.ar/historia/',
        publisher: 'Club Atlético Nueva Chicago'
      },
      {
        title: 'Estadio',
        url: 'https://canuevachicago.com.ar/estadio/',
        publisher: 'Club Atlético Nueva Chicago'
      },
      {
        title: 'Club Atlético Nueva Chicago',
        url: 'https://es.wikipedia.org/wiki/Club_Atl%C3%A9tico_Nueva_Chicago',
        publisher: 'Wikipedia en español'
      },
      {
        title: '14 de abril: Día del barrio de Mataderos',
        url: 'https://cultura.legislatura.gob.ar/cultura_posts/14-de-abril-dia-del-barrio-de-mataderos1018.html',
        publisher: 'Legislatura de la Ciudad de Buenos Aires'
      }
    ],
    blocks: [
      {
        kind: 'p',
        text: 'Nueva Chicago es el club de Mataderos y, a la vez, el archivo andante del nombre viejo del barrio. La página oficial fija la fundación el 1 de julio de 1911. Un grupo de vecinos jóvenes se juntaba en el puente de madera de Francisco Bilbao y San Fernando —hoy Lisandro de la Torre—, sobre el arroyo Cildáñez, y resolvió crear un club de fútbol. Los nombres que el club conserva son José Varela, Carlos Rodríguez, Felipe Maglio, Benjamín Picazza, Cristóbal Cambiasso, Antonio Carini, Gastón Lespy y Sergio Varela. El primer nombre fue Foot Ball Club Los Unidos de Nueva Chicago.'
      },
      {
        kind: 'h2',
        text: 'De dónde salen el verde y el negro'
      },
      {
        kind: 'p',
        text: 'El relato de los colores es el que el propio club publica, y hay que leerlo como tradición institucional, no como acta notarial de un instante. Se barajaron el rojo y blanco de Alumni y el celeste y blanco de Racing. En eso pasó una chata cargada de fardos de pasto, pintada de verde y negro, por la avenida Campana —hoy Crovara— hacia los mataderos nuevos. José Varela dijo que esos serían los colores. La chata, cuenta el club, la llevaba el paisano Leopoldo Roldán. La anécdota explica por qué la camiseta no copia a un club grande: copia un carro que iba a la faena.'
      },
      {
        kind: 'p',
        text: 'El nombre también siguió el barrio y después se le independizó. Los Unidos de Nueva Chicago duró hasta 1915. En 1917, al volver a afiliarse, la institución ya no pudo usar el nombre primitivo y quedó como Foot Ball Club Nueva Chicago. El 19 de febrero de 1930 adoptó el nombre definitivo, Club Atlético Nueva Chicago. Para entonces el habla popular ya decía Mataderos, pero el club no se rebautizó. La Legislatura lo anota al revés y con la misma conclusión: cuando el barrio oficializó su nombre en 1972, Nueva Chicago quedó para el fútbol. El contexto está en la nota sobre [el nombre del barrio](/notas/nueva-chicago-y-el-nombre-de-mataderos).'
      },
      {
        kind: 'h2',
        text: 'La cancha de Justo Suárez'
      },
      {
        kind: 'p',
        text: 'La primera cancha, según el club, salió de terrenos desocupados entre Lisandro de la Torre, Tandil, Chascomús y Jachal —hoy Timoteo Gordillo—, con gestión de vecinos y de autoridades del Mercado de Hacienda. Alejandro Morh, funcionario del mercado, está en ese relato como donante. Años después la ordenanza 11.813 entregó los terrenos de Francisco Bilbao al 6900, hoy avenida Justo Suárez. Habían sido un basurero municipal de quema a cielo abierto. Socios y vecinos los rellenaron. El 27 de octubre de 1940 hubo doble festejo: el club se coronó en Tercera y estrenó la cancha, todavía con habilitación provisoria. La habilitación definitiva llegó el 7 de mayo de 1941, en el Boletín Oficial 643 de AFA.'
      },
      {
        kind: 'p',
        text: 'Hoy el estadio está en Justo A. Suárez 6900, entre el barrio Manuel Dorrego —Los Perales— y el resto de Mataderos. El club lo llama también República de Mataderos, nombre de la tribuna popular local, y publica una capacidad de 8.000 sentados y 17.000 de pie, 25.000 en total. Otras fuentes dan cifras distintas: conviene citar la del club y no convertirla en un número único. La calle del estadio recuerda a [Justo Suárez](/notas/justo-suarez-el-torito-de-mataderos), el boxeador. El apodo “Torito de Mataderos” se usa para los dos. En la cancha designa al equipo. En la biografía designa al púgil de Guaminí.'
      },
      {
        kind: 'h2',
        text: 'El clásico y el primer ascenso'
      },
      {
        kind: 'p',
        text: 'El clásico es con All Boys, el llamado Superclásico del Ascenso. En 1919, un campeonato de Intermedia irregular terminó ascendido a los dos primeros de cada zona para llenar una Primera que se había vaciado por la ruptura de la asociación. Chicago le ganó la revancha a All Boys 6 a 0 en Mataderos y el 30 de noviembre de 1919 subió a Primera al vencer 4 a 0 a Argentinos Juniors, de visitante. No es el único ascenso de la historia del club, y esta nota no los enumera todos: el primero alcanza para mostrar que, ocho años después del puente, el equipo del matadero ya jugaba en la máxima categoría.'
      },
      {
        kind: 'p',
        text: 'Ir a la cancha no reemplaza la visita al casco, ni al revés. El domingo de feria y el domingo de fútbol pueden coincidir y complicar el viaje. Quien arme el día con la guía de [qué hacer](/notas/que-hacer-en-mataderos) puede dejar el estadio como una parada propia, en Justo Suárez, y el casco como otra, en Lisandro de la Torre. Son el mismo barrio y no son la misma esquina.'
      }
    ]
  }
];
