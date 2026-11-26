import { NextRequest, NextResponse } from 'next/server';

const ROOT_HOSTS = new Set([
  'localhost',
  '127.0.0.1',
  'mataderos.ar',
  'www.mataderos.ar',
  'mataderos.com.ar',
  'www.mataderos.com.ar'
]);

const RESERVED_INFRA_SUBDOMAINS = new Set([
  'www',
  'mail',
  'webmail',
  'smtp',
  'imap',
  'pop',
  'ftp',
  'autoconfig',
  'autodiscover'
]);

/**
 * Enrutamiento multi-tenant para subdominios en producción y desarrollo:
 * Ej. `veterinariaalberdi.mataderos.ar` o `veterinariaalberdi.localhost:3000`
 * se reescriben internamente a `/comercio/veterinariaalberdi`.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostHeader = request.headers.get('host') ?? '';
  const hostname = hostHeader.split(':')[0].toLowerCase();

  // Ignorar rutas internas o previews genéricos de Vercel
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/comercio') ||
    hostname.endsWith('.vercel.app') ||
    ROOT_HOSTS.has(hostname)
  ) {
    return NextResponse.next();
  }

  const rootDomain = (
    process.env.ROOT_DOMAIN ??
    process.env.NEXT_PUBLIC_ROOT_DOMAIN ??
    'mataderos.ar'
  ).toLowerCase();
  let subdomain = '';

  if (hostname.endsWith('.localhost')) {
    subdomain = hostname.replace('.localhost', '');
  } else if (hostname.endsWith(`.${rootDomain}`)) {
    subdomain = hostname.replace(`.${rootDomain}`, '');
  } else {
    const parts = hostname.split('.');
    if (parts.length >= 3 && parts[0] !== 'www') {
      subdomain = parts[0];
    }
  }

  if (subdomain && !RESERVED_INFRA_SUBDOMAINS.has(subdomain)) {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = `/comercio/${subdomain}${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
