import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-pampa text-carbon flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-pampa-surface border border-carbon p-8 sm:p-10">
        <p className="font-mono type-meta text-carbon/75 mb-3">
          MATADEROS.AR · PÁGINA NO ENCONTRADA
        </p>
        <h1 className="font-display type-h2 font-semibold uppercase text-carbon mb-4">
          Comercio o sección no encontrada
        </h1>
        <p className="type-body text-carbon/80 mb-8">
          Todavía no hay una Web Oficial activa en esa dirección. Podés volver al portal principal para recorrer la guía de comercios de Mataderos.
        </p>
        <Link
          href="/"
          className="min-h-[48px] px-6 inline-flex items-center gap-2 bg-chicago hover:bg-chicago-dark text-pampa font-semibold text-[1rem] color-field"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Volver a Mataderos.ar
        </Link>
      </div>
    </main>
  );
}
