import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, FileText, MapPin } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import {
  canonicalEmprendedor,
  getEmprendedorBySlug,
  getEmprendedores,
  LOCATION_TYPE_LABELS
} from '@/lib/emprendedores';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getEmprendedores().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const emprendedor = getEmprendedorBySlug(slug);
  if (!emprendedor) return { title: 'Emprendedor no encontrado · Mataderos.ar' };

  const url = canonicalEmprendedor(emprendedor.slug);
  return {
    title: `${emprendedor.displayName} · Emprendedores · Mataderos.ar`,
    description: emprendedor.offerText.slice(0, 155),
    alternates: { canonical: url },
    openGraph: {
      title: `${emprendedor.displayName} · Emprendedores verificados · Mataderos.ar`,
      description: emprendedor.tagline,
      url,
      locale: 'es_AR',
      type: 'website',
      images: [{ url: emprendedor.heroImage, alt: emprendedor.heroAlt }]
    }
  };
}

export default async function EmprendedorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getEmprendedorBySlug(slug);
  if (!item) notFound();

  const url = canonicalEmprendedor(item.slug);
  const waHref = `https://wa.me/${item.whatsapp}?text=${encodeURIComponent(
    `Hola ${item.displayName}, te escribo desde tu ficha en Mataderos.ar.`
  )}`;

  const sameAs = [item.instagram, item.facebook, item.tiktok, item.otherUrl].filter(
    Boolean
  ) as string[];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': item.locationType === 'solo_redes' ? 'Person' : 'LocalBusiness',
        name: item.displayName,
        description: item.offerText,
        url,
        areaServed: 'Mataderos, Comuna 9, CABA',
        ...(sameAs.length > 0 ? { sameAs } : {})
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://mataderos.ar' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Emprendedores',
            item: 'https://mataderos.ar/emprendedores'
          },
          { '@type': 'ListItem', position: 3, name: item.displayName, item: url }
        ]
      }
    ]
  };

  return (
    <NotaFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-pampa">
        {item.isDemo && (
          <div className="border-b border-carbon/20 bg-pampa-surface">
            <div className="editorial-container py-3 font-mono text-sm text-carbon/85">
              Ficha de demostración (Primera Ronda). Si tenés un puesto o emprendimiento en Mataderos,{' '}
              <Link href="/sumate/emprendedores" className="text-chicago underline underline-offset-4">
                sumá el tuyo gratis
              </Link>
              .
            </div>
          </div>
        )}

        <header className="border-b border-carbon/15 py-8 sm:py-12">
          <div className="editorial-container">
            <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
              <Link
                href="/emprendedores"
                className="inline-flex min-h-[48px] items-center gap-2 underline underline-offset-4"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Emprendedores verificados
              </Link>
            </nav>

            <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-wide text-chicago">
                  <span>Verificado por Mataderos.ar</span>
                  {item.isFounder && (
                    <>
                      <span>·</span>
                      <span>Fundador</span>
                    </>
                  )}
                </div>

                <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold uppercase leading-[0.92]">
                  {item.displayName}
                </h1>

                <p className="mt-2 font-mono text-base text-carbon/75">
                  {item.category} · {LOCATION_TYPE_LABELS[item.locationType]}
                </p>

                <p className="mt-4 max-w-[56ch] font-serif text-xl leading-relaxed text-carbon/90">
                  {item.tagline}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-6 font-semibold text-pampa hover:bg-chicago-dark color-field"
                  >
                    Escribir por WhatsApp
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                  {item.instagram && (
                    <a
                      href={item.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold hover:bg-carbon hover:text-pampa color-field"
                    >
                      Instagram
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full border border-carbon/20 lg:col-span-5">
                <Image
                  src={item.heroImage}
                  alt={item.heroAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="editorial-container grid gap-10 py-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <section>
              <p className="font-mono text-sm uppercase tracking-wider text-chicago">Qué ofrecen</p>
              <p className="mt-3 text-lg leading-relaxed text-carbon/90">{item.offerText}</p>
            </section>

            {item.photos.length > 0 && (
              <section className="border-t border-carbon/15 pt-8">
                <p className="font-mono text-sm uppercase tracking-wider text-chicago">Fotos</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {item.photos.map((photo) => (
                    <figure key={photo.src} className="border border-carbon/20 bg-pampa-surface">
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(min-width: 640px) 45vw, 100vw"
                        />
                      </div>
                      <figcaption className="p-3 text-sm text-carbon/80">{photo.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <section className="border border-carbon/20 bg-pampa-surface p-6">
              <p className="font-mono text-sm uppercase tracking-wider text-chicago">
                Dónde encontrarlos
              </p>
              <div className="mt-4 space-y-2 text-base">
                {item.feriaName && (
                  <p className="flex items-start gap-2 font-semibold">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
                    <span>
                      {item.feriaName}
                      {item.puestoLabel ? ` · ${item.puestoLabel}` : ''}
                    </span>
                  </p>
                )}
                {item.address && <p className="text-carbon/90">{item.address}</p>}
                <p className="text-carbon/80">{item.locationNote}</p>
                <p className="font-mono text-sm text-carbon/65">{item.zone}</p>
              </div>
            </section>

            {item.catalogPdfName && (
              <section className="border border-carbon/20 bg-pampa-surface p-6">
                <p className="font-mono text-sm uppercase tracking-wider text-chicago">
                  Catálogo en PDF
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <p className="font-mono text-sm font-semibold">{item.catalogPdfName}</p>
                    {item.catalogPdfSizeLabel && (
                      <p className="text-sm text-carbon/70">{item.catalogPdfSizeLabel}</p>
                    )}
                  </div>
                </div>
                {item.catalogPdfUrl ? (
                  <a
                    href={item.catalogPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon px-5 font-semibold hover:bg-carbon hover:text-pampa color-field"
                  >
                    Descargar catálogo
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  </a>
                ) : (
                  <p className="mt-3 text-sm text-carbon/70">
                    En tu ficha real, acá los vecinos descargan tu lista de precios o catálogo PDF (hasta 10 MB).
                  </p>
                )}
              </section>
            )}

            <section className="border border-carbon/15 p-5 text-sm leading-relaxed text-carbon/75">
              <p className="font-mono text-xs uppercase tracking-wider text-carbon">
                Sobre esta verificación
              </p>
              <p className="mt-2">
                «Verificado por Mataderos.ar» significa que el equipo editorial revisó el perfil. No es un sello municipal ni una garantía sobre las ventas, que se acuerdan directamente con el emprendedor.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </NotaFrame>
  );
}
