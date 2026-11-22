'use client';

import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  VIVI_TILES,
  type AgendaVenue,
  type Business,
  type BusinessCategory,
  type NeighborhoodEvent
} from '@/lib/data';
import {
  formatBaDate,
  formatBaTime,
  splitRemaining,
  venueClock,
  type VenueClock
} from '@/lib/agenda';
import { isShopOpen } from '@/lib/hours';
import { ElPlataInstagramLink } from '@/components/ElPlataInstagramLink';

export interface HomeNote {
  slug: string;
  title: string;
  category: string;
  fecha: string;
  imageSrc: string;
  imageAlt: string;
  credit: string;
}

interface PortalClientProps {
  businesses: Business[];
  notes: HomeNote[];
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
  priority = false,
  reference = false
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  reference?: boolean;
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
      {reference && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap bg-carbon px-2 py-1 font-mono text-base text-pampa"
        >
          Referencia
        </span>
      )}
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
  const [held, setHeld] = useState(false);
  const [labels, setLabels] = useState<string[] | null>(null);

  useEffect(() => {
    const now = Date.now();
    setLabels(
      AGENDA_VENUES.map((venue) => {
        const moments = venueMoments(venue, now);
        const when = moments.clock.inProgress
          ? 'En curso'
          : `${formatBaDate(moments.nextInstant)} · ${formatBaTime(moments.nextInstant)}`;
        return `${venue.venue} · ${when}`;
      })
    );
  }, []);

  const items = AGENDA_VENUES.map((venue, index) => ({
    href: `#agenda-${venue.id}`,
    label: labels?.[index] ?? `${venue.venue} · ${venue.nextTitle}`
  }));

  const renderSet = (hidden: boolean) => (
    <div className="rail-ticker-set flex" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <a
          key={`${hidden ? 'copy' : 'live'}-${item.href}`}
          href={item.href}
          tabIndex={hidden ? -1 : undefined}
          className="inline-flex min-h-[48px] items-center whitespace-nowrap px-4 font-mono text-base underline-offset-4 hover:underline"
        >
          {item.label}
          <span className="ml-4" aria-hidden="true">
            ·
          </span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="border-b border-pampa/20 bg-carbon text-pampa">
      <div
        className={`rail-ticker w-full ${held ? 'is-held' : ''}`}
        role="region"
        aria-label="Próximos encuentros"
        onPointerDown={() => setHeld(true)}
        onPointerUp={() => setHeld(false)}
        onPointerCancel={() => setHeld(false)}
      >
        <div className="rail-ticker-track">
          {renderSet(false)}
          {renderSet(true)}
        </div>
      </div>
    </div>
  );
}

const BRAND_CLASS =
  'inline-flex min-h-[48px] items-center gap-3 whitespace-nowrap py-1 font-display text-2xl font-semibold uppercase tracking-tight text-pampa xl:text-3xl';

