import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { FaqAccordion } from '@/components/sumate/FaqAccordion';
import { HowItWorks } from '@/components/sumate/HowItWorks';
import { LeadForm } from '@/components/sumate/LeadForm';
import { PlansGrid } from '@/components/sumate/PlansGrid';
import { SumateBuilder } from '@/components/sumate/SumateBuilder';
import { SumateHero } from '@/components/sumate/SumateHero';
import { SumateViewTracker } from '@/components/sumate/SumateViewTracker';
import { TrustBar } from '@/components/sumate/TrustBar';
import { WhatsAppCta } from '@/components/sumate/WhatsAppCta';
import { SUMATE_TRUST_ITEMS, type SumateFaqItem } from '@/content/sumate';
import { whatsappUrl } from '@/lib/contact';
import type { SumateDesiredPlan } from '@/lib/slugs';
import { FERIA_Y_GRATIS_PLANS, isSumatePlanId, type SumatePlanId } from '@/lib/sumate-plans';
import { fetchEmprendedores, fetchTakenSlugs } from '@/lib/supabase';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Feria y emprendedores | Sumate a Mataderos.ar',
  description:
    'Puestos de la Feria de Mataderos, artesanos y emprendimientos del barrio: que el domingo te encuentren en el predio y en la semana te escriban por WhatsApp.',
  alternates: { canonical: 'https://mataderos.ar/sumate/emprendedores' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Feria y emprendedores | Sumate a Mataderos.ar',
    description:
      'Ficha gratis para siempre en la guía del barrio y plan Feria en acceso anticipado con fotos reales, QR de puesto y catálogo por WhatsApp.',
    url: 'https://mataderos.ar/sumate/emprendedores',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/sumate/og-sumate.jpg',
        width: 1200,
        height: 630,
        alt: 'Feria y emprendedores — Sumate a Mataderos.ar'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feria y emprendedores | Sumate a Mataderos.ar',
    description:
      'Que el domingo te encuentren en la Feria y en la semana te sigan escribiendo por WhatsApp.',
    images: ['/sumate/og-sumate.jpg']
  }
};

