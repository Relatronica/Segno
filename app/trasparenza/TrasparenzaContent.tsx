'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PanelRight, Search, SlidersHorizontal, X } from 'lucide-react';
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
import { PRESENT_PIN_ID } from '@/lib/trasparenza/constants';
import { haystack, matchesTerms, queryTerms } from '@/lib/trasparenza/search';
import {
  buildTrasparenzaSearch,
  parseTrasparenzaSearch,
  type TrasparenzaUrlState,
} from '@/lib/trasparenza/url';
import { FilterSidebar } from '@/components/trasparenza/FilterSidebar';
import { HorizontalTimeline } from '@/components/trasparenza/HorizontalTimeline';
import { TimelineFeed } from '@/components/trasparenza/TimelineFeed';

/** Offset timeline chrome below the floating header */
const CHROME_TOP = 'calc(var(--nav-clearance) + 0.5rem)';
const FILTER_PANEL_TOP = 'calc(var(--nav-clearance) + 3.25rem)';

type PersonMap = Record<string, { name: string; shortName: string; role: { it: string; en: string } }>;
type ActorMap = Record<string, { name: string; shortName: string }>;

/** Everything the free-text search looks at on a curated pin. */
function eventHaystack(
  event: TimelineEvent,
  people: PersonMap,
  actors: ActorMap,
): string {
  const person = event.personId ? people[event.personId] : undefined;
  const actor = event.actorId ? actors[event.actorId] : undefined;
  return haystack([
    event.date,
    event.title.it,
    event.title.en,
    event.summary.it,
    event.summary.en,
    event.detail?.it,
    event.detail?.en,
    event.quote?.it,
    event.quote?.en,
    event.sourceLabel.it,
    event.sourceLabel.en,
    event.sourceUrl,
    person?.name,
    person?.shortName,
    person?.role.it,
    person?.role.en,
    actor?.name,
    actor?.shortName,
  ]);
}

