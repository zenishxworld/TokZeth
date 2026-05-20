// ============================================================
// desktop/backend-core/providers/types.ts
// Provider interface — reused directly from extension backend
// ============================================================

export interface AIProviderResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export interface AIProvider {
  name: string;
  complete(systemPrompt: string, userMessage: string): Promise<AIProviderResponse>;
}
