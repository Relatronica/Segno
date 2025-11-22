import { useMemo } from 'react';
import { PositionedBlock } from '../utils/layout';
import { FLOW_STAGES, FlowStageKey, getStageTheme } from '../utils/flowchartTheme';
import { calculateConnectionLayouts, ConnectionLayout } from '../utils/connectionLayout';

type CityConnectionsProps = {
  connections: import('@/store/useAppStore').Connection[];
  layouts: PositionedBlock[];
  selectedBlockId: string | null;
};

const stageKeys = Object.keys(FLOW_STAGES) as FlowStageKey[];

function SchematicLine({ 
  connectionLayout,
  layouts,
  selectedBlockId,
}: { 
  connectionLayout: ConnectionLayout;
  layouts: PositionedBlock[];
  selectedBlockId: string | null;
}) {
  const fromLayout = layouts.find((l) => l.block.id === connectionLayout.connection.from);
  if (!fromLayout) return null;

  const stageTheme = getStageTheme(fromLayout.block);
  const { fromPoint, toPoint, pathData } = connectionLayout;
  
  // Reduce opacity if there's a selection and this connection is not related to the selected block
  const hasSelection = selectedBlockId !== null;
  const isConnectedToSelected = selectedBlockId 
    ? (connectionLayout.connection.from === selectedBlockId || connectionLayout.connection.to === selectedBlockId)
    : false;
  const opacity = hasSelection && !isConnectedToSelected ? 0.2 : 1;

  return (
    <g style={{ opacity }}>
      {/* Shadow/glow path */}
      <path
        d={pathData}
        fill="none"
        stroke="white"
        strokeOpacity={0.35 * opacity}
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      {/* Main path */}
      <path
        d={pathData}
        fill="none"
        stroke={stageTheme.line}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${stageTheme.shadow})` }}
        markerEnd={`url(#arrow-${stageTheme.key})`}
      />
      {/* Connection point indicators */}
      <circle cx={fromPoint.x} cy={fromPoint.y} r={3} fill={stageTheme.line} />
      <circle
        cx={toPoint.x}
        cy={toPoint.y}
        r={4}
        fill="white"
        stroke={stageTheme.line}
        strokeWidth={2}
      />
    </g>
  );
}

export function CityConnections({ connections, layouts, selectedBlockId }: CityConnectionsProps) {
  const connectionLayouts = useMemo(() => {
    return calculateConnectionLayouts(connections, layouts);
  }, [connections, layouts]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
      <defs>
        {stageKeys.map((stageKey) => {
          const stage = FLOW_STAGES[stageKey];
          return (
            <marker
              key={stageKey}
              id={`arrow-${stageKey}`}
              markerWidth="12"
              markerHeight="12"
              refX="8"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L8,3 L0,6 Z" fill={stage.line} />
            </marker>
          );
        })}
      </defs>
      {connectionLayouts.map((layout) => (
        <SchematicLine 
          key={layout.connection.id} 
          connectionLayout={layout} 
          layouts={layouts}
          selectedBlockId={selectedBlockId}
        />
      ))}
    </svg>
  );
}
