import { useEffect } from 'react';
import { parseShortcut } from '../utils/shortcutParser';

export const useShortcut = (shortcut: string, callback: () => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (parseShortcut(e, shortcut)) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcut, callback]);
};
