import { useMemo, useRef, useState, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';
import { TransformComponent, TransformWrapper, ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { CityToolbar } from './components/CityToolbar';
import { CityBlock } from './components/CityBlock';
import { CityConnections } from './components/CityConnections';
import { CITY_THEME } from './utils/cityMappings';
import { computeCityLayout } from './utils/layout';
import { generateCityElements } from './utils/cityGenerator';
import { CityInsightsPanel } from './components/CityInsightsPanel';
import { CityBottomToolbar } from './components/CityBottomToolbar';
import { NewsPanel } from './components/NewsPanel';
import { calculateRisk, RiskAssessment } from '@/modules/analysis/utils/calculateRisk';
import { WhiteboardAnnotations } from './components/WhiteboardAnnotations';
import { WhiteboardNote } from './components/WhiteboardNote';
import { calculateNotePositions, shouldShowAsNote } from './utils/whiteboardLayout';
import Image from 'next/image';

// Avatar mapping - same as onboarding
const AVATARS = [
  { id: 'peep-14', image: '/avatar/peep-14.png', label: 'Explorer' },
  { id: 'peep-20', image: '/avatar/peep-20.png', label: 'Builder' },
  { id: 'peep-32', image: '/avatar/peep-32.png', label: 'Scientist' },
  { id: 'peep-45', image: '/avatar/peep-45.png', label: 'Analyst' },
  { id: 'peep-49', image: '/avatar/peep-49.png', label: 'Designer' },
  { id: 'peep-51', image: '/avatar/peep-51.png', label: 'Developer' },
  { id: 'peep-55', image: '/avatar/peep-55.png', label: 'Manager' },
  { id: 'peep-56', image: '/avatar/peep-56.png', label: 'Researcher' },
];

export function CityBuilderModule() {
  const { scenarioBlocks, connections, addBlock, addConnection, removeBlocksByBlueprint, user } = useAppStore();
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [panelMode, setPanelMode] = useState<'guide' | 'block' | 'analysis'>('guide');
  const [riskReport, setRiskReport] = useState<RiskAssessment | null>(null);
  const [showNotes, setShowNotes] = useState<boolean>(true);
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);
  
  // Initialize and sync selectedBlueprints from existing blocks (e.g., from wizard)
  const [selectedBlueprints, setSelectedBlueprints] = useState<Set<string>>(new Set());
  
  // Sync selectedBlueprints when scenarioBlocks change (e.g., when coming from wizard)
  useEffect(() => {
    const blueprintSet = new Set<string>();
    scenarioBlocks.forEach(block => {
      if (block.config?.blueprintKey) {
        blueprintSet.add(block.config.blueprintKey);
      }
    });
    setSelectedBlueprints(blueprintSet);
  }, [scenarioBlocks.length]); // Only update when number of blocks changes (new blocks added)
  const transformRef = useRef<ReactZoomPanPinchContentRef | null>(null);

  const layoutPlan = useMemo(() => computeCityLayout(scenarioBlocks, connections), [scenarioBlocks, connections]);

  // Filter blocks: show main blocks as blocks, contextual blocks as notes (always in whiteboard mode)
  const blocksToShow = useMemo(() => {
    return layoutPlan.blocks.filter((p) => !shouldShowAsNote(p.block));
  }, [layoutPlan.blocks]);

  // Filter connections to only show between visible blocks (not notes)
  const visibleConnections = useMemo(() => {
    // Get IDs of blocks shown as full blocks (not notes)
    const visibleBlockIds = new Set(blocksToShow.map((p) => p.block.id));
    
    // Filter connections to only include those between visible blocks
    return connections.filter((conn) => {
      const fromVisible = visibleBlockIds.has(conn.from);
      const toVisible = visibleBlockIds.has(conn.to);
      return fromVisible && toVisible;
    });
  }, [connections, blocksToShow]);

  // Calculate note positions for contextual blocks
  const notePositions = useMemo(() => {
    // Pass visible blocks (blocksToShow) so notes anchor to main blocks, not other notes
    return calculateNotePositions(scenarioBlocks, connections, layoutPlan.blocks, blocksToShow);
  }, [scenarioBlocks, connections, layoutPlan.blocks, blocksToShow]);

  // Calculate canvas width based on columns and notes
  const baseWidth =
    CITY_THEME.layout.paddingX * 2 +
    (Math.max(1, layoutPlan.columnCount) - 1) * CITY_THEME.layout.clusterGapX;
  
  // Add extra width for notes if in notes mode
  const maxNoteRight = notePositions.length > 0
    ? Math.max(...notePositions.map((n) => n.position.x + 200)) // 200px is max note width
    : 0;
  const canvasWidth = Math.max(baseWidth, maxNoteRight + CITY_THEME.layout.paddingX);

  // Calculate canvas height based on actual block positions and notes
  const maxBlockBottom = layoutPlan.blocks.length > 0
    ? Math.max(...layoutPlan.blocks.map((b) => b.position.y + b.size.height))
    : CITY_THEME.layout.paddingY;
  const maxNoteBottom = notePositions.length > 0
    ? Math.max(...notePositions.map((n) => n.position.y + 80)) // Approximate note height
    : 0;
  const canvasHeight = Math.max(
    CITY_THEME.layout.paddingY * 2 + (Math.max(1, layoutPlan.maxRows) - 1) * CITY_THEME.layout.clusterGapY,
    maxBlockBottom + CITY_THEME.layout.paddingY,
    maxNoteBottom + CITY_THEME.layout.paddingY
  );

  const handleAction = (key: string) => {
    setPanelMode('guide');
    setSelectedBlockId(null);
    
    // Toggle selection
    if (selectedBlueprints.has(key)) {
      // Deselect: remove blocks and connections created by this blueprint
      removeBlocksByBlueprint(key);
      setSelectedBlueprints((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    } else {
      // Select: add blocks and connections
    const { locale } = useAppStore.getState();
    const result = generateCityElements(key, scenarioBlocks, locale);
    result.blocks.forEach(addBlock);
    result.connections.forEach((conn) => addConnection(conn.from, conn.to));
      setSelectedBlueprints((prev) => new Set(prev).add(key));
    }
  };

  const handleBlockClick = (blockId: string) => {
    setSelectedBlockId(blockId);
    setPanelMode('block');
  };
  const selectedBlock = scenarioBlocks.find((block) => block.id === selectedBlockId) ?? null;
  const inbound = selectedBlock
    ? connections.filter((c) => c.to === selectedBlock.id).length
    : 0;
  const outbound = selectedBlock
    ? connections.filter((c) => c.from === selectedBlock.id).length
    : 0;

  const handleCloseBlock = () => {
    setSelectedBlockId(null);
    setPanelMode('guide');
  };

  const handleAnalyze = () => {
    if (scenarioBlocks.length === 0) return;
    const report = calculateRisk(scenarioBlocks, connections);
    setRiskReport(report);
    setPanelMode('analysis');
    setSelectedBlockId(null);
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex font-sans"
      style={{ backgroundColor: CITY_THEME.colors.ground }}
    >
      {/* Dotted background pattern - same as onboarding */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-70"></div>
      <CityToolbar 
        onAction={handleAction} 
        selectedBlueprints={selectedBlueprints}
      />

      {/* User Avatar - Top Right */}
      {user && (() => {
        const userAvatar = AVATARS.find(a => a.id === user.avatarId) || AVATARS[0];
        return (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-white/95 backdrop-blur border border-slate-200 rounded-lg shadow-lg px-3 py-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
              <Image
                src={userAvatar.image}
                alt={user.name}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{user.name}</p>
              <p className="text-xs text-slate-500 leading-tight">{userAvatar.label}</p>
            </div>
          </div>
        );
      })()}

      <CityInsightsPanel
        mode={panelMode}
        block={selectedBlock}
        inbound={inbound}
        outbound={outbound}
        riskReport={riskReport}
        canAnalyze={scenarioBlocks.length > 0}
        onCloseBlock={handleCloseBlock}
        onRequestAnalyze={handleAnalyze}
        onBackToGuide={() => {
          setPanelMode('guide');
          setRiskReport(null);
        }}
      />

      {/* News Panel */}
      <NewsPanel
        isOpen={isNewsPanelOpen}
        onToggle={() => setIsNewsPanelOpen(!isNewsPanelOpen)}
      />

      {/* Bottom Toolbar - Center */}
      <CityBottomToolbar
        transformRef={transformRef}
        onRequestAnalyze={handleAnalyze}
        canAnalyze={scenarioBlocks.length > 0}
        showNotes={showNotes}
        onToggleNotes={() => setShowNotes(!showNotes)}
        isNewsPanelOpen={isNewsPanelOpen}
        onToggleNews={() => setIsNewsPanelOpen(!isNewsPanelOpen)}
      />

      <div className="flex-1 h-full w-full cursor-grab active:cursor-grabbing overflow-hidden">
        <TransformWrapper
          ref={transformRef}
          initialScale={0.85}
          minScale={0.3}
          maxScale={3}
          centerOnInit
          limitToBounds={false}
          panning={{ velocityDisabled: true }}
          wheel={{ step: 0.1 }}
        >
          <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full">
            <div
              className="relative"
              style={{
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`,
                transformOrigin: '0 0',
              }}
              onClick={() => {
                setSelectedBlockId(null);
                setPanelMode('guide');
              }}
            >
              <WhiteboardAnnotations width={canvasWidth} height={canvasHeight} visibleBlocks={blocksToShow} />
              <CityConnections connections={visibleConnections} layouts={blocksToShow} selectedBlockId={selectedBlockId} />

              {/* Main blocks */}
              {blocksToShow.map((layout) => (
                <CityBlock
                  key={layout.block.id}
                  block={layout.block}
                  layout={layout}
                  isSelected={selectedBlockId === layout.block.id}
                  selectedBlockId={selectedBlockId}
                  onClick={() => handleBlockClick(layout.block.id)}
                />
              ))}

              {/* Whiteboard notes for contextual blocks */}
              {showNotes && notePositions.map((note) => (
                <WhiteboardNote
                  key={note.block.id}
                  block={note.block}
                  position={note.position}
                  selectedBlockId={selectedBlockId}
                  onClick={() => handleBlockClick(note.block.id)}
                />
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>

    </div>
  );
}

