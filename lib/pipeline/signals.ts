import type { TimelineEvent } from '@/lib/data/trasparenza';
import type { AutoSignal } from '@/lib/pipeline/types';

/**
 * One feed row of the unverified diary. No quote, no tone, no curve vertex:
 * the headline only says that something happened, not what it stands for.
 */
export function signalToTimelineEvent(signal: AutoSignal): TimelineEvent {
  return {
    id: signal.id,
    date: signal.date,
    type: signal.type ?? 'statement',
    lens: signal.lens,
    origin: 'auto',
    actorId: signal.actorId,
    personId: signal.personId,
    title: signal.title,
    summary: signal.summary,
    sourceLabel: signal.sourceLabel,
    sourceUrl: signal.sourceUrl,
    imageUrl: signal.imageUrl,
    modalities: signal.modalities,
  };
}
