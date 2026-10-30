'use client';

import { RotateCcw } from 'lucide-react';
import { EVENT_META, SENTIMENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';
import {
  ALL_LENSES,
  LENS_META,
  type EventType,
  type Lens,
  type LobbyActor,
  type LobbyPerson,
  type SentimentTag,
  type Thesis,
  type TimelineTheme,
} from '@/lib/data/trasparenza';

type Labels = {
  themeLabel: string;
  lensesLabel: string;
  allActors: string;
  allPeople: string;
  actorsLabel: string;
  peopleLabel: string;
  typesLabel: string;
  yearsLabel: string;
  sentimentLabel: string;
  thesesLabel: string;
  allTheses: string;
  readingKey: string;
  thesisOpen: string;
  thesisSettled: string;
  thesisSince: string;
  resetFilters: string;
  eventsCount: string;
  typeLabel: (type: EventType) => string;
  sentimentTagLabel: (tag: SentimentTag) => string;
};

type Props = {
  themes: TimelineTheme[];
  selectedThemeId: string;
  onThemeChange: (id: string) => void;
  locale: 'it' | 'en';
  actors: LobbyActor[];
  people: LobbyPerson[];
  years: string[];
  filterTypes: EventType[];
  showSentiment: boolean;
  /** Claims under test, with their reading key */
  theses: Thesis[];
  selectedActor: string | 'all';
  selectedPerson: string | 'all';
  selectedTypes: EventType[];
  selectedYears: string[];
  selectedSentiments: SentimentTag[];
  allSentimentTags: SentimentTag[];
  /** Domain lenses kept on the axis. */
  selectedLenses: Lens[];
  selectedThesis: string | 'all';
  eventCount: number;
  disclaimer: string;
  labels: Labels;
  onActorChange: (id: string | 'all') => void;
  onPersonChange: (id: string | 'all') => void;
  onToggleType: (type: EventType) => void;
  onToggleYear: (year: string) => void;
  onToggleSentiment: (tag: SentimentTag) => void;
  onToggleLens: (lens: Lens) => void;
  onThesisChange: (slug: string | 'all') => void;
  onReset: () => void;
  className?: string;
};

export function FilterSidebar({
  themes,
  selectedThemeId,
  onThemeChange,
  locale,
  actors,
  people,
  years,
  filterTypes,
  showSentiment,
  theses,
  selectedActor,
  selectedPerson,
  selectedTypes,
  selectedYears,
  selectedSentiments,
  allSentimentTags,
  selectedLenses,
  selectedThesis,
  eventCount,
  disclaimer,
  labels,
  onActorChange,
  onPersonChange,
  onToggleType,
  onToggleYear,
  onToggleSentiment,
  onToggleLens,
  onThesisChange,
  onReset,
  className = '',
}: Props) {
  const activeThesis = theses.find((thesis) => thesis.slug === selectedThesis);

  return (
    <aside className={`flex h-full flex-col ${className}`}>
      {/* The shared right panel owns title and close; filters keep their reset. */}
      <div className="flex items-center justify-end border-b border-border/50 px-3 py-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3" />
          {labels.resetFilters}
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
        {themes.length > 1 && (
        <FilterSection title={labels.themeLabel}>
          <div className="flex flex-col gap-1">
            {themes.map((theme) => {
              const active = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onThemeChange(theme.id)}
                  className={`rounded-lg border px-2.5 py-2 text-left transition-colors ${
                    active
                      ? 'border-foreground/20 bg-foreground text-background'
                      : 'border-border/50 bg-muted/30 text-foreground hover:bg-muted/60'
                  }`}
                >
                  <span className="block text-[12px] font-semibold leading-tight">
                    {theme.name[locale]}
                  </span>
                  <span
                    className={`mt-0.5 block text-[10px] leading-snug ${
                      active ? 'text-background/75' : 'text-muted-foreground'
                    }`}
                  >
                    {theme.period[locale]}
                  </span>
                </button>
              );
            })}
          </div>
        </FilterSection>
        )}

        {theses.length > 0 && (
          <FilterSection title={labels.thesesLabel}>
            <div className="flex flex-wrap gap-1">
              <Chip
                active={selectedThesis === 'all'}
                onClick={() => onThesisChange('all')}
                label={labels.allTheses}
              />
              {theses.map((thesis) => (
                <Chip
                  key={thesis.id}
                  active={selectedThesis === thesis.slug}
                  onClick={() => onThesisChange(thesis.slug)}
                  label={thesis.label[locale]}
                />
              ))}
            </div>
            {activeThesis && (
              <div className="mt-2 rounded-lg border border-border/50 bg-muted/30 px-2.5 py-2">
                <p className="text-[12px] font-semibold leading-snug text-foreground">
                  {activeThesis.claim[locale]}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {activeThesis.status === 'open' ? labels.thesisOpen : labels.thesisSettled}
                  {' · '}
                  {labels.thesisSince.replace(
                    '{date}',
                    activeThesis.since.split('-').reverse().join('/'),
                  )}
                </p>
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {labels.readingKey}
                </p>
                <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                  {activeThesis.definition[locale]}
                </p>
              </div>
            )}
          </FilterSection>
        )}

        <FilterSection title={labels.lensesLabel}>
          <div className="flex flex-wrap gap-1">
            {ALL_LENSES.map((lens) => {
              const meta = LENS_META[lens];
              const active = selectedLenses.includes(lens);
              return (
                <button
                  key={lens}
                  type="button"
                  onClick={() => onToggleLens(lens)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                    active
                      ? 'bg-foreground text-background'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: meta.color, opacity: active ? 1 : 0.5 }}
                  />
                  {meta.label[locale]}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title={labels.actorsLabel}>
          <div className="flex flex-wrap gap-1">
            <Chip
              active={selectedActor === 'all'}
              onClick={() => onActorChange('all')}
              label={labels.allActors}
            />
            {actors.map((actor) => (
              <Chip
                key={actor.id}
                active={selectedActor === actor.id}
                onClick={() => onActorChange(actor.id)}
                label={actor.shortName}
                dot={actor.color}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title={labels.peopleLabel}>
          <div className="flex flex-wrap gap-1">
            <Chip
              active={selectedPerson === 'all'}
              onClick={() => onPersonChange('all')}
              label={labels.allPeople}
            />
            {people.map((person) => (
              <Chip
                key={person.id}
                active={selectedPerson === person.id}
                onClick={() => onPersonChange(person.id)}
                label={person.shortName}
                avatar={<PersonAvatar person={person} size="sm" />}
              />
            ))}
          </div>
        </FilterSection>

        {showSentiment && (
          <FilterSection title={labels.sentimentLabel}>
            <div className="flex flex-wrap gap-1">
              {allSentimentTags.map((tag) => {
                const meta = SENTIMENT_META[tag];
                const active = selectedSentiments.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleSentiment(tag)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      active
                        ? `${meta.bg} ${meta.color}`
                        : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: meta.dot, opacity: active ? 1 : 0.5 }}
                    />
                    {labels.sentimentTagLabel(tag)}
                  </button>
                );
              })}
            </div>
          </FilterSection>
        )}

        {filterTypes.length > 1 && (
          <FilterSection title={labels.typesLabel}>
            <div className="flex flex-wrap gap-1">
              {filterTypes.map((type) => {
                const meta = EVENT_META[type];
                const Icon = meta.icon;
                const active = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onToggleType(type)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
                      active
                        ? `${meta.bg} ${meta.color}`
                        : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
                    {labels.typeLabel(type)}
                  </button>
                );
              })}
            </div>
          </FilterSection>
        )}

        <FilterSection title={labels.yearsLabel}>
          <div className="flex flex-wrap gap-1">
            {years.map((year) => {
              const active = selectedYears.includes(year);
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => onToggleYear(year)}
                  className={`rounded-md px-2 py-1 font-mono text-[11px] transition-colors ${
                    active
                      ? 'bg-foreground text-background'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <p className="border-l-2 border-mark/35 pl-2.5 text-[10px] leading-relaxed text-muted-foreground">
          {disclaimer}
        </p>
      </div>

      <div className="border-t border-border/50 px-3 py-2">
        <p className="font-mono text-[11px] text-muted-foreground">
          {labels.eventsCount.replace('{count}', String(eventCount))}
        </p>
      </div>
    </aside>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  dot,
  avatar,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  dot?: string;
  avatar?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
        active
          ? 'bg-foreground text-background'
          : 'bg-muted/50 text-muted-foreground hover:text-foreground'
      }`}
    >
      {avatar}
      {dot && !avatar && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: dot, opacity: active ? 1 : 0.7 }}
        />
      )}
      {label}
    </button>
  );
}
