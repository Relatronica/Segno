import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { discoverSentimentCandidates } from '@/lib/pipeline/discover';
import { listCandidates, listSignals, upsertCandidates, upsertSignals } from '@/lib/db/queue';
import { TIMELINE_SLUG } from '@/lib/db/timeline';

export const runtime = 'nodejs';
export const maxDuration = 60;

function sessionFrom(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export async function POST(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;

  if (!isAuthorized(request, sessionFrom(request))) {
    return unauthorized();
  }

  const url = new URL(request.url);
  let bodySlug: unknown;
  try {
    const body = await request.json().catch(() => null);
    bodySlug = body && typeof body === 'object' ? (body as { timeline?: unknown }).timeline : undefined;
  } catch {
    bodySlug = undefined;
  }
  const querySlug = url.searchParams.get('timeline')?.trim();
  const slug = typeof bodySlug === 'string' && bodySlug.trim()
    ? bodySlug.trim()
    : (querySlug || TIMELINE_SLUG);

  const discovered = await discoverSentimentCandidates(slug);
  const added = await upsertCandidates(discovered.candidates, slug);
  const signalsAdded = await upsertSignals(discovered.signals, slug);

  const [candidates, signals] = await Promise.all([listCandidates(undefined, slug), listSignals(slug)]);

  return NextResponse.json({
    ok: true,
    added,
    signalsAdded,
    pending: candidates.filter((c) => c.status === 'pending').length,
    signals: signals.length,
    total: candidates.length,
    scannedFeeds: discovered.scannedFeeds,
    matchedItems: discovered.matchedItems,
    rejectedBySource: discovered.rejectedBySource,
    rejectedOffTopic: discovered.rejectedOffTopic,
    unassignedItems: discovered.unassignedItems,
    laneCounts: discovered.laneCounts,
  });
}