const FERIA_FAQ: SumateFaqItem[] = [
  {
    id: 'faq-feria-gratis',
    question: '¿Puedo estar gratis en la guía?',
    answer:
      'Sí. La Ficha del barrio ($0) es gratuita para siempre y nunca se da de baja para forzarte un plan pago. El plan Feria es optativo si querés fotos, QR de puesto y difusión por temporada.'
  },
  {
    id: 'faq-feria-domingos',
    question: '¿Sirve si solo armo puesto los domingos en la Feria?',
    answer:
      'Sí, justamente está pensado para eso: que los visitantes que pasaron el domingo puedan encontrarte, ver tu catálogo y encargarte por WhatsApp durante toda la semana.'
  },
  {
    id: 'faq-feria-qr',
    question: '¿Cómo funciona el QR para el puesto?',
    answer:
      'En el plan Feria te entregamos el archivo listo para imprimir y poner en tu mesa o cartel, apuntando directo a tu página en Mataderos.ar con catálogo y botón de WhatsApp.'
  },
  {
    id: 'faq-feria-verificacion',
    question: '¿Qué revisan antes de publicar mi ficha?',
    answer:
      'Hacemos una revisión humana simple para confirmar que el emprendimiento es real y tiene vínculo con Mataderos o la Feria. No es una habilitación municipal.'
  },
  {
    id: 'faq-feria-precios',
    question: '¿Cómo funciona el acceso anticipado del plan Feria?',
    answer:
      'Estamos en etapa de lanzamiento con condiciones preferenciales por temporada. Te pasamos la propuesta completa y las condiciones por escrito por WhatsApp antes de confirmar.'
  }
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Presencia para feriantes y emprendedores en Mataderos.ar',
      url: 'https://mataderos.ar/sumate/emprendedores',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Feria de Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planes para feriantes y emprendedores',
        itemListElement: FERIA_Y_GRATIS_PLANS.map((plan) => ({
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
      mainEntity: FERIA_FAQ.map((faq) => ({
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
          name: 'Emprendedores y Feria',
          item: 'https://mataderos.ar/sumate/emprendedores'
        }
      ]
    }
  ]
};

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
  const initialLeadPlan: SumatePlanId = isSumatePlanId(params.plan) ? params.plan : 'feria';
  const initialBuilderPlan: SumateDesiredPlan =
    params.plan === 'ficha' || params.plan === 'gratis_verificado'
      ? 'gratis_verificado'
      : 'fundadores';

  const waHref = whatsappUrl(
    'Hola, tengo un puesto en la Feria o un emprendimiento en Mataderos y quiero sumar mi proyecto a Mataderos.ar.'
  );

  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SumateViewTracker page="emprendedores" />

      <SumateHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Sumate', href: '/sumate' },
          { label: 'Feria y emprendedores' }
        ]}
        eyebrow="Feria de Mataderos · La Recova · Oficios"
        title="El domingo te encuentran en el predio. En la semana te escriben."
        subtitle="Tu ficha en la guía del barrio es gratuita para siempre. Si querés que saquemos tus fotos, armemos tu catálogo por WhatsApp y te demos QR para el puesto, consultá el plan Feria en acceso anticipado."
        primaryCtaLabel="Quiero sumar mi puesto"
        primaryCtaHref={waHref}
        primaryPlanId="feria"
        secondaryCtaLabel="Ver Ficha gratis y plan Feria"
        secondaryCtaHref="#planes"
        trustLine="Ficha gratis para siempre · Acceso anticipado plan Feria · Te respondemos hoy"
        visualVariant="emprendedores"
      />

      <TrustBar items={SUMATE_TRUST_ITEMS} />

      <PlansGrid
        primaryPlans={FERIA_Y_GRATIS_PLANS}
        secondaryPlans={[]}
        heading="Gratis para estar. Plan Feria para crecer."
        subtitle="Arrancá sin costo con la Ficha del barrio o sumá el acompañamiento por temporada para que te ubiquen el domingo y te compren toda la semana."
      />

      <HowItWorks />

      {ejemplo && (
        <section className="section-pad border-b border-carbon/15 bg-pampa-surface">
          <div className="editorial-container">
            <p className="font-mono text-sm uppercase tracking-wider text-chicago">
              Plantilla de referencia
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon">
              Así se ve una ficha en el celular
            </h2>
            <p className="mt-3 max-w-[60ch] text-lg text-carbon/80">
              Esta es una ficha de demostración armada con nuestra plantilla real, optimizada para abrir rápido desde un QR o un link de WhatsApp.
            </p>

            <div className="mt-8 grid items-stretch border border-carbon bg-pampa md:grid-cols-12">
              <div className="relative min-h-[240px] border-b border-carbon/15 md:col-span-5 md:border-b-0 md:border-r">
                <Image
                  src={ejemplo.heroImage}
                  alt={ejemplo.heroAlt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
                <div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm uppercase text-chicago">
                    {ejemplo.isDemo ? (
                      <span className="font-semibold text-carbon">Ficha de ejemplo</span>
                    ) : (
                      <span>Verificado por Mataderos.ar</span>
                    )}
                    <span aria-hidden="true">·</span>
                    <span>{ejemplo.category}</span>
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
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold hover:bg-carbon hover:text-pampa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago color-field"
                  >
                    <span>Ver ficha de ejemplo completa</span>
                    <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <LeadForm
        initialPlan={initialLeadPlan}
        heading="Contanos de tu puesto o emprendimiento"
        subtitle="Dejanos estos 4 datos y coordinamos por WhatsApp hoy mismo."
        addressPlaceholder="Ej: Feria de Mataderos o «Solo feria»"
        categoryPlaceholder="Ej: Cuero, artesanías, dulces, indumentaria, oficios"
      />

      {/* Constructor conservado como demo secundaria preservando compatibilidad con #armar */}
      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <SumateBuilder
            mode="emprendedor"
            takenSlugs={takenSlugs}
            initialName={initialName}
            initialPlan={initialBuilderPlan}
          />
        </div>
      </section>

      <FaqAccordion
        items={FERIA_FAQ}
        eyebrow="Preguntas frecuentes · Feria"
        title="Sin letra chica"
      />

      <WhatsAppCta
        title="¿Sumamos tu puesto esta semana?"
        body="Contanos qué hacés y si estás los domingos en la Feria o en tu taller. Te respondemos hoy."
        ctaHref={waHref}
        planId="feria"
      />
    </NotaFrame>
  );
}
