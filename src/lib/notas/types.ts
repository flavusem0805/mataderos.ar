import type { Foto, FotoId } from './media';

export type NotaTipo = 'pilar' | 'satelite';

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
  /** Solo en satélites: slug de la guía troncal. */
  pillarSlug?: string;
  title: string;
  description: string;
  dek: string;
  category: string;
  /** Única fecha de la nota, AAAA-MM-DD. Las guías troncales son anteriores a sus satélites. */
  publishedAt: string;
  image: FotoId;
  blocks: Bloque[];
  datos?: { title: string; rows: DatoUtil[] };
  fuentes: Fuente[];
}

export interface NotaResuelta extends Omit<Nota, 'image'> {
  image: Foto;
  words: number;
  readMinutes: number;
}
