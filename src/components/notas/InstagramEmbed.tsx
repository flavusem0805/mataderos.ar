'use client';

import { useEffect, useState } from 'react';

type InstagramWindow = Window & {
  instgrm?: { Embeds: { process: () => void } };
};

const SCRIPT_ID = 'instagram-embed-js';
const SCRIPT_SRC = 'https://www.instagram.com/embed.js';

function processEmbeds() {
  (window as InstagramWindow).instgrm?.Embeds.process();
}

function ensureEmbedScript() {
  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    if ((window as InstagramWindow).instgrm) processEmbeds();
    else existing.addEventListener('load', processEmbeds, { once: true });
    return;
  }
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = SCRIPT_SRC;
  script.async = true;
  script.onload = () => processEmbeds();
  document.body.appendChild(script);
}

export function InstagramEmbed({ url }: { url: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    ensureEmbedScript();
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex min-h-[48px] w-full flex-col items-start justify-center gap-1 border border-carbon bg-pampa-surface px-4 py-3 text-left"
      >
        <span className="font-semibold">Ver esta publicación en Instagram</span>
        <span className="max-w-full truncate font-mono text-base text-chicago">{url}</span>
      </button>
    );
  }

  return (
    <div className="w-full min-w-0 max-w-[540px] overflow-hidden">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 0,
          margin: 0,
          maxWidth: '540px',
          minWidth: 0,
          width: '100%',
          padding: 0
        }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          Ver esta publicación en Instagram
        </a>
      </blockquote>
    </div>
  );
}
