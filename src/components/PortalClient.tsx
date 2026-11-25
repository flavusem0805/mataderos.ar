'use client';

import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import {
  ARCHIVE_NOTES,
  VIVI_TILES,
  type Business,
  type BusinessCategory
} from '@/lib/data';
import { AGENDA_SPOTS, type AgendaItem } from '@/lib/agenda-data';
import { FOTOS } from '@/lib/notas/media';
import { whatsappUrl } from '@/lib/contact';
import { getEmprendedores, LOCATION_TYPE_LABELS } from '@/lib/emprendedores';
import {
  agendaStatus,
  agendaTimestamps,
  formatBaDate,
  formatBaDayMonth,
  formatBaShortDate,
  formatBaTime,
  splitRemaining
} from '@/lib/agenda';
import { isShopOpen } from '@/lib/hours';
import { ElPlataInstagramLink } from '@/components/ElPlataInstagramLink';
import { MobileBottomBar } from '@/components/MobileBottomBar';

export interface HomeNote {
  slug: string;
  title: string;
  category: string;
  fecha: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  credit?: string;
  placeLabel?: string;
}

interface PortalClientProps {
  businesses: Business[];
  notes: HomeNote[];
  agendaItems: AgendaItem[];
  serverNow: number;
}

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
  reference = false,
  objectPosition
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  reference?: boolean;
  objectPosition?: string;
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
        style={{ objectPosition: objectPosition ?? 'center' }}
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

