import { localIsoDate, toMs } from '@/lib/dates';

export const DAY_MS = 24 * 60 * 60 * 1000;
/** Historical chart density: about 420px per year. */
const HISTORY_PX_PER_DAY = 420 / 365.25;
/** Recent chart density: consecutive days stay apart. */
const RECENT_PX_PER_DAY = 16;
const RECENT_WINDOW_DAYS = 90;
/** Ease width centered on the window edge, so the scale does not corner. */
const SCALE_BLEND_DAYS = 36;

/**
 * Pixels from a past instant to today.
 * Last 90 days run at 16px/day; older time stays near 1px/day.
 * smoothstep blends the two rates so the scale has no kink at the join.
 */
export function pixelsBeforeToday(ageDays: number): number {
  if (ageDays <= 0) return 0;
  const blendStart = RECENT_WINDOW_DAYS - SCALE_BLEND_DAYS / 2;
  const recentDays = Math.min(ageDays, blendStart);
  let px = recentDays * RECENT_PX_PER_DAY;
  if (ageDays <= blendStart) return px;

  const blendEndAge = Math.min(ageDays, blendStart + SCALE_BLEND_DAYS);
  const t = (blendEndAge - blendStart) / SCALE_BLEND_DAYS;
  const smoothIntegral = t * t * t - 0.5 * t * t * t * t;
  px +=
    (blendEndAge - blendStart) * RECENT_PX_PER_DAY +
    (HISTORY_PX_PER_DAY - RECENT_PX_PER_DAY) * SCALE_BLEND_DAYS * smoothIntegral;
  if (ageDays <= blendStart + SCALE_BLEND_DAYS) return px;

  px += (ageDays - blendStart - SCALE_BLEND_DAYS) * HISTORY_PX_PER_DAY;
  return px;
}

export type TimeScale = {
  /** Total scrollable content width, padding included. */
  width: number;
  xForDate: (date: string) => number;
  todayX: number;
  todayIso: string;
  minT: number;
  maxT: number;
};

/**
 * Shared horizontal time axis: recent days spread out, history compressed.
 * Dates in the future clamp to today, so nothing sits past the "oggi" line.
 */
export function createTimeScale(
  dates: string[],
  opts?: { padLeft?: number; padRight?: number; minWidth?: number },
): TimeScale {
  const padLeft = opts?.padLeft ?? 120;
  const padRight = opts?.padRight ?? 160;
  const minWidth = opts?.minWidth ?? 1400;

  const todayIso = localIsoDate();
  const todayMs = toMs(todayIso);
  const atPresent = (date: string) => (toMs(date) > todayMs ? todayIso : date);

  const minT = dates.length
    ? Math.min(...dates.map((d) => toMs(atPresent(d))), todayMs)
    : todayMs;
  const spanPx = Math.max(pixelsBeforeToday((todayMs - minT) / DAY_MS), 1);
  const width = Math.max(minWidth, padLeft + spanPx + padRight);
  const scale = (width - padLeft - padRight) / spanPx;

  const xForDate = (date: string) => {
    const t = Math.min(Math.max(toMs(atPresent(date)), minT), todayMs);
    return padLeft + (spanPx - pixelsBeforeToday((todayMs - t) / DAY_MS)) * scale;
  };

  return {
    width,
    xForDate,
    todayX: xForDate(todayIso),
    todayIso,
    minT,
    maxT: todayMs,
  };
}

export type TimeTick = {
  /** ISO date of the boundary: the first of the month or of the year. */
  date: string;
  x: number;
  kind: 'year' | 'month';
};

/**
 * Calendar gridlines, year and month, thinned to a minimum pixel gap. The axis
 * is not linear — the present is spread out, the past compressed — so detail
 * has to be earned: the near window keeps its months, the far past its years.
 */
export function timeTicks(scale: TimeScale, opts?: { minGapPx?: number }): TimeTick[] {
  const minGapPx = opts?.minGapPx ?? 48;
  const firstYear = new Date(scale.minT).getUTCFullYear();
  const lastYear = new Date(scale.maxT).getUTCFullYear();

  const years: TimeTick[] = [];
  const months: TimeTick[] = [];
  for (let y = firstYear; y <= lastYear; y++) {
    years.push({ date: `${y}-01-01`, x: scale.xForDate(`${y}-01-01`), kind: 'year' });
    for (let m = 1; m <= 12; m++) {
      const date = `${y}-${String(m).padStart(2, '0')}-01`;
      months.push({ date, x: scale.xForDate(date), kind: 'month' });
    }
  }

  // Years are laid down first: a month that would hug a year gives way to it.
  const kept: TimeTick[] = [];
  const place = (candidates: TimeTick[]) => {
    for (const tick of candidates.sort((a, b) => a.x - b.x)) {
      const idx = kept.findIndex((k) => k.x > tick.x);
      const left = idx === -1 ? kept[kept.length - 1] : kept[idx - 1];
      const right = idx === -1 ? undefined : kept[idx];
      if ((left && tick.x - left.x < minGapPx) || (right && right.x - tick.x < minGapPx)) continue;
      if (idx === -1) kept.push(tick);
      else kept.splice(idx, 0, tick);
    }
  };
  place(years);
  place(months);
  return kept;
}

