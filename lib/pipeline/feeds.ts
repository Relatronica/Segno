export type DiscoverFeed = {
  id: string;
  label: string;
  url: string;
};

/**
 * Public RSS queries aimed at leader statements / AI policy tone.
 * Google News RSS is brittle but good enough for a daily candidate sweep.
 */
export const SENTIMENT_FEEDS: DiscoverFeed[] = [
  {
    id: 'gn-altman',
    label: 'Google News — Altman / OpenAI',
    url: 'https://news.google.com/rss/search?q=%22Sam+Altman%22+(AI+OR+%22artificial+intelligence%22)+when:3d&hl=en-US&gl=US&ceid=US:en',
  },
  {
    id: 'gn-amodei',
    label: 'Google News — Amodei / Anthropic',
    url: 'https://news.google.com/rss/search?q=%22Dario+Amodei%22+(AI+OR+Anthropic)+when:3d&hl=en-US&gl=US&ceid=US:en',
  },
  {
    id: 'gn-musk',
    label: 'Google News — Musk / xAI',
    url: 'https://news.google.com/rss/search?q=%22Elon+Musk%22+(AI+OR+xAI)+when:3d&hl=en-US&gl=US&ceid=US:en',
  },
  {
    id: 'gn-huang',
    label: 'Google News — Huang / NVIDIA',
    url: 'https://news.google.com/rss/search?q=%22Jensen+Huang%22+(AI+OR+NVIDIA)+when:3d&hl=en-US&gl=US&ceid=US:en',
  },
  {
    id: 'gn-leaders',
    label: 'Google News — Big Tech AI quotes',
    url: 'https://news.google.com/rss/search?q=(Nadella+OR+Pichai+OR+Zuckerberg+OR+Hassabis)+(AI+OR+%22artificial+intelligence%22)+(said+OR+says+OR+told)+when:3d&hl=en-US&gl=US&ceid=US:en',
  },
];
