'use client';

import { useAppStore } from '@/store/useAppStore';
import { calculateRisk } from './utils/calculateRisk';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { RotateCcw, AlertTriangle, Scale, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { RegulationLink } from './components/RegulationLink';

export function AnalysisModule() {
  const { scenarioBlocks, connections, setStep, user } = useAppStore();
  const risk = calculateRisk(scenarioBlocks, connections);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-green-600 bg-green-100 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="relative w-10 h-10">
                  <Image 
                    src="/segno_logo.png" 
                    alt="Segno" 
                    fill 
                    className="object-contain"
                  />
               </div>
               <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                 Analisi di Conformità
               </h1>
            </div>
            <p className="text-slate-500 ml-14">Report legale generato per lo scenario di <strong>{user?.name}</strong></p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setStep('builder')}>
              <RotateCcw className="mr-2 h-4 w-4" /> Modifica Scenario
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="mr-2 h-4 w-4" /> Esporta PDF
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          
          {/* Risk Score Card */}
          <Card className="md:col-span-1 overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1 h-full ${risk.level === 'critical' ? 'bg-red-500' : risk.level === 'high' ? 'bg-orange-500' : risk.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Indice di Rischio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold ${risk.level === 'critical' ? 'text-red-600' : risk.level === 'high' ? 'text-orange-600' : risk.level === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {risk.score}/100
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1 capitalize font-medium">Livello: {risk.level}</p>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Elementi Analizzati</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {scenarioBlocks.map((block) => (
                    <span key={block.id} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${block.type === 'input' ? 'bg-blue-400' : block.type === 'process' ? 'bg-purple-400' : block.type === 'storage' ? 'bg-violet-400' : block.type === 'output' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {block.label}
                    </span>
                  ))}
                  {connections.length > 0 && (
                     <span className="px-3 py-1 bg-slate-50 rounded-lg text-xs text-slate-400 border border-slate-100 dashed border-dashed">
                      {connections.length} Connessioni
                    </span>
                  )}
                </div>
                {risk.summary && (
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                    <p>📊 Analizzati <strong>{risk.summary.totalBlocks}</strong> blocchi e <strong>{risk.summary.totalConnections}</strong> connessioni</p>
                    <p>{risk.summary.violationsCount > 0 ? (
                      <>⚠️ Rilevate <strong className="text-red-600">{risk.summary.violationsCount}</strong> violazioni normative</>
                    ) : (
                      <>✅ Nessuna violazione rilevata</>
                    )}</p>
                    {risk.summary.mitigationsCount > 0 && (
                      <p>🛡️ Implementate <strong className="text-blue-600">{risk.summary.mitigationsCount}</strong> mitigazioni (cifratura, supervisione umana)</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Rilievi Normativi
          </h2>

          {risk.error ? (
             <Card className="border-l-4 border-l-red-500 bg-red-50/50">
               <CardContent className="p-6 flex items-center gap-4">
                 <AlertTriangle className="h-8 w-8 text-red-600" />
                 <div>
                   <h3 className="font-bold text-red-800">Errore nell'analisi</h3>
                   <p className="text-red-700 text-sm">{risk.error}</p>
                   <p className="text-red-600 text-xs mt-2">Verifica che tutti i blocchi siano configurati correttamente e riprova.</p>
                 </div>
               </CardContent>
             </Card>
          ) : risk.findings.length === 0 ? (
             <Card className="border-l-4 border-l-green-500 bg-green-50/50">
               <CardContent className="p-6 flex items-center gap-4">
                 <CheckCircle2 className="h-8 w-8 text-green-600" />
                 <div>
                   <h3 className="font-bold text-green-800">Nessuna criticità rilevata</h3>
                   <p className="text-green-700 text-sm">Lo scenario sembra conforme alle regole normative analizzate. Verifica comunque di aver implementato tutte le best practices richieste.</p>
                 </div>
               </CardContent>
             </Card>
          ) : (
            risk.findings.map((finding, index) => (
              <motion.div
                key={finding.rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`border-l-4 shadow-sm hover:shadow-md transition-shadow ${
                  finding.rule.severity === 'prohibited' ? 'border-l-red-600' :
                  finding.rule.severity === 'high_risk' ? 'border-l-orange-500' :
                  finding.rule.severity === 'obligation' ? 'border-l-blue-500' : 'border-l-green-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white ${
                           finding.rule.regulation === 'AI_ACT' ? 'bg-blue-600' : 'bg-purple-600'
                        }`}>
                          {finding.rule.regulation.replace('_', ' ')}
                        </span>
                        <RegulationLink 
                          regulation={finding.rule.regulation} 
                          article={finding.rule.article} 
                        />
                      </div>
                      {finding.rule.severity === 'prohibited' && (
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">
                          ⚠️ PRATICA VIETATA
                        </span>
                      )}
                       {finding.rule.severity === 'high_risk' && (
                        <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100">
                          🔴 ALTO RISCHIO
                        </span>
                      )}
                      {finding.rule.severity === 'obligation' && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100">
                          📋 OBBLIGO LEGALE
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Spiegazione Divulgativa */}
                      {finding.rule.simpleExplanation && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-amber-600 font-bold">💡 In parole semplici:</span>
                          </div>
                          <p className="text-sm text-amber-900 leading-relaxed">
                            {finding.rule.simpleExplanation}
                          </p>
                        </div>
                      )}

                      {/* Descrizione Normativa */}
                      <div>
                        <h3 className="font-bold text-slate-800 mb-2 text-base">Cosa dice la norma:</h3>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {finding.rule.description}
                        </p>
                      </div>

                      {/* Context Specifico */}
                      <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                        <p className="text-sm text-slate-700 italic leading-relaxed">
                          {finding.context}
                        </p>
                      </div>

                      {/* Blocchi Coinvolti */}
                      {finding.affectedBlocks && finding.affectedBlocks.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
                          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            Blocchi coinvolti:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {finding.affectedBlocks.map((block) => (
                              <span 
                                key={block.id} 
                                className="px-2 py-1 bg-white rounded text-xs font-medium text-slate-700 border border-slate-200"
                              >
                                {block.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mitigazione */}
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Cosa fare:
                        </h4>
                        <p className="text-sm text-blue-900 leading-relaxed mb-2">
                          {finding.rule.mitigationSimple || finding.rule.mitigation || "Nessuna azione specifica indicata."}
                        </p>
                        {finding.rule.mitigationSimple && finding.rule.mitigation && finding.rule.mitigation !== finding.rule.mitigationSimple && (
                          <details className="mt-2">
                            <summary className="text-xs text-blue-700 cursor-pointer hover:text-blue-900 font-medium">
                              Dettagli tecnici
                            </summary>
                            <p className="text-xs text-blue-800 mt-2 leading-relaxed">
                              {finding.rule.mitigation}
                            </p>
                          </details>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
