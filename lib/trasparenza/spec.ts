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
  id: string;
  slug: string;
  name: LocalizedText;
  /** Reading rows. Order is the reading order: top to bottom. */
  lenses: Axis[];
  eventTypes: Axis[];
  sentimentTags: Axis[];
  /** Bands under the lanes, top to bottom. */
  bands: BandSpec[];
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
