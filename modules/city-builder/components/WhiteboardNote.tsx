import { motion } from 'framer-motion';
import { ScenarioBlock } from '@/store/useAppStore';
import { getStageTheme } from '../utils/flowchartTheme';
import { Info } from 'lucide-react';
import { getNoteQuestion } from '../utils/noteKnowledge';

type WhiteboardNoteProps = {
  block: ScenarioBlock;
  position: { x: number; y: number };
  onClick?: () => void;
  selectedBlockId: string | null;
};

const getNoteIcon = (block: ScenarioBlock) => {
  // Use the icon from the stage theme to match the sidebar
  const stageTheme = getStageTheme(block);
  return stageTheme.icon;
};

export function WhiteboardNote({ block, position, onClick, selectedBlockId }: WhiteboardNoteProps) {
  const stageTheme = getStageTheme(block);
  const NoteIcon = getNoteIcon(block);
  const isRisk = block.type === 'risk';
  const isImpact = block.type === 'impact';
  const criticalQuestion = getNoteQuestion(block.label, block.type as 'risk' | 'impact');
  
  // Reduce opacity for non-selected notes when a block is selected
  const hasSelection = selectedBlockId !== null;
  const isSelected = selectedBlockId === block.id;
  const finalOpacity = hasSelection && !isSelected ? 0.35 : 1;

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: finalOpacity, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="absolute cursor-pointer group"
      style={{
        left: position.x,
        top: position.y,
        zIndex: isSelected ? 16 : 15,
      }}
      title={criticalQuestion} // Tooltip on hover
    >
      <div
        className="relative p-1.5 shadow-lg border-2 transition-all duration-200 group-hover:shadow-xl group-hover:scale-105"
        style={{
          backgroundColor: isRisk ? '#FEF3C7' : isImpact ? '#FCE7F3' : '#E0F2FE',
          borderColor: isRisk ? '#FCD34D' : isImpact ? '#F472B6' : '#0EA5E9',
          minWidth: '100px',
          maxWidth: '110px',
          borderRadius: '4px',
        }}
      >
        {/* Note pin/tape effect */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-2 opacity-60"
          style={{
            backgroundColor: isRisk ? '#FCD34D' : isImpact ? '#F472B6' : '#0EA5E9',
            borderRadius: '2px',
          }}
        />
        
        <div className="flex items-start gap-1">
          <div
            className="p-0.5 rounded-md flex-shrink-0"
            style={{
              backgroundColor: isRisk ? '#FCD34D' : isImpact ? '#F472B6' : '#0EA5E9',
              color: 'white',
            }}
          >
            <NoteIcon className="h-2.5 w-2.5" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div
              className="text-[9px] font-semibold leading-tight"
              style={{ color: stageTheme.accent }}
            >
              {block.label}
            </div>
            {/* Critical question - shown in note to prompt reflection */}
            <div className="text-[7px] text-slate-600 mt-0.5 leading-tight line-clamp-2 italic">
              {criticalQuestion}
            </div>
            {block.config?.dataTypes && (
              <div className="text-[7px] text-slate-500 mt-0.5 line-clamp-1">
                {Array.isArray(block.config.dataTypes) 
                  ? block.config.dataTypes.join(', ')
                  : block.config.dataTypes}
              </div>
            )}
          </div>
        </div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)',
            borderRadius: '4px',
          }}
        />
      </div>
    </motion.div>
  );
}

