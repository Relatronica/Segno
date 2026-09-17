/**
 * Authoritative sources for sentiment discovery.
 * Tier primary = company / institutional first-party.
 * Tier secondary = citable press that often carries leader quotes (incl. X quotes).
 */

export type SourceTier = 'primary' | 'secondary';

/** Hostname suffixes (lowercase, no www.) → tier */
export const AUTHORITATIVE_HOSTS: Record<string, SourceTier> = {
  // Primary — company / lab
  'openai.com': 'primary',
  'anthropic.com': 'primary',
  'blog.google': 'primary',
  'deepmind.google': 'primary',
  'ai.googleblog.com': 'primary',
  'nvidia.com': 'primary',
  'nvidianews.nvidia.com': 'primary',
  'blogs.nvidia.com': 'primary',
  'microsoft.com': 'primary',
  'blogs.microsoft.com': 'primary',
  'news.microsoft.com': 'primary',
  'about.fb.com': 'primary',
  'about.meta.com': 'primary',
  'ai.meta.com': 'primary',
  'x.ai': 'primary',
  'tesla.com': 'primary',

  // Secondary — wire / quality press (EU + global)
  'reuters.com': 'secondary',
  'apnews.com': 'secondary',
  'afp.com': 'secondary',
  'bloomberg.com': 'secondary',
  'ft.com': 'secondary',
  'wsj.com': 'secondary',
  'nytimes.com': 'secondary',
  'washingtonpost.com': 'secondary',
  'theguardian.com': 'secondary',
  'politico.eu': 'secondary',
  'politico.com': 'secondary',
  'euractiv.com': 'secondary',
  'techcrunch.com': 'secondary',
  'theverge.com': 'secondary',
  'wired.com': 'secondary',
  'arstechnica.com': 'secondary',
  'semafor.com': 'secondary',
  'axios.com': 'secondary',
  'cnn.com': 'secondary',
  'bbc.com': 'secondary',
  'bbc.co.uk': 'secondary',
  'npr.org': 'secondary',
  'cnbc.com': 'secondary',
  'forbes.com': 'secondary',
  'businessinsider.com': 'secondary',
  'theinformation.com': 'secondary',
  'restofworld.org': 'secondary',
};

/** Google News publisher labels → host */
export const PUBLISHER_ALIASES: Record<string, string> = {
  reuters: 'reuters.com',
  'associated press': 'apnews.com',
  ap: 'apnews.com',
  bloomberg: 'bloomberg.com',
  'financial times': 'ft.com',
  'the wall street journal': 'wsj.com',
  'wall street journal': 'wsj.com',
  'the new york times': 'nytimes.com',
  'new york times': 'nytimes.com',
  'the washington post': 'washingtonpost.com',
  'washington post': 'washingtonpost.com',
  'the guardian': 'theguardian.com',
  politico: 'politico.eu',
  'politico europe': 'politico.eu',
  euractiv: 'euractiv.com',
  techcrunch: 'techcrunch.com',
  'the verge': 'theverge.com',
  wired: 'wired.com',
  'ars technica': 'arstechnica.com',
  semafor: 'semafor.com',
  axios: 'axios.com',
  cnn: 'cnn.com',
  bbc: 'bbc.com',
  'bbc news': 'bbc.com',
  npr: 'npr.org',
  cnbc: 'cnbc.com',
  forbes: 'forbes.com',
  'business insider': 'businessinsider.com',
  'the information': 'theinformation.com',
  openai: 'openai.com',
  anthropic: 'anthropic.com',
  nvidia: 'nvidia.com',
  microsoft: 'microsoft.com',
  google: 'blog.google',
  deepmind: 'deepmind.google',
  meta: 'about.meta.com',
};

/**
 * Official X handles we treat as primary when a status URL is present,
 * or as a signal when quoted by secondary press.
 */
export const OFFICIAL_X_HANDLES: Record<string, string> = {
  sama: 'altman',
  openai: 'altman',
  anthropicai: 'amodei',
  damodei: 'amodei',
  elonmusk: 'musk',
  xai: 'musk',
  nvidia: 'huang',
  jensenhuang: 'huang',
  demishassabis: 'hassabis',
  deepmind: 'hassabis',
  zuck: 'zuckerberg',
  meta: 'zuckerberg',
  satyanadella: 'nadella',
  microsoft: 'nadella',
  sundarpichai: 'pichai',
};

