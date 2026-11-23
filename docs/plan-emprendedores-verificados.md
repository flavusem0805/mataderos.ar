# Plan de implementación: Emprendedores del barrio verificados

Documento de trabajo para el agente de implementación (Antigravity) sobre el repo [flavusem0805/mataderos.ar](https://github.com/flavusem0805/mataderos.ar). Está escrito en castellano rioplatense, en voseo, y se apoya en la estructura real del proyecto al 22 de noviembre de 2026 (hora de America/Buenos_Aires). No inventes precios: donde haga falta un valor, dejá el placeholder **TBD**. No publiques ni hagas merge sin que Flavio lo pida.

---

## 1. Contexto del repo hoy

Stack actual: Next.js 15 (App Router), React 19, Tailwind 3.4, TypeScript, deploy en Vercel desde `main`. Dominio de producción: `mataderos.ar`. Cliente de Supabase ya existe, pero Auth, Storage y un modelo con dueño todavía no.

Archivos y piezas que este plan toca o tiene que respetar:

| Pieza | Ruta | Qué implica |
| --- | --- | --- |
| Home | `src/app/page.tsx` | Server Component que llama `fetchBusinesses()` y `fetchEvents()`, y renderiza `PortalClient`. |
| Home visual | `src/components/PortalClient.tsx` | Header, hero, notas, agenda, Viví, archivo y la sección `#directorio` («Comercios del barrio») más el bloque `#sumar-comercio` (lead por WhatsApp). |
| Tipos y datos curados | `src/lib/data.ts` | `Business`, `BUSINESSES`, categorías y zonas. Hoy hay 6 comercios de ejemplo; 3 con `hasSubdomain: true` (`veterinariaflavio`, `tostadorescastro`, `cantinaloscorrales`). |
| Cliente Supabase | `src/lib/supabase.ts` | Cliente anónimo con `@supabase/supabase-js`. Si faltan env vars o la tabla está vacía, cae a los datos locales. No hay cliente de servidor ni sesión. |
| Esquema actual | `supabase/schema.sql` | Tablas `businesses`, `articles` y `events`. RLS solo de lectura pública (`select using (true)`). Sin `owner_id`, sin Auth, sin Storage. |
| Multi-tenant | `src/middleware.ts` | Reescribe `slug.mataderos.ar` (y `slug.localhost`) a `/comercio/[slug]`. Ignora `www`, el dominio raíz, `*.vercel.app`, `/_next`, `/api` y `/comercio`. |
| Ficha de comercio | `src/app/comercio/[slug]/page.tsx` | Landing paga/oficial del local. El copy ya dice «Comercio verificado en Mataderos», pero eso hoy es solo un texto, no un flujo de revisión. |
| SEO de notas | `src/app/notas/[slug]/page.tsx`, `src/app/sitemap.ts` | Patrón a copiar: `generateMetadata`, canonical, Open Graph `es_AR` y JSON-LD (`Article` + `BreadcrumbList`) con `<script type="application/ld+json">`. El sitemap hoy lista la home, `/notas` y cada nota. |
| Tipografía y tokens | `src/app/layout.tsx`, `tailwind.config.ts`, `src/app/globals.css` | Big Shoulders Display (local), Fraunces, Source Sans 3, IBM Plex Mono. Colores `chicago`, `carbon`, `ladrillo`, `cuero`, `pampa`, `celeste`. Clases `editorial-container`, `section-pad`, `color-field`, `type-meta`, `snap-row`. Targets de 48 px. |
| Imágenes remotas | `next.config.mjs` | `images.remotePatterns` solo admite `images.unsplash.com`. Hay que sumar el host de Supabase Storage. |
| Env | `.env.example` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_ROOT_DOMAIN=mataderos.ar`. Faltan service role, URL del sitio y claves de Mercado Pago. |
| Dependencias | `package.json` | Está `@supabase/supabase-js`. No está `@supabase/ssr`. No hay SDK de Mercado Pago. |
| Legal | — | No existen `/privacidad` ni `/terminos`. El WhatsApp del portal en el footer es un placeholder (`5491100000000`). |

Regla de convivencia: **no mezclar emprendedores con `businesses`**. El directorio de comercios es para locales con dirección fija y, en el plan pago, subdominio `slug.mataderos.ar`. Los emprendedores y feriantes son otra entidad, con verificación propia, landing gratuita en `/emprendedores/[slug]` y un upgrade a Pro. Los slugs, eso sí, tienen que vivir en un **espacio de nombres compartido** para que un Pro no pise un comercio (ni al revés).

---

## 2. Objetivos

1. Ofrecer un espacio gratuito y permanente, «Emprendedores del barrio verificados», para feriantes y emprendedores de Mataderos.
2. Que puedan registrarse, completar un onboarding corto y publicar una landing de demo con lo esencial: qué ofrecen, dónde están, redes y WhatsApp, un PDF de catálogo y unas pocas fotos.
3. Que «verificado» signifique una revisión humana del equipo, con insignia visible, y no un sello municipal ni una garantía de calidad.
4. Dejar lista una vía de upgrade a Pro (pago mensual) y otras formas de ingreso, sin que el plan Free deje de existir nunca.
5. Premiar a los primeros 50 perfiles verificados con un año de Pro de regalo («Fundadores») y, al vencer, devolverlos a Free **sin apagarles la landing**.
6. Integrar la sección en la home y diferenciarla con claridad del directorio de comercios. La captación entra por `/sumate`, con una puerta para feriantes y otra para comercios.
7. Cumplir la Ley 25.326 (protección de datos personales) y un mínimo de términos de uso antes de pedir registro.

No es objetivo del MVP armar un marketplace con checkout, un feed social ni reemplazar el alta actual de comercios por WhatsApp (`#sumar-comercio`).

---

## 3. Viajes de usuario

### 3.1 Emprendedor o feriante

1. Entra por la home («Sumate» o «Sumá tu emprendimiento»), por `/sumate`, por `/sumate/emprendedores` o, si ya decidió registrarse, por `/entrar`.
2. Se registra (en el MVP, magic link por mail). Acepta términos y política de privacidad.
3. Completa el asistente de onboarding, previsualiza la landing y envía a revisión.
4. Recibe el estado: pendiente, pedido de cambios, verificado o rechazado.
5. Si queda verificado, su ficha aparece en `/emprendedores` y, si hay cupo, en la franja de la home. Si entra en la cohorte Fundadores, se activa Pro por 12 meses y se muestra la insignia.
6. Desde `/panel` puede editar textos, fotos y el PDF. Un cambio de datos sensibles (nombre, WhatsApp, rubro, ubicación) vuelve a revisión o queda en «cambios pendientes» sin bajar la ficha publicada, según la regla de la fase.
7. Cada 6 meses recibe un aviso para renovar el perfil de un clic. Si no renueva, la ficha se archiva (deja de listarse) pero no se borra.
8. Puede pasar a Pro (o, si es Fundador, ver la fecha de vencimiento y el recordatorio). Nunca pierde la landing Free al caducar Pro.

### 3.2 Visitante del barrio

1. En la home ve una franja «Emprendedores del barrio verificados» con fichas que ya pasaron revisión.
2. En `/emprendedores` filtra por rubro o por tipo de ubicación (puesto de feria, dirección, ambos).
3. Abre `/emprendedores/[slug]`, lee qué ofrece, dónde encontrarlo, toca WhatsApp o una red, descarga el PDF o mira las fotos.
4. Ve con claridad la insignia «Verificado» y, si aplica, «Fundador». Un texto corto aclara que la verificación la hace Mataderos.ar, no el Gobierno de la Ciudad.
5. Si el perfil es Pro, puede ver catálogo por ítem, botón de pedido por WhatsApp y, si tiene subdominio, entrar también por `slug.mataderos.ar`.

### 3.3 Admin (Flavio / el equipo)

1. Entra a `/admin` con una cuenta que tiene `role = admin` (nunca un flag que el usuario pueda escribir).
2. Ve la cola de pendientes, abre la ficha, mira fotos y PDF, y aprueba, pide cambios o rechaza, con una nota.
3. Puede suspender un perfil publicado (abuso, denuncia, impersonación).
4. Ve el cupo de Fundadores (cuántos de los 50 ya se asignaron) y el estado de planes.
5. En v1/v2 gestiona destacados pagos y ve un listado mínimo de métricas.

---

## 4. Monetización

Principio de confianza: **la landing básica es gratuita para siempre**. El registro, la verificación, la ficha en el directorio y la página `/emprendedores/[slug]` no se apagan ni se «secuestran» para forzar un pago. Pro es un plus. Si vence una suscripción o el año de Fundador, el perfil vuelve a Free y sigue online, solo se desactivan las funciones Pro.

### 4.1 Plan Free (permanente)

- Landing en `https://mataderos.ar/emprendedores/[slug]`.
- Secciones: qué ofrecen, dónde están (puesto de feria, dirección y/o mapa), redes y WhatsApp, PDF de catálogo, unas pocas fotos.
- Insignia «Verificado» una vez aprobado.
- Aparece en `/emprendedores` y puede entrar en la franja de la home (sin prioridad de pago).
- Límites: **un PDF de como máximo 10 MB** (`application/pdf`); **hasta 4 fotos** de producto o puesto, más 1 de portada (5 archivos de imagen en total); peso por imagen **TBD**, recomendado 5 MB y recorte del lado del servidor.
- Renovación de 1 clic cada 6 meses para limpiar perfiles abandonados (ver 4.6).
- Un perfil publicado por cuenta en el MVP.

### 4.2 Plan Pro (suscripción mensual, Mercado Pago)

Precio mensual: **TBD**. Moneda: ARS. Medio: suscripción de Mercado Pago (preapproval / suscripciones, no un pago suelto disfrazado).

Incluye todo lo de Free, más:

- Subdominio `slug.mataderos.ar` (mismo espacio de nombres que los comercios; el middleware tiene que resolver el tipo de inquilino).
- Catálogo por ítems, con foto, nombre, texto corto y precio opcional.
- Botón de pedido por WhatsApp que arma un mensaje con el producto elegido.
- Estadísticas del perfil (visitas a la landing, clics a WhatsApp, descargas del PDF, clics a redes).
- Listado con prioridad: primero en `/emprendedores` y preferencia en la franja de la home, debajo de un destacado pago si lo hubiera.
- Más fotos de producto (cupo **TBD**, sugerido 20) y, si se define, un PDF más pesado (cupo **TBD**, no bajar del tope Free de 10 MB).
- Insignia «Pro» (tipográfica, sin pastilla). Los Fundadores, mientras corre el año de regalo, muestran «Fundador» en lugar de «Pro», o las dos si queda más claro en la UI; no uses dos sellos que compitan.

Al cancelar o al vencer: el subdominio deja de resolver (respuesta clara, no un 404 seco), el catálogo por ítems pasa a no listarse, las stats dejan de actualizarse en el panel, y la prioridad se pierde. La landing Free, el PDF y las fotos dentro del cupo Free siguen.

### 4.3 Cohorte Fundadores (primeros 50 verificados)

- Los primeros 50 perfiles que pasen a `verified` reciben **12 meses de Pro sin cargo** y la insignia «Fundador».
- El cupo es por perfil verificado, no por cuenta previa ni por intento rechazado. Si un Fundador se da de baja, **no se reabre el cupo** (queda cerrado, para no generar carrera ni reventa). Esto es una regla de producto; si Flavio prefiere reponer cupos, es una pregunta abierta.
- Campos: `is_founder boolean`, `plan` (`free` | `pro`), `plan_source` (`subscription` | `founder` | `comp` | `none`), `plan_expires_at timestamptz` (fin del año de regalo o de la suscripción paga, según corresponda).
- El día de la verificación 1 a 50: `is_founder = true`, `plan = pro`, `plan_source = founder`, `plan_expires_at = now() + 12 months`.
- Avisos (mail y, si hay, aviso en el panel) **30, 14 y 3 días** antes del vencimiento, con un CTA claro para continuar en Pro (precio **TBD**) o seguir en Free. El día del vencimiento, si no hay suscripción activa de Mercado Pago, `plan` vuelve a `free` y `plan_source` queda en `founder` (conserva la insignia histórica «Fundador», pero sin beneficios Pro). No se borra nada publicado que entre en el cupo Free.
- Un job diario (Supabase Cron o una Route Handler protegida por secret, disparada por cron de Vercel) revisa `plan_expires_at` y ejecuta la degradación. No confíes solo en el front.

### 4.4 Destacados pagos (aparte de Pro)

Espacios pagos, por tiempo, no una suscripción permanente:

- Destacado en la home (franja de emprendedores o un recuadro editorial propio).
- Destacado en la agenda (por semana, o atado a fechas de la Feria de Mataderos / La Recova).

Duración y precio: **TBD** (cotizar al menos la semana y el fin de semana de feria). Un destacado no reemplaza la verificación: solo se puede destacar un perfil ya `verified` y no suspendido. En el modelo, tabla `placements` (tipo, desde/hasta, estado de pago, perfil). En el MVP se puede cargar a mano desde `/admin`; el cobro por Mercado Pago entra en v2.

### 4.5 Upsell de servicios Atipika

Pro y los destacados son producto de la plataforma. Encima, el panel y los mails pueden ofrecer servicios de Atipika (o la marca que Flavio defina), siempre como un pedido, no como un cargo automático:

- Sitio a medida (más allá de la plantilla Pro).
- Producción de fotos de productos y del puesto.
- Gestión o armado de redes.

El CTA abre un formulario o un WhatsApp del equipo, con el nombre del perfil ya cargado. No hace falta un catálogo de precios en el MVP: los valores quedan **TBD** y se cierran por conversación. Dejá un bloque fijo en `/panel` («¿Querés que te lo resolvamos?») y no lo disfraces de función Pro.

### 4.6 Renovación Free cada 6 meses

Objetivo: que el directorio no se llene de puestos que ya no existen.

- Al verificarse, `renew_by = now() + 6 months`. Cada renovación de 1 clic (mail o botón en el panel, con token firmado) corre la fecha otros 6 meses.
- Avisos **14 y 3 días** antes. Si vence, `status` pasa a `archived`: no aparece en home ni en `/emprendedores`, la landing pública muestra un estado «perfil no actualizado» o responde 404 según se defina (recomendación: página visible con aviso y CTA al dueño, `noindex`). El dueño puede reactivar desde el panel, y eso puede pedir una re-revisión rápida si pasaron más de **TBD** días.
- La renovación es gratuita y no tiene que ver con Pro. Un Fundador o un Pro también renueva el perfil; son dos relojes distintos (`renew_by` vs `plan_expires_at`).

### 4.7 Qué no se cobra

- El alta, la verificación ni la permanencia de la landing Free.
- La bajada del PDF ni el clic a WhatsApp del visitante.
- El year de Fundadores (es un costo de adquisición, no una deuda del feriante).

---

## 5. Página /sumate (propuesta de valor)

`/sumate` es la puerta de entrada comercial del portal: explica el valor, separa audiencias y recién después manda al registro o al WhatsApp. No reemplaza el onboarding ni el directorio. Entrá en el **MVP**, no la dejes para v1.

### 5.1 Portada `/sumate`

Hero, en `font-display` mayúsculas o en Fraunces según contraste sobre el fondo (campo de color plano, sin caja oscura enorme):

> Tu lugar en Mataderos, también online

Bajada sugerida (ajustable, mismo tono): «Si tenés un puesto en la Feria o un local en el barrio, acá armamos tu lugar en Mataderos.ar. Gratis para empezar, con un sello de verificado y la opción de ir por más.»

Debajo, **dos puertas grandes**, no pastillas. Cada una es un bloque editorial de campo plano, filete de 1 px, target de 48 px como mínimo (en la práctica, toda la tarjeta es clickeable), tipografía grande y una línea de apoyo:

- **Soy emprendedor o feriante** → `/sumate/emprendedores`. Apoyo: «Una landing simple, un catálogo para pasar por WhatsApp y el sello de verificado del barrio.»
- **Tengo un comercio** → `/sumate/comercios`. Apoyo: «Ficha en la guía del barrio y, si querés, tu web oficial en tunombre.mataderos.ar.»

En mobile, las dos puertas van apiladas, a ancho completo. En desktop, dos columnas equivalentes (ninguna se lee como «la principal»). El visitante tiene que entender en un vistazo que feriante y comerciante no entran por el mismo camino: tienen objetivos distintos.

### 5.2 Por qué separamos las dos puertas

Los feriantes buscan que los encuentren entre domingo y domingo, un link de catálogo para mandar por WhatsApp y un sello del barrio. Los comercios buscan **tráfico de vecinos al local**, **aparecer en Google** con una página clara, y una **web oficial con subdominio** (`slug.mataderos.ar`), apoyados en el directorio que ya existe (`#directorio` / `ShopDirectory` en `src/components/PortalClient.tsx`) y en el plan pago de Web Oficial que hoy se ofrece en `#sumar-comercio`. Mezclar ambos relatos en una sola página debilita los dos.

### 5.3 Subpágina `/sumate/emprendedores`

Misma gramática visual del portal. Secciones, en este orden:

**Por qué te sirve** — tres o cuatro beneficios concretos, sin marketing vacío. Copy cerrado para usar (se puede editar el tono, no la promesa):

1. Que te encuentren entre feria y feria.
2. Tu catálogo en un link para pasar por WhatsApp.
3. Sello de verificado del barrio.
4. Un cuarto, recomendado: un lugar propio en el portal del barrio, sin pagar el alta. Los primeros 50 verificados entran como Fundadores, con un año de Pro de regalo (ver sección 4.3).

**Cómo se ve** — un ejemplo real de landing, no un mock estático vacío. En el MVP: embebé o enlazá una ficha de demostración publicada (`/emprendedores/[slug]` de un perfil fixture o del primer verificado). El recuadro tiene que verse como la plantilla de verdad (sección 12.1), en mobile y en desktop, con un CTA «Ver un ejemplo». Hasta que haya un perfil real, usá un fixture de desarrollo claramente marcado como ejemplo, nunca un comercio de `BUSINESSES` haciéndose pasar por feriante.

**Planes** — tabla de tres columnas. Precios **TBD**, no inventes cifras:

| | Gratis (para siempre) | Fundadores (primeros 50 verificados) | Pro (mensual, **TBD**) |
| --- | --- | --- | --- |
| Landing en mataderos.ar | Sí | Sí | Sí |
| Catálogo PDF (máx. 10 MB) y unas pocas fotos | Sí | Sí | Sí, con más cupo |
| Sello verificado | Sí, al aprobarse | Sí | Sí |
| Insignia Fundador y Pro 12 meses de regalo | No | Sí | — |
| Subdominio, catálogo por ítems, stats y prioridad | No | Sí, durante el año de regalo (el subdominio y los ítems entran cuando exista v2) | Sí (v2) |

Al pie de la tabla, una línea: «Cuando se vence el año de Fundador, la landing Free sigue online. Pro se puede continuar; el precio se publica cuando esté definido.» Enlazar a `/terminos` cuando exista.

**Cómo funciona** — tres pasos, numerados con tipografía mono/display, no con íconos decorativos:

1. Creá tu cuenta (magic link).
2. Completá la landing en unos minutos: qué ofrecés, dónde estás, redes, fotos y el PDF.
3. La revisamos y, si está en orden, la publicamos con el sello de verificado.

**Preguntas frecuentes** (el acordeón puede ser `<details>` o botones de 48 px; sin pastillas). Mínimo estas tres, en voseo, más las que hagan falta:

- **¿Es realmente gratis?** Sí. La landing básica no se paga ni se apaga para forzarte un plan. El alta, la verificación y la ficha en el directorio son gratuitos. Pro y los destacados son optativos.
- **¿Qué pasa después de un año?** Si entraste como Fundador, a los 12 meses el Pro de regalo termina y el perfil vuelve a Gratis: no perdés el sitio ni el PDF. Te avisamos con anticipación por si querés continuar en Pro (precio **TBD**).
- **¿Necesito factura?** No hace falta factura ni monotributo para registrarte ni para tener la landing Gratis. Si más adelante contratás Pro o un destacado, el comprobante y los datos fiscales se definen con el medio de pago (Mercado Pago) y quedan **TBD** hasta que Flavio cierre el encuadre impositivo.

Otras FAQ útiles, si entra el espacio: «¿Qué significa verificado?» (revisión del equipo, no un sello municipal); «¿Puedo estar si solo voy los domingos a la Feria?» (sí); «¿Cuánto tarda la revisión?» (plazo estimado **TBD**, sugerir 3 a 5 días hábiles en el copy, sin prometerlo como contrato).

**CTA final** — dos acciones, juntas, las dos con target de 48 px:

- Principal: «Creá tu perfil» → `/entrar` (o `/onboarding` si ya hay sesión).
- Secundario, filete: «Escribinos por WhatsApp» → el WhatsApp del portal (`wa.me/…`, hoy el número en el footer es un placeholder; no dejes `5491100000000` en producción). Mensaje prearmado: «Hola, quiero sumar mi emprendimiento o puesto a Mataderos.ar».

### 5.4 Subpágina `/sumate/comercios`

Misma estructura, otro relato. El comerciante no está pidiendo una landing de feria: quiere que lo visiten, que lo encuentren en Google y, si le sirve, una web oficial con subdominio, usando el directorio actual y el plan pago que ya se comunica en `#sumar-comercio`.

**Por qué te sirve** — tres o cuatro beneficios concretos:

1. Que el vecino te encuentre en la guía del barrio, con horario y WhatsApp.
2. Una página clara para cuando te buscan en Google (nombre, dirección, cómo llegar).
3. Tu web oficial en `tunombre.mataderos.ar`, si activás el plan pago.
4. Un cuarto, recomendado: la ficha básica es gratuita; la Web Oficial se suma cuando la quieras, sin perder la ficha.

**Cómo se ve** — un ejemplo real que ya existe: la landing de un comercio con subdominio, por ejemplo `/comercio/veterinariaflavio` (o `veterinariaflavio.mataderos.ar`). Mostrá la ficha del directorio y, al lado o debajo, la Web Oficial. Texto al pie: es un local real del barrio (o de demostración, si en algún momento dejara de serlo).

**Planes** — no copies la tabla de Fundadores de los feriantes: esa cohorte es solo de emprendedores verificados, salvo que Flavio decida extenderla. Tabla propia, precios **TBD**:

| | Ficha gratuita | Web oficial (Pro del comercio, **TBD**) |
| --- | --- | --- |
| Nombre, dirección, horario y WhatsApp en la guía | Sí | Sí |
| Aparecer en «Comercios del barrio» | Sí | Sí, con prioridad de Web oficial (como hoy, `hasSubdomain`) |
| Página propia en `slug.mataderos.ar` | No | Sí |
| Servicios, descripción larga, mapa | Básica | Completa, como `src/app/comercio/[slug]/page.tsx` |

Si se quiere simetría visual con la otra subpágina, se puede mostrar tres columnas y dejar «Fundadores» con la leyenda «No aplica a comercios; es el beneficio de los primeros 50 emprendedores verificados». No prometas un año de subdominio gratis a los locales si no está decidido.

**Cómo funciona** — tres pasos, alineados al flujo actual (el alta de comercios en el MVP sigue siendo por WhatsApp o por el equipo; no hace falta inventar un registro de comerciantes si todavía no existe):

1. Dejanos el nombre del local (el simulador de slug que ya está en `#sumar-comercio` puede vivir también acá).
2. Armamos la ficha gratuita en la guía: dirección, horario y WhatsApp.
3. Si querés la Web Oficial, la activamos en `tunombre.mataderos.ar` (precio **TBD**).

**Preguntas frecuentes**, mínimo:

- **¿Es realmente gratis?** La ficha en la guía sí. La Web Oficial con subdominio es el plan pago del comercio (precio **TBD**). No es el mismo plan Pro de los feriantes.
- **¿Qué pasa después de un año?** A los comercios no les corre el año de Fundadores. La ficha gratuita no tiene vencimiento de cortesía. Si contratás la Web Oficial, las condiciones de renovación se pactan con ese plan (**TBD**).
- **¿Necesito factura?** No para pedir la ficha gratis. Para la Web Oficial, el comprobante queda **TBD** (mismo criterio fiscal que en la sección 4).

Otras: «¿Aparezco en Google?» (la página ayuda; no se promete un puesto pago en Ads); «¿Puedo elegir el subdominio?» (sí, si está libre y no pisa un slug reservado o de un emprendedor).

**CTA final**:

- Principal, en el MVP: «Sumate por WhatsApp» → mismo destino que `#sumar-comercio`, con el nombre/slug ya cargado si usó el simulador.
- Secundario: «Escribinos» / el WhatsApp o mail del portal. Cuando exista un alta autogestionada de comercios, el botón principal puede pasar a un registro; hasta entonces no inventes un `/entrar` de comerciante que no lleva a ningún lado.

### 5.5 Navegación y home

Hay que sumar **«Sumate»** al header y al footer de `src/components/PortalClient.tsx`, y dejarlo visible en la home.

- En `SiteHeader`, el CTA actual «Sumá tu comercio» (`#sumar-comercio`) pasa a **«Sumate»** y apunta a `/sumate` (también en el menú mobile). No dejes dos CTAs que compitan en la barra: «Sumate» es el único botón de alta. «Comercios» y, cuando esté, «Emprendedores» siguen siendo links de recorrido.
- En `SiteFooter`, columna de contacto: «Sumate» → `/sumate`, además de los destinos actuales de la guía.
- En el **hero**, junto a Agenda y Comercios, un tercer botón o un enlace claro «Sumate» → `/sumate`.
- El bloque `#sumar-comercio` se puede acortar a un teaser que apunte a `/sumate/comercios` (el simulador de slug puede mudarse a esa subpágina o repetirse ahí). El CTA «Sumá tu emprendimiento» de la franja `#emprendedores` apunta a `/sumate/emprendedores`, no directo a `/onboarding`.
- Sitemap: incluir `/sumate`, `/sumate/emprendedores` y `/sumate/comercios` en `src/app/sitemap.ts`, con `canonical` y Open Graph `es_AR`. JSON-LD `WebPage` + `BreadcrumbList`. Se indexan (no van con `noindex`).

### 5.6 Criterios de aceptación (MVP)

Estos criterios suman a los de la sección 6.1:

1. `/sumate` muestra el titular «Tu lugar en Mataderos, también online» y las dos puertas, que llevan a `/sumate/emprendedores` y `/sumate/comercios`.
2. Cada subpágina tiene, en este orden: Por qué te sirve (3 o 4 beneficios; en feriantes, los tres textos acordados), Cómo se ve (un ejemplo real o fixture declarado), tabla de Planes (Gratis / Fundadores / Pro con precios **TBD** en feriantes; ficha gratis / Web oficial **TBD** en comercios, sin copiar Fundadores), Cómo funciona en 3 pasos, FAQ con «¿Es realmente gratis?», «¿Qué pasa después de un año?» y «¿Necesito factura?», y un CTA final con alta o registro más contacto por WhatsApp.
3. «Sumate» aparece en el header, en el footer y en la home (hero o CTA equivalente) y apunta a `/sumate`.
4. Las tres URLs entran al sitemap, tienen canonical y se pueden compartir (Open Graph).
5. Un feriante puede ir de `/sumate/emprendedores` a `/entrar` y completar el onboarding. Un comerciante puede ir de `/sumate/comercios` al WhatsApp del portal (o al flujo de ficha) sin pasar por el registro de emprendedores.
6. La página respeta las reglas de diseño: sin emojis, sin pastillas, targets de 48 px, mobile de 360 px usable, `npm run build` pasa.

---

## 6. Roadmap por fases

Trabajá fase por fase. No adelantes Mercado Pago ni el catálogo por ítems en el MVP.

### 6.1 MVP — alta, verificación y landing Free

Alcance:

- Esquema nuevo (tablas de emprendedores, perfiles, auditoría, storage) sin romper `businesses` / `articles` / `events`.
- Auth con magic link, onboarding, panel del dueño, cola de admin.
- Directorio `/emprendedores`, ficha `/emprendedores/[slug]`, franja en la home.
- Página de propuesta de valor `/sumate` con las dos puertas y las subpáginas `/sumate/emprendedores` y `/sumate/comercios` (sección 5), más el enlace «Sumate» en header, footer y home.
- PDF (máx. 10 MB) y fotos con los cupos Free.
- Términos, privacidad y consentimiento.
- Lógica de Fundadores lista (asignar el cupo al verificar), aunque el «Pro» del año 1 en el MVP puede limitarse a la insignia, la prioridad de listado y un flag interno. El subdominio, el catálogo por ítems y las stats pueden esperar a v1/v2, pero el vencimiento a los 12 meses y los avisos tienen que quedar diseñados desde ya (el job de avisos puede entrar en v1 si el primer vencimiento está lejos; el flag y `plan_expires_at` sí van en el MVP).
- Renovación a 6 meses: campos y mail/enlace, aunque el primer ciclo no venza de inmediato.

Criterios de aceptación:

1. Un feriante se registra con magic link, completa el asistente y envía a revisión sin tocar SQL a mano.
2. Un visitante no logueado no ve perfiles `draft`, `pending_review`, `needs_changes`, `rejected`, `suspended` ni `archived` en el directorio ni en la home.
3. El admin aprueba, pide cambios o rechaza, y el dueño lo ve en `/panel`.
4. Al aprobar, si quedan cupos de Fundadores, se graban `is_founder`, `plan = pro` y `plan_expires_at`. El perfil 51 queda en Free.
5. La landing Free muestra las secciones acordadas, el PDF se descarga, el WhatsApp abre `wa.me` con un mensaje prearmado, y hay JSON-LD + canonical + entrada en el sitemap (solo verificados vigentes).
6. El PDF de más de 10 MB o que no sea PDF se rechaza en cliente y en el servidor (Storage + validación de tipo).
7. Un comercio existente (`veterinariaflavio`, etc.) no puede ser pisado por el slug de un emprendedor. El middleware de subdominios de comercios sigue funcionando.
8. Existen `/terminos` y `/privacidad`, y el registro no se completa sin aceptación.
9. `npm run build` pasa. No hay emojis ni pastillas en la UI nueva.
10. RLS comprobado: un usuario no puede editar la ficha de otro ni autoasignarse `admin` o `verified`.
11. Se cumplen los criterios de `/sumate` listados en la sección 5.6 (dos puertas, bloques de cada subpágina, CTA de registro y WhatsApp, «Sumate» en la navegación y en la home, sitemap).

### 6.2 v1 — pulido, avisos y prioridad

Alcance:

- Login con Google, además del magic link.
- Mails transaccionales: revisión, pedido de cambios, aprobación, recordatorios de renovación (6 meses) y de vencimiento de Fundador (30/14/3 días).
- Job diario de degradación de planes vencidos y de archivado por falta de renovación.
- Stats básicas de la landing (pageview y clics), visibles en `/panel` para Fundadores/Pro; en Free, un número muy resumido o diferido, según se defina (recomendación: visitas del mes, para todos, y el detalle de clics solo en Pro).
- Prioridad de listado para `plan = pro`.
- Mapa embebido cuando haya dirección o punto.
- Carga manual de destacados desde `/admin` (el cobro puede seguir siendo offline).
- Bloque de upsell Atipika en el panel.
- Opción de Auth por SMS o WhatsApp OTP solo si el magic link muestra fricción real (ver sección 7).

Criterios de aceptación:

1. Un Fundador ve en el panel la fecha de vencimiento y un aviso anticipado.
2. Al vencer el año sin pago, la ficha sigue online en modo Free y desaparecen los extras Pro que ya estuvieran activos.
3. El mail de renovación a 6 meses reactiva `renew_by` con un solo clic, sin volver a pasar todo el onboarding.
4. Google Auth crea o enlaza el mismo `profiles.id`.
5. Los destacados con fecha vigente aparecen en home o agenda, y caducan solos.

### 6.3 v2 — Pro pago, subdominio y catálogo por ítems

Alcance:

- Suscripción mensual Pro con Mercado Pago (alta, cancelación, webhook, estados `active` / `past_due` / `canceled`).
- Middleware extendido: `slug.mataderos.ar` resuelve comercio **o** emprendedor Pro, con colisión imposible.
- Catálogo por ítems + botón de pedido por WhatsApp.
- Destacados pagos cobrados por Mercado Pago (semana / fechas de feria).
- Panel de stats más completo y export simple.
- Revisión de cupos de fotos/PDF Pro.

Criterios de aceptación:

1. Un perfil Free puede pagar Pro, el webhook confirma, y el subdominio responde con la landing (o una versión Pro de la misma plantilla).
2. Si el pago falla o se cancela, el subdominio deja de servir el sitio y la URL canónica vuelve a `/emprendedores/[slug]`, sin borrar la ficha.
3. Un ítem del catálogo genera un enlace de WhatsApp con nombre del producto.
4. Un destacado pagado se publica solo en las fechas contratadas.
5. Los precios visibles en la UI salen de config/env (**TBD**), nunca hardcodeados como definitivos.

---

## 7. Auth

Hoy no hay sesión. Hay que sumar `@supabase/ssr`, un cliente de servidor, un cliente de browser y renovación de sesión en middleware **sin romper** la reescritura de subdominios de `src/middleware.ts`. Separá las responsabilidades: primero el rewrite de tenant; después, el refresh de cookies solo en rutas de app (`/entrar`, `/onboarding`, `/panel`, `/admin`, callbacks de Auth).

Variable nueva, solo servidor: `SUPABASE_SERVICE_ROLE_KEY` (nunca `NEXT_PUBLIC_`). Usala en webhooks y jobs, no en el browser.

### 7.1 Magic link (mail) — recomendado para el MVP

- Nativo de Supabase Auth (`signInWithOtp` / magic link).
- Pros: poco armado, sin contraseña que el feriante olvide, auditado por Supabase, alcanza con un mail.
- Contras: hay feriantes que miran poco el correo; Gmail/Outlook pueden mandar el link a spam; hay que cuidar el redirect a `https://mataderos.ar/auth/callback`.
- Implementación: página `/entrar`, plantilla de mail en el dashboard de Supabase en tono del portal, redirect allowlist solo al dominio de producción y a previews autorizadas.

### 7.2 Google

- Pros: un toque, bueno para quien ya tiene Gmail (la mayoría).
- Contras: no cubre a todo el mundo; hay que configurar OAuth y la pantalla de consentimiento.
- Entrá en v1, no como único medio.

### 7.3 WhatsApp OTP o SMS

- Supabase no trae WhatsApp OTP de fábrica. Haría falta un proveedor (Twilio Verify, WhatsApp Cloud API u otro) y un flujo custom.
- SMS (Teléfono de Supabase) es más estándar, pero en Argentina el costo y la entrega son chanchos, y el número queda como dato personal sensible.
- Pros: es el canal que el feriante ya usa.
- Contras: costo, aprobación de plantillas, riesgo de bloqueo, más superficie de abuso (SIM swap, reventa de números).
- Decisión: **no va en el MVP**. Se reevalúa en v1 si el magic link frena el alta. Si se hace, el número verificado puede rellenarse como WhatsApp público solo con consentimiento explícito, no en automático.

### 7.4 Roles

Tabla `profiles` con `role` (`vendor` por defecto, `admin` solo por SQL o por un proceso interno). RLS: el usuario puede leerse y actualizar campos no sensibles de su fila; no puede cambiar `role`. Las rutas `/admin` validan rol en servidor.

---

## 8. Onboarding

Asistente de pasos, un perfil en borrador que se va guardando. En mobile, un paso por pantalla, botones de 48 px, «Guardar y seguir» y «Volver». Puede salir y retomar.

1. **Cuenta.** Magic link y aceptación de `/terminos` y `/privacidad` (checkbox, fecha y versión guardadas).
2. **Nombre y rubro.** Nombre público, slug sugerido (editable, único en el espacio compartido con `businesses.slug` y reservados), rubro de una lista cerrada (ver 10.6).
3. **Qué ofrecen.** Texto corto (límites sugeridos: 80–800 caracteres) en tono claro, sin mayúsculas sostenidas.
4. **Dónde están.** Tipo: puesto de feria, dirección en el barrio, ambos, o solo redes (este último no debería destacarse en home). Campos: feria (Feria de Mataderos, La Recova, otra), identificación del puesto, dirección, barrio/zona, nota («domingos de 11 a 19»). Mapa opcional si hay dirección.
5. **Contacto y redes.** WhatsApp obligatorio para publicar (formato internacional, se normaliza a `549…`). Instagram, Facebook, TikTok u otra URL, opcionales, con validación de dominio.
6. **Fotos y PDF.** Portada + hasta 4 fotos; un PDF de catálogo de hasta 10 MB. El PDF es opcional para enviar a revisión, pero el copy tiene que incentivar subirlo. Preview de páginas o al menos el nombre y el peso del archivo.
7. **Vista previa y envío.** Render de la plantilla real. Confirmación de que los datos son verdaderos y de que operan en Mataderos o en la Feria. Botón «Enviar a revisión».

Después del envío: pantalla de espera con el estado, el plazo estimado de revisión (**TBD**, sugerir 3 a 5 días hábiles en el copy, sin prometer) y el acceso al panel.

---

## 9. Qué significa «verificado»

No es un certificado municipal, ni un control bromatológico, ni una garantía de Mataderos.ar sobre la calidad o la entrega. Es una **revisión editorial del equipo**: que el perfil parece de una persona o proyecto real, vinculado al barrio o a la Feria, sin impersonar a otro y sin contenido prohibido.

### 9.1 Qué se pide para aprobar

- Datos completos y coherentes (nombre, rubro, texto, un canal de contacto real).
- Al menos una foto propia del puesto, el producto o la persona en contexto (no un recorte genérico de stock).
- WhatsApp propio, no de un tercero.
- Indicio de vínculo con Mataderos: puesto en la Feria o La Recova, dirección en el barrio, o una explicación breve más una red que lo respalde.
- Prueba opcional, a pedido del admin si hay dudas: foto del puesto con un papel que tenga el nombre, handle de Instagram, o CUIT/CUIL. No pidas DNI completo en el MVP. Si más adelante se pide un documento, guardalo en un bucket privado, con retención limitada, nunca en la landing.

### 9.2 Cola de admin

En `/admin`: lista filtrable por estado, vista de la ficha como la vería el público, enlaces a fotos y PDF, acciones «Aprobar», «Pedir cambios» (nota obligatoria) y «Rechazar» (motivo obligatorio). Toda acción se escribe en `audit_events`.

Al aprobar: `status = verified`, `verified_at`, `verified_by`, `published_at` si era la primera vez, `renew_by = now() + 6 months`, y lógica Fundadores (sección 4.3).

### 9.3 Insignia

Texto, no pastilla ni emoji. Ejemplos: «Verificado por Mataderos.ar», «Fundador». Tipografía `font-mono`, color `chicago` o un filete de 1 px. Un enlace o un texto corto explica el criterio. No uses la palabra «oficial» para no confundir con la «Web Oficial» de los comercios con subdominio.

### 9.4 Antiabuso

- Un perfil publicado por cuenta en el MVP.
- WhatsApp único entre perfiles no rechazados.
- Slug único compartido con comercios y una lista de reservados (`www`, `mail`, `admin`, `panel`, `api`, `auth`, `entrar`, `onboarding`, `sumate`, `emprendedores`, `comercio`, `notas`, `privacidad`, `terminos`, `app`, etc.).
- Rate limit de altas y de envíos a revisión.
- Estados `suspended` (oculto de inmediato) y reporte público simple en v1.
- Prohibido: contenido ilegal, armas, acoso, pornografía, impersonación, sellos falsos de organismos públicos, datos de terceros sin permiso.
- El admin puede borrar archivos del storage si hay abuso.

---

## 10. Modelo de datos

Sumá migraciones nuevas en `supabase/migrations/` (o un `supabase/schema-emprendedores.sql` si todavía no hay CLI de migraciones en el repo). No reescribas `supabase/schema.sql` de un saque: ampliá en un archivo aparte y documentá el orden de ejecución. Activá `pgcrypto` solo si no está (ya se crea en el esquema actual).

### 10.1 `public.profiles`

```sql
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'vendor' check (role in ('vendor', 'admin')),
  phone text,
  accepted_terms_at timestamptz,
  accepted_terms_version text,
  accepted_privacy_at timestamptz,
  accepted_privacy_version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Trigger `on auth.users insert` para crear la fila. Nadie, salvo service role, actualiza `role`.

### 10.2 `public.emprendedores`

Campos principales (nombres en inglés en SQL, copy en español en la UI):

- Identidad: `id`, `owner_id` (unique en el MVP: un perfil por usuario), `slug` unique, `display_name`, `tagline`, `offer_text`, `category`.
- Ubicación: `location_type` (`feria_puesto` | `direccion` | `ambos` | `solo_redes`), `feria_name`, `puesto_label`, `address`, `zone`, `location_note`, `lat`, `lng`.
- Contacto: `whatsapp`, `instagram`, `facebook`, `tiktok`, `other_url`.
- Media: `hero_image_path`, `catalog_pdf_path`, `catalog_pdf_original_name`, `catalog_pdf_bytes`.
- Estados: `status` (`draft` | `pending_review` | `needs_changes` | `verified` | `rejected` | `suspended` | `archived`), `review_note`, `rejected_reason`.
- Plan: `plan` (`free` | `pro`), `plan_source` (`none` | `founder` | `subscription` | `comp`), `plan_expires_at`, `is_founder boolean not null default false`, `mp_preapproval_id`, `plan_status` (`none` | `active` | `past_due` | `canceled`).
- Fechas: `verified_at`, `verified_by`, `published_at`, `renew_by`, `last_renewed_at`, `created_at`, `updated_at`.

Índices: `slug`, `status`, `category`, `plan`, `is_founder`, `renew_by`, `plan_expires_at`. Constraint de slug en minúsculas (`check (slug = lower(slug))`) y formato `^[a-z0-9]+(-[a-z0-9]+)*$`.

Trigger o función de reserva de slug: no permitir un `slug` que ya exista en `public.businesses.slug` ni en la lista de reservados (tabla `public.reserved_slugs` o un check en la función de escritura).

### 10.3 Otras tablas

- `emprendedor_photos`: `id`, `emprendedor_id`, `storage_path`, `alt`, `sort_order`, `created_at`. Cupo Free de 4 + portada se valida en trigger o en API.
- `emprendedor_products` (v2): `id`, `emprendedor_id`, `name`, `description`, `price_cents` (nullable), `currency` default `ARS`, `image_path`, `available`, `sort_order`.
- `audit_events`: `id`, `emprendedor_id`, `actor_id`, `action`, `note`, `payload jsonb`, `created_at`. Inserts solo con service role o función `security definer`.
- `founder_cohort`: una fila de config (`cap integer default 50`, `granted integer`, `closed_at`). Actualizar `granted` en la misma transacción que la aprobación, con lock, para no pasar de 50 en condiciones de carrera.
- `placements` (v1 carga manual, v2 pago): `id`, `emprendedor_id`, `kind` (`home` | `agenda`), `starts_at`, `ends_at`, `feria_date date`, `price_cents` (nullable, **TBD**), `status`, `mp_payment_id`.
- `profile_events` o tabla de métricas (v1): hits diarios por perfil y por tipo de evento (`view`, `whatsapp_click`, `pdf_download`, `social_click`). Evitá una fila por pageview crudo si se puede agregar por día.
- `subscriptions` (v2): vínculo con Mercado Pago, estado, períodos.

### 10.4 RLS (idea, para traducir a policies concretas)

- `profiles`: el dueño selecciona y actualiza su fila, salvo `role`. El admin lee todas.
- `emprendedores`:
  - `select` público solo si `status = 'verified'` y `renew_by >= now()` (los `archived` no salen). Alternativa: una vista `emprendedores_public`.
  - El dueño lee su fila en cualquier estado y puede insertar/update en `draft` / `needs_changes` / `verified` (campos no sensibles). No puede setear `status = verified`, `is_founder`, `plan`, `role` ni `plan_expires_at`.
  - El envío a revisión se hace por una función `submit_emprendedor()` que pasa de `draft`/`needs_changes` a `pending_review`.
  - El admin (via función o policy que mira `profiles.role`) puede todo lo de revisión.
- Fotos y productos: misma lógica que el padre.
- Métricas: insertar desde el servidor (service role o función); el dueño lee solo lo suyo; el público no lee.

Probar con dos usuarios y un anónimo antes de dar la fase por cerrada.

### 10.5 Storage

Buckets:

- `emprendedor-media` (imágenes). Público de lectura solo para archivos de perfiles verificados, o bucket privado + URLs firmadas (más seguro, un poco más de trabajo). Recomendación MVP: carpeta `{user_id}/{emprendedor_id}/` y policy de lectura pública restringida, write solo del dueño en su prefijo, MIME `image/jpeg`, `image/png`, `image/webp`. Tope por archivo **TBD** (sugerido 5 MB). Sin SVG (riesgo XSS).
- `emprendedor-catalogs` (PDF). **Privado.** Descarga por URL firmada de corta duración o por una Route Handler que chequea que el perfil esté `verified`. MIME `application/pdf`, **máximo 10 MB** en Free (el mismo tope en el bucket y en la validación de servidor; no confíes en el `accept` del input). Verificar magic bytes (`%PDF`), no solo la extensión.
- Un bucket privado `emprendedor-private` por si más adelante hay comprobantes, nunca expuesto al CDN público.

`next.config.mjs`: agregar el hostname `*.supabase.co` (o el dominio exacto del proyecto) en `images.remotePatterns`.

### 10.6 Categorías sugeridas (lista cerrada, editable después)

Artesanías; Indumentaria; Alimentos y conservas; Dulces y panadería; Mate y tes; Cuero y talabartería; Joyería y bijou; Hogar; Plantas; Oficio y servicios; Otra. No reutilices tal cual `BusinessCategory` de `src/lib/data.ts` (`Mascotas`, `Gastronomía`, etc.): son rubros de local, no de feria.

---

## 11. Rutas

Nuevas rutas App Router, todas con `lang` heredado `es-AR`:

| Ruta | Tipo | Rol |
| --- | --- | --- |
| `/sumate` | pública | Propuesta de valor: hero y dos puertas (MVP). |
| `/sumate/emprendedores` | pública | Beneficios, ejemplo, planes, pasos, FAQ y CTA de feriantes. |
| `/sumate/comercios` | pública | Idem para locales (ficha gratis + Web oficial). |
| `/emprendedores` | pública | Directorio, filtros, SEO. |
| `/emprendedores/[slug]` | pública | Landing. 404 o página de archivo si no está vigente. |
| `/entrar` | pública | Magic link (y Google en v1). |
| `/auth/callback` | pública | Intercambio del código de Supabase. |
| `/onboarding` | autenticada | Asistente. Si ya envió o está verificado, redirige a `/panel`. |
| `/panel` | autenticada | Edición, estado, plan, renovación, upsell Atipika. |
| `/admin` | admin | Cola de revisión, Fundadores, destacados, suspensiones. |
| `/admin/emprendedores/[id]` | admin | Detalle y acciones. |
| `/terminos` | pública | Términos y condiciones. |
| `/privacidad` | pública | Política de privacidad (Ley 25.326). |
| `/api/webhooks/mercadopago` | v2 | Webhook firmado. |
| `/api/cron/planes` | v1 | Job de vencimientos y renovaciones (protegido por secret). |

El header y el footer de `PortalClient.tsx` tienen que sumar el enlace «Emprendedores» (a `/emprendedores` o a `#emprendedores` en la home) sin sacar «Comercios», y el CTA «Sumate» que apunta a `/sumate` (reemplaza «Sumá tu comercio» en la barra). El detalle de esa navegación y de los teasers de la home está en la sección 5.5.

Middleware: mantener el rewrite hacia `/comercio/[slug]` para los slugs que sean comercios. En v2, si el slug es un emprendedor Pro vigente, reescribir a `/emprendedores/[slug]` (o a una ruta interna `/tenant/emprendedor/[slug]`). Resolver con una lookup cacheable (Edge no debería pegarle a Supabase en cada request si se puede evitar: mapa generado, o una tabla `tenants(slug, kind, status)` de lectura rápida). Hasta v2, un emprendedor **no** debe ocupar un subdominio.

---

## 12. Plantilla de la landing, SEO y archivos

### 12.1 Secciones de la plantilla Free

Orden sugerido, en el estilo editorial del portal (campos planos, filetes de 1 px, sin cards con sombra):

1. Encabezado con foto de portada, nombre, rubro, insignias (Verificado / Fundador) y CTA de WhatsApp.
2. Qué ofrecen (`offer_text`).
3. Dónde encontrarlos (puesto, feria, dirección, nota de días y horarios, enlace a mapa).
4. Fotos (galería simple, alt obligatorio).
5. Catálogo en PDF (nombre del archivo, peso, botón «Descargar catálogo»).
6. Redes.
7. Pie: «Perfil verificado por Mataderos.ar» + enlace al directorio y al portal.

En Pro (v2) se intercalan el listado de ítems y el botón de pedido. El título no va dentro de una caja oscura tipo overlay: seguí el criterio reciente del hero de la home (tipografía sobre la foto con un scrim liviano solo si hace falta contraste).

### 12.2 SEO

Copiar el patrón de `src/app/notas/[slug]/page.tsx`:

- `generateMetadata` con title `Nombre · Emprendedores · Mataderos.ar`, description recortada de `offer_text`, canonical `https://mataderos.ar/emprendedores/[slug]`, Open Graph `locale: 'es_AR'`, imagen de portada.
- JSON-LD `@graph` con `BreadcrumbList` (Inicio / Emprendedores / Nombre) y `LocalBusiness` o `Person`:
  - Si hay dirección o puesto habitual: `LocalBusiness` (o un subtipo si encaja, por ejemplo `FoodEstablishment` solo cuando sea honesto).
  - Si es una persona o un oficio sin local: `Person` + `makesOffer`.
  - `areaServed`: Mataderos, Comuna 9, CABA.
  - `sameAs` con las redes.
  - No marksAs `verified` de Google; la insignia es propia.
- `src/app/sitemap.ts`: incluir `/sumate`, `/sumate/emprendedores`, `/sumate/comercios`, `/emprendedores` y cada slug `verified` y no archivado. `changeFrequency: 'weekly'`, prioridad menor que la home y similar a una nota satélite (0.6).
- `robots`: las páginas de panel, onboarding, admin y perfiles no vigentes, `noindex`.

### 12.3 Fotos y PDF

- Subida con progress, recorte/resize en el cliente o con un proceso al subir (max width sugerido 2000 px).
- Alternativos en texto, no nombres de archivo.
- El PDF no se embebe entero en el HTML (peso y XSS). Un visor opcional en v1; en el MVP, descarga basta.
- No calentés el repo con binarios de usuarios: todo va a Storage, no a `public/`.

---

## 13. Moderación, términos y privacidad (Ley 25.326)

Antes de abrir el registro, tienen que existir `/terminos` y `/privacidad` en castellano claro.

La política de privacidad, como mínimo:

- Responsable del tratamiento (persona o razón social de Flavio/Atipika, domicilio, mail de contacto). Placeholder si todavía no está la razón social, pero no publiques el alta real con «TBD» en el responsable.
- Qué datos se piden: nombre, mail, teléfono/WhatsApp, textos, fotos, PDF, IP de sesión, métricas de uso del panel.
- Para qué: crear la cuenta, publicar la ficha, verificar, comunicar vencimientos, cobrar Pro/destacados (v2), seguridad.
- Base: consentimiento y ejecución del servicio.
- Cesiones y encargados: Supabase, Vercel, y en v2 Mercado Pago. Aclarar si hay transferencia fuera de Argentina.
- Conservación: mientras la cuenta exista y un plazo adicional **TBD** para facturación y disputas; comprobantes, si los hubiera, con retención mínima.
- Derechos de acceso, rectificación, actualización y supresión (art. 14 y ss. de la Ley 25.326), y el derecho a reclamar ante la AAIP. Un mail para ejercerlos.
- Que el WhatsApp y las fotos van a quedar públicos una vez verificados.
- Menores: el servicio no está pensado para menores de 18 años.

Los términos, como mínimo: la verificación no es un aval oficial; el dueño es responsable del contenido y de sus ventas; Mataderos.ar puede rechazar, suspender o bajar fichas; la landing Free no se garantiza con un SLA de uptime específico; Pro y destacados se rigen por el precio publicado (**TBD**) y por Mercado Pago; la cohorte Fundadores es una cortesía y no se transfiere; ley aplicable CABA/Argentina.

Consentimiento: no se crea la cuenta sin aceptar ambas. Guardá versión y timestamp en `profiles`.

Moderación: cola humana en el MVP (no hace falta un clasificador automático). Tiempo de respuesta de revisión en copy, sin contrato. Un aviso de que las ventas se cierran entre el visitante y el emprendedor, fuera de la plataforma.

---

## 14. Matriz Free vs Pro

Precios: **TBD**. No completees un número «provisorio» que después se lea como oficial en la UI.

| Capacidad | Free (para siempre) | Pro (mensual, Mercado Pago) | Fundador (12 meses de regalo) |
| --- | --- | --- | --- |
| Landing en `/emprendedores/[slug]` | Sí | Sí | Sí (es Pro durante el año) |
| Qué ofrecen, ubicación, redes, WhatsApp | Sí | Sí | Sí |
| PDF de catálogo | Sí, máx. 10 MB, 1 archivo | Sí (tope **TBD**, ≥ 10 MB) | Igual que Pro |
| Fotos | Portada + 4 | Cupo mayor, **TBD** (sugerido 20) | Igual que Pro |
| Insignia Verificado | Sí | Sí | Sí |
| Insignia Fundador | Histórica, sin extras, cuando venza el año | No, salvo que haya sido Fundador | Sí, mientras corre el beneficio y queda como reconocimiento después |
| Subdominio `slug.mataderos.ar` | No | Sí (v2) | Sí, cuando el subdominio exista (v2); si el año se consume antes, no se lo retira a mitad de mes sin aviso |
| Catálogo por ítems + pedido WhatsApp | No | Sí (v2) | Igual que Pro |
| Stats | Mínimas o diferidas | Completas (v1/v2) | Igual que Pro |
| Prioridad en listados | No | Sí | Sí durante el beneficio |
| Destacado en home/agenda | No incluido (se paga aparte, **TBD**) | No incluido (se paga aparte) | No incluido |
| Servicios Atipika (sitio a medida, fotos, redes) | Pedido aparte, **TBD** | Pedido aparte, **TBD** | Pedido aparte, **TBD** |
| Renovación del perfil cada 6 meses | Sí, 1 clic, gratis | Sí, también | Sí, también |

Pago de Pro: suscripción mensual de Mercado Pago, webhook verificado, estados de mora (`past_due`) con un período de gracia **TBD** antes de degradar. Factura y datos fiscales: **TBD** (Monotributo / responsable inscripto). No guardes tarjetas en Supabase.

---

## 15. Integración con la home y con Comercios

En `src/components/PortalClient.tsx`, hoy el orden es: Hero, `NewsCarousel`, `AgendaStrip`, `ViviBand`, `ArchiveCarousel`, `ShopDirectory` (`#directorio` + `#sumar-comercio`).

Propuesta:

- Nueva sección `#emprendedores`, **después** de Comercios o **entre** el archivo y Comercios. Recomendación: **después de Comercios**, para no romper el hábito de quien ya usa el directorio, y para que «locales» y «feriantes» no se mezclen en un mismo carrusel.
- Misma gramática visual que `ShopDirectory`: ojos `font-mono`, título `font-display` en mayúsculas («Emprendedores del barrio verificados»), bajada de una o dos líneas, carrusel `snap-row` en mobile y grilla en desktop, targets de 48 px.
- Fichas solo `verified` y no archivadas. Orden: destacados vigentes, después Pro/Fundadores, después el resto (recientes o aleatorio estable).
- Última tarjeta o botón «Ver todos» hacia `/emprendedores`. CTA «Sumá tu emprendimiento» hacia `/sumate/emprendedores`, distinto del de «Sumá tu comercio».
- El bloque `#sumar-comercio` pasa a ser un teaser que apunta a `/sumate/comercios` (el WhatsApp queda en esa subpágina). No lo uses como alta de feriantes.
- Navegación: sumar «Emprendedores» y el CTA «Sumate» (`/sumate`) en el header, el footer y el hero, como se detalla en la sección 5.5.
- `src/app/page.tsx`: además de `fetchBusinesses()` y `fetchEvents()`, traer `fetchEmprendedoresDestacados()` desde un módulo nuevo (`src/lib/emprendedores.ts`), con fallback a una lista vacía o a fixtures de desarrollo, nunca a perfiles inventados en producción.

Límite con comercios: un mismo negocio no debería tener dos fichas gemelas. Si un local de `businesses` quiere también aparecer como emprendedor, el alta la resuelve el admin (pregunta abierta). El copy de ambas secciones tiene que dejar clara la diferencia: comercio de calle vs. emprendimiento o puesto de feria.

---

## 16. Reglas de diseño

Obligatorias, iguales al resto del portal:

- Fuentes: Big Shoulders Display para titulares de sección, Fraunces para nombres y bajadas, Source Sans 3 para cuerpo, IBM Plex Mono para meta, slugs, fechas e insignias.
- Color de campos planos (`color-field`), filetes de 1 px (`border-carbon`, `border-carbon/15`, `border-pampa/20` en superficies oscuras). Fondos `pampa`, `pampa-surface`, `chicago`, `carbon`. CTA principal en `chicago` o `ladrillo`, como en las fichas de comercio, no un verde genérico de WhatsApp.
- Targets de 48 px mínimo, foco visible, `skip-link` ya existente, `prefers-reduced-motion` en cualquier desplazamiento del logo o de la UI.
- Sin emojis. Sin pastillas tipo chip redondeado; si hace falta un filtro, usá el mismo control rectangular de 4 px que ya tiene el directorio de comercios (`rounded-[4px] border`).
- No numerar las secciones. No tapes fotos con un bloque oscuro enorme de texto.
- Mobile first: el onboarding y el panel tienen que poder completarse con el pulgar en 360–412 px.
- Textos en voseo («Sumá», «Completá», «Guardá»), tono cercano y concreto, sin marketing vacío.

---

## 17. Métricas

Mínimo para saber si el espacio funciona (panel interno en `/admin`, no hace falta un producto de analytics en el MVP):

- Altas iniciadas, onboarding terminado, envíos a revisión, aprobados, rechazados, tiempo medio de revisión.
- Perfiles verificados vigentes, archivados por falta de renovación, reactivados.
- Cupo Fundadores usado (x/50).
- Visitas al directorio y a las landings, clics a WhatsApp, descargas de PDF (v1).
- En v2: conversión Free → Pro, churn, destacados vendidos, pedidos de servicios Atipika.

Cuidado de no rastrear al visitante más de lo necesario. Si más adelante se suma un script de analítica, hay que mencionarlo en `/privacidad`.

---

## 18. Riesgos

- **Confusión con Comercios.** Dos directorios parecidos canibalizan atención. Mitigación: copy claro, navegación distinta, no unificar las grillas.
- **«Verificado» mal leído.** Alguien puede creerlo un sello municipal. Mitigación: texto legal corto en la ficha y en términos.
- **Abuso y spam.** Landings falsas, PDFs maliciosos, fotos ajenas. Mitigación: revisión humana, límites de archivo, magic bytes, suspensión rápida.
- **Colisión de slugs y middleware.** Un emprendedor podría romper `veterinariaflavio.mataderos.ar`. Mitigación: espacio de nombres único y tests del middleware.
- **Auth incompleta.** Meter sesión mal en `src/middleware.ts` puede afectar a todos los subdominios. Mitigación: matcher acotado y pruebas en localhost con y sin tenant.
- **Costo de Storage y de mails.** Fotos y PDF se acumulan. Mitigación: cupos, archivado, borrado diferido de archivos de cuentas cerradas.
- **Churn visual de Fundadores.** El día 366 alguien siente que «le sacaron el sitio». Mitigación: avisos 30/14/3, copy de que la landing Free sigue, CTA de Pro sin presión agresiva.
- **Mercado Pago y mora.** Webhooks duplicados o tardíos. Mitigación: idempotencia, período de gracia **TBD**, logs en `audit_events`.
- **Datos personales.** WhatsApp y fotos de personas en la Feria. Mitigación: consentimiento, buckets bien tipados, no pedir DNI en el MVP.
- **Alcance eterno del MVP.** Si se mezcla el checkout en la primera entrega, no sale. Mitigación: respetar las fases.

---

## 19. Preguntas abiertas (para Flavio, antes o durante el armado)

1. ¿Cuál es la razón social y el mail que van en `/privacidad`?
2. ¿Confirmamos el tope de Fundadores en 50 y que el cupo no se reabre si alguien se baja?
3. ¿La franja de la home va después de Comercios, como se recomienda, o preferís otro lugar?
4. ¿El WhatsApp del portal deja de ser el placeholder `5491100000000`? ¿Qué número y qué cuenta de mail usan para soporte y para Auth?
5. ¿Hay lista cerrada de ferias (Feria de Mataderos, La Recova, otras) o un campo libre?
6. ¿Un comercio ya cargado en `businesses` puede tener también ficha de emprendedor?
7. ¿Precios de Pro, de la semana destacada y de los servicios Atipika? Quedan **TBD** hasta que los definas.
8. ¿En el año de Fundadores activamos subdominio apenas exista v2, o esperamos a que paguen?
9. ¿La landing archivada por no renovar a los 6 meses muestra un aviso o un 404?
10. ¿Quiénes, además de Flavio, entran como `admin`?

---

## 20. Orden de trabajo sugerido para Antigravity

1. Levantar el esquema y las policies en un proyecto de Supabase de staging (no sucias el de producción si ya tiene `businesses`). Documentar env vars en `.env.example`.
2. Instalar `@supabase/ssr`, armar clientes de server/browser y el callback, sin alterar de más el rewrite de `src/middleware.ts`.
3. Páginas `/terminos` y `/privacidad` (aunque el texto legal lo revise Flavio).
4. `/sumate`, `/sumate/emprendedores` y `/sumate/comercios` (sección 5), con «Sumate» en header, footer y hero. El registro de feriantes puede enlazar a `/entrar` aunque el onboarding todavía esté en progreso; el de comercios, al WhatsApp.
5. `/entrar`, `profiles`, `/onboarding` y persistencia en borrador.
6. Storage (PDF 10 MB, fotos) con validación de servidor.
7. Plantilla `/emprendedores/[slug]`, directorio `/emprendedores`, SEO y sitemap (incluye las URLs de `/sumate`). El ejemplo de «Cómo se ve» apunta a un fixture o a la primera ficha real.
8. `/admin` con cola y auditoría; asignación atómica de Fundadores.
9. `/panel` del dueño y estados visibles.
10. Franja en `PortalClient`, links de header/footer, fetch en `src/app/page.tsx`.
11. Tests manuales de RLS, slugs reservados, middleware de comercios, recorridos de `/sumate` y `npm run build`.
12. Recién después, v1 (mails, cron, Google, stats) y v2 (Mercado Pago, subdominio, ítems, destacados cobrados).

Archivos nuevos previsibles (orientativos): `src/lib/emprendedores.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/client.ts`, `src/lib/supabase/admin.ts`, `src/components/emprendedores/*`, `src/components/sumate/*`, `src/app/sumate/page.tsx`, `src/app/sumate/emprendedores/page.tsx`, `src/app/sumate/comercios/page.tsx`, `src/app/emprendedores/`, `src/app/entrar/`, `src/app/onboarding/`, `src/app/panel/`, `src/app/admin/`, `src/app/terminos/page.tsx`, `src/app/privacidad/page.tsx`, `supabase/migrations/00xx_emprendedores.sql`.

Archivos a editar con cuidado: `src/middleware.ts`, `src/app/page.tsx`, `src/components/PortalClient.tsx`, `src/app/sitemap.ts`, `next.config.mjs`, `.env.example`, `package.json`. No reutilices `fetchBusinesses` para este directorio. No subas binarios de usuarios al git. No hagas push ni abras PR hasta que Flavio lo pida.

---

*Fin del plan. Cualquier precio, plazo de revisión o tope no marcado como decisión cerrada queda **TBD** y se confirma con Flavio antes de mostrarlo como cifra oficial en la interfaz.*
