'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Search,
  SlidersHorizontal,
  X
} from 'lucide-react';
import type { Business, BusinessCategory, NeighborhoodZone } from '@/lib/data';
import {
  LOCATION_TYPE_LABELS,
  type Emprendedor,
  type EmprendedorCategory
} from '@/lib/emprendedores';
import { isShopOpen } from '@/lib/hours';

export type DirectoryKindFilter = 'todos' | 'comercios' | 'emprendedores';
export type ModalityFilter = 'todas' | 'calle' | 'feria' | 'web_oficial';
export type SortOption = 'destacados' | 'abiertos' | 'az' | 'rubro';

export type ZoneFilter =
  | 'todas'
  | 'Av. Alberdi'
  | 'Polo Emilio Castro'
  | 'Casco Histórico'
  | 'Av. Eva Perón';

interface DirectoryExplorerProps {
  businesses: Business[];
  emprendedores: Emprendedor[];
  initialQuery?: string;
  initialKind?: DirectoryKindFilter;
  initialZone?: ZoneFilter;
  initialCategory?: string;
  initialOpenOnly?: boolean;
}

type UnifiedEntry =
  | {
      kind: 'comercio';
      id: string;
      name: string;
      category: BusinessCategory;
      zone: NeighborhoodZone;
      isOpen: boolean;
      isFeatured: boolean;
      business: Business;
    }
  | {
      kind: 'emprendedor';
      id: string;
      name: string;
      category: EmprendedorCategory;
      zone: string;
      isOpen: boolean;
      isFeatured: boolean;
      emprendedor: Emprendedor;
    };

const ZONES: { value: ZoneFilter; label: string }[] = [
  { value: 'todas', label: 'Todas las zonas' },
  { value: 'Av. Alberdi', label: 'Av. Alberdi' },
  { value: 'Polo Emilio Castro', label: 'Polo Emilio Castro' },
  { value: 'Casco Histórico', label: 'Casco Histórico y La Recova' },
  { value: 'Av. Eva Perón', label: 'Av. Eva Perón' }
];

const MODALITIES: { value: ModalityFilter; label: string }[] = [
  { value: 'todas', label: 'Todas las modalidades' },
  { value: 'calle', label: 'Local o dirección en el barrio' },
  { value: 'feria', label: 'Puesto en Feria de Mataderos' },
  { value: 'web_oficial', label: 'Con Web Oficial (.mataderos.ar)' }
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function matchesEmprendedorZone(item: Emprendedor, zone: ZoneFilter): boolean {
  if (zone === 'todas') return true;
  const haystack = normalizeText(
    `${item.feriaName ?? ''} ${item.puestoLabel ?? ''} ${item.address ?? ''} ${item.zone} ${item.locationNote}`
  );
  if (zone === 'Casco Histórico') {
    return (
      item.locationType === 'feria_puesto' ||
      item.locationType === 'ambos' ||
      haystack.includes('feria') ||
      haystack.includes('recova') ||
      haystack.includes('corrales') ||
      haystack.includes('lisandro')
    );
  }
  if (zone === 'Av. Alberdi') return haystack.includes('alberdi') || haystack.includes('murguiondo');
  if (zone === 'Polo Emilio Castro') return haystack.includes('castro');
  if (zone === 'Av. Eva Perón') return haystack.includes('eva peron');
  return false;
}

function isFeriaOpenAt(ts: number): boolean {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Buenos_Aires',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(new Date(ts));
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') map[part.type] = part.value;
  }
  if (map.weekday !== 'Sun') return false;
  const hour = Number(map.hour ?? 0);
  return hour >= 11 && hour < 19;
}

