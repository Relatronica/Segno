import {
  lobbyActors,
  lobbyPeople,
  sentimentPeople,
  theses,
  unifiedTheme,
} from '@/lib/data/trasparenza';
import type { ThesisAxis, TimelineSpec } from '@/lib/trasparenza/spec';

/**
 * The AI ontology: the seed source of the live timeline.
 *
 * In Fase A this file *was* the runtime source — components imported it. In
 * Fase C the database holds the spec and this file only *seeds* it: the values
 * are unchanged, so re-seeding reproduces the same timeline. Editing a label or
 * a colour here and re-running the seed updates the timeline without a deploy.
 *
 * Actors, people and theses live here too: they are structure, like the lenses.
 */

/** The claims this timeline's quotes are read against. */
const aiTheses: ThesisAxis[] = theses
  .filter((thesis) => thesis.themeId === 'sentiment')
  .map((thesis) => ({
    id: thesis.id,
    slug: thesis.slug,
    label: thesis.label,
    claim: thesis.claim,
    definition: thesis.definition,
    status: thesis.status,
    since: thesis.since,
  }));

export const aiSpec: TimelineSpec = {
  track: {
    id: unifiedTheme.id,
    slug: unifiedTheme.slug,
    name: unifiedTheme.name,
    shortName: unifiedTheme.shortName,
    period: unifiedTheme.period,
    intro: unifiedTheme.intro,
    disclaimer: unifiedTheme.disclaimer,
    filterTypes: unifiedTheme.filterTypes,
    peopleIds: sentimentPeople.map((person) => person.id),
    showSentiment: unifiedTheme.showSentiment,
  },

  /** Reading order, top to bottom. */
  lenses: [
    {
      key: 'models',
      label: { it: 'Modelli', en: 'Models' },
      blurb: {
        it: 'I sistemi di frontiera che i laboratori rilasciano: chi pubblica cosa, e quando.',
        en: 'The frontier systems labs release: who ships what, and when.',
      },
      color: '#3b6fe0',
    },
    {
      key: 'research',
      label: { it: 'Ricerca', en: 'Research' },
      blurb: {
        it: 'Le ricerche che aprono la strada: tecniche e risultati prima che diventino prodotto.',
        en: 'The research that opens the way: techniques and findings before they become product.',
      },
      color: '#7c5cff',
    },
    {
      key: 'capabilities',
      label: { it: 'Capacità', en: 'Capabilities' },
      blurb: {
        it: 'Le metriche e i test di frontiera: come crescono le capacità misurate dei sistemi (ECI di Epoch, SWE-bench, reasoning).',
        en: "Frontier benchmarks and metrics: how measured system capabilities progress over time (Epoch's ECI, SWE-bench, reasoning).",
      },
      color: '#0284c7',
    },
    {
      key: 'business',
      label: { it: 'Mercato', en: 'Business' },
      blurb: {
        it: 'Il denaro che muove il settore: investimenti, valutazioni, spese e quote di mercato.',
        en: 'The money moving the field: investments, valuations, spending and market shares.',
      },
      color: '#0f9d8f',
    },
    {
      key: 'culture',
      label: { it: 'Cultura', en: 'Culture' },
      blurb: {
        it: 'Come l’IA entra nel discorso pubblico: cosa si dice, e con quale tono.',
        en: 'How AI enters public discourse: what is said, and in what tone.',
      },
      color: '#c2703a',
    },
    {
      key: 'policy',
      label: { it: 'Politica', en: 'Policy' },
      blurb: {
        it: 'Le regole del gioco: leggi, sanzioni e le istituzioni che provano a governare l’IA.',
        en: 'The rules of the game: laws, sanctions, and the institutions trying to govern AI.',
      },
      color: '#b3382c',
    },
  ],

  eventTypes: ['legislative', 'meeting', 'spending', 'milestone', 'statement', 'sanction'].map(
    (key) => ({ key }),
  ),

  sentimentTags: ['alarm', 'caution', 'optimism', 'deregulation', 'open_source'].map((key) => ({
    key,
  })),

  actors: lobbyActors.map((actor) => ({
    id: actor.id,
    name: actor.name,
    shortName: actor.shortName,
    color: actor.color,
  })),

  people: lobbyPeople,

  theses: aiTheses,

  /**
   * The market band draws the listed labs' closes. The closes come from the
   * snapshot prop; the declaration here fixes which lines belong to this
   * timeline, so a second timeline's tickers never leak into the band.
   */
  bands: [
    { kind: 'volume' },
    {
      kind: 'axis',
      id: 'sentiment',
      /** Fear↔enthusiasm axis. Chart Y: enthusiasm up, fear down. */
      scoreByKey: {
        alarm: 1,
        caution: 0.55,
        deregulation: 0.1,
        open_source: -0.45,
        optimism: -1,
      },
    },
    {
      kind: 'series',
      id: 'market',
      provider: 'yahoo',
      tickers: ['GOOGL', 'META', 'MSFT', 'AMZN', 'AAPL', 'NVDA'],
    },
  ],

  /**
   * The two rows where the actor *is* the story: a release is its lab, a
   * benchmark is whoever ran it.
   */
  lensMarks: ['models', 'capabilities'],

  /** No row carries a fixed mark of its own: actor marks cover the identity. */
  lensGlyphs: {},

  /**
   * Curated pins predate the lens axis: the form of the event decides. A
   * statement is a cultural reading of the field, a declared spend is market,
   * everything else in the curated set is EU policy.
   */
  lensFallback: {
    byEventType: { statement: 'culture', spending: 'business' },
    default: 'policy',
  },
};
