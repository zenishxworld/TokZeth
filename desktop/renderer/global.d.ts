// ============================================================
// Renderer globals — injected by preload
// ============================================================

export type TokZethAPI = {
  getClipboard: () => Promise<string>;
  setClipboard: (text: string) => Promise<void>;
  simulatePaste: () => Promise<boolean>;
  optimizeText: (text: string, mode: string) => Promise<{
    success: boolean; original: string; optimized: string;
    mode: string; tokensUsed?: number; provider?: string; error?: string;
  }>;
  getSettings:     () => Promise<Record<string, unknown>>;
  setSettings:     (patch: Record<string, unknown>) => Promise<Record<string, unknown>>;
  resetSettings:   () => Promise<Record<string, unknown>>;
  getMode:  () => Promise<string>;
  setMode:  (mode: string) => Promise<string>;
  showOverlay:  () => void;
  hideOverlay:  () => void;
  onClipboardTrigger: (cb: () => void) => () => void;
};

declare global {
  interface Window {
    __tokzeth: TokZethAPI;
  }
}
