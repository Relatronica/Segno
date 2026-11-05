import {
  timelineThemes,
  type CapabilityDomain,
  type EventType,
  type LocaleText,
  type Modality,
  type SentimentTag,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { MANUAL_ID_PREFIX } from '@/lib/pipeline/ids';
import type { CreatedEvent, CuratedPin, TimelineEventEdit } from '@/lib/pipeline/types';
import { db } from './client';
import { TIMELINE_SLUG, resolveTimelineId } from './timeline';

/**
 * La tabella `events` è l'unica sede del contenuto: pin curati, pin scritti a
 * mano e righe del diario automatico. Ciò che prima era un overlay (`edits`,
 * `hiddenIds`) è qui una colonna: correggere un pin significa aggiornare la
 * riga, non sovrapporre un livello.
 */
type EventRow = {
  id: string;
  date: string;
  axis_lens: string | null;
  axis_type: string;
  actor_id: string | null;
  person_id: string | null;
  title: LocaleText;
  summary: LocaleText;
  detail: LocaleText | null;
  quote: LocaleText | null;
  sentiment_tag: string | null;
  amount_eur: number | string | null;
  source_label: LocaleText;
  source_url: string;
  origin: string;
  hidden: boolean;
  image_url: string | null;
  capability_scores: Partial<Record<CapabilityDomain, number>> | null;
  capability_domain: string | null;
  benchmark_label: string | null;
  benchmark_metric: { name: string; value: string } | null;
  modalities: Modality[] | null;
  created_at: string;
  updated_at: string;
};

/** Una riga di `events` con i fatti che l'editor deve vedere. */
export type StoredEvent = {
  event: TimelineEvent;
  hidden: boolean;
  /** `updated_at` oltre `created_at`: la riga è stata corretta in redazione. */
  edited: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Ciò che la redazione può correggere. `detail` e `amountEur` accettano `null`
 * per svuotare il campo; un campo assente lascia la riga com'è. `type` e `lens`
 * servono ai pin scritti a mano, che nascono con una corsia scelta dall'editor.
 */
export type EventPatch = Omit<TimelineEventEdit, 'detail'> & {
  detail?: LocaleText | null;
  hidden?: boolean;
  type?: EventType;
  /** Chiave di corsia dichiarata dallo spec della timeline, non un'unione. */
  lens?: string;
  amountEur?: number | null;
};

const COLUMNS =
  'id, date, axis_lens, axis_type, actor_id, person_id, title, summary, detail, quote, ' +
  'sentiment_tag, amount_eur, source_label, source_url, origin, hidden, image_url, ' +
  'capability_scores, capability_domain, benchmark_label, benchmark_metric, modalities, ' +
  'created_at, updated_at';

function rowToStoredEvent(row: EventRow): StoredEvent {
  const event: TimelineEvent = {
    id: row.id,
    date: row.date,
    type: row.axis_type as EventType,
    title: row.title,
    summary: row.summary,
    sourceLabel: row.source_label,
    sourceUrl: row.source_url,
    origin: row.origin === 'auto' ? 'auto' : 'editorial',
  };

  if (row.axis_lens) event.lens = row.axis_lens;
  if (row.actor_id) event.actorId = row.actor_id;
  if (row.person_id) event.personId = row.person_id;
  if (row.detail) event.detail = row.detail;
  if (row.quote) event.quote = row.quote;
  if (row.sentiment_tag) event.sentiment = row.sentiment_tag as SentimentTag;
  if (row.amount_eur !== null) event.amountEur = Number(row.amount_eur);
  if (row.image_url) event.imageUrl = row.image_url;
  if (row.capability_scores) event.capabilityScores = row.capability_scores;
  if (row.capability_domain) event.capabilityDomain = row.capability_domain as CapabilityDomain;
  if (row.benchmark_label) event.benchmarkLabel = row.benchmark_label;
  if (row.benchmark_metric) event.benchmarkMetric = row.benchmark_metric;
  if (row.modalities) event.modalities = row.modalities;

  return {
    event,
    hidden: row.hidden,
    edited: row.updated_at > row.created_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Trasposta di `rowToStoredEvent`: serve al seed e alle scritture. */
export function eventToRow(
  event: TimelineEvent,
  opts: { origin?: 'editorial' | 'auto'; hidden?: boolean; createdAt?: string } = {},
) {
  const createdAt = opts.createdAt ?? new Date().toISOString();
  return {
    id: event.id,
    date: event.date,
    axis_lens: event.lens ?? null,
    axis_type: event.type,
    actor_id: event.actorId ?? null,
    person_id: event.personId ?? null,
    title: event.title,
    summary: event.summary,
    detail: event.detail ?? null,
    quote: event.quote ?? null,
    sentiment_tag: event.sentiment ?? null,
    amount_eur: event.amountEur ?? null,
    source_label: event.sourceLabel,
    source_url: event.sourceUrl,
    origin: (opts.origin ?? event.origin) === 'auto' ? 'auto' : 'editorial',
    hidden: opts.hidden ?? false,
    image_url: event.imageUrl ?? null,
    capability_scores: event.capabilityScores ?? null,
    capability_domain: event.capabilityDomain ?? null,
    benchmark_label: event.benchmarkLabel ?? null,
    benchmark_metric: event.benchmarkMetric ?? null,
    modalities: event.modalities ?? null,
    created_at: createdAt,
    updated_at: createdAt,
  };
}

/** Un campo assente non tocca la riga; `null` la svuota. */
function patchToRow(patch: EventPatch) {
  const row: Record<string, unknown> = {};

  if (patch.date !== undefined) row.date = patch.date;
  if (patch.hidden !== undefined) row.hidden = patch.hidden;
  if (patch.type !== undefined) row.axis_type = patch.type;
  if (patch.lens !== undefined) row.axis_lens = patch.lens;
  if (patch.title !== undefined) row.title = patch.title;
  if (patch.summary !== undefined) row.summary = patch.summary;
  if (patch.detail !== undefined) row.detail = patch.detail;
  if (patch.sourceLabel !== undefined) row.source_label = patch.sourceLabel;
  if (patch.sourceUrl !== undefined) row.source_url = patch.sourceUrl;
  if (patch.sentiment !== undefined) row.sentiment_tag = patch.sentiment;
  if (patch.quote !== undefined) row.quote = patch.quote;
  if (patch.actorId !== undefined) row.actor_id = patch.actorId;
  if (patch.personId !== undefined) row.person_id = patch.personId;
  if (patch.amountEur !== undefined) row.amount_eur = patch.amountEur;

  return row;
}

/** Ogni pin, compreso quello nascosto: la redazione deve poterlo rivedere. */
export async function listStoredEvents(slug: string = TIMELINE_SLUG): Promise<StoredEvent[]> {
  const { data, error } = await db()
    .from('events')
    .select(COLUMNS)
    .eq('timeline_id', await resolveTimelineId(slug))
    .order('date', { ascending: true });

  if (error) throw error;
  return (data as unknown as EventRow[]).map(rowToStoredEvent);
}

/** Il contenuto pubblico: stesso ordine del dataset, pin nascosti esclusi. */
export async function listEvents(slug: string = TIMELINE_SLUG): Promise<TimelineEvent[]> {
  return (await listStoredEvents(slug)).filter((row) => !row.hidden).map((row) => row.event);
}

export async function getStoredEvent(
  id: string,
  slug: string = TIMELINE_SLUG,
): Promise<StoredEvent | null> {
  const { data, error } = await db()
    .from('events')
    .select(COLUMNS)
    .eq('timeline_id', await resolveTimelineId(slug))
    .eq('id', id)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToStoredEvent(data as unknown as EventRow) : null;
}

/** Una riga di seed: l'evento più i due stati che la migrazione deve conservare. */
export type SeedEvent = {
  event: TimelineEvent;
  /** Pin nascosto in redazione; lo leggiamo dall'overlay, non lo perdiamo. */
  hidden?: boolean;
  createdAt?: string;
};

/**
 * Seed: inserisce i pin mancanti senza toccare quelli già presenti, così una
 * seconda esecuzione non cancella le correzioni fatte in redazione. La timeline
 * è quella dello slug: la flagship di default, o una seconda timeline.
 */
export async function seedEvents(
  seed: SeedEvent[],
  slug: string = TIMELINE_SLUG,
): Promise<number> {
  if (seed.length === 0) return 0;
  const tid = await resolveTimelineId(slug);
  const rows = seed.map(({ event, hidden, createdAt }) => ({
    timeline_id: tid,
    ...eventToRow(event, { hidden, createdAt }),
  }));

  const { error } = await db()
    .from('events')
    .upsert(rows, { onConflict: 'timeline_id,id', ignoreDuplicates: true });
  if (error) throw error;
  return rows.length;
}

/** Pin scritto a mano: nasce editoriale, senza passare dalla moderazione. */
export async function insertEvent(
  event: TimelineEvent,
  slug: string = TIMELINE_SLUG,
  createdAt?: string,
): Promise<void> {
  const tid = await resolveTimelineId(slug);
  const { error } = await db()
    .from('events')
    .insert({ timeline_id: tid, ...eventToRow(event, { createdAt }) });
  if (error) throw error;
}

/**
 * Corregge una riga esistente. Il tono resta subordinato alla citazione (P5):
 * se il patch lascia un tono senza quote, il tono cade.
 */
export async function updateEvent(
  id: string,
  patch: EventPatch,
  slug: string = TIMELINE_SLUG,
): Promise<StoredEvent | null> {
  const current = await getStoredEvent(id, slug);
  if (!current) return null;

  const quote = patch.quote !== undefined ? patch.quote : (current.event.quote ?? null);
  const sentiment = patch.sentiment !== undefined ? patch.sentiment : (current.event.sentiment ?? null);
  const hasQuote = Boolean(quote && (quote.it.trim() || quote.en.trim()));

  const row = patchToRow(patch);
  if (sentiment && !hasQuote) row.sentiment_tag = null;

  if (Object.keys(row).length > 0) {
    const { error } = await db()
      .from('events')
      .update({ ...row, updated_at: new Date().toISOString() })
      .eq('timeline_id', await resolveTimelineId(slug))
      .eq('id', id);
    if (error) throw error;
  }

  return getStoredEvent(id, slug);
}

export async function deleteEvent(id: string, slug: string = TIMELINE_SLUG): Promise<boolean> {
  const { data, error } = await db()
    .from('events')
    .delete()
    .eq('timeline_id', await resolveTimelineId(slug))
    .eq('id', id)
    .select('id');

  if (error) throw error;
  return (data ?? []).length > 0;
}

/** Mappa id → tema del file dati; un pin scritto a mano non ha tema. */
function curatedThemes(): Map<string, { themeId: string; themeName: LocaleText }> {
  const map = new Map<string, { themeId: string; themeName: LocaleText }>();
  for (const theme of timelineThemes) {
    for (const event of theme.events) {
      map.set(event.id, { themeId: theme.id, themeName: theme.name });
    }
  }
  return map;
}

/**
 * I pin curati come li vede la redazione: tema, stato e contenuto effettivo.
 *
 * Curato = editoriale e non scritto a mano. Sulla flagship il tema arriva dal
 * dataset IA; su un'altra timeline, che non ha temi, il "tema" è la timeline
 * stessa — l'elenco resta completo, cambia solo l'etichetta del gruppo.
 */
export async function listCuratedPins(slug: string = TIMELINE_SLUG): Promise<CuratedPin[]> {
  const themes = curatedThemes();
  const fallbackTheme: LocaleText = { it: 'Redazione', en: 'Editorial' };
  return (await listStoredEvents(slug))
    .filter((row) => row.event.origin !== 'auto' && !row.event.id.startsWith(MANUAL_ID_PREFIX))
    .map((row) => {
      const theme = themes.get(row.event.id);
      return {
        themeId: theme?.themeId ?? slug,
        themeName: theme?.themeName ?? fallbackTheme,
        hidden: row.hidden,
        edited: row.edited,
        event: row.event,
      };
    })
    .sort((a, b) => b.event.date.localeCompare(a.event.date));
}

function storedToCreatedEvent(row: StoredEvent): CreatedEvent {
  const { event } = row;
  const created: CreatedEvent = {
    id: event.id,
    createdAt: row.createdAt,
    date: event.date,
    type: event.type,
    /** La corsia è quella della timeline: le chiavi le dichiara lo spec, non un'unione. */
    lens: event.lens ?? '',
    title: event.title,
    summary: event.summary,
    sourceLabel: event.sourceLabel,
    sourceUrl: event.sourceUrl,
  };

  created.updatedAt = row.updatedAt;
  if (event.actorId) created.actorId = event.actorId;
  if (event.personId) created.personId = event.personId;
  if (event.detail) created.detail = event.detail;
  if (event.quote) created.quote = event.quote;
  if (event.sentiment) created.sentiment = event.sentiment;
  if (event.amountEur !== undefined) created.amountEur = event.amountEur;

  return created;
}

/** I pin scritti a mano: nascono in redazione e portano il prefisso `man-`. */
export async function listManualEvents(slug: string = TIMELINE_SLUG): Promise<CreatedEvent[]> {
  return (await listStoredEvents(slug))
    .filter((row) => row.event.id.startsWith(MANUAL_ID_PREFIX))
    .map(storedToCreatedEvent)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
    );
}
