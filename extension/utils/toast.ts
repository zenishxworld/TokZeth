// Floating loader + toast notification system.
// Uses Shadow DOM so the host page's CSS cannot interfere — critical for
// sites like ChatGPT that have aggressive global resets.

// ---- Shadow host (created once per page, re-used for all UI) ----

let _shadow: ShadowRoot | null = null;

function getShadow(): ShadowRoot {
  // If host was removed (e.g. SPA full-page swap), recreate it
  if (_shadow && document.getElementById("tokzeth-ui-host")) return _shadow;

  const host = document.createElement("div");
  host.id = "tokzeth-ui-host";
  // Zero-size, pointer-events-none anchor element. Children use position:fixed
  // so they escape and appear at their own fixed coordinates.
  host.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none;overflow:visible;";

  _shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = SHADOW_STYLES;
  _shadow.appendChild(style);

  document.body.appendChild(host);
  return _shadow;
}

// ---- Loader ----

let _loaderEl: HTMLElement | null = null;

export function showLoader(message = "Optimizing prompt"): void {
  if (_loaderEl) return; // already visible — don't stack
  const shadow = getShadow();

  _loaderEl = document.createElement("div");
  _loaderEl.className = "tz-loader";
  _loaderEl.innerHTML = `
    <span class="tz-loader-icon">⚡</span>
    <span class="tz-loader-text">${escapeHtml(message)}</span>
    <span class="tz-dots">
      <span></span><span></span><span></span>
    </span>`;
  shadow.appendChild(_loaderEl);
}

export function hideLoader(): void {
  if (!_loaderEl) return;
  const el = _loaderEl;
  _loaderEl = null;
  el.classList.add("tz-exit");
  el.addEventListener("animationend", () => el.remove(), { once: true });
}

// ---- Toast ----

export type ToastType = "success" | "error" | "info";

const TOAST_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "◈",
};

export function showToast(
  message: string,
  type: ToastType = "info",
  duration = 3500
): void {
  const shadow = getShadow();

  const toast = document.createElement("div");
  toast.className = `tz-toast tz-toast--${type}`;
  toast.innerHTML = `
    <span class="tz-toast-icon">${TOAST_ICONS[type]}</span>
    <span class="tz-toast-text">${escapeHtml(message)}</span>`;

  shadow.appendChild(toast);

  // Trigger enter transition on next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("tz-toast--visible"));
  });

  const remove = () => {
    toast.classList.remove("tz-toast--visible");
    toast.classList.add("tz-toast--exit");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  };

  setTimeout(remove, duration);
}

// ---- Helpers ----

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---- Shadow DOM CSS ----

const SHADOW_STYLES = `
/* ---- Loader ---- */
.tz-loader {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(13, 13, 20, 0.93);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 100px;
  color: #c4c9e8;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 28px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(99,102,241,0.08);
  animation: tz-loader-in 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  z-index: 2147483647;
}
.tz-loader.tz-exit {
  animation: tz-loader-out 0.18s ease forwards;
}
.tz-loader-icon {
  font-size: 14px;
  filter: drop-shadow(0 0 7px rgba(99,102,241,0.75));
}
.tz-loader-text {
  color: #a5accc;
  letter-spacing: 0.01em;
}

/* ---- Animated dots ---- */
.tz-dots {
  display: inline-flex;
  gap: 3px;
  align-items: center;
  margin-left: 2px;
}
.tz-dots span {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #6366f1;
  animation: tz-dot 1.2s ease-in-out infinite;
}
.tz-dots span:nth-child(2) { animation-delay: 0.2s; }
.tz-dots span:nth-child(3) { animation-delay: 0.4s; }

/* ---- Toast ---- */
.tz-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(13, 13, 20, 0.95);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 10px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #c4c9e8;
  max-width: 320px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.2s ease, transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
  z-index: 2147483647;
}
/* When loader is also visible, offset toast above it */
.tz-toast { bottom: 72px; }

.tz-toast--visible {
  opacity: 1;
  transform: translateY(0);
}
.tz-toast--exit {
  opacity: 0;
  transform: translateY(-4px);
}
.tz-toast--success { border: 1px solid rgba(52, 211, 153, 0.4); }
.tz-toast--error   { border: 1px solid rgba(248, 113, 113, 0.4); }
.tz-toast--info    { border: 1px solid rgba(99, 102, 241, 0.4);  }

.tz-toast-icon { font-size: 14px; flex-shrink: 0; }
.tz-toast--success .tz-toast-icon { color: #34d399; }
.tz-toast--error   .tz-toast-icon { color: #f87171; }
.tz-toast--info    .tz-toast-icon { color: #818cf8; }

/* ---- Keyframes ---- */
@keyframes tz-loader-in {
  from { opacity: 0; transform: translateY(12px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes tz-loader-out {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(10px); }
}
@keyframes tz-dot {
  0%, 80%, 100% { opacity: 0.25; transform: scale(0.75); }
  40%            { opacity: 1;   transform: scale(1.2);  }
}
`;
