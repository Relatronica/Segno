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
import { listEvents } from '@/lib/db/events';
import { listCandidates, listPublicSignals } from '@/lib/db/queue';
import { MANUAL_ID_PREFIX } from '@/lib/pipeline/ids';
import { signalToTimelineEvent } from '@/lib/pipeline/signals';
import { candidateToTimelineEvent } from '@/lib/pipeline/types';
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

/** The closing "today" pin keeps a fixed date in the database, but moves with the calendar. */
function withPresentDate(event: TimelineEvent): TimelineEvent {
  return event.id === PRESENT_PIN_ID ? { ...event, date: localIsoDate() } : event;
}

/**
 * Membership, not content. The database is the only home of the pins; the data
 * file keeps just the id lists that say which pin belongs to which track. The
 * unified feed dedupes some AI Act pins, so both sources are read.
 */
function curatedSources(): TimelineTheme[] {
  const live = liveTheme();
  return [live, ...THEME_PAGES.map((item) => item.theme)].filter(
    (theme, index, all) => all.findIndex((t) => t.slug === theme.slug) === index,
  );
}

/** Curated id → track, for the permalink breadcrumb. */
function curatedThemeById(): Map<string, TimelineTheme> {
  const map = new Map<string, TimelineTheme>();
  for (const theme of curatedSources()) {
    for (const event of theme.events) {
      if (!map.has(event.id)) map.set(event.id, theme);
    }
  }
  return map;
}

/** Membership lookup: tells a curated pin from a hand-written one. */
export function findCuratedEvent(id: string): TimelineEvent | undefined {
  for (const theme of timelineThemes) {
    const event = theme.events.find((item) => item.id === id);
    if (event) return event;
  }
  return undefined;
}

function sortNewestFirst(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => b.date.localeCompare(a.date));
}

/** Every pin the database holds under this timeline: curated and hand-written alike. */
async function editorialEvents(): Promise<TimelineEvent[]> {
  return (await listEvents()).map(withPresentDate);
}

/** Promoted quotes: candidates that cleared moderation and carry a verified quote. */
async function publishedEvents(): Promise<TimelineEvent[]> {
  return (await listCandidates('published'))
    .map(candidateToTimelineEvent)
    .filter((event): event is TimelineEvent => event !== null);
}

/** The unverified diary: headline rows with no tone of their own. */
async function autoEvents(): Promise<TimelineEvent[]> {
  return (await listPublicSignals()).map(signalToTimelineEvent);
}

/** Resolves a public permalink id against curated pins, published quotes and auto signals. */
export async function resolveEventById(id: string): Promise<ResolvedEvent | null> {
  const curated = (await editorialEvents()).find((event) => event.id === id);
  if (curated) {
    return {
      event: curated,
      origin: curated.origin ?? 'editorial',
      theme: curatedThemeById().get(id) ?? null,
    };
  }

  const published = (await publishedEvents()).find((event) => event.id === id);
  if (published) return { event: published, origin: 'editorial', theme: null };

  const auto = (await autoEvents()).find((event) => event.id === id);
  if (auto) return { event: auto, origin: 'auto', theme: null };

  return null;
}

export async function resolvePersonBySlug(slug: string): Promise<ResolvedPerson | null> {
  const person = lobbyPeople.find((p) => p.id === slug);
  if (!person) return null;

  const [editorial, published] = await Promise.all([editorialEvents(), publishedEvents()]);
  const events = sortNewestFirst(
    [...editorial, ...published].filter((event) => event.personId === slug),
  );

  return { person, events };
}

export async function resolveThemeBySlug(slug: string): Promise<ResolvedTheme | null> {
  const entry = THEME_PAGES.find((item) => item.theme.slug === slug);
  if (!entry) return null;

  const live = entry.theme.slug === liveTheme().slug;
  const memberIds = new Set(entry.theme.events.map((event) => event.id));
  const curated = (await listEvents())
    .filter((event) => memberIds.has(event.id) || (live && event.id.startsWith(MANUAL_ID_PREFIX)))
    .map(withPresentDate);

  const published = entry.includePublished ? await publishedEvents() : [];
  const events = sortNewestFirst([...curated, ...published]);

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
    return (await publishedEvents()).map((event) => event.id);
  } catch {
    return [];
  }
}
