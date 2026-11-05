import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  isAuthorized,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';
import { getSignal, promoteSignal, setSignalHidden } from '@/lib/db/queue';

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

  if (body.promote) {
    const promoted = await promoteSignal(body.id);
    if (!promoted) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    return NextResponse.json({ ok: true, created: promoted.created });
  }

  if (typeof body.hidden !== 'boolean') {
    const signal = await getSignal(body.id);
    if (!signal) return NextResponse.json({ error: 'not_found' }, { status: 404 });
    return NextResponse.json({ ok: true, signal });
  }

  const signal = await setSignalHidden(body.id, body.hidden);
  if (!signal) return NextResponse.json({ error: 'not_found' }, { status: 404 });
  return NextResponse.json({ ok: true, signal });
}
