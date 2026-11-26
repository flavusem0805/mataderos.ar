'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check
} from 'lucide-react';
import type { BusinessCategory, NeighborhoodZone } from '@/lib/data';
import {
  EMPRENDEDOR_CATEGORIES,
  LOCATION_TYPE_LABELS,
  type EmprendedorCategory,
  type LocationType
} from '@/lib/emprendedores';
import { PORTAL_WHATSAPP_DISPLAY, whatsappUrl } from '@/lib/contact';
import {
  checkSlugAvailability,
  formatWhatsappSummary,
  normalizeSlugByMode,
  normalizeWhatsappAr,
  publicAddressLabel,
  type SumateDesiredPlan,
  type SumateMode,
  validateSumatePayload
} from '@/lib/slugs';
import { SumatePreviewCard } from '@/components/sumate/SumatePreviewCard';

const COMERCIO_CATEGORIES: BusinessCategory[] = [
  'Mascotas',
  'Gastronomía',
  'Hogar y Ferretería',
  'Salud y Estética'
];

const COMERCIO_ZONES: NeighborhoodZone[] = [
  'Av. Alberdi',
  'Polo Emilio Castro',
  'Casco Histórico',
  'Av. Eva Perón'
];

const COMERCIO_HOUR_PRESETS = [
  'Lun a Sáb · 9:00 a 20:00 hs',
  'Lun a Vie · 9:00 a 18:00 hs',
  'Mar a Dom · 10:00 a 22:00 hs'
];

const EMPRENDEDOR_HOUR_PRESETS = [
  'Domingos en la Feria · 11 a 19 hs',
  'Domingos en Parque Alberdi + entregas',
  'Por pedido de lunes a sábado'
];

const LOCATION_TYPES: LocationType[] = ['feria_puesto', 'direccion', 'ambos', 'solo_redes'];

interface SumateBuilderProps {
  mode: SumateMode;
  takenSlugs: string[];
  initialName?: string;
  initialPlan?: SumateDesiredPlan;
}

interface SubmitResult {
  ok: boolean;
  mode: 'db' | 'whatsapp_only';
  submissionId: string | null;
  slug: string;
  whatsappSummary: string;
}

const INPUT_CLASS =
  'mt-2 min-h-[48px] w-full rounded-[4px] border border-carbon/35 bg-pampa px-4 text-base text-carbon placeholder:text-carbon/45 focus:border-chicago focus:outline-none';

