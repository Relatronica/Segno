'use client';

import { useState, useEffect } from 'react';
import { useT } from '@/lib/i18n/useT';
import { motion } from 'framer-motion';
import { ExternalLink, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it, enUS } from 'date-fns/locale';
import { useAppStore } from '@/store/useAppStore';

type NewsItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  image?: string;
};

const categoryMap: Record<string, string> = {
  'ai-ethics': 'ethics',
  'regulation': 'regulation',
  'ai-news': 'technology',
  'privacy': 'privacy',
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function NewsContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? news
    : news.filter((n) => categoryMap[n.category] === filter || n.category === filter);

  const filters = ['all', 'privacy', 'regulation', 'ethics', 'technology'] as const;

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
            {t.news.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-muted-foreground"
          >
            {t.news.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Filters + News */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  filter === cat
                    ? 'bg-foreground text-background'
                    : 'bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.news.categories[cat]}
              </button>
            ))}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="mt-12 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="mt-12 text-center text-muted-foreground">
              {locale === 'it' ? 'Nessuna notizia disponibile.' : 'No news available.'}
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={fadeUp}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card p-5 transition-all hover:shadow-lg hover:border-border"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {t.news.categories[(categoryMap[item.category] || 'technology') as keyof typeof t.news.categories] || item.category}
                    </span>
                    <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-3 font-semibold leading-snug line-clamp-2 group-hover:text-foreground">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(item.publishedAt), {
                        addSuffix: true,
                        locale: locale === 'it' ? it : enUS,
                      })}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
