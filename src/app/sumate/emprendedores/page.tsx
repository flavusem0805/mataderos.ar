import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { SumateBuilder } from '@/components/sumate/SumateBuilder';
import { mailtoUrl, PORTAL_EMAIL, PORTAL_WHATSAPP_DISPLAY, whatsappUrl } from '@/lib/contact';
import type { SumateDesiredPlan } from '@/lib/slugs';
import { fetchEmprendedores, fetchTakenSlugs } from '@/lib/supabase';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Emprendedores y feriantes · Sumate a Mataderos.ar',
  description:
    'Armá en 3 pasos tu landing gratuita en Mataderos.ar para que te encuentren entre feria y feria, con catálogo por WhatsApp y sello de verificado.',
  alternates: { canonical: 'https://mataderos.ar/sumate/emprendedores' },
  openGraph: {
    title: 'Emprendedores y feriantes verificados · Mataderos.ar',
    description:
      'Que te encuentren entre feria y feria. Landing gratuita para siempre y Primera Ronda Fundadores.',
    url: 'https://mataderos.ar/sumate/emprendedores',
    locale: 'es_AR',
    type: 'website'
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Sumate como emprendedor o feriante en Mataderos.ar',
      url: 'https://mataderos.ar/sumate/emprendedores'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
        { '@type': 'ListItem', position: 2, name: 'Sumate', item: 'https://mataderos.ar/sumate' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Emprendedores',
          item: 'https://mataderos.ar/sumate/emprendedores'
        }
      ]
    }
  ]
};

const BENEFICIOS = [
  {
    title: 'Que te encuentren entre feria y feria.',
    body: 'Cuando termina el domingo, tu puesto sigue abierto online para los vecinos que se llevaron tu tarjeta o te buscan en la semana.'
  },
  {
    title: 'Tu catálogo en un link para pasar por WhatsApp.',
    body: 'Un solo enlace limpio en mataderos.ar con qué hacés, dónde estás, fotos reales y tu PDF de productos listo para descargar.'
  },
  {
    title: 'Sello de verificado del barrio.',
    body: 'Cada perfil pasa por una revisión humana de nuestro equipo para cuidar a los vecinos y darle confianza a tu trabajo.'
  },
  {
    title: 'Primera Ronda · Fundadores.',
    body: 'La ficha básica es gratuita para siempre. A los proyectos que se suman en esta primera etapa artesanal les bonificamos el primer año de funciones destacadas como reconocimiento por ser pioneros del portal.'
  }
];

const FAQS = [
  {
    q: '¿Es realmente gratis?',
    a: 'Sí. La landing básica no se paga ni se apaga para forzarte un plan. El alta, la verificación y la ficha en el directorio son gratuitos para siempre. Las funciones Pro y los destacados son optativos.'
  },
  {
    q: '¿Qué pasa después de un año?',
    a: 'Si entraste en la Primera Ronda (Fundadores), a los 12 meses termina el año bonificado y tu perfil sigue online en el plan Gratis: no perdés el sitio ni el catálogo PDF. Te avisamos con anticipación por si querés continuar en Pro (precio TBD).'
  },
  {
    q: '¿Necesito factura?',
    a: 'No hace falta factura ni monotributo para sumarte ni para tener la landing Gratis. Si más adelante contratás Pro o un destacado, los datos fiscales y el comprobante se acuerdan con el medio de pago (TBD).'
  },
  {
    q: '¿Qué significa «verificado»?',
    a: 'Es una revisión editorial hecha por el equipo de Mataderos.ar para confirmar que el emprendimiento es real y tiene vínculo con el barrio o la Feria. No es un sello municipal ni una habilitación del GCBA.'
  },
  {
    q: '¿Puedo estar si solo voy los domingos a la Feria?',
    a: 'Sí. Justamente para eso existe este espacio: para que te puedan contactar y encargar durante toda la semana.'
  }
];

interface PageProps {
  searchParams: Promise<{ nombre?: string; plan?: string }>;
}

