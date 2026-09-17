import { lobbyPeople, type SentimentTag } from '@/lib/data/trasparenza';

export type PersonMatch = {
  personId: string;
  actorId?: string;
  score: number;
};

const KEYWORDS: Record<string, string[]> = {
  altman: ['sam altman', 'altman', 'openai ceo'],
  amodei: ['dario amodei', 'amodei', 'anthropic ceo'],
  musk: ['elon musk', 'musk', 'xai'],
  huang: ['jensen huang', 'jensen', 'nvidia ceo'],
  hassabis: ['demis hassabis', 'hassabis', 'deepmind'],
  zuckerberg: ['mark zuckerberg', 'zuckerberg', 'meta ceo'],
  nadella: ['satya nadella', 'nadella', 'microsoft ceo'],
  pichai: ['sundar pichai', 'pichai', 'google ceo', 'alphabet ceo'],
};

export function matchPerson(text: string): PersonMatch | null {
  const hay = text.toLowerCase();
  let best: PersonMatch | null = null;

  for (const [personId, words] of Object.entries(KEYWORDS)) {
    for (const w of words) {
      if (!hay.includes(w)) continue;
      const score = w.length;
      if (!best || score > best.score) {
        const person = lobbyPeople.find((p) => p.id === personId);
        best = { personId, actorId: person?.orgId, score };
      }
    }
  }

  return best;
}

/** Lightweight editorial hint — not a score. Reviewer must confirm. */
export function hintSentiment(text: string): SentimentTag | undefined {
  const t = text.toLowerCase();

  if (
    /\b(extinction|existential|catastrophic|pause giant|civilizational risk|doom)\b/.test(t)
  ) {
    return 'alarm';
  }
  if (
    /\b(over-regulat|overregulat|too much regulation|leave the eu|stifle innovation|slow down europe)\b/.test(
      t,
    )
  ) {
    return 'deregulation';
  }
  if (/\b(open.?source|open weights|llama|release the model|open model)\b/.test(t)) {
    return 'open_source';
  }
  if (
    /\b(guardrail|safety|cautious|audit|before release|need regulation|responsible)\b/.test(t)
  ) {
    return 'caution';
  }
  if (
    /\b(opportunity|breakthrough|steam engine|exciting|accelerate|incredible|transform)\b/.test(t)
  ) {
    return 'optimism';
  }

  return undefined;
}
