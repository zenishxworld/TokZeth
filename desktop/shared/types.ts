// ============================================================
// desktop/shared/types.ts
// Canonical types — shared between Electron main, preload, and renderer
// ============================================================

export type OptimizeMode =
  | "compress"
  | "enhance"
  | "coding"
  | "professional"
  | "humanize"
  | "email";

export const VALID_MODES: OptimizeMode[] = [
  "compress", "enhance", "coding", "professional", "humanize", "email",
];

export interface OptimizeRequest {
  text: string;
  mode: OptimizeMode;
}

export interface OptimizeResponse {
  success: boolean;
  original: string;
  optimized: string;
  mode: OptimizeMode;
  tokensUsed?: number;
  provider?: string;
  error?: string;
}

export interface AppSettings {
  shortcut: string;           // e.g. "CommandOrControl+Shift+Z" — COMBO
  mode: OptimizeMode;          // currently selected mode
  autoPaste: boolean;          // auto-paste optimized result back
  startupOnBoot: boolean;      // launch at Windows login
  apiKey: string;              // DeepSeek API key
}

export const DEFAULT_SETTINGS: AppSettings = {
  shortcut: "Alt+Shift+Z",
  mode: "compress",
  autoPaste: true,
  startupOnBoot: false,
  apiKey: "",
};
