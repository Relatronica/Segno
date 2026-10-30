import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { loadPipelineStore, patchSignal, promoteSignal, savePipelineStore } from '@/lib/pipeline/store';

export const runtime = 'nodejs';

function sessionFrom(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

type PatchBody = {
  id?: string;
  hidden?: boolean;
  promote?: boolean;
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

  const store = await loadPipelineStore();

  if (body.promote) {
    const promoted = promoteSignal(store, body.id);
    if (!promoted) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    await savePipelineStore(promoted.store);
    return NextResponse.json({ ok: true, created: promoted.created });
  }

  const patch: { hidden?: boolean } = {};
  if (typeof body.hidden === 'boolean') patch.hidden = body.hidden;

  const next = patchSignal(store, body.id, patch);
  if (!next) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  await savePipelineStore(next);
  const signal = next.signals?.find((item) => item.id === body.id);
  return NextResponse.json({ ok: true, signal });
}
