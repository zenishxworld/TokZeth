// ============================================================
// Shared Types — used by backend, extension, and web
// ============================================================

// ---- Prompt Optimization Modes ----
export type OptimizeMode =
  | "compress"
  | "enhance"
  | "coding"
  | "professional"
  | "humanize"
  | "email";

// ---- API Request ----
export interface RefineRequest {
  text: string;
  mode: OptimizeMode;
  userId?: string;
}

// ---- API Response ----
export interface RefineResponse {
  success: boolean;
  original: string;
  optimized: string;
  mode: OptimizeMode;
  tokensUsed?: number;
  error?: string;
}

// ---- AI Provider Names ----
export type AIProvider = "deepseek" | "claude" | "openai" | "gemini";

// ---- Provider Config ----
export interface ProviderConfig {
  provider: AIProvider;
  apiKey: string;
  model?: string;
}

// ---- Usage Record (for DB logging) ----
export interface UsageRecord {
  id?: string;
  userId: string;
  mode: OptimizeMode;
  provider: AIProvider;
  inputTokens: number;
  outputTokens: number;
  createdAt?: string;
}

// ---- Extension Message Types ----
export type ExtensionMessageType =
  | "REFINE_TEXT"
  | "REFINE_RESULT"
  | "REFINE_ERROR"
  | "GET_SELECTED_TEXT"
  | "REPLACE_TEXT";

export interface ExtensionMessage {
  type: ExtensionMessageType;
  payload?: unknown;
}
