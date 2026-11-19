'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import {
  HERITAGE_MILESTONES,
  ZONES,
  type Article,
  type Business,
  type BusinessCategory,
  type NeighborhoodEvent,
  type NeighborhoodZone
} from '@/lib/data';

interface PortalClientProps {
  businesses: Business[];
  articles: Article[];
  events: NeighborhoodEvent[];
}

const CATEGORIES: Array<'Todos' | BusinessCategory> = [
  'Todos',
  'Mascotas',
  'Gastronomía',
  'Hogar y Ferretería',
  'Salud y Estética'
];

const CORRIDOR_FIELDS: Record<
  NeighborhoodZone,
  {
    bg: string;
    border: string;
    text: string;
    muted: string;
    darkSurface: boolean;
    aspect: string;
    accentStripe?: string;
    buttonClass: string;
  }
> = {
  'Polo Emilio Castro': {
    bg: 'bg-pampa',
    border: 'border-carbon/20',
    text: 'text-carbon',
    muted: 'text-carbon/75',
    darkSurface: false,
    aspect: 'aspect-[16/10]',
    buttonClass:
      'border border-carbon text-carbon hover:bg-carbon hover:text-pampa'
  },
  'Av. Alberdi': {
    bg: 'bg-pampa-deep',
    border: 'border-carbon/20',
    text: 'text-carbon',
    muted: 'text-carbon/75',
    darkSurface: false,
    aspect: 'aspect-[4/5]',
    accentStripe: 'border-t-4 border-t-celeste',
    buttonClass:
      'border border-carbon text-carbon hover:bg-carbon hover:text-pampa'
  },
  'Casco Histórico': {
    bg: 'bg-carbon',
    border: 'border-pampa/20',
    text: 'text-pampa',
    muted: 'text-pampa/80',
    darkSurface: true,
    aspect: 'aspect-[16/9]',
    buttonClass:
      'border border-pampa text-pampa hover:bg-pampa hover:text-carbon'
  },
  'Av. Eva Perón': {
    bg: 'bg-chicago',
    border: 'border-pampa/20',
    text: 'text-pampa',
    muted: 'text-pampa/85',
    darkSurface: true,
    aspect: 'aspect-[4/3]',
    buttonClass:
      'border border-pampa text-pampa hover:bg-pampa hover:text-chicago'
  }
};

function slugifyShopName(input: string): string {
  const cleaned = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  return cleaned || 'tunegocio';
}

