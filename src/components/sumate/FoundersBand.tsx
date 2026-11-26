'use client';

import Image from 'next/image';
import { ArrowUpRight, FileText, MapPin, Phone, Search } from 'lucide-react';
import { SUMATE_FOUNDERS } from '@/content/sumate';
import { FOTOS } from '@/lib/notas/media';
import { trackSumateEvent } from '@/lib/sumate-analytics';
import { RevealOnScroll } from '@/components/sumate/RevealOnScroll';

const METRIC_ICONS = [Phone, Phone, MapPin, Search, FileText] as const;

export function FoundersBand() {
  const handleClick = () => {
    trackSumateEvent('sumate_cta_click', { location: 'founders', plan: 'encontrado' });
    trackSumateEvent('sumate_whatsapp_click', { location: 'founders', plan: 'encontrado' });
  };

  return (
    <section
      id="fundadores"
      aria-labelledby="fundadores-heading"
      className="section-pad border-b border-carbon/15 bg-pampa"
    >
      <div className="editorial-container">
        <RevealOnScroll>
          <div className="overflow-hidden border-2 border-carbon bg-pampa-surface">
            <div className="grid lg:grid-cols-12">
              {/* Postal emblemática del ex Mercado Nacional de Hacienda */}
              <div className="sumate-photo-zoom relative min-h-[240px] border-b border-carbon bg-carbon lg:col-span-5 lg:min-h-full lg:border-b-0 lg:border-r">
                <Image
                  src={FOTOS.torre.src}
                  alt={FOTOS.torre.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/80 via-carbon/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-4 bottom-4 text-pampa">
                  <span className="inline-block bg-chicago px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider">
                    Primera cohorte · 20 cupos
                  </span>
                  <p className="mt-2 font-mono text-[11px] text-pampa/80">
                    Torre del ex Mercado Nacional de Hacienda · Foto: {FOTOS.torre.author} ({FOTOS.torre.license})
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
                <p className="font-mono text-sm uppercase tracking-wider text-chicago">
                  {SUMATE_FOUNDERS.eyebrow}
                </p>
                <h2
                  id="fundadores-heading"
                  className="mt-2 font-display text-[clamp(2rem,4.8vw,3.4rem)] font-semibold uppercase leading-[0.94] text-carbon"
                >
                  {SUMATE_FOUNDERS.title}
                </h2>
                <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-carbon/90">
                  {SUMATE_FOUNDERS.body}
                </p>

                <div className="mt-6">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-chicago">
                    {SUMATE_FOUNDERS.metricsLabel}
                  </p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {SUMATE_FOUNDERS.metrics.map((metric, idx) => {
                      const Icon = METRIC_ICONS[idx % METRIC_ICONS.length];
                      return (
                        <li
                          key={metric}
                          className="flex items-center gap-2.5 border border-carbon/20 bg-pampa px-3.5 py-2.5 text-sm font-medium text-carbon"
                        >
                          <Icon
                            className="h-4 w-4 shrink-0 text-chicago"
                            strokeWidth={1.85}
                            aria-hidden="true"
                          />
                          <span>{metric}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-7">
                  <a
                    href={SUMATE_FOUNDERS.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon sm:w-auto color-field"
                  >
                    <span>{SUMATE_FOUNDERS.ctaLabel}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
