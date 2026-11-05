import { theses, thesisReadings, unifiedTheme } from '@/lib/data/trasparenza';
import { seedEvents, type SeedEvent } from '@/lib/db/events';
import { seedTheses, seedThesisReadings } from '@/lib/db/theses';
import { ensureTenant, TIMELINE_SLUG } from '@/lib/db/timeline';

/**
 * Fase B — porta il contenuto dell'IA sul primo tenant Postgres (§5).
 *
 * Idempotente e rilanciabile: workspace, archetipo e timeline sono upsert;
 * gli eventi entrano solo se mancano, quindi una seconda esecuzione non
 * cancella le correzioni fatte in redazione dopo la migrazione.
 *
 * Il file dati è la sorgente del contenuto iniziale: da qui in poi il
 * database è l'unica sede dei pin, e le correzioni vivono nelle sue colonne.
 *
 * Uso:  npm run seed
 */
async function main() {
  const timelineId = await ensureTenant();
  console.log(`tenant pronto · timeline "${TIMELINE_SLUG}" = ${timelineId}`);

  const curated: SeedEvent[] = unifiedTheme.events.map((event) => ({ event }));
  const events = await seedEvents(curated);
  console.log(`events · ${events} righe`);

  const themeTheses = theses.filter((thesis) => thesis.themeId === TIMELINE_SLUG);
  const themeThesisIds = new Set(themeTheses.map((thesis) => thesis.id));
  const readings = thesisReadings.filter((reading) => themeThesisIds.has(reading.thesisId));

  await seedTheses(themeTheses);
  // Le letture seguono gli eventi: la foreign key punta a `events`.
  await seedThesisReadings(readings);
  console.log(`theses · ${themeTheses.length} · readings · ${readings.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
