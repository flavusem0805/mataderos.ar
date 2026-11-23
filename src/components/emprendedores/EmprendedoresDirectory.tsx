'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  LOCATION_TYPE_LABELS,
  type Emprendedor,
  type EmprendedorCategory
} from '@/lib/emprendedores';

export function EmprendedoresDirectory({ items }: { items: Emprendedor[] }) {
  const [category, setCategory] = useState<EmprendedorCategory | null>(null);
  const [query, setQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set<EmprendedorCategory>();
    for (const item of items) set.add(item.category);
    return Array.from(set);
  }, [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category && item.category !== category) return false;
      if (!q) return true;
      return (
        item.displayName.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.offerText.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, category, query]);

  const hasFilters = category !== null || query.trim().length > 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por rubro">
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
            className={`inline-flex min-h-[48px] items-center rounded-[4px] border px-4 text-base font-semibold color-field ${
              category === null
                ? 'border-carbon bg-carbon text-pampa'
                : 'border-carbon/40 bg-pampa text-carbon'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
              className={`inline-flex min-h-[48px] items-center rounded-[4px] border px-4 text-base font-semibold color-field ${
                category === cat
                  ? 'border-carbon bg-carbon text-pampa'
                  : 'border-carbon/40 bg-pampa text-carbon'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:max-w-xs">
          <label htmlFor="buscar-emprendedor" className="sr-only">
            Buscar emprendedor o producto
          </label>
          <input
            id="buscar-emprendedor"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o producto..."
            className="min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa px-4 text-base text-carbon placeholder:text-carbon/50 focus:border-chicago focus:outline-none"
          />
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 border border-carbon/25 bg-pampa p-6" role="status">
          <p className="text-lg">No encontramos emprendimientos con ese filtro.</p>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setCategory(null);
                setQuery('');
              }}
              className="mt-3 inline-flex min-h-[48px] items-center font-semibold text-chicago underline underline-offset-4"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visible.map((item) => (
            <article key={item.slug} className="flex flex-col border border-carbon/25 bg-pampa">
              <div className="relative aspect-[16/10] w-full border-b border-carbon/15">
                <Image
                  src={item.heroImage}
                  alt={item.heroAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wide text-chicago">
                    <span>Verificado por Mataderos.ar</span>
                    {item.isFounder && (
                      <>
                        <span>·</span>
                        <span>Fundador</span>
                      </>
                    )}
                    {item.isDemo && (
                      <>
                        <span>·</span>
                        <span className="text-carbon/70">Ficha de ejemplo</span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    <Link
                      href={`/emprendedores/${item.slug}`}
                      className="hover:text-chicago hover:underline hover:underline-offset-4"
                    >
                      {item.displayName}
                    </Link>
                  </h2>
                  <p className="mt-1 font-mono text-sm text-carbon/70">
                    {item.category} · {LOCATION_TYPE_LABELS[item.locationType]}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-carbon/85">{item.tagline}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-carbon/15 pt-4">
                  <span className="font-mono text-sm text-carbon/70">{item.zone}</span>
                  <Link
                    href={`/emprendedores/${item.slug}`}
                    className="inline-flex min-h-[48px] items-center gap-2 font-mono text-sm font-semibold uppercase text-chicago hover:underline hover:underline-offset-4"
                  >
                    Ver ficha
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
