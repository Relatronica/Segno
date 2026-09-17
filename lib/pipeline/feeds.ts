import { SEARCH_SITE_FILTER } from '@/lib/pipeline/sources';

export type DiscoverFeed = {
  id: string;
  label: string;
  url: string;
};

function gn(query: string): string {
  const q = encodeURIComponent(`${query} (site:${SEARCH_SITE_FILTER}) when:7d`);
  return `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
}

/**
 * Daily sweep restricted to authoritative domains (press + company).
 * Post-filter in discover.ts still drops anything outside the allowlist.
 */
export const SENTIMENT_FEEDS: DiscoverFeed[] = [
  {
    id: 'auth-altman',
    label: 'Authoritative — Altman / OpenAI',
    url: gn('"Sam Altman" OR "OpenAI" (AI OR "artificial intelligence")'),
  },
  {
    id: 'auth-amodei',
    label: 'Authoritative — Amodei / Anthropic',
    url: gn('"Dario Amodei" OR Anthropic (AI OR Claude)'),
  },
  {
    id: 'auth-musk',
    label: 'Authoritative — Musk / xAI',
    url: gn('"Elon Musk" OR xAI (AI OR Grok)'),
  },
  {
    id: 'auth-huang',
    label: 'Authoritative — Huang / NVIDIA',
    url: gn('"Jensen Huang" OR NVIDIA (AI OR GPU)'),
  },
  {
    id: 'auth-leaders',
    label: 'Authoritative — Nadella / Pichai / Zuckerberg / Hassabis',
    url: gn(
      '(Nadella OR Pichai OR Zuckerberg OR Hassabis) (AI OR "artificial intelligence") (said OR says OR told OR warned OR announced)',
    ),
  },
  {
    id: 'auth-x-quotes',
    label: 'Authoritative — leader posts quoted from X',
    url: gn(
      '(Altman OR Musk OR Amodei OR Nadella OR Zuckerberg) (AI) (post OR posted OR tweet OR "on X" OR Twitter)',
    ),
  },
];
