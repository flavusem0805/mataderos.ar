# Fuentes continuas para la Agenda de Mataderos

Catálogo operativo de fuentes de datos consultables de manera periódica para mantener y ampliar `/agenda` ([`AGENDA_ITEMS`](../src/lib/agenda-data.ts)) más allá de la portada general de `buenosaires.gob.ar`. Está organizado por tipo de fuente e incluye reglas geográficas y editoriales para no mezclar Mataderos con otros barrios de la Comuna 9.

> Última revisión: **25 de noviembre de 2026**. Sumá nuevas fuentes o sedes acá mismo mediante PR cuando aparezcan espacios culturales, clubes o ferias verificables en el barrio.

---

## 1. Prensa local y agendas de proximidad

Son las fuentes que mejor capturan convocatorias barriales (actos conmemorativos, campañas comerciales, jornadas parroquiales, actividades en clubes y consejos vecinales).

| Medio / Fuente | URL de consulta | Qué publica con frecuencia | Precauciones editoriales |
| --- | --- | --- | --- |
| **Aquí Mataderos** (sección Agenda) | https://aquimataderosonline.com.ar/agenda/ | Programación mensual de El Plata, Noche de los Templos, Noche de los Museos, campañas del Centro Comercial Alberdi, Foro de la Memoria, Consejo Consultivo. | Chequear siempre la **fecha de publicación** y la **dirección**: mezcla noticias de Liniers/Parque Avellaneda/Legislatura y a veces reutiliza placas o epígrafes de años anteriores. |
| **BarriosComuna9** (Mataderos / Comuna 9) | https://barrioscomuna9.com.ar/mataderos-noticias/ | Recorridos patrimoniales, agenda parroquial, notas mensuales de cultura barrial y reseñas de eventos de Mataderos. | Filtrar notas de `liniers-noticias` o `parque-avellaneda` (p. ej. Chacra de los Remedios). |
| **Cosas de Barrio** | https://cosasdebarrioweb.com.ar/ | Cobertura de comercios de Av. Alberdi (`Sale Mataderos`), homenajes y grillas de Feria de Mataderos, ciclos en Vecchia República. | Medio comunal amplio; confirmar que la sede quede dentro de Mataderos. |
| **Línea Oeste** | https://www.lineaoeste.com.ar/noticias.php | Campañas comerciales (`La Oferta Imposible`), talleres abiertos de El Plata, escuelas y clubes del oeste porteño. | Cubre Comunas 9 y 10; verificar dirección antes de cargar. |
| **Avispados** | https://avispados.com.ar/ | Actividades vecinales, patrimonio de Los Perales, clubes y temas de Comuna 9. | Revisar año y barrio exacto. |
| **Info Mataderos** | http://infomataderos.com.ar/ | Novedades locales, convocatorias culturales y notas de servicio del barrio. | Suele replicar gacetillas de CABA; confirmar sede específica en Mataderos. |
| **Prensa Libre Online** (CABA) | https://prensalibreonline.com.ar/ | Desgloses por barrio de eventos masivos porteños (templos, museos, ferias). | En ocasiones etiqueta actividades de *Parque Avellaneda / Chacra de los Remedios* como «en Mataderos»; verificar siempre la esquina. |
| **Barriada** | https://www.barriada.com.ar/ | Notas históricas, bares y pizzerías notables, parroquias y patrimonio porteño. | Útil para contexto y fichas estables; corroborar vigencia si se toma un horario. |

---

## 2. Carteleras, ticketeras y directorios filtrables

Permiten monitorear programación cultural, teatral, musical y ferias con fecha, horario y precio real sin depender de notas de prensa.

