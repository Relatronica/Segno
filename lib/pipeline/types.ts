import type {
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

export type PipelineStore = {
  updatedAt: string;
  candidates: SentimentCandidate[];
  edits?: Record<string, TimelineEventEdit>;
  hiddenIds?: string[];
};

export function candidateToTimelineEvent(c: SentimentCandidate): TimelineEvent | null {
  if (c.status !== 'published' && c.status !== 'approved') return null;
  if (!c.sourceUrl || !c.quote?.en) return null;

  return {
    id: c.id.startsWith('pipe-') ? c.id : `pipe-${c.id}`,
    date: c.date,
    type: 'statement',
    actorId: c.actorId,
    personId: c.personId,
    sentiment: c.suggestedSentiment,
    title: c.title,
    summary: c.summary,
    quote: c.quote,
    sourceLabel: c.sourceLabel,
    sourceUrl: c.sourceUrl,
  };
}
