'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  formatEventDate,
  type LobbyActor,
  type LobbyPerson,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { EVENT_META, SENTIMENT_META, SENTIMENT_FEAR_SCORE, toMs } from './meta';
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
};

type Props = {
  events: TimelineEvent[];
  /** Sentiment mood series — only for the sentiment theme */
  moodEvents?: TimelineEvent[];
  moodLabels?: MoodLabels;
  /** Extra classes for the bottom-right mood legend (e.g. avoid detail panel) */
  moodLegendClassName?: string;
  actors: Record<string, LobbyActor>;
  people: Record<string, LobbyPerson>;
  locale: 'it' | 'en';
  activeId: string | null;
  onSelect: (id: string) => void;
  emptyLabel: string;
  dragHint: string;
  typeLabel: (id: TimelineEvent['type']) => string;
  sentimentLabel?: (tag: SentimentTag) => string;
};

/** Smooth open path through points (Catmull-Rom → cubic bezier) */
function smoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
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
  moodLegendClassName = '',
  actors,
  people,
  locale,
  activeId,
  onSelect,
  emptyLabel,
  dragHint,
  typeLabel,
  sentimentLabel,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [stageHeight, setStageHeight] = useState(0);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

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

    if (spanSource.length === 0) {
      return {
        width: 800,
        points: [] as LaidOutEvent[],
        years: [] as Array<{ year: string; x: number }>,
        mood: [] as Array<{
          id: string;
          x: number;
          score: number;
          sentiment: SentimentTag;
          carry?: boolean;
        }>,
        minT: 0,
        maxT: 1,
        usable: 640,
      };
    }

    const today = new Date();
    const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const todayMs = toMs(todayIso);

    const spanTimes = [
      ...events.map((e) => toMs(e.date)),
      ...moodWithTag.map((e) => toMs(e.date)),
      todayMs,
    ];
    const minT = Math.min(...spanTimes);
    const maxT = Math.max(...spanTimes);
    const span = Math.max(maxT - minT, 1);

    const proportional = 1100;
    const byCount = PAD_X_LEFT + PAD_X_RIGHT + Math.max(events.length, moodWithTag.length, 1) * MIN_GAP_PX;
    const width = Math.max(proportional, byCount, 800);
    const usable = width - PAD_X_LEFT - PAD_X_RIGHT;

    const xForDate = (date: string) =>
      PAD_X_LEFT + ((toMs(date) - minT) / span) * usable;

    const raw = events.map((e) => ({
      ...e,
      x: xForDate(e.date),
    }));

    const sorted = [...raw].sort((a, b) => a.x - b.x || a.date.localeCompare(b.date));
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].x - sorted[i - 1].x < MIN_GAP_PX * 0.55) {
        sorted[i].x = sorted[i - 1].x + MIN_GAP_PX * 0.55;
      }
    }

    const lastPinX = sorted[sorted.length - 1]?.x ?? PAD_X_LEFT;
    const moodProportional = moodWithTag
      .map((e) => ({
        id: e.id,
        date: e.date,
        x: xForDate(e.date),
        score: SENTIMENT_FEAR_SCORE[e.sentiment!],
        sentiment: e.sentiment!,
      }))
      .sort((a, b) => a.x - b.x || a.date.localeCompare(b.date));

    const pinById = new Map(sorted.map((p) => [p.id, p.x]));
    const mood: Array<{
      id: string;
      date: string;
      x: number;
      score: number;
      sentiment: SentimentTag;
      carry?: boolean;
    }> = moodProportional.map((m) => ({
      ...m,
      x: pinById.get(m.id) ?? m.x,
    }));

    // Hold last score through to today (no new pin — visual continuity only)
    if (mood.length > 0) {
      const last = mood[mood.length - 1];
      if (todayMs > toMs(last.date)) {
        mood.push({
          id: 'mood-today-carry',
          date: todayIso,
          x: xForDate(todayIso),
          score: last.score,
          sentiment: last.sentiment,
          carry: true,
        });
      }
    }

    const lastMoodX = mood[mood.length - 1]?.x ?? PAD_X_LEFT;
    const todayX = xForDate(todayIso);
    const finalWidth = Math.max(
      width,
      lastPinX + PAD_X_RIGHT,
      lastMoodX + PAD_X_RIGHT,
      todayX + PAD_X_RIGHT,
    );
    const points = assignLanes(sorted);

    const yearSet = [
      ...new Set([
        ...events.map((e) => e.date.slice(0, 4)),
        ...moodWithTag.map((e) => e.date.slice(0, 4)),
        todayIso.slice(0, 4),
      ]),
    ].sort();
    const years = yearSet.map((year) => {
      const t = toMs(`${year}-07-01`);
      const clamped = Math.min(Math.max(t, minT), maxT);
      return {
        year,
        x: PAD_X_LEFT + ((clamped - minT) / span) * usable,
      };
    });

    return { width: finalWidth, points, years, mood, minT, maxT, usable };
  }, [events, moodEvents]);

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
      };
    }
    const amp = Math.min(stageHeight * 0.28, 120);
    const pts = layout.mood.map((m) => ({
      id: m.id,
      x: m.x,
      y: stageHeight / 2 - m.score * amp,
      sentiment: m.sentiment,
      carry: m.carry,
    }));
    return { path: smoothPath(pts), points: pts };
  }, [layout.mood, stageHeight]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = scrollerRef.current;
      const point =
        layout.points.find((p) => p.id === id) ??
        layout.mood.find((m) => m.id === id);
      if (!el || !point) return;
      const target = point.x - el.clientWidth / 2;
      el.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
    },
    [layout.points, layout.mood],
  );

  useEffect(() => {
    if (activeId) scrollToId(activeId);
  }, [activeId, scrollToId]);

  const onPointerDown = (e: React.PointerEvent) => {
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
  const hasPins = layout.points.length > 0;
  const hasMood = layout.mood.length > 0;

  if (!hasPins && !hasMood) {
    return (
      <div ref={stageRef} className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  const strokeOpacity = 0.88;
  const fillOpacity = 0.14;

  return (
    <div ref={stageRef} className="relative h-full w-full min-h-0">
      <p className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] text-muted-foreground/70">
        {dragHint}
      </p>

      {moodLabels && hasMood && (
        <div
          className={`pointer-events-none absolute bottom-3 z-20 max-w-[11.5rem] rounded-xl border border-border/50 bg-background/85 px-3 py-2.5 shadow-lg backdrop-blur-xl sm:max-w-[13rem] ${
            moodLegendClassName || 'right-3'
          }`}
        >
          <p className="text-[10px] font-semibold tracking-tight text-foreground/90">
            {moodLabels.title}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div
              aria-hidden
              className="h-10 w-1.5 shrink-0 rounded-full"
              style={{
                background:
                  'linear-gradient(to bottom, #991b1b 0%, #64748b 50%, #047857 100%)',
              }}
            />
            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-mono text-[9px] uppercase tracking-wider text-red-800/80 dark:text-red-300/80">
                {moodLabels.fear}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-800/80 dark:text-emerald-300/80">
                {moodLabels.enthusiasm}
              </p>
            </div>
          </div>
          <p className="mt-2 text-[9px] leading-snug text-muted-foreground">
            {moodLabels.hint}
          </p>
        </div>
      )}

      <div
        ref={scrollerRef}
        className={`absolute inset-0 overflow-x-auto overflow-y-hidden touch-pan-x ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ scrollbarWidth: 'thin' }}
      >
        <div
          className="relative select-none"
          style={{
            width: layout.width,
            height: stageHeight > 0 ? stageHeight : '100%',
          }}
        >
          {layout.years.map((y) => (
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

          {stageHeight > 0 && (
            <>
              <div
                aria-hidden
                className="absolute left-0 right-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ink/35 to-transparent dark:via-mark/30"
                style={{ top: midY }}
              />
              <div
                aria-hidden
                className="absolute left-0 right-0 h-4 -translate-y-1/2 bg-gradient-to-r from-transparent via-mark-muted to-transparent"
                style={{ top: midY }}
              />
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
                  <stop offset="0%" stopColor="#991b1b" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#64748b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="mood-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#991b1b" stopOpacity="0.25" />
                  <stop offset="50%" stopColor="#64748b" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d={`${moodGeometry.path} L ${moodGeometry.points[moodGeometry.points.length - 1].x} ${midY} L ${moodGeometry.points[0].x} ${midY} Z`}
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
              {moodGeometry.points
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

          {stageHeight > 0 &&
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
                    className={`absolute left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform ${pinBg} ${pinColor} ring-2 ${
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
                    className={`absolute left-1/2 z-20 w-[10.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border px-3 py-2 text-left transition-all sm:w-[12rem] ${
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
