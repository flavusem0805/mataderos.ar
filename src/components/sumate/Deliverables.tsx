import Image from 'next/image';
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  MapPin,
  Phone,
  Search,
  Store,
  X
} from 'lucide-react';
import { SUMATE_DELIVERABLES } from '@/content/sumate';
import { FOTOS } from '@/lib/notas/media';
import { RevealOnScroll } from '@/components/sumate/RevealOnScroll';

interface DeliverablesProps {
  className?: string;
}

const DELIVERABLE_ICONS = [Search, MapPin, FileText, Calendar, Phone, Store] as const;

export function Deliverables({ className = '' }: DeliverablesProps) {
  return (
    <section
      id="que-hacemos"
      aria-labelledby="que-hacemos-heading"
      className={`section-pad border-b border-carbon/15 bg-pampa-surface ${className}`.trim()}
    >
      <div className="editorial-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="font-mono text-sm uppercase tracking-wider text-chicago">
              {SUMATE_DELIVERABLES.eyebrow}
            </p>
            <h2
              id="que-hacemos-heading"
              className="mt-2 max-w-[22ch] font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
            >
              {SUMATE_DELIVERABLES.title}
            </h2>
            <p className="mt-3 max-w-[58ch] text-lg leading-relaxed text-carbon/85">
              {SUMATE_DELIVERABLES.subtitle}
            </p>

            <ul className="mt-7 grid gap-3.5 sm:grid-cols-2">
              {SUMATE_DELIVERABLES.items.map((item, idx) => {
                const Icon = DELIVERABLE_ICONS[idx % DELIVERABLE_ICONS.length];
                return (
                  <li key={item}>
                    <RevealOnScroll delayMs={idx * 60} className="h-full">
                      <div className="sumate-card-lift flex h-full items-start gap-3.5 border border-carbon/25 bg-pampa p-4 text-base leading-snug text-carbon hover:border-chicago">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-chicago/35 bg-pampa-surface text-chicago">
                          <Icon className="h-4 w-4" strokeWidth={1.85} aria-hidden="true" />
                        </span>
                        <span className="pt-0.5">{item}</span>
                      </div>
                    </RevealOnScroll>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contraste visual directo (Antes -> Con Mataderos.ar) sin exigir lectura larga */}
          <RevealOnScroll delayMs={120} className="lg:col-span-5">
            <div className="space-y-3">
              <div className="border border-dashed border-carbon/40 bg-pampa p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ladrillo-dark">
                  Hoy sin ordenar
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-carbon/80">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-ladrillo" strokeWidth={2} aria-hidden="true" />
                    <span>Horarios dudosos en Google y links dispersos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-ladrillo" strokeWidth={2} aria-hidden="true" />
                    <span>Instagram solo muestra a quien ya te sigue</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-center text-chicago" aria-hidden="true">
                <span className="inline-flex h-8 w-8 items-center justify-center border border-chicago/40 bg-pampa">
                  <ChevronDown className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>

              <div className="border-2 border-carbon bg-pampa">
                <div className="sumate-photo-zoom relative aspect-[16/9] w-full border-b border-carbon bg-carbon">
                  <Image
                    src={FOTOS.baile.src}
                    alt={FOTOS.baile.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 36vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/75 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-3 top-3 bg-chicago px-2.5 py-1 font-mono text-[11px] font-semibold uppercase text-pampa">
                    Con Mataderos.ar · Simulación ilustrativa
                  </span>
                  <span className="absolute bottom-2.5 left-3 font-mono text-[11px] text-pampa/90">
                    Fotos reales + Google + QR de mostrador
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <ul className="space-y-2 border-b border-carbon/15 pb-3.5 text-sm text-carbon">
                    <li className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <Check className="h-4 w-4 text-chicago" strokeWidth={2} aria-hidden="true" />
                        <span>Guía del barrio + perfil de Google al día</span>
                      </span>
                      <span className="font-mono text-xs text-chicago">Activo</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <Check className="h-4 w-4 text-chicago" strokeWidth={2} aria-hidden="true" />
                        <span>Catálogo o menú en un solo link</span>
                      </span>
                      <span className="font-mono text-xs text-chicago">Listo</span>
                    </li>
                    <li className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <Check className="h-4 w-4 text-chicago" strokeWidth={2} aria-hidden="true" />
                        <span>Consultas medidas cada mes</span>
                      </span>
                      <span className="font-mono text-xs text-chicago">Reporte</span>
                    </li>
                  </ul>

                  <div className="mt-3.5 flex items-center justify-between gap-3 border border-carbon/20 bg-pampa-surface p-3">
                    <p className="font-serif text-base font-semibold text-carbon">
                      El vecino te encuentra y te escribe
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-[4px] bg-chicago px-3 py-1.5 font-mono text-xs font-semibold text-pampa">
                      <span>WhatsApp</span>
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>

              <p className="px-1 font-mono text-[11px] text-carbon/65">
                Foto: {FOTOS.baile.author} ({FOTOS.baile.license})
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
