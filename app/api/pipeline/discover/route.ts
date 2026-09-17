import { NextResponse } from 'next/server';
import { discoverSentimentCandidates } from '@/lib/pipeline/discover';
import { isAuthorized, unauthorized, assertPipelineConfigured, SESSION_COOKIE } from '@/lib/pipeline/auth';
import { loadPipelineStore, savePipelineStore, upsertCandidates } from '@/lib/pipeline/store';

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
  const { store, added } = upsertCandidates(current, discovered.candidates);
  await savePipelineStore(store);

  return NextResponse.json({
    ok: true,
    added,
    pending: store.candidates.filter((c) => c.status === 'pending').length,
    total: store.candidates.length,
    scannedFeeds: discovered.scannedFeeds,
    matchedItems: discovered.matchedItems,
    rejectedBySource: discovered.rejectedBySource,
  });
}
