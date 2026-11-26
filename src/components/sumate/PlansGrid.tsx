'use client';

import { useEffect, useRef } from 'react';
import { SUMATE_PLANS_COPY } from '@/content/sumate';
import { COMERCIO_PLANS, ESPECIAL_PLANS, type SumatePlan } from '@/lib/sumate-plans';
import { trackSumateEvent } from '@/lib/sumate-analytics';
import { PlanCard } from '@/components/sumate/PlanCard';

interface PlansGridProps {
  primaryPlans?: SumatePlan[];
  secondaryPlans?: SumatePlan[];
  heading?: string;
  subtitle?: string;
  secondaryHeading?: string;
  className?: string;
}

export function PlansGrid({
  primaryPlans = COMERCIO_PLANS,
  secondaryPlans = ESPECIAL_PLANS,
  heading = SUMATE_PLANS_COPY.title,
  subtitle = SUMATE_PLANS_COPY.subtitle,
  secondaryHeading = SUMATE_PLANS_COPY.especialHeading,
  className = ''
}: PlansGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackedViewRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || trackedViewRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !trackedViewRef.current) {
          trackedViewRef.current = true;
          for (const plan of [...primaryPlans, ...secondaryPlans]) {
            trackSumateEvent('sumate_plan_view', { plan: plan.id });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [primaryPlans, secondaryPlans]);

  return (
    <section
      ref={sectionRef}
      id="planes"
      aria-labelledby="planes-heading"
      className={`section-pad border-b border-carbon/15 bg-pampa-surface ${className}`.trim()}
    >
      <div className="editorial-container">
        <p className="font-mono text-sm uppercase tracking-wider text-chicago">
          {SUMATE_PLANS_COPY.eyebrow}
        </p>
        <h2
          id="planes-heading"
          className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
        >
          {heading}
        </h2>
        <p className="mt-3 max-w-[66ch] text-lg leading-relaxed text-carbon/85">{subtitle}</p>

        <div
          className={`mt-8 grid gap-6 ${
            primaryPlans.length === 2 ? 'md:grid-cols-2' : 'lg:grid-cols-3'
          }`}
        >
          {primaryPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {secondaryPlans.length > 0 && (
          <div className="mt-8 border-t border-carbon/15 pt-8">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-carbon/75">
              {secondaryHeading}
            </h3>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {secondaryPlans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 space-y-1 border-t border-carbon/15 pt-4 font-mono text-xs text-carbon/75 sm:text-sm">
          {SUMATE_PLANS_COPY.microcopy.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
