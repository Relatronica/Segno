import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { listCuratedPins, listManualEvents } from '@/lib/db/events';
import {
  deleteCandidates,
  getCandidate,
  listCandidates,
  listSignals,
  updateCandidateStatus,
  updateCandidatesStatus,
} from '@/lib/db/queue';
import type { CandidateStatus, SentimentCandidate } from '@/lib/pipeline/types';
import {
  ALL_LENSES,
  ALL_SENTIMENT_TAGS,
  type EventType,
  type Lens,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { ALL_EVENT_TYPES } from '@/lib/trasparenza/constants';
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

  const url = new URL(request.url);
  const status = url.searchParams.get('status') as CandidateStatus | null;

  const [all, signals, curated, manual] = await Promise.all([
    listCandidates(),
    listSignals(),
    listCuratedPins(),
    listManualEvents(),
  ]);
  const candidates = status ? all.filter((c) => c.status === status) : all;

  return NextResponse.json({
    candidates,
    signals,
    curated,
    manual,
    counts: {
      pending: all.filter((c) => c.status === 'pending').length,
      approved: all.filter((c) => c.status === 'approved').length,
      published: all.filter((c) => c.status === 'published').length,
      rejected: all.filter((c) => c.status === 'rejected').length,
      signals: signals.length,
      manual: manual.length,
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
  lens?: Lens;
  type?: EventType;
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
    const updated = await updateCandidatesStatus(bulkIds, bulkStatus);
    if (updated === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    return NextResponse.json({ ok: true, updated });
  }

  if (!body.id || typeof body.id !== 'string') {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  const current = await getCandidate(body.id);
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
  if (body.lens && !(ALL_LENSES as string[]).includes(body.lens)) {
    return NextResponse.json({ error: 'invalid_lens' }, { status: 400 });
  }
  if (body.type && !(ALL_EVENT_TYPES as string[]).includes(body.type)) {
    return NextResponse.json({ error: 'invalid_type' }, { status: 400 });
  }

  // Editorial bar: a pin that carries a tone must show the quote it reads that
  // tone from. A release, a round of funding or a law carries no tone, so it
  // may go live on its source alone.
  const nextSentiment = body.suggestedSentiment ?? current.suggestedSentiment;
  if (nextStatus === 'published' || nextStatus === 'approved') {
    // A pin with no lane has nowhere to land on the timeline: the discovery run
    // refused to guess, so an editor has to choose before it leaves the desk.
    if (!(body.lens ?? current.lens)) {
      return NextResponse.json({ error: 'lane_required' }, { status: 400 });
    }
    const quote = body.quote ?? current.quote;
    if (nextSentiment && !quote?.en?.trim()) {
      return NextResponse.json({ error: 'quote_required' }, { status: 400 });
    }
  }

  const updated = await updateCandidateStatus(body.id, nextStatus, {
    title: body.title,
    summary: body.summary,
    quote: body.quote,
    suggestedSentiment: body.suggestedSentiment,
    personId: body.personId,
    actorId: body.actorId,
    date: body.date ? clampIsoToToday(body.date) : body.date,
    lens: body.lens,
    type: body.type,
    reviewNote: body.reviewNote,
  });

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

  const deleted = await deleteCandidates(ids);
  if (deleted === 0) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({ ok: true, deleted });
}