| Plataforma | URL directa para Mataderos / CABA | Qué cubre en el barrio |
| --- | --- | --- |
| **Alternativa Teatral · Cultural de la República** | https://www.alternativateatral.com/espacio7658-cultural-de-la-republica | Cartelera oficial, reservas y modalidad de entrada (*a la gorra consciente* / arancelada) de la sala de Av. Larrazábal 1346. |
| **Alternativa Teatral · Vecchia República** | https://www.alternativateatral.com/espacio7786-vecchia-republica | Archivo y funciones programadas en Av. Larrazábal 1251. |
| **Qué Hacemos** (Metabuscador) | https://www.quehacemos.com.ar/venues/cultural-de-la-republica | Espejo cronológico útil para detectar funciones en salas independientes de Mataderos y en El Plata. |
| **Pogo · Bar de Glorias** | https://pogo.ar/lugar/bar-de-glorias/ | Recitales, fechas y shows en *El Bar del Glorias* (Andalgalá 1982). Ver también cartelera general CABA: https://pogo.ar/ciudad/caba/ (filtrando Mataderos / Andalgalá). |
| **Eleven Flow** | https://elevenflow.app/ | Fichas de recitales con precio base verificado directamente contra Passline (útil para confirmar tarifas de shows en El Bar del Glorias). |
| **Passline** | https://www.passline.com/ | Ticketera donde venden shows musicales y cenas/almuerzos show en *El Bar del Glorias* (p. ej. productora *Producciones marianshow*). Buscar `"Bar del Glorias"` o `"Mataderos"`. |
| **Vamos Feria** | https://www.vamosferia.com/ferias/guia/feria-de-mataderos | Guía práctica de la Feria de Mataderos y listado con fechas confirmadas de *Ferias de Manualistas — Parque Alberdi*. |
| **EZ Ferias (EmprenZona)** | https://ferias.emprenzona.com.ar/ y https://ferias.emprenzona.com.ar/ferias-navidenas | Directorio actualizado de ferias de emprendedores, artesanías y ediciones navideñas en CABA (incluye Feria de Mataderos y Parque Alberdi). |
| **Vamos Eventos** | https://www.vamoseventos.com/venue/feria-de-mataderos-buenos-aires y https://www.vamoseventos.com/venue/cine-teatro-el-plata-buenos-aires | Registro por sede de fechas pasadas y próximas de Feria de Mataderos y Cine Teatro El Plata. |
| **TuEntrada** / **Índice Cultural** | https://tuentrada.com/ y https://indicecultural.com.ar/ | Venta alternativa y gacetillas de obras en gira que hacen función en Cine Teatro El Plata. |

---

## 3. Subportales específicos del GCBA y organismos públicos

Más allá de la home de `buenosaires.gob.ar`, estos endpoints concentran las grillas concretas que afectan al barrio:

