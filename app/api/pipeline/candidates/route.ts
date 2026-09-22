import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { listCuratedPins } from '@/lib/pipeline/edits';
import {
  deleteCandidates,
  loadPipelineStore,
  savePipelineStore,
  updateCandidateStatus,
  updateManyCandidateStatus,
} from '@/lib/pipeline/store';
import type { CandidateStatus, SentimentCandidate } from '@/lib/pipeline/types';
import { ALL_SENTIMENT_TAGS, type SentimentTag } from '@/lib/data/trasparenza';
import { clampIsoToToday } from '@/lib/dates';

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
    curated: listCuratedPins(store),
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
  ids?: string[];
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

const MAX_BULK = 200;

function asIdList(ids: unknown): string[] | null {
  if (!Array.isArray(ids) || ids.length === 0 || ids.length > MAX_BULK) return null;
  const cleaned = ids.filter((id): id is string => typeof id === 'string' && id.length > 0);
  return cleaned.length ? [...new Set(cleaned)] : null;
}

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

  const bulkIds = asIdList(body.ids);
  if (bulkIds) {
    const bulkStatus = body.status;
    if (bulkStatus !== 'rejected' && bulkStatus !== 'pending') {
      return NextResponse.json({ error: 'invalid_status' }, { status: 400 });
    }
    const store = await loadPipelineStore();
    const known = bulkIds.filter((id) => store.candidates.some((c) => c.id === id));
    if (known.length === 0) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }
    const next = updateManyCandidateStatus(store, known, bulkStatus);
    await savePipelineStore(next);
    return NextResponse.json({ ok: true, updated: known.length });
  }

  if (!body.id || typeof body.id !== 'string') {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  const store = await loadPipelineStore();
  const current = store.candidates.find((c) => c.id === body.id);
  if (!current) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const allowed: CandidateStatus[] = ['pending', 'approved', 'rejected', 'published'];
  if (body.status && !allowed.includes(body.status)) {
    return NextResponse.json({ error: 'invalid_status' }, { status: 400 });
  }
  const nextStatus = body.status ?? current.status;

  if (
    body.suggestedSentiment &&
    !(ALL_SENTIMENT_TAGS as readonly string[]).includes(body.suggestedSentiment)
  ) {
    return NextResponse.json({ error: 'invalid_sentiment' }, { status: 400 });
  }

  // Publishing requires a quote — editorial bar
  if (nextStatus === 'published' || nextStatus === 'approved') {
    const quote = body.quote ?? current.quote;
    if (!quote?.en?.trim()) {
      return NextResponse.json({ error: 'quote_required' }, { status: 400 });
    }
  }

  const next = updateCandidateStatus(store, body.id, nextStatus, {
    title: body.title,
    summary: body.summary,
    quote: body.quote,
    suggestedSentiment: body.suggestedSentiment,
    personId: body.personId,
    actorId: body.actorId,
    date: body.date ? clampIsoToToday(body.date) : body.date,
    reviewNote: body.reviewNote,
  });

  await savePipelineStore(next);
  const updated = next.candidates.find((c) => c.id === body.id);

  return NextResponse.json({ ok: true, candidate: updated });
}

export async function DELETE(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  let body: { ids?: unknown };
  try {
    body = (await request.json()) as { ids?: unknown };
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const ids = asIdList(body.ids);
  if (!ids) {
    return NextResponse.json({ error: 'invalid_ids' }, { status: 400 });
  }

  const store = await loadPipelineStore();
  const known = ids.filter((id) => store.candidates.some((c) => c.id === id));
  if (known.length === 0) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const next = deleteCandidates(store, known);
  await savePipelineStore(next);
  return NextResponse.json({ ok: true, deleted: known.length });
}
