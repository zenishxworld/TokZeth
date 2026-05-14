export const parseShortcut = (event: KeyboardEvent, shortcut: string): boolean => {
  const keys = shortcut.toLowerCase().split('+').map(k => k.trim());
  const hasCtrl = keys.includes('ctrl') || keys.includes('cmd');
  const hasAlt = keys.includes('alt');
  const hasShift = keys.includes('shift');
  const mainKey = keys.find(k => !['ctrl', 'cmd', 'alt', 'shift'].includes(k));

  const isCtrlMatch = hasCtrl === (event.ctrlKey || event.metaKey);
  const isAltMatch = hasAlt === event.altKey;
  const isShiftMatch = hasShift === event.shiftKey;
  const isKeyMatch = mainKey ? event.key.toLowerCase() === mainKey : false;

  return isCtrlMatch && isAltMatch && isShiftMatch && isKeyMatch;
};
