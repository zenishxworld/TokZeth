import type { OptimizeMode } from "../types";
import { BASE_SYSTEM_PROMPT } from "./base";
import { MODE_PROMPTS } from "./modes";

export interface BuiltPrompt {
  systemPrompt: string;
  userMessage: string;
}

// Assembles the final prompt sent to any AI provider.
// Structure: Base System + Mode Instructions → User Text
export function buildPrompt(text: string, mode: OptimizeMode): BuiltPrompt {
  const modeInstruction = MODE_PROMPTS[mode];

  const systemPrompt = `${BASE_SYSTEM_PROMPT}

--- OPTIMIZATION MODE: ${mode.toUpperCase()} ---
${modeInstruction}`;

  const userMessage = `Optimize the following text:\n\n${text}`;

  return { systemPrompt, userMessage };
}
