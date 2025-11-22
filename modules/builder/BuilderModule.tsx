'use client';

import { 
  DndContext, 
  DragOverlay, 
  useDraggable, 
  useDroppable, 
  DragEndEvent, 
  useSensor, 
  useSensors, 
  MouseSensor, 
  TouchSensor,
  rectIntersection,
  DragStartEvent
} from '@dnd-kit/core';
import { useState, useRef } from 'react';
import { useAppStore, ScenarioBlock, BlockCategory } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Link as LinkIcon, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PropertyPanel } from './components/PropertyPanel';
import { EduTooltip } from './components/EduTooltip';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { Sidebar } from './components/Sidebar';
import { ConnectionsLayer } from './components/ConnectionsLayer';
import { BLOCK_TYPES } from './utils/constants';

function CanvasBlock({ 
  block, 
  isSelected, 
  onClick 
}: { 
  block: ScenarioBlock; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: block.id,
    data: { block, isCanvasBlock: true },
  });

  const color = BLOCK_TYPES.find(b => b.label === block.label)?.color || 'bg-gray-500';
  
  return (
    <EduTooltip termKey={block.label}>
      <motion.div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onClick={onClick}
        layoutId={block.id}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isDragging ? 1.05 : 1, 
          opacity: isDragging ? 0.8 : 1,
          boxShadow: isSelected 
            ? '0 0 0 4px rgba(59, 130, 246, 0.5), 0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}
        style={{
          position: 'absolute',
          left: block.position.x,
          top: block.position.y,
        }}
        className={`nopan p-4 rounded-xl text-white font-bold ${color} min-w-[160px] text-center cursor-grab active:cursor-grabbing transition-shadow ring-offset-2 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      >
        <div className="text-sm font-bold truncate">{block.label}</div>
        
        {/* Visual indicators for configuration */}
        <div className="mt-2 flex justify-center gap-1 flex-wrap px-2">
           {block.config?.dataTypes && block.config.dataTypes.length > 0 && (
              <div className="w-full flex justify-center gap-0.5 mb-1">
                 {block.config.dataTypes.map(t => (
                   <div key={t} className="w-1.5 h-1.5 rounded-full bg-white/80" title={t} />
                 ))}
              </div>
           )}
           {block.config?.isEncrypted && <span title="Cifrato" className="text-[10px] bg-black/20 px-1 rounded">🔒</span>}
           {block.config?.humanInTheLoop && <span title="Human Check" className="text-[10px] bg-black/20 px-1 rounded">👮</span>}
           {block.label.includes('(USA)') && <span title="Extra-UE Transfer" className="text-[10px] bg-red-500/80 px-1 rounded">🇺🇸</span>}
        </div>
      </motion.div>
    </EduTooltip>
  );
}

type ActiveDrag = {
  id: string;
  data: {
    current?: {
      type?: string;
      block?: ScenarioBlock;
      isCanvasBlock?: boolean;
      label?: string;
    };
  };
  block?: ScenarioBlock;
  label?: string;
} | null;

export function BuilderModule() {
  const { scenarioBlocks, connections, addBlock, updateBlockPosition, setStep, user, addConnection } = useAppStore();
  const [activeDrag, setActiveDrag] = useState<ActiveDrag>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  
  // Refs per gestire lo zoom
  const transformComponentRef = useRef<ReactZoomPanPinchContentRef | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleBlockClick = (blockId: string) => {
    if (isLinking && selectedBlockId) {
      if (blockId !== selectedBlockId) {
        addConnection(selectedBlockId, blockId);
        setIsLinking(false);
      }
    } else {
      setSelectedBlockId(blockId);
      setIsLinking(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const dragData = event.active.data.current;
    setActiveDrag({
      id: event.active.id as string,
      data: { current: dragData },
      block: dragData?.block,
      label: dragData?.label,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const scale = transformComponentRef.current?.instance.transformState.scale || 1;

    if (active.data.current?.isCanvasBlock && active.data.current?.block) {
      const block = active.data.current.block as ScenarioBlock;
      const newPosition = {
        x: block.position.x + (delta.x / scale),
        y: block.position.y + (delta.y / scale)
      };
      updateBlockPosition(block.id, newPosition);
    }
    else if (active.data.current?.isToolboxItem) {
        const transformState = transformComponentRef.current?.instance.transformState;
        
        if (transformState && wrapperRef.current) {
            const centerX = (-transformState.positionX + (wrapperRef.current.clientWidth / 2)) / transformState.scale;
            const centerY = (-transformState.positionY + (wrapperRef.current.clientHeight / 2)) / transformState.scale;

            const newBlock: ScenarioBlock = {
                id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
                type: active.data.current.type as BlockCategory,
                label: active.data.current.label,
                position: { x: centerX, y: centerY }
            };
            addBlock(newBlock);
            setSelectedBlockId(newBlock.id);
        }
    }
    
    setActiveDrag(null);
  };

  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-droppable',
  });

  return (
    <div className="relative h-screen bg-slate-100 overflow-hidden flex">
      <DndContext 
        sensors={sensors} 
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
        
        <Sidebar user={user} />

        {/* Property Panel */}
        {selectedBlockId && (
          <PropertyPanel 
            blockId={selectedBlockId} 
            onClose={() => setSelectedBlockId(null)} 
          />
        )}

        {/* Top Bar Controls */}
        <div className="absolute top-6 right-6 z-40 flex gap-2">
           {isLinking && (
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse mr-4">
              <LinkIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Collega due blocchi</span>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-blue-700 rounded-full" onClick={() => setIsLinking(false)}>✕</Button>
            </div>
          )}
          
           {selectedBlockId && !isLinking && (
             <Button 
               variant="secondary" 
               onClick={() => setIsLinking(true)}
               className="bg-white shadow-md hover:bg-blue-50 text-blue-600 border border-blue-100"
             >
               <LinkIcon className="mr-2 h-4 w-4"/> Collega
             </Button>
           )}
           <Button onClick={() => setStep('analysis')} disabled={scenarioBlocks.length === 0} className="bg-blue-600 hover:bg-blue-700 shadow-lg">
              Analizza Rischi <ArrowRight className="ml-2 h-4 w-4"/>
           </Button>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 z-40 flex flex-col gap-2 bg-white/90 backdrop-blur p-2 rounded-xl shadow-xl border border-slate-200">
            <Button variant="ghost" size="icon" onClick={() => transformComponentRef.current?.zoomIn()}>
                <ZoomIn className="h-5 w-5 text-slate-600" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => transformComponentRef.current?.zoomOut()}>
                <ZoomOut className="h-5 w-5 text-slate-600" />
            </Button>
             <Button variant="ghost" size="icon" onClick={() => transformComponentRef.current?.resetTransform()}>
                <RotateCcw className="h-5 w-5 text-slate-600" />
            </Button>
        </div>

        {/* Main Infinite Canvas */}
        <div className="flex-1 h-full w-full bg-slate-100 cursor-grab active:cursor-grabbing overflow-hidden" ref={wrapperRef}>
             <TransformWrapper
                ref={transformComponentRef}
                initialScale={1}
                minScale={0.2}
                maxScale={4}
                centerOnInit={true}
                limitToBounds={false}
                panning={{ velocityDisabled: true, excluded: ['nopan'] }}
                wheel={{ step: 0.1 }}
             >
                <TransformComponent 
                    wrapperClass="!w-full !h-full"
                    contentClass="!w-full !h-full"
                    contentStyle={{ width: '100%', height: '100%' }}
                >
                    <div 
                        ref={setNodeRef}
                        className="relative w-[4000px] h-[4000px] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"
                        style={{ 
                            transformOrigin: '0 0',
                        }}
                        onClick={() => setSelectedBlockId(null)}
                    >
                        <ConnectionsLayer connections={connections} blocks={scenarioBlocks} />

                        {scenarioBlocks.map(block => (
                             <div key={block.id} onClick={(e) => e.stopPropagation()}>
                                <CanvasBlock 
                                    block={block} 
                                    isSelected={selectedBlockId === block.id}
                                    onClick={() => handleBlockClick(block.id)}
                                />
                            </div>
                        ))}

                         {scenarioBlocks.length === 0 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-50">
                                <div className="text-6xl mb-4">🏗️</div>
                                <h2 className="text-2xl font-bold text-slate-400">Canvas Infinito</h2>
                                <p className="text-slate-400">Trascina qui i componenti</p>
                            </div>
                        )}
                    </div>
                </TransformComponent>
             </TransformWrapper>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeDrag ? (
             <div className={`p-4 rounded-xl shadow-2xl text-white font-bold ${BLOCK_TYPES.find(b => b.label === activeDrag.block?.label || b.label === activeDrag.label)?.color || 'bg-gray-500'} scale-105 min-w-[150px] text-center opacity-90`}>
                {activeDrag.block?.label || activeDrag.label}
              </div>
          ) : null}
        </DragOverlay>

      </DndContext>
    </div>
  );
}
