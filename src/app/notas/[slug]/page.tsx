import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NotaFrame, RichText } from '@/components/notas/NotaFrame';

const ElPlataInstagram = dynamic(() =>
  import('@/components/notas/ElPlataInstagram').then((mod) => mod.ElPlataInstagram)
);
import {
  NOTAS,
  canonicalNota,
  formatFecha,
  getNota,
  hermanos,
  satelitesDe
} from '@/lib/notas';
import type { NotaResuelta } from '@/lib/notas';
import { FOTOS } from '@/lib/notas/media';

interface NotaPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return NOTAS.map((nota) => ({ slug: nota.slug }));
}

export async function generateMetadata({ params }: NotaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const nota = getNota(slug);
  if (!nota) return { title: 'Nota no encontrada · Mataderos.ar' };
  const url = canonicalNota(nota.slug);
  const ogImages = nota.image
    ? [{ url: nota.image.src, alt: nota.image.alt }]
    : [{ url: '/og-image.jpg', alt: nota.title }];
  return {
    title: `${nota.title} · Mataderos.ar`,
    description: nota.description,
    alternates: { canonical: url },
    openGraph: {
      title: nota.title,
      description: nota.description,
      url,
      type: 'article',
      publishedTime: nota.publishedAt,
      locale: 'es_AR',
      images: ogImages
    }
  };
}

function crumbJson(nota: NotaResuelta, pilar?: NotaResuelta) {
  const items = [
    { name: 'Inicio', item: 'https://mataderos.ar/' },
    { name: 'Notas', item: 'https://mataderos.ar/notas' }
  ];
  if (pilar) items.push({ name: pilar.title, item: canonicalNota(pilar.slug) });
  items.push({ name: nota.title, item: canonicalNota(nota.slug) });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item
    }))
  };
}

function articleJson(nota: NotaResuelta) {
  return {
    '@type': 'Article',
    headline: nota.title,
    description: nota.description,
    inLanguage: 'es-AR',
    datePublished: nota.publishedAt,
    dateModified: nota.publishedAt,
    mainEntityOfPage: canonicalNota(nota.slug),
    image: [nota.image ? `https://mataderos.ar${nota.image.src}` : 'https://mataderos.ar/og-image.jpg'],
    articleSection: nota.category,
    author: { '@type': 'Organization', name: 'Mataderos.ar', url: 'https://mataderos.ar' },
    publisher: { '@type': 'Organization', name: 'Mataderos.ar', url: 'https://mataderos.ar' }
  };
}

