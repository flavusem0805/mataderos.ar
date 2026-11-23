'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '@/lib/contact';

function normalizeSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 28);
}

export function SlugSimulator() {
  const [name, setName] = useState('');
  const slug = normalizeSlug(name) || 'tulocal';

  const message = name.trim()
    ? `Hola, quiero sumar mi comercio "${name.trim()}" a Mataderos.ar (${slug}.mataderos.ar).`
    : 'Hola, quiero sumar mi comercio a la guía de Mataderos.ar.';

  return (
    <div className="border border-carbon/20 bg-pampa-surface p-6 sm:p-8">
      <p className="font-mono text-sm uppercase tracking-wider text-chicago">
        Probá cómo quedaría tu dirección
      </p>
      <label htmlFor="simulador-comercio" className="mt-3 block font-serif text-xl font-semibold">
        Nombre de tu comercio
      </label>
      <input
        id="simulador-comercio"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej: Panadería Don José"
        className="mt-3 min-h-[48px] w-full rounded-[4px] border border-carbon/30 bg-pampa px-4 text-base text-carbon placeholder:text-carbon/45 focus:border-chicago focus:outline-none"
      />
      <div className="mt-4 border border-carbon/15 bg-pampa px-4 py-3 font-mono text-base">
        <span className="text-carbon/60">https://</span>
        <span className="font-semibold text-chicago">{slug}</span>
        <span className="text-carbon/60">.mataderos.ar</span>
      </div>
      <div className="mt-5">
        <a
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-chicago px-5 font-semibold text-pampa hover:bg-chicago-dark color-field"
        >
          Sumate por WhatsApp con este nombre
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