function TopRail({ agendaItems, serverNow }: { agendaItems: AgendaItem[]; serverNow: number }) {
  const [held, setHeld] = useState(false);
  const [now, setNow] = useState<number>(serverNow);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const items = useMemo(() => {
    const active = agendaItems.filter((item) => agendaStatus(item, now) !== 'past');
    const source = active.length > 0 ? active : agendaItems;
    const seen = new Set<string>();
    const picked: AgendaItem[] = [];

    for (const item of source) {
      const dedupeKey = `${item.venueId}-${item.title}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);
      picked.push(item);
      if (picked.length >= 7) break;
    }

    return picked.map((item) => {
      const status = agendaStatus(item, now);
      const { startTs } = agendaTimestamps(item);
      const when =
        status === 'in-progress'
          ? item.isMultiDay && item.dateBadge
            ? `En curso · ${item.dateBadge}`
            : 'En curso'
          : `${formatBaShortDate(startTs)} · ${formatBaTime(startTs)} hs`;
      return {
        href: `/agenda#${item.id}`,
        label: `${item.title} · ${when}`
      };
    });
  }, [agendaItems, now]);

  const renderSet = (hidden: boolean) => (
    <div className="rail-ticker-set flex" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <Link
          key={`${hidden ? 'copy' : 'live'}-${item.href}`}
          href={item.href}
          tabIndex={hidden ? -1 : undefined}
          className="inline-flex min-h-[48px] items-center whitespace-nowrap px-4 font-mono text-base underline-offset-4 hover:underline"
        >
          {item.label}
          <span className="ml-4" aria-hidden="true">
            ·
          </span>
        </Link>
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

function SiteHeader({ agendaItems, serverNow }: { agendaItems: AgendaItem[]; serverNow: number }) {
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
    { href: '#directorio', label: 'Comercios' },
    { href: '/emprendedores', label: 'Emprendedores' }
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full max-w-full" data-surface="dark">
      <TopRail agendaItems={agendaItems} serverNow={serverNow} />
      <div className="border-b border-pampa/20 bg-chicago text-pampa">
        <div className="editorial-container flex min-h-[64px] items-center justify-between gap-3">
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
            <Link
              href="/sumate"
              className="inline-flex min-h-[48px] items-center rounded-[4px] border border-pampa/50 px-4 font-semibold hover:bg-pampa hover:text-chicago color-field"
            >
              Sumate
            </Link>
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/sumate"
              className="inline-flex min-h-[44px] items-center rounded-[4px] border border-pampa/50 px-3 text-sm font-semibold text-pampa hover:bg-pampa hover:text-chicago color-field sm:min-h-[48px] sm:px-4 sm:text-base"
            >
              Sumate
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[4px] border border-pampa/40 sm:min-h-[48px] sm:min-w-[48px]"
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
              <Link
                href="/sumate"
                onClick={() => setOpen(false)}
                className="flex min-h-[48px] items-center justify-between text-base font-semibold"
              >
                Sumate
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
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
            Noticias, comercios, emprendedores, agenda y memoria del barrio.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href="#agenda"
              className="inline-flex min-h-[48px] items-center border border-pampa px-4 text-base font-semibold text-pampa hover:bg-pampa hover:text-carbon color-field"
            >
              Agenda de la semana
            </a>
            <a
              href="#directorio"
              className="inline-flex min-h-[48px] items-center bg-pampa px-4 text-base font-semibold text-carbon hover:bg-pampa-surface color-field"
            >
              Comercios
            </a>
            <a
              href="#emprendedores"
              className="inline-flex min-h-[48px] items-center border border-pampa px-4 text-base font-semibold text-pampa hover:bg-pampa hover:text-carbon color-field"
            >
              Emprendedores
            </a>
            <Link
              href="/sumate"
              className="inline-flex min-h-[48px] items-center border border-pampa/60 px-4 text-base font-semibold text-pampa hover:bg-pampa hover:text-carbon color-field"
            >
              Sumate
            </Link>
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
                {note.imageSrc ? (
                  <span className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden">
                    <PhotoFill
                      src={note.imageSrc}
                      alt={note.imageAlt ?? note.title}
                      sizes="(max-width: 640px) 86vw, 40vw"
                      objectPosition={note.imagePosition}
                    />
                  </span>
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex aspect-[4/3] w-full shrink-0 flex-col justify-between bg-cuero p-4 text-pampa"
                  >
                    <span className="font-mono text-sm uppercase tracking-wider text-pampa/85">
                      {note.placeLabel ?? note.category}
                    </span>
                    <span className="font-display text-3xl font-semibold uppercase leading-[0.95]">
                      {note.category}
                    </span>
                  </span>
                )}
                <span className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-base">
                    {note.category} · {note.fecha}
                  </span>
                  <h3 className="mt-2 line-clamp-3 font-serif text-xl font-semibold leading-snug">{note.title}</h3>
                  {note.credit ? (
                    <span className="mt-2 font-mono text-base leading-snug text-pampa/80">{note.credit}</span>
                  ) : note.placeLabel ? (
                    <span className="mt-2 font-mono text-base leading-snug text-pampa/80">{note.placeLabel}</span>
                  ) : null}
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

function AgendaStrip({ agendaItems, serverNow }: { agendaItems: AgendaItem[]; serverNow: number }) {
  const [now, setNow] = useState<number>(serverNow);
  const [activeId, setActiveId] = useState<string>(AGENDA_SPOTS[0]?.id ?? 'el-plata');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setNow(Date.now());
  }, []);

  const spotsData = useMemo(() => {
    return AGENDA_SPOTS.map((spot) => {
      const matched = agendaItems
        .filter(spot.match)
        .sort((a, b) => agendaTimestamps(a).startTs - agendaTimestamps(b).startTs);
      const activeOrUpcoming = matched.filter((item) => agendaStatus(item, now) !== 'past');
      const visible = activeOrUpcoming.length > 0 ? activeOrUpcoming : matched;
      const featured = visible[0];
      const featuredStatus = featured ? agendaStatus(featured, now) : 'past';
      const featuredStartTs = featured ? agendaTimestamps(featured).startTs : Infinity;
      return { spot, items: visible, featured, featuredStatus, featuredStartTs };
    }).filter((entry) => entry.featured !== undefined);
  }, [agendaItems, now]);

  const soonestMataderosSpotId = useMemo(() => {
    const candidates = spotsData
      .filter((entry) => entry.spot.ambito === 'Mataderos' && entry.featuredStatus === 'upcoming')
      .sort((a, b) => a.featuredStartTs - b.featuredStartTs);
    return candidates[0]?.spot.id ?? null;
  }, [spotsData]);

  const quickList = useMemo(() => {
    const active = agendaItems.filter((item) => agendaStatus(item, now) !== 'past');
    const source = active.length > 0 ? active : agendaItems;
    return [...source].sort((a, b) => {
      const sa = agendaStatus(a, now);
      const sb = agendaStatus(b, now);
      if (sa === 'in-progress' && sb !== 'in-progress') return -1;
      if (sa !== 'in-progress' && sb === 'in-progress') return 1;
      return agendaTimestamps(a).startTs - agendaTimestamps(b).startTs;
    });
  }, [agendaItems, now]);

  const currentSpot = spotsData.find((entry) => entry.spot.id === activeId) ?? spotsData[0];
  if (!currentSpot || !currentSpot.featured) return null;

  const { spot, items: spotItems, featured, featuredStatus, featuredStartTs } = currentSpot;
  const spotPhoto = spot.photoId ? FOTOS[spot.photoId] : undefined;

  return (
    <section
      id="agenda"
      aria-labelledby="agenda-titulo"
      className="relative z-10 border-t border-carbon/20 bg-pampa-deep text-carbon"
    >
      <div className="editorial-container section-pad">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-carbon/25 pb-5">
          <div className="min-w-0">
            <p className="font-mono text-base">Noviembre y diciembre 2026 · Con fuente</p>
            <h2
              id="agenda-titulo"
              className="mt-2 font-display text-[clamp(2rem,5vw,4rem)] font-semibold uppercase leading-[0.95]"
            >
              Agenda
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-4 text-base font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
            >
              {expanded ? 'Ver por espacio' : 'Vista rápida'}
            </button>
            <Link
              href="/agenda"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-4 text-base font-semibold text-pampa hover:bg-chicago-dark color-field"
            >
              Ver agenda completa
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {!expanded ? (
          <div>
            <div
              role="tablist"
              aria-label="Espacios y ciclos de Mataderos"
              className="flex flex-wrap gap-2"
            >
              {spotsData.map((entry) => {
                const selected = entry.spot.id === spot.id;
                const isSoonest = soonestMataderosSpotId === entry.spot.id;
                const isLive = entry.featuredStatus === 'in-progress';
                return (
                  <button
                    key={entry.spot.id}
                    id={`agenda-${entry.spot.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveId(entry.spot.id)}
                    className={`inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border px-4 text-base font-semibold color-field ${
                      selected
                        ? 'border-carbon bg-carbon text-pampa'
                        : 'border-carbon/35 bg-pampa-surface text-carbon hover:border-carbon'
                    }`}
                  >
                    <span>{entry.spot.label}</span>
                    {isLive ? (
                      <span
                        className={`font-mono text-xs uppercase ${
                          selected ? 'text-pampa/85' : 'text-chicago'
                        }`}
                      >
                        · En curso
                      </span>
                    ) : isSoonest ? (
                      <span
                        className={`font-mono text-xs uppercase ${
                          selected ? 'text-pampa/80' : 'text-chicago'
                        }`}
                      >
                        · Próximo
                      </span>

                    ) : null}
                  </button>
                );
              })}
            </div>

            <article
              role="tabpanel"
              aria-labelledby={`agenda-${spot.id}`}
              className="mt-5 grid border border-carbon/30 bg-pampa-surface lg:grid-cols-12"
            >
              {spotPhoto ? (
                <figure className="flex flex-col border-b border-carbon/20 lg:col-span-5 lg:border-b-0 lg:border-r">
                  <span className="relative block aspect-[16/10] w-full flex-1 overflow-hidden lg:min-h-[320px]">
                    <PhotoFill
                      src={spotPhoto.src}
                      alt={spotPhoto.alt}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </span>
                  <figcaption className="border-t border-carbon/15 px-4 py-2.5 font-mono text-xs text-carbon/75">
                    <a
                      href={spotPhoto.sourceUrl}
                      className="underline underline-offset-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Foto: {spotPhoto.author} ({spotPhoto.taken}) · {spotPhoto.license}
                    </a>
                  </figcaption>
                </figure>
              ) : (
                <div
                  className="flex flex-col justify-between border-b border-carbon/20 bg-chicago-dark p-6 text-pampa sm:p-8 lg:col-span-5 lg:min-h-[320px] lg:border-b-0 lg:border-r" 
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-pampa/80">
                      {spot.barrioNote}
                    </p>
                    <p className="mt-3 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-semibold uppercase leading-[0.92]">
                      {spot.label}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-pampa/25 pt-4 font-mono text-sm text-pampa/90">
                    <p>{spot.kicker}</p>
                    <p className="mt-1">
                      {spotItems.length} {spotItems.length === 1 ? 'fecha programada' : 'fechas programadas'}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs uppercase tracking-wide">
                    <span className="font-semibold text-chicago">
                      {featured.highlightTag}
                    </span>
                    <span className="text-carbon/40" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-carbon/75">{featured.place}</span>
                  </div>

                  <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-semibold uppercase leading-[0.95]">
                    {featured.title}
                  </h3>

                  <p className="mt-2 font-serif text-lg font-semibold text-carbon/90 sm:text-xl">
                    {featured.venueName} · {featured.priceLabel}
                  </p>

                  <div className="mt-5 border-y border-carbon/20 py-4">
                    <p className="font-mono text-xs uppercase tracking-wider text-carbon/70">
                      {featuredStatus === 'in-progress' ? 'En curso ahora' : 'Próxima fecha'}
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold">
                      {featuredStatus === 'in-progress'
                        ? featured.isMultiDay && featured.dateBadge
                          ? `${featured.dateBadge} · ${featured.timeLabel}`
                          : `En curso · ${featured.timeLabel}`
                        : `${formatBaDate(featuredStartTs)} · ${featured.timeLabel}`}
                    </p>

                    {featuredStatus === 'upcoming' && <Countdown target={featuredStartTs} />}
                    {featuredStatus === 'in-progress' && (
                      <p className="mt-3 inline-block border border-chicago bg-chicago/10 px-3 py-1.5 font-display text-xl uppercase text-chicago">
                        En curso {featured.dateBadge ? `· ${featured.dateBadge}` : ''}
                      </p>
                    )}
                  </div>

                  <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-carbon/85 sm:text-lg">
                    {featured.description}
                  </p>

                  {featured.source?.note && (
                    <p className="mt-3 flex items-start gap-2 border-l-2 border-ladrillo bg-pampa px-3 py-2 font-mono text-xs text-carbon/85">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-ladrillo" strokeWidth={1.75} aria-hidden="true" />
                      <span>{featured.source.note}</span>
                    </p>
                  )}

                  {spotItems.length > 1 && (
                    <div className="mt-5 border-t border-carbon/15 pt-4">
                      <p className="font-mono text-xs uppercase tracking-wider text-carbon/70">
                        Todas las fechas de {spot.label}
                      </p>
                      <ul className="mt-2.5 divide-y divide-carbon/15">
                        {spotItems.map((item) => {
                          const { startTs } = agendaTimestamps(item);
                          return (
                            <li
                              key={item.id}
                              className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-2 text-sm"
                            >
                              <span className="min-w-0">
                                <span className="font-mono font-semibold text-chicago">
                                  {formatBaShortDate(startTs)} · {item.timeLabel}
                                </span>
                                {' — '}
                                <span className="font-semibold text-carbon">{item.title}</span>
                                {item.source?.note && (
                                  <span className="ml-1.5 font-mono text-xs text-ladrillo">· Fuente única (X)</span>
                                )}
                              </span>
                              {item.source && (
                                <a
                                  href={item.source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 font-mono text-xs text-carbon/75 underline underline-offset-4 hover:text-chicago"
                                >
                                  {item.source.label}
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={mapsHref(featured.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
                  >
                    Cómo llegar
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  {featured.source && (
                    <a
                      href={featured.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-4 font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
                    >
                      <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                      Fuente: {featured.source.label}
                    </a>
                  )}
                  {spot.id === 'el-plata' && <ElPlataInstagramLink />}
                </div>
              </div>
            </article>
          </div>
        ) : (
          <div className="divide-y divide-carbon/25 border-y border-carbon/25 bg-pampa-surface">
            {quickList.map((item) => {
              const { startTs } = agendaTimestamps(item);
              const status = agendaStatus(item, now);
              const dm = formatBaDayMonth(startTs);

              return (
                <article
                  key={item.id}
                  id={`agenda-${item.id}`}
                  className="grid gap-5 p-5 sm:p-6 lg:grid-cols-12 lg:items-center"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 lg:col-span-3 lg:flex-col lg:gap-1">
                    {status === 'in-progress' ? (
                      <>
                        <p className="font-display text-3xl font-semibold uppercase text-chicago">
                          En curso
                        </p>
                        <p className="font-mono text-sm uppercase text-carbon/75">
                          {item.dateBadge ?? item.timeLabel}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-[clamp(2.25rem,4vw,3.25rem)] font-semibold uppercase leading-none">
                          {dm.day} {dm.month}
                        </p>
                        <p className="font-mono text-sm uppercase text-carbon/75">
                          {dm.weekdayShort} · {item.timeLabel}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="lg:col-span-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider">
                      <span className="font-semibold text-chicago">{item.category}</span>
                      <span className="text-carbon/40" aria-hidden="true">
                        ·
                      </span>
                      <span className="text-carbon/75">{item.barrio}</span>
                      <span className="text-carbon/40" aria-hidden="true">
                        ·
                      </span>
                      <span className={item.source?.note ? 'font-semibold text-ladrillo' : 'text-carbon/75'}>
                        {item.priceLabel}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold uppercase leading-tight sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-serif text-lg font-semibold">{item.venueName}</p>
                    <p className="mt-1.5 text-base leading-relaxed text-carbon/80">{item.description}</p>
                    {item.source?.note && (
                      <p className="mt-2 font-mono text-xs text-ladrillo">{item.source.note}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 lg:col-span-3 lg:flex-col lg:items-stretch">
                    <a
                      href={mapsHref(item.mapsQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-4 text-sm font-semibold text-pampa color-field hover:bg-chicago-dark"
                    >
                      Cómo llegar
                      <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    </a>
                    {item.source && (
                      <a
                        href={item.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-4 text-sm font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        Fuente: {item.source.label}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
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
  const [shopName, setShopName] = useState('Veterinaria Alberdi');
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
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
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
          </div>
          <Link
            href="/directorio?tipo=comercios"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-4 font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa"
          >
            Filtrar por zona o rubro
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>

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

        {(category !== null || openOnly) && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 font-semibold text-chicago underline underline-offset-4"
          >
            Limpiar filtros y ver todos los comercios
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        )}

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
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl(
                `Hola! Quiero sumar mi comercio a Mataderos.ar (${simulated}.mataderos.ar).`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
            >
              Sumate por WhatsApp
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </a>
            <Link
              href="/sumate/emprendedores"
              className="inline-flex min-h-[48px] items-center gap-1.5 text-base font-medium text-chicago underline underline-offset-4"
            >
              ¿Tenés un puesto en la Feria o un emprendimiento? Entrá por acá
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmprendedoresBand() {
  const emprendedores = getEmprendedores();

  return (
    <section
      id="emprendedores"
      aria-labelledby="emprendedores-heading"
      className="section-pad border-t border-carbon/15 bg-pampa-surface text-carbon"
    >
      <div className="editorial-container">
        <p className="font-mono text-base text-chicago">Feria de Mataderos · La Recova · Oficios</p>
        <h2
          id="emprendedores-heading"
          className="mt-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold uppercase leading-[0.92]"
        >
          Emprendedores del barrio verificados
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-carbon/85">
          Puestos de la Feria y proyectos locales con revisión humana de Mataderos.ar. La ficha básica es gratuita para siempre.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {emprendedores.map((item) => (
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
                        <span className="text-carbon/70">Ejemplo</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    <Link
                      href={`/emprendedores/${item.slug}`}
                      className="hover:text-chicago hover:underline hover:underline-offset-4"
                    >
                      {item.displayName}
                    </Link>
                  </h3>
                  <p className="mt-1 font-mono text-sm text-carbon/70">
                    {item.category} · {LOCATION_TYPE_LABELS[item.locationType]}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-carbon/85">{item.tagline}</p>
                </div>
                <div className="mt-5 border-t border-carbon/15 pt-4">
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

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/sumate/emprendedores"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-6 font-semibold text-pampa hover:bg-chicago-dark color-field"
          >
            Sumá tu emprendimiento
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <Link
            href="/emprendedores"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-6 font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
          >
            Ver todos los emprendedores
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Link>
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
                  href="/comercio/veterinariaalberdi"
                  className="inline-flex min-h-[48px] items-center break-words font-mono text-base hover:underline hover:underline-offset-4"
                >
                  veterinariaalberdi.mataderos.ar
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
                  href={whatsappUrl('Hola, te escribo desde Mataderos.ar')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 hover:underline hover:underline-offset-4"
                >
                  WhatsApp del portal
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <Link
                  href="/sumate"
                  className="inline-flex min-h-[48px] items-center gap-2 hover:underline hover:underline-offset-4"
                >
                  Sumate a Mataderos.ar
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
                <Link
                  href="/directorio"
                  className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4"
                >
                  Directorio completo
                </Link>
                <Link
                  href="/emprendedores"
                  className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4"
                >
                  Emprendedores verificados
                </Link>
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
          <span>Hecho en Mataderos · Comuna 9</span>
          <div className="flex flex-wrap items-center gap-x-5">
            <Link href="/terminos" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
              Términos
            </Link>
            <Link href="/privacidad" className="inline-flex min-h-[48px] items-center hover:underline hover:underline-offset-4">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PortalClient({
  businesses,
  notes,
  agendaItems,
  serverNow
}: PortalClientProps) {
  return (
    <div className="relative min-h-screen bg-pampa pb-[64px] text-carbon lg:pb-0">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <SiteHeader agendaItems={agendaItems} serverNow={serverNow} />
      <HeroLogoFlight />
      <main id="contenido" className="min-w-0">
        <Hero />
        <div className="relative z-10">
          <NewsCarousel notes={notes} />
          <AgendaStrip agendaItems={agendaItems} serverNow={serverNow} />
          <ViviBand />
          <ArchiveCarousel />
          <ShopDirectory businesses={businesses} />
          <EmprendedoresBand />
        </div>
      </main>
      <SiteFooter />
      <MobileBottomBar />
    </div>
  );
}
