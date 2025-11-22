import { Connection } from '@/store/useAppStore';
import { PositionedBlock } from './layout';

export type ConnectionPoint = {
  x: number;
  y: number;
  side: 'left' | 'right' | 'top' | 'bottom';
};

export type ConnectionLayout = {
  connection: Connection;
  fromPoint: ConnectionPoint;
  toPoint: ConnectionPoint;
  pathData: string;
};

/**
 * Determines the best side of a block to connect from/to based on relative positions
 */
function getConnectionSide(
  fromLayout: PositionedBlock,
  toLayout: PositionedBlock
): { fromSide: 'left' | 'right' | 'top' | 'bottom'; toSide: 'left' | 'right' | 'top' | 'bottom' } {
  const fromCenter = {
    x: fromLayout.position.x + fromLayout.size.width / 2,
    y: fromLayout.position.y + fromLayout.size.height / 2,
  };
  const toCenter = {
    x: toLayout.position.x + toLayout.size.width / 2,
    y: toLayout.position.y + toLayout.size.height / 2,
  };

  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  // Determine primary direction
  if (absDx > absDy) {
    // Horizontal connection
    return {
      fromSide: dx > 0 ? 'right' : 'left',
      toSide: dx > 0 ? 'left' : 'right',
    };
  } else {
    // Vertical connection
    return {
      fromSide: dy > 0 ? 'bottom' : 'top',
      toSide: dy > 0 ? 'top' : 'bottom',
    };
  }
}

/**
 * Calculates connection point on a specific side of a block
 */
function getPointOnSide(
  layout: PositionedBlock,
  side: 'left' | 'right' | 'top' | 'bottom',
  offset: number // 0-1, position along the side
): ConnectionPoint {
  const { position, size } = layout;
  const edgeOffset = 0; // Small offset from exact edge (can be adjusted if needed)
  let x: number, y: number;

  // Clamp offset to avoid edges (keep connections away from corners)
  const clampedOffset = Math.max(0.15, Math.min(0.85, offset));

  switch (side) {
    case 'left':
      x = position.x - edgeOffset;
      y = position.y + size.height * clampedOffset;
      break;
    case 'right':
      x = position.x + size.width + edgeOffset;
      y = position.y + size.height * clampedOffset;
      break;
    case 'top':
      x = position.x + size.width * clampedOffset;
      y = position.y - edgeOffset;
      break;
    case 'bottom':
      x = position.x + size.width * clampedOffset;
      y = position.y + size.height + edgeOffset;
      break;
  }

  return { x, y, side };
}

/**
 * Groups connections by block and side, calculates distribution offsets
 */
function calculateConnectionOffsets(
  connections: Connection[],
  layoutMap: Map<string, PositionedBlock>
): Map<string, { fromOffset: number; toOffset: number }> {
  const offsetMap = new Map<string, { fromOffset: number; toOffset: number }>();

  // Group connections by from/to pairs AND by side
  const fromSideGroups = new Map<string, Connection[]>();
  const toSideGroups = new Map<string, Connection[]>();

  connections.forEach((conn) => {
    const fromLayout = layoutMap.get(conn.from);
    const toLayout = layoutMap.get(conn.to);
    if (!fromLayout || !toLayout) return;

    const { fromSide, toSide } = getConnectionSide(fromLayout, toLayout);

    // Group by block ID + side
    const fromKey = `${conn.from}:${fromSide}`;
    const toKey = `${conn.to}:${toSide}`;

    if (!fromSideGroups.has(fromKey)) {
      fromSideGroups.set(fromKey, []);
    }
    fromSideGroups.get(fromKey)!.push(conn);

    if (!toSideGroups.has(toKey)) {
      toSideGroups.set(toKey, []);
    }
    toSideGroups.get(toKey)!.push(conn);
  });

  // Calculate offsets for each connection
  connections.forEach((conn) => {
    const fromLayout = layoutMap.get(conn.from);
    const toLayout = layoutMap.get(conn.to);
    if (!fromLayout || !toLayout) return;

    const { fromSide, toSide } = getConnectionSide(fromLayout, toLayout);

    // Find index of this connection in its side-specific group
    const fromKey = `${conn.from}:${fromSide}`;
    const fromConnections = fromSideGroups.get(fromKey) || [];
    const fromIndex = fromConnections.findIndex((c) => c.id === conn.id);
    const fromTotal = fromConnections.length;
    // Distribute evenly with padding from edges
    const fromOffset = fromTotal > 1 
      ? 0.15 + (fromIndex + 1) * (0.7 / (fromTotal + 1))
      : 0.5;

    const toKey = `${conn.to}:${toSide}`;
    const toConnections = toSideGroups.get(toKey) || [];
    const toIndex = toConnections.findIndex((c) => c.id === conn.id);
    const toTotal = toConnections.length;
    const toOffset = toTotal > 1
      ? 0.15 + (toIndex + 1) * (0.7 / (toTotal + 1))
      : 0.5;

    offsetMap.set(conn.id, { fromOffset, toOffset });
  });

  return offsetMap;
}

