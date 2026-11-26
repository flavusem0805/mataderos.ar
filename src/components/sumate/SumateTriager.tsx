'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type WorkKind = 'local' | 'feria' | 'oficio';
type GoalKind = 'guia_gratis' | 'web_propia' | 'catalogo_wa';

export function SumateTriager() {
  const [workKind, setWorkKind] = useState<WorkKind>('local');
  const [goalKind, setGoalKind] = useState<GoalKind>('guia_gratis');

  const recommendation = (() => {
    if (workKind === 'local') {
      if (goalKind === 'web_propia') {
        return {
          badge: 'Camino sugerido · Comercios · Web Oficial',
          title: 'Te conviene Web Oficial en tunombre.mataderos.ar',
          body: 'Conservás tu ficha gratuita en la guía y sumás página propia con subdominio, horarios, servicios y prioridad arriba de todo.',
          href: '/sumate/comercios?plan=web_oficial#armar',
          cta: 'Armar previa de mi Web Oficial en 3 pasos'
        };
      }
      return {
        badge: 'Camino sugerido · Comercios · Ficha gratuita',
        title: 'Arrancá con la Ficha gratuita en Comercios del barrio',
        body: 'Cargás dirección, horario y WhatsApp en 2 minutos para aparecer en la guía y el mapa por corredores sin pagar el alta.',
        href: '/sumate/comercios?plan=ficha_gratuita#armar',
        cta: 'Armar mi ficha de comercio en 3 pasos'
      };
    }

    if (goalKind === 'web_propia') {
      return {
        badge: 'Camino sugerido · Primera Ronda Fundadores',
        title: 'Emprendedores verificados (Primera Ronda Fundadores)',
        body: 'Te damos landing gratuita en Mataderos.ar para siempre y 12 meses bonificados de funciones Pro, incluido el avance hacia subdominio propio.',
        href: '/sumate/emprendedores?plan=fundadores#armar',
        cta: 'Armar mi ficha de emprendedor en 3 pasos'
      };
    }

    return {
      badge: 'Camino sugerido · Emprendedores y feriantes',
      title: 'Sumate a Emprendedores del barrio verificados',
      body: 'Ideal para puestos de Feria, taller propio o venta entre semana: tenés link compartible, fotos, catálogo en PDF y sello verificado.',
      href: '/sumate/emprendedores?plan=fundadores#armar',
      cta: 'Armar mi landing en 3 pasos'
    };
  })();

  return (
    <div className="mt-10 border border-carbon bg-pampa-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-carbon/15 pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-chicago">
            Orientador rápido
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-carbon">
            ¿Dudas sobre qué camino elegir? Respondé dos preguntas
          </h2>
        </div>
        <span className="font-mono text-xs text-carbon/70">Te lleva directo al paso 1</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-carbon/80">
              1. ¿Cómo trabajás hoy en Mataderos?
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[
                { id: 'local' as const, label: 'Local a la calle' },
                { id: 'feria' as const, label: 'Puesto en Feria' },
                { id: 'oficio' as const, label: 'Taller u oficio' }
              ].map((opt) => {
                const active = workKind === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setWorkKind(opt.id)}
                    className={`min-h-[48px] rounded-[4px] border px-3 text-sm font-semibold color-field ${
                      active
                        ? 'border-carbon bg-carbon text-pampa'
                        : 'border-carbon/30 bg-pampa text-carbon hover:border-carbon'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-carbon/80">
              2. ¿Qué necesitás resolver primero?
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {[
                { id: 'guia_gratis' as const, label: 'Figurar en la guía gratis' },
                { id: 'web_propia' as const, label: 'Tener dirección .mataderos.ar' },
                { id: 'catalogo_wa' as const, label: 'Pasar catálogo por WhatsApp' }
              ].map((opt) => {
                const active = goalKind === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setGoalKind(opt.id)}
                    className={`min-h-[48px] rounded-[4px] border px-3 text-sm font-semibold color-field ${
                      active
                        ? 'border-carbon bg-carbon text-pampa'
                        : 'border-carbon/30 bg-pampa text-carbon hover:border-carbon'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border border-chicago/40 bg-pampa p-5 lg:col-span-5">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-chicago">
              {recommendation.badge}
            </p>
            <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-carbon">
              {recommendation.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-carbon/85">
              {recommendation.body}
            </p>
          </div>
          <div className="mt-5">
            <Link
              href={recommendation.href}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-chicago px-4 text-center font-semibold text-pampa hover:bg-chicago-dark color-field"
            >
              <span>{recommendation.cta}</span>
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
