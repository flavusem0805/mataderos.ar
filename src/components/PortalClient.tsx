'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import {
  AGENDA_VENUES,
  ARCHIVE_NOTES,
  HERO_MEDIA,
  NOTICES,
  REFERENCE_STILLS,
  VIVI_TILES,
  type AgendaVenue,
  type Article,
  type Business,
  type NeighborhoodEvent
} from '@/lib/data';
import {
  formatBaDate,
  formatBaTime,
  splitRemaining,
  venueClock,
  type VenueClock
} from '@/lib/agenda';

interface PortalClientProps {
  businesses: Business[];
  articles: Article[];
  events: NeighborhoodEvent[];
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const NEWS_WIDTHS = [
  'w-[84%] sm:w-[58%] lg:w-[42%]',
  'w-[84%] sm:w-[44%] lg:w-[30%]',
  'w-[84%] sm:w-[50%] lg:w-[36%]',
  'w-[84%] sm:w-[40%] lg:w-[28%]',
  'w-[84%] sm:w-[48%] lg:w-[34%]'
];

const ARCHIVE_WIDTHS = [
  'w-[86%] md:w-[48%] lg:w-[34%]',
  'w-[86%] md:w-[42%] lg:w-[28%]',
  'w-[86%] md:w-[46%] lg:w-[32%]',
  'w-[86%] md:w-[40%] lg:w-[30%]',
  'w-[86%] md:w-[44%] lg:w-[33%]'
];

function slugifyShopName(input: string): string {
  const cleaned = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  return cleaned || 'tunegocio';
}

function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollSnap(container: HTMLDivElement | null, direction: -1 | 1) {
  if (!container) return;
  const card = container.querySelector<HTMLElement>('[data-snap-card]');
  const styles = window.getComputedStyle(container);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
  const delta = (card?.getBoundingClientRect().width ?? container.clientWidth * 0.8) + gap;
  container.scrollBy({
    left: direction * delta,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth'
  });
}

function PhotoFill({
  src,
  alt,
  sizes,
  priority = false
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap bg-carbon px-2 py-1 font-mono text-base text-pampa"
      >
        Referencia
      </span>
    </>
  );
}

function SnapButtons({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  dark
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  dark?: boolean;
}) {
  const buttonClass = dark
    ? 'border-pampa bg-carbon text-pampa hover:bg-pampa hover:text-carbon'
    : 'border-carbon bg-pampa text-carbon hover:bg-carbon hover:text-pampa';
  return (
    <div className={`flex items-center gap-2 ${dark ? '' : ''}`} data-surface={dark ? 'dark' : undefined}>
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className={`inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-[4px] border color-field ${buttonClass}`}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={`inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-[4px] border color-field ${buttonClass}`}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  );
}

function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const reduced = prefersReducedMotion();
    const id = window.setInterval(tick, reduced ? 60000 : 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = now === null ? null : splitRemaining(target - now);
  const spoken = parts
    ? `Faltan ${parts.days} días, ${parts.hours} horas y ${parts.minutes} minutos.`
    : 'Calculando la cuenta regresiva.';
  const cells: Array<[string, number | undefined]> = [
    ['Días', parts?.days],
    ['Horas', parts?.hours],
    ['Min', parts?.minutes],
    ['Seg', parts?.seconds]
  ];

  return (
    <div className="mt-4">
      <p className="sr-only" aria-live="polite">
        {spoken}
      </p>
      <div className="grid grid-cols-4 gap-2" aria-hidden="true">
        {cells.map(([label, value]) => (
          <div key={label} className="border border-carbon/30 px-1 py-2 text-center">
            <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none tabular-nums">
              {value === undefined ? '––' : String(value).padStart(2, '0')}
            </p>
            <p className="mt-1 font-mono text-base">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopRail() {
  const [line, setLine] = useState('Comuna 9 · Agenda de la Feria, La Recova y El Plata');

  useEffect(() => {
    const now = Date.now();
    const clocks = AGENDA_VENUES.map((venue) => ({
      venue,
      clock: venueClock(venue.weekday, venue.hour, venue.minute, venue.durationHours, now)
    }));
    const upcoming = clocks
      .filter((item) => !item.clock.inProgress)
      .sort((a, b) => a.clock.nextStart - b.clock.nextStart)[0];
    const today = formatBaDate(now);
    if (!upcoming) {
      setLine(`${today} · Hay actividad en curso en el barrio`);
      return;
    }
    setLine(
      `${today} · Próximo: ${upcoming.venue.venue} · ${formatBaDate(upcoming.clock.nextStart)} · ${formatBaTime(upcoming.clock.nextStart)}`
    );
  }, []);

  return (
      <div className="border-b border-pampa/20 bg-carbon text-pampa">
      <div className="editorial-container flex min-h-[48px] min-w-0 flex-col py-1 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4">
        <p className="min-w-0 break-words font-mono text-base sm:flex-1">{line}</p>
        <a
          href="#agenda"
          className="inline-flex min-h-[48px] items-center font-mono text-base underline underline-offset-4"
        >
          Ver agenda
        </a>
      </div>
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { href: '#noticias', label: 'Noticias' },
    { href: '#agenda', label: 'Agenda' },
    { href: '#vivi', label: 'Viví' },
    { href: '#historia', label: 'Historia' },
    { href: '#directorio', label: 'Comercios' }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full" data-surface="dark">
      <TopRail />
      <div className="border-b border-pampa/20 bg-chicago text-pampa">
        <div className="editorial-container flex min-h-[64px] items-center justify-between gap-4">
          <a
            href="#inicio"
            className="inline-flex min-h-[48px] items-center gap-3 py-1 font-display text-2xl font-semibold uppercase tracking-tight xl:text-3xl"
          >
            <Image
              src="/logo-emblem.png"
              alt=""
              width={40}
              height={40}
              priority
              className="shrink-0 border border-pampa/40"
            />
            <span>Mataderos.ar</span>
          </a>

          <nav aria-label="Navegación principal" className="hidden items-center gap-5 xl:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-[48px] items-center text-base font-medium hover:underline hover:underline-offset-4"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#sumar-comercio"
              className="inline-flex min-h-[48px] items-center rounded-[4px] border border-pampa/50 px-4 font-semibold hover:bg-pampa hover:text-chicago color-field"
            >
              Sumá tu comercio
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-[4px] border border-pampa/40 xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>

        {open && (
          <nav id={menuId} aria-label="Menú móvil" className="border-t border-pampa/20 bg-chicago-dark xl:hidden">
            <div className="editorial-container divide-y divide-pampa/15">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center justify-between text-base font-medium"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              ))}
              <a
                href="#sumar-comercio"
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center justify-between text-base font-semibold"
              >
                Sumá tu comercio
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-pin relative bg-carbon">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_MEDIA.src}
          alt={HERO_MEDIA.alt}
          fill
          priority
          quality={70}
          sizes="(max-width: 768px) 160vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative z-10 flex min-h-[100svh] flex-col px-[var(--gutter)] pb-28 pt-56 sm:pt-44">
        <div className="max-w-[18rem] border-t-4 border-celeste bg-carbon p-5 text-pampa sm:max-w-xl sm:p-8">
          <p className="font-mono text-base">Comuna 9 · CABA</p>
          <h1 className="mt-3 font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-tight text-pampa">
            Mataderos
          </h1>
          <p className="mt-4 font-serif text-[clamp(1.125rem,2vw,1.5rem)] italic leading-snug text-pampa">
            Portal del barrio: oficios, feria y memoria entre La Recova, Alberdi y Emilio Castro.
          </p>
          <p className="mt-5 border-t border-pampa/30 pt-3 font-mono text-base text-pampa">
            Foto de referencia. No es un registro del barrio.
          </p>
        </div>
      </div>
    </section>
  );
}

function NewsCarousel({
  articles,
  onOpen
}: {
  articles: Article[];
  onOpen: (article: Article) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  if (articles.length === 0) return null;

  return (
    <section id="noticias" aria-labelledby="noticias-titulo" className="news-overlap relative z-10">
      <div className="editorial-container pt-2">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div className="basis-full bg-carbon px-4 py-3 text-pampa sm:basis-auto sm:max-w-[70%]">
            <p className="font-mono text-base">01 — Crónicas y aperturas</p>
            <h2
              id="noticias-titulo"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold uppercase leading-[0.95]"
            >
              Noticias del barrio
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2" data-surface="dark">
            <a
              href="#todas-las-notas"
              className="inline-flex min-h-[48px] items-center rounded-[4px] bg-carbon px-4 font-semibold text-pampa"
            >
              Ver todas
            </a>
            <SnapButtons
              dark
              prevLabel="Notas anteriores"
              nextLabel="Notas siguientes"
              onPrev={() => scrollSnap(scroller.current, -1)}
              onNext={() => scrollSnap(scroller.current, 1)}
            />
          </div>
        </div>

        <div
          ref={scroller}
          role="region"
          aria-label="Noticias y aperturas"
          tabIndex={0}
          className="snap-row -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {articles.map((article, index) => (
            <article
              key={article.id}
              data-snap-card
              className={`${NEWS_WIDTHS[index % NEWS_WIDTHS.length]} min-w-0 shrink-0 snap-start`}
            >
              <button
                type="button"
                onClick={() => onOpen(article)}
                aria-label={`Leer nota: ${article.title}`}
                className="relative flex min-h-[20rem] w-full flex-col justify-end overflow-hidden bg-carbon text-left sm:min-h-[24rem]"
              >
                <span className="absolute inset-0">
                  <PhotoFill
                    src={article.imageUrl}
                    alt=""
                    sizes="(max-width: 640px) 86vw, 40vw"
                  />
                </span>
                <span className="relative z-10 block bg-carbon p-4 text-pampa sm:p-5">
                  <span className="block font-mono text-base">
                    {article.category} · {article.publishedLabel}
                  </span>
                  <h3 className="mt-2 break-words font-serif text-[clamp(1.35rem,2vw,1.85rem)] font-semibold leading-tight">
                    {article.title}
                  </h3>
                  <span className="mt-3 inline-flex min-h-[48px] items-center gap-2 font-semibold">
                    Leer nota
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <div id="todas-las-notas" className="bg-pampa text-carbon">
        <div className="editorial-container py-12 sm:py-16">
          <p className="font-mono text-base">Índice</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-none">
            Todas las notas
          </h2>
          <div className="mt-8 divide-y divide-carbon/25 border-y border-carbon/25">
            {articles.map((article) => (
              <article key={article.id}>
                <button
                  type="button"
                  onClick={() => onOpen(article)}
                  className="grid w-full gap-2 py-5 text-left sm:grid-cols-12 sm:items-baseline sm:gap-4"
                >
                  <span className="font-mono text-base text-chicago sm:col-span-3">
                    {article.publishedLabel} · {article.category}
                  </span>
                  <h3 className="font-serif text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-snug sm:col-span-7">
                    {article.title}
                  </h3>
                  <span className="inline-flex min-h-[48px] items-center gap-2 font-semibold text-chicago sm:col-span-2 sm:justify-end">
                    Leer nota
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function venueMoments(venue: AgendaVenue, now: number) {
  const clock: VenueClock = venueClock(
    venue.weekday,
    venue.hour,
    venue.minute,
    venue.durationHours,
    now
  );
  const lastInstant = clock.inProgress ? clock.previousStart - WEEK_MS : clock.previousStart;
  const nextInstant = clock.inProgress ? clock.previousStart : clock.nextStart;
  return { clock, lastInstant, nextInstant };
}

function AgendaStrip({ events }: { events: NeighborhoodEvent[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const picked = useRef(false);
  const [now, setNow] = useState<number | null>(null);
  const [activeId, setActiveId] = useState(AGENDA_VENUES[0]?.id ?? '');

  useEffect(() => {
    setNow(Date.now());
  }, []);

  useEffect(() => {
    if (now === null || picked.current) return;
    const ranked = AGENDA_VENUES.map((venue) => ({
      id: venue.id,
      ...venueMoments(venue, now)
    }))
      .filter((item) => !item.clock.inProgress)
      .sort((a, b) => a.nextInstant - b.nextInstant);
    if (ranked[0]) setActiveId(ranked[0].id);
  }, [now]);

  const active = AGENDA_VENUES.find((venue) => venue.id === activeId) ?? AGENDA_VENUES[0];
  const activeEvent = active ? events.find((event) => event.id === active.eventId) : undefined;

  const soonestId =
    now === null
      ? null
      : AGENDA_VENUES.map((venue) => ({ venue, ...venueMoments(venue, now) }))
          .filter((item) => !item.clock.inProgress)
          .sort((a, b) => a.nextInstant - b.nextInstant)[0]?.venue.id ?? null;

  const openInfo = (id: string) => {
    picked.current = true;
    setActiveId(id);
    window.requestAnimationFrame(() => {
      detailRef.current?.focus();
      detailRef.current?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  };

  if (!active) return null;

  return (
    <section id="agenda" aria-labelledby="agenda-titulo" className="relative z-10 border-t border-carbon/20 bg-pampa-deep text-carbon">
      <div className="editorial-container section-pad">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-carbon/25 pb-6">
          <div className="min-w-0">
            <p className="font-mono text-base">02 — Feria, La Recova y El Plata</p>
            <h2
              id="agenda-titulo"
              className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95]"
            >
              Agenda
            </h2>
          </div>
          <SnapButtons
            prevLabel="Agenda anterior"
            nextLabel="Agenda siguiente"
            onPrev={() => scrollSnap(scroller.current, -1)}
            onNext={() => scrollSnap(scroller.current, 1)}
          />
        </div>

        <div
          ref={scroller}
          role="region"
          aria-label="Próximos encuentros de la feria, La Recova y El Plata"
          tabIndex={0}
          className="snap-row -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {AGENDA_VENUES.map((venue) => {
            const moments = now === null ? null : venueMoments(venue, now);
            const isSoonest = soonestId === venue.id;
            return (
              <article
                key={venue.id}
                data-snap-card
                className={`relative w-[88%] min-w-0 shrink-0 snap-start break-words border bg-pampa-surface p-5 sm:w-[70%] lg:w-[calc((100%-1rem)/3)] ${
                  isSoonest ? 'border-2 border-carbon' : 'border-carbon/30'
                }`}
              >
                <p className="font-mono text-base">{isSoonest ? 'El más cercano' : 'Cartelera'}</p>
                <h3 className="mt-2 font-display text-[clamp(1.75rem,2.5vw,2.25rem)] font-semibold uppercase leading-none">
                  {venue.venue}
                </h3>
                <p className="mt-2 font-mono text-base">{venue.place}</p>

                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-carbon/20 pt-4 sm:grid-cols-2">
                  <div className="min-w-0">
                    <p className="font-mono text-base">Último</p>
                    <p className="mt-2 font-serif text-xl leading-tight">
                      {moments ? formatBaDate(moments.lastInstant) : '—'}
                    </p>
                    <p className="mt-1 font-mono text-base">
                      {moments ? formatBaTime(moments.lastInstant) : venue.lastTitle}
                    </p>
                    <p className="mt-2 text-base leading-snug">{venue.lastTitle}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-base">Próximo</p>
                    <p className="mt-2 font-serif text-xl leading-tight">
                      {moments?.clock.inProgress
                        ? 'En curso'
                        : moments
                          ? formatBaDate(moments.nextInstant)
                          : '—'}
                    </p>
                    <p className="mt-1 font-mono text-base">
                      {moments ? formatBaTime(moments.nextInstant) : ''}
                    </p>
                    <p className="mt-2 text-base leading-snug">{venue.nextTitle}</p>
                  </div>
                </div>

                {isSoonest && moments && !moments.clock.inProgress && (
                  <Countdown target={moments.nextInstant} />
                )}
                {moments?.clock.inProgress && (
                  <p className="mt-4 border border-carbon px-3 py-3 font-display text-2xl uppercase">
                    En curso
                  </p>
                )}

                <div className="mt-4 grid gap-2">
                  <a
                    href={mapsHref(venue.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-4 text-center font-semibold text-pampa color-field hover:bg-chicago-dark"
                  >
                    Entradas / Cómo llegar
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openInfo(venue.id)}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-4 font-semibold color-field hover:bg-carbon hover:text-pampa"
                  >
                    Más info
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div
          id="agenda-detalle"
          ref={detailRef}
          tabIndex={-1}
          className="mt-8 border border-carbon/30 bg-pampa-surface p-6 sm:p-8"
        >
          <p className="font-mono text-base">Más info · {active.venue}</p>
          <h3 className="mt-2 font-serif text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-tight">
            {active.nextTitle}
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed sm:text-xl">
            {activeEvent?.description ?? active.description}
          </p>
          <p className="mt-4 font-mono text-base">
            {active.place}
            {activeEvent ? ` · ${activeEvent.timeLabel} · ${activeEvent.highlightTag}` : ''}
          </p>
          <a
            href={`#${active.noticeId}`}
            className="mt-4 inline-flex min-h-[48px] items-center gap-2 font-semibold text-chicago underline underline-offset-4"
          >
            Ver el aviso práctico
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ViviBand() {
  return (
    <section
      id="vivi"
      aria-labelledby="vivi-titulo"
      data-surface="dark"
      className="relative z-10 bg-carbon text-pampa"
    >
      <div className="editorial-container section-pad">
        <p className="font-mono text-base">03 — Cuatro maneras de entrar al barrio</p>
        <h2
          id="vivi-titulo"
          className="mt-2 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95]"
        >
          Viví Mataderos
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {VIVI_TILES.map((tile) => (
            <a
              key={tile.id}
              href={tile.href}
              aria-label={`${tile.title}. ${tile.line}`}
              className="group block min-w-0 break-words border border-pampa/30 bg-carbon"
            >
              <span className="relative block aspect-[3/4] overflow-hidden">
                <PhotoFill src={tile.imageUrl} alt={tile.imageAlt} sizes="(max-width: 1024px) 50vw, 25vw" />
              </span>
              <span className="block p-4">
                <span className="block font-display text-[clamp(1.75rem,2vw,2.25rem)] font-semibold uppercase leading-none group-hover:underline group-hover:underline-offset-4">
                  {tile.title}
                </span>
                <span className="mt-3 block text-lg leading-snug">{tile.line}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  if (ARCHIVE_NOTES.length === 0) return null;

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      data-surface="dark"
      className="relative z-10 bg-cuero text-pampa"
    >
      <div className="editorial-container section-pad">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-pampa/30 pb-6">
          <div className="min-w-0 basis-full sm:basis-auto sm:max-w-[70%]">
            <p className="font-mono text-base">04 — Archivo del barrio</p>
            <h2
              id="historia-titulo"
              className="mt-2 font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05]"
            >
              De los corrales al Mataderos de hoy
            </h2>
          </div>
          <SnapButtons
            dark
            prevLabel="Archivo anterior"
            nextLabel="Archivo siguiente"
            onPrev={() => scrollSnap(scroller.current, -1)}
            onNext={() => scrollSnap(scroller.current, 1)}
          />
        </div>

        <div
          ref={scroller}
          role="region"
          aria-label="Historia y notas de archivo"
          tabIndex={0}
          className="snap-row -mx-[var(--gutter)] flex items-stretch gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ARCHIVE_NOTES.map((note, index) => (
            <article
              key={note.id}
              data-snap-card
              className={`${ARCHIVE_WIDTHS[index % ARCHIVE_WIDTHS.length]} flex shrink-0 snap-start flex-col border border-pampa/40 p-6`}
            >
              <p className="font-serif text-[clamp(2.5rem,4vw,3.75rem)] font-semibold leading-none">
                {note.dateLabel}
              </p>
              <p className="mt-4 font-mono text-base">{note.category}</p>
              <h3 className="mt-2 font-serif text-[clamp(1.5rem,2vw,1.85rem)] font-semibold leading-snug">
                {note.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed">{note.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Notices() {
  if (NOTICES.length === 0) return null;
  return (
    <section id="avisos" aria-labelledby="avisos-titulo" className="relative z-10 bg-pampa-deep text-carbon">
      <div className="editorial-container section-pad">
        <p className="font-mono text-base">05 — Para moverse y atender</p>
        <h2
          id="avisos-titulo"
          className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95]"
        >
          Avisos prácticos
        </h2>
          <div className="mt-8 grid grid-cols-1 border-l border-t border-carbon/30 md:grid-cols-2">
          {NOTICES.map((notice) => (
            <article key={notice.id} id={notice.id} className="border-b border-r border-carbon/30 p-6 sm:p-8">
              <p className="font-mono text-base text-chicago">
                {notice.dateLabel} · {notice.category}
              </p>
              <h3 className="mt-3 font-serif text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-tight">
                {notice.title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed sm:text-xl">{notice.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShopShowcase({ businesses }: { businesses: Business[] }) {
  const [shopName, setShopName] = useState('Veterinaria Flavio');
  const featured =
    businesses.find((business) => business.featured && business.hasSubdomain) ??
    businesses.find((business) => business.hasSubdomain) ??
    businesses[0];

  if (!featured) return null;

  const supporters = businesses
    .filter((business) => business.id !== featured.id)
    .slice()
    .sort((a, b) => Number(b.hasSubdomain) - Number(a.hasSubdomain));
  const simulated = slugifyShopName(shopName);
  const collage = [
    {
      src: featured.heroImage,
      alt: `Foto de referencia junto a la ficha de ${featured.name}. No es la fachada del local.`
    },
    {
      src: REFERENCE_STILLS.cafe,
      alt: 'Interior de un café. Fotografía de referencia, no pertenece al comercio destacado.'
    },
    {
      src: REFERENCE_STILLS.counter,
      alt: 'Mostrador de un comercio. Fotografía de referencia, no pertenece al comercio destacado.'
    }
  ];

  return (
    <section id="directorio" aria-labelledby="directorio-titulo" className="relative z-10 bg-pampa text-carbon">
      <div className="editorial-container section-pad">
        <p className="font-mono text-base">06 — Web Oficial</p>
        <div className="mt-4 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="mb-5 h-1 w-16 bg-ladrillo" aria-hidden="true" />
            <p className="font-mono text-base text-chicago">{featured.category} · {featured.zone}</p>
            <h2
              id="directorio-titulo"
              className="mt-3 font-serif text-[clamp(2.75rem,6vw,5rem)] font-semibold leading-[0.95]"
            >
              {featured.name}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed sm:text-xl">{featured.longDescription}</p>
            <p className="mt-5 font-mono text-base text-chicago break-words">
              Web Oficial · {featured.slug}.mataderos.ar
            </p>
            <p className="mt-3 text-base leading-relaxed">
              {featured.address} · {featured.hoursSummary}
            </p>
            <Link
              href={`/comercio/${featured.slug}`}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
            >
              Entrar al sitio
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-6 gap-2 sm:grid-rows-2">
              <div className="relative col-span-6 min-h-[240px] overflow-hidden sm:col-span-4 sm:row-span-2 sm:min-h-[440px]">
                <PhotoFill src={collage[0].src} alt={collage[0].alt} sizes="(max-width: 640px) 100vw, 40vw" />
              </div>
              <div className="relative col-span-3 min-h-[140px] overflow-hidden sm:col-span-2 sm:min-h-[214px]">
                <PhotoFill src={collage[1].src} alt={collage[1].alt} sizes="(max-width: 640px) 50vw, 20vw" />
              </div>
              <div className="relative col-span-3 min-h-[140px] overflow-hidden sm:col-span-2 sm:min-h-[214px]">
                <PhotoFill src={collage[2].src} alt={collage[2].alt} sizes="(max-width: 640px) 50vw, 20vw" />
              </div>
            </div>
            <p className="mt-3 font-mono text-base">
              Collage de fotos de referencia. Ninguna muestra el local real.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-carbon/25 pt-10">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold uppercase leading-[0.95]">
            Comercios que sostienen el portal
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed sm:text-xl">
            Cada ficha de la guía es gratuita. Los locales con sello Web Oficial sostienen Mataderos.ar con su subdominio.
          </p>

          <div className="mt-8 grid min-w-0 grid-cols-1 border-l border-t border-carbon sm:grid-cols-2">
            {supporters.map((business, index) => {
              const lastOdd = supporters.length % 2 === 1 && index === supporters.length - 1;
              const href = business.hasSubdomain
                ? `/comercio/${business.slug}`
                : business.whatsapp
                  ? `https://wa.me/${business.whatsapp}`
                  : mapsHref(`${business.address}, Mataderos, CABA`);
              const external = !business.hasSubdomain;
              const action = business.hasSubdomain
                ? 'Entrar al sitio'
                : business.whatsapp
                  ? 'Escribir por WhatsApp'
                  : 'Cómo llegar';
              return (
                <article
                  key={business.id}
                  className={`flex min-w-0 flex-col border-b border-r border-carbon bg-pampa-surface ${
                    lastOdd ? 'sm:col-span-2 sm:grid sm:grid-cols-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden">
                    <PhotoFill
                      src={business.heroImage}
                      alt={`Foto de referencia junto a la ficha de ${business.name}. No es la fachada del local.`}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-mono text-base text-chicago">
                      {business.category} · {business.zone}
                    </p>
                    <h3 className="mt-2 font-serif text-[clamp(1.5rem,2vw,2rem)] font-semibold leading-tight">
                      {business.name}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed">{business.description}</p>
                    <p className="mt-3 text-base">
                      {business.address} · {business.isOpenNow ? 'Abierto ahora' : 'Cerrado ahora'} · {business.hoursSummary}
                    </p>
                    {business.hasSubdomain && (
                      <p className="mt-3 break-words font-mono text-base text-chicago">
                        Web Oficial · {business.slug}.mataderos.ar
                      </p>
                    )}
                    <div className="mt-auto pt-5">
                      {external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[48px] items-center gap-2 font-semibold text-chicago underline underline-offset-4"
                        >
                          {action}
                          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="inline-flex min-h-[48px] items-center gap-2 font-semibold text-chicago underline underline-offset-4"
                        >
                          {action}
                          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div id="sumar-comercio" className="mt-16 border border-carbon p-6 sm:p-8">
          <p className="font-mono text-base text-chicago">Para locales de la Comuna 9</p>
          <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-[0.95]">
            Sumá tu comercio
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed sm:text-xl">
            La ficha con dirección, horario y WhatsApp es gratuita. Si querés el sitio del local, activamos la Web Oficial dentro de Mataderos.ar.
          </p>
          <label htmlFor="b2b-slug-input" className="mt-6 block text-base font-semibold">
            Nombre del negocio
          </label>
          <input
            id="b2b-slug-input"
            type="text"
            value={shopName}
            onChange={(event) => setShopName(event.target.value)}
            className="mt-2 min-h-[48px] w-full border border-carbon/40 bg-pampa-surface px-4 text-lg text-carbon"
          />
          <p className="mt-4 break-words border border-carbon/25 bg-pampa-surface px-4 py-3 font-mono text-base">
            Web Oficial · {simulated}.mataderos.ar
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/5491100000000?text=${encodeURIComponent(
                `Hola! Quiero consultar por la ficha o Web Oficial (${simulated}.mataderos.ar) para mi comercio.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
            >
              Pedir la Web Oficial
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <Link
              href="/comercio/veterinariaflavio"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold color-field hover:bg-carbon hover:text-pampa"
            >
              Ver un ejemplo
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterColumn({
  title,
  children,
  panelId
}: {
  title: string;
  children: React.ReactNode;
  panelId: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-pampa/20 md:border-t-0">
      <button
        type="button"
        className="flex min-h-[48px] w-full items-center justify-between gap-3 text-left font-mono text-base md:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 shrink-0 motion-safe:transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </button>
      <p className="mb-3 hidden font-mono text-base text-pampa/80 md:block">{title}</p>
      <div id={panelId} className={`${open ? 'block' : 'hidden'} pb-4 md:block md:pb-0`}>
        {children}
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer data-surface="dark" className="relative z-10 border-t border-pampa/20 bg-carbon text-pampa">
      <div className="editorial-container py-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-emblem.png"
                alt=""
                width={52}
                height={52}
                className="shrink-0 border border-pampa/35"
              />
              <p className="font-display text-3xl font-semibold uppercase">Mataderos.ar</p>
            </div>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-pampa">
              Portal comunitario y guía de comercios de Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires.
            </p>
          </div>

          <div className="md:col-span-8 grid md:grid-cols-3 md:gap-8">
            <FooterColumn title="Recorrido" panelId="footer-recorrido">
              <div className="flex flex-col">
                <a href="#noticias" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
                  Noticias
                </a>
                <a href="#agenda" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
                  Agenda
                </a>
                <a href="#vivi" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
                  Viví Mataderos
                </a>
                <a href="#historia" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
                  Historia
                </a>
                <a href="#avisos" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
                  Avisos
                </a>
              </div>
            </FooterColumn>
            <FooterColumn title="Web Oficial" panelId="footer-web">
              <div className="flex flex-col">
                <Link
                  href="/comercio/veterinariaflavio"
                  className="inline-flex min-h-[48px] items-center break-words font-mono text-base hover:underline hover:underline-offset-4"
                >
                  veterinariaflavio.mataderos.ar
                </Link>
                <Link
                  href="/comercio/tostadorescastro"
                  className="inline-flex min-h-[48px] items-center break-words font-mono text-base hover:underline hover:underline-offset-4"
                >
                  tostadorescastro.mataderos.ar
                </Link>
                <Link
                  href="/comercio/cantinaloscorrales"
                  className="inline-flex min-h-[48px] items-center break-words font-mono text-base hover:underline hover:underline-offset-4"
                >
                  cantinaloscorrales.mataderos.ar
                </Link>
              </div>
            </FooterColumn>
            <FooterColumn title="Contacto" panelId="footer-contacto">
              <div className="flex flex-col">
                <a
                  href="https://wa.me/5491100000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 hover:underline hover:underline-offset-4"
                >
                  WhatsApp del portal
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href="#sumar-comercio"
                  className="inline-flex min-h-[48px] items-center gap-2 hover:underline hover:underline-offset-4"
                >
                  Sumar mi comercio
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href="#directorio"
                  className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4"
                >
                  Guía de comercios
                </a>
              </div>
            </FooterColumn>
          </div>
        </div>
      </div>
      <div className="border-t border-pampa/20">
        <div className="editorial-container flex min-h-[48px] flex-wrap items-center justify-between gap-3 py-3 font-mono text-base">
          <span>Hecho en Mataderos</span>
          <span>Comuna 9 · CABA</span>
        </div>
      </div>
    </footer>
  );
}

function ArticleDialog({
  article,
  onClose
}: {
  article: Article;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) return;
    const focusable = [
      ...panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])')
    ];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-carbon/80 p-4 sm:p-6"
      onClick={onClose}
      onKeyDown={onKeyDown}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-carbon bg-pampa-surface text-carbon"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full border-b border-carbon/20">
          <PhotoFill
            src={article.imageUrl}
            alt={`Foto de referencia de la nota «${article.title}».`}
            sizes="(max-width: 768px) 100vw, 680px"
          />
        </div>
        <div className="p-6 sm:p-10">
          <p className="font-mono text-base">
            {article.category} · {article.zone} · {article.publishedLabel} · Lectura {article.readTime}
          </p>
          <h2 id={titleId} className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight">
            {article.title}
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed sm:text-xl">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-carbon/20 pt-6">
            {article.mentionedBusinessSlug ? (
              <Link
                href={`/comercio/${article.mentionedBusinessSlug}`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
              >
                Web Oficial · {article.mentionedBusinessSlug}.mataderos.ar
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            ) : (
              <span />
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[48px] items-center rounded-[4px] border border-carbon px-5 font-semibold color-field hover:bg-carbon hover:text-pampa"
            >
              Cerrar nota
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortalClient({ businesses, articles, events }: PortalClientProps) {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeArticle]);

  return (
    <div className="relative min-h-screen bg-pampa text-carbon">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="min-w-0">
        <Hero />
        <div className="relative z-10">
          <NewsCarousel articles={articles} onOpen={setActiveArticle} />
          <AgendaStrip events={events} />
          <ViviBand />
          <ArchiveCarousel />
          <Notices />
          <ShopShowcase businesses={businesses} />
        </div>
      </main>
      <SiteFooter />
      {activeArticle && (
        <ArticleDialog article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}
    </div>
  );
}
