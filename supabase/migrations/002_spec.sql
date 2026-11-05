-- Segno — Fase C: lo spec esce dal codice ed entra nel database.
--
-- Due lacune dello schema 001, emerse nel momento in cui lo spec viene
-- normalizzato in righe (ARCHITETTURA-MULTI-TIMELINE §4.3, Fase C):
--
--   1. `timeline_axes.blurb` — ogni corsia porta una riga di descrizione che
--      il motore rende sotto il nome. Viveva solo in `specs/ai.ts`; senza la
--      colonna, normalizzare l'ontologia la perderebbe.
--   2. `timelines.spec_config` — la regola di ripiego tipo→corsia
--      (`lensFallback`) non è tabulare: non è un asse, non è una banda. È
--      configurazione dello spec, e come tale ha bisogno di una sede.
--
-- Additiva: nessuna colonna rimossa, nessun dato toccato. Applicabile e
-- reversibile senza fermare l'app.

alter table timeline_axes add column if not exists blurb jsonb;

alter table timelines
  add column if not exists spec_config jsonb not null default '{}'::jsonb;
