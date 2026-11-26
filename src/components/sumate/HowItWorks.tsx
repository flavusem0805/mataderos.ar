'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SUMATE_HOW_IT_WORKS } from '@/content/sumate';
import { FOTOS, type Foto } from '@/lib/notas/media';
import { trackSumateEvent } from '@/lib/sumate-analytics';
import { RevealOnScroll } from '@/components/sumate/RevealOnScroll';

const STEP_VISUALS: Array<{ photo: Foto; badge: string }> = [
  {
    photo: FOTOS.frente,
    badge: '15 min · WhatsApp'
  },
  {
    photo: FOTOS.elPlata,
    badge: 'En tu local o puesto'
  },
  {
    photo: FOTOS.corrales,
    badge: 'Reporte mensual'
  }
];

export function HowItWorks() {
  const handleCtaClick = () => {
    trackSumateEvent('sumate_cta_click', { location: 'how' });
    trackSumateEvent('sumate_whatsapp_click', { location: 'how' });
  };

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="section-pad border-b border-carbon/15 bg-pampa"
    >
      <div className="editorial-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-wider text-chicago">
              {SUMATE_HOW_IT_WORKS.eyebrow}
            </p>
            <h2
              id="como-funciona-heading"
              className="mt-2 max-w-[24ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
            >
              {SUMATE_HOW_IT_WORKS.title}
            </h2>
          </div>

          <a
            href={SUMATE_HOW_IT_WORKS.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-5 text-base font-semibold text-carbon hover:bg-carbon hover:text-pampa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago color-field"
          >
            <span>{SUMATE_HOW_IT_WORKS.ctaLabel}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {SUMATE_HOW_IT_WORKS.steps.map((step, idx) => {
            const visual = STEP_VISUALS[idx] ?? STEP_VISUALS[0];
            return (
              <li key={step.number}>
                <RevealOnScroll delayMs={idx * 90} className="h-full">
                  <article className="sumate-card-lift flex h-full flex-col border border-carbon bg-pampa-surface">
                    <div className="sumate-photo-zoom relative aspect-[16/10] w-full border-b border-carbon bg-carbon">
                      <Image
                        src={visual.photo.src}
                        alt={visual.photo.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 768px) 32vw, 100vw"
                        className="object-cover"
                        style={{ objectPosition: visual.photo.objectPosition ?? 'center' }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute left-3 top-3 bg-chicago px-2.5 py-1 font-mono text-xs font-semibold uppercase text-pampa">
                        Paso {step.number}
                      </span>
                      <span className="absolute bottom-3 left-3 border border-pampa/40 bg-carbon/85 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-pampa">
                        {visual.badge}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                      <div>
                        <h3 className="font-serif text-xl font-semibold leading-snug text-carbon">
                          {step.title}
                        </h3>
                        <p className="mt-2.5 text-base leading-relaxed text-carbon/85">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>

        <p className="mt-3 font-mono text-[11px] text-carbon/65">
          Fotografías del barrio: Camila Mazza, Gobierno de la Ciudad y Ch nch ·{' '}
          <Link href="/notas/creditos" className="underline underline-offset-2 hover:text-chicago">
            Ver licencias completas
          </Link>
        </p>
      </div>
    </section>
  );
}
