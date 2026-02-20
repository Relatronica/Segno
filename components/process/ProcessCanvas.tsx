'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type NodeTypes,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useProcessStore } from '@/store/useProcessStore';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { analyzeEthics } from '@/lib/process/ai-client';
import ProcessNodeComponent from './ProcessNode';
import { EthicsPanel } from './EthicsPanel';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Download,
  Save,
  RefreshCw,
  Loader2,
  PanelRightOpen,
  PanelRightClose,
} from 'lucide-react';

const nodeTypes: NodeTypes = {
  processNode: ProcessNodeComponent,
};

export function ProcessCanvas() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    ethicsAnalysis,
    aiProvider,
    apiKey,
    ollamaUrl,
    ollamaModel,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    setEthicsAnalysis,
    setStep,
    reset,
  } = useProcessStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  const [nodes, , onNodesChange] = useNodesState(storeNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storeEdges);
  const [showEthics, setShowEthics] = useState(true);
  const [reanalyzing, setReanalyzing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: 'smoothstep', animated: true }, eds));
    },
    [setEdges]
  );

  const aiOptions = useMemo(
    () => ({ provider: aiProvider, apiKey, ollamaUrl, ollamaModel }),
    [aiProvider, apiKey, ollamaUrl, ollamaModel]
  );

  const handleReanalyze = useCallback(async () => {
    setReanalyzing(true);
    try {
      setStoreNodes(nodes);
      setStoreEdges(edges);
      const analysis = await analyzeEthics(aiOptions, nodes, edges, locale);
      setEthicsAnalysis(analysis);
    } catch {
      // Silent fail for re-analysis
    } finally {
      setReanalyzing(false);
    }
  }, [nodes, edges, aiOptions, locale, setStoreNodes, setStoreEdges, setEthicsAnalysis]);

  const handleSave = useCallback(() => {
    setStoreNodes(nodes);
    setStoreEdges(edges);
    const data = {
      nodes: nodes.map((n) => ({ id: n.id, type: n.type, position: n.position, data: n.data })),
      edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.label })),
      ethicsAnalysis,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('segno-process-draft', JSON.stringify(data));
  }, [nodes, edges, ethicsAnalysis, setStoreNodes, setStoreEdges]);

  const handleExport = useCallback(() => {
    const data = {
      nodes: nodes.map((n) => ({ id: n.id, type: n.type, position: n.position, data: n.data })),
      edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.label })),
      ethicsAnalysis,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges, ethicsAnalysis]);

  const handleRestart = useCallback(() => {
    reset();
    setStep('landing');
  }, [reset, setStep]);

  const defaultEdgeOptions = useMemo(
    () => ({ type: 'smoothstep', animated: true }),
    []
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Canvas */}
      <div className={`relative flex-1 transition-all ${showEthics ? 'mr-0' : ''}`}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          deleteKeyCode={['Backspace', 'Delete']}
          className="bg-background"
        >
          <Background gap={20} size={1} />
          <Controls className="!rounded-xl !border-border !bg-card !shadow-lg" />
          <MiniMap
            nodeStrokeWidth={3}
            className="!rounded-xl !border-border !bg-card !shadow-lg"
          />

          <Panel position="top-left" className="flex gap-2">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
            >
              <Save className="h-4 w-4" />
              {t.processDesigner.save}
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
            >
              <Download className="h-4 w-4" />
              {t.processDesigner.export}
            </button>
            <button
              onClick={handleReanalyze}
              disabled={reanalyzing}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent disabled:opacity-50"
            >
              {reanalyzing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {t.processDesigner.reanalyze}
            </button>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4" />
              {t.processDesigner.restart}
            </button>
          </Panel>

          <Panel position="top-right">
            <button
              onClick={() => setShowEthics(!showEthics)}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
            >
              {showEthics ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
              {t.processDesigner.ethicsPanel}
            </button>
          </Panel>
        </ReactFlow>
      </div>

      {/* Ethics Side Panel */}
      <AnimatePresence>
        {showEthics && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full shrink-0 overflow-hidden border-l border-border"
          >
            <div className="h-full w-[400px] overflow-y-auto bg-card">
              <EthicsPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
