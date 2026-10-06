'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PanelRight, SlidersHorizontal } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import type { TimelineEvent } from '@/lib/data/trasparenza';
import {
  unifiedTheme,
  timelineThemes,
  lobbyPeople,
  ALL_SENTIMENT_TAGS,
  type EventType,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { localIsoDate } from '@/lib/dates';
import { applyStoreOverlays } from '@/lib/pipeline/edits';
import { effectiveSentiment, rollupAutoSignals, signalToTimelineEvent } from '@/lib/pipeline/signals';
import type { AutoSignal, TimelineEventEdit } from '@/lib/pipeline/types';
import { FilterSidebar } from '@/components/trasparenza/FilterSidebar';
import { HorizontalTimeline } from '@/components/trasparenza/HorizontalTimeline';
import { TimelineFeed } from '@/components/trasparenza/TimelineFeed';

/** Offset timeline chrome below the floating header */
const CHROME_TOP = 'calc(var(--nav-clearance) + 0.5rem)';
const FILTER_PANEL_TOP = 'calc(var(--nav-clearance) + 3.25rem)';

/** Closing "today" pin on the AI Act track — date follows the calendar. */
const PRESENT_PIN_ID = 'e-2026-09-today';

export default function TrasparenzaContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';

  const [themeId] = useState(unifiedTheme.id);
  const [pipelineEvents, setPipelineEvents] = useState<TimelineEvent[]>([]);
  const [autoSignals, setAutoSignals] = useState<AutoSignal[]>([]);
  const [edits, setEdits] = useState<Record<string, TimelineEventEdit>>({});
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [presentFocusToken, setPresentFocusToken] = useState(0);
  const [focusEventToken, setFocusEventToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadPublished = () => {
      fetch('/api/pipeline/published', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then(
          (
            data: {
              events?: TimelineEvent[];
              signals?: AutoSignal[];
              edits?: Record<string, TimelineEventEdit>;
              hiddenIds?: string[];
            } | null,
          ) => {
            if (cancelled || !data) return;
            setPipelineEvents(data.events ?? []);
            setAutoSignals(data.signals ?? []);
            setEdits(data.edits ?? {});
            setHiddenIds(data.hiddenIds ?? []);
          },
        )
        .catch(() => {
          /* pipeline optional offline */
        });
    };

    loadPublished();
    window.addEventListener('focus', loadPublished);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', loadPublished);
    };
  }, []);

  const track = useMemo(() => {
    const today = localIsoDate();
    const hidden = new Set(hiddenIds);
    const base = timelineThemes.find((th) => th.id === themeId) ?? unifiedTheme;
    const withPresent = applyStoreOverlays(
      base.events.map((e) =>
        e.id === PRESENT_PIN_ID ? { ...e, date: today } : e,
      ),
      edits,
      hiddenIds,
    ).map((e) => (e.id === PRESENT_PIN_ID ? { ...e, date: today } : e));

    const byId = new Map(withPresent.map((e) => [e.id, e]));
    for (const e of pipelineEvents) {
      if (hidden.has(e.id)) continue;
      byId.set(e.id, { ...e, date: e.date > today ? today : e.date });
    }
    return { ...base, events: [...byId.values()] };
  }, [themeId, pipelineEvents, edits, hiddenIds]);

  const allYears = useMemo(() => {
    const years = [
      ...track.events.map((e) => e.date.slice(0, 4)),
      ...autoSignals.map((s) => s.date.slice(0, 4)),
    ];
    return [...new Set(years)].sort();
  }, [track.events, autoSignals]);

  const [selectedActor, setSelectedActor] = useState<string | 'all'>('all');
  const [selectedPerson, setSelectedPerson] = useState<string | 'all'>('all');
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([...track.filterTypes]);
  const [selectedYears, setSelectedYears] = useState<string[]>(allYears);
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentTag[]>([
    ...ALL_SENTIMENT_TAGS,
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [chartActiveId, setChartActiveId] = useState<string | null>(null);
  const [scrubId, setScrubId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [feedOpen, setFeedOpen] = useState(false);

  useEffect(() => {
    setSelectedYears((prev) => {
      const merged = [...new Set([...prev, ...allYears])].sort();
      if (merged.length === prev.length && merged.every((y, i) => y === prev[i])) return prev;
      return merged;
    });
  }, [allYears]);

  const switchTheme = (_id: string) => {
    /* single unified track — theme switch retained for FilterSidebar API */
  };

  const actorMap = useMemo(
    () => Object.fromEntries(track.actors.map((a) => [a.id, a])),
    [track.actors],
  );

  const personMap = useMemo(
    () => Object.fromEntries(lobbyPeople.map((p) => [p.id, p])),
    [],
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
        // Person filter scopes statements; context pins stay visible on the axis
        if (e.type !== 'statement') return true;
        return e.personId === selectedPerson;
      })
      .filter((e) => {
        if (!e.sentiment) return true;
        return selectedSentiments.includes(e.sentiment);
      });
  }, [
    track.events,
    selectedActor,
    selectedPerson,
    selectedTypes,
    selectedYears,
    selectedSentiments,
  ]);

  const filteredSignals = useMemo(() => {
    if (!selectedTypes.includes('statement')) return [];
    return autoSignals.filter((signal) => {
      const tag = effectiveSentiment(signal);
      if (!tag || !selectedSentiments.includes(tag)) return false;
      if (!selectedYears.includes(signal.date.slice(0, 4))) return false;
      if (selectedActor !== 'all' && signal.actorId !== selectedActor) return false;
      if (selectedPerson !== 'all' && signal.personId !== selectedPerson) return false;
      return true;
    });
  }, [autoSignals, selectedActor, selectedPerson, selectedTypes, selectedYears, selectedSentiments]);

  const autoFeed = useMemo(
    () =>
      filteredSignals
        .map(signalToTimelineEvent)
        .filter((event): event is TimelineEvent => event !== null),
    [filteredSignals],
  );

  const dayRollups = useMemo(() => rollupAutoSignals(filteredSignals), [filteredSignals]);

  const chartEvents = useMemo(
    () => [...filtered, ...dayRollups],
    [filtered, dayRollups],
  );

  const feedEvents = useMemo(
    () => [...filtered, ...autoFeed].sort((a, b) => b.date.localeCompare(a.date)),
    [filtered, autoFeed],
  );

  useEffect(() => {
    if (feedEvents.length === 0) {
      setActiveId(null);
      setChartActiveId(null);
      setScrubId(null);
      return;
    }
    if (activeId && !feedEvents.some((e) => e.id === activeId)) {
      setActiveId(null);
      setChartActiveId(null);
    }
  }, [feedEvents, activeId]);

  const activeIndex = feedEvents.findIndex((e) => e.id === activeId);

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

  const chartIdFor = (id: string) => {
    const event = feedEvents.find((e) => e.id === id);
    return event?.origin === 'auto' ? `auto-day-${event.date}` : id;
  };

  const centerOnEvent = (id: string) => {
    setActiveId(id);
    setChartActiveId(chartIdFor(id));
    setScrubId(null);
    setFocusEventToken((n) => n + 1);
  };

  const goPrev = () => {
    if (activeIndex > 0) centerOnEvent(feedEvents[activeIndex - 1].id);
  };
  const goNext = () => {
    if (activeIndex >= 0 && activeIndex < feedEvents.length - 1) {
      centerOnEvent(feedEvents[activeIndex + 1].id);
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
        setFeedOpen(false);
        setActiveId(null);
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
    if (id.startsWith('auto-day-')) {
      if (chartActiveId === id) {
        setActiveId(null);
        setChartActiveId(null);
        return;
      }
      const date = id.slice('auto-day-'.length);
      const first = autoFeed.find((event) => event.date === date);
      setActiveId(first?.id ?? id);
      setChartActiveId(id);
      setScrubId(null);
      setFocusEventToken((n) => n + 1);
      setFiltersOpen(false);
      setFeedOpen(true);
      return;
    }
    if (activeId === id) {
      setActiveId(null);
      setChartActiveId(null);
      return;
    }
    centerOnEvent(id);
    setFiltersOpen(false);
    setFeedOpen(true);
  };

  const onFeedScrub = (id: string | null) => {
    if (!id) {
      setScrubId(null);
      return;
    }
    const event = feedEvents.find((item) => item.id === id);
    setScrubId(event?.origin === 'auto' ? `auto-day-${event.date}` : id);
  };

  const activeFilters =
    selectedActor !== 'all' ||
    selectedPerson !== 'all' ||
    selectedTypes.length < track.filterTypes.length ||
    selectedYears.length < allYears.length ||
    selectedSentiments.length < ALL_SENTIMENT_TAGS.length;

  const moodEvents = useMemo(
    () => [...filtered.filter((e) => Boolean(e.sentiment)), ...dayRollups],
    [filtered, dayRollups],
  );

  const activityEvents = useMemo(() => {
    const samplesByDate = new Map<string, TimelineEvent[]>();
    for (const event of autoFeed) {
      const list = samplesByDate.get(event.date) ?? [];
      if (list.length < 12) list.push(event);
      samplesByDate.set(event.date, list);
    }

    const weightedAutos = dayRollups.map((rollup) => {
      const samples = samplesByDate.get(rollup.date) ?? [];
      if (samples.length === 0) return rollup;
      return {
        ...rollup,
        summary: {
          it: samples.map((s) => s.title.it).join(' · '),
          en: samples.map((s) => s.title.en).join(' · '),
        },
      };
    });

    return [
      ...filtered.filter((e) => Boolean(e.sentiment) && e.origin !== 'auto'),
      ...weightedAutos,
    ];
  }, [filtered, dayRollups, autoFeed]);

  const moodLabels = useMemo(
    () => ({
      title: t.trasparenza.moodTitle,
      fear: t.trasparenza.moodFear,
      enthusiasm: t.trasparenza.moodEnthusiasm,
      hint: t.trasparenza.moodHint,
      activity: t.trasparenza.activity,
      activityHint: t.trasparenza.activityHint,
      activityBarCount: t.trasparenza.activityBarCount,
      activityBarMore: t.trasparenza.activityBarMore,
    }),
    [t],
  );

  const renderFeed = (opts?: {
    onPick?: (id: string) => void;
    onClose?: () => void;
    className?: string;
  }) => (
    <TimelineFeed
      events={feedEvents}
      locale={locale}
      people={personMap}
      actors={actorMap}
      personOptions={track.people}
      selectedPerson={selectedPerson}
      onPersonChange={setSelectedPerson}
      allPeopleLabel={t.trasparenza.allPeople}
      peopleLabel={t.trasparenza.peopleLabel}
      typeOptions={track.filterTypes}
      selectedTypes={selectedTypes}
      onToggleType={toggleType}
      onResetTypes={() => setSelectedTypes([...track.filterTypes])}
      typesLabel={t.trasparenza.typesLabel}
      allTypesLabel={t.trasparenza.allTypes}
      activeId={activeId}
      onSelect={opts?.onPick ?? selectEvent}
      onScrub={onFeedScrub}
      sentimentLabel={sentimentTagLabel}
      typeLabel={typeLabel}
      sentimentNote={t.trasparenza.sentimentNote}
      autoNote={t.trasparenza.autoNote}
      autoLabel={t.trasparenza.autoLabel}
      sourceLabel={t.trasparenza.source}
      title={t.trasparenza.feedTitle}
      newestFirstLabel={t.trasparenza.feedNewest}
      emptyLabel={t.trasparenza.empty}
      closeLabel={t.trasparenza.close}
      onClose={opts?.onClose}
      className={opts?.className ?? 'min-h-0 flex-1'}
    />
  );

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,oklch(0.48_0.17_25/_0.07),transparent_48%),radial-gradient(ellipse_at_88%_15%,oklch(0.32_0.04_255/_0.05),transparent_42%)]"
      />

      <section id="timeline" className="relative min-h-0 min-w-0 flex-1">
        <div className="absolute inset-0">
          <HorizontalTimeline
            events={chartEvents}
            mode="chart"
            moodEvents={moodEvents}
            activityEvents={activityEvents}
            moodLabels={moodLabels}
            actors={actorMap}
            people={personMap}
            locale={locale}
            activeId={chartActiveId}
            onSelect={selectEvent}
            scrubId={scrubId}
            emptyLabel={t.trasparenza.empty}
            dragHint={t.trasparenza.inspectHint}
            typeLabel={typeLabel}
            sentimentLabel={sentimentTagLabel}
            focusPresent
            todayLabel={t.trasparenza.todayLabel}
            presentFocusToken={presentFocusToken}
            focusEventToken={focusEventToken}
          />

          <div
            className="pointer-events-none absolute inset-x-0 z-30 px-2.5 sm:px-4"
            style={{ top: CHROME_TOP }}
          >
            <div className="pointer-events-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFiltersOpen((o) => !o)}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-medium backdrop-blur-md transition-colors ${
                  filtersOpen
                    ? 'border-foreground/15 bg-foreground text-background'
                    : 'border-border/50 bg-background/80 text-foreground hover:bg-background'
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

              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(null);
                    setScrubId(null);
                    setPresentFocusToken((n) => n + 1);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground/80 transition-colors hover:bg-background/70 hover:text-foreground"
                  aria-label={t.trasparenza.jumpToToday}
                  title={t.trasparenza.jumpToToday}
                >
                  <Calendar className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setFeedOpen((o) => !o)}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                    feedOpen
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground/80 hover:bg-background/70 hover:text-foreground'
                  }`}
                  aria-expanded={feedOpen}
                  aria-label={t.trasparenza.feedOpen}
                  title={t.trasparenza.feedOpen}
                >
                  <PanelRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                className="absolute inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:bottom-3 sm:left-3 sm:w-[min(100%-1.5rem,300px)]"
                style={{ top: FILTER_PANEL_TOP }}
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
                    eventCount={feedEvents.length}
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
        </div>

      </section>

      {/* Desktop feed — docked, collapsible */}
      <AnimatePresence initial={false}>
        {feedOpen && (
          <motion.aside
            key="desktop-feed"
            className="relative z-20 hidden h-full shrink-0 overflow-hidden border-l border-border/50 bg-background/95 backdrop-blur-xl lg:flex"
            initial={{ width: 0, opacity: 0.6 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0.6 }}
            transition={{ type: 'spring', bounce: 0.05, duration: 0.38 }}
          >
            <div className="flex h-full w-[min(100vw,380px)] min-w-[min(100vw,380px)] flex-col">
              {renderFeed({ onClose: () => setFeedOpen(false) })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile feed drawer */}
      <AnimatePresence>
        {feedOpen && (
          <motion.div
            key="mobile-feed"
            className="absolute inset-0 z-[60] flex flex-col bg-background lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.08, duration: 0.35 }}
          >
            {renderFeed({ onClose: () => setFeedOpen(false) })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
