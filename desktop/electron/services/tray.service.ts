// ============================================================
// desktop/electron/services/tray.service.ts
// System tray — keeps the app running in background
// ─────────────────────────────────────────────────────────────
// reference: https://www.electronjs.org/docs/latest/api/tray
// ─────────────────────────────────────────────────────────────

import { Tray, Menu, nativeImage, app, BrowserWindow } from "electron";
import path from "path";

let tray: Tray | null = null;

const TRAY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const getMainWindow = (): BrowserWindow | null => {
  const w = BrowserWindow.getAllWindows().find(b => !b.isDestroyed());
  return w ?? null;
};

export function initTray(): Tray {
  const svg = nativeImage.createFromDataURL(
    `data:image/svg+xml;base64,${Buffer.from(TRAY_SVG).toString("base64")}`
  );

  tray = new Tray(svg);
  tray.setToolTip("TokZeth — press Alt+Z to optimize text");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open TokZeth",
      click: () => { const w = getMainWindow(); w?.show(); w?.focus(); },
    },
    { type: "separator" },
    {
      label: "Quit TokZeth",
      click: () => app.quit(),
    },
  ]);

  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    const w = getMainWindow();
    if (w) { w.isVisible() ? w.hide() : w.show(); }
  });

  console.log("[TokZeth] System tray initialised");
  return tray;
}
