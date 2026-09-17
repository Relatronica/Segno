import type { SentimentTag, TimelineEvent } from '@/lib/data/trasparenza';

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
  reviewedAt?: string;
  reviewNote?: string;
};

export type PipelineStore = {
  updatedAt: string;
  candidates: SentimentCandidate[];
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
