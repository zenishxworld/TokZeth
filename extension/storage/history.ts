import { Storage } from "@plasmohq/storage";
import type { OptimizeMode } from "./settings";

export interface HistoryEntry {
  id: string;
  original: string;
  optimized: string;
  mode: OptimizeMode;
  timestamp: number;
}

const STORAGE_KEY = "prompt_history";
const MAX_ENTRIES = 10;

const storage = new Storage();

export async function addHistoryEntry(
  entry: Omit<HistoryEntry, "id">
): Promise<void> {
  const history = await getHistory();

  const newEntry: HistoryEntry = {
    ...entry,
    // Compact unique ID: timestamp + 5-char random suffix
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  };

  // Prepend newest, cap at MAX_ENTRIES
  const updated = [newEntry, ...history].slice(0, MAX_ENTRIES);
  await storage.set(STORAGE_KEY, updated);
}

export async function getHistory(): Promise<HistoryEntry[]> {
  const data = await storage.get<HistoryEntry[]>(STORAGE_KEY);
  return Array.isArray(data) ? data : [];
}

export async function clearHistory(): Promise<void> {
  await storage.set(STORAGE_KEY, []);
}
