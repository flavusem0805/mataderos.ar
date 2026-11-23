import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { getEmprendedores, LOCATION_TYPE_LABELS } from '@/lib/emprendedores';

export const metadata: Metadata = {
  title: 'Emprendedores del barrio verificados · Mataderos.ar',
  description:
    'Directorio de feriantes y emprendedores verificados de la Feria de Mataderos, La Recova y Comuna 9.',
  alternates: { canonical: 'https://mataderos.ar/emprendedores' },
  openGraph: {
    title: 'Emprendedores del barrio verificados · Mataderos.ar',
    description:
      'Puestos de la Feria de Mataderos, artesanos y emprendimientos verificados del barrio.',
    url: 'https://mataderos.ar/emprendedores',
    locale: 'es_AR',
    type: 'website'
  }
};

export default function EmprendedoresPage() {
  const emprendedores = getEmprendedores();

  return (
    <NotaFrame>
      <section className="section-pad border-b border-carbon/15 bg-pampa">
        <div className="editorial-container">
          <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
            <Link href="/" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
              Inicio
            </Link>
            <span className="mx-2 text-carbon/40" aria-hidden="true">
              /
            </span>
            <span className="text-carbon">Emprendedores</span>
          </nav>

          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-chicago">
            Primera Ronda · Feria de Mataderos y Comuna 9
          </p>
          <h1 className="mt-2 max-w-[18ch] font-display text-[clamp(2.75rem,7.5vw,5rem)] font-semibold uppercase leading-[0.9]">
            Emprendedores del barrio verificados
          </h1>
          <p className="mt-4 max-w-[64ch] font-serif text-xl leading-relaxed text-carbon/90">
            Puestos de la Feria, artesanos y oficios de Mataderos revisados por el equipo del portal. La verificación es editorial y no constituye un sello municipal.
          </p>

          <div className="mt-6">
            <Link
              href="/sumate/emprendedores"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-chicago px-6 font-semibold text-pampa hover:bg-chicago-dark color-field"
            >
              Sumá tu emprendimiento gratis
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad bg-pampa-surface">
        <div className="editorial-container">
          <div className="grid gap-6 md:grid-cols-2">
            {emprendedores.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col border border-carbon/25 bg-pampa"
              >
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
                          <span className="text-carbon/70">Ficha de ejemplo</span>
                        </>
                      )}
                    </div>
                    <h2 className="mt-2 font-serif text-2xl font-semibold">
                      <Link
                        href={`/emprendedores/${item.slug}`}
                        className="hover:text-chicago hover:underline hover:underline-offset-4"
                      >
                        {item.displayName}
                      </Link>
                    </h2>
                    <p className="mt-1 font-mono text-sm text-carbon/70">
                      {item.category} · {LOCATION_TYPE_LABELS[item.locationType]}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-carbon/85">{item.tagline}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-carbon/15 pt-4">
                    <span className="font-mono text-sm text-carbon/70">{item.zone}</span>
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
        </div>
      </section>
    </NotaFrame>
  );
}
