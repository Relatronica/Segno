import { ScenarioBlock, Connection } from '@/store/useAppStore';
import { PositionedBlock } from './layout';

export type NotePosition = {
  block: ScenarioBlock;
  position: { x: number; y: number };
  anchorBlockId: string; // ID of the block this note is attached to
};

/**
 * Determines which blocks should be shown as notes vs full blocks
 * and calculates their positions on the whiteboard
 */
type NoteBounds = {
  x: number;
  y: number;
  right: number;
  bottom: number;
};

const NOTE_WIDTH = 110;
const NOTE_HEIGHT = 50;
const NOTE_SPACING = 10;

function doNotesOverlap(a: NoteBounds, b: NoteBounds, margin = 8): boolean {
  return (
    a.x < b.right + margin &&
    a.right + margin > b.x &&
    a.y < b.bottom + margin &&
    a.bottom + margin > b.y
  );
}

function findNonOverlappingNoteY(
  x: number,
  existingNotes: NotePosition[],
  startY: number,
  minSpacing = NOTE_SPACING
): number {
  const candidateBounds: NoteBounds = {
    x,
    y: startY,
    right: x + NOTE_WIDTH,
    bottom: startY + NOTE_HEIGHT,
  };

  let currentY = startY;
  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    candidateBounds.y = currentY;
    candidateBounds.bottom = currentY + NOTE_HEIGHT;

    // Check for overlaps with all existing notes
    const hasOverlap = existingNotes.some((existing) => {
      const existingBounds: NoteBounds = {
        x: existing.position.x,
        y: existing.position.y,
        right: existing.position.x + NOTE_WIDTH,
        bottom: existing.position.y + NOTE_HEIGHT,
      };
      return doNotesOverlap(candidateBounds, existingBounds, minSpacing);
    });

    if (!hasOverlap) {
      return currentY;
    }

    // Find the lowest bottom of overlapping notes
    const overlappingNotes = existingNotes.filter((existing) => {
      const existingBounds: NoteBounds = {
        x: existing.position.x,
        y: existing.position.y,
        right: existing.position.x + NOTE_WIDTH,
        bottom: existing.position.y + NOTE_HEIGHT,
      };
      return doNotesOverlap(candidateBounds, existingBounds, minSpacing);
    });

    if (overlappingNotes.length === 0) {
      return currentY;
    }

    const maxBottom = Math.max(
      ...overlappingNotes.map((n) => n.position.y + NOTE_HEIGHT),
      currentY + NOTE_HEIGHT
    );
    currentY = maxBottom + minSpacing;
    attempts++;
  }

  return currentY;
}

