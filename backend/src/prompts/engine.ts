import type { OptimizeMode } from "../types";
import { BASE_SYSTEM_PROMPT } from "./base";
import { MODE_PROMPTS } from "./modes";
import { generateIntelligenceRules } from "./intelligenceRules";

export interface BuiltPrompt {
  systemPrompt: string;
  userMessage: string;
}

// Assembles the final prompt sent to any AI provider.
// Structure: Base System + Mode Instructions + Dynamic Rules → User Text
export function buildPrompt(text: string, mode: OptimizeMode): BuiltPrompt {
  const modeInstruction = MODE_PROMPTS[mode];
  const intelligenceRules = generateIntelligenceRules(text, mode);

  const systemPrompt = `${BASE_SYSTEM_PROMPT}

--- OPTIMIZATION MODE: ${mode.toUpperCase()} ---
${modeInstruction}
${intelligenceRules}`;

  const userMessage = `Optimize the following text:\n\n${text}`;

  return { systemPrompt, userMessage };
}
