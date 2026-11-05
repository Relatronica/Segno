-- Segno — schema multi-timeline (Fase B: Postgres come primo tenant).
--
-- Tre piani, tutti per-timeline (ARCHITETTURA-MULTI-TIMELINE §4.3):
--   Registro   → workspaces · workspace_members · timelines · timeline_templates
--   Struttura  → timeline_axes · timeline_bands · actors · people · spec_versions
--   Contenuto  → events · theses · thesis_readings · candidates · signals
--   Ingestion  → ingest_sources · ingest_rules  (config del maintainer)
--
-- Deviazioni dal tracciato di §4.3, entrambe deliberate:
--   1. `events.id` è `text`, non `uuid`: gli id degli eventi sono già URL
--      pubblici (`/timeline/evento/<id>`) e la migrazione deve conservarli.
--   2. `candidates` e `signals` non compaiono in §4.3: ospitano la coda di
--      moderazione e il diario automatico, che in Fase B migrano anch'essi.
--
-- Accesso: il contenuto non è mai letto dal browser. Le tabelle hanno RLS
-- attivo senza policy, quindi la sola chiave `anon` non vede nulla; le route
-- server usano la `service_role`, che scavalca RLS. Le policy arrivano con la
-- Fase D (workspace, ruoli, isolamento).

-- ---------------------------------------------------------------- Registro

create table if not exists workspaces (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  plan       text not null default 'author',
  created_at timestamptz not null default now()
);

create table if not exists workspace_members (
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id      uuid not null,
  role         text not null check (role in ('owner', 'architect', 'editor', 'viewer')),
  primary key (workspace_id, user_id)
);

-- Archetipo: la struttura condivisa ("Sei Lenti") che ogni timeline istanzia (P4).
create table if not exists timeline_templates (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  name       jsonb not null,
  definition jsonb not null default '{}'::jsonb
);

create table if not exists timelines (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references workspaces(id) on delete cascade,
  slug          text not null,
  name          jsonb not null,
  visibility    text not null default 'public' check (visibility in ('public', 'private')),
  template_id   uuid references timeline_templates(id) on delete set null,
  spec_revision int not null default 1,
  created_at    timestamptz not null default now(),
  unique (workspace_id, slug)
);

-- ---------------------------------------------------------------- Struttura

-- Ontologia come righe: `stable_key` identifica (immutabile, P3), il resto
-- è presentazione (etichetta, colore, ordine) e resta editabile.
create table if not exists timeline_axes (
  id         uuid primary key default gen_random_uuid(),
  timeline_id uuid not null references timelines(id) on delete cascade,
  kind       text not null check (kind in ('lens', 'event_type', 'stance', 'sentiment_tag', 'modality')),
  stable_key text not null,
  label      jsonb not null,
  color      text,
  sort_order int not null default 0,
  unique (timeline_id, kind, stable_key)
);

create table if not exists timeline_bands (
  id          uuid primary key default gen_random_uuid(),
  timeline_id uuid not null references timelines(id) on delete cascade,
  kind        text not null check (kind in ('volume', 'axis', 'series')),
  config      jsonb not null default '{}'::jsonb,
  sort_order  int not null default 0
);

create table if not exists actors (
  timeline_id uuid not null references timelines(id) on delete cascade,
  id          text not null,
  name        text not null,
  short_name  text,
  color       text,
  primary key (timeline_id, id)
);

create table if not exists people (
  timeline_id uuid not null references timelines(id) on delete cascade,
  id          text not null,
  name        text not null,
  short_name  text,
  org_id      text,
  role        jsonb,
  avatar      text,
  primary key (timeline_id, id)
);

-- Versioning strutturale: ogni modifica allo spec produce una riga (audit + rollback).
create table if not exists spec_versions (
  id          uuid primary key default gen_random_uuid(),
  timeline_id uuid not null references timelines(id) on delete cascade,
  revision    int not null,
  snapshot    jsonb not null,
  changed_by  uuid,
  created_at  timestamptz not null default now(),
  unique (timeline_id, revision)
);

-- `stable_key` è identità, non presentazione: una volta scritta non cambia (P3).
-- L'immutabilità è un privilegio di colonna, non un trigger: niente UPDATE sul
-- solo identificatore. Un cambio di identità resta una migrazione esplicita.
revoke update (stable_key) on timeline_axes from anon, authenticated;

-- ---------------------------------------------------------------- Contenuto

