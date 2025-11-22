import { ScenarioBlock, useAppStore } from '@/store/useAppStore';
import { CITY_THEME } from './cityMappings';
import { CITY_BLUEPRINTS, CityBlueprint, DEFAULT_BLUEPRINT_FOR_TYPE } from './cityBlueprints';
import { getBlueprintClusterLabel, getBlueprintTitle } from '@/lib/i18n/blueprintTranslations';
import type { Locale } from '@/lib/i18n/translations';

type SimpleConnection = { from: string; to: string };

const GRID = CITY_THEME.gridSize;

type InstantiatedBlueprint = {
  blocks: ScenarioBlock[];
  connections: SimpleConnection[];
  primary?: ScenarioBlock;
  blueprint: CityBlueprint;
};

const randomId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

const instantiateBlueprint = (key: string, orderSeed = Date.now(), locale?: Locale): InstantiatedBlueprint => {
  const blueprint = CITY_BLUEPRINTS[key];
  if (!blueprint) {
    throw new Error(`Missing city blueprint: ${key}`);
  }

  const currentLocale = locale || useAppStore.getState().locale;
  const clusterId = `${key}-${orderSeed}-${Math.random().toString(36).substr(2, 5)}`;
  
  // Get translated cluster label
  const clusterLabel = getBlueprintClusterLabel(
    key,
    currentLocale,
    blueprint.clusterLabel ?? blueprint.title
  ) ?? getBlueprintTitle(key, currentLocale, blueprint.clusterLabel ?? blueprint.title);

  const blocks = blueprint.nodes.map((node, index) => {
    const widthUnits = node.footprint?.widthUnits ?? 3.5;
    const heightUnits = node.footprint?.heightUnits ?? 0.8;
    const minWidth = CITY_THEME.blockDimensions.width;
    const minHeight = CITY_THEME.blockDimensions.height;
    const widthPx = Math.max(widthUnits * GRID, minWidth);
    const heightPx = Math.max(heightUnits * GRID, minHeight);

    const block: ScenarioBlock = {
      id: randomId(`block-${key}`),
      type: node.type,
      label: node.label,
      position: { x: 0, y: 0 },
      config: {
        ...node.config,
        footprint: {
          width: widthPx,
          height: heightPx,
        },
        visual: node.visual,
        cluster: {
          id: clusterId,
          order: orderSeed,
          label: clusterLabel,
          offset: node.offset ?? { x: index * 2, y: 0 },
          category: blueprint.primaryType,
        },
        blueprintKey: key, // Track which blueprint created this block
      },
    };

    return block;
  });

  const connections =
    blueprint.localConnections?.map(({ from, to }) => ({
      from: blocks[from].id,
      to: blocks[to].id,
    })) ?? [];

  return {
    blocks,
    connections,
    primary: blocks[blueprint.primaryNodeIndex],
    blueprint,
  };
};

const findLatestByType = (blocks: ScenarioBlock[], type: ScenarioBlock['type']) => {
  const filtered = blocks.filter((b) => b.type === type);
  if (filtered.length === 0) return undefined;
  return filtered[filtered.length - 1];
};

export type CityGenerationResult = {
  blocks: ScenarioBlock[];
  connections: SimpleConnection[];
};

const ensureForType = (
  type: ScenarioBlock['type'],
  workingBlocks: ScenarioBlock[],
  pendingBlocks: ScenarioBlock[],
  pendingConnections: SimpleConnection[],
  orderSeed: number,
  locale: Locale,
  parentBlueprintKey?: string // Track which blueprint triggered creation of this block
): ScenarioBlock | undefined => {
  const existing = findLatestByType(workingBlocks, type);
  if (existing) return existing;

  const fallbackKey = DEFAULT_BLUEPRINT_FOR_TYPE[type];
  if (!fallbackKey) return undefined;

  const addition = instantiateBlueprint(fallbackKey, orderSeed + pendingBlocks.length + Math.random(), locale);
  // Mark these blocks as created by the parent blueprint if provided
  if (parentBlueprintKey) {
    addition.blocks.forEach((block) => {
      block.config = { ...block.config, parentBlueprintKey };
    });
  }
  pendingBlocks.push(...addition.blocks);
  pendingConnections.push(...addition.connections);
  addition.blocks.forEach((block) => workingBlocks.push(block));
  return addition.primary ?? addition.blocks[0];
};

