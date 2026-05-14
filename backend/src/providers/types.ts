// Interface every AI provider adapter must implement.
// This allows swapping providers without touching route logic.

export interface AIProviderResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export interface AIProvider {
  name: string;
  complete(systemPrompt: string, userMessage: string): Promise<AIProviderResponse>;
}
