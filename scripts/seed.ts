import { theses, thesisReadings, unifiedTheme } from '@/lib/data/trasparenza';
import { cyberEvents } from '@/lib/data/cyber-history';
import { aiSpec } from '@/specs/ai';
import { cybersecuritySpec } from '@/specs/cybersecurity';
import { seedEvents, type SeedEvent } from '@/lib/db/events';
import { seedSpec } from '@/lib/db/spec';
import { seedThesisReadings } from '@/lib/db/theses';
import { CYBERSECURITY_SLUG, ensureTenant, ensureTimeline, TIMELINE_SLUG } from '@/lib/db/timeline';

/**
 * Fase B — porta il contenuto dell'IA sul primo tenant Postgres (§5).
 * Fase C — porta anche lo spec: assi, bande, attori, persone e tesi. E con lo
 * spec nel database si semina una seconda timeline, la cybersicurezza, perché
 * il criterio di uscita è che una timeline nuova non richieda codice nuovo.
 *
 * Idempotente e rilanciabile: workspace, archetipo e timeline sono upsert;
 * assi, attori, persone e tesi sono upsert sulla loro chiave (l'identità resta,
 * la presentazione si aggiorna); eventi e letture entrano solo se mancano,
 * quindi una seconda esecuzione non cancella le correzioni fatte in redazione
 * dopo la migrazione.
 *
 * I file in `specs/` e in `lib/data/` sono la sorgente: da qui in poi il
 * database è l'unica sede di spec e pin, e le correzioni vivono nelle sue
 * colonne.
 *
 * Uso:  npm run seed
 */
async function main() {
  const timelineId = await ensureTenant();
  console.log(`tenant pronto · timeline "${TIMELINE_SLUG}" = ${timelineId}`);

  const spec = await seedSpec(timelineId, aiSpec);
  console.log(`spec · ${spec.axes} assi · ${spec.bands} bande`);

  const curated: SeedEvent[] = unifiedTheme.events.map((event) => ({ event }));
  const events = await seedEvents(curated);
  console.log(`events · ${events} righe`);

  const themeTheses = theses.filter((thesis) => thesis.themeId === TIMELINE_SLUG);
  const themeThesisIds = new Set(themeTheses.map((thesis) => thesis.id));
  const readings = thesisReadings.filter((reading) => themeThesisIds.has(reading.thesisId));

  // Le letture seguono eventi e tesi: la foreign key punta a entrambi.
  await seedThesisReadings(readings);
  console.log(`readings · ${readings.length}`);

  // La seconda timeline: stesso motore, corsie sue. Se il registro non la
  // contiene ancora, è `ensureTimeline` a crearla.
  const cyberId = await ensureTimeline(CYBERSECURITY_SLUG, cybersecuritySpec.track.name);
  console.log(`tenant pronto · timeline "${CYBERSECURITY_SLUG}" = ${cyberId}`);

  const cyberSpecResult = await seedSpec(cyberId, cybersecuritySpec);
  console.log(`cyber spec · ${cyberSpecResult.axes} assi · ${cyberSpecResult.bands} bande`);

  const cyberPins: SeedEvent[] = cyberEvents.map((event) => ({ event }));
  const cyberPinsWritten = await seedEvents(cyberPins, CYBERSECURITY_SLUG);
  console.log(`cyber events · ${cyberPinsWritten} righe`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
