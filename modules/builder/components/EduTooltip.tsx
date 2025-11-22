'use client';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Info, BookOpen, ExternalLink } from 'lucide-react';
import { EDU_DICTIONARY } from '../utils/eduDictionary';
import { useAppStore } from '@/store/useAppStore';
import { WIKI_ARTICLES } from '@/modules/wiki/data/articles';
import { Button } from '@/components/ui/button';

type EduTooltipProps = {
  termKey: string; // La chiave nel dizionario (es. 'Chatbot LLM') o cerchiamo per label
  children: React.ReactNode;
};

export function EduTooltip({ termKey, children }: EduTooltipProps) {
  const { setStep, setCurrentArticleId } = useAppStore();
  
  // Logica di fallback: se la chiave esatta non c'è, prova a cercarla per titolo
  const term = EDU_DICTIONARY[termKey] || Object.values(EDU_DICTIONARY).find(t => t.title === termKey || termKey.includes(t.key));

  if (!term) return <>{children}</>; // Se non abbiamo una definizione, rendiamo solo il figlio

  // Trova l'articolo Wiki correlato usando relatedTerms
  const relatedArticle = WIKI_ARTICLES.find(article => 
    article.relatedTerms.some(rt => term.key === rt || termKey.toLowerCase().includes(rt))
  );

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (relatedArticle) {
      setCurrentArticleId(relatedArticle.id);
    }
    setStep('wiki');
  };

  return (
    <HoverCard openDelay={400}>
      <HoverCardTrigger asChild>
        <div className="relative group cursor-help">
            {children}
            {/* Indicatore visuale che c'è una info (opzionale, magari solo al hover) */}
            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-blue-500 text-white rounded-full p-0.5 shadow-sm">
                    <Info className="w-2 h-2" />
                </div>
            </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white/95 backdrop-blur-xl border-slate-200 shadow-xl z-50 p-0 overflow-hidden" side="right" align="start">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white" />
            <span className="font-bold text-white text-sm">Pillola Educativa</span>
        </div>
        <div className="p-4 space-y-3">
            <div>
                <h4 className="font-bold text-slate-800 text-base">{term.title}</h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{term.simpleDefinition}</p>
            </div>
            
            {term.legalContext && (
                <div className="bg-amber-50 p-2 rounded border border-amber-100">
                    <span className="text-xs font-bold text-amber-700 uppercase block mb-1">Perché è importante?</span>
                    <p className="text-xs text-amber-800 italic">{term.legalContext}</p>
                </div>
            )}

            <div className="pt-2 border-t border-slate-100">
                 <span className="text-xs font-bold text-slate-400 uppercase mr-2">Esempio:</span>
                 <span className="text-xs text-slate-500">{term.example}</span>
            </div>

            {relatedArticle && (
              <div className="pt-3 border-t border-slate-100">
                <Button
                  onClick={handleLearnMore}
                  size="sm"
                  variant="outline"
                  className="w-full text-xs bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                >
                  <ExternalLink className="w-3 h-3 mr-1.5" />
                  Approfondisci nella Wiki
                </Button>
              </div>
            )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

