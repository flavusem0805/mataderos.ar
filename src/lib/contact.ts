export const PORTAL_WHATSAPP_NUMBER = '5491135605731';
export const PORTAL_WHATSAPP_DISPLAY = '+54 9 11 3560-5731';
export const PORTAL_EMAIL = 'info@mataderos.ar';
export const PORTAL_DOMAIN = 'mataderos.ar';
export const PORTAL_URL = 'https://mataderos.ar';
export const OPERATOR_NAME = 'Atipika Digital';
export const OPERATOR_URL = 'https://atipikadigital.com';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${PORTAL_WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject?: string, body?: string): string {
  const params: string[] = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${PORTAL_EMAIL}${query}`;
}
