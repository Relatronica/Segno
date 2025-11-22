import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CITY_ACTION_GROUPS, CITY_ACTION_GROUPS_USER, CityActionGroup } from '../utils/cityBlueprints';
import { useAppStore } from '@/store/useAppStore';
import Image from 'next/image';
import { FileInput, Heart, Brain, Camera, Sparkles, Server, Zap, Shield, AlertTriangle, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useQuestionTranslations } from '@/lib/i18n/translateQuestions';

type CityToolbarProps = {
  onAction: (key: string) => void;
  selectedBlueprints: Set<string>;
};

// Icons for each question category - unique icons for each of the 9 questions
const QUESTION_ICONS = [
  FileInput,      // 1. Che tipo di informazioni raccogli?
  Heart,          // 2. Raccogli dati sanitari o finanziari?
  Brain,          // 3. Come analizzi queste informazioni?
  Camera,         // 4. Analizzi immagini, video o audio?
  Sparkles,       // 5. Il sistema suggerisce o rileva anomalie?
  Server,         // 6. Dove conservi i dati?
  Zap,            // 7. Come vengono utilizzati i risultati?
  Shield,         // 8. Come proteggi i dati e chi può accedervi?
  AlertTriangle,  // 9. Quali controlli e impatti vuoi monitorare?
];

export function CityToolbar({ onAction, selectedBlueprints }: CityToolbarProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<CityActionGroup | null>(null);
  const { user } = useAppStore();
  const t = useTranslations();
  const { translateQuestionGroup, translateQuestionLabel } = useQuestionTranslations();
  
  // Usa domande diverse in base alla modalità: 'use' = utenti finali, 'design' = progettisti
  const rawActionGroups = user?.mode === 'use' ? CITY_ACTION_GROUPS_USER : CITY_ACTION_GROUPS;
  
  // Translate all question groups
  const actionGroups = useMemo(() => 
    rawActionGroups.map(group => translateQuestionGroup(group)),
    [rawActionGroups, translateQuestionGroup]
  );

  return (
    <motion.div
      className="fixed left-6 top-6 bottom-6 z-40 flex gap-3 items-center"
      animate={{
        width: selectedQuestion ? '640px' : '256px', // 256px (w-64) + 384px expansion
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Main Sidebar */}
      <Card className="w-64 bg-white/95 backdrop-blur shadow-2xl border-slate-200 flex flex-col py-0 flex-shrink-0">
      <div className="px-8 py-8 bg-slate-50 border-b border-slate-200 rounded-t-xl">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image src="/segno_logo.png" alt="Segno" fill className="object-contain" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-[0.15em] uppercase leading-tight">SEGNO</h2>
          </div>
        </div>
        <p className="text-xs text-slate-500 font-semibold uppercase tracking-[0.2em] leading-tight">
          {t.cityBuilder.buildScenario}
        </p>
        <p className="text-xs text-slate-500 mt-1.5 leading-tight">
          {t.cityBuilder.selectQuestion}
        </p>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <div className="grid grid-cols-2 gap-2">
          {actionGroups.map((group, groupIndex) => {
            const hasSelected = group.actions.some(action => selectedBlueprints.has(action.key));
            const selectedCount = group.actions.filter(a => selectedBlueprints.has(a.key)).length;
            const isActive = selectedQuestion?.label === group.label;
            const QuestionIcon = QUESTION_ICONS[groupIndex] || AlertTriangle;
            
            return (
              <button
                key={group.label}
                onClick={() => setSelectedQuestion(isActive ? null : group)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all group relative ${
                  hasSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${
                    hasSelected 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}>
                    <QuestionIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <h3 className={`text-xs font-bold leading-tight mb-1 ${
                      hasSelected ? 'text-blue-700' : 'text-slate-800 group-hover:text-blue-700'
                    }`}>
                      {group.label}
                    </h3>
                    <div className="flex items-center justify-center gap-1">
                      {hasSelected ? (
                        Array.from({ length: Math.min(selectedCount, 5) }).map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-blue-600"
                          />
                        ))
                      ) : (
                        Array.from({ length: Math.min(group.actions.length, 5) }).map((_, i) => (
                          <div
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-slate-300"
                          />
                        ))
                      )}
                      {(hasSelected ? selectedCount : group.actions.length) > 5 && (
                        <span className="text-[8px] text-slate-400 ml-0.5">
                          +{(hasSelected ? selectedCount : group.actions.length) - 5}
                        </span>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      </Card>

      {/* Expanded Actions Panel */}
      <AnimatePresence>
        {selectedQuestion && (
          <motion.div
            initial={{ opacity: 0, x: -20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: '384px' }}
            exit={{ opacity: 0, x: -20, width: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white/95 backdrop-blur shadow-2xl border border-slate-200 rounded-xl flex flex-col overflow-hidden flex-shrink-0 self-center"
            style={{ maxHeight: 'calc(100vh - 48px)' }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-slate-800">
                  {selectedQuestion.label}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {t.cityBuilder.chooseAnswer}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedQuestion(null)}
                className="h-8 w-8 text-slate-500 hover:text-slate-700 ml-4 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="space-y-2">
                {selectedQuestion.actions.map((action) => {
                  const isSelected = selectedBlueprints.has(action.key);
                  return (
                    <button
                      key={action.key}
                      onClick={() => {
                        onAction(action.key);
                      }}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all group ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm'
                      }`}
                    >
                      <div className={`text-xs font-semibold mb-1 ${
                        isSelected ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-700'
                      }`}>
                        {action.title}
                      </div>
                      <p className={`text-[10px] leading-tight ${
                        isSelected ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-600'
                      }`}>
                        {action.description}
                      </p>
                      {isSelected && (
                        <div className="mt-1.5 text-[10px] text-blue-600 font-medium">
                          ✓ {t.common.selected}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
              <p className="text-xs text-slate-500">
                {selectedQuestion.actions.filter(a => selectedBlueprints.has(a.key)).length} {t.common.of} {selectedQuestion.actions.length} {t.common.selectedLower}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
