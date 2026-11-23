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
  title: 'Términos y condiciones · Mataderos.ar',
  description:
    'Condiciones de uso del portal Mataderos.ar, alcance de la verificación de emprendedores y comercios, y marco legal.',
  alternates: { canonical: 'https://mataderos.ar/terminos' },
  openGraph: {
    title: 'Términos y condiciones · Mataderos.ar',
    description: 'Condiciones de uso del portal barrial Mataderos.ar.',
    url: 'https://mataderos.ar/terminos',
    locale: 'es_AR',
    type: 'website'
  }
};

export default function TerminosPage() {
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
          <span className="text-carbon">Términos</span>
        </nav>

        <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.5rem,7vw,4.5rem)] font-semibold uppercase leading-[0.92]">
          Términos y condiciones
        </h1>
        <p className="mt-3 font-mono text-base text-carbon/70">
          Última actualización: 22 de noviembre de 2026 · Operado por {OPERATOR_NAME}
        </p>

        <div className="mt-10 max-w-[70ch] space-y-8 text-lg leading-relaxed">
          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">1. Qué es Mataderos.ar</h2>
            <p>
              Mataderos.ar es un portal editorial y directorio independiente de la Comuna 9 (Ciudad Autónoma de Buenos Aires), desarrollado y operado por{' '}
              <a
                href={OPERATOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chicago underline underline-offset-4"
              >
                {OPERATOR_NAME}
              </a>
              . No depende ni representa al Gobierno de la Ciudad Autónoma de Buenos Aires, a la administración de la Feria de Mataderos ni a ningún organismo público.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">2. Qué significa «Verificado por Mataderos.ar»</h2>
            <p>
              La insignia «Verificado por Mataderos.ar» indica únicamente que el equipo editorial revisó de forma humana los datos presentados por el emprendedor o feriante y constató indicios razonables de que se trata de un proyecto real vinculado al barrio o a la Feria.
            </p>
            <p>
              No constituye un certificado municipal, una habilitación comercial, un control bromatológico ni una garantía sobre la calidad, el precio o la entrega de los productos o servicios ofrecidos.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">3. Responsabilidad sobre publicaciones y operaciones</h2>
            <p>
              Cada emprendedor o comercio es el único responsable de la veracidad de los textos, precios, horarios, fotos, catálogos en PDF y medios de contacto que brinda para su publicación, así como de contar con los derechos sobre las imágenes que entrega.
            </p>
            <p>
              Mataderos.ar no es intermediario comercial ni procesa cobros entre vecinos y oferentes. Toda compra, reserva, entrega o reclamo se acuerda y resuelve exclusivamente fuera de la plataforma entre el visitante y el emprendedor o comercio.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">4. Gratuidad, Primera Ronda Fundadores y planes pagos</h2>
            <p>
              La ficha básica de emprendedores verificados y la ficha básica de comercios en la guía son gratuitas y permanentes. Nunca se cobra el alta ni se da de baja una ficha gratuita para forzar la contratación de un plan pago.
            </p>
            <p>
              Los beneficios de la Primera Ronda (Fundadores) son una cortesía promocional no transferible para los primeros proyectos verificados. Al finalizar el período bonificado de 12 meses, el perfil continúa en línea en su modalidad gratuita salvo que el titular decida contratar funciones adicionales vigentes al momento de la renovación.
            </p>
            <p>
              Los planes pagos (Web Oficial con subdominio, plan Pro, destacados o servicios a medida de {OPERATOR_NAME}) se acuerdan de forma expresa con precios publicados o cotizados previamente.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">5. Moderación, bajas y renovación</h2>
            <p>
              {OPERATOR_NAME} puede rechazar, suspender o retirar sin previo aviso cualquier perfil que incluya contenido ilegal, engañoso, ofensivo, suplantación de identidad, sellos falsos de organismos públicos o datos de terceros sin autorización.
            </p>
            <p>
              Para mantener el directorio actualizado, podemos solicitar una confirmación periódica cada 6 meses. Los perfiles que no confirmen continuidad pueden archivarse temporalmente hasta que el titular solicite reactivarlos.
            </p>
          </section>

          <section className="space-y-3 border-t border-carbon/15 pt-6">
            <h2 className="font-serif text-2xl font-semibold">6. Contacto y ley aplicable</h2>
            <p>
              Ante cualquier consulta, solicitud de baja o reclamo, podés escribirnos por WhatsApp al{' '}
              <a
                href={whatsappUrl('Hola, tengo una consulta sobre los términos de Mataderos.ar')}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-chicago underline underline-offset-4"
              >
                {PORTAL_WHATSAPP_DISPLAY}
              </a>
              . Estos términos se rigen por las leyes de la República Argentina, con jurisdicción en los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.
            </p>
          </section>
        </div>
      </article>
    </NotaFrame>
  );
}
