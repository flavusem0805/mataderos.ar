'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { trackSumateEvent } from '@/lib/sumate-analytics';

export interface SumateBreadcrumbItem {
  label: string;
  href?: string;
}

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
  trustLine
}: SumateHeroProps) {
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
    <section className="border-b border-carbon/15 bg-pampa py-8 sm:py-12 lg:py-16">
      <div className="editorial-container">
        <nav aria-label="Miga de pan" className="flex flex-wrap items-center font-mono text-sm text-chicago sm:text-base">
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

        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-chicago sm:mt-4 sm:text-sm">
          {eyebrow}
        </p>

        <h1 className="mt-2 max-w-[18ch] font-display text-[clamp(2.5rem,8vw,5.25rem)] font-semibold uppercase leading-[0.9] text-carbon">
          {title}
        </h1>

        <p className="mt-4 max-w-[60ch] font-serif text-lg leading-relaxed text-carbon/90 sm:mt-5 sm:text-2xl">
          {subtitle}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
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
          <p className="mt-4 font-mono text-xs text-carbon/75 sm:text-sm">{trustLine}</p>
        )}
      </div>
    </section>
  );
}
