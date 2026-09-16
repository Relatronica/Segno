export const CONTACT_REASONS = [
  'report',
  'source',
  'contribute',
  'collab',
  'question',
  'other',
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number];

export function isContactReason(value: unknown): value is ContactReason {
  return typeof value === 'string' && (CONTACT_REASONS as readonly string[]).includes(value);
}

/** Stable Italian labels for email subject/body (inbox triage). */
export const CONTACT_REASON_LABEL_IT: Record<ContactReason, string> = {
  report: 'Segnalazione errore',
  source: 'Fonte o correzione',
  contribute: 'Contributo / collaborazione dati',
  collab: 'Redazione o collettivo',
  question: 'Domanda sul progetto',
  other: 'Altro',
};
