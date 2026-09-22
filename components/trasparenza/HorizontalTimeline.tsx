'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  formatEventDate,
  type LobbyActor,
  type LobbyPerson,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { EVENT_META, SENTIMENT_META, SENTIMENT_FEAR_SCORE, toMs } from './meta';
import { localIsoDate } from '@/lib/dates';
import type { SentimentTag } from '@/lib/data/trasparenza';

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
          x: number;
          score: number;
          sentiment: SentimentTag;
          carry?: boolean;
        }>,
        activity: emptyActivity,
        maxActivity: 1,
        contextMarks: [] as Array<{ id: string; x: number; type: TimelineEvent['type'] }>,
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
    const yearSpan = span / (365.25 * 24 * 60 * 60 * 1000);

    const padLeft = isChart ? 120 : PAD_X_LEFT;
    const padRight = isChart ? 160 : PAD_X_RIGHT;
    const byCount = isChart
      ? padLeft + padRight + Math.max(yearSpan, 1) * 420
      : padLeft + padRight + Math.max(events.length, moodWithTag.length, 1) * MIN_GAP_PX;
    const width = Math.max(isChart ? 1400 : 1100, byCount, 800);
    const usable = width - padLeft - padRight;

    const xForDate = (date: string) =>
      padLeft + ((toMs(atPresent(date)) - minT) / span) * usable;

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
        score: SENTIMENT_FEAR_SCORE[e.sentiment!],
        sentiment: e.sentiment!,
      }))
      .sort((a, b) => a.x - b.x || a.date.localeCompare(b.date));

    for (let i = 1; i < mood.length; i++) {
      if (mood[i].x <= mood[i - 1].x) mood[i].x = mood[i - 1].x + 8;
    }

    const lastMoodX = mood[mood.length - 1]?.x ?? padLeft;
    const todayX = isChart
      ? xForDate(todayIso)
      : Math.max(
          xForDate(todayIso),
          lastPinX + CARD_W / 2 + 36,
          lastMoodX + 32,
        );

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

    const buckets = new Map<string, { count: number; scoreSum: number; x: number }>();
    for (const e of events) {
      if (!e.sentiment) continue;
      const key = atPresent(e.date).slice(0, 7);
      const current = buckets.get(key) ?? {
        count: 0,
        scoreSum: 0,
        x: xForDate(`${key}-15`),
      };
      current.count += 1;
      current.scoreSum += SENTIMENT_FEAR_SCORE[e.sentiment];
      buckets.set(key, current);
    }
    const activity = [...buckets.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, b]) => ({
        key,
        x: b.x,
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

    const dayMs = 24 * 60 * 60 * 1000;
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
    while (cursor.getTime() <= endMs) {
      const cy = cursor.getFullYear();
      const cm = cursor.getMonth();
      const iso = `${cy}-${String(cm + 1).padStart(2, '0')}-01`;
      const t = toMs(iso);
      if (t >= minT - dayMs && t <= maxT + dayMs) {
        const x = padLeft + ((Math.min(Math.max(t, minT), maxT) - minT) / span) * usable;
        if (cm === 0) {
          timeTicks.push({
            key: `y-${cy}`,
            x,
            kind: 'year',
            label: String(cy),
            iso,
          });
        } else if (isChart && pxPerMonth >= 36) {
          timeTicks.push({ key: `m-${iso}`, x, kind: 'month', label: '', iso });
        } else if (isChart && pxPerMonth >= 18 && [2, 5, 8].includes(cm)) {
          timeTicks.push({ key: `m-${iso}`, x, kind: 'month', label: '', iso });
        }
      }
      cursor.setMonth(cursor.getMonth() + 1);
    }

    const years = timeTicks
      .filter((tick) => tick.kind === 'year')
      .map((tick) => ({ year: tick.label, x: tick.x }));

    if (years.length === 0) {
      for (const year of yearSet) {
        const t = toMs(`${year}-01-01`);
        const clamped = Math.min(Math.max(t, minT), maxT);
        years.push({
          year,
          x: padLeft + ((clamped - minT) / span) * usable,
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
  }, [events, moodEvents, isChart]);

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
    const amp = Math.min(stageHeight * (isChart ? 0.32 : 0.28), isChart ? 150 : 120);
    const seriesMid = isChart ? stageHeight * 0.38 : stageHeight / 2;
    // Enthusiasm up, fear down: optimism (−1) above mid, alarm (+1) below
    const pts = layout.mood.map((m) => ({
      id: m.id,
      x: m.x,
      y: seriesMid + m.score * amp,
      sentiment: m.sentiment,
      carry: m.carry,
    }));
    return { path: monotoneCubicPath(pts), points: pts, amp, seriesMid };
  }, [layout.mood, stageHeight, isChart]);

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

  // Center on "today" when nothing is selected (initial load / jump to today)
  useEffect(() => {
    if (!focusPresent || activeId) return;
    if (layout.todayX == null || layout.width <= 0) return;

    let cancelled = false;
    const run = (behavior: ScrollBehavior) => {
      if (cancelled) return;
      scrollToPresent(behavior);
    };

    // Wait for scroller to have a measurable width (layout + paint)
    const t0 = window.setTimeout(() => run('auto'), 0);
    const t1 = window.setTimeout(() => run('auto'), 120);
    const t2 = window.setTimeout(() => run('smooth'), 320);
    return () => {
      cancelled = true;
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [
    focusPresent,
    activeId,
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
  const seriesMid = isChart ? stageHeight * 0.38 : midY;
  const activityTop = stageHeight * 0.78;
  const activityMaxH = Math.max(28, stageHeight * 0.14);
  const timeAxisY = isChart
    ? Math.min(activityTop - 28, seriesMid + (moodGeometry.amp || 0) + 28)
    : midY + stageHeight * 0.38;
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

  if (!hasPins && !hasMood) {
    return (
      <div ref={stageRef} className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  const strokeOpacity = isChart ? 0.92 : 0.88;
  const fillOpacity = isChart ? 0.16 : 0.14;
  const railY = seriesMid;
  const amp = moodGeometry.amp ?? Math.min(stageHeight * 0.28, 120);
  const enthusiasmY = seriesMid - amp;
  const fearY = seriesMid + amp;
  const hovered =
    hoveredId && !hoveredId.startsWith('act-')
      ? moodGeometry.points.find((p) => p.id === hoveredId)
      : undefined;
  const hoveredEvent = hoveredId ? events.find((e) => e.id === hoveredId) : undefined;
  const hoveredActivity = hoveredId?.startsWith('act-')
    ? layout.activity.find((b) => `act-${b.key}` === hoveredId)
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
              className="absolute inset-y-[6%] left-0 w-px -translate-x-1/2 bg-foreground/45"
            />
            <div className="absolute left-1/2 top-[6%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-foreground shadow-md" />
            {scrubEvent && (
              <span className="absolute left-1/2 top-[calc(6%+10px)] -translate-x-1/2 whitespace-nowrap rounded-md border border-border/50 bg-background/95 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground shadow-sm backdrop-blur-sm">
                {formatEventDate(scrubEvent.date, locale)}
              </span>
            )}
          </div>
        )}

      {/* Sticky Y-axis: reads with the chart, stays put while scrolling */}
      {moodLabels && hasMood && stageHeight > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-[4.75rem]"
        >
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background via-background/85 to-transparent sm:w-16" />
          <div
            className="absolute left-2 flex -translate-y-1/2 items-center gap-1.5 sm:left-3"
            style={{ top: enthusiasmY }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: '#047857' }}
            />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-800/85 dark:text-emerald-300/85">
              {moodLabels.enthusiasm}
            </span>
          </div>
          <div
            className="absolute left-2 flex -translate-y-1/2 items-center gap-1.5 sm:left-3"
            style={{ top: fearY }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: '#991b1b' }}
            />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-red-800/85 dark:text-red-300/85">
              {moodLabels.fear}
            </span>
          </div>
          {isChart && moodLabels.activity && (
            <div
              className="absolute left-2 flex -translate-y-1/2 items-center gap-1.5 sm:left-3"
              style={{ top: activityTop + activityMaxH / 2 }}
              title={moodLabels.activityHint}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/35" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                {moodLabels.activity}
              </span>
            </div>
          )}
        </div>
      )}

      <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 hidden -translate-x-1/2 font-mono text-[11px] text-muted-foreground/70 md:block">
        {dragHint}
      </p>

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
                        className="absolute w-px bg-foreground/[0.09]"
                        style={{
                          top: stageHeight * 0.08,
                          height: Math.max(0, timeAxisY - stageHeight * 0.08),
                        }}
                      />
                    )}
                    <div
                      aria-hidden
                      className={`absolute w-px ${isYear ? 'bg-foreground/35' : 'bg-border/60'}`}
                      style={{
                        top: timeAxisY - (isYear ? 12 : 7),
                        height: isYear ? 12 : 7,
                      }}
                    />
                    <span
                      className={`absolute whitespace-nowrap font-mono ${
                        isYear
                          ? '-translate-x-0 left-1 text-[11px] font-semibold tracking-tight text-foreground/85'
                          : 'left-0.5 text-[9px] uppercase tracking-wider text-muted-foreground/75'
                      }`}
                      style={{ top: timeAxisY + 5 }}
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
              className="absolute left-0 right-0 z-[1] h-px bg-border/70"
              style={{ top: timeAxisY }}
            />
          )}

          {isChart &&
            stageHeight > 0 &&
            layout.contextMarks.map((mark) => {
              const meta = EVENT_META[mark.type];
              const isActive = activeId === mark.id;
              return (
                <button
                  key={`ctx-${mark.id}`}
                  type="button"
                  onClick={() => onSelect(mark.id)}
                  onMouseEnter={() => setHoveredId(mark.id)}
                  onMouseLeave={() =>
                    setHoveredId((id) => (id === mark.id ? null : id))
                  }
                  className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: mark.x, top: timeAxisY }}
                  aria-label={
                    events.find((e) => e.id === mark.id)?.title[locale] ?? mark.type
                  }
                  aria-pressed={isActive}
                >
                  <span
                    className={`block rounded-sm transition-transform ${
                      isActive ? 'scale-125 ring-2 ring-foreground/30' : 'hover:scale-110'
                    }`}
                    style={{
                      width: isActive ? 8 : 6,
                      height: isActive ? 8 : 6,
                      backgroundColor: meta.dot,
                      opacity: isActive ? 1 : 0.55,
                    }}
                  />
                </button>
              );
            })}

          {stageHeight > 0 && layout.todayX != null && (
            <div
              aria-hidden
              className="absolute z-[2] w-px bg-mark/70"
              style={{
                left: layout.todayX,
                top: isChart ? stageHeight * 0.06 : midY - stageHeight * 0.42,
                height: isChart ? stageHeight * 0.88 : stageHeight * 0.84,
              }}
            >
              <span className="absolute -top-6 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border border-mark/25 bg-mark-muted px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-mark">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mark opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mark" />
                </span>
                {todayLabel}
              </span>
            </div>
          )}

          {stageHeight > 0 && (
            <>
              <div
                aria-hidden
                className="absolute left-0 right-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ink/35 to-transparent dark:via-mark/30"
                style={{ top: railY }}
              />
              <div
                aria-hidden
                className="absolute left-0 right-0 h-4 -translate-y-1/2 bg-gradient-to-r from-transparent via-mark-muted to-transparent"
                style={{ top: railY }}
              />
              {hasMood && amp > 0 && (
                <>
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 border-t border-dashed border-emerald-700/20 dark:border-emerald-400/20"
                    style={{ top: enthusiasmY }}
                  />
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 border-t border-dashed border-red-800/20 dark:border-red-400/20"
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
                strokeWidth={isChart ? 3 : 2.5}
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
                const w = 10;
                return (
                  <rect
                    key={bar.key}
                    x={bar.x - w / 2}
                    y={activityTop + activityMaxH - h}
                    width={w}
                    height={Math.max(h, 2)}
                    rx={1.5}
                    fill={scoreToRgb(bar.score)}
                    opacity={0.72}
                  />
                );
              })}
            </svg>
          )}

          {isChart &&
            hovered &&
            stageHeight > 0 && (
              <div
                aria-hidden
                className="pointer-events-none absolute z-[2] w-px bg-foreground/25"
                style={{
                  left: hovered.x,
                  top: stageHeight * 0.08,
                  height: stageHeight * 0.84,
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
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onSelect(event.id)}
                    onMouseEnter={() => setHoveredId(event.id)}
                    onMouseLeave={() => setHoveredId((id) => (id === event.id ? null : id))}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ left: p.x, top: p.y, width: 28, height: 28 }}
                    aria-pressed={isActive}
                    aria-label={event.title[locale]}
                  >
                    <span
                      className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-background transition-transform"
                      style={{
                        width: isHot ? 12 : 8,
                        height: isHot ? 12 : 8,
                        backgroundColor: dot,
                        boxShadow: isActive ? `0 0 0 4px ${dot}33` : undefined,
                      }}
                    />
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
                  width: 16,
                  height: activityMaxH,
                }}
                aria-label={`${bar.label}: ${bar.count}`}
                onMouseEnter={() => setHoveredId(`act-${bar.key}`)}
                onMouseLeave={() =>
                  setHoveredId((id) => (id === `act-${bar.key}` ? null : id))
                }
              />
            ))}

          {isChart && hoveredEvent && hovered && (
            <div
              className="pointer-events-none absolute z-30 w-48 -translate-x-1/2 rounded-lg border border-border/60 bg-background/95 px-2.5 py-2 shadow-lg backdrop-blur-xl"
              style={{
                left: hovered.x,
                top: Math.max(8, hovered.y - 88),
              }}
            >
              <p className="font-mono text-[10px] text-muted-foreground">
                {formatEventDate(hoveredEvent.date, locale)}
                {hoveredEvent.personId && people[hoveredEvent.personId]
                  ? ` · ${people[hoveredEvent.personId].shortName}`
                  : ''}
              </p>
              {hoveredEvent.sentiment && sentimentLabel && (
                <p
                  className={`mt-0.5 text-[10px] font-medium ${SENTIMENT_META[hoveredEvent.sentiment].color}`}
                >
                  {sentimentLabel(hoveredEvent.sentiment)}
                </p>
              )}
              <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug">
                {hoveredEvent.title[locale]}
              </p>
            </div>
          )}

          {isChart &&
            hoveredEvent &&
            !hovered &&
            !hoveredId?.startsWith('act-') &&
            layout.contextMarks.some((m) => m.id === hoveredEvent.id) && (
              <div
                className="pointer-events-none absolute z-30 w-48 -translate-x-1/2 rounded-lg border border-border/60 bg-background/95 px-2.5 py-2 shadow-lg backdrop-blur-xl"
                style={{
                  left: layout.contextMarks.find((m) => m.id === hoveredEvent.id)!.x,
                  top: Math.max(8, timeAxisY - 72),
                }}
              >
                <p className="font-mono text-[10px] text-muted-foreground">
                  {formatEventDate(hoveredEvent.date, locale)}
                  {' · '}
                  {typeLabel(hoveredEvent.type)}
                </p>
                <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug">
                  {hoveredEvent.title[locale]}
                </p>
              </div>
            )}

          {isChart && hoveredActivity && (
            <div
              className="pointer-events-none absolute z-30 w-40 -translate-x-1/2 rounded-lg border border-border/60 bg-background/95 px-2.5 py-2 shadow-lg backdrop-blur-xl"
              style={{
                left: hoveredActivity.x,
                top: activityTop - 52,
              }}
            >
              <p className="font-mono text-[10px] text-muted-foreground">
                {(() => {
                  const [y, m] = hoveredActivity.label.split('-').map(Number);
                  try {
                    return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
                      month: 'short',
                      year: 'numeric',
                    }).format(new Date(y, (m || 1) - 1, 1));
                  } catch {
                    return hoveredActivity.label;
                  }
                })()}
              </p>
              <p className="mt-0.5 text-xs font-semibold">
                {hoveredActivity.count}
                {moodLabels?.activity ? ` · ${moodLabels.activity}` : ''}
              </p>
            </div>
          )}

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
