import type { LocaleText, PositionStance, Thesis, ThesisReading } from '@/lib/data/trasparenza';
import { db } from './client';
import { TIMELINE_SLUG, timelineId } from './timeline';

/**
 * Tesi e letture. La tesi è la domanda ("i modelli più potenti vanno regolati
 * prima del rilascio"), la lettura è la risposta editoriale a una citazione
 * verificata. Stanno nello stesso database degli eventi perché una lettura non
 * esiste senza l'evento che la sostiene: `thesis_readings` ha una foreign key
 * su `events`.
 *
 * Assi, bande, attori e persone restano in `specs/` fino alla Fase C: sono
 * ontologia, non contenuto.
 */

type ThesisRow = {
  id: string;
  slug: string;
  label: LocaleText;
  claim: LocaleText;
  definition: LocaleText | null;
  status: string;
  since: string | null;
};

type ReadingRow = {
  thesis_id: string;
  event_id: string;
  stance: string;
  note: LocaleText | null;
};

const THESIS_COLUMNS = 'id, slug, label, claim, definition, status, since';
const READING_COLUMNS = 'thesis_id, event_id, stance, note';

function rowToThesis(row: ThesisRow): Thesis {
  return {
    id: row.id,
    slug: row.slug,
    /** Fase B serve una sola timeline: la tesi appartiene a quella servita. */
    themeId: TIMELINE_SLUG,
    label: row.label,
    claim: row.claim,
    definition: row.definition ?? { it: '', en: '' },
    status: row.status === 'settled' ? 'settled' : 'open',
    since: row.since ?? '',
  };
}

function rowToReading(row: ReadingRow): ThesisReading {
  const reading: ThesisReading = {
    thesisId: row.thesis_id,
    eventId: row.event_id,
    stance: row.stance as PositionStance,
  };
  if (row.note) reading.note = row.note;
  return reading;
}

function thesisToRow(thesis: Thesis) {
  return {
    id: thesis.id,
    slug: thesis.slug,
    label: thesis.label,
    claim: thesis.claim,
    definition: thesis.definition,
    status: thesis.status,
    since: thesis.since || null,
  };
}

export async function listTheses(): Promise<Thesis[]> {
  const { data, error } = await db()
    .from('theses')
    .select(THESIS_COLUMNS)
    .eq('timeline_id', await timelineId())
    .order('id', { ascending: true });

  if (error) throw error;
  return (data as unknown as ThesisRow[]).map(rowToThesis);
}

export async function listThesisReadings(): Promise<ThesisReading[]> {
  const { data, error } = await db()
    .from('thesis_readings')
    .select(READING_COLUMNS)
    .eq('timeline_id', await timelineId());

  if (error) throw error;
  return (data as unknown as ReadingRow[]).map(rowToReading);
}

/** Seed idempotente: una tesi già in database non viene riscritta. */
export async function seedTheses(theses: Thesis[]): Promise<number> {
  if (theses.length === 0) return 0;
  const tid = await timelineId();

  const { error } = await db()
    .from('theses')
    .upsert(
      theses.map((thesis) => ({ timeline_id: tid, ...thesisToRow(thesis) })),
      { onConflict: 'timeline_id,id', ignoreDuplicates: true },
    );
  if (error) throw error;
  return theses.length;
}

/**
 * Le letture seguono gli eventi: la foreign key le lega a `events`, quindi il
 * seed degli eventi deve precedere quello delle letture.
 */
export async function seedThesisReadings(readings: ThesisReading[]): Promise<number> {
  if (readings.length === 0) return 0;
  const tid = await timelineId();

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
