import React from "react";
import type { OptimizeMode } from "../storage/settings";

interface QuickActionsProps {
  onAction: (action: "copy" | "retry" | "re_mode", mode?: OptimizeMode) => void;
  copied: boolean;
  activeMode?: OptimizeMode;
}

export function QuickActions({ onAction, copied, activeMode }: QuickActionsProps) {
  // Smart Action Chaining
  const getNextActions = (mode: OptimizeMode | undefined) => {
    switch (mode) {
      case "compress":
        return [
          { label: "◈ Compress More", value: "compress" },
          { label: "◉ Professionalize", value: "professional" }
        ];
      case "humanize":
        return [
          { label: "◈ Shorten", value: "compress" },
          { label: "◌ Softer Tone", value: "humanize" }
        ];
      case "professional":
        return [
          { label: "◉ Executive Summary", value: "professional" },
          { label: "◌ Casual", value: "humanize" }
        ];
      default:
        return [
          { label: "◈ Compress", value: "compress" },
          { label: "◌ Humanize", value: "humanize" },
          { label: "◉ Professional", value: "professional" }
        ];
    }
  };

  const nextActions = getNextActions(activeMode);

  return (
    <div className="quick-actions-bar">
      <button className={`qa-btn ${copied ? "copied" : ""}`} onClick={() => onAction("copy")}>
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <button className="qa-btn" onClick={() => onAction("retry")}>
        ↻ Retry
      </button>
      <div className="qa-divider" />
      {nextActions.map((action) => (
        <button 
          key={action.label} 
          className="qa-btn" 
          onClick={() => onAction("re_mode", action.value as OptimizeMode)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}