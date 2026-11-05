'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from 'react';
import { ChevronDown } from 'lucide-react';
import {
  ALL_CAPABILITY_DOMAINS,
  CAPABILITY_DOMAIN_META,
  ALL_MODALITIES,
  MODALITY_META,
  orderedModalities,
  type CapabilityDomain,
  type Modality,
  formatEventDate,
  type LobbyPerson,
  type PositionStance,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { MARKET_BASE_DATE, MARKET_SOURCE, type MarketSeries } from '@/lib/data/market';
import { ZOOM_LEVELS, createTimeScale, timeTicks, type TimeTick } from '@/lib/trasparenza/scale';
import { axisMap, lensOf, moodScores } from '@/lib/trasparenza/spec';
import { cn } from '@/lib/utils';
import type { ScrubState } from './TimelineFeed';
import { MODALITY_ICON, SENTIMENT_META, STANCE_META } from './meta';
import { useTimelineSpec } from './TimelineSpecProvider';
import { PersonAvatar } from './PersonAvatar';
import { LabMark, hasLabMark } from './LabMark';

/** There is no layout to measure on the server, and `useLayoutEffect` warns there. */
const useLayoutEffectSafe = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Row height: tall enough to hold several internal lines of captions. */
const ROW_H_DESKTOP = 156;
/** Mobile leaves the caption lines at two, but the header needs the room for
    the lane's description to wrap whole instead of clipping. */
const ROW_H_MOBILE = 116;
/** Capabilities lane height: generous vertical space for multi-domain lines & levels. */
const CAP_ROW_H_DESKTOP = 270;
const CAP_ROW_H_MOBILE = 190;
/** Collapsed lane: a single-rail strip that holds the marks, none of the room. */
const COLLAPSED_H = 44;
/** Pitch of the caption lines inside a row. Also the room a 28px face needs. */
const LINE_H = 32;
/** Inset from the row edges, so the outermost line never clips. */
const LANE_PAD_Y = 14;
/** A caption is worth the ink only if the next mark is at least this far away:
    wide enough for the longest short name plus its chip. */
const LABEL_GAP_PX = 112;

/** How many caption lines the row can hold, centred on the rail. */
function lineCountFor(rowH: number, lineH: number, lanePadY: number): number {
  return Math.max(1, Math.floor((rowH - lanePadY * 2) / lineH));
}

/** Vertical offset of a caption line from the row centre. */
function lineDy(line: number, count: number, lineH: number): number {
  return (line - (count - 1) / 2) * lineH;
}

/**
 * Modality filter, models lane only. A pin with no modalities recorded is never
 * hidden: the field is being annotated over time, and letting the filter hide
 * the unannotated ones would empty the lane on the first toggle.
 */
function passesModalityFilter(event: TimelineEvent, enabled: Set<Modality>): boolean {
  if (enabled.size === ALL_MODALITIES.length) return true;
  if (!event.modalities?.length) return true;
  return event.modalities.some((modality) => enabled.has(modality));
}

/** Statement with no tone tag: the level is there, the editorial tone is not. */
const NEUTRAL_MARK = '#64748b';
/** Volume band under the lanes: how much was said, day by day. */
const VOLUME_H = 48;
const VOLUME_BAR = 6;
/** Sentiment band: the tone of verified quotes, as a bipolar curve. Tall
    enough that the line reads as a shape, not a wobble. */
const MOOD_H = 96;
/** Moving window (in days either side) that smooths the tone curve. */
const MOOD_WINDOW_DAYS = 3;
const MOOD_UP = '#047857';
const MOOD_MID = '#94a3b8';
const MOOD_DOWN = '#991b1b';
const DAY_MS = 86_400_000;
/** Market band: the listed actors' closes, rebased to 100, as lines. Context
    under the other two bands, so it stays flat while keeping six lines apart. */
const PRICE_H = 112;
/** The base every line is measured from. Drawn, because a line at 100 means
    nothing until you can see which level 100 is. */
const PRICE_BASE = 100;
/** Share of the index range, read in logarithms, left empty above and below,
    so a line never rides the very edge of the band. */
const PRICE_PAD = 0.08;
const PRICE_STROKE = 1.6;
/** Statement mark: the person's face. Every other form takes its lane's glyph. */
const FACE_PX = 28;

export type LaneLabels = {
  todayLabel: string;
  hint: string;
  /** Title of the volume band. */
  volume: string;
  volumeHint: string;
  /** "{count} voci": the day's total, on the volume tooltip. */
  volumeCount: string;
  /** Diary headline with no verified quote, tagged in the pin tooltip. */
  autoLabel: string;
  /** Title of the sentiment band. */
  sentiment: string;
  /** One line on what the curve reads, under the title. */
  sentimentBlurb: string;
  sentimentHint: string;
  /** The two halves of the curve, for the tiny legend. */
  fear: string;
  enthusiasm: string;
  /** Legend for the dashed stretch: the neutral level where no quote was recorded. */
  moodNeutral: string;
  /** Title of the market band. */
  market: string;
  /** One line under the title: what the lines read, and from what base. */
  marketBlurb: string;
  marketHint: string;
  /** "{source} · third-party data, not CC BY 4.0": the credit, with the
      source named when one is licensed for public display. */
  marketSource: string;
  /** "close": what the price on the band's hover read-out is. */
  marketClose: string;
  /** Toggle on each lane header. */
  collapseLane: string;
  expandLane: string;
};

type Props = {
  events: TimelineEvent[];
  people: Record<string, LobbyPerson>;
  /** Subjects of the market band, for line names and colours. */
  actors?: Record<string, { name: string; color: string }>;
  locale: 'it' | 'en';
  activeId: string | null;
  /** Lenses drawn as a compact strip. The data stays; only the room goes. */
  collapsedLenses?: string[];
  onToggleLensCollapsed?: (lens: string) => void;
  /** Feed scroll playhead: a moving cursor, no selection. */
  scrubId?: string | null;
  /**
   * Live position behind `scrubId`, read on every animation frame. The cursor
   * is drawn from this ref instead of from state, so scrolling the feed does
   * not re-render the whole chart once per day.
   */
  scrubRef?: RefObject<ScrubState | null>;
  onSelect: (id: string) => void;
  emptyLabel: string;
  labels: LaneLabels;
  typeLabel: (id: string) => string;
  sentimentLabel?: (tag: string) => string;
  /** Localised name of a lens, for the row header. */
  lensLabel?: (lens: string) => string;
  /**
   * When a thesis is selected: stance per event id. The mark then carries the
   * position instead of the tone of the quote.
   */
  stanceByEventId?: Record<string, PositionStance>;
  stanceLabel?: (stance: PositionStance) => string;
  /** Volume series: every voice of the day, drawn in the band under the lanes. */
  volumeEvents?: TimelineEvent[];
  /** Verified quotes only: they alone carry a tone, so they alone feed the curve. */
  moodEvents?: TimelineEvent[];
  /** Listed actors' closes, rebased to 100: context under the bands, not a reading. */
  marketSeries?: MarketSeries[];
  focusPresent?: boolean;
  /** Bump to re-centre on today (e.g. jump button) */
  presentFocusToken?: number;
  /** Bump to centre the lane view on activeId (list/click/keyboard) */
  focusEventToken?: number;
  /** Density step in force, one of ZOOM_LEVELS. Lifted so the chrome can show it. */
  zoom?: number;
  /** Reports every density change made inside the chart (buttons, ctrl+wheel). */
  onZoomChange?: (zoom: number) => void;
  /** Type step for the whole chart, one of TEXT_LEVELS. 1 is the drawn density. */
  textScale?: number;
};

/** Imperative handle: the chart owns the anchoring, the chrome only asks. */
export type LaneTimelineHandle = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
};

type LaneMark = {
  event: TimelineEvent;
  x: number;
  /** Which caption line inside the row the mark sits on. */
  line: number;
  /** Room for a short caption before the next mark: shown without hover. */
  room: boolean;
};

type Lane = {
  key: string;
  lens: string;
  name: string;
  /** One line on what the lane holds, under the name. */
  blurb: string;
  accent: string;
  /** Compact strip: one rail, no captions, the pin count on the header. */
  collapsed: boolean;
  /** Row height: the full lane, or the strip. */
  height: number;
  /** Caption lines the row can hold. One when collapsed. */
  lines: number;
  count: number;
  marks: LaneMark[];
};

type VolumeSegment = { lens: string; count: number; y: number; h: number };

/** One day of the volume band: its voices, split by the lane they came from. */
type VolumeBar = {
  key: string;
  date: string;
  x: number;
  count: number;
  /** Stacked height of the whole bar. */
  h: number;
  segments: VolumeSegment[];
};

/** The subject a pin speaks for: people and companies, statements only. */
export type EventSubject = { kind: 'person' | 'actor'; id: string };

export function subjectOf(event: TimelineEvent): EventSubject | null {
  if (event.type !== 'statement') return null;
  if (event.personId) return { kind: 'person', id: event.personId };
  if (event.actorId) return { kind: 'actor', id: event.actorId };
  return null;
}

/**
 * A pin reads better with the thing itself than with its form: "Il Consiglio
 * adotta l'AI Act" says more than "Legislativo". Titles lead with the subject,
 * then qualify it after a separator ("AI Office: Code of Practice…"), so the
 * head is the part worth keeping; the chip clips whatever runs long.
 */
function shortTitle(title: string): string {
  return title.split(/[:—–,]/)[0].trim() || title.trim();
}

/** The band plots indices, so a hover has to give the price back: US dollars,
    as quoted, which is the only figure a reader can check against the market. */
