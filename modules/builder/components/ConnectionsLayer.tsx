import { Connection, ScenarioBlock } from '@/store/useAppStore';

type ConnectionsLayerProps = {
  connections: Connection[];
  blocks: ScenarioBlock[];
};

function ConnectionLine({ 
  connection, 
  blocks 
}: { 
  connection: Connection; 
  blocks: ScenarioBlock[] 
}) {
  const fromBlock = blocks.find(b => b.id === connection.from);
  const toBlock = blocks.find(b => b.id === connection.to);

  if (!fromBlock || !toBlock) return null;

  // Calcolo centro dei blocchi (assumendo dimensioni standard del blocco)
  // Width approx 160px -> center 80
  // Height approx 70px -> center 35
  const fromX = fromBlock.position.x + 80; 
  const fromY = fromBlock.position.y + 35; 
  const toX = toBlock.position.x + 80;
  const toY = toBlock.position.y + 35;

  return (
    <g>
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      <circle cx={toX} cy={toY} r="4" fill="#64748b" />
    </g>
  );
}

export function ConnectionsLayer({ connections, blocks }: ConnectionsLayerProps) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      {connections.map(conn => (
        <ConnectionLine key={conn.id} connection={conn} blocks={blocks} />
      ))}
    </svg>
  );
}

