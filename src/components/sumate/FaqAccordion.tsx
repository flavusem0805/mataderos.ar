'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SUMATE_FAQ, type SumateFaqItem } from '@/content/sumate';

interface FaqAccordionProps {
  items?: SumateFaqItem[];
  eyebrow?: string;
  title?: string;
}

export function FaqAccordion({
  items = SUMATE_FAQ,
  eyebrow = 'Preguntas frecuentes',
  title = 'Respuestas claras antes de decidir'
}: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section
      id="preguntas"
      aria-labelledby="preguntas-heading"
      className="section-pad border-b border-carbon/15 bg-pampa"
    >
      <div className="editorial-container">
        <p className="font-mono text-sm uppercase tracking-wider text-chicago">{eyebrow}</p>
        <h2
          id="preguntas-heading"
          className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
        >
          {title}
        </h2>

        <div className="mt-8 max-w-[74ch] divide-y divide-carbon/20 border-y border-carbon/20">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div key={item.id} className="py-1">
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3 text-left font-serif text-xl font-semibold text-carbon hover:text-chicago focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-chicago transition-transform motion-reduce:transition-none ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-4 pr-6 text-base leading-relaxed text-carbon/85"
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
