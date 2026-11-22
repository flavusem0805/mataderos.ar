'use client';

import { ElPlataInstagramLink } from '@/components/ElPlataInstagramLink';
import { elPlataPostUrls } from '@/lib/el-plata-instagram';
import { InstagramEmbed } from '@/components/notas/InstagramEmbed';

export function ElPlataInstagram() {
  const posts = elPlataPostUrls(3);

  return (
    <section className="mt-8 max-w-[68ch]" aria-labelledby="el-plata-instagram">
      <h2 id="el-plata-instagram" className="font-serif text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-tight">
        Seguí la sala
      </h2>
      <p className="mt-3 text-lg leading-relaxed sm:text-xl">
        La cartelera de la semana está en el Instagram oficial del teatro. Esta nota no copia esas fotos: si hay publicaciones cargadas, se ven con el embed de Instagram.
      </p>
      <div className="mt-4">
        <ElPlataInstagramLink />
      </div>
      {posts.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {posts.map((url) => (
            <li key={url}>
              <InstagramEmbed url={url} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-lg leading-relaxed">
          La foto de esta nota sigue siendo la de la avenida de los Corrales, con autor y licencia. No es una imagen del teatro.
        </p>
      )}
    </section>
  );
}
