export const PORTAL_WHATSAPP_NUMBER = '5491135605731';
export const PORTAL_WHATSAPP_DISPLAY = '+54 9 11 3560-5731';
export const OPERATOR_NAME = 'Atipika Digital';
export const OPERATOR_URL = 'https://atipikadigital.com';

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${PORTAL_WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
