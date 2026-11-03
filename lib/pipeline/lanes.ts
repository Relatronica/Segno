import type { EventType, Lens } from '@/lib/data/trasparenza';
import { isFirstPartyAiHost } from '@/lib/pipeline/sources';

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
 * The allowlist says who may publish, the rules below say what shape the
 * sentence has. Neither says whether the sentence is about artificial
 * intelligence at all — this is that third question, and it is the one that
 * keeps a chip fab's quarterly results out of a desk about AI.
 *
 * Acronyms are matched case-sensitively: `ai` is also an Italian preposition
 * and the desk reads English feeds, but a stray lowercase match would let
 * whole sentences through on a conjunction.
 */
const TOPIC_ACRONYMS = /\b(?:AI|LLMs?|GPT|AGI|GPUs?|ChatGPT)\b|\bA\.I\./;

const TOPIC_WORDS =
  /\b(artificial intelligence|machine learning|deep learning|neural network|language model|foundation model|generative|chatbot|chat bot|copilot|openai|anthropic|deepmind|nvidia|hugging face|mistral|grok|gemini|claude|llama|midjourney|stable diffusion|sora|veo|inference|training run|fine-?tun\w*|alignment|hallucinat\w*|deepfake|ai agent|autonomous agent|data cent(?:er|re)s?|semiconductor)\b/i;

/**
 * Is this item about AI? A first-party lab host passes without argument: the
 * source is the claim. Everything else has to show one thing it is about.
 */
export function isOnTopic(input: { title: string; snippet?: string; host?: string }): boolean {
  if (input.host && isFirstPartyAiHost(input.host)) return true;
  const blob = body(`${input.title} ${input.snippet ?? ''}`);
  return TOPIC_ACRONYMS.test(blob) || TOPIC_WORDS.test(blob);
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
  const title = body(input.title);
  // The headline is the sentence the editor reads first; the snippet is
  // syndication boilerplate and often mentions other stories. Read the title
  // alone first, so a snippet cannot move an item into another lane.
  for (const rule of LANE_RULES) {
    if (rule.re.test(title)) {
      return { lens: rule.lens, type: rule.type, confident: true };
    }
  }
  const blob = body(`${title} ${input.snippet ?? ''}`);
  for (const rule of LANE_RULES) {
    if (rule.re.test(blob)) {
      return { lens: rule.lens, type: rule.type, confident: true };
    }
  }
  return { lens: input.lens, type: input.type, confident: false };
}