export function calculateNotePositions(
  blocks: ScenarioBlock[],
  connections: Connection[],
  positionedBlocks: PositionedBlock[],
  visibleBlocks: PositionedBlock[] // Only blocks shown as full blocks (not notes)
): NotePosition[] {
  const notes: NotePosition[] = [];
  
  // Group notes by anchor block to distribute them vertically
  const notesByAnchor = new Map<string, Array<{ block: ScenarioBlock; anchor: PositionedBlock }>>();

  // Trova solo i blocchi di tipo "risk" come note contestuali.
  // I blocchi "impact" vengono mostrati come card a pieno titolo nella colonna Impatto.
  const contextualBlocks = blocks.filter((b) => b.type === 'risk');
  const unconnectedBlocks: ScenarioBlock[] = [];

  contextualBlocks.forEach((block) => {
    // Find the anchor block(s) this contextual block is connected to
    // For risk/impact blocks, connections are typically: from: anchor, to: risk/impact
    // So we look for connections where this block is the destination
    const anchorBlockIds = new Set<string>();
    
    connections.forEach((conn) => {
      // If this block is the destination, the source is the anchor
      if (conn.to === block.id) {
        anchorBlockIds.add(conn.from);
      }
      // Also check reverse connections (in case of bidirectional)
      if (conn.from === block.id) {
        anchorBlockIds.add(conn.to);
      }
    });

    // Find ALL blocks (visible and non-visible) that are anchors for this note
    // This helps us determine which anchors existed when the note was created
    const allAnchorIds = Array.from(anchorBlockIds);
    
    // Find the VISIBLE positioned blocks that are anchors for this note
    const anchorCandidates = visibleBlocks.filter((p) => anchorBlockIds.has(p.block.id));

    // IMPORTANT: Only show the note if at least one of its original anchors is still visible
    // If all original anchors are removed, the note should disappear, not jump to a different anchor
    if (anchorCandidates.length === 0) {
      // All anchors were removed - don't show this note
      return;
    }

    // Prefer the most relevant anchor based on type priority
    // Priority: process > output > input > storage > others
    const typePriority: Record<string, number> = {
      process: 4,
      output: 3,
      input: 2,
      storage: 1,
    };
    
    // Sort all anchors (including non-visible) by priority to find the primary anchor
    const allAnchorsWithPriority = allAnchorIds.map(id => {
      const positioned = positionedBlocks.find(p => p.block.id === id);
      if (!positioned) return null;
      return {
        id,
        positioned,
        priority: typePriority[positioned.block.type] || 0,
      };
    }).filter((a): a is NonNullable<typeof a> => a !== null);
    
    allAnchorsWithPriority.sort((a, b) => b.priority - a.priority);
    const primaryAnchorId = allAnchorsWithPriority[0]?.id;
    
    // Only show the note if its primary (highest priority) anchor is still visible
    // This prevents notes from "jumping" to secondary anchors when the primary is removed
    if (primaryAnchorId && !visibleBlocks.some(vb => vb.block.id === primaryAnchorId)) {
      // Primary anchor was removed - don't show this note
      return;
    }
    
    const sortedAnchors = [...anchorCandidates].sort((a, b) => {
      const priorityA = typePriority[a.block.type] || 0;
      const priorityB = typePriority[b.block.type] || 0;
      return priorityB - priorityA; // Higher priority first
    });
    
    // Use the highest priority anchor (or first if same priority)
    const anchor = sortedAnchors[0];
    
    if (!notesByAnchor.has(anchor.block.id)) {
      notesByAnchor.set(anchor.block.id, []);
    }
    notesByAnchor.get(anchor.block.id)!.push({ block, anchor });
  });

  // Position notes, distributing them in two columns for each anchor
  notesByAnchor.forEach((anchorNotes, anchorId) => {
    const anchor = anchorNotes[0].anchor;
    const anchorBounds = {
      x: anchor.position.x,
      y: anchor.position.y,
      right: anchor.position.x + anchor.size.width,
      bottom: anchor.position.y + anchor.size.height,
    };

    const baseX = anchorBounds.right + 20;
    const columnWidth = NOTE_WIDTH + NOTE_SPACING;
    
    // Split notes into two columns
    const midPoint = Math.ceil(anchorNotes.length / 2);
    const column1Notes = anchorNotes.slice(0, midPoint);
    const column2Notes = anchorNotes.slice(midPoint);

    // Position first column
    let currentY = anchorBounds.y + 8;
    column1Notes.forEach(({ block }) => {
      const noteY = findNonOverlappingNoteY(baseX, notes, currentY, NOTE_SPACING);

      notes.push({
        block,
        position: { x: baseX, y: noteY },
        anchorBlockId: anchor.block.id,
      });

      currentY = noteY + NOTE_HEIGHT + NOTE_SPACING;
    });

    // Position second column (if exists)
    if (column2Notes.length > 0) {
      currentY = anchorBounds.y + 8;
      column2Notes.forEach(({ block }) => {
        const noteY = findNonOverlappingNoteY(baseX + columnWidth, notes, currentY, NOTE_SPACING);

        notes.push({
          block,
          position: { x: baseX + columnWidth, y: noteY },
          anchorBlockId: anchor.block.id,
        });

        currentY = noteY + NOTE_HEIGHT + NOTE_SPACING;
      });
    }
  });

  // Position unconnected blocks (risk/impact without connections) in a default area
  if (unconnectedBlocks.length > 0 && visibleBlocks.length > 0) {
    // Use the first visible block as reference point
    const referenceBlock = visibleBlocks[0];
    const referenceX = referenceBlock.position.x + referenceBlock.size.width + 24;
    let defaultY = referenceBlock.position.y;

    unconnectedBlocks.forEach((block) => {
      const noteY = findNonOverlappingNoteY(referenceX, notes, defaultY, NOTE_SPACING);
      
      notes.push({
        block,
        position: { x: referenceX, y: noteY },
        anchorBlockId: '', // No anchor
      });

      defaultY = noteY + NOTE_HEIGHT + NOTE_SPACING;
    });
  }

  return notes;
}

/**
 * Determines if a block should be shown as a note or as a full block
 * Always in whiteboard mode: risk and impact blocks are shown as notes
 */
export function shouldShowAsNote(block: ScenarioBlock): boolean {
  // Mostra solo i blocchi di tipo "risk" come note;
  // i blocchi di tipo "impact" diventano una colonna dedicata nella whiteboard.
  return block.type === 'risk';
}

