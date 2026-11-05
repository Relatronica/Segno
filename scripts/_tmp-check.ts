import { unifiedTheme, lensOf, ALL_LENSES } from '../lib/data/trasparenza';
import { aiSpec } from '../specs/ai';
import { cyberEvents } from '../lib/data/cyber-history';
import { cybersecuritySpec } from '../specs/cybersecurity';
import { lensOf as lensOfSpec } from '../lib/trasparenza/spec';

function report(name: string, events: any[], spec: any) {
  const byLens: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byYear: Record<string, number> = {};
  const bySentiment: Record<string, number> = {};
  for (const e of events) {
    const l = lensOfSpec(e, spec);
    byLens[l] = (byLens[l] ?? 0) + 1;
    byType[e.type] = (byType[e.type] ?? 0) + 1;
    byYear[e.date.slice(0, 4)] = (byYear[e.date.slice(0, 4)] ?? 0) + 1;
    if (e.sentiment) bySentiment[e.sentiment] = (bySentiment[e.sentiment] ?? 0) + 1;
  }
  console.log(`\n=== ${name} ===`);
  console.log('spec lenses:', spec.lenses.map((a: any) => a.key));
  console.log('spec sentimentTags:', spec.sentimentTags.map((a: any) => a.key));
  console.log('track.filterTypes:', spec.track.filterTypes);
  console.log('events:', events.length);
  console.log('by lens:', byLens);
  console.log('by type:', byType);
  console.log('by year:', byYear);
  console.log('by sentiment:', bySentiment);
}

report('AI flagship (bundled seed)', unifiedTheme.events, aiSpec);
report('Cybersecurity', cyberEvents, cybersecuritySpec);

// what the homepage shows (bundled lensOf)
const homeCounts: Record<string, number> = {};
for (const l of ALL_LENSES) {
  homeCounts[l] = unifiedTheme.events.filter((e: any) => lensOf(e) === l).length;
}
console.log('\nhomepage lensIndex counts (bundled):', homeCounts);
