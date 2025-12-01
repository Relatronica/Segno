import { ScenarioBlock, Connection } from '@/store/useAppStore';
import { CITY_THEME } from './cityMappings';

const GRID = CITY_THEME.gridSize;
const CATEGORY_ORDER = CITY_THEME.layout.categoryOrder ?? ['input', 'process', 'storage', 'output', 'risk', 'impact'];

export type PositionedBlock = {
  block: ScenarioBlock;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

export type CityLayoutPlan = {
  blocks: PositionedBlock[];
  columnCount: number;
  maxRows: number;
};

type BlockBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
};

/**
 * Check if two rectangles overlap
 */
function doRectsOverlap(a: BlockBounds, b: BlockBounds, margin = 16): boolean {
  return (
    a.x < b.right + margin &&
    a.right + margin > b.x &&
    a.y < b.bottom + margin &&
    a.bottom + margin > b.y
  );
}

/**
 * Get bounds for a positioned block
 */
function getBounds(positioned: PositionedBlock): BlockBounds {
  const { position, size } = positioned;
  return {
    x: position.x,
    y: position.y,
    width: size.width,
    height: size.height,
    right: position.x + size.width,
    bottom: position.y + size.height,
  };
}

/**
 * Find the next available Y position that doesn't overlap with existing blocks
 */
function findNonOverlappingY(
  x: number,
  width: number,
  height: number,
  existingBlocks: PositionedBlock[],
  startY: number,
  minSpacing = 32
): number {
  const candidateBounds: BlockBounds = {
    x,
    y: startY,
    width,
    height,
    right: x + width,
    bottom: startY + height,
  };

  let currentY = startY;
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    candidateBounds.y = currentY;
    candidateBounds.bottom = currentY + height;

    // Check for overlaps with all existing blocks
    const hasOverlap = existingBlocks.some((existing) => {
      const existingBounds = getBounds(existing);
      return doRectsOverlap(candidateBounds, existingBounds, minSpacing);
    });

    if (!hasOverlap) {
      return currentY;
    }

    // Find the lowest bottom of overlapping blocks
    const overlappingBlocks = existingBlocks.filter((existing) => {
      const existingBounds = getBounds(existing);
      return doRectsOverlap(candidateBounds, existingBounds, minSpacing);
    });

    if (overlappingBlocks.length === 0) {
      return currentY;
    }

    const maxBottom = Math.max(
      ...overlappingBlocks.map((b) => getBounds(b).bottom),
      currentY + height
    );
    currentY = maxBottom + minSpacing;
    attempts++;
  }

  return currentY;
}

const getClusterCategory = (clusterBlocks: ScenarioBlock[]): string => {
  const primaryBlock = clusterBlocks.find((b) => b.config?.cluster?.category);
  if (primaryBlock?.config?.cluster?.category) {
    return primaryBlock.config.cluster.category;
  }
  const fallback = clusterBlocks.find((b) => b.type !== 'risk');
  return fallback?.type ?? 'risk';
};

