import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, AlertTriangle, Lightbulb, ExternalLink, Info } from 'lucide-react';
import { ScenarioBlock, useAppStore } from '@/store/useAppStore';
import { buildBlockSummary, TYPE_GUIDE_MAP } from '../utils/info';
import { RiskAssessment } from '@/modules/analysis/utils/calculateRisk';
import { getNoteKnowledge } from '../utils/noteKnowledge';
import { getBlockKnowledge } from '../utils/blockKnowledge';

type CityInsightsPanelProps = {
  mode: 'guide' | 'block' | 'analysis';
  block: ScenarioBlock | null;
  inbound: number;
  outbound: number;
  riskReport: RiskAssessment | null;
  canAnalyze: boolean;
  onCloseBlock: () => void;
  onRequestAnalyze: () => void;
  onBackToGuide: () => void;
};

export function CityInsightsPanel({
  mode,
  block,
  inbound,
  outbound,
  riskReport,
  canAnalyze,
  onCloseBlock,
  onRequestAnalyze,
  onBackToGuide,
}: CityInsightsPanelProps) {
  const { user } = useAppStore();
  const isUserMode = user?.mode === 'use'; // Modalità utente finale
  const summary = buildBlockSummary(block || undefined, isUserMode ? 'user' : 'designer');

  // Don't render panel in guide mode (guide is now in bottom toolbar)
  if (mode === 'guide') {
    return null;
  }

  return (
    <motion.div
      className="fixed top-1/2 -translate-y-1/2 right-6 bg-white/95 backdrop-blur border border-slate-200 shadow-2xl z-40 flex flex-col rounded-lg overflow-hidden"
      style={{ width: 360, height: '80vh' }}
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      }}
    >
      {mode === 'block' && block && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 flex-shrink-0">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-1">
                {TYPE_GUIDE_MAP[block.type].title}
              </p>
              <h3 className="text-2xl font-bold text-slate-800">{block.label}</h3>
              <p className="text-sm text-slate-500 mt-1">{summary?.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onCloseBlock} className="text-slate-500">
              ✕
            </Button>
          </div>

          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Enhanced educational content for all blocks */}
            {(() => {
              // For risk/impact blocks, use note knowledge
              if (block.type === 'risk' || block.type === 'impact') {
              const knowledge = getNoteKnowledge(block.label);
              
              // Se non c'è knowledge, mostra solo il testo generico
              if (!knowledge || !knowledge.simpleExplanation) {
                return (
                  <section>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      Perché conta
                    </p>
                    <p className="text-sm text-slate-700">{summary?.friendly}</p>
                  </section>
                );
              }
              
              // Se c'è knowledge con simpleExplanation, usa quello nella sezione "Perché conta"
              return (
                <>
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Info className="h-3 w-3" />
                      Perché conta
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                        {knowledge.simpleExplanation}
                      </p>
                    </section>

                  {knowledge.question && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        Domanda critica
                      </p>
                      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-3">
                        <p className="text-sm font-semibold text-blue-900 leading-relaxed">
                          {knowledge.question}
                        </p>
                      </div>
                    </section>
                  )}

                  {knowledge.regulation && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        Riferimento normativo
                      </p>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Shield className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-800">{knowledge.regulation.name}</p>
                            <p className="text-xs text-slate-600">{knowledge.regulation.article}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed mt-2">
                          {knowledge.regulation.requirement}
                        </p>
                      </div>
                    </section>
                  )}

                  {knowledge.bestPractice && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Lightbulb className="h-3 w-3" />
                        Best practice
                      </p>
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                        <p className="text-xs text-emerald-900 leading-relaxed">
                          {knowledge.bestPractice}
                        </p>
                      </div>
                    </section>
                  )}

                  {knowledge.risk && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Cosa potrebbe andare storto
                      </p>
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                        <p className="text-xs text-amber-900 leading-relaxed">
                          {knowledge.risk}
                        </p>
                      </div>
                    </section>
                  )}

                  {knowledge.example && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Esempio concreto
                      </p>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          {knowledge.example}
                        </p>
                      </div>
                    </section>
                  )}

                  {knowledge.whatYouCanDo && knowledge.whatYouCanDo.length > 0 && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Lightbulb className="h-3 w-3" />
                        Cosa puoi fare
                      </p>
                      <div className="space-y-2">
                        {knowledge.whatYouCanDo.map((action, idx) => (
                          <div key={idx} className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-xs text-emerald-900 leading-relaxed">{action}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {knowledge.redFlags && knowledge.redFlags.length > 0 && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        Segnali di allarme
                      </p>
                      <div className="space-y-2">
                        {knowledge.redFlags.map((flag, idx) => (
                          <div key={idx} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs text-amber-900 leading-relaxed">{flag}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {knowledge.externalLink && (
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full gap-2 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => window.open(knowledge.externalLink, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Approfondisci (Link esterno)
                      </Button>
                    </div>
                  )}
                </>
              );
              }

              // For main blocks (input, process, storage, output), use block knowledge
              const blockKnowledge = getBlockKnowledge(block, isUserMode ? 'use' : 'design');
              
              // Se non c'è blockKnowledge, mostra solo il testo generico
              if (!blockKnowledge) {
                return (
                  <section>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      Perché conta
                    </p>
                    <p className="text-sm text-slate-700">{summary?.friendly}</p>
                  </section>
                );
              }

              // Se c'è blockKnowledge con simpleExplanation, usa quello nella sezione "Perché conta"
              return (
                <>
                  {blockKnowledge.simpleExplanation && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Info className="h-3 w-3" />
                        Perché conta
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                        {blockKnowledge.simpleExplanation}
                      </p>
                    </section>
                  )}

                  {blockKnowledge.question && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        Domanda critica
                      </p>
                      <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-3">
                        <p className="text-sm font-semibold text-blue-900 leading-relaxed">
                          {blockKnowledge.question}
                        </p>
                      </div>
                    </section>
                  )}

                  {blockKnowledge.regulation && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        Riferimento normativo
                      </p>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Shield className="h-4 w-4 text-slate-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-slate-800">{blockKnowledge.regulation.name}</p>
                            <p className="text-xs text-slate-600">{blockKnowledge.regulation.article}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed mt-2">
                          {blockKnowledge.regulation.requirement}
                        </p>
                      </div>
                    </section>
                  )}

                  {blockKnowledge.bestPractice && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Lightbulb className="h-3 w-3" />
                        Best practice
                      </p>
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                        <p className="text-xs text-emerald-900 leading-relaxed">
                          {blockKnowledge.bestPractice}
                        </p>
                      </div>
                    </section>
                  )}

                  {blockKnowledge.risk && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Cosa potrebbe andare storto
                      </p>
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                        <p className="text-xs text-amber-900 leading-relaxed">
                          {blockKnowledge.risk}
                        </p>
                      </div>
                    </section>
                  )}

                  {blockKnowledge.example && (
                    <section className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        Esempio concreto
                </p>
                      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-700 leading-relaxed italic">
                          {blockKnowledge.example}
                        </p>
              </div>
                    </section>
                  )}

                  {isUserMode && blockKnowledge.whatYouCanDo && blockKnowledge.whatYouCanDo.length > 0 && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Lightbulb className="h-3 w-3" />
                        Cosa puoi fare
                      </p>
                      <div className="space-y-2">
                        {blockKnowledge.whatYouCanDo.map((action, idx) => (
                          <div key={idx} className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-xs text-emerald-900 leading-relaxed">{action}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {isUserMode && blockKnowledge.redFlags && blockKnowledge.redFlags.length > 0 && (
                    <section className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3" />
                        Segnali di allarme
                      </p>
                      <div className="space-y-2">
                        {blockKnowledge.redFlags.map((flag, idx) => (
                          <div key={idx} className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                            <p className="text-xs text-amber-900 leading-relaxed">{flag}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {blockKnowledge.externalLink && (
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        className="w-full gap-2 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => window.open(blockKnowledge.externalLink, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Approfondisci (Link esterno)
                      </Button>
              </div>
                  )}
                </>
              );
            })()}

            {summary?.hints && summary.hints.length > 0 && (
            <section className="space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                Punti da ricordare
              </p>
                {summary.hints.map((hint) => (
                <div
                  key={hint.label}
                  className={`rounded-lg border p-3 text-sm ${
                    hint.tone === 'warning'
                      ? 'border-amber-300 bg-amber-50 text-amber-800'
                      : hint.tone === 'positive'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <p className="font-semibold">{hint.label}</p>
                  <p className="text-xs leading-snug">{hint.detail}</p>
                </div>
              ))}
            </section>
            )}
          </div>
        </div>
      )}
      {mode === 'analysis' && riskReport && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 flex-shrink-0">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-1">Analisi rischi</p>
              <h3 className="text-2xl font-bold text-slate-800">Indice complessivo</h3>
              <p className="text-sm text-slate-500">
                Punteggio {riskReport.score}/100 – livello {riskReport.level.toUpperCase()}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onBackToGuide} className="text-slate-500">
              ✕
            </Button>
          </div>
          <div className="p-5 space-y-4 overflow-y-auto flex-1">
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Score
              </p>
              <p className="text-4xl font-bold text-slate-900">{riskReport.score}</p>
              <p className="text-xs text-slate-500">0 = rischio minimo, 100 = rischio massimo</p>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Rilievi principali
              </p>
              {riskReport.findings.length === 0 && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                  Nessuna criticità rilevata sulle regole disponibili.
                </div>
              )}
              {riskReport.findings.map((finding) => (
                <div
                  key={finding.rule.id}
                  className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest">
                    <span>{finding.rule.regulation}</span>
                    <span>{finding.rule.article}</span>
                  </div>
                  <p className="font-semibold text-slate-900">{finding.rule.description}</p>
                  <p className="text-xs italic text-slate-500">"{finding.context}"</p>
                  {finding.rule.mitigation && (
                    <p className="text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded px-2 py-1">
                      Mitigazione: {finding.rule.mitigation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Button
              onClick={onBackToGuide}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow"
            >
              Torna alla guida
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

