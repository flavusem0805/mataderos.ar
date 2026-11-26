import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { LeadForm } from '@/components/sumate/LeadForm';
import { SumateHero } from '@/components/sumate/SumateHero';
import { SumateViewTracker } from '@/components/sumate/SumateViewTracker';
import { TrustBar } from '@/components/sumate/TrustBar';
import { WhatsAppCta } from '@/components/sumate/WhatsAppCta';
import { SUMATE_SPONSORS } from '@/content/sumate';

export const metadata: Metadata = {
  title: 'Sponsors y marcas locales | Sumate a Mataderos.ar',
  description:
    'Llegá a los vecinos que buscan, comparan y compran en Mataderos y Comuna 9. Presencia editorial en portada, WhatsApp/newsletter, contenido y eventos.',
  alternates: { canonical: 'https://mataderos.ar/sumate/sponsors' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Sponsors y marcas locales | Mataderos.ar',
    description:
      'Audiencia barrial de Comuna 9, formatos editoriales cuidados y condiciones de lanzamiento en acceso anticipado.',
    url: 'https://mataderos.ar/sumate/sponsors',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/sumate/og-sumate.jpg',
        width: 1200,
        height: 630,
        alt: 'Sponsors en Mataderos.ar'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sponsors y marcas locales | Mataderos.ar',
    description: 'Pedí el media kit de Mataderos.ar para bancos, inmobiliarias, clínicas, colegios y marcas.',
    images: ['/sumate/og-sumate.jpg']
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Patrocinios y formatos editoriales en Mataderos.ar',
      url: 'https://mataderos.ar/sumate/sponsors',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires'
      },
      provider: {
        '@type': 'Organization',
        name: 'Mataderos.ar',
        url: 'https://mataderos.ar'
      }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
        { '@type': 'ListItem', position: 2, name: 'Sumate', item: 'https://mataderos.ar/sumate' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Sponsors',
          item: 'https://mataderos.ar/sumate/sponsors'
        }
      ]
    }
  ]
};

const SPONSOR_TRUST_ITEMS = [
  'Audiencia local · Comuna 9',
  'Formatos sin pop-ups',
  'Mención patrocinada clara',
  'Acceso anticipado · Media kit'
];

export default function SumateSponsorsPage() {
  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SumateViewTracker page="sponsors" />

      <SumateHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Sumate', href: '/sumate' },
          { label: 'Sponsors' }
        ]}
        eyebrow={SUMATE_SPONSORS.eyebrow}
        title={SUMATE_SPONSORS.title}
        subtitle={SUMATE_SPONSORS.body}
        primaryCtaLabel={SUMATE_SPONSORS.ctaLabel}
        primaryCtaHref={SUMATE_SPONSORS.ctaHref}
        primaryPlanId="sponsor"
        secondaryCtaLabel="Dejar datos de contacto"
        secondaryCtaHref="#contacto"
        trustLine="Presencia editorial limpia · Condiciones de acceso anticipado · Respuesta en el día"
      />

      <TrustBar items={SPONSOR_TRUST_ITEMS} />

      <section
        aria-labelledby="sponsor-formatos-heading"
        className="section-pad border-b border-carbon/15 bg-pampa"
      >
        <div className="editorial-container">
          <p className="font-mono text-sm uppercase tracking-wider text-chicago">
            Formatos disponibles
          </p>
          <h2
            id="sponsor-formatos-heading"
            className="mt-2 max-w-[24ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
          >
            Sé parte de la vida del barrio, sin ruido publicitario
          </h2>
          <p className="mt-3 max-w-[64ch] text-lg leading-relaxed text-carbon/85">
            Trabajamos con cupos acotados por categoría para cuidar la lectura de los vecinos y la recordación de cada marca.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {SUMATE_SPONSORS.formats.map((format) => (
              <article
                key={format.title}
                className="border border-carbon/25 bg-pampa-surface p-6"
              >
                <div className="flex items-start gap-3">
                  <Check
                    className="mt-1 h-5 w-5 shrink-0 text-chicago"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-carbon">
                      {format.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-carbon/85">{format.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 border-l-4 border-chicago bg-pampa-surface p-5 text-base leading-relaxed text-carbon/85">
            <strong className="font-semibold text-carbon">Transparencia editorial:</strong>{' '}
            todo contenido o espacio auspiciado lleva identificación explícita. No publicamos reseñas pagas ni notas encubiertas; las condiciones comerciales y de facturación se acuerdan por escrito antes de iniciar cada campaña.
          </div>
        </div>
      </section>

      <LeadForm
        initialPlan="sponsor"
        heading="Pedí el media kit y formatos disponibles"
        subtitle="Dejanos tus datos y te enviamos hoy la presentación con métricas del portal y espacios en acceso anticipado."
        addressPlaceholder="Ej: Sucursal Mataderos / Comuna 9 / Cobertura CABA"
        categoryPlaceholder="Ej: Banco, inmobiliaria, clínica, colegio, marca de consumo"
      />

      <WhatsAppCta
        eyebrow="Sponsors · Media kit"
        title="¿Conversamos sobre presencia en Mataderos?"
        body="Escribinos por WhatsApp y te compartimos el media kit con formatos, fechas disponibles y propuesta a medida."
        ctaLabel={SUMATE_SPONSORS.ctaLabel}
        ctaHref={SUMATE_SPONSORS.ctaHref}
        planId="sponsor"
      />
    </NotaFrame>
  );
}
