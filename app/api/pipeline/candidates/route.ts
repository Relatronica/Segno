import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { loadPipelineStore, savePipelineStore, updateCandidateStatus } from '@/lib/pipeline/store';
import type { CandidateStatus, SentimentCandidate } from '@/lib/pipeline/types';
import { ALL_SENTIMENT_TAGS, type SentimentTag } from '@/lib/data/trasparenza';

export const runtime = 'nodejs';

function sessionFrom(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

export async function GET(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  const store = await loadPipelineStore();
  const url = new URL(request.url);
  const status = url.searchParams.get('status') as CandidateStatus | null;
  const candidates = status
    ? store.candidates.filter((c) => c.status === status)
    : store.candidates;

  return NextResponse.json({
    updatedAt: store.updatedAt,
    candidates,
    counts: {
      pending: store.candidates.filter((c) => c.status === 'pending').length,
      approved: store.candidates.filter((c) => c.status === 'approved').length,
      published: store.candidates.filter((c) => c.status === 'published').length,
      rejected: store.candidates.filter((c) => c.status === 'rejected').length,
    },
  });
}

type PatchBody = {
  id?: string;
  status?: CandidateStatus;
  title?: SentimentCandidate['title'];
  summary?: SentimentCandidate['summary'];
  quote?: SentimentCandidate['quote'];
  suggestedSentiment?: SentimentTag;
  personId?: string;
  actorId?: string;
  date?: string;
  reviewNote?: string;
};

export async function PATCH(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!body.id || typeof body.id !== 'string') {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  const allowed: CandidateStatus[] = ['pending', 'approved', 'rejected', 'published'];
  if (!body.status || !allowed.includes(body.status)) {
    return NextResponse.json({ error: 'invalid_status' }, { status: 400 });
  }

  if (
    body.suggestedSentiment &&
    !(ALL_SENTIMENT_TAGS as readonly string[]).includes(body.suggestedSentiment)
  ) {
    return NextResponse.json({ error: 'invalid_sentiment' }, { status: 400 });
  }

  // Publishing requires a quote — editorial bar
  if (body.status === 'published' || body.status === 'approved') {
    const store = await loadPipelineStore();
    const current = store.candidates.find((c) => c.id === body.id);
    const quote = body.quote ?? current?.quote;
    if (!quote?.en?.trim()) {
      return NextResponse.json({ error: 'quote_required' }, { status: 400 });
    }
  }

  const store = await loadPipelineStore();
  if (!store.candidates.some((c) => c.id === body.id)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const next = updateCandidateStatus(store, body.id, body.status, {
    title: body.title,
    summary: body.summary,
    quote: body.quote,
    suggestedSentiment: body.suggestedSentiment,
    personId: body.personId,
    actorId: body.actorId,
    date: body.date,
    reviewNote: body.reviewNote,
  });

  await savePipelineStore(next);
  const updated = next.candidates.find((c) => c.id === body.id);

  return NextResponse.json({ ok: true, candidate: updated });
}
