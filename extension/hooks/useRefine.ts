import { useState } from "react";
import type { OptimizeMode } from "../storage/settings";

interface UseRefineState {
  loading: boolean;
  error: string | null;
  result: string | null;
}

interface UseRefineReturn extends UseRefineState {
  refine: (text: string, mode: OptimizeMode) => Promise<string | null>;
  reset: () => void;
}

// Hook used by the popup to trigger text optimization
export function useRefine(): UseRefineReturn {
  const [state, setState] = useState<UseRefineState>({
    loading: false,
    error: null,
    result: null,
  });

  const refine = async (
    text: string,
    mode: OptimizeMode
  ): Promise<string | null> => {
    setState({ loading: true, error: null, result: null });

    try {
      const response = await chrome.runtime.sendMessage({
        type: "REFINE_TEXT",
        payload: { text, mode },
      });

      if (response?.success && response.optimized) {
        setState({ loading: false, error: null, result: response.optimized });
        return response.optimized;
      } else {
        const err = response?.error ?? "Optimization failed";
        setState({ loading: false, error: err, result: null });
        return null;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setState({ loading: false, error: message, result: null });
      return null;
    }
  };

  const reset = () => {
    setState({ loading: false, error: null, result: null });
  };

  return { ...state, refine, reset };
}
