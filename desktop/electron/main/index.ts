// ============================================================
// desktop/electron/main/index.ts
// TokZeth Desktop — Electron Main Process
// ============================================================

import {
  app, BrowserWindow, type BrowserWindowConstructorOptions,
} from "electron";
import { join } from "path";

// ── Path helpers ────────────────────────────────────────────
function root(...segments: string[]) {
  return join(__dirname, "..", "..", ...segments);
}

// ── Prevent multiple instances ──────────────────────────────
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit(0);
}

// ── Global ref so IPC handlers can locate the window ─────────
declare global {
  namespace NodeJS { interface Global { __tokMainWin?: BrowserWindow } }
}
global.__tokMainWin = undefined;

// ── Window config ────────────────────────────────────────────
const isDev = process.env.NODE_ENV !== "production";
const WIN_OPTS: BrowserWindowConstructorOptions = {
  width: 520,
  height: 380,
  frame: false,
  transparent: true,
  alwaysOnTop: true,
  resizable: true,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,
  skipTaskbar: true,
  webPreferences: {
    preload: root("electron", "preload", "index.js"),
    contextIsolation: true,
    sandbox: false,
    nodeIntegration: false,
    worldSafeExecuteJavaScript: true,
  },
};

// ── Create the floating overlay window ──────────────────────
function createWindow(): BrowserWindow {
  const win = new BrowserWindow(WIN_OPTS);
  global.__tokMainWin = win;

  win.setAlwaysOnTop(true, "normal");
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  win.on("blur", () => {
    setTimeout(() => { if (!win.isDestroyed()) win.hide(); }, 180);
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(root("dist", "index.html"));
  }

  // Make window draggable via the title bar
  win.on("ready-to-show", () => {
    const { screen } = require("electron") as typeof import("electron");
    const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
    const w = 520, h = 380;
    win.setPosition(
      Math.round((display.workArea.width  - w) / 2 + display.workArea.x),
      Math.round((display.workArea.height - h) / 2 + display.workArea.y),
    );
  });

  return win;
}

// ── App boot ─────────────────────────────────────────────────
app.whenReady().then(async () => {
  const mainWin = createWindow();

  // register IPC handlers
  const { registerAll, boot } = await import("./ipc/handlers");
  await boot();
  registerAll();

  // init tray
  (await import("./services/tray.service"));

  // handle second-instance
  app.on("second-instance", () => {
    if (!mainWin.isDestroyed()) { mainWin.show(); mainWin.focus(); }
  });
});

app.on("will-quit", async () => {
  const { globalShortcut } = await import("electron");
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  // keep alive for system-tray
});
