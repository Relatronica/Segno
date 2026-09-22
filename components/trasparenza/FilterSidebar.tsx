'use client';

import { Filter, RotateCcw, X } from 'lucide-react';
import { EVENT_META, SENTIMENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';
import type {
  EventType,
  LobbyActor,
  LobbyPerson,
  SentimentTag,
  TimelineTheme,
} from '@/lib/data/trasparenza';

type Labels = {
  themeLabel: string;
  filterBy: string;
  allActors: string;
  allPeople: string;
  actorsLabel: string;
  peopleLabel: string;
  typesLabel: string;
  yearsLabel: string;
  sentimentLabel: string;
  resetFilters: string;
  eventsCount: string;
  close: string;
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
  selectedActor: string | 'all';
  selectedPerson: string | 'all';
  selectedTypes: EventType[];
  selectedYears: string[];
  selectedSentiments: SentimentTag[];
  allSentimentTags: SentimentTag[];
  eventCount: number;
  disclaimer: string;
  labels: Labels;
  onActorChange: (id: string | 'all') => void;
  onPersonChange: (id: string | 'all') => void;
  onToggleType: (type: EventType) => void;
  onToggleYear: (year: string) => void;
  onToggleSentiment: (tag: SentimentTag) => void;
  onReset: () => void;
  onClose?: () => void;
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
  selectedActor,
  selectedPerson,
  selectedTypes,
  selectedYears,
  selectedSentiments,
  allSentimentTags,
  eventCount,
  disclaimer,
  labels,
  onActorChange,
  onPersonChange,
  onToggleType,
  onToggleYear,
  onToggleSentiment,
  onReset,
  onClose,
  className = '',
}: Props) {
  return (
    <aside className={`flex h-full flex-col ${className}`}>
      <div className="flex items-center justify-between gap-1.5 border-b border-border/50 px-3 py-2.5">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          <Filter className="h-3 w-3" />
          {labels.filterBy}
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            {labels.resetFilters}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label={labels.close}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-3 py-3">
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
