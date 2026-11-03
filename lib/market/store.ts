import { promises as fs } from 'fs';
import path from 'path';

/**
 * The market snapshot as it is stored: the shape the band reads, plus the day it
 * was taken. It is kept out of the repository because the closes are third-party
 * data and cannot ride the project's own licences.
 */
export type MarketSnapshot = {
  /** The trading day worth 100 on every line. */
  baseDate: string;
  /** When this snapshot was pulled, so a band that stopped updating is visible. */
  updatedAt: string;
  series: {
    actorId: string;
    ticker: string;
    exchange: string;
    /** The close 100 stands for: `index / 100 * baseClose` is the price it was. */
    baseClose: number;
    /** `[date, index]`, oldest first, thinned to the last close of each week. */
    points: [string, number][];
  }[];
};

const STORE_NAME = 'segno-market';
const STORE_KEY = 'snapshot.json';
const LOCAL_PATH = path.join(process.cwd(), '.data', 'market.json');

async function readBlobs(): Promise<MarketSnapshot | null> {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore({ name: STORE_NAME, consistency: 'strong' });
    const raw = await store.get(STORE_KEY, { type: 'text' });
    return raw ? (JSON.parse(raw) as MarketSnapshot) : null;
  } catch {
    return null;
  }
}

async function writeBlobs(snapshot: MarketSnapshot): Promise<boolean> {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore({ name: STORE_NAME, consistency: 'strong' });
    await store.set(STORE_KEY, JSON.stringify(snapshot));
    return true;
  } catch {
    return false;
  }
}

async function readLocal(): Promise<MarketSnapshot | null> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_PATH, 'utf8')) as MarketSnapshot;
  } catch {
    return null;
  }
}

/**
 * Blobs where the site runs, the working copy otherwise. The band reads whatever
 * is freshest and stays out of the chart when there is nothing yet, rather than
 * showing a series that stopped being true.
 */
export async function loadMarketSnapshot(): Promise<MarketSnapshot | null> {
  const fromBlobs = await readBlobs();
  if (fromBlobs) return fromBlobs;
  return readLocal();
}

/** Never overwrites with a partial pull: the caller only saves a whole one. */
export async function saveMarketSnapshot(snapshot: MarketSnapshot): Promise<void> {
  if (await writeBlobs(snapshot)) return;
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(snapshot), 'utf8');
}
