import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mataderos.ar — Comunidad Barrial, Noticias y Guía de Comercios',
  description:
    'El portal de Mataderos, Comuna 9 (CABA). Nuevas aperturas, agenda de la Feria y La Recova, historia viva y Web Oficial para comercios del barrio.'
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
