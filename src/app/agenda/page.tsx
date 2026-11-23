import type { Metadata } from 'next';
import Link from 'next/link';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { AgendaExplorer } from '@/components/agenda/AgendaExplorer';
import { fetchEvents } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Agenda cultural de Mataderos · Feria, La Recova y El Plata · Mataderos.ar',
  description:
    'Programación completa de Mataderos: Feria de Mataderos, peñas en La Recova y funciones del Cine Teatro El Plata. Filtrá por fecha, lugar o tipo de evento.',
  alternates: { canonical: 'https://mataderos.ar/agenda' },
  openGraph: {
    title: 'Agenda cultural de Mataderos · Mataderos.ar',
    description:
      'Próximos encuentros en la Feria de Mataderos, La Recova y Cine Teatro El Plata.',
    url: 'https://mataderos.ar/agenda',
    locale: 'es_AR',
    type: 'website'
  }
};

export default async function AgendaPage() {
  const events = await fetchEvents();

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
            <span className="text-carbon">Agenda</span>
          </nav>

          <p className="mt-4 font-mono text-sm uppercase tracking-wider text-chicago">
            Cartelera · Comuna 9 · CABA
          </p>
          <h1 className="mt-2 max-w-[16ch] font-display text-[clamp(2.75rem,7.5vw,5rem)] font-semibold uppercase leading-[0.9]">
            Agenda de Mataderos
          </h1>
          <p className="mt-4 max-w-[64ch] font-serif text-xl leading-relaxed text-carbon/90">
            Feria de Mataderos, peñas en La Recova y funciones del Cine Teatro El Plata. Buscá, filtrá por sede o tipo de actividad y guardá la fecha en tu calendario.
          </p>
        </div>
      </section>

      <section className="section-pad bg-pampa-surface">
        <div className="editorial-container">
          <AgendaExplorer events={events} />
        </div>
      </section>
    </NotaFrame>
  );
}
