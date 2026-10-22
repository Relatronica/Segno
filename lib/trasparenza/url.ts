import {
  ALL_SENTIMENT_TAGS,
  type EventType,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { ALL_EVENT_TYPES } from './constants';

/**
 * Shareable state of the transparency hub.
 * Every field is optional: absent means "not constrained".
 */
export type TrasparenzaUrlState = {
  person?: string;
  actor?: string;
  types?: EventType[];
  years?: string[];
  sentiments?: SentimentTag[];
  q?: string;
  event?: string;
};

const KEYS = {
  person: 'person',
  actor: 'actor',
  types: 'type',
  years: 'year',
  sentiments: 'sentiment',
  q: 'q',
  event: 'event',
} as const;

function splitList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

/** Reads the hub state from a query string; unknown or malformed values are dropped. */
export function parseTrasparenzaSearch(search: string): TrasparenzaUrlState {
  const params = new URLSearchParams(search);
  const state: TrasparenzaUrlState = {};

  const person = params.get(KEYS.person)?.trim();
  if (person) state.person = person;

  const actor = params.get(KEYS.actor)?.trim();
  if (actor) state.actor = actor;

  const types = splitList(params.get(KEYS.types)).filter((value): value is EventType =>
    (ALL_EVENT_TYPES as string[]).includes(value),
  );
  if (types.length) state.types = types;

  const years = [...new Set(splitList(params.get(KEYS.years)).filter((v) => /^\d{4}$/.test(v)))].sort();
  if (years.length) state.years = years;

  const sentiments = splitList(params.get(KEYS.sentiments)).filter(
    (value): value is SentimentTag => (ALL_SENTIMENT_TAGS as string[]).includes(value),
  );
  if (sentiments.length) state.sentiments = sentiments;

  const q = params.get(KEYS.q)?.trim();
  if (q) state.q = q;

  const event = params.get(KEYS.event)?.trim();
  if (event) state.event = event;

  return state;
}

/** Query string including the leading `?`; empty string when nothing is set. */
export function buildTrasparenzaSearch(state: TrasparenzaUrlState): string {
  const params = new URLSearchParams();

  if (state.person) params.set(KEYS.person, state.person);
  if (state.actor) params.set(KEYS.actor, state.actor);
  if (state.types?.length) params.set(KEYS.types, state.types.join(','));
  if (state.years?.length) params.set(KEYS.years, state.years.join(','));
  if (state.sentiments?.length) params.set(KEYS.sentiments, state.sentiments.join(','));
  if (state.q) params.set(KEYS.q, state.q);
  if (state.event) params.set(KEYS.event, state.event);

  const query = params.toString();
  return query ? `?${query}` : '';
}
