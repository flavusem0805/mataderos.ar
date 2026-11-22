import { EL_PLATA_INSTAGRAM_HANDLE, EL_PLATA_INSTAGRAM_PROFILE } from '@/lib/el-plata-instagram';

export function ElPlataInstagramLink({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const surface =
    tone === 'dark'
      ? 'bg-pampa text-carbon hover:bg-pampa-surface'
      : 'bg-ladrillo text-pampa hover:bg-ladrillo-dark';

  return (
    <a
      href={EL_PLATA_INSTAGRAM_PROFILE}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[48px] w-full flex-col items-center justify-center gap-1 px-4 py-3 text-center text-base font-semibold leading-tight ${surface}`}
    >
      <span>Seguí a Cine Teatro El Plata en Instagram</span>
      <span className="font-mono text-base font-medium">{EL_PLATA_INSTAGRAM_HANDLE}</span>
    </a>
  );
}
