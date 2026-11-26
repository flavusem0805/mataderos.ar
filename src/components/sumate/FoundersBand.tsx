'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { SUMATE_FOUNDERS } from '@/content/sumate';
import { trackSumateEvent } from '@/lib/sumate-analytics';

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
        <div className="border-2 border-carbon bg-pampa-surface p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <p className="font-mono text-sm uppercase tracking-wider text-chicago">
                {SUMATE_FOUNDERS.eyebrow}
              </p>
              <h2
                id="fundadores-heading"
                className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[0.94] text-carbon"
              >
                {SUMATE_FOUNDERS.title}
              </h2>
              <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-carbon/90">
                {SUMATE_FOUNDERS.body}
              </p>

              <div className="mt-6">
                <a
                  href={SUMATE_FOUNDERS.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClick}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon color-field"
                >
                  <span>{SUMATE_FOUNDERS.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="border-t border-carbon/20 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-chicago sm:text-sm">
                {SUMATE_FOUNDERS.metricsLabel}
              </p>
              <ul className="mt-4 space-y-3 text-base text-carbon">
                {SUMATE_FOUNDERS.metrics.map((metric) => (
                  <li key={metric} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-chicago"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
