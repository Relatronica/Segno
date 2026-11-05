import type {
  ActorAxis,
  Axis,
  BandSpec,
  LensFallback,
  LocalizedText,
  PersonAxis,
  ThesisAxis,
  TimelineSpec,
  TrackMeta,
} from '@/lib/trasparenza/spec';
import { db } from './client';

/**
 * Fase C — lo spec vive nel database, non nel bundle.
 *
 * In Fase A il motore smette di importare l'ontologia e la riceve da un
 * `TimelineSpec`; quel contratto non cambia. Qui cambia solo la *sorgente*: le
 * righe di `timeline_axes`, `timeline_bands`, `actors`, `people` e `theses`
 * ricostruiscono lo stesso oggetto che prima stava in `specs/ai.ts`. I
 * componenti non ne sanno nulla.
 *
 * Lo spec resta scritto dal maintainer (i file in `specs/` sono la sorgente del
 * seed); l'editor utente arriva in Fase E.
 */

type TimelineRow = {
  id: string;
  slug: string;
  name: LocalizedText;
  spec_config: { track?: TrackMeta; lensFallback?: LensFallback } | null;
  created_at: string;
};

type AxisRow = {
  kind: string;
  stable_key: string;
  label: LocalizedText | null;
  color: string | null;
  blurb: LocalizedText | null;
  sort_order: number;
};

type BandRow = {
  kind: string;
  config: Record<string, unknown>;
  sort_order: number;
};

type ActorRow = {
  id: string;
  name: string;
  short_name: string | null;
  color: string | null;
};

type PersonRow = {
  id: string;
  name: string;
  short_name: string | null;
  org_id: string | null;
  role: LocalizedText | null;
  avatar: string | null;
};

type ThesisRow = {
  id: string;
  slug: string;
  label: LocalizedText;
  claim: LocalizedText;
  definition: LocalizedText | null;
  status: string;
  since: string | null;
};

export type TimelineSummary = {
  slug: string;
  name: LocalizedText;
  /** La riga di presentazione che l'indice mostra, se il track ne ha una. */
  intro?: LocalizedText;
  visibility: string;
  createdAt: string;
};

const TIMELINE_COLUMNS = 'id, slug, name, spec_config, created_at';

function rowToAxis(row: AxisRow): Axis {
  const axis: Axis = { key: row.stable_key };
  if (row.label) axis.label = row.label;
  if (row.color) axis.color = row.color;
  if (row.blurb) axis.blurb = row.blurb;
  return axis;
}

function rowToBand(row: BandRow): BandSpec | null {
  if (row.kind === 'volume') return { kind: 'volume' };
  if (row.kind === 'axis') {
    const { id, scoreByKey } = row.config as { id?: string; scoreByKey?: Record<string, number> };
    if (!id) return null;
    return { kind: 'axis', id, scoreByKey: scoreByKey ?? {} };
  }
  if (row.kind === 'series') {
    const { id, provider, tickers } = row.config as {
      id?: string;
      provider?: string;
      tickers?: string[];
    };
    if (!id || !provider) return null;
    return { kind: 'series', id, provider, tickers: tickers ?? [] };
  }
  return null;
}

function rowToActor(row: ActorRow): ActorAxis {
  return {
    id: row.id,
    name: row.name,
    shortName: row.short_name ?? row.name,
    color: row.color ?? '#6b7280',
  };
}

function rowToPerson(row: PersonRow): PersonAxis {
  const person: PersonAxis = {
    id: row.id,
    name: row.name,
    shortName: row.short_name ?? row.name,
    role: row.role ?? { it: '', en: '' },
  };
  if (row.org_id) person.orgId = row.org_id;
  if (row.avatar) person.avatar = row.avatar;
  return person;
}

function rowToThesis(row: ThesisRow): ThesisAxis {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    claim: row.claim,
    definition: row.definition ?? { it: '', en: '' },
    status: row.status === 'settled' ? 'settled' : 'open',
    since: row.since ?? '',
  };
}

/** Fallback track when `spec_config.track` is missing: just the registry name. */
function trackFromRegistry(row: TimelineRow): TrackMeta {
  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    shortName: row.name.it,
    period: { it: '', en: '' },
    intro: { it: '', en: '' },
    disclaimer: { it: '', en: '' },
    filterTypes: [],
    peopleIds: [],
    showSentiment: false,
  };
}

