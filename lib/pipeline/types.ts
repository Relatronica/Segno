import type {
  EventType,
  LocaleText,
  Modality,
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
   * Lane and event type the discovery run assigned. Person feeds are always
   * culture statements. Lane feeds earn their lane by reading the headline;
   * when no rule matched, both stay absent and the item is queued for an editor
   * to place. It cannot be published before that.
   */
  lens?: string;
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
  lens?: string;
  type?: EventType;
  rawTitle: string;
  rawSnippet?: string;
  feedSource: string;
  sourceTier?: 'primary' | 'secondary';
  sourceHost?: string;
  imageUrl?: string;
  hidden?: boolean;
  /**
   * What the system reads and produces, when the headline states it plainly.
   * Never inferred: a title alone does not say "audio".
   */
  modalities?: Modality[];
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
  /** Chiave di corsia come la dichiara lo spec della timeline, non un'unione. */
  lens: string;
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

/**
 * What the newsroom needs to place a pin on one timeline: the lanes, the forms,
 * the tones and the cast that timeline declares. The menus are built from this,
 * so the editor of a second timeline sees its own keys, never the flagship's.
 */
export type RedactionSpec = {
  slug: string;
  name: LocaleText;
  /** The flagship alone has the discovery queue and the curated themes. */
  flagship: boolean;
  lenses: { key: string; label: LocaleText }[];
  eventTypes: string[];
  sentimentTags: string[];
  actors: { id: string; name: string }[];
  people: { id: string; name: string; shortName: string }[];
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
