// ============================================================
// desktop/renderer/pages/SettingsScreen.tsx
// Settings — API key, shortcut, mode, behaviour toggles
// ============================================================

import type { OptimizeMode } from "../../shared/types";
import { VALID_MODES } from "../../shared/types";

interface Props {
  settings: {
    shortcut: string;
    mode: OptimizeMode;
    autoPaste: boolean;
    startupOnBoot: boolean;
    apiKey: string;
  };
  onSave: (patch: Record<string, unknown>) => void;
  onBack: () => void;
}

const MODE_META: Record<OptimizeMode, { icon: string; label: string }> = {
  compress:     { icon: "⏬", label: "Compress"    },
  enhance:      { icon: "✨", label: "Enhance"      },
  coding:       { icon: "⚡", label: "Code"         },
  professional: { icon: "💼", label: "Professional"},
  humanize:     { icon: "✍️", label: "Humanize"    },
  email:        { icon: "📧", label: "Email"        },
};

export function SettingsScreen({ settings, onSave, onBack }: Props) {
  return (
    <div className="settings-screen">
      <div className="settings-header">
        <button className="back-btn" onClick={onBack} aria-label="Back">←</button>
        <h2 className="settings-title">Settings</h2>
        <div style={{ width: 20 }} />
      </div>

      <div className="settings-body">
        {/* Shortcut */}
        <div className="setting-group">
          <label className="setting-label">Global Shortcut</label>
          <input
            className="setting-input"
            value={settings.shortcut}
            onChange={(e) => onSave({ shortcut: e.target.value })}
            placeholder="Alt+Shift+Z"
            spellCheck={false}
          />
          <p className="setting-hint">Default: Alt+Shift+Z works system-wide in Windows.</p>
        </div>

        {/* Default Mode */}
        <div className="setting-group">
          <label className="setting-label">Default Mode</label>
          <div className="mode-grid">
            {VALID_MODES.map((m) => {
              const meta = MODE_META[m];
              const active = m === settings.mode;
              return (
                <button
                  key={m}
                  className={`mode-chip ${active ? "mode-chip-active" : ""}`}
                  onClick={() => onSave({ mode: m })}
                  type="button"
                >
                  <span>{meta.icon}</span>
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* API Key */}
        <div className="setting-group">
          <label className="setting-label">DeepSeek API Key</label>
          <input
            className="setting-input"
            type="password"
            value={settings.apiKey}
            onChange={(e) => onSave({ apiKey: e.target.value })}
            placeholder="sk-..."
            spellCheck={false}
          />
          <p className="setting-hint">Stored locally on disk — never sent to any third party.</p>
        </div>

        {/* Toggles */}
        <div className="setting-group">
          <label className="setting-label">Behaviour</label>
          <div className="toggle-row">
            <span className="toggle-label">Auto-paste optimized result</span>
            <input
              type="checkbox"
              checked={settings.autoPaste}
              onChange={(e) => onSave({ autoPaste: e.target.checked })}
            />
          </div>
          <div className="toggle-row">
            <span className="toggle-label">Start on Windows login</span>
            <input
              type="checkbox"
              checked={settings.startupOnBoot}
              onChange={(e) => onSave({ startupOnBoot: e.target.checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