/** Ricostruisce lo spec di una timeline dal database. `null` se lo slug è ignoto. */
export async function loadTimelineSpec(slug: string): Promise<TimelineSpec | null> {
  const { data: timeline, error } = await db()
    .from('timelines')
    .select(TIMELINE_COLUMNS)
    .eq('slug', slug)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!timeline) return null;

  const row = timeline as unknown as TimelineRow;
  const [axesResult, bandsResult, actorsResult, peopleResult, thesesResult] = await Promise.all([
    db().from('timeline_axes').select('kind, stable_key, label, color, blurb, sort_order').eq('timeline_id', row.id).order('sort_order'),
    db().from('timeline_bands').select('kind, config, sort_order').eq('timeline_id', row.id).order('sort_order'),
    db().from('actors').select('id, name, short_name, color').eq('timeline_id', row.id).order('id'),
    db().from('people').select('id, name, short_name, org_id, role, avatar').eq('timeline_id', row.id).order('id'),
    db().from('theses').select('id, slug, label, claim, definition, status, since').eq('timeline_id', row.id).order('id'),
  ]);
  for (const result of [axesResult, bandsResult, actorsResult, peopleResult, thesesResult]) {
    if (result.error) throw result.error;
  }

  const axisRows = axesResult.data as unknown as AxisRow[];
  const byKind = (kind: string): Axis[] =>
    axisRows.filter((axis) => axis.kind === kind).map(rowToAxis);

  const lenses = byKind('lens');

  return {
    track: row.spec_config?.track ?? trackFromRegistry(row),
    lenses,
    eventTypes: byKind('event_type'),
    sentimentTags: byKind('sentiment_tag'),
    actors: (actorsResult.data as unknown as ActorRow[]).map(rowToActor),
    people: (peopleResult.data as unknown as PersonRow[]).map(rowToPerson),
    theses: (thesesResult.data as unknown as ThesisRow[]).map(rowToThesis),
    bands: (bandsResult.data as unknown as BandRow[])
      .map(rowToBand)
      .filter((band): band is BandSpec => band !== null),
    // Il ripiego tipo→corsia è configurazione, non un asse: vive in `spec_config`.
    lensFallback: row.spec_config?.lensFallback ?? {
      byEventType: {},
      default: lenses[0]?.key ?? '',
    },
  };
}

/** Il registro: le timeline esistenti, per l'indice. */
export async function listTimelines(): Promise<TimelineSummary[]> {
  const { data, error } = await db()
    .from('timelines')
    .select('slug, name, visibility, spec_config, created_at')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data as unknown as Array<TimelineRow & { visibility: string }>).map((row) => ({
    slug: row.slug,
    name: row.name,
    intro: row.spec_config?.track?.intro,
    visibility: row.visibility,
    createdAt: row.created_at,
  }));
}

const AXIS_KINDS = [
  ['lens', (spec: TimelineSpec) => spec.lenses],
  ['event_type', (spec: TimelineSpec) => spec.eventTypes],
  ['sentiment_tag', (spec: TimelineSpec) => spec.sentimentTags],
] as const;

/**
 * Scrive lo spec nel database. Idempotente: assi, attori, persone e tesi sono
 * upsert sulla loro chiave (l'identità resta, la presentazione si aggiorna), le
 * bande sono riscritte in blocco perché nessuno le referenzia ancora e non
 * hanno una chiave stabile. La `stable_key` non viene mai modificata.
 */
export async function seedSpec(
  timelineId: string,
  spec: TimelineSpec,
): Promise<{ axes: number; bands: number }> {
  const axes = AXIS_KINDS.flatMap(([kind, pick]) =>
    pick(spec).map((axis, index) => ({
      timeline_id: timelineId,
      kind,
      stable_key: axis.key,
      label: axis.label ?? {},
      color: axis.color ?? null,
      blurb: axis.blurb ?? null,
      sort_order: index,
    })),
  );

  const actors = spec.actors.map((actor) => ({
    timeline_id: timelineId,
    id: actor.id,
    name: actor.name,
    short_name: actor.shortName,
    color: actor.color,
  }));

  const people = spec.people.map((person) => ({
    timeline_id: timelineId,
    id: person.id,
    name: person.name,
    short_name: person.shortName,
    org_id: person.orgId ?? null,
    role: person.role,
    avatar: person.avatar ?? null,
  }));

  const theses = spec.theses.map((thesis) => ({
    timeline_id: timelineId,
    id: thesis.id,
    slug: thesis.slug,
    label: thesis.label,
    claim: thesis.claim,
    definition: thesis.definition,
    status: thesis.status,
    since: thesis.since || null,
  }));

  const bands = spec.bands.map((band, index) => ({
    timeline_id: timelineId,
    kind: band.kind,
    config:
      band.kind === 'axis'
        ? { id: band.id, scoreByKey: band.scoreByKey }
        : band.kind === 'series'
          ? { id: band.id, provider: band.provider, tickers: band.tickers }
          : {},
    sort_order: index,
  }));

  const writes = [
    axes.length > 0
      ? db().from('timeline_axes').upsert(axes, { onConflict: 'timeline_id,kind,stable_key' })
      : null,
    actors.length > 0
      ? db().from('actors').upsert(actors, { onConflict: 'timeline_id,id' })
      : null,
    people.length > 0
      ? db().from('people').upsert(people, { onConflict: 'timeline_id,id' })
      : null,
    theses.length > 0
      ? db().from('theses').upsert(theses, { onConflict: 'timeline_id,id' })
      : null,
    db().from('timeline_bands').delete().eq('timeline_id', timelineId),
  ];
  for (const write of await Promise.all(writes)) {
    if (write?.error) throw write.error;
  }

  if (bands.length > 0) {
    const { error } = await db().from('timeline_bands').insert(bands);
    if (error) throw error;
  }

  const { error: configError } = await db()
    .from('timelines')
    .update({ name: spec.track.name, spec_config: { track: spec.track, lensFallback: spec.lensFallback } })
    .eq('id', timelineId);
  if (configError) throw configError;

  return { axes: axes.length, bands: bands.length };
}
