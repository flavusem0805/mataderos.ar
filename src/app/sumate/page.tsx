import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { SumateTriager } from '@/components/sumate/SumateTriager';

export const metadata: Metadata = {
  title: 'Sumate a Mataderos.ar · Emprendedores y comercios del barrio',
  description:
    'Si tenés un puesto en la Feria de Mataderos o un local en el barrio, armamos tu lugar en Mataderos.ar en 3 pasos. Gratis para empezar.',
  alternates: { canonical: 'https://mataderos.ar/sumate' },
  openGraph: {
    title: 'Tu lugar en Mataderos, también online · Mataderos.ar',
    description:
      'Dos caminos claros y un armador en 3 pasos: Emprendedores y feriantes verificados, o Comercios del barrio con ficha y Web Oficial.',
    url: 'https://mataderos.ar/sumate',
    locale: 'es_AR',
    type: 'website'
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Sumate a Mataderos.ar',
      url: 'https://mataderos.ar/sumate',
      description:
        'Propuesta de valor para feriantes, emprendedores y comercios de Mataderos, Comuna 9.'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
        { '@type': 'ListItem', position: 2, name: 'Sumate', item: 'https://mataderos.ar/sumate' }
      ]
    }
  ]
};

const ACTIVATION_STEPS = [
  {
    step: '01',
    title: 'Elegís dirección y rubro',
    body: 'Comprobás al instante si tu nombre web está libre en mataderos.ar.'
  },
  {
    step: '02',
    title: 'Ves tu sitio antes de enviar',
    body: 'Completás zona, horarios y WhatsApp mientras mirás la previa real en vivo.'
  },
  {
    step: '03',
    title: 'Revisión humana y online',
    body: 'Verificamos tu vínculo con Mataderos y queda publicado sin trámites.'
  }
];

export default function SumatePage() {
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
            <span className="text-carbon">Sumate</span>
          </nav>

          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-chicago">
            En 3 pasos · Sin registro previo · Gratis para empezar
          </p>
          <h1 className="mt-2 max-w-[16ch] font-display text-[clamp(2.75rem,8vw,5.25rem)] font-semibold uppercase leading-[0.9]">
            Tu lugar en Mataderos, también online
          </h1>

          <p className="mt-5 max-w-[62ch] font-serif text-xl leading-relaxed text-carbon/90 sm:text-2xl">
            Si tenés un puesto en la Feria o un local en el barrio, en tres pasos ya dejás preparada tu ficha en Mataderos.ar con vista previa en vivo antes de enviarla.
          </p>

          <ol
            aria-label="Cómo se activa tu sitio en 3 pasos"
            className="mt-8 grid gap-4 border border-carbon/25 bg-pampa-surface p-5 sm:grid-cols-3 sm:p-6"
          >
            {ACTIVATION_STEPS.map((item) => (
              <li key={item.step} className="border-t border-carbon/15 pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0 first:border-0 first:pl-0 first:pt-0">
                <p className="font-mono text-lg font-semibold text-chicago">{item.step}</p>
                <p className="mt-1 font-serif text-lg font-semibold text-carbon">{item.title}</p>
                <p className="mt-1 text-base leading-relaxed text-carbon/80">{item.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Link
              href="/sumate/emprendedores#armar"
              className="group flex min-h-[260px] flex-col justify-between border border-carbon bg-pampa-surface p-7 transition-colors hover:bg-chicago hover:text-pampa sm:p-9 color-field"
            >
              <div>
                <p className="font-mono text-sm uppercase tracking-wider text-chicago group-hover:text-pampa/80">
                  Feria de Mataderos · La Recova · Oficios
                </p>
                <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-[0.95]">
                  Soy emprendedor o feriante
                </h2>
                <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-carbon/85 group-hover:text-pampa/90">
                  Una landing simple, un catálogo para pasar por WhatsApp y el sello de verificado del barrio.
                </p>
              </div>
              <span className="mt-8 inline-flex min-h-[48px] items-center gap-2 font-mono text-base font-semibold uppercase tracking-wide">
                Armar mi ficha en 3 pasos
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/sumate/comercios#armar"
              className="group flex min-h-[260px] flex-col justify-between border border-carbon bg-pampa-surface p-7 transition-colors hover:bg-carbon hover:text-pampa sm:p-9 color-field"
            >
              <div>
                <p className="font-mono text-sm uppercase tracking-wider text-ladrillo group-hover:text-pampa/80">
                  Locales a la calle · Comuna 9
                </p>
                <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-[0.95]">
                  Tengo un comercio
                </h2>
                <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-carbon/85 group-hover:text-pampa/90">
                  Ficha en la guía del barrio y, si querés, tu web oficial en tunombre.mataderos.ar.
                </p>
              </div>
              <span className="mt-8 inline-flex min-h-[48px] items-center gap-2 font-mono text-base font-semibold uppercase tracking-wide">
                Probar mi comercio en 3 pasos
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </div>

          <SumateTriager />
        </div>
      </section>
    </NotaFrame>
  );
}
