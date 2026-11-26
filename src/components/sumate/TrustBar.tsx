interface TrustBarProps {
  items: string[];
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section
      aria-label="Garantías editoriales del portal"
      className="border-b border-carbon/15 bg-pampa-surface py-4"
    >
      <div className="editorial-container">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wide text-carbon sm:text-sm">
          {items.map((item, index) => (
            <li key={item} className="inline-flex items-center gap-x-4">
              {index > 0 && (
                <span className="text-carbon/35" aria-hidden="true">
                  ·
                </span>
              )}
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
