import PortalClient, { type HomeNote } from '@/components/PortalClient';
import { formatFecha, notasRecientes } from '@/lib/notas';
import { fetchAgendaItems, fetchBusinesses, fetchEmprendedores, fetchTakenSlugs } from '@/lib/supabase';

export const revalidate = 300;

export default async function HomePage() {
  const [businesses, agendaItems, emprendedores, takenSlugs] = await Promise.all([
    fetchBusinesses(),
    fetchAgendaItems(),
    fetchEmprendedores(),
    fetchTakenSlugs()
  ]);
  const serverNow = Date.now();
  const notes: HomeNote[] = notasRecientes(8).map((nota) => ({
    slug: nota.slug,
    title: nota.title,
    category: nota.category,
    fecha: formatFecha(nota.publishedAt),
    imageSrc: nota.image?.src,
    imageAlt: nota.image?.alt,
    imagePosition: nota.image?.objectPosition,
    credit: nota.image ? `${nota.image.author} · ${nota.image.license}` : undefined,
    placeLabel: nota.placeLabel
  }));

  return (
    <PortalClient
      businesses={businesses}
      notes={notes}
      agendaItems={agendaItems}
      emprendedores={emprendedores}
      takenSlugs={takenSlugs}
      serverNow={serverNow}
    />
  );
}
