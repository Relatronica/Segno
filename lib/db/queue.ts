import type { EventType, Lens, LocaleText, Modality, SentimentTag } from '@/lib/data/trasparenza';
import { candidateIdFromUrl } from '@/lib/pipeline/ids';
import { hintSentiment } from '@/lib/pipeline/match';
import type { AutoSignal, CandidateStatus, SentimentCandidate } from '@/lib/pipeline/types';
import { db } from './client';
import { TIMELINE_SLUG, resolveTimelineId, timelineId } from './timeline';

/**
 * Le due code della redazione: `candidates` è ciò che aspetta un giudizio,
 * `signals` è il diario automatico — titoli senza tono, perché il tono di un
 * titolo non è la posizione di chi lo pronuncia.
 */

/** Le correzioni editoriali sui titoli sopravvivono al tetto giornaliero. */
const SIGNAL_CAP = 1500;

type CandidateRow = {
  id: string;
  discovered_at: string;
  status: string;
  date: string | null;
  source_url: string;
  source_label: LocaleText;
  title: LocaleText;
  summary: LocaleText;
  quote: LocaleText | null;
  person_id: string | null;
  actor_id: string | null;
  lens: string | null;
  type: string | null;
  suggested_sentiment: string | null;
  raw_title: string;
  raw_snippet: string | null;
  feed_source: string;
  source_tier: string | null;
  source_host: string | null;
  x_quoted: boolean | null;
  x_status_url: string | null;
  image_url: string | null;
  reviewed_at: string | null;
  review_note: string | null;
};

type SignalRow = {
  id: string;
  discovered_at: string;
  date: string;
  source_url: string;
  source_label: LocaleText;
  title: LocaleText;
  summary: LocaleText;
  person_id: string | null;
  actor_id: string | null;
  lens: string | null;
  type: string | null;
  raw_title: string;
  raw_snippet: string | null;
  feed_source: string;
  source_tier: string | null;
  source_host: string | null;
  image_url: string | null;
  hidden: boolean;
  modalities: Modality[] | null;
};

const CANDIDATE_COLUMNS =
  'id, discovered_at, status, date, source_url, source_label, title, summary, quote, ' +
  'person_id, actor_id, lens, type, suggested_sentiment, raw_title, raw_snippet, ' +
  'feed_source, source_tier, source_host, x_quoted, x_status_url, image_url, ' +
  'reviewed_at, review_note';

const SIGNAL_COLUMNS =
  'id, discovered_at, date, source_url, source_label, title, summary, person_id, ' +
  'actor_id, lens, type, raw_title, raw_snippet, feed_source, source_tier, source_host, ' +
  'image_url, hidden, modalities';

function rowToCandidate(row: CandidateRow): SentimentCandidate {
  const candidate: SentimentCandidate = {
    id: row.id,
    discoveredAt: row.discovered_at,
    status: row.status as CandidateStatus,
    date: row.date ?? '',
    sourceUrl: row.source_url,
    sourceLabel: row.source_label,
    title: row.title,
    summary: row.summary,
    rawTitle: row.raw_title,
    feedSource: row.feed_source,
  };

  if (row.quote) candidate.quote = row.quote;
  if (row.person_id) candidate.personId = row.person_id;
  if (row.actor_id) candidate.actorId = row.actor_id;
  if (row.lens) candidate.lens = row.lens as Lens;
  if (row.type) candidate.type = row.type as EventType;
  if (row.suggested_sentiment) candidate.suggestedSentiment = row.suggested_sentiment as SentimentTag;
  if (row.raw_snippet) candidate.rawSnippet = row.raw_snippet;
  if (row.source_tier) candidate.sourceTier = row.source_tier as 'primary' | 'secondary';
  if (row.source_host) candidate.sourceHost = row.source_host;
  if (row.x_quoted) candidate.xQuoted = row.x_quoted;
  if (row.x_status_url) candidate.xStatusUrl = row.x_status_url;
  if (row.image_url) candidate.imageUrl = row.image_url;
  if (row.reviewed_at) candidate.reviewedAt = row.reviewed_at;
  if (row.review_note) candidate.reviewNote = row.review_note;

  return candidate;
}

