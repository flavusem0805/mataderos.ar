'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode
} from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowUpRight,
  CalendarPlus,
  ChevronRight,
  ExternalLink,
  FileText,
  MapPin,
  Search,
  Share2,
  SlidersHorizontal,
  Ticket,
  X
} from 'lucide-react';
import type { AgendaItem, EventAmbito } from '@/lib/agenda-data';
import {
  BA_TZ,
  agendaStatus,
  agendaTimestamps,
  buildIcsContent,
  formatBaDay,
  formatBaDayMonth,
  formatBaShortDate,
  formatBaTime,
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

interface DayGroup {
  key: string;
  kind: 'now' | 'day';
  ts: number;
  entries: ResolvedAgendaItem[];
}

const DAY_KEY_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: BA_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

function dayKey(ts: number): string {
  return DAY_KEY_FORMAT.format(new Date(ts));
}

const SITE_HEADER_PX = 65;
const DAY_MS = 24 * 60 * 60 * 1000;

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

function mapsUrlFor(item: AgendaItem): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery)}`;
}

/* ------------------------------------------------------------------ */
/* Overlay: bottom sheet en mobile, diálogo centrado en desktop        */
/* ------------------------------------------------------------------ */

function Overlay({
  labelledBy,
  onClose,
  children
}: {
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      panel
        ? Array.from(
            panel.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), select, input, [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    focusables()[0]?.focus();
    const raf = requestAnimationFrame(() => setEntered(true));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center lg:items-center lg:p-6" role="presentation">
      <div
        className={`absolute inset-0 bg-carbon/60 transition-opacity duration-200 motion-reduce:transition-none ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative flex max-h-[92dvh] w-full max-w-[640px] flex-col rounded-t-[4px] border border-carbon bg-pampa pb-[env(safe-area-inset-bottom)] shadow-xl transition-transform duration-200 ease-out motion-reduce:transition-none lg:max-h-[86vh] lg:rounded-[4px] lg:pb-0 ${
          entered ? 'translate-y-0' : 'translate-y-full lg:translate-y-4'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function SheetHeader({ id, eyebrow, title, onClose }: { id: string; eyebrow?: string; title: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-carbon/20 px-5 pb-3 pt-3">
      <div className="min-w-0">
        <span className="mx-auto mb-2 block h-1 w-10 bg-carbon/25 lg:hidden" aria-hidden="true" />
        {eyebrow && <p className="font-mono text-xs uppercase tracking-wider text-chicago">{eyebrow}</p>}
        <h2 id={id} className="font-display text-2xl font-semibold uppercase leading-tight">
          {title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="-mr-2 mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] text-carbon hover:bg-carbon/10 color-field"
      >
        <X className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fila de la lista                                                    */
/* ------------------------------------------------------------------ */

const chipBase =
  'inline-flex items-center border px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wide';

function AgendaRow({ entry, onOpen }: { entry: ResolvedAgendaItem; onOpen: (id: string) => void }) {
  const { item, startTs, status } = entry;
  const isComuna9 = item.ambito === 'Comuna 9';

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(item.id)}
        aria-haspopup="dialog"
        className={`grid min-h-[72px] w-full grid-cols-[64px_1fr_auto] items-start gap-x-3 px-1 py-4 text-left hover:bg-pampa-deep/60 color-field sm:grid-cols-[84px_1fr_auto] sm:gap-x-5 sm:px-3 ${
          status === 'past' ? 'opacity-70' : ''
        }`}
      >
        <span className="pt-0.5 text-right sm:text-left">
          {item.isMultiDay ? (
            <span className="block font-mono text-xs font-semibold uppercase leading-tight text-ladrillo">
              {item.dateBadge ?? `Hasta ${formatBaShortDate(entry.endTs)}`}
            </span>
          ) : (
            <span className="block font-display text-[1.65rem] font-semibold leading-none text-carbon">
              {formatBaTime(startTs)}
            </span>
          )}
        </span>

        <span className="min-w-0">
          <span className="block font-display text-xl font-semibold uppercase leading-[1.1] sm:text-2xl">
            {item.title}
          </span>
          <span className="mt-1 block truncate font-serif text-base text-carbon/85">
            {item.venueName}
          </span>
          <span className="mt-1.5 flex flex-wrap gap-1.5 empty:hidden">
            {status === 'in-progress' && (
              <span className={`${chipBase} border-chicago bg-chicago/10 text-chicago`}>En curso</span>
            )}
            {status === 'past' && <span className={`${chipBase} border-carbon/30 text-carbon/65`}>Finalizado</span>}
            {item.isFree && <span className={`${chipBase} border-chicago text-chicago`}>Gratis</span>}
            {isComuna9 && <span className={`${chipBase} border-cuero/60 bg-pampa-deep text-cuero`}>{item.barrio}</span>}
          </span>
        </span>

        <ChevronRight className="mt-1.5 h-5 w-5 shrink-0 text-carbon/45" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Detalle del evento                                                  */
/* ------------------------------------------------------------------ */

function EventDetail({ entry, onClose }: { entry: ResolvedAgendaItem; onClose: () => void }) {
  const { item, startTs, endTs, status } = entry;
  const [canShare, setCanShare] = useState(false);
  const isSingleSource = Boolean(item.source?.note);
  const isComuna9 = item.ambito === 'Comuna 9';
  const titleId = `agenda-detail-${item.id}`;

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const share = async () => {
    try {
      await navigator.share({
        title: item.title,
        text: `${item.title} · ${item.venueName}`,
        url: `${window.location.origin}/agenda#${item.id}`
      });
    } catch {
      /* el usuario canceló */
    }
  };

  const whenLine = item.isMultiDay
    ? `Del ${formatBaShortDate(startTs)} al ${formatBaShortDate(endTs)}`
    : formatBaDay(startTs);

  return (
    <Overlay labelledBy={titleId} onClose={onClose}>
      <div className="flex items-start justify-between gap-3 border-b border-carbon/20 px-5 pb-3 pt-3">
        <div className="min-w-0">
          <span className="mx-auto mb-2 block h-1 w-10 bg-carbon/25 lg:hidden" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider">
            <span className="font-semibold text-chicago">{item.category}</span>
            <span className="text-carbon/35" aria-hidden="true">
              ·
            </span>
            <span className={isComuna9 ? 'font-semibold text-cuero' : 'text-carbon/75'}>{item.barrio}</span>
            {status === 'in-progress' && <span className={`${chipBase} border-chicago bg-chicago/10 text-chicago`}>En curso</span>}
            {status === 'past' && <span className={`${chipBase} border-carbon/30 text-carbon/65`}>Finalizado</span>}
          </div>
          <h2 id={titleId} className="mt-1.5 font-display text-[1.75rem] font-semibold uppercase leading-[1.05]">
            {item.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="-mr-2 mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] text-carbon hover:bg-carbon/10 color-field"
        >
          <X className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
        <dl className="space-y-3 font-mono text-sm text-carbon">
          <div className="flex items-start gap-3">
            <dt className="sr-only">Cuándo</dt>
            <dd>
              <p className="text-base font-semibold">{whenLine}</p>
              <p className="text-carbon/75">{item.timeLabel}</p>
            </dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Dónde</dt>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
            <dd>
              <p className="font-semibold">{item.venueName}</p>
              <p className="text-carbon/75">{item.place}</p>
            </dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">Entrada</dt>
            <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
            <dd>{item.priceLabel}</dd>
          </div>
        </dl>

        <p className="mt-4 text-base leading-relaxed text-carbon/90">{item.description}</p>

        <p className={`mt-3 font-mono text-xs uppercase tracking-wider ${isSingleSource ? 'font-semibold text-ladrillo' : 'text-chicago'}`}>
          {item.highlightTag}
        </p>

        {item.source?.note && (
          <p className="mt-3 flex items-start gap-2 border-l-2 border-ladrillo bg-pampa-surface px-3 py-2 font-mono text-xs leading-relaxed text-carbon/85">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ladrillo" strokeWidth={1.75} aria-hidden="true" />
            <span>{item.source.note}</span>
          </p>
        )}

        <div className="mt-4 flex flex-col items-start gap-1 border-t border-carbon/15 pt-3 font-mono text-sm">
          {item.source && (
            <a
              href={item.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 text-chicago underline underline-offset-4 hover:text-chicago-dark"
            >
              <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Fuente: {item.source.label}
            </a>
          )}
          {item.relatedNotaSlug && (
            <Link
              href={`/notas/${item.relatedNotaSlug}`}
              className="inline-flex min-h-[48px] items-center gap-2 text-chicago underline underline-offset-4 hover:text-chicago-dark"
            >
              <FileText className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Leer nota relacionada
            </Link>
          )}
          {canShare && (
            <button
              type="button"
              onClick={share}
              className="inline-flex min-h-[48px] items-center gap-2 text-chicago underline underline-offset-4 hover:text-chicago-dark"
            >
              <Share2 className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              Compartir
            </button>
          )}
          {item.venueId === 'el-plata' && <ElPlataInstagramLink />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-carbon/20 bg-pampa-surface p-3">
        <a
          href={mapsUrlFor(item)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-3 text-sm font-semibold text-pampa hover:bg-chicago-dark color-field"
        >
          Cómo llegar
          <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() => downloadIcs(item)}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-3 text-sm font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
        >
          <CalendarPlus className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          Agendar
        </button>
      </div>
    </Overlay>
  );
}

/* ------------------------------------------------------------------ */
/* Explorador                                                          */
/* ------------------------------------------------------------------ */

const selectClass =
  'mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa-surface px-3 text-base text-carbon focus:border-chicago focus:outline-none';

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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [toolbarH, setToolbarH] = useState(116);

  const toolbarRef = useRef<HTMLDivElement>(null);
  const openedViaPush = useRef(false);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  /* Altura real de la barra sticky para anclar los encabezados de día debajo. */
  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const update = () => setToolbarH(el.offsetHeight);
    update();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Detalle enlazable (#id) y compatible con el botón "atrás" del celular. */
  useEffect(() => {
    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const exists = hash !== '' && items.some((item) => item.id === hash);
      setOpenId(exists ? hash : null);
      openedViaPush.current = exists && Boolean(window.history.state?.agendaEvent);
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, [items]);

  const openEvent = useCallback((id: string) => {
    window.history.pushState({ agendaEvent: id }, '', `#${id}`);
    openedViaPush.current = true;
    setOpenId(id);
  }, []);

  const closeEvent = useCallback(() => {
    if (openedViaPush.current) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
    setOpenId(null);
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
    return visibleByTime.filter(({ item }) => {
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
  }, [visibleByTime, ambitoFilter, venueFilter, categoryFilter, freeOnly, query]);

  /* "En curso" arriba; el resto agrupado por día calendario de Buenos Aires. */
  const groups = useMemo<DayGroup[]>(() => {
    const nowEntries = filtered
      .filter((entry) => entry.status === 'in-progress')
      .sort((a, b) => a.startTs - b.startTs);

    const byDay = new Map<string, DayGroup>();
    for (const entry of filtered) {
      if (entry.status === 'in-progress') continue;
      const key = dayKey(entry.startTs);
      const group = byDay.get(key);
      if (group) group.entries.push(entry);
      else byDay.set(key, { key, kind: 'day', ts: entry.startTs, entries: [entry] });
    }

    const days = Array.from(byDay.values()).sort((a, b) =>
      sortOrder === 'asc' ? a.key.localeCompare(b.key) : b.key.localeCompare(a.key)
    );
    days.forEach((group) => group.entries.sort((a, b) => a.startTs - b.startTs));

    return nowEntries.length > 0
      ? [{ key: 'now', kind: 'now', ts: now, entries: nowEntries }, ...days]
      : days;
  }, [filtered, sortOrder, now]);

  const todayKey = dayKey(now);
  const tomorrowKey = dayKey(now + DAY_MS);

  const sheetFilterCount =
    (venueFilter !== 'all' ? 1 : 0) +
    (categoryFilter !== 'all' ? 1 : 0) +
    (showPast && !allEnded ? 1 : 0) +
    (sortOrder === 'desc' ? 1 : 0);

  const hasFilters =
    query.trim().length > 0 ||
    ambitoFilter !== 'all' ||
    venueFilter !== 'all' ||
    categoryFilter !== 'all' ||
    freeOnly ||
    showPast ||
    sortOrder === 'desc';

  const clearAll = () => {
    setQuery('');
    setAmbitoFilter('all');
    setVenueFilter('all');
    setCategoryFilter('all');
    setFreeOnly(false);
    setShowPast(false);
    setSortOrder('asc');
  };

  const openEntry = openId ? resolvedAll.find((entry) => entry.item.id === openId) ?? null : null;

  const scopeOptions: { id: AmbitoFilter; label: string; count: number }[] = [
    { id: 'all', label: 'Todo', count: scopeCounts.all },
    { id: 'Mataderos', label: 'Mataderos', count: scopeCounts.mataderos },
    { id: 'Comuna 9', label: 'Liniers y Avellaneda', count: scopeCounts.comuna9 }
  ];

  const chipButton = (active: boolean) =>
    `inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-[4px] border px-3.5 text-sm font-semibold color-field ${
      active
        ? 'border-carbon bg-carbon text-pampa'
        : 'border-carbon/35 bg-pampa text-carbon hover:border-carbon'
    }`;

  return (
    <div style={{ '--agenda-top': `${SITE_HEADER_PX + toolbarH}px` } as CSSProperties}>
      {/* Barra sticky: búsqueda + filtros + alcance */}
      <div
        ref={toolbarRef}
        className="sticky top-[65px] z-30 -mx-[var(--gutter)] space-y-2 border-b border-carbon/20 bg-pampa-surface px-[var(--gutter)] pb-2.5 pt-2"
      >
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <label htmlFor="agenda-search" className="sr-only">
              Buscar evento, lugar o barrio
            </label>
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
              placeholder="Evento, lugar o barrio"
              className="min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa pl-10 pr-3 text-base text-carbon placeholder:text-carbon/45 focus:border-chicago focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            data-testid="agenda-filtros-btn"
            className="relative inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-[4px] border border-carbon px-3.5 text-sm font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Filtros
            {sheetFilterCount > 0 && (
              <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-[4px] bg-chicago px-1 font-mono text-[11px] text-pampa">
                {sheetFilterCount}
              </span>
            )}
          </button>
        </div>

        <div
          className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Filtrar por territorio"
        >
          {scopeOptions.map((option) => {
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
                className={chipButton(active)}
              >
                {option.label}
                <span className={`font-mono text-xs font-normal ${active ? 'text-pampa/75' : 'text-carbon/60'}`}>
                  {option.count}
                </span>
              </button>
            );
          })}
          <span className="mx-0.5 my-2 w-px shrink-0 bg-carbon/25" aria-hidden="true" />
          <button
            type="button"
            aria-pressed={freeOnly}
            onClick={() => setFreeOnly((value) => !value)}
            className={chipButton(freeOnly)}
          >
            Gratis
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {allEnded && (
          <div className="border border-carbon/25 bg-pampa p-4 font-mono text-sm text-carbon/85" role="status">
            Mostrando el archivo de noviembre y diciembre de 2026 (las fechas programadas de este ciclo ya finalizaron).
          </div>
        )}

        <div className="flex items-center justify-between gap-3 font-mono text-sm text-carbon/75" aria-live="polite">
          <span>
            {filtered.length} {filtered.length === 1 ? 'evento' : 'eventos'}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap px-1 font-semibold text-chicago underline underline-offset-4"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="border border-carbon/25 bg-pampa p-8 text-center" role="status">
            <p className="font-serif text-xl font-semibold">No encontramos eventos con esos filtros.</p>
            <p className="mt-2 text-base text-carbon/75">
              Probá quitando alguno de los filtros o cambiando el territorio seleccionado.
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="mt-4 inline-flex min-h-[48px] items-center rounded-[4px] border border-carbon px-4 text-sm font-semibold hover:bg-carbon hover:text-pampa color-field"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="border-x border-t border-carbon/25 bg-pampa">
            {groups.map((group) => {
              const isNow = group.kind === 'now';
              const dm = formatBaDayMonth(group.ts);
              const relative = group.key === todayKey ? 'Hoy' : group.key === tomorrowKey ? 'Mañana' : null;
              const headingId = `agenda-day-${group.key}`;
              return (
                <section key={group.key} aria-labelledby={headingId}>
                  <h3
                    id={headingId}
                    className="sticky top-[var(--agenda-top)] z-20 flex items-baseline justify-between gap-3 border-b border-carbon/25 bg-pampa-deep px-3 py-2 font-mono text-sm font-semibold uppercase tracking-wider text-carbon"
                  >
                    <span>
                      {isNow ? (
                        <span className="text-chicago">En curso ahora</span>
                      ) : (
                        <>
                          {relative && <span className="text-chicago">{relative} · </span>}
                          {dm.weekdayShort} {Number(dm.day)} {dm.month}
                        </>
                      )}
                    </span>
                    <span className="text-xs font-normal normal-case tracking-normal text-carbon/65">
                      {group.entries.length} {group.entries.length === 1 ? 'evento' : 'eventos'}
                    </span>
                  </h3>
                  <ul className="divide-y divide-carbon/15 border-b border-carbon/25 px-2 sm:px-3">
                    {group.entries.map((entry) => (
                      <AgendaRow key={entry.item.id} entry={entry} onOpen={openEvent} />
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Detalle del evento */}
      {openEntry && <EventDetail entry={openEntry} onClose={closeEvent} />}

      {/* Filtros avanzados */}
      {sheetOpen && (
        <Overlay labelledBy="agenda-filtros-title" onClose={() => setSheetOpen(false)}>
          <SheetHeader id="agenda-filtros-title" title="Filtros" onClose={() => setSheetOpen(false)} />

          <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-4">
            <div>
              <label htmlFor="agenda-venue" className="font-mono text-xs uppercase tracking-wider text-carbon/70">
                Lugar / Sede
              </label>
              <select
                id="agenda-venue"
                value={venueFilter}
                onChange={(e) => setVenueFilter(e.target.value)}
                className={selectClass}
              >
                <option value="all">Todos los lugares</option>
                {venueOptions.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-carbon/70" id="agenda-cat-label">
                Categoría
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2" role="group" aria-labelledby="agenda-cat-label">
                {['all', ...categoryOptions].map((cat) => {
                  const active = categoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategoryFilter(cat)}
                      className={chipButton(active)}
                    >
                      {cat === 'all' ? 'Todas' : cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-carbon/70" id="agenda-sort-label">
                Orden por fecha
              </p>
              <div className="mt-1.5 grid grid-cols-2 gap-2" role="group" aria-labelledby="agenda-sort-label">
                {[
                  { id: 'asc' as const, label: 'Más cercana primero' },
                  { id: 'desc' as const, label: 'Más lejana primero' }
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={sortOrder === option.id}
                    onClick={() => setSortOrder(option.id)}
                    className={`${chipButton(sortOrder === option.id)} justify-center`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {pastCount > 0 && !allEnded && (
              <label className="flex min-h-[48px] cursor-pointer items-center gap-3 text-base text-carbon">
                <input
                  type="checkbox"
                  checked={showPast}
                  onChange={(e) => setShowPast(e.target.checked)}
                  className="h-5 w-5 accent-chicago"
                />
                <span>Incluir eventos pasados ({pastCount})</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-2 border-t border-carbon/20 bg-pampa-surface p-3">
            <button
              type="button"
              onClick={() => {
                setVenueFilter('all');
                setCategoryFilter('all');
                setShowPast(false);
                setSortOrder('asc');
              }}
              disabled={sheetFilterCount === 0}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] border border-carbon/35 px-4 text-sm font-semibold text-carbon hover:border-carbon disabled:opacity-40"
            >
              Limpiar
            </button>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] bg-chicago px-4 text-sm font-semibold text-pampa hover:bg-chicago-dark color-field"
            >
              Ver {filtered.length} {filtered.length === 1 ? 'evento' : 'eventos'}
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
}
