import type { Metadata } from 'next';
import Link from 'next/link';
import { NotaFrame } from '@/components/notas/NotaFrame';
import {
  OPERATOR_NAME,
  OPERATOR_URL,
  PORTAL_WHATSAPP_DISPLAY,
  whatsappUrl
} from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Política de privacidad · Mataderos.ar',
  description:
    'Cómo tratamos los datos personales en Mataderos.ar conforme a la Ley 25.326 de Protección de Datos Personales.',
  alternates: { canonical: 'https://mataderos.ar/privacidad' },
  openGraph: {
    title: 'Política de privacidad · Mataderos.ar',
    description: 'Política de privacidad y protección de datos personales de Mataderos.ar.',
    url: 'https://mataderos.ar/privacidad',
    locale: 'es_AR',
    type: 'website'
  }
};

export default function PrivacidadPage() {
  return (
    <NotaFrame>
      <article className="editorial-container py-10 sm:py-14">
        <nav aria-label="Miga de pan" className="font-mono text-base text-chicago">
          <Link href="/" className="inline-flex min-h-[48px] items-center underline underline-offset-4">
            Inicio
          </Link>
          <span className="mx-2 text-carbon/40" aria-hidden="true">
            /
          </span>
          <span className="text-carbon">Privacidad</span>
        </nav>

        <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold uppercase leading-[0.92]">
          Política de privacidad
        </h1>
        <p className="mt-3 font-mono text-base text-carbon/70">
          Última actualización: 22 de noviembre de 2026 · Ley 25.326 (República Argentina)
        </p>

        <div className="mt-10 max-w-[70ch] space-y-8 text-lg leading-relaxed">
          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">1. Responsable del tratamiento</h2>
            <p>
              El tratamiento de los datos personales recabados a través de Mataderos.ar es responsabilidad de{' '}
              <a
                href={OPERATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chicago underline underline-offset-4"
              >
                {OPERATOR_NAME}
              </a>
              , con canal de contacto directo por WhatsApp en{' '}
              <a
                href={whatsappUrl('Hola, consulto por privacidad y datos personales en Mataderos.ar')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-chicago underline underline-offset-4"
              >
                {PORTAL_WHATSAPP_DISPLAY}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">2. Qué datos solicitamos y para qué</h2>
            <p>
              Para publicar una ficha de emprendedor o comercio solicitamos únicamente los datos necesarios para el directorio: nombre del proyecto o titular, descripción de la oferta, ubicación aproximada o puesto de feria, número de WhatsApp comercial, enlaces a redes sociales, fotografías y, de forma opcional, un catálogo en formato PDF.
            </p>
            <p>
              <strong>Carácter público de la ficha:</strong> una vez verificada y publicada, el nombre del emprendimiento, el WhatsApp informado, las redes, las fotos y el catálogo quedan visibles públicamente en Mataderos.ar para que los vecinos puedan contactarte. No publiques datos personales que no quieras hacer visibles.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">3. Base legal y proveedores técnicos</h2>
            <p>
              Tratamos los datos con tu consentimiento expreso y para prestar el servicio de directorio barrial. Para el alojamiento y funcionamiento del sitio utilizamos infraestructura de terceros como Vercel y Supabase, cuyos servidores pueden estar ubicados fuera de la República Argentina bajo estándares de seguridad contractuales. No vendemos ni cedemos bases de datos a terceros con fines publicitarios.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">4. Conservación y menores de edad</h2>
            <p>
              Conservamos los datos mientras tu ficha permanezca activa en el portal o hasta que solicites su baja. El alta de perfiles está destinada exclusivamente a personas mayores de 18 años.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">5. Tus derechos (Ley 25.326)</h2>
            <p>
              Como titular de los datos personales tenés derecho a acceder, rectificar, actualizar o solicitar la supresión total de tu ficha y archivos en cualquier momento, escribiéndonos por WhatsApp al{' '}
              <a
                href={whatsappUrl('Hola, quiero actualizar o dar de baja mis datos en Mataderos.ar')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-chicago underline underline-offset-4"
              >
                {PORTAL_WHATSAPP_DISPLAY}
              </a>
              .
            </p>
            <p className="text-base text-carbon/80">
              La Agencia de Acceso a la Información Pública (AAIP), en su carácter de Órgano de Control de la Ley N.º 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.
            </p>
          </section>
        </div>
      </article>
    </NotaFrame>
  );
}
