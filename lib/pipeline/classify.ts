import { ALL_SENTIMENT_TAGS, type SentimentTag } from '@/lib/data/trasparenza';

/** A signal votes on the curve only at or above this confidence. */
export const VOTE_THRESHOLD = 0.5;

export type ToneGuess = {
  tag?: SentimentTag;
  confidence: number;
};

const LEXICON: Record<SentimentTag, Array<{ re: RegExp; w: number }>> = {
  alarm: [
    { re: /\b(extinction|existential|catastrophic|civilizational|doomsday|apocalyp)/i, w: 3 },
    { re: /\b(doom|dangerous|threat|panic|pause giant|loss of control)/i, w: 2 },
    { re: /\b(warns|warned|warning|scary|frighten|fear of)/i, w: 1 },
  ],
  deregulation: [
    { re: /\b(over-?regulat\w*|too much regulation|stifle innovation|leave the eu|slow down europe)/i, w: 3 },
    { re: /\b(deregulat\w*|red tape|bureaucracy|innovation.?kill)/i, w: 2 },
    { re: /\b(against regulation|anti-?regulat\w*|less regulation)/i, w: 2 },
  ],
  open_source: [
    { re: /\b(open[- ]source|open weights|open model|release the (weights|model))/i, w: 3 },
    { re: /\b(llama|mistral|open weights)/i, w: 2 },
  ],
  caution: [
    { re: /\b(guardrails|before release|need(s|ed)? regulation|safety institute)/i, w: 3 },
    { re: /\b(cautious|responsible|audit|safety|careful|restraint)/i, w: 1 },
  ],
  optimism: [
    { re: /\b(breakthrough|steam engine|incredible|extraordinary|once in a generation)/i, w: 3 },
    { re: /\b(opportunity|exciting|accelerate|transform|boom|revolution|hopeful|bullish)/i, w: 2 },
    { re: /\b(optimistic|progress|benefit|upside)/i, w: 1 },
  ],
};

export function lexiconClassify(text: string): ToneGuess {
  const scores = ALL_SENTIMENT_TAGS.map((tag) => {
    let score = 0;
    for (const entry of LEXICON[tag]) {
      if (entry.re.test(text)) score += entry.w;
    }
    return { tag, score };
  }).sort((a, b) => b.score - a.score);

  const best = scores[0];
  const second = scores[1];
  if (!best || best.score <= 0) return { confidence: 0 };

  const margin = best.score - (second?.score ?? 0);
  if (margin <= 0) return { confidence: 0.15 };

  let confidence = 0.55;
  if (best.score >= 3) confidence = 0.85;
  else if (best.score >= 2) confidence = 0.7;
  return { tag: best.tag, confidence };
}

function parseTag(value: unknown): SentimentTag | undefined {
  if (typeof value !== 'string') return undefined;
  const tag = value.trim().toLowerCase();
  if (tag === 'null' || tag === 'none' || tag === '') return undefined;
  return (ALL_SENTIMENT_TAGS as readonly string[]).includes(tag)
    ? (tag as SentimentTag)
    : undefined;
}

const SYSTEM_PROMPT =
  'You classify the tone of a news headline or snippet about an AI leader. ' +
  'Reply with JSON only: {"tag":"alarm"|"caution"|"optimism"|"deregulation"|"open_source"|null,"confidence":0..1}. ' +
  'tag is the tone of the coverage. null if the text is not about that person\'s stance on AI. ' +
  'Do not write a quote.';

function parseGuess(raw: string): ToneGuess | null {
  const trimmed = raw.trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  const parsed = JSON.parse(trimmed.slice(start, end + 1)) as {
    tag?: unknown;
    confidence?: unknown;
  };
  const confidence =
    typeof parsed.confidence === 'number'
      ? Math.min(1, Math.max(0, parsed.confidence))
      : 0;
  const tag = parseTag(parsed.tag);
  if (!tag) return { confidence };
  return { tag, confidence };
}

async function groqChat(key: string, model: string, text: string, jsonMode: boolean): Promise<Response> {
  const body: Record<string, unknown> = {
    model,
    temperature: 0,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: text.slice(0, 1200) },
    ],
  };
  if (jsonMode) body.response_format = { type: 'json_object' };
  return fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
  });
}

/** Groq free tier. No card. Default model is on the free plan as of 2026. */
async function llmClassify(text: string, key: string): Promise<ToneGuess | null> {
  const model = process.env.SENTIMENT_MODEL?.trim() || 'openai/gpt-oss-20b';
  try {
    let res = await groqChat(key, model, text, true);
    if (res.status === 400) res = await groqChat(key, model, text, false);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = data.choices?.[0]?.message?.content;
    if (!raw) return null;
    return parseGuess(raw);
  } catch {
    return null;
  }
}

async function mapPool<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index]);
    }
  });
  await Promise.all(runners);
}

/**
 * Lexicon first. When GROQ_API_KEY is set, headlines the lexicon is unsure
 * about go to Groq's free tier. Failures stay on the lexicon guess.
 */
export async function classifyMany(texts: string[]): Promise<ToneGuess[]> {
  const out = texts.map((text) => lexiconClassify(text));
  const key = process.env.GROQ_API_KEY?.trim();
  if (!key || texts.length === 0) return out;

  const unsure = out
    .map((guess, index) => ({ guess, index }))
    .filter(({ guess }) => guess.confidence < 0.72)
    .slice(0, 24);

  await mapPool(unsure, 4, async ({ index }) => {
    const llm = await llmClassify(texts[index], key);
    if (llm && llm.confidence >= out[index].confidence) out[index] = llm;
  });

  return out;
}
