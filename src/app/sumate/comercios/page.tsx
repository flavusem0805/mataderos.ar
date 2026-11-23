import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { SlugSimulator } from '@/components/sumate/SlugSimulator';
import { PORTAL_WHATSAPP_DISPLAY, whatsappUrl } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Comercios del barrio · Sumate a Mataderos.ar',
  description:
    'Ficha gratuita en la guía de comercios de Mataderos y opción de Web Oficial en tunombre.mataderos.ar.',
  alternates: { canonical: 'https://mataderos.ar/sumate/comercios' },
  openGraph: {
    title: 'Comercios del barrio · Sumate a Mataderos.ar',
    description:
      'Que el vecino te encuentre en la guía del barrio y, si querés, activá tu Web Oficial en tunombre.mataderos.ar.',
    url: 'https://mataderos.ar/sumate/comercios',
    locale: 'es_AR',
    type: 'website'
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Sumate como comercio en Mataderos.ar',
      url: 'https://mataderos.ar/sumate/comercios'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
        { '@type': 'ListItem', position: 2, name: 'Sumate', item: 'https://mataderos.ar/sumate' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Comercios',
          item: 'https://mataderos.ar/sumate/comercios'
        }
      ]
    }
  ]
};

const BENEFICIOS = [
  {
    title: 'Que el vecino te encuentre en la guía del barrio.',
    body: 'Nombre, dirección exacta, horario actualizado y botón directo a tu WhatsApp dentro de Comercios del barrio.'
  },
  {
    title: 'Una página clara cuando te buscan en Google.',
    body: 'Datos estructurados de tu local, zona y cómo llegar, pensados para búsquedas de cercanía en Mataderos y Comuna 9.'
  },
  {
    title: 'Tu Web Oficial en tunombre.mataderos.ar.',
    body: 'Si activás el plan pago, tenés tu propia dirección web con servicios, descripción completa y prioridad en el directorio.'
  },
  {
    title: 'La ficha básica es gratuita.',
    body: 'Podés estar en la guía sin costo y sumar la Web Oficial cuando te sirva, sin perder tu ficha.'
  }
];

const PASOS = [
  {
    step: '01',
    title: 'Nos pasás el nombre de tu local',
    body: 'Probá abajo cómo quedaría tu dirección o escribinos directo por WhatsApp.'
  },
  {
    step: '02',
    title: 'Armamos la ficha gratuita en la guía',
    body: 'Cargamos dirección, horarios, rubro y WhatsApp para que los vecinos ya te encuentren.'
  },
  {
    step: '03',
    title: 'Si querés, activamos tu Web Oficial',
    body: 'Publicamos tu página en tunombre.mataderos.ar con tus servicios y fotos (precio TBD).'
  }
];

const FAQS = [
  {
    q: '¿Es realmente gratis?',
    a: 'La ficha básica en la guía de comercios sí. La Web Oficial con subdominio propio es el plan pago para comercios (precio TBD). No es el mismo plan Pro de los feriantes.'
  },
  {
    q: '¿Qué pasa después de un año?',
    a: 'A los comercios no les corre la Primera Ronda de Fundadores (que es exclusiva para emprendedores y feriantes). La ficha gratuita no tiene vencimiento de cortesía. Si contratás Web Oficial, las condiciones de renovación se pactan con ese plan (TBD).'
  },
  {
    q: '¿Necesito factura?',
    a: 'No para pedir la ficha gratuita. Para la Web Oficial, el comprobante y el encuadre fiscal se acuerdan al contratar (TBD).'
  },
  {
    q: '¿Puedo elegir el subdominio?',
    a: 'Sí, siempre que esté libre y no pise un nombre reservado ni el de otro comercio o emprendedor del portal.'
  }
];

