/**
 * Cine Teatro El Plata — Instagram oficial.
 * Perfil: https://www.instagram.com/cineteatroelplata/
 *
 * CONFIGURACIÓN DEL DUEÑO
 * Pegá abajo hasta 3 URLs de publicaciones públicas recientes.
 * Sirven notas y reels:
 *   https://www.instagram.com/p/XXXXXXXXXXX/
 *   https://www.instagram.com/reel/XXXXXXXXXXX/
 *
 * No descargues ni subas las fotos del teatro a este repo.
 * El embed usa el bloque oficial de Instagram (blockquote.instagram-media
 * y embed.js) recién cuando alguien pide ver la publicación.
 *
 * Si el array queda vacío, la nota sigue con la foto acreditada
 * (avenida de los Corrales, Ch nch, CC BY-SA 3.0) y el botón al perfil.
 * Desde este entorno el perfil redirige al login, así que no se pudieron
 * elegir publicaciones.
 */
export const EL_PLATA_INSTAGRAM_PROFILE = 'https://www.instagram.com/cineteatroelplata/';

export const EL_PLATA_INSTAGRAM_HANDLE = '@cineteatroelplata';

export const EL_PLATA_INSTAGRAM_POSTS: string[] = [
  // 'https://www.instagram.com/p/PEGAR_EL_CODIGO/',
  // 'https://www.instagram.com/reel/PEGAR_EL_CODIGO/',
];

const POST_URL = /^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?/;

export function elPlataPostUrls(limit = 3): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const raw of EL_PLATA_INSTAGRAM_POSTS) {
    const trimmed = raw.trim();
    if (!POST_URL.test(trimmed) || trimmed.includes('PEGAR_EL_CODIGO')) continue;
    const permalink = trimmed.split('?')[0].replace(/\/?$/, '/');
    if (seen.has(permalink)) continue;
    seen.add(permalink);
    urls.push(permalink);
    if (urls.length >= limit) break;
  }
  return urls;
}
