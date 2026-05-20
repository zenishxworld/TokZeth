// ============================================================
// desktop/electron/ipc/handlers.ts
// ───────────────────────────────────────────────────────────
// Each exported member is an `(event, ...args) => Promise<T>` /
// plain callback — passed directly as the 2nd arg to
// `ipcMain.handle(channel, listener)` or `ipcMain.on(channel, listener)`.
//
// Type reference:
//   https://www.electronjs.org/docs/latest/api/ipc-main#ipcmainhandlechannel-listener
// ───────────────────────────────────────────────────────────

import { ipcMain, app, BrowserWindow } from "electron";
import type {
  OptimizeMode,
  AppSettings,
  OptimizeResponse,
} from "../../shared/types";
import { refineText, createRefineResponseWithError } from "../../backend-core/services/refine.service";
import { DEFAULT_SETTINGS, VALID_MODES } from "../../shared/types";
import * as fs from "fs/promises";
import * as path from "node:path";

// ── Constants ─────────────────────────────────────────────────
const STORE_FILE = "tokzeth-settings.json";
let settings: AppSettings = { ...DEFAULT_SETTINGS };
let shortcutRegistered = false;

// ── Helper: active window ─────────────────────────────────────
function primaryWindow(): BrowserWindow | null {
  return BrowserWindow.getAllWindows().find(b => !b.isDestroyed()) ?? null;
}

// ── Helper: load / save settings on disk ─────────────────────
async function loadSettings(): Promise<AppSettings> {
  try {
    const raw = await fs.readFile(path.join(app.getPath("userData"), STORE_FILE), "utf-8");
    settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    settings = { ...DEFAULT_SETTINGS };
  }
  return settings;
}

async function saveSettings(): Promise<void> {
  try {
    await fs.writeFile(
      path.join(app.getPath("userData"), STORE_FILE),
      JSON.stringify(settings, null, 2)
    );
  } catch (e) {
    console.error("[TokZeth] settings.save:", e);
  }
}

// ── Helper: global shortcut plumbing ─────────────────────────
function normalizeAccel(input: string): string {
  if (!input) return "Alt+Z";
  return input
    .split("+")
    .map(s => s.trim().toLowerCase().replace(/^(cmd|ctrl|commandorcontrol)$/, "CommandOrControl"))
    .map(s => ["alt","shift"].includes(s) ? s[0].toUpperCase()+s.slice(1) : s[0].toUpperCase()+s.slice(1))
    .join("+");
}

async function applyShortcut(): Promise<void> {
  if (shortcutRegistered) {
    await (await import("electron")).globalShortcut.unregisterAll();
  }
  const combo  = normalizeAccel(settings.shortcut);
  const { globalShortcut } = await import("electron");
  const ok = globalShortcut.register(combo, onShortcutFired);
  shortcutRegistered = ok;
  console.log(ok ? `[TokZeth] shortcut → ${combo}` : `[TokZeth] shortcut FAILED → ${combo}`);
}

// ── Global shortcut ───────────────────────────────────────────
function onShortcutFired(): void {
  const w = primaryWindow();
  if (w && !w.isDestroyed()) {
    w.webContents.send("clipboard:trigger", { timestamp: Date.now() });
    w.webContents.send("overlay:show", {});
  }
}

// ── Clipboard handlers ────────────────────────────────────────
const clipboard_get: Parameters<typeof ipcMain.handle>[1] = async () => {
  const { clipboard } = await import("electron");
  return clipboard.readText();
};

const clipboard_set: Parameters<typeof ipcMain.handle>[1] = async (_e, text: string) => {
  const { clipboard } = await import("electron");
  clipboard.writeText(text);
};

const clipboard_paste: Parameters<typeof ipcMain.handle>[1] = async () => {
  // Writing to system clipboard already happened.
  // Electron then delegates to the OS native paste handler.
  return true;
};

// ── Optimize handler ──────────────────────────────────────────
const optimize_request: Parameters<typeof ipcMain.handle>[1] = async (
  _e, text: string, mode: OptimizeMode
): Promise<OptimizeResponse> => {
  console.log(`[TokZeth] optimize mode="${mode}" len=${text.length}`);
  try {
    return await refineText(text, mode);
  } catch (err: any) {
    console.error("[TokZeth] optimize.error:", err.message);
    return createRefineResponseWithError(text, mode, err.message);
  }
};

// ── Settings handlers ─────────────────────────────────────────
const settings_get: Parameters<typeof ipcMain.handle>[1] = async () =>
  ({ ...settings } as AppSettings);

const settings_set: Parameters<typeof ipcMain.handle>[1] = async (_e, patch: Partial<AppSettings>) => {
  if (VALID_MODES.includes(patch.mode as OptimizeMode))  settings.mode     = patch.mode     as OptimizeMode;
  if (typeof patch.autoPaste      === "boolean")           settings.autoPaste = patch.autoPaste;
  if (typeof patch.startupOnBoot  === "boolean")           settings.startupOnBoot = patch.startupOnBoot;
  if (typeof patch.shortcut       === "string")            { settings.shortcut = patch.shortcut;  await applyShortcut(); }
  if (typeof patch.apiKey         === "string")            settings.apiKey   = patch.apiKey;
  await saveSettings();
  return { ...settings } as AppSettings;
};

const settings_reset: Parameters<typeof ipcMain.handle>[1] = async () => {
  settings = { ...DEFAULT_SETTINGS };
  await saveSettings();
  await applyShortcut();
  return { ...settings } as AppSettings;
};

// ── Mode handlers ─────────────────────────────────────────────
const overlay_get_mode: Parameters<typeof ipcMain.handle>[1] = async () => settings.mode;

const overlay_set_mode: Parameters<typeof ipcMain.handle>[1] = async (_e, mode: OptimizeMode): Promise<OptimizeMode> => {
  settings.mode = mode;
  await saveSettings();
  return mode;
};

// ── Overlay show / hide ───────────────────────────────────────
const overlay_show: Parameters<typeof ipcMain.on>[1] = () => {
  (async () => {
    const w = primaryWindow();
    if (!w || w.isDestroyed()) return;
    const { screen } = await import("electron");
    const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
    const W = 520, H = 380;
    w.setPosition(
      Math.round((display.workArea.width  - W) / 2 + display.workArea.x),
      Math.round((display.workArea.height - H) / 2 + display.workArea.y),
    );
    w.show();
    w.focus();
  })();
};

const overlay_hide: Parameters<typeof ipcMain.on>[1] = () => { primaryWindow()?.hide(); };

// ── App boot (call once at startup) ──────────────────────────
export async function boot(): Promise<void> {
  settings = await loadSettings();
  await applyShortcut();
  console.log("[TokZeth] ready — mode:", settings.mode, " shortcut:", settings.shortcut);
}

// ── Register every IPC channel ────────────────────────────────
export function registerAll() {
  ipcMain.handle("clipboard:get",    clipboard_get);
  ipcMain.handle("clipboard:set",    clipboard_set);
  ipcMain.handle("clipboard:paste",  clipboard_paste);
  ipcMain.handle("optimize:request", optimize_request);
  ipcMain.handle("settings:get",     settings_get);
  ipcMain.handle("settings:set",     settings_set);
  ipcMain.handle("settings:reset",   settings_reset);
  ipcMain.handle("overlay:get-mode", overlay_get_mode);
  ipcMain.handle("overlay:set-mode", overlay_set_mode);
  // fire-and-forget listeners
  ipcMain.on("overlay:show", overlay_show);
  ipcMain.on("overlay:hide", overlay_hide);
}

