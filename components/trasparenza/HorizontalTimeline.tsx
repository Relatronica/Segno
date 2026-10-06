'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  formatEventDate,
  type LobbyActor,
  type LobbyPerson,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { EVENT_META, SENTIMENT_META, SENTIMENT_FEAR_SCORE, toMs } from './meta';
import { PersonAvatar } from './PersonAvatar';
import { localIsoDate } from '@/lib/dates';
import type { SentimentTag } from '@/lib/data/trasparenza';
import { cn } from '@/lib/utils';

const PAD_X_LEFT = 240;
const PAD_X_RIGHT = 200;
const MIN_GAP_PX = 112;
const CARD_W = 192;
const CARD_APPROX_H = 96;
const LANE_ORDER = [-1, 1, -2, 2] as const;
type Lane = (typeof LANE_ORDER)[number];

/** Design offsets as fraction of half-height (0..1) */
const LANE_FRAC: Record<Lane, number> = {
  [-2]: 0.72,
  [-1]: 0.38,
  [1]: 0.38,
  [2]: 0.72,
};

type LaidOutEvent = TimelineEvent & { x: number; lane: Lane };

type MoodLabels = {
  title: string;
  fear: string;
  enthusiasm: string;
  hint: string;
  activity?: string;
  activityHint?: string;
};

type Props = {
  events: TimelineEvent[];
  /** Sentiment mood series — only for the sentiment theme */
  moodEvents?: TimelineEvent[];
  /**
   * Volume series. Defaults to events with a sentiment tag.
   * Pass individual auto signals here so each headline counts, not the day rollup.
   */
  activityEvents?: TimelineEvent[];
  moodLabels?: MoodLabels;
  /** Chart: series + ticks + activity. Cards: existing pin/card timeline. */
  mode?: 'cards' | 'chart';
  actors: Record<string, LobbyActor>;
  people: Record<string, LobbyPerson>;
  locale: 'it' | 'en';
  activeId: string | null;
  onSelect: (id: string) => void;
  /** Nearest pin under the viewport center while the user pans the chart */
  onScrollFocus?: (id: string) => void;
  /** Playhead from the feed list scroll — no selection */
  scrubId?: string | null;
  emptyLabel: string;
  dragHint: string;
  typeLabel: (id: TimelineEvent['type']) => string;
  sentimentLabel?: (tag: SentimentTag) => string;
  /** Scroll the present into view when the layout is ready */
  focusPresent?: boolean;
  todayLabel?: string;
  /** Bump to re-center on today (e.g. jump button) */
  presentFocusToken?: number;
  /** Bump to center the chart on activeId (list/click/keyboard) */
  focusEventToken?: number;
};

type Point = { x: number; y: number };

/**
 * Fritsch–Carlson monotone cubic, as a cubic Bézier SVG path.
 * X is time: the curve never loops backwards, and tight fear↔enthusiasm
 * jumps do not overshoot into a knot (the Catmull-Rom issue).
 */
function monotoneCubicPath(points: Point[]): string {
  const n = points.length;
  if (n === 0) return '';
  if (n === 1) return `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;

  const pts = points.map((p) => ({ x: p.x, y: p.y }));
  for (let i = 1; i < n; i++) {
    if (pts[i].x <= pts[i - 1].x) pts[i].x = pts[i - 1].x + 1;
  }

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1].x - pts[i].x;
    slope[i] = (pts[i + 1].y - pts[i].y) / dx[i];
  }

  const tan = new Array<number>(n);
  tan[0] = slope[0];
  tan[n - 1] = slope[n - 2];
  for (let i = 1; i < n - 1; i++) {
    tan[i] = slope[i - 1] * slope[i] <= 0 ? 0 : (slope[i - 1] + slope[i]) / 2;
  }

  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(slope[i]) < 1e-8) {
      tan[i] = 0;
      tan[i + 1] = 0;
      continue;
    }
    const a = tan[i] / slope[i];
    const b = tan[i + 1] / slope[i];
    const s = a * a + b * b;
    if (s > 9) {
      const tau = 3 / Math.sqrt(s);
      tan[i] = tau * a * slope[i];
      tan[i + 1] = tau * b * slope[i];
    }
  }

  let d = `M ${fmt(pts[0].x)} ${fmt(pts[0].y)}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i];
    const c1x = pts[i].x + h / 3;
    const c1y = pts[i].y + (tan[i] * h) / 3;
    const c2x = pts[i + 1].x - h / 3;
    const c2y = pts[i + 1].y - (tan[i + 1] * h) / 3;
    d += ` C ${fmt(c1x)} ${fmt(c1y)}, ${fmt(c2x)} ${fmt(c2y)}, ${fmt(pts[i + 1].x)} ${fmt(pts[i + 1].y)}`;
  }
  return d;
}

const DAY_MS = 24 * 60 * 60 * 1000;
/** Historical chart density: about 420px per year. */
const HISTORY_PX_PER_DAY = 420 / 365.25;
/** Recent chart density: consecutive days stay apart. */
const RECENT_PX_PER_DAY = 16;
const RECENT_WINDOW_DAYS = 90;
/** Ease width centered on the window edge, so the scale does not corner. */
const SCALE_BLEND_DAYS = 36;
const SMOOTH_WINDOW_MS = 7 * DAY_MS;

/**
 * Pixels from a past instant to today.
 * Last 90 days run at 16px/day; older time stays near 1px/day.
 * smoothstep blends the two rates so the spline has no kink at the join.
 */
