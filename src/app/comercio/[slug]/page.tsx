import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  CreditCard,
  Globe,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  Star
} from 'lucide-react';
import { BUSINESSES } from '@/lib/data';
import { fetchBusinessBySlug } from '@/lib/supabase';

interface CommercePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CommercePageProps) {
  const { slug } = await params;
  const business = await fetchBusinessBySlug(slug);
  if (!business) {
    return { title: 'Comercio no encontrado · Mataderos.ar' };
  }
  return {
    title: `${business.name} — ${business.slug}.mataderos.ar`,
    description: business.description
  };
}

export default async function CommerceSubdomainPage({ params }: CommercePageProps) {
  const { slug } = await params;
  const business = await fetchBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const demoSubdomains = BUSINESSES.filter((b) => b.hasSubdomain);
  const mapsQuery = encodeURIComponent(`${business.address}, Mataderos, Ciudad Autónoma de Buenos Aires`);

  return (
    <div className="min-h-screen flex flex-col bg-pampa-texture text-carbon">
      {/* =========================================================
          BARRA SIMULADORA DE SUBDOMINIO MULTI-TENANT
         ========================================================= */}
      <div className="bg-carbon text-pampa border-b border-white/10 py-2.5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver al Portal Mataderos
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800 border border-white/10 text-xs font-mono text-white">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              https://<strong className="text-celeste">{business.slug}</strong>.mataderos.ar
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px]">
            <span className="text-pampa/60 font-bold mr-1">Probar otros:</span>
            {demoSubdomains.map((item) => (
              <Link
                key={item.slug}
                href={`/comercio/${item.slug}`}
                className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                  item.slug === business.slug
                    ? 'bg-ladrillo text-white'
                    : 'bg-white/10 text-pampa/80 hover:bg-white/20'
                }`}
              >
                {item.emoji} {item.name.split(' ')[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================
          HEADER DEL COMERCIO (VERDE CHICAGO)
         ========================================================= */}
      <header className="bg-chicago text-white border-b border-chicago-dark shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl shadow-inner">
              {business.emoji}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-pampa">
                  <BadgeCheck className="w-3.5 h-3.5 text-celeste" />
                  Comercio Verificado en Mataderos
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                    business.isOpenNow
                      ? 'bg-emerald-100 text-emerald-950'
                      : 'bg-stone-200 text-stone-800'
                  }`}
                >
                  {business.isOpenNow && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  )}
                  {business.hoursSummary}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {business.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="#horarios"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/25 text-white text-xs font-bold hover:bg-white/10 transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              Ver horarios
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-ladrillo hover:bg-ladrillo-dark text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO DEL COMERCIO
         ========================================================= */}
      <main className="flex-1">
        <section className="py-12 md:py-16 border-b border-pampa-border">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ladrillo/10 text-ladrillo text-xs font-extrabold uppercase tracking-wider mb-4">
                {business.category} · {business.yearsInNeighborhood}
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-carbon leading-[1.12] mb-4">
                {business.tagline}
              </h2>

              <p className="text-base text-carbon/75 leading-relaxed mb-6">
                {business.longDescription}
              </p>

              <div className="bg-pampa-surface border-l-4 border-ladrillo rounded-r-xl p-4 mb-6 shadow-sm">
                <div className="font-extrabold text-sm text-carbon flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-ladrillo shrink-0" />
                  {business.address}, Mataderos · {business.zone}
                </div>
                <p className="text-xs text-carbon/70 mt-1">{business.nearCorner}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ladrillo hover:bg-ladrillo-dark text-white text-sm font-extrabold shadow-md transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  Escribir por WhatsApp
                </a>
                <a
                  href={`https://maps.google.com/?q=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-chicago text-chicago hover:bg-chicago hover:text-white text-sm font-extrabold transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Cómo llegar (Maps)
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-pampa-border shadow-xl bg-pampa-deep h-72 sm:h-96">
                <img
                  src={business.heroImage}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SERVICIOS Y PROPUESTA
           ========================================================= */}
        {business.services.length > 0 && (
          <section className="py-14 bg-pampa-deep/55 border-b border-pampa-border">
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-8">
                <span className="text-xs font-extrabold uppercase tracking-widest text-ladrillo">
                  Servicios y especialidades
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-carbon mt-1">
                  Qué ofrecemos en {business.name}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {business.services.map((srv) => (
                  <article
                    key={srv.title}
                    className="bg-pampa-surface border border-pampa-border rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-3xl mb-3">{srv.icon}</div>
                      <h3 className="text-base font-extrabold text-carbon mb-2">{srv.title}</h3>
                      <p className="text-xs sm:text-sm text-carbon/75 leading-relaxed mb-4">
                        {srv.description}
                      </p>
                    </div>
                    <span className="inline-block text-[11px] font-extrabold text-chicago bg-chicago/10 px-2.5 py-1 rounded-full self-start">
                      {srv.badge}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            HORARIOS Y RESEÑAS DE VECINOS
           ========================================================= */}
        <section id="horarios" className="py-14">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6">
            <div className="bg-pampa-surface border border-pampa-border rounded-2xl p-6 sm:p-7 shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-ladrillo">
                Horarios y contacto
              </span>
              <h3 className="text-2xl font-extrabold text-carbon mt-1 mb-5">
                Cuándo visitarnos
              </h3>

              <ul className="divide-y divide-pampa-border mb-6">
                {business.hours.map((row) => (
                  <li
                    key={row.days}
                    className="py-3 flex flex-wrap items-center justify-between gap-2 text-sm"
                  >
                    <span className="text-carbon/70 font-semibold">{row.days}</span>
                    <strong className="text-carbon font-extrabold">{row.schedule}</strong>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2.5 text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pampa border border-pampa-border">
                  <Phone className="w-3.5 h-3.5 text-chicago" />
                  {business.phone}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pampa border border-pampa-border">
                  <CreditCard className="w-3.5 h-3.5 text-ladrillo" />
                  {business.paymentMethods}
                </span>
              </div>
            </div>

            <div className="bg-pampa-surface border border-pampa-border rounded-2xl p-6 sm:p-7 shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-wider text-chicago">
                Confianza barrial
              </span>
              <h3 className="text-2xl font-extrabold text-carbon mt-1 mb-5">
                Opiniones de vecinos de Mataderos
              </h3>

              <div className="space-y-4">
                {business.reviews.length > 0 ? (
                  business.reviews.map((rev) => (
                    <blockquote
                      key={rev.author}
                      className="p-4 rounded-xl bg-pampa border border-pampa-border"
                    >
                      <div className="flex items-center gap-1 text-ladrillo mb-2">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-carbon/85 leading-relaxed mb-2">
                        &ldquo;{rev.text}&rdquo;
                      </p>
                      <footer className="text-xs font-bold text-cuero">
                        — {rev.author} · {rev.neighborhoodNote}
                      </footer>
                    </blockquote>
                  ))
                ) : (
                  <div className="p-5 rounded-xl bg-pampa border border-pampa-border text-sm text-carbon/75">
                    Ficha verificada en la guía comercial de Mataderos.ar. Muy pronto vas a poder leer reseñas de vecinos del barrio acá.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER IMPULSADO POR MATADEROS.AR
         ========================================================= */}
      <footer className="bg-carbon text-pampa border-t border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-pampa/80 flex items-center gap-2">
            <Globe className="w-4 h-4 text-celeste shrink-0" />
            <span>
              Sitio web oficial alojado en la red de comercios de{' '}
              <strong className="text-white">Mataderos.ar</strong>
            </span>
          </p>
          <Link
            href="/#sumar-comercio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ladrillo hover:bg-ladrillo-dark text-white text-xs font-extrabold transition-colors"
          >
            ¿Querés una web así para tu negocio? →
          </Link>
        </div>
      </footer>
    </div>
  );
}