function candidateToRow(candidate: SentimentCandidate) {
  return {
    id: candidate.id,
    discovered_at: candidate.discoveredAt,
    status: candidate.status,
    date: candidate.date || null,
    source_url: candidate.sourceUrl,
    source_label: candidate.sourceLabel,
    title: candidate.title,
    summary: candidate.summary,
    quote: candidate.quote ?? null,
    person_id: candidate.personId ?? null,
    actor_id: candidate.actorId ?? null,
    lens: candidate.lens ?? null,
    type: candidate.type ?? null,
    suggested_sentiment: candidate.suggestedSentiment ?? null,
    raw_title: candidate.rawTitle,
    raw_snippet: candidate.rawSnippet ?? null,
    feed_source: candidate.feedSource,
    source_tier: candidate.sourceTier ?? null,
    source_host: candidate.sourceHost ?? null,
    x_quoted: candidate.xQuoted ?? null,
    x_status_url: candidate.xStatusUrl ?? null,
    image_url: candidate.imageUrl ?? null,
    reviewed_at: candidate.reviewedAt ?? null,
    review_note: candidate.reviewNote ?? null,
  };
}

function rowToSignal(row: SignalRow): AutoSignal {
  const signal: AutoSignal = {
    id: row.id,
    discoveredAt: row.discovered_at,
    date: row.date,
    sourceUrl: row.source_url,
    sourceLabel: row.source_label,
    title: row.title,
    summary: row.summary,
    rawTitle: row.raw_title,
    feedSource: row.feed_source,
  };

  if (row.person_id) signal.personId = row.person_id;
  if (row.actor_id) signal.actorId = row.actor_id;
  if (row.lens) signal.lens = row.lens as Lens;
  if (row.type) signal.type = row.type as EventType;
  if (row.raw_snippet) signal.rawSnippet = row.raw_snippet;
  if (row.source_tier) signal.sourceTier = row.source_tier as 'primary' | 'secondary';
  if (row.source_host) signal.sourceHost = row.source_host;
  if (row.image_url) signal.imageUrl = row.image_url;
  if (row.hidden) signal.hidden = true;
  if (row.modalities) signal.modalities = row.modalities;

  return signal;
}

function signalToRow(signal: AutoSignal, discoveredAt: string) {
  return {
    id: signal.id,
    discovered_at: discoveredAt,
    date: signal.date,
    source_url: signal.sourceUrl,
    source_label: signal.sourceLabel,
    title: signal.title,
    summary: signal.summary,
    person_id: signal.personId ?? null,
    actor_id: signal.actorId ?? null,
    lens: signal.lens ?? null,
    type: signal.type ?? null,
    raw_title: signal.rawTitle,
    raw_snippet: signal.rawSnippet ?? null,
    feed_source: signal.feedSource,
    source_tier: signal.sourceTier ?? null,
    source_host: signal.sourceHost ?? null,
    image_url: signal.imageUrl ?? null,
    hidden: signal.hidden ?? false,
    modalities: signal.modalities ?? null,
  };
}

// ------------------------------------------------------------------ candidates

export async function listCandidates(
  status?: CandidateStatus,
  slug: string = TIMELINE_SLUG,
): Promise<SentimentCandidate[]> {
  let query = db()
    .from('candidates')
    .select(CANDIDATE_COLUMNS)
    .eq('timeline_id', await resolveTimelineId(slug))
    .order('discovered_at', { ascending: false });

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) throw error;
  return (data as unknown as CandidateRow[]).map(rowToCandidate);
}

export async function getCandidate(id: string): Promise<SentimentCandidate | null> {
  const { data, error } = await db()
    .from('candidates')
    .select(CANDIDATE_COLUMNS)
    .eq('timeline_id', await timelineId())
    .eq('id', id)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToCandidate(data as unknown as CandidateRow) : null;
}

