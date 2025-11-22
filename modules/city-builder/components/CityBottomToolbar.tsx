'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, BookOpen, ChevronUp, ChevronDown, ArrowRight, X, Eye, EyeOff, Newspaper, Save, Upload } from 'lucide-react';
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { useAppStore } from '@/store/useAppStore';
import { saveBoardToFile, loadBoardFromFile, isValidSegnoFile } from '../utils/boardStorage';
import { useTranslations } from '@/lib/i18n/useTranslations';

type CityBottomToolbarProps = {
  transformRef: React.RefObject<ReactZoomPanPinchContentRef | null>;
  onRequestAnalyze: () => void;
  canAnalyze: boolean;
  showNotes: boolean;
  onToggleNotes: () => void;
  isNewsPanelOpen: boolean;
  onToggleNews: () => void;
};

export function CityBottomToolbar({ transformRef, onRequestAnalyze, canAnalyze, showNotes, onToggleNotes, isNewsPanelOpen, onToggleNews }: CityBottomToolbarProps) {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scenarioBlocks, connections, user, loadBoard } = useAppStore();
  const t = useTranslations();

  const handleSave = () => {
    try {
      saveBoardToFile(scenarioBlocks, connections, user);
    } catch (error) {
      alert(error instanceof Error ? error.message : t.cityBuilder.saveError);
    }
  };

  const handleLoad = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input per permettere di ricaricare lo stesso file
    e.target.value = '';

    try {
      // Valida file
      if (!isValidSegnoFile(file)) {
        alert(t.cityBuilder.invalidFile);
        return;
      }

      // Carica e decifra il file
      const boardData = await loadBoardFromFile(file);

      // Chiedi conferma se ci sono dati nella board corrente
      if (scenarioBlocks.length > 0 || connections.length > 0) {
        const confirmLoad = confirm(t.cityBuilder.confirmLoad);
        if (!confirmLoad) return;
      }

      // Carica i dati nello store
      loadBoard({
        user: boardData.user,
        scenarioBlocks: boardData.scenarioBlocks,
        connections: boardData.connections,
      });

      alert(t.cityBuilder.loadSuccess);
    } catch (error) {
      alert(error instanceof Error ? error.message : t.cityBuilder.loadError);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
      {/* Expandable Guide Panel - Opens above toolbar */}
      <AnimatePresence mode="wait">
        {isGuideOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 35,
              mass: 0.8
            }}
            style={{ 
              willChange: 'transform, opacity',
              transformOrigin: 'top center'
            }}
            className="bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-xl p-6 w-full max-w-2xl mb-2"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">{t.cityBuilder.guideTitle}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsGuideOpen(false)}
                className="h-6 w-6 text-slate-500 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {/* Come iniziare */}
              <div>
                <h4 className="text-base font-semibold text-slate-800 mb-2">{t.cityBuilder.howToStart}</h4>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>{t.cityBuilder.howToStartStep1}</li>
                  <li>{t.cityBuilder.howToStartStep2}</li>
                  <li>{t.cityBuilder.howToStartStep3}</li>
                  <li>{t.cityBuilder.howToStartStep4}</li>
                </ol>
              </div>

              {/* Come usare la mappa */}
              <div>
                <h4 className="text-base font-semibold text-slate-800 mb-2">{t.cityBuilder.howToReadMap}</h4>
                <p className="text-sm text-slate-600 mb-2">
                  {t.cityBuilder.howToReadMapDesc}
                </p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside mb-3">
                  <li><strong>{t.cityBuilder.mapLeft}</strong></li>
                  <li><strong>{t.cityBuilder.mapCenter}</strong></li>
                  <li><strong>{t.cityBuilder.mapRight}</strong></li>
                </ul>
                <p className="text-sm text-slate-600 mb-3">
                  <strong>{t.cityBuilder.clickBlock}</strong>
                </p>
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700 leading-snug">
                  {t.cityBuilder.notesTip}
                </div>
              </div>

              {/* Disclaimer e Crediti */}
              <div className="pt-4 border-t border-slate-200">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
                  <p className="text-xs text-amber-800 leading-snug">
                    <strong>⚠️ {t.cityBuilder.disclaimer}</strong> {t.cityBuilder.disclaimerText}
                  </p>
                </div>
                <div className="text-xs text-slate-500 text-center">
                  <p>{t.cityBuilder.developedBy}</p>
                  <p className="mt-1">
                    <a 
                      href="https://relatronica.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-semibold text-slate-700 hover:text-slate-900 underline"
                    >
                      Studio Relatronica
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toolbar */}
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur border border-slate-200 rounded-xl shadow-xl px-4 py-2">
        {/* Guide Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
        >
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">{t.cityBuilder.quickGuide}</span>
          {isGuideOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => transformRef.current?.zoomIn()}
            className="h-8 w-8 text-slate-600 hover:text-slate-900"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => transformRef.current?.zoomOut()}
            className="h-8 w-8 text-slate-600 hover:text-slate-900"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => transformRef.current?.resetTransform()}
            className="h-8 w-8 text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Toggle Notes Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleNotes}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
        >
          {showNotes ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span className="text-sm font-medium">{t.cityBuilder.hideNotes}</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">{t.cityBuilder.showNotes}</span>
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* News Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleNews}
            className={`flex items-center gap-2 ${isNewsPanelOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-700 hover:text-slate-900'}`}
          >
          <Newspaper className="h-4 w-4" />
          <span className="text-sm font-medium">{t.cityBuilder.news}</span>
        </Button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Save/Load Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
            title={t.cityBuilder.saveTitle}
          >
            <Save className="h-4 w-4" />
            <span className="text-sm font-medium">{t.cityBuilder.save}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLoad}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
            title={t.cityBuilder.loadTitle}
          >
            <Upload className="h-4 w-4" />
            <span className="text-sm font-medium">{t.cityBuilder.load}</span>
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".segno"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* Analyze Button */}
        <Button
          onClick={onRequestAnalyze}
          disabled={!canAnalyze}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t.cityBuilder.analyzeRisks} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

