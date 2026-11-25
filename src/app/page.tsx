import PortalClient, { type HomeNote } from '@/components/PortalClient';
import { formatFecha, notasRecientes } from '@/lib/notas';
import { fetchAgendaItems, fetchBusinesses } from '@/lib/supabase';

export const revalidate = 300;

export default async function HomePage() {
  const [businesses, agendaItems] = await Promise.all([fetchBusinesses(), fetchAgendaItems()]);
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
      serverNow={serverNow}
    />
  );
}
