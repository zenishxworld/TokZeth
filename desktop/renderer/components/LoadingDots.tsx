// ============================================================
// desktop/renderer/components/LoadingDots.tsx
// Animated loading indicator — 3 dots stagger
// ============================================================

import styles from "./LoadingDots.module.css";

export function LoadingDots({ label }: { label?: string }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ring}>
        <div className={styles.spinner} />
      </div>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.track}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