function formatPrice(value: number, locale: 'it' | 'en'): string {
  return new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * The silhouette of a pin is its lane. A shape says which row you are on before
 * the colour does, and keeps every lane from reading like the one above it:
 * a tile for the models (which mostly carry their lab's own mark), a spark for
 * the research, a measure for the market, a square for the institutions, a
 * round mark for what is said in public.
 */
function lensShape(lens: string): { clipPath?: string; borderRadius?: string } {
  switch (lens) {
    case 'models':
      return { borderRadius: '3px' };
    case 'research':
      return { clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)' };
    case 'business':
      return { clipPath: 'polygon(50% 0,100% 100%,0 100%)' };
    case 'policy':
      return { borderRadius: '2px' };
    case 'capabilities':
      return { clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' };
    default:
      return { borderRadius: '9999px' };
  }
}

function capabilityY(score: number, rowHeight: number): number {
  const pad = 18;
  const ratio = Math.max(0, Math.min(1, score / 100));
  return rowHeight - pad - ratio * (rowHeight - pad * 2);
}

type DomainLine = {
  domain: CapabilityDomain;
  color: string;
  lineD: string;
  areaD: string;
  /** The highest point on this line — used to position the domain label. */
  peakX: number;
  peakY: number;
};

/**
 * Build one smooth spline per capability domain from the events that carry
 * `capabilityScores`. Each domain only draws through the events that have a
 * score for it; events without a score for a domain are silently skipped.
 */
function buildDomainLines(
  marks: LaneMark[],
  rowHeight: number,
  enabledDomains?: Set<CapabilityDomain>,
): DomainLine[] {
  const lines: DomainLine[] = [];
  const domains = enabledDomains
    ? ALL_CAPABILITY_DOMAINS.filter((d) => enabledDomains.has(d))
    : ALL_CAPABILITY_DOMAINS;

  for (const domain of domains) {
    const meta = CAPABILITY_DOMAIN_META[domain];
    const scored = marks
      .filter((m) => m.event.capabilityScores?.[domain] != null)
      .sort((a, b) => a.x - b.x);

    if (scored.length < 2) continue;

    const points = scored.map((m) => ({
      x: m.x,
      y: capabilityY(m.event.capabilityScores![domain]!, rowHeight),
      score: m.event.capabilityScores![domain]!,
    }));

    // Build smooth cubic bezier path
    let lineD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const c1x = prev.x + (curr.x - prev.x) * 0.45;
      const c2x = prev.x + (curr.x - prev.x) * 0.55;
      lineD += ` C ${c1x} ${prev.y}, ${c2x} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    const bottomY = rowHeight - 18;
    const last = points[points.length - 1];
    const areaD = `${lineD} L ${last.x} ${bottomY} L ${points[0].x} ${bottomY} Z`;

    const peak = points.reduce((best, p) => (p.score > best.score ? p : best), points[0]);

    lines.push({
      domain,
      color: meta.color,
      lineD,
      areaD,
      peakX: peak.x,
      peakY: peak.y,
    });
  }

  return lines;
}

/** Primary domain for a capability event — used for pin color and badge. */
function primaryCapDomain(event: TimelineEvent): CapabilityDomain | null {
  if (event.capabilityDomain) return event.capabilityDomain;
  if (event.capabilityScores) {
    let bestDomain: CapabilityDomain | null = null;
    let bestScore = -1;
    for (const d of ALL_CAPABILITY_DOMAINS) {
      const s = event.capabilityScores[d];
      if (s != null && s > bestScore) {
        bestScore = s;
        bestDomain = d;
      }
    }
    return bestDomain;
  }
  return null;
}

/**
 * For a capability milestone, resolve the score and domain to use
 * based on the currently enabled domains.
 * If the primary domain is enabled and has a score, it is preferred;
 * otherwise the highest score among the enabled domains is picked.
 */
function activeCapData(
  event: TimelineEvent,
  enabled: Set<CapabilityDomain>,
): { score: number; domain: CapabilityDomain } | null {
  if (!event.capabilityScores) return null;
  if (
    event.capabilityDomain &&
    enabled.has(event.capabilityDomain) &&
    event.capabilityScores[event.capabilityDomain] != null
  ) {
    return {
      score: event.capabilityScores[event.capabilityDomain]!,
      domain: event.capabilityDomain,
    };
  }
  let bestDomain: CapabilityDomain | null = null;
  let bestScore = -1;
  for (const d of ALL_CAPABILITY_DOMAINS) {
    if (!enabled.has(d)) continue;
    const s = event.capabilityScores[d];
    if (s != null && s > bestScore) {
      bestScore = s;
      bestDomain = d;
    }
  }
  if (bestDomain && bestScore >= 0) {
    return { score: bestScore, domain: bestDomain };
  }
  return null;
}

export const LaneTimeline = forwardRef<LaneTimelineHandle, Props>(function LaneTimeline(
  {
    events,
    people,
    actors = {},
    locale,
    activeId,
    collapsedLenses,
    onToggleLensCollapsed,
    scrubId = null,
    scrubRef,
    onSelect,
    emptyLabel,
    labels,
    typeLabel,
    sentimentLabel,
    lensLabel,
    stanceByEventId,
    stanceLabel,
    volumeEvents,
    moodEvents,
    marketSeries,
    focusPresent = false,
    presentFocusToken = 0,
    focusEventToken = 0,
    zoom = 1,
    onZoomChange,
    textScale = 1,
  }: Props,
  ref,
) {
  const spec = useTimelineSpec();
  const lensAxes = useMemo(() => axisMap(spec.lenses), [spec]);
  const toneScores = useMemo(() => moodScores(spec), [spec]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const moodGradId = useId().replace(/:/g, '');
  const volClipId = useId().replace(/:/g, '');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredVolume, setHoveredVolume] = useState<string | null>(null);
  /** Listed actor whose price line is picked out of the band; the rest dim. */
  const [hoveredTicker, setHoveredTicker] = useState<string | null>(null);
  /** Week under the pointer on the market band: the day whose closes are read. */
  const [hoveredPriceDate, setHoveredPriceDate] = useState<string | null>(null);
  const [labelW, setLabelW] = useState(168);
  const [rowH, setRowH] = useState(ROW_H_DESKTOP);
  const [enabledDomains, setEnabledDomains] = useState<Set<CapabilityDomain>>(
    () => new Set(ALL_CAPABILITY_DOMAINS),
  );
  const [hoveredLegendDomain, setHoveredLegendDomain] = useState<CapabilityDomain | null>(null);
  const [enabledModalities, setEnabledModalities] = useState<Set<Modality>>(
    () => new Set(ALL_MODALITIES),
  );

  const toggleDomain = (domain: CapabilityDomain, e: React.MouseEvent) => {
    e.stopPropagation();
    setEnabledDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) {
        if (next.size > 1) {
          next.delete(domain);
        } else {
          return new Set(ALL_CAPABILITY_DOMAINS);
        }
      } else {
        next.add(domain);
      }
      return next;
    });
  };

  const toggleModality = (modality: Modality, e: React.MouseEvent) => {
    e.stopPropagation();
    setEnabledModalities((prev) => {
      const next = new Set(prev);
      if (next.has(modality)) {
        if (next.size > 1) {
          next.delete(modality);
        } else {
          return new Set(ALL_MODALITIES);
        }
      } else {
        next.add(modality);
      }
      return next;
    });
  };

  /** Playhead furniture: moved imperatively on each frame, never via state. */
  const playheadRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const update = () => {
      const narrow = window.innerWidth < 640;
      // The lane header carries type too, so its column follows the text step.
      setLabelW((narrow ? 112 : 168) * textScale);
      setRowH(narrow ? ROW_H_MOBILE : ROW_H_DESKTOP);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [textScale]);

  /**
   * Metrics calibrated to the type. They follow the text step, so a larger
   * setting re-lays the chart out — captions need a wider gap and a taller
   * line — instead of letting bigger labels collide. Row heights stay put, so
   * the page does not grow: fewer caption lines fit, and that is the trade.
   */
  const { lineH, lanePadY, labelGap, facePx } = useMemo(
    () => ({
      lineH: LINE_H * textScale,
      lanePadY: LANE_PAD_Y * textScale,
      labelGap: LABEL_GAP_PX * textScale,
      facePx: FACE_PX * textScale,
    }),
    [textScale],
  );

  const lineCount = lineCountFor(rowH, lineH, lanePadY);
  const collapsedSet = useMemo(() => new Set(collapsedLenses ?? []), [collapsedLenses]);

  const layout = useMemo(() => {
    const scale = createTimeScale(events.map((e) => e.date), {
      padLeft: 28,
      padRight: 48,
      minWidth: 900,
      zoom,
    });

    /**
     * Spread one lane's marks across its caption lines. A mark takes the line
     * nearest the rail that leaves a full caption's width after the previous
     * mark on it; only when every line is busy does it settle for the roomiest.
     * That is what buys captions: the same pins, on separate runs.
     */
    const buildMarks = (items: TimelineEvent[], lines: number, flat: boolean): LaneMark[] => {
      const marks: LaneMark[] = items
        .map((event) => ({ event, x: scale.xForDate(event.date), line: 0, room: false }))
        .sort((a, b) => a.x - b.x || a.event.date.localeCompare(b.event.date));

      const order = Array.from({ length: lines }, (_, i) => i).sort(
        (a, b) => Math.abs(lineDy(a, lines, lineH)) - Math.abs(lineDy(b, lines, lineH)) || a - b,
      );
      const lastX = Array.from({ length: lines }, () => Number.NEGATIVE_INFINITY);
      for (const mark of marks) {
        const free = order.find((i) => mark.x - lastX[i] >= labelGap);
        const line =
          free ?? order.reduce((best, i) => (lastX[i] < lastX[best] ? i : best), order[0]);
        mark.line = line;
        lastX[line] = mark.x;
      }

      // Per line: a caption is worth it only where nothing follows within its
      // width, and where it still fits before the right edge of the scale.
      const byLine = new Map<number, LaneMark[]>();
      for (const mark of marks) {
        const list = byLine.get(mark.line);
        if (list) list.push(mark);
        else byLine.set(mark.line, [mark]);
      }
      for (const list of byLine.values()) {
        list.forEach((mark, i) => {
          const next = list[i + 1];
          mark.room =
            !flat &&
            (!next || next.x - mark.x >= labelGap) &&
            mark.x + labelGap <= scale.width;
        });
      }
      return marks;
    };

    // One row per story of the field: the lens decides the row and the
    // silhouette of its marks. The modality filter is applied here rather than
    // at render, so the surviving pins re-pack their caption lines instead of
    // leaving gaps where the hidden ones used to be.
    const lanes: Lane[] = spec.lenses
      .map((axis) => {
        const lens = axis.key;
        return {
          lens,
          items: events.filter(
            (event) =>
              lensOf(event, spec) === lens &&
              (lens !== 'models' || passesModalityFilter(event, enabledModalities)),
          ),
        };
      })
      .filter((entry) => entry.items.length > 0)
      .map(({ lens, items }) => {
        const collapsed = collapsedSet.has(lens);
        const lines = collapsed ? 1 : lineCount;
        const axis = lensAxes.get(lens);
        return {
          key: `lens:${lens}`,
          lens,
          name: lensLabel?.(lens) ?? axis?.label?.[locale] ?? lens,
          blurb: axis?.blurb?.[locale] ?? '',
          accent: axis?.color ?? 'currentColor',
          collapsed,
          height: collapsed
            ? COLLAPSED_H
            : lens === 'capabilities'
              ? (rowH === ROW_H_MOBILE ? CAP_ROW_H_MOBILE : CAP_ROW_H_DESKTOP)
              : rowH,
          lines,
          count: items.length,
          marks: buildMarks(items, lines, collapsed),
        };
      });

    // Lanes no longer share a height, so the vertical furniture (gridlines,
    // the today line) measures the stack instead of multiplying a constant.
    const lanesHeight = lanes.reduce((sum, lane) => sum + lane.height, 0);

    // Volume band: one stacked bar per day, oldest first. Each bar is the
    // day's voices split by the lane that produced them, so the band reads
    // against the rows above it instead of on its own. Volume only — the tone
    // of a headline is not the stance of the person it mentions.
    const buckets = new Map<string, { count: number; xSum: number; byLens: Map<string, number> }>();
    for (const event of volumeEvents ?? []) {
      const key = event.date.slice(0, 10);
      const bucket = buckets.get(key) ?? { count: 0, xSum: 0, byLens: new Map<string, number>() };
      bucket.count += 1;
      bucket.xSum += scale.xForDate(key);
      const lens = lensOf(event, spec);
      bucket.byLens.set(lens, (bucket.byLens.get(lens) ?? 0) + 1);
      buckets.set(key, bucket);
    }
    const rawVolume = [...buckets.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, bucket]) => ({
        key,
        date: key,
        x: bucket.xSum / bucket.count,
        count: bucket.count,
        byLens: bucket.byLens,
      }));
    const maxVolume = Math.max(1, ...rawVolume.map((bar) => bar.count));
    // A taller range plus a small floor keeps a one-voice day apart from a
    // two-voice one, instead of both collapsing to the same stub.
    const volumeRange = VOLUME_H - 12;
    const volume: VolumeBar[] = rawVolume.map((bar) => {
      const h = Math.max(2.5, (bar.count / maxVolume) * volumeRange);
      let cursor = VOLUME_H - 5;
      const segments: VolumeSegment[] = spec.lenses
        .filter((axis) => bar.byLens.has(axis.key))
        .map((axis) => {
          const lens = axis.key;
          const count = bar.byLens.get(lens) ?? 0;
          const segH = (count / bar.count) * h;
          const y = cursor - segH;
          cursor = y;
          return { lens, count, y, h: segH };
        });
      return { key: bar.key, date: bar.date, x: bar.x, count: bar.count, h, segments };
    });

    // Tone curve: a bipolar, smoothed reading of verified quotes only.
    // Fear pulls the line down, optimism lifts it; silence breaks the line.
    const dayStats = new Map<string, { fear: number; count: number }>();
    for (const event of moodEvents ?? []) {
      if (!event.sentiment) continue;
      const key = event.date.slice(0, 10);
      const stat = dayStats.get(key) ?? { fear: 0, count: 0 };
      stat.fear += toneScores[event.sentiment] ?? 0;
      stat.count += 1;
      dayStats.set(key, stat);
    }
    const toDay = (iso: string) =>
      Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
    const anchors = [...dayStats.entries()]
      .map(([day, stat]) => ({ day, t: toDay(day), fear: stat.fear, count: stat.count }))
      .sort((a, b) => a.t - b.t);
    const points = anchors.map((anchor) => {
      let fear = 0;
      let count = 0;
      for (const other of anchors) {
        if (Math.abs(other.t - anchor.t) <= MOOD_WINDOW_DAYS * DAY_MS) {
          fear += other.fear;
          count += other.count;
        }
      }
      const value = count ? -fear / count : 0;
      return { day: anchor.day, x: scale.xForDate(anchor.day), value };
    });

    return {
      scale,
      lanes,
      lanesHeight,
      ticks: timeTicks(scale),
      volume,
      moodPoints: points,
    };
  }, [
    events,
    locale,
    lensLabel,
    volumeEvents,
    moodEvents,
    lineCount,
    rowH,
    collapsedSet,
    zoom,
    lineH,
    labelGap,
    enabledModalities,
    spec,
    lensAxes,
    toneScores,
  ]);

  const { scale, lanes, lanesHeight, ticks, volume, moodPoints } = layout;
  const moodAmp = MOOD_H / 2 - 10;
  const moodY = (value: number) => MOOD_H / 2 - value * moodAmp;
  /** Neutral level: where the line rests while no quote is on record. */
  const moodNeutralY = moodY(0);
  const moodFirst = moodPoints[0];
  const moodLast = moodPoints[moodPoints.length - 1];
  const contentW = labelW + scale.width;

  /**
   * Market band: one line per listed actor, all on one index scale. The base
   * is kept inside the range even when no close returns to it, because a line
   * at 340 says nothing until the level 100 is visible under it.
   */
  const price = useMemo(() => {
    const points = (marketSeries ?? []).flatMap((series) => series.points);
    if (!points.length) return null;

    const values = points.map((point) => point.index);
    const lo = Math.min(PRICE_BASE, ...values);
    const hi = Math.max(PRICE_BASE, ...values);
    // Logarithmic, because the lines span two orders of magnitude: a linear
    // axis lets one line rising four hundredfold press every other onto the
    // floor. Equal vertical steps then read as equal percentage moves, which
    // is how an index comparison is read anyway.
    const pad = Math.log(hi / lo) * PRICE_PAD || 0.01;
    const top = Math.log(hi) + pad;
    const bottom = Math.log(lo) - pad;
    const y = (index: number) =>
      PRICE_H - ((Math.log(index) - bottom) / (top - bottom)) * PRICE_H;

    return {
      baseY: y(PRICE_BASE),
      /** Every day any line carries a close on, left to right: the columns the
          pointer reads, and the x the vertical guide is drawn at. */
      days: [...new Set(points.map((point) => point.date))].sort().map((date) => ({
        date,
        x: scale.xForDate(date),
      })),
      lines: (marketSeries ?? []).map((series) => {
        const actor = actors[series.actorId];
        return {
          actorId: series.actorId,
          ticker: series.ticker,
          exchange: series.exchange,
          /** The actor behind the ticker, spelled out: a bare ticker is jargon. */
          name: actor?.name ?? series.ticker,
          /** The actor's own colour: the same one its pins carry in the lanes. */
          color: actor?.color ?? NEUTRAL_MARK,
          /** The close 100 stands for, to turn a level back into a price. */
          baseClose: series.baseClose,
          points: series.points
            .map((point) => `${scale.xForDate(point.date)},${y(point.index)}`)
            .join(' '),
          /** Index and y per day, so a hover resolves a close without a rescan. */
          byDate: new Map(
            series.points.map((point) => [point.date, { index: point.index, y: y(point.index) }]),
          ),
        };
      }),
    };
  }, [marketSeries, scale, actors]);

  /** Credit: the source named when one is licensed, the third-party notice alone
      otherwise. The data is not ours, so it never rides the CC BY 4.0 grant. */
  const priceCredit = labels.marketSource
    .replace('{source}', MARKET_SOURCE.label)
    .replace(/^\s*·\s*/, '');

  /**
   * Pointer on the market band. The closes are weekly, too far apart to demand a
   * hit on the drawn day, so the pointer resolves to the nearest column and the
   * read-out names the day it landed on.
   */
  const hoverPrice = useCallback(
    (event: MouseEvent<SVGRectElement>) => {
      if (!price || !price.days.length) return;
      const days = price.days;
      const x = event.clientX - event.currentTarget.getBoundingClientRect().left;
      let lo = 0;
      let hi = days.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (days[mid].x < x) lo = mid + 1;
        else hi = mid;
      }
      const after = days[lo];
      const before = days[lo - 1] ?? after;
      setHoveredPriceDate(
        Math.abs(after.x - x) <= Math.abs(x - before.x) ? after.date : before.date,
      );
    },
    [price],
  );

  /** The day being read, with the x the guide is drawn at. */
  const hoveredDay = price?.days.find((day) => day.date === hoveredPriceDate) ?? null;

  /**
   * Pointer place captured just before a density change: its share of the time
   * strip (so the same instant keeps its spot under the cursor) and its offset
   * from the scroller's left edge. The share alone drives the re-anchor, since
   * a zoom only scales the strip — the distortion at the recent end rides along.
   */
  const anchorRef = useRef<{ frac: number; offset: number } | null>(null);

  /** Read the pointer's spot on the axis before the scale is rebuilt. */
  const captureAnchor = useCallback(
    (clientX?: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = clientX != null ? clientX - rect.left : el.clientWidth / 2;
      const xInScale = el.scrollLeft + offset - labelW;
      anchorRef.current = {
        frac: Math.min(Math.max((xInScale - scale.padLeft) / scale.span, 0), 1),
        offset,
      };
    },
    [labelW, scale.padLeft, scale.span],
  );

  /** One step up or down, anchored on the pointer (or the view centre). */
  const requestZoom = useCallback(
    (next: number, clientX?: number) => {
      const clamped = Math.min(Math.max(next, 0), ZOOM_LEVELS.length - 1);
      const value = ZOOM_LEVELS[clamped];
      if (value === zoom) return;
      captureAnchor(clientX);
      onZoomChange?.(value);
    },
    [zoom, captureAnchor, onZoomChange],
  );

  useImperativeHandle(
    ref,
    () => ({
      zoomIn: () => requestZoom(ZOOM_LEVELS.indexOf(zoom as (typeof ZOOM_LEVELS)[number]) + 1),
      zoomOut: () => requestZoom(ZOOM_LEVELS.indexOf(zoom as (typeof ZOOM_LEVELS)[number]) - 1),
      resetZoom: () => requestZoom(0),
    }),
    [requestZoom, zoom],
  );

  /**
   * Ctrl/⌘ + wheel is how a trackpad pinch arrives. Plain wheel stays a pan,
   * so the axes keep working the way they did.
   */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.deltaY === 0) return;
      event.preventDefault();
      const index = ZOOM_LEVELS.indexOf(zoom as (typeof ZOOM_LEVELS)[number]);
      requestZoom(index + (event.deltaY < 0 ? 1 : -1), event.clientX);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [requestZoom, zoom]);

  /**
   * The wider (or narrower) content has been laid out: put the anchored instant
   * back under the pointer. Runs before paint, so there is no visible jump.
   */
  useLayoutEffectSafe(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    anchorRef.current = null;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = Math.max(0, labelW + scale.padLeft + anchor.frac * scale.span - anchor.offset);
  }, [scale, labelW]);

  /** Event id → mark x, so the playhead resolves without a flat scan. */
  const markById = useMemo(() => {
    const map = new Map<string, LaneMark>();
    for (const lane of lanes) for (const mark of lane.marks) map.set(mark.event.id, mark);
    return map;
  }, [lanes]);

  /** The feed is driving the cursor, and the target row is actually drawn. */
  const scrubbing = scrubId != null && scrubId !== activeId && markById.has(scrubId);

  /** Axis strip height: deep enough that the "today" badge never meets the
      tick labels, and the gridlines hang from its lower edge. */
  const AXIS_H = 40;
  const monthFmt = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
        month: 'short',
        timeZone: 'UTC',
      }),
    [locale],
  );
  const tickLabel = (tick: TimeTick) =>
    tick.kind === 'year'
      ? tick.date.slice(0, 4)
      : monthFmt.format(new Date(`${tick.date}T00:00:00Z`));

  /** Centre the given content-x in the viewport. */
  const scrollToX = useCallback(
    (x: number, behavior: ScrollBehavior) => {
      const el = scrollerRef.current;
      if (!el) return;
      const target = labelW + x - el.clientWidth / 2;
      el.scrollTo({ left: Math.max(0, target), behavior });
    },
    [labelW],
  );

  /**
   * First paint parks the view on today. The retry loop waits for the scroller
   * to have real dimensions: React remounts the effect, and a stale DOM width
   * would centre on the wrong pixel.
   */
  const presentCentered = useRef(false);
  useEffect(() => {
    if (!focusPresent || presentCentered.current || events.length === 0) return;
    let raf = 0;
    let attempts = 0;
    const tick = () => {
      const el = scrollerRef.current;
      if (el && el.clientWidth > 0) {
        el.scrollLeft = Math.max(0, labelW + scale.todayX - el.clientWidth / 2);
        presentCentered.current = true;
        return;
      }
      if (attempts++ < 40) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [focusPresent, events.length, labelW, scale.todayX]);

  const lastPresentToken = useRef(0);
  useEffect(() => {
    // Only a fresh jump moves the view. A density change rebuilds `todayX`, and
    // re-centring on it there would undo the zoom's own anchoring.
    if (presentFocusToken === 0 || presentFocusToken === lastPresentToken.current) return;
    lastPresentToken.current = presentFocusToken;
    presentCentered.current = true;
    scrollToX(scale.todayX, 'smooth');
  }, [presentFocusToken, scrollToX, scale.todayX]);

  const lastFocusToken = useRef(0);
  useEffect(() => {
    // Only a fresh selection moves the view; a resize or a collapse toggle
    // reshapes `lanes` and must not drag the reader back to the active pin.
    if (focusEventToken === 0 || focusEventToken === lastFocusToken.current) return;
    lastFocusToken.current = focusEventToken;
    if (!activeId) return;
    const lane = lanes.find((entry) => entry.marks.some((m) => m.event.id === activeId));
    const mark = lane?.marks.find((m) => m.event.id === activeId);
    if (!mark) return;
    // Reveal the row before centring: a pin inside a collapsed strip would
    // scroll to a mark the reader cannot see.
    if (lane?.collapsed) onToggleLensCollapsed?.(lane.lens);
    scrollToX(mark.x, 'smooth');
  }, [focusEventToken, activeId, lanes, scrollToX, onToggleLensCollapsed]);

  /**
   * Feed scroll playhead. One frame loop draws the cursor and follows it: the
   * x is interpolated between the two marks that bracket the feed position, so
   * the line slides rather than snapping day by day, and the canvas pans by
   * easing `scrollLeft` itself — repeated `scrollTo({behavior:'smooth'})` used
   * to interrupt one another and stutter.
   */
  useEffect(() => {
    const line = playheadRef.current;
    const chip = chipRef.current;
    const hide = () => {
      if (line) line.style.opacity = '0';
      if (chip) {
        chip.style.opacity = '0';
        chip.textContent = '';
      }
    };
    if (!scrubbing) {
      hide();
      return;
    }

    const el = scrollerRef.current;
    let raf = 0;
    /** Last painted x, so a still cursor costs no style writes. */
    let paintedX: number | null = null;
    let visible = false;
    let shownId: string | null = null;
    /** Last target seen, to tell "the feed is moving" from "the view is still". */
    let lastTarget: number | null = null;

    const tick = () => {
      const state = scrubRef?.current;
      const x0 = state ? markById.get(state.id)?.x : undefined;
      if (!state || x0 == null) {
        if (visible) {
          hide();
          visible = false;
          paintedX = null;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      // The feed already hands us a continuous position, so the cursor follows
      // it directly: no easing, no lag behind a fast scroll.
      const x1 = state.nextId ? markById.get(state.nextId)?.x : undefined;
      const target = x1 != null ? x0 + state.frac * (x1 - x0) : x0;

      if (!visible) {
        visible = true;
        if (line) line.style.opacity = '1';
        if (chip) chip.style.opacity = '1';
      }
      if (paintedX == null || Math.abs(target - paintedX) >= 0.08) {
        paintedX = target;
        if (line) line.style.transform = `translateX(${labelW + target}px)`;
        if (chip) chip.style.transform = `translateX(calc(${target}px - 50%))`;
      }
      if (chip && shownId !== state.id) {
        const mark = markById.get(state.id);
        if (mark) chip.textContent = formatEventDate(mark.event.date, locale);
        shownId = state.id;
      }

      const moving = lastTarget == null || Math.abs(target - lastTarget) >= 0.5;
      lastTarget = target;

      // Follow the cursor while the feed moves; leave a manual pan alone.
      if (moving && el && el.clientWidth > 0) {
        const contentX = labelW + target;
        const margin = Math.max(56, el.clientWidth * 0.26);
        const left = el.scrollLeft + margin;
        const right = el.scrollLeft + el.clientWidth - margin;
        let goal = el.scrollLeft;
        if (contentX < left) goal = contentX - margin;
        else if (contentX > right) goal = contentX - el.clientWidth + margin;
        if (goal !== el.scrollLeft) {
          const next = Math.max(0, el.scrollLeft + (goal - el.scrollLeft) * 0.35);
          el.scrollLeft = Math.abs(goal - next) < 0.6 ? Math.max(0, goal) : next;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      hide();
    };
  }, [scrubbing, scrubRef, markById, labelW, locale]);

  if (events.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    );
  }

  return (
    /* Padding clears the floating chrome: the search row, then the axis.
       Everything else the axis needs lives in the sidebar, not above it. */
    <div
      className="relative h-full w-full pt-[calc(var(--nav-clearance)+4.5rem)]"
      /* One multiplier for every size in the chart, read by the tl-fs-* utilities. */
      style={{ '--tl-text': textScale } as React.CSSProperties}
    >
      <div
        ref={scrollerRef}
        className="h-full overflow-auto overscroll-x-contain"
        aria-label={labels.hint}
      >
        <div className="relative" style={{ width: contentW, minHeight: '100%' }}>
          {/* Year axis. Sticky to the top: it holds still while the lanes
              scroll under it, so the time reference is never lost. It still
              pans with the content horizontally, or the ticks would drift off
              their columns. The corner carries the legend of the lane glyphs. */}
          <div
            className="sticky top-0 z-40 flex items-end border-b border-border/30 bg-background/95 backdrop-blur-sm"
            style={{ width: contentW, height: AXIS_H }}
          >
            <div
              className="sticky left-0 z-30 flex h-full items-center gap-1.5 border-r border-border/40 bg-background/95 pl-2.5 pr-2 backdrop-blur-sm sm:pl-4"
              style={{ width: labelW }}
            >
              {spec.lenses.map((axis) => (
                <span
                  key={axis.key}
                  title={axis.label?.[locale] ?? axis.key}
                  aria-hidden
                  className="block h-2.5 w-2.5 shrink-0"
                  style={{ ...lensShape(axis.key), backgroundColor: axis.color ?? 'currentColor' }}
                />
              ))}
            </div>
            <div className="relative h-full" style={{ width: scale.width }}>
              {ticks.map((tick) => (
                <span
                  key={tick.date}
                  className={cn(
                    'absolute bottom-1 -translate-x-1/2 font-mono whitespace-nowrap',
                    tick.kind === 'year'
                      ? 'tl-fs-10 font-medium text-muted-foreground'
                      : 'tl-fs-9 text-faint-foreground',
                  )}
                  style={{ left: tick.x }}
                >
                  {tickLabel(tick)}
                </span>
              ))}
              <span
                className="pointer-events-none absolute top-0.5 z-20 -translate-x-1/2 rounded-full border border-border/60 bg-background px-2 py-0.5 font-mono tl-fs-10 text-foreground/80"
                style={{ left: scale.todayX }}
              >
                {labels.todayLabel}
              </span>
              <span
                ref={chipRef}
                aria-hidden
                className="pointer-events-none absolute top-0.5 z-20 rounded-full border border-border/60 bg-background px-2 py-0.5 font-mono tl-fs-10 text-muted-foreground opacity-0"
                style={{ left: 0, willChange: 'transform' }}
              />
            </div>
          </div>

          {/* Gridlines: years carry the weight, months fill the detail. They
              stop at the last lane so they never fight with the two bands. */}
          {ticks.map((tick) => (
            <div
              key={`grid-${tick.date}`}
              aria-hidden
              className={cn(
                'pointer-events-none absolute z-0 w-px',
                tick.kind === 'year' ? 'bg-foreground/12' : 'bg-foreground/6',
              )}
              style={{ left: labelW + tick.x, top: AXIS_H, height: lanesHeight }}
            />
          ))}

          {/* Today, across every lane */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 z-10 w-px bg-foreground/20"
            style={{ left: labelW + scale.todayX, top: AXIS_H }}
          />

          {/* Feed playhead: the item in view in the right column. Its x is
              painted imperatively each frame, so it slides with the scroll. */}
          <div
            ref={playheadRef}
            aria-hidden
            className="pointer-events-none absolute bottom-0 z-10 w-px bg-foreground/30 opacity-0"
            style={{ left: 0, top: AXIS_H, willChange: 'transform' }}
          />

          {lanes.map((lane) => (
            <div
              key={lane.key}
              className="relative flex"
              style={{ height: lane.height, width: contentW }}
            >
              <div
                className="sticky left-0 z-30 flex h-full flex-col justify-center gap-0.5 border-r border-border/40 bg-background/95 pl-2.5 pr-2 backdrop-blur-sm sm:pl-4"
                style={{ width: labelW }}
              >
                <button
                  type="button"
                  onClick={() => onToggleLensCollapsed?.(lane.lens)}
                  disabled={!onToggleLensCollapsed}
                  aria-expanded={!lane.collapsed}
                  aria-label={lane.collapsed ? labels.expandLane : labels.collapseLane}
                  title={lane.collapsed ? labels.expandLane : labels.collapseLane}
                  className="flex w-full items-center gap-1.5 rounded pr-1 text-left outline-none transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground/25 disabled:cursor-default"
                >
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      'h-3 w-3 shrink-0 text-faint-foreground transition-transform',
                      lane.collapsed && '-rotate-90',
                    )}
                  />
                  <span
                    aria-hidden
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: lane.accent }}
                  />
                  <span className="min-w-0 flex-1 truncate tl-fs-13 font-semibold leading-tight">
                    {lane.name}
                  </span>
                  {lane.collapsed && (
                    <span className="shrink-0 font-mono tl-fs-10 text-faint-foreground">
                      {lane.count}
                    </span>
                  )}
                </button>
                {!lane.collapsed && (
                  <span className="pl-5 tl-fs-10 leading-snug text-pretty text-faint-foreground">
                    {lane.blurb}
                  </span>
                )}
                {!lane.collapsed && lane.lens === 'capabilities' && (
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5 pl-5">
                    {ALL_CAPABILITY_DOMAINS.map((dom) => {
                      const active = enabledDomains.has(dom);
                      const meta = CAPABILITY_DOMAIN_META[dom];
                      return (
                        <button
                          key={dom}
                          type="button"
                          onClick={(e) => toggleDomain(dom, e)}
                          onMouseEnter={() => setHoveredLegendDomain(dom)}
                          onMouseLeave={() => setHoveredLegendDomain(null)}
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono tl-fs-9 transition-all cursor-pointer select-none',
                            active
                              ? 'border-border/60 bg-background text-foreground shadow-xs'
                              : 'border-transparent bg-muted/30 text-faint-foreground hover:text-muted-foreground',
                          )}
                          style={{
                            borderColor: active ? `${meta.color}66` : undefined,
                          }}
                          title={
                            active
                              ? locale === 'it'
                                ? `Clicca per nascondere ${meta.label.it}`
                                : `Click to hide ${meta.label.en}`
                              : locale === 'it'
                                ? `Clicca per mostrare ${meta.label.it}`
                                : `Click to show ${meta.label.en}`
                          }
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 shrink-0 rounded-full transition-opacity',
                              !active && 'opacity-25',
                            )}
                            style={{ backgroundColor: meta.color }}
                          />
                          <span className={cn(!active && 'line-through')}>
                            {meta.label[locale]}
                          </span>
                        </button>
                      );
                    })}
                    {enabledDomains.size < ALL_CAPABILITY_DOMAINS.length && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnabledDomains(new Set(ALL_CAPABILITY_DOMAINS));
                        }}
                        className="inline-flex items-center rounded px-1.5 py-0.5 font-mono tl-fs-9 text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
                      >
                        {locale === 'it' ? 'Mostra tutti' : 'Show all'}
                      </button>
                    )}
                  </div>
                )}
                {/* Modality filter, models lane only. Desktop only: in the narrow
                    column the pills would wrap past the row and spill into the
                    next lane. Touch readers get the modality from the feed and
                    the record page instead. */}
                {!lane.collapsed && lane.lens === 'models' && (
                  <div className="mt-2 hidden flex-wrap items-center gap-1 pl-5 sm:flex">
                    {ALL_MODALITIES.map((modality) => {
                      const active = enabledModalities.has(modality);
                      const meta = MODALITY_META[modality];
                      const ModalityIcon = MODALITY_ICON[modality];
                      return (
                        <button
                          key={modality}
                          type="button"
                          onClick={(e) => toggleModality(modality, e)}
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 font-mono tl-fs-9 transition-all cursor-pointer select-none',
                            active
                              ? 'border-border/60 bg-background text-foreground shadow-xs'
                              : 'border-transparent bg-muted/30 text-faint-foreground hover:text-muted-foreground',
                          )}
                          title={
                            active
                              ? locale === 'it'
                                ? `Clicca per nascondere ${meta.label.it}`
                                : `Click to hide ${meta.label.en}`
                              : locale === 'it'
                                ? `Clicca per mostrare ${meta.label.it}`
                                : `Click to show ${meta.label.en}`
                          }
                        >
                          <ModalityIcon className="h-3 w-3 shrink-0" aria-hidden />
                          <span className={cn(!active && 'line-through')}>
                            {meta.label[locale]}
                          </span>
                        </button>
                      );
                    })}
                    {enabledModalities.size < ALL_MODALITIES.length && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnabledModalities(new Set(ALL_MODALITIES));
                        }}
                        className="inline-flex items-center rounded px-1.5 py-0.5 font-mono tl-fs-9 text-muted-foreground underline underline-offset-2 hover:text-foreground cursor-pointer"
                      >
                        {locale === 'it' ? 'Mostra tutte' : 'Show all'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="relative h-full" style={{ width: scale.width }}>
                {/* For capability lane when expanded: render multiple colored domain lines and reference levels */}
                {(() => {
                  const isCapLane = lane.lens === 'capabilities';
                  const domainLines = isCapLane && !lane.collapsed ? buildDomainLines(lane.marks, lane.height, enabledDomains) : null;
                  if (!domainLines || domainLines.length === 0) return null;
                  return (
                    <svg
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
                    >
                      <defs>
                        {domainLines.map((dl) => (
                          <linearGradient key={`grad-${dl.domain}`} id={`cap-grad-${dl.domain}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={dl.color} stopOpacity="0.14" />
                            <stop offset="60%" stopColor={dl.color} stopOpacity="0.03" />
                            <stop offset="100%" stopColor={dl.color} stopOpacity="0.00" />
                          </linearGradient>
                        ))}
                      </defs>
                      {/* Reference dashed guidelines for benchmark thresholds */}
                      {[
                        { score: 100, label: locale === 'it' ? '100 · Frontiera / SOTA 2026' : '100 · Frontier / SOTA 2026', opacity: '0.14' },
                        { score: 75, label: locale === 'it' ? '75 · Ragionamento e coding complessi' : '75 · Complex reasoning & coding', opacity: '0.09' },
                        { score: 50, label: locale === 'it' ? '50 · Competenza solida' : '50 · Solid competence', opacity: '0.08' },
                        { score: 25, label: locale === 'it' ? '25 · Baseline modelli 2020' : '25 · LLM Baseline 2020', opacity: '0.06' },
                      ].map((g) => (
                        <g key={`guide-${g.score}`}>
                          <line
                            x1="0"
                            y1={capabilityY(g.score, lane.height)}
                            x2={scale.width}
                            y2={capabilityY(g.score, lane.height)}
                            stroke="currentColor"
                            strokeOpacity={g.opacity}
                            strokeDasharray="4 6"
                            strokeWidth="1"
                          />
                          <text
                            x={16}
                            y={capabilityY(g.score, lane.height) - 4}
                            fill="currentColor"
                            fillOpacity="0.38"
                            fontSize="8.5"
                            fontFamily="monospace"
                          >
                            {g.label}
                          </text>
                        </g>
                      ))}
                      {/* Filled areas under each domain curve */}
                      {domainLines.map((dl) => (
                        <path key={`area-${dl.domain}`} d={dl.areaD} fill={`url(#cap-grad-${dl.domain})`} />
                      ))}
                      {/* Domain lines */}
                      {domainLines.map((dl) => {
                        const isHoveredLine = hoveredLegendDomain === dl.domain || (hoveredId && (() => {
                          const ev = lane.marks.find((m) => m.event.id === hoveredId)?.event;
                          if (!ev) return false;
                          const d = activeCapData(ev, enabledDomains);
                          return d ? d.domain === dl.domain : false;
                        })());
                        const isAnyHovered = Boolean(hoveredLegendDomain || hoveredId);
                        return (
                          <g key={`line-group-${dl.domain}`}>
                            <path
                              d={dl.lineD}
                              fill="none"
                              stroke={dl.color}
                              strokeWidth={isHoveredLine ? 3 : 2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              opacity={isAnyHovered ? (isHoveredLine ? 1 : 0.25) : 0.85}
                              className="transition-all duration-200"
                              style={{
                                filter: `drop-shadow(0 0 5px ${dl.color}55)`,
                              }}
                            />
                            {/* Domain badge / indicator at peak */}
                            <circle
                              cx={dl.peakX}
                              cy={dl.peakY}
                              r={isHoveredLine ? 4 : 3}
                              fill={dl.color}
                              opacity={isAnyHovered ? (isHoveredLine ? 1 : 0.3) : 0.85}
                              className="transition-all duration-200"
                            />
                          </g>
                        );
                      })}
                    </svg>
                  );
                })()}

                {/* Standard internal rails (only if not capability lane or collapsed) */}
                {(lane.lens !== 'capabilities' || lane.collapsed) &&
                  Array.from({ length: lane.lines }, (_, i) => {
                    const centre = lane.lines % 2 === 1 && i === Math.floor((lane.lines - 1) / 2);
                    return (
                      <div
                        key={`rail-${i}`}
                        aria-hidden
                        className={cn('absolute inset-x-0 h-px', !centre && 'bg-border/25')}
                        style={{
                          top: `calc(50% + ${lineDy(i, lane.lines, lineH)}px)`,
                          backgroundColor: centre ? `${lane.accent}44` : undefined,
                        }}
                      />
                    );
                  })}
                {lane.marks.map((mark) => {
                  const { event } = mark;
                  const isActive = activeId === event.id;
                  const isScrubbed = scrubId === event.id;
                  const isHot = hoveredId === event.id || isScrubbed;
                  const sentimentMeta = event.sentiment ? SENTIMENT_META[event.sentiment] : null;
                  const isStatement = event.type === 'statement';
                  const isCapLane = lane.lens === 'capabilities';
                  const capData = isCapLane && !lane.collapsed ? activeCapData(event, enabledDomains) : null;
                  if (isCapLane && !lane.collapsed && !capData) return null;
                  const markTopY = capData !== null ? capabilityY(capData.score, lane.height) : null;
                  const capDomain = capData?.domain ?? (isCapLane ? primaryCapDomain(event) : null);
                  const capDomainMeta = capDomain ? CAPABILITY_DOMAIN_META[capDomain] : null;
                  /** Diary headline: on the lane, but not the equal of a quote. */
                  const isAuto = event.origin === 'auto';
                  const person = event.personId ? people[event.personId] : undefined;
                  const isFace = isStatement && Boolean(person);
                  const stance = stanceByEventId?.[event.id];
                  // Colour carries meaning where there is meaning to carry: the
                  // stance of a thesis, the tone of a verified quote, or the
                  // capability domain in the capabilities lane. Everything
                  // else wears its lane's colour.
                  const tone = isCapLane
                    ? (capDomainMeta?.color ?? lane.accent)
                    : isAuto
                      ? lane.accent
                      : stance
                        ? STANCE_META[stance].dot
                        : sentimentMeta?.dot ?? (isStatement ? NEUTRAL_MARK : lane.accent);
                  // Caption: the person behind a statement, otherwise the head
                  // of the title itself.
                  const caption =
                    isFace && person ? person.shortName : shortTitle(event.title[locale]);
                  const captionLeft = isFace ? 38 : 28;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onSelect(event.id)}
                      onMouseEnter={() => setHoveredId(event.id)}
                      onMouseLeave={() => setHoveredId((id) => (id === event.id ? null : id))}
                      onFocus={() => setHoveredId(event.id)}
                      onBlur={() => setHoveredId((id) => (id === event.id ? null : id))}
                      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                      style={{
                        left: mark.x,
                        top: markTopY !== null ? `${markTopY}px` : `calc(50% + ${lineDy(mark.line, lane.lines, lineH)}px)`,
                        width: 36,
                        height: 36,
                      }}
                      aria-pressed={isActive}
                      aria-label={`${formatEventDate(event.date, locale)} — ${event.title[locale]}`}
                    >
                      {lane.collapsed ? (
                        // The strip holds marks, not faces or brand tiles: same
                        // colour and silhouette, none of the bulk. A diary
                        // headline keeps its lane's colour as a hollow ring.
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: isActive ? 10 : isHot ? 8 : 6,
                            height: isActive ? 10 : isHot ? 8 : 6,
                            backgroundColor: isAuto ? undefined : tone,
                            border: isAuto ? `1.5px solid ${tone}` : undefined,
                            ...(isAuto ? { borderRadius: '9999px' } : lensShape(lane.lens)),
                            filter: isActive ? `drop-shadow(0 0 3px ${tone})` : undefined,
                          }}
                        />
                      ) : isAuto ? (
                        // A diary headline rides its lane but is not the equal of
                        // a quote: no fill, the lane's colour as an outline only.
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"
                          style={{
                            width: isActive ? 11 : isHot ? 10 : 8,
                            height: isActive ? 11 : isHot ? 10 : 8,
                            border: `${isHot ? 2 : 1.5}px solid ${tone}`,
                            opacity: isActive ? 1 : 0.9,
                            filter: isActive ? `drop-shadow(0 0 3px ${tone})` : undefined,
                          }}
                        />
                      ) : isFace && person ? (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-background"
                          style={{
                            width: (isActive ? 32 : isHot ? 30 : FACE_PX) * textScale,
                            height: (isActive ? 32 : isHot ? 30 : FACE_PX) * textScale,
                            boxShadow: isActive
                              ? `0 0 0 2.5px ${tone}, 0 0 12px ${tone}66`
                              : `0 0 0 ${isHot ? 2 : 1.5}px ${tone}`,
                          }}
                        >
                          <PersonAvatar
                            person={person}
                            size="sm"
                            className={cn('h-full w-full ring-0')}
                          />
                        </span>
                      ) : (lane.lens === 'models' || isCapLane) && hasLabMark(event.actorId) ? (
                        // Lab models wear their lab's mark and silhouette, with domain glow in capability lane
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <LabMark
                            actorId={event.actorId}
                            size={isActive ? 19 : isHot ? 18 : 16}
                            active={isActive}
                            hot={isHot}
                          />
                        </span>
                      ) : isCapLane ? (
                        // Capability milestone: domain-colored glowing diamond
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: isActive ? 12 : isHot ? 11 : 9,
                            height: isActive ? 12 : isHot ? 11 : 9,
                            backgroundColor: tone,
                            transform: 'rotate(45deg)',
                            filter: isActive
                              ? `drop-shadow(0 0 5px ${tone})`
                              : isHot
                                ? `drop-shadow(0 0 3px ${tone}bb)`
                                : `drop-shadow(0 0 2px ${tone}88)`,
                          }}
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            width: isActive ? 13 : isHot ? 11 : 10,
                            height: isActive ? 13 : isHot ? 11 : 10,
                            backgroundColor: tone,
                            ...lensShape(lane.lens),
                            filter: isActive
                              ? `drop-shadow(0 0 3px ${tone})`
                              : isHot
                                ? `drop-shadow(0 0 2px ${tone}aa)`
                                : undefined,
                          }}
                        />
                      )}
                      {/* Caption reads without a hover. */}
                      {mark.room && (
                        <span
                          aria-hidden
                          className={cn(
                            'pointer-events-none absolute top-1/2 -translate-y-1/2 truncate rounded-[3px] bg-background/85 py-px pl-1 pr-1.5 tl-fs-10 leading-tight tracking-tight shadow-sm ring-1 ring-border/20',
                            isAuto
                              ? 'italic text-faint-foreground'
                              : isActive
                                ? 'font-medium text-foreground ring-foreground/30'
                                : 'font-medium text-muted-foreground',
                          )}
                          style={{ left: captionLeft, maxWidth: labelGap - captionLeft + 12 }}
                        >
                          {isCapLane && (event.benchmarkLabel || event.benchmarkMetric) && (
                            <span
                              className="mr-1 rounded px-1 py-px font-mono tl-fs-9 font-semibold"
                              style={{
                                backgroundColor: `${tone}20`,
                                color: tone,
                              }}
                            >
                              {event.benchmarkLabel ?? `${event.benchmarkMetric?.name} ${event.benchmarkMetric?.value}`}
                            </span>
                          )}
                          {caption}
                        </span>
                      )}
                    </button>
                  );
                })}

                {lane.marks
                  .filter((mark) => hoveredId === mark.event.id)
                  .map((mark) => {
                    const { event } = mark;
                    const person = event.personId ? people[event.personId] : undefined;
                    const sentimentMeta = event.sentiment ? SENTIMENT_META[event.sentiment] : null;
                    const stance = stanceByEventId?.[event.id];
                    const isCapLane = lane.lens === 'capabilities';
                    const capData = isCapLane && !lane.collapsed ? activeCapData(event, enabledDomains) : null;
                    if (isCapLane && !lane.collapsed && !capData) return null;
                    const markTopY = capData !== null ? capabilityY(capData.score, lane.height) : null;
                    const capDomain = capData?.domain ?? (isCapLane ? primaryCapDomain(event) : null);
                    const capDomainMeta = capDomain ? CAPABILITY_DOMAIN_META[capDomain] : null;
                    const tipTone = isCapLane ? (capDomainMeta?.color ?? lane.accent) : lane.accent;
                    const detailLabel =
                      event.origin === 'auto'
                        ? labels.autoLabel
                        : isCapLane && capDomainMeta
                          ? capDomainMeta.label[locale]
                          : stance && stanceLabel
                            ? stanceLabel(stance)
                            : sentimentMeta && sentimentLabel && event.sentiment
                              ? sentimentLabel(event.sentiment)
                              : typeLabel(event.type);
                    return (
                      <div
                        key={`tip-${event.id}`}
                        aria-hidden
                        className="pointer-events-none absolute z-40 w-[16rem] -translate-x-1/2 -translate-y-full rounded-md border border-border/50 bg-background/95 px-2.5 py-2 shadow-md backdrop-blur-md"
                        style={{
                          left: mark.x,
                          top: markTopY !== null
                            ? `${markTopY - facePx / 2}px`
                            : `calc(50% + ${lineDy(mark.line, lane.lines, lineH) - facePx / 2}px)`,
                        }}
                      >
                        <p className="font-mono tl-fs-9 text-muted-foreground">
                          {formatEventDate(event.date, locale)}
                          {' · '}
                          {detailLabel}
                          {person ? ` · ${person.shortName}` : ''}
                        </p>
                        <p className="mt-0.5 line-clamp-2 tl-fs-11 font-semibold leading-snug tracking-tight">
                          {event.title[locale]}
                        </p>
                        {(event.benchmarkLabel || event.benchmarkMetric) && (
                          <div className="mt-1 flex items-center gap-1.5 font-mono tl-fs-9 font-semibold">
                            <span
                              className="rounded px-1.5 py-0.5 ring-1"
                              style={{
                                backgroundColor: `${tipTone}20`,
                                color: tipTone,
                                borderColor: `${tipTone}40`,
                              }}
                            >
                              {event.benchmarkLabel ?? `${event.benchmarkMetric?.name}: ${event.benchmarkMetric?.value}`}
                            </span>
                            {capDomainMeta && (
                              <span className="text-muted-foreground">
                                · {capDomainMeta.label[locale]}
                              </span>
                            )}
                          </div>
                        )}
                        {/* What the model reads and produces. Icons carry no
                            colour: the lane's palette is spoken for. */}
                        {event.modalities && event.modalities.length > 0 && (
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono tl-fs-9 text-muted-foreground">
                            {orderedModalities(event.modalities).map((modality) => {
                              const ModalityIcon = MODALITY_ICON[modality];
                              return (
                                <span key={modality} className="inline-flex items-center gap-1">
                                  <ModalityIcon className="h-3 w-3 shrink-0" aria-hidden />
                                  {MODALITY_META[modality].label[locale]}
                                </span>
                              );
                            })}
                          </div>
                        )}
                        {isCapLane && event.capabilityScores && (
                          <div className="mt-2 space-y-1 border-t border-border/40 pt-1.5 font-mono tl-fs-9">
                            {ALL_CAPABILITY_DOMAINS.map((dom) => {
                              const score = event.capabilityScores?.[dom];
                              if (score == null) return null;
                              const dMeta = CAPABILITY_DOMAIN_META[dom];
                              const isPrimary = dom === capDomain;
                              return (
                                <div key={dom} className="flex items-center justify-between gap-1.5">
                                  <span className="flex items-center gap-1 text-muted-foreground">
                                    <span
                                      className="h-1.5 w-1.5 rounded-full"
                                      style={{ backgroundColor: dMeta.color }}
                                    />
                                    <span className={cn(isPrimary && 'font-semibold text-foreground')}>
                                      {dMeta.label[locale]}
                                    </span>
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <div className="h-1.5 w-14 overflow-hidden rounded-full bg-muted">
                                      <div
                                        className="h-full rounded-full transition-all"
                                        style={{ width: `${score}%`, backgroundColor: dMeta.color }}
                                      />
                                    </div>
                                    <span className="w-5 text-right font-semibold text-foreground/85">
                                      {score}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Sentiment band: the tone of verified quotes as a bipolar curve.
              Above the centre line optimism, below it fear; the colour follows
              the sign. Each point is a real quote-day, the line only joins them. */}
          {moodPoints.length > 0 && (
            <div
              className="relative flex border-t border-border/40"
              style={{ height: MOOD_H, width: contentW }}
            >
              <div
                className="sticky left-0 z-30 flex h-full flex-col justify-center gap-0.5 border-r border-border/40 bg-background/95 pl-2.5 pr-2 backdrop-blur-sm sm:pl-4"
                style={{ width: labelW }}
                title={labels.sentimentHint}
              >
                <span className="font-mono tl-fs-9 uppercase tracking-wider text-faint-foreground">
                  {labels.sentiment}
                </span>
                <span className="tl-fs-10 leading-snug text-pretty text-faint-foreground">
                  {labels.sentimentBlurb}
                </span>
                <span className="tl-fs-9 leading-none text-faint-foreground">
                  ↑ {labels.enthusiasm} · ↓ {labels.fear}
                </span>
                <span className="flex items-center gap-1 tl-fs-9 leading-none text-faint-foreground">
                  <svg width="16" height="4" aria-hidden className="shrink-0">
                    <line
                      x1="0"
                      y1="2"
                      x2="16"
                      y2="2"
                      stroke={MOOD_MID}
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </svg>
                  {labels.moodNeutral}
                </span>
              </div>
              <div className="relative h-full" style={{ width: scale.width }}>
                <div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-border/50" />
                <svg aria-hidden width={scale.width} height={MOOD_H} className="block">
                  <defs>
                    <linearGradient id={moodGradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={MOOD_UP} />
                      <stop offset="50%" stopColor={MOOD_MID} />
                      <stop offset="100%" stopColor={MOOD_DOWN} />
                    </linearGradient>
                  </defs>
                  {/* No quote on record: the line keeps a neutral level instead of
                      breaking, so the curve reaches back to the past and forward to
                      today. Dashed, because the level is a convention, not a measure. */}
                  <line
                    x1={0}
                    y1={moodNeutralY}
                    x2={moodFirst.x}
                    y2={moodNeutralY}
                    stroke={MOOD_MID}
                    strokeWidth={1.5}
                    strokeDasharray="3 4"
                    strokeOpacity={0.45}
                  />
                  <line
                    x1={moodLast.x}
                    y1={moodNeutralY}
                    x2={scale.todayX}
                    y2={moodNeutralY}
                    stroke={MOOD_MID}
                    strokeWidth={1.5}
                    strokeDasharray="3 4"
                    strokeOpacity={0.45}
                  />
                  {/* Where the convention gives way to a measured quote. */}
                  <line
                    x1={moodFirst.x}
                    y1={moodNeutralY}
                    x2={moodFirst.x}
                    y2={moodY(moodFirst.value)}
                    stroke={MOOD_MID}
                    strokeWidth={1.5}
                    strokeDasharray="2 3"
                    strokeOpacity={0.55}
                  />
                  <line
                    x1={moodLast.x}
                    y1={moodNeutralY}
                    x2={moodLast.x}
                    y2={moodY(moodLast.value)}
                    stroke={MOOD_MID}
                    strokeWidth={1.5}
                    strokeDasharray="2 3"
                    strokeOpacity={0.55}
                  />
                  <polyline
                    fill="none"
                    stroke={`url(#${moodGradId})`}
                    strokeWidth={1.75}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    points={moodPoints.map((point) => `${point.x},${moodY(point.value)}`).join(' ')}
                  />
                  {moodPoints.map((point) => (
                    <circle key={point.day} cx={point.x} cy={moodY(point.value)} r={2.2} fill={MOOD_MID}>
                      <title>{`${formatEventDate(point.day, locale)} · ${point.value.toFixed(2)}`}</title>
                    </circle>
                  ))}
                </svg>
              </div>
            </div>
          )}

          {/* Volume band: how much was said, day by day. Volume only — the tone
              of a headline is not the stance of the person it mentions. */}
          <div
            className="relative flex border-t border-border/40"
            style={{ height: VOLUME_H, width: contentW }}
          >
            <div
              className="sticky left-0 z-30 flex h-full items-center border-r border-border/40 bg-background/95 pl-2.5 pr-2 backdrop-blur-sm sm:pl-4"
              style={{ width: labelW }}
              title={labels.volumeHint}
            >
              <span className="font-mono tl-fs-9 uppercase tracking-wider text-faint-foreground">
                {labels.volume}
              </span>
            </div>
            <div className="relative h-full" style={{ width: scale.width }}>
              <svg aria-hidden width={scale.width} height={VOLUME_H} className="block">
                {/* One clip per day, so the stack keeps a single rounded top
                    instead of rounding every segment on its own. */}
                <defs>
                  {volume.map((bar) => (
                    <clipPath key={bar.key} id={`vol-${volClipId}-${bar.key}`}>
                      <rect
                        x={bar.x - VOLUME_BAR / 2}
                        y={VOLUME_H - 5 - bar.h}
                        width={VOLUME_BAR}
                        height={bar.h}
                        rx={1.5}
                      />
                    </clipPath>
                  ))}
                </defs>
                {volume.map((bar) => {
                  const dim = hoveredVolume != null && hoveredVolume !== bar.key;
                  return (
                    <g
                      key={bar.key}
                      clipPath={`url(#vol-${volClipId}-${bar.key})`}
                      opacity={dim ? 0.3 : 1}
                    >
                      {bar.segments.map((segment) => (
                        <rect
                          key={segment.lens}
                          x={bar.x - VOLUME_BAR / 2}
                          y={segment.y}
                          width={VOLUME_BAR}
                          height={segment.h}
                          fill={lensAxes.get(segment.lens)?.color ?? 'currentColor'}
                        />
                      ))}
                    </g>
                  );
                })}
                {/* The bars are thin, so the pointer gets a wider column; the
                    date lives in the tooltip, not in a native title. */}
                {volume.map((bar) => (
                  <rect
                    key={`hit-${bar.key}`}
                    x={bar.x - 9}
                    y={0}
                    width={18}
                    height={VOLUME_H}
                    fill="transparent"
                    onMouseEnter={() => setHoveredVolume(bar.key)}
                    onMouseLeave={() => setHoveredVolume((key) => (key === bar.key ? null : key))}
                  />
                ))}
              </svg>

              {volume
                .filter((bar) => hoveredVolume === bar.key)
                .map((bar) => (
                  <div
                    key={`voltip-${bar.key}`}
                    aria-hidden
                    className="pointer-events-none absolute z-40 w-max max-w-[13rem] -translate-x-1/2 rounded-md border border-border/50 bg-background/95 px-2.5 py-1.5 shadow-md backdrop-blur-md"
                    style={{ left: bar.x, bottom: VOLUME_H + 6 }}
                  >
                    <p className="font-mono tl-fs-9 text-muted-foreground">
                      {formatEventDate(bar.date, locale)} ·{' '}
                      {labels.volumeCount.replace('{count}', String(bar.count))}
                    </p>
                    <div className="mt-1 flex flex-col gap-0.5">
                      {bar.segments.map((segment) => (
                        <span
                          key={segment.lens}
                          className="flex items-center gap-1.5 tl-fs-10 leading-tight"
                        >
                          <span
                            aria-hidden
                            className="h-2 w-2 shrink-0 rounded-sm"
                            style={{ backgroundColor: lensAxes.get(segment.lens)?.color ?? 'currentColor' }}
                          />
                          <span className="flex-1 truncate text-muted-foreground">
                            {lensAxes.get(segment.lens)?.label?.[locale] ?? segment.lens}
                          </span>
                          <span className="font-mono text-foreground/80">{segment.count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Market band: the listed actors' closes, all rebased to 100 on one
              fixed base date. Context under the lanes — a ticker measures the
              group, not the AI unit inside it, so the band never reads as a
              verdict on the event above it. */}
          {price && (
            <div
              className="relative flex border-t border-border/40"
              style={{ height: PRICE_H, width: contentW }}
            >
              <div
                className="sticky left-0 z-30 flex h-full flex-col justify-center gap-0.5 border-r border-border/40 bg-background/95 pl-2.5 pr-2 backdrop-blur-sm sm:pl-4"
                style={{ width: labelW }}
                title={labels.marketHint}
              >
                <span className="font-mono tl-fs-9 uppercase tracking-wider text-faint-foreground">
                  {labels.market}
                </span>
                <span className="tl-fs-10 leading-snug text-pretty text-faint-foreground">
                  {labels.marketBlurb.replace('{base}', MARKET_BASE_DATE)}
                </span>
                <span className="tl-fs-9 leading-tight text-pretty text-faint-foreground">
                  {priceCredit}
                </span>
              </div>
              <div className="relative h-full" style={{ width: scale.width }}>
                <svg aria-hidden width={scale.width} height={PRICE_H} className="block">
                  {/* The base: every series is an index of this level. */}
                  <line
                    x1={0}
                    y1={price.baseY}
                    x2={scale.todayX}
                    y2={price.baseY}
                    stroke={MOOD_MID}
                    strokeWidth={1}
                    strokeDasharray="3 4"
                    strokeOpacity={0.5}
                  />
                  {price.lines.map((line) => (
                    <polyline
                      key={line.actorId}
                      fill="none"
                      stroke={line.color}
                      strokeWidth={PRICE_STROKE}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeOpacity={hoveredTicker && hoveredTicker !== line.actorId ? 0.22 : 1}
                      points={line.points}
                    />
                  ))}
                  {/* The day under the pointer: a guide down the band and a dot
                      on each line, so the level being read is the one on screen
                      and the tooltip names the company it belongs to. */}
                  {hoveredDay && (
                    <line
                      x1={hoveredDay.x}
                      y1={0}
                      x2={hoveredDay.x}
                      y2={PRICE_H}
                      stroke={MOOD_MID}
                      strokeWidth={1}
                      strokeOpacity={0.45}
                    />
                  )}
                  {hoveredDay &&
                    price.lines.map((line) => {
                      const point = line.byDate.get(hoveredDay.date);
                      if (!point) return null;
                      return (
                        <circle
                          key={line.actorId}
                          cx={hoveredDay.x}
                          cy={point.y}
                          r={2.6}
                          fill={line.color}
                          strokeWidth={1.2}
                          style={{ stroke: 'var(--background)' }}
                        />
                      );
                    })}
                  {/* Drawn last and transparent: the pointer always lands here,
                      so the band reads a day instead of whatever line is under
                      the cursor. */}
                  <rect
                    x={0}
                    y={0}
                    width={scale.width}
                    height={PRICE_H}
                    fill="transparent"
                    onMouseMove={hoverPrice}
                    onMouseLeave={() => setHoveredPriceDate(null)}
                  />
                </svg>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -translate-x-full -translate-y-1/2 rounded bg-background/70 px-1 font-mono tl-fs-9 leading-none text-faint-foreground"
                  style={{ left: scale.todayX - 2, top: price.baseY }}
                >
                  {PRICE_BASE}
                </span>
                {/* Legend sits in the plot, not in the label column: history
                    starts at the base date, so the corner is free and the
                    header keeps room for the title, the blurb and the credit. */}
                <div className="absolute left-1 top-1 z-10 flex max-w-[14rem] flex-wrap gap-x-2.5 gap-y-0.5 rounded bg-background/70 px-1.5 py-1 backdrop-blur-[2px]">
                  {price.lines.map((line) => (
                    <button
                      key={line.actorId}
                      type="button"
                      onMouseEnter={() => setHoveredTicker(line.actorId)}
                      onMouseLeave={() => setHoveredTicker((id) => (id === line.actorId ? null : id))}
                      onFocus={() => setHoveredTicker(line.actorId)}
                      onBlur={() => setHoveredTicker((id) => (id === line.actorId ? null : id))}
                      title={`${line.ticker} · ${line.exchange}`}
                      className={cn(
                        'flex items-center gap-1 rounded px-0.5 tl-fs-9 leading-none transition-opacity',
                        hoveredTicker && hoveredTicker !== line.actorId
                          ? 'opacity-40'
                          : 'opacity-100',
                      )}
                    >
                      <span
                        aria-hidden
                        className="h-0.5 w-3.5 shrink-0 rounded-full"
                        style={{ backgroundColor: line.color }}
                      />
                      <span className="font-mono text-muted-foreground">{line.ticker}</span>
                    </button>
                  ))}
                </div>
                {/* Read-out: the lines are indices, so the day is given back as
                    the price each one was, under the name of the company. */}
                {hoveredDay && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute z-40 w-max max-w-[16rem] -translate-x-1/2 rounded-md border border-border/50 bg-background/95 px-2.5 py-1.5 shadow-md backdrop-blur-md"
                    style={{ left: hoveredDay.x, bottom: PRICE_H + 6 }}
                  >
                    <p className="font-mono tl-fs-9 text-muted-foreground">
                      {formatEventDate(hoveredDay.date, locale)} · {labels.marketClose}
                    </p>
                    <div className="mt-1 flex flex-col gap-0.5">
                      {price.lines.map((line) => {
                        const point = line.byDate.get(hoveredDay.date);
                        if (!point) return null;
                        return (
                          <span
                            key={line.actorId}
                            className="flex items-center gap-1.5 tl-fs-10 leading-tight"
                          >
                            <span
                              aria-hidden
                              className="h-2 w-2 shrink-0 rounded-sm"
                              style={{ backgroundColor: line.color }}
                            />
                            <span className="flex-1 truncate text-muted-foreground">
                              {line.name}
                            </span>
                            <span className="font-mono text-foreground/80">
                              {formatPrice((point.index / 100) * line.baseClose, locale)}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
