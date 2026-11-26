export type SumateCtaLocation =
  | 'hero'
  | 'how'
  | 'plans'
  | 'founders'
  | 'faq'
  | 'final'
  | 'sponsors'
  | 'form';

export type SumateAnalyticsEventMap = {
  sumate_view: { page?: 'sumate' | 'comercios' | 'emprendedores' | 'sponsors' };
  sumate_cta_click: { location: SumateCtaLocation; plan?: string };
  sumate_plan_view: { plan: string };
  sumate_plan_cta: { plan: string };
  sumate_form_start: { plan_interes?: string };
  sumate_form_submit: { plan_interes?: string };
  sumate_form_error: { reason: string };
  sumate_whatsapp_click: { location: SumateCtaLocation; plan?: string };
  sumate_sponsor_cta: { location?: SumateCtaLocation };
};

export type SumateAnalyticsEventName = keyof SumateAnalyticsEventMap;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Envía eventos de conversión sin PII ni dependencias externas.
 * Compatible con GA4 (`gtag`), Tag Manager (`dataLayer`) y listeners locales (`mataderos:analytics`).
 */
export function trackSumateEvent<K extends SumateAnalyticsEventName>(
  name: K,
  params?: SumateAnalyticsEventMap[K]
): void {
  if (typeof window === 'undefined') return;

  const cleanParams: Record<string, string> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string' && value.trim()) {
        cleanParams[key] = value.trim();
      }
    }
  }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, cleanParams);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...cleanParams });
    }
    window.dispatchEvent(
      new CustomEvent('mataderos:analytics', {
        detail: { event: name, params: cleanParams }
      })
    );
  } catch {
    // Nunca interrumpir la interacción del usuario si un bloqueador impide analytics.
  }
}
