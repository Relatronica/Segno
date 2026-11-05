import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import {
  deleteEvent,
  getStoredEvent,
  insertEvent,
  updateEvent,
  type EventPatch,
} from '@/lib/db/events';
import { loadRedactionSpec } from '@/lib/db/spec';
import { TIMELINE_SLUG } from '@/lib/db/timeline';
import { createdEventIdFromUrl, MANUAL_ID_PREFIX } from '@/lib/pipeline/ids';
import type {
  EventType,
  LocaleText,
  SentimentTag,
  TimelineEvent,
} from '@/lib/data/trasparenza';
import { clampIsoToToday, localIsoDate } from '@/lib/dates';

export const runtime = 'nodejs';

const PRESENT_PIN_ID = 'e-2026-09-today';

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
  allowed: string[],
): { ok: true; sentiment?: SentimentTag } | { ok: false } {
  if (value === null || value === '' || value === undefined) return { ok: true };
  if (!allowed.includes(value)) return { ok: false };
  // The tone of a headline is not a stance: no quote, no sentiment.
  if (!quote || (!quote.it.trim() && !quote.en.trim())) return { ok: false };
  return { ok: true, sentiment: value };
}

function timelineSlug(value: unknown): string {
  return typeof value === 'string' && value.trim() ? value.trim() : TIMELINE_SLUG;
}

type PatchBody = {
  id?: string;
  timeline?: string;
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

  const slug = timelineSlug(body.timeline);
  const spec = await loadRedactionSpec(slug);
  if (!spec) return NextResponse.json({ error: 'unknown_timeline' }, { status: 400 });

  if (!isValidSource(body.sourceUrl)) {
    return NextResponse.json({ error: 'invalid_source' }, { status: 400 });
  }

  const title = readLocale(body.title);
  const summary = readLocale(body.summary);
  if (!title) return NextResponse.json({ error: 'title_required' }, { status: 400 });
  if (!summary) return NextResponse.json({ error: 'summary_required' }, { status: 400 });

  const quote = readLocale(body.quote);
  const sentiment = sentimentOrError(body.sentiment, quote, spec.sentimentTags);
  if (!sentiment.ok) {
    return NextResponse.json({ error: 'sentiment_needs_quote' }, { status: 400 });
  }

  // La corsia e la forma sono quelle che questa timeline dichiara: le chiavi
  // arrivano dallo spec, non da un'unione nel bundle.
  const type = spec.eventTypes.includes(body.type ?? '')
    ? (body.type as EventType)
    : ((spec.eventTypes[0] as EventType | undefined) ?? 'milestone');
  const lens = spec.lenses.some((entry) => entry.key === (body.lens ?? ''))
    ? (body.lens as string)
    : (spec.lenses[0]?.key ?? '');

  const sourceUrl = body.sourceUrl.trim();
  // A hand-written pin is keyed on its source, so the url can only ever make one.
  const id = createdEventIdFromUrl(sourceUrl);
  if (await getStoredEvent(id, slug)) {
    return NextResponse.json({ error: 'duplicate_source' }, { status: 409 });
  }

  const event: TimelineEvent = {
    id,
    date: body.date ? clampIsoToToday(body.date) : localIsoDate(),
    type,
    lens,
    origin: 'editorial',
    title,
    summary,
    sourceLabel: readLocale(body.sourceLabel) ?? { it: hostLabel(sourceUrl), en: hostLabel(sourceUrl) },
    sourceUrl,
  };

  const detail = readLocale(body.detail);
  if (detail) event.detail = detail;
  if (quote) event.quote = quote;
  if (sentiment.sentiment) event.sentiment = sentiment.sentiment;
  const amountEur = readAmount(body.amountEur);
  if (amountEur !== undefined) event.amountEur = amountEur;
  const personId = body.personId?.trim();
  if (personId) event.personId = personId;
  const actorId = body.actorId?.trim();
  if (actorId) event.actorId = actorId;

  await insertEvent(event, slug);
  return NextResponse.json({ ok: true, event });
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

  const slug = timelineSlug(body.timeline);
  const spec = await loadRedactionSpec(slug);
  if (!spec) return NextResponse.json({ error: 'unknown_timeline' }, { status: 400 });

  if (body.id.startsWith(MANUAL_ID_PREFIX)) return patchManual(body, slug, spec.sentimentTags);
  return patchCurated(body, slug, spec.sentimentTags);
}

