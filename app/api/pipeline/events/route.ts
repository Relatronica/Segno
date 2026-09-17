import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { findCuratedEvent } from '@/lib/pipeline/edits';
import { loadPipelineStore, patchCuratedEvent, savePipelineStore } from '@/lib/pipeline/store';
import type { TimelineEventEdit } from '@/lib/pipeline/types';
import { ALL_SENTIMENT_TAGS, type SentimentTag } from '@/lib/data/trasparenza';
import { clampIsoToToday } from '@/lib/dates';

export const runtime = 'nodejs';

const PRESENT_PIN_ID = 'e-2026-09-today';

function sessionFrom(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

type LocaleBody = { it?: unknown; en?: unknown };

function asLocale(value: unknown): TimelineEventEdit['title'] | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const { it, en } = value as LocaleBody;
  if (typeof it !== 'string' || typeof en !== 'string') return undefined;
  return { it, en };
}

type PatchBody = {
  id?: string;
  hidden?: boolean;
  date?: string;
  title?: unknown;
  summary?: unknown;
  detail?: unknown;
  quote?: unknown;
  sentiment?: SentimentTag | null | '';
  personId?: string | null;
  actorId?: string | null;
  sourceUrl?: string;
  sourceLabel?: unknown;
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

  if (!body.id || typeof body.id !== 'string' || body.id.startsWith('pipe-')) {
    return NextResponse.json({ error: 'invalid_id' }, { status: 400 });
  }

  if (!findCuratedEvent(body.id)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  if (body.hidden === true && body.id === PRESENT_PIN_ID) {
    return NextResponse.json({ error: 'present_locked' }, { status: 400 });
  }

  if (
    body.sentiment &&
    !(ALL_SENTIMENT_TAGS as readonly string[]).includes(body.sentiment)
  ) {
    return NextResponse.json({ error: 'invalid_sentiment' }, { status: 400 });
  }

  const edit: TimelineEventEdit = {};
  const title = asLocale(body.title);
  const summary = asLocale(body.summary);
  const detail = asLocale(body.detail);
  const quote = body.quote === null ? null : asLocale(body.quote);
  const sourceLabel = asLocale(body.sourceLabel);

  if (typeof body.date === 'string' && body.date) {
    edit.date = clampIsoToToday(body.date);
  }
  if (title) edit.title = title;
  if (summary) edit.summary = summary;
  if (detail) edit.detail = detail;
  if (quote !== undefined) edit.quote = quote;
  if (body.sentiment !== undefined) {
    edit.sentiment = body.sentiment ? body.sentiment : null;
  }
  if (body.personId !== undefined) edit.personId = body.personId || null;
  if (body.actorId !== undefined) edit.actorId = body.actorId || null;
  if (typeof body.sourceUrl === 'string' && body.sourceUrl.trim()) {
    edit.sourceUrl = body.sourceUrl.trim();
  }
  if (sourceLabel) edit.sourceLabel = sourceLabel;

  const store = await loadPipelineStore();
  const next = patchCuratedEvent(store, body.id, {
    hidden: body.hidden,
    edit: Object.keys(edit).length > 0 ? edit : undefined,
  });
  await savePipelineStore(next);

  return NextResponse.json({
    ok: true,
    edits: next.edits,
    hiddenIds: next.hiddenIds,
  });
}
