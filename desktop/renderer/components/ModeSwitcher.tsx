// ============================================================
// desktop/renderer/components/ModeSwitcher.tsx
// Compact mode selector grid at the bottom of the overlay
// ============================================================

import type { OptimizeMode } from "../../shared/types";
import { VALID_MODES } from "../../shared/types";

const MODE_META: Record<OptimizeMode, { icon: string; label: string }> = {
  compress:      { icon: "⏬", label: "Compress"   },
  enhance:       { icon: "✨", label: "Enhance"     },
  coding:        { icon: "⚡", label: "Code"        },
  professional:  { icon: "💼", label: "Professional"},
  humanize:      { icon: "✍️", label: "Humanize"    },
  email:         { icon: "📧", label: "Email"       },
};

import styles from "./ModeSwitcher.module.css";

interface Props {
  mode: OptimizeMode;
  onSelect: (m: OptimizeMode) => void;
}

export function ModeSwitcher({ mode, onSelect }: Props) {
  return (
    <div className={styles.grid}>
      {VALID_MODES.map((m) => {
        const meta = MODE_META[m];
        const active = m === mode;
        return (
          <button
            key={m}
            className={`${styles.btn} ${active ? styles.active : ""}`}
            onClick={() => onSelect(m)}
            title={meta.label}
            aria-label={meta.label}
            data-active={active}
          >
            <span className={styles.icon}>{meta.icon}</span>
            <span className={styles.label}>{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
