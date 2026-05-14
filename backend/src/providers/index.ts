// Provider registry — add new providers here as you add adapters.
// The active provider is controlled by the ACTIVE_PROVIDER env var.

import type { AIProvider } from "./types";
import { DeepSeekProvider } from "./deepseek";

type ProviderName = "deepseek" | "openai" | "claude" | "gemini";

const providerRegistry: Record<ProviderName, () => AIProvider> = {
  deepseek: () => new DeepSeekProvider(),
  // openai: () => new OpenAIProvider(),   ← add when ready
  // claude: () => new ClaudeProvider(),   ← add when ready
  // gemini: () => new GeminiProvider(),   ← add when ready
  openai: () => { throw new Error("OpenAI provider not yet implemented"); },
  claude: () => { throw new Error("Claude provider not yet implemented"); },
  gemini: () => { throw new Error("Gemini provider not yet implemented"); },
};

let activeProvider: AIProvider | null = null;

export function getProvider(): AIProvider {
  if (activeProvider) return activeProvider;

  const name = (process.env.ACTIVE_PROVIDER ?? "deepseek") as ProviderName;
  const factory = providerRegistry[name];

  if (!factory) {
    throw new Error(`Unknown AI provider: "${name}". Valid: ${Object.keys(providerRegistry).join(", ")}`);
  }

  activeProvider = factory();
  return activeProvider;
}

export type { AIProvider };
