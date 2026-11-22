import type { Business, BusinessHoursRow } from './data';

const DAY_INDEX: Record<string, number> = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6
};

function plain(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

function dayIndex(word: string): number | undefined {
  const key = plain(word);
  if (DAY_INDEX[key] !== undefined) return DAY_INDEX[key];
  return DAY_INDEX[key.replace(/s$/, '')];
}

function daysInLabel(label: string): number[] {
  const clean = plain(label);
  const range = clean.match(/([a-z]+)\s+a\s+([a-z]+)/);
  if (range) {
    const start = dayIndex(range[1]);
    const end = dayIndex(range[2]);
    if (start !== undefined && end !== undefined) {
      const days: number[] = [];
      for (let step = 0; step < 7; step += 1) {
        const day = (start + step) % 7;
        days.push(day);
        if (day === end) break;
      }
      return days;
    }
  }

  const found = new Set<number>();
  for (const word of clean.split(/[^a-z]+/)) {
    const day = dayIndex(word);
    if (day !== undefined) found.add(day);
  }
  return [...found];
}

function minutesOf(hour: string, minute: string): number {
  return Number(hour) * 60 + Number(minute);
}

/** Parsed ranges for a schedule line. Empty means explicitly closed. Null means not a clock. */
function rangesInSchedule(schedule: string): Array<[number, number]> | null {
  if (/cerrado|urgencia|coordinad/i.test(schedule)) return [];
  const matches = [...schedule.matchAll(/(\d{1,2}):(\d{2})\s*a\s*(\d{1,2}):(\d{2})/g)];
  if (matches.length === 0) return null;
  return matches.map((match) => {
    const start = minutesOf(match[1], match[2]);
    let end = minutesOf(match[3], match[4]);
    if (end <= start) end += 24 * 60;
    return [start, end];
  });
}

function buenosAiresNow(now: number): { weekday: number; minutes: number } {
  const shifted = new Date(now - 3 * 60 * 60 * 1000);
  return {
    weekday: shifted.getUTCDay(),
    minutes: shifted.getUTCHours() * 60 + shifted.getUTCMinutes()
  };
}

function rowIsOpen(row: BusinessHoursRow, minutes: number): boolean | null {
  const ranges = rangesInSchedule(row.schedule);
  if (ranges === null) return null;
  return ranges.some(([start, end]) => minutes >= start && minutes < end);
}

/**
 * Open/closed from the shop's hour rows in Argentina time.
 * Falls back to the stored flag when the text has no clock.
 */
export function isShopOpen(business: Business, now = Date.now()): boolean {
  if (!business.hours || business.hours.length === 0) return business.isOpenNow;
  const { weekday, minutes } = buenosAiresNow(now);
  const row = business.hours.find((item) => daysInLabel(item.days).includes(weekday));
  if (!row) return false;
  const parsed = rowIsOpen(row, minutes);
  return parsed === null ? business.isOpenNow : parsed;
}
