import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-pampa font-sans text-carbon antialiased">{children}</body>
    </html>
  );
}
