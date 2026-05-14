import type { PlasmoCSConfig } from "plasmo";
import { getActiveSelection, replaceSelectedText } from "../utils/dom";
import { getSettings } from "../storage/settings";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_idle",
};

// Stores the last active selection so the popup can trigger replacement
let lastSelection: ReturnType<typeof getActiveSelection> = null;

// ---- Keyboard shortcut: Alt+Z triggers refine on selected text ----
document.addEventListener("keydown", async (e: KeyboardEvent) => {
  // Alt+Z shortcut
  if (e.altKey && e.key === "z") {
    e.preventDefault();
    await triggerRefine();
  }
});

// ---- Listen for messages from background or popup ----
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case "GET_SELECTED_TEXT": {
      const ctx = getActiveSelection();
      sendResponse({ text: ctx?.selectedText ?? null });
      break;
    }
    case "REPLACE_TEXT": {
      if (lastSelection && message.payload?.text) {
        replaceSelectedText(lastSelection, message.payload.text);
        lastSelection = null;
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false, error: "No active selection context" });
      }
      break;
    }
    case "CONTEXT_MENU_REFINE": {
      triggerRefine();
      break;
    }
  }
  return true;
});

async function triggerRefine(): Promise<void> {
  const ctx = getActiveSelection();
  if (!ctx) return;

  lastSelection = ctx;

  const settings = await getSettings();

  // Show visual loading indicator
  showLoadingIndicator(ctx.element);

  const response = await chrome.runtime.sendMessage({
    type: "REFINE_TEXT",
    payload: {
      text: ctx.selectedText,
      mode: settings.activeMode,
      userId: settings.userId,
    },
  });

  hideLoadingIndicator(ctx.element);

  if (response?.success && response.optimized) {
    replaceSelectedText(ctx, response.optimized);
    showSuccessFlash(ctx.element);
  } else {
    showErrorToast(response?.error ?? "Optimization failed");
  }
}

// ---- Visual feedback ----

function showLoadingIndicator(el: HTMLElement): void {
  el.style.opacity = "0.6";
  el.style.transition = "opacity 0.2s ease";
}

function hideLoadingIndicator(el: HTMLElement): void {
  el.style.opacity = "1";
}

function showSuccessFlash(el: HTMLElement): void {
  el.style.outline = "2px solid #6366f1";
  el.style.transition = "outline 0.3s ease";
  setTimeout(() => {
    el.style.outline = "";
  }, 1000);
}

function showErrorToast(message: string): void {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #1e1e2e;
    color: #f38ba8;
    border: 1px solid #f38ba8;
    border-radius: 8px;
    padding: 12px 16px;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    z-index: 999999;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  `;
  toast.textContent = `TokZeth: ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
