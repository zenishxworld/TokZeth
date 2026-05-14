// Robust text selection capture and replacement.
// Works on: <textarea>, <input>, contenteditable (ChatGPT/ProseMirror, Claude, Notion, etc.)
//
// Replacement strategies (tried in order for contenteditable):
//   1. Restore saved range nodes → execCommand('insertText')   — best for ProseMirror
//   2. Restore saved range nodes → manual deleteContents       — fallback
//   3. TreeWalker text search → execCommand / deleteContents   — range-node-stale fallback

export interface SelectionContext {
  element: HTMLElement;
  selectedText: string;
  type: "input" | "textarea" | "contenteditable";
  // textarea/input: character positions
  start: number;
  end: number;
  // contenteditable: live DOM node references captured at selection time.
  // Valid until the DOM is mutated — which is fine since we replace immediately.
  rangeStart: { node: Node; offset: number } | null;
  rangeEnd: { node: Node; offset: number } | null;
}

export interface ReplaceResult {
  success: boolean;
  /** Which strategy succeeded, useful for debugging */
  method: "input-value" | "exec-command" | "manual-range" | "text-search" | "failed";
}

export const getSelectionCoords = (selection: Selection | null) => {
  if (!selection || selection.rangeCount === 0) return { x: 0, y: 0 };
  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(false);
  
  let rect = range.getBoundingClientRect();
  if (rect.x === 0 && rect.y === 0) {
    const span = document.createElement('span');
    if (span.getClientRects) {
      span.appendChild(document.createTextNode('\u200b'));
      range.insertNode(span);
      rect = span.getBoundingClientRect();
      const parent = span.parentNode;
      parent?.removeChild(span);
      parent?.normalize();
    }
  }
  return { x: rect.left + window.scrollX, y: rect.top + window.scrollY };
};

// ---- Capture ----

export function captureSelection(): SelectionContext | null {
  const selection = window.getSelection();
  const activeEl = document.activeElement as HTMLElement;

  // --- Standard textarea / input ---
  if (
    activeEl instanceof HTMLTextAreaElement ||
    activeEl instanceof HTMLInputElement
  ) {
    const start = activeEl.selectionStart ?? 0;
    const end = activeEl.selectionEnd ?? 0;
    const text = activeEl.value.substring(start, end);
    if (!text.trim()) return null;

    return {
      element: activeEl,
      selectedText: text,
      type: activeEl instanceof HTMLTextAreaElement ? "textarea" : "input",
      start,
      end,
      rangeStart: null,
      rangeEnd: null,
    };
  }

  // --- contenteditable (ChatGPT, Claude, Notion, Slack, etc.) ---
  if (selection && selection.rangeCount > 0 && selection.toString().trim()) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const parent =
      container.nodeType === Node.TEXT_NODE
        ? (container.parentElement as HTMLElement)
        : (container as HTMLElement);

    // isContentEditable handles contenteditable="true", contenteditable="",
    // and elements that inherit editability from an ancestor.
    let el: HTMLElement | null = parent;
    while (el && !el.isContentEditable) {
      el = el.parentElement;
    }
    if (!el) return null;

    return {
      element: el,
      selectedText: selection.toString(),
      type: "contenteditable",
      start: 0,
      end: 0,
      // Store raw Node references — they stay valid in memory after focus shifts
      rangeStart: { node: range.startContainer, offset: range.startOffset },
      rangeEnd: { node: range.endContainer, offset: range.endOffset },
    };
  }

  return null;
}

// Legacy alias — existing callers remain unchanged
export const getActiveSelection = captureSelection;

// ---- Replace ----

export function replaceSelection(
  ctx: SelectionContext,
  newText: string
): ReplaceResult {
  if (ctx.type === "input" || ctx.type === "textarea") {
    return replaceInField(ctx, newText);
  }
  return replaceInContentEditable(ctx, newText);
}

// Legacy alias
export function replaceSelectedText(ctx: SelectionContext, newText: string): void {
  replaceSelection(ctx, newText);
}

// ---- textarea / input ----

