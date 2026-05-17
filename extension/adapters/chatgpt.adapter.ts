import { Adapter } from "./base.adapter";

const getInputElement = () => {
  return document.getElementById("prompt-textarea") as HTMLTextAreaElement;
};

const chatGPTAdapter: Adapter = {
  getText: () => {
    const inputElement = getInputElement();
    return inputElement?.value || "";
  },

  setText: (text: string) => {
    const inputElement = getInputElement();
    if (inputElement) {
      inputElement.value = text;
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    }
  },

  getSelectedText: () => {
    const inputElement = getInputElement();
    if (inputElement) {
      return inputElement.value.substring(
        inputElement.selectionStart,
        inputElement.selectionEnd
      );
    }
    return "";
  },

  injectText: (text: string) => {
    const inputElement = getInputElement();
    if (inputElement) {
      const start = inputElement.selectionStart;
      const end = inputElement.selectionEnd;
      const before = inputElement.value.substring(0, start);
      const after = inputElement.value.substring(end);
      inputElement.value = before + text + after;
      inputElement.selectionStart = inputElement.selectionEnd = start + text.length;
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
    }
  },

  restoreFocus: () => {
    const inputElement = getInputElement();
    inputElement?.focus();
  },
};

export default chatGPTAdapter;
