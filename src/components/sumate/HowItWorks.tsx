'use client';

import { ArrowUpRight } from 'lucide-react';
import { SUMATE_HOW_IT_WORKS } from '@/content/sumate';
import { trackSumateEvent } from '@/lib/sumate-analytics';

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
        <p className="font-mono text-sm uppercase tracking-wider text-chicago">
          {SUMATE_HOW_IT_WORKS.eyebrow}
        </p>
        <h2
          id="como-funciona-heading"
          className="mt-2 max-w-[24ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
        >
          {SUMATE_HOW_IT_WORKS.title}
        </h2>
        <p className="mt-3 max-w-[62ch] text-lg leading-relaxed text-carbon/85">
          {SUMATE_HOW_IT_WORKS.subtitle}
        </p>

        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {SUMATE_HOW_IT_WORKS.steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col justify-between border border-carbon/25 bg-pampa-surface p-6"
            >
              <div>
                <span className="font-mono text-xl font-semibold text-chicago">{step.number}</span>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-carbon">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-carbon/85">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-7">
          <a
            href={SUMATE_HOW_IT_WORKS.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCtaClick}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-6 text-base font-semibold text-carbon hover:bg-carbon hover:text-pampa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago color-field"
          >
            <span>{SUMATE_HOW_IT_WORKS.ctaLabel}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
