// ============================================================
// desktop/renderer/utils/api.ts
// Thin wrapper around __tokzeth() IPC calls — typed by global.d.ts
// ============================================================

// ---------- helpers ----------
async function invoke<T>(fn: () => Promise<T>): Promise<T> {
  return fn();
}

// ---------- clipboard ----------

export async function getClipboardText(): Promise<string> {
  return invoke(() => window.__tokzeth.getClipboard());
}

export async function setClipboardText(text: string): Promise<void> {
  await invoke(() => window.__tokzeth.setClipboard(text));
}

export async function simulatePaste(): Promise<boolean> {
  return invoke(() => window.__tokzeth.simulatePaste());
}

// ---------- optimize ----------

import type { OptimizeMode, OptimizeResponse } from "../../shared/types";

export async function optimizeText(
  text: string,
  mode: OptimizeMode,
): Promise<OptimizeResponse> {
  return invoke(() => window.__tokzeth.optimizeText(text, mode)) as OptimizeResponse;
}

// ---------- settings ----------

import type { AppSettings } from "../../shared/types";

export async function getSettings(): Promise<AppSettings> {
  return invoke(() => window.__tokzeth.getSettings()) as Promise<AppSettings>;
}

export async function setSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
  return invoke(() => window.__tokzeth.setSettings(patch)) as Promise<AppSettings>;
}

export async function resetSettings(): Promise<AppSettings> {
  return invoke(() => window.__tokzeth.resetSettings()) as Promise<AppSettings>;
}