/**
 * Inserisce i candidati nuovi. Un candidato già in coda non viene riscritto:
 * la redazione potrebbe averlo già corretto. Ritorna quanti ne sono entrati.
 */
export async function upsertCandidates(incoming: SentimentCandidate[]): Promise<number> {
  if (incoming.length === 0) return 0;
  const tid = await timelineId();

  const { data: existing, error: readError } = await db()
    .from('candidates')
    .select('id')
    .eq('timeline_id', tid)
    .in('id', incoming.map((c) => c.id));
  if (readError) throw readError;

  const known = new Set((existing ?? []).map((row) => row.id as string));
  const fresh = incoming.filter((c) => !known.has(c.id));
  if (fresh.length === 0) return 0;

  const { error } = await db()
    .from('candidates')
    .insert(fresh.map((c) => ({ timeline_id: tid, ...candidateToRow(c) })));
  if (error) throw error;
  return fresh.length;
}

export async function updateCandidateStatus(
  id: string,
  status: CandidateStatus,
  patch: Partial<
    Pick<
      SentimentCandidate,
      | 'title'
      | 'summary'
      | 'quote'
      | 'suggestedSentiment'
      | 'personId'
      | 'actorId'
      | 'date'
      | 'lens'
      | 'type'
      | 'reviewNote'
    >
  > = {},
): Promise<SentimentCandidate | null> {
  const row: Record<string, unknown> = {
    status,
    reviewed_at: new Date().toISOString(),
  };

  if (patch.title !== undefined) row.title = patch.title;
  if (patch.summary !== undefined) row.summary = patch.summary;
  if (patch.quote !== undefined) row.quote = patch.quote;
  if (patch.suggestedSentiment !== undefined) row.suggested_sentiment = patch.suggestedSentiment;
  if (patch.personId !== undefined) row.person_id = patch.personId || null;
  if (patch.actorId !== undefined) row.actor_id = patch.actorId || null;
  if (patch.date !== undefined) row.date = patch.date || null;
  if (patch.lens !== undefined) row.lens = patch.lens;
  if (patch.type !== undefined) row.type = patch.type;
  if (patch.reviewNote !== undefined) row.review_note = patch.reviewNote;

  const { error } = await db()
    .from('candidates')
    .update(row)
    .eq('timeline_id', await timelineId())
    .eq('id', id);
  if (error) throw error;

  return getCandidate(id);
}

export async function updateCandidatesStatus(
  ids: string[],
  status: CandidateStatus,
): Promise<number> {
  if (ids.length === 0) return 0;
  const { data, error } = await db()
    .from('candidates')
    .update({ status, reviewed_at: new Date().toISOString() })
    .eq('timeline_id', await timelineId())
    .in('id', ids)
    .select('id');

  if (error) throw error;
  return (data ?? []).length;
}

export async function deleteCandidates(ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const { data, error } = await db()
    .from('candidates')
    .delete()
    .eq('timeline_id', await timelineId())
    .in('id', ids)
    .select('id');

  if (error) throw error;
  return (data ?? []).length;
}

// --------------------------------------------------------------------- signals

export async function listSignals(slug: string = TIMELINE_SLUG): Promise<AutoSignal[]> {
  const { data, error } = await db()
    .from('signals')
    .select(SIGNAL_COLUMNS)
    .eq('timeline_id', await resolveTimelineId(slug))
    .order('date', { ascending: false })
    .order('discovered_at', { ascending: false });

  if (error) throw error;
  return (data as unknown as SignalRow[]).map(rowToSignal);
}

export async function getSignal(id: string): Promise<AutoSignal | null> {
  const { data, error } = await db()
    .from('signals')
    .select(SIGNAL_COLUMNS)
    .eq('timeline_id', await timelineId())
    .eq('id', id)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data ? rowToSignal(data as unknown as SignalRow) : null;
}

/**
 * Aggiorna il diario mantenendo data di scoperta e stato di visibilità: una
 * riga già nascosta resta nascosta, una già vista resta al suo posto.
 */
