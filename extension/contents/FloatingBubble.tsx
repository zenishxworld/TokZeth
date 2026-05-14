import React, { useEffect, useState } from 'react';
import type { PlasmoCSConfig } from "plasmo";
import { getSelectionCoords } from '../utils/dom';

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_idle"
};

const FloatingBubble = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim() || '';
      
      if (selectedText.length > 0) {
        const coords = getSelectionCoords(selection);
        setPosition({ x: coords.x, y: coords.y - 45 });
        setText(selectedText);
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  if (!visible) return null;

  const triggerOptimize = () => {
    // Send message to background or use triggerRefine
    chrome.runtime.sendMessage({ type: "CONTEXT_MENU_REFINE" });
    setVisible(false);
  };

  return (
    <div 
      style={{ left: position.x, top: position.y }}
      className="fixed z-[9999] flex gap-2 p-1 bg-white/90 backdrop-blur-md border border-neutral-200 shadow-xl rounded-full"
    >
      <button 
        onClick={triggerOptimize}
        className="px-3 py-1 text-sm font-medium hover:bg-neutral-100 rounded-full transition-colors text-indigo-600"
      >
        ✨ Optimize
      </button>
      <button 
        onClick={() => { setVisible(false); }}
        className="px-3 py-1 text-sm font-medium hover:bg-neutral-100 rounded-full transition-colors text-neutral-600"
      >
        Dismiss
      </button>
    </div>
  );
};

export default FloatingBubble;