export default function SumateComerciosPage() {
  const waHref = whatsappUrl('Hola, quiero sumar mi comercio a Mataderos.ar.');

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
            <span className="text-carbon">Comercios</span>
          </nav>

          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-ladrillo">
            Locales a la calle · Mataderos
          </p>
          <h1 className="mt-2 max-w-[16ch] font-display text-[clamp(2.75rem,7.5vw,5rem)] font-semibold uppercase leading-[0.9]">
            Tu comercio en la guía del barrio
          </h1>
          <p className="mt-5 max-w-[62ch] font-serif text-xl leading-relaxed text-carbon/90">
            Presencia clara para los vecinos que buscan cerca de casa, con ficha gratuita en el directorio y la opción de tu Web Oficial en tunombre.mataderos.ar.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-6 font-semibold text-pampa hover:bg-chicago-dark color-field"
            >
              Sumate por WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <Link
              href="/comercio/veterinariaflavio"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-6 font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
            >
              Ver una Web Oficial en vivo
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Por qué te sirve</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Más visibilidad en el barrio y en Google
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {BENEFICIOS.map((item) => (
              <div key={item.title} className="border border-carbon/20 bg-pampa p-6">
                <h3 className="font-serif text-xl font-semibold leading-snug">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-carbon/85">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Cómo se ve</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Un ejemplo real en Mataderos.ar
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-carbon/20 bg-pampa-surface p-6 sm:p-8">
              <p className="font-mono text-sm uppercase text-chicago">Web Oficial activa</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">Veterinaria Flavio</h3>
              <p className="mt-2 font-mono text-base text-carbon/75">
                veterinariaflavio.mataderos.ar
              </p>
              <p className="mt-4 text-base leading-relaxed text-carbon/85">
                Página propia con servicios, horarios, dirección en el barrio y botón directo a WhatsApp.
              </p>
              <div className="mt-6">
                <Link
                  href="/comercio/veterinariaflavio"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold hover:bg-carbon hover:text-pampa color-field"
                >
                  Abrir ejemplo de Web Oficial
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <SlugSimulator />
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Planes</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Ficha gratuita o Web Oficial
          </h2>

          <div className="mt-8 overflow-x-auto border border-carbon/20 bg-pampa">
            <table className="w-full min-w-[540px] border-collapse text-left text-base">
              <thead>
                <tr className="border-b border-carbon bg-pampa-surface font-mono text-sm uppercase">
                  <th className="p-4 font-semibold">Qué incluye</th>
                  <th className="p-4 font-semibold">Ficha gratuita</th>
                  <th className="p-4 font-semibold text-chicago">Web oficial (TBD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-carbon/15">
                <tr>
                  <td className="p-4 font-medium">Nombre, dirección, horario y WhatsApp en la guía</td>
                  <td className="p-4">Sí</td>
                  <td className="p-4 font-semibold text-chicago">Sí</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Aparecer en «Comercios del barrio»</td>
                  <td className="p-4">Sí</td>
                  <td className="p-4 font-semibold text-chicago">Sí, con prioridad de Web oficial</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Página propia en tunombre.mataderos.ar</td>
                  <td className="p-4">No</td>
                  <td className="p-4 font-semibold text-chicago">Sí</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Servicios, descripción larga y mapa</td>
                  <td className="p-4">Básica</td>
                  <td className="p-4 font-semibold text-chicago">Completa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Cómo funciona</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Tres pasos simples
          </h2>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {PASOS.map((paso) => (
              <li key={paso.step} className="border border-carbon/20 bg-pampa-surface p-6">
                <p className="font-mono text-2xl font-semibold text-chicago">{paso.step}</p>
                <h3 className="mt-3 font-serif text-xl font-semibold">{paso.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-carbon/85">{paso.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">Preguntas frecuentes</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Dudas comunes
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

      <section className="section-pad bg-carbon text-pampa" data-surface="dark">
        <div className="editorial-container">
          <h2 className="max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[0.92]">
            Sumá tu comercio a la guía
          </h2>
          <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-pampa/85">
            Escribinos por WhatsApp ({PORTAL_WHATSAPP_DISPLAY}) con el nombre y dirección de tu local.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-pampa px-6 font-semibold text-carbon hover:bg-pampa-surface color-field"
            >
              Sumate por WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <Link
              href="/#directorio"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-pampa/40 px-6 font-semibold text-pampa hover:bg-pampa hover:text-carbon color-field"
            >
              Ver Comercios del barrio
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </NotaFrame>
  );
}
