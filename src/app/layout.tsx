import type { Metadata } from 'next';
import {
  Big_Shoulders,
  Fraunces,
  IBM_Plex_Mono,
  Source_Sans_3
} from 'next/font/google';
import './globals.css';

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap'
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap'
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap'
});

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
    <html
      lang="es-AR"
      className={`${bigShoulders.variable} ${fraunces.variable} ${sourceSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen bg-pampa font-sans text-carbon antialiased">{children}</body>
    </html>
  );
}