export function SumateBuilder({
  mode,
  takenSlugs,
  initialName = '',
  initialPlan
}: SumateBuilderProps) {
  const defaultPlan: SumateDesiredPlan =
    initialPlan ?? (mode === 'comercio' ? 'ficha_gratuita' : 'fundadores');

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [desiredPlan, setDesiredPlan] = useState<SumateDesiredPlan>(defaultPlan);
  const [displayName, setDisplayName] = useState(initialName);
  const [customSlug, setCustomSlug] = useState('');
  const [editingSlug, setEditingSlug] = useState(false);

  const [category, setCategory] = useState<string>(
    mode === 'comercio' ? COMERCIO_CATEGORIES[0] : EMPRENDEDOR_CATEGORIES[0]
  );
  const [zoneOrFeria, setZoneOrFeria] = useState<string>(
    mode === 'comercio' ? COMERCIO_ZONES[0] : 'Feria de Mataderos'
  );
  const [locationType, setLocationType] = useState<LocationType>('feria_puesto');
  const [addressOrPuesto, setAddressOrPuesto] = useState('');
  const [hoursSummary, setHoursSummary] = useState('');
  const [tagline, setTagline] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [hasPdfCatalog, setHasPdfCatalog] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const slugSource = editingSlug ? customSlug : displayName;
  const slugCheck = useMemo(
    () => checkSlugAvailability(slugSource, takenSlugs, mode),
    [slugSource, takenSlugs, mode]
  );

  const normalizedWhatsapp = useMemo(() => normalizeWhatsappAr(whatsapp), [whatsapp]);

  const step1Done = displayName.trim().length >= 2 && slugCheck.available && category.length > 0;
  const step2Done = addressOrPuesto.trim().length >= 3 && hoursSummary.trim().length >= 3;
  const step3Done =
    tagline.trim().length >= 8 && normalizedWhatsapp.length >= 8 && acceptedTerms;

  const readyFieldsCount =
    (step1Done ? 1 : 0) +
    (addressOrPuesto.trim().length >= 3 ? 1 : 0) +
    (hoursSummary.trim().length >= 3 ? 1 : 0) +
    (tagline.trim().length >= 8 && normalizedWhatsapp.length >= 8 ? 1 : 0);

  const validation = useMemo(
    () =>
      validateSumatePayload(
        {
          mode,
          desiredPlan,
          displayName,
          slug: slugCheck.slug,
          category,
          zoneOrFeria,
          locationType: mode === 'emprendedor' ? locationType : undefined,
          addressOrPuesto,
          hoursSummary,
          tagline,
          whatsapp: normalizedWhatsapp,
          instagram,
          hasPdfCatalog,
          acceptedTerms
        },
        takenSlugs
      ),
    [
      mode,
      desiredPlan,
      displayName,
      slugCheck.slug,
      category,
      zoneOrFeria,
      locationType,
      addressOrPuesto,
      hoursSummary,
      tagline,
      normalizedWhatsapp,
      instagram,
      hasPdfCatalog,
      acceptedTerms,
      takenSlugs
    ]
  );

  const applySuggestion = (suggestedSlug: string) => {
    setEditingSlug(true);
    setCustomSlug(suggestedSlug);
    setSubmitError(null);
  };

  const resetBuilder = () => {
    setStep(1);
    setDisplayName('');
    setCustomSlug('');
    setEditingSlug(false);
    setAddressOrPuesto('');
    setHoursSummary('');
    setTagline('');
    setWhatsapp('');
    setInstagram('');
    setHasPdfCatalog(false);
    setAcceptedTerms(false);
    setSubmitError(null);
    setSubmitResult(null);
  };

  const handleCopySummary = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      // Fallback silencioso si el navegador bloquea el portapapeles
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!validation.valid || !validation.normalized) {
      setSubmitError(validation.errors[0] ?? 'Completá los datos requeridos.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/sumate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.normalized)
      });
      const json = (await response.json()) as Partial<SubmitResult> & { error?: string };

      if (!response.ok || !json.ok || !json.whatsappSummary) {
        setSubmitError(json.error ?? 'No pudimos validar la ficha. Revisá los campos.');
        return;
      }

      const result: SubmitResult = {
        ok: true,
        mode: json.mode === 'db' ? 'db' : 'whatsapp_only',
        submissionId: json.submissionId ?? null,
        slug: json.slug ?? validation.normalized.slug,
        whatsappSummary: json.whatsappSummary
      };
      setSubmitResult(result);

      if (result.mode === 'whatsapp_only' && typeof window !== 'undefined') {
        window.open(whatsappUrl(result.whatsappSummary), '_blank', 'noopener,noreferrer');
      }
    } catch {
      // Si falla la red, garantizamos igual el envío directo por WhatsApp con el resumen armado.
      const fallbackSummary = formatWhatsappSummary(validation.normalized);
      setSubmitResult({
        ok: true,
        mode: 'whatsapp_only',
        submissionId: null,
        slug: validation.normalized.slug,
        whatsappSummary: fallbackSummary
      });
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl(fallbackSummary), '_blank', 'noopener,noreferrer');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const addressDisplay = publicAddressLabel(slugCheck.slug, mode);
  const stepTabs: { id: 1 | 2 | 3; label: string; done: boolean }[] = [
    { id: 1, label: '01 · Identidad y web', done: step1Done },
    { id: 2, label: '02 · Lugar y horario', done: step2Done },
    { id: 3, label: '03 · Contacto y envío', done: step3Done }
  ];

  return (
    <div id="armar" className="border border-carbon bg-pampa-surface">
      <div className="border-b border-carbon/20 bg-pampa p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-chicago sm:text-sm">
              Activá tu lugar en 3 pasos · ~2 minutos
            </p>
            <h2 className="mt-1 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold uppercase leading-[0.94]">
              Probá y dejá lista tu publicación
            </h2>
          </div>
          <p className="font-mono text-sm font-semibold text-carbon">
            Paso {step} de 3 · {readyFieldsCount}/4 bloques listos
          </p>
        </div>

        <div
          className="mt-4 grid grid-cols-3 gap-2"
          aria-label={`Progreso: paso ${step} de 3`}
        >
          {[1, 2, 3].map((idx) => (
            <span
              key={idx}
              className={`h-2 border border-carbon/30 ${
                idx <= step ? 'bg-chicago' : 'bg-pampa-surface'
              }`}
            />
          ))}
        </div>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-3"
          role="tablist"
          aria-label="Pasos del constructor"
        >
          {stepTabs.map((tab) => {
            const active = step === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setStep(tab.id)}
                className={`flex min-h-[48px] items-center justify-between gap-2 rounded-[4px] border px-4 text-left font-mono text-sm font-semibold color-field ${
                  active
                    ? 'border-carbon bg-carbon text-pampa'
                    : 'border-carbon/30 bg-pampa-surface text-carbon hover:border-carbon'
                }`}
              >
                <span>{tab.label}</span>
                {tab.done && (
                  <Check
                    className={`h-4 w-4 shrink-0 ${active ? 'text-pampa' : 'text-chicago'}`}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-12 lg:items-start">
        <div className="space-y-6 lg:col-span-6">
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-carbon/75">
                  Elegí cómo querés arrancar
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {(mode === 'comercio'
                    ? [
                        {
                          id: 'ficha_gratuita' as const,
                          title: 'Ficha gratuita',
                          sub: 'En Comercios del barrio y directorio'
                        },
                        {
                          id: 'web_oficial' as const,
                          title: 'Web oficial (TBD)',
                          sub: 'Página propia en .mataderos.ar + prioridad'
                        }
                      ]
                    : [
                        {
                          id: 'fundadores' as const,
                          title: 'Primera Ronda · Fundadores',
                          sub: 'Gratis + 12 meses Pro bonificados'
                        },
                        {
                          id: 'gratis_verificado' as const,
                          title: 'Landing gratis permanente',
                          sub: 'Ficha verificada y PDF para WhatsApp'
                        }
                      ]
                  ).map((option) => {
                    const selected = desiredPlan === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setDesiredPlan(option.id)}
                        className={`min-h-[48px] rounded-[4px] border p-3.5 text-left color-field ${
                          selected
                            ? 'border-chicago bg-chicago text-pampa'
                            : 'border-carbon/30 bg-pampa text-carbon hover:border-carbon'
                        }`}
                      >
                        <span className="block font-serif text-lg font-semibold leading-tight">
                          {option.title}
                        </span>
                        <span
                          className={`mt-1 block text-sm ${
                            selected ? 'text-pampa/90' : 'text-carbon/75'
                          }`}
                        >
                          {option.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="sumate-display-name" className="block text-base font-semibold">
                  {mode === 'comercio'
                    ? 'Nombre del comercio'
                    : 'Nombre de tu emprendimiento o puesto'}
                </label>
                <input
                  id="sumate-display-name"
                  type="text"
                  value={displayName}
                  onChange={(e) => {
                    setDisplayName(e.target.value);
                    setSubmitError(null);
                  }}
                  placeholder={
                    mode === 'comercio'
                      ? 'Ej: Panadería Don José'
                      : 'Ej: Cerámica Barrio Naón'
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div className="border border-carbon/20 bg-pampa p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-carbon/75">
                    Tu dirección en Mataderos.ar
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editingSlug) {
                        setCustomSlug(
                          normalizeSlugByMode(displayName, mode) || ''
                        );
                      }
                      setEditingSlug((prev) => !prev);
                    }}
                    className="inline-flex min-h-[44px] items-center font-mono text-xs font-semibold text-chicago underline underline-offset-4"
                  >
                    {editingSlug ? 'Seguir el nombre automático' : 'Editar dirección manual'}
                  </button>
                </div>

                {editingSlug && (
                  <input
                    id="sumate-custom-slug"
                    type="text"
                    aria-label="Dirección web personalizada"
                    value={customSlug}
                    onChange={(e) =>
                      setCustomSlug(normalizeSlugByMode(e.target.value, mode))
                    }
                    placeholder={
                      mode === 'comercio' ? 'panaderiadonjose' : 'ceramica-naon'
                    }
                    className={`${INPUT_CLASS} font-mono`}
                  />
                )}

                <p className="mt-2 break-all font-mono text-base font-semibold text-chicago">
                  https://{addressDisplay}
                </p>

                {slugCheck.reason === 'ok' && (
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-xs font-semibold text-chicago">
                    <Check className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                    Disponible en Mataderos.ar
                  </p>
                )}

                {(slugCheck.reason === 'taken' || slugCheck.reason === 'reserved') && (
                  <div className="mt-3 border-l-2 border-ladrillo bg-pampa-surface p-3">
                    <p className="flex items-start gap-2 font-mono text-xs font-semibold text-ladrillo">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span>
                        {slugCheck.reason === 'taken'
                          ? 'Ese nombre web ya está en uso en el portal.'
                          : 'Ese nombre está reservado por el portal.'}
                      </span>
                    </p>
                    {slugCheck.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {slugCheck.suggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => applySuggestion(suggestion)}
                            className="inline-flex min-h-[44px] items-center rounded-[4px] border border-carbon/35 bg-pampa px-3 font-mono text-xs font-semibold text-carbon hover:border-carbon hover:bg-carbon hover:text-pampa color-field"
                          >
                            Usar {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {slugCheck.reason === 'too_short' && (
                  <p className="mt-2 font-mono text-xs text-ladrillo">
                    Escribí al menos 3 letras o números para reservar tu dirección.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="sumate-category" className="block text-base font-semibold">
                  Rubro principal
                </label>
                <select
                  id="sumate-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={INPUT_CLASS}
                >
                  {(mode === 'comercio'
                    ? COMERCIO_CATEGORIES
                    : EMPRENDEDOR_CATEGORIES
                  ).map((item: BusinessCategory | EmprendedorCategory) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              {mode === 'comercio' ? (
                <div>
                  <p className="text-base font-semibold">Zona o corredor de Mataderos</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {COMERCIO_ZONES.map((z) => {
                      const active = zoneOrFeria === z;
                      return (
                        <button
                          key={z}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setZoneOrFeria(z)}
                          className={`min-h-[48px] rounded-[4px] border px-4 text-left text-base font-semibold color-field ${
                            active
                              ? 'border-carbon bg-carbon text-pampa'
                              : 'border-carbon/30 bg-pampa text-carbon hover:border-carbon'
                          }`}
                        >
                          {z}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-base font-semibold">¿Cómo te encuentran los vecinos?</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {LOCATION_TYPES.map((lt) => {
                      const active = locationType === lt;
                      return (
                        <button
                          key={lt}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setLocationType(lt);
                            setZoneOrFeria(
                              lt === 'feria_puesto' || lt === 'ambos'
                                ? 'Feria de Mataderos'
                                : 'Mataderos · Comuna 9'
                            );
                          }}
                          className={`min-h-[48px] rounded-[4px] border px-4 text-left text-base font-semibold color-field ${
                            active
                              ? 'border-carbon bg-carbon text-pampa'
                              : 'border-carbon/30 bg-pampa text-carbon hover:border-carbon'
                          }`}
                        >
                          {LOCATION_TYPE_LABELS[lt]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="sumate-address" className="block text-base font-semibold">
                  {mode === 'comercio'
                    ? 'Dirección exacta del local'
                    : 'Feria, puesto o referencia en Mataderos'}
                </label>
                <input
                  id="sumate-address"
                  type="text"
                  value={addressOrPuesto}
                  onChange={(e) => setAddressOrPuesto(e.target.value)}
                  placeholder={
                    mode === 'comercio'
                      ? 'Ej: Av. Juan B. Alberdi 5920 (entre Cafayate y Pilar)'
                      : 'Ej: Feria de Mataderos · Pasillo central, o zona Parque Alberdi'
                  }
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="sumate-hours" className="block text-base font-semibold">
                  Días y horarios de atención
                </label>
                <input
                  id="sumate-hours"
                  type="text"
                  value={hoursSummary}
                  onChange={(e) => setHoursSummary(e.target.value)}
                  placeholder={
                    mode === 'comercio'
                      ? 'Ej: Lun a Sáb de 9:00 a 20:00 hs'
                      : 'Ej: Domingos de 11 a 19 hs · Entregas en la semana'
                  }
                  className={INPUT_CLASS}
                />
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {(mode === 'comercio'
                    ? COMERCIO_HOUR_PRESETS
                    : EMPRENDEDOR_HOUR_PRESETS
                  ).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHoursSummary(preset)}
                      className="min-h-[44px] rounded-[4px] border border-carbon/30 bg-pampa px-3 font-mono text-xs font-medium text-carbon hover:border-carbon color-field"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="sumate-tagline" className="block text-base font-semibold">
                  Qué ofrecés (en 1 o 2 líneas)
                </label>
                <textarea
                  id="sumate-tagline"
                  rows={3}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder={
                    mode === 'comercio'
                      ? 'Ej: Pan de masa madre, facturas de manteca y envíos en el día dentro de Mataderos.'
                      : 'Ej: Mates de algarrobo grabados a mano y bombillas de alpaca por encargo.'
                  }
                  className="mt-2 w-full rounded-[4px] border border-carbon/35 bg-pampa p-4 text-base text-carbon placeholder:text-carbon/45 focus:border-chicago focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="sumate-whatsapp" className="block text-base font-semibold">
                    WhatsApp de contacto
                  </label>
                  <input
                    id="sumate-whatsapp"
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="Ej: 11 4687-1234"
                    className={INPUT_CLASS}
                  />
                  {normalizedWhatsapp.length >= 8 && (
                    <p className="mt-1.5 font-mono text-xs text-chicago">
                      Enlace directo: wa.me/{normalizedWhatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="sumate-instagram" className="block text-base font-semibold">
                    Instagram (opcional)
                  </label>
                  <input
                    id="sumate-instagram"
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Ej: @tulocal.mataderos"
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              {mode === 'emprendedor' && (
                <label className="flex min-h-[48px] cursor-pointer items-start gap-3 border border-carbon/20 bg-pampa p-3.5 text-base">
                  <input
                    type="checkbox"
                    checked={hasPdfCatalog}
                    onChange={(e) => setHasPdfCatalog(e.target.checked)}
                    className="mt-1 h-5 w-5 shrink-0 accent-chicago"
                  />
                  <span>
                    Tengo catálogo en PDF o fotos propias para sumar apenas abramos el chat.
                  </span>
                </label>
              )}

              <label className="flex min-h-[48px] cursor-pointer items-start gap-3 border border-carbon/25 bg-pampa p-3.5 text-sm leading-relaxed">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    setSubmitError(null);
                  }}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-chicago"
                />
                <span>
                  Acepto los{' '}
                  <Link href="/terminos" className="text-chicago underline underline-offset-4">
                    Términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link href="/privacidad" className="text-chicago underline underline-offset-4">
                    Política de privacidad
                  </Link>{' '}
                  (los datos publicados quedarán visibles para los vecinos tras la revisión editorial).
                </span>
              </label>

              {submitError && (
                <p
                  role="alert"
                  className="flex items-start gap-2 border-l-2 border-ladrillo bg-pampa p-3 font-mono text-sm text-ladrillo"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>{submitError}</span>
                </p>
              )}

              {submitResult ? (
                <div className="border border-chicago bg-pampa p-5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wider text-chicago">
                    {submitResult.mode === 'db'
                      ? 'Solicitud guardada en revisión'
                      : 'Ficha armada y lista para enviar'}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-carbon">
                    {submitResult.mode === 'db'
                      ? `Recibimos ${displayName.trim()} (${addressDisplay})`
                      : `Ya podés mandar tu ficha de ${displayName.trim()}`}
                  </h3>
                  {submitResult.submissionId && (
                    <p className="mt-1 font-mono text-xs text-carbon/75">
                      Código de seguimiento: {submitResult.submissionId}
                    </p>
                  )}
                  <p className="mt-2 text-base text-carbon/85">
                    {submitResult.mode === 'db'
                      ? 'Nuestro equipo revisa tu vínculo con el barrio y te avisa cuando quede activo. Si querés agilizarlo, escribinos por WhatsApp.'
                      : `Si no se abrió WhatsApp automáticamente, tocá el botón de abajo o copiá el resumen estructurado para mandarlo al ${PORTAL_WHATSAPP_DISPLAY}.`}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={whatsappUrl(submitResult.whatsappSummary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa hover:bg-chicago-dark color-field"
                    >
                      {submitResult.mode === 'db'
                        ? 'Avisar por WhatsApp'
                        : 'Abrir WhatsApp con la ficha'}
                      <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopySummary(submitResult.whatsappSummary)}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-carbon px-4 font-semibold text-carbon hover:bg-carbon hover:text-pampa color-field"
                    >
                      {copiedSummary ? 'Resumen copiado' : 'Copiar resumen'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark disabled:opacity-60 color-field"
                  >
                    {submitting
                      ? 'Validando solicitud...'
                      : 'Enviar ficha armada por WhatsApp / revisión'}
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  </button>
                  {!validation.valid && (
                    <p className="font-mono text-xs text-carbon/75">
                      Para activar tu sitio faltan completar los datos obligatorios ({validation.errors[0]}).
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-carbon/15 pt-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon/35 px-4 font-semibold text-carbon hover:border-carbon color-field"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                Paso anterior
              </button>
            ) : (
              <button
                type="button"
                onClick={resetBuilder}
                className="inline-flex min-h-[48px] items-center font-mono text-xs text-carbon/70 underline underline-offset-4 hover:text-carbon"
              >
                Limpiar datos
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-carbon px-5 font-semibold text-pampa hover:bg-chicago color-field"
              >
                {step === 1 ? 'Siguiente: lugar y horarios' : 'Siguiente: oferta y envío'}
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:col-span-6">
          <SumatePreviewCard
            data={{
              mode,
              desiredPlan,
              displayName,
              slug: slugCheck.slug,
              category,
              zoneOrFeria,
              locationType: mode === 'emprendedor' ? locationType : undefined,
              addressOrPuesto,
              hoursSummary,
              tagline,
              whatsappNormalized: normalizedWhatsapp,
              instagram,
              hasPdfCatalog
            }}
          />
        </div>
      </div>
    </div>
  );
}
