import type { Metadata } from 'next';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { ComparisonTable } from '@/components/sumate/ComparisonTable';
import { Deliverables } from '@/components/sumate/Deliverables';
import { FaqAccordion } from '@/components/sumate/FaqAccordion';
import { FoundersBand } from '@/components/sumate/FoundersBand';
import { HowItWorks } from '@/components/sumate/HowItWorks';
import { LeadForm } from '@/components/sumate/LeadForm';
import { PlansGrid } from '@/components/sumate/PlansGrid';
import { SumateBuilder } from '@/components/sumate/SumateBuilder';
import { SumateHero } from '@/components/sumate/SumateHero';
import { SumateViewTracker } from '@/components/sumate/SumateViewTracker';
import { TrustBar } from '@/components/sumate/TrustBar';
import { WhatsAppCta } from '@/components/sumate/WhatsAppCta';
import { SUMATE_FAQ, SUMATE_TRUST_ITEMS } from '@/content/sumate';
import { whatsappUrl } from '@/lib/contact';
import type { SumateDesiredPlan } from '@/lib/slugs';
import { COMERCIO_PLANS, isSumatePlanId, type SumatePlanId } from '@/lib/sumate-plans';
import { fetchTakenSlugs } from '@/lib/supabase';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Comercios del barrio | Sumate a Mataderos.ar',
  description:
    'Más clientes de Mataderos para tu local o servicio: te ponemos en la guía del barrio, en Google y en WhatsApp. Ficha gratis y planes gestionados en acceso anticipado.',
  alternates: { canonical: 'https://mataderos.ar/sumate/comercios' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Comercios del barrio | Sumate a Mataderos.ar',
    description:
      'Presencia gestionada y ficha gratuita para locales y servicios de Mataderos. Vos atendés; nosotros ordenamos fotos, horarios, catálogo y Google.',
    url: 'https://mataderos.ar/sumate/comercios',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/sumate/og-sumate.jpg',
        width: 1200,
        height: 630,
        alt: 'Comercios del barrio — Sumate a Mataderos.ar'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comercios del barrio | Sumate a Mataderos.ar',
    description:
      'Más clientes del barrio para tu comercio sin aprender marketing. Ficha gratis y planes en acceso anticipado.',
    images: ['/sumate/og-sumate.jpg']
  }
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Presencia gestionada para comercios de Mataderos',
      url: 'https://mataderos.ar/sumate/comercios',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planes para comercios de Mataderos.ar',
        itemListElement: COMERCIO_PLANS.map((plan) => ({
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

interface PageProps {
  searchParams: Promise<{ nombre?: string; plan?: string }>;
}

export default async function SumateComerciosPage({ searchParams }: PageProps) {
  const [params, takenSlugs] = await Promise.all([searchParams, fetchTakenSlugs()]);
  const initialName = typeof params.nombre === 'string' ? params.nombre.trim().slice(0, 60) : '';
  const initialLeadPlan: SumatePlanId | undefined = isSumatePlanId(params.plan)
    ? params.plan
    : 'encontrado';
  const initialBuilderPlan: SumateDesiredPlan =
    params.plan === 'web_oficial' || params.plan === 'encontrado' || params.plan === 'presencia'
      ? 'web_oficial'
      : 'ficha_gratuita';

  const heroWaHref = whatsappUrl(
    initialName
      ? `Hola, tengo el comercio «${initialName}» en Mataderos y quiero coordinar 15 minutos para sumarme a Mataderos.ar.`
      : 'Hola, tengo un comercio en Mataderos y quiero que me encuentren más vecinos. ¿Hablamos 15 minutos?'
  );

  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SumateViewTracker page="comercios" />

      <SumateHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Sumate', href: '/sumate' },
          { label: 'Comercios' }
        ]}
        eyebrow="Comercios y servicios a la calle · Mataderos"
        title="Más consultas del barrio para tu local."
        subtitle="Te ponemos en la guía donde los vecinos buscan, en Google y en WhatsApp. Cargamos fotos reales, horarios y catálogo. Tu Página en Mataderos.ar viene incluida en los planes gestionados."
        primaryCtaLabel="Quiero que me encuentren"
        primaryCtaHref={heroWaHref}
        primaryPlanId={initialLeadPlan}
        secondaryCtaLabel="Ver planes para comercios"
        secondaryCtaHref="#planes"
        trustLine="Ficha gratis · Acceso anticipado · Sin contrato · Te respondemos hoy"
        visualVariant="comercios"
      />

      <TrustBar items={SUMATE_TRUST_ITEMS} />

      <HowItWorks />

      <div className="flex flex-col">
        <PlansGrid
          className="order-1 lg:order-3"
          primaryPlans={COMERCIO_PLANS}
          secondaryPlans={[]}
          heading="Elegí el nivel de acompañamiento"
          subtitle="La ficha básica en la guía es gratuita para siempre. Los planes Encontrado y Presencia están en etapa de acceso anticipado con condiciones preferenciales."
        />
        <Deliverables className="order-2 lg:order-1" />
        <ComparisonTable className="order-3 lg:order-2" />
      </div>

      <FoundersBand />

      <LeadForm
        initialPlan={initialLeadPlan}
        heading="Coordinemos 15 minutos por WhatsApp"
        subtitle="Dejanos los datos de tu local y te escribimos hoy para revisar tu presencia actual sin compromiso."
        addressPlaceholder="Ej: Av. Alberdi 6200 o Emilio Castro 7150"
      />

      {/* Constructor conservado como demo secundaria preservando compatibilidad con #armar */}
      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <SumateBuilder
            mode="comercio"
            takenSlugs={takenSlugs}
            initialName={initialName}
            initialPlan={initialBuilderPlan}
          />
        </div>
      </section>

      <FaqAccordion />

      <WhatsAppCta
        ctaHref={heroWaHref}
        planId={initialLeadPlan}
      />
    </NotaFrame>
  );
}
