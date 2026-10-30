import type {
  EventType,
  Lens,
  LocaleText,
  SentimentTag,
  TimelineEvent,
} from '@/lib/data/trasparenza';

export type CandidateStatus = 'pending' | 'approved' | 'rejected' | 'published';

export type SentimentCandidate = {
  id: string;
  discoveredAt: string;
  status: CandidateStatus;
  /** ISO date YYYY-MM-DD when the source was published (best effort) */
  date: string;
  sourceUrl: string;
  sourceLabel: { it: string; en: string };
  title: { it: string; en: string };
  summary: { it: string; en: string };
  quote?: { it: string; en: string };
  personId?: string;
  actorId?: string;
  /**
   * Lane and event type the discovery run assigned. Culture statements are the
   * default; every other lane has to be declared, because the lane is what
   * decides where the pin lands once published.
   */
  lens?: Lens;
  type?: EventType;
  suggestedSentiment?: SentimentTag;
  rawTitle: string;
  rawSnippet?: string;
  feedSource: string;
  /** Authoritative source tier after allowlist filter */
  sourceTier?: 'primary' | 'secondary';
  sourceHost?: string;
  /** Article or item references an official X status */
  xQuoted?: boolean;
  xStatusUrl?: string;
  /** Thumbnail from the feed, when the source provides one */
  imageUrl?: string;
  reviewedAt?: string;
  reviewNote?: string;
};

/** Overlay applied on top of curated events in `lib/data/trasparenza.ts`. */
export type TimelineEventEdit = {
  date?: string;
  actorId?: string | null;
  personId?: string | null;
  title?: LocaleText;
  summary?: LocaleText;
  detail?: LocaleText;
  quote?: LocaleText | null;
  sentiment?: SentimentTag | null;
  sourceLabel?: LocaleText;
  sourceUrl?: string;
};

export type CuratedPin = {
  themeId: string;
  themeName: LocaleText;
  hidden: boolean;
  edited: boolean;
  event: TimelineEvent;
};

/**
 * Automatic headline signal: an unverified diary row.
 * It carries no tone of its own and never moves the curve — the tone of a
 * headline is not the stance of the person it mentions. The source link is
 * the only evidence it offers, until an editor promotes it with a quote.
 */
export type AutoSignal = {
  id: string;
  discoveredAt: string;
  date: string;
  sourceUrl: string;
  sourceLabel: { it: string; en: string };
  title: { it: string; en: string };
  summary: { it: string; en: string };
  /** Absent when the row is about an event, not about a tracked person. */
  personId?: string;
  actorId?: string;
  /** Lane and type of the diary row; defaults to a culture statement. */
  lens?: Lens;
  type?: EventType;
  rawTitle: string;
  rawSnippet?: string;
  feedSource: string;
  sourceTier?: 'primary' | 'secondary';
  sourceHost?: string;
  imageUrl?: string;
  hidden?: boolean;
};

/**
 * Pin written by hand in the newsroom. Unlike a candidate it needs no
 * moderation step: it is born editorial, with its lens and type chosen by the
 * editor, and it is the only pin that can live outside the culture lane.
 */
export type CreatedEvent = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  date: string;
  type: EventType;
  lens: Lens;
  actorId?: string;
  personId?: string;
  title: LocaleText;
  summary: LocaleText;
  detail?: LocaleText;
  quote?: LocaleText;
  sentiment?: SentimentTag;
  amountEur?: number;
  sourceLabel: LocaleText;
  sourceUrl: string;
};

export type PipelineStore = {
  updatedAt: string;
  candidates: SentimentCandidate[];
  /** Daily automatic tone. Separate from the editorial queue. */
  signals?: AutoSignal[];
  edits?: Record<string, TimelineEventEdit>;
  hiddenIds?: string[];
  /** Hand-written pins, kept apart from the discovered queue. */
  createdEvents?: CreatedEvent[];
};

export function candidateToTimelineEvent(c: SentimentCandidate): TimelineEvent | null {
  if (c.status !== 'published' && c.status !== 'approved') return null;
  if (!c.sourceUrl) return null;
  // Tone needs a verified quote. A release, a round of funding or a law
  // carries no stance, so it may go live without one.
  if (c.suggestedSentiment && !c.quote?.en?.trim()) return null;

  return {
    id: c.id.startsWith('pipe-') ? c.id : `pipe-${c.id}`,
    date: c.date,
    type: c.type ?? 'statement',
    lens: c.lens,
    actorId: c.actorId,
    personId: c.personId,
    sentiment: c.suggestedSentiment,
    title: c.title,
    summary: c.summary,
    quote: c.quote,
    sourceLabel: c.sourceLabel,
    sourceUrl: c.sourceUrl,
    imageUrl: c.imageUrl,
  };
}

/** A hand-written pin as it appears on the public timeline. */
export function createdToTimelineEvent(e: CreatedEvent): TimelineEvent {
  return {
    id: e.id,
    date: e.date,
    type: e.type,
    lens: e.lens,
    origin: 'editorial',
    actorId: e.actorId,
    personId: e.personId,
    title: e.title,
    summary: e.summary,
    detail: e.detail,
    quote: e.quote,
    sentiment: e.sentiment,
    amountEur: e.amountEur,
    sourceLabel: e.sourceLabel,
    sourceUrl: e.sourceUrl,
  };
}
