import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

export function getPipelineSecret(): string | null {
  const secret = process.env.PIPELINE_SECRET?.trim();
  return secret || null;
}

export function unauthorized(message = 'unauthorized') {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function assertPipelineConfigured() {
  if (!getPipelineSecret()) {
    return NextResponse.json({ error: 'pipeline_not_configured' }, { status: 503 });
  }
  return null;
}

function signToken(secret: string, exp: number): string {
  const payload = `exp.${exp}`;
  const sig = createHmac('sha256', secret).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function createSessionToken(ttlHours = 12): string | null {
  const secret = getPipelineSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + ttlHours * 3600;
  return signToken(secret, exp);
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const secret = getPipelineSecret();
  if (!secret || !token) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'exp') return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return false;
  const expected = signToken(secret, exp);
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function isAuthorized(request: Request, sessionCookie?: string | null): boolean {
  const secret = getPipelineSecret();
  if (!secret) return false;

  const header = request.headers.get('authorization');
  if (header?.startsWith('Bearer ')) {
    const token = header.slice(7).trim();
    if (token === secret) return true;
  }

  const cron = request.headers.get('x-pipeline-secret');
  if (cron && cron === secret) return true;

  return verifySessionToken(sessionCookie);
}

export const SESSION_COOKIE = 'segno_pipeline_session';
