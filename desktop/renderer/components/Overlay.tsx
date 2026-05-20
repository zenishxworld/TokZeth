// ============================================================
// desktop/renderer/components/Overlay.tsx
// Floating desktop overlay — the main UI component
// Functions as the window frame + inner content
// ───
// Position: always-on-top, frameless, follows screen center
// Shortcut: Alt+Shift+Z — handled in main, fires trigger event
// ────────────────────────────────────────────────────────────
import { useEffect, useState, useCallback } from "react";
import { LoadingDots } from "./LoadingDots";
import { ModeSwitcher } from "./ModeSwitcher";
import { SettingsScreen } from "../pages/SettingsScreen";
import type { OptimizeMode } from "../../shared/types";
import { useOptimize } from "../hooks/useOptimize";
import { useSettings } from "../hooks/useSettings";
import "./Overlay.module.css";
import "./SettingsScreen.module.css";

export function Overlay() {
  const { settings, loaded } = useSettings();
  const [showSettings, setShowSettings] = useState(false);

  const {
    state, mode, setMode, run, reset,
  } = useOptimize(showSettings ? "compress" : (settings?.mode ?? "compress"));

  // Auto-trigger when overlay becomes visible (query param or IPC signal)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("trigger") === "1" && state.status === "idle") {
      run();
    }
  }, [run, state]);

  // Listen for IPC trigger from main process
  useEffect(() => {
    const handler = () => run();
    (window as any).__tokzeth?.onClipboardTrigger(handler);
    return () => { (window as any).__tokzeth?.onClipboardTrigger(handler); };
  }, [run]);

  // ── Stage label for loading ──────────────────────────────
  const stageLabel = state.status === "loading"
    ? (state as any).stage ?? "Optimizing…"
    : "";

  // ── Render ───────────────────────────────────────────────
  if (!loaded) {
    return (
      <div className="overlay glass">
        <div className="init">⚡</div>
      </div>
    );
  }

    if (showSettings && settings) {
      return (
        <SettingsScreen
          settings={settings}
          onSave={async (patch) => {
            await window.__tokzeth?.setSettings(patch);
          }}
          onBack={() => setShowSettings(false)}
        />
      );
    }

  return (
    <div className="overlay glass">
      {/* ── Header (drag-handle) ── */}
      <div className="header" data-drag-handle>
        <h1 className="title">TokZeth</h1>
        <div className="header-controls">
          <button className="ctrl" onClick={run} title="Run now">
            ⚡
          </button>
          <button className="ctrl" onClick={() => setShowSettings(true)} title="Settings">
            ⚙
          </button>
          <button className="ctrl close" onClick={reset} title="Close">
            ×
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="content">
        {state.status === "idle" && (
          <div className="idle-state">
            <div className="empty-icon">⌨️</div>
            <p className="idle-heading">Ready</p>
            <p className="idle-sub">
              Select text anywhere<wbr/> — <kbd>Alt</kbd>+<kbd>Z</kbd>
            </p>
            <button className="primary-btn" onClick={run}>
              Run optimization
            </button>
          </div>
        )}

        {state.status === "loading" && (
          <LoadingDots label={stageLabel} />
        )}

        {state.status === "success" && (
          <div className="result-state">
            <div className="result-label original">
              Original — {(state as any).result.original?.length ?? 0} chars
            </div>
            <p className="result-text">
              {(state as any).result.original}
            </p>
            <div className="result-divider" />
            <div className="result-label optimized">
              Optimized — {(state as any).result.mode?.toUpperCase()}
              { (state as any).result.tokensUsed
                ? ` · ${(state as any).result.tokensUsed} tokens`
                : "" }
            </div>
            <p className="result-text result-optimized">
              {(state as any).result.optimized}
            </p>
          </div>
        )}

        {state.status === "error" && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <p className="error-text">{(state as any).message}</p>
            <button className="primary-btn" onClick={run}>
              Retry
            </button>
          </div>
        )}
      </div>

      {/* ── Footer mode selector ── */}
      <ModeSwitcher mode={mode} onSelect={setMode} />
    </div>
  );
}