export default async function SumateEmprendedoresPage({ searchParams }: PageProps) {
  const [params, emprendedores, takenSlugs] = await Promise.all([
    searchParams,
    fetchEmprendedores(),
    fetchTakenSlugs()
  ]);
  const ejemplo = emprendedores[0];
  const initialName = typeof params.nombre === 'string' ? params.nombre.trim().slice(0, 60) : '';
  const initialPlan: SumateDesiredPlan =
    params.plan === 'gratis_verificado' ? 'gratis_verificado' : 'fundadores';
  const waHref = whatsappUrl(
    'Hola, quiero sumar mi emprendimiento o puesto a la Primera Ronda de Mataderos.ar.'
  );

  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
            <Link href="/" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
              Inicio
            </Link>
            <span className="mx-2 text-carbon/40" aria-hidden="true">
              /
            </span>
            <Link href="/sumate" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
              Sumate
            </Link>
            <span className="mx-2 text-carbon/40" aria-hidden="true">
              /
            </span>
            <span className="text-carbon">Emprendedores</span>
          </nav>

          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-chicago">
            Primera Ronda · Convocatoria Fundadores · Listo en 3 pasos
          </p>
          <h1 className="mt-2 max-w-[16ch] font-display text-[clamp(2.75rem,7.5vw,5rem)] font-semibold uppercase leading-[0.9]">
            Emprendedores y feriantes verificados
          </h1>
          <p className="mt-5 max-w-[62ch] font-serif text-xl leading-relaxed text-carbon/90">
            Un espacio gratuito y permanente en el portal del barrio para puestos de la Feria de Mataderos, La Recova y oficios locales.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href="#armar"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-6 font-semibold text-pampa hover:bg-chicago-dark color-field"
            >
              Armar mi landing en 3 pasos
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            {ejemplo && (
              <Link
                href={`/emprendedores/${ejemplo.slug}`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-6 font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
              >
                Ver un ejemplo real
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
        <div className="editorial-container">
          <SumateBuilder
            mode="emprendedor"
            takenSlugs={takenSlugs}
            initialName={initialName}
            initialPlan={initialPlan}
          />
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Por qué te sirve</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Lo esencial para vender en el barrio
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {BENEFICIOS.map((item) => (
              <div key={item.title} className="border border-carbon/20 bg-pampa-surface p-6">
                <h3 className="font-serif text-xl font-semibold leading-snug">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-carbon/85">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {ejemplo && (
        <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
          <div className="editorial-container">
            <p className="font-mono text-sm uppercase tracking-wider text-chicago">Cómo se ve</p>
            <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
              Un ejemplo de ficha publicada
            </h2>
            <p className="mt-3 max-w-[60ch] text-lg text-carbon/80">
              Esta es una ficha de demostración con la plantilla real que vas a tener en Mataderos.ar, pensada para abrirse rápido desde el celular.
            </p>

            <div className="mt-8 grid items-stretch border border-carbon bg-pampa md:grid-cols-12">
              <div className="relative min-h-[240px] border-b border-carbon/15 md:col-span-5 md:border-b-0 md:border-r">
                <Image
                  src={ejemplo.heroImage}
                  alt={ejemplo.heroAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
                <div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-sm uppercase text-chicago">
                    <span>Verificado por Mataderos.ar</span>
                    <span>·</span>
                    <span>Fundador</span>
                    {ejemplo.isDemo && (
                      <>
                        <span>·</span>
                        <span className="text-carbon/70">Ejemplo</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
                    {ejemplo.displayName}
                  </h3>
                  <p className="mt-2 text-base text-carbon/85">{ejemplo.tagline}</p>
                  <p className="mt-4 font-mono text-sm text-carbon/70">
                    {ejemplo.feriaName} · {ejemplo.locationNote}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/emprendedores/${ejemplo.slug}`}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold hover:bg-carbon hover:text-pampa color-field"
                  >
                    Ver ficha de ejemplo completa
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Planes</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Gratis para siempre, con opción de crecer
          </h2>

          <div className="mt-8 overflow-x-auto border border-carbon/20 bg-pampa-surface">
            <table className="w-full min-w-[640px] border-collapse text-left text-base">
              <thead>
                <tr className="border-b border-carbon bg-pampa font-mono text-sm uppercase">
                  <th className="p-4 font-semibold">Qué incluye</th>
                  <th className="p-4 font-semibold">Gratis (para siempre)</th>
                  <th className="p-4 font-semibold text-chicago">Primera Ronda · Fundadores</th>
                  <th className="p-4 font-semibold">Pro (mensual, TBD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon/15">
                <tr>
                  <td className="p-4 font-medium">Landing en mataderos.ar/emprendedores/[tu-nombre]</td>
                  <td className="p-4">Sí</td>
                  <td className="p-4 font-semibold text-chicago">Sí</td>
                  <td className="p-4">Sí</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Catálogo PDF (máx. 10 MB) y fotos</td>
                  <td className="p-4">Sí</td>
                  <td className="p-4 font-semibold text-chicago">Sí</td>
                  <td className="p-4">Sí, con más cupo</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Sello «Verificado por Mataderos.ar»</td>
                  <td className="p-4">Sí, al aprobarse</td>
                  <td className="p-4 font-semibold text-chicago">Sí</td>
                  <td className="p-4">Sí</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Insignia Fundador y 12 meses de Pro bonificados</td>
                  <td className="p-4">No</td>
                  <td className="p-4 font-semibold text-chicago">Sí</td>
                  <td className="p-4">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Subdominio, catálogo por ítems, stats y prioridad</td>
                  <td className="p-4">No</td>
                  <td className="p-4 font-semibold text-chicago">
                    Sí, durante el año bonificado (a medida que se activan)
                  </td>
                  <td className="p-4">Sí (próximamente)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 max-w-[70ch] text-base text-carbon/75">
            Cuando termina el año de la Primera Ronda Fundadores, tu landing Gratis sigue online. Pro se puede continuar de forma optativa; el precio se publica cuando esté definido. Ver{' '}
            <Link href="/terminos" className="text-chicago underline underline-offset-4">
              términos y condiciones
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Preguntas frecuentes</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Sin letra chica
          </h2>

          <div className="mt-8 max-w-[72ch] divide-y divide-carbon/20 border-y border-carbon/20">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-2">
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 py-2 font-serif text-xl font-semibold [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <span className="font-mono text-base text-chicago group-open:rotate-45">+</span>
                </summary>
                <p className="pb-4 pt-1 text-base leading-relaxed text-carbon/85">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-chicago text-pampa" data-surface="dark">
        <div className="editorial-container">
          <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[0.92]">
            Sumá tu emprendimiento a la Primera Ronda
          </h2>
          <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-pampa/90">
            Escribinos directo por WhatsApp ({PORTAL_WHATSAPP_DISPLAY}) o por mail a{' '}
            <a
              href={mailtoUrl('Sumate Emprendedores · Mataderos.ar')}
              className="font-mono underline underline-offset-4 hover:text-pampa"
            >
              {PORTAL_EMAIL}
            </a>{' '}
            y armamos tu ficha juntos en pocos minutos.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-pampa px-6 font-semibold text-chicago hover:bg-pampa-surface color-field"
            >
              Escribinos por WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <Link
              href="/emprendedores"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-pampa/50 px-6 font-semibold text-pampa hover:bg-pampa hover:text-chicago color-field"
            >
              Ver directorio de emprendedores
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </NotaFrame>
  );
}
