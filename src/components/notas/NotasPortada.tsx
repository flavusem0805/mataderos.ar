import Image from 'next/image';
import Link from 'next/link';
import {
  ACTUALIDAD_FILTRO,
  GUIAS,
  extractoDe,
  formatFecha,
  getNota,
  guiaDe,
  notasDeGuia,
  type NotaResuelta,
  type PortadaFiltro
} from '@/lib/notas';
import type { Foto } from '@/lib/notas/media';

const CAMPOS: Record<PortadaFiltro['slug'], string> = {
  actualidad: 'bg-cuero',
  historia: 'bg-chicago',
  feria: 'bg-ladrillo',
  'que-hacer': 'bg-cuero',
  patrimonio: 'bg-carbon',
  cultura: 'bg-chicago-dark'
};

const FILTROS = [
  { slug: '', label: 'Todas', href: '/notas' },
  { slug: ACTUALIDAD_FILTRO.slug, label: ACTUALIDAD_FILTRO.label, href: '/notas?guia=actualidad' },
  ...GUIAS.map((guia) => ({
    slug: guia.slug,
    label: guia.label,
    href: `/notas?guia=${guia.slug}`
  }))
];

function cantidadNotas(total: number): string {
  return total === 1 ? '1 nota' : `${total} notas`;
}

function fotoDe(nota: NotaResuelta): Foto | undefined {
  if (nota.image?.src) return nota.image;
  if (nota.type !== 'actualidad' && nota.pillarSlug) {
    const pilar = getNota(nota.pillarSlug);
    if (pilar?.image?.src) return pilar.image;
  }
  return undefined;
}

function MarcaGuia({ nota }: { nota: NotaResuelta }) {
  const guia = guiaDe(nota);
  return (
    <p className="font-mono text-base text-chicago">
      {nota.type === 'actualidad' ? (
        <>
          <span className="border-b border-current">Actualidad</span>
          <span aria-hidden="true"> · </span>
          {nota.category === 'Actualidad' ? (guia?.label ?? 'Agenda') : nota.category}
        </>
      ) : (
        <>
          {guia?.label ?? nota.category}
          {nota.type === 'pilar' && (
            <>
              <span aria-hidden="true"> · </span>
              <span className="border-b border-current">Guía</span>
            </>
          )}
        </>
      )}
    </p>
  );
}

