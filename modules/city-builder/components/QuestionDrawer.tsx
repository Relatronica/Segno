'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CityActionGroup } from '../utils/cityBlueprints';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useQuestionTranslations } from '@/lib/i18n/translateQuestions';

type QuestionDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  question: CityActionGroup;
  selectedBlueprints: Set<string>;
  onAction: (key: string) => void;
};

export function QuestionDrawer({
  isOpen,
  onClose,
  question,
  selectedBlueprints,
  onAction,
}: QuestionDrawerProps) {
  const t = useTranslations();
  const { translateQuestionGroup, translateQuestionLabel } = useQuestionTranslations();
  
  // Translate the question group
  const translatedQuestion = translateQuestionGroup(question);
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Light backdrop - only if needed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[100]"
            onClick={onClose}
          />

          {/* Floating Drawer - Extension of sidebar */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-[280px] top-6 bottom-6 w-80 bg-white/95 backdrop-blur shadow-xl z-[101] flex flex-col overflow-hidden rounded-xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-800">
                  {translatedQuestion.label}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {t.common.chooseOneOrMore}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-slate-500 hover:text-slate-700 ml-4 flex-shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="space-y-3">
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
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
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

