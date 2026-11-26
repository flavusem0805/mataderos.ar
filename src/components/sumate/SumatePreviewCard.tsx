'use client';

import { useState } from 'react';
import { ArrowUpRight, FileText, MapPin, Phone } from 'lucide-react';
import {
  publicAddressLabel,
  type SumateDesiredPlan,
  type SumateMode
} from '@/lib/slugs';
import { LOCATION_TYPE_LABELS, type LocationType } from '@/lib/emprendedores';

export interface SumatePreviewData {
  mode: SumateMode;
  desiredPlan: SumateDesiredPlan;
  displayName: string;
  slug: string;
  category: string;
  zoneOrFeria: string;
  locationType?: LocationType;
  addressOrPuesto: string;
  hoursSummary: string;
  tagline: string;
  whatsappNormalized: string;
  instagram?: string;
  hasPdfCatalog?: boolean;
}

export function SumatePreviewCard({ data }: { data: SumatePreviewData }) {
  const [view, setView] = useState<'sitio' | 'guia'>('sitio');

  const fallbackName =
    data.mode === 'comercio' ? 'Panadería Don José' : 'Taller Artesanal Mataderos';
  const name = data.displayName.trim() || fallbackName;
  const fallbackTagline =
    data.mode === 'comercio'
      ? 'Atención de cercanía en el barrio con horarios claros y contacto directo.'
      : 'Producción artesanal del barrio con pedidos por WhatsApp entre semana.';
  const tagline = data.tagline.trim() || fallbackTagline;
  const address =
    data.addressOrPuesto.trim() ||
    (data.mode === 'comercio'
      ? 'Av. Juan B. Alberdi 5920'
      : 'Feria de Mataderos · Pasillo central');
  const hours =
    data.hoursSummary.trim() ||
    (data.mode === 'comercio'
      ? 'Lun a Sáb 9:00 a 20:00 hs'
      : 'Domingos 11 a 19 hs · Entregas semanales');
  const zone = data.zoneOrFeria.trim() || 'Mataderos · Comuna 9';
  const addressUrl = publicAddressLabel(data.slug, data.mode);
  const isWebOficial = data.mode === 'comercio' && data.desiredPlan === 'web_oficial';
  const isFounder = data.mode === 'emprendedor' && data.desiredPlan === 'fundadores';

  return (
    <div className="border border-carbon bg-pampa-surface">
      <div className="border-b border-carbon/20 bg-pampa p-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-chicago">
              Vista previa en vivo
            </p>
            <p className="font-serif text-lg font-semibold leading-tight text-carbon">
              Así se ve cuando queda activo
            </p>
          </div>
          <div
            className="grid w-full grid-cols-2 gap-1.5 sm:w-auto"
            role="tablist"
            aria-label="Modo de vista previa"
          >
            <button
              type="button"
              role="tab"
              aria-selected={view === 'sitio'}
              onClick={() => setView('sitio')}
              className={`min-h-[48px] rounded-[4px] border px-3 text-sm font-semibold color-field ${
                view === 'sitio'
                  ? 'border-carbon bg-carbon text-pampa'
                  : 'border-carbon/35 bg-pampa-surface text-carbon hover:border-carbon'
              }`}
            >
              Sitio propio
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'guia'}
              onClick={() => setView('guia')}
              className={`min-h-[48px] rounded-[4px] border px-3 text-sm font-semibold color-field ${
                view === 'guia'
                  ? 'border-carbon bg-carbon text-pampa'
                  : 'border-carbon/35 bg-pampa-surface text-carbon hover:border-carbon'
              }`}
            >
              En la guía
            </button>
          </div>
        </div>
      </div>

      {view === 'guia' ? (
        <div className="p-5 sm:p-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-carbon/70">
            Tarjeta en{' '}
            {data.mode === 'comercio'
              ? '«Comercios del barrio» y /directorio'
              : '«Emprendedores verificados» y /directorio'}
          </p>

          <article className="mx-auto max-w-md border border-carbon bg-pampa p-5">
            {data.mode === 'emprendedor' && (
              <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wide text-chicago">
                <span>Verificado por Mataderos.ar</span>
                {isFounder && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Fundador</span>
                  </>
                )}
              </div>
            )}

            <p className="font-mono text-sm uppercase tracking-wider text-chicago">
              {data.category}
              {data.mode === 'emprendedor' && data.locationType
                ? ` · ${LOCATION_TYPE_LABELS[data.locationType]}`
                : ''}
            </p>

            <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight text-carbon">
              {name}
            </h3>

            <p className="mt-2 text-base text-carbon/85">{address}</p>
            <p className="mt-1 font-mono text-sm text-carbon/75">{hours}</p>
            <p className="mt-3 text-base leading-relaxed text-carbon/85">{tagline}</p>

            {isWebOficial && (
              <p className="mt-3 break-words font-mono text-sm font-semibold text-chicago">
                Web oficial · {addressUrl}
              </p>
            )}

            <div className="mt-5 grid gap-2 border-t border-carbon/15 pt-4">
              <div className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-4 font-semibold text-pampa">
                <span>
                  {data.whatsappNormalized
                    ? 'Escribir por WhatsApp'
                    : 'WhatsApp directo del negocio'}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              </div>
              {(isWebOficial || data.mode === 'emprendedor') && (
                <div className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] border border-carbon px-4 text-sm font-semibold text-carbon">
                  {data.mode === 'comercio' ? 'Ver web oficial' : 'Ver ficha completa'}
                </div>
              )}
            </div>
          </article>

          {data.mode === 'comercio' && !isWebOficial && (
            <p className="mt-4 border-l-2 border-chicago bg-pampa px-3 py-2 text-sm text-carbon/85">
              Con la <strong>Ficha gratuita</strong> ya apareces así en la guía y el mapa de zonas. Cambiá a <strong>Web oficial</strong> o tocá la pestaña «Sitio propio» para previsualizar tu subdominio dedicado.
            </p>
          )}
        </div>
      ) : (
        <div className="p-4 sm:p-6">
          <div className="overflow-hidden border border-carbon bg-pampa">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-carbon px-4 py-2.5 text-pampa">
              <span className="font-mono text-xs uppercase tracking-wider text-pampa/80">
                Portal Mataderos.ar
              </span>
              <span className="break-all font-mono text-xs font-semibold text-pampa">
                https://{addressUrl}
              </span>
            </div>

            {data.mode === 'comercio' ? (
              <div
                className={`border-b border-carbon/15 px-5 py-6 ${
                  isWebOficial ? 'bg-chicago text-pampa' : 'bg-pampa-deep text-carbon'
                }`}
              >
                <p
                  className={`font-mono text-xs uppercase tracking-wider ${
                    isWebOficial ? 'text-pampa/85' : 'text-chicago'
                  }`}
                >
                  {isWebOficial
                    ? `Web Oficial · ${data.category}`
                    : `Ficha en guía gratuita · ${data.category}`}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.85rem,4vw,2.6rem)] font-semibold uppercase leading-[0.94]">
                  {name}
                </h3>
                <p
                  className={`mt-2 font-serif text-lg leading-snug ${
                    isWebOficial ? 'text-pampa/90' : 'text-carbon/85'
                  }`}
                >
                  {tagline}
                </p>
              </div>
            ) : (
              <div className="border-b border-carbon/15 bg-pampa px-5 py-6">
                <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wider text-chicago">
                  <span>Verificado por Mataderos.ar</span>
                  {isFounder && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Fundador</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 font-display text-[clamp(1.85rem,4vw,2.6rem)] font-semibold uppercase leading-[0.94] text-carbon">
                  {name}
                </h3>
                <p className="mt-1 font-mono text-xs text-carbon/75">
                  {data.category} ·{' '}
                  {data.locationType ? LOCATION_TYPE_LABELS[data.locationType] : 'Mataderos'}
                </p>
                <p className="mt-3 font-serif text-lg leading-snug text-carbon/90">{tagline}</p>
              </div>
            )}

            <div className="space-y-4 bg-pampa-surface p-5">
              <div className="space-y-2 border-b border-carbon/15 pb-4 text-sm text-carbon">
                <p className="flex items-start gap-2 font-semibold">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    {address} · {zone}
                  </span>
                </p>
                <p className="pl-6 font-mono text-xs text-carbon/80">{hours}</p>
                {data.whatsappNormalized && (
                  <p className="flex items-center gap-2 font-mono text-xs text-carbon/80">
                    <Phone className="h-4 w-4 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
                    +{data.whatsappNormalized}
                  </p>
                )}
              </div>

              {data.mode === 'emprendedor' && data.hasPdfCatalog && (
                <div className="flex items-center gap-3 border border-carbon/20 bg-pampa p-3">
                  <FileText className="h-5 w-5 shrink-0 text-chicago" strokeWidth={1.5} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold uppercase text-carbon">
                      Catálogo PDF descargable
                    </p>
                    <p className="text-xs text-carbon/75">
                      Listo para compartir por WhatsApp desde el barrio
                    </p>
                  </div>
                </div>
              )}

              {data.mode === 'comercio' && isWebOficial && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="border border-carbon/20 bg-pampa p-3">
                    <p className="font-semibold text-carbon">Horarios y mapa</p>
                    <p className="mt-0.5 text-carbon/75">Cómo llegar en Google Maps</p>
                  </div>
                  <div className="border border-carbon/20 bg-pampa p-3">
                    <p className="font-semibold text-carbon">Servicios propios</p>
                    <p className="mt-0.5 text-carbon/75">Prioridad en Comercios</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[4px] bg-ladrillo px-4 text-sm font-semibold text-white">
                  Escribir por WhatsApp
                  <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="inline-flex min-h-[44px] items-center justify-center rounded-[4px] border border-carbon/40 px-4 text-sm font-semibold text-carbon">
                  Cómo llegar
                </span>
              </div>
            </div>
          </div>

          <p className="mt-3 font-mono text-xs leading-relaxed text-carbon/75">
            {data.mode === 'comercio'
              ? isWebOficial
                ? 'Con Web Oficial tenés esta dirección propia en .mataderos.ar más prioridad arriba de la guía.'
                : 'La ficha gratuita te publica en /directorio y la home; la Web Oficial en .mataderos.ar es optativa (precio TBD).'
              : 'Así queda tu landing pública en Mataderos.ar apenas confirmamos tu vínculo con el barrio.'}
          </p>
        </div>
      )}
    </div>
  );
}
