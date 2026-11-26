import type { MetadataRoute } from 'next';
import { PORTAL_URL } from '@/lib/contact';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/panel/', '/onboarding/', '/entrar/']
    },
    sitemap: `${PORTAL_URL}/sitemap.xml`,
    host: PORTAL_URL
  };
}
