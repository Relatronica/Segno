export type MarketPoint = {
  /** Trading day, ISO. */
  date: string;
  /** Close rebased to 100 on the base date. */
  index: number;
};

export type MarketSeries = {
  /** Actor id in `lobbyActors`, which carries the colour and the short name. */
  actorId: string;
  /** Listing ticker, as shown in the band legend. */
  ticker: string;
  /** Venue of the listing. */
  exchange: string;
  /** The close 100 stands for. `index / 100 * baseClose` is the price of a
      point, which is what the band's hover readout shows. */
  baseClose: number;
  /** End-of-day closes, oldest first. */
  points: MarketPoint[];
};

/** The day every series is rebased to 100 on. Fixed, never derived from the
    data: an index that moves its own base cannot be compared over time. */
export const MARKET_BASE_DATE = '2015-01-02';

/**
 * Where the closes come from, named in the band. Market data is third-party:
 * it is deliberately outside the CC BY 4.0 grant that covers the curated
 * dataset (see LICENSE-CONTENT), so whoever reuses it answers to the source.
 *
 * Named as fetched, which is not the same as being cleared: see the note in
 * `lib/market/refresh.ts` before this ships.
 */
export const MARKET_SOURCE = {
  label: 'Yahoo Finance',
  url: 'https://finance.yahoo.com',
};

type RawSeries = {
  actorId: string;
  ticker: string;
  exchange: string;
  baseClose: number;
  /** `[date, index]`, kept as pairs so the stored file stays compact. */
  points: [string, number][];
};

/**
 * Reads a stored snapshot into the series the band draws. The data is pulled and
 * reshaped by `lib/market/refresh.ts` and kept outside the repository — it is
 * third-party, and committing it would put it under the project's own licences.
 */
export function parseMarketSnapshot(raw: unknown): MarketSeries[] {
  const series = (raw as { series?: RawSeries[] } | null)?.series;
  if (!Array.isArray(series)) return [];
  return series.map((entry) => ({
    actorId: entry.actorId,
    ticker: entry.ticker,
    exchange: entry.exchange,
    baseClose: entry.baseClose,
    points: entry.points.map(([date, index]) => ({ date, index })),
  }));
}
