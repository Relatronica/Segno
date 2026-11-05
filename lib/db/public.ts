import type { ThesisReading, TimelineEvent } from '@/lib/data/trasparenza';
import { candidateToTimelineEvent, type AutoSignal } from '@/lib/pipeline/types';
import { listEvents } from './events';
import { listCandidates, listPublicSignals } from './queue';
import { listThesisReadings } from './theses';
import { TIMELINE_SLUG } from './timeline';

/**
 * Ciò che il browser vede della timeline: i pin del database (curati e scritti
 * a mano, già corretti, nascosti esclusi), le citazioni promosse, il diario
 * automatico e le letture registrate sulle tesi. È l'unica proiezione pubblica,
 * condivisa dalla pagina e dalla route così le due non possono divergere.
 *
 * Le tesi in sé sono struttura e vivono nello spec; qui viaggiano solo le
 * letture, che sono contenuto: una risposta editoriale a una citazione.
 */
export type PublicTimeline = {
  events: TimelineEvent[];
  published: TimelineEvent[];
  signals: AutoSignal[];
  readings: ThesisReading[];
};

export async function loadPublicTimeline(
  slug: string = TIMELINE_SLUG,
): Promise<PublicTimeline> {
  const [events, candidates, signals, readings] = await Promise.all([
    listEvents(slug),
    listCandidates('published', slug),
    listPublicSignals(slug),
    listThesisReadings(slug),
  ]);

  return {
    events,
    published: candidates
      .map(candidateToTimelineEvent)
      .filter((event): event is TimelineEvent => event !== null)
      .sort((a, b) => a.date.localeCompare(b.date)),
    signals,
    readings,
  };
}