| Organismo / Subportal | URL exacta | Qué revisar | Frecuencia sugerida |
| --- | --- | --- | --- |
| **Linda BA** | https://linda.buenosaires.gob.ar/ | Eventos destacados por barrio (`Mataderos`), ciclos de tango (*Milonga en El Plata*), teatro en El Plata y ferias gastronómicas/culturales. | Semanal |
| **Turismo BA · Qué hacer esta semana** | https://turismo.buenosaires.gob.ar/es/article/que-hacer-esta-semana | Programación semanal curada de CABA (incluye El Plata, Feria de Mataderos y noches temáticas con geolocalización). | Semanal (martes/jueves) |
| **Turismo BA · Feria de Mataderos** | https://turismo.buenosaires.gob.ar/es/otros-establecimientos/feria-de-mataderos | Temporada oficial (marzo a diciembre, domingos 11 a 19 h), feriados patrios especiales y suspensión por lluvia. | Mensual / fechas patrias |
| **CTBA · Cine Teatro El Plata** | https://complejoteatral.gob.ar/teatro/cine-teatro-el-plata/ | Obras teatrales en cartel, precios (platea / pullman), descuentos y links de boletería oficial. | Quincenal / cambio de mes |
| **Boletín Oficial GCBA (Anexos CTBA)** | https://boletinoficial.buenosaires.gob.ar/ | Resoluciones anuales de programación del Complejo Teatral (p. ej. temporada anual y ciclo *Orquesta del Plata*). | Estacional / anual |
| **Animales BA (Móviles veterinarios)** | https://buenosaires.gob.ar/atencion-veterinaria-y-castraciones-gratuitas | Cronograma mensual de operativos en **Plaza Salaberry (Mataderos)**: vacunación antirrábica sin turno y atención clínica / castración / ecografía con turno vía miBA. | Semanal / mensual |
| **Espacio Público · Manualistas y Artesanos** | https://buenosaires.gob.ar/gcaba_historico/espaciopublicoehigieneurbana/ferias/ferias-de-interes-social/ferias-de-manualistas | Días y horarios vigentes de la **Feria de Manualistas de Parque Alberdi** (domingos y feriados de 10 a 20 h). | Estacional |
| **Espacio Público · FIAB (Ubicaciones)** | https://buenosaires.gob.ar/gcaba_historico/ubicaciones-y-horarios | Día, cuadra y horario de **FIAB 10 — Mataderos** (`Basualdo 800`, martes de 8 a 14 h). *Nota*: páginas viejas del GCBA de 2020 listan esquinas discontinuadas; usar siempre esta URL activa. | Mensual / cambios de feriados |
| **Programa Cultural en Barrios (PCB)** | https://buenosaires.gob.ar/noticias/los-barrios-se-llenan-de-arte-y-cultura y https://buenosaires.gob.ar/gcaba_historico/cultura/promocioncultural/programacion-pcb | Muestras de fin de año, apertura de talleres e intervenciones de los centros culturales barriales (**C.C. Macedonio Fernández**). | Marzo, julio y nov–dic |
| **Red de Bibliotecas Públicas GCBA** | https://buenosaires.gob.ar/gcaba_historico/node/bibliotecas-en-verano | Horarios regulares y de verano de la **Biblioteca Benito Lynch** (Pje. Yrupé 6714). | Estacional |
| **Festivales BA / Noches de la Ciudad** | https://festivalesba.org/ y https://www.lanochedelostemplos.com/ | Sedes habilitadas en Mataderos durante *La Noche de los Museos* y *La Noche de los Templos*. | Anual (oct–nov) |
| **Legislatura Porteña (Cultura)** | https://www.legislatura.gob.ar/ | Declaraciones de interés cultural, aniversarios barriales (*Los Perales*, clubes, escuelas) y muestras vinculadas a Mataderos. | Mensual |

---

## 4. Canales directos, sedes e instituciones del barrio

Para validar horarios finos, suspensiones por lluvia o funciones de último momento conviene consultar directamente a las sedes y entidades de Mataderos (varias difunden únicamente por Instagram o mail):

