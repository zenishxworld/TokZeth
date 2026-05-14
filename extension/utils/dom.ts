// Handles text selection detection and replacement across different input types.
// Works on: <textarea>, <input>, contenteditable divs (ChatGPT, Claude, etc.)

export interface SelectionContext {
  element: HTMLElement;
  selectedText: string;
  start: number;
  end: number;
  type: "input" | "textarea" | "contenteditable" | "unknown";
}

export function getActiveSelection(): SelectionContext | null {
  const selection = window.getSelection();
  const activeEl = document.activeElement as HTMLElement;

  // Handle standard input/textarea
  if (
    activeEl instanceof HTMLInputElement ||
    activeEl instanceof HTMLTextAreaElement
  ) {
    const start = activeEl.selectionStart ?? 0;
    const end = activeEl.selectionEnd ?? 0;
    const selectedText = activeEl.value.substring(start, end);

    if (!selectedText.trim()) return null;

    return {
      element: activeEl,
      selectedText,
      start,
      end,
      type: activeEl.tagName.toLowerCase() as "input" | "textarea",
    };
  }

  // Handle contenteditable (ChatGPT, Claude, Notion, etc.)
  if (selection && selection.toString().trim()) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const parentEl =
      container.nodeType === Node.TEXT_NODE
        ? (container.parentElement as HTMLElement)
        : (container as HTMLElement);

    const editable = parentEl?.closest("[contenteditable]") as HTMLElement;
    if (!editable) return null;

    return {
      element: editable,
      selectedText: selection.toString(),
      start: 0,
      end: 0,
      type: "contenteditable",
    };
  }

  return null;
}

export function replaceSelectedText(
  context: SelectionContext,
  newText: string
): void {
  const { element, start, end, type } = context;

  if (type === "input" || type === "textarea") {
    const el = element as HTMLInputElement | HTMLTextAreaElement;
    const before = el.value.substring(0, start);
    const after = el.value.substring(end);
    el.value = before + newText + after;

    // Move cursor to end of inserted text
    const newCursorPos = start + newText.length;
    el.setSelectionRange(newCursorPos, newCursorPos);

    // Trigger React/Vue/Angular change detection
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  } else if (type === "contenteditable") {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const textNode = document.createTextNode(newText);
    range.insertNode(textNode);

    // Collapse selection to end of inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);

    // Trigger input event for frameworks
    element.dispatchEvent(new Event("input", { bubbles: true }));
  }

  element.focus();
}
