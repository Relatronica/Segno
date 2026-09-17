/** Calendar date in the local timezone, as YYYY-MM-DD. */
export function localIsoDate(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Parse a timeline date; date-only strings are local midnight, not UTC. */
export function toMs(date: string): number {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [y, m, d] = date.split('-').map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  const parsed = new Date(date).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function clampIsoToToday(date: string, today = localIsoDate()): string {
  return date > today ? today : date;
}
