import React, { useEffect, useRef, useState } from "react";
import { getSettings, saveMode, type OptimizeMode } from "../storage/settings";
import { useRefine } from "../hooks/useRefine";

const MODES: {
  value: OptimizeMode;
  label: string;
  icon: string;
  desc: string;
}[] = [
  { value: "enhance",      label: "Enhance",      icon: "✦", desc: "Clearer, more specific, structured" },
  { value: "compress",     label: "Compress",     icon: "◈", desc: "Ultra-concise, token-efficient" },
  { value: "coding",       label: "Coding",       icon: "⌨", desc: "Full technical dev spec" },
  { value: "professional", label: "Professional", icon: "◉", desc: "Executive business tone" },
  { value: "humanize",     label: "Humanize",     icon: "◌", desc: "Natural, human voice" },
  { value: "email",        label: "Email",        icon: "◷", desc: "Complete send-ready email" },
];

export default function App() {
  const [activeMode, setActiveMode] = useState<OptimizeMode>("enhance");
  const [selectedText, setSelectedText]   = useState("");
  const [optimizedText, setOptimizedText] = useState("");
  const [resultVisible, setResultVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { loading, error, refine } = useRefine();

  // On open: load saved mode and pull selected text from the active tab
  useEffect(() => {
    getSettings().then((s) => setActiveMode(s.activeMode));

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (!tab?.id) return;
      chrome.tabs.sendMessage(
        tab.id,
        { type: "GET_SELECTED_TEXT" },
        (res) => {
          if (chrome.runtime.lastError) return; // tab may not have the content script
          if (res?.text) setSelectedText(res.text);
        }
      );
    });
  }, []);

  // Trigger result slide-in animation on a new result
  useEffect(() => {
    if (optimizedText) {
      // Next frame so the DOM node exists before we add the visible class
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setResultVisible(true))
      );
    } else {
      setResultVisible(false);
    }
  }, [optimizedText]);

  const handleModeChange = async (mode: OptimizeMode) => {
    setActiveMode(mode);
    await saveMode(mode);
  };

  const handleRefine = async () => {
    if (!selectedText.trim() || loading) return;
    setOptimizedText("");
    setResultVisible(false);
    const result = await refine(selectedText, activeMode);
    if (result) setOptimizedText(result);
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
    setCopied(true);
    if (copiedTimer.current) clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 1500);
  };

  const activeModeData = MODES.find((m) => m.value === activeMode);

  return (
    <div className="popup-root">
      {/* ---- Header ---- */}
      <div className="popup-header">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">TokZeth</span>
        </div>
        <span className="shortcut-hint">
          <span className="shortcut-key">Alt</span>
          <span className="shortcut-sep">+</span>
          <span className="shortcut-key">Z</span>
        </span>
      </div>

      {/* ---- Mode Grid ---- */}
      <div className="mode-grid">
        {MODES.map((m) => (
          <button
            key={m.value}
            type="button"
            className={`mode-btn${activeMode === m.value ? " active" : ""}`}
            onClick={() => handleModeChange(m.value)}
          >
            <span className="mode-icon">{m.icon}</span>
            <span className="mode-label">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Active mode description */}
      {activeModeData && (
        <div className="mode-active-desc">{activeModeData.desc}</div>
      )}

      {/* ---- Selected Text ---- */}
      {selectedText ? (
        <div className="text-box">
          <div className="text-box-header">
            <span className="text-box-label">Selected</span>
            <span className="char-count">{selectedText.length} chars</span>
          </div>
          <div className="text-box-content">{selectedText}</div>
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">◎</span>
          <span>Select text on the page</span>
          <span className="empty-hint">or press Alt+Z anywhere</span>
        </div>
      )}

      {/* ---- Optimize Button ---- */}
      <button
        type="button"
        className={`refine-btn${loading ? " loading" : ""}${!selectedText.trim() ? " disabled" : ""}`}
        onClick={handleRefine}
        disabled={loading || !selectedText.trim()}
      >
        {loading ? (
          <span className="btn-loading-content">
            <span className="btn-lightning">⚡</span>
            <span>Optimizing</span>
            <span className="btn-dots">
              <span /><span /><span />
            </span>
          </span>
        ) : (
          <span className="btn-idle-content">
            <span>✦</span>
            <span>Optimize Prompt</span>
          </span>
        )}
      </button>

      {/* ---- Error ---- */}
      {error && <div className="error-msg">{error}</div>}

      {/* ---- Result ---- */}
      {optimizedText && (
        <div className={`result-box${resultVisible ? " result-box--visible" : ""}`}>
          <div className="result-header">
            <span className="result-label">
              <span className="result-dot" />
              Optimized
            </span>
            <div className="result-actions">
              <button
                type="button"
                className={`action-btn${copied ? " copied" : ""}`}
                onClick={handleCopy}
              >
                {copied ? "✓ Copied" : "Copy"}
              </button>
              <button
                type="button"
                className="action-btn primary"
                onClick={handleReplace}
              >
                Replace ↩
              </button>
            </div>
          </div>
          <div className="result-content">{optimizedText}</div>
        </div>
      )}

      {/* ---- Footer ---- */}
      <div className="popup-footer">
        <span className="footer-mode-label">Mode</span>
        <span className="footer-mode-value">{activeMode}</span>
      </div>
    </div>
  );
}