| Espacio / Institución | Dirección / Canal | Notas operativas |
| --- | --- | --- |
| **Cine Teatro El Plata** | Av. Juan B. Alberdi 5765 · IG `@cineteatroelplata` | Ver nota técnica en [`el-plata-instagram.ts`](../src/lib/el-plata-instagram.ts): Instagram redirige a login en scraping automatizado; chequear manualmente o cruzar con CTBA/Linda BA. |
| **Feria de Mataderos** | Av. Lisandro de la Torre y Av. de los Corrales · IG `@feriademataderos` · `feriademataderos_mc@buenosaires.gob.ar` | Publica la grilla artística de cada domingo y avisos de suspensión por lluvia el mismo fin de semana. |
| **Centro Comercial Alberdi** | Av. Juan B. Alberdi (sede) · IG `@centrocomercialalberdi` | Impulsa *Sale Mataderos*, *La Oferta Imposible*, Semana de la Tradición y movidas comerciales navideñas en Alberdi, De los Corrales y Directorio. |
| **El Bar del Glorias (Club Glorias Argentinas)** | Andalgalá 1982 | Bar notable con cenas show de humor, tributos y bailes. Cruzar vía Pogo, Passline y prensa del espectáculo. |
| **Cultural de la República** | Av. Larrazábal 1346 · IG `@culturaldelarepublicateatro` · Tel. `11 3188-4661` | Sala independiente de 80 butacas; agenda principalmente en Alternativa Teatral e Instagram. |
| **Vecchia República** | Av. Larrazábal 1251 · Tel. `11 3803-0972` | Bar cultural y archivo barrial; participa en Noche de los Museos, Semana del Patrimonio y ciclos de tango/milonga. |
| **C.C. Macedonio Fernández** | Martiniano Leguizamón 1470 · IG `@ccmacedonio` · `ccmacedonio@gmail.com` · Tel. `4687-0063` | Centro cultural del PCB en Mataderos; talleres gratuitos de marzo a noviembre y muestras abiertas en dic. |
| **Foro de la Memoria de Mataderos** | `foromataderos@gmail.com` | Organiza recorridos por el Casco Histórico, aniversario del barrio (abril) y festejos del Día de la Tradición. |
| **Museo Criollo de los Corrales** | Av. de los Corrales 6436 · Tel. `4687-1949` | Horario habitual lun a vie y domingos frente a la Feria; consultar por exposiciones temporarias y charlas. |
| **Bibliotecas del barrio** | **Benito Lynch** (Pje. Yrupé 6714 · Tel. `4687-1977`) · **Popular José Enrique Rodó** (Andalgalá 2051 · Tel. `4686-5631`) | Ciclos de lectura, narración y actividades infantojuveniles durante el ciclo lectivo y verano. |
| **Parroquias del barrio** | **San Vicente de Paúl** (Manuel Artigas 6150 · Tel. `11 5026-9638`) · **Ntra. Sra. de la Misericordia** (Av. Larrazábal 2394) | Conciertos corales, Noche de los Templos, patronales y ferias solidarias parroquiales. |
| **Club Atlético Nueva Chicago** | Estadio República de Mataderos (`nuevachicago.com.ar` / Mundo Ascenso) | Incorporar partidos de local cuando inicie la temporada oficial y eventos comunitarios/murales en el estadio o la Feria. |
| **Consejo Consultivo Comuna 9** | `mesacoordinadoraccc9@gmail.com` | Asamblea mensual rotativa entre Mataderos, Liniers y Parque Avellaneda: incluirla en `/agenda` **solo los meses en que sesione en Mataderos** (ej. Club Cárdenas). |

---

## 5. Criterio editorial y límites geográficos para cargar eventos

1. **Alcance estricto de barrio (`barrio: 'Mataderos'`, `ambito: 'Mataderos'`)**:
   - No cargar actividades ubicadas en **Parque Avellaneda** (p. ej. *Chacra de los Remedios / Casona de los Olivera* en Av. Directorio 4000–4200 y Lacarra) ni en **Liniers** (p. ej. *Club Larrazábal* en Av. Larrazábal 829, *Santuario San Pantaleón* en Monte 6869 o *Capilla de los Santos de los Últimos Días* en Ulrico Schmidl 7636).
2. **Validación temporal (anti-reciclado)**:
   - Comprobar que coincida **día de la semana + fecha + año** en la fuente primaria o ticketera (no tomar notas de 2025 reindexadas con fecha de rastreo reciente).
3. **Transparencia de precio y requisitos**:
   - Distinguir explícitamente entrada gratuita sin reserva, *a la gorra consciente*, turno previo obligatorio (ej. miBA) y valor base de ticketera con su enlace fuente.
   - Si un dato proviene de una única red social sin respaldo en cartelera o web oficial, aclararlo en `source.note`.
4. **Archivos del repo a sincronizar en cada barrido**:
   - Eventos locales fallback y tabs de home: [`src/lib/agenda-data.ts`](../src/lib/agenda-data.ts) (`AGENDA_ITEMS` y `AGENDA_SPOTS`).
   - Copete de `/agenda`: [`src/app/agenda/page.tsx`](../src/app/agenda/page.tsx) y lista auxiliar [`TICKER_ITEMS`](../src/lib/data.ts).
   - Base productiva (si está poblada): tabla `public.events` en [`supabase/schema.sql`](../supabase/schema.sql).
