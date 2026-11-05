import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { discoverSentimentCandidates } from '@/lib/pipeline/discover';
import { listCandidates, listSignals, upsertCandidates, upsertSignals } from '@/lib/db/queue';

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

  const discovered = await discoverSentimentCandidates();
  const added = await upsertCandidates(discovered.candidates);
  const signalsAdded = await upsertSignals(discovered.signals);

  const [candidates, signals] = await Promise.all([listCandidates(), listSignals()]);

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
