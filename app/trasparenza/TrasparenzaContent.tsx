'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import type { TimelineEvent } from '@/lib/data/trasparenza';
import {
  timelineThemes,
  sentimentTheme,
  ALL_SENTIMENT_TAGS,
  type EventType,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { localIsoDate } from '@/lib/dates';
import { FilterSidebar } from '@/components/trasparenza/FilterSidebar';
import { HorizontalTimeline } from '@/components/trasparenza/HorizontalTimeline';
import { EventDetailPanel } from '@/components/trasparenza/EventDetailPanel';

/** Navbar height (h-16) */
const NAV_H = '4rem';

/** Closing "today" pin on the AI Act track — date follows the calendar. */
const PRESENT_PIN_ID = 'e-2026-09-today';

export default function TrasparenzaContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';

  const [themeId, setThemeId] = useState(sentimentTheme.id);
  const [pipelineEvents, setPipelineEvents] = useState<TimelineEvent[]>([]);
  const [presentFocusToken, setPresentFocusToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/pipeline/published')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { events?: TimelineEvent[] } | null) => {
        if (cancelled || !data?.events) return;
        setPipelineEvents(data.events);
      })
      .catch(() => {
        /* pipeline optional offline */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const track = useMemo(() => {
    const today = localIsoDate();
    const base = timelineThemes.find((th) => th.id === themeId) ?? timelineThemes[0];
    const withPresent = {
      ...base,
      events: base.events.map((e) =>
        e.id === PRESENT_PIN_ID ? { ...e, date: today } : e,
      ),
    };
    if (withPresent.id !== sentimentTheme.id || pipelineEvents.length === 0) {
      return withPresent;
    }
    const byId = new Map(withPresent.events.map((e) => [e.id, e]));
    for (const e of pipelineEvents) {
      byId.set(e.id, { ...e, date: e.date > today ? today : e.date });
    }
    return { ...withPresent, events: [...byId.values()] };
  }, [themeId, pipelineEvents]);

  const allYears = useMemo(() => {
    return [...new Set(track.events.map((e) => e.date.slice(0, 4)))].sort();
  }, [track.events]);

  const [selectedActor, setSelectedActor] = useState<string | 'all'>('all');
  const [selectedPerson, setSelectedPerson] = useState<string | 'all'>('all');
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([...track.filterTypes]);
  const [selectedYears, setSelectedYears] = useState<string[]>(allYears);
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentTag[]>([
    ...ALL_SENTIMENT_TAGS,
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const todayLabel = useMemo(() => {
    try {
      return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date());
    } catch {
      return new Date().toISOString().slice(0, 10);
    }
  }, [locale]);

  useEffect(() => {
    setSelectedYears((prev) => {
      const merged = [...new Set([...prev, ...allYears])].sort();
      if (merged.length === prev.length && merged.every((y, i) => y === prev[i])) return prev;
      return merged;
    });
  }, [allYears]);

  const switchTheme = (id: string) => {
    setThemeId(id);
    const next = timelineThemes.find((th) => th.id === id) ?? timelineThemes[0];
    const years = [...new Set(next.events.map((e) => e.date.slice(0, 4)))].sort();
    setSelectedActor('all');
    setSelectedPerson('all');
    setSelectedTypes([...next.filterTypes]);
    setSelectedYears(years);
    setSelectedSentiments([...ALL_SENTIMENT_TAGS]);
    setActiveId(null);
    setPresentFocusToken((n) => n + 1);
  };

  const actorMap = useMemo(
    () => Object.fromEntries(track.actors.map((a) => [a.id, a])),
    [track.actors],
  );

  const personMap = useMemo(
    () => Object.fromEntries(track.people.map((p) => [p.id, p])),
    [track.people],
  );

  const filtered = useMemo(() => {
    return [...track.events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter((e) => selectedTypes.includes(e.type))
      .filter((e) => selectedYears.includes(e.date.slice(0, 4)))
      .filter((e) => {
        if (selectedActor === 'all') return true;
        if (!e.actorId) return true;
        return e.actorId === selectedActor;
      })
      .filter((e) => {
        if (selectedPerson === 'all') return true;
        return e.personId === selectedPerson;
      })
      .filter((e) => {
        if (!track.showSentiment) return true;
        if (!e.sentiment) return true;
        return selectedSentiments.includes(e.sentiment);
      });
  }, [
    track.events,
    track.showSentiment,
    selectedActor,
    selectedPerson,
    selectedTypes,
    selectedYears,
    selectedSentiments,
  ]);

  useEffect(() => {
    if (filtered.length === 0) {
      setActiveId(null);
      return;
    }
    // Keep selection only if still visible — never auto-jump to the oldest pin
    if (activeId && !filtered.some((e) => e.id === activeId)) {
      setActiveId(null);
    }
  }, [filtered, activeId]);

  const activeIndex = filtered.findIndex((e) => e.id === activeId);
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;

  const toggleType = (type: EventType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== type);
      }
      return [...prev, type];
    });
  };

  const toggleYear = (year: string) => {
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        if (prev.length === 1) return prev;
        return prev.filter((y) => y !== year);
      }
      return [...prev, year].sort();
    });
  };

  const toggleSentiment = (tag: SentimentTag) => {
    setSelectedSentiments((prev) => {
      if (prev.includes(tag)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== tag);
      }
      return [...prev, tag];
    });
  };

  const resetFilters = () => {
    setSelectedActor('all');
    setSelectedPerson('all');
    setSelectedTypes([...track.filterTypes]);
    setSelectedYears(allYears);
    setSelectedSentiments([...ALL_SENTIMENT_TAGS]);
  };

  const typeLabel = (type: EventType) => t.trasparenza.types[type];
  const sentimentTagLabel = (tag: SentimentTag) => t.trasparenza.sentiments[tag];

  const goPrev = () => {
    if (activeIndex > 0) setActiveId(filtered[activeIndex - 1].id);
  };
  const goNext = () => {
    if (activeIndex >= 0 && activeIndex < filtered.length - 1) {
      setActiveId(filtered[activeIndex + 1].id);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'Escape') {
        setFiltersOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, filtered]);

  const filterLabels = {
    themeLabel: t.trasparenza.themeLabel,
    filterBy: t.trasparenza.filterBy,
    allActors: t.trasparenza.allActors,
    allPeople: t.trasparenza.allPeople,
    actorsLabel: t.trasparenza.actorsLabel,
    peopleLabel: t.trasparenza.peopleLabel,
    typesLabel: t.trasparenza.typesLabel,
    yearsLabel: t.trasparenza.yearsLabel,
    sentimentLabel: t.trasparenza.sentimentLabel,
    resetFilters: t.trasparenza.resetFilters,
    eventsCount: t.trasparenza.eventsCount,
    close: t.trasparenza.close,
    typeLabel,
    sentimentTagLabel,
  };

  const selectEvent = (id: string) => {
    setActiveId(id);
    setFiltersOpen(false);
  };

  const activeFilters =
    selectedActor !== 'all' ||
    selectedPerson !== 'all' ||
    selectedTypes.length < track.filterTypes.length ||
    selectedYears.length < allYears.length ||
    (track.showSentiment && selectedSentiments.length < ALL_SENTIMENT_TAGS.length);

  const moodEvents = useMemo(
    () => sentimentTheme.events.filter((e) => Boolean(e.sentiment)),
    [],
  );

  const moodLabels = useMemo(
    () => ({
      title: t.trasparenza.moodTitle,
      fear: t.trasparenza.moodFear,
      enthusiasm: t.trasparenza.moodEnthusiasm,
      hint: t.trasparenza.moodHint,
    }),
    [t],
  );

  const activePerson = active?.personId ? personMap[active.personId] : undefined;

  const detailProps = {
    event: active,
    locale,
    actorName: active?.actorId ? actorMap[active.actorId]?.name : undefined,
    actorColor: active?.actorId ? actorMap[active.actorId]?.color : undefined,
    personName: activePerson?.name,
    personRole: activePerson ? activePerson.role[locale] : undefined,
    typeLabel: active ? typeLabel(active.type) : '',
    sentimentLabel:
      active?.sentiment && track.showSentiment
        ? sentimentTagLabel(active.sentiment)
        : undefined,
    sentimentNote: track.showSentiment ? t.trasparenza.sentimentNote : undefined,
    selectHint: t.trasparenza.selectHint,
    closeLabel: t.trasparenza.close,
    sourceLabel: t.trasparenza.source,
    prevLabel: t.trasparenza.prevEvent,
    nextLabel: t.trasparenza.nextEvent,
    onPrev: goPrev,
    onNext: goNext,
    hasPrev: activeIndex > 0,
    hasNext: activeIndex >= 0 && activeIndex < filtered.length - 1,
  };

  return (
    <div
      className="relative flex flex-col overflow-hidden bg-background"
      style={{ height: `calc(100dvh - ${NAV_H})` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,oklch(0.48_0.17_25/_0.07),transparent_48%),radial-gradient(ellipse_at_88%_15%,oklch(0.32_0.04_255/_0.05),transparent_42%)]"
      />

      <section id="timeline" className="relative min-h-0 flex-1">
        <div className="absolute inset-0">
          <HorizontalTimeline
            events={filtered}
            moodEvents={track.showSentiment ? moodEvents : []}
            moodLabels={track.showSentiment ? moodLabels : undefined}
            moodLegendClassName={
              active
                ? 'right-3 max-lg:hidden lg:right-[23rem] xl:right-[24.5rem]'
                : 'right-3 max-lg:hidden'
            }
            actors={actorMap}
            people={personMap}
            locale={locale}
            activeId={activeId}
            onSelect={selectEvent}
            emptyLabel={t.trasparenza.empty}
            dragHint={t.trasparenza.dragHint}
            typeLabel={typeLabel}
            sentimentLabel={track.showSentiment ? sentimentTagLabel : undefined}
            focusPresent
            todayLabel={t.trasparenza.todayLabel}
            presentFocusToken={presentFocusToken}
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 p-2.5 sm:p-4">
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen((o) => !o)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-medium shadow-lg backdrop-blur-xl transition-colors ${
                  filtersOpen
                    ? 'border-foreground/15 bg-foreground text-background'
                    : 'border-border/60 bg-background/90 text-foreground hover:bg-background'
                }`}
                aria-expanded={filtersOpen}
                aria-label={t.trasparenza.filterBy}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">{t.trasparenza.filterBy}</span>
                {activeFilters && !filtersOpen && (
                  <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                )}
              </button>

              <span className="inline-flex min-w-0 max-w-[55%] flex-1 items-center gap-1.5 truncate rounded-md border border-border/60 bg-background/90 px-2.5 py-2 font-mono text-[11px] shadow-lg backdrop-blur-xl sm:max-w-none sm:flex-none sm:gap-2 sm:px-3 sm:text-xs">
                <span className="inline-flex shrink-0 items-center gap-1 text-mark">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mark opacity-55" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mark" />
                  </span>
                  {t.trasparenza.liveBadge}
                </span>
                <span className="shrink-0 text-border">·</span>
                <span className="truncate text-foreground/85">{track.shortName}</span>
                <span className="hidden text-border sm:inline">·</span>
                <span className="hidden truncate text-muted-foreground sm:inline">{todayLabel}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  setActiveId(null);
                  setPresentFocusToken((n) => n + 1);
                }}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-md border border-border/60 bg-background/90 px-2.5 text-xs font-medium text-muted-foreground shadow-lg backdrop-blur-xl transition-colors hover:bg-background hover:text-foreground sm:px-3"
                aria-label={t.trasparenza.jumpToToday}
              >
                <Calendar className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">{t.trasparenza.jumpToToday}</span>
                <span className="sm:hidden">{t.trasparenza.todayLabel}</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                className="absolute inset-x-0 bottom-0 top-14 z-40 sm:inset-x-auto sm:bottom-3 sm:left-3 sm:top-[4.25rem] sm:w-[min(100%-1.5rem,300px)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="flex h-full max-h-full flex-col overflow-hidden rounded-t-2xl border border-border/60 bg-background shadow-2xl sm:rounded-2xl sm:bg-background/95 sm:backdrop-blur-xl">
                  <div className="flex justify-center py-2 sm:hidden" aria-hidden>
                    <span className="h-1 w-10 rounded-full bg-border" />
                  </div>
                  <FilterSidebar
                    themes={timelineThemes}
                    selectedThemeId={track.id}
                    onThemeChange={switchTheme}
                    locale={locale}
                    actors={track.actors}
                    people={track.people}
                    years={allYears}
                    filterTypes={track.filterTypes}
                    showSentiment={track.showSentiment}
                    selectedActor={selectedActor}
                    selectedPerson={selectedPerson}
                    selectedTypes={selectedTypes}
                    selectedYears={selectedYears}
                    selectedSentiments={selectedSentiments}
                    allSentimentTags={ALL_SENTIMENT_TAGS}
                    eventCount={filtered.length}
                    disclaimer={track.disclaimer[locale]}
                    labels={filterLabels}
                    onActorChange={setSelectedActor}
                    onPersonChange={setSelectedPerson}
                    onToggleType={toggleType}
                    onToggleYear={toggleYear}
                    onToggleSentiment={toggleSentiment}
                    onReset={resetFilters}
                    onClose={() => setFiltersOpen(false)}
                    className="min-h-0 flex-1"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {active && (
              <motion.div
                className="absolute bottom-3 right-3 top-16 z-40 hidden w-[min(100%-1.5rem,340px)] sm:top-[4.25rem] lg:block xl:w-[360px]"
                initial={{ opacity: 0, x: 12, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="flex h-full max-h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl">
                  <EventDetailPanel
                    {...detailProps}
                    onClose={() => setActiveId(null)}
                    className="min-h-0 flex-1"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile detail: only when a pin is selected */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="relative z-20 flex max-h-[58%] shrink-0 flex-col border-t border-border/50 bg-background shadow-[0_-8px_30px_rgba(0,0,0,0.08)] lg:hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.12, duration: 0.35 }}
          >
            <div className="flex justify-center py-2" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-border" />
            </div>
            <EventDetailPanel
              {...detailProps}
              onClose={() => setActiveId(null)}
              className="min-h-0 flex-1 overflow-hidden"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
