import React, { useEffect, useState } from "react";
import { getSettings, saveMode, type OptimizeMode } from "../storage/settings";
import { useRefine } from "../hooks/useRefine";

const MODES: { value: OptimizeMode; label: string; icon: string; desc: string }[] = [
  { value: "enhance",      label: "Enhance",      icon: "✦", desc: "More clear & specific" },
  { value: "compress",     label: "Compress",     icon: "◈", desc: "Shorter & direct" },
  { value: "coding",       label: "Coding",       icon: "⌨", desc: "Dev-ready prompt" },
  { value: "professional", label: "Professional", icon: "◉", desc: "Formal business tone" },
  { value: "humanize",     label: "Humanize",     icon: "◌", desc: "Natural & warm" },
  { value: "email",        label: "Email",        icon: "◷", desc: "Structured email" },
];

export default function App() {
  const [activeMode, setActiveMode] = useState<OptimizeMode>("enhance");
  const [selectedText, setSelectedText] = useState<string>("");
  const [optimizedText, setOptimizedText] = useState<string>("");
  const { loading, error, refine } = useRefine();

  // Load saved mode + get selected text from active tab
  useEffect(() => {
    getSettings().then((s) => setActiveMode(s.activeMode));

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab?.id) return;
      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_SELECTED_TEXT" },
        (res) => {
          if (res?.text) setSelectedText(res.text);
        }
      );
    });
  }, []);

  const handleModeChange = async (mode: OptimizeMode) => {
    setActiveMode(mode);
    await saveMode(mode);
  };

  const handleRefine = async () => {
    if (!selectedText.trim()) return;
    setOptimizedText("");
    const result = await refine(selectedText, activeMode);
    if (result) {
      setOptimizedText(result);
    }
  };

  const handleReplace = () => {
    if (!optimizedText) return;
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab?.id) return;
      chrome.tabs.sendMessage(tab.id, {
        type: "REPLACE_TEXT",
        payload: { text: optimizedText },
      });
      window.close();
    });
  };

  const handleCopy = async () => {
    if (!optimizedText) return;
    await navigator.clipboard.writeText(optimizedText);
  };

  return (
    <div className="popup-root">
      {/* Header */}
      <div className="popup-header">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">TokZeth</span>
        </div>
        <span className="shortcut-hint">Alt+Z</span>
      </div>

      {/* Mode Selector */}
      <div className="mode-grid">
        {MODES.map((m) => (
          <button
            key={m.value}
            className={`mode-btn ${activeMode === m.value ? "active" : ""}`}
            onClick={() => handleModeChange(m.value)}
            title={m.desc}
          >
            <span className="mode-icon">{m.icon}</span>
            <span className="mode-label">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Selected Text Preview */}
      {selectedText ? (
        <div className="text-box">
          <div className="text-box-label">Selected</div>
          <div className="text-box-content">{selectedText}</div>
        </div>
      ) : (
        <div className="empty-state">
          Select text on the page, then click Optimize
        </div>
      )}

      {/* Refine Button */}
      <button
        className={`refine-btn ${loading ? "loading" : ""}`}
        onClick={handleRefine}
        disabled={loading || !selectedText.trim()}
      >
        {loading ? (
          <span className="spinner" />
        ) : (
          <>
            <span>✦</span> Optimize Prompt
          </>
        )}
      </button>

      {/* Error */}
      {error && <div className="error-msg">{error}</div>}

      {/* Optimized Result */}
      {optimizedText && (
        <div className="result-box">
          <div className="result-header">
            <span className="result-label">Optimized</span>
            <div className="result-actions">
              <button className="action-btn" onClick={handleCopy} title="Copy">
                Copy
              </button>
              <button
                className="action-btn primary"
                onClick={handleReplace}
                title="Replace selected text"
              >
                Replace ↩
              </button>
            </div>
          </div>
          <div className="result-content">{optimizedText}</div>
        </div>
      )}

      {/* Footer */}
      <div className="popup-footer">
        <span>Mode: <strong>{activeMode}</strong></span>
      </div>
    </div>
  );
}
