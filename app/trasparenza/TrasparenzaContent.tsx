'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, SlidersHorizontal, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import {
  timelineThemes,
  sentimentTheme,
  ALL_SENTIMENT_TAGS,
  type EventType,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { FilterSidebar } from '@/components/trasparenza/FilterSidebar';
import { HorizontalTimeline } from '@/components/trasparenza/HorizontalTimeline';
import { EventDetailPanel } from '@/components/trasparenza/EventDetailPanel';

/** Navbar height (h-16) */
const NAV_H = '4rem';

export default function TrasparenzaContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';

  const [themeId, setThemeId] = useState(timelineThemes[0].id);
  const track = useMemo(
    () => timelineThemes.find((th) => th.id === themeId) ?? timelineThemes[0],
    [themeId],
  );

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
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [detailOpen, setDetailOpen] = useState(true);

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
    if (!activeId || !filtered.some((e) => e.id === activeId)) {
      setActiveId(filtered[0].id);
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
    setDetailOpen(true);
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
              detailOpen ? 'right-3 lg:right-[23rem] xl:right-[24.5rem]' : 'right-3'
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
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 sm:p-4">
            <div className="pointer-events-auto flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setFiltersOpen((o) => !o)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-xl transition-colors ${
                  filtersOpen
                    ? 'border-foreground/15 bg-foreground text-background'
                    : 'border-border/60 bg-background/85 text-foreground hover:bg-background'
                }`}
                aria-expanded={filtersOpen}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t.trasparenza.filterBy}
                {activeFilters && !filtersOpen && (
                  <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                )}
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/85 px-3 py-2 font-mono text-xs text-muted-foreground shadow-lg backdrop-blur-xl">
                <Calendar className="h-3.5 w-3.5" />
                {track.name[locale]} · {track.period[locale]}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setDetailOpen((o) => !o)}
              className="pointer-events-auto hidden items-center gap-2 rounded-xl border border-border/60 bg-background/85 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-xl transition-colors hover:bg-background lg:inline-flex"
              aria-expanded={detailOpen}
            >
              {detailOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
              {t.trasparenza.detailPanel}
            </button>
          </div>

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                className="absolute bottom-3 left-3 top-16 z-40 w-[min(100%-1.5rem,300px)] sm:top-[4.25rem]"
                initial={{ opacity: 0, x: -12, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="flex h-full max-h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl">
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
            {detailOpen && (
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
                    onClose={() => setDetailOpen(false)}
                    className="min-h-0 flex-1"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
            {!track.showSentiment && (
              <p className="rounded-full border border-border/50 bg-background/80 px-3 py-1 font-mono text-[10px] text-muted-foreground backdrop-blur-md">
                {t.trasparenza.comingTitle}: DSA · DMA · GDPR
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="relative z-10 max-h-[42%] shrink-0 overflow-y-auto border-t border-border/40 bg-background lg:hidden">
        <EventDetailPanel {...detailProps} />
      </div>
    </div>
  );
}
