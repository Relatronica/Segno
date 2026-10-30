import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { findCuratedEvent } from '@/lib/pipeline/edits';
import {
  createEvent,
  deleteCreatedEvent,
  loadPipelineStore,
  patchCreatedEvent,
  patchCuratedEvent,
  savePipelineStore,
} from '@/lib/pipeline/store';
import type { CreatedEvent, TimelineEventEdit } from '@/lib/pipeline/types';
import {
  ALL_LENSES,
  ALL_SENTIMENT_TAGS,
  type EventType,
  type Lens,
  type LocaleText,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { ALL_EVENT_TYPES } from '@/lib/trasparenza/constants';
import { clampIsoToToday, localIsoDate } from '@/lib/dates';

export const runtime = 'nodejs';

const PRESENT_PIN_ID = 'e-2026-09-today';

/** Hand-written pins carry this id prefix; curated ones never do. */
const MANUAL_PREFIX = 'man-';

type ManualInput = Omit<CreatedEvent, 'id' | 'createdAt' | 'updatedAt'>;

function sessionFrom(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

type LocaleBody = { it?: unknown; en?: unknown };

/** Curated edit: both locales required, so we never half-translate a pin. */
function asLocale(value: unknown): LocaleText | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const { it, en } = value as LocaleBody;
  if (typeof it !== 'string' || typeof en !== 'string') return undefined;
  return { it, en };
}

/** Manual pin: the Italian text is the draft, English mirrors it until rewritten. */
function readLocale(value: unknown): LocaleText | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const { it, en } = value as LocaleBody;
  const itText = typeof it === 'string' ? it.trim() : '';
  const enText = typeof en === 'string' ? en.trim() : '';
  if (!itText && !enText) return undefined;
  return { it: itText || enText, en: enText || itText };
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function readAmount(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  const n = typeof value === 'string' ? Number(value) : value;
  if (typeof n !== 'number' || !Number.isFinite(n) || n <= 0) return undefined;
  return Math.round(n);
}

function isValidSource(url: unknown): url is string {
  return typeof url === 'string' && /^https?:\/\/\S+$/i.test(url.trim());
}

function sentimentOrError(
  value: SentimentTag | null | '' | undefined,
  quote: LocaleText | undefined,
): { ok: true; sentiment?: SentimentTag } | { ok: false } {
  if (value === null || value === '' || value === undefined) return { ok: true };
  if (!(ALL_SENTIMENT_TAGS as readonly string[]).includes(value)) return { ok: false };
  // The tone of a headline is not a stance: no quote, no sentiment.
  if (!quote || (!quote.it.trim() && !quote.en.trim())) return { ok: false };
  return { ok: true, sentiment: value };
}

type PatchBody = {
  id?: string;
  hidden?: boolean;
  date?: string;
  type?: string;
  lens?: string;
  title?: unknown;
  summary?: unknown;
  detail?: unknown;
  quote?: unknown;
  sentiment?: SentimentTag | null | '';
  personId?: string | null;
  actorId?: string | null;
  amountEur?: number | string | null;
  sourceUrl?: string;
  sourceLabel?: unknown;
};

type CreateBody = Omit<PatchBody, 'id' | 'hidden'>;

/** POST: write a new pin by hand. Born editorial, no moderation step. */
export async function POST(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  let body: CreateBody;
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (!isValidSource(body.sourceUrl)) {
    return NextResponse.json({ error: 'invalid_source' }, { status: 400 });
  }

  const title = readLocale(body.title);
  const summary = readLocale(body.summary);
  if (!title) return NextResponse.json({ error: 'title_required' }, { status: 400 });
  if (!summary) return NextResponse.json({ error: 'summary_required' }, { status: 400 });

  const quote = readLocale(body.quote);
  const sentiment = sentimentOrError(body.sentiment, quote);
  if (!sentiment.ok) {
    return NextResponse.json({ error: 'sentiment_needs_quote' }, { status: 400 });
  }

  const type = (ALL_EVENT_TYPES as string[]).includes(body.type ?? '')
    ? (body.type as EventType)
    : 'milestone';
  const lens = (ALL_LENSES as string[]).includes(body.lens ?? '')
    ? (body.lens as Lens)
    : 'policy';

  const sourceUrl = body.sourceUrl.trim();
  const input: ManualInput = {
    date: body.date ? clampIsoToToday(body.date) : localIsoDate(),
    type,
    lens,
    title,
    summary,
    detail: readLocale(body.detail),
    quote,
    sentiment: sentiment.sentiment,
    amountEur: readAmount(body.amountEur),
    sourceLabel: readLocale(body.sourceLabel) ?? { it: hostLabel(sourceUrl), en: hostLabel(sourceUrl) },
    sourceUrl,
    personId: body.personId?.trim() || undefined,
    actorId: body.actorId?.trim() || undefined,
  };

  const store = await loadPipelineStore();
  const created = createEvent(store, input);
  if (!created) return NextResponse.json({ error: 'duplicate_source' }, { status: 409 });

  await savePipelineStore(created.store);
  return NextResponse.json({ ok: true, event: created.event });
}

/** PATCH: curated correction, or edit of a hand-written pin. */
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

  if (body.id.startsWith(MANUAL_PREFIX)) return patchManual(body);
  return patchCurated(body);
}