function FiguraNota({
  nota,
  priority = false,
  sizes,
  className = 'aspect-[3/2]'
}: {
  nota: NotaResuelta;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  const foto = fotoDe(nota);
  const guia = guiaDe(nota);

  if (!foto) {
    const campoKey: PortadaFiltro['slug'] =
      nota.type === 'actualidad' ? 'actualidad' : (guia?.slug ?? 'historia');
    return (
      <div
        aria-hidden="true"
        className={`flex flex-col justify-between p-5 text-pampa ${CAMPOS[campoKey]} ${className}`}
      >
        <span className="font-mono text-sm uppercase tracking-wider text-pampa/80">
          {nota.placeLabel ?? guia?.label ?? nota.category}
        </span>
        <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold uppercase leading-[0.95]">
          {nota.category}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-carbon ${className}`}>
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

function NotaDestacada({ nota }: { nota: NotaResuelta }) {
  return (
    <article className="border border-carbon/25 bg-pampa-surface" aria-labelledby="nota-destacada">
      <Link href={`/notas/${nota.slug}`} className="grid color-field hover:bg-pampa-deep lg:grid-cols-12">
        <FiguraNota
          nota={nota}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]"
        />
        <div className="flex flex-col justify-end gap-4 border-t border-carbon/25 p-5 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0">
          <MarcaGuia nota={nota} />
          <h2
            id="nota-destacada"
            className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] font-semibold leading-[1.05]"
          >
            {nota.title}
          </h2>
          <p className="max-w-[42ch] text-lg leading-relaxed">{extractoDe(nota)}</p>
          <p className="font-mono text-base">
            {formatFecha(nota.publishedAt)}
            <span aria-hidden="true"> · </span>
            <span>
              {nota.readMinutes} min de lectura
            </span>
          </p>
          <span className="inline-flex min-h-[48px] items-center font-semibold text-chicago">Leer nota</span>
        </div>
      </Link>
    </article>
  );
}

function TarjetaNota({ nota }: { nota: NotaResuelta }) {
  return (
    <li className="min-w-0 border border-carbon/25 bg-pampa-surface">
      <Link href={`/notas/${nota.slug}`} className="flex h-full flex-col color-field hover:bg-pampa-deep">
        <FiguraNota nota={nota} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw" />
        <span className="flex flex-1 flex-col p-4">
          <MarcaGuia nota={nota} />
          <h3 className="mt-2 font-serif text-[1.35rem] font-semibold leading-snug">{nota.title}</h3>
          <p className="mt-2 line-clamp-2 text-base leading-relaxed">{extractoDe(nota)}</p>
          <p className="mt-auto pt-4 font-mono text-base">
            {formatFecha(nota.publishedAt)}
            <span aria-hidden="true"> · </span>
            {nota.readMinutes} min de lectura
          </p>
          <span className="inline-flex min-h-[48px] items-center font-semibold text-chicago">Leer nota</span>
        </span>
      </Link>
    </li>
  );
}

function FiltroGuias({ activa }: { activa?: PortadaFiltro['slug'] }) {
  return (
    <nav aria-label="Filtrar por guía" className="border-b border-carbon/20">
      <ul className="flex flex-wrap">
        {FILTROS.map((filtro) => {
          const current = (activa ?? '') === filtro.slug;
          return (
            <li key={filtro.href}>
              <Link
                href={filtro.href}
                aria-current={current ? 'page' : undefined}
                className={`-mb-px inline-flex min-h-[48px] items-center border-b px-3 font-mono text-base ${
                  current ? 'border-carbon font-semibold' : 'border-transparent'
                }`}
              >
                {filtro.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function GuiasDelBarrio() {
  return (
    <section aria-labelledby="guias-titulo" className="border-t border-carbon/25 bg-pampa-deep">
      <div className="editorial-container py-12 sm:py-16">
        <h2
          id="guias-titulo"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95]"
        >
          Guías del barrio
        </h2>
        <ul className="mt-8 border-t border-carbon/25">
          {GUIAS.map((guia) => {
            const pilar = getNota(guia.pillarSlug);
            if (!pilar) return null;
            const total = notasDeGuia(guia.pillarSlug).length;
            return (
              <li key={guia.slug} className="border-b border-carbon/25">
                <Link
                  href={`/notas/${pilar.slug}`}
                  className="grid gap-4 py-6 color-field hover:bg-pampa md:grid-cols-12 md:items-center md:gap-8"
                >
                  <FiguraNota
                    nota={pilar}
                    sizes="(min-width: 768px) 38vw, 100vw"
                    className="aspect-[3/2] md:col-span-5 md:aspect-[16/10]"
                  />
                  <span className="flex flex-col md:col-span-7">
                    <span className="font-mono text-base text-chicago">
                      <span className="border-b border-current">Guía</span>
                      <span aria-hidden="true"> · </span>
                      {guia.label}
                    </span>
                    <h3 className="mt-2 max-w-[22ch] font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight">
                      {pilar.title}
                    </h3>
                    <span className="mt-3 font-mono text-base">{cantidadNotas(total)}</span>
                    <span className="inline-flex min-h-[48px] items-center font-semibold text-chicago">Leer la guía</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function NotasPortada({
  guia,
  destacada,
  resto
}: {
  guia?: PortadaFiltro;
  destacada?: NotaResuelta;
  resto: NotaResuelta[];
}) {
  const listado = guia ? `Notas de ${guia.label}` : 'Todas las notas';

  return (
    <>
      <div className="editorial-container py-10 sm:py-14">
        <p className="font-mono text-base text-chicago">Archivo editorial</p>
        <h1 className="mt-2 max-w-[11ch] text-balance font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold uppercase leading-[0.9] sm:max-w-[14ch]">
          Notas del barrio
        </h1>
        <p className="mt-4 max-w-[38ch] font-serif text-xl italic leading-snug sm:text-2xl">
          Actualidad, historia, feria, patrimonio y cultura de Mataderos y la Comuna 9.
        </p>

        <div className="mt-8">
          <FiltroGuias activa={guia?.slug} />
        </div>

        {destacada ? (
          <div className="mt-8">
            <NotaDestacada nota={destacada} />
          </div>
        ) : (
          <p className="mt-8 text-lg">No hay notas en esta guía.</p>
        )}

        {resto.length > 0 && (
          <section aria-label={listado} className="mt-10">
            <h2 className="sr-only">{listado}</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resto.map((nota) => (
                <TarjetaNota key={nota.slug} nota={nota} />
              ))}
            </ul>
          </section>
        )}

      </div>

      <GuiasDelBarrio />

      <section aria-labelledby="seguir-titulo" className="bg-chicago text-pampa" data-surface="dark">
        <div className="editorial-container py-12 sm:py-16">
          <h2
            id="seguir-titulo"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold uppercase leading-[0.95]"
          >
            En el barrio
          </h2>
          <p className="mt-3 max-w-[36ch] font-serif text-xl italic leading-snug sm:text-2xl">
            Agenda actualizada con fuente y comercios de la guía.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/agenda"
              className="inline-flex min-h-[48px] w-full items-center justify-center bg-pampa px-5 font-semibold text-carbon color-field hover:bg-pampa-surface sm:w-auto"
            >
              Ver agenda completa
            </Link>
            <Link
              href="/#directorio"
              className="inline-flex min-h-[48px] w-full items-center justify-center border border-pampa px-5 font-semibold color-field hover:bg-pampa hover:text-carbon sm:w-auto"
            >
              Comercios
            </Link>
          </div>
        </div>
      </section>

      <div className="editorial-container">
        <p className="font-mono text-base">
          <Link
            href="/notas/creditos"
            className="inline-flex min-h-[48px] items-center text-carbon/80 underline decoration-carbon/30 underline-offset-4"
          >
            Fotos y licencias
          </Link>
        </p>
      </div>
    </>
  );
}
