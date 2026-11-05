import type { TimelineSpec } from '@/lib/trasparenza/spec';

/**
 * The AI ontology, transported verbatim from the domain layer.
 *
 * This file is the source of truth for the live timeline: the components read
 * it at runtime, so nothing here may drift from what the pins expect. Values
 * are unchanged from `lib/data/trasparenza.ts` — only their home moved.
 */
export const aiSpec: TimelineSpec = {
  id: 'sentiment',
  slug: 'sentiment',
  name: { it: 'Evoluzione dell’IA', en: 'AI evolution' },

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

  /**
   * The market band is drawn from a snapshot prop, not from this list: the
   * declaration here is what the axis means, not where the closes come from.
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
  ],

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
