'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityActionGroup } from '../utils/cityBlueprints';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useQuestionTranslations } from '@/lib/i18n/translateQuestions';

type QuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  question: CityActionGroup;
  selectedBlueprints: Set<string>;
  onAction: (key: string) => void;
};

export function QuestionModal({
  isOpen,
  onClose,
  question,
  selectedBlueprints,
  onAction,
}: QuestionModalProps) {
  const t = useTranslations();
  const { translateQuestionGroup } = useQuestionTranslations();
  const translatedQuestion = translateQuestionGroup(question);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] bg-white rounded-xl shadow-2xl z-[101] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {translatedQuestion.label.replace('DOMANDA: ', '')}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {t.common.chooseOneOrMore}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-slate-500 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="grid grid-cols-1 gap-3">
                {translatedQuestion.actions.map((action) => {
                  const isSelected = selectedBlueprints.has(action.key);
                  return (
                    <button
                      key={action.key}
                      onClick={() => {
                        onAction(action.key);
                      }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all group ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm'
                      }`}
                    >
                      <div className={`text-sm font-semibold mb-2 ${
                        isSelected ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-700'
                      }`}>
                        {action.title}
                      </div>
                      <p className={`text-xs leading-relaxed ${
                        isSelected ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-600'
                      }`}>
                        {action.description}
                      </p>
                      {isSelected && (
                        <div className="mt-2 text-xs text-blue-600 font-medium">
                          ✓ {t.common.selected}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                {question.actions.filter(a => selectedBlueprints.has(a.key)).length} {t.common.of} {question.actions.length} {t.common.selectedLower}
              </p>
              <Button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {t.common.close}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