function GuiaIndex({ pilar }: { pilar: NotaResuelta }) {
  const satelites = satelitesDe(pilar.slug);
  return (
    <nav aria-label="En esta guía" className="my-8 border border-carbon bg-pampa-surface p-5 sm:p-6">
      <p className="font-mono text-base text-chicago">En esta guía</p>
      <ul className="mt-3 space-y-3">
        {satelites.map((nota) => (
          <li key={nota.slug}>
            <Link href={`/notas/${nota.slug}`} className="text-lg leading-snug underline decoration-carbon/25 underline-offset-4">
              {nota.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ParteDe({ pilar }: { pilar: NotaResuelta }) {
  return (
    <p className="mt-4 font-mono text-base">
      Guía relacionada:{' '}
      <Link href={`/notas/${pilar.slug}`} className="text-chicago underline underline-offset-4">
        {pilar.title}
      </Link>
    </p>
  );
}

export default async function NotaPage({ params }: NotaPageProps) {
  const { slug } = await params;
  const nota = getNota(slug);
  if (!nota) notFound();
  const pilar = nota.pillarSlug ? getNota(nota.pillarSlug) : undefined;
  const siblings = hermanos(nota, 3);
  const typeLabel =
    nota.type === 'pilar' ? 'Guía troncal' : nota.type === 'actualidad' ? 'Actualidad' : 'Nota';
  const json = {
    '@context': 'https://schema.org',
    '@graph': [articleJson(nota), crumbJson(nota, pilar)]
  };

  return (
    <NotaFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
      <article className="editorial-container py-8 sm:py-12">
        <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
          <Link href="/" className="underline underline-offset-4">Inicio</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/notas" className="underline underline-offset-4">Notas</Link>
          {nota.type === 'actualidad' ? (
            <>
              <span aria-hidden="true"> / </span>
              <Link href="/notas?guia=actualidad" className="underline underline-offset-4">
                Actualidad
              </Link>
            </>
          ) : (
            pilar && (
              <>
                <span aria-hidden="true"> / </span>
                <Link href={`/notas/${pilar.slug}`} className="underline underline-offset-4">
                  Guía
                </Link>
              </>
            )
          )}
        </nav>

        <p className="mt-6 font-mono text-base">
          {typeLabel} · {nota.category} · {formatFecha(nota.publishedAt)} · {nota.readMinutes} min
        </p>
        <h1 className="mt-3 max-w-[22ch] font-serif text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05]">
          {nota.title}
        </h1>
        <p className="mt-4 max-w-[68ch] font-serif text-xl italic leading-snug sm:text-2xl">{nota.dek}</p>
        {pilar && <ParteDe pilar={pilar} />}

        {nota.image ? (
          <figure className="mt-8 min-w-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-carbon">
              <Image
                src={nota.image.src}
                alt={nota.image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1100px"
                className="object-cover"
                style={{ objectPosition: nota.image.objectPosition ?? 'center' }}
              />
            </div>
            <figcaption className="mt-2 max-w-[75ch] font-mono text-base leading-relaxed">
              Foto: {nota.image.author}, {nota.image.taken}. {nota.image.alt} {nota.image.changes}{' '}
              <a href={nota.image.sourceUrl} className="underline underline-offset-4">
                Fuente
              </a>
            {' · '}
            <a href={nota.image.licenseUrl} className="underline underline-offset-4">
              {nota.image.license}
            </a>
            </figcaption>
          </figure>
        ) : nota.placeLabel ? (
          <div className="mt-8 max-w-[68ch] border-y border-carbon/25 bg-pampa-deep px-5 py-4 font-mono text-sm uppercase tracking-wider text-cuero">
            {nota.placeLabel}
          </div>
        ) : null}

        {nota.slug === 'cine-teatro-el-plata' && <ElPlataInstagram />}

        {nota.type === 'pilar' && <GuiaIndex pilar={nota} />}

        <div className="mt-8 max-w-[68ch] text-lg leading-relaxed sm:text-xl">
          {nota.blocks.map((block, index) => {
            if (block.kind === 'figure' && block.image) {
              const foto = FOTOS[block.image];
              return (
                <figure key={index} className="my-8 min-w-0">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-carbon">
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 720px"
                      className="object-cover"
                      style={{ objectPosition: 'objectPosition' in foto ? foto.objectPosition ?? 'center' : 'center' }}
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-base leading-relaxed">
                    {block.text ? `${block.text} ` : ''}
                    Foto: {foto.author}, {foto.taken}.{' '}
                    <a href={foto.sourceUrl} className="underline underline-offset-4">
                      Fuente
                    </a>
                    {' · '}
                    <a href={foto.licenseUrl} className="underline underline-offset-4">
                      {foto.license}
                    </a>
                    . {foto.changes}
                  </figcaption>
                </figure>
              );
            }
            if (block.kind === 'h2') {
              return (
                <h2 key={index} className="mb-3 mt-10 font-serif text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-tight">
                  {block.text}
                </h2>
              );
            }
            if (block.kind === 'h3') {
              return (
                <h3 key={index} className="mb-2 mt-8 font-serif text-2xl font-semibold leading-tight">
                  {block.text}
                </h3>
              );
            }
            return (
              <p key={index} className="mb-5">
                <RichText text={block.text} />
              </p>
            );
          })}
        </div>

        {nota.datos && (
          <aside className="mt-10 max-w-[68ch] border border-carbon bg-pampa-deep p-5 sm:p-6" aria-label={nota.datos.title}>
            <h2 className="font-mono text-base text-chicago">{nota.datos.title}</h2>
            <dl className="mt-4 divide-y divide-carbon/20">
              {nota.datos.rows.map((row) => (
                <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-12 sm:gap-4">
                  <dt className="font-semibold sm:col-span-4">{row.label}</dt>
                  <dd className="sm:col-span-8">{row.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}

        {nota.type === 'actualidad' && (
          <div className="mt-8 max-w-[68ch] border border-chicago/40 bg-pampa-surface p-5 sm:p-6">
            <p className="font-mono text-sm uppercase tracking-wider text-chicago">Agenda actualizada</p>
            <p className="mt-2 text-base leading-relaxed text-carbon/85">
              Todas las fechas, horarios, direcciones, fuentes y descargas al calendario (.ics) están reunidas en la agenda interactiva.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/agenda"
                className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] bg-chicago px-5 text-base font-semibold text-pampa hover:bg-chicago-dark color-field"
              >
                Abrir la agenda completa
              </Link>
            </div>
          </div>
        )}

        {nota.type === 'pilar' && (
          <div className="mt-12">
            <GuiaIndex pilar={nota} />
          </div>
        )}

        {(pilar || siblings.length > 0) && (
          <div className="mt-12 max-w-[68ch] border-t border-carbon/25 pt-6">
            {pilar && <ParteDe pilar={pilar} />}
            {siblings.length > 0 && (
              <>
                <h2 className="mt-6 font-serif text-2xl font-semibold">
                  {nota.type === 'actualidad' ? 'Más actualidad del barrio' : 'En la misma guía'}
                </h2>
                <ul className="mt-3 space-y-3">
                  {siblings.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/notas/${item.slug}`} className="text-lg underline decoration-carbon/25 underline-offset-4">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        <section className="mt-12 max-w-[68ch] border-t border-carbon/25 pt-6" aria-labelledby="fuentes">
          <h2 id="fuentes" className="font-mono text-base text-chicago">
            Fuentes
          </h2>
          <ul className="mt-4 space-y-3 text-lg leading-snug">
            {nota.fuentes.map((fuente) => (
              <li key={fuente.url}>
                <a href={fuente.url} target="_blank" className="underline underline-offset-4" rel="noopener noreferrer">
                  {fuente.title}
                </a>
                <span className="mt-1 block font-mono text-base">{fuente.publisher}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </NotaFrame>
  );
}
