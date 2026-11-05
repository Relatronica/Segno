import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { listTimelines, loadRedactionSpec } from '@/lib/db/spec';
import { TIMELINE_SLUG } from '@/lib/db/timeline';

export const runtime = 'nodejs';

function sessionFrom(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

/**
 * Ciò che la redazione deve sapere per una timeline: il registro (per il
 * selettore) e i menù di quella timeline — corsie, forme, toni, attori e
 * persone. Senza slug risponde per la flagship.
 */
export async function GET(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  const url = new URL(request.url);
  const slug = url.searchParams.get('timeline')?.trim() || TIMELINE_SLUG;

  const [timelines, spec] = await Promise.all([listTimelines(), loadRedactionSpec(slug)]);
  if (!spec) return NextResponse.json({ error: 'unknown_timeline' }, { status: 404 });

  return NextResponse.json({ timelines, spec });
}