export const computeCityLayout = (blocks: ScenarioBlock[], connections: Connection[] = []): CityLayoutPlan => {
  if (blocks.length === 0) {
    return {
      blocks: [],
      columnCount: 0,
      maxRows: 0,
    };
  }

  // Group blocks by cluster
  const clustersMap = new Map<
    string,
    { order: number; blocks: ScenarioBlock[]; category: string }
  >();

  blocks.forEach((block, index) => {
    const clusterMeta = block.config?.cluster;
    const clusterId = clusterMeta?.id ?? `solo-${block.id}`;
    const order = clusterMeta?.order ?? (index + 1) * 10;

    if (!clustersMap.has(clusterId)) {
      clustersMap.set(clusterId, { order, blocks: [], category: clusterMeta?.category || block.type });
    }
    clustersMap.get(clusterId)!.blocks.push(block);
  });

  // Ensure category info is set
  clustersMap.forEach((cluster) => {
    cluster.category = cluster.category || getClusterCategory(cluster.blocks);
  });

  const categoryIndex = new Map<string, number>();
  CATEGORY_ORDER.forEach((cat, idx) => categoryIndex.set(cat, idx));

  const paddingX = CITY_THEME.layout.paddingX;
  const paddingY = CITY_THEME.layout.paddingY;
  const gapX = CITY_THEME.layout.clusterGapX;
  const gapY = CITY_THEME.layout.clusterGapY;

  const positioned: PositionedBlock[] = [];
  const columnHeights = new Map<number, number>(); // Track bottom Y for each column
  const columnBaseX = new Map<number, number>(); // Track base X for each column for alignment
  const usedColumns = new Set<number>();

  // Separate main blocks (input, process, storage, output, impact) from contextual blocks (risk)
  const mainClusters: Array<{ order: number; blocks: ScenarioBlock[]; category: string }> = [];
  const contextualBlocks: ScenarioBlock[] = [];

  clustersMap.forEach((cluster) => {
    const isContextual = cluster.category === 'risk';
    if (isContextual) {
      contextualBlocks.push(...cluster.blocks);
    } else {
      mainClusters.push(cluster);
    }
  });

  // Sort main clusters by category and order
  const sortedClusters = mainClusters.sort((a, b) => {
    const catA = categoryIndex.get(a.category) ?? CATEGORY_ORDER.length;
    const catB = categoryIndex.get(b.category) ?? CATEGORY_ORDER.length;
    if (catA !== catB) return catA - catB;
    return a.order - b.order;
  });

  // Track which columns have their first block positioned
  const firstBlockInColumn = new Map<number, boolean>();
  
  // First, position main blocks in their columns
  sortedClusters.forEach((cluster) => {
    const col = categoryIndex.get(cluster.category) ?? CATEGORY_ORDER.length;
    usedColumns.add(col);

    // Calculate base X position - use cached value if exists for perfect column alignment
    let baseX = columnBaseX.get(col);
    if (baseX === undefined) {
      const rawBaseX = paddingX + col * gapX;
      const gridSnapBase = GRID * 0.25; // 10px snap
      baseX = Math.round(rawBaseX / gridSnapBase) * gridSnapBase;
      columnBaseX.set(col, baseX);
    }
    
    // For the first block in a column, always start from paddingY to ensure alignment
    // For subsequent blocks, use the column height
    const isFirstBlockInColumn = !firstBlockInColumn.has(col);
    let currentY: number;
    
    if (isFirstBlockInColumn) {
      // First block in column: always start from paddingY for consistent alignment
      currentY = paddingY;
      firstBlockInColumn.set(col, true);
    } else {
      // Subsequent blocks: use column height
      currentY = columnHeights.get(col) ?? paddingY;
      
      // Add extra spacing between clusters in the same column for airy feel
      if (columnHeights.has(col) && columnHeights.get(col)! > paddingY) {
        currentY += 24; // Extra breathing room between clusters
      }
    }
    
    // Snap starting Y to grid for consistent vertical alignment
    const gridSnapY = GRID * 0.25;
    currentY = Math.round(currentY / gridSnapY) * gridSnapY;

    // Sort blocks within cluster by their offset.y, then by index
    // This ensures consistent vertical ordering
    const sortedClusterBlocks = [...cluster.blocks].sort((a, b) => {
      const offsetA = a.config?.cluster?.offset?.y ?? 0;
      const offsetB = b.config?.cluster?.offset?.y ?? 0;
      if (offsetA !== offsetB) return offsetA - offsetB;
      // Secondary sort by label for consistent ordering
      return (a.label || '').localeCompare(b.label || '');
    });

    // Position blocks in cluster
    sortedClusterBlocks.forEach((block, blockIndex) => {
      const baseWidth = Math.max(
        block.config?.footprint?.width ?? CITY_THEME.blockDimensions.width,
        CITY_THEME.blockDimensions.width
      );
      const baseHeight = Math.max(
        block.config?.footprint?.height ?? CITY_THEME.blockDimensions.height,
        CITY_THEME.blockDimensions.height
      );

      // Calculate adaptive height based on label length
      const contentWidth = Math.max(120, baseWidth - 32);
      const charsPerLine = Math.max(14, Math.round(contentWidth / 8));
      const labelLength = block.label?.length ?? 0;
      const estimatedLabelLines = Math.max(1, Math.ceil(labelLength / charsPerLine));
      const extraLineAllowance = Math.max(0, estimatedLabelLines - 2);
      const adaptiveHeight = baseHeight + extraLineAllowance * 18;
      const clampedHeight = Math.min(adaptiveHeight, baseHeight * 2.2);

      // Calculate horizontal position - align all blocks in column to same base X
      // For strict alignment, we can ignore small offsets or use them minimally
      const offset = block.config?.cluster?.offset ?? { x: 0, y: 0 };
      
      // For better alignment, only apply offset if it's significant
      // Otherwise, keep all blocks in column aligned to baseX
      const shouldApplyOffset = Math.abs(offset.x ?? 0) > 0.5; // Only if offset > 0.5 grid units
      let x: number;
      
      if (shouldApplyOffset) {
        // Limit horizontal offset to very small values to maintain column alignment
        const maxHorizontalOffset = GRID * 0.5; // Max 20px offset
        const rawHorizontalOffset = Math.max(-maxHorizontalOffset, Math.min(maxHorizontalOffset, (offset.x ?? 0) * GRID));
        // Snap to quarter grid for precise alignment
        const gridSnapX = GRID * 0.25; // 10px snap
        const horizontalOffset = Math.round(rawHorizontalOffset / gridSnapX) * gridSnapX;
        x = baseX + horizontalOffset;
      } else {
        // Strict alignment - all blocks in column share same X
        x = baseX;
      }

      // Find non-overlapping Y position with strict geometric alignment
      const minSpacing = 32; // Increased spacing for more airy layout
      const rawY = findNonOverlappingY(x, baseWidth, clampedHeight, positioned, currentY, minSpacing);
      
      // Snap to grid for strict geometric alignment
      // Use quarter grid (10px) for precise vertical alignment
      const gridSnap = GRID * 0.25; // 10px snap for precise alignment
      const y = Math.round(rawY / gridSnap) * gridSnap;

      positioned.push({
        block,
        position: { x, y },
        size: { width: baseWidth, height: clampedHeight },
      });

      // Update column height to the bottom of this block + generous spacing
      const blockBottom = y + clampedHeight;
      const verticalSpacing = minSpacing + 8; // Extra spacing for airy feel
      const newColumnHeight = blockBottom + verticalSpacing;
      columnHeights.set(col, Math.max(columnHeights.get(col) ?? paddingY, newColumnHeight));
      currentY = newColumnHeight;
    });
  });

  // Now position contextual blocks (risk, impact) near their connected blocks
  contextualBlocks.forEach((block) => {
    // Find blocks this contextual block is connected to
    const connectedBlockIds = new Set<string>();
    
    // Find connections where this block is the target (risk/impact connected FROM something)
    connections.forEach((conn) => {
      if (conn.to === block.id) {
        connectedBlockIds.add(conn.from);
      }
    });
    
    // Find connections where this block is the source (risk/impact connected TO something)
    connections.forEach((conn) => {
      if (conn.from === block.id) {
        connectedBlockIds.add(conn.to);
      }
    });

    // Find the positioned blocks this contextual block is connected to
    const connectedPositioned = positioned.filter((p) => connectedBlockIds.has(p.block.id));
    
    let x: number;
    let y: number;

    if (connectedPositioned.length > 0) {
      // Calculate average position of connected blocks for better centering
      const avgX = connectedPositioned.reduce((sum, p) => sum + getBounds(p).right, 0) / connectedPositioned.length;
      const avgY = connectedPositioned.reduce((sum, p) => {
        const bounds = getBounds(p);
        return sum + bounds.y + bounds.height / 2;
      }, 0) / connectedPositioned.length;
      
      // Position to the right of the average position with spacing
      const offsetX = 220; // Space to the right
      x = avgX + offsetX;
      
      // Align vertically with the average center
      const blockHeight = Math.max(
        block.config?.footprint?.height ?? CITY_THEME.blockDimensions.height,
        CITY_THEME.blockDimensions.height
      );
      y = avgY - (blockHeight / 2);
      
      // Snap to grid
      const gridSnap = GRID * 0.25;
      x = Math.round(x / gridSnap) * gridSnap;
      y = Math.round(y / gridSnap) * gridSnap;
      
      // Ensure no overlap with existing blocks
      const blockWidth = Math.max(
        block.config?.footprint?.width ?? CITY_THEME.blockDimensions.width,
        CITY_THEME.blockDimensions.width
      );
      y = findNonOverlappingY(x, blockWidth, blockHeight, positioned, y, 32);
    } else {
      // No connections found - fallback to column positioning
      const col = categoryIndex.get(block.type) ?? CATEGORY_ORDER.length;
      let baseX = columnBaseX.get(col);
      if (baseX === undefined) {
        const rawBaseX = paddingX + col * gapX;
        const gridSnapBase = GRID * 0.25;
        baseX = Math.round(rawBaseX / gridSnapBase) * gridSnapBase;
        columnBaseX.set(col, baseX);
      }
      x = baseX;
      
      let currentY = columnHeights.get(col) ?? paddingY;
      const gridSnapY = GRID * 0.25;
      currentY = Math.round(currentY / gridSnapY) * gridSnapY;
      
      const blockWidth = Math.max(
        block.config?.footprint?.width ?? CITY_THEME.blockDimensions.width,
        CITY_THEME.blockDimensions.width
      );
      const blockHeight = Math.max(
        block.config?.footprint?.height ?? CITY_THEME.blockDimensions.height,
        CITY_THEME.blockDimensions.height
      );
      
      y = findNonOverlappingY(x, blockWidth, blockHeight, positioned, currentY, 32);
      
      const blockBottom = y + blockHeight;
      const newColumnHeight = blockBottom + 40;
      columnHeights.set(col, Math.max(columnHeights.get(col) ?? paddingY, newColumnHeight));
    }

    // Calculate adaptive height
    const baseWidth = Math.max(
      block.config?.footprint?.width ?? CITY_THEME.blockDimensions.width,
      CITY_THEME.blockDimensions.width
    );
    const baseHeight = Math.max(
      block.config?.footprint?.height ?? CITY_THEME.blockDimensions.height,
      CITY_THEME.blockDimensions.height
    );
    const contentWidth = Math.max(120, baseWidth - 32);
    const charsPerLine = Math.max(14, Math.round(contentWidth / 8));
    const labelLength = block.label?.length ?? 0;
    const estimatedLabelLines = Math.max(1, Math.ceil(labelLength / charsPerLine));
    const extraLineAllowance = Math.max(0, estimatedLabelLines - 2);
    const adaptiveHeight = baseHeight + extraLineAllowance * 18;
    const clampedHeight = Math.min(adaptiveHeight, baseHeight * 2.2);

    positioned.push({
      block,
      position: { x, y },
      size: { width: baseWidth, height: clampedHeight },
    });
  });

  // Calculate canvas dimensions
  const columnCount = usedColumns.size || 1;
  const maxColumnHeight = Math.max(...Array.from(columnHeights.values()), paddingY);
  const maxRows = Math.ceil((maxColumnHeight - paddingY) / gapY) + 1;

  return {
    blocks: positioned,
    columnCount,
    maxRows,
  };
};
