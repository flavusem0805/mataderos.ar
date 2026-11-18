import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-pampa-texture flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-pampa-surface border-2 border-pampa-border rounded-2xl p-8 text-center shadow-lg">
        <div className="w-12 h-12 rounded-xl bg-ladrillo/15 text-ladrillo flex items-center justify-center mx-auto mb-4">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-carbon mb-2">
          Comercio o sección no encontrada
        </h1>
        <p className="text-sm text-carbon/75 mb-6">
          Todavía no hay una web activa en esa dirección de Mataderos.ar. Podés volver al portal principal para explorar la guía del barrio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-chicago hover:bg-chicago-dark text-white text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Mataderos.ar
        </Link>
      </div>
    </main>
  );
}
