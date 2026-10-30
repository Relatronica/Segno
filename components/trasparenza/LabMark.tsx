'use client';

import type { ReactNode } from 'react';
import { lobbyActors } from '@/lib/data/trasparenza';

/**
 * Lab marks. The models lane is the one row where the actor *is* the story, so
 * its pins wear the lab's own colour and a silhouette of its own instead of the
 * lane's generic dot. Every mark is a single shape, drawn to stay legible at
 * 16px: at that size a faithful logo turns to mud, and colour plus profile is
 * what actually guides the eye across the row.
 */
const COLOR_BY_ACTOR = new Map(lobbyActors.map((actor) => [actor.id, actor.color]));

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
};

/** True when an actor ships a hand-drawn mark. The rest fall back to the lane. */
export function hasLabMark(actorId?: string): actorId is string {
  return Boolean(actorId && GLYPHS[actorId]);
}

/** Black or white ink, whichever stays readable on the lab's colour. */
function inkOn(hex: string): string {
  const h = hex.replace('#', '');
  const channel = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const r = channel(parseInt(h.slice(0, 2), 16) / 255);
  const g = channel(parseInt(h.slice(2, 4), 16) / 255);
  const b = channel(parseInt(h.slice(4, 6), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.33 ? '#111827' : '#ffffff';
}

type Props = {
  actorId: string;
  /** Side of the tile, in px. */
  size: number;
  active?: boolean;
  hot?: boolean;
  /** Circle instead of the default rounded tile. */
  round?: boolean;
};

/** A lab's badge: its colour as a tile, its mark as ink. */
export function LabMark({ actorId, size, active = false, hot = false, round = false }: Props) {
  const glyph = GLYPHS[actorId];
  if (!glyph) return null;
  const color = COLOR_BY_ACTOR.get(actorId) ?? '#475569';
  return (
    <span
      aria-hidden
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: round ? size / 2 : Math.round(size * 0.26),
        backgroundColor: color,
        filter: active
          ? `drop-shadow(0 0 3px ${color})`
          : hot
            ? `drop-shadow(0 0 2px ${color}aa)`
            : undefined,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        style={{ width: size * 0.72, height: size * 0.72, color: inkOn(color) }}
      >
        {glyph}
      </svg>
    </span>
  );
}
