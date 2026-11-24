const BA_SHIFT_MS = 3 * 60 * 60 * 1000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const BA_TZ = 'America/Argentina/Buenos_Aires';

export interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Next weekly instant in America/Argentina/Buenos_Aires (ART, UTC−3, no DST).
 * `weekday` uses JS convention: 0 Sunday … 6 Saturday.
 */
export function nextWeeklyInstant(
  weekday: number,
  hour: number,
  minute: number,
  from = Date.now()
): number {
  const shifted = new Date(from - BA_SHIFT_MS);
  const baWeekday = shifted.getUTCDay();
  let delta = (weekday - baWeekday + 7) % 7;
  const baMinutes = shifted.getUTCHours() * 60 + shifted.getUTCMinutes();
  const targetMinutes = hour * 60 + minute;
  if (delta === 0 && baMinutes >= targetMinutes) {
    delta = 7;
  }
  const wall = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate() + delta,
    hour,
    minute,
    0,
    0
  );
  return wall + BA_SHIFT_MS;
}

export interface VenueClock {
  nextStart: number;
  previousStart: number;
  inProgress: boolean;
}

export function venueClock(
  weekday: number,
  hour: number,
  minute: number,
  durationHours: number,
  from = Date.now()
): VenueClock {
  const upcoming = nextWeeklyInstant(weekday, hour, minute, from);
  const previousStart = upcoming - WEEK_MS;
  const durationMs = durationHours * 60 * 60 * 1000;
  const inProgress = from >= previousStart && from < previousStart + durationMs;
  return { nextStart: upcoming, previousStart, inProgress };
}

export function splitRemaining(ms: number): Remaining {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60
  };
}

export function formatBaDate(ts: number): string {
  const raw = new Intl.DateTimeFormat('es-AR', {
    timeZone: BA_TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date(ts));
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export function formatBaTime(ts: number): string {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: BA_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).format(new Date(ts));
}

export function formatBaDay(ts: number): string {
  const raw = new Intl.DateTimeFormat('es-AR', {
    timeZone: BA_TZ,
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date(ts));
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export interface BaDayMonth {
  day: string;
  month: string;
  weekdayShort: string;
}

export function formatBaDayMonth(ts: number): BaDayMonth {
  const date = new Date(ts);
  const day = new Intl.DateTimeFormat('es-AR', { timeZone: BA_TZ, day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat('es-AR', { timeZone: BA_TZ, month: 'short' })
    .format(date)
    .replace('.', '')
    .toUpperCase();
  const weekdayShort = new Intl.DateTimeFormat('es-AR', { timeZone: BA_TZ, weekday: 'short' })
    .format(date)
    .replace('.', '')
    .toUpperCase();
  return { day, month, weekdayShort };
}

export function formatBaShortDate(ts: number): string {
  const date = new Date(ts);
  const parts = new Intl.DateTimeFormat('es-AR', {
    timeZone: BA_TZ,
    day: '2-digit',
    month: '2-digit'
  }).formatToParts(date);
  const day = parts.find((p) => p.type === 'day')?.value ?? '';
  const month = parts.find((p) => p.type === 'month')?.value ?? '';
  return `${day}/${month}`;
}

export type AgendaStatus = 'in-progress' | 'upcoming' | 'past';

export interface DatedAgendaWindow {
  startsAt: string;
  endsAt: string;
}

export function agendaTimestamps(item: DatedAgendaWindow): { startTs: number; endTs: number } {
  return {
    startTs: Date.parse(item.startsAt),
    endTs: Date.parse(item.endsAt)
  };
}

export function agendaStatus(item: DatedAgendaWindow, now: number): AgendaStatus {
  const { startTs, endTs } = agendaTimestamps(item);
  if (now >= startTs && now < endTs) return 'in-progress';
  if (now < startTs) return 'upcoming';
  return 'past';
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

export function buildIcsContent(item: {
  id: string;
  title: string;
  venueName: string;
  place: string;
  barrio: string;
  description: string;
  startsAt: string;
  endsAt: string;
  source?: { label: string; url: string };
}): string {
  const { startTs, endTs } = agendaTimestamps(item);
  const toIcsDate = (ts: number) =>
    new Date(ts).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
  const fullDescription = item.source
    ? `${item.description}\nFuente (${item.source.label}): ${item.source.url}`
    : item.description;
  const location = item.place.toLowerCase().includes(item.barrio.toLowerCase())
    ? `${item.place}, CABA`
    : `${item.place}, ${item.barrio}, CABA`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mataderos.ar//Agenda//ES',
    'BEGIN:VEVENT',
    `UID:${item.id}@mataderos.ar`,
    `DTSTART:${toIcsDate(startTs)}`,
    `DTEND:${toIcsDate(endTs)}`,
    `SUMMARY:${escapeIcsText(`${item.title} — ${item.venueName}`)}`,
    `LOCATION:${escapeIcsText(location)}`,
    `DESCRIPTION:${escapeIcsText(fullDescription)}`,
    ...(item.source ? [`URL:${item.source.url}`] : []),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

