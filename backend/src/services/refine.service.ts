// Core business logic for prompt optimization.
// Routes call this — never call providers directly from routes.

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

  const result = await provider.complete(systemPrompt, userMessage);

  return {
    success: true,
    original: text,
    optimized: result.text,
    mode,
    tokensUsed: result.inputTokens + result.outputTokens,
    provider: provider.name,
  };
}
