// ============================================================
// desktop/backend-core/prompts/intelligenceRules.ts
// Dynamic rules based on text context — reused directly
// ============================================================

import type { OptimizeMode } from "../types";

export function generateIntelligenceRules(text: string, _mode: OptimizeMode): string {
  const rules: string[] = [];
  const textLength = text.length;

  if (textLength < 50) {
    rules.push("- The input is very short. Expand it slightly for clarity if necessary, but keep it concise.");
  } else if (textLength > 1000) {
    rules.push("- The input is extremely long. Prioritize maximum token compression while retaining all core meaning.");
  }

  if (text.includes("- ") || text.includes("* ") || /^\d+\.\s/m.test(text)) {
    rules.push("- The input contains lists or bullet points. Preserve structural formatting carefully.");
  }

  if (/(function|const|let|var|class|interface|type|=>\s*\{)/i.test(text)) {
    rules.push("- The input contains code snippets. Preserve code formatting and technical accuracy.");
  }

  if (rules.length === 0) return "";
  return `\n--- DYNAMIC INTELLIGENCE RULES ---\n${rules.join("\n")}\n`;
}