const connect = (
  from: ScenarioBlock | undefined,
  to: ScenarioBlock | undefined,
  pendingConnections: SimpleConnection[]
) => {
  if (!from || !to || from.id === to.id) return;
  pendingConnections.push({ from: from.id, to: to.id });
};

const ensureSystemicImpacts = (
  workingBlocks: ScenarioBlock[],
  pendingBlocks: ScenarioBlock[],
  pendingConnections: SimpleConnection[],
  orderSeed: number,
  locale: Locale,
  attachFrom?: ScenarioBlock
) => {
  const systemicKeys = ['impact-energy', 'impact-social', 'impact-political'] as const;

  systemicKeys.forEach((key, idx) => {
    const labelMatch = key === 'impact-energy'
      ? 'Consumo Energetico'
      : key === 'impact-social'
      ? 'Equità & Accesso'
      : 'Trasparenza & Bias';
    const exists = workingBlocks.some((b) => b.label === labelMatch);
    if (exists) return;

    const systemic = instantiateBlueprint(key, orderSeed + 9000 + idx * 100, locale);
    pendingBlocks.push(...systemic.blocks);
    pendingConnections.push(...systemic.connections);
    systemic.blocks.forEach((block) => workingBlocks.push(block));

    const anchor =
      attachFrom ||
      findLatestByType(workingBlocks, 'process') ||
      findLatestByType(workingBlocks, 'output') ||
      findLatestByType(workingBlocks, 'input');

    if (anchor) {
      connect(anchor, systemic.primary, pendingConnections);
    }
  });
};

