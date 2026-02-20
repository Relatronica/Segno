'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { ProcessNodeData } from '@/store/useProcessStore';
import {
  Play,
  Square,
  GitBranch,
  Database,
  Cog,
  Brain,
} from 'lucide-react';

const nodeStyles: Record<ProcessNodeData['type'], { bg: string; border: string; icon: React.ElementType }> = {
  start: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: Play },
  end: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: Square },
  decision: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: GitBranch },
  data: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: Database },
  process: { bg: 'bg-gray-500/10', border: 'border-gray-500/30', icon: Cog },
  ai: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', icon: Brain },
};

const riskColors: Record<string, string> = {
  unacceptable: 'bg-red-500',
  high: 'bg-orange-500',
  limited: 'bg-amber-500',
  minimal: 'bg-emerald-500',
};

type ProcessNodeProps = NodeProps & {
  data: ProcessNodeData;
};

function ProcessNodeComponent({ data }: ProcessNodeProps) {
  const style = nodeStyles[data.type] || nodeStyles.process;
  const Icon = style.icon;

  return (
    <div
      className={`relative rounded-xl border ${style.border} ${style.bg} px-4 py-3 shadow-sm transition-shadow hover:shadow-md`}
      style={{ minWidth: 200, maxWidth: 280 }}
    >
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-2 !border-background !bg-foreground/50" />

      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Icon className="h-4 w-4 text-foreground/70" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold">{data.label}</p>
            {data.riskLevel && (
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${riskColors[data.riskLevel] || ''}`}
                title={data.riskLevel}
              />
            )}
          </div>
          {data.description && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
              {data.description}
            </p>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-2 !border-background !bg-foreground/50" />
    </div>
  );
}

export default memo(ProcessNodeComponent);
