export interface Adapter {
  // Gets the current text from the input area.
  getText: () => string;

  // Sets the text in the input area.
  setText: (text: string) => void;

  // Gets the currently selected text.
  getSelectedText: () => string;

  // Injects the text into the input area, replacing the selection.
  injectText: (text: string) => void;

  // Restores focus to the input area.
  restoreFocus: () => void;
}
