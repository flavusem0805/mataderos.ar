'use client';

import { useState } from 'react';
import { Check, Share2 } from 'lucide-react';

export function CopyLinkButton({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Si el usuario cancela el sheet nativo, no mostramos error.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback silencioso si el navegador bloquea clipboard.
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] border border-carbon/40 px-4 font-semibold text-carbon hover:border-carbon hover:bg-carbon hover:text-pampa color-field"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          Enlace copiado
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Compartir ficha
        </>
      )}
    </button>
  );
}
