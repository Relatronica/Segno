import React from 'react';
import { useAppStore, ScenarioBlock } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, X, Info, ExternalLink, AlertTriangle, FileText, Shield, Lightbulb } from 'lucide-react';
import { getBlockKnowledge } from '@/modules/city-builder/utils/blockKnowledge';
import { getNoteKnowledge } from '@/modules/city-builder/utils/noteKnowledge';

type PropertyPanelProps = {
  blockId: string | null;
  onClose: () => void;
};

export function PropertyPanel({ blockId, onClose }: PropertyPanelProps) {
  const { scenarioBlocks, updateBlockConfig, removeBlock } = useAppStore();
  
  const block = scenarioBlocks.find(b => b.id === blockId);

  if (!block) return null;

  const handleToggleDataType = (type: string) => {
    const currentTypes = block.config?.dataTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    updateBlockConfig(block.id, { dataTypes: newTypes });
  };

  const handleToggleBool = (field: 'isEncrypted' | 'humanInTheLoop') => {
    updateBlockConfig(block.id, { [field]: !block.config?.[field] });
  };

  const knowledge = (block.type === 'risk' || block.type === 'impact')
    ? getNoteKnowledge(block.label)
    : getBlockKnowledge(block);

  return (
    <div className="absolute right-6 top-6 bottom-6 w-80 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-200">
       <div className="absolute inset-0 bg-gradient-to-bl from-white/50 to-slate-50/30 pointer-events-none"></div>
       
       <div className="relative z-10 flex flex-col h-full">
         <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/50">
           <h3 className="font-bold text-slate-800">{block.label}</h3>
           <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-slate-200/50">
             <X className="h-4 w-4" />
           </Button>
         </div>

         <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Configurazioni specifiche per Tipo */}
            
            {block.type === 'input' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs uppercase text-slate-400 font-bold mb-2 block">Tipi di Dati</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Email', 'Nome/Cognome', 'Biometrici', 'Sanitari', 'Finanziari', 'Geolocalizzazione'].map(type => (
                      <button
                        key={type}
                        onClick={() => handleToggleDataType(type)}
                        className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                          block.config?.dataTypes?.includes(type)
                            ? 'bg-blue-500 text-white border-blue-600 shadow-md shadow-blue-200'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-slate-100">
                  <Label className="cursor-pointer">Dati Cifrati?</Label>
                  <input 
                    type="checkbox" 
                    checked={block.config?.isEncrypted || false}
                    onChange={() => handleToggleBool('isEncrypted')}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {block.type === 'process' && (
              <div className="space-y-4">
                <div>
                  <Label className="text-xs uppercase text-slate-400 font-bold mb-2 block">Modello AI</Label>
                  <select 
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white/80 text-sm"
                    value={block.config?.aiModel || ''}
                    onChange={(e) => updateBlockConfig(block.id, { aiModel: e.target.value })}
                  >
                    <option value="">Seleziona modello...</option>
                    <option value="gpt-4">GPT-4 (OpenAI)</option>
                    <option value="claude-3">Claude 3 (Anthropic)</option>
                    <option value="llama-3">Llama 3 (Meta - Open Source)</option>
                    <option value="custom">Modello Custom Proprietario</option>
                  </select>
                </div>

                 <div className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-slate-100">
                  <Label className="cursor-pointer">Human in the Loop?</Label>
                  <input 
                    type="checkbox" 
                    checked={block.config?.humanInTheLoop || false}
                    onChange={() => handleToggleBool('humanInTheLoop')}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {block.type === 'output' && (
              <div className="space-y-4">
                 <div>
                  <Label className="text-xs uppercase text-slate-400 font-bold mb-2 block">Periodo di Ritenzione</Label>
                  <select 
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white/80 text-sm"
                    value={block.config?.retention || ''}
                    onChange={(e) => updateBlockConfig(block.id, { retention: e.target.value })}
                  >
                    <option value="">Non specificato</option>
                    <option value="immediate">Cancellazione Immediata</option>
                    <option value="30-days">30 Giorni</option>
                    <option value="1-year">1 Anno</option>
                    <option value="indefinite">Indefinito</option>
                  </select>
                </div>
              </div>
            )}

            {block.type === 'storage' && (
              <div className="space-y-4">
                 <div>
                  <Label className="text-xs uppercase text-slate-400 font-bold mb-2 block">Tipologia Hosting</Label>
                  <select 
                    className="w-full p-2 rounded-lg border border-slate-200 bg-white/80 text-sm"
                    defaultValue={block.label.includes('Cloud') ? 'cloud' : 'onprem'}
                  >
                    <option value="cloud">Cloud Provider</option>
                    <option value="onprem">On-Premise / Locale</option>
                    <option value="hybrid">Ibrido</option>
                  </select>
                </div>
                
                {block.label.includes('USA') && (
                   <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                      <p className="text-xs text-amber-700 font-medium">⚠️ Attenzione: Hosting USA</p>
                      <p className="text-[10px] text-amber-600 mt-1">Richiede verifica Data Privacy Framework o SCC.</p>
                   </div>
                )}
              </div>
            )}

            {/* Knowledge Section */}
            {knowledge && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <Label className="text-xs uppercase text-slate-400 font-bold mb-2 block">Guida & Normativa</Label>
                
                {knowledge.simpleExplanation && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-1 text-slate-500">
                      <Info className="h-3 w-3" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">In parole semplici</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {knowledge.simpleExplanation}
                    </p>
                  </div>
                )}

                {knowledge.regulation && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-1 text-slate-500">
                      <Shield className="h-3 w-3" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Normativa {knowledge.regulation.name}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      <span className="font-medium text-slate-900">{knowledge.regulation.article}: </span>
                      {knowledge.regulation.requirement}
                    </p>
                  </div>
                )}

                {knowledge.risk && (
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <div className="flex items-center gap-2 mb-1 text-amber-600">
                      <AlertTriangle className="h-3 w-3" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">Rischi</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      {knowledge.risk}
                    </p>
                  </div>
                )}

                {knowledge.externalLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-2 h-8 border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open(knowledge.externalLink, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3" />
                    Approfondisci
                  </Button>
                )}
              </div>
            )}

            {/* Sezione Generica Debug */}
            <div className="pt-4 border-t border-slate-100">
               <div className="bg-slate-100/50 p-2 rounded text-[10px] text-slate-400 font-mono break-all">
                 ID: {block.id}
               </div>
            </div>
         </div>

         <div className="p-4 border-t border-slate-100 bg-white/50 mt-auto">
           <Button 
             variant="destructive" 
             className="w-full flex items-center gap-2"
             onClick={() => {
               removeBlock(block.id);
               onClose();
             }}
           >
             <Trash2 className="h-4 w-4" /> Elimina Blocco
           </Button>
         </div>
       </div>
    </div>
  );
}

