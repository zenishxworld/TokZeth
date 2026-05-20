// ============================================================
// desktop/renderer/useSettings.ts
// Loads and watches app settings via __tokzeth preload
// ============================================================

import { useEffect, useState, useCallback } from "react";
import type { AppSettings, OptimizeMode } from "../../shared/types";

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.__tokzeth?.getSettings().then((s) => {
      setSettingsState(s);
      setLoaded(true);
    });
  }, []);

  const patch = useCallback(
    async (partial: Partial<AppSettings>): Promise<AppSettings> => {
      const next = await window.__tokzeth.setSettings(partial);
      setSettingsState(next);
      return next;
    },
    []
  );

  const setMode = useCallback(async (mode: OptimizeMode): Promise<void> => {
    const next = await window.__tokzeth.setMode(mode);
    // setMode returns only the mode string in preload – re-load full settings
    const full = await window.__tokzeth.getSettings();
    setSettingsState(full);
  }, []);

  return { settings, loaded, patch, setMode };
}
