// ============================================================
// desktop/electron/services/optimize.engine.ts
// Singleton AI engine — reused by main and renderer via preload
// ============================================================

import { refineText } from "../../backend-core/services/refine.service";
import type { OptimizeMode, OptimizeResponse } from "../../shared/types";

let isProcessing = false;

export async function runOptimize(
  text: string,
  mode: OptimizeMode,
  onProgress?: (stage: string) => void
): Promise<OptimizeResponse> {
  if (isProcessing) {
    return {
      success: false, original: text, optimized: "", mode,
      error: "Another optimization is already in progress",
    };
  }
  isProcessing = true;
  try {
    onProgress?.("thinking");
    const result = await refineText(text, mode);
    onProgress?.("done");
    return result;
  } finally {
    isProcessing = false;
  }
}

export function isEngineBusy(): boolean {
  return isProcessing;
}