function pixelsBeforeToday(ageDays: number): number {
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

/** Centered 7-day mean. A lone historical pin is unchanged. */
function smoothScores<T extends { date: string; score: number }>(points: T[]): number[] {
  const times = points.map((p) => toMs(p.date));
  return points.map((p, i) => {
    const t = times[i];
    let sum = 0;
    let n = 0;
    for (let j = 0; j < points.length; j++) {
      if (Math.abs(times[j] - t) <= SMOOTH_WINDOW_MS / 2) {
        sum += points[j].score;
        n += 1;
      }
    }
    return n > 0 ? sum / n : p.score;
  });
}

function fmt(n: number): string {
  return n.toFixed(2);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Map fear score (+1 alarm … −1 optimism) to the chart palette. */
function scoreToRgb(score: number): string {
  const red = [153, 27, 27];
  const slate = [100, 116, 139];
  const green = [4, 120, 87];
  const t = Math.abs(Math.min(1, Math.max(-1, score)));
  const to = score >= 0 ? red : green;
  const c = slate.map((ch, i) => Math.round(lerp(ch, to[i], t)));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

function assignLanes(sorted: Array<TimelineEvent & { x: number }>): LaidOutEvent[] {
  const placed: LaidOutEvent[] = [];
  const minDx = CARD_W + 20;

  for (const event of sorted) {
    let chosen: Lane = LANE_ORDER[0];
    let found = false;
    for (const lane of LANE_ORDER) {
      const collides = placed.some(
        (p) => p.lane === lane && Math.abs(p.x - event.x) < minDx,
      );
      if (!collides) {
        chosen = lane;
        found = true;
        break;
      }
    }
    if (!found) {
      let best: Lane = LANE_ORDER[0];
      let bestDist = -1;
      for (const lane of LANE_ORDER) {
        const nearest = placed
          .filter((p) => p.lane === lane)
          .reduce((min, p) => Math.min(min, Math.abs(p.x - event.x)), Infinity);
        if (nearest > bestDist) {
          bestDist = nearest;
          best = lane;
        }
      }
      chosen = best;
    }
    placed.push({ ...event, lane: chosen });
  }

  return placed;
}

export function HorizontalTimeline({
  events,
  moodEvents = [],
  activityEvents,
  moodLabels,
  mode = 'cards',
  actors,
  people,
  locale,
  activeId,
  onSelect,
  onScrollFocus,
  scrubId = null,
  emptyLabel,
  dragHint,
  typeLabel,
  sentimentLabel,
  focusPresent = false,
  todayLabel = 'Today',
  presentFocusToken = 0,
  focusEventToken = 0,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const suppressScrollFocus = useRef(false);
  const scrollFocusRaf = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [stageHeight, setStageHeight] = useState(0);
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const isChart = mode === 'chart';

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const update = () => setCoarsePointer(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageHeight(el.clientHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** Pixel offsets from rail — fit inside measured viewport height */
  const laneOffset = useMemo(() => {
    const half = Math.max(stageHeight, 320) / 2;
    const maxReach = half - CARD_APPROX_H / 2 - 16;
    const sign = (lane: Lane) => (lane < 0 ? -1 : 1);
    return {
      [-2]: sign(-2) * maxReach * LANE_FRAC[-2],
      [-1]: sign(-1) * maxReach * LANE_FRAC[-1],
      [1]: sign(1) * maxReach * LANE_FRAC[1],
      [2]: sign(2) * maxReach * LANE_FRAC[2],
    } as Record<Lane, number>;
  }, [stageHeight]);

  const layout = useMemo(() => {
    const moodWithTag = moodEvents.filter((e) => e.sentiment);
    const spanSource = events.length > 0 ? events : moodWithTag;
    const emptyActivity = [] as Array<{
      key: string;
      x: number;
      count: number;
      score: number;
      label: string;
    }>;

    if (spanSource.length === 0) {
      return {
        width: 800,
        points: [] as LaidOutEvent[],
        years: [] as Array<{ year: string; x: number }>,
        timeTicks: [] as Array<{
          key: string;
          x: number;
          kind: 'year' | 'month';
          label: string;
          iso: string;
        }>,
        pxPerMonth: 0,
        mood: [] as Array<{
          id: string;
          date: string;
          x: number;
          score: number;
          sentiment: SentimentTag;
          carry?: boolean;
        }>,
        activity: emptyActivity,
        maxActivity: 1,
        contextMarks: [] as Array<{ id: string; x: number; type: TimelineEvent['type'] }>,
        todayX: 0,
        todayIso: localIsoDate(),
        minT: 0,
        maxT: 1,
        usable: 640,
      };
    }

    const todayIso = localIsoDate();
    const todayMs = toMs(todayIso);
    const atPresent = (date: string) => (toMs(date) > todayMs ? todayIso : date);

    const spanTimes = [
      ...events.map((e) => toMs(atPresent(e.date))),
      ...moodWithTag.map((e) => toMs(atPresent(e.date))),
      todayMs,
    ];
    const minT = Math.min(...spanTimes);
    const maxT = todayMs;
    const span = Math.max(maxT - minT, 1);

    const padLeft = isChart ? 120 : PAD_X_LEFT;
    const padRight = isChart ? 160 : PAD_X_RIGHT;
    const dayMs = DAY_MS;
    const ageDays = (ms: number) => (todayMs - ms) / dayMs;

    let width: number;
    let usable: number;
    let xForDate: (date: string) => number;

    if (isChart) {
      const spanPx = Math.max(pixelsBeforeToday(ageDays(minT)), 1);
      width = Math.max(1400, padLeft + spanPx + padRight);
      usable = width - padLeft - padRight;
      const scale = usable / spanPx;
      xForDate = (date: string) => {
        const t = Math.min(Math.max(toMs(atPresent(date)), minT), todayMs);
        return padLeft + (spanPx - pixelsBeforeToday(ageDays(t))) * scale;
      };
    } else {
      const byCount =
        padLeft + padRight + Math.max(events.length, moodWithTag.length, 1) * MIN_GAP_PX;
      width = Math.max(1100, byCount, 800);
      usable = width - padLeft - padRight;
      xForDate = (date: string) =>
        padLeft + ((toMs(atPresent(date)) - minT) / span) * usable;
    }

    const raw = events.map((e) => ({
      ...e,
      x: xForDate(e.date),
    }));

    const sorted = [...raw].sort((a, b) => a.x - b.x || a.date.localeCompare(b.date));
    // Cards need spacing so pins don't stack; chart stays on proportional time.
    if (!isChart) {
      const minGap = MIN_GAP_PX * 0.55;
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].x - sorted[i - 1].x < minGap) {
          sorted[i].x = sorted[i - 1].x + minGap;
        }
      }
    }

    const lastPinX = sorted[sorted.length - 1]?.x ?? padLeft;
    const mood: Array<{
      id: string;
      date: string;
      x: number;
      score: number;
      sentiment: SentimentTag;
      carry?: boolean;
    }> = moodWithTag
      .map((e) => ({
        id: e.id,
        date: e.date,
        x: xForDate(e.date),
        score: e.moodScore ?? SENTIMENT_FEAR_SCORE[e.sentiment!],
        sentiment: e.sentiment!,
      }))
      .sort((a, b) => a.x - b.x || a.date.localeCompare(b.date));

    const todayX = isChart
      ? xForDate(todayIso)
      : Math.max(
          xForDate(todayIso),
          lastPinX + CARD_W / 2 + 36,
          (mood[mood.length - 1]?.x ?? padLeft) + 32,
        );

    // Same-day points step sideways. On the chart they stop short of today,
    // so a late-September cluster cannot sit on or past the "oggi" line.
    const moodCeiling = isChart ? todayX - 10 : Number.POSITIVE_INFINITY;
    for (let i = 1; i < mood.length; i++) {
      if (mood[i].x <= mood[i - 1].x) mood[i].x = mood[i - 1].x + 8;
      if (mood[i].x > moodCeiling) mood[i].x = moodCeiling;
    }

    if (mood.length > 0) {
      const last = mood[mood.length - 1];
      if (todayX > last.x) {
        mood.push({
          id: 'mood-today-carry',
          date: todayIso,
          x: todayX,
          score: last.score,
          sentiment: last.sentiment,
          carry: true,
        });
      }
    }

    const moodIds = new Set(moodWithTag.map((e) => e.id));
    const contextMarks = isChart
      ? sorted
          .filter((e) => !moodIds.has(e.id))
          .map((e) => ({
            id: e.id,
            x: e.x,
            type: e.type,
          }))
      : [];

    const activitySource =
      activityEvents ?? events.filter((e) => Boolean(e.sentiment));
    const buckets = new Map<
      string,
      { count: number; scoreSum: number; xSum: number }
    >();
    for (const e of activitySource) {
      if (!e.sentiment) continue;
      // Chart: one bar per day so auto pins sit under the volume.
      // Cards: monthly, denser history.
      const present = atPresent(e.date);
      const key = isChart ? present : present.slice(0, 7);
      const current = buckets.get(key) ?? {
        count: 0,
        scoreSum: 0,
        xSum: 0,
      };
      current.count += e.activityWeight ?? 1;
      current.scoreSum +=
        (e.moodScore ?? SENTIMENT_FEAR_SCORE[e.sentiment]) * (e.activityWeight ?? 1);
      current.xSum += xForDate(present) * (e.activityWeight ?? 1);
      buckets.set(key, current);
    }
    const activity = [...buckets.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, b]) => ({
        key,
        x: b.xSum / b.count,
        count: b.count,
        score: b.scoreSum / b.count,
        label: key,
      }));
    const maxActivity = Math.max(1, ...activity.map((b) => b.count));

    const finalWidth = Math.max(width, todayX + padRight);
    const points = isChart
      ? sorted.map((e) => ({ ...e, lane: -1 as Lane }))
      : assignLanes(sorted);

    const yearSet = [
      ...new Set([
        ...events.map((e) => atPresent(e.date).slice(0, 4)),
        ...moodWithTag.map((e) => atPresent(e.date).slice(0, 4)),
        todayIso.slice(0, 4),
      ]),
    ].sort();

    const pxPerMonth = usable / (span / (30.44 * dayMs));

    type TimeTick = {
      key: string;
      x: number;
      kind: 'year' | 'month';
      label: string;
      iso: string;
    };

    const timeTicks: TimeTick[] = [];
    const startDate = new Date(minT);
    const cursor = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const endMs = maxT + dayMs;
    let lastTickX = -1e9;
    while (cursor.getTime() <= endMs) {
      const cy = cursor.getFullYear();
      const cm = cursor.getMonth();
      const iso = `${cy}-${String(cm + 1).padStart(2, '0')}-01`;
      const t = toMs(iso);
      if (t >= minT - dayMs && t <= maxT + dayMs) {
        const x = xForDate(iso);
        const gap = x - lastTickX;
        if (cm === 0) {
          timeTicks.push({
            key: `y-${cy}`,
            x,
            kind: 'year',
            label: String(cy),
            iso,
          });
          lastTickX = x;
        } else if (isChart && gap >= 56) {
          timeTicks.push({ key: `m-${iso}`, x, kind: 'month', label: '', iso });
          lastTickX = x;
        }
      }
      cursor.setMonth(cursor.getMonth() + 1);
    }

    const todayMonthIso = `${todayIso.slice(0, 7)}-01`;
    if (isChart && !timeTicks.some((tick) => tick.iso === todayMonthIso)) {
      const x = xForDate(todayMonthIso);
      timeTicks.push({
        key: `m-${todayMonthIso}`,
        x,
        kind: 'month',
        label: '',
        iso: todayMonthIso,
      });
      timeTicks.sort((a, b) => a.x - b.x);
    }

    const years = timeTicks
      .filter((tick) => tick.kind === 'year')
      .map((tick) => ({ year: tick.label, x: tick.x }));

    if (years.length === 0) {
      for (const year of yearSet) {
        years.push({
          year,
          x: xForDate(`${year}-01-01`),
        });
      }
    }

    return {
      width: finalWidth,
      points,
      years,
      timeTicks,
      pxPerMonth,
      mood,
      activity,
      maxActivity,
      contextMarks,
      todayX,
      todayIso,
      minT,
      maxT,
      usable,
    };
  }, [events, moodEvents, activityEvents, isChart]);

  /** Usable plot band for the chart — mid line centered between top chrome and time axis */
  const chartBand = useMemo(() => {
    const activityMaxH = Math.max(29, stageHeight * 0.099);
    const contextLaneH = 34;
    const bottomPad = 6;
    const activityTop = Math.max(0, stageHeight - activityMaxH - bottomPad);
    const timeAxisY = Math.max(0, activityTop - contextLaneH);
    // Clear floating header + filter row; keep a little air under the top edge
    const plotTop = Math.max(72, Math.min(120, stageHeight * 0.125));
    // Year/month labels sit just above the axis
    const plotBottom = Math.max(plotTop + 80, timeAxisY - 28);
    const seriesMid = (plotTop + plotBottom) / 2;
    const headroom = Math.min(seriesMid - plotTop, plotBottom - seriesMid);
    const maxAmp = Math.max(40, headroom - 12);
    const amp = Math.min(stageHeight * 0.42, 200, maxAmp);
    return {
      activityMaxH,
      contextLaneH,
      bottomPad,
      activityTop,
      timeAxisY,
      plotTop,
      plotBottom,
      seriesMid,
      amp,
    };
  }, [stageHeight]);

  const moodGeometry = useMemo(() => {
    if (stageHeight <= 0 || layout.mood.length === 0) {
      return {
        path: '',
        points: [] as Array<{
          id: string;
          x: number;
          y: number;
          sentiment: SentimentTag;
          carry?: boolean;
        }>,
        amp: 0,
        seriesMid: 0,
      };
    }
    const seriesMid = isChart ? chartBand.seriesMid : stageHeight / 2;
    const amp = isChart
      ? chartBand.amp
      : Math.min(stageHeight * 0.28, 120);
    // Enthusiasm up, fear down: optimism (−1) above mid, alarm (+1) below
    const toPoint = (m: (typeof layout.mood)[number], score = m.score) => ({
      id: m.id,
      x: m.x,
      y: seriesMid + score * amp,
      sentiment: m.sentiment,
      carry: m.carry,
    });
    const points = layout.mood.map((m) => toPoint(m));

    let pathPoints = points;
    if (isChart) {
      const observed = layout.mood.filter((m) => !m.carry);
      const daily: Array<{ date: string; x: number; scoreSum: number; n: number }> = [];
      for (const point of observed) {
        const prev = daily.find((d) => d.date === point.date);
        if (!prev) {
          daily.push({ date: point.date, x: point.x, scoreSum: point.score, n: 1 });
        } else {
          prev.scoreSum += point.score;
          prev.n += 1;
        }
      }
      const dailyMeans = daily.map((d) => ({
        date: d.date,
        x: d.x,
        score: d.scoreSum / d.n,
      }));
      const smoothed = smoothScores(dailyMeans);
      const stroke = dailyMeans.map((d, i) => ({ x: d.x, y: seriesMid + smoothed[i] * amp }));
      const carry = layout.mood.find((m) => m.carry);
      if (carry && smoothed.length > 0) {
        stroke.push({ x: carry.x, y: seriesMid + smoothed[smoothed.length - 1] * amp });
      }
      pathPoints = stroke.map((p, i) => ({
        id: `stroke-${i}`,
        x: p.x,
        y: p.y,
        sentiment: 'caution' as SentimentTag,
        carry: false,
      }));
    }

    return { path: monotoneCubicPath(pathPoints), points, amp, seriesMid };
  }, [layout, stageHeight, isChart, chartBand]);

  const scrollToId = useCallback(
    (id: string, behavior: ScrollBehavior = 'smooth') => {
      const el = scrollerRef.current;
      const point =
        layout.points.find((p) => p.id === id) ??
        layout.mood.find((m) => m.id === id);
      if (!el || !point) return;
      suppressScrollFocus.current = true;
      const target = point.x - el.clientWidth / 2;
      el.scrollTo({ left: Math.max(0, target), behavior });
      window.setTimeout(() => {
        suppressScrollFocus.current = false;
      }, behavior === 'smooth' ? 420 : 80);
    },
    [layout.points, layout.mood],
  );

  const scrollToPresent = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      const el = scrollerRef.current;
      if (!el || layout.todayX == null || el.clientWidth === 0) return;
      suppressScrollFocus.current = true;
      // Bias slightly left so recent past stays in frame, present near center-right
      const target = layout.todayX - el.clientWidth * 0.62;
      el.scrollTo({ left: Math.max(0, target), behavior });
      window.setTimeout(() => {
        suppressScrollFocus.current = false;
      }, behavior === 'smooth' ? 420 : 80);
    },
    [layout.todayX],
  );

  useEffect(() => {
    if (!activeId || focusEventToken <= 0) return;
    scrollToId(activeId);
  }, [focusEventToken, activeId, scrollToId]);

  // Keep the feed playhead in frame while scrubbing — no selection, only pan.
  useEffect(() => {
    if (!scrubId || scrubId === activeId) return;
    const el = scrollerRef.current;
    if (!el || el.clientWidth === 0) return;

    const point =
      layout.points.find((p) => p.id === scrubId) ??
      layout.mood.find((m) => m.id === scrubId) ??
      layout.contextMarks.find((m) => m.id === scrubId);
    if (!point) return;

    const margin = Math.max(48, el.clientWidth * 0.2);
    const left = el.scrollLeft + margin;
    const right = el.scrollLeft + el.clientWidth - margin;
    if (point.x >= left && point.x <= right) return;

    const target =
      point.x < left
        ? point.x - margin
        : point.x - el.clientWidth + margin;

    suppressScrollFocus.current = true;
    el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    const t = window.setTimeout(() => {
      suppressScrollFocus.current = false;
    }, 320);
    return () => window.clearTimeout(t);
  }, [
    scrubId,
    activeId,
    layout.points,
    layout.mood,
    layout.contextMarks,
  ]);

  // Center on "today" only on first ready layout, or when the jump button bumps the token.
  // Do not re-run when selection clears — that used to yank the viewport back to today.
  const initialPresentDone = useRef(false);
  const lastPresentToken = useRef(presentFocusToken);

  useEffect(() => {
    if (!focusPresent) return;
    if (layout.todayX == null || layout.width <= 0) return;

    const tokenBumped = presentFocusToken !== lastPresentToken.current;
    if (tokenBumped) lastPresentToken.current = presentFocusToken;

    const needsInitial = !initialPresentDone.current;
    if (!needsInitial && !tokenBumped) return;

    let cancelled = false;
    const run = (behavior: ScrollBehavior) => {
      if (cancelled) return;
      scrollToPresent(behavior);
    };

    if (needsInitial) {
      initialPresentDone.current = true;
      const t0 = window.setTimeout(() => run('auto'), 0);
      const t1 = window.setTimeout(() => run('auto'), 120);
      return () => {
        cancelled = true;
        window.clearTimeout(t0);
        window.clearTimeout(t1);
      };
    }

    run('smooth');
    return () => {
      cancelled = true;
    };
  }, [
    focusPresent,
    layout.width,
    layout.todayX,
    presentFocusToken,
    scrollToPresent,
    stageHeight,
  ]);

  const reportScrollFocus = useCallback(() => {
    if (!onScrollFocus || suppressScrollFocus.current) return;
    const el = scrollerRef.current;
    if (!el || layout.points.length === 0) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let bestId = layout.points[0].id;
    let bestDist = Infinity;
    for (const point of layout.points) {
      const dist = Math.abs(point.x - center);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = point.id;
      }
    }
    if (bestId) onScrollFocus(bestId);
  }, [onScrollFocus, layout.points]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !onScrollFocus) return;
    const onScroll = () => {
      if (scrollFocusRaf.current) cancelAnimationFrame(scrollFocusRaf.current);
      scrollFocusRaf.current = requestAnimationFrame(reportScrollFocus);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (scrollFocusRaf.current) cancelAnimationFrame(scrollFocusRaf.current);
    };
  }, [onScrollFocus, reportScrollFocus]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const sync = () => {
      setScrollLeft(el.scrollLeft);
      setViewportWidth(el.clientWidth);
    };
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', sync);
      ro.disconnect();
    };
  }, [layout.width, stageHeight]);

  const onPointerDown = (e: React.PointerEvent) => {
    // On touch phones, prefer native horizontal pan — custom drag fights it
    if (coarsePointer || e.pointerType === 'touch') return;
    const el = scrollerRef.current;
    if (!el) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a, input')) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
    dragState.current.active = false;
    setDragging(false);
  };

  const midY = stageHeight / 2;
  const seriesMid = isChart ? chartBand.seriesMid : midY;
  const activityMaxH = chartBand.activityMaxH;
  const activityTop = chartBand.activityTop;
  const timeAxisY = isChart ? chartBand.timeAxisY : midY + stageHeight * 0.38;
  const hasPins = layout.points.length > 0;
  const hasMood = layout.mood.length > 0;

  const monthLabel = useCallback(
    (iso: string) => {
      const [y, m] = iso.split('-').map(Number);
      try {
        return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
          month: 'short',
        }).format(new Date(y, (m || 1) - 1, 1));
      } catch {
        return iso.slice(5, 7);
      }
    },
    [locale],
  );

  const todayCaption = useMemo(() => {
    if (!layout.todayIso) return todayLabel;
    const [y, m, d] = layout.todayIso.split('-').map(Number);
    if (!y || !m || !d) return todayLabel;
    try {
      const formatted = new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
        day: 'numeric',
        month: 'short',
      }).format(new Date(y, m - 1, d));
      return `${todayLabel} · ${formatted}`;
    } catch {
      return todayLabel;
    }
  }, [layout.todayIso, todayLabel, locale]);

  if (!hasPins && !hasMood) {
    return (
      <div ref={stageRef} className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  const strokeOpacity = isChart ? 0.88 : 0.88;
  const fillOpacity = isChart ? 0.12 : 0.14;
  const railY = seriesMid;
  const amp = moodGeometry.amp ?? Math.min(stageHeight * 0.28, 120);
  const enthusiasmY = seriesMid - amp;
  const fearY = seriesMid + amp;
  const hovered =
    hoveredId && !hoveredId.startsWith('act-')
      ? moodGeometry.points.find((p) => p.id === hoveredId)
      : undefined;

  const activeMoodPoint =
    activeId != null
      ? moodGeometry.points.find((p) => p.id === activeId && !p.carry)
      : undefined;
  const activeContextMark =
    activeId != null && !activeMoodPoint
      ? layout.contextMarks.find((m) => m.id === activeId)
      : undefined;
  const activeEvent = activeId ? events.find((e) => e.id === activeId) : undefined;
  const activeAccent =
    activeEvent?.sentiment != null
      ? SENTIMENT_META[activeEvent.sentiment].dot
      : activeEvent
        ? EVENT_META[activeEvent.type].dot
        : undefined;

  const scrubPoint =
    scrubId != null
      ? layout.points.find((p) => p.id === scrubId) ??
        layout.mood.find((m) => m.id === scrubId) ??
        layout.contextMarks.find((m) => m.id === scrubId)
      : undefined;
  const scrubEvent = scrubId ? events.find((e) => e.id === scrubId) : undefined;
  const scrubContentX = scrubPoint && 'x' in scrubPoint ? scrubPoint.x : null;
  const scrubViewportX =
    scrubContentX != null && viewportWidth > 0
      ? Math.min(Math.max(scrubContentX - scrollLeft, 14), viewportWidth - 14)
      : null;

  return (
    <div ref={stageRef} className="relative h-full w-full min-h-0">
      {isChart &&
        scrubViewportX != null &&
        stageHeight > 0 &&
        scrubId &&
        scrubId !== activeId && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-30 will-change-[left]"
            style={{
              left: scrubViewportX,
              transition: 'left 130ms linear',
            }}
          >
            <div
              className="absolute inset-y-[8%] left-0 w-px -translate-x-1/2 bg-foreground/30"
            />
            <div className="absolute left-1/2 top-[8%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground/80 shadow-sm" />
            {scrubEvent && (
              <span className="absolute left-1/2 top-[calc(8%+8px)] -translate-x-1/2 whitespace-nowrap rounded-md border border-border/40 bg-background/90 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground/80 backdrop-blur-sm">
                {formatEventDate(scrubEvent.date, locale)}
              </span>
            )}
          </div>
        )}

      {/* Mood extremes — left, above/below the pin band */}
      {moodLabels && hasMood && stageHeight > 0 && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute left-2.5 z-20 flex -translate-y-full items-center gap-1.5 rounded-md border border-border/40 bg-background/90 px-2 py-1 shadow-sm backdrop-blur-md sm:left-4"
            style={{
              top: Math.max(isChart ? chartBand.plotTop : 20, enthusiasmY - 14),
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: '#047857' }}
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-800/80 dark:text-emerald-300/80">
              {moodLabels.enthusiasm}
            </span>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-2.5 z-20 flex items-center gap-1.5 rounded-md border border-border/40 bg-background/90 px-2 py-1 shadow-sm backdrop-blur-md sm:left-4"
            style={{
              top: Math.min(
                isChart ? chartBand.plotBottom : stageHeight - 28,
                fearY + 14,
              ),
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: '#991b1b' }}
            />
            <span className="font-mono text-[9px] font-medium uppercase tracking-wider text-red-800/80 dark:text-red-300/80">
              {moodLabels.fear}
            </span>
          </div>
        </>
      )}

      {isChart && moodLabels?.activity && stageHeight > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-2.5 z-20 -translate-y-1/2 sm:left-4"
          style={{ top: activityTop + activityMaxH / 2 }}
          title={moodLabels.activityHint}
        >
          <span className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground/45">
            {moodLabels.activity}
          </span>
        </div>
      )}

      {!isChart && (
        <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[11px] text-muted-foreground/70 md:block">
          {dragHint}
        </p>
      )}

      <div
        ref={scrollerRef}
        className={`absolute inset-0 overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
      >
        <div
          className="relative select-none"
          style={{
            width: layout.width,
            height: stageHeight > 0 ? stageHeight : '100%',
          }}
        >
          {/* Time axis — chart: year/month rail; cards: year grids at the top */}
          {isChart
            ? (layout.timeTicks ?? []).map((tick) => {
                const isYear = tick.kind === 'year';
                const label = isYear ? tick.label : monthLabel(tick.iso);
                return (
                  <div key={tick.key} className="absolute z-[1]" style={{ left: tick.x }}>
                    {isYear && (
                      <div
                        aria-hidden
                        className="absolute w-px bg-foreground/[0.06]"
                        style={{
                          top: stageHeight * 0.07,
                          height: Math.max(0, timeAxisY - stageHeight * 0.07),
                        }}
                      />
                    )}
                    <div
                      aria-hidden
                      className={`absolute w-px ${isYear ? 'bg-foreground/25' : 'bg-border/45'}`}
                      style={{
                        top: timeAxisY - (isYear ? 10 : 5),
                        height: isYear ? 10 : 5,
                      }}
                    />
                    <span
                      className={`absolute whitespace-nowrap font-mono ${
                        isYear
                          ? 'left-1 text-[10px] font-medium tracking-tight text-foreground/65'
                          : 'left-0.5 text-[8px] uppercase tracking-wider text-muted-foreground/55'
                      }`}
                      style={{
                        top: timeAxisY - (isYear ? 24 : 18),
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })
            : layout.years.map((y) => (
                <div
                  key={y.year}
                  className="absolute border-l border-dashed border-border/40"
                  style={{
                    left: y.x,
                    top: midY - stageHeight * 0.4,
                    height: stageHeight * 0.8,
                  }}
                >
                  <span className="absolute -top-5 left-2 font-mono text-xs font-semibold text-mark/80">
                    {y.year}
                  </span>
                </div>
              ))}

          {isChart && stageHeight > 0 && (
            <div
              aria-hidden
              className="absolute left-0 right-0 z-[1] h-px bg-border/50"
              style={{ top: timeAxisY }}
            />
          )}

          {isChart &&
            stageHeight > 0 &&
            layout.contextMarks.map((mark) => {
              const meta = EVENT_META[mark.type];
              const Icon = meta.icon;
              const isActive = activeId === mark.id;
              const isHot = hoveredId === mark.id || isActive;
              const event = events.find((e) => e.id === mark.id);
              const size = isActive ? 28 : isHot ? 26 : 24;
              const stem = 6;
              return (
                <button
                  key={`ctx-${mark.id}`}
                  type="button"
                  onClick={() => onSelect(mark.id)}
                  onMouseEnter={() => setHoveredId(mark.id)}
                  onMouseLeave={() =>
                    setHoveredId((id) => (id === mark.id ? null : id))
                  }
                  className="absolute z-[4] -translate-x-1/2"
                  style={{
                    left: mark.x,
                    top: timeAxisY,
                    width: size,
                    height: size + stem,
                  }}
                  aria-label={event?.title[locale] ?? mark.type}
                  aria-pressed={isActive}
                  title={event?.title[locale]}
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 w-px -translate-x-1/2"
                    style={{
                      height: stem,
                      backgroundColor: isHot ? meta.dot : 'color-mix(in oklch, var(--border) 70%, transparent)',
                    }}
                  />
                  <span
                    className={cn(
                      'absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-md border shadow-sm backdrop-blur-md transition-[transform,box-shadow,background-color] duration-200',
                      meta.bg,
                      meta.color,
                      isActive
                        ? 'border-foreground/30 ring-2 ring-foreground/20'
                        : 'border-border/60 hover:border-border',
                    )}
                    style={{
                      top: stem,
                      width: size,
                      height: size,
                      boxShadow: isHot
                        ? `0 0 0 1px ${meta.dot}33, 0 6px 16px rgba(15,23,42,0.1)`
                        : undefined,
                    }}
                  >
                    <Icon
                      className={cn(
                        'transition-transform duration-200',
                        isActive ? 'h-3.5 w-3.5' : 'h-3 w-3',
                      )}
                      strokeWidth={isActive ? 2.25 : 2}
                    />
                  </span>
                </button>
              );
            })}

          {stageHeight > 0 && layout.todayX != null && (
            <div
              aria-hidden
              className="absolute z-[2] w-px bg-mark/50"
              style={{
                left: layout.todayX,
                top: isChart ? stageHeight * 0.05 : midY - stageHeight * 0.42,
                height: isChart
                  ? Math.max(0, activityTop + activityMaxH - stageHeight * 0.05)
                  : stageHeight * 0.84,
              }}
            >
              <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-md border border-mark/20 bg-background/85 px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-mark/90 backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mark opacity-45" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mark" />
                </span>
                {todayCaption}
              </span>
            </div>
          )}

          {stageHeight > 0 && (
            <>
              <div
                aria-hidden
                className="absolute left-0 right-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ink/25 to-transparent dark:via-mark/22"
                style={{ top: railY }}
              />
              <div
                aria-hidden
                className="absolute left-0 right-0 h-3 -translate-y-1/2 bg-gradient-to-r from-transparent via-mark-muted to-transparent"
                style={{ top: railY }}
              />
              {hasMood && amp > 0 && (
                <>
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 border-t border-dashed border-emerald-700/15 dark:border-emerald-400/15"
                    style={{ top: enthusiasmY }}
                  />
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 border-t border-dashed border-red-800/15 dark:border-red-400/15"
                    style={{ top: fearY }}
                  />
                </>
              )}
            </>
          )}

          {/* Ambient fear↔enthusiasm curve — always on when mood data exists */}
          {stageHeight > 0 && moodGeometry.path && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              width={layout.width}
              height={stageHeight}
            >
              <defs>
                <linearGradient id="mood-stroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#047857" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#64748b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="mood-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#047857" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#64748b" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d={`${moodGeometry.path} L ${moodGeometry.points[moodGeometry.points.length - 1].x} ${railY} L ${moodGeometry.points[0].x} ${railY} Z`}
                fill="url(#mood-fill)"
                opacity={fillOpacity}
              />
              <path
                d={moodGeometry.path}
                fill="none"
                stroke="url(#mood-stroke)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={strokeOpacity}
              />
              {!isChart &&
                moodGeometry.points
                  .filter((p) => !p.carry)
                  .map((p) => (
                    <circle
                      key={p.id}
                      cx={p.x}
                      cy={p.y}
                      r={4}
                      fill={SENTIMENT_META[p.sentiment].dot}
                      opacity={0.9}
                    />
                  ))}
            </svg>
          )}

          {isChart && stageHeight > 0 && layout.activity.length > 0 && (
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[1]"
              width={layout.width}
              height={stageHeight}
            >
              {layout.activity.map((bar) => {
                const h = (bar.count / layout.maxActivity) * activityMaxH;
                const w = 6;
                return (
                  <rect
                    key={bar.key}
                    x={bar.x - w / 2}
                    y={activityTop + activityMaxH - h}
                    width={w}
                    height={Math.max(h, 1.5)}
                    rx={1}
                    fill={scoreToRgb(bar.score)}
                    opacity={0.5}
                  />
                );
              })}
            </svg>
          )}

          {isChart &&
            hovered &&
            stageHeight > 0 &&
            hoveredId !== activeId && (
              <div
                aria-hidden
                className="pointer-events-none absolute z-[2] w-px bg-foreground/12"
                style={{
                  left: hovered.x,
                  top: stageHeight * 0.08,
                  height: Math.max(0, activityTop - stageHeight * 0.08),
                }}
              />
            )}

          {isChart &&
            stageHeight > 0 &&
            activeAccent &&
            (activeMoodPoint || activeContextMark) && (
              <div
                aria-hidden
                className="pointer-events-none absolute z-[2] w-px"
                style={{
                  left: activeMoodPoint?.x ?? activeContextMark!.x,
                  top: stageHeight * 0.05,
                  height: Math.max(0, activityTop - stageHeight * 0.05),
                  background: `linear-gradient(to bottom, transparent, ${activeAccent}66, ${activeAccent}99, ${activeAccent}66, transparent)`,
                }}
              />
            )}

          {isChart &&
            stageHeight > 0 &&
            moodGeometry.points
              .filter((p) => !p.carry)
              .map((p) => {
                const event = events.find((e) => e.id === p.id);
                if (!event) return null;
                const isActive = activeId === event.id;
                const isHot = hoveredId === event.id || isActive;
                const dot = SENTIMENT_META[p.sentiment].dot;
                const person = event.personId ? people[event.personId] : undefined;
                const face = isActive ? 28 : isHot ? 24 : 20;
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect(event.id)}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId((id) => (id === event.id ? null : id))}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ left: p.x, top: p.y, width: 40, height: 40 }}
                    aria-pressed={isActive}
                    aria-label={
                      person
                        ? `${person.shortName}: ${event.title[locale]}`
                        : event.title[locale]
                    }
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full opacity-35"
                        style={{ backgroundColor: dot }}
                      />
                    )}
                    {person ? (
                      <span
                        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-background transition-[width,height,box-shadow] duration-200"
                        style={{
                          width: face,
                          height: face,
                          boxShadow: isActive
                            ? `0 0 0 2.5px ${dot}, 0 0 14px ${dot}66`
                            : `0 0 0 ${isHot ? 2 : 1.5}px ${dot}`,
                        }}
                      >
                        <PersonAvatar
                          person={person}
                          size="sm"
                          className={cn('h-full w-full ring-0')}
                        />
                      </span>
                    ) : (
                      <span
                        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-background transition-[width,height,box-shadow] duration-200"
                        style={{
                          width: isActive ? 14 : isHot ? 11 : 8,
                          height: isActive ? 14 : isHot ? 11 : 8,
                          backgroundColor: dot,
                          boxShadow: isActive
                            ? `0 0 0 3px ${dot}73, 0 0 16px ${dot}66`
                            : undefined,
                        }}
                      />
                    )}
                  </button>
                );
              })}

          {isChart &&
            stageHeight > 0 &&
            layout.activity.map((bar) => (
              <button
                key={`act-${bar.key}`}
                type="button"
                className="absolute z-[2] -translate-x-1/2"
                style={{
                  left: bar.x,
                  top: activityTop,
                  width: 12,
                  height: activityMaxH,
                }}
                aria-label={`${bar.label}: ${bar.count}`}
                title={`${bar.label}: ${bar.count}`}
              />
            ))}

          {!isChart &&
            stageHeight > 0 &&
            layout.points.map((event) => {
              const meta = EVENT_META[event.type];
              const sentimentMeta = event.sentiment
                ? SENTIMENT_META[event.sentiment]
                : null;
              const Icon = meta.icon;
              const isActive = activeId === event.id;
              const actor = event.actorId ? actors[event.actorId] : undefined;
              const person = event.personId ? people[event.personId] : undefined;
              const offset = laneOffset[event.lane];
              const above = event.lane < 0;
              const stemH = Math.max(Math.abs(offset) - 22, 12);
              const pinBg = sentimentMeta ? sentimentMeta.bg : meta.bg;
              const pinColor = sentimentMeta ? sentimentMeta.color : meta.color;
              const pinDot = sentimentMeta ? sentimentMeta.dot : meta.dot;
              const pinRing = sentimentMeta ? 'ring-foreground/25' : meta.ring;

              return (
                <div
                  key={event.id}
                  className="absolute z-[2] -translate-x-1/2"
                  style={{ left: event.x, top: midY }}
                >
                  <div
                    aria-hidden
                    className="absolute left-1/2 w-px -translate-x-1/2"
                    style={{
                      backgroundColor: pinDot,
                      opacity: isActive ? 0.75 : 0.35,
                      height: stemH,
                      ...(above ? { bottom: 0 } : { top: 0 }),
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => onSelect(event.id)}
                    className={`absolute left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform sm:h-10 sm:w-10 ${pinBg} ${pinColor} ring-2 ${
                      isActive
                        ? `${pinRing} scale-110 shadow-md`
                        : 'ring-background/80 hover:scale-105'
                    }`}
                    aria-pressed={isActive}
                    aria-label={event.title[locale]}
                  >
                    <Icon className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelect(event.id)}
                    className={`absolute left-1/2 z-20 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-md border px-2.5 py-2 text-left transition-all sm:w-[12rem] sm:rounded-xl sm:px-3 ${
                      isActive
                        ? 'border-foreground/25 bg-card shadow-md'
                        : 'border-border/50 bg-card/92 hover:border-border hover:bg-card'
                    }`}
                    style={{ top: offset }}
                  >
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {formatEventDate(event.date, locale)}
                    </p>
                    <p
                      className={`mt-0.5 text-[10px] font-medium ${
                        sentimentMeta ? sentimentMeta.color : meta.color
                      }`}
                    >
                      {event.sentiment && sentimentLabel
                        ? sentimentLabel(event.sentiment)
                        : typeLabel(event.type)}
                      {person
                        ? ` · ${person.shortName}`
                        : actor
                          ? ` · ${actor.shortName}`
                          : ''}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug tracking-tight">
                      {event.title[locale]}
                    </p>
                    {event.quote && (
                      <p className="mt-1 line-clamp-2 text-[10px] italic leading-snug text-muted-foreground">
                        “{event.quote[locale]}”
                      </p>
                    )}
                    <p className="mt-1.5 truncate font-mono text-[9px] text-muted-foreground/80">
                      {(() => {
                        try {
                          return new URL(event.sourceUrl).hostname.replace(/^www\./, '');
                        } catch {
                          return 'source';
                        }
                      })()}
                    </p>
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-16 bg-gradient-to-r from-background via-background/70 to-transparent sm:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-16 bg-gradient-to-l from-background via-background/70 to-transparent sm:w-20"
      />
    </div>
  );
}
