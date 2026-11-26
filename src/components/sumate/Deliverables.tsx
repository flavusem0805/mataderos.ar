import { Check } from 'lucide-react';
import { SUMATE_DELIVERABLES } from '@/content/sumate';

interface DeliverablesProps {
  className?: string;
}

export function Deliverables({ className = '' }: DeliverablesProps) {
  return (
    <section
      id="que-hacemos"
      aria-labelledby="que-hacemos-heading"
      className={`section-pad border-b border-carbon/15 bg-pampa-surface ${className}`.trim()}
    >
      <div className="editorial-container">
        <p className="font-mono text-sm uppercase tracking-wider text-chicago">
          {SUMATE_DELIVERABLES.eyebrow}
        </p>
        <h2
          id="que-hacemos-heading"
          className="mt-2 max-w-[24ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
        >
          {SUMATE_DELIVERABLES.title}
        </h2>
        <p className="mt-3 max-w-[62ch] text-lg leading-relaxed text-carbon/85">
          {SUMATE_DELIVERABLES.subtitle}
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SUMATE_DELIVERABLES.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border border-carbon/20 bg-pampa p-5 text-base leading-relaxed text-carbon"
            >
              <Check
                className="mt-1 h-5 w-5 shrink-0 text-chicago"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
