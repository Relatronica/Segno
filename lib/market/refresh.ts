import type { MarketSnapshot } from './store';

/**
 * Pulls the listed actors' closes and reshapes them into the band's snapshot.
 *
 * Runs from the weekly job behind `/api/market/refresh`, never on a visitor's
 * request: the endpoint is Yahoo's chart API, which is unofficial. No terms of
 * service cover redistributing it, it rate-limits by IP, and a datacentre can be
 * refused outright — hence the reader proxy at the end of `HOSTS`.
 */

/** The trading day worth 100 on every line. Fixed: an index that moves its own
    base cannot be compared over time. */
const BASE_DATE = '2015-01-02';

/** Every line any band draws, and the actor it stands for. One snapshot feeds
    them all; each timeline keeps only the tickers its own spec declares. */
const TICKERS: Record<string, { actorId: string; exchange: string }> = {
  GOOGL: { actorId: 'google', exchange: 'NASDAQ' },
  META: { actorId: 'meta', exchange: 'NASDAQ' },
  MSFT: { actorId: 'microsoft', exchange: 'NASDAQ' },
  AMZN: { actorId: 'amazon', exchange: 'NASDAQ' },
  AAPL: { actorId: 'apple', exchange: 'NASDAQ' },
  NVDA: { actorId: 'nvidia', exchange: 'NASDAQ' },
  CRWD: { actorId: 'crowdstrike', exchange: 'NASDAQ' },
  PANW: { actorId: 'paloaltonetworks', exchange: 'NASDAQ' },
  FTNT: { actorId: 'fortinet', exchange: 'NASDAQ' },
  ZS: { actorId: 'zscaler', exchange: 'NASDAQ' },
  NET: { actorId: 'cloudflare', exchange: 'NYSE' },
};

/** Asked for from before the base date, so the last close at or before it exists. */
const FETCH_FROM = '2014-12-01';

const HOSTS = ['https://query1.finance.yahoo.com', 'https://query2.finance.yahoo.com'];

/** Public reader that mirrors a URL back as text: last resort for a blocked host. */
const READER = 'https://r.jina.ai/';

const TIMEOUT_MS = 8_000;

function epochOfIso(iso: string): number {
  return Math.floor(Date.parse(`${iso}T00:00:00Z`) / 1000);
}

function isoOfEpoch(seconds: number): string {
  return new Date(seconds * 1000).toISOString().slice(0, 10);
}

/** Monday of the week a day falls in, so a month boundary cannot split one. */
function weekKey(iso: string): string {
  const t = Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
  const monday = t - ((new Date(t).getUTCDay() + 6) % 7) * 86_400_000;
  return new Date(monday).toISOString().slice(0, 10);
}

/** The reader may wrap the payload in prose; take the outermost JSON object. */
function readJson(text: string): unknown | null {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // fall through to the substring attempt
  }
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(trimmed.slice(start, end + 1));
  } catch {
    return null;
  }
}

async function fetchChart(ticker: string): Promise<unknown> {
  const path = `/v8/finance/chart/${ticker}?period1=${epochOfIso(FETCH_FROM)}&period2=${Math.floor(
    Date.now() / 1000,
  )}&interval=1d`;
  const urls = [...HOSTS.map((host) => `${host}${path}`), `${READER}${HOSTS[0]}${path}`];
  const failures: string[] = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          accept: 'application/json',
          'user-agent': 'Mozilla/5.0 (compatible; Segno/2.0; +https://segno.app)',
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!response.ok) {
        failures.push(`${url} → ${response.status}`);
        continue;
      }
      const payload = readJson(await response.text());
      if (payload) return payload;
      failures.push(`${url} → unreadable body`);
    } catch (error) {
      failures.push(`${url} → ${error instanceof Error ? error.message : 'failed'}`);
    }
  }

  throw new Error(failures.join('; '));
}

type Chart = {
  chart?: {
    error?: { description?: string } | null;
    result?: {
      timestamp?: number[];
      indicators?: { quote?: { close?: (number | null)[] }[] };
    }[];
  };
};

/** One row per trading day, oldest first; days the venue did not close are dropped. */
function closesFrom(payload: unknown): [string, number][] {
  const chart = (payload as Chart).chart;
  if (chart?.error) throw new Error(chart.error.description ?? 'yahoo error');

  const result = chart?.result?.[0];
  const stamps = result?.timestamp;
  const closes = result?.indicators?.quote?.[0]?.close;
  if (!stamps?.length || !closes?.length) throw new Error('no series in the response');

  const rows: [string, number][] = [];
  for (let i = 0; i < stamps.length; i += 1) {
    const close = closes[i];
    if (typeof close !== 'number' || !Number.isFinite(close)) continue;
    rows.push([isoOfEpoch(stamps[i]), close]);
  }
  return rows;
}

/**
 * All lines or none. A partial pull would silently drop a company from a band,
 * so the caller is told to keep the snapshot it already has.
 */
export async function refreshMarketSnapshot(): Promise<MarketSnapshot> {
  const entries = await Promise.all(
    Object.entries(TICKERS).map(async ([ticker, meta]) => {
      try {
        const all = closesFrom(await fetchChart(ticker)).sort((a, b) =>
          a[0].localeCompare(b[0]),
        );
        const window = all.filter(([date]) => date >= BASE_DATE);
        // A company that lists after the base date (CrowdStrike, Zscaler,
        // Cloudflare) has no close at or before it: 100 falls on its own first
        // close instead. The level is still fixed, just later per company.
        const base = all.filter(([date]) => date <= BASE_DATE).at(-1) ?? window[0];
        if (!window.length || !base) throw new Error(`no close around ${BASE_DATE}`);

        const sampled = window.filter(([date], i) => {
          const next = window[i + 1];
          return !next || weekKey(next[0]) !== weekKey(date);
        });

        return {
          series: {
            actorId: meta.actorId,
            ticker,
            exchange: meta.exchange,
            baseClose: Math.round(base[1] * 1e6) / 1e6,
            points: sampled.map(([date, close]) => [date, Math.round((close / base[1]) * 10000) / 100]),
          } as MarketSnapshot['series'][number],
          failure: null,
        };
      } catch (error) {
        return { series: null, failure: `${ticker}: ${error instanceof Error ? error.message : 'failed'}` };
      }
    }),
  );

  const failures = entries.flatMap((entry) => (entry.failure ? [entry.failure] : []));
  if (failures.length) {
    throw new Error(`incomplete refresh — ${failures.join(' | ')}`);
  }

  return {
    baseDate: BASE_DATE,
    updatedAt: new Date().toISOString(),
    series: entries.map((entry) => entry.series as MarketSnapshot['series'][number]),
  };
}
