// ============================================================
// desktop/backend-core/prompts/engine.ts
// Prompt assembler — reused directly
// ============================================================

import type { OptimizeMode } from "../types";
import { BASE_SYSTEM_PROMPT } from "./base";
import { MODE_PROMPTS } from "./modes";
import { generateIntelligenceRules } from "../intelligence/rules";

export interface BuiltPrompt {
  systemPrompt: string;
  userMessage: string;
}

export function buildPrompt(text: string, mode: OptimizeMode): BuiltPrompt {
  const modeInstruction = MODE_PROMPTS[mode];
  const dynamicRules = generateIntelligenceRules(text, mode);

  const systemPrompt = `${BASE_SYSTEM_PROMPT}

--- OPTIMIZATION MODE: ${mode.toUpperCase()} ---
${modeInstruction}${dynamicRules}`;

  const userMessage = `Optimize the following text:\n\n${text}`;

  return { systemPrompt, userMessage };
}