export default function PortalClient({
  businesses,
  articles,
  events
}: PortalClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | BusinessCategory>('Todos');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<NeighborhoodZone | ''>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openOnly, setOpenOnly] = useState<boolean>(false);
  const [showAllBusinesses, setShowAllBusinesses] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [b2bShopInput, setB2bShopInput] = useState<string>('Veterinaria Flavio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [todayLabel, setTodayLabel] = useState<string>('Edición Mataderos');

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(new Date());
    setTodayLabel(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredBusinesses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return businesses.filter((biz) => {
      const matchCat = selectedCategory === 'Todos' || biz.category === selectedCategory;
      const matchZone = !selectedZoneFilter || biz.zone === selectedZoneFilter;
      const matchOpen = !openOnly || biz.isOpenNow;
      const matchQuery =
        !q ||
        biz.name.toLowerCase().includes(q) ||
        biz.category.toLowerCase().includes(q) ||
        biz.address.toLowerCase().includes(q) ||
        biz.zone.toLowerCase().includes(q) ||
        biz.description.toLowerCase().includes(q);
      return matchCat && matchZone && matchOpen && matchQuery;
    });
  }, [businesses, selectedCategory, selectedZoneFilter, openOnly, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'Todos' ||
    Boolean(selectedZoneFilter) ||
    Boolean(searchQuery.trim()) ||
    openOnly;

  const visibleBusinesses =
    hasActiveFilters || showAllBusinesses
      ? filteredBusinesses
      : filteredBusinesses.slice(0, 4);

  const resetFilters = () => {
    setSelectedCategory('Todos');
    setSelectedZoneFilter('');
    setSearchQuery('');
    setOpenOnly(false);
    setShowAllBusinesses(false);
  };

  const filterDirectoryByZone = (zone: NeighborhoodZone) => {
    setSelectedZoneFilter((prev) => (prev === zone ? '' : zone));
    document.getElementById('directorio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulatedSlug = slugifyShopName(b2bShopInput);
  const heroPhoto = ZONES[2]?.imageUrl ?? articles[0]?.imageUrl ?? '';
  const leadArticle = articles[0];
  const secondaryArticles = articles.slice(1);
  const heritagePhoto = ZONES[2]?.imageUrl ?? '';

  return (
    <div className="min-h-screen flex flex-col bg-pampa text-carbon">
      {/* =========================================================
          NAVEGACIÓN PRINCIPAL — VERDE CHICAGO #1E5631
         ========================================================= */}
      <header
        data-surface="dark"
        className="sticky top-0 z-40 bg-chicago text-pampa border-b border-pampa/20 color-field"
      >
        <div className="editorial-container flex items-center justify-between gap-4 min-h-[64px]">
          <a
            href="#inicio"
            className="min-h-[48px] py-1.5 flex items-center gap-3 font-display text-2xl sm:text-3xl tracking-tight font-semibold uppercase"
          >
            <Image
              src="/logo-emblem.png"
              alt="Emblema de Mataderos.ar"
              width={40}
              height={40}
              priority
              className="border border-pampa/40 shrink-0"
            />
            <span>Mataderos.ar</span>
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-6 text-[1rem] font-medium"
          >
            <a href="#corredores" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
              Corredores
            </a>
            <a href="#noticias" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
              Noticias
            </a>
            <a href="#directorio" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
              Guía de comercios
            </a>
            <a href="#agenda" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
              Agenda
            </a>
            <a href="#historia" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
              Historia
            </a>
            <a
              href="#sumar-comercio"
              className="min-h-[48px] flex items-center px-4 border border-pampa/50 hover:bg-pampa hover:text-chicago color-field font-semibold"
            >
              Sumá tu comercio
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden min-h-[48px] min-w-[48px] px-3 flex items-center justify-center border border-pampa/40 text-pampa"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Menú móvil"
            className="lg:hidden bg-chicago-dark border-t border-pampa/20 editorial-container divide-y divide-pampa/15"
          >
            <a
              href="#corredores"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-[1rem] font-medium"
            >
              Corredores del barrio
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="#noticias"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-[1rem] font-medium"
            >
              Noticias y aperturas
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="#directorio"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-[1rem] font-medium"
            >
              Guía de comercios
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="#agenda"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-[1rem] font-medium"
            >
              Agenda
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="#historia"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-[1rem] font-medium"
            >
              Historia
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a
              href="#sumar-comercio"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] flex items-center justify-between text-[1rem] font-semibold"
            >
              Sumá tu comercio
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">
        {/* =========================================================
            1. HERO — TAPA TIPOGRÁFICA A UN VIEWPORT (CARBÓN + CREMA)
           ========================================================= */}
        <section
          id="inicio"
          data-surface="dark"
          className="bg-carbon text-pampa grain-surface border-b border-pampa/20 min-h-[calc(100svh-65px)] flex flex-col justify-between"
        >
          <div className="editorial-container relative z-10 py-8 sm:py-12 flex-1 flex flex-col justify-between gap-8">
            {/* Línea de edición y filete celeste gráfico */}
            <div>
              <div className="h-[3px] w-24 bg-celeste mb-6" aria-hidden="true" />
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pampa/20 font-mono type-meta">
                <span>COMUNA 9 · CIUDAD DE BUENOS AIRES</span>
                <span>{todayLabel}</span>
              </div>
            </div>

            {/* Tapa monumental + fotografía única */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end my-auto">
              <div className="lg:col-span-7">
                <div className="mb-6 inline-block border border-pampa/30 p-1.5 bg-pampa">
                  <Image
                    src="/logo-emblem.png"
                    alt="Escudo de Mataderos — La Recova y El Torito"
                    width={92}
                    height={92}
                    priority
                    className="block"
                  />
                </div>
                <h1 className="font-display type-h1 font-semibold uppercase text-pampa mb-6">
                  MATADEROS
                </h1>
                <p className="type-body text-pampa/90 max-w-xl">
                  Comercios de cercanía, oficios del barrio, aperturas y memoria viva entre La Recova, Emilio Castro y Avenida Alberdi.
                </p>
              </div>

              <div className="lg:col-span-5">
                {heroPhoto && (
                  <figure className="border border-pampa/25">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={heroPhoto}
                        alt="La Recova y el casco histórico de Mataderos"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover opacity-100"
                      />
                    </div>
                    <figcaption className="px-4 py-3 border-t border-pampa/20 font-mono type-meta">
                      Av. de los Corrales y Lisandro de la Torre · Casco Histórico
                    </figcaption>
                  </figure>
                )}
              </div>
            </div>

            {/* Pie del viewport con filete y saltos directos */}
            <div className="pt-4 border-t border-pampa/20 flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono type-meta">
                Edición barrial independiente · Directorio y Web Oficial
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#directorio"
                  className="min-h-[48px] inline-flex items-center gap-2 px-5 bg-chicago text-pampa font-semibold text-[1rem] hover:bg-chicago-dark color-field"
                >
                  Explorar comercios
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a
                  href="#corredores"
                  className="min-h-[48px] inline-flex items-center gap-2 px-4 border border-pampa/35 text-pampa font-medium text-[1rem] hover:bg-pampa hover:text-carbon color-field"
                >
                  Recorrer los 4 corredores
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            2. LOS 4 CORREDORES — ÍNDICE STICKY + CAMPOS DE COLOR FIJOS
           ========================================================= */}
        <section id="corredores" className="border-b border-carbon/20 bg-pampa">
          <div className="editorial-container section-pad">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Índice tipográfico sticky */}
              <div className="lg:col-span-4 lg:sticky lg:top-24">
                <p className="font-mono type-meta mb-3">01 — 04 · GEOGRAFÍA LOCAL</p>
                <h2 className="font-display type-h2 font-semibold uppercase mb-4">
                  Los 4 Corredores del Barrio
                </h2>
                <p className="type-body text-carbon/80 mb-8">
                  Cada arteria de Mataderos tiene su propio pulso comercial y vecinal.
                </p>

                <nav aria-label="Índice de corredores" className="border-t border-carbon/20 divide-y divide-carbon/20">
                  {ZONES.map((zone, idx) => (
                    <a
                      key={zone.id}
                      href={`#corredor-${idx + 1}`}
                      className="min-h-[48px] py-3 flex items-center justify-between gap-3 hover:pl-2 transition-all duration-300"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-2xl font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="type-meta font-semibold">{zone.id}</span>
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                    </a>
                  ))}
                </nav>
              </div>

              {/* 4 campos de color fijos con proporciones distintas de fotografía */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {ZONES.map((zone, idx) => {
                  const field = CORRIDOR_FIELDS[zone.id];
                  const isFilteredHere = selectedZoneFilter === zone.id;
                  return (
                    <article
                      key={zone.id}
                      id={`corredor-${idx + 1}`}
                      data-surface={field.darkSurface ? 'dark' : 'light'}
                      className={`${field.bg} ${field.text} ${field.accentStripe ?? ''} border ${field.border} color-field p-6 sm:p-10`}
                    >
                      <div className={`flex flex-wrap items-baseline justify-between gap-2 pb-4 mb-6 border-b ${field.border}`}>
                        <span className="font-display text-3xl sm:text-4xl font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="font-mono type-meta">{zone.highlightMetric}</span>
                      </div>

                      <div className="grid md:grid-cols-12 gap-6 items-start">
                        <div className="md:col-span-6">
                          <div className={`relative ${field.aspect} w-full overflow-hidden border ${field.border}`}>
                            <Image
                              src={zone.imageUrl}
                              alt={zone.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 35vw"
                              className="object-cover opacity-100"
                            />
                          </div>
                        </div>

                        <div className="md:col-span-6 flex flex-col justify-between gap-5">
                          <div>
                            <p className={`font-mono type-meta mb-2 ${field.muted}`}>
                              {zone.subtitle}
                            </p>
                            <h3 className="font-display type-h2 font-semibold uppercase mb-4">
                              {zone.title}
                            </h3>
                            <p className={`type-body mb-5 ${field.muted}`}>
                              {zone.atmosphere}
                            </p>
                            <p className={`type-meta pb-4 border-b ${field.border}`}>
                              {zone.landmarks.join(' · ')}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => filterDirectoryByZone(zone.id)}
                            className={`min-h-[48px] px-5 inline-flex items-center justify-center gap-2 font-semibold text-[1rem] color-field self-start ${field.buttonClass}`}
                          >
                            {isFilteredHere
                              ? `Quitando filtro de ${zone.id}`
                              : `Ver comercios en ${zone.id}`}
                            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. NOTICIAS Y APERTURAS — NOTA A SANGRE + LISTA CON FILETES
           ========================================================= */}
        <section id="noticias" className="border-b border-carbon/20 bg-pampa">
          <div className="editorial-container section-pad">
            <div className="pb-6 mb-10 border-b border-carbon/20 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono type-meta mb-2">CRÓNICAS DEL BARRIO</p>
                <h2 className="font-display type-h2 font-semibold uppercase">
                  Noticias y Nuevas Aperturas
                </h2>
              </div>
              <p className="type-meta text-carbon/75">
                Hacé clic en cualquier nota para leerla completa
              </p>
            </div>

            {/* Nota principal sin caja (foto a sangre + título Fraunces) */}
            {leadArticle && (
              <article className="mb-12">
                <button
                  type="button"
                  onClick={() => setActiveArticle(leadArticle)}
                  className="w-full text-left group block"
                >
                  <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden mb-6">
                    <Image
                      src={leadArticle.imageUrl}
                      alt={leadArticle.title}
                      fill
                      sizes="100vw"
                      className="object-cover opacity-100"
                    />
                  </div>
                  <p className="font-mono type-meta text-carbon/75 mb-3">
                    {leadArticle.category} · {leadArticle.zone} · {leadArticle.publishedLabel} · Lectura {leadArticle.readTime}
                  </p>
                  <h3 className="font-serif type-h2 font-semibold text-carbon mb-4 group-hover:underline underline-offset-4">
                    {leadArticle.title}
                  </h3>
                  <p className="type-body text-carbon/80 max-w-3xl mb-5">
                    {leadArticle.excerpt}
                  </p>
                  <span className="min-h-[48px] inline-flex items-center gap-2 font-semibold text-[1rem] text-chicago underline underline-offset-4">
                    Leer crónica completa
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </button>
              </article>
            )}

            {/* Resto de notas en lista con filetes */}
            <div className="border-t border-carbon/20 divide-y divide-carbon/20">
              {secondaryArticles.map((article) => (
                <article key={article.id} className="py-8">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="w-full text-left grid md:grid-cols-12 gap-6 items-center group"
                  >
                    <div className="md:col-span-3">
                      <div className="relative aspect-[4/3] w-full overflow-hidden border border-carbon/20">
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover opacity-100"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      <p className="font-mono type-meta text-carbon/75 mb-2">
                        {article.category} · {article.zone} · {article.publishedLabel}
                      </p>
                      <h3 className="font-serif type-h3 font-medium text-carbon mb-2 group-hover:underline underline-offset-4">
                        {article.title}
                      </h3>
                      <p className="type-body text-carbon/80">{article.excerpt}</p>
                    </div>

                    <div className="md:col-span-2 flex md:justify-end">
                      <span className="min-h-[48px] inline-flex items-center gap-2 font-semibold text-[1rem] text-chicago">
                        Leer nota
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            4. GUÍA DE COMERCIOS — GRILLA CON FILETES DE 1PX
           ========================================================= */}
        <section id="directorio" className="border-b border-carbon/20 bg-pampa-surface">
          <div className="editorial-container section-pad">
            <div className="pb-6 mb-8 border-b border-carbon/20 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono type-meta mb-2">GUÍA COMERCIAL DE MATADEROS</p>
                <h2 className="font-display type-h2 font-semibold uppercase">
                  Comercios del Barrio
                </h2>
              </div>
              <p className="font-mono type-meta text-carbon/80">
                Mostrando {visibleBusinesses.length} de {filteredBusinesses.length}{' '}
                {filteredBusinesses.length === 1 ? 'comercio' : 'comercios'}
                {selectedZoneFilter ? ` · ${selectedZoneFilter}` : ''}
              </p>
            </div>

            {/* Índice por rubro + buscador editorial + filtro abiertos */}
            <div className="grid lg:grid-cols-12 gap-4 pb-8 mb-8 border-b border-carbon/20 items-stretch">
              <div className="lg:col-span-7 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`min-h-[48px] px-4 border text-[1rem] font-medium color-field ${
                        active
                          ? 'bg-carbon text-pampa border-carbon font-semibold'
                          : 'bg-transparent text-carbon border-carbon/25 hover:border-carbon'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
                <label className="sr-only" htmlFor="directory-search">
                  Buscar comercio o calle
                </label>
                <input
                  id="directory-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar comercio, rubro o calle..."
                  className="min-h-[48px] flex-1 px-4 bg-white border border-carbon/30 text-[1rem] text-carbon placeholder:text-carbon/50"
                />
                <button
                  type="button"
                  role="switch"
                  aria-checked={openOnly}
                  onClick={() => setOpenOnly((v) => !v)}
                  className={`min-h-[48px] px-4 border inline-flex items-center justify-center gap-2 text-[1rem] font-medium color-field shrink-0 ${
                    openOnly
                      ? 'bg-chicago text-pampa border-chicago font-semibold'
                      : 'bg-transparent text-carbon border-carbon/30 hover:border-carbon'
                  }`}
                >
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      openOnly ? 'bg-pampa' : 'bg-chicago'
                    }`}
                    aria-hidden="true"
                  />
                  Abierto ahora
                </button>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-carbon/20">
                <p className="type-meta text-carbon/80">
                  Filtros activos:{' '}
                  {[
                    selectedCategory !== 'Todos' ? selectedCategory : null,
                    selectedZoneFilter || null,
                    openOnly ? 'Abierto ahora' : null,
                    searchQuery.trim() ? `"${searchQuery.trim()}"` : null
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-[48px] px-4 border border-carbon/30 text-[1rem] font-semibold hover:bg-carbon hover:text-pampa color-field"
                >
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* Grilla con filetes de 1px */}
            {visibleBusinesses.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 border-t border-l border-carbon/20">
                  {visibleBusinesses.map((biz) => (
                    <article
                      key={biz.id}
                      className="border-r border-b border-carbon/20 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-pampa-surface"
                    >
                      <div>
                        <div className="relative aspect-[4/5] w-full overflow-hidden border border-carbon/20 mb-6">
                          <Image
                            src={biz.heroImage}
                            alt={`${biz.name} en ${biz.address}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover opacity-100"
                          />
                        </div>

                        <p className="type-meta text-carbon/80 mb-2">
                          {biz.isOpenNow && (
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-chicago mr-2 align-middle"
                              aria-hidden="true"
                            />
                          )}
                          {biz.category} · {biz.zone} · {biz.hoursSummary}
                        </p>

                        <h3 className="type-h3 font-semibold text-carbon mb-2">
                          {biz.name}
                        </h3>

                        <p className="type-meta text-carbon/75 mb-3">
                          {biz.address} · Mataderos
                        </p>

                        <p className="type-body text-carbon/85 mb-4">
                          {biz.description}
                        </p>

                        {biz.hasSubdomain && (
                          <p className="font-mono type-meta text-chicago pb-2">
                            Web Oficial · {biz.slug}.mataderos.ar
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-carbon/20 flex flex-wrap gap-3">
                        {Boolean(biz.whatsapp.trim()) && (
                          <a
                            href={`https://wa.me/${biz.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[48px] flex-1 px-4 bg-chicago hover:bg-chicago-dark text-pampa font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                          >
                            WhatsApp
                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                          </a>
                        )}

                        {biz.hasSubdomain ? (
                          <Link
                            href={`/comercio/${biz.slug}`}
                            className="min-h-[48px] flex-1 px-4 border border-carbon text-carbon hover:bg-carbon hover:text-pampa font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                          >
                            Ver Web Oficial
                            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                          </Link>
                        ) : (
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              `${biz.address}, Mataderos, Buenos Aires`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-h-[48px] flex-1 px-4 border border-carbon/35 text-carbon hover:border-carbon font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                          >
                            Ver mapa
                            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

                {!hasActiveFilters && filteredBusinesses.length > 4 && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowAllBusinesses((prev) => !prev)}
                      className="min-h-[48px] px-8 border border-carbon text-carbon hover:bg-carbon hover:text-pampa font-semibold text-[1rem] color-field"
                    >
                      {showAllBusinesses
                        ? 'Mostrar solo destacados'
                        : `Ver todos los comercios (${filteredBusinesses.length})`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="border border-carbon/25 p-10 text-center">
                <p className="type-body mb-6">
                  No encontramos comercios con esos filtros en Mataderos.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="min-h-[48px] px-6 bg-chicago text-pampa font-semibold text-[1rem]"
                >
                  Ver todos los comercios
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            5. AGENDA — FILAS TIPO CARTELERA CON FILETE CELESTE Y FECHA ENORME
           ========================================================= */}
        <section id="agenda" className="border-b border-carbon/20 bg-pampa">
          <div className="editorial-container section-pad">
            <div className="pb-6 mb-8 border-b border-carbon/20 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="h-[4px] w-20 bg-celeste mb-4" aria-hidden="true" />
                <p className="font-mono type-meta mb-2">CARTELERA CULTURAL Y FERIA</p>
                <h2 className="font-display type-h2 font-semibold uppercase">
                  Agenda de Mataderos
                </h2>
              </div>
              <p className="type-meta text-carbon/75">
                Feria de La Recova, Cine Teatro El Plata y peñas
              </p>
            </div>

            <div className="border-t border-carbon/20 divide-y divide-carbon/20">
              {events.map((ev, index) => (
                <div
                  key={ev.id}
                  className={`py-8 grid lg:grid-cols-12 gap-6 items-baseline ${
                    index === 0 ? 'bg-celeste/20 px-4 sm:px-6 border-l-4 border-l-celeste' : ''
                  }`}
                >
                  <div className="lg:col-span-4">
                    <p className="font-display type-h2 font-semibold uppercase text-carbon">
                      {ev.dateLabel}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="type-h3 font-semibold text-carbon mb-2">
                      {ev.title}
                    </h3>
                    <p className="type-body text-carbon/80">{ev.description}</p>
                  </div>

                  <div className="lg:col-span-3 lg:text-right font-mono type-meta text-carbon/85 space-y-1">
                    <p>{ev.timeLabel}</p>
                    <p>{ev.location}</p>
                    <p>{ev.category} · {ev.highlightTag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            6. HISTORIA — CAMPO CUERO / CREMA, FRAUNCES Y FOTO STICKY
           ========================================================= */}
        <section
          id="historia"
          data-surface="dark"
          className="bg-cuero text-pampa border-b border-carbon/20 color-field"
        >
          <div className="editorial-container section-pad">
            <div className="pb-6 mb-12 border-b border-pampa/25">
              <p className="font-mono type-meta mb-2">MEMORIA DEL BARRIO</p>
              <h2 className="font-serif type-h2 font-semibold text-pampa">
                De los Antiguos Corrales al Mataderos de Hoy
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Foto que acompaña el scroll */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                {heritagePhoto && (
                  <figure className="border border-pampa/30">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <Image
                        src={heritagePhoto}
                        alt="Casco Histórico y Feria de Mataderos"
                        fill
                        sizes="(max-width: 1024px) 100vw, 38vw"
                        className="object-cover opacity-100"
                      />
                    </div>
                    <figcaption className="px-4 py-3 border-t border-pampa/25 font-mono type-meta">
                      Antigua Administración y Recova · Monumento Histórico Nacional
                    </figcaption>
                  </figure>
                )}
              </div>

              {/* Hitos continuos con años grandes en Fraunces */}
              <div className="lg:col-span-7 divide-y divide-pampa/25 border-t border-b border-pampa/25">
                {HERITAGE_MILESTONES.map((m) => (
                  <article key={m.year} className="py-10">
                    <p className="font-serif type-h1 font-semibold text-pampa mb-3">
                      {m.year}
                    </p>
                    <h3 className="font-serif type-h3 font-semibold text-pampa mb-2">
                      {m.title}
                    </h3>
                    <p className="type-meta text-pampa/85 mb-4">{m.subtitle}</p>
                    <p className="type-body text-pampa/90">{m.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            7. SUMÁ TU COMERCIO — BLOQUE DE CONFIANZA SOBRE BLANCO
           ========================================================= */}
        <section id="sumar-comercio" className="bg-white text-carbon border-b border-carbon/20">
          <div className="editorial-container section-pad">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6">
                <p className="font-mono type-meta text-chicago mb-3">
                  PARA COMERCIANTES Y OFICIOS DE MATADEROS
                </p>
                <h2 className="font-display type-h2 font-semibold uppercase mb-5">
                  Sumá tu comercio al mapa del barrio
                </h2>
                <p className="type-body text-carbon/85 mb-5">
                  La ficha básica en esta guía es gratuita para cualquier local o profesional de la Comuna 9: dirección, horarios reales y botón directo a tu WhatsApp para que el vecino te encuentre caminando o desde casa.
                </p>
                <p className="type-body text-carbon/85">
                  Si querés dar un paso más sin pagar agencias ni dominios aparte, activamos tu <strong>Web Oficial</strong> dentro de Mataderos.ar con servicios, reseñas del barrio y lista para aparecer en Google.
                </p>
              </div>

              <div className="lg:col-span-6 border border-carbon/25 p-6 sm:p-8 bg-white">
                <label
                  htmlFor="b2b-slug-input"
                  className="block type-meta font-semibold text-carbon mb-3"
                >
                  Escribí el nombre de tu negocio para ver tu dirección Web Oficial:
                </label>
                <input
                  id="b2b-slug-input"
                  type="text"
                  value={b2bShopInput}
                  onChange={(e) => setB2bShopInput(e.target.value)}
                  placeholder="Ej. Veterinaria Flavio"
                  className="min-h-[48px] w-full px-4 bg-white border border-carbon/35 text-[1.125rem] text-carbon placeholder:text-carbon/45 mb-4"
                />

                <div className="px-4 py-3 border border-carbon/20 bg-pampa-surface font-mono type-meta text-carbon mb-6 break-all">
                  Web Oficial · {simulatedSlug}.mataderos.ar
                </div>

                {/* Único botón Ladrillo principal por pantalla sobre blanco */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/5491100000000?text=${encodeURIComponent(
                      `Hola! Quiero consultar por la ficha o Web Oficial (${simulatedSlug}.mataderos.ar) para mi comercio.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-ladrillo min-h-[48px] px-6 rounded-[4px] bg-ladrillo hover:bg-ladrillo-dark text-white font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                  >
                    Pedir Web Oficial por WhatsApp
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </a>

                  <Link
                    href="/comercio/veterinariaflavio"
                    className="min-h-[48px] px-5 border border-carbon text-carbon hover:bg-carbon hover:text-pampa font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                  >
                    Ver ejemplo real
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          8. FOOTER — FILETE SUPERIOR, LINKS, REDES, HECHO EN MATADEROS
         ========================================================= */}
      <footer
        data-surface="dark"
        className="bg-carbon text-pampa border-t border-pampa/20"
      >
        <div className="editorial-container py-12 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5 mb-4">
              <Image
                src="/logo-emblem.png"
                alt="Emblema de Mataderos.ar"
                width={52}
                height={52}
                className="border border-pampa/35 shrink-0"
              />
              <p className="font-display text-3xl font-semibold uppercase">
                Mataderos.ar
              </p>
            </div>
            <p className="type-body text-pampa/80 max-w-md">
              Portal comunitario y guía de comercios de Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono type-meta text-pampa/70 mb-3">SECCIONES Y EJEMPLOS</p>
            <div className="flex flex-col">
              <a href="#corredores" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
                Corredores del barrio
              </a>
              <a href="#directorio" className="min-h-[48px] flex items-center hover:underline underline-offset-4">
                Guía de comercios
              </a>
              <Link href="/comercio/veterinariaflavio" className="min-h-[48px] flex items-center font-mono text-[1rem] hover:underline underline-offset-4">
                Web Oficial · veterinariaflavio.mataderos.ar
              </Link>
              <Link href="/comercio/tostadorescastro" className="min-h-[48px] flex items-center font-mono text-[1rem] hover:underline underline-offset-4">
                Web Oficial · tostadorescastro.mataderos.ar
              </Link>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono type-meta text-pampa/70 mb-3">REDES Y CONTACTO</p>
            <div className="flex flex-col">
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] flex items-center gap-2 hover:underline underline-offset-4"
              >
                WhatsApp vecinal
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="#sumar-comercio"
                className="min-h-[48px] flex items-center gap-2 hover:underline underline-offset-4"
              >
                Sumar mi comercio
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="editorial-container py-5 border-t border-pampa/20 flex flex-wrap items-center justify-between gap-4 font-mono type-meta">
          <span>Hecho en Mataderos</span>
          <span>Comuna 9 · CABA</span>
        </div>
      </footer>

      {/* =========================================================
          MODAL EDITORIAL PARA LEER NOTAS COMPLETAS
         ========================================================= */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 bg-carbon/80 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-pampa-surface border border-carbon max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full border-b border-carbon/20">
              <Image
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                fill
                sizes="(max-width: 768px) 100vw, 680px"
                className="object-cover opacity-100"
              />
            </div>

            <div className="p-6 sm:p-10">
              <p className="font-mono type-meta text-carbon/75 mb-3">
                {activeArticle.category} · {activeArticle.zone} · {activeArticle.publishedLabel} · Lectura {activeArticle.readTime}
              </p>

              <h2
                id="article-modal-title"
                className="font-serif type-h2 font-semibold text-carbon mb-6"
              >
                {activeArticle.title}
              </h2>

              <div className="space-y-5 type-body text-carbon/90 mb-8">
                {activeArticle.content.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-carbon/20 flex flex-wrap items-center justify-between gap-3">
                {activeArticle.mentionedBusinessSlug ? (
                  <Link
                    href={`/comercio/${activeArticle.mentionedBusinessSlug}`}
                    className="min-h-[48px] px-5 bg-chicago hover:bg-chicago-dark text-pampa font-semibold text-[1rem] inline-flex items-center gap-2 color-field"
                  >
                    Web Oficial · {activeArticle.mentionedBusinessSlug}.mataderos.ar
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </Link>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="min-h-[48px] px-5 border border-carbon text-carbon hover:bg-carbon hover:text-pampa font-semibold text-[1rem] color-field"
                >
                  Cerrar nota
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
