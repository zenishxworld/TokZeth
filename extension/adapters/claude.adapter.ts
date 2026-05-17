import { Adapter } from "./base.adapter";

const getInputElement = () => {
  // This selector is a guess and may need to be updated.
  return document.querySelector('div.ProseMirror[contenteditable="true"]') as HTMLDivElement;
};

const claudeAdapter: Adapter = {
  getText: () => {
    const inputElement = getInputElement();
    return inputElement?.textContent || "";
  },

  setText: (text: string) => {
    const inputElement = getInputElement();
    if (inputElement) {
      inputElement.textContent = text;
    }
  },

  getSelectedText: () => {
    const selection = window.getSelection();
    return selection?.toString() || "";
  },

  injectText: (text: string) => {
    const inputElement = getInputElement();
    if (inputElement && inputElement.isContentEditable) {
        inputElement.focus();
        // For contenteditable divs, execCommand is a common way to insert text,
        // though it's becoming outdated.
        document.execCommand("insertText", false, text);
    }
  },

  restoreFocus: () => {
    const inputElement = getInputElement();
    inputElement?.focus();
  },
};

export default claudeAdapter;
