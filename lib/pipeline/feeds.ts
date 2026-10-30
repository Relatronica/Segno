import { siteFilter, type SiteGroup } from '@/lib/pipeline/sources';
import type { EventType, Lens } from '@/lib/data/trasparenza';

export type DiscoverFeed = {
  id: string;
  label: string;
  url: string;
  /** Lane the feed was built for. The classifier may still refine it. */
  lens: Lens;
  /** Event type assumed before the classifier reads the headline. */
  type: EventType;
  group: SiteGroup;
  /** Person feeds need a tracked name in the text; lane feeds do not. */
  requiresPerson: boolean;
};

function gn(query: string, group: SiteGroup, window = '7d'): string {
  const q = encodeURIComponent(`${query} (${siteFilter(group)}) when:${window}`);
  return `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
}

/**
 * The culture feeds are the original sweep: they look for a tracked person and
 * a statement. The lane feeds below look for an event instead, and are the
 * reason the timeline can update itself outside culture.
 *
 * Every item still has to pass the authoritative-host allowlist in discover.ts.
 */
export const SENTIMENT_FEEDS: DiscoverFeed[] = [
  {
    id: 'auth-altman',
    label: 'Authoritative — Altman / OpenAI',
    url: gn('"Sam Altman" OR "OpenAI" (AI OR "artificial intelligence")', 'culture'),
    lens: 'culture',
    type: 'statement',
    group: 'culture',
    requiresPerson: true,
  },
  {
    id: 'auth-amodei',
    label: 'Authoritative — Amodei / Anthropic',
    url: gn('"Dario Amodei" OR Anthropic (AI OR Claude)', 'culture'),
    lens: 'culture',
    type: 'statement',
    group: 'culture',
    requiresPerson: true,
  },
  {
    id: 'auth-musk',
    label: 'Authoritative — Musk / xAI',
    url: gn('"Elon Musk" OR xAI (AI OR Grok)', 'culture'),
    lens: 'culture',
    type: 'statement',
    group: 'culture',
    requiresPerson: true,
  },
  {
    id: 'auth-huang',
    label: 'Authoritative — Huang / NVIDIA',
    url: gn('"Jensen Huang" OR NVIDIA (AI OR GPU)', 'culture'),
    lens: 'culture',
    type: 'statement',
    group: 'culture',
    requiresPerson: true,
  },
  {
    id: 'auth-leaders',
    label: 'Authoritative — Nadella / Pichai / Zuckerberg / Hassabis',
    url: gn(
      '(Nadella OR Pichai OR Zuckerberg OR Hassabis) (AI OR "artificial intelligence") (said OR says OR told OR warned OR announced)',
      'culture',
    ),
    lens: 'culture',
    type: 'statement',
    group: 'culture',
    requiresPerson: true,
  },
  {
    id: 'auth-x-quotes',
    label: 'Authoritative — leader posts quoted from X',
    url: gn(
      '(Altman OR Musk OR Amodei OR Nadella OR Zuckerberg) (AI) (post OR posted OR tweet OR "on X" OR Twitter)',
      'culture',
    ),
    lens: 'culture',
    type: 'statement',
    group: 'culture',
    requiresPerson: true,
  },

  // ── Lane feeds ────────────────────────────────────────────────────────────
  {
    id: 'lane-models',
    label: 'Lane — releases and frontier systems',
    url: gn(
      '(OpenAI OR Anthropic OR DeepMind OR "Meta AI" OR Mistral OR "Hugging Face") (releases OR launches OR unveils OR "new model" OR "open weights" OR "general availability")',
      'models',
    ),
    lens: 'models',
    type: 'milestone',
    group: 'models',
    requiresPerson: false,
  },
  {
    id: 'lane-research',
    label: 'Lane — techniques and results',
    url: gn(
      '(AI OR LLM OR "machine learning") (paper OR preprint OR benchmark OR "state of the art" OR breakthrough OR dataset)',
      'research',
    ),
    lens: 'research',
    type: 'milestone',
    group: 'research',
    requiresPerson: false,
  },
  {
    id: 'lane-business',
    label: 'Lane — funding, valuations, infrastructure',
    url: gn(
      '(AI OR OpenAI OR Anthropic OR Nvidia) (funding OR raises OR valuation OR invests OR "data center" OR capex)',
      'business',
    ),
    lens: 'business',
    type: 'spending',
    group: 'business',
    requiresPerson: false,
  },
  {
    id: 'lane-policy',
    label: 'Lane — rules written and enforced',
    url: gn(
      '("AI Act" OR "AI regulation" OR "AI bill" OR "AI executive order" OR "AI antitrust" OR "AI liability")',
      'policy',
    ),
    lens: 'policy',
    type: 'legislative',
    group: 'policy',
    requiresPerson: false,
  },
];