function BusinessDirectoryCard({ business, open }: { business: Business; open: boolean }) {
  const maps = mapsHref(`${business.address}, Mataderos, CABA`);

  return (
    <article className="flex h-full min-w-0 flex-col border border-carbon bg-pampa">
      <div className="flex items-center justify-between gap-2 border-b border-carbon/20 bg-carbon px-4 py-2 text-pampa">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider">
          Comercio · {business.zone}
        </span>
        <span
          className={`font-mono text-xs uppercase ${
            open ? 'font-semibold text-pampa' : 'text-pampa/70'
          }`}
        >
          {open ? '● Abierto ahora' : 'Cerrado ahora'}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-carbon/15">
        <Image
          src={business.heroImage}
          alt={`Foto de referencia junto a la ficha de ${business.name}.`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 bg-carbon/90 px-2.5 py-1 font-mono text-xs text-pampa"
        >
          Referencia
        </span>
        {business.hasSubdomain && (
          <span className="absolute bottom-0 right-0 z-10 bg-chicago px-3 py-1 font-mono text-xs font-semibold uppercase text-pampa">
            Web Oficial
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider text-chicago">
          <span>{business.category}</span>
          <span className="text-carbon/40" aria-hidden="true">
            ·
          </span>
          <span className="text-carbon/75">{business.yearsInNeighborhood}</span>
        </div>

        <h3 className="mt-1.5 font-serif text-2xl font-semibold leading-tight text-carbon">
          {business.hasSubdomain ? (
            <Link
              href={`/comercio/${business.slug}`}
              className="hover:text-chicago hover:underline hover:underline-offset-4"
            >
              {business.name}
            </Link>
          ) : (
            business.name
          )}
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-base font-medium leading-snug text-carbon">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.75} aria-hidden="true" />
          <span>{business.address}</span>
        </p>
        {business.nearCorner && (
          <p className="mt-1 font-mono text-xs text-carbon/70">{business.nearCorner}</p>
        )}

        <p className="mt-3 text-base leading-relaxed text-carbon/85">{business.description}</p>

        {business.hasSubdomain && (
          <p className="mt-3 border-t border-carbon/15 pt-2.5 font-mono text-xs text-chicago">
            Web oficial · {business.slug}.mataderos.ar
          </p>
        )}

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          {business.whatsapp ? (
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-3 text-sm font-semibold text-pampa color-field hover:bg-chicago-dark"
            >
              WhatsApp
              <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </a>
          ) : null}

          {business.hasSubdomain ? (
            <Link
              href={`/comercio/${business.slug}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-3 text-sm font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa"
            >
              Ver Web Oficial
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ) : (
            <a
              href={maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-3 text-sm font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa"
            >
              Cómo llegar
              <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function EmprendedorDirectoryCard({ item }: { item: Emprendedor }) {
  const waHref = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(
    `Hola ${item.displayName}, te encontré en el buscador de Mataderos.ar.`
  )}`;

  return (
    <article className="flex h-full min-w-0 flex-col border border-carbon bg-pampa">
      <div className="flex items-center justify-between gap-2 border-b border-carbon/20 bg-cuero px-4 py-2 text-pampa">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider">
          Emprendedor · {LOCATION_TYPE_LABELS[item.locationType]}
        </span>
        {item.isFounder && (
          <span className="font-mono text-xs font-semibold uppercase text-pampa">
            Fundador
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-carbon/15">
        <Image
          src={item.heroImage}
          alt={item.heroAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {item.isDemo && (
          <span className="absolute left-0 top-0 z-10 bg-carbon/90 px-2.5 py-1 font-mono text-xs text-pampa">
            Ficha de ejemplo
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider text-chicago">
          <span>Verificado por Mataderos.ar</span>
          <span className="text-carbon/40" aria-hidden="true">
            ·
          </span>
          <span className="text-carbon/80">{item.category}</span>
        </div>

        <h3 className="mt-1.5 font-serif text-2xl font-semibold leading-tight text-carbon">
          <Link
            href={`/emprendedores/${item.slug}`}
            className="hover:text-chicago hover:underline hover:underline-offset-4"
          >
            {item.displayName}
          </Link>
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-base font-medium leading-snug text-carbon">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cuero" strokeWidth={1.75} aria-hidden="true" />
          <span>
            {item.feriaName
              ? `${item.feriaName}${item.puestoLabel ? ` · ${item.puestoLabel}` : ''}`
              : item.address ?? item.zone}
          </span>
        </p>
        <p className="mt-1 font-mono text-xs text-carbon/70">{item.locationNote}</p>

        <p className="mt-3 text-base leading-relaxed text-carbon/85">{item.tagline}</p>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <Link
            href={`/emprendedores/${item.slug}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-3 text-sm font-semibold text-pampa color-field hover:bg-chicago-dark"
          >
            Ver ficha
            <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-3 text-sm font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa"
          >
            WhatsApp
            <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function DirectoryExplorer({
  businesses,
  emprendedores,
  initialQuery = '',
  initialKind = 'todos',
  initialZone = 'todas',
  initialCategory = '',
  initialOpenOnly = false
}: DirectoryExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const [kind, setKind] = useState<DirectoryKindFilter>(initialKind);
  const [category, setCategory] = useState<string | null>(initialCategory || null);
  const [zone, setZone] = useState<ZoneFilter>(initialZone);
  const [modality, setModality] = useState<ModalityFilter>('todas');
  const [openOnly, setOpenOnly] = useState(initialOpenOnly);
  const [sortBy, setSortBy] = useState<SortOption>('destacados');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q')?.trim();
    const tipoParam = params.get('tipo')?.trim().toLowerCase();
    const zonaParam = params.get('zona')?.trim();
    const rubroParam = params.get('rubro')?.trim();
    const abiertoParam = params.get('abierto')?.trim().toLowerCase();
    if (qParam) setQuery(qParam);
    if (tipoParam === 'comercios' || tipoParam === 'comercio') setKind('comercios');
    else if (tipoParam === 'emprendedores' || tipoParam === 'emprendedor' || tipoParam === 'feria') {
      setKind('emprendedores');
    }
    if (
      zonaParam === 'Av. Alberdi' ||
      zonaParam === 'Polo Emilio Castro' ||
      zonaParam === 'Casco Histórico' ||
      zonaParam === 'Av. Eva Perón'
    ) {
      setZone(zonaParam);
    }
    if (rubroParam) setCategory(rubroParam);
    if (abiertoParam === '1' || abiertoParam === 'true') setOpenOnly(true);
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);

  const openOfBusiness = (business: Business) =>
    now === null ? business.isOpenNow : isShopOpen(business, now);

  const openOfEmprendedor = (item: Emprendedor) => {
    if (now === null) return false;
    if (item.locationType === 'feria_puesto' || item.locationType === 'ambos') {
      return isFeriaOpenAt(now);
    }
    return false;
  };

  // Categorías disponibles según la pestaña activa
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    if (kind === 'todos' || kind === 'comercios') {
      for (const b of businesses) set.add(b.category);
    }
    if (kind === 'todos' || kind === 'emprendedores') {
      for (const e of emprendedores) set.add(e.category);
    }
    return Array.from(set);
  }, [businesses, emprendedores, kind]);

  useEffect(() => {
    if (category && !availableCategories.includes(category)) {
      setCategory(null);
    }
  }, [availableCategories, category]);

  // Filtrado de comercios y emprendedores antes del tab `kind` para mostrar contadores reales
  const filteredByCriteria = useMemo(() => {
    const q = normalizeText(query.trim());

    const matchingBusinesses = businesses.filter((b) => {
      if (category && b.category !== category) return false;
      if (zone !== 'todas' && b.zone !== zone) return false;
      if (modality === 'feria') return false;
      if (modality === 'web_oficial' && !b.hasSubdomain) return false;
      const isOpen = openOfBusiness(b);
      if (openOnly && !isOpen) return false;

      if (!q) return true;
      const serviceText = b.services.map((s) => `${s.title} ${s.description}`).join(' ');
      const haystack = normalizeText(
        `${b.name} ${b.category} ${b.zone} ${b.address} ${b.nearCorner} ${b.description} ${b.longDescription} ${b.tagline} ${serviceText}`
      );
      return haystack.includes(q);
    });

    const matchingEmprendedores = emprendedores.filter((e) => {
      if (category && e.category !== category) return false;
      if (!matchesEmprendedorZone(e, zone)) return false;
      if (modality === 'web_oficial') return false;
      if (
        modality === 'calle' &&
        e.locationType !== 'direccion' &&
        e.locationType !== 'ambos'
      ) {
        return false;
      }
      if (
        modality === 'feria' &&
        e.locationType !== 'feria_puesto' &&
        e.locationType !== 'ambos'
      ) {
        return false;
      }
      const isOpen = openOfEmprendedor(e);
      if (openOnly && !isOpen) return false;

      if (!q) return true;
      const haystack = normalizeText(
        `${e.displayName} ${e.category} ${e.tagline} ${e.offerText} ${e.feriaName ?? ''} ${e.puestoLabel ?? ''} ${e.address ?? ''} ${e.zone} ${e.locationNote}`
      );
      return haystack.includes(q);
    });

    return { matchingBusinesses, matchingEmprendedores };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businesses, emprendedores, query, category, zone, modality, openOnly, now]);

  const entries: UnifiedEntry[] = useMemo(() => {
    const list: UnifiedEntry[] = [];

    if (kind === 'todos' || kind === 'comercios') {
      for (const b of filteredByCriteria.matchingBusinesses) {
        list.push({
          kind: 'comercio',
          id: `comercio-${b.id}`,
          name: b.name,
          category: b.category,
          zone: b.zone,
          isOpen: openOfBusiness(b),
          isFeatured: b.hasSubdomain || b.featured,
          business: b
        });
      }
    }

    if (kind === 'todos' || kind === 'emprendedores') {
      for (const e of filteredByCriteria.matchingEmprendedores) {
        list.push({
          kind: 'emprendedor',
          id: `emprendedor-${e.slug}`,
          name: e.displayName,
          category: e.category,
          zone: e.zone,
          isOpen: openOfEmprendedor(e),
          isFeatured: e.isFounder,
          emprendedor: e
        });
      }
    }

    return list.sort((a, b) => {
      if (sortBy === 'abiertos') {
        if (a.isOpen !== b.isOpen) return Number(b.isOpen) - Number(a.isOpen);
        if (a.isFeatured !== b.isFeatured) return Number(b.isFeatured) - Number(a.isFeatured);
        return a.name.localeCompare(b.name, 'es');
      }
      if (sortBy === 'az') {
        return a.name.localeCompare(b.name, 'es');
      }
      if (sortBy === 'rubro') {
        return (
          a.category.localeCompare(b.category, 'es') || a.name.localeCompare(b.name, 'es')
        );
      }
      // Por defecto: 'destacados' (Web Oficial y Fundadores primero, luego alfabético)
      if (a.isFeatured !== b.isFeatured) return Number(b.isFeatured) - Number(a.isFeatured);
      return a.name.localeCompare(b.name, 'es');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredByCriteria, kind, sortBy, now]);

  const totalTodos =
    filteredByCriteria.matchingBusinesses.length +
    filteredByCriteria.matchingEmprendedores.length;
  const totalComercios = filteredByCriteria.matchingBusinesses.length;
  const totalEmprendedores = filteredByCriteria.matchingEmprendedores.length;

  const sheetFilterCount =
    (category !== null ? 1 : 0) + (zone !== 'todas' ? 1 : 0) + (modality !== 'todas' ? 1 : 0);

  const hasAnyFilter =
    query.trim().length > 0 ||
    kind !== 'todos' ||
    category !== null ||
    zone !== 'todas' ||
    modality !== 'todas' ||
    openOnly;

  const clearAll = () => {
    setQuery('');
    setKind('todos');
    setCategory(null);
    setZone('todas');
    setModality('todas');
    setOpenOnly(false);
    setSortBy('destacados');
  };

  const clearSheetFilters = () => {
    setCategory(null);
    setZone('todas');
    setModality('todas');
  };

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSheetOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    if (window.matchMedia('(max-width: 1023px)').matches) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [sheetOpen]);

  const chipClass = (selected: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-[4px] border px-3 text-sm font-semibold color-field ${
      selected
        ? 'border-carbon bg-carbon text-pampa'
        : 'border-carbon/35 bg-pampa-surface text-carbon hover:border-carbon'
    }`;

  const zoneLabel = ZONES.find((z) => z.value === zone)?.label ?? '';
  const modalityLabel = MODALITIES.find((m) => m.value === modality)?.label ?? '';

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];
  if (category) {
    activeChips.push({ key: 'rubro', label: category, onRemove: () => setCategory(null) });
  }
  if (zone !== 'todas') {
    activeChips.push({ key: 'zona', label: zoneLabel, onRemove: () => setZone('todas') });
  }
  if (modality !== 'todas') {
    activeChips.push({ key: 'modalidad', label: modalityLabel, onRemove: () => setModality('todas') });
  }

  const tabs: { id: DirectoryKindFilter; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: totalTodos },
    { id: 'comercios', label: 'Comercios', count: totalComercios },
    { id: 'emprendedores', label: 'Emprendedores', count: totalEmprendedores }
  ];

  return (
    <div>
      {/* Fila 1: buscador + botón de filtros */}
      <div className="flex items-stretch gap-2">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="directorio-input" className="sr-only">
            Buscar comercios y emprendimientos del barrio por nombre, rubro, producto o calle
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-carbon/60"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            id="directorio-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Comercio, rubro, producto o calle"
            className="min-h-[48px] w-full rounded-[4px] border border-carbon bg-pampa pl-11 pr-11 text-base text-carbon placeholder:text-carbon/55 focus:border-chicago focus:outline-none"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Borrar texto"
              className="absolute right-0.5 top-1/2 inline-flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center text-carbon/70 hover:text-carbon"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>

        <button
          id="directorio-filtros-btn"
          type="button"
          aria-expanded={sheetOpen}
          aria-controls="directorio-filtros"
          onClick={() => setSheetOpen((value) => !value)}
          className={`inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-[4px] border px-3.5 text-base font-semibold color-field ${
            sheetOpen || sheetFilterCount > 0
              ? 'border-carbon bg-carbon text-pampa'
              : 'border-carbon bg-pampa text-carbon hover:bg-carbon hover:text-pampa'
          }`}
        >
          <SlidersHorizontal className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          <span>Filtros</span>
          {sheetFilterCount > 0 && (
            <span className="font-mono text-sm leading-none text-pampa/90">{sheetFilterCount}</span>
          )}
        </button>
      </div>

      {/* Fila 2: tipo + abierto ahora (una sola línea, con scroll horizontal si no entra) */}
      <div className="mt-3 flex min-w-0 max-w-full items-center gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          aria-label="Tipo de resultado"
          className="inline-flex shrink-0 divide-x divide-carbon/30 overflow-hidden rounded-[4px] border border-carbon"
        >
          {tabs.map((tab) => {
            const selected = kind === tab.id;
            return (
              <button
                key={tab.id}
                id={`directorio-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setKind(tab.id)}
                className={`inline-flex min-h-[44px] items-center gap-1.5 px-3 text-sm font-semibold color-field ${
                  selected ? 'bg-carbon text-pampa' : 'bg-pampa text-carbon hover:bg-pampa-deep'
                }`}
              >
                {tab.label}
                <span className={`font-mono text-xs ${selected ? 'text-pampa/80' : 'text-carbon/60'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-pressed={openOnly}
          onClick={() => setOpenOnly((value) => !value)}
          className={`inline-flex min-h-[44px] shrink-0 items-center rounded-[4px] border px-3 text-sm font-semibold color-field ${
            openOnly
              ? 'border-chicago bg-chicago text-pampa'
              : 'border-carbon bg-pampa text-carbon hover:bg-pampa-deep'
          }`}
        >
          Abierto ahora
        </button>
      </div>

      {/* Filtros activos (solo ocupa lugar si hay alguno) */}
      {activeChips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Filtros activos">
          {activeChips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={chip.onRemove}
              aria-label={`Quitar filtro ${chip.label}`}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-[4px] border border-chicago bg-pampa-surface px-2.5 font-mono text-xs font-semibold text-chicago hover:bg-chicago hover:text-pampa color-field"
            >
              {chip.label}
              <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {/* Panel de filtros: bottom sheet en mobile, panel en línea en desktop */}
      {sheetOpen && (
        <>
          <div
            className="fixed inset-0 z-[65] bg-carbon/60 lg:hidden"
            aria-hidden="true"
            onClick={() => setSheetOpen(false)}
          />
          <div
            id="directorio-filtros"
            role="dialog"
            aria-label="Filtros del directorio"
            className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[85svh] flex-col border-t-2 border-carbon bg-pampa lg:static lg:z-auto lg:mt-3 lg:max-h-none lg:border lg:border-carbon/40"
          >
            <div className="flex items-center justify-between border-b border-carbon/20 px-4 py-2">
              <p className="font-display text-2xl font-semibold uppercase">Filtros</p>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Cerrar filtros"
                className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center"
              >
                <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <div className="grid gap-5 overflow-y-auto px-4 py-4 lg:grid-cols-3">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-carbon/75">Rubro</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por rubro">
                  <button
                    type="button"
                    aria-pressed={category === null}
                    onClick={() => setCategory(null)}
                    className={chipClass(category === null)}
                  >
                    Todos
                  </button>
                  {availableCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={category === cat}
                      onClick={() => setCategory(category === cat ? null : cat)}
                      className={chipClass(category === cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-carbon/75">Zona</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por zona">
                  {ZONES.map((z) => (
                    <button
                      key={z.value}
                      type="button"
                      aria-pressed={zone === z.value}
                      onClick={() => setZone(z.value)}
                      className={chipClass(zone === z.value)}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-carbon/75">Modalidad</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por modalidad">
                  {MODALITIES.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      aria-pressed={modality === m.value}
                      onClick={() => setModality(m.value)}
                      className={chipClass(modality === m.value)}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-carbon/20 bg-pampa px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={clearSheetFilters}
                disabled={sheetFilterCount === 0}
                className="inline-flex min-h-[48px] items-center px-2 font-semibold text-chicago underline underline-offset-4 disabled:text-carbon/40 disabled:no-underline"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-[4px] bg-chicago px-4 font-semibold text-pampa color-field hover:bg-chicago-dark"
              >
                Ver {entries.length} {entries.length === 1 ? 'resultado' : 'resultados'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Resultados + orden */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-carbon/20 pt-3">
        <p className="font-mono text-sm text-carbon/80" role="status" aria-live="polite">
          <span className="font-semibold text-carbon">{entries.length}</span>{' '}
          {entries.length === 1 ? 'resultado' : 'resultados'}
          {hasAnyFilter && (
            <>
              {' · '}
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex min-h-[40px] items-center font-semibold text-chicago underline underline-offset-4"
              >
                Limpiar todo
              </button>
            </>
          )}
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="directorio-orden"
            className="font-mono text-xs uppercase tracking-wider text-carbon/75"
          >
            Orden
          </label>
          <select
            id="directorio-orden"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="min-h-[44px] rounded-[4px] border border-carbon/40 bg-pampa px-2 font-mono text-sm font-medium text-carbon focus:border-chicago focus:outline-none"
          >
            <option value="destacados">Destacados</option>
            <option value="abiertos">Abiertos primero</option>
            <option value="az">A–Z</option>
            <option value="rubro">Por rubro</option>
          </select>
        </div>
      </div>

      {/* Grilla de resultados */}
      {entries.length === 0 ? (
        <div className="mt-5 border border-carbon bg-pampa p-6 sm:p-8" role="status">
          <p className="font-serif text-2xl font-semibold text-carbon">
            No encontramos nada con esos filtros
          </p>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-carbon/80">
            Probá con otra palabra, cambiá la zona o sacá el filtro &ldquo;Abierto ahora&rdquo;.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa color-field hover:bg-chicago-dark"
            >
              Ver todo el directorio
            </button>
            <Link
              href="/sumate"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold text-carbon color-field hover:bg-carbon hover:text-pampa"
            >
              ¿Tenés un comercio o puesto? Sumate gratis
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) =>
            entry.kind === 'comercio' ? (
              <BusinessDirectoryCard key={entry.id} business={entry.business} open={entry.isOpen} />
            ) : (
              <EmprendedorDirectoryCard key={entry.id} item={entry.emprendedor} />
            )
          )}
        </div>
      )}
    </div>
  );
}
