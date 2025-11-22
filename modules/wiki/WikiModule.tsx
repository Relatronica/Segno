'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { WIKI_ARTICLES, WikiArticle } from './data/articles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Search, BookOpen, Scale, Cpu, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function WikiModule() {
  const { setStep, currentArticleId, setCurrentArticleId } = useAppStore();
  const [search, setSearch] = useState('');

  const activeArticle = currentArticleId ? WIKI_ARTICLES.find(a => a.id === currentArticleId) : null;

  const filteredArticles = WIKI_ARTICLES.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.summary.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'Legal': return <Scale className="w-5 h-5 text-blue-500" />;
      case 'Tech': return <Cpu className="w-5 h-5 text-purple-500" />;
      default: return <Shield className="w-5 h-5 text-emerald-500" />;
    }
  };

  if (activeArticle) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => setCurrentArticleId(null)} className="mb-6 text-slate-500">
            <ArrowLeft className="mr-2 w-4 h-4" /> Torna alla Libreria
          </Button>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-white shadow-xl border-slate-200 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                </div>
                <CardTitle className="text-3xl text-slate-900">{activeArticle.title}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none p-8 pt-0">
                <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {activeArticle.content}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              Knowledge Hub
            </h1>
            <p className="text-slate-500 mt-1">Impara i concetti fondamentali di AI e Compliance.</p>
          </div>
          <Button variant="outline" onClick={() => setStep('builder')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna al Builder
          </Button>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Cerca argomenti (es. AI Act, RAG...)" 
            className="pl-10 bg-white border-slate-200 shadow-sm h-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <motion.div key={article.id} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card 
                className="h-full cursor-pointer hover:shadow-lg border-slate-200 transition-shadow bg-white group"
                onClick={() => setCurrentArticleId(article.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    {getIcon(article.category)}
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {article.summary}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