/** Domains used in Google News site: filters */
export const SEARCH_SITE_FILTER = [
  'reuters.com',
  'apnews.com',
  'bloomberg.com',
  'ft.com',
  'wsj.com',
  'nytimes.com',
  'politico.eu',
  'politico.com',
  'theguardian.com',
  'techcrunch.com',
  'theverge.com',
  'openai.com',
  'anthropic.com',
  'blog.google',
  'nvidia.com',
  'microsoft.com',
  'about.meta.com',
  'x.ai',
].join(' OR site:');

export function normalizeHost(hostname: string): string {
  return hostname.replace(/^www\./i, '').toLowerCase();
}

export function hostFromUrl(url: string): string | null {
  try {
    return normalizeHost(new URL(url).hostname);
  } catch {
    return null;
  }
}

export function lookupHostTier(host: string): SourceTier | null {
  const h = normalizeHost(host);
  if (AUTHORITATIVE_HOSTS[h]) return AUTHORITATIVE_HOSTS[h];
  // suffix match (e.g. blogs.microsoft.com already listed; also *.reuters.com)
  for (const [allowed, tier] of Object.entries(AUTHORITATIVE_HOSTS)) {
    if (h === allowed || h.endsWith(`.${allowed}`)) return tier;
  }
  return null;
}

export function publisherLabelToHost(label: string): string | null {
  const key = label.trim().toLowerCase();
  if (PUBLISHER_ALIASES[key]) return PUBLISHER_ALIASES[key];
  // fuzzy contains
  for (const [alias, host] of Object.entries(PUBLISHER_ALIASES)) {
    if (key.includes(alias) || alias.includes(key)) return host;
  }
  return null;
}

/** Google News titles often end with " - Publisher" */
export function publisherFromTitle(title: string): string | null {
  const parts = title.split(/\s[-–—]\s/);
  if (parts.length < 2) return null;
  return parts[parts.length - 1]?.trim() || null;
}

const X_STATUS_RE =
  /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/([A-Za-z0-9_]+)\/status\/(\d+)/gi;

export type XStatusRef = {
  handle: string;
  personId: string;
  statusUrl: string;
};

export function findOfficialXStatuses(text: string): XStatusRef[] {
  const out: XStatusRef[] = [];
  const seen = new Set<string>();
  for (const match of text.matchAll(X_STATUS_RE)) {
    const handle = match[1].toLowerCase();
    const personId = OFFICIAL_X_HANDLES[handle];
    if (!personId) continue;
    const statusUrl = `https://x.com/${match[1]}/status/${match[2]}`;
    if (seen.has(statusUrl)) continue;
    seen.add(statusUrl);
    out.push({ handle, personId, statusUrl });
  }
  return out;
}

export type SourceClassification = {
  accepted: boolean;
  tier?: SourceTier;
  /** Press piece that embeds / links an official X status */
  xQuoted: boolean;
  host?: string;
  publisher?: string;
  xStatusUrl?: string;
  xHandle?: string;
};

export function classifySource(input: {
  url: string;
  title: string;
  snippet?: string;
}): SourceClassification {
  const blob = `${input.title}\n${input.snippet || ''}\n${input.url}`;
  const xRefs = findOfficialXStatuses(blob);

  let host = hostFromUrl(input.url);
  // Skip classifying google news wrappers as hosts
  if (host && (host.includes('news.google.') || host === 'news.google.com')) {
    host = null;
  }

  const publisher = publisherFromTitle(input.title);
  if (!host && publisher) {
    host = publisherLabelToHost(publisher) ?? null;
  }

  const tier = host ? lookupHostTier(host) : null;
  const xQuoted = xRefs.length > 0;
  const xPrimary = xRefs[0];

  // Direct X status URL from allowlisted handle → treat as primary
  if (host && (host === 'x.com' || host === 'twitter.com') && xPrimary) {
    return {
      accepted: true,
      tier: 'primary',
      xQuoted: true,
      host,
      publisher: publisher ?? undefined,
      xStatusUrl: xPrimary.statusUrl,
      xHandle: xPrimary.handle,
    };
  }

  if (tier) {
    return {
      accepted: true,
      tier,
      xQuoted,
      host: host ?? undefined,
      publisher: publisher ?? undefined,
      xStatusUrl: xPrimary?.statusUrl,
      xHandle: xPrimary?.handle,
    };
  }

  // Non-allowlisted host but quotes an official X status → keep as secondary via press
  if (xQuoted && xPrimary) {
    return {
      accepted: true,
      tier: 'secondary',
      xQuoted: true,
      host: host ?? undefined,
      publisher: publisher ?? undefined,
      xStatusUrl: xPrimary.statusUrl,
      xHandle: xPrimary.handle,
    };
  }

  return {
    accepted: false,
    xQuoted: false,
    host: host ?? undefined,
    publisher: publisher ?? undefined,
  };
}
