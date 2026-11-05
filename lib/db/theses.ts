import type { LocaleText, PositionStance, ThesisReading } from '@/lib/data/trasparenza';
import { db } from './client';
import { TIMELINE_SLUG, resolveTimelineId } from './timeline';

/**
 * Le letture delle tesi. La tesi in sé — la domanda sotto esame — è struttura e
 * vive nello spec (Fase C, `lib/db/spec.ts`): qui resta solo il contenuto, la
 * risposta editoriale a una citazione verificata. Sta nello stesso database
 * degli eventi perché una lettura non esiste senza l'evento che la sostiene:
 * `thesis_readings` ha una foreign key su `events`.
 */

type ReadingRow = {
  thesis_id: string;
  event_id: string;
  stance: string;
  note: LocaleText | null;
};

const READING_COLUMNS = 'thesis_id, event_id, stance, note';

function rowToReading(row: ReadingRow): ThesisReading {
  const reading: ThesisReading = {
    thesisId: row.thesis_id,
    eventId: row.event_id,
    stance: row.stance as PositionStance,
  };
  if (row.note) reading.note = row.note;
  return reading;
}

export async function listThesisReadings(slug: string = TIMELINE_SLUG): Promise<ThesisReading[]> {
  const { data, error } = await db()
    .from('thesis_readings')
    .select(READING_COLUMNS)
    .eq('timeline_id', await resolveTimelineId(slug));

  if (error) throw error;
  return (data as unknown as ReadingRow[]).map(rowToReading);
}

/**
 * Le letture seguono gli eventi e le tesi: la foreign key le lega a entrambi,
 * quindi il seed di `events` e di `theses` deve precedere quello delle letture.
 * La timeline è quella dello slug: la flagship di default, o una seconda.
 */
export async function seedThesisReadings(
  readings: ThesisReading[],
  slug: string = TIMELINE_SLUG,
): Promise<number> {
  if (readings.length === 0) return 0;
  const tid = await resolveTimelineId(slug);

  const { error } = await db()
    .from('thesis_readings')
    .upsert(
      readings.map((reading) => ({
        timeline_id: tid,
        thesis_id: reading.thesisId,
        event_id: reading.eventId,
        stance: reading.stance,
        note: reading.note ?? null,
      })),
      { onConflict: 'timeline_id,thesis_id,event_id', ignoreDuplicates: true },
    );
  if (error) throw error;
  return readings.length;
}
