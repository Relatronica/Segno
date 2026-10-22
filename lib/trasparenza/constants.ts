import type { EventType } from '@/lib/data/trasparenza';

/** Closing "today" pin on the AI Act track — its date follows the calendar. */
export const PRESENT_PIN_ID = 'e-2026-09-today';

/** Event types shared by the filter UI and the URL parser. */
export const ALL_EVENT_TYPES: EventType[] = [
  'legislative',
  'meeting',
  'spending',
  'milestone',
  'statement',
  'sanction',
];
