import { useState, useCallback } from "react";
import type { OptimizeMode } from "../storage/settings";
import { addHistoryEntry } from "../storage/history";
import { getCachedOptimization, setCachedOptimization } from "../utils/cache";

interface UseRefineState {
  loading: boolean;
  error: string | null;
  result: string | null;
}

interface UseRefineReturn extends UseRefineState {
  refine: (text: string, mode: OptimizeMode) => Promise<string | null>;
  reset: () => void;
}

export function useRefine(): UseRefineReturn {
  const [state, setState] = useState<UseRefineState>({
    loading: false,
    error: null,
    result: null,
  });

  const refine = useCallback(async (
    text: string,
    mode: OptimizeMode
  ): Promise<string | null> => {
    setState({ loading: true, error: null, result: null });

    const cached = getCachedOptimization(text, mode);
    if (cached) {
      setState({ loading: false, error: null, result: cached });
      return cached;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        type: "REFINE_TEXT",
        payload: { text, mode },
      });

      if (response?.success && response.optimized) {
        const optimized: string = response.optimized;
        
        setCachedOptimization(text, mode, optimized);

        // Save to history — non-blocking, failure is silently swallowed
        addHistoryEntry({
          original: text,
          optimized,
          mode,
          timestamp: Date.now(),
        }).catch(() => {});

        setState({ loading: false, error: null, result: optimized });
        return optimized;
      }

      const err = response?.error ?? "Optimization failed";
      setState({ loading: false, error: err, result: null });
      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setState({ loading: false, error: message, result: null });
      return null;
    }
  }, []);

  const reset = useCallback(() => setState({ loading: false, error: null, result: null }), []);

  return { ...state, refine, reset };
}
