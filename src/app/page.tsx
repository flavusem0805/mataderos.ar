import PortalClient from '@/components/PortalClient';
import { fetchArticles, fetchBusinesses, fetchEvents } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [businesses, articles, events] = await Promise.all([
    fetchBusinesses(),
    fetchArticles(),
    fetchEvents()
  ]);

  return (
    <PortalClient
      businesses={businesses}
      articles={articles}
      events={events}
    />
  );
}
