'use client';

import type { ReactNode } from 'react';

/**
 * Actor marks. Some lanes are rows where the actor *is* the story — the models
 * a lab ships, the vendor that discloses a flaw — so their pins wear the
 * actor's own colour and a silhouette of its own instead of the lane's generic
 * dot. Every mark is a single shape, drawn to stay legible at 16px: at that
 * size a faithful logo turns to mud, and colour plus profile is what actually
 * guides the eye across the row.
 *
 * This table is the only thing here that knows an actor by name. Which pins
 * wear a mark is data — `actorId` on the pin, and the lane's `lensMarks` in the
 * spec — and the tile's colour comes from the spec's actors too.
 */
const GLYPHS: Record<string, ReactNode> = {
  // Hexagon in a hexagon: the knot reduced to its outline.
  openai: (
    <>
      <path
        d="M12 2.2 20.6 7.1v9.8L12 21.8 3.4 16.9V7.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.4 16.2 9.8v4.4L12 16.6 7.8 14.2V9.8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </>
  ),
  // The ring and the bar of the G.
  google: (
    <>
      <circle cx="12" cy="12" r="7.6" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <path d="M12.4 12h7.4" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </>
  ),
  // An A of two strokes and the crossbar.
  anthropic: (
    <>
      <path d="M12 3.4 21 20.6H3z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M8.3 15h7.4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // The eye: an almond with the curve inside it.
  nvidia: (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="6.2" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M7.6 13.6c2-3.6 4.8-4.7 8.6-3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </>
  ),
  // Two loops crossing: the infinity the brand is named after.
  meta: (
    <>
      <circle cx="8.4" cy="12" r="5.3" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="15.6" cy="12" r="5.3" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </>
  ),
  xai: (
    <>
      <path d="M4.4 4.4 19.6 19.6" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M19.6 4.4 4.4 19.6" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </>
  ),
  // Four panes.
  microsoft: (
    <>
      <rect x="2.6" y="2.6" width="8.6" height="8.6" fill="currentColor" />
      <rect x="12.8" y="2.6" width="8.6" height="8.6" fill="currentColor" />
      <rect x="2.6" y="12.8" width="8.6" height="8.6" fill="currentColor" />
      <rect x="12.8" y="12.8" width="8.6" height="8.6" fill="currentColor" />
    </>
  ),
  // The M of the striped flag, as one stroke.
  mistral: (
    <path
      d="M4.2 20.4V4.6l7.8 7.8 7.8-7.8v15.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  // The whale: body and fluke.
  deepseek: (
    <>
      <circle cx="10" cy="13" r="6.6" fill="currentColor" />
      <path d="M16.2 9.4 21.4 6v12l-5.2-3.4z" fill="currentColor" />
    </>
  ),
  // The cut gem.
  stability: <path d="M12 2.2 21.8 9 12 21.8 2.2 9z" fill="currentColor" />,
  // The Q, tail and all.
  qwen: (
    <>
      <circle cx="11.4" cy="11.4" r="7.6" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M15.2 15.2 20.6 20.6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // The smile, arrow tip included.
  amazon: (
    <>
      <path
        d="M3.6 15.8c4.6 3.1 12.2 3.1 16.8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M20.4 15.8l.9 2.4-2.5.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  // Body and leaf.
  apple: (
    <>
      <path
        d="M12 7.6c-1.5-1-3.3-.9-4.5.2-1.6 1.5-1.8 4.1-.6 6.7.9 2.1 2.4 3.9 3.8 3.9.7 0 1.1-.5 1.8-.5.7 0 1.1.5 1.8.5 1.4 0 2.9-1.8 3.8-3.9 1.2-2.6 1-5.2-.6-6.7-1.2-1.1-3-1.2-4.5-.2z"
        fill="currentColor"
      />
      <path d="M12 7.4c.1-1.6 1.3-2.9 2.9-3.1.1 1.6-1.2 3.1-2.9 3.1z" fill="currentColor" />
    </>
  ),
  // The shield and the arrow it raises: the agency that flags what is exploited.
  cisa: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.4 20.4 6v6.2c0 4.6-3.4 7.9-8.4 9.4-5-1.5-8.4-4.8-8.4-9.4V6z M12 7.2 8.6 10.6h2.2v3.6h2.4v-3.6h2.2z"
      fill="currentColor"
    />
  ),
  // The zero: a ring left open, with the arrow that closes it.
  projectzero: (
    <>
      <path
        d="M15.9 5.5A7.5 7.5 0 1 1 19.2 9.9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M20.1 12.3 17.3 10.6 21.1 9.2z" fill="currentColor" />
    </>
  ),
};

/** True when an actor ships a hand-drawn mark. The rest fall back to the lane. */
export function hasActorMark(actorId?: string): actorId is string {
  return Boolean(actorId && GLYPHS[actorId]);
}

/**
 * Lane marks. Some rows are their own subject — the attack lane is where
 * incidents live — so every pin of the row wears one fixed glyph of the lane's
 * own instead of the generic dot. The glyph names what the row *is*, never how
 * bad a single pin was: no grade is invented per event.
 */
const LANE_GLYPHS: Record<string, ReactNode> = {
  // The warning: a solid triangle with the bang cut out of it.
  danger: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2.6 22.4 20.8H1.6zM10.7 8h2.6v6.2h-2.6zM12 15.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"
      fill="currentColor"
    />
  ),
};

/** True when the engine ships a fixed mark under this name. */
export function hasLaneGlyph(key?: string): key is string {
  return Boolean(key && LANE_GLYPHS[key]);
}

/** Black or white ink, whichever stays readable on the tile's colour. */
function inkOn(hex: string): string {
  const h = hex.replace('#', '');
  const channel = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const r = channel(parseInt(h.slice(0, 2), 16) / 255);
  const g = channel(parseInt(h.slice(2, 4), 16) / 255);
  const b = channel(parseInt(h.slice(4, 6), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Crossover between #111827 and #ffffff, not a round number: at 0.33 the
  // mid-luminance brand colours (Microsoft blue, Mistral orange, OpenAI green)
  // kept white ink and fell to 2.8:1.
  return luminance > 0.2 ? '#111827' : '#ffffff';
}

/** Neutral ink for a subject the spec gives no colour. */
const DEFAULT_TINT = '#475569';

type TileProps = {
  glyph: ReactNode;
  /** The colour the spec declares for the actor or the lane. */
  tint: string;
  /** Side of the tile, in px. */
  size: number;
  active?: boolean;
  hot?: boolean;
  /** Circle instead of the default rounded tile. */
  round?: boolean;
};

/** One hand-drawn glyph as ink, on a tinted tile. */
function MarkTile({ glyph, tint, size, active = false, hot = false, round = false }: TileProps) {
  return (
    <span
      aria-hidden
      className="flex items-center justify-center ring-1 ring-inset ring-black/10 dark:ring-white/25"
      style={{
        width: size,
        height: size,
        borderRadius: round ? size / 2 : Math.round(size * 0.26),
        backgroundColor: tint,
        filter: active
          ? `drop-shadow(0 0 3px ${tint})`
          : hot
            ? `drop-shadow(0 0 2px ${tint}aa)`
            : undefined,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        style={{ width: size * 0.72, height: size * 0.72, color: inkOn(tint) }}
      >
        {glyph}
      </svg>
    </span>
  );
}

type Props = {
  actorId: string;
  /** The actor's colour, as the spec declares it. */
  color?: string;
  size: number;
  active?: boolean;
  hot?: boolean;
  /** Circle instead of the default rounded tile. */
  round?: boolean;
};

/** An actor's badge: its colour as a tile, its mark as ink. */
export function ActorMark({ actorId, color, size, active = false, hot = false, round = false }: Props) {
  const glyph = GLYPHS[actorId];
  if (!glyph) return null;
  return (
    <MarkTile
      glyph={glyph}
      tint={color ?? DEFAULT_TINT}
      size={size}
      active={active}
      hot={hot}
      round={round}
    />
  );
}

type LaneProps = {
  /** Name of the fixed mark, as the spec's `lensGlyphs` declares it. */
  glyph: string;
  /** The lane's colour. */
  color?: string;
  size: number;
  active?: boolean;
  hot?: boolean;
  round?: boolean;
};

/** A row's badge: its colour as a tile, the row's own mark as ink. */
export function LaneMark({ glyph, color, size, active = false, hot = false, round = false }: LaneProps) {
  const mark = LANE_GLYPHS[glyph];
  if (!mark) return null;
  return (
    <MarkTile
      glyph={mark}
      tint={color ?? DEFAULT_TINT}
      size={size}
      active={active}
      hot={hot}
      round={round}
    />
  );
}
