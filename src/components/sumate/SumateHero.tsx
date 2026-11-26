'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { FOTOS, type Foto } from '@/lib/notas/media';
import { trackSumateEvent } from '@/lib/sumate-analytics';

export interface SumateBreadcrumbItem {
  label: string;
  href?: string;
}

export type SumateHeroVisualVariant = 'main' | 'comercios' | 'emprendedores' | 'sponsors';

interface VisualPreset {
  mainPhoto: Foto;
  insetPhoto: Foto;
  placeTag: string;
  cardKicker: string;
  cardTitle: string;
  cardPills: string[];
}

const VISUAL_PRESETS: Record<SumateHeroVisualVariant, VisualPreset> = {
  main: {
    mainPhoto: FOTOS.elPlata,
    insetPhoto: FOTOS.corrales,
    placeTag: 'Av. Juan B. Alberdi · La Recova',
    cardKicker: 'Simulación ilustrativa · Guía barrial',
    cardTitle: 'Horarios claros, catálogo y botón directo a tu WhatsApp',
    cardPills: ['Abierto ahora', 'Cómo llegar', 'WhatsApp en 1 toque']
  },
  comercios: {
    mainPhoto: FOTOS.elPlata,
    insetPhoto: FOTOS.frente,
    placeTag: 'Corredor Av. Alberdi · Comuna 9',
    cardKicker: 'Simulación ilustrativa · Locales y servicios',
    cardTitle: 'Cuando buscan tu rubro cerca de casa, apareces listo para atender',
    cardPills: ['Fotos reales', 'Google ordenado', 'Página propia']
  },
  emprendedores: {
    mainPhoto: FOTOS.corrales,
    insetPhoto: FOTOS.baile,
    placeTag: 'Av. de los Corrales · Feria de Mataderos',
    cardKicker: 'Simulación ilustrativa · Puestos y oficios',
    cardTitle: 'Del domingo en el predio a pedidos por WhatsApp toda la semana',
    cardPills: ['QR en el puesto', 'Catálogo PDF', 'Contacto directo']
  },
  sponsors: {
    mainPhoto: FOTOS.torre,
    insetPhoto: FOTOS.resero,
    placeTag: 'Patrimonio e identidad · Mataderos',
    cardKicker: 'Audiencia barrial · Comuna 9',
    cardTitle: 'Presencia editorial limpia donde el barrio se informa y decide',
    cardPills: ['Portada', 'Agenda semanal', 'Notas patrocinadas']
  }
};

interface SumateHeroProps {
  breadcrumbs: SumateBreadcrumbItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  primaryIsExternal?: boolean;
  primaryPlanId?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  trustLine?: string;
  visualVariant?: SumateHeroVisualVariant;
}