export async function upsertSignals(incoming: AutoSignal[]): Promise<number> {
  if (incoming.length === 0) return 0;
  const tid = await timelineId();

  const { data: existing, error: readError } = await db()
    .from('signals')
    .select('id, discovered_at, hidden')
    .eq('timeline_id', tid)
    .in('id', incoming.map((s) => s.id));
  if (readError) throw readError;

  const previous = new Map(
    (existing ?? []).map((row) => [
      row.id as string,
      { discoveredAt: row.discovered_at as string, hidden: row.hidden as boolean },
    ]),
  );

  const now = new Date().toISOString();
  const rows = incoming.map((signal) => {
    const before = previous.get(signal.id);
    return {
      timeline_id: tid,
      ...signalToRow(
        before ? { ...signal, hidden: before.hidden } : signal,
        before?.discoveredAt ?? now,
      ),
    };
  });

  const { error } = await db()
    .from('signals')
    .upsert(rows, { onConflict: 'timeline_id,id' });
  if (error) throw error;

  await pruneSignals();

  const fresh = incoming.filter((signal) => !previous.has(signal.id)).length;
  return fresh;
}

export async function setSignalHidden(id: string, hidden: boolean): Promise<AutoSignal | null> {
  const { error } = await db()
    .from('signals')
    .update({ hidden })
    .eq('timeline_id', await timelineId())
    .eq('id', id);
  if (error) throw error;

  return getSignal(id);
}

/** Il diario pubblico: righe non nascoste e non già promosse a candidato. */
export async function listPublicSignals(slug: string = TIMELINE_SLUG): Promise<AutoSignal[]> {
  const [signals, candidates] = await Promise.all([
    listSignals(slug),
    listCandidates(undefined, slug),
  ]);
  const promoted = new Set(
    candidates
      .filter((c) => c.status === 'published' || c.status === 'approved')
      .map((c) => c.sourceUrl),
  );
  return signals.filter((signal) => !signal.hidden && !promoted.has(signal.sourceUrl));
}

/** Copia un segnale nella coda editoriale così può ricevere una citazione. Non lo rimuove. */
export async function promoteSignal(id: string): Promise<{ created: boolean } | null> {
  const signal = await getSignal(id);
  if (!signal) return null;

  const candidate: SentimentCandidate = {
    id: candidateIdFromUrl(signal.sourceUrl),
    discoveredAt: new Date().toISOString(),
    status: 'pending',
    date: signal.date,
    sourceUrl: signal.sourceUrl,
    sourceLabel: signal.sourceLabel,
    title: signal.title,
    summary: signal.summary,
    personId: signal.personId,
    actorId: signal.actorId,
    lens: signal.lens,
    type: signal.type,
    // A headline has no tone of its own: the hint stays in the culture lane,
    // where a quote is expected to back it up.
    suggestedSentiment:
      (signal.lens ?? 'culture') === 'culture'
        ? hintSentiment(`${signal.rawTitle} ${signal.rawSnippet ?? ''}`)
        : undefined,
    rawTitle: signal.rawTitle,
    rawSnippet: signal.rawSnippet,
    feedSource: signal.feedSource,
    sourceTier: signal.sourceTier,
    sourceHost: signal.sourceHost,
    ...(signal.imageUrl ? { imageUrl: signal.imageUrl } : {}),
  };

  const added = await upsertCandidates([candidate]);
  return { created: added > 0 };
}

/** Tetto del diario: cadono le righe più vecchie, mai quelle che l'editor ha nascosto. */
async function pruneSignals(): Promise<void> {
  const tid = await timelineId();
  const { data, error } = await db()
    .from('signals')
    .select('id')
    .eq('timeline_id', tid)
    .eq('hidden', false)
    .order('date', { ascending: false })
    .order('discovered_at', { ascending: false });

  if (error) throw error;
  const stale = (data ?? []).slice(SIGNAL_CAP).map((row) => row.id as string);
  if (stale.length === 0) return;

  const { error: deleteError } = await db()
    .from('signals')
    .delete()
    .eq('timeline_id', tid)
    .in('id', stale);
  if (deleteError) throw deleteError;
}
