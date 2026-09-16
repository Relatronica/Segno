'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Send, CheckCircle2 } from 'lucide-react';
import { useT } from '@/lib/i18n/useT';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm({ className }: { className?: string }) {
  const t = useT();
  const [status, setStatus] = useState<Status>('idle');
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    setErrorKey(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorKey(payload?.error ?? 'send_failed');
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('success');
    } catch {
      setErrorKey('send_failed');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn(
          'border border-border/60 bg-mark-muted/40 px-5 py-8 text-center sm:px-8',
          className
        )}
        role="status"
      >
        <CheckCircle2 className="mx-auto h-7 w-7 text-mark" aria-hidden />
        <p className="mt-4 text-sm font-medium text-foreground">{t.contact.success}</p>
        <button
          type="button"
          className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline"
          onClick={() => setStatus('idle')}
        >
          {t.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn('space-y-5', className)} noValidate>
      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">{t.contact.name}</Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            disabled={status === 'sending'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{t.contact.email}</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">{t.contact.message}</Label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          rows={5}
          disabled={status === 'sending'}
          className={cn(
            'border-input dark:bg-input/30 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none md:text-sm',
            'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-destructive" role="alert">
          {errorKey === 'invalid_email'
            ? t.contact.errorEmail
            : errorKey === 'invalid_name' || errorKey === 'invalid_message'
              ? t.contact.errorFields
              : t.contact.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === 'sending'} className="rounded-md">
          {status === 'sending' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === 'sending' ? t.contact.sending : t.contact.submit}
        </Button>
        <a
          href="mailto:relatronica@gmail.com"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          relatronica@gmail.com
        </a>
      </div>
    </form>
  );
}
