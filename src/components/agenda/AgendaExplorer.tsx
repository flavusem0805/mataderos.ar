'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowUpRight,
  CalendarPlus,
  ExternalLink,
  FileText,
  MapPin,
  Search,
  SlidersHorizontal,
  Ticket
} from 'lucide-react';
import type { AgendaItem, EventAmbito } from '@/lib/agenda-data';
import {
  agendaStatus,
  agendaTimestamps,
  buildIcsContent,
  formatBaDayMonth,
  formatBaShortDate,
  type AgendaStatus
} from '@/lib/agenda';
import { ElPlataInstagramLink } from '@/components/ElPlataInstagramLink';

export type AmbitoFilter = 'all' | EventAmbito;

interface ResolvedAgendaItem {
  item: AgendaItem;
  startTs: number;
  endTs: number;
  status: AgendaStatus;
}

function downloadIcs(item: AgendaItem) {
  const ics = buildIcsContent(item);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function AgendaCard({ entry }: { entry: ResolvedAgendaItem }) {
  const { item, startTs, endTs, status } = entry;
  const dm = formatBaDayMonth(startTs);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery)}`;
  const isSingleSource = Boolean(item.source?.note);
  const isComuna9 = item.ambito === 'Comuna 9';

  return (
    <article
      id={item.id}
      className={`grid gap-5 p-5 sm:p-6 lg:grid-cols-12 lg:items-start ${
        status === 'past' ? 'opacity-75' : ''
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 lg:col-span-3 lg:flex-col lg:gap-1.5">
        {status === 'in-progress' ? (
          <>
            <span className="inline-block border border-chicago bg-chicago/10 px-2.5 py-1 font-display text-2xl font-semibold uppercase leading-none text-chicago">
              En curso
            </span>
            {item.isMultiDay && item.dateBadge ? (
              <p className="font-mono text-sm font-semibold uppercase text-carbon">
                {item.dateBadge}
              </p>
            ) : null}
            <p className="font-mono text-xs uppercase text-carbon/70">
              {item.isMultiDay
                ? `${formatBaShortDate(startTs)} al ${formatBaShortDate(endTs)}`
                : item.timeLabel}
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-[clamp(2.25rem,4vw,3.35rem)] font-semibold uppercase leading-none">
              {item.isMultiDay && item.dateBadge ? item.dateBadge : `${dm.day} ${dm.month}`}
            </p>
            <p className="font-mono text-sm uppercase text-carbon/75">
              {item.isMultiDay
                ? `${formatBaShortDate(startTs)} al ${formatBaShortDate(endTs)}`
                : `${dm.weekdayShort} · ${item.timeLabel}`}
            </p>
            {status === 'past' && (
              <span className="inline-block border border-carbon/30 px-2 py-0.5 font-mono text-xs uppercase text-carbon/65">
                Finalizado
              </span>
            )}
          </>
        )}
      </div>

      <div className="lg:col-span-6">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-xs uppercase tracking-wider">
          <span className="font-semibold text-chicago">{item.category}</span>
          <span className="text-carbon/35" aria-hidden="true">
            ·
          </span>
          {isComuna9 ? (
            <span className="border border-cuero/60 bg-pampa-deep px-2 py-0.5 font-semibold text-cuero">
              Comuna 9 · {item.barrio}
            </span>
          ) : (
            <span className="text-carbon/75">{item.barrio}</span>
          )}
          <span className="text-carbon/35" aria-hidden="true">
            ·
          </span>
          <span className={isSingleSource ? 'font-semibold text-ladrillo' : 'text-chicago'}>
            {item.highlightTag}
          </span>
        </div>

        <h3 className="mt-2 font-display text-2xl font-semibold uppercase leading-tight sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-1 font-serif text-lg font-semibold text-carbon/90">{item.venueName}</p>
        <p className="mt-2 text-base leading-relaxed text-carbon/85">{item.description}</p>

        {item.source?.note && (
          <p className="mt-3 flex items-start gap-2 border-l-2 border-ladrillo bg-pampa-surface px-3 py-2 font-mono text-xs leading-relaxed text-carbon/85">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ladrillo" strokeWidth={1.75} aria-hidden="true" />
            <span>{item.source.note}</span>
          </p>
        )}

        <div className="mt-3 flex flex-col gap-1.5 font-mono text-sm text-carbon/75">
          <p className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
            <span>{item.place}</span>
          </p>
          <p className="flex items-start gap-1.5">
            <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
            <span>{item.priceLabel}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 lg:col-span-3 lg:flex-col lg:items-stretch">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-4 text-sm font-semibold text-pampa hover:bg-chicago-dark color-field"
        >
          Cómo llegar
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() => downloadIcs(item)}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-4 text-sm font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
        >
          <CalendarPlus className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          Agendar (.ics)
        </button>
        {item.source && (
          <a
            href={item.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon/35 bg-pampa-surface px-4 text-sm font-semibold text-carbon hover:border-carbon color-field"
          >
            <ExternalLink className="h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
            Fuente: {item.source.label}
          </a>
        )}
        {item.relatedNotaSlug && (
          <Link
            href={`/notas/${item.relatedNotaSlug}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 px-3 font-mono text-sm text-chicago underline underline-offset-4 hover:text-chicago-dark"
          >
            <FileText className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            Leer nota relacionada
          </Link>
        )}
        {item.venueId === 'el-plata' && <ElPlataInstagramLink />}
      </div>
    </article>
  );
}

export function AgendaExplorer({
  items,
  serverNow,
  initialAmbito = 'all'
}: {
  items: AgendaItem[];
  serverNow: number;
  initialAmbito?: AmbitoFilter;
}) {
  const [now, setNow] = useState<number>(serverNow);
  const [ambitoFilter, setAmbitoFilter] = useState<AmbitoFilter>(initialAmbito);
  const [query, setQuery] = useState('');
  const [venueFilter, setVenueFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [freeOnly, setFreeOnly] = useState(false);
  const [showPast, setShowPast] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const resolvedAll = useMemo<ResolvedAgendaItem[]>(() => {
    return items.map((item) => {
      const { startTs, endTs } = agendaTimestamps(item);
      return { item, startTs, endTs, status: agendaStatus(item, now) };
    });
  }, [items, now]);

  const activeCount = useMemo(
    () => resolvedAll.filter((entry) => entry.status !== 'past').length,
    [resolvedAll]
  );
  const pastCount = resolvedAll.length - activeCount;
  const allEnded = activeCount === 0 && resolvedAll.length > 0;

  const visibleByTime = useMemo(
    () => (showPast || allEnded ? resolvedAll : resolvedAll.filter((entry) => entry.status !== 'past')),
    [resolvedAll, showPast, allEnded]
  );

  const scopeCounts = useMemo(() => {
    const mataderos = visibleByTime.filter((e) => e.item.ambito === 'Mataderos').length;
    const comuna9 = visibleByTime.filter((e) => e.item.ambito === 'Comuna 9').length;
    return { all: visibleByTime.length, mataderos, comuna9 };
  }, [visibleByTime]);

  const venueOptions = useMemo(() => {
    const scoped = items.filter((item) => ambitoFilter === 'all' || item.ambito === ambitoFilter);
    return Array.from(new Set(scoped.map((item) => item.venueName)));
  }, [items, ambitoFilter]);

  const categoryOptions = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = visibleByTime.filter(({ item }) => {
      if (ambitoFilter !== 'all' && item.ambito !== ambitoFilter) return false;
      if (venueFilter !== 'all' && item.venueName !== venueFilter) return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (freeOnly && !item.isFree) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.venueName.toLowerCase().includes(q) ||
        item.place.toLowerCase().includes(q) ||
        item.barrio.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.highlightTag.toLowerCase().includes(q) ||
        (item.source?.label.toLowerCase().includes(q) ?? false)
      );
    });

    return list.sort((a, b) => {
      if (a.status === 'in-progress' && b.status !== 'in-progress') return -1;
      if (a.status !== 'in-progress' && b.status === 'in-progress') return 1;
      return sortOrder === 'asc' ? a.startTs - b.startTs : b.startTs - a.startTs;
    });
  }, [visibleByTime, ambitoFilter, venueFilter, categoryFilter, freeOnly, query, sortOrder]);

  const mataderosList = useMemo(
    () => filtered.filter((entry) => entry.item.ambito === 'Mataderos'),
    [filtered]
  );
  const comuna9List = useMemo(
    () => filtered.filter((entry) => entry.item.ambito === 'Comuna 9'),
    [filtered]
  );

  const hasFilters =
    query.trim().length > 0 ||
    ambitoFilter !== 'all' ||
    venueFilter !== 'all' ||
    categoryFilter !== 'all' ||
    freeOnly;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por territorio">
        {[
          { id: 'all' as const, label: `Toda la agenda (${scopeCounts.all})` },
          { id: 'Mataderos' as const, label: `Solo Mataderos (${scopeCounts.mataderos})` },
          { id: 'Comuna 9' as const, label: `Comuna 9 · Liniers y Parque Avellaneda (${scopeCounts.comuna9})` }
        ].map((option) => {
          const active = ambitoFilter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setAmbitoFilter(option.id);
                setVenueFilter('all');
              }}
              className={`inline-flex min-h-[48px] items-center rounded-[4px] border px-4 text-sm font-semibold sm:text-base color-field ${
                active
                  ? 'border-carbon bg-carbon text-pampa'
                  : 'border-carbon/35 bg-pampa text-carbon hover:border-carbon'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {allEnded && (
        <div className="border border-carbon/25 bg-pampa p-4 font-mono text-sm text-carbon/85" role="status">
          Mostrando el archivo de noviembre y diciembre de 2026 (las fechas programadas de este ciclo ya finalizaron).
        </div>
      )}

      <div className="border border-carbon/25 bg-pampa p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="relative lg:col-span-4">
            <label htmlFor="agenda-search" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
              Buscar evento, lugar o barrio
            </label>
            <div className="relative mt-1.5">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-carbon/55"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <input
                id="agenda-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ej: milonga, Paraíso, Macedonio, mural..."
                className="min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa-surface pl-10 pr-4 text-base text-carbon placeholder:text-carbon/45 focus:border-chicago focus:outline-none"
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <label htmlFor="agenda-venue" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
              Lugar / Sede
            </label>
            <select
              id="agenda-venue"
              value={venueFilter}
              onChange={(e) => setVenueFilter(e.target.value)}
              className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa-surface px-3 text-base text-carbon focus:border-chicago focus:outline-none"
            >
              <option value="all">Todos los lugares</option>
              {venueOptions.map((venue) => (
                <option key={venue} value={venue}>
                  {venue}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label htmlFor="agenda-type" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
              Categoría
            </label>
            <select
              id="agenda-type"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa-surface px-3 text-base text-carbon focus:border-chicago focus:outline-none"
            >
              <option value="all">Todas</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="agenda-sort" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
              Ordenar por fecha
            </label>
            <select
              id="agenda-sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa-surface px-3 text-base text-carbon focus:border-chicago focus:outline-none"
            >
              <option value="asc">Más cercana primero</option>
              <option value="desc">Más lejana primero</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-carbon/15 pt-4 font-mono text-sm text-carbon/75">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-chicago" strokeWidth={1.5} aria-hidden="true" />
              {filtered.length} {filtered.length === 1 ? 'fecha' : 'fechas'}
            </span>
            <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-carbon">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="h-4 w-4 accent-chicago"
              />
              <span>Solo entrada libre / gratuita</span>
            </label>
            {pastCount > 0 && !allEnded && (
              <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-carbon">
                <input
                  type="checkbox"
                  checked={showPast}
                  onChange={(e) => setShowPast(e.target.checked)}
                  className="h-4 w-4 accent-chicago"
                />
                <span>Incluir pasadas ({pastCount})</span>
              </label>
            )}
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setAmbitoFilter('all');
                setVenueFilter('all');
                setCategoryFilter('all');
                setFreeOnly(false);
              }}
              className="min-h-[48px] px-2 font-semibold text-chicago underline underline-offset-4"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-carbon/25 bg-pampa p-8 text-center" role="status">
          <p className="font-serif text-xl font-semibold">No encontramos eventos con esos filtros.</p>
          <p className="mt-2 text-base text-carbon/75">
            Probá quitando alguno de los filtros o cambiando el territorio seleccionado.
          </p>
        </div>
      ) : ambitoFilter === 'all' ? (
        <div className="space-y-12">
          {mataderosList.length > 0 && (
            <section aria-labelledby="agenda-mataderos-heading">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id="agenda-mataderos-heading"
                  className="font-display text-3xl font-semibold uppercase leading-none sm:text-4xl"
                >
                  En Mataderos
                </h2>
                <span className="font-mono text-sm text-carbon/70">
                  {mataderosList.length} {mataderosList.length === 1 ? 'fecha' : 'fechas'}
                </span>
              </div>
              <div className="divide-y divide-carbon/25 border-y border-carbon/25 bg-pampa">
                {mataderosList.map((entry) => (
                  <AgendaCard key={entry.item.id} entry={entry} />
                ))}
              </div>
            </section>
          )}

          {comuna9List.length > 0 && (
            <section aria-labelledby="agenda-comuna9-heading">
              <div className="mb-4 border-l-4 border-cuero pl-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2
                    id="agenda-comuna9-heading"
                    className="font-display text-3xl font-semibold uppercase leading-none sm:text-4xl"
                  >
                    También en la Comuna 9 · Liniers y Parque Avellaneda
                  </h2>
                  <span className="font-mono text-sm text-cuero">
                    {comuna9List.length} {comuna9List.length === 1 ? 'fecha' : 'fechas'}
                  </span>
                </div>
                <p className="mt-2 max-w-[66ch] text-base text-carbon/80">
                  Actividades fuera de los límites de Mataderos, pero dentro de la Comuna 9 y abiertas a vecinos del barrio.
                </p>
              </div>
              <div className="divide-y divide-carbon/25 border-y border-carbon/25 bg-pampa">
                {comuna9List.map((entry) => (
                  <AgendaCard key={entry.item.id} entry={entry} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <section aria-label={ambitoFilter === 'Mataderos' ? 'Agenda en Mataderos' : 'Agenda en Comuna 9'}>
          {ambitoFilter === 'Comuna 9' && (
            <p className="mb-4 max-w-[66ch] border-l-4 border-cuero pl-4 text-base text-carbon/80">
              Encuentros fuera de los límites de Mataderos pero dentro de la Comuna 9 (Liniers y Parque Avellaneda).
            </p>
          )}
          <div className="divide-y divide-carbon/25 border-y border-carbon/25 bg-pampa">
            {filtered.map((entry) => (
              <AgendaCard key={entry.item.id} entry={entry} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
