import { memo } from 'react';
import { CITY_THEME } from '../utils/cityMappings';
import type { FlowStageKey } from '../utils/flowchartTheme';
import { getStageThemeByKey } from '../utils/flowchartTheme';

type FlowchartBackdropProps = {
  width: number;
  height: number;
};

const stageOrder = [...CITY_THEME.layout.categoryOrder] as FlowStageKey[];

export const FlowchartBackdrop = memo(function FlowchartBackdrop({ width, height }: FlowchartBackdropProps) {
  const columnWidth = CITY_THEME.layout.clusterGapX * 0.78;
  const paddingX = CITY_THEME.layout.paddingX;
  const paddingY = CITY_THEME.layout.paddingY;
  const laneGap = CITY_THEME.layout.clusterGapY;
  const baseCenter = paddingX + CITY_THEME.blockDimensions.width / 2;
  const horizontalLanes = Math.ceil((height - paddingY * 1.5) / laneGap) + 1;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 mix-blend-normal">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.95), transparent 60%)',
        }}
      />

      {stageOrder.map((stageKey, index) => {
        const stage = getStageThemeByKey(stageKey);
        const columnCenter = baseCenter + index * CITY_THEME.layout.clusterGapX;
        const left = Math.max(0, columnCenter - columnWidth / 2);

        return (
          <div
            key={stageKey}
            className="absolute top-0 h-full"
            style={{
              left,
              width: columnWidth,
              background: stage.background,
              opacity: 0.35,
              borderLeft: '1px solid rgba(148, 163, 184, 0.25)',
              borderRight: '1px solid rgba(148, 163, 184, 0.25)',
              borderRadius: 18,
              filter: 'blur(0px)',
            }}
          >
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 text-center px-4 py-2 rounded-full shadow-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.85)',
                border: `1px solid ${stage.tint}`,
                color: stage.accent,
                width: '80%',
              }}
            >
              <div className="text-[11px] font-semibold tracking-wide uppercase">{stage.title}</div>
              <div className="text-[10px] text-slate-500">{stage.subtitle}</div>
            </div>
          </div>
        );
      })}

      {Array.from({ length: horizontalLanes }).map((_, index) => {
        const top = paddingY + index * laneGap;
        if (top > height) return null;
        return (
          <div
            key={`lane-${index}`}
            className="absolute left-0 right-0"
            style={{
              top,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.35), transparent)',
            }}
          />
        );
      })}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.65), rgba(255,255,255,0))',
        }}
      />
    </div>
  );
});

