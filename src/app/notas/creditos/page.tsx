import type { Metadata } from 'next';
import Link from 'next/link';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { FOTOS } from '@/lib/notas/media';

// Nota interna: FOTO_SIN_FICHA (public/notas/feria-puestos.jpg) no se publica.
// La ficha exacta no está confirmada. El registro queda en src/lib/notas/media.ts.

export const metadata: Metadata = {
  title: 'Fotos y licencias · Notas de Mataderos',
  description:
    'Créditos de las fotografías publicadas en las notas de Mataderos.ar. Cada foto lleva su ficha al pie de la nota.',
  alternates: { canonical: 'https://mataderos.ar/notas/creditos' },
  openGraph: {
    title: 'Fotos y licencias · Notas de Mataderos',
    description: 'Créditos de las fotografías publicadas en las notas de Mataderos.ar.',
    url: 'https://mataderos.ar/notas/creditos',
    locale: 'es_AR',
    type: 'website'
  }
};

export default function CreditosPage() {
  return (
    <NotaFrame>
      <div className="editorial-container py-10 sm:py-14">
        <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
          <Link href="/notas" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
            Notas
          </Link>
        </nav>
        <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold uppercase leading-[0.92]">
          Fotos y licencias
        </h1>
        <p className="mt-4 max-w-[68ch] text-lg leading-relaxed">
          Las imágenes publicadas en las notas y en la portada son fotografías de Mataderos con licencia Creative Commons. Cada copia está reducida para la web. El crédito completo va al pie de cada foto.
        </p>
        <ul className="mt-8 space-y-4">
          {Object.values(FOTOS).map((foto) => (
            <li key={foto.src} className="max-w-[75ch] border-b border-carbon/15 pb-4 text-base leading-relaxed">
              <p>
                <span className="font-semibold">{foto.author}</span>, {foto.taken}. {foto.license}. {foto.changes}
              </p>
              <p className="flex flex-wrap gap-x-5">
                <a className="inline-flex min-h-[48px] items-center text-chicago underline underline-offset-4" href={foto.sourceUrl}>
                  Ficha
                </a>
                <a className="inline-flex min-h-[48px] items-center text-chicago underline underline-offset-4" href={foto.licenseUrl}>
                  Licencia
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </NotaFrame>
  );
}
