import { NextResponse } from 'next/server';
import {
  assertPipelineConfigured,
  createSessionToken,
  getPipelineSecret,
  SESSION_COOKIE,
  unauthorized,
} from '@/lib/pipeline/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const missing = assertPipelineConfigured();
  if (missing) return missing;

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const secret = getPipelineSecret();
  if (!secret || body.password !== secret) {
    return unauthorized('invalid_password');
  }

  const token = createSessionToken(12);
  if (!token) return unauthorized();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return res;
}
