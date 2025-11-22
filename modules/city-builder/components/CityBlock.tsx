import { motion } from 'framer-motion';
import { ScenarioBlock, useAppStore } from '@/store/useAppStore';
import { BUILDING_TYPES, CITY_THEME, mapBlockToBuilding } from '../utils/cityMappings';
import { PositionedBlock } from '../utils/layout';
import { getStageTheme } from '../utils/flowchartTheme';
import { translateBlockLabel } from '@/lib/i18n/blockLabelTranslations';
import { getBuildingTypeDescription } from '@/lib/i18n/buildingTypeTranslations';

interface CityBlockProps {
  block: ScenarioBlock;
  isSelected: boolean;
  onClick: () => void;
  layout: PositionedBlock;
  selectedBlockId: string | null;
}

export function CityBlock({ block, isSelected, onClick, layout, selectedBlockId }: CityBlockProps) {
  const { locale } = useAppStore();
  const buildingTypeKey = mapBlockToBuilding(block.type, block.label);
  const buildingInfo = BUILDING_TYPES[buildingTypeKey] || BUILDING_TYPES['input-personal'];
  const visual = block.config?.visual;
  const stageTheme = getStageTheme(block, locale);
  const BadgeIcon = stageTheme.icon;
  const widthScale = layout.size.width / CITY_THEME.blockDimensions.width;
  const contentHeight = Math.max(48, layout.size.height - 32);
  const approxLineHeight = 18;
  const totalLines = Math.max(3, Math.floor(contentHeight / approxLineHeight));
  const labelClamp = Math.min(4, Math.max(2, totalLines - 1));
  const descriptionClamp = Math.min(3, Math.max(1, totalLines - labelClamp + 1));
  const labelFontSize = Math.max(12, Math.min(16, Math.round(12 * widthScale)));
  const descriptionFontSize = Math.max(10, Math.min(13, Math.round(10 * widthScale)));

  const background = visual?.background ?? buildingInfo.color;
  const border = visual?.border ?? buildingInfo.borderColor;
  const baseOpacity = visual?.opacity ?? 1;
  
  // Reduce opacity for non-selected blocks when a block is selected
  const hasSelection = selectedBlockId !== null;
  const finalOpacity = hasSelection && !isSelected ? baseOpacity * 0.35 : baseOpacity;

  const textColor = (() => {
    if (!background || !background.startsWith('#')) return '#F8FAFC';
    const hex = background.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 180 ? '#1F2937' : '#F8FAFC';
  })();

  const pattern = visual?.pattern;

  return (
    <motion.div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: finalOpacity, 
        scale: isSelected ? 1.02 : 1, 
        y: isSelected ? -4 : 0 
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="absolute rounded-xl transition-all duration-200"
      style={{
        left: layout.position.x,
        top: layout.position.y,
        width: layout.size.width,
        height: layout.size.height,
        backgroundColor: background,
        border: `1.5px solid ${border}`,
        boxShadow: `0 20px 35px rgba(15, 23, 42, 0.08), 0 0 0 1px ${stageTheme.tint}`,
        zIndex: isSelected ? 30 : 20,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${stageTheme.tint}, transparent 65%)`,
          opacity: 1,
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {pattern === 'grid' && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '18px 18px',
            }}
          />
        )}
        {pattern === 'dots' && (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 20%, transparent 20%)`,
              backgroundSize: '6px 6px',
            }}
          />
        )}
        {pattern === 'perimeter' && (
          <div className="absolute inset-1 border border-white/40 border-dashed rounded-[2px]" />
        )}
      </div>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div
          className="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-lg"
          style={{ backgroundColor: stageTheme.badge, boxShadow: `0 6px 12px ${stageTheme.shadow}` }}
        >
          <BadgeIcon className="h-3.5 w-3.5" />
          {stageTheme.label}
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center px-4 py-3 space-y-1 text-left">
        <span
          className="font-semibold tracking-wide text-slate-900"
          style={{
            color: textColor,
            fontSize: `${labelFontSize}px`,
            WebkitLineClamp: labelClamp,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden',
            wordBreak: 'break-word',
          }}
        >
          {translateBlockLabel(block.label, locale)}
        </span>
        <p
          className="leading-snug text-slate-100/80"
          style={{
            color: textColor,
            opacity: 0.75,
            fontSize: `${descriptionFontSize}px`,
            WebkitLineClamp: descriptionClamp,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden',
            wordBreak: 'break-word',
          }}
        >
          {getBuildingTypeDescription(buildingTypeKey, locale) || buildingInfo.description}
        </p>
      </div>
    </motion.div>
  );
}
