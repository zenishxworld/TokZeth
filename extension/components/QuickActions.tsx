import React from "react";
import type { OptimizeMode } from "../storage/settings";

interface QuickActionsProps {
  onAction: (action: "copy" | "retry" | "re_mode", mode?: OptimizeMode) => void;
  copied: boolean;
}

export function QuickActions({ onAction, copied }: QuickActionsProps) {
  return (
    <div className="quick-actions-bar">
      <button className={`qa-btn ${copied ? "copied" : ""}`} onClick={() => onAction("copy")}>
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <button className="qa-btn" onClick={() => onAction("retry")}>
        ↻ Retry
      </button>
      <div className="qa-divider" />
      <button className="qa-btn" onClick={() => onAction("re_mode", "compress")}>
        ◈ Compress
      </button>
      <button className="qa-btn" onClick={() => onAction("re_mode", "humanize")}>
        ◌ Humanize
      </button>
      <button className="qa-btn" onClick={() => onAction("re_mode", "professional")}>
        ◉ Professional
      </button>
    </div>
  );
}