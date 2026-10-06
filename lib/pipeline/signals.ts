import {
  SENTIMENT_FEAR_SCORE,
  type SentimentTag,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import type { AutoSignal, PipelineStore } from '@/lib/pipeline/types';

/** Tag that counts on the public curve. Hidden items and low-confidence guesses do not. */
export function effectiveSentiment(signal: AutoSignal): SentimentTag | undefined {
  if (signal.hidden) return undefined;
  if (signal.sentimentOverride === null) return undefined;
  if (signal.sentimentOverride) return signal.sentimentOverride;
  if (signal.votes && signal.sentiment) return signal.sentiment;
  return undefined;
}

export function signalsForPublic(store: PipelineStore): AutoSignal[] {
  const publishedUrls = new Set(
    store.candidates
      .filter((c) => c.status === 'published' || c.status === 'approved')
      .map((c) => c.sourceUrl),
  );
  return (store.signals ?? []).filter(
    (signal) => !signal.hidden && !publishedUrls.has(signal.sourceUrl),
  );
}

/** One feed row. No quote. */
export function signalToTimelineEvent(signal: AutoSignal): TimelineEvent | null {
  const tag = effectiveSentiment(signal);
  if (!tag) return null;

  return {
    id: signal.id,
    date: signal.date,
    type: 'statement',
    origin: 'auto',
    actorId: signal.actorId,
    personId: signal.personId,
    sentiment: tag,
    title: signal.title,
    summary: signal.summary,
    sourceLabel: signal.sourceLabel,
    sourceUrl: signal.sourceUrl,
  };
}

function nearestPresentTag(score: number, present: SentimentTag[]): SentimentTag {
  let best = present[0];
  let bestDist = Infinity;
  for (const tag of present) {
    const dist = Math.abs(SENTIMENT_FEAR_SCORE[tag] - score);
    if (dist < bestDist) {
      best = tag;
      bestDist = dist;
    }
  }
  return best;
}

/**
 * One curve vertex per calendar day.
 * Editorial quotes stay their own vertices (the caller passes them separately),
 * so a single cited line is not averaged into the headlines of that day.
 */
export function rollupAutoSignals(signals: AutoSignal[]): TimelineEvent[] {
  const groups = new Map<string, AutoSignal[]>();
  for (const signal of signals) {
    if (!effectiveSentiment(signal)) continue;
    const list = groups.get(signal.date) ?? [];
    list.push(signal);
    groups.set(signal.date, list);
  }

  return [...groups.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, items]) => {
      const tags = items.map((item) => effectiveSentiment(item)!);
      const mean =
        tags.reduce((sum, tag) => sum + SENTIMENT_FEAR_SCORE[tag], 0) / tags.length;
      const sentiment = nearestPresentTag(mean, tags);
      const people = new Set(items.map((item) => item.personId));
      const personId = people.size === 1 ? items[0].personId : undefined;
      const actorId = people.size === 1 ? items[0].actorId : undefined;
      const count = items.length;
      const headlineList = {
        it: items.map((item) => item.title.it).join(' · '),
        en: items.map((item) => item.title.en).join(' · '),
      };

      return {
        id: `auto-day-${date}`,
        date,
        type: 'statement' as const,
        origin: 'auto' as const,
        personId,
        actorId,
        sentiment,
        moodScore: mean,
        activityWeight: count,
        title: {
          it: `Tono automatico · ${count} ${count === 1 ? 'fonte' : 'fonti'}`,
          en: `Automatic tone · ${count} ${count === 1 ? 'source' : 'sources'}`,
        },
        summary: headlineList,
        sourceLabel: items[0].sourceLabel,
        sourceUrl: items[0].sourceUrl,
      };
    });
}
