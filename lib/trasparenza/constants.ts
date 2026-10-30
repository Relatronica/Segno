import { ALL_LENSES, type EventType, type Lens } from '@/lib/data/trasparenza';

/** Closing "today" pin on the AI Act track — its date follows the calendar. */
export const PRESENT_PIN_ID = 'e-2026-09-today';

/**
 * Lanes that start as compact strips: everything but the first two, so the
 * axis opens on a readable stack instead of five full rows. View-only — the
 * data stays on the axis.
 */
export const DEFAULT_COLLAPSED_LENSES: Lens[] = ALL_LENSES.slice(2);

/** Event types shared by the filter UI and the URL parser. */
export const ALL_EVENT_TYPES: EventType[] = [
  'legislative',
  'meeting',
  'spending',
  'milestone',
  'statement',
  'sanction',
];
