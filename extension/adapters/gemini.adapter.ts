import { Adapter } from "./base.adapter";

const getInputElement = () => {
  // This selector is a guess and may need to be updated.
  return document.querySelector('div.ProseMirror[role="textbox"]') as HTMLDivElement;
};

const geminiAdapter: Adapter = {
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
        document.execCommand("insertText", false, text);
    }
  },

  restoreFocus: () => {
    const inputElement = getInputElement();
    inputElement?.focus();
  },
};

export default geminiAdapter;
