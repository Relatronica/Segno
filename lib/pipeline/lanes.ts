import type { EventType, Lens } from '@/lib/data/trasparenza';

/**
 * A discovered headline is not an event yet: it is a sentence. These rules read
 * the sentence and decide which lane it belongs to and what kind of event it
 * describes. The first match wins, so the order below is the priority order.
 */
type LaneRule = { lens: Lens; type: EventType; re: RegExp };

const LANE_RULES: LaneRule[] = [
  // Money moved: the strongest signal, it rarely means anything else.
  {
    lens: 'business',
    type: 'spending',
    re: /\b(raises?|raised|raising|funding round|series [a-e]\b|valuation|valued at|invest(?:s|ment|ments|ed|ing)?|acquisition|acquir(?:es|ed)|data ?cent(?:er|re)s?|capex|market share|price hike|writedown)\b/i,
  },
  // Rules applied: a fine, a ban, a case.
  {
    lens: 'policy',
    type: 'sanction',
    re: /\b(fines?|fined|penalt(?:y|ies)|sanction(?:s|ed)?|bans?|banned|antitrust|investigat(?:es|ion|ing)|probe|lawsuit|sues?|sued|court|ruling)\b/i,
  },
  // Rules written: laws and frameworks.
  {
    lens: 'policy',
    type: 'legislative',
    re: /\b(ai act|regulat(?:e|es|ed|ion|ions|ory)|bill|law|laws|legislation|directive|executive order|framework|compliance deadline|treaty|parliament|congress)\b/i,
  },
  // Systems shipped.
  {
    lens: 'models',
    type: 'milestone',
    re: /\b(releas(?:e|es|ed|ing)|launch(?:es|ed|ing)?|unveil(?:s|ed)?|introduc(?:es|ed)|ships?|ships|rolls out|new model|open weights|open-source model|general availability)\b/i,
  },
  // Knowledge produced.
  {
    lens: 'research',
    type: 'milestone',
    re: /\b(preprint|paper|benchmark|state[- ]of[- ]the[- ]art|sota|study|findings?|breakthrough|dataset|arxiv|peer[- ]review)\b/i,
  },
];

export type LaneClassification = {
  lens: Lens;
  type: EventType;
  /** A rule matched: the headline is recognisably about that kind of event. */
  confident: boolean;
};

function body(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Read a headline and return the lane it belongs to. Fallback is the lane the
 * feed was born in, with `confident: false` — those items may still enter the
 * editorial queue, but never the automatic diary.
 */
export function classifyLane(input: {
  lens: Lens;
  type: EventType;
  title: string;
  snippet?: string;
}): LaneClassification {
  const blob = body(`${input.title} ${input.snippet ?? ''}`);
  for (const rule of LANE_RULES) {
    if (rule.re.test(blob)) {
      return { lens: rule.lens, type: rule.type, confident: true };
    }
  }
  return { lens: input.lens, type: input.type, confident: false };
}
