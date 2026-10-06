import { NextResponse } from 'next/server';
import { discoverSentimentCandidates } from '@/lib/pipeline/discover';
import { isAuthorized, unauthorized, assertPipelineConfigured, SESSION_COOKIE } from '@/lib/pipeline/auth';
import { loadPipelineStore, savePipelineStore, upsertCandidates, upsertSignals } from '@/lib/pipeline/store';

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
  const current = await loadPipelineStore();
  const queued = upsertCandidates(current, discovered.candidates);
  const signaled = upsertSignals(queued.store, discovered.signals);
  await savePipelineStore(signaled.store);

  return NextResponse.json({
    ok: true,
    added: queued.added,
    signalsAdded: signaled.added,
    pending: signaled.store.candidates.filter((c) => c.status === 'pending').length,
    signals: signaled.store.signals?.length ?? 0,
    voting: signaled.store.signals?.filter((s) => s.votes && !s.hidden).length ?? 0,
    total: signaled.store.candidates.length,
    scannedFeeds: discovered.scannedFeeds,
    matchedItems: discovered.matchedItems,
    rejectedBySource: discovered.rejectedBySource,
  });
}
