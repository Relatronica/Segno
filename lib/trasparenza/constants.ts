import type { EventType } from '@/lib/data/trasparenza';
import type { TimelineSpec } from './spec';

/** Closing "today" pin on the AI Act track — its date follows the calendar. */
export const PRESENT_PIN_ID = 'e-2026-09-today';

/**
 * Lanes that start as compact strips: everything but the first two, so the
 * axis opens on a readable stack instead of five full rows. View-only — the
 * data stays on the axis. Derived from the spec, so a timeline with two
 * lenses simply opens fully.
 */
export function defaultCollapsedLenses(spec: TimelineSpec): string[] {
  return spec.lenses.slice(2).map((axis) => axis.key);
}

/**
 * Arrival collapse state. A link that names its lenses (`?lente=`) opens them
 * expanded: landing on a compact strip would hide the very row that was clicked.
 */
export function defaultCollapsedFor(spec: TimelineSpec, requested?: string[]): string[] {
  const base = defaultCollapsedLenses(spec);
  if (!requested?.length) return base;
  return base.filter((lens) => !requested.includes(lens));
}

/** Event types shared by the filter UI and the URL parser. */
export const ALL_EVENT_TYPES: EventType[] = [
  'legislative',
  'meeting',
  'spending',
  'milestone',
  'statement',
  'sanction',
];

/**
 * Chart typography steps. One factor drives every size in the timeline and the
 * metrics calibrated to it, so larger type re-lays the chart out rather than
 * overlapping it. Step 1 is "standard": the density the chart was drawn at.
 */
export const TEXT_LEVELS = [0.92, 1, 1.18] as const;
export const DEFAULT_TEXT_INDEX = 1;