create table if not exists events (
  timeline_id     uuid not null references timelines(id) on delete cascade,
  id              text not null,
  date            date not null,
  axis_lens       text,
  axis_type       text not null,
  actor_id        text,
  person_id       text,
  title           jsonb not null,
  summary         jsonb not null,
  detail          jsonb,
  quote           jsonb,
  sentiment_tag   text,
  amount_eur      numeric,
  source_label    jsonb not null,
  source_url      text not null,
  origin          text not null default 'editorial' check (origin in ('editorial', 'auto')),
  hidden          boolean not null default false,
  image_url       text,
  -- Sotto-ontologia della corsia capacità e delle modalità di rilascio.
  capability_scores jsonb,
  capability_domain text,
  benchmark_label   text,
  benchmark_metric  jsonb,
  modalities        jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  primary key (timeline_id, id),
  -- Invarianti di metodo codificate nello schema (P5).
  constraint events_source_url_present check (length(btrim(source_url)) > 0),
  constraint events_tone_needs_quote check (sentiment_tag is null or quote is not null)
);

create index if not exists events_timeline_date_idx on events (timeline_id, date);
create index if not exists events_timeline_origin_idx on events (timeline_id, origin);

create table if not exists theses (
  timeline_id uuid not null references timelines(id) on delete cascade,
  id          text not null,
  slug        text not null,
  label       jsonb not null,
  claim       jsonb not null,
  definition  jsonb,
  status      text not null default 'open' check (status in ('open', 'settled')),
  since       date,
  primary key (timeline_id, id),
  unique (timeline_id, slug)
);

create table if not exists thesis_readings (
  timeline_id uuid not null references timelines(id) on delete cascade,
  thesis_id   text not null,
  event_id    text not null,
  stance      text not null check (stance in ('support', 'oppose', 'conditional', 'ambiguous', 'undetermined')),
  note        jsonb,
  primary key (timeline_id, thesis_id, event_id),
  foreign key (timeline_id, thesis_id) references theses (timeline_id, id) on delete cascade,
  foreign key (timeline_id, event_id) references events (timeline_id, id) on delete cascade
);

-- Coda di moderazione: non è contenuto pubblicato finché non passa a `published`.
create table if not exists candidates (
  timeline_id         uuid not null references timelines(id) on delete cascade,
  id                  text not null,
  discovered_at       timestamptz not null default now(),
  status              text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'published')),
  date                date,
  source_url          text not null,
  source_label        jsonb not null,
  title               jsonb not null,
  summary             jsonb not null,
  quote               jsonb,
  person_id           text,
  actor_id            text,
  lens                text,
  type                text,
  suggested_sentiment text,
  raw_title           text not null,
  raw_snippet         text,
  feed_source         text,
  source_tier         text,
  source_host         text,
  x_quoted            boolean,
  x_status_url        text,
  image_url           text,
  reviewed_at         timestamptz,
  review_note         text,
  primary key (timeline_id, id)
);

create index if not exists candidates_timeline_status_idx on candidates (timeline_id, status);

-- Diario automatico: righe-titolare, senza tono (nessuna citazione verificata).
create table if not exists signals (
  timeline_id    uuid not null references timelines(id) on delete cascade,
  id             text not null,
  discovered_at  timestamptz not null default now(),
  date           date not null,
  source_url     text not null,
  source_label   jsonb not null,
  title          jsonb not null,
  summary        jsonb not null,
  person_id      text,
  actor_id       text,
  lens           text,
  type           text,
  raw_title      text not null,
  raw_snippet    text,
  feed_source    text,
  source_tier    text,
  source_host    text,
  image_url      text,
  hidden         boolean not null default false,
  modalities     jsonb,
  primary key (timeline_id, id)
);

create index if not exists signals_timeline_date_idx on signals (timeline_id, date);

-- ---------------------------------------------------------------- Ingestion

create table if not exists ingest_sources (
  id          uuid primary key default gen_random_uuid(),
  timeline_id uuid not null references timelines(id) on delete cascade,
  kind        text not null,
  url         text not null,
  label       jsonb not null,
  tier        text
);

create table if not exists ingest_rules (
  id          uuid primary key default gen_random_uuid(),
  timeline_id uuid not null references timelines(id) on delete cascade,
  kind        text not null,
  matcher     jsonb not null default '{}'::jsonb,
  target_lens text,
  target_type text
);

-- ---------------------------------------------------------------- RLS

alter table workspaces          enable row level security;
alter table workspace_members   enable row level security;
alter table timeline_templates  enable row level security;
alter table timelines           enable row level security;
alter table timeline_axes       enable row level security;
alter table timeline_bands      enable row level security;
alter table actors              enable row level security;
alter table people              enable row level security;
alter table spec_versions       enable row level security;
alter table events              enable row level security;
alter table theses              enable row level security;
alter table thesis_readings     enable row level security;
alter table candidates          enable row level security;
alter table signals             enable row level security;
alter table ingest_sources      enable row level security;
alter table ingest_rules        enable row level security;
