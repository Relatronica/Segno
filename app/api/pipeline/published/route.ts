import { NextResponse } from 'next/server';
import { loadPublicTimeline } from '@/lib/db/public';
import { TIMELINE_SLUG } from '@/lib/db/timeline';

export const runtime = 'nodejs';

/**
 * Public: the live timeline. Every pin the database holds — curated and
 * hand-written alike, already corrected and with hidden rows dropped — plus the
 * promoted quotes and the automatic diary. The projection itself lives in
 * `lib/db/public` so the page and this route cannot diverge.
 *
 * `?timeline=<slug>` reads another timeline's projection; absent, the flagship.
 */
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('timeline') || TIMELINE_SLUG;

  const timeline = await loadPublicTimeline(slug).catch(() => null);
  if (!timeline) return NextResponse.json({ error: 'timeline not found' }, { status: 404 });

  return NextResponse.json(timeline, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
