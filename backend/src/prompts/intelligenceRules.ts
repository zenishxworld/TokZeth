import type { OptimizeMode } from "../types";

export function generateIntelligenceRules(text: string, mode: OptimizeMode): string {
  const rules: string[] = [];
  const textLength = text.length;

  if (textLength < 50) {
    rules.push("- The input is very short. Expand it slightly for clarity if necessary, but keep it concise.");
  } else if (textLength > 1000) {
    rules.push("- The input is extremely long. Prioritize maximum token compression while retaining all core meaning.");
  }

  if (text.includes("- ") || text.includes("* ") || text.includes("1. ")) {
    rules.push("- The input contains lists or bullet points. Preserve this exact structural formatting carefully.");
  }

  if (/(function|const|let|var|class|interface|type|\{.*\})/i.test(text)) {
    rules.push("- The input contains code snippets or structural syntax. Preserve code formatting and technical accuracy heavily.");
  }

  if (rules.length === 0) {
    return "";
  }

  return `\n--- DYNAMIC INTELLIGENCE RULES ---\n${rules.join("\n")}\n`;
}