/** Same, for automatic headline signals (no quote). */
function signalHaystack(signal: AutoSignal, people: PersonMap, actors: ActorMap): string {
  const person = people[signal.personId];
  const actor = signal.actorId ? actors[signal.actorId] : undefined;
  return haystack([
    signal.date,
    signal.title.it,
    signal.title.en,
    signal.summary.it,
    signal.summary.en,
    signal.sourceLabel.it,
    signal.sourceLabel.en,
    signal.sourceUrl,
    person?.name,
    person?.shortName,
    actor?.name,
    actor?.shortName,
  ]);
}

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
  const [query, setQuery] = useState('');
  /** Set once the query string has been read, so filters are never reset by the first render. */
  const [urlApplied, setUrlApplied] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<string | null>(null);
  /** A `?year=` in the URL wins over the "merge new years as data arrives" rule. */
  const explicitYears = useRef(false);

  /** Defaults used when the URL leaves a filter open. */
  const defaults = useRef({ types: [...track.filterTypes], years: allYears });

  useEffect(() => {
    defaults.current = { types: [...track.filterTypes], years: allYears };
  }, [track.filterTypes, allYears]);

  const applyUrlState = useCallback((parsed: TrasparenzaUrlState) => {
    setSelectedPerson(parsed.person ?? 'all');
    setSelectedActor(parsed.actor ?? 'all');
    setSelectedTypes(parsed.types ?? defaults.current.types);
    explicitYears.current = Boolean(parsed.years);
    setSelectedYears(parsed.years ?? defaults.current.years);
    setSelectedSentiments(parsed.sentiments ?? [...ALL_SENTIMENT_TAGS]);
    setQuery(parsed.q ?? '');

    if (parsed.event) {
      setPendingEvent(parsed.event);
      setFeedOpen(true);
    } else {
      setPendingEvent(null);
      setActiveId(null);
      setChartActiveId(null);
    }
  }, []);

  useEffect(() => {
    applyUrlState(parseTrasparenzaSearch(window.location.search));
    setUrlApplied(true);
  }, [applyUrlState]);

  useEffect(() => {
    const onPop = () => applyUrlState(parseTrasparenzaSearch(window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [applyUrlState]);

  useEffect(() => {
    if (!urlApplied) return;
    if (explicitYears.current) return;
    setSelectedYears((prev) => {
      const merged = [...new Set([...prev, ...allYears])].sort();
      if (merged.length === prev.length && merged.every((y, i) => y === prev[i])) return prev;
      return merged;
    });
  }, [allYears, urlApplied]);

  /** Mirror the current view into the query string so any state is shareable. */
  useEffect(() => {
    if (!urlApplied) return;
    const timer = window.setTimeout(() => {
      const search = buildTrasparenzaSearch({
        person: selectedPerson !== 'all' ? selectedPerson : undefined,
        actor: selectedActor !== 'all' ? selectedActor : undefined,
        types: selectedTypes.length < track.filterTypes.length ? selectedTypes : undefined,
        years: selectedYears.length < allYears.length ? selectedYears : undefined,
        sentiments:
          selectedSentiments.length < ALL_SENTIMENT_TAGS.length
            ? selectedSentiments
            : undefined,
        q: query.trim() || undefined,
        event: activeId && !activeId.startsWith('auto-day-') ? activeId : undefined,
      });
      const next = `${window.location.pathname}${search}`;
      if (next !== `${window.location.pathname}${window.location.search}`) {
        window.history.replaceState(null, '', next);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [
    urlApplied,
    selectedPerson,
    selectedActor,
    selectedTypes,
    selectedYears,
    selectedSentiments,
    query,
    activeId,
    track.filterTypes,
    allYears,
  ]);

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

  const needles = useMemo(() => queryTerms(query), [query]);

  const filtered = useMemo(() => {
    return [...track.events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter((e) => matchesTerms(eventHaystack(e, personMap, actorMap), needles))
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
    needles,
    personMap,
    actorMap,
  ]);

  const filteredSignals = useMemo(() => {
    if (!selectedTypes.includes('statement')) return [];
    return autoSignals.filter((signal) => {
      const tag = effectiveSentiment(signal);
      if (!tag || !selectedSentiments.includes(tag)) return false;
      if (!selectedYears.includes(signal.date.slice(0, 4))) return false;
      if (selectedActor !== 'all' && signal.actorId !== selectedActor) return false;
      if (selectedPerson !== 'all' && signal.personId !== selectedPerson) return false;
      if (!matchesTerms(signalHaystack(signal, personMap, actorMap), needles)) return false;
      return true;
    });
  }, [
    autoSignals,
    selectedActor,
    selectedPerson,
    selectedTypes,
    selectedYears,
    selectedSentiments,
    needles,
    personMap,
    actorMap,
  ]);

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
    // Once the reader picks years by hand, new data must not silently re-add them.
    explicitYears.current = true;
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
    explicitYears.current = false;
    setSelectedYears(allYears);
    setSelectedSentiments([...ALL_SENTIMENT_TAGS]);
    setQuery('');
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

  /** A `?event=` deep link wins over the "open on today" default. */
  useEffect(() => {
    if (!pendingEvent) return;
    if (!feedEvents.some((e) => e.id === pendingEvent)) return;
    centerOnEvent(pendingEvent);
    setPendingEvent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingEvent, feedEvents]);

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
      permalinkLabel={t.trasparenza.permalink}
      permalinkHint={t.trasparenza.permalinkHint}
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

              <div className="relative min-w-0 flex-1 sm:max-w-sm" title={t.trasparenza.searchHint}>
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.trasparenza.searchPlaceholder}
                  aria-label={t.trasparenza.searchLabel}
                  className="h-10 w-full rounded-md border border-border/50 bg-background/80 pl-8 pr-8 text-sm text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/25 focus:bg-background [&::-webkit-search-cancel-button]:appearance-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t.trasparenza.searchClear}
                    className="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

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
