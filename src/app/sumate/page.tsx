import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { ComparisonTable } from '@/components/sumate/ComparisonTable';
import { Deliverables } from '@/components/sumate/Deliverables';
import { FaqAccordion } from '@/components/sumate/FaqAccordion';
import { FoundersBand } from '@/components/sumate/FoundersBand';
import { HowItWorks } from '@/components/sumate/HowItWorks';
import { LeadForm } from '@/components/sumate/LeadForm';
import { PlansGrid } from '@/components/sumate/PlansGrid';
import { SponsorBlock } from '@/components/sumate/SponsorBlock';
import { SumateHero } from '@/components/sumate/SumateHero';
import { SumateViewTracker } from '@/components/sumate/SumateViewTracker';
import { TrustBar } from '@/components/sumate/TrustBar';
import { WhatsAppCta } from '@/components/sumate/WhatsAppCta';
import { SUMATE_FAQ, SUMATE_HERO, SUMATE_TRUST_ITEMS } from '@/content/sumate';
import { isSumatePlanId, SUMATE_PLANS, type SumatePlanId } from '@/lib/sumate-plans';

export const metadata: Metadata = {
  title: 'Sumate a Mataderos.ar | Más clientes del barrio',
  description:
    'Comercios, servicios y ferias de Mataderos: te ponemos en la guía, en Google y en WhatsApp. Ficha gratis y planes de presencia gestionada.',
  alternates: { canonical: 'https://mataderos.ar/sumate' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Sumate a Mataderos.ar | Más clientes del barrio',
    description:
      'Más clientes del barrio, sin aprender marketing. Te ponemos en la guía donde los vecinos buscan, en Google y en WhatsApp.',
    url: 'https://mataderos.ar/sumate',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/sumate/og-sumate.jpg',
        width: 1200,
        height: 630,
        alt: 'Sumate a Mataderos.ar — Más clientes del barrio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sumate a Mataderos.ar | Más clientes del barrio',
    description:
      'Comercios, servicios y ferias de Mataderos: ficha gratis y planes de presencia gestionada en acceso anticipado.',
    images: ['/sumate/og-sumate.jpg']
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Presencia gestionada y guía comercial en Mataderos.ar',
      url: 'https://mataderos.ar/sumate',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires'
      },
      provider: {
        '@type': 'Organization',
        name: 'Mataderos.ar',
        url: 'https://mataderos.ar'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planes de Mataderos.ar',
        itemListElement: SUMATE_PLANS.map((plan) => ({
          '@type': 'Offer',
          name: plan.name,
          description: `${plan.audience}. ${plan.includes.join('. ')}.`,
          ...(plan.id === 'ficha'
            ? { price: '0', priceCurrency: 'ARS' }
            : { availability: 'https://schema.org/PreOrder' })
        }))
      }
    },
    {
      '@type': 'FAQPage',
      mainEntity: SUMATE_FAQ.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
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

interface PageProps {
  searchParams: Promise<{ plan?: string }>;
}

export default async function SumatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialPlan: SumatePlanId | undefined = isSumatePlanId(params.plan)
    ? params.plan
    : undefined;

  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SumateViewTracker page="sumate" />

      <SumateHero
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Sumate' }]}
        eyebrow={SUMATE_HERO.eyebrow}
        title={SUMATE_HERO.h1}
        subtitle={SUMATE_HERO.sub}
        primaryCtaLabel={SUMATE_HERO.primaryCtaLabel}
        primaryCtaHref={SUMATE_HERO.primaryCtaHref}
        secondaryCtaLabel={SUMATE_HERO.secondaryCtaLabel}
        secondaryCtaHref={SUMATE_HERO.secondaryCtaHref}
        trustLine={SUMATE_HERO.trustLine}
      />

      <TrustBar items={SUMATE_TRUST_ITEMS} />

      <HowItWorks />

      {/* En mobile los planes van antes que el detalle largo; en desktop mantienen orden 4 -> 5 -> 6 */}
      <div className="flex flex-col">
        <PlansGrid className="order-1 lg:order-3" />
        <Deliverables className="order-2 lg:order-1" />
        <ComparisonTable className="order-3 lg:order-2" />
      </div>

      <FoundersBand />

      <SponsorBlock />

      <FaqAccordion />

      <LeadForm initialPlan={initialPlan} />

      <section className="border-b border-carbon/15 bg-pampa py-8">
        <div className="editorial-container flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-chicago">
              Demo interactiva opcional
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-carbon">
              ¿Querés ver cómo quedaría tu ficha? Probala vos mismo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sumate/comercios#armar"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-5 text-sm font-semibold text-carbon hover:bg-carbon hover:text-pampa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago color-field"
            >
              <span>Probar demo para comercios</span>
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <Link
              href="/sumate/emprendedores#armar"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon/40 bg-pampa-surface px-5 text-sm font-semibold text-carbon hover:border-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
            >
              <span>Probar demo para feria</span>
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppCta />
    </NotaFrame>
  );
}
