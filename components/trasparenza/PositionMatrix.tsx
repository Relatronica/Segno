'use client';

import {
  ALL_POSITION_STANCES,
  formatEventDate,
  type LocaleText,
  type PositionStance,
  type Thesis,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { cn } from '@/lib/utils';
import { STANCE_META } from './meta';
import { PersonAvatar } from './PersonAvatar';

export type ThesisSubject = {
  key: string;
  kind: 'person' | 'actor';
  id: string;
  name: string;
  shortName: string;
  avatar?: string;
  accent?: string;
};

export type ThesisReadingRow = {
  event: TimelineEvent;
  stance: PositionStance;
  note?: LocaleText;
};

/** One line per subject: the readings recorded on the thesis, oldest first. */
export type ThesisRow = {
  subject: ThesisSubject;
  readings: ThesisReadingRow[];
};

type Props = {
  thesis: Thesis;
  rows: ThesisRow[];
  /** Tracked subjects with no reading on this thesis — silence is data too. */
  silent: ThesisSubject[];
  locale: 'it' | 'en';
  labels: {
    theses: string;
    open: string;
    settled: string;
    readings: string;
    noReadings: string;
    silent: string;
    hint: string;
    stance: (stance: PositionStance) => string;
  };
  onSelect: (id: string) => void;
  className?: string;
};

function countByStance(readings: ThesisReadingRow[]): Record<PositionStance, number> {
  const counts = Object.fromEntries(
    ALL_POSITION_STANCES.map((stance) => [stance, 0]),
  ) as Record<PositionStance, number>;
  for (const reading of readings) counts[reading.stance] += 1;
  return counts;
}

export function PositionMatrix({
  thesis,
  rows,
  silent,
  locale,
  labels,
  onSelect,
  className,
}: Props) {
  const readingCount = rows.reduce((total, row) => total + row.readings.length, 0);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border/50 bg-background/90 shadow-sm backdrop-blur-md',
        className,
      )}
    >
      <header className="flex items-start gap-2 border-b border-border/50 px-3 py-2">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {labels.theses}
            {' · '}
            {thesis.status === 'open' ? labels.open : labels.settled}
          </p>
          <p className="mt-0.5 text-[13px] font-semibold leading-snug text-foreground">
            {thesis.claim[locale]}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
          {labels.readings.replace('{count}', String(readingCount))}
        </span>
      </header>

      <div className="max-h-[32vh] overflow-y-auto px-3 py-2">
        {rows.length === 0 ? (
          <p className="py-1 text-[11px] text-muted-foreground">{labels.noReadings}</p>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {rows.map((row) => {
              const counts = countByStance(row.readings);
              const latest = row.readings[row.readings.length - 1];
              const total = row.readings.length;
              return (
                <li key={row.subject.key}>
                  <button
                    type="button"
                    onClick={() => onSelect(latest.event.id)}
                    title={labels.hint}
                    className="grid w-full grid-cols-[8.5rem_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1 rounded-md px-1 py-0.5 text-left transition-colors hover:bg-muted/50"
                  >
                    <span className="flex min-w-0 items-center gap-1.5">
                      {row.subject.kind === 'person' ? (
                        <PersonAvatar
                          person={{
                            name: row.subject.name,
                            shortName: row.subject.shortName,
                            avatar: row.subject.avatar,
                          }}
                          size="sm"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                          style={{ backgroundColor: row.subject.accent ?? '#64748b' }}
                        />
                      )}
                      <span className="truncate text-[12px] font-medium leading-tight">
                        {row.subject.shortName}
                      </span>
                    </span>

                    <span className="flex min-w-0 items-center gap-2">
                      <span
                        aria-hidden
                        className="flex h-1.5 min-w-8 flex-1 overflow-hidden rounded-full bg-muted"
                      >
                        {ALL_POSITION_STANCES.map((stance) =>
                          counts[stance] === 0 ? null : (
                            <span
                              key={stance}
                              className="h-full"
                              style={{
                                width: `${(counts[stance] / total) * 100}%`,
                                backgroundColor: STANCE_META[stance].dot,
                              }}
                            />
                          ),
                        )}
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        {ALL_POSITION_STANCES.filter((stance) => counts[stance] > 0).map(
                          (stance) => (
                            <span
                              key={stance}
                              className="font-mono text-[10px]"
                              style={{ color: STANCE_META[stance].dot }}
                              title={labels.stance(stance)}
                            >
                              {counts[stance]}
                            </span>
                          ),
                        )}
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {formatEventDate(latest.event.date, locale)}
                        </span>
                      </span>
                    </span>

                    <p className="col-start-2 line-clamp-2 text-[10px] leading-snug text-muted-foreground">
                      {latest.note?.[locale] ?? latest.event.title[locale]}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {silent.length > 0 && (
          <div className="mt-2.5 border-t border-border/40 pt-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              {labels.silent}
            </p>
            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
              {silent.map((subject) => (
                <span
                  key={subject.key}
                  className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/80"
                >
                  {subject.kind === 'actor' && (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-[1px]"
                      style={{ backgroundColor: subject.accent ?? '#94a3b8' }}
                    />
                  )}
                  {subject.shortName}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-border/50 px-3 py-1.5">
        {ALL_POSITION_STANCES.map((stance) => (
          <span
            key={stance}
            className="inline-flex items-center gap-1 text-[9px] text-muted-foreground"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: STANCE_META[stance].dot }}
            />
            {labels.stance(stance)}
          </span>
        ))}
      </footer>
    </div>
  );
}