function BrandLockup() {
  return (
    <>
      <Image
        src="/logo-emblem.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 border border-pampa/40"
      />
      <span>Mataderos.ar</span>
    </>
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
    { href: '/notas', label: 'Notas' },
    { href: '#noticias', label: 'Portada' },
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
          <a href="#inicio" data-brand className={BRAND_CLASS}>
            <BrandLockup />
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

const HERO_POSTER = '/hero/hero-poster.jpg';
const HERO_LOGO_KEY = 'mataderos.heroLogo';

function Hero() {
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduce || saveData) return;

    const start = () => setPlayVideo(true);
    const arm = () => {
      window.requestIdleCallback(start, { timeout: 1200 });
    };
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
  }, []);

  return (
    <section id="inicio" className="hero-pin relative overflow-hidden bg-carbon">
      <img
        src={HERO_POSTER}
        alt="Pareja bailando en la Feria de Mataderos, con el público y el edificio de piedra de La Recova."
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {playVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          aria-hidden="true"
        >
          <source src="/hero/hero-1080.webm" type="video/webm" media="(min-width: 768px)" />
          <source src="/hero/hero-720.webm" type="video/webm" media="(max-width: 767px)" />
          <source src="/hero/hero-720.mp4" type="video/mp4" />
        </video>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgb(28 28 28 / 0.28) 0%, rgb(28 28 28 / 0.02) 36%, rgb(28 28 28 / 0.08) 58%, rgb(28 28 28 / 0.78) 100%)'
        }}
      />

      <div className="relative z-20 flex h-full flex-col justify-end px-[var(--gutter)] pb-5 pt-28 sm:pb-10">
        <div className="hero-title max-w-[14rem] text-pampa sm:max-w-xl">
          <p className="font-mono text-base">Mataderos · Comuna 9 · CABA</p>
          <h1 className="mt-2 font-display text-[2.35rem] font-semibold uppercase leading-[0.9] tracking-tight sm:text-[clamp(3.25rem,6vw,5.75rem)]">
            El domingo se baila en la feria
          </h1>
          <p className="mt-3 max-w-[28ch] font-serif text-lg italic leading-snug sm:max-w-none sm:text-2xl">
            Noticias, comercios, agenda y memoria del barrio.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#agenda"
              className="inline-flex min-h-[48px] items-center border border-pampa px-4 text-base font-semibold text-pampa"
            >
              Agenda de la semana
            </a>
            <a
              href="#directorio"
              className="inline-flex min-h-[48px] items-center bg-pampa px-4 text-base font-semibold text-carbon"
            >
              Comercios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroLogoFlight() {
  const flyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seen = window.sessionStorage.getItem(HERO_LOGO_KEY) === '1';
    const hero = document.getElementById('inicio');
    if (reduce || seen) {
      hero?.setAttribute('data-settled', 'true');
      return;
    }
    const brand = document.querySelector<HTMLElement>('[data-brand]');
    if (!brand) return;
    brand.style.visibility = 'hidden';
    setActive(true);
  }, []);

  useLayoutEffect(() => {
    if (!active) return;
    const brand = document.querySelector<HTMLElement>('[data-brand]');
    const node = flyRef.current;
    const hero = document.getElementById('inicio');
    if (!brand || !node) return;

    let done = false;
    let anim: Animation | null = null;

    const finish = () => {
      if (done) return;
      done = true;
      anim?.cancel();
      brand.style.visibility = '';
      hero?.setAttribute('data-settled', 'true');
      window.sessionStorage.setItem(HERO_LOGO_KEY, '1');
      setActive(false);
    };

    const flight = (delay: number) => {
      const rect = brand.getBoundingClientRect();
      node.style.left = `${rect.left}px`;
      node.style.top = `${rect.top}px`;
      const mobile = window.innerWidth < 768;
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? rect.bottom;
      const focusY = headerBottom + Math.max(96, window.innerHeight - headerBottom) * (mobile ? 0.36 : 0.4);
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const desired = Math.min(window.innerWidth * (mobile ? 0.84 : 0.4), mobile ? 320 : 520);
      const scale = Math.min(mobile ? 2.15 : 2.6, Math.max(1.4, desired / Math.max(rect.width, 1)));
      const from = `translate3d(${window.innerWidth / 2 - cx}px, ${focusY - cy}px, 0) scale(${scale})`;
      anim?.cancel();
      anim = node.animate([{ transform: from }, { transform: 'translate3d(0, 0, 0) scale(1)' }], {
        duration: mobile ? 1000 : 1200,
        delay,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fill: 'both'
      });
      anim.onfinish = finish;
    };

    flight(800);

    const onResize = () => {
      if (done) return;
      const elapsed = Number(anim?.currentTime ?? 0);
      if (elapsed < 800) {
        flight(800);
        return;
      }
      const visual = node.getBoundingClientRect();
      const rect = brand.getBoundingClientRect();
      node.style.left = `${rect.left}px`;
      node.style.top = `${rect.top}px`;
      const scale = visual.width / Math.max(rect.width, 1);
      const dx = visual.left + visual.width / 2 - (rect.left + rect.width / 2);
      const dy = visual.top + visual.height / 2 - (rect.top + rect.height / 2);
      anim?.cancel();
      anim = node.animate(
        [
          { transform: `translate3d(${dx}px, ${dy}px, 0) scale(${scale})` },
          { transform: 'translate3d(0, 0, 0) scale(1)' }
        ],
        { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'both' }
      );
      anim.onfinish = finish;
    };

    const onScroll = () => {
      if (window.scrollY > 8) finish();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      anim?.cancel();
      if (!done) brand.style.visibility = '';
    };
  }, [active]);

  if (!active) return null;

  return createPortal(
    <div
      ref={flyRef}
      aria-hidden="true"
      className={`pointer-events-none fixed z-[60] origin-center ${BRAND_CLASS}`}
    >
      <BrandLockup />
    </div>,
    document.body
  );
}