export const generateCityElements = (
  blueprintKey: string,
  existingBlocks: ScenarioBlock[],
  locale?: Locale
): CityGenerationResult => {
  // Check if this specific blueprint has already been instantiated
  const blueprintAlreadyExists = existingBlocks.some(
    block => block.config?.blueprintKey === blueprintKey
  );
  
  if (blueprintAlreadyExists) {
    // Return empty result if blueprint already exists
    return { blocks: [], connections: [] };
  }

  const currentLocale = locale || useAppStore.getState().locale;
  const orderSeed = Date.now();
  const base = instantiateBlueprint(blueprintKey, orderSeed, currentLocale);

  const newBlocks: ScenarioBlock[] = [...base.blocks];
  const newConnections: SimpleConnection[] = [...base.connections];
  const workingBlocks: ScenarioBlock[] = [...existingBlocks, ...newBlocks];

  const primary = base.primary;

  switch (base.blueprint.primaryType) {
    case 'input': {
      // Connetti ai blocchi process esistenti (strumenti AI)
      const existingProcess = findLatestByType(workingBlocks, 'process');
      if (existingProcess) {
        connect(primary, existingProcess, newConnections);
      } else {
        // Solo se non c'è un process esistente, creane uno generico (solo per progettisti)
        const isUserInput = blueprintKey.includes('-user') || blueprintKey === 'input-work' || blueprintKey === 'input-sensitive' || blueprintKey === 'input-others' || blueprintKey === 'input-public-user';
        if (!isUserInput) {
      const process = ensureForType('process', workingBlocks, newBlocks, newConnections, orderSeed, currentLocale, blueprintKey);
      connect(primary, process, newConnections);
        }
      }
      break;
    }
    case 'process': {
      // Connetti ai blocchi input esistenti (dati condivisi)
      const existingInput = findLatestByType(workingBlocks, 'input');
      if (existingInput) {
        connect(existingInput, primary, newConnections);
      }
      
      // Solo per progettisti: crea storage e output automaticamente se non esistono
      // Per utenti finali, storage e output vengono selezionati manualmente
      const isUserProcess = blueprintKey.startsWith('use-') && !blueprintKey.startsWith('use-case-');
      if (!isUserProcess) {
      const storage = ensureForType('storage', workingBlocks, newBlocks, newConnections, orderSeed, currentLocale, blueprintKey);
      connect(primary, storage, newConnections);

      const output = ensureForType('output', workingBlocks, newBlocks, newConnections, orderSeed, currentLocale, blueprintKey);
      connect(primary, output, newConnections);
      } else {
        // Per utenti finali: connetti solo agli output esistenti (casi d'uso)
        const existingOutput = findLatestByType(workingBlocks, 'output');
        if (existingOutput) {
          connect(primary, existingOutput, newConnections);
        }
      }
      break;
    }
    case 'storage': {
      // Identifica se è uno storage per utenti finali
      const isUserStorage = blueprintKey.startsWith('storage-cloud-') || blueprintKey === 'storage-local-user';
      
      if (isUserStorage) {
        // Per utenti finali: connetti lo storage ai blocchi esistenti nel flusso logico
        // Process -> Storage (lo strumento AI salva i dati)
        const existingProcess = findLatestByType(workingBlocks, 'process');
        if (existingProcess) {
          connect(existingProcess, primary, newConnections);
        }
        
        // Output -> Storage (i risultati vengono salvati)
        const existingOutput = findLatestByType(workingBlocks, 'output');
        if (existingOutput) {
          connect(existingOutput, primary, newConnections);
        }
        
        // Input -> Storage (se non c'è process, i dati vanno direttamente nello storage)
        if (!existingProcess) {
          const existingInput = findLatestByType(workingBlocks, 'input');
          if (existingInput) {
            connect(existingInput, primary, newConnections);
          }
        }
      } else {
        // Per progettisti: logica originale
        const existingProcess = findLatestByType(workingBlocks, 'process');
        if (existingProcess) {
          connect(existingProcess, primary, newConnections);
        } else {
      const process = ensureForType('process', workingBlocks, newBlocks, newConnections, orderSeed, currentLocale, blueprintKey);
      connect(process, primary, newConnections);
        }

        const existingOutput = findLatestByType(workingBlocks, 'output');
        if (existingOutput) {
          connect(existingOutput, primary, newConnections);
        } else {
      const output = ensureForType('output', workingBlocks, newBlocks, newConnections, orderSeed, currentLocale, blueprintKey);
      connect(primary, output, newConnections);
        }
      }

      // Aggiungi supervisione transfer per storage USA (solo per progettisti)
      if (base.blueprint.key === 'storage-us') {
        const hasTransferGuard = workingBlocks.some((b) => b.label === 'Supervisione Transfer');
        if (!hasTransferGuard) {
          const transfer = instantiateBlueprint('risk-transfer', orderSeed + 5000, currentLocale);
          // Mark these blocks as created by the parent blueprint
          transfer.blocks.forEach((block) => {
            block.config = { ...block.config, parentBlueprintKey: blueprintKey };
          });
          newBlocks.push(...transfer.blocks);
          newConnections.push(...transfer.connections);
          transfer.blocks.forEach((block) => workingBlocks.push(block));
          connect(primary, transfer.primary, newConnections);
        }
      }
      break;
    }
    case 'output': {
      // Per blocchi output (casi d'uso), connetti ai process (strumenti AI) e input (dati) esistenti
      const existingProcess = findLatestByType(workingBlocks, 'process');
      const existingInput = findLatestByType(workingBlocks, 'input');
      
      // Connetti process -> output (lo strumento AI genera l'output)
      if (existingProcess) {
        connect(existingProcess, primary, newConnections);
      }
      
      // Connetti input -> output (i dati condivisi generano l'output)
      if (existingInput) {
        connect(existingInput, primary, newConnections);
      }
      
      // Solo per progettisti: aggiungi oversight board se necessario
      const hasOversight = workingBlocks.some((b) => b.label === 'Oversight Board');
      const isUserOutput = blueprintKey.startsWith('use-case-');
      if (!hasOversight && !isUserOutput) {
        const oversight = instantiateBlueprint('risk-oversight', orderSeed + 6000, currentLocale);
        // Mark these blocks as created by the parent blueprint
        oversight.blocks.forEach((block) => {
          block.config = { ...block.config, parentBlueprintKey: blueprintKey };
        });
        newBlocks.push(...oversight.blocks);
        newConnections.push(...oversight.connections);
        oversight.blocks.forEach((block) => workingBlocks.push(block));
        connect(primary, oversight.primary, newConnections);
      }
      break;
    }
    case 'impact': {
      // Connetti l'impatto a tutti i blocchi process/output rilevanti
      const processBlocks = workingBlocks.filter((b) => b.type === 'process');
      const outputBlocks = workingBlocks.filter((b) => b.type === 'output');
      
      // Connetti al primo blocco principale se disponibile
      const anchor =
        findLatestByType(workingBlocks, 'process') ||
        findLatestByType(workingBlocks, 'output') ||
        findLatestByType(workingBlocks, 'input');
      if (anchor) {
        connect(anchor, primary, newConnections);
      }
      
      // Connetti anche agli altri blocchi process/output se ce ne sono molti
      if (processBlocks.length > 1 || outputBlocks.length > 1) {
        const additionalTargets = [...processBlocks, ...outputBlocks].slice(0, 2);
        additionalTargets.forEach((target) => {
          if (target.id !== anchor?.id) {
            connect(target, primary, newConnections);
          }
        });
      }
      break;
    }
    case 'risk': {
      // Connetti i blocchi risk ai blocchi principali (process, output, input, storage)
      const anchor =
        findLatestByType(workingBlocks, 'process') ||
        findLatestByType(workingBlocks, 'output') ||
        findLatestByType(workingBlocks, 'input') ||
        findLatestByType(workingBlocks, 'storage');
      if (anchor) {
        connect(anchor, primary, newConnections);
      }
      break;
    }
    default:
      break;
  }

  // Heuristic: if there is biometric data but no storage, enforce EU storage.
  const hasBiometric = workingBlocks.some((b) => b.config?.dataTypes?.includes('Biometrici'));
  const hasStorage = workingBlocks.some((b) => b.type === 'storage');
  if (hasBiometric && !hasStorage) {
    const storage = instantiateBlueprint('storage-eu', orderSeed + 7000, currentLocale);
    // Mark these blocks as created by the parent blueprint
    storage.blocks.forEach((block) => {
      block.config = { ...block.config, parentBlueprintKey: blueprintKey };
    });
    newBlocks.push(...storage.blocks);
    newConnections.push(...storage.connections);
    storage.blocks.forEach((block) => workingBlocks.push(block));
    connect(primary, storage.primary, newConnections);
  }

  // Heuristic: ensure outputs have a human-in-the-loop block if absent.
  const hasAutoDecision = workingBlocks.some((b) => b.label === 'Decisione Automatica');
  const hasHumanLoop = workingBlocks.some((b) => b.config?.humanInTheLoop);
  if (hasAutoDecision && !hasHumanLoop) {
    const oversight = instantiateBlueprint('risk-oversight', orderSeed + 8000, currentLocale);
    // Mark these blocks as created by the parent blueprint
    oversight.blocks.forEach((block) => {
      block.config = { ...block.config, parentBlueprintKey: blueprintKey };
    });
    newBlocks.push(...oversight.blocks);
    newConnections.push(...oversight.connections);
    oversight.blocks.forEach((block) => workingBlocks.push(block));
  }

  // Non generare automaticamente impatti sistemici - l'utente li seleziona esplicitamente dalla sidebar
  // const systemicAnchor = base.blueprint.primaryType === 'impact' ? undefined : primary;
  // ensureSystemicImpacts(
  //   workingBlocks,
  //   newBlocks,
  //   newConnections,
  //   orderSeed,
  //   systemicAnchor
  // );

  return {
    blocks: newBlocks,
    connections: newConnections,
  };
};

export { instantiateBlueprint };

