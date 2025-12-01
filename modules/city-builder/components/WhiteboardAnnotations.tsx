import { memo } from 'react';
import { CITY_THEME } from '../utils/cityMappings';
import type { FlowStageKey } from '../utils/flowchartTheme';
import { getStageThemeByKey } from '../utils/flowchartTheme';
import { useAppStore } from '@/store/useAppStore';
import type { PositionedBlock } from '../utils/layout';

type WhiteboardAnnotationsProps = {
  width: number;
  height: number;
  visibleBlocks: PositionedBlock[]; // Blocks to check which columns have content
};

const stageOrder = [...CITY_THEME.layout.categoryOrder] as FlowStageKey[];

// Filter out only risk column (mostrato come note). Impact è una colonna vera.
const visibleStages = stageOrder.filter((key) => key !== 'risk') as FlowStageKey[];

export const WhiteboardAnnotations = memo(function WhiteboardAnnotations({
  width,
  height,
  visibleBlocks,
}: WhiteboardAnnotationsProps) {
  const paddingX = CITY_THEME.layout.paddingX;
  const gapX = CITY_THEME.layout.clusterGapX;
  const baseCenter = paddingX + CITY_THEME.blockDimensions.width / 2;

  // Determine which columns have blocks
  const columnsWithBlocks = new Set<FlowStageKey>();
  visibleBlocks.forEach(({ block }) => {
    const blockType = block.type;
    // Include tutte le categorie principali che hanno una colonna (input, process, storage, output, impact)
    if (
      (blockType === 'input' ||
        blockType === 'process' ||
        blockType === 'storage' ||
        blockType === 'output' ||
        blockType === 'impact') &&
      visibleStages.includes(blockType as FlowStageKey)
    ) {
      columnsWithBlocks.add(blockType as FlowStageKey);
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      {/* Text annotations for each stage column - only show if column has blocks */}
      {visibleStages.map((stageKey) => {
        // Only show annotation if this column has blocks
        if (!columnsWithBlocks.has(stageKey)) {
          return null;
        }
        
        const locale = useAppStore.getState().locale;
        const stage = getStageThemeByKey(stageKey, locale);
        // Allinea il titolo alla stessa colonna usata dal layout (basato su categoryOrder)
        const columnIndex = stageOrder.indexOf(stageKey);
        const columnCenter = baseCenter + columnIndex * gapX;

        return (
          <div
            key={stageKey}
            className="absolute top-8"
            style={{
              left: columnCenter - 140,
              width: '280px',
            }}
          >
            <div
              className="text-center px-4 py-3 rounded-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: `1.5px solid ${stage.accent}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}
            >
              <div
                className="text-base font-bold mb-1.5"
                style={{ color: stage.accent }}
              >
                {stage.title}
              </div>
              <div className="text-xs font-medium text-slate-700 mb-2 leading-tight">
                {stage.subtitle}
              </div>
              {stage.description && (
                <div className="text-[10px] text-slate-600 leading-relaxed mt-1.5 pt-2 border-t border-slate-200">
                  {stage.description}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