function replaceInField(ctx: SelectionContext, newText: string): ReplaceResult {
  const el = ctx.element as HTMLInputElement | HTMLTextAreaElement;
  const { start, end } = ctx;
  const newValue =
    el.value.substring(0, start) + newText + el.value.substring(end);

  // React wraps input with a controlled component. Setting .value directly
  // doesn't trigger React's change detection. The native setter bypasses that.
  const proto =
    el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
  if (nativeSetter) {
    nativeSetter.call(el, newValue);
  } else {
    el.value = newValue;
  }

  el.focus();
  const cursor = start + newText.length;
  el.setSelectionRange(cursor, cursor);

  // Dispatch both events — React listens to 'input', others may listen to 'change'
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));

  return { success: true, method: "input-value" };
}

// ---- contenteditable ----

function replaceInContentEditable(
  ctx: SelectionContext,
  newText: string
): ReplaceResult {
  const { element, rangeStart, rangeEnd } = ctx;

  element.focus();

  // Strategy 1 + 2: restore the saved range node references
  if (rangeStart && rangeEnd) {
    try {
      const range = document.createRange();
      range.setStart(rangeStart.node, rangeStart.offset);
      range.setEnd(rangeEnd.node, rangeEnd.offset);

      const sel = window.getSelection()!;
      sel.removeAllRanges();
      sel.addRange(range);

      // execCommand dispatches a proper InputEvent that ProseMirror / Tiptap
      // handle natively — this is the most compatible path.
      const ok = document.execCommand("insertText", false, newText);
      if (ok) {
        // Do NOT manually dispatch 'input' here. execCommand natively fires it.
        // Firing it manually causes duplicate insertions in ProseMirror/React wrappers.
        return { success: true, method: "exec-command" };
      }

      // Strategy 2: manual range manipulation
      range.deleteContents();
      const textNode = document.createTextNode(newText);
      range.insertNode(textNode);
      range.setStartAfter(textNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      element.dispatchEvent(new Event("input", { bubbles: true }));
      return { success: true, method: "manual-range" };
    } catch {
      // Range nodes became stale (DOM mutated between capture and replace)
      // Fall through to text search
    }
  }

  // Strategy 3: walk text nodes to find the original string and replace it
  const found = replaceByTextSearch(element, ctx.selectedText, newText);
  if (found) return { success: true, method: "text-search" };

  return { success: false, method: "failed" };
}

// Walk all text nodes inside `root`, locate `original`, replace with `replacement`.
// Handles both single-node and cross-node selections.
function replaceByTextSearch(
  root: HTMLElement,
  original: string,
  replacement: string
): boolean {
  if (!original.trim()) return false;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) nodes.push(n as Text);

  // --- Single-node match (most common case) ---
  for (const textNode of nodes) {
    const content = textNode.textContent ?? "";
    const idx = content.indexOf(original);
    if (idx === -1) continue;

    const range = document.createRange();
    range.setStart(textNode, idx);
    range.setEnd(textNode, idx + original.length);

    return insertViaRange(range, root, replacement);
  }

  // --- Cross-node match ---
  // Build concatenated text, locate the offset, map back to node+offset pairs
  const segments = nodes.map((n) => n.textContent ?? "");
  const combined = segments.join("");
  const idx = combined.indexOf(original);
  if (idx === -1) return false;

  const endIdx = idx + original.length;
  let pos = 0;
  let startNode: Text | null = null;
  let startOffset = 0;
  let endNode: Text | null = null;
  let endOffset = 0;

  for (const textNode of nodes) {
    const len = textNode.textContent?.length ?? 0;
    if (!startNode && pos + len > idx) {
      startNode = textNode;
      startOffset = idx - pos;
    }
    if (startNode && pos + len >= endIdx) {
      endNode = textNode;
      endOffset = endIdx - pos;
      break;
    }
    pos += len;
  }

  if (!startNode || !endNode) return false;

  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return insertViaRange(range, root, replacement);
}

function insertViaRange(
  range: Range,
  root: HTMLElement,
  text: string
): boolean {
  const sel = window.getSelection()!;
  sel.removeAllRanges();
  sel.addRange(range);

  const ok = document.execCommand("insertText", false, text);
  if (ok) {
    return true;
  }

  // Manual fallback
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  root.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}
