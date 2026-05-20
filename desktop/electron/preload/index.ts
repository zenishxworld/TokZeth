// ============================================================
// desktop/electron/preload/index.ts
// Type-safe preload bridge — renderer ↔ Electron main
// No nodeIntegration, no remote — 100% context-bridged IPC
// ============================================================

import { contextBridge, ipcRenderer } from "electron";
import type {
  OptimizeMode,
  OptimizeResponse,
  AppSettings,
} from "../../shared/types";

const CHANNELS = {
  // clipboard
  clipboardGet:  "clipboard:get",
  clipboardSet:  "clipboard:set",
  clipboardPaste:"clipboard:paste",
  // optimize
  optimizeRequest: "optimize:request",
  // settings
  settingsGet:   "settings:get",
  settingsSet:   "settings:set",
  settingsReset: "settings:reset",
  // overlay
  overlayShow:   "overlay:show",
  overlayHide:   "overlay:hide",
  overlayGetMode:"overlay:get-mode",
  overlaySetMode:"overlay:set-mode",
  // event listeners
  onClipboardTrigger:  "clipboard:trigger",
  onModeChanged:       "overlay:mode-changed",
} as const;

const api = {
  // ── Clipboard ─────────────────────────────────────────────
  getClipboard(): Promise<string> {
    return ipcRenderer.invoke(CHANNELS.clipboardGet);
  },

  setClipboard(text: string): Promise<void> {
    return ipcRenderer.invoke(CHANNELS.clipboardSet, text);
  },

  simulatePaste(): Promise<boolean> {
    return ipcRenderer.invoke(CHANNELS.clipboardPaste);
  },

  // ── Optimization ─────────────────────────────────────────
  optimizeText(text: string, mode: OptimizeMode): Promise<OptimizeResponse> {
    return ipcRenderer.invoke(CHANNELS.optimizeRequest, text, mode);
  },

  // ── Settings ─────────────────────────────────────────────
  getSettings(): Promise<AppSettings> {
    return ipcRenderer.invoke(CHANNELS.settingsGet);
  },

  setSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
    return ipcRenderer.invoke(CHANNELS.settingsSet, patch);
  },

  resetSettings(): Promise<AppSettings> {
    return ipcRenderer.invoke(CHANNELS.settingsReset);
  },

  // ── Mode ─────────────────────────────────────────────────
  getMode(): Promise<OptimizeMode> {
    return ipcRenderer.invoke(CHANNELS.overlayGetMode);
  },

  setMode(mode: OptimizeMode): Promise<OptimizeMode> {
    return ipcRenderer.invoke(CHANNELS.overlaySetMode, mode);
  },

  // ── Overlay show / hide ──────────────────────────────────
  showOverlay() {
    ipcRenderer.send(CHANNELS.overlayShow);
  },

  hideOverlay() {
    ipcRenderer.send(CHANNELS.overlayHide);
  },

  // ── Event listeners ──────────────────────────────────────
  onClipboardTrigger(cb: () => void) {
    ipcRenderer.on(CHANNELS.onClipboardTrigger, cb);
    return () => ipcRenderer.removeListener(CHANNELS.onClipboardTrigger, cb);
  },

  onModeChanged(cb: (m: OptimizeMode) => void) {
    ipcRenderer.on(CHANNELS.onModeChanged, (_event, payload: { mode: OptimizeMode }) => {
      cb(payload.mode);
    });
    return () => ipcRenderer.removeListener(CHANNELS.onModeChanged, cb);
  },
};

contextBridge.exposeInMainWorld("__tokzeth", api);

export type TokZethAPI = typeof api;
