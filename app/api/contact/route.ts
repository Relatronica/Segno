import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_REASON_LABEL_IT, isContactReason } from '@/lib/contact';

const TO_EMAIL = 'relatronica@gmail.com';
const FROM_EMAIL = 'Segno <onboarding@resend.dev>';
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  reason?: unknown;
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

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
  if (!isContactReason(body.reason)) {
    return NextResponse.json({ error: 'invalid_reason' }, { status: 400 });
  }
  if (!isNonEmptyString(body.message, MAX_MESSAGE)) {
    return NextResponse.json({ error: 'invalid_message' }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const reason = body.reason;
  const reasonLabel = CONTACT_REASON_LABEL_IT[reason];
  const message = body.message.trim();

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `Segno — ${reasonLabel} · ${name}`,
    text: [
      `Nuovo messaggio dal form Contatti su Segno`,
      ``,
      `Motivo: ${reasonLabel}`,
      `Nome: ${name}`,
      `Email: ${email}`,
      ``,
      message,
    ].join('\n'),
  });

  if (error) {
    console.error('[contact]', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
