import { NextResponse } from 'next/server';

const TO_EMAIL = 'relatronica@gmail.com';
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
};

function isNonEmptyString(value: unknown, max: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Bots fill hidden fields — pretend success
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  if (!isNonEmptyString(body.name, MAX_NAME)) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 });
  }
  if (!isNonEmptyString(body.email, MAX_EMAIL) || !isValidEmail(body.email.trim())) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (!isNonEmptyString(body.message, MAX_MESSAGE)) {
    return NextResponse.json({ error: 'invalid_message' }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const message = body.message.trim();

  const upstream = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Segno — messaggio da ${name}`,
      _replyto: email,
      _template: 'table',
    }),
  });

  if (!upstream.ok) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
