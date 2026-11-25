import type { Metadata } from 'next';
import Link from 'next/link';
import { NotaFrame } from '@/components/notas/NotaFrame';
import { AgendaExplorer, type AmbitoFilter } from '@/components/agenda/AgendaExplorer';
import { fetchAgendaItems } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Agenda de Mataderos y Comuna 9 · Cartelera con fuente · Mataderos.ar',
  description:
    'Agenda actualizada de Mataderos y la Comuna 9: Cine Teatro El Plata, Feria de Mataderos, Centro Cultural Macedonio Fernández, SALE MATADEROS, Liniers y Parque Avellaneda.',
  alternates: { canonical: 'https://mataderos.ar/agenda' },
  openGraph: {
    title: 'Agenda de Mataderos y Comuna 9 · Mataderos.ar',
    description:
      'Actividades con fecha y fuente en Mataderos, Liniers y Parque Avellaneda. Filtrá por barrio, sede o entrada libre y descargá la fecha (.ics).',
    url: 'https://mataderos.ar/agenda',
    locale: 'es_AR',
    type: 'website'
  }
};

interface AgendaPageProps {
  searchParams: Promise<{ ambito?: string | string[] }>;
}

function parseAmbito(value: string | string[] | undefined): AmbitoFilter {
  const raw = (Array.isArray(value) ? value[0] : value)?.toLowerCase().trim();
  if (raw === 'mataderos') return 'Mataderos';
  if (raw === 'comuna-9' || raw === 'comuna9') return 'Comuna 9';
  return 'all';
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const [items, params] = await Promise.all([fetchAgendaItems(), searchParams]);
  const initialAmbito = parseAmbito(params.ambito);
  const serverNow = Date.now();

  return (
    <NotaFrame>
      <section className="border-b border-carbon/15 bg-pampa py-5 sm:py-[var(--section-py)]">
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
            Nov y dic 2026 · Comuna 9
          </p>
          <h1 className="mt-1.5 max-w-[16ch] font-display text-[clamp(2.25rem,7.5vw,5rem)] font-semibold uppercase leading-[0.9] sm:mt-2">
            Agenda de Mataderos
          </h1>
          <p className="mt-4 hidden max-w-[66ch] font-serif text-xl leading-relaxed text-carbon/90 sm:block">
            Actividades con fecha y fuente publicada en Mataderos —El Plata, la Feria, el Centro Cultural Macedonio Fernández y comercios— más una sección aparte para encuentros de la Comuna 9 en Liniers y Parque Avellaneda.
          </p>
        </div>
      </section>

      <section className="bg-pampa-surface pb-10 sm:py-[var(--section-py)]">
        <div className="editorial-container">
          <AgendaExplorer items={items} serverNow={serverNow} initialAmbito={initialAmbito} />
        </div>
      </section>
    </NotaFrame>
  );
}
