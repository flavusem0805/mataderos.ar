'use client';

import { ArrowUpRight } from 'lucide-react';
import { SUMATE_FINAL_CTA } from '@/content/sumate';
import { mailtoUrl, PORTAL_EMAIL } from '@/lib/contact';
import { trackSumateEvent } from '@/lib/sumate-analytics';

interface WhatsAppCtaProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  mailSubject?: string;
  planId?: string;
}

export function WhatsAppCta({
  eyebrow = SUMATE_FINAL_CTA.eyebrow,
  title = SUMATE_FINAL_CTA.title,
  body = SUMATE_FINAL_CTA.body,
  ctaLabel = SUMATE_FINAL_CTA.ctaLabel,
  ctaHref = SUMATE_FINAL_CTA.ctaHref,
  mailSubject = 'Sumate · Mataderos.ar',
  planId
}: WhatsAppCtaProps) {
  const handleClick = () => {
    trackSumateEvent('sumate_cta_click', { location: 'final', plan: planId });
    trackSumateEvent('sumate_whatsapp_click', { location: 'final', plan: planId });
  };

  return (
    <section
      aria-labelledby="sumate-cta-final-heading"
      className="section-pad bg-chicago text-pampa"
      data-surface="dark"
    >
      <div className="editorial-container">
        <p className="font-mono text-sm uppercase tracking-wider text-pampa/80">{eyebrow}</p>
        <h2
          id="sumate-cta-final-heading"
          className="mt-2 max-w-[18ch] font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[0.92] text-pampa"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-pampa/90">{body}</p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-pampa px-6 text-base font-semibold text-chicago hover:bg-pampa-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pampa sm:w-auto color-field"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          </a>
          <a
            href={mailtoUrl(mailSubject)}
            className="inline-flex min-h-[48px] items-center font-mono text-sm text-pampa underline underline-offset-4 hover:text-pampa-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pampa"
          >
            O escribinos a {PORTAL_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