export function SumateHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  primaryIsExternal = true,
  primaryPlanId,
  secondaryCtaLabel,
  secondaryCtaHref,
  trustLine,
  visualVariant = 'main'
}: SumateHeroProps) {
  const preset = VISUAL_PRESETS[visualVariant];

  const handlePrimaryClick = () => {
    trackSumateEvent('sumate_cta_click', { location: 'hero', plan: primaryPlanId });
    if (primaryIsExternal && primaryCtaHref.includes('wa.me')) {
      trackSumateEvent('sumate_whatsapp_click', { location: 'hero', plan: primaryPlanId });
    }
  };

  const handleSecondaryClick = () => {
    trackSumateEvent('sumate_cta_click', { location: 'hero' });
  };

  return (
    <section className="grain-surface border-b border-carbon/15 bg-pampa py-6 sm:py-10 lg:py-14">
      <div className="editorial-container relative z-10">
        <nav
          aria-label="Miga de pan"
          className="flex flex-wrap items-center font-mono text-sm text-chicago sm:text-base"
        >
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.label} className="inline-flex items-center">
              {index > 0 && (
                <span className="mx-2 text-carbon/40" aria-hidden="true">
                  /
                </span>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="inline-flex min-h-[48px] items-center underline underline-offset-4 hover:text-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-carbon">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="mt-2 grid gap-8 lg:mt-4 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Columna editorial + CTAs primero para garantizar visibilidad inmediata en mobile 390 px */}
          <div className="lg:col-span-7">
            <p className="sumate-enter inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-chicago sm:text-sm">
              <span className="sumate-live-dot h-2 w-2 bg-chicago" aria-hidden="true" />
              <span>{eyebrow}</span>
            </p>

            <h1 className="sumate-enter-d1 mt-2 max-w-[17ch] font-display text-[clamp(2.35rem,7.5vw,5rem)] font-semibold uppercase leading-[0.9] text-carbon">
              {title}
            </h1>

            <p className="sumate-enter-d2 mt-3.5 max-w-[56ch] font-serif text-lg leading-snug text-carbon/90 sm:mt-5 sm:text-2xl sm:leading-relaxed">
              {subtitle}
            </p>

            <div className="sumate-enter-d2 mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
              {primaryIsExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handlePrimaryClick}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon sm:w-auto color-field"
                >
                  <span>{primaryCtaLabel}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                </a>
              ) : (
                <a
                  href={primaryCtaHref}
                  onClick={handlePrimaryClick}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon sm:w-auto color-field"
                >
                  <span>{primaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                </a>
              )}

              {secondaryCtaLabel && secondaryCtaHref && (
                <a
                  href={secondaryCtaHref}
                  onClick={handleSecondaryClick}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-6 text-base font-semibold text-carbon hover:bg-carbon hover:text-pampa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago sm:w-auto color-field"
                >
                  <span>{secondaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                </a>
              )}
            </div>

            {trustLine && (
              <p className="sumate-enter-d2 mt-4 font-mono text-xs text-carbon/75 sm:text-sm">
                {trustLine}
              </p>
            )}
          </div>

          {/* Composición fotográfica del barrio + tarjeta flotante */}
          <div className="lg:col-span-5">
            <figure className="relative">
              <div className="sumate-photo-zoom relative aspect-[16/10] w-full border-2 border-carbon bg-carbon sm:aspect-[4/3]">
                <Image
                  src={preset.mainPhoto.src}
                  alt={preset.mainPhoto.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: preset.mainPhoto.objectPosition ?? 'center' }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/65 via-carbon/10 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-pampa/40 bg-carbon/85 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-pampa">
                  <MapPin className="h-3.5 w-3.5 text-pampa" strokeWidth={1.75} aria-hidden="true" />
                  <span>{preset.placeTag}</span>
                </span>
              </div>

              {/* Segunda postal superpuesta en desktop para dar profundidad editorial */}
              <div className="sumate-photo-zoom hidden border-2 border-carbon bg-carbon shadow-sm sm:absolute sm:-right-3 sm:-top-5 sm:block sm:h-28 sm:w-40">
                <Image
                  src={preset.insetPhoto.src}
                  alt={preset.insetPhoto.alt}
                  fill
                  loading="lazy"
                  sizes="160px"
                  className="object-cover"
                  style={{ objectPosition: preset.insetPhoto.objectPosition ?? 'center' }}
                />
              </div>

              {/* Tarjeta flotante animada que sintetiza visualmente la propuesta sin muro de texto */}
              <div className="sumate-float-card relative -mt-8 ml-3 mr-3 border border-carbon bg-pampa-surface p-4 sm:-mt-12 sm:ml-5 sm:mr-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-chicago">
                  {preset.cardKicker}
                </p>
                <p className="mt-1 font-serif text-base font-semibold leading-snug text-carbon sm:text-lg">
                  {preset.cardTitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {preset.cardPills.map((pill, idx) => (
                    <span
                      key={pill}
                      className={`inline-flex items-center gap-1 rounded-[4px] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${
                        idx === 0
                          ? 'bg-chicago font-semibold text-pampa'
                          : 'border border-carbon/25 bg-pampa text-carbon/85'
                      }`}
                    >
                      {idx === 2 && (
                        <Phone className="h-3 w-3 shrink-0" strokeWidth={2} aria-hidden="true" />
                      )}
                      <span>{pill}</span>
                    </span>
                  ))}
                </div>
              </div>

              <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-[11px] text-carbon/65">
                <span>
                  Foto: {preset.mainPhoto.author} ({preset.mainPhoto.license})
                </span>
                <Link href="/notas/creditos" className="underline underline-offset-2 hover:text-chicago">
                  Créditos fotográficos
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
