import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { NotaFrame, RichText } from '@/components/notas/NotaFrame';
import { FOTO_SIN_FICHA, FOTOS } from '@/lib/notas/media';
import { PILARES, formatFecha, satelitesDe } from '@/lib/notas';

export const metadata: Metadata = {
  title: 'Notas de Mataderos · guías, historia y feria',
  description:
    'Guías troncales y notas de Mataderos, Comuna 9: historia del barrio, Feria de Mataderos, qué hacer, patrimonio, folklore y bares.',
  alternates: { canonical: 'https://mataderos.ar/notas' },
  openGraph: {
    title: 'Notas de Mataderos',
    description:
      'Historia, feria, patrimonio y cultura de Mataderos, agrupados en guías troncales y notas satélite.',
    url: 'https://mataderos.ar/notas',
    locale: 'es_AR',
    type: 'website'
  }
};

export default function NotasIndexPage() {
  return (
    <NotaFrame>
      <div className="editorial-container py-10 sm:py-14">
        <p className="font-mono text-base text-chicago">Archivo editorial</p>
        <h1 className="mt-2 max-w-[18ch] font-display text-[clamp(2.5rem,8vw,5rem)] font-semibold uppercase leading-[0.92]">
          Notas del barrio
        </h1>
        <p className="mt-4 max-w-[65ch] text-lg leading-relaxed sm:text-xl">
          Cinco guías troncales y sus notas satélite. Cada guía enlaza a los temas específicos, y cada nota vuelve a su guía. Las fechas son de publicación editorial, no de la efeméride que cuentan.
        </p>

        <div className="mt-12 space-y-14">
          {PILARES.map((pilar) => {
            const satelites = satelitesDe(pilar.slug);
            return (
              <section key={pilar.slug} aria-labelledby={`guia-${pilar.slug}`} className="min-w-0 border-t border-carbon/25 pt-8">
                <p className="font-mono text-base text-chicago">Guía troncal · {formatFecha(pilar.publishedAt)}</p>
                <h2 id={`guia-${pilar.slug}`} className="mt-2 font-serif text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight">
                  <Link href={`/notas/${pilar.slug}`} className="underline decoration-carbon/20 underline-offset-4">
                    {pilar.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-[68ch] text-lg leading-relaxed">{pilar.dek}</p>
                <Link
                  href={`/notas/${pilar.slug}`}
                  className="mt-4 inline-flex min-h-[48px] items-center font-semibold text-chicago"
                >
                  Leer la guía
                </Link>
                <ul className="mt-6 divide-y divide-carbon/20 border-y border-carbon/20">
                  {satelites.map((nota) => (
                    <li key={nota.slug}>
                      <Link href={`/notas/${nota.slug}`} className="grid gap-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4">
                        <span className="font-mono text-base text-chicago sm:col-span-3">{formatFecha(nota.publishedAt)}</span>
                        <span className="font-serif text-xl leading-snug sm:col-span-9">{nota.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <section className="mt-16 border-t border-carbon/25 pt-8" aria-labelledby="fotos-titulo">
          <h2 id="fotos-titulo" className="font-display text-3xl font-semibold uppercase">
            Fotos y licencias
          </h2>
          <p className="mt-3 max-w-[68ch] text-lg leading-relaxed">
            Las imágenes publicadas en las notas y en la portada son fotografías de Mataderos con licencia Creative Commons. Cada copia está reducida para la web. El crédito completo va al pie de cada foto.
          </p>
          <ul className="mt-6 space-y-4">
            {Object.values(FOTOS).map((foto) => (
              <li key={foto.src} className="max-w-[75ch] border-b border-carbon/15 pb-4 text-base leading-relaxed">
                <span className="font-semibold">{foto.author}</span>, {foto.taken}. {foto.license}.{' '}
                <a className="text-chicago underline underline-offset-4" href={foto.sourceUrl}>
                  Ficha
                </a>
                {' · '}
                <a className="text-chicago underline underline-offset-4" href={foto.licenseUrl}>
                  Licencia
                </a>
                . {foto.changes}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border border-carbon bg-pampa-deep p-5 sm:p-8" aria-labelledby="licencia-revisar">
          <h2 id="licencia-revisar" className="font-serif text-2xl font-semibold">
            Licencia a confirmar
          </h2>
          <p className="mt-3 max-w-[68ch] text-lg leading-relaxed">
            {FOTO_SIN_FICHA.file}. {FOTO_SIN_FICHA.what} {FOTO_SIN_FICHA.why}
          </p>
        </section>
      </div>
    </NotaFrame>
  );
}
