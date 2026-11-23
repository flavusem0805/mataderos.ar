import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MapPin, Phone, Star } from 'lucide-react';
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
    title: `${business.name} — Web Oficial · ${business.slug}.mataderos.ar`,
    description: business.description
  };
}

export default async function CommerceSubdomainPage({ params }: CommercePageProps) {
  const { slug } = await params;
  const business = await fetchBusinessBySlug(slug);

  if (!business) {
    notFound();
  }

  const mapsQuery = encodeURIComponent(
    `${business.address}, Mataderos, Ciudad Autónoma de Buenos Aires`
  );

  return (
    <div className="min-h-screen flex flex-col bg-pampa text-carbon">
      {/* =========================================================
          BARRA DE SUBDOMINIO MULTI-TENANT
         ========================================================= */}
      <div
        data-surface="dark"
        className="bg-carbon text-pampa border-b border-pampa/20 sticky top-0 z-50"
      >
        <div className="editorial-container min-h-[56px] py-2 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="min-h-[48px] inline-flex items-center gap-2.5 px-3 border border-pampa/30 text-pampa text-[1rem] font-medium hover:bg-pampa hover:text-carbon color-field"
          >
            <Image
              src="/logo-emblem.png"
              alt="Mataderos.ar"
              width={26}
              height={26}
              className="border border-pampa/30 shrink-0"
            />
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Volver al Portal Mataderos
          </Link>

          <p className="font-mono type-meta text-pampa">
            Web Oficial · {business.slug}.mataderos.ar
          </p>
        </div>
      </div>

      {/* =========================================================
          HEADER DEL COMERCIO — VERDE CHICAGO #1E5631
         ========================================================= */}
      <header data-surface="dark" className="bg-chicago text-pampa border-b border-pampa/20">
        <div className="editorial-container py-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono type-meta text-pampa/90 mb-2">
              {business.isOpenNow && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-pampa mr-2 align-middle"
                  aria-hidden="true"
                />
              )}
              Comercio verificado en Mataderos · {business.hoursSummary}
            </p>
            <h1 className="font-display type-h1 font-semibold uppercase">
              {business.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#horarios"
              className="min-h-[48px] px-5 inline-flex items-center border border-pampa/40 text-pampa font-medium text-[1rem] hover:bg-pampa hover:text-chicago color-field"
            >
              Ver horarios
            </a>
            {Boolean(business.whatsapp.trim()) && (
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-5 inline-flex items-center gap-2 bg-pampa text-chicago font-semibold text-[1rem] hover:bg-pampa-deep color-field"
              >
                WhatsApp
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* =========================================================
            HERO DEL COMERCIO (SOBRE BLANCO PARA EL BOTÓN LADRILLO)
           ========================================================= */}
        <section className="bg-white text-carbon border-b border-carbon/20">
          <div className="editorial-container section-pad grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <p className="font-mono type-meta text-carbon/75 mb-3">
                {business.category} · {business.yearsInNeighborhood}
              </p>

              <h2 className="font-serif type-h2 font-semibold text-carbon mb-5">
                {business.tagline}
              </h2>

              <p className="type-body text-carbon/85 mb-8">
                {business.longDescription}
              </p>

              <div className="border-t border-b border-carbon/20 py-4 mb-8">
                <p className="type-meta font-semibold text-carbon flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-chicago shrink-0" strokeWidth={1.5} />
                  {business.address}, Mataderos · {business.zone}
                </p>
                <p className="type-meta text-carbon/75 mt-1">{business.nearCorner}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {Boolean(business.whatsapp.trim()) && (
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-ladrillo min-h-[48px] px-6 rounded-[4px] bg-ladrillo hover:bg-ladrillo-dark text-white font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                  >
                    Escribir por WhatsApp
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                )}

                <a
                  href={`https://maps.google.com/?q=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-5 border border-chicago text-chicago hover:bg-chicago hover:text-pampa font-semibold text-[1rem] inline-flex items-center justify-center gap-2 color-field"
                >
                  Cómo llegar
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden border border-carbon/20">
                <Image
                  src={business.heroImage}
                  alt={business.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover opacity-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SERVICIOS EN GRILLA CON FILETES
           ========================================================= */}
        {business.services.length > 0 && (
          <section className="bg-pampa border-b border-carbon/20">
            <div className="editorial-container section-pad">
              <div className="pb-6 mb-8 border-b border-carbon/20">
                <p className="font-mono type-meta text-carbon/75 mb-2">
                  SERVICIOS Y ESPECIALIDADES
                </p>
                <h2 className="font-display type-h2 font-semibold uppercase">
                  Qué ofrecemos en {business.name}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-carbon/20">
                {business.services.map((srv) => (
                  <article
                    key={srv.title}
                    className="border-r border-b border-carbon/20 p-6 bg-pampa-surface flex flex-col justify-between gap-5"
                  >
                    <div>
                      <h3 className="type-h3 font-semibold text-carbon mb-3">
                        {srv.title}
                      </h3>
                      <p className="type-body text-carbon/80">{srv.description}</p>
                    </div>
                    <p className="font-mono type-meta text-chicago pt-4 border-t border-carbon/15">
                      {srv.badge}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            HORARIOS Y OPINIONES DE VECINOS
           ========================================================= */}
        <section id="horarios" className="bg-pampa-deep border-b border-carbon/20">
          <div className="editorial-container section-pad grid md:grid-cols-2 gap-10">
            <div className="border border-carbon/20 bg-pampa-surface p-6 sm:p-8">
              <p className="font-mono type-meta text-carbon/75 mb-2">HORARIOS Y CONTACTO</p>
              <h3 className="font-serif type-h3 font-semibold text-carbon mb-6">
                Cuándo visitarnos
              </h3>

              <ul className="border-t border-carbon/20 divide-y divide-carbon/20 mb-6">
                {business.hours.map((row) => (
                  <li
                    key={row.days}
                    className="py-4 flex flex-wrap items-center justify-between gap-2 type-meta"
                  >
                    <span className="text-carbon/75">{row.days}</span>
                    <span className="font-semibold text-carbon">{row.schedule}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-carbon/20 space-y-2 type-meta text-carbon/85">
                {business.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-chicago shrink-0" strokeWidth={1.5} />
                    {business.phone}
                  </p>
                )}
                <p>{business.paymentMethods}</p>
              </div>
            </div>

            <div className="border border-carbon/20 bg-pampa-surface p-6 sm:p-8">
              <p className="font-mono type-meta text-carbon/75 mb-2">CONFIANZA BARRIAL</p>
              <h3 className="font-serif type-h3 font-semibold text-carbon mb-6">
                Opiniones de vecinos de Mataderos
              </h3>

              <div className="divide-y divide-carbon/20 border-t border-carbon/20">
                {business.reviews.length > 0 ? (
                  business.reviews.map((rev) => (
                    <blockquote key={rev.author} className="py-5">
                      <div className="flex items-center gap-1 text-chicago mb-2" aria-label={`${rev.rating} de 5 estrellas`}>
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" strokeWidth={1.5} />
                        ))}
                      </div>
                      <p className="type-body text-carbon/90 mb-2">
                        &ldquo;{rev.text}&rdquo;
                      </p>
                      <footer className="font-mono type-meta text-carbon/75">
                        {rev.author} · {rev.neighborhoodNote}
                      </footer>
                    </blockquote>
                  ))
                ) : (
                  <p className="py-5 type-body text-carbon/80">
                    Ficha verificada en la guía comercial de Mataderos.ar. Muy pronto vas a poder leer reseñas de vecinos del barrio acá.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER IMPULSADO POR MATADEROS.AR
         ========================================================= */}
      <footer data-surface="dark" className="bg-carbon text-pampa border-t border-pampa/20">
        <div className="editorial-container py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-emblem.png"
              alt="Emblema de Mataderos.ar"
              width={36}
              height={36}
              className="border border-pampa/30 shrink-0"
            />
            <p className="font-mono type-meta text-pampa/85">
              Web Oficial alojada en Mataderos.ar · Hecho en Mataderos
            </p>
          </div>
          <Link
            href="/#sumar-comercio"
            className="min-h-[48px] px-5 inline-flex items-center border border-pampa/40 text-pampa hover:bg-pampa hover:text-carbon font-semibold text-[1rem] color-field"
          >
            ¿Querés una web así para tu negocio?
          </Link>
        </div>
      </footer>
    </div>
  );
}
