import PortalClient, { type HomeNote } from '@/components/PortalClient';
import { formatFecha, notasRecientes } from '@/lib/notas';
import { fetchBusinesses, fetchEvents } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [businesses, events] = await Promise.all([fetchBusinesses(), fetchEvents()]);
  const notes: HomeNote[] = notasRecientes(8).map((nota) => ({
    slug: nota.slug,
    title: nota.title,
    category: nota.category,
    fecha: formatFecha(nota.publishedAt),
    imageSrc: nota.image.src,
    imageAlt: nota.image.alt,
    credit: `${nota.image.author} · ${nota.image.license}`
  }));

  return <PortalClient businesses={businesses} notes={notes} events={events} />;
}