async function patchManual(body: PatchBody) {
  const id = body.id as string;
  if (
    body.sentiment &&
    !(ALL_SENTIMENT_TAGS as readonly string[]).includes(body.sentiment)
  ) {
    return NextResponse.json({ error: 'invalid_sentiment' }, { status: 400 });
  }
  if (body.type && !(ALL_EVENT_TYPES as string[]).includes(body.type)) {
    return NextResponse.json({ error: 'invalid_type' }, { status: 400 });
  }
  if (body.lens && !(ALL_LENSES as string[]).includes(body.lens)) {
    return NextResponse.json({ error: 'invalid_lens' }, { status: 400 });
  }
  if (body.sourceUrl !== undefined && !isValidSource(body.sourceUrl)) {
    return NextResponse.json({ error: 'invalid_source' }, { status: 400 });
  }

  const store = await loadPipelineStore();
  const current = (store.createdEvents ?? []).find((e) => e.id === id);
  if (!current) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const quote = body.quote === undefined ? current.quote : readLocale(body.quote);
  if (body.sentiment !== undefined) {
    const sentiment = sentimentOrError(body.sentiment, quote);
    if (!sentiment.ok) {
      return NextResponse.json({ error: 'sentiment_needs_quote' }, { status: 400 });
    }
  }

  const patch: Partial<Omit<CreatedEvent, 'id' | 'createdAt'>> = {};
  if (body.date) patch.date = clampIsoToToday(body.date);
  if (body.type) patch.type = body.type as EventType;
  if (body.lens) patch.lens = body.lens as Lens;
  const title = readLocale(body.title);
  if (title) patch.title = title;
  const summary = readLocale(body.summary);
  if (summary) patch.summary = summary;
  if (body.detail !== undefined) patch.detail = readLocale(body.detail);
  if (body.quote !== undefined) patch.quote = quote;
  if (body.sentiment !== undefined) {
    patch.sentiment = body.sentiment ? (body.sentiment as SentimentTag) : undefined;
  }
  if (body.amountEur !== undefined) patch.amountEur = readAmount(body.amountEur);
  const sourceLabel = readLocale(body.sourceLabel);
  if (sourceLabel) patch.sourceLabel = sourceLabel;
  if (body.sourceUrl) patch.sourceUrl = body.sourceUrl.trim();
  if (body.personId !== undefined) patch.personId = body.personId?.trim() || undefined;
  if (body.actorId !== undefined) patch.actorId = body.actorId?.trim() || undefined;

  const next = patchCreatedEvent(store, id, patch);
  if (!next) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  await savePipelineStore(next);

  return NextResponse.json({ ok: true, event: next.createdEvents?.find((e) => e.id === id) });
}

async function patchCurated(body: PatchBody) {
  const id = body.id as string;
  if (!findCuratedEvent(id)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  if (body.hidden === true && id === PRESENT_PIN_ID) {
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
  const next = patchCuratedEvent(store, id, {
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

/** DELETE: remove a hand-written pin. Curated pins are hidden, never deleted. */
export async function DELETE(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  let body: { id?: unknown };
  try {
    body = (await request.json()) as { id?: unknown };
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (typeof body.id !== 'string' || !body.id.startsWith(MANUAL_PREFIX)) {
    return NextResponse.json({ error: 'not_deletable' }, { status: 400 });
  }

  const store = await loadPipelineStore();
  const next = deleteCreatedEvent(store, body.id);
  if (!next) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  await savePipelineStore(next);
  return NextResponse.json({ ok: true, deleted: 1 });
}
