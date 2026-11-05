/**
 * The contract between the timeline engine and a domain.
 *
 * Nothing here knows about AI: a spec describes *which* lenses, forms and tags
 * a timeline has, never how they are drawn. The components read a spec at
 * runtime instead of importing the ontology, so a second timeline costs a new
 * spec file — not a change in `components/`.
 */

export type LocalizedText = { it: string; en: string };

/**
 * One row of the ontology: a lens, an event form, a sentiment tag.
 *
 * Identity is `key`: it appears in URLs, events and readings. Everything else
 * is presentation and can be re-labelled without breaking a permalink.
 */
export type Axis = {
  /** Stable identity. Immutable once an event or a URL refers to it. */
  key: string;
  label?: LocalizedText;
  color?: string;
  /** One line on what the axis holds, read under a lane's name. */
  blurb?: LocalizedText;
};

/** A person a timeline's pins refer to. */
export type PersonAxis = {
  id: string;
  name: string;
  shortName: string;
  orgId?: string;
  role: LocalizedText;
  avatar?: string;
};

/** An organisation a timeline's pins refer to. */
export type ActorAxis = {
  id: string;
  name: string;
  shortName: string;
  color: string;
};

/**
 * A claim under test. Structure, not content: the claim is fixed, the readings
 * against it move. A timeline brings its own claims.
 */
export type ThesisAxis = {
  id: string;
  slug: string;
  /** Short chip label. */
  label: LocalizedText;
  /** The full, citable claim. */
  claim: LocalizedText;
  /** Reading key: what each stance means for this specific claim. */
  definition: LocalizedText;
  status: 'open' | 'settled';
  since: string;
};

/** The reading frame of a timeline: who it is, and how it presents itself. */
export type TrackMeta = {
  id: string;
  slug: string;
  name: LocalizedText;
  shortName: string;
  period: LocalizedText;
  intro: LocalizedText;
  disclaimer: LocalizedText;
  /** Event forms offered in the filter UI. */
  filterTypes: string[];
  /** People offered in the filter UI; the roster may be broader. */
  peopleIds: string[];
  showSentiment: boolean;
};

/**
 * From an event form to the lens it falls under when it carries none. A
 * fallback is data, not code: it is part of what makes a timeline's reading.
 */
export type LensFallback = {
  byEventType: Record<string, string>;
  default: string;
};

/** A band drawn under the lanes. Its rendering stays in the engine. */
export type BandSpec =
  | { kind: 'volume' }
  /** Tone curve: each tag's pull on the axis, positive = fear. */
  | { kind: 'axis'; id: string; scoreByKey: Record<string, number> }
  /** External series, rebased to a fixed base date. */
  | { kind: 'series'; id: string; provider: string; tickers: string[] };

export type TimelineSpec = {
  /** The timeline's own identity and reading frame. */
  track: TrackMeta;
  /** Reading rows. Order is the reading order: top to bottom. */
  lenses: Axis[];
  eventTypes: Axis[];
  sentimentTags: Axis[];
  /** The subjects its pins can refer to. */
  actors: ActorAxis[];
  people: PersonAxis[];
  /** The claims its quotes are read against. */
  theses: ThesisAxis[];
  /** Bands under the lanes, top to bottom. */
  bands: BandSpec[];
  /**
   * Keys of the lenses whose pins wear their subject's own mark instead of the
   * lane's dot, where the actor — not the row — is what a pin is about.
   * Configuration, not an axis: it says how a row is drawn, not what it holds.
   */
  lensMarks: string[];
  /**
   * A fixed mark a whole row wears, keyed by lens and named in the engine's
   * glyph table (`attacchi → danger`). The mark says what the row *is*, never a
   * grade: it marks every pin of the lane alike, so no severity is invented.
   * Configuration, like `lensMarks`.
   */
  lensGlyphs: Record<string, string>;
  lensFallback: LensFallback;
};

/** Index axes by key, for lookups that would otherwise be linear scans. */
export function axisMap(axes: Axis[]): Map<string, Axis> {
  return new Map(axes.map((axis) => [axis.key, axis]));
}

/** The lens an event belongs to: its own, or the spec's fallback by form. */
export function lensOf(event: { lens?: string; type: string }, spec: TimelineSpec): string {
  if (event.lens) return event.lens;
  return spec.lensFallback.byEventType[event.type] ?? spec.lensFallback.default;
}

/** Scores of the tone band — the one `axis` band a timeline draws its curve from. */
export function moodScores(spec: TimelineSpec): Record<string, number> {
  const band = spec.bands.find(
    (entry): entry is Extract<BandSpec, { kind: 'axis' }> => entry.kind === 'axis',
  );
  return band?.scoreByKey ?? {};
}

/**
 * The tickers a timeline's series bands draw. The market snapshot is one global
 * file, so a timeline keeps only the lines it declares: without this the
 * flagship's closes would show up under a second timeline's band.
 */
export function seriesTickers(spec: TimelineSpec): string[] {
  return spec.bands.flatMap((band) => (band.kind === 'series' ? band.tickers : []));
}
