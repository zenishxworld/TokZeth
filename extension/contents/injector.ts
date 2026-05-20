import type { PlasmoCSConfig } from "plasmo";
import { captureSelection, replaceSelection } from "../utils/dom";
import { showLoader, hideLoader, showToast } from "../utils/toast";
import { getSettings } from "../storage/settings";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_idle",
};

// ---- Proactive selection cache ----
// Saved on every mouseup / selectionchange so it's available after the popup
// window opens (which steals focus and clears window.getSelection()).
let proactiveCtx: ReturnType<typeof captureSelection> = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function saveCurrentSelection(): void {
  const ctx = captureSelection();
  if (ctx) proactiveCtx = ctx;
}

document.addEventListener("mouseup", saveCurrentSelection);

document.addEventListener("selectionchange", () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(saveCurrentSelection, 80);
});

// ---- Alt+Shift+Z keyboard shortcut ----
document.addEventListener("keydown", async (e: KeyboardEvent) => {
  if (e.altKey && e.key === "z") {
    e.preventDefault();
    await triggerRefine();
  }
});

// ---- Chrome message handlers ----
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    // Popup asks: what text does the user have selected?
    // We return the proactively saved context — NOT window.getSelection()
    // because by the time the popup sends this message, focus has moved to
    // the popup window and the page selection is invisible/gone.
    case "GET_SELECTED_TEXT": {
      sendResponse({ text: proactiveCtx?.selectedText ?? null });
      break;
    }

    // Popup says: replace the original text with the optimized version
    case "REPLACE_TEXT": {
      const ctx = proactiveCtx;
      const newText: string | undefined = message.payload?.text;

      if (!ctx || !newText) {
        sendResponse({ success: false, error: "No saved selection context" });
        break;
      }

      const result = replaceSelection(ctx, newText);
      proactiveCtx = null; // consumed — clear so it can't be used twice

      if (!result.success) {
        // Clipboard fallback — user never loses the optimized text
        navigator.clipboard
          .writeText(newText)
          .then(() => showToast("Couldn't replace — copied to clipboard", "info"))
          .catch(() => showToast("Replacement failed", "error"));
      }

      sendResponse({ success: result.success, method: result.method });
      break;
    }

    case "CONTEXT_MENU_REFINE": {
      // Background forwarded a right-click "Optimize" action
      void triggerRefine();
      break;
    }
  }

  return true; // keep async channel open
});

// ---- Shortcut-triggered inline flow ----
// Captures a fresh live selection (Alt+Shift+Z is pressed while selection is active),
// calls the API via background, then replaces inline.
async function triggerRefine(): Promise<void> {
  // Capture fresh — selection is still live when Alt+Shift+Z fires
  const ctx = captureSelection();
  if (!ctx || !ctx.selectedText.trim()) return;

  // Also update proactive cache so popup Replace still works if user opens it
  proactiveCtx = ctx;

  const settings = await getSettings();

  showLoader("Optimizing prompt");

  let response: { success: boolean; optimized?: string; error?: string };
  try {
    response = await chrome.runtime.sendMessage({
      type: "REFINE_TEXT",
      payload: {
        text: ctx.selectedText,
        mode: settings.activeMode,
        userId: settings.userId,
      },
    });
  } catch {
    hideLoader();
    showToast("Extension error — try again", "error");
    return;
  }

  hideLoader();

  if (response?.success && response.optimized) {
    const result = replaceSelection(ctx, response.optimized);
    proactiveCtx = null;

    if (result.success) {
      flashElement(ctx.element);
      showToast("Prompt optimized", "success", 2000);
    } else {
      await navigator.clipboard.writeText(response.optimized).catch(() => {});
      showToast("Optimized — copied to clipboard", "info");
    }
  } else {
    showToast(response?.error ?? "Optimization failed", "error");
  }
}

// Brief indigo outline flash to confirm replacement happened
function flashElement(el: HTMLElement): void {
  const prevOutline = el.style.outline;
  const prevTransition = el.style.transition;
  el.style.transition = "outline 0.12s ease";
  el.style.outline = "2px solid rgba(99, 102, 241, 0.75)";
  setTimeout(() => {
    el.style.outline = prevOutline;
    setTimeout(() => {
      el.style.transition = prevTransition;
    }, 200);
  }, 700);
}
