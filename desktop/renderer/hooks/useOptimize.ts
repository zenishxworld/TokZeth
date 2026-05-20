// ============================================================
// desktop/renderer/useOptimize.ts
// Full optimization lifecycle hook
//
// Flow:
//   getClipboardText() → optimizeText() → setClipboard() → simulatePaste()
//
// Alt+Shift+Z fires via globalShortcut → ipcMain → this hook
// ============================================================

import { useState, useCallback, useRef, useEffect } from "react";
import type { OptimizeMode } from "../../shared/types";

type OptimizeState =
  | { status: "idle" }
  | { status: "loading"; stage: string }
  | { status: "success"; original: string; optimized: string; mode: string; tokensUsed?: number }
  | { status: "error"; message: string };

export function useOptimize(initialMode: OptimizeMode) {
  const [state, setState] = useState<OptimizeState>({ status: "idle" });
  const [mode, setModeState] = useState<OptimizeMode>(initialMode);
  const busyRef = useRef(false);

  // ── Core pipeline ─────────────────────────────────────────
  const run = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    try {
      setState({ status: "loading", stage: "Capture clipboard…" });
      const text = await clip.get();

      if (!text.trim()) {
        setState({ status: "error", message: "Clipboard is empty — copy text first and press Alt+Shift+Z again." });
        busyRef.current = false;
        return;
      }

      setState({ status: "loading", stage: "Optimizing…" });
      const result = await clip.optimize(text, mode);

      if (!result.success) {
        setState({
          status: "error",
          message: result.error || "Unknown error. Check API key and network.",
        });
        busyRef.current = false;
        return;
      }

      await clip.replace(result.optimized);
      await clip.simulatePaste();

      setState({
        status: "success",
        original: result.original,
        optimized: result.optimized,
        mode: result.mode,
        tokensUsed: result.tokensUsed,
      });
    } catch (err: any) {
      console.error("[TokZeth] pipeline:", err);
      setState({ status: "error", message: err.message || "Unexpected error." });
    } finally {
      busyRef.current = false;
    }
  }, [mode]);

  // ── Helpers ───────────────────────────────────────────────
  const retry   = useCallback(() => (state.status === "error" ? run() : null), [run, state.status]);
  const reset   = useCallback(() => setState({ status: "idle" }), []);
  const setMode = useCallback((m: OptimizeMode) => {
    setModeState(m);
    window.__tokzeth?.setMode(m).catch(console.error);
  }, []);

  // ── Auto-close after success ──────────────────────────────
  useEffect(() => {
    if (state.status === "success") {
      const t = setTimeout(() => window.close?.(), 1800);
      return () => clearTimeout(t);
    }
  }, [state]);

  return { state, mode, setMode, run, retry, reset, busy: busyRef.current };
}

// short alias to keep useOptimize body clean
const clip = {
  get:       () => window.__tokzeth.getClipboard(),
  optimize:  (t: string, m: OptimizeMode) => window.__tokzeth.optimizeText(t, m),
  replace:   (t: string)      => window.__tokzeth.setClipboard(t),
  simulatePaste: ()          => window.__tokzeth.simulatePaste(),
};
