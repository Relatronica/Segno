'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Newspaper, ExternalLink, ChevronDown, ChevronUp, RefreshCw, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

export type NewsItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: Date;
  category: 'ai-ethics' | 'regulation' | 'ai-news' | 'privacy';
  image?: string;
};

type NewsPanelProps = {
  isOpen: boolean;
  onToggle: () => void;
};


const CATEGORY_LABELS: Record<NewsItem['category'], string> = {
  'ai-ethics': 'Etica IA',
  'regulation': 'Normativa',
  'ai-news': 'Notizie IA',
  'privacy': 'Privacy',
};

const CATEGORY_COLORS: Record<NewsItem['category'], string> = {
  'ai-ethics': 'bg-purple-100 text-purple-700 border-purple-200',
  'regulation': 'bg-blue-100 text-blue-700 border-blue-200',
  'ai-news': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'privacy': 'bg-orange-100 text-orange-700 border-orange-200',
};

export function NewsPanel({ isOpen, onToggle }: NewsPanelProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      
      // Converti publishedAt da string a Date
      const newsWithDates = data.map((item: NewsItem) => ({
        ...item,
        publishedAt: new Date(item.publishedAt),
      }));
      
      setNews(newsWithDates);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching news:', error);
      // In caso di errore, mostra array vuoto
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNews();
      // Auto-refresh ogni 30 minuti
      const interval = setInterval(fetchNews, 30 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <>
      {/* News Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed top-1/2 -translate-y-1/2 right-6 z-40 w-96 h-[70vh]"
          >
            <Card className="bg-white/95 backdrop-blur border border-slate-200 shadow-2xl flex flex-col overflow-hidden h-full">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Newspaper className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">News & Aggiornamenti</h3>
                    <p className="text-xs text-slate-500">
                      {lastUpdate && `Aggiornato ${formatDistanceToNow(lastUpdate, { addSuffix: true, locale: it })}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={fetchNews}
                    disabled={isLoading}
                    className="h-8 w-8 text-slate-500 hover:text-slate-700"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                    className="h-8 w-8 text-slate-500 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {news.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Nessuna notizia disponibile</p>
                  </div>
                ) : (
                  news.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all bg-white group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Immagine articolo */}
                        {item.image && (
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Nascondi immagine se errore di caricamento
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                              {item.title}
                            </h4>
                            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-0.5" />
                          </div>
                          {item.description && (
                            <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                              {item.description}
                            </p>
                          )}
                          {/* Badge categoria sotto la descrizione */}
                          <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded border ${CATEGORY_COLORS[item.category]}`}>
                            {CATEGORY_LABELS[item.category]}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100">
                        <span className="text-xs text-slate-500">{item.source}</span>
                        <span className="text-xs text-slate-400">
                          {formatDistanceToNow(item.publishedAt, { addSuffix: true, locale: it })}
                        </span>
                      </div>
                    </motion.a>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex-shrink-0">
                <p className="text-xs text-slate-500 text-center">
                  Fonti: RSS feeds, API normative, aggiornamenti istituzionali
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

