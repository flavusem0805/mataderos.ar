import type { Metadata } from 'next';
import Link from 'next/link';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { AgendaExplorer } from '@/components/agenda/AgendaExplorer';
import { fetchAgendaItems } from '@/lib/supabase';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Agenda de Mataderos · Cartelera con fuente · Mataderos.ar',
  description:
    'Agenda actualizada de Mataderos: Cine Teatro El Plata, Feria de Mataderos, Centro Cultural Macedonio Fernández, SALE MATADEROS y actividades del barrio.',
  alternates: { canonical: 'https://mataderos.ar/agenda' },
  openGraph: {
    title: 'Agenda de Mataderos · Mataderos.ar',
    description:
      'Actividades con fecha y fuente en Mataderos. Filtrá por sede, categoría o entrada libre y descargá la fecha (.ics).',
    url: 'https://mataderos.ar/agenda',
    locale: 'es_AR',
    type: 'website'
  }
};

export default async function AgendaPage() {
  const items = await fetchAgendaItems();
  const serverNow = Date.now();

  return (
    <NotaFrame>
      <section className="border-b border-carbon/15 bg-pampa py-5 sm:py-10">
        <div className="editorial-container">
          <nav aria-label="Miga de pan" className="hidden font-mono text-base text-chicago sm:block">
            <Link href="/" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
              Inicio
            </Link>
            <span className="mx-2 text-carbon/40" aria-hidden="true">
              /
            </span>
            <span className="text-carbon">Agenda</span>
          </nav>

          <p className="font-mono text-xs uppercase tracking-wider text-chicago sm:mt-4 sm:text-sm">
            Nov y dic 2026 · Mataderos
          </p>
          <h1 className="mt-1.5 max-w-[16ch] font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold uppercase leading-[0.9] sm:mt-2">
            Agenda de Mataderos
          </h1>
          <p className="mt-4 hidden max-w-[66ch] font-serif text-xl leading-relaxed text-carbon/90 sm:block">
            Actividades con fecha y fuente publicada en el barrio: salas y clubes culturales, la Feria de Mataderos, ferias barriales, operativos en plazas, templos y corredores comerciales.
          </p>
        </div>
      </section>

      <section className="bg-pampa-surface pb-10 sm:pb-16">
        <div className="editorial-container">
          <AgendaExplorer items={items} serverNow={serverNow} />
        </div>
      </section>
    </NotaFrame>
  );
}
