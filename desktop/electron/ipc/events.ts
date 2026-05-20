// ============================================================
// desktop/electron/ipc/events.ts
// Typed IPC channel names
// Caller and handler must agree on these strings exactly.
// ============================================================

export const IPC = {
  // ── Clipboard ──────────────────────────────────────────
  GET_CLIPBOARD:       "clipboard:get",
  SET_CLIPBOARD:       "clipboard:set",
  SIMULATE_PASTE:      "clipboard:paste",

  // ── AI Optimization ───────────────────────────────────
  OPTIMIZE_TEXT:       "optimize:request",
  OPTIMIZE_RESULT:     "optimize:result",
  OPTIMIZE_ERROR:      "optimize:error",
  OPTIMIZE_PROGRESS:   "optimize:progress",

  // ── Settings ──────────────────────────────────────────
  GET_SETTINGS:        "settings:get",
  SET_SETTINGS:        "settings:set",
  RESET_SETTINGS:      "settings:reset",

  // ── State ─────────────────────────────────────────────
  SHOW_OVERLAY:        "overlay:show",
  HIDE_OVERLAY:        "overlay:hide",
  GET_MODE:            "overlay:get-mode",
  SET_MODE:            "overlay:set-mode",
} as const;
