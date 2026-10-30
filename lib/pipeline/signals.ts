import type { TimelineEvent } from '@/lib/data/trasparenza';
import type { AutoSignal, PipelineStore } from '@/lib/pipeline/types';

/** Signals that may show in the public diary: not hidden, not already promoted. */
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

/**
 * One feed row of the unverified diary. No quote, no tone, no curve vertex:
 * the headline only says that someone was mentioned, not what they stand for.
 */
export function signalToTimelineEvent(signal: AutoSignal): TimelineEvent {
  return {
    id: signal.id,
    date: signal.date,
    type: 'statement',
    origin: 'auto',
    actorId: signal.actorId,
    personId: signal.personId,
    title: signal.title,
    summary: signal.summary,
    sourceLabel: signal.sourceLabel,
    sourceUrl: signal.sourceUrl,
  };
}
