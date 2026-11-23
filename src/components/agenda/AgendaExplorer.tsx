'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, CalendarPlus, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { AGENDA_VENUES, type AgendaVenue, type NeighborhoodEvent } from '@/lib/data';
import { BA_TZ, formatBaTime, venueClock } from '@/lib/agenda';
import { ElPlataInstagramLink } from '@/components/ElPlataInstagramLink';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

interface AgendaOccurrence {
  uid: string;
  venueId: string;
  venueName: string;
  place: string;
  mapsQuery: string;
  title: string;
  description: string;
  category: string;
  highlightTag: string;
  startTs: number;
  endTs: number;
  inProgress: boolean;
}

function formatDayMonth(ts: number) {
  const date = new Date(ts);
  const day = new Intl.DateTimeFormat('es-AR', { timeZone: BA_TZ, day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat('es-AR', { timeZone: BA_TZ, month: 'short' })
    .format(date)
    .replace('.', '')
    .toUpperCase();
  const weekday = new Intl.DateTimeFormat('es-AR', { timeZone: BA_TZ, weekday: 'short' })
    .format(date)
    .replace('.', '')
    .toUpperCase();
  return { day, month, weekday };
}

function buildOccurrences(venues: AgendaVenue[], events: NeighborhoodEvent[], now: number): AgendaOccurrence[] {
  const list: AgendaOccurrence[] = [];

  for (const venue of venues) {
    const matched = events.find((e) => e.id === venue.eventId);
    const clock = venueClock(venue.weekday, venue.hour, venue.minute, venue.durationHours, now);
    const durationMs = venue.durationHours * 60 * 60 * 1000;

    // Primera fecha (en curso o próxima) y segunda fecha (semana siguiente)
    const firstStart = clock.inProgress ? clock.previousStart : clock.nextStart;
    const instants = [
      { startTs: firstStart, inProgress: clock.inProgress },
      { startTs: firstStart + WEEK_MS, inProgress: false }
    ];

    instants.forEach((inst, idx) => {
      list.push({
        uid: `${venue.id}-${idx}`,
        venueId: venue.id,
        venueName: venue.venue,
        place: venue.place,
        mapsQuery: venue.mapsQuery,
        title: venue.nextTitle,
        description: matched?.description ?? venue.description,
        category: matched?.category ?? 'Cultura',
        highlightTag: matched?.highlightTag ?? 'Actividad Abierta',
        startTs: inst.startTs,
        endTs: inst.startTs + durationMs,
        inProgress: inst.inProgress
      });
    });
  }

  return list;
}

function downloadIcs(item: AgendaOccurrence) {
  const toIcsDate = (ts: number) =>
    new Date(ts).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mataderos.ar//Agenda//ES',
    'BEGIN:VEVENT',
    `UID:${item.uid}@mataderos.ar`,
    `DTSTART:${toIcsDate(item.startTs)}`,
    `DTEND:${toIcsDate(item.endTs)}`,
    `SUMMARY:${item.venueName} — ${item.title}`,
    `LOCATION:${item.place}, Mataderos, CABA`,
    `DESCRIPTION:${item.description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.venueId}-mataderos.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function AgendaExplorer({ events }: { events: NeighborhoodEvent[] }) {
  const [now, setNow] = useState<number>(() => Date.now());
  const [query, setQuery] = useState('');
  const [venueFilter, setVenueFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const occurrences = useMemo(() => buildOccurrences(AGENDA_VENUES, events, now), [events, now]);

  const venueOptions = useMemo(
    () => Array.from(new Set(occurrences.map((item) => item.venueName))),
    [occurrences]
  );

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const item of occurrences) {
      set.add(item.category);
      if (item.highlightTag) set.add(item.highlightTag);
    }
    return Array.from(set);
  }, [occurrences]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = occurrences.filter((item) => {
      if (venueFilter !== 'all' && item.venueName !== venueFilter) return false;
      if (typeFilter !== 'all' && item.category !== typeFilter && item.highlightTag !== typeFilter) {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.venueName.toLowerCase().includes(q) ||
        item.place.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.highlightTag.toLowerCase().includes(q)
      );
    });

    return list.sort((a, b) => {
      if (a.inProgress && !b.inProgress) return -1;
      if (!a.inProgress && b.inProgress) return 1;
      return sortOrder === 'asc' ? a.startTs - b.startTs : b.startTs - a.startTs;
    });
  }, [occurrences, query, venueFilter, typeFilter, sortOrder]);

  const hasFilters = query.trim().length > 0 || venueFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="space-y-8">
      <div className="border border-carbon/25 bg-pampa p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <label htmlFor="agenda-search" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
              Buscar evento o lugar
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
                placeholder="Ej: peña, cine, feria, Alberdi..."
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

          <div className="lg:col-span-2">
            <label htmlFor="agenda-type" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
              Tipo de evento
            </label>
            <select
              id="agenda-type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa-surface px-3 text-base text-carbon focus:border-chicago focus:outline-none"
            >
              <option value="all">Todos</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
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
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-chicago" strokeWidth={1.5} aria-hidden="true" />
            {filtered.length} {filtered.length === 1 ? 'fecha programada' : 'fechas programadas'}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setVenueFilter('all');
                setTypeFilter('all');
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
            Probá quitando alguno de los filtros o buscando por otro término.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-carbon/25 border-y border-carbon/25 bg-pampa">
          {filtered.map((item) => {
            const dm = formatDayMonth(item.startTs);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              item.mapsQuery
            )}`;

            return (
              <article
                key={item.uid}
                className="grid gap-5 p-5 sm:p-6 lg:grid-cols-12 lg:items-center"
              >
                <div className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-1">
                  {item.inProgress ? (
                    <span className="border border-chicago px-2.5 py-1 font-display text-2xl font-semibold uppercase text-chicago">
                      En curso
                    </span>
                  ) : (
                    <>
                      <p className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-semibold uppercase leading-none">
                        {dm.day} {dm.month}
                      </p>
                      <p className="font-mono text-sm uppercase text-carbon/75">
                        {dm.weekday} · {formatBaTime(item.startTs)} hs
                      </p>
                    </>
                  )}
                </div>

                <div className="lg:col-span-6">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider text-chicago">
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.highlightTag}</span>
                  </div>
                  <h2 className="mt-1.5 font-display text-2xl font-semibold uppercase leading-tight sm:text-3xl">
                    {item.venueName}
                  </h2>
                  <p className="mt-1 font-serif text-lg font-semibold text-carbon/90">{item.title}</p>
                  <p className="mt-2 text-base leading-relaxed text-carbon/80">{item.description}</p>
                  <p className="mt-3 flex items-center gap-1.5 font-mono text-sm text-carbon/70">
                    <MapPin className="h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
                    <span>{item.place}</span>
                  </p>
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
                  {item.venueId === 'el-plata' && <ElPlataInstagramLink />}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
