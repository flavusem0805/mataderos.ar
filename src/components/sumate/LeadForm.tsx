'use client';

import { type FormEvent, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowUpRight, Check } from 'lucide-react';
import { SUMATE_LEAD_FORM_COPY } from '@/content/sumate';
import { PORTAL_WHATSAPP_DISPLAY, whatsappUrl } from '@/lib/contact';
import { validateSumateLead } from '@/lib/slugs';
import { isSumatePlanId, SUMATE_PLANS, type SumatePlanId } from '@/lib/sumate-plans';
import { trackSumateEvent } from '@/lib/sumate-analytics';

interface LeadFormProps {
  initialPlan?: SumatePlanId;
  heading?: string;
  subtitle?: string;
  addressPlaceholder?: string;
  categoryPlaceholder?: string;
}

interface SubmitOutcome {
  whatsappHref: string;
  mode: 'db' | 'whatsapp_only';
}

export function LeadForm({
  initialPlan,
  heading = SUMATE_LEAD_FORM_COPY.title,
  subtitle = SUMATE_LEAD_FORM_COPY.subtitle,
  addressPlaceholder = 'Ej: Av. Alberdi 6200 o «Solo feria»',
  categoryPlaceholder = 'Ej: Veterinaria, cafetería, ferretería, artesanías'
}: LeadFormProps) {
  const formId = useId();
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [addressOrFeria, setAddressOrFeria] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [goal, setGoal] = useState('');
  const [planInteres, setPlanInteres] = useState<string>(initialPlan ?? '');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<SubmitOutcome | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const onSelectPlan = (event: Event) => {
      const custom = event as CustomEvent<{ planId?: string }>;
      if (isSumatePlanId(custom.detail?.planId)) {
        setPlanInteres(custom.detail.planId);
        setOutcome(null);
      }
    };
    window.addEventListener('mataderos:select-plan', onSelectPlan);
    return () => window.removeEventListener('mataderos:select-plan', onSelectPlan);
  }, []);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackSumateEvent('sumate_form_start', { plan_interes: planInteres || undefined });
  };

  const fallbackWhatsappHref = whatsappUrl(
    `Hola, quiero sumar mi comercio a Mataderos.ar.${
      businessName.trim() ? ` Negocio: ${businessName.trim()}.` : ''
    }${category.trim() ? ` Rubro: ${category.trim()}.` : ''}${
      addressOrFeria.trim() ? ` Dirección: ${addressOrFeria.trim()}.` : ''
    }`
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const check = validateSumateLead({
      businessName,
      category,
      addressOrFeria,
      whatsapp,
      goal: goal || undefined,
      planInteres: planInteres || undefined,
      acceptedTerms
    });

    if (!check.valid || !check.normalized) {
      setFieldErrors(check.fieldErrors);
      setFormError(check.errors[0] ?? 'Revisá los campos obligatorios.');
      trackSumateEvent('sumate_form_error', { reason: 'client_validation' });
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/sumate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'lead',
          ...check.normalized,
          website: websiteHoneypot
        })
      });

      const data = (await response.json()) as {
        ok?: boolean;
        mode?: 'db' | 'whatsapp_only';
        error?: string;
        fieldErrors?: Record<string, string>;
        whatsappHref?: string;
      };

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setFormError(data.error ?? 'No pudimos enviar el formulario.');
        trackSumateEvent('sumate_form_error', {
          reason: response.status === 429 ? 'rate_limit' : 'server_validation'
        });
        return;
      }

      const resolvedWaHref = data.whatsappHref ?? fallbackWhatsappHref;
      setOutcome({
        mode: data.mode === 'db' ? 'db' : 'whatsapp_only',
        whatsappHref: resolvedWaHref
      });
      trackSumateEvent('sumate_form_submit', { plan_interes: planInteres || undefined });
    } catch {
      setFormError('No pudimos conectar con el servidor en este momento.');
      trackSumateEvent('sumate_form_error', { reason: 'network_error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      aria-labelledby={`${formId}-heading`}
      className="section-pad border-b border-carbon/15 bg-pampa-surface"
    >
      <div className="editorial-container">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-sm uppercase tracking-wider text-chicago">
              {SUMATE_LEAD_FORM_COPY.eyebrow}
            </p>
            <h2
              id={`${formId}-heading`}
              className="mt-2 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold uppercase leading-[0.95] text-carbon"
            >
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-carbon/85">{subtitle}</p>

            <div className="mt-6 border border-carbon/20 bg-pampa p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-chicago">
                ¿Preferís escribir directo?
              </p>
              <p className="mt-2 text-base text-carbon/85">
                Nuestro WhatsApp comercial ({PORTAL_WHATSAPP_DISPLAY}) responde en el día.
              </p>
              <a
                href={fallbackWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackSumateEvent('sumate_whatsapp_click', {
                    location: 'form',
                    plan: planInteres || undefined
                  })
                }
                className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon bg-pampa-surface px-5 text-base font-semibold text-carbon hover:bg-carbon hover:text-pampa focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago color-field"
              >
                <span>Abrir WhatsApp ahora</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="border border-carbon bg-pampa p-6 sm:p-8 lg:col-span-7">
            {outcome ? (
              <div role="status" aria-live="polite" className="space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase text-chicago">
                  <Check className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  <span>Consulta registrada</span>
                </div>
                <p className="font-serif text-2xl font-semibold text-carbon">
                  {SUMATE_LEAD_FORM_COPY.successPrefix}
                </p>
                <p className="text-base leading-relaxed text-carbon/85">
                  {outcome.mode === 'db'
                    ? 'Guardamos tus datos para contactarte hoy. También podés abrir WhatsApp con el resumen precargado para acelerar la coordinación.'
                    : 'Armamos el resumen con tus 4 datos. Tocá el botón para enviarlo por WhatsApp en un segundo.'}
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={outcome.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackSumateEvent('sumate_whatsapp_click', {
                        location: 'form',
                        plan: planInteres || undefined
                      })
                    }
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon color-field"
                  >
                    <span>Enviar ahora por WhatsApp</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOutcome(null)}
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[4px] border border-carbon/35 bg-pampa-surface px-5 text-base font-semibold text-carbon hover:border-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot anti-spam oculto para lectores de pantalla y usuarios reales */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor={`${formId}-website`}>Sitio web</label>
                  <input
                    id={`${formId}-website`}
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteHoneypot}
                    onChange={(event) => setWebsiteHoneypot(event.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-plan`}
                    className="block font-mono text-xs uppercase tracking-wider text-carbon/80"
                  >
                    Plan de interés (opcional)
                  </label>
                  <select
                    id={`${formId}-plan`}
                    value={planInteres}
                    onFocus={markStarted}
                    onChange={(event) => setPlanInteres(event.target.value)}
                    className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/40 bg-pampa-surface px-4 text-base text-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                  >
                    <option value="">Todavía no elegí · Quiero asesoramiento</option>
                    {SUMATE_PLANS.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} ({plan.priceLabel} · {plan.priceNote})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${formId}-name`}
                      className="block text-base font-semibold text-carbon"
                    >
                      Nombre del negocio
                    </label>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      required
                      value={businessName}
                      placeholder="Ej: Ferretería El Gaucho"
                      aria-invalid={Boolean(fieldErrors.businessName)}
                      aria-describedby={fieldErrors.businessName ? `${formId}-name-err` : undefined}
                      onFocus={markStarted}
                      onChange={(event) => setBusinessName(event.target.value)}
                      className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/40 bg-pampa-surface px-4 text-base text-carbon placeholder:text-carbon/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                    />
                    {fieldErrors.businessName && (
                      <p
                        id={`${formId}-name-err`}
                        role="alert"
                        className="mt-1.5 text-sm font-medium text-ladrillo-dark"
                      >
                        {fieldErrors.businessName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-category`}
                      className="block text-base font-semibold text-carbon"
                    >
                      Rubro
                    </label>
                    <input
                      id={`${formId}-category`}
                      type="text"
                      required
                      value={category}
                      placeholder={categoryPlaceholder}
                      aria-invalid={Boolean(fieldErrors.category)}
                      aria-describedby={fieldErrors.category ? `${formId}-category-err` : undefined}
                      onFocus={markStarted}
                      onChange={(event) => setCategory(event.target.value)}
                      className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/40 bg-pampa-surface px-4 text-base text-carbon placeholder:text-carbon/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                    />
                    {fieldErrors.category && (
                      <p
                        id={`${formId}-category-err`}
                        role="alert"
                        className="mt-1.5 text-sm font-medium text-ladrillo-dark"
                      >
                        {fieldErrors.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor={`${formId}-address`}
                      className="block text-base font-semibold text-carbon"
                    >
                      Dirección (o «Solo feria»)
                    </label>
                    <input
                      id={`${formId}-address`}
                      type="text"
                      required
                      value={addressOrFeria}
                      placeholder={addressPlaceholder}
                      aria-invalid={Boolean(fieldErrors.addressOrFeria)}
                      aria-describedby={
                        fieldErrors.addressOrFeria ? `${formId}-address-err` : undefined
                      }
                      onFocus={markStarted}
                      onChange={(event) => setAddressOrFeria(event.target.value)}
                      className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/40 bg-pampa-surface px-4 text-base text-carbon placeholder:text-carbon/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                    />
                    {fieldErrors.addressOrFeria && (
                      <p
                        id={`${formId}-address-err`}
                        role="alert"
                        className="mt-1.5 text-sm font-medium text-ladrillo-dark"
                      >
                        {fieldErrors.addressOrFeria}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${formId}-wa`}
                      className="block text-base font-semibold text-carbon"
                    >
                      WhatsApp
                    </label>
                    <input
                      id={`${formId}-wa`}
                      type="tel"
                      inputMode="tel"
                      required
                      value={whatsapp}
                      placeholder="Ej: 11 5555-1234"
                      aria-invalid={Boolean(fieldErrors.whatsapp)}
                      aria-describedby={`${formId}-wa-help${
                        fieldErrors.whatsapp ? ` ${formId}-wa-err` : ''
                      }`}
                      onFocus={markStarted}
                      onChange={(event) => setWhatsapp(event.target.value)}
                      className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/40 bg-pampa-surface px-4 text-base text-carbon placeholder:text-carbon/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                    />
                    <p id={`${formId}-wa-help`} className="mt-1 text-xs text-carbon/70">
                      Te escribimos hoy a este número para coordinar 15 minutos.
                    </p>
                    {fieldErrors.whatsapp && (
                      <p
                        id={`${formId}-wa-err`}
                        role="alert"
                        className="mt-1 text-sm font-medium text-ladrillo-dark"
                      >
                        {fieldErrors.whatsapp}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-goal`}
                    className="block text-base font-semibold text-carbon"
                  >
                    ¿Qué querés resolver? (opcional)
                  </label>
                  <select
                    id={`${formId}-goal`}
                    value={goal}
                    onFocus={markStarted}
                    onChange={(event) => setGoal(event.target.value)}
                    className="mt-1.5 min-h-[48px] w-full rounded-[4px] border border-carbon/40 bg-pampa-surface px-4 text-base text-carbon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chicago"
                  >
                    <option value="">Elegí una opción si querés</option>
                    {SUMATE_LEAD_FORM_COPY.goals.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex min-h-[48px] cursor-pointer items-start gap-3 text-sm leading-relaxed text-carbon/90">
                    <input
                      id={`${formId}-terms`}
                      type="checkbox"
                      checked={acceptedTerms}
                      aria-invalid={Boolean(fieldErrors.acceptedTerms)}
                      aria-describedby={
                        fieldErrors.acceptedTerms ? `${formId}-terms-err` : undefined
                      }
                      onFocus={markStarted}
                      onChange={(event) => setAcceptedTerms(event.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 accent-chicago"
                    />
                    <span>
                      {SUMATE_LEAD_FORM_COPY.legalPrefix}{' '}
                      <Link
                        href="/privacidad"
                        className="font-semibold text-chicago underline underline-offset-4"
                      >
                        política de privacidad
                      </Link>{' '}
                      y los{' '}
                      <Link
                        href="/terminos"
                        className="font-semibold text-chicago underline underline-offset-4"
                      >
                        términos del portal
                      </Link>{' '}
                      para el tratamiento de mis datos.
                    </span>
                  </label>
                  {fieldErrors.acceptedTerms && (
                    <p
                      id={`${formId}-terms-err`}
                      role="alert"
                      className="mt-1 text-sm font-medium text-ladrillo-dark"
                    >
                      {fieldErrors.acceptedTerms}
                    </p>
                  )}
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="flex flex-col gap-2 border border-ladrillo bg-pampa-surface p-4 text-sm text-carbon"
                  >
                    <div className="flex items-start gap-2 font-semibold text-ladrillo-dark">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                      <span>{formError}</span>
                    </div>
                    <p>
                      {SUMATE_LEAD_FORM_COPY.errorPrefix}{' '}
                      <a
                        href={fallbackWhatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-chicago underline underline-offset-4"
                      >
                        abrir WhatsApp ({PORTAL_WHATSAPP_DISPLAY})
                      </a>
                      .
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[4px] bg-chicago px-6 text-base font-semibold text-pampa hover:bg-chicago-dark disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carbon sm:w-auto color-field"
                >
                  {submitting
                    ? SUMATE_LEAD_FORM_COPY.submittingLabel
                    : SUMATE_LEAD_FORM_COPY.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
