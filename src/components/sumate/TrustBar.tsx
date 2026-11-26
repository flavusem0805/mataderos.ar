import { Check } from 'lucide-react';

interface TrustBarProps {
  items: string[];
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section
      aria-label="Garantías editoriales del portal"
      className="border-b border-carbon/15 bg-carbon py-3.5 text-pampa"
      data-surface="dark"
    >
      <div className="editorial-container">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wide sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:text-sm">
          {items.map((item) => (
            <li key={item} className="inline-flex items-center gap-2 text-pampa/95">
              <Check className="h-4 w-4 shrink-0 text-pampa" strokeWidth={2} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
