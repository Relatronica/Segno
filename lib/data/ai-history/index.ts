import type { TimelineEvent } from "../trasparenza";
import { modelEvents } from "./models";
import { capabilitiesEvents } from "./capabilities";
import { researchEvents } from "./research";
import { businessEvents } from "./business";
import { cultureEvents } from "./culture";
import { policyEvents } from "./policy";

/**
 * The AI history track: what was built (models), measured capabilities,
 * what was shown (research), the money (business), the discourse (culture) and the rules (policy).
 * It feeds the single transparency timeline; `unifiedTheme` merges it with the
 * curated pins and sorts the whole set on one date axis.
 */
export const aiHistoryEvents: TimelineEvent[] = [
  ...modelEvents,
  ...capabilitiesEvents,
  ...researchEvents,
  ...businessEvents,
  ...cultureEvents,
  ...policyEvents,
];

