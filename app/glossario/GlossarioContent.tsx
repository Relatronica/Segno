'use client';

import { useState, useMemo } from 'react';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { glossaryTerms } from '@/lib/data/glossary';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function GlossarioContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return glossaryTerms;
    const q = search.toLowerCase();
    return glossaryTerms.filter(
      (term) =>
        term.term[locale].toLowerCase().includes(q) ||
        term.definition[locale].toLowerCase().includes(q)
    );
  }, [search, locale]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof glossaryTerms> = {};
    for (const term of filtered) {
      const letter = term.term[locale][0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered, locale]);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/50 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            {t.glossario.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-muted-foreground"
          >
            {t.glossario.subtitle}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mt-8 max-w-md"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.glossario.searchPlaceholder}
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
            />
          </motion.div>
        </div>
      </section>

      {/* Glossary list */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {grouped.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground"
              >
                {locale === 'it' ? 'Nessun risultato trovato.' : 'No results found.'}
              </motion.p>
            ) : (
              <div className="space-y-12">
                {grouped.map(([letter, terms]) => (
                  <div key={letter}>
                    <h2 className="mb-4 text-2xl font-bold text-muted-foreground/50">{letter}</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {terms.map((term, i) => (
                        <motion.div
                          key={term.id}
                          layout
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          variants={fadeUp}
                          className="rounded-xl border border-border/50 bg-card p-5 transition-shadow hover:shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{term.term[locale]}</h3>
                            <span className="rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                              {term.category}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {term.definition[locale]}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
