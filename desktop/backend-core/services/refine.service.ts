// ============================================================
// desktop/backend-core/services/refine.service.ts
// Core optimization service — reused directly
// ============================================================

import { buildPrompt } from "../prompts/engine";
import { getProvider } from "../providers";
import type { OptimizeMode, RefineResponse } from "../types";

export async function refineText(
  text: string,
  mode: OptimizeMode,
  userId?: string
): Promise<RefineResponse> {
  const provider = getProvider();
  const { systemPrompt, userMessage } = buildPrompt(text, mode);

  const result = await Promise.race([
    provider.complete(systemPrompt, userMessage),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("AI request timed out")), 45000)
    ),
  ]);

  return {
    success: true,
    original: text,
    optimized: result.text,
    mode,
    tokensUsed: result.inputTokens + result.outputTokens,
    provider: provider.name,
  };
}

export function createRefineResponseWithError(
  original: string,
  mode: OptimizeMode,
  error: string,
  provider?: string
): RefineResponse {
  return {
    success: false,
    original,
    optimized: "",
    mode,
    error,
    provider,
  };
}
