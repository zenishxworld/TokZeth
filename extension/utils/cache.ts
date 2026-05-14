import type { OptimizeMode } from "../storage/settings";

interface CacheEntry {
  optimizedText: string;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes

export function getCacheKey(text: string, mode: OptimizeMode): string {
  return `${mode}:${text.trim()}`;
}

export function getCachedOptimization(text: string, mode: OptimizeMode): string | null {
  const key = getCacheKey(text, mode);
  const entry = cache.get(key);
  
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  
  return entry.optimizedText;
}

export function setCachedOptimization(text: string, mode: OptimizeMode, optimizedText: string): void {
  const key = getCacheKey(text, mode);
  cache.set(key, {
    optimizedText,
    timestamp: Date.now()
  });
}