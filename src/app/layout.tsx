import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from 'next/font/google';
import './globals.css';

// Big Shoulders Display is not in this Next.js Google font catalog
// (the bundled name is the later "Big Shoulders" variable family).
// The file is the real Display cut, loaded with next/font.
const display = localFont({
  src: '../fonts/big-shoulders-display-latin.woff2',
  weight: '600 800',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Arial Narrow', 'sans-serif']
});

const serif = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
});

const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mataderos.ar'),
  title: 'Mataderos.ar — Comunidad Barrial, Noticias y Guía de Comercios',
  description:
    'El portal de Mataderos, Comuna 9 (CABA). Nuevas aperturas, agenda de la Feria y La Recova, historia viva y Web Oficial para comercios del barrio.',
  openGraph: {
    title: 'Mataderos.ar — Comunidad Barrial, Noticias y Guía de Comercios',
    description:
      'Comercios de cercanía, oficios del barrio, aperturas y memoria viva entre La Recova, Emilio Castro y Avenida Alberdi.',
    url: 'https://mataderos.ar',
    siteName: 'Mataderos.ar',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1024,
        height: 571,
        alt: 'Mataderos.ar — Emblema Oficial del Barrio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mataderos.ar — Comunidad Barrial y Guía de Comercios',
    description:
      'Comercios de cercanía, oficios, aperturas y memoria viva de Mataderos, Comuna 9.',
    images: ['/og-image.jpg']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-pampa font-sans text-carbon antialiased">{children}</body>
    </html>
  );
}
