import { NextResponse } from 'next/server';
import { refreshMarketSnapshot } from '@/lib/market/refresh';
import { saveMarketSnapshot } from '@/lib/market/store';
import { isAuthorized, unauthorized, assertPipelineConfigured } from '@/lib/pipeline/auth';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Pulls the listed actors' closes from the market and stores them for the band.
 *
 * Called by a weekly scheduled job, never by the site itself. A failed pull
 * leaves the stored snapshot untouched, so the band keeps the last good one.
 */
export async function POST(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;

  if (!isAuthorized(request)) return unauthorized();

  try {
    const snapshot = await refreshMarketSnapshot();
    await saveMarketSnapshot(snapshot);

    return NextResponse.json({
      ok: true,
      baseDate: snapshot.baseDate,
      updatedAt: snapshot.updatedAt,
      series: snapshot.series.map((series) => ({
        ticker: series.ticker,
        points: series.points.length,
        last: series.points.at(-1) ?? null,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'refresh_failed' },
      { status: 502 },
    );
  }
}
