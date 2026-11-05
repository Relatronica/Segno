import type { TimelineEvent } from '@/lib/data/trasparenza';
import { candidateToTimelineEvent, type AutoSignal } from '@/lib/pipeline/types';
import { listEvents } from './events';
import { listCandidates, listPublicSignals } from './queue';

/**
 * Ciò che il browser vede della timeline: i pin del database (curati e scritti
 * a mano, già corretti, nascosti esclusi), le citazioni promosse e il diario
 * automatico. È l'unica proiezione pubblica, condivisa dalla pagina e dalla
 * route così le due non possono divergere.
 */
export type PublicTimeline = {
  events: TimelineEvent[];
  published: TimelineEvent[];
  signals: AutoSignal[];
};

export async function loadPublicTimeline(): Promise<PublicTimeline> {
  const [events, candidates, signals] = await Promise.all([
    listEvents(),
    listCandidates('published'),
    listPublicSignals(),
  ]);

  return {
    events,
    published: candidates
      .map(candidateToTimelineEvent)
      .filter((event): event is TimelineEvent => event !== null)
      .sort((a, b) => a.date.localeCompare(b.date)),
    signals,
  };
}
