import { localIsoDate } from '@/lib/dates';
import {
  aiActTrack,
  lobbyPeople,
  timelineThemes,
  unifiedTheme,
  type LobbyPerson,
  type TimelineEvent,
  type TimelineTheme,
} from '@/lib/data/trasparenza';
import { applyStoreOverlays } from '@/lib/pipeline/edits';
import { signalsForPublic, signalToTimelineEvent } from '@/lib/pipeline/signals';
import { loadPipelineStore } from '@/lib/pipeline/store';
import {
  candidateToTimelineEvent,
  createdToTimelineEvent,
  type PipelineStore,
} from '@/lib/pipeline/types';
import { PRESENT_PIN_ID } from './constants';

export type EventOrigin = 'editorial' | 'auto';

export type ResolvedEvent = {
  event: TimelineEvent;
  /** editorial = curated pin or promoted quote · auto = headline signal, no quote */
  origin: EventOrigin;
  /** Curated theme the pin belongs to, when it comes from the data file */
  theme: TimelineTheme | null;
};

export type ResolvedPerson = {
  person: LobbyPerson;
  events: TimelineEvent[];
};

export type ResolvedTheme = {
  theme: TimelineTheme;
  events: TimelineEvent[];
  /** People actually linked to at least one event of the theme */
  people: LobbyPerson[];
};

/** Themes with a public page. The unified track carries the live automatic feed. */
const THEME_PAGES: Array<{ theme: TimelineTheme; includePublished: boolean }> = [
  { theme: unifiedTheme, includePublished: true },
  { theme: aiActTrack, includePublished: false },
];

function liveTheme(): TimelineTheme {
  return timelineThemes[0] ?? unifiedTheme;
}

/** The closing "today" pin keeps a fixed date in the data file, but moves with the calendar. */
function withPresentDate(event: TimelineEvent): TimelineEvent {
  return event.id === PRESENT_PIN_ID ? { ...event, date: localIsoDate() } : event;
}

/**
 * Curated tracks we publish, in resolution order.
 * The unified feed dedupes some AI Act pins, so both sources must be searched.
 */
function curatedSources(): TimelineTheme[] {
  const live = liveTheme();
  return [live, ...THEME_PAGES.map((item) => item.theme)].filter(
    (theme, index, all) => all.findIndex((t) => t.slug === theme.slug) === index,
  );
}

/** Curated pins of every track, with editorial overlays and hidden pins applied. */
function curatedEvents(store: PipelineStore): TimelineEvent[] {
  const seen = new Set<string>();
  const events: TimelineEvent[] = [];
  for (const theme of curatedSources()) {
    for (const event of applyStoreOverlays(theme.events, store.edits, store.hiddenIds)) {
      if (seen.has(event.id)) continue;
      seen.add(event.id);
      events.push(withPresentDate(event));
    }
  }
  return events;
}

function publishedEvents(store: PipelineStore): TimelineEvent[] {
  const published = store.candidates
    .filter((candidate) => candidate.status === 'published')
    .map(candidateToTimelineEvent)
    .filter((event): event is TimelineEvent => event !== null);
  const manual = (store.createdEvents ?? []).map(createdToTimelineEvent);
  return [...published, ...manual];
}

function autoEvents(store: PipelineStore): TimelineEvent[] {
  return signalsForPublic(store)
    .map(signalToTimelineEvent)
    .filter((event): event is TimelineEvent => event !== null);
}

function sortNewestFirst(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => b.date.localeCompare(a.date));
}

/** Resolves a public permalink id against curated pins, published quotes and auto signals. */
export async function resolveEventById(id: string): Promise<ResolvedEvent | null> {
  const store = await loadPipelineStore();

  const curated = curatedEvents(store).find((event) => event.id === id);
  if (curated) {
    return {
      event: curated,
      origin: curated.origin ?? 'editorial',
      theme: curatedSources().find((theme) => theme.events.some((e) => e.id === id)) ?? null,
    };
  }

  const published = publishedEvents(store).find((event) => event.id === id);
  if (published) return { event: published, origin: 'editorial', theme: null };

  const auto = autoEvents(store).find((event) => event.id === id);
  if (auto) return { event: auto, origin: 'auto', theme: null };

  return null;
}

export async function resolvePersonBySlug(slug: string): Promise<ResolvedPerson | null> {
  const person = lobbyPeople.find((p) => p.id === slug);
  if (!person) return null;

  const store = await loadPipelineStore();
  const events = sortNewestFirst(
    [...curatedEvents(store), ...publishedEvents(store)].filter(
      (event) => event.personId === slug,
    ),
  );

  return { person, events };
}

export async function resolveThemeBySlug(slug: string): Promise<ResolvedTheme | null> {
  const entry = THEME_PAGES.find((item) => item.theme.slug === slug);
  if (!entry) return null;

  const store = await loadPipelineStore();
  const curated = applyStoreOverlays(entry.theme.events, store.edits, store.hiddenIds).map(
    withPresentDate,
  );
  const events = sortNewestFirst([
    ...curated,
    ...(entry.includePublished ? publishedEvents(store) : []),
  ]);

  const peopleIds = new Set(
    events.map((event) => event.personId).filter((id): id is string => Boolean(id)),
  );
  const people = lobbyPeople.filter((person) => peopleIds.has(person.id));

  return { theme: entry.theme, events, people };
}

export function listThemeSlugs(): string[] {
  return THEME_PAGES.map((item) => item.theme.slug);
}

export function listPersonSlugs(): string[] {
  return lobbyPeople.map((person) => person.id);
}

export function listCuratedEventIds(): string[] {
  const ids = new Set<string>();
  for (const theme of curatedSources()) {
    for (const event of theme.events) {
      if (event.id !== PRESENT_PIN_ID) ids.add(event.id);
    }
  }
  return [...ids];
}

/** Published pipeline permalinks — best effort, used by the sitemap. */
export async function listPublishedEventIds(): Promise<string[]> {
  try {
    const store = await loadPipelineStore();
    return publishedEvents(store).map((event) => event.id);
  } catch {
    return [];
  }
}
