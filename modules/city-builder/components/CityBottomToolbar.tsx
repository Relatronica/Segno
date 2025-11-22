'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, BookOpen, ChevronUp, ChevronDown, ArrowRight, X, Eye, EyeOff, Newspaper, Save, Upload } from 'lucide-react';
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { useAppStore } from '@/store/useAppStore';
import { saveBoardToFile, loadBoardFromFile, isValidSegnoFile } from '../utils/boardStorage';

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

  const handleSave = () => {
    try {
      saveBoardToFile(scenarioBlocks, connections, user);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Errore nel salvataggio della board');
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
        alert('Il file selezionato non è un file Segno valido. Per favore seleziona un file .segno');
        return;
      }

      // Carica e decifra il file
      const boardData = await loadBoardFromFile(file);

      // Chiedi conferma se ci sono dati nella board corrente
      if (scenarioBlocks.length > 0 || connections.length > 0) {
        const confirmLoad = confirm(
          'Caricando un file, i dati attuali verranno sostituiti. Vuoi continuare?'
        );
        if (!confirmLoad) return;
      }

      // Carica i dati nello store
      loadBoard({
        user: boardData.user,
        scenarioBlocks: boardData.scenarioBlocks,
        connections: boardData.connections,
      });

      alert('Board caricata con successo!');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Errore nel caricamento del file');
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
              <h3 className="text-lg font-semibold text-slate-800">Guida rapida</h3>
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
                <h4 className="text-base font-semibold text-slate-800 mb-2">Come iniziare</h4>
                <ol className="text-sm text-slate-600 space-y-2 list-decimal list-inside">
                  <li>Guarda la <strong>barra laterale a sinistra</strong>: contiene 9 domande chiave</li>
                  <li>Seleziona una domanda (es. "Che tipo di informazioni raccogli?")</li>
                  <li>Scegli una o più risposte dalla lista che appare</li>
                  <li>I blocchi vengono aggiunti automaticamente alla mappa</li>
                </ol>
              </div>

              {/* Come usare la mappa */}
              <div>
                <h4 className="text-base font-semibold text-slate-800 mb-2">Come leggere la mappa</h4>
                <p className="text-sm text-slate-600 mb-2">
                  La mappa mostra come i dati si muovono nel tuo sistema, da sinistra a destra:
                </p>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside mb-3">
                  <li><strong>Sinistra</strong>: da dove arrivano i dati (input)</li>
                  <li><strong>Centro</strong>: come vengono elaborati (processo AI) e dove vengono conservati (storage)</li>
                  <li><strong>Destra</strong>: cosa vede l'utente finale (output)</li>
                </ul>
                <p className="text-sm text-slate-600 mb-3">
                  <strong>Clicca su qualsiasi blocco</strong> per vedere una spiegazione semplice, cosa dice la legge, e cosa potresti rischiare.
                </p>
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700 leading-snug">
                  💡 <strong>Suggerimento:</strong> le note colorate accanto ai blocchi mostrano controlli e rischi. Cliccaci sopra per approfondire.
                </div>
              </div>

              {/* Disclaimer e Crediti */}
              <div className="pt-4 border-t border-slate-200">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 mb-3">
                  <p className="text-xs text-amber-800 leading-snug">
                    <strong>⚠️ Disclaimer:</strong> Questo strumento ha finalità di consapevolezza, formative e di supporto informativo. 
                    Non deve essere inteso come sostituto di una consulenza legale, tecnica o professionale specializzata. 
                    Per valutazioni approfondite e assistenza specifica, è consigliabile rivolgersi a consulenti qualificati.
                  </p>
                </div>
                <div className="text-xs text-slate-500 text-center">
                  <p>Strumento sviluppato da</p>
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
          <span className="text-sm font-medium">Guida rapida</span>
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
              <span className="text-sm font-medium">Nascondi note</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">Mostra note</span>
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
          <span className="text-sm font-medium">News</span>
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
            title="Salva la board in un file protetto"
          >
            <Save className="h-4 w-4" />
            <span className="text-sm font-medium">Salva</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLoad}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
            title="Carica una board da file"
          >
            <Upload className="h-4 w-4" />
            <span className="text-sm font-medium">Carica</span>
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
          Analizza Rischi <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

