import React, { useState } from "react";

interface CompareViewProps {
  originalText: string;
  optimizedText: string;
}

export function CompareView({ originalText, optimizedText }: CompareViewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`compare-view ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(!expanded)}>
      <div className="compare-header">
        <span className="compare-title">Compare</span>
        <span className="compare-toggle">{expanded ? "Collapse" : "Expand"}</span>
      </div>
      
      {expanded ? (
        <div className="compare-content">
          <div className="compare-original">
            <div className="compare-label">Original</div>
            <div className="compare-text">{originalText}</div>
          </div>
          <div className="compare-divider">↓</div>
          <div className="compare-optimized">
            <div className="compare-label">Optimized</div>
            <div className="compare-text">{optimizedText}</div>
          </div>
        </div>
      ) : (
        <div className="compare-snippet">
          <span className="compare-faded">{originalText.substring(0, 30)}...</span>
          <span className="compare-arrow">→</span>
          <span>{optimizedText.substring(0, 40)}...</span>
        </div>
      )}
    </div>
  );
}