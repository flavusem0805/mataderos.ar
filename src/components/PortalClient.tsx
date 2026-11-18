'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  Flame,
  Globe,
  MapPin,
  Menu,
  MessageCircle,
  Newspaper,
  Search,
  Sparkles,
  Store,
  Sun,
  X
} from 'lucide-react';
import {
  HERITAGE_MILESTONES,
  TICKER_ITEMS,
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
  const subdomainShowcase = useMemo(
    () => businesses.filter((b) => b.hasSubdomain),
    [businesses]
  );

  const [activeShowcaseSlug, setActiveShowcaseSlug] = useState<string>(
    subdomainShowcase[0]?.slug ?? 'veterinariaflavio'
  );
  const [activeZoneId, setActiveZoneId] = useState<NeighborhoodZone>('Polo Emilio Castro');
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | BusinessCategory>('Todos');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<NeighborhoodZone | ''>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openOnly, setOpenOnly] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(0);
  const [b2bShopInput, setB2bShopInput] = useState<string>('Veterinaria Flavio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [todayLabel, setTodayLabel] = useState<string>('Mataderos hoy');

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

  const currentShowcase =
    subdomainShowcase.find((b) => b.slug === activeShowcaseSlug) ?? subdomainShowcase[0];

  const currentZone = ZONES.find((z) => z.id === activeZoneId) ?? ZONES[0];

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

  const resetFilters = () => {
    setSelectedCategory('Todos');
    setSelectedZoneFilter('');
    setSearchQuery('');
    setOpenOnly(false);
  };

  const jumpToDirectoryWithZone = (zone: NeighborhoodZone) => {
    setSelectedZoneFilter((prev) => (prev === zone ? '' : zone));
    document.getElementById('directorio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulatedSlug = slugifyShopName(b2bShopInput);

  return (
    <div className="min-h-screen flex flex-col bg-pampa-texture text-carbon">
      {/* =========================================================
          1. TOPBAR CARBÓN CON TICKER ANIMADO EN VIVO
         ========================================================= */}
      <div className="bg-carbon text-pampa text-xs border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 shrink-0 bg-ladrillo text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            Mataderos Hoy
          </span>

          <div className="marquee-wrapper flex-1 overflow-hidden">
            <div className="marquee-track gap-10">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 text-pampa/90 whitespace-nowrap">
                  <span className="text-celeste">◆</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0 text-pampa/80 font-semibold">
            <Sun className="w-3.5 h-3.5 text-celeste" />
            <span>Comuna 9 · {todayLabel}</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. HEADER STICKY VERDE CHICAGO
         ========================================================= */}
      <header className="sticky top-0 z-40 bg-chicago/95 backdrop-blur-md text-white border-b border-chicago-dark shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 group">
            <span className="w-10 h-10 rounded-lg bg-ladrillo group-hover:bg-ladrillo-dark transition-colors flex items-center justify-center font-extrabold text-xl text-white shadow-sm">
              M
            </span>
            <span className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight leading-none">
                Mataderos<span className="text-pampa">.ar</span>
              </span>
              <span className="text-[11px] font-semibold text-white/75 mt-0.5">
                Comunidad, Cultura &amp; Comercios
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-white/85">
            <a href="#rincones" className="hover:text-white transition-colors">
              Zonas
            </a>
            <a href="#noticias" className="hover:text-white transition-colors">
              Aperturas
            </a>
            <a href="#directorio" className="hover:text-white transition-colors">
              Guía Comercial
            </a>
            <a href="#feria-cultura" className="hover:text-white transition-colors">
              Feria y Cultura
            </a>
            <a href="#historia" className="hover:text-white transition-colors">
              Historia
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/comercio/veterinariaflavio"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border border-white/25 text-white hover:bg-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-celeste" />
              Ejemplo Subdominio
            </Link>
            <a
              href="#sumar-comercio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold bg-ladrillo hover:bg-ladrillo-dark text-white shadow-sm transition-all hover:-translate-y-0.5"
            >
              Sumá tu comercio
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-white/20 text-white hover:bg-white/10"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-chicago-dark border-t border-white/10 px-4 py-4 flex flex-col gap-3 text-sm font-semibold">
            <a href="#rincones" onClick={() => setMobileMenuOpen(false)}>
              Zonas de Mataderos
            </a>
            <a href="#noticias" onClick={() => setMobileMenuOpen(false)}>
              Noticias y Aperturas
            </a>
            <a href="#directorio" onClick={() => setMobileMenuOpen(false)}>
              Guía de Comercios
            </a>
            <a href="#feria-cultura" onClick={() => setMobileMenuOpen(false)}>
              Feria y Cultura
            </a>
            <a href="#historia" onClick={() => setMobileMenuOpen(false)}>
              Raíces e Historia
            </a>
            <Link
              href="/comercio/veterinariaflavio"
              className="text-celeste flex items-center gap-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Globe className="w-4 h-4" />
              Ver ejemplo: veterinariaflavio.mataderos.ar
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* =========================================================
            3. HERO CON BUSCADOR Y SHOWCASE FLOTANTE DE SUBDOMINIOS
           ========================================================= */}
        <section className="border-b border-pampa-border/80 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chicago/10 border border-chicago/20 text-chicago text-xs font-extrabold mb-5">
                <Sparkles className="w-3.5 h-3.5 text-ladrillo" />
                Portal comunitario y vidriera digital · Comuna 9
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-carbon leading-[1.08] mb-4">
                El pulso de Mataderos,{' '}
                <span className="text-chicago underline decoration-ladrillo/70 decoration-4 underline-offset-4">
                  en un solo lugar
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-carbon/75 max-w-2xl mb-7 leading-relaxed">
                Descubrí qué abrió nuevo en el barrio, enterate de la agenda de La Recova y conectá directo con los comercios de Mataderos que ya tienen su propia web.
              </p>

              {/* Buscador en vivo */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById('directorio')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col sm:flex-row gap-2.5 bg-pampa-surface p-2 rounded-xl border-2 border-pampa-border shadow-md mb-5 focus-within:border-chicago transition-colors"
              >
                <div className="flex items-center gap-2.5 flex-1 px-2">
                  <Search className="w-5 h-5 text-cuero shrink-0" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscá veterinarias, cafés, ferreterías o calles (ej. Alberdi)..."
                    className="w-full bg-transparent text-sm sm:text-base text-carbon placeholder:text-carbon/45 outline-none py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-ladrillo hover:bg-ladrillo-dark text-white font-bold text-sm transition-all shrink-0 shadow-sm"
                >
                  Buscar en el barrio
                </button>
              </form>

              {/* Accesos rápidos de zonas */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-cuero mr-1">
                  Zonas rápidas:
                </span>
                {ZONES.map((z) => {
                  const active = selectedZoneFilter === z.id;
                  return (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => jumpToDirectoryWithZone(z.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        active
                          ? 'bg-chicago text-white border-chicago shadow-sm'
                          : 'bg-pampa-surface text-carbon/80 border-pampa-border hover:border-cuero hover:text-carbon'
                      }`}
                    >
                      {z.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tarjeta Flotante Interactiva de Subdominios */}
            <div className="lg:col-span-5">
              <div className="animate-float-gentle bg-pampa-deep/90 border border-pampa-border rounded-2xl p-4 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-ladrillo flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    Subdominios activos del barrio
                  </span>
                  <span className="text-[11px] font-bold text-carbon/60">
                    Clic para cambiar preview
                  </span>
                </div>

                {/* Selector de comercios con subdominio */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {subdomainShowcase.map((shop) => {
                    const selected = shop.slug === currentShowcase?.slug;
                    return (
                      <button
                        key={shop.slug}
                        type="button"
                        onClick={() => setActiveShowcaseSlug(shop.slug)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                          selected
                            ? 'bg-chicago text-white shadow-sm'
                            : 'bg-pampa-surface text-carbon/75 hover:text-carbon border border-pampa-border'
                        }`}
                      >
                        {shop.emoji} {shop.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                {/* Mini navegador del comercio seleccionado */}
                {currentShowcase && (
                  <div className="bg-pampa-surface border border-pampa-border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-carbon text-pampa px-3 py-2 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-ladrillo" />
                        <span className="w-2 h-2 rounded-full bg-celeste" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <span className="font-mono text-white/90 truncate">
                        https://<strong>{currentShowcase.slug}</strong>.mataderos.ar
                      </span>
                    </div>

                    <div className="relative h-36 overflow-hidden bg-pampa-deep">
                      <img
                        src={currentShowcase.heroImage}
                        alt={currentShowcase.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold inline-flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        {currentShowcase.hoursSummary}
                      </span>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div>
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-ladrillo">
                            {currentShowcase.category} · {currentShowcase.zone}
                          </span>
                          <h2 className="text-lg font-extrabold text-carbon">
                            {currentShowcase.name}
                          </h2>
                        </div>
                      </div>
                      <p className="text-xs text-carbon/70 mb-4 line-clamp-2">
                        {currentShowcase.tagline}
                      </p>

                      <div className="flex gap-2">
                        <Link
                          href={`/comercio/${currentShowcase.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-ladrillo hover:bg-ladrillo-dark text-white text-xs font-extrabold transition-colors shadow-sm"
                        >
                          Abrir web completa
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. EXPLORADOR DE ZONAS: LOS 4 RINCONES DE MATADEROS
           ========================================================= */}
        <section id="rincones" className="py-14 bg-pampa-deep/55 border-b border-pampa-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-ladrillo mb-1.5">
                  <Compass className="w-3.5 h-3.5" />
                  Mapa vivo del barrio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-carbon">
                  Los 4 rincones de Mataderos
                </h2>
              </div>
              <p className="text-sm text-carbon/70 max-w-md">
                Elegí un corredor para ver qué lo identifica, sus puntos emblemáticos y qué comercios podés encontrar hoy ahí.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 flex flex-col gap-2.5">
                {ZONES.map((zone) => {
                  const isActive = zone.id === currentZone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setActiveZoneId(zone.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-chicago text-white border-chicago shadow-md translate-x-1'
                          : 'bg-pampa-surface text-carbon border-pampa-border hover:border-cuero'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-base">{zone.title}</span>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isActive ? 'translate-x-0.5 text-pampa' : 'text-carbon/40'
                          }`}
                        />
                      </div>
                      <p
                        className={`text-xs mt-1 font-medium ${
                          isActive ? 'text-white/80' : 'text-carbon/65'
                        }`}
                      >
                        {zone.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 bg-pampa-surface border border-pampa-border rounded-2xl overflow-hidden shadow-sm grid sm:grid-cols-2">
                <div className="relative min-h-[220px] bg-carbon">
                  <img
                    src={currentZone.imageUrl}
                    alt={currentZone.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-carbon/85 text-pampa text-xs font-bold backdrop-blur-sm">
                    {currentZone.highlightMetric}
                  </span>
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-cuero">
                      {currentZone.id}
                    </span>
                    <h3 className="text-xl font-extrabold text-carbon mt-1 mb-2.5">
                      {currentZone.title}
                    </h3>
                    <p className="text-sm text-carbon/75 leading-relaxed mb-4">
                      {currentZone.atmosphere}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {currentZone.landmarks.map((lm) => (
                        <span
                          key={lm}
                          className="px-2.5 py-1 rounded-md bg-pampa text-carbon text-xs font-bold border border-pampa-border"
                        >
                          📍 {lm}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => jumpToDirectoryWithZone(currentZone.id)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-ladrillo hover:bg-ladrillo-dark text-white text-sm font-bold transition-colors"
                  >
                    Ver comercios en {currentZone.id}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            5. NOTICIAS Y NUEVAS APERTURAS (CON MODAL EDITORIAL)
           ========================================================= */}
        <section id="noticias" className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-ladrillo mb-1.5">
                  <Newspaper className="w-3.5 h-3.5" />
                  Actualidad barrial
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-carbon">
                  Nuevas Aperturas y Crónicas de Mataderos
                </h2>
              </div>
              <span className="text-xs font-bold text-cuero">
                Hacé clic en cualquier nota para leerla completa
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              {articles[0] && (
                <article
                  onClick={() => setActiveArticle(articles[0])}
                  className="lg:col-span-7 group cursor-pointer bg-pampa-surface border border-pampa-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={articles[0].imageUrl}
                      alt={articles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ladrillo text-white text-xs font-extrabold shadow">
                      {articles[0].category}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-cuero mb-2">
                        <span>{articles[0].zone}</span>
                        <span>·</span>
                        <span>{articles[0].publishedLabel}</span>
                        <span>·</span>
                        <span>Lectura {articles[0].readTime}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-carbon group-hover:text-chicago transition-colors mb-3">
                        {articles[0].title}
                      </h3>
                      <p className="text-sm text-carbon/75 leading-relaxed mb-4">
                        {articles[0].excerpt}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-ladrillo">
                      Leer crónica completa
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </article>
              )}

              <div className="lg:col-span-5 flex flex-col gap-5">
                {articles.slice(1).map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="group cursor-pointer bg-pampa-surface border border-pampa-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 grid sm:grid-cols-12 flex-1"
                  >
                    <div className="sm:col-span-5 relative min-h-[160px] overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow ${
                          article.category === 'Agenda Cultural'
                            ? 'bg-celeste text-carbon'
                            : 'bg-carbon text-pampa'
                        }`}
                      >
                        {article.category}
                      </span>
                    </div>
                    <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-bold text-cuero mb-1.5">
                          {article.zone} · {article.publishedLabel}
                        </div>
                        <h3 className="text-base font-extrabold text-carbon group-hover:text-chicago transition-colors mb-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-carbon/70 line-clamp-2">{article.excerpt}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-ladrillo mt-3">
                        Leer nota <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            6. GUÍA DE COMERCIOS INTERACTIVA
           ========================================================= */}
        <section id="directorio" className="py-16 bg-pampa-deep/65 border-y border-pampa-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-chicago mb-1.5">
                  <Store className="w-3.5 h-3.5" />
                  Directorio comercial
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-carbon">
                  Guía de Comercios de Mataderos
                </h2>
              </div>
              <div className="text-sm font-bold text-cuero">
                Mostrando {filteredBusinesses.length}{' '}
                {filteredBusinesses.length === 1 ? 'comercio' : 'comercios'}
                {selectedZoneFilter ? ` en ${selectedZoneFilter}` : ''}
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all ${
                        active
                          ? 'bg-ladrillo text-white border-ladrillo shadow-sm'
                          : 'bg-pampa-surface text-carbon/80 border-pampa-border hover:border-carbon'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={openOnly}
                    onClick={() => setOpenOnly((v) => !v)}
                    className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
                      openOnly ? 'bg-chicago' : 'bg-pampa-border'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        openOnly ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-sm font-bold text-carbon">Solo abiertos ahora</span>
                </label>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-extrabold text-ladrillo underline hover:text-ladrillo-dark"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Grilla */}
            {filteredBusinesses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((biz) => (
                  <article
                    key={biz.id}
                    className={`group bg-pampa-surface rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col ${
                      biz.hasSubdomain
                        ? 'border-ladrillo/70 shadow-md'
                        : 'border-pampa-border shadow-sm'
                    }`}
                  >
                    <div className="relative h-44 overflow-hidden bg-pampa-deep">
                      <img
                        src={biz.heroImage}
                        alt={biz.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {biz.hasSubdomain && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-ladrillo text-white text-[11px] font-extrabold shadow flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Web Oficial
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-carbon/80 text-pampa text-[11px] font-bold backdrop-blur-sm">
                        {biz.zone}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-ladrillo">
                          {biz.category}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            biz.isOpenNow
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {biz.isOpenNow && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                          )}
                          {biz.hoursSummary}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-carbon mb-1">{biz.name}</h3>
                      <p className="text-xs font-bold text-cuero flex items-center gap-1 mb-2.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {biz.address}
                      </p>
                      <p className="text-sm text-carbon/75 mb-5 flex-1">{biz.description}</p>

                      <div className="pt-3.5 border-t border-pampa-border flex gap-2">
                        <a
                          href={`https://wa.me/${biz.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-pampa-border hover:border-chicago text-carbon text-xs font-bold transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-chicago" />
                          WhatsApp
                        </a>

                        {biz.hasSubdomain ? (
                          <Link
                            href={`/comercio/${biz.slug}`}
                            className="flex-[1.35] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ladrillo hover:bg-ladrillo-dark text-white text-xs font-extrabold transition-colors shadow-sm"
                          >
                            Ver {biz.slug}.mataderos.ar
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        ) : (
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              `${biz.address}, Mataderos, Buenos Aires`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-chicago/10 hover:bg-chicago text-chicago hover:text-white text-xs font-bold transition-colors"
                          >
                            Ver mapa
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-pampa-surface border-2 border-dashed border-pampa-border rounded-2xl p-10 text-center">
                <p className="text-carbon/75 font-semibold mb-4">
                  No encontramos comercios con esos filtros en Mataderos.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-lg bg-ladrillo text-white text-sm font-bold"
                >
                  Ver toda la guía del barrio
                </button>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================
            7. ACTIVIDADES, FERIA DE MATADEROS Y CULTURA
               (Acentos Ladrillo #B5502D + Celeste #6FA8DC)
           ========================================================= */}
        <section id="feria-cultura" className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-celeste-soft text-carbon text-xs font-extrabold mb-2">
                  <Calendar className="w-3.5 h-3.5 text-ladrillo" />
                  Feria de Mataderos &amp; Agenda Comuna 9
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-carbon">
                  Actividades, Música y Encuentro Vecinal
                </h2>
              </div>
              <p className="text-sm text-carbon/70 max-w-md">
                Lo que mueve a las familias todos los fines de semana entre La Recova, el Cine Teatro El Plata y los clubes del barrio.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {events.map((ev) => (
                <article
                  key={ev.id}
                  className="bg-pampa-surface border border-pampa-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-ladrillo via-celeste to-chicago" />
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                      <span className="px-2.5 py-1 rounded-full bg-celeste text-carbon text-[11px] font-extrabold">
                        {ev.category}
                      </span>
                      <span className="text-[11px] font-extrabold text-ladrillo uppercase tracking-wider">
                        {ev.highlightTag}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-carbon mb-2">{ev.title}</h3>
                    <p className="text-sm text-carbon/75 leading-relaxed mb-5">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-pampa-border space-y-1.5 text-xs font-bold text-carbon/80">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-ladrillo shrink-0" />
                      <span>
                        {ev.dateLabel} · {ev.timeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-chicago shrink-0" />
                      <span>{ev.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            8. RAÍCES Y TRADICIÓN: EL ALMA GAUCHA (Tonos Cuero y Crema)
           ========================================================= */}
        <section
          id="historia"
          className="py-16 bg-cuero text-pampa border-y border-cuero-dark relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-9">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pampa/15 text-pampa text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Flame className="w-3.5 h-3.5 text-pampa" />
                  Historia y Tradición
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  De los Antiguos Corrales al Mataderos de Hoy
                </h2>
              </div>
              <p className="text-sm text-pampa/85 max-w-md">
                Nuestra identidad nace donde se abrazan la pampa, la industria del trabajo y el orgullo de barrio.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-5 flex flex-col gap-3">
                {HERITAGE_MILESTONES.map((m, idx) => {
                  const active = idx === activeMilestoneIdx;
                  return (
                    <button
                      key={m.year}
                      type="button"
                      onClick={() => setActiveMilestoneIdx(idx)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        active
                          ? 'bg-pampa text-carbon border-pampa shadow-lg'
                          : 'bg-cuero-dark/55 text-pampa border-white/15 hover:bg-cuero-dark'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-extrabold uppercase tracking-wider ${
                            active ? 'text-ladrillo' : 'text-pampa/75'
                          }`}
                        >
                          {m.year}
                        </span>
                        <span className="text-lg">{m.symbol}</span>
                      </div>
                      <h3 className="text-base font-extrabold mt-1">{m.title}</h3>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7 bg-pampa text-carbon rounded-2xl p-7 sm:p-9 shadow-xl flex flex-col justify-between">
                {HERITAGE_MILESTONES[activeMilestoneIdx] && (
                  <div key={activeMilestoneIdx} className="animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cuero/15 text-cuero text-xs font-extrabold mb-3">
                      <span>{HERITAGE_MILESTONES[activeMilestoneIdx].symbol}</span>
                      <span>{HERITAGE_MILESTONES[activeMilestoneIdx].year}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-carbon mb-2">
                      {HERITAGE_MILESTONES[activeMilestoneIdx].title}
                    </h3>
                    <p className="text-sm font-bold text-ladrillo mb-4">
                      {HERITAGE_MILESTONES[activeMilestoneIdx].subtitle}
                    </p>
                    <p className="text-base text-carbon/80 leading-relaxed mb-6">
                      {HERITAGE_MILESTONES[activeMilestoneIdx].description}
                    </p>
                  </div>
                )}

                <div className="pt-5 border-t border-pampa-border flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-cuero">
                  <span>🏛️ Antigua Administración y Recova: Monumento Histórico Nacional</span>
                  <button
                    type="button"
                    onClick={() => jumpToDirectoryWithZone('Casco Histórico')}
                    className="text-ladrillo font-extrabold hover:underline"
                  >
                    Explorar comercios del Casco Histórico →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            9. SIMULADOR B2B EN VIVO: SUMÁ TU COMERCIO Y SUBDOMINIO
           ========================================================= */}
        <section id="sumar-comercio" className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-pampa-surface border-2 border-pampa-border rounded-3xl p-6 sm:p-10 shadow-lg">
              <div className="grid lg:grid-cols-12 gap-8 items-center mb-10">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-chicago mb-2">
                    <Globe className="w-4 h-4 text-ladrillo" />
                    Presencia digital accesible para Mataderos
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-carbon mb-3">
                    Tu comercio con web propia en el dominio del barrio
                  </h2>
                  <p className="text-sm sm:text-base text-carbon/75 leading-relaxed">
                    Probá acá cómo quedaría la dirección web de tu negocio. Sin contratar programadores, sin comprar dominio aparte y listo para aparecer cuando un vecino busca en Google.
                  </p>
                </div>

                {/* Simulador interactivo de subdominio */}
                <div className="lg:col-span-5 bg-pampa p-5 rounded-2xl border border-pampa-border">
                  <label
                    htmlFor="b2b-slug-input"
                    className="block text-xs font-extrabold uppercase tracking-wider text-cuero mb-2"
                  >
                    Escribí el nombre de tu local:
                  </label>
                  <input
                    id="b2b-slug-input"
                    type="text"
                    value={b2bShopInput}
                    onChange={(e) => setB2bShopInput(e.target.value)}
                    placeholder="Ej. Panadería Don José"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-pampa-border text-sm font-bold text-carbon outline-none focus:border-chicago mb-3"
                  />
                  <div className="bg-carbon text-pampa px-3.5 py-2.5 rounded-lg font-mono text-xs sm:text-sm flex items-center justify-between gap-2">
                    <span className="truncate">
                      https://<strong className="text-celeste">{simulatedSlug}</strong>.mataderos.ar
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Plan Gratis */}
                <div className="bg-pampa/60 border border-pampa-border rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-pampa-deep text-carbon text-xs font-extrabold mb-3">
                      Para empezar hoy
                    </span>
                    <h3 className="text-xl font-extrabold text-carbon mb-1">
                      Ficha en la Guía Barrial
                    </h3>
                    <div className="text-3xl font-extrabold text-carbon mb-4">
                      $0 <span className="text-sm font-semibold text-carbon/60">/ mes</span>
                    </div>
                    <ul className="space-y-2.5 text-sm text-carbon/80 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-chicago shrink-0" />
                        Presencia permanente en el directorio de Mataderos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-chicago shrink-0" />
                        Dirección, rubro, horarios y mapa de ubicación
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-chicago shrink-0" />
                        Botón directo a tu WhatsApp
                      </li>
                    </ul>
                  </div>
                  <a
                    href={`https://wa.me/5491100000000?text=${encodeURIComponent(
                      `Hola! Quiero cargar la ficha gratuita de "${b2bShopInput || 'mi comercio'}" en Mataderos.ar`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-chicago text-chicago hover:bg-chicago hover:text-white font-extrabold text-sm transition-colors"
                  >
                    Solicitar ficha gratuita por WhatsApp
                  </a>
                </div>

                {/* Plan Subdominio */}
                <div className="bg-white border-2 border-ladrillo rounded-2xl p-6 shadow-md flex flex-col justify-between relative">
                  <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-ladrillo text-white text-xs font-extrabold shadow">
                    Más elegido por comercios
                  </span>
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-ladrillo/10 text-ladrillo text-xs font-extrabold mb-3">
                      Presencia Digital Completa
                    </span>
                    <h3 className="text-xl font-extrabold text-carbon mb-1">
                      Web Propia + Subdominio
                    </h3>
                    <div className="text-3xl font-extrabold text-carbon mb-4">
                      Bajo abono{' '}
                      <span className="text-sm font-semibold text-carbon/60">/ mensual accesible</span>
                    </div>
                    <ul className="space-y-2.5 text-sm text-carbon/80 mb-6">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-ladrillo shrink-0" />
                        <span>
                          Subdominio propio:{' '}
                          <code className="px-1.5 py-0.5 rounded bg-pampa font-bold text-carbon">
                            {simulatedSlug}.mataderos.ar
                          </code>
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-ladrillo shrink-0" />
                        Landing optimizada para celular, Google y turnos por WhatsApp
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-ladrillo shrink-0" />
                        Nota de bienvenida en portada y badge &ldquo;Web Oficial&rdquo;
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-ladrillo shrink-0" />
                        Servicios, horarios en vivo y reseñas de vecinos
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <Link
                      href="/comercio/veterinariaflavio"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-ladrillo hover:bg-ladrillo-dark text-white font-extrabold text-sm transition-colors shadow-sm"
                    >
                      Ver ejemplo real
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={`https://wa.me/5491100000000?text=${encodeURIComponent(
                        `Hola! Quiero activar la web ${simulatedSlug}.mataderos.ar para mi negocio.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-chicago hover:bg-chicago-dark text-white font-extrabold text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Consultar plan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
         ========================================================= */}
      <footer className="bg-carbon text-pampa border-t border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xl font-extrabold tracking-tight">
              Mataderos<span className="text-ladrillo">.ar</span>
            </div>
            <p className="text-xs text-pampa/70 mt-1 max-w-md">
              Portal barrial independiente y plataforma de presencia digital para comercios de Mataderos, Comuna 9, Ciudad Autónoma de Buenos Aires.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs font-bold text-pampa/80">
            <a href="#noticias" className="hover:text-white">
              Aperturas
            </a>
            <a href="#directorio" className="hover:text-white">
              Guía de Comercios
            </a>
            <a href="#feria-cultura" className="hover:text-white">
              Feria y Cultura
            </a>
            <Link href="/comercio/veterinariaflavio" className="text-celeste hover:underline">
              veterinariaflavio.mataderos.ar
            </Link>
            <Link href="/comercio/tostadorescastro" className="text-celeste hover:underline">
              tostadorescastro.mataderos.ar
            </Link>
          </div>
        </div>
      </footer>

      {/* =========================================================
          MODAL EDITORIAL PARA LEER NOTICIAS COMPLETAS
         ========================================================= */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 bg-carbon/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-pampa-surface border border-pampa-border rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64">
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Cerrar nota"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-carbon/80 text-white flex items-center justify-center hover:bg-carbon"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-ladrillo text-white text-xs font-extrabold">
                {activeArticle.category}
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="text-xs font-bold text-cuero mb-2">
                {activeArticle.zone} · {activeArticle.publishedLabel} · Lectura{' '}
                {activeArticle.readTime}
              </div>
              <h2
                id="article-modal-title"
                className="text-2xl font-extrabold text-carbon leading-snug mb-4"
              >
                {activeArticle.title}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-carbon/85 leading-relaxed mb-6">
                {activeArticle.content.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>

              <div className="pt-5 border-t border-pampa-border flex flex-wrap items-center justify-between gap-3">
                {activeArticle.mentionedBusinessSlug ? (
                  <Link
                    href={`/comercio/${activeArticle.mentionedBusinessSlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-chicago hover:bg-chicago-dark text-white text-xs font-extrabold transition-colors"
                  >
                    Visitar comercio mencionado ({activeArticle.mentionedBusinessSlug}.mataderos.ar)
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 rounded-lg border border-pampa-border text-xs font-bold text-carbon hover:bg-pampa-deep"
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
