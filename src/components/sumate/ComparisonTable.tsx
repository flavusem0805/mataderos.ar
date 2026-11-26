import { Check, Minus, X } from 'lucide-react';
import { SUMATE_COMPARISON, type ComparisonRow } from '@/content/sumate';

interface ComparisonTableProps {
  className?: string;
}

function StatusCell({
  value,
  highlight = false
}: {
  value: ComparisonRow['instagram'];
  highlight?: boolean;
}) {
  const Icon = value === 'Sí' ? Check : value === 'Parcial' ? Minus : X;
  const tone =
    value === 'Sí'
      ? highlight
        ? 'font-semibold text-chicago'
        : 'text-carbon'
      : value === 'Parcial'
        ? 'text-carbon/80'
        : 'text-carbon/55';

  return (
    <span className={`inline-flex items-center gap-1.5 ${tone}`}>
      <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
      <span>{value}</span>
    </span>
  );
}

export function ComparisonTable({ className = '' }: ComparisonTableProps) {
  return (
    <section
      id="comparativa"
      aria-labelledby="comparativa-heading"
      className={`section-pad border-b border-carbon/15 bg-pampa ${className}`.trim()}
    >
      <div className="editorial-container">
        <p className="font-mono text-sm uppercase tracking-wider text-chicago">
          {SUMATE_COMPARISON.eyebrow}
        </p>
        <h2
          id="comparativa-heading"
          className="mt-2 max-w-[28ch] font-display text-[clamp(2rem,4.8vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
        >
          {SUMATE_COMPARISON.title}
        </h2>

        {/* Vista mobile: cards comparativas legibles sin scroll horizontal ni desborde en 390 px */}
        <div className="mt-8 space-y-4 md:hidden">
          {SUMATE_COMPARISON.rows.map((row) => (
            <article key={row.feature} className="border border-carbon/25 bg-pampa-surface p-4">
              <h3 className="font-serif text-lg font-semibold leading-snug text-carbon">
                {row.feature}
              </h3>
              <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-carbon/15 pt-3 text-sm">
                <div>
                  <dt className="font-mono text-xs uppercase text-carbon/70">Instagram</dt>
                  <dd className="mt-1">
                    <StatusCell value={row.instagram} />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase text-carbon/70">Google</dt>
                  <dd className="mt-1">
                    <StatusCell value={row.google} />
                  </dd>
                </div>
                <div className="border-l border-chicago/30 pl-2">
                  <dt className="font-mono text-xs font-semibold uppercase text-chicago">
                    Mataderos.ar
                  </dt>
                  <dd className="mt-1">
                    <StatusCell value={row.mataderos} highlight />
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        {/* Vista tablet/desktop: tabla semántica con caption y headers accesibles */}
        <div className="mt-8 hidden overflow-x-auto border border-carbon/25 bg-pampa-surface md:block">
          <table className="w-full border-collapse text-left text-base">
            <caption className="sr-only">{SUMATE_COMPARISON.caption}</caption>
            <thead>
              <tr className="border-b border-carbon bg-pampa font-mono text-sm uppercase">
                <th scope="col" className="p-4 font-semibold text-carbon">
                  Qué resuelve
                </th>
                <th scope="col" className="p-4 font-semibold text-carbon">
                  Instagram
                </th>
                <th scope="col" className="p-4 font-semibold text-carbon">
                  Google
                </th>
                <th scope="col" className="bg-chicago/10 p-4 font-semibold text-chicago">
                  Mataderos.ar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-carbon/15">
              {SUMATE_COMPARISON.rows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="p-4 font-medium text-carbon">
                    {row.feature}
                  </th>
                  <td className="p-4">
                    <StatusCell value={row.instagram} />
                  </td>
                  <td className="p-4">
                    <StatusCell value={row.google} />
                  </td>
                  <td className="bg-chicago/5 p-4">
                    <StatusCell value={row.mataderos} highlight />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