function NewsCarousel({ notes }: { notes: HomeNote[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  if (notes.length === 0) return null;

  return (
    <section id="noticias" aria-labelledby="noticias-titulo" className="relative z-10 border-t-8 border-chicago bg-pampa text-carbon">
      <div className="editorial-container pb-10 pt-10 sm:pb-16 sm:pt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-carbon/20 pb-5">
          <div className="min-w-0">
            <p className="font-mono text-base text-chicago">Guías y crónicas</p>
            <h2
              id="noticias-titulo"
              className="mt-2 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold uppercase leading-[0.95]"
            >
              Noticias del barrio
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/notas"
              className="inline-flex min-h-[48px] items-center bg-chicago px-4 font-semibold text-pampa"
            >
              Ver todas
            </Link>
            <SnapButtons
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
          aria-label="Notas del barrio"
          tabIndex={0}
          className="snap-row -mx-[var(--gutter)] flex items-stretch gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {notes.map((note, index) => (
            <article
              key={note.slug}
              data-snap-card
              className={`${NEWS_WIDTHS[index % NEWS_WIDTHS.length]} flex min-w-0 shrink-0 snap-start`}
            >
              <Link href={`/notas/${note.slug}`} className="flex h-full w-full flex-col bg-carbon text-pampa">
                <span className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden">
                  <PhotoFill src={note.imageSrc} alt={note.imageAlt} sizes="(max-width: 640px) 86vw, 40vw" />
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-base">
                    {note.category} · {note.fecha}
                  </span>
                  <h3 className="mt-2 line-clamp-3 font-serif text-xl font-semibold leading-snug">{note.title}</h3>
                  <span className="mt-2 font-mono text-base leading-snug text-pampa/80">{note.credit}</span>
                  <span className="mt-auto inline-flex min-h-[48px] items-center gap-2 pt-3 font-semibold">
                    Leer nota
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </article>
          ))}
          <article data-snap-card className="flex w-[84%] min-w-0 shrink-0 snap-start sm:w-[40%] lg:w-[28%]">
            <Link
              href="/notas"
              className="flex h-full min-h-[18rem] w-full flex-col justify-between bg-chicago p-5 text-pampa"
            >
              <span className="font-mono text-base">Archivo</span>
              <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold uppercase leading-[0.95]">
                Ver todas las noticias
              </span>
              <span className="inline-flex min-h-[48px] items-center gap-2 font-semibold">
                Ir a /notas
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
          </article>
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
            <p className="font-mono text-base">Feria, La Recova y El Plata</p>
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
                id={`agenda-${venue.id}`}
                data-snap-card
                className={`relative flex w-[88%] min-w-0 shrink-0 snap-start flex-col border bg-pampa-surface [hyphens:manual] [overflow-wrap:normal] sm:w-[70%] lg:w-[calc((100%-1rem)/3)] ${
                  isSoonest ? 'border-2 border-carbon' : 'border-carbon/30'
                }`}
              >
                {venue.id === 'el-plata' && (
                  <figure className="min-w-0">
                    <span className="relative block aspect-[16/9] overflow-hidden">
                      <PhotoFill
                        src="/notas/el-plata.jpg"
                        alt="Fachada del Cine Teatro El Plata sobre la avenida Juan B. Alberdi, con el nombre EL PLATA en el frente."
                        sizes="(max-width: 1024px) 88vw, 33vw"
                      />
                    </span>
                    <figcaption className="px-5 pt-3 font-mono text-base leading-snug">
                      <a
                        href="https://buenosaires.gob.ar/gcaba_historico/noticias/la-ciudad-reabre-el-cine-teatro-el-plata-un-icono-cultural-de-mataderos"
                        className="underline underline-offset-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Foto: Gobierno de la Ciudad de Buenos Aires
                      </a>
                    </figcaption>
                  </figure>
                )}
                <div className="p-5">
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
                  {venue.id === 'el-plata' && <ElPlataInstagramLink />}
                  <button
                    type="button"
                    onClick={() => openInfo(venue.id)}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-4 font-semibold color-field hover:bg-carbon hover:text-pampa"
                  >
                    Más info
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </div>
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
          {active.id === 'el-plata' && (
            <div className="mt-4 max-w-md">
              <ElPlataInstagramLink />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ViviTile({
  tile,
  imageClass
}: {
  tile: (typeof VIVI_TILES)[number];
  imageClass: string;
}) {
  const figure = (
    <>
      <span className={`relative block overflow-hidden ${imageClass}`}>
        <PhotoFill src={tile.imageUrl} alt={tile.imageAlt} sizes="(max-width: 1024px) 85vw, 25vw" />
      </span>
      <span className="block p-4 pb-0">
        <span className="block font-display text-[clamp(1.75rem,2vw,2.25rem)] font-semibold uppercase leading-none group-hover:underline group-hover:underline-offset-4">
          {tile.title}
        </span>
        <span className="mt-3 block text-lg leading-snug [hyphens:manual] [overflow-wrap:normal] [word-break:normal]">
          {tile.line}
        </span>
      </span>
    </>
  );

  const credit = tile.imageCreditHref ? (
    <a
      href={tile.imageCreditHref}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 block font-mono text-base leading-snug text-pampa underline underline-offset-4"
    >
      {tile.imageCredit}
    </a>
  ) : (
    <span className="mt-3 block font-mono text-base leading-snug text-pampa/80">{tile.imageCredit}</span>
  );

  if (tile.id === 'vivi-plata') {
    return (
      <div className="border border-pampa/30 bg-carbon">
        <a href={tile.href} aria-label={`${tile.title}. ${tile.line}`} className="group block">
          {figure}
        </a>
        <div className="space-y-4 px-4 py-4">
          {credit}
          <ElPlataInstagramLink tone="dark" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={tile.href}
      aria-label={`${tile.title}. ${tile.line}`}
      className="group block border border-pampa/30 bg-carbon"
    >
      {figure}
      <span className="block px-4 pb-4">{credit}</span>
    </a>
  );
}

function ViviBand() {
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <section
      id="vivi"
      aria-labelledby="vivi-titulo"
      data-surface="dark"
      className="relative z-10 bg-carbon text-pampa"
    >
      <div className="editorial-container section-pad">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-base">Cuatro maneras de entrar al barrio</p>
            <h2
              id="vivi-titulo"
              className="mt-2 max-w-4xl font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95]"
            >
              Viví Mataderos
            </h2>
          </div>
          <div className="lg:hidden">
            <SnapButtons
              dark
              prevLabel="Lugares anteriores"
              nextLabel="Lugares siguientes"
              onPrev={() => scrollSnap(scroller.current, -1)}
              onNext={() => scrollSnap(scroller.current, 1)}
            />
          </div>
        </div>

        <div
          ref={scroller}
          role="region"
          aria-label="Feria, La Recova, El Plata y corredores"
          tabIndex={0}
          className="snap-row -mx-[var(--gutter)] mt-8 flex gap-3 overflow-x-auto px-[var(--gutter)] lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {VIVI_TILES.map((tile) => (
            <div key={tile.id} data-snap-card className="w-[85vw] max-w-[28rem] shrink-0 snap-start">
              <ViviTile tile={tile} imageClass="aspect-[4/3]" />
            </div>
          ))}
        </div>

        <div className="mt-8 hidden gap-3 lg:grid lg:grid-cols-4">
          {VIVI_TILES.map((tile) => (
            <ViviTile key={tile.id} tile={tile} imageClass="aspect-[3/4]" />
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
            <p className="font-mono text-base">Archivo del barrio</p>
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
                <Link href={note.href} className="underline decoration-pampa/40 underline-offset-4">
                  {note.title}
                </Link>
              </h3>
              <p className="mt-4 text-lg leading-relaxed">{note.summary}</p>
              <Link href={note.href} className="mt-4 inline-flex min-h-[48px] items-center font-semibold underline underline-offset-4">
                Leer la nota
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATEGORY_ORDER: BusinessCategory[] = [
  'Mascotas',
  'Gastronomía',
  'Salud y Estética',
  'Hogar y Ferretería'
];

function ShopCard({ business, open }: { business: Business; open: boolean }) {
  const maps = mapsHref(`${business.address}, Mataderos, CABA`);
  return (
    <article className="flex h-full min-w-0 flex-col border border-carbon bg-pampa-surface">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <PhotoFill
          src={business.heroImage}
          alt={`Foto de referencia junto a la ficha de ${business.name}. No es la fachada del local.`}
          sizes="(max-width: 1024px) 85vw, 30vw"
          reference
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-base text-chicago">{business.category}</p>
        <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight">{business.name}</h3>
        <p className="mt-2 text-base leading-snug">{business.address}</p>
        <p className="mt-2 font-mono text-base">{open ? 'Abierto ahora' : 'Cerrado ahora'}</p>
        {business.hasSubdomain && (
          <p className="mt-2 font-mono text-base text-chicago">
            Web oficial · {business.slug}
            <wbr />
            .mataderos.ar
          </p>
        )}
        <div className="mt-auto grid gap-2 pt-4">
          {business.whatsapp ? (
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-3 font-semibold text-pampa color-field hover:bg-chicago-dark"
            >
              WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          ) : (
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-3 font-semibold color-field hover:bg-carbon hover:text-pampa"
            >
              Cómo llegar
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
          {business.hasSubdomain && (
            <Link
              href={`/comercio/${business.slug}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-3 font-semibold color-field hover:bg-carbon hover:text-pampa"
            >
              Ver web
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function ShopDirectory({ businesses }: { businesses: Business[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<BusinessCategory | null>(null);
  const [openOnly, setOpenOnly] = useState(false);
  const [shopName, setShopName] = useState('Veterinaria Flavio');
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  const categories = CATEGORY_ORDER.filter((item) => businesses.some((business) => business.category === item));
  const openOf = (business: Business) => (now === null ? business.isOpenNow : isShopOpen(business, now));
  const visible = businesses
    .filter((business) => (category ? business.category === category : true))
    .filter((business) => (openOnly ? openOf(business) : true))
    .slice()
    .sort((a, b) => Number(b.hasSubdomain) - Number(a.hasSubdomain) || a.name.localeCompare(b.name, 'es'));

  const clearFilters = () => {
    setCategory(null);
    setOpenOnly(false);
    scroller.current?.scrollTo({ left: 0 });
  };

  const simulated = slugifyShopName(shopName);
  const emptyMessage =
    openOnly && category
      ? 'No hay comercios abiertos en este rubro ahora'
      : openOnly
        ? 'No hay comercios abiertos ahora'
        : 'No hay comercios en este rubro';

  return (
    <section id="directorio" aria-labelledby="directorio-titulo" className="relative z-10 border-t border-carbon/15 bg-pampa text-carbon">
      <div className="editorial-container section-pad">
        <p className="font-mono text-base">Guía del barrio</p>
        <h2
          id="directorio-titulo"
          className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95]"
        >
          Comercios del barrio
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed">
          Los locales con Web oficial aparecen primero. La ficha sigue siendo gratuita para el resto del barrio.
        </p>

        <div className="mt-6 flex min-w-0 max-w-full items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            aria-pressed={category === null}
            onClick={() => setCategory(null)}
            className={`inline-flex min-h-[48px] shrink-0 items-center rounded-[4px] border px-4 text-base font-semibold color-field ${
              category === null ? 'border-carbon bg-carbon text-pampa' : 'border-carbon/40 bg-pampa text-carbon'
            }`}
          >
            Todos
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={`inline-flex min-h-[48px] shrink-0 items-center rounded-[4px] border px-4 text-base font-semibold color-field ${
                category === item ? 'border-carbon bg-carbon text-pampa' : 'border-carbon/40 bg-pampa text-carbon'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={openOnly}
            onClick={() => setOpenOnly((value) => !value)}
            className={`inline-flex min-h-[48px] shrink-0 items-center rounded-[4px] border px-4 text-base font-semibold color-field ${
              openOnly ? 'border-chicago bg-chicago text-pampa' : 'border-carbon/40 bg-pampa text-carbon'
            }`}
          >
            Abierto ahora
          </button>
        </div>

        {visible.length === 0 ? (
          <p className="mt-8 border border-carbon p-6 text-lg" role="status">
            {emptyMessage}
          </p>
        ) : (
          <>
            <div className="mt-6 flex justify-end lg:hidden">
              <SnapButtons
                prevLabel="Comercios anteriores"
                nextLabel="Comercios siguientes"
                onPrev={() => scrollSnap(scroller.current, -1)}
                onNext={() => scrollSnap(scroller.current, 1)}
              />
            </div>
            <div
              ref={scroller}
              role="region"
              aria-label="Comercios filtrados"
              tabIndex={0}
              className="snap-row -mx-[var(--gutter)] mt-4 flex items-stretch gap-3 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {visible.map((business) => (
                <div key={business.id} data-snap-card className="flex w-[85vw] shrink-0 snap-start lg:w-auto">
                  <ShopCard business={business} open={openOf(business)} />
                </div>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={clearFilters}
          className="mt-8 inline-flex min-h-[48px] items-center gap-2 font-semibold text-chicago underline underline-offset-4"
        >
          Ver todos los comercios
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <div id="sumar-comercio" className="mt-12 border border-carbon p-6 sm:p-8">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-[0.95]">
            ¿Tenés un comercio en Mataderos? Sumate
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed">
            La ficha con dirección, horario y WhatsApp es gratuita. Si querés el sitio del local, activamos la Web oficial dentro de Mataderos.ar.
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
            Web oficial · {simulated}.mataderos.ar
          </p>
          <a
            href={`https://wa.me/5491100000000?text=${encodeURIComponent(
              `Hola! Quiero sumar mi comercio a Mataderos.ar (${simulated}.mataderos.ar).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
          >
            Sumate por WhatsApp
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
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
                <Link href="/notas" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
                  Notas
                </Link>
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

export default function PortalClient({ businesses, notes, events }: PortalClientProps) {
  return (
    <div className="relative min-h-screen bg-pampa text-carbon">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <SiteHeader />
      <HeroLogoFlight />
      <main id="contenido" className="min-w-0">
        <Hero />
        <div className="relative z-10">
          <NewsCarousel notes={notes} />
          <AgendaStrip events={events} />
          <ViviBand />
          <ArchiveCarousel />
          <ShopDirectory businesses={businesses} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
