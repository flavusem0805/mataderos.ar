'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SUMATE_SPONSORS } from '@/content/sumate';
import { trackSumateEvent } from '@/lib/sumate-analytics';

interface SponsorBlockProps {
  showSecondaryPageLink?: boolean;
}

export function SponsorBlock({ showSecondaryPageLink = true }: SponsorBlockProps) {
  const handleMediaKitClick = () => {
    trackSumateEvent('sumate_sponsor_cta', { location: 'sponsors' });
    trackSumateEvent('sumate_whatsapp_click', { location: 'sponsors', plan: 'sponsor' });
  };

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="section-pad border-b border-carbon/15 bg-carbon text-pampa"
      data-surface="dark"
    >
      <div className="editorial-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="font-mono text-sm uppercase tracking-wider text-pampa/75">
              {SUMATE_SPONSORS.eyebrow}
            </p>
            <h2
              id="sponsors-heading"
              className="mt-2 max-w-[24ch] font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[0.94] text-pampa"
            >
              {SUMATE_SPONSORS.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-pampa/85">
              {SUMATE_SPONSORS.body}
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <a
              href={SUMATE_SPONSORS.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleMediaKitClick}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-pampa px-6 text-base font-semibold text-carbon hover:bg-pampa-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pampa lg:w-auto color-field"
            >
              <span>{SUMATE_SPONSORS.ctaLabel}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            </a>

            {showSecondaryPageLink && (
              <Link
                href={SUMATE_SPONSORS.secondaryLinkHref}
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] border border-pampa/45 px-5 font-mono text-sm font-semibold uppercase tracking-wide text-pampa hover:bg-pampa hover:text-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pampa lg:w-auto color-field"
              >
                <span>{SUMATE_SPONSORS.secondaryLinkLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