/**
 * Generates a smooth bezier path between two points
 */
function generatePath(
  fromPoint: ConnectionPoint,
  toPoint: ConnectionPoint,
  fromLayout: PositionedBlock,
  toLayout: PositionedBlock
): string {
  const dx = toPoint.x - fromPoint.x;
  const dy = toPoint.y - fromPoint.y;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  // Calculate control points for smooth curves
  const curveStrength = Math.min(120, Math.max(40, Math.min(absDx, absDy) * 0.5));

  let control1X: number, control1Y: number, control2X: number, control2Y: number;

  if (fromPoint.side === 'right' && toPoint.side === 'left') {
    // Horizontal flow
    control1X = fromPoint.x + curveStrength;
    control1Y = fromPoint.y;
    control2X = toPoint.x - curveStrength;
    control2Y = toPoint.y;
  } else if (fromPoint.side === 'left' && toPoint.side === 'right') {
    // Reverse horizontal flow
    control1X = fromPoint.x - curveStrength;
    control1Y = fromPoint.y;
    control2X = toPoint.x + curveStrength;
    control2Y = toPoint.y;
  } else if (fromPoint.side === 'bottom' && toPoint.side === 'top') {
    // Vertical flow down to up
    control1X = fromPoint.x;
    control1Y = fromPoint.y + curveStrength;
    control2X = toPoint.x;
    control2Y = toPoint.y - curveStrength;
  } else if (fromPoint.side === 'top' && toPoint.side === 'bottom') {
    // Vertical flow up to down
    control1X = fromPoint.x;
    control1Y = fromPoint.y - curveStrength;
    control2X = toPoint.x;
    control2Y = toPoint.y + curveStrength;
  } else {
    // Mixed directions - use diagonal curve
    const midX = (fromPoint.x + toPoint.x) / 2;
    const midY = (fromPoint.y + toPoint.y) / 2;
    control1X = fromPoint.side === 'right' || fromPoint.side === 'left' ? midX : fromPoint.x;
    control1Y = fromPoint.side === 'top' || fromPoint.side === 'bottom' ? midY : fromPoint.y;
    control2X = toPoint.side === 'right' || toPoint.side === 'left' ? midX : toPoint.x;
    control2Y = toPoint.side === 'top' || toPoint.side === 'bottom' ? midY : toPoint.y;
  }

  return `M ${fromPoint.x} ${fromPoint.y} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${toPoint.x} ${toPoint.y}`;
}

/**
 * Main function to calculate all connection layouts
 */
export function calculateConnectionLayouts(
  connections: Connection[],
  layouts: PositionedBlock[]
): ConnectionLayout[] {
  const layoutMap = new Map<string, PositionedBlock>();
  layouts.forEach((layout) => layoutMap.set(layout.block.id, layout));

  const offsetMap = calculateConnectionOffsets(connections, layoutMap);
  const results: ConnectionLayout[] = [];

  connections.forEach((connection) => {
    const fromLayout = layoutMap.get(connection.from);
    const toLayout = layoutMap.get(connection.to);

    if (!fromLayout || !toLayout) return;

    const { fromSide, toSide } = getConnectionSide(fromLayout, toLayout);
    const offsets = offsetMap.get(connection.id) || { fromOffset: 0.5, toOffset: 0.5 };

    const fromPoint = getPointOnSide(fromLayout, fromSide, offsets.fromOffset);
    const toPoint = getPointOnSide(toLayout, toSide, offsets.toOffset);

    const pathData = generatePath(fromPoint, toPoint, fromLayout, toLayout);

    results.push({
      connection,
      fromPoint,
      toPoint,
      pathData,
    });
  });

  return results;
}

