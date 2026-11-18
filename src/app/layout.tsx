import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Mataderos.ar — Comunidad Barrial, Noticias y Guía de Comercios',
  description:
    'El portal de Mataderos, Comuna 9 (CABA). Nuevas aperturas, agenda de la Feria y La Recova, historia viva y presencia digital con subdominio propio para comercios del barrio.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={plusJakarta.variable}>
      <body className="min-h-screen bg-pampa text-carbon antialiased">{children}</body>
    </html>
  );
}
