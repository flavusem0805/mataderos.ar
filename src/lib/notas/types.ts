import type { Foto, FotoId } from './media';

export type NotaTipo = 'pilar' | 'satelite' | 'actualidad';

export interface Fuente {
  title: string;
  url: string;
  publisher: string;
}

export interface DatoUtil {
  label: string;
  value: string;
}

export interface Bloque {
  kind: 'h2' | 'h3' | 'p';
  text: string;
}

export interface Nota {
  slug: string;
  type: NotaTipo;
  /** En satélites es obligatorio; en actualidad es opcional para enlazar con su guía temática. */
  pillarSlug?: string;
  title: string;
  description: string;
  dek: string;
  category: string;
  /** Única fecha de la nota, AAAA-MM-DD. Las guías troncales son anteriores a sus satélites. */
  publishedAt: string;
  /** Foto verificada local. Opcional en notas de actualidad cuando no hay foto verificada del lugar. */
  image?: FotoId;
  /** Etiqueta territorial usada cuando la nota no lleva fotografía (ej: 'Comuna 9 · Liniers y Parque Avellaneda'). */
  placeLabel?: string;
  blocks: Bloque[];
  datos?: { title: string; rows: DatoUtil[] };
  fuentes: Fuente[];
}

export interface NotaResuelta extends Omit<Nota, 'image'> {
  image?: Foto;
  words: number;
  readMinutes: number;
}
