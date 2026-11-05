import { NextResponse } from 'next/server';
import { loadPublicTimeline } from '@/lib/db/public';

export const runtime = 'nodejs';

/**
 * Public: the live timeline. Every pin the database holds — curated and
 * hand-written alike, already corrected and with hidden rows dropped — plus the
 * promoted quotes and the automatic diary. The projection itself lives in
 * `lib/db/public` so the page and this route cannot diverge.
 */
export async function GET() {
  const timeline = await loadPublicTimeline();

  return NextResponse.json(timeline, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
