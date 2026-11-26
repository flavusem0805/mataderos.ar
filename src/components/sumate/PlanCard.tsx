'use client';

import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { SumatePlan, SumatePlanId } from '@/lib/sumate-plans';
import { trackSumateEvent } from '@/lib/sumate-analytics';

interface PlanCardProps {
  plan: SumatePlan;
  onSelectForForm?: (planId: SumatePlanId) => void;
}

export function PlanCard({ plan, onSelectForForm }: PlanCardProps) {
  const handleSelectPlan = () => {
    trackSumateEvent('sumate_plan_cta', { plan: plan.id });
    trackSumateEvent('sumate_cta_click', { location: 'plans', plan: plan.id });
    if (plan.id === 'sponsor') {
      trackSumateEvent('sumate_sponsor_cta', { location: 'plans' });
    }

    if (onSelectForForm) {
      onSelectForForm(plan.id);
      return;
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mataderos:select-plan', { detail: { planId: plan.id } }));
      const el = document.getElementById('contacto');
      if (el) {
        el.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth'
        });
      }
    }
  };

  const handleDirectWhatsapp = () => {
    trackSumateEvent('sumate_whatsapp_click', { location: 'plans', plan: plan.id });
    if (plan.id === 'sponsor') {
      trackSumateEvent('sumate_sponsor_cta', { location: 'plans' });
    }
  };

  const isFeatured = Boolean(plan.featured);

  return (
    <article
      className={`sumate-card-lift flex h-full flex-col justify-between border p-6 ${
        isFeatured
          ? 'border-2 border-chicago bg-pampa'
          : 'border-carbon/25 bg-pampa-surface hover:border-carbon'
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-wider text-carbon/75">
            {plan.audience}
          </p>
          {isFeatured && (
            <span className="rounded-[4px] bg-chicago px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-pampa">
              Más elegido
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-3xl font-semibold uppercase leading-none text-carbon">
          {plan.name}
        </h3>

        <p className="mt-2 font-serif text-lg font-medium text-carbon/90">{plan.promise}</p>

        <div className="mt-4 border-y border-carbon/15 py-3">
          <p className="font-mono text-2xl font-semibold text-carbon">{plan.priceLabel}</p>
          <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-chicago">
            {plan.priceNote}
          </p>
        </div>

        <ul className="mt-4 space-y-2.5 text-base leading-snug text-carbon/90">
          {plan.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-chicago"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-2 border-t border-carbon/15 pt-5">
        <button
          type="button"
          onClick={handleSelectPlan}
          className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] px-5 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago color-field ${
            isFeatured
              ? 'bg-chicago text-pampa hover:bg-chicago-dark'
              : 'border border-carbon bg-pampa text-carbon hover:bg-carbon hover:text-pampa'
          }`}
        >
          <span>{plan.ctaLabel}</span>
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        </button>

        <a
          href={plan.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDirectWhatsapp}
          className="inline-flex min-h-[48px] w-full items-center justify-center gap-1.5 font-mono text-sm font-semibold text-chicago underline underline-offset-4 hover:text-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
        >
          <span>Consultar directo por WhatsApp</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