async function patchManual(body: PatchBody, slug: string, sentimentTags: string[]) {
  const id = body.id as string;
  if (body.sentiment && !sentimentTags.includes(body.sentiment)) {
    return NextResponse.json({ error: 'invalid_sentiment' }, { status: 400 });
  }
  if (body.sourceUrl !== undefined && !isValidSource(body.sourceUrl)) {
    return NextResponse.json({ error: 'invalid_source' }, { status: 400 });
  }

  const current = await getStoredEvent(id, slug);
  if (!current) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const quote = body.quote === undefined ? current.event.quote : readLocale(body.quote);
  if (body.sentiment !== undefined) {
    const sentiment = sentimentOrError(body.sentiment, quote, sentimentTags);
    if (!sentiment.ok) {
      return NextResponse.json({ error: 'sentiment_needs_quote' }, { status: 400 });
    }
  }

  const patch: EventPatch = {};
  if (body.date) patch.date = clampIsoToToday(body.date);
  if (body.type) patch.type = body.type as EventType;
  if (body.lens) patch.lens = body.lens;
  const title = readLocale(body.title);
  if (title) patch.title = title;
  const summary = readLocale(body.summary);
  if (summary) patch.summary = summary;
  if (body.detail !== undefined) patch.detail = readLocale(body.detail) ?? null;
  if (body.quote !== undefined) patch.quote = quote ?? null;
  if (body.sentiment !== undefined) {
    patch.sentiment = body.sentiment ? (body.sentiment as SentimentTag) : null;
  }
  if (body.amountEur !== undefined) patch.amountEur = readAmount(body.amountEur) ?? null;
  const sourceLabel = readLocale(body.sourceLabel);
  if (sourceLabel) patch.sourceLabel = sourceLabel;
  if (body.sourceUrl) patch.sourceUrl = body.sourceUrl.trim();
  if (body.personId !== undefined) patch.personId = body.personId?.trim() || null;
  if (body.actorId !== undefined) patch.actorId = body.actorId?.trim() || null;

  const next = await updateEvent(id, patch, slug);
  if (!next) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({ ok: true });
}

async function patchCurated(body: PatchBody, slug: string, sentimentTags: string[]) {
  const id = body.id as string;
  if (!(await getStoredEvent(id, slug))) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  if (body.hidden === true && id === PRESENT_PIN_ID) {
    return NextResponse.json({ error: 'present_locked' }, { status: 400 });
  }

  if (body.sentiment && !sentimentTags.includes(body.sentiment)) {
    return NextResponse.json({ error: 'invalid_sentiment' }, { status: 400 });
  }

  const patch: EventPatch = {};
  const title = asLocale(body.title);
  const summary = asLocale(body.summary);
  const detail = asLocale(body.detail);
  const sourceLabel = asLocale(body.sourceLabel);

  if (typeof body.date === 'string' && body.date) patch.date = clampIsoToToday(body.date);
  if (title) patch.title = title;
  if (summary) patch.summary = summary;
  if (detail) patch.detail = detail;
  if (body.quote === null) patch.quote = null;
  else {
    const quote = asLocale(body.quote);
    if (quote) patch.quote = quote;
  }
  if (body.sentiment !== undefined) patch.sentiment = body.sentiment ? body.sentiment : null;
  if (body.personId !== undefined) patch.personId = body.personId || null;
  if (body.actorId !== undefined) patch.actorId = body.actorId || null;
  if (body.hidden !== undefined) patch.hidden = body.hidden;
  if (typeof body.sourceUrl === 'string' && body.sourceUrl.trim()) {
    patch.sourceUrl = body.sourceUrl.trim();
  }
  if (sourceLabel) patch.sourceLabel = sourceLabel;

  const next = await updateEvent(id, patch, slug);
  if (!next) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({ ok: true });
}

/** DELETE: remove a hand-written pin. Curated pins are hidden, never deleted. */
export async function DELETE(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;
  if (!isAuthorized(request, sessionFrom(request))) return unauthorized();

  let body: { id?: unknown; timeline?: unknown };
  try {
    body = (await request.json()) as { id?: unknown; timeline?: unknown };
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if (typeof body.id !== 'string' || !body.id.startsWith(MANUAL_ID_PREFIX)) {
    return NextResponse.json({ error: 'not_deletable' }, { status: 400 });
  }

  const removed = await deleteEvent(body.id, timelineSlug(body.timeline));
  if (!removed) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({ ok: true, deleted: 1 });
}
