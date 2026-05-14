(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jQePq":[function(require,module,exports) {
var d = globalThis.process?.argv || [];
var y = ()=>globalThis.process?.env || {};
var H = new Set(d), _ = (e)=>H.has(e), G = d.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var Z = _("--dry-run"), p = ()=>_("--verbose") || y().VERBOSE === "true", q = p();
var u = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var x = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>u("\uD83D\uDD35 INFO", ...e), m = (...e)=>u("\uD83D\uDFE0 WARN", ...e), S = 0, c = (...e)=>p() && u(`\u{1F7E1} ${S++}`, ...e);
var n = {
    "isContentScript": true,
    "isBackground": false,
    "isReact": false,
    "runtimes": [
        "script-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "C:\\Users\\zenis\\Desktop\\TokZeth\\extension\\contents\\injector.ts",
    "bundleId": "f3a8bd22cf35e417",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 1012
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function I(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = I;
module.bundle.hotData = {};
var l = globalThis.browser || globalThis.chrome || null;
function b() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function C() {
    return n.port || location.port;
}
var E = "__plasmo_runtime_script_";
function L(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function O(e = C()) {
    let t = b();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function B(e) {
    typeof e.message == "string" && x("[plasmo/parcel-runtime]: " + e.message);
}
function P(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(O());
    return t.addEventListener("message", async function(o) {
        let r = JSON.parse(o.data);
        if (r.type === "update" && await e(r.assets), r.type === "error") for (let a of r.diagnostics.ansi){
            let w = a.codeframe || a.stack;
            m("[plasmo/parcel-runtime]: " + a.message + `
` + w + `

` + a.hints.join(`
`));
        }
    }), t.addEventListener("error", B), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        m(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var s = "__plasmo-loading__";
function $() {
    let e = globalThis.window?.trustedTypes;
    if (typeof e > "u") return;
    let t = document.querySelector('meta[name="trusted-types"]')?.content?.split(" "), o = t ? t[t?.length - 1].replace(/;/g, "") : void 0;
    return typeof e < "u" ? e.createPolicy(o || `trusted-html-${s}`, {
        createHTML: (a)=>a
    }) : void 0;
}
var T = $();
function g() {
    return document.getElementById(s);
}
function f() {
    return !g();
}
function F() {
    let e = document.createElement("div");
    e.id = s;
    let t = `
  <style>
    #${s} {
      background: #f3f3f3;
      color: #333;
      border: 1px solid #333;
      box-shadow: #333 4.7px 4.7px;
    }

    #${s}:hover {
      background: #e3e3e3;
      color: #444;
    }

    @keyframes plasmo-loading-animate-svg-fill {
      0% {
        fill: transparent;
      }
    
      100% {
        fill: #333;
      }
    }

    #${s} .svg-elem-1 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s both infinite;
    }

    #${s} .svg-elem-2 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s both infinite;
    }
    
    #${s} .svg-elem-3 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both infinite;
    }

    #${s} .hidden {
      display: none;
    }

  </style>
  
  <svg height="32" width="32" viewBox="0 0 264 354" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M139.221 282.243C154.252 282.243 166.903 294.849 161.338 308.812C159.489 313.454 157.15 317.913 154.347 322.109C146.464 333.909 135.26 343.107 122.151 348.538C109.043 353.969 94.6182 355.39 80.7022 352.621C66.7861 349.852 54.0034 343.018 43.9705 332.983C33.9375 322.947 27.105 310.162 24.3369 296.242C21.5689 282.323 22.9895 267.895 28.4193 254.783C33.8491 241.671 43.0441 230.464 54.8416 222.579C59.0353 219.777 63.4908 217.438 68.1295 215.588C82.0915 210.021 94.6978 222.671 94.6978 237.703L94.6978 255.027C94.6978 270.058 106.883 282.243 121.914 282.243H139.221Z" fill="#333" class="svg-elem-1" ></path>
    <path d="M192.261 142.028C192.261 126.996 204.867 114.346 218.829 119.913C223.468 121.763 227.923 124.102 232.117 126.904C243.915 134.789 253.11 145.996 258.539 159.108C263.969 172.22 265.39 186.648 262.622 200.567C259.854 214.487 253.021 227.272 242.988 237.308C232.955 247.343 220.173 254.177 206.256 256.946C192.34 259.715 177.916 258.294 164.807 252.863C151.699 247.432 140.495 238.234 132.612 226.434C129.808 222.238 127.47 217.779 125.62 213.137C120.056 199.174 132.707 186.568 147.738 186.568L165.044 186.568C180.076 186.568 192.261 174.383 192.261 159.352L192.261 142.028Z" fill="#333" class="svg-elem-2" ></path>
    <path d="M95.6522 164.135C95.6522 179.167 83.2279 191.725 68.8013 187.505C59.5145 184.788 50.6432 180.663 42.5106 175.227C26.7806 164.714 14.5206 149.772 7.28089 132.289C0.041183 114.807 -1.85305 95.5697 1.83772 77.0104C5.52849 58.4511 14.6385 41.4033 28.0157 28.0228C41.393 14.6423 58.4366 5.53006 76.9914 1.83839C95.5461 -1.85329 114.779 0.0414162 132.257 7.2829C149.735 14.5244 164.674 26.7874 175.184 42.5212C180.62 50.6576 184.744 59.5332 187.46 68.8245C191.678 83.2519 179.119 95.6759 164.088 95.6759L122.869 95.6759C107.837 95.6759 95.6522 107.861 95.6522 122.892L95.6522 164.135Z" fill="#333" class="svg-elem-3"></path>
  </svg>
  <span class="hidden">Context Invalidated, Press to Reload</span>
  `;
    return e.innerHTML = T ? T.createHTML(t) : t, e.style.pointerEvents = "none", e.style.position = "fixed", e.style.bottom = "14.7px", e.style.right = "14.7px", e.style.fontFamily = "sans-serif", e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center", e.style.padding = "14.7px", e.style.gap = "14.7px", e.style.borderRadius = "4.7px", e.style.zIndex = "2147483647", e.style.opacity = "0", e.style.transition = "all 0.47s ease-in-out", e;
}
function N(e) {
    return new Promise((t)=>{
        document.documentElement ? (f() && (document.documentElement.appendChild(e), t()), t()) : globalThis.addEventListener("DOMContentLoaded", ()=>{
            f() && document.documentElement.appendChild(e), t();
        });
    });
}
var k = ()=>{
    let e;
    if (f()) {
        let t = F();
        e = N(t);
    }
    return {
        show: async ({ reloadButton: t = !1 } = {})=>{
            await e;
            let o = g();
            o.style.opacity = "1", t && (o.onclick = (r)=>{
                r.stopPropagation(), globalThis.location.reload();
            }, o.querySelector("span").classList.remove("hidden"), o.style.cursor = "pointer", o.style.pointerEvents = "all");
        },
        hide: async ()=>{
            await e;
            let t = g();
            t.style.opacity = "0";
        }
    };
};
var W = `${E}${module.id}__`, i, A = !1, M = k();
async function h() {
    c("Script Runtime - reloading"), A ? globalThis.location?.reload?.() : M.show({
        reloadButton: !0
    });
}
function R() {
    i?.disconnect(), i = l?.runtime.connect({
        name: W
    }), i.onDisconnect.addListener(()=>{
        h();
    }), i.onMessage.addListener((e)=>{
        e.__plasmo_cs_reload__ && h(), e.__plasmo_cs_active_tab__ && (A = !0);
    });
}
function j() {
    if (l?.runtime) try {
        R(), setInterval(R, 24e3);
    } catch  {
        return;
    }
}
j();
P(async (e)=>{
    c("Script runtime - on updated assets"), e.filter((o)=>o.envHash === n.envHash).some((o)=>L(module.bundle, o.id)) && (M.show(), l?.runtime ? i.postMessage({
        __plasmo_cs_changed__: !0
    }) : setTimeout(()=>{
        h();
    }, 4700));
});

},{}],"cJJI9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "config", ()=>config);
var _dom = require("../utils/dom");
var _toast = require("../utils/toast");
var _settings = require("../storage/settings");
const config = {
    matches: [
        "<all_urls>"
    ],
    run_at: "document_idle"
};
// ---- Proactive selection cache ----
// Saved on every mouseup / selectionchange so it's available after the popup
// window opens (which steals focus and clears window.getSelection()).
let proactiveCtx = null;
let debounceTimer = null;
function saveCurrentSelection() {
    const ctx = (0, _dom.captureSelection)();
    if (ctx) proactiveCtx = ctx;
}
document.addEventListener("mouseup", saveCurrentSelection);
document.addEventListener("selectionchange", ()=>{
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(saveCurrentSelection, 80);
});
// ---- Alt+Z keyboard shortcut ----
document.addEventListener("keydown", async (e)=>{
    if (e.altKey && e.key === "z") {
        e.preventDefault();
        await triggerRefine();
    }
});
// ---- Chrome message handlers ----
chrome.runtime.onMessage.addListener((message, _sender, sendResponse)=>{
    switch(message.type){
        // Popup asks: what text does the user have selected?
        // We return the proactively saved context \u2014 NOT window.getSelection()
        // because by the time the popup sends this message, focus has moved to
        // the popup window and the page selection is invisible/gone.
        case "GET_SELECTED_TEXT":
            sendResponse({
                text: proactiveCtx?.selectedText ?? null
            });
            break;
        // Popup says: replace the original text with the optimized version
        case "REPLACE_TEXT":
            {
                const ctx = proactiveCtx;
                const newText = message.payload?.text;
                if (!ctx || !newText) {
                    sendResponse({
                        success: false,
                        error: "No saved selection context"
                    });
                    break;
                }
                const result = (0, _dom.replaceSelection)(ctx, newText);
                proactiveCtx = null; // consumed \u2014 clear so it can't be used twice
                if (!result.success) // Clipboard fallback \u2014 user never loses the optimized text
                navigator.clipboard.writeText(newText).then(()=>(0, _toast.showToast)("Couldn't replace \u2014 copied to clipboard", "info")).catch(()=>(0, _toast.showToast)("Replacement failed", "error"));
                sendResponse({
                    success: result.success,
                    method: result.method
                });
                break;
            }
        case "CONTEXT_MENU_REFINE":
            triggerRefine();
            break;
    }
    return true; // keep async channel open
});
// ---- Shortcut-triggered inline flow ----
// Captures a fresh live selection (Alt+Z is pressed while selection is active),
// calls the API via background, then replaces inline.
async function triggerRefine() {
    // Capture fresh \u2014 selection is still live when Alt+Z fires
    const ctx = (0, _dom.captureSelection)();
    if (!ctx || !ctx.selectedText.trim()) return;
    // Also update proactive cache so popup Replace still works if user opens it
    proactiveCtx = ctx;
    const settings = await (0, _settings.getSettings)();
    (0, _toast.showLoader)("Optimizing prompt");
    let response;
    try {
        response = await chrome.runtime.sendMessage({
            type: "REFINE_TEXT",
            payload: {
                text: ctx.selectedText,
                mode: settings.activeMode,
                userId: settings.userId
            }
        });
    } catch  {
        (0, _toast.hideLoader)();
        (0, _toast.showToast)("Extension error \u2014 try again", "error");
        return;
    }
    (0, _toast.hideLoader)();
    if (response?.success && response.optimized) {
        const result = (0, _dom.replaceSelection)(ctx, response.optimized);
        proactiveCtx = null;
        if (result.success) {
            flashElement(ctx.element);
            (0, _toast.showToast)("Prompt optimized", "success", 2000);
        } else {
            await navigator.clipboard.writeText(response.optimized).catch(()=>{});
            (0, _toast.showToast)("Optimized \u2014 copied to clipboard", "info");
        }
    } else (0, _toast.showToast)(response?.error ?? "Optimization failed", "error");
}
// Brief indigo outline flash to confirm replacement happened
function flashElement(el) {
    const prevOutline = el.style.outline;
    const prevTransition = el.style.transition;
    el.style.transition = "outline 0.12s ease";
    el.style.outline = "2px solid rgba(99, 102, 241, 0.75)";
    setTimeout(()=>{
        el.style.outline = prevOutline;
        setTimeout(()=>{
            el.style.transition = prevTransition;
        }, 200);
    }, 700);
}

},{"../utils/dom":"522Jj","../utils/toast":"1fp0r","../storage/settings":"gwrPN","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"522Jj":[function(require,module,exports) {
// Robust text selection capture and replacement.
// Works on: <textarea>, <input>, contenteditable (ChatGPT/ProseMirror, Claude, Notion, etc.)
//
// Replacement strategies (tried in order for contenteditable):
//   1. Restore saved range nodes \u2192 execCommand('insertText')   \u2014 best for ProseMirror
//   2. Restore saved range nodes \u2192 manual deleteContents       \u2014 fallback
//   3. TreeWalker text search \u2192 execCommand / deleteContents   \u2014 range-node-stale fallback
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getSelectionCoords", ()=>getSelectionCoords);
// ---- Capture ----
parcelHelpers.export(exports, "captureSelection", ()=>captureSelection);
parcelHelpers.export(exports, "getActiveSelection", ()=>getActiveSelection);
// ---- Replace ----
parcelHelpers.export(exports, "replaceSelection", ()=>replaceSelection);
// Legacy alias
parcelHelpers.export(exports, "replaceSelectedText", ()=>replaceSelectedText);
const getSelectionCoords = (selection)=>{
    if (!selection || selection.rangeCount === 0) return {
        x: 0,
        y: 0
    };
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    let rect = range.getBoundingClientRect();
    if (rect.x === 0 && rect.y === 0) {
        const span = document.createElement("span");
        if (span.getClientRects) {
            span.appendChild(document.createTextNode("\u200b"));
            range.insertNode(span);
            rect = span.getBoundingClientRect();
            const parent = span.parentNode;
            parent?.removeChild(span);
            parent?.normalize();
        }
    }
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    };
};
function captureSelection() {
    const selection = window.getSelection();
    const activeEl = document.activeElement;
    // --- Standard textarea / input ---
    if (activeEl instanceof HTMLTextAreaElement || activeEl instanceof HTMLInputElement) {
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
            rangeEnd: null
        };
    }
    // --- contenteditable (ChatGPT, Claude, Notion, Slack, etc.) ---
    if (selection && selection.rangeCount > 0 && selection.toString().trim()) {
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const parent = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
        // isContentEditable handles contenteditable="true", contenteditable="",
        // and elements that inherit editability from an ancestor.
        let el = parent;
        while(el && !el.isContentEditable)el = el.parentElement;
        if (!el) return null;
        return {
            element: el,
            selectedText: selection.toString(),
            type: "contenteditable",
            start: 0,
            end: 0,
            // Store raw Node references \u2014 they stay valid in memory after focus shifts
            rangeStart: {
                node: range.startContainer,
                offset: range.startOffset
            },
            rangeEnd: {
                node: range.endContainer,
                offset: range.endOffset
            }
        };
    }
    return null;
}
const getActiveSelection = captureSelection;
function replaceSelection(ctx, newText) {
    if (ctx.type === "input" || ctx.type === "textarea") return replaceInField(ctx, newText);
    return replaceInContentEditable(ctx, newText);
}
function replaceSelectedText(ctx, newText) {
    replaceSelection(ctx, newText);
}
// ---- textarea / input ----
function replaceInField(ctx, newText) {
    const el = ctx.element;
    const { start, end } = ctx;
    const newValue = el.value.substring(0, start) + newText + el.value.substring(end);
    // React wraps input with a controlled component. Setting .value directly
    // doesn't trigger React's change detection. The native setter bypasses that.
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (nativeSetter) nativeSetter.call(el, newValue);
    else el.value = newValue;
    el.focus();
    const cursor = start + newText.length;
    el.setSelectionRange(cursor, cursor);
    // Dispatch both events \u2014 React listens to 'input', others may listen to 'change'
    el.dispatchEvent(new Event("input", {
        bubbles: true
    }));
    el.dispatchEvent(new Event("change", {
        bubbles: true
    }));
    return {
        success: true,
        method: "input-value"
    };
}
// ---- contenteditable ----
function replaceInContentEditable(ctx, newText) {
    const { element, rangeStart, rangeEnd } = ctx;
    element.focus();
    // Strategy 1 + 2: restore the saved range node references
    if (rangeStart && rangeEnd) try {
        const range = document.createRange();
        range.setStart(rangeStart.node, rangeStart.offset);
        range.setEnd(rangeEnd.node, rangeEnd.offset);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        // execCommand dispatches a proper InputEvent that ProseMirror / Tiptap
        // handle natively \u2014 this is the most compatible path.
        const ok = document.execCommand("insertText", false, newText);
        if (ok) // Do NOT manually dispatch 'input' here. execCommand natively fires it.
        // Firing it manually causes duplicate insertions in ProseMirror/React wrappers.
        return {
            success: true,
            method: "exec-command"
        };
        // Strategy 2: manual range manipulation
        range.deleteContents();
        const textNode = document.createTextNode(newText);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        element.dispatchEvent(new Event("input", {
            bubbles: true
        }));
        return {
            success: true,
            method: "manual-range"
        };
    } catch  {
    // Range nodes became stale (DOM mutated between capture and replace)
    // Fall through to text search
    }
    // Strategy 3: walk text nodes to find the original string and replace it
    const found = replaceByTextSearch(element, ctx.selectedText, newText);
    if (found) return {
        success: true,
        method: "text-search"
    };
    return {
        success: false,
        method: "failed"
    };
}
// Walk all text nodes inside `root`, locate `original`, replace with `replacement`.
// Handles both single-node and cross-node selections.
function replaceByTextSearch(root, original, replacement) {
    if (!original.trim()) return false;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while(n = walker.nextNode())nodes.push(n);
    // --- Single-node match (most common case) ---
    for (const textNode of nodes){
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
    const segments = nodes.map((n)=>n.textContent ?? "");
    const combined = segments.join("");
    const idx = combined.indexOf(original);
    if (idx === -1) return false;
    const endIdx = idx + original.length;
    let pos = 0;
    let startNode = null;
    let startOffset = 0;
    let endNode = null;
    let endOffset = 0;
    for (const textNode of nodes){
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
function insertViaRange(range, root, text) {
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    const ok = document.execCommand("insertText", false, text);
    if (ok) return true;
    // Manual fallback
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    root.dispatchEvent(new Event("input", {
        bubbles: true
    }));
    return true;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"boKlo":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1fp0r":[function(require,module,exports) {
// Floating loader + toast notification system.
// Uses Shadow DOM so the host page's CSS cannot interfere \u2014 critical for
// sites like ChatGPT that have aggressive global resets.
// ---- Shadow host (created once per page, re-used for all UI) ----
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showLoader", ()=>showLoader);
parcelHelpers.export(exports, "hideLoader", ()=>hideLoader);
parcelHelpers.export(exports, "showToast", ()=>showToast);
let _shadow = null;
function getShadow() {
    // If host was removed (e.g. SPA full-page swap), recreate it
    if (_shadow && document.getElementById("tokzeth-ui-host")) return _shadow;
    const host = document.createElement("div");
    host.id = "tokzeth-ui-host";
    // Zero-size, pointer-events-none anchor element. Children use position:fixed
    // so they escape and appear at their own fixed coordinates.
    host.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;z-index:2147483647;pointer-events:none;overflow:visible;";
    _shadow = host.attachShadow({
        mode: "open"
    });
    const style = document.createElement("style");
    style.textContent = SHADOW_STYLES;
    _shadow.appendChild(style);
    document.body.appendChild(host);
    return _shadow;
}
// ---- Loader ----
let _loaderEl = null;
function showLoader(message = "Optimizing prompt") {
    if (_loaderEl) return; // already visible \u2014 don't stack
    const shadow = getShadow();
    _loaderEl = document.createElement("div");
    _loaderEl.className = "tz-loader";
    _loaderEl.innerHTML = `
    <span class="tz-loader-icon">\u26a1</span>
    <span class="tz-loader-text">${escapeHtml(message)}</span>
    <span class="tz-dots">
      <span></span><span></span><span></span>
    </span>`;
    shadow.appendChild(_loaderEl);
}
function hideLoader() {
    if (!_loaderEl) return;
    const el = _loaderEl;
    _loaderEl = null;
    el.classList.add("tz-exit");
    el.addEventListener("animationend", ()=>el.remove(), {
        once: true
    });
}
const TOAST_ICONS = {
    success: "\u2713",
    error: "\u2715",
    info: "\u25c8"
};
function showToast(message, type = "info", duration = 3500) {
    const shadow = getShadow();
    const toast = document.createElement("div");
    toast.className = `tz-toast tz-toast--${type}`;
    toast.innerHTML = `
    <span class="tz-toast-icon">${TOAST_ICONS[type]}</span>
    <span class="tz-toast-text">${escapeHtml(message)}</span>`;
    shadow.appendChild(toast);
    // Trigger enter transition on next frame
    requestAnimationFrame(()=>{
        requestAnimationFrame(()=>toast.classList.add("tz-toast--visible"));
    });
    const remove = ()=>{
        toast.classList.remove("tz-toast--visible");
        toast.classList.add("tz-toast--exit");
        toast.addEventListener("transitionend", ()=>toast.remove(), {
            once: true
        });
    };
    setTimeout(remove, duration);
}
// ---- Helpers ----
function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// ---- Shadow DOM CSS ----
const SHADOW_STYLES = `
/* ---- Loader ---- */
.tz-loader {
  position: fixed;
  top: 24px;
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
  top: 24px;
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
  transform: translateY(-10px);
  transition: opacity 0.2s ease, transform 0.22s cubic-bezier(0.34, 1.4, 0.64, 1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
  z-index: 2147483647;
}
/* When loader is also visible, offset toast below it */
.tz-toast { top: 72px; }

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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"gwrPN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getSettings", ()=>getSettings);
parcelHelpers.export(exports, "saveMode", ()=>saveMode);
parcelHelpers.export(exports, "saveUserId", ()=>saveUserId);
var _storage = require("@plasmohq/storage");
const DEFAULT_SETTINGS = {
    activeMode: "enhance"
};
const storage = new (0, _storage.Storage)();
async function getSettings() {
    const mode = await storage.get("activeMode");
    const userId = await storage.get("userId");
    return {
        activeMode: mode ?? DEFAULT_SETTINGS.activeMode,
        userId
    };
}
async function saveMode(mode) {
    await storage.set("activeMode", mode);
}
async function saveUserId(userId) {
    await storage.set("userId", userId);
}

},{"@plasmohq/storage":"4Xe2t","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"4Xe2t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseStorage", ()=>o);
parcelHelpers.export(exports, "Storage", ()=>g);
var _pify = require("pify");
var _pifyDefault = parcelHelpers.interopDefault(_pify);
var l = ()=>{
    try {
        let e = globalThis.navigator?.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (e[1] === "Chrome") return parseInt(e[2]) < 100 || globalThis.chrome.runtime?.getManifest()?.manifest_version === 2;
    } catch  {
        return !1;
    }
    return !1;
};
var o = class {
    #r;
    #t;
    get primaryClient() {
        return this.#t;
    }
    #e;
    get secondaryClient() {
        return this.#e;
    }
    #a;
    get area() {
        return this.#a;
    }
    get hasWebApi() {
        try {
            return typeof window < "u" && !!window.localStorage;
        } catch (e) {
            return console.error(e), !1;
        }
    }
    #s = new Map;
    #i;
    get copiedKeySet() {
        return this.#i;
    }
    isCopied = (e)=>this.hasWebApi && (this.allCopied || this.copiedKeySet.has(e));
    #n = !1;
    get allCopied() {
        return this.#n;
    }
    getExtStorageApi = ()=>globalThis.browser?.storage || globalThis.chrome?.storage;
    get hasExtensionApi() {
        try {
            return !!this.getExtStorageApi();
        } catch (e) {
            return console.error(e), !1;
        }
    }
    isWatchSupported = ()=>this.hasExtensionApi;
    keyNamespace = "";
    isValidKey = (e)=>e.startsWith(this.keyNamespace);
    getNamespacedKey = (e)=>`${this.keyNamespace}${e}`;
    getUnnamespacedKey = (e)=>e.slice(this.keyNamespace.length);
    serde = {
        serializer: JSON.stringify,
        deserializer: JSON.parse
    };
    constructor({ area: e = "sync", allCopied: t = !1, copiedKeyList: s = [], serde: r = {} } = {}){
        this.setCopiedKeySet(s), this.#a = e, this.#n = t, this.serde = {
            ...this.serde,
            ...r
        };
        try {
            this.hasWebApi && (t || s.length > 0) && (this.#e = window.localStorage);
        } catch  {}
        try {
            this.hasExtensionApi && (this.#r = this.getExtStorageApi(), l() ? this.#t = (0, _pifyDefault.default)(this.#r[this.area], {
                exclude: [
                    "getBytesInUse"
                ],
                errorFirst: !1
            }) : this.#t = this.#r[this.area]);
        } catch  {}
    }
    setCopiedKeySet(e) {
        this.#i = new Set(e);
    }
    rawGetAll = ()=>this.#t?.get();
    getAll = async ()=>{
        let e = await this.rawGetAll();
        return Object.entries(e).filter(([t])=>this.isValidKey(t)).reduce((t, [s, r])=>(t[this.getUnnamespacedKey(s)] = r, t), {});
    };
    copy = async (e)=>{
        let t = e === void 0;
        if (!t && !this.copiedKeySet.has(e) || !this.allCopied || !this.hasExtensionApi) return !1;
        let s = this.allCopied ? await this.rawGetAll() : await this.#t.get((t ? [
            ...this.copiedKeySet
        ] : [
            e
        ]).map(this.getNamespacedKey));
        if (!s) return !1;
        let r = !1;
        for(let a in s){
            let i = s[a], n = this.#e?.getItem(a);
            this.#e?.setItem(a, i), r ||= i !== n;
        }
        return r;
    };
    rawGet = async (e)=>(await this.rawGetMany([
            e
        ]))[e];
    rawGetMany = async (e)=>this.hasExtensionApi ? await this.#t.get(e) : e.filter(this.isCopied).reduce((t, s)=>(t[s] = this.#e?.getItem(s), t), {});
    rawSet = async (e, t)=>await this.rawSetMany({
            [e]: t
        });
    rawSetMany = async (e)=>(this.#e && Object.entries(e).filter(([t])=>this.isCopied(t)).forEach(([t, s])=>this.#e.setItem(t, s)), this.hasExtensionApi && await this.#t.set(e), null);
    clear = async (e = !1)=>{
        e && this.#e?.clear(), await this.#t.clear();
    };
    rawRemove = async (e)=>{
        await this.rawRemoveMany([
            e
        ]);
    };
    rawRemoveMany = async (e)=>{
        this.#e && e.filter(this.isCopied).forEach((t)=>this.#e.removeItem(t)), this.hasExtensionApi && await this.#t.remove(e);
    };
    removeAll = async ()=>{
        let e = await this.getAll(), t = Object.keys(e);
        await this.removeMany(t);
    };
    watch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#o(e), t;
    };
    #o = (e)=>{
        for(let t in e){
            let s = this.getNamespacedKey(t), r = this.#s.get(s)?.callbackSet || new Set;
            if (r.add(e[t]), r.size > 1) continue;
            let a = (i, n)=>{
                if (n !== this.area || !i[s]) return;
                let h = this.#s.get(s);
                if (!h) throw new Error(`Storage comms does not exist for nsKey: ${s}`);
                Promise.all([
                    this.parseValue(i[s].newValue),
                    this.parseValue(i[s].oldValue)
                ]).then(([y, d])=>{
                    for (let p of h.callbackSet)p({
                        newValue: y,
                        oldValue: d
                    }, n);
                });
            };
            this.#r.onChanged.addListener(a), this.#s.set(s, {
                callbackSet: r,
                listener: a
            });
        }
    };
    unwatch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#c(e), t;
    };
    #c(e) {
        for(let t in e){
            let s = this.getNamespacedKey(t), r = e[t], a = this.#s.get(s);
            a && (a.callbackSet.delete(r), a.callbackSet.size === 0 && (this.#s.delete(s), this.#r.onChanged.removeListener(a.listener)));
        }
    }
    unwatchAll = ()=>this.#h();
    #h() {
        this.#s.forEach(({ listener: e })=>this.#r.onChanged.removeListener(e)), this.#s.clear();
    }
    async getItem(e) {
        return this.get(e);
    }
    async getItems(e) {
        return await this.getMany(e);
    }
    async setItem(e, t) {
        await this.set(e, t);
    }
    async setItems(e) {
        await await this.setMany(e);
    }
    async removeItem(e) {
        return this.remove(e);
    }
    async removeItems(e) {
        return await this.removeMany(e);
    }
}, g = class extends o {
    get = async (e)=>{
        let t = this.getNamespacedKey(e), s = await this.rawGet(t);
        return this.parseValue(s);
    };
    getMany = async (e)=>{
        let t = e.map(this.getNamespacedKey), s = await this.rawGetMany(t), r = await Promise.all(Object.values(s).map(this.parseValue));
        return Object.keys(s).reduce((a, i, n)=>(a[this.getUnnamespacedKey(i)] = r[n], a), {});
    };
    set = async (e, t)=>{
        let s = this.getNamespacedKey(e), r = this.serde.serializer(t);
        return this.rawSet(s, r);
    };
    setMany = async (e)=>{
        let t = Object.entries(e).reduce((s, [r, a])=>(s[this.getNamespacedKey(r)] = this.serde.serializer(a), s), {});
        return await this.rawSetMany(t);
    };
    remove = async (e)=>{
        let t = this.getNamespacedKey(e);
        return this.rawRemove(t);
    };
    removeMany = async (e)=>{
        let t = e.map(this.getNamespacedKey);
        return await this.rawRemoveMany(t);
    };
    setNamespace = (e)=>{
        this.keyNamespace = e;
    };
    parseValue = async (e)=>{
        try {
            if (e !== void 0) return this.serde.deserializer(e);
        } catch (t) {
            console.error(t);
        }
    };
};

},{"pify":"fA13J","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"fA13J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>pify);
const processFunction = (function_, options, proxy, unwrapped)=>function(...arguments_) {
        const P = options.promiseModule;
        return new P((resolve, reject)=>{
            if (options.multiArgs) arguments_.push((...result)=>{
                if (options.errorFirst) {
                    if (result[0]) reject(result);
                    else {
                        result.shift();
                        resolve(result);
                    }
                } else resolve(result);
            });
            else if (options.errorFirst) arguments_.push((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
            else arguments_.push(resolve);
            const self = this === proxy ? unwrapped : this;
            Reflect.apply(function_, self, arguments_);
        });
    };
const filterCache = new WeakMap();
function pify(input, options) {
    options = {
        exclude: [
            /.+(?:Sync|Stream)$/
        ],
        errorFirst: true,
        promiseModule: Promise,
        ...options
    };
    const objectType = typeof input;
    if (!(input !== null && (objectType === "object" || objectType === "function"))) throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objectType}\``);
    const filter = (target, key)=>{
        let cached = filterCache.get(target);
        if (!cached) {
            cached = {};
            filterCache.set(target, cached);
        }
        if (key in cached) return cached[key];
        const match = (pattern)=>typeof pattern === "string" || typeof key === "symbol" ? key === pattern : pattern.test(key);
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        const writableOrConfigurableOwn = descriptor === undefined || descriptor.writable || descriptor.configurable;
        const included = options.include ? options.include.some((element)=>match(element)) : !options.exclude.some((element)=>match(element));
        const shouldFilter = included && writableOrConfigurableOwn;
        cached[key] = shouldFilter;
        return shouldFilter;
    };
    const cache = new WeakMap();
    const proxy = new Proxy(input, {
        apply (target, thisArg, args) {
            const cached = cache.get(target);
            if (cached) return Reflect.apply(cached, thisArg, args);
            const pified = options.excludeMain ? target : processFunction(target, options, proxy, target);
            cache.set(target, pified);
            return Reflect.apply(pified, thisArg, args);
        },
        get (target, key) {
            const property = target[key];
            // eslint-disable-next-line no-use-extend-native/no-use-extend-native
            if (!filter(target, key) || property === Function.prototype[key]) return property;
            const cached = cache.get(property);
            if (cached) return cached;
            if (typeof property === "function") {
                const pified = processFunction(property, options, proxy, target);
                cache.set(property, pified);
                return pified;
            }
            return property;
        }
    });
    return proxy;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}]},["jQePq","cJJI9"], "cJJI9", "parcelRequireeb21")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFDckUsSUFBSSxDQUFDLE9BQU8sUUFBUSxRQUFRLGFBQWEsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUMvRCxPQUFPO1lBR1IsTUFBTSxTQUFTLE1BQU0sSUFBSTtZQUV6QixJQUFJLFFBQ0gsT0FBTztZQUdSLElBQUksT0FBTyxhQUFhLFlBQVk7Z0JBQ25DLE1BQU0sU0FBUyxnQkFBZ0IsVUFBVSxTQUFTLE9BQU87Z0JBQ3pELE1BQU0sSUFBSSxVQUFVO2dCQUNwQixPQUFPO1lBQ1I7WUFFQSxPQUFPO1FBQ1I7SUFDRDtJQUVBLE9BQU87QUFDUiIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9wYXJjZWwtcnVudGltZS9kaXN0L3J1bnRpbWUtOTFjNmM3NjBjNjQwNjNhZC5qcyIsImV4dGVuc2lvbi9jb250ZW50cy9pbmplY3Rvci50cyIsImV4dGVuc2lvbi91dGlscy9kb20udHMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsImV4dGVuc2lvbi91dGlscy90b2FzdC50cyIsImV4dGVuc2lvbi9zdG9yYWdlL3NldHRpbmdzLnRzIiwibm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9zdG9yYWdlL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGlmeS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZD1nbG9iYWxUaGlzLnByb2Nlc3M/LmFyZ3Z8fFtdO3ZhciB5PSgpPT5nbG9iYWxUaGlzLnByb2Nlc3M/LmVudnx8e307dmFyIEg9bmV3IFNldChkKSxfPWU9PkguaGFzKGUpLEc9ZC5maWx0ZXIoZT0+ZS5zdGFydHNXaXRoKFwiLS1cIikmJmUuaW5jbHVkZXMoXCI9XCIpKS5tYXAoZT0+ZS5zcGxpdChcIj1cIikpLnJlZHVjZSgoZSxbdCxvXSk9PihlW3RdPW8sZSkse30pO3ZhciBaPV8oXCItLWRyeS1ydW5cIikscD0oKT0+XyhcIi0tdmVyYm9zZVwiKXx8eSgpLlZFUkJPU0U9PT1cInRydWVcIixxPXAoKTt2YXIgdT0oZT1cIlwiLC4uLnQpPT5jb25zb2xlLmxvZyhlLnBhZEVuZCg5KSxcInxcIiwuLi50KTt2YXIgeD0oLi4uZSk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLmUpLHY9KC4uLmUpPT51KFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4uZSksbT0oLi4uZSk9PnUoXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5lKSxTPTAsYz0oLi4uZSk9PnAoKSYmdShgXFx1ezFGN0UxfSAke1MrK31gLC4uLmUpO3ZhciBuPXtcImlzQ29udGVudFNjcmlwdFwiOnRydWUsXCJpc0JhY2tncm91bmRcIjpmYWxzZSxcImlzUmVhY3RcIjpmYWxzZSxcInJ1bnRpbWVzXCI6W1wic2NyaXB0LXJ1bnRpbWVcIl0sXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInBvcnRcIjoxODE1LFwiZW50cnlGaWxlUGF0aFwiOlwiQzpcXFxcVXNlcnNcXFxcemVuaXNcXFxcRGVza3RvcFxcXFxUb2taZXRoXFxcXGV4dGVuc2lvblxcXFxjb250ZW50c1xcXFxpbmplY3Rvci50c1wiLFwiYnVuZGxlSWRcIjpcImYzYThiZDIyY2YzNWU0MTdcIixcImVudkhhc2hcIjpcImU3OTJmYmJkYWE3OGVlODRcIixcInZlcmJvc2VcIjpcImZhbHNlXCIsXCJzZWN1cmVcIjpmYWxzZSxcInNlcnZlclBvcnRcIjoxMDEyfTttb2R1bGUuYnVuZGxlLkhNUl9CVU5ETEVfSUQ9bi5idW5kbGVJZDtnbG9iYWxUaGlzLnByb2Nlc3M9e2FyZ3Y6W10sZW52OntWRVJCT1NFOm4udmVyYm9zZX19O3ZhciBEPW1vZHVsZS5idW5kbGUuTW9kdWxlO2Z1bmN0aW9uIEkoZSl7RC5jYWxsKHRoaXMsZSksdGhpcy5ob3Q9e2RhdGE6bW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdLF9hY2NlcHRDYWxsYmFja3M6W10sX2Rpc3Bvc2VDYWxsYmFja3M6W10sYWNjZXB0OmZ1bmN0aW9uKHQpe3RoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKHR8fGZ1bmN0aW9uKCl7fSl9LGRpc3Bvc2U6ZnVuY3Rpb24odCl7dGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKHQpfX0sbW9kdWxlLmJ1bmRsZS5ob3REYXRhW2VdPXZvaWQgMH1tb2R1bGUuYnVuZGxlLk1vZHVsZT1JO21vZHVsZS5idW5kbGUuaG90RGF0YT17fTt2YXIgbD1nbG9iYWxUaGlzLmJyb3dzZXJ8fGdsb2JhbFRoaXMuY2hyb21lfHxudWxsO2Z1bmN0aW9uIGIoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBDKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgRT1cIl9fcGxhc21vX3J1bnRpbWVfc2NyaXB0X1wiO2Z1bmN0aW9uIEwoZSx0KXtsZXR7bW9kdWxlczpvfT1lO3JldHVybiBvPyEhb1t0XTohMX1mdW5jdGlvbiBPKGU9QygpKXtsZXQgdD1iKCk7cmV0dXJuYCR7bi5zZWN1cmV8fGxvY2F0aW9uLnByb3RvY29sPT09XCJodHRwczpcIiYmIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QodCk/XCJ3c3NcIjpcIndzXCJ9Oi8vJHt0fToke2V9L2B9ZnVuY3Rpb24gQihlKXt0eXBlb2YgZS5tZXNzYWdlPT1cInN0cmluZ1wiJiZ4KFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2UubWVzc2FnZSl9ZnVuY3Rpb24gUChlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoTygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCByPUpTT04ucGFyc2Uoby5kYXRhKTtpZihyLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHIuYXNzZXRzKSxyLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCBhIG9mIHIuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IHc9YS5jb2RlZnJhbWV8fGEuc3RhY2s7bShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIithLm1lc3NhZ2UrYFxuYCt3K2BcblxuYCthLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsQiksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57dihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PnttKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgcz1cIl9fcGxhc21vLWxvYWRpbmdfX1wiO2Z1bmN0aW9uICQoKXtsZXQgZT1nbG9iYWxUaGlzLndpbmRvdz8udHJ1c3RlZFR5cGVzO2lmKHR5cGVvZiBlPlwidVwiKXJldHVybjtsZXQgdD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJ0cnVzdGVkLXR5cGVzXCJdJyk/LmNvbnRlbnQ/LnNwbGl0KFwiIFwiKSxvPXQ/dFt0Py5sZW5ndGgtMV0ucmVwbGFjZSgvOy9nLFwiXCIpOnZvaWQgMDtyZXR1cm4gdHlwZW9mIGU8XCJ1XCI/ZS5jcmVhdGVQb2xpY3kob3x8YHRydXN0ZWQtaHRtbC0ke3N9YCx7Y3JlYXRlSFRNTDphPT5hfSk6dm9pZCAwfXZhciBUPSQoKTtmdW5jdGlvbiBnKCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHMpfWZ1bmN0aW9uIGYoKXtyZXR1cm4hZygpfWZ1bmN0aW9uIEYoKXtsZXQgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2UuaWQ9cztsZXQgdD1gXG4gIDxzdHlsZT5cbiAgICAjJHtzfSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjNmM2YzO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzO1xuICAgICAgYm94LXNoYWRvdzogIzMzMyA0LjdweCA0LjdweDtcbiAgICB9XG5cbiAgICAjJHtzfTpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZTNlM2UzO1xuICAgICAgY29sb3I6ICM0NDQ7XG4gICAgfVxuXG4gICAgQGtleWZyYW1lcyBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIHtcbiAgICAgIDAlIHtcbiAgICAgICAgZmlsbDogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgXG4gICAgICAxMDAlIHtcbiAgICAgICAgZmlsbDogIzMzMztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAjJHtzfSAuc3ZnLWVsZW0tMSB7XG4gICAgICBhbmltYXRpb246IHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwgMS40N3MgY3ViaWMtYmV6aWVyKDAuNDcsIDAsIDAuNzQ1LCAwLjcxNSkgMC44cyBib3RoIGluZmluaXRlO1xuICAgIH1cblxuICAgICMke3N9IC5zdmctZWxlbS0yIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAwLjlzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuICAgIFxuICAgICMke3N9IC5zdmctZWxlbS0zIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAxcyBib3RoIGluZmluaXRlO1xuICAgIH1cblxuICAgICMke3N9IC5oaWRkZW4ge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG5cbiAgPC9zdHlsZT5cbiAgXG4gIDxzdmcgaGVpZ2h0PVwiMzJcIiB3aWR0aD1cIjMyXCIgdmlld0JveD1cIjAgMCAyNjQgMzU0XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgPHBhdGggZD1cIk0xMzkuMjIxIDI4Mi4yNDNDMTU0LjI1MiAyODIuMjQzIDE2Ni45MDMgMjk0Ljg0OSAxNjEuMzM4IDMwOC44MTJDMTU5LjQ4OSAzMTMuNDU0IDE1Ny4xNSAzMTcuOTEzIDE1NC4zNDcgMzIyLjEwOUMxNDYuNDY0IDMzMy45MDkgMTM1LjI2IDM0My4xMDcgMTIyLjE1MSAzNDguNTM4QzEwOS4wNDMgMzUzLjk2OSA5NC42MTgyIDM1NS4zOSA4MC43MDIyIDM1Mi42MjFDNjYuNzg2MSAzNDkuODUyIDU0LjAwMzQgMzQzLjAxOCA0My45NzA1IDMzMi45ODNDMzMuOTM3NSAzMjIuOTQ3IDI3LjEwNSAzMTAuMTYyIDI0LjMzNjkgMjk2LjI0MkMyMS41Njg5IDI4Mi4zMjMgMjIuOTg5NSAyNjcuODk1IDI4LjQxOTMgMjU0Ljc4M0MzMy44NDkxIDI0MS42NzEgNDMuMDQ0MSAyMzAuNDY0IDU0Ljg0MTYgMjIyLjU3OUM1OS4wMzUzIDIxOS43NzcgNjMuNDkwOCAyMTcuNDM4IDY4LjEyOTUgMjE1LjU4OEM4Mi4wOTE1IDIxMC4wMjEgOTQuNjk3OCAyMjIuNjcxIDk0LjY5NzggMjM3LjcwM0w5NC42OTc4IDI1NS4wMjdDOTQuNjk3OCAyNzAuMDU4IDEwNi44ODMgMjgyLjI0MyAxMjEuOTE0IDI4Mi4yNDNIMTM5LjIyMVpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tMVwiID48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xOTIuMjYxIDE0Mi4wMjhDMTkyLjI2MSAxMjYuOTk2IDIwNC44NjcgMTE0LjM0NiAyMTguODI5IDExOS45MTNDMjIzLjQ2OCAxMjEuNzYzIDIyNy45MjMgMTI0LjEwMiAyMzIuMTE3IDEyNi45MDRDMjQzLjkxNSAxMzQuNzg5IDI1My4xMSAxNDUuOTk2IDI1OC41MzkgMTU5LjEwOEMyNjMuOTY5IDE3Mi4yMiAyNjUuMzkgMTg2LjY0OCAyNjIuNjIyIDIwMC41NjdDMjU5Ljg1NCAyMTQuNDg3IDI1My4wMjEgMjI3LjI3MiAyNDIuOTg4IDIzNy4zMDhDMjMyLjk1NSAyNDcuMzQzIDIyMC4xNzMgMjU0LjE3NyAyMDYuMjU2IDI1Ni45NDZDMTkyLjM0IDI1OS43MTUgMTc3LjkxNiAyNTguMjk0IDE2NC44MDcgMjUyLjg2M0MxNTEuNjk5IDI0Ny40MzIgMTQwLjQ5NSAyMzguMjM0IDEzMi42MTIgMjI2LjQzNEMxMjkuODA4IDIyMi4yMzggMTI3LjQ3IDIxNy43NzkgMTI1LjYyIDIxMy4xMzdDMTIwLjA1NiAxOTkuMTc0IDEzMi43MDcgMTg2LjU2OCAxNDcuNzM4IDE4Ni41NjhMMTY1LjA0NCAxODYuNTY4QzE4MC4wNzYgMTg2LjU2OCAxOTIuMjYxIDE3NC4zODMgMTkyLjI2MSAxNTkuMzUyTDE5Mi4yNjEgMTQyLjAyOFpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tMlwiID48L3BhdGg+XG4gICAgPHBhdGggZD1cIk05NS42NTIyIDE2NC4xMzVDOTUuNjUyMiAxNzkuMTY3IDgzLjIyNzkgMTkxLjcyNSA2OC44MDEzIDE4Ny41MDVDNTkuNTE0NSAxODQuNzg4IDUwLjY0MzIgMTgwLjY2MyA0Mi41MTA2IDE3NS4yMjdDMjYuNzgwNiAxNjQuNzE0IDE0LjUyMDYgMTQ5Ljc3MiA3LjI4MDg5IDEzMi4yODlDMC4wNDExODMgMTE0LjgwNyAtMS44NTMwNSA5NS41Njk3IDEuODM3NzIgNzcuMDEwNEM1LjUyODQ5IDU4LjQ1MTEgMTQuNjM4NSA0MS40MDMzIDI4LjAxNTcgMjguMDIyOEM0MS4zOTMgMTQuNjQyMyA1OC40MzY2IDUuNTMwMDYgNzYuOTkxNCAxLjgzODM5Qzk1LjU0NjEgLTEuODUzMjkgMTE0Ljc3OSAwLjA0MTQxNjIgMTMyLjI1NyA3LjI4MjlDMTQ5LjczNSAxNC41MjQ0IDE2NC42NzQgMjYuNzg3NCAxNzUuMTg0IDQyLjUyMTJDMTgwLjYyIDUwLjY1NzYgMTg0Ljc0NCA1OS41MzMyIDE4Ny40NiA2OC44MjQ1QzE5MS42NzggODMuMjUxOSAxNzkuMTE5IDk1LjY3NTkgMTY0LjA4OCA5NS42NzU5TDEyMi44NjkgOTUuNjc1OUMxMDcuODM3IDk1LjY3NTkgOTUuNjUyMiAxMDcuODYxIDk1LjY1MjIgMTIyLjg5Mkw5NS42NTIyIDE2NC4xMzVaXCIgZmlsbD1cIiMzMzNcIiBjbGFzcz1cInN2Zy1lbGVtLTNcIj48L3BhdGg+XG4gIDwvc3ZnPlxuICA8c3BhbiBjbGFzcz1cImhpZGRlblwiPkNvbnRleHQgSW52YWxpZGF0ZWQsIFByZXNzIHRvIFJlbG9hZDwvc3Bhbj5cbiAgYDtyZXR1cm4gZS5pbm5lckhUTUw9VD9ULmNyZWF0ZUhUTUwodCk6dCxlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsZS5zdHlsZS5wb3NpdGlvbj1cImZpeGVkXCIsZS5zdHlsZS5ib3R0b209XCIxNC43cHhcIixlLnN0eWxlLnJpZ2h0PVwiMTQuN3B4XCIsZS5zdHlsZS5mb250RmFtaWx5PVwic2Fucy1zZXJpZlwiLGUuc3R5bGUuZGlzcGxheT1cImZsZXhcIixlLnN0eWxlLmp1c3RpZnlDb250ZW50PVwiY2VudGVyXCIsZS5zdHlsZS5hbGlnbkl0ZW1zPVwiY2VudGVyXCIsZS5zdHlsZS5wYWRkaW5nPVwiMTQuN3B4XCIsZS5zdHlsZS5nYXA9XCIxNC43cHhcIixlLnN0eWxlLmJvcmRlclJhZGl1cz1cIjQuN3B4XCIsZS5zdHlsZS56SW5kZXg9XCIyMTQ3NDgzNjQ3XCIsZS5zdHlsZS5vcGFjaXR5PVwiMFwiLGUuc3R5bGUudHJhbnNpdGlvbj1cImFsbCAwLjQ3cyBlYXNlLWluLW91dFwiLGV9ZnVuY3Rpb24gTihlKXtyZXR1cm4gbmV3IFByb21pc2UodD0+e2RvY3VtZW50LmRvY3VtZW50RWxlbWVudD8oZigpJiYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpLHQoKSksdCgpKTpnbG9iYWxUaGlzLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsKCk9PntmKCkmJmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlKSx0KCl9KX0pfXZhciBrPSgpPT57bGV0IGU7aWYoZigpKXtsZXQgdD1GKCk7ZT1OKHQpfXJldHVybntzaG93OmFzeW5jKHtyZWxvYWRCdXR0b246dD0hMX09e30pPT57YXdhaXQgZTtsZXQgbz1nKCk7by5zdHlsZS5vcGFjaXR5PVwiMVwiLHQmJihvLm9uY2xpY2s9cj0+e3Iuc3RvcFByb3BhZ2F0aW9uKCksZ2xvYmFsVGhpcy5sb2NhdGlvbi5yZWxvYWQoKX0sby5xdWVyeVNlbGVjdG9yKFwic3BhblwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpLG8uc3R5bGUuY3Vyc29yPVwicG9pbnRlclwiLG8uc3R5bGUucG9pbnRlckV2ZW50cz1cImFsbFwiKX0saGlkZTphc3luYygpPT57YXdhaXQgZTtsZXQgdD1nKCk7dC5zdHlsZS5vcGFjaXR5PVwiMFwifX19O3ZhciBXPWAke0V9JHttb2R1bGUuaWR9X19gLGksQT0hMSxNPWsoKTthc3luYyBmdW5jdGlvbiBoKCl7YyhcIlNjcmlwdCBSdW50aW1lIC0gcmVsb2FkaW5nXCIpLEE/Z2xvYmFsVGhpcy5sb2NhdGlvbj8ucmVsb2FkPy4oKTpNLnNob3coe3JlbG9hZEJ1dHRvbjohMH0pfWZ1bmN0aW9uIFIoKXtpPy5kaXNjb25uZWN0KCksaT1sPy5ydW50aW1lLmNvbm5lY3Qoe25hbWU6V30pLGkub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKCgpPT57aCgpfSksaS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZT0+e2UuX19wbGFzbW9fY3NfcmVsb2FkX18mJmgoKSxlLl9fcGxhc21vX2NzX2FjdGl2ZV90YWJfXyYmKEE9ITApfSl9ZnVuY3Rpb24gaigpe2lmKGw/LnJ1bnRpbWUpdHJ5e1IoKSxzZXRJbnRlcnZhbChSLDI0ZTMpfWNhdGNoe3JldHVybn19aigpO1AoYXN5bmMgZT0+e2MoXCJTY3JpcHQgcnVudGltZSAtIG9uIHVwZGF0ZWQgYXNzZXRzXCIpLGUuZmlsdGVyKG89Pm8uZW52SGFzaD09PW4uZW52SGFzaCkuc29tZShvPT5MKG1vZHVsZS5idW5kbGUsby5pZCkpJiYoTS5zaG93KCksbD8ucnVudGltZT9pLnBvc3RNZXNzYWdlKHtfX3BsYXNtb19jc19jaGFuZ2VkX186ITB9KTpzZXRUaW1lb3V0KCgpPT57aCgpfSw0NzAwKSl9KTtcbiIsImltcG9ydCB0eXBlIHsgUGxhc21vQ1NDb25maWcgfSBmcm9tIFwicGxhc21vXCI7XHJcbmltcG9ydCB7IGNhcHR1cmVTZWxlY3Rpb24sIHJlcGxhY2VTZWxlY3Rpb24gfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcbmltcG9ydCB7IHNob3dMb2FkZXIsIGhpZGVMb2FkZXIsIHNob3dUb2FzdCB9IGZyb20gXCIuLi91dGlscy90b2FzdFwiO1xyXG5pbXBvcnQgeyBnZXRTZXR0aW5ncyB9IGZyb20gXCIuLi9zdG9yYWdlL3NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBQbGFzbW9DU0NvbmZpZyA9IHtcclxuICBtYXRjaGVzOiBbXCI8YWxsX3VybHM+XCJdLFxyXG4gIHJ1bl9hdDogXCJkb2N1bWVudF9pZGxlXCIsXHJcbn07XHJcblxyXG4vLyAtLS0tIFByb2FjdGl2ZSBzZWxlY3Rpb24gY2FjaGUgLS0tLVxyXG4vLyBTYXZlZCBvbiBldmVyeSBtb3VzZXVwIC8gc2VsZWN0aW9uY2hhbmdlIHNvIGl0J3MgYXZhaWxhYmxlIGFmdGVyIHRoZSBwb3B1cFxyXG4vLyB3aW5kb3cgb3BlbnMgKHdoaWNoIHN0ZWFscyBmb2N1cyBhbmQgY2xlYXJzIHdpbmRvdy5nZXRTZWxlY3Rpb24oKSkuXHJcbmxldCBwcm9hY3RpdmVDdHg6IFJldHVyblR5cGU8dHlwZW9mIGNhcHR1cmVTZWxlY3Rpb24+ID0gbnVsbDtcclxubGV0IGRlYm91bmNlVGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBzYXZlQ3VycmVudFNlbGVjdGlvbigpOiB2b2lkIHtcclxuICBjb25zdCBjdHggPSBjYXB0dXJlU2VsZWN0aW9uKCk7XHJcbiAgaWYgKGN0eCkgcHJvYWN0aXZlQ3R4ID0gY3R4O1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBzYXZlQ3VycmVudFNlbGVjdGlvbik7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0aW9uY2hhbmdlXCIsICgpID0+IHtcclxuICBpZiAoZGVib3VuY2VUaW1lcikgY2xlYXJUaW1lb3V0KGRlYm91bmNlVGltZXIpO1xyXG4gIGRlYm91bmNlVGltZXIgPSBzZXRUaW1lb3V0KHNhdmVDdXJyZW50U2VsZWN0aW9uLCA4MCk7XHJcbn0pO1xyXG5cclxuLy8gLS0tLSBBbHQrWiBrZXlib2FyZCBzaG9ydGN1dCAtLS0tXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGFzeW5jIChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgaWYgKGUuYWx0S2V5ICYmIGUua2V5ID09PSBcInpcIikge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgYXdhaXQgdHJpZ2dlclJlZmluZSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vLyAtLS0tIENocm9tZSBtZXNzYWdlIGhhbmRsZXJzIC0tLS1cclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICBzd2l0Y2ggKG1lc3NhZ2UudHlwZSkge1xyXG4gICAgLy8gUG9wdXAgYXNrczogd2hhdCB0ZXh0IGRvZXMgdGhlIHVzZXIgaGF2ZSBzZWxlY3RlZD9cclxuICAgIC8vIFdlIHJldHVybiB0aGUgcHJvYWN0aXZlbHkgc2F2ZWQgY29udGV4dCDigJQgTk9UIHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxyXG4gICAgLy8gYmVjYXVzZSBieSB0aGUgdGltZSB0aGUgcG9wdXAgc2VuZHMgdGhpcyBtZXNzYWdlLCBmb2N1cyBoYXMgbW92ZWQgdG9cclxuICAgIC8vIHRoZSBwb3B1cCB3aW5kb3cgYW5kIHRoZSBwYWdlIHNlbGVjdGlvbiBpcyBpbnZpc2libGUvZ29uZS5cclxuICAgIGNhc2UgXCJHRVRfU0VMRUNURURfVEVYVFwiOiB7XHJcbiAgICAgIHNlbmRSZXNwb25zZSh7IHRleHQ6IHByb2FjdGl2ZUN0eD8uc2VsZWN0ZWRUZXh0ID8/IG51bGwgfSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBvcHVwIHNheXM6IHJlcGxhY2UgdGhlIG9yaWdpbmFsIHRleHQgd2l0aCB0aGUgb3B0aW1pemVkIHZlcnNpb25cclxuICAgIGNhc2UgXCJSRVBMQUNFX1RFWFRcIjoge1xyXG4gICAgICBjb25zdCBjdHggPSBwcm9hY3RpdmVDdHg7XHJcbiAgICAgIGNvbnN0IG5ld1RleHQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IG1lc3NhZ2UucGF5bG9hZD8udGV4dDtcclxuXHJcbiAgICAgIGlmICghY3R4IHx8ICFuZXdUZXh0KSB7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBcIk5vIHNhdmVkIHNlbGVjdGlvbiBjb250ZXh0XCIgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlcGxhY2VTZWxlY3Rpb24oY3R4LCBuZXdUZXh0KTtcclxuICAgICAgcHJvYWN0aXZlQ3R4ID0gbnVsbDsgLy8gY29uc3VtZWQg4oCUIGNsZWFyIHNvIGl0IGNhbid0IGJlIHVzZWQgdHdpY2VcclxuXHJcbiAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAvLyBDbGlwYm9hcmQgZmFsbGJhY2sg4oCUIHVzZXIgbmV2ZXIgbG9zZXMgdGhlIG9wdGltaXplZCB0ZXh0XHJcbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZFxyXG4gICAgICAgICAgLndyaXRlVGV4dChuZXdUZXh0KVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4gc2hvd1RvYXN0KFwiQ291bGRuJ3QgcmVwbGFjZSDigJQgY29waWVkIHRvIGNsaXBib2FyZFwiLCBcImluZm9cIikpXHJcbiAgICAgICAgICAuY2F0Y2goKCkgPT4gc2hvd1RvYXN0KFwiUmVwbGFjZW1lbnQgZmFpbGVkXCIsIFwiZXJyb3JcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiByZXN1bHQuc3VjY2VzcywgbWV0aG9kOiByZXN1bHQubWV0aG9kIH0pO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBjYXNlIFwiQ09OVEVYVF9NRU5VX1JFRklORVwiOiB7XHJcbiAgICAgIC8vIEJhY2tncm91bmQgZm9yd2FyZGVkIGEgcmlnaHQtY2xpY2sgXCJPcHRpbWl6ZVwiIGFjdGlvblxyXG4gICAgICB2b2lkIHRyaWdnZXJSZWZpbmUoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTsgLy8ga2VlcCBhc3luYyBjaGFubmVsIG9wZW5cclxufSk7XHJcblxyXG4vLyAtLS0tIFNob3J0Y3V0LXRyaWdnZXJlZCBpbmxpbmUgZmxvdyAtLS0tXHJcbi8vIENhcHR1cmVzIGEgZnJlc2ggbGl2ZSBzZWxlY3Rpb24gKEFsdCtaIGlzIHByZXNzZWQgd2hpbGUgc2VsZWN0aW9uIGlzIGFjdGl2ZSksXHJcbi8vIGNhbGxzIHRoZSBBUEkgdmlhIGJhY2tncm91bmQsIHRoZW4gcmVwbGFjZXMgaW5saW5lLlxyXG5hc3luYyBmdW5jdGlvbiB0cmlnZ2VyUmVmaW5lKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gIC8vIENhcHR1cmUgZnJlc2gg4oCUIHNlbGVjdGlvbiBpcyBzdGlsbCBsaXZlIHdoZW4gQWx0K1ogZmlyZXNcclxuICBjb25zdCBjdHggPSBjYXB0dXJlU2VsZWN0aW9uKCk7XHJcbiAgaWYgKCFjdHggfHwgIWN0eC5zZWxlY3RlZFRleHQudHJpbSgpKSByZXR1cm47XHJcblxyXG4gIC8vIEFsc28gdXBkYXRlIHByb2FjdGl2ZSBjYWNoZSBzbyBwb3B1cCBSZXBsYWNlIHN0aWxsIHdvcmtzIGlmIHVzZXIgb3BlbnMgaXRcclxuICBwcm9hY3RpdmVDdHggPSBjdHg7XHJcblxyXG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKTtcclxuXHJcbiAgc2hvd0xvYWRlcihcIk9wdGltaXppbmcgcHJvbXB0XCIpO1xyXG5cclxuICBsZXQgcmVzcG9uc2U6IHsgc3VjY2VzczogYm9vbGVhbjsgb3B0aW1pemVkPzogc3RyaW5nOyBlcnJvcj86IHN0cmluZyB9O1xyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcclxuICAgICAgdHlwZTogXCJSRUZJTkVfVEVYVFwiLFxyXG4gICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgdGV4dDogY3R4LnNlbGVjdGVkVGV4dCxcclxuICAgICAgICBtb2RlOiBzZXR0aW5ncy5hY3RpdmVNb2RlLFxyXG4gICAgICAgIHVzZXJJZDogc2V0dGluZ3MudXNlcklkLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICBoaWRlTG9hZGVyKCk7XHJcbiAgICBzaG93VG9hc3QoXCJFeHRlbnNpb24gZXJyb3Ig4oCUIHRyeSBhZ2FpblwiLCBcImVycm9yXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaGlkZUxvYWRlcigpO1xyXG5cclxuICBpZiAocmVzcG9uc2U/LnN1Y2Nlc3MgJiYgcmVzcG9uc2Uub3B0aW1pemVkKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSByZXBsYWNlU2VsZWN0aW9uKGN0eCwgcmVzcG9uc2Uub3B0aW1pemVkKTtcclxuICAgIHByb2FjdGl2ZUN0eCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgIGZsYXNoRWxlbWVudChjdHguZWxlbWVudCk7XHJcbiAgICAgIHNob3dUb2FzdChcIlByb21wdCBvcHRpbWl6ZWRcIiwgXCJzdWNjZXNzXCIsIDIwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYXdhaXQgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQocmVzcG9uc2Uub3B0aW1pemVkKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICAgIHNob3dUb2FzdChcIk9wdGltaXplZCDigJQgY29waWVkIHRvIGNsaXBib2FyZFwiLCBcImluZm9cIik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHNob3dUb2FzdChyZXNwb25zZT8uZXJyb3IgPz8gXCJPcHRpbWl6YXRpb24gZmFpbGVkXCIsIFwiZXJyb3JcIik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBCcmllZiBpbmRpZ28gb3V0bGluZSBmbGFzaCB0byBjb25maXJtIHJlcGxhY2VtZW50IGhhcHBlbmVkXHJcbmZ1bmN0aW9uIGZsYXNoRWxlbWVudChlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICBjb25zdCBwcmV2T3V0bGluZSA9IGVsLnN0eWxlLm91dGxpbmU7XHJcbiAgY29uc3QgcHJldlRyYW5zaXRpb24gPSBlbC5zdHlsZS50cmFuc2l0aW9uO1xyXG4gIGVsLnN0eWxlLnRyYW5zaXRpb24gPSBcIm91dGxpbmUgMC4xMnMgZWFzZVwiO1xyXG4gIGVsLnN0eWxlLm91dGxpbmUgPSBcIjJweCBzb2xpZCByZ2JhKDk5LCAxMDIsIDI0MSwgMC43NSlcIjtcclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGVsLnN0eWxlLm91dGxpbmUgPSBwcmV2T3V0bGluZTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBlbC5zdHlsZS50cmFuc2l0aW9uID0gcHJldlRyYW5zaXRpb247XHJcbiAgICB9LCAyMDApO1xyXG4gIH0sIDcwMCk7XHJcbn1cclxuIiwiLy8gUm9idXN0IHRleHQgc2VsZWN0aW9uIGNhcHR1cmUgYW5kIHJlcGxhY2VtZW50LlxyXG4vLyBXb3JrcyBvbjogPHRleHRhcmVhPiwgPGlucHV0PiwgY29udGVudGVkaXRhYmxlIChDaGF0R1BUL1Byb3NlTWlycm9yLCBDbGF1ZGUsIE5vdGlvbiwgZXRjLilcclxuLy9cclxuLy8gUmVwbGFjZW1lbnQgc3RyYXRlZ2llcyAodHJpZWQgaW4gb3JkZXIgZm9yIGNvbnRlbnRlZGl0YWJsZSk6XHJcbi8vICAgMS4gUmVzdG9yZSBzYXZlZCByYW5nZSBub2RlcyDihpIgZXhlY0NvbW1hbmQoJ2luc2VydFRleHQnKSAgIOKAlCBiZXN0IGZvciBQcm9zZU1pcnJvclxyXG4vLyAgIDIuIFJlc3RvcmUgc2F2ZWQgcmFuZ2Ugbm9kZXMg4oaSIG1hbnVhbCBkZWxldGVDb250ZW50cyAgICAgICDigJQgZmFsbGJhY2tcclxuLy8gICAzLiBUcmVlV2Fsa2VyIHRleHQgc2VhcmNoIOKGkiBleGVjQ29tbWFuZCAvIGRlbGV0ZUNvbnRlbnRzICAg4oCUIHJhbmdlLW5vZGUtc3RhbGUgZmFsbGJhY2tcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0aW9uQ29udGV4dCB7XHJcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XHJcbiAgdHlwZTogXCJpbnB1dFwiIHwgXCJ0ZXh0YXJlYVwiIHwgXCJjb250ZW50ZWRpdGFibGVcIjtcclxuICAvLyB0ZXh0YXJlYS9pbnB1dDogY2hhcmFjdGVyIHBvc2l0aW9uc1xyXG4gIHN0YXJ0OiBudW1iZXI7XHJcbiAgZW5kOiBudW1iZXI7XHJcbiAgLy8gY29udGVudGVkaXRhYmxlOiBsaXZlIERPTSBub2RlIHJlZmVyZW5jZXMgY2FwdHVyZWQgYXQgc2VsZWN0aW9uIHRpbWUuXHJcbiAgLy8gVmFsaWQgdW50aWwgdGhlIERPTSBpcyBtdXRhdGVkIOKAlCB3aGljaCBpcyBmaW5lIHNpbmNlIHdlIHJlcGxhY2UgaW1tZWRpYXRlbHkuXHJcbiAgcmFuZ2VTdGFydDogeyBub2RlOiBOb2RlOyBvZmZzZXQ6IG51bWJlciB9IHwgbnVsbDtcclxuICByYW5nZUVuZDogeyBub2RlOiBOb2RlOyBvZmZzZXQ6IG51bWJlciB9IHwgbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZXBsYWNlUmVzdWx0IHtcclxuICBzdWNjZXNzOiBib29sZWFuO1xyXG4gIC8qKiBXaGljaCBzdHJhdGVneSBzdWNjZWVkZWQsIHVzZWZ1bCBmb3IgZGVidWdnaW5nICovXHJcbiAgbWV0aG9kOiBcImlucHV0LXZhbHVlXCIgfCBcImV4ZWMtY29tbWFuZFwiIHwgXCJtYW51YWwtcmFuZ2VcIiB8IFwidGV4dC1zZWFyY2hcIiB8IFwiZmFpbGVkXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTZWxlY3Rpb25Db29yZHMgPSAoc2VsZWN0aW9uOiBTZWxlY3Rpb24gfCBudWxsKSA9PiB7XHJcbiAgaWYgKCFzZWxlY3Rpb24gfHwgc2VsZWN0aW9uLnJhbmdlQ291bnQgPT09IDApIHJldHVybiB7IHg6IDAsIHk6IDAgfTtcclxuICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmNsb25lUmFuZ2UoKTtcclxuICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XHJcbiAgXHJcbiAgbGV0IHJlY3QgPSByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBpZiAocmVjdC54ID09PSAwICYmIHJlY3QueSA9PT0gMCkge1xyXG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgIGlmIChzcGFuLmdldENsaWVudFJlY3RzKSB7XHJcbiAgICAgIHNwYW4uYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1xcdTIwMGInKSk7XHJcbiAgICAgIHJhbmdlLmluc2VydE5vZGUoc3Bhbik7XHJcbiAgICAgIHJlY3QgPSBzcGFuLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjb25zdCBwYXJlbnQgPSBzcGFuLnBhcmVudE5vZGU7XHJcbiAgICAgIHBhcmVudD8ucmVtb3ZlQ2hpbGQoc3Bhbik7XHJcbiAgICAgIHBhcmVudD8ubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB7IHg6IHJlY3QubGVmdCArIHdpbmRvdy5zY3JvbGxYLCB5OiByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZIH07XHJcbn07XHJcblxyXG4vLyAtLS0tIENhcHR1cmUgLS0tLVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhcHR1cmVTZWxlY3Rpb24oKTogU2VsZWN0aW9uQ29udGV4dCB8IG51bGwge1xyXG4gIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcclxuICBjb25zdCBhY3RpdmVFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8vIC0tLSBTdGFuZGFyZCB0ZXh0YXJlYSAvIGlucHV0IC0tLVxyXG4gIGlmIChcclxuICAgIGFjdGl2ZUVsIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCB8fFxyXG4gICAgYWN0aXZlRWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50XHJcbiAgKSB7XHJcbiAgICBjb25zdCBzdGFydCA9IGFjdGl2ZUVsLnNlbGVjdGlvblN0YXJ0ID8/IDA7XHJcbiAgICBjb25zdCBlbmQgPSBhY3RpdmVFbC5zZWxlY3Rpb25FbmQgPz8gMDtcclxuICAgIGNvbnN0IHRleHQgPSBhY3RpdmVFbC52YWx1ZS5zdWJzdHJpbmcoc3RhcnQsIGVuZCk7XHJcbiAgICBpZiAoIXRleHQudHJpbSgpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbGVtZW50OiBhY3RpdmVFbCxcclxuICAgICAgc2VsZWN0ZWRUZXh0OiB0ZXh0LFxyXG4gICAgICB0eXBlOiBhY3RpdmVFbCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnQgPyBcInRleHRhcmVhXCIgOiBcImlucHV0XCIsXHJcbiAgICAgIHN0YXJ0LFxyXG4gICAgICBlbmQsXHJcbiAgICAgIHJhbmdlU3RhcnQ6IG51bGwsXHJcbiAgICAgIHJhbmdlRW5kOiBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIC0tLSBjb250ZW50ZWRpdGFibGUgKENoYXRHUFQsIENsYXVkZSwgTm90aW9uLCBTbGFjaywgZXRjLikgLS0tXHJcbiAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24ucmFuZ2VDb3VudCA+IDAgJiYgc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpKSB7XHJcbiAgICBjb25zdCByYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XHJcbiAgICBjb25zdCBwYXJlbnQgPVxyXG4gICAgICBjb250YWluZXIubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFXHJcbiAgICAgICAgPyAoY29udGFpbmVyLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpXHJcbiAgICAgICAgOiAoY29udGFpbmVyIGFzIEhUTUxFbGVtZW50KTtcclxuXHJcbiAgICAvLyBpc0NvbnRlbnRFZGl0YWJsZSBoYW5kbGVzIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIiwgY29udGVudGVkaXRhYmxlPVwiXCIsXHJcbiAgICAvLyBhbmQgZWxlbWVudHMgdGhhdCBpbmhlcml0IGVkaXRhYmlsaXR5IGZyb20gYW4gYW5jZXN0b3IuXHJcbiAgICBsZXQgZWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHBhcmVudDtcclxuICAgIHdoaWxlIChlbCAmJiAhZWwuaXNDb250ZW50RWRpdGFibGUpIHtcclxuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgaWYgKCFlbCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZWxlbWVudDogZWwsXHJcbiAgICAgIHNlbGVjdGVkVGV4dDogc2VsZWN0aW9uLnRvU3RyaW5nKCksXHJcbiAgICAgIHR5cGU6IFwiY29udGVudGVkaXRhYmxlXCIsXHJcbiAgICAgIHN0YXJ0OiAwLFxyXG4gICAgICBlbmQ6IDAsXHJcbiAgICAgIC8vIFN0b3JlIHJhdyBOb2RlIHJlZmVyZW5jZXMg4oCUIHRoZXkgc3RheSB2YWxpZCBpbiBtZW1vcnkgYWZ0ZXIgZm9jdXMgc2hpZnRzXHJcbiAgICAgIHJhbmdlU3RhcnQ6IHsgbm9kZTogcmFuZ2Uuc3RhcnRDb250YWluZXIsIG9mZnNldDogcmFuZ2Uuc3RhcnRPZmZzZXQgfSxcclxuICAgICAgcmFuZ2VFbmQ6IHsgbm9kZTogcmFuZ2UuZW5kQ29udGFpbmVyLCBvZmZzZXQ6IHJhbmdlLmVuZE9mZnNldCB9LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59XHJcblxyXG4vLyBMZWdhY3kgYWxpYXMg4oCUIGV4aXN0aW5nIGNhbGxlcnMgcmVtYWluIHVuY2hhbmdlZFxyXG5leHBvcnQgY29uc3QgZ2V0QWN0aXZlU2VsZWN0aW9uID0gY2FwdHVyZVNlbGVjdGlvbjtcclxuXHJcbi8vIC0tLS0gUmVwbGFjZSAtLS0tXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVNlbGVjdGlvbihcclxuICBjdHg6IFNlbGVjdGlvbkNvbnRleHQsXHJcbiAgbmV3VGV4dDogc3RyaW5nXHJcbik6IFJlcGxhY2VSZXN1bHQge1xyXG4gIGlmIChjdHgudHlwZSA9PT0gXCJpbnB1dFwiIHx8IGN0eC50eXBlID09PSBcInRleHRhcmVhXCIpIHtcclxuICAgIHJldHVybiByZXBsYWNlSW5GaWVsZChjdHgsIG5ld1RleHQpO1xyXG4gIH1cclxuICByZXR1cm4gcmVwbGFjZUluQ29udGVudEVkaXRhYmxlKGN0eCwgbmV3VGV4dCk7XHJcbn1cclxuXHJcbi8vIExlZ2FjeSBhbGlhc1xyXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVNlbGVjdGVkVGV4dChjdHg6IFNlbGVjdGlvbkNvbnRleHQsIG5ld1RleHQ6IHN0cmluZyk6IHZvaWQge1xyXG4gIHJlcGxhY2VTZWxlY3Rpb24oY3R4LCBuZXdUZXh0KTtcclxufVxyXG5cclxuLy8gLS0tLSB0ZXh0YXJlYSAvIGlucHV0IC0tLS1cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VJbkZpZWxkKGN0eDogU2VsZWN0aW9uQ29udGV4dCwgbmV3VGV4dDogc3RyaW5nKTogUmVwbGFjZVJlc3VsdCB7XHJcbiAgY29uc3QgZWwgPSBjdHguZWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IGN0eDtcclxuICBjb25zdCBuZXdWYWx1ZSA9XHJcbiAgICBlbC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnQpICsgbmV3VGV4dCArIGVsLnZhbHVlLnN1YnN0cmluZyhlbmQpO1xyXG5cclxuICAvLyBSZWFjdCB3cmFwcyBpbnB1dCB3aXRoIGEgY29udHJvbGxlZCBjb21wb25lbnQuIFNldHRpbmcgLnZhbHVlIGRpcmVjdGx5XHJcbiAgLy8gZG9lc24ndCB0cmlnZ2VyIFJlYWN0J3MgY2hhbmdlIGRldGVjdGlvbi4gVGhlIG5hdGl2ZSBzZXR0ZXIgYnlwYXNzZXMgdGhhdC5cclxuICBjb25zdCBwcm90byA9XHJcbiAgICBlbCBpbnN0YW5jZW9mIEhUTUxUZXh0QXJlYUVsZW1lbnRcclxuICAgICAgPyBIVE1MVGV4dEFyZWFFbGVtZW50LnByb3RvdHlwZVxyXG4gICAgICA6IEhUTUxJbnB1dEVsZW1lbnQucHJvdG90eXBlO1xyXG4gIGNvbnN0IG5hdGl2ZVNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIFwidmFsdWVcIik/LnNldDtcclxuICBpZiAobmF0aXZlU2V0dGVyKSB7XHJcbiAgICBuYXRpdmVTZXR0ZXIuY2FsbChlbCwgbmV3VmFsdWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBlbC52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZWwuZm9jdXMoKTtcclxuICBjb25zdCBjdXJzb3IgPSBzdGFydCArIG5ld1RleHQubGVuZ3RoO1xyXG4gIGVsLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yKTtcclxuXHJcbiAgLy8gRGlzcGF0Y2ggYm90aCBldmVudHMg4oCUIFJlYWN0IGxpc3RlbnMgdG8gJ2lucHV0Jywgb3RoZXJzIG1heSBsaXN0ZW4gdG8gJ2NoYW5nZSdcclxuICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSB9KSk7XHJcbiAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIiwgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuXHJcbiAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWV0aG9kOiBcImlucHV0LXZhbHVlXCIgfTtcclxufVxyXG5cclxuLy8gLS0tLSBjb250ZW50ZWRpdGFibGUgLS0tLVxyXG5cclxuZnVuY3Rpb24gcmVwbGFjZUluQ29udGVudEVkaXRhYmxlKFxyXG4gIGN0eDogU2VsZWN0aW9uQ29udGV4dCxcclxuICBuZXdUZXh0OiBzdHJpbmdcclxuKTogUmVwbGFjZVJlc3VsdCB7XHJcbiAgY29uc3QgeyBlbGVtZW50LCByYW5nZVN0YXJ0LCByYW5nZUVuZCB9ID0gY3R4O1xyXG5cclxuICBlbGVtZW50LmZvY3VzKCk7XHJcblxyXG4gIC8vIFN0cmF0ZWd5IDEgKyAyOiByZXN0b3JlIHRoZSBzYXZlZCByYW5nZSBub2RlIHJlZmVyZW5jZXNcclxuICBpZiAocmFuZ2VTdGFydCAmJiByYW5nZUVuZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xyXG4gICAgICByYW5nZS5zZXRTdGFydChyYW5nZVN0YXJ0Lm5vZGUsIHJhbmdlU3RhcnQub2Zmc2V0KTtcclxuICAgICAgcmFuZ2Uuc2V0RW5kKHJhbmdlRW5kLm5vZGUsIHJhbmdlRW5kLm9mZnNldCk7XHJcblxyXG4gICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkhO1xyXG4gICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XHJcblxyXG4gICAgICAvLyBleGVjQ29tbWFuZCBkaXNwYXRjaGVzIGEgcHJvcGVyIElucHV0RXZlbnQgdGhhdCBQcm9zZU1pcnJvciAvIFRpcHRhcFxyXG4gICAgICAvLyBoYW5kbGUgbmF0aXZlbHkg4oCUIHRoaXMgaXMgdGhlIG1vc3QgY29tcGF0aWJsZSBwYXRoLlxyXG4gICAgICBjb25zdCBvayA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0VGV4dFwiLCBmYWxzZSwgbmV3VGV4dCk7XHJcbiAgICAgIGlmIChvaykge1xyXG4gICAgICAgIC8vIERvIE5PVCBtYW51YWxseSBkaXNwYXRjaCAnaW5wdXQnIGhlcmUuIGV4ZWNDb21tYW5kIG5hdGl2ZWx5IGZpcmVzIGl0LlxyXG4gICAgICAgIC8vIEZpcmluZyBpdCBtYW51YWxseSBjYXVzZXMgZHVwbGljYXRlIGluc2VydGlvbnMgaW4gUHJvc2VNaXJyb3IvUmVhY3Qgd3JhcHBlcnMuXHJcbiAgICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWV0aG9kOiBcImV4ZWMtY29tbWFuZFwiIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFN0cmF0ZWd5IDI6IG1hbnVhbCByYW5nZSBtYW5pcHVsYXRpb25cclxuICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcclxuICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShuZXdUZXh0KTtcclxuICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZSh0ZXh0Tm9kZSk7XHJcbiAgICAgIHJhbmdlLnNldFN0YXJ0QWZ0ZXIodGV4dE5vZGUpO1xyXG4gICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xyXG4gICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG4gICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuICAgICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgbWV0aG9kOiBcIm1hbnVhbC1yYW5nZVwiIH07XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gUmFuZ2Ugbm9kZXMgYmVjYW1lIHN0YWxlIChET00gbXV0YXRlZCBiZXR3ZWVuIGNhcHR1cmUgYW5kIHJlcGxhY2UpXHJcbiAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byB0ZXh0IHNlYXJjaFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gU3RyYXRlZ3kgMzogd2FsayB0ZXh0IG5vZGVzIHRvIGZpbmQgdGhlIG9yaWdpbmFsIHN0cmluZyBhbmQgcmVwbGFjZSBpdFxyXG4gIGNvbnN0IGZvdW5kID0gcmVwbGFjZUJ5VGV4dFNlYXJjaChlbGVtZW50LCBjdHguc2VsZWN0ZWRUZXh0LCBuZXdUZXh0KTtcclxuICBpZiAoZm91bmQpIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG1ldGhvZDogXCJ0ZXh0LXNlYXJjaFwiIH07XHJcblxyXG4gIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBtZXRob2Q6IFwiZmFpbGVkXCIgfTtcclxufVxyXG5cclxuLy8gV2FsayBhbGwgdGV4dCBub2RlcyBpbnNpZGUgYHJvb3RgLCBsb2NhdGUgYG9yaWdpbmFsYCwgcmVwbGFjZSB3aXRoIGByZXBsYWNlbWVudGAuXHJcbi8vIEhhbmRsZXMgYm90aCBzaW5nbGUtbm9kZSBhbmQgY3Jvc3Mtbm9kZSBzZWxlY3Rpb25zLlxyXG5mdW5jdGlvbiByZXBsYWNlQnlUZXh0U2VhcmNoKFxyXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxyXG4gIG9yaWdpbmFsOiBzdHJpbmcsXHJcbiAgcmVwbGFjZW1lbnQ6IHN0cmluZ1xyXG4pOiBib29sZWFuIHtcclxuICBpZiAoIW9yaWdpbmFsLnRyaW0oKSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKHJvb3QsIE5vZGVGaWx0ZXIuU0hPV19URVhUKTtcclxuICBjb25zdCBub2RlczogVGV4dFtdID0gW107XHJcbiAgbGV0IG46IE5vZGUgfCBudWxsO1xyXG4gIHdoaWxlICgobiA9IHdhbGtlci5uZXh0Tm9kZSgpKSkgbm9kZXMucHVzaChuIGFzIFRleHQpO1xyXG5cclxuICAvLyAtLS0gU2luZ2xlLW5vZGUgbWF0Y2ggKG1vc3QgY29tbW9uIGNhc2UpIC0tLVxyXG4gIGZvciAoY29uc3QgdGV4dE5vZGUgb2Ygbm9kZXMpIHtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSB0ZXh0Tm9kZS50ZXh0Q29udGVudCA/PyBcIlwiO1xyXG4gICAgY29uc3QgaWR4ID0gY29udGVudC5pbmRleE9mKG9yaWdpbmFsKTtcclxuICAgIGlmIChpZHggPT09IC0xKSBjb250aW51ZTtcclxuXHJcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XHJcbiAgICByYW5nZS5zZXRTdGFydCh0ZXh0Tm9kZSwgaWR4KTtcclxuICAgIHJhbmdlLnNldEVuZCh0ZXh0Tm9kZSwgaWR4ICsgb3JpZ2luYWwubGVuZ3RoKTtcclxuXHJcbiAgICByZXR1cm4gaW5zZXJ0VmlhUmFuZ2UocmFuZ2UsIHJvb3QsIHJlcGxhY2VtZW50KTtcclxuICB9XHJcblxyXG4gIC8vIC0tLSBDcm9zcy1ub2RlIG1hdGNoIC0tLVxyXG4gIC8vIEJ1aWxkIGNvbmNhdGVuYXRlZCB0ZXh0LCBsb2NhdGUgdGhlIG9mZnNldCwgbWFwIGJhY2sgdG8gbm9kZStvZmZzZXQgcGFpcnNcclxuICBjb25zdCBzZWdtZW50cyA9IG5vZGVzLm1hcCgobikgPT4gbi50ZXh0Q29udGVudCA/PyBcIlwiKTtcclxuICBjb25zdCBjb21iaW5lZCA9IHNlZ21lbnRzLmpvaW4oXCJcIik7XHJcbiAgY29uc3QgaWR4ID0gY29tYmluZWQuaW5kZXhPZihvcmlnaW5hbCk7XHJcbiAgaWYgKGlkeCA9PT0gLTEpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgZW5kSWR4ID0gaWR4ICsgb3JpZ2luYWwubGVuZ3RoO1xyXG4gIGxldCBwb3MgPSAwO1xyXG4gIGxldCBzdGFydE5vZGU6IFRleHQgfCBudWxsID0gbnVsbDtcclxuICBsZXQgc3RhcnRPZmZzZXQgPSAwO1xyXG4gIGxldCBlbmROb2RlOiBUZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgbGV0IGVuZE9mZnNldCA9IDA7XHJcblxyXG4gIGZvciAoY29uc3QgdGV4dE5vZGUgb2Ygbm9kZXMpIHtcclxuICAgIGNvbnN0IGxlbiA9IHRleHROb2RlLnRleHRDb250ZW50Py5sZW5ndGggPz8gMDtcclxuICAgIGlmICghc3RhcnROb2RlICYmIHBvcyArIGxlbiA+IGlkeCkge1xyXG4gICAgICBzdGFydE5vZGUgPSB0ZXh0Tm9kZTtcclxuICAgICAgc3RhcnRPZmZzZXQgPSBpZHggLSBwb3M7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RhcnROb2RlICYmIHBvcyArIGxlbiA+PSBlbmRJZHgpIHtcclxuICAgICAgZW5kTm9kZSA9IHRleHROb2RlO1xyXG4gICAgICBlbmRPZmZzZXQgPSBlbmRJZHggLSBwb3M7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcG9zICs9IGxlbjtcclxuICB9XHJcblxyXG4gIGlmICghc3RhcnROb2RlIHx8ICFlbmROb2RlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICByYW5nZS5zZXRTdGFydChzdGFydE5vZGUsIHN0YXJ0T2Zmc2V0KTtcclxuICByYW5nZS5zZXRFbmQoZW5kTm9kZSwgZW5kT2Zmc2V0KTtcclxuICByZXR1cm4gaW5zZXJ0VmlhUmFuZ2UocmFuZ2UsIHJvb3QsIHJlcGxhY2VtZW50KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0VmlhUmFuZ2UoXHJcbiAgcmFuZ2U6IFJhbmdlLFxyXG4gIHJvb3Q6IEhUTUxFbGVtZW50LFxyXG4gIHRleHQ6IHN0cmluZ1xyXG4pOiBib29sZWFuIHtcclxuICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkhO1xyXG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cclxuICBjb25zdCBvayA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiaW5zZXJ0VGV4dFwiLCBmYWxzZSwgdGV4dCk7XHJcbiAgaWYgKG9rKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vIE1hbnVhbCBmYWxsYmFja1xyXG4gIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XHJcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xyXG4gIHJhbmdlLmluc2VydE5vZGUobm9kZSk7XHJcbiAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihub2RlKTtcclxuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcclxuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcclxuICByb290LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iLCIvLyBGbG9hdGluZyBsb2FkZXIgKyB0b2FzdCBub3RpZmljYXRpb24gc3lzdGVtLlxyXG4vLyBVc2VzIFNoYWRvdyBET00gc28gdGhlIGhvc3QgcGFnZSdzIENTUyBjYW5ub3QgaW50ZXJmZXJlIOKAlCBjcml0aWNhbCBmb3JcclxuLy8gc2l0ZXMgbGlrZSBDaGF0R1BUIHRoYXQgaGF2ZSBhZ2dyZXNzaXZlIGdsb2JhbCByZXNldHMuXHJcblxyXG4vLyAtLS0tIFNoYWRvdyBob3N0IChjcmVhdGVkIG9uY2UgcGVyIHBhZ2UsIHJlLXVzZWQgZm9yIGFsbCBVSSkgLS0tLVxyXG5cclxubGV0IF9zaGFkb3c6IFNoYWRvd1Jvb3QgfCBudWxsID0gbnVsbDtcclxuXHJcbmZ1bmN0aW9uIGdldFNoYWRvdygpOiBTaGFkb3dSb290IHtcclxuICAvLyBJZiBob3N0IHdhcyByZW1vdmVkIChlLmcuIFNQQSBmdWxsLXBhZ2Ugc3dhcCksIHJlY3JlYXRlIGl0XHJcbiAgaWYgKF9zaGFkb3cgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2t6ZXRoLXVpLWhvc3RcIikpIHJldHVybiBfc2hhZG93O1xyXG5cclxuICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBob3N0LmlkID0gXCJ0b2t6ZXRoLXVpLWhvc3RcIjtcclxuICAvLyBaZXJvLXNpemUsIHBvaW50ZXItZXZlbnRzLW5vbmUgYW5jaG9yIGVsZW1lbnQuIENoaWxkcmVuIHVzZSBwb3NpdGlvbjpmaXhlZFxyXG4gIC8vIHNvIHRoZXkgZXNjYXBlIGFuZCBhcHBlYXIgYXQgdGhlaXIgb3duIGZpeGVkIGNvb3JkaW5hdGVzLlxyXG4gIGhvc3Quc3R5bGUuY3NzVGV4dCA9XHJcbiAgICBcInBvc2l0aW9uOmZpeGVkO3RvcDowO2xlZnQ6MDt3aWR0aDowO2hlaWdodDowO3otaW5kZXg6MjE0NzQ4MzY0Nztwb2ludGVyLWV2ZW50czpub25lO292ZXJmbG93OnZpc2libGU7XCI7XHJcblxyXG4gIF9zaGFkb3cgPSBob3N0LmF0dGFjaFNoYWRvdyh7IG1vZGU6IFwib3BlblwiIH0pO1xyXG5cclxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuICBzdHlsZS50ZXh0Q29udGVudCA9IFNIQURPV19TVFlMRVM7XHJcbiAgX3NoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSk7XHJcblxyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG9zdCk7XHJcbiAgcmV0dXJuIF9zaGFkb3c7XHJcbn1cclxuXHJcbi8vIC0tLS0gTG9hZGVyIC0tLS1cclxuXHJcbmxldCBfbG9hZGVyRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0xvYWRlcihtZXNzYWdlID0gXCJPcHRpbWl6aW5nIHByb21wdFwiKTogdm9pZCB7XHJcbiAgaWYgKF9sb2FkZXJFbCkgcmV0dXJuOyAvLyBhbHJlYWR5IHZpc2libGUg4oCUIGRvbid0IHN0YWNrXHJcbiAgY29uc3Qgc2hhZG93ID0gZ2V0U2hhZG93KCk7XHJcblxyXG4gIF9sb2FkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgX2xvYWRlckVsLmNsYXNzTmFtZSA9IFwidHotbG9hZGVyXCI7XHJcbiAgX2xvYWRlckVsLmlubmVySFRNTCA9IGBcclxuICAgIDxzcGFuIGNsYXNzPVwidHotbG9hZGVyLWljb25cIj7imqE8L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz1cInR6LWxvYWRlci10ZXh0XCI+JHtlc2NhcGVIdG1sKG1lc3NhZ2UpfTwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwidHotZG90c1wiPlxyXG4gICAgICA8c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj5cclxuICAgIDwvc3Bhbj5gO1xyXG4gIHNoYWRvdy5hcHBlbmRDaGlsZChfbG9hZGVyRWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZUxvYWRlcigpOiB2b2lkIHtcclxuICBpZiAoIV9sb2FkZXJFbCkgcmV0dXJuO1xyXG4gIGNvbnN0IGVsID0gX2xvYWRlckVsO1xyXG4gIF9sb2FkZXJFbCA9IG51bGw7XHJcbiAgZWwuY2xhc3NMaXN0LmFkZChcInR6LWV4aXRcIik7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCAoKSA9PiBlbC5yZW1vdmUoKSwgeyBvbmNlOiB0cnVlIH0pO1xyXG59XHJcblxyXG4vLyAtLS0tIFRvYXN0IC0tLS1cclxuXHJcbmV4cG9ydCB0eXBlIFRvYXN0VHlwZSA9IFwic3VjY2Vzc1wiIHwgXCJlcnJvclwiIHwgXCJpbmZvXCI7XHJcblxyXG5jb25zdCBUT0FTVF9JQ09OUzogUmVjb3JkPFRvYXN0VHlwZSwgc3RyaW5nPiA9IHtcclxuICBzdWNjZXNzOiBcIuKck1wiLFxyXG4gIGVycm9yOiBcIuKclVwiLFxyXG4gIGluZm86IFwi4peIXCIsXHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd1RvYXN0KFxyXG4gIG1lc3NhZ2U6IHN0cmluZyxcclxuICB0eXBlOiBUb2FzdFR5cGUgPSBcImluZm9cIixcclxuICBkdXJhdGlvbiA9IDM1MDBcclxuKTogdm9pZCB7XHJcbiAgY29uc3Qgc2hhZG93ID0gZ2V0U2hhZG93KCk7XHJcblxyXG4gIGNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB0b2FzdC5jbGFzc05hbWUgPSBgdHotdG9hc3QgdHotdG9hc3QtLSR7dHlwZX1gO1xyXG4gIHRvYXN0LmlubmVySFRNTCA9IGBcclxuICAgIDxzcGFuIGNsYXNzPVwidHotdG9hc3QtaWNvblwiPiR7VE9BU1RfSUNPTlNbdHlwZV19PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJ0ei10b2FzdC10ZXh0XCI+JHtlc2NhcGVIdG1sKG1lc3NhZ2UpfTwvc3Bhbj5gO1xyXG5cclxuICBzaGFkb3cuYXBwZW5kQ2hpbGQodG9hc3QpO1xyXG5cclxuICAvLyBUcmlnZ2VyIGVudGVyIHRyYW5zaXRpb24gb24gbmV4dCBmcmFtZVxyXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdG9hc3QuY2xhc3NMaXN0LmFkZChcInR6LXRvYXN0LS12aXNpYmxlXCIpKTtcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgdG9hc3QuY2xhc3NMaXN0LnJlbW92ZShcInR6LXRvYXN0LS12aXNpYmxlXCIpO1xyXG4gICAgdG9hc3QuY2xhc3NMaXN0LmFkZChcInR6LXRvYXN0LS1leGl0XCIpO1xyXG4gICAgdG9hc3QuYWRkRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgKCkgPT4gdG9hc3QucmVtb3ZlKCksIHsgb25jZTogdHJ1ZSB9KTtcclxuICB9O1xyXG5cclxuICBzZXRUaW1lb3V0KHJlbW92ZSwgZHVyYXRpb24pO1xyXG59XHJcblxyXG4vLyAtLS0tIEhlbHBlcnMgLS0tLVxyXG5cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIHJldHVybiBzLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKTtcclxufVxyXG5cclxuLy8gLS0tLSBTaGFkb3cgRE9NIENTUyAtLS0tXHJcblxyXG5jb25zdCBTSEFET1dfU1RZTEVTID0gYFxyXG4vKiAtLS0tIExvYWRlciAtLS0tICovXHJcbi50ei1sb2FkZXIge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDI0cHg7XHJcbiAgcmlnaHQ6IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogOHB4O1xyXG4gIHBhZGRpbmc6IDEwcHggMThweDtcclxuICBiYWNrZ3JvdW5kOiByZ2JhKDEzLCAxMywgMjAsIDAuOTMpO1xyXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cigxNHB4KTtcclxuICAtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigxNHB4KTtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDk5LCAxMDIsIDI0MSwgMC40KTtcclxuICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICBjb2xvcjogI2M0YzllODtcclxuICBmb250LWZhbWlseTogc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCAnU2Vnb2UgVUknLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuNSksIDAgMCAwIDFweCByZ2JhKDk5LDEwMiwyNDEsMC4wOCk7XHJcbiAgYW5pbWF0aW9uOiB0ei1sb2FkZXItaW4gMC4yMnMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpIGJvdGg7XHJcbiAgei1pbmRleDogMjE0NzQ4MzY0NztcclxufVxyXG4udHotbG9hZGVyLnR6LWV4aXQge1xyXG4gIGFuaW1hdGlvbjogdHotbG9hZGVyLW91dCAwLjE4cyBlYXNlIGZvcndhcmRzO1xyXG59XHJcbi50ei1sb2FkZXItaWNvbiB7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDdweCByZ2JhKDk5LDEwMiwyNDEsMC43NSkpO1xyXG59XHJcbi50ei1sb2FkZXItdGV4dCB7XHJcbiAgY29sb3I6ICNhNWFjY2M7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDFlbTtcclxufVxyXG5cclxuLyogLS0tLSBBbmltYXRlZCBkb3RzIC0tLS0gKi9cclxuLnR6LWRvdHMge1xyXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG4gIGdhcDogM3B4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWxlZnQ6IDJweDtcclxufVxyXG4udHotZG90cyBzcGFuIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICB3aWR0aDogNHB4O1xyXG4gIGhlaWdodDogNHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICBiYWNrZ3JvdW5kOiAjNjM2NmYxO1xyXG4gIGFuaW1hdGlvbjogdHotZG90IDEuMnMgZWFzZS1pbi1vdXQgaW5maW5pdGU7XHJcbn1cclxuLnR6LWRvdHMgc3BhbjpudGgtY2hpbGQoMikgeyBhbmltYXRpb24tZGVsYXk6IDAuMnM7IH1cclxuLnR6LWRvdHMgc3BhbjpudGgtY2hpbGQoMykgeyBhbmltYXRpb24tZGVsYXk6IDAuNHM7IH1cclxuXHJcbi8qIC0tLS0gVG9hc3QgLS0tLSAqL1xyXG4udHotdG9hc3Qge1xyXG4gIHBvc2l0aW9uOiBmaXhlZDtcclxuICB0b3A6IDI0cHg7XHJcbiAgcmlnaHQ6IDI0cHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGdhcDogMTBweDtcclxuICBwYWRkaW5nOiAxMHB4IDE2cHg7XHJcbiAgYmFja2dyb3VuZDogcmdiYSgxMywgMTMsIDIwLCAwLjk1KTtcclxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTRweCk7XHJcbiAgLXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTRweCk7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBmb250LWZhbWlseTogc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCAnU2Vnb2UgVUknLCBzYW5zLXNlcmlmO1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiAjYzRjOWU4O1xyXG4gIG1heC13aWR0aDogMzIwcHg7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgb3BhY2l0eTogMDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEwcHgpO1xyXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLCB0cmFuc2Zvcm0gMC4yMnMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNCwgMC42NCwgMSk7XHJcbiAgYm94LXNoYWRvdzogMCA0cHggMjRweCByZ2JhKDAsIDAsIDAsIDAuNDUpO1xyXG4gIHotaW5kZXg6IDIxNDc0ODM2NDc7XHJcbn1cclxuLyogV2hlbiBsb2FkZXIgaXMgYWxzbyB2aXNpYmxlLCBvZmZzZXQgdG9hc3QgYmVsb3cgaXQgKi9cclxuLnR6LXRvYXN0IHsgdG9wOiA3MnB4OyB9XHJcblxyXG4udHotdG9hc3QtLXZpc2libGUge1xyXG4gIG9wYWNpdHk6IDE7XHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xyXG59XHJcbi50ei10b2FzdC0tZXhpdCB7XHJcbiAgb3BhY2l0eTogMDtcclxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTRweCk7XHJcbn1cclxuLnR6LXRvYXN0LS1zdWNjZXNzIHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1MiwgMjExLCAxNTMsIDAuNCk7IH1cclxuLnR6LXRvYXN0LS1lcnJvciAgIHsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNDgsIDExMywgMTEzLCAwLjQpOyB9XHJcbi50ei10b2FzdC0taW5mbyAgICB7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoOTksIDEwMiwgMjQxLCAwLjQpOyAgfVxyXG5cclxuLnR6LXRvYXN0LWljb24geyBmb250LXNpemU6IDE0cHg7IGZsZXgtc2hyaW5rOiAwOyB9XHJcbi50ei10b2FzdC0tc3VjY2VzcyAudHotdG9hc3QtaWNvbiB7IGNvbG9yOiAjMzRkMzk5OyB9XHJcbi50ei10b2FzdC0tZXJyb3IgICAudHotdG9hc3QtaWNvbiB7IGNvbG9yOiAjZjg3MTcxOyB9XHJcbi50ei10b2FzdC0taW5mbyAgICAudHotdG9hc3QtaWNvbiB7IGNvbG9yOiAjODE4Y2Y4OyB9XHJcblxyXG4vKiAtLS0tIEtleWZyYW1lcyAtLS0tICovXHJcbkBrZXlmcmFtZXMgdHotbG9hZGVyLWluIHtcclxuICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDEycHgpIHNjYWxlKDAuOTUpOyB9XHJcbiAgdG8gICB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSAgICBzY2FsZSgxKTsgICAgfVxyXG59XHJcbkBrZXlmcmFtZXMgdHotbG9hZGVyLW91dCB7XHJcbiAgZnJvbSB7IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfVxyXG4gIHRvICAgeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTBweCk7IH1cclxufVxyXG5Aa2V5ZnJhbWVzIHR6LWRvdCB7XHJcbiAgMCUsIDgwJSwgMTAwJSB7IG9wYWNpdHk6IDAuMjU7IHRyYW5zZm9ybTogc2NhbGUoMC43NSk7IH1cclxuICA0MCUgICAgICAgICAgICB7IG9wYWNpdHk6IDE7ICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpOyAgfVxyXG59XHJcbmA7XHJcbiIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiQHBsYXNtb2hxL3N0b3JhZ2VcIjtcblxuZXhwb3J0IHR5cGUgT3B0aW1pemVNb2RlID1cbiAgfCBcImNvbXByZXNzXCJcbiAgfCBcImVuaGFuY2VcIlxuICB8IFwiY29kaW5nXCJcbiAgfCBcInByb2Zlc3Npb25hbFwiXG4gIHwgXCJodW1hbml6ZVwiXG4gIHwgXCJlbWFpbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuc2lvblNldHRpbmdzIHtcbiAgYWN0aXZlTW9kZTogT3B0aW1pemVNb2RlO1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIGFwaUtleT86IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogRXh0ZW5zaW9uU2V0dGluZ3MgPSB7XG4gIGFjdGl2ZU1vZGU6IFwiZW5oYW5jZVwiLFxufTtcblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcm9taXNlPEV4dGVuc2lvblNldHRpbmdzPiB7XG4gIGNvbnN0IG1vZGUgPSBhd2FpdCBzdG9yYWdlLmdldDxPcHRpbWl6ZU1vZGU+KFwiYWN0aXZlTW9kZVwiKTtcbiAgY29uc3QgdXNlcklkID0gYXdhaXQgc3RvcmFnZS5nZXQ8c3RyaW5nPihcInVzZXJJZFwiKTtcbiAgcmV0dXJuIHtcbiAgICBhY3RpdmVNb2RlOiBtb2RlID8/IERFRkFVTFRfU0VUVElOR1MuYWN0aXZlTW9kZSxcbiAgICB1c2VySWQsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlTW9kZShtb2RlOiBPcHRpbWl6ZU1vZGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgc3RvcmFnZS5zZXQoXCJhY3RpdmVNb2RlXCIsIG1vZGUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVVzZXJJZCh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBzdG9yYWdlLnNldChcInVzZXJJZFwiLCB1c2VySWQpO1xufVxuIiwiaW1wb3J0IG0gZnJvbVwicGlmeVwiO3ZhciBsPSgpPT57dHJ5e2xldCBlPShnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50KS5tYXRjaCgvKG9wZXJhfGNocm9tZXxzYWZhcml8ZmlyZWZveHxtc2llfHRyaWRlbnQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpfHxbXTtpZihlWzFdPT09XCJDaHJvbWVcIilyZXR1cm4gcGFyc2VJbnQoZVsyXSk8MTAwfHxnbG9iYWxUaGlzLmNocm9tZS5ydW50aW1lPy5nZXRNYW5pZmVzdCgpPy5tYW5pZmVzdF92ZXJzaW9uPT09Mn1jYXRjaHtyZXR1cm4hMX1yZXR1cm4hMX07dmFyIG89Y2xhc3N7I3I7I3Q7Z2V0IHByaW1hcnlDbGllbnQoKXtyZXR1cm4gdGhpcy4jdH0jZTtnZXQgc2Vjb25kYXJ5Q2xpZW50KCl7cmV0dXJuIHRoaXMuI2V9I2E7Z2V0IGFyZWEoKXtyZXR1cm4gdGhpcy4jYX1nZXQgaGFzV2ViQXBpKCl7dHJ5e3JldHVybiB0eXBlb2Ygd2luZG93PFwidVwiJiYhIXdpbmRvdy5sb2NhbFN0b3JhZ2V9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUuZXJyb3IoZSksITF9fSNzPW5ldyBNYXA7I2k7Z2V0IGNvcGllZEtleVNldCgpe3JldHVybiB0aGlzLiNpfWlzQ29waWVkPWU9PnRoaXMuaGFzV2ViQXBpJiYodGhpcy5hbGxDb3BpZWR8fHRoaXMuY29waWVkS2V5U2V0LmhhcyhlKSk7I249ITE7Z2V0IGFsbENvcGllZCgpe3JldHVybiB0aGlzLiNufWdldEV4dFN0b3JhZ2VBcGk9KCk9Pmdsb2JhbFRoaXMuYnJvd3Nlcj8uc3RvcmFnZXx8Z2xvYmFsVGhpcy5jaHJvbWU/LnN0b3JhZ2U7Z2V0IGhhc0V4dGVuc2lvbkFwaSgpe3RyeXtyZXR1cm4hIXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmVycm9yKGUpLCExfX1pc1dhdGNoU3VwcG9ydGVkPSgpPT50aGlzLmhhc0V4dGVuc2lvbkFwaTtrZXlOYW1lc3BhY2U9XCJcIjtpc1ZhbGlkS2V5PWU9PmUuc3RhcnRzV2l0aCh0aGlzLmtleU5hbWVzcGFjZSk7Z2V0TmFtZXNwYWNlZEtleT1lPT5gJHt0aGlzLmtleU5hbWVzcGFjZX0ke2V9YDtnZXRVbm5hbWVzcGFjZWRLZXk9ZT0+ZS5zbGljZSh0aGlzLmtleU5hbWVzcGFjZS5sZW5ndGgpO3NlcmRlPXtzZXJpYWxpemVyOkpTT04uc3RyaW5naWZ5LGRlc2VyaWFsaXplcjpKU09OLnBhcnNlfTtjb25zdHJ1Y3Rvcih7YXJlYTplPVwic3luY1wiLGFsbENvcGllZDp0PSExLGNvcGllZEtleUxpc3Q6cz1bXSxzZXJkZTpyPXt9fT17fSl7dGhpcy5zZXRDb3BpZWRLZXlTZXQocyksdGhpcy4jYT1lLHRoaXMuI249dCx0aGlzLnNlcmRlPXsuLi50aGlzLnNlcmRlLC4uLnJ9O3RyeXt0aGlzLmhhc1dlYkFwaSYmKHR8fHMubGVuZ3RoPjApJiYodGhpcy4jZT13aW5kb3cubG9jYWxTdG9yYWdlKX1jYXRjaHt9dHJ5e3RoaXMuaGFzRXh0ZW5zaW9uQXBpJiYodGhpcy4jcj10aGlzLmdldEV4dFN0b3JhZ2VBcGkoKSxsKCk/dGhpcy4jdD1tKHRoaXMuI3JbdGhpcy5hcmVhXSx7ZXhjbHVkZTpbXCJnZXRCeXRlc0luVXNlXCJdLGVycm9yRmlyc3Q6ITF9KTp0aGlzLiN0PXRoaXMuI3JbdGhpcy5hcmVhXSl9Y2F0Y2h7fX1zZXRDb3BpZWRLZXlTZXQoZSl7dGhpcy4jaT1uZXcgU2V0KGUpfXJhd0dldEFsbD0oKT0+dGhpcy4jdD8uZ2V0KCk7Z2V0QWxsPWFzeW5jKCk9PntsZXQgZT1hd2FpdCB0aGlzLnJhd0dldEFsbCgpO3JldHVybiBPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFt0XSk9PnRoaXMuaXNWYWxpZEtleSh0KSkucmVkdWNlKCh0LFtzLHJdKT0+KHRbdGhpcy5nZXRVbm5hbWVzcGFjZWRLZXkocyldPXIsdCkse30pfTtjb3B5PWFzeW5jIGU9PntsZXQgdD1lPT09dm9pZCAwO2lmKCF0JiYhdGhpcy5jb3BpZWRLZXlTZXQuaGFzKGUpfHwhdGhpcy5hbGxDb3BpZWR8fCF0aGlzLmhhc0V4dGVuc2lvbkFwaSlyZXR1cm4hMTtsZXQgcz10aGlzLmFsbENvcGllZD9hd2FpdCB0aGlzLnJhd0dldEFsbCgpOmF3YWl0IHRoaXMuI3QuZ2V0KCh0P1suLi50aGlzLmNvcGllZEtleVNldF06W2VdKS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KSk7aWYoIXMpcmV0dXJuITE7bGV0IHI9ITE7Zm9yKGxldCBhIGluIHMpe2xldCBpPXNbYV0sbj10aGlzLiNlPy5nZXRJdGVtKGEpO3RoaXMuI2U/LnNldEl0ZW0oYSxpKSxyfHw9aSE9PW59cmV0dXJuIHJ9O3Jhd0dldD1hc3luYyBlPT4oYXdhaXQgdGhpcy5yYXdHZXRNYW55KFtlXSkpW2VdO3Jhd0dldE1hbnk9YXN5bmMgZT0+dGhpcy5oYXNFeHRlbnNpb25BcGk/YXdhaXQgdGhpcy4jdC5nZXQoZSk6ZS5maWx0ZXIodGhpcy5pc0NvcGllZCkucmVkdWNlKCh0LHMpPT4odFtzXT10aGlzLiNlPy5nZXRJdGVtKHMpLHQpLHt9KTtyYXdTZXQ9YXN5bmMoZSx0KT0+YXdhaXQgdGhpcy5yYXdTZXRNYW55KHtbZV06dH0pO3Jhd1NldE1hbnk9YXN5bmMgZT0+KHRoaXMuI2UmJk9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW3RdKT0+dGhpcy5pc0NvcGllZCh0KSkuZm9yRWFjaCgoW3Qsc10pPT50aGlzLiNlLnNldEl0ZW0odCxzKSksdGhpcy5oYXNFeHRlbnNpb25BcGkmJmF3YWl0IHRoaXMuI3Quc2V0KGUpLG51bGwpO2NsZWFyPWFzeW5jKGU9ITEpPT57ZSYmdGhpcy4jZT8uY2xlYXIoKSxhd2FpdCB0aGlzLiN0LmNsZWFyKCl9O3Jhd1JlbW92ZT1hc3luYyBlPT57YXdhaXQgdGhpcy5yYXdSZW1vdmVNYW55KFtlXSl9O3Jhd1JlbW92ZU1hbnk9YXN5bmMgZT0+e3RoaXMuI2UmJmUuZmlsdGVyKHRoaXMuaXNDb3BpZWQpLmZvckVhY2godD0+dGhpcy4jZS5yZW1vdmVJdGVtKHQpKSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jdC5yZW1vdmUoZSl9O3JlbW92ZUFsbD1hc3luYygpPT57bGV0IGU9YXdhaXQgdGhpcy5nZXRBbGwoKSx0PU9iamVjdC5rZXlzKGUpO2F3YWl0IHRoaXMucmVtb3ZlTWFueSh0KX07d2F0Y2g9ZT0+e2xldCB0PXRoaXMuaXNXYXRjaFN1cHBvcnRlZCgpO3JldHVybiB0JiZ0aGlzLiNvKGUpLHR9OyNvPWU9Pntmb3IobGV0IHQgaW4gZSl7bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KHQpLHI9dGhpcy4jcy5nZXQocyk/LmNhbGxiYWNrU2V0fHxuZXcgU2V0O2lmKHIuYWRkKGVbdF0pLHIuc2l6ZT4xKWNvbnRpbnVlO2xldCBhPShpLG4pPT57aWYobiE9PXRoaXMuYXJlYXx8IWlbc10pcmV0dXJuO2xldCBoPXRoaXMuI3MuZ2V0KHMpO2lmKCFoKXRocm93IG5ldyBFcnJvcihgU3RvcmFnZSBjb21tcyBkb2VzIG5vdCBleGlzdCBmb3IgbnNLZXk6ICR7c31gKTtQcm9taXNlLmFsbChbdGhpcy5wYXJzZVZhbHVlKGlbc10ubmV3VmFsdWUpLHRoaXMucGFyc2VWYWx1ZShpW3NdLm9sZFZhbHVlKV0pLnRoZW4oKFt5LGRdKT0+e2ZvcihsZXQgcCBvZiBoLmNhbGxiYWNrU2V0KXAoe25ld1ZhbHVlOnksb2xkVmFsdWU6ZH0sbil9KX07dGhpcy4jci5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoYSksdGhpcy4jcy5zZXQocyx7Y2FsbGJhY2tTZXQ6cixsaXN0ZW5lcjphfSl9fTt1bndhdGNoPWU9PntsZXQgdD10aGlzLmlzV2F0Y2hTdXBwb3J0ZWQoKTtyZXR1cm4gdCYmdGhpcy4jYyhlKSx0fTsjYyhlKXtmb3IobGV0IHQgaW4gZSl7bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KHQpLHI9ZVt0XSxhPXRoaXMuI3MuZ2V0KHMpO2EmJihhLmNhbGxiYWNrU2V0LmRlbGV0ZShyKSxhLmNhbGxiYWNrU2V0LnNpemU9PT0wJiYodGhpcy4jcy5kZWxldGUocyksdGhpcy4jci5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoYS5saXN0ZW5lcikpKX19dW53YXRjaEFsbD0oKT0+dGhpcy4jaCgpOyNoKCl7dGhpcy4jcy5mb3JFYWNoKCh7bGlzdGVuZXI6ZX0pPT50aGlzLiNyLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihlKSksdGhpcy4jcy5jbGVhcigpfWFzeW5jIGdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuZ2V0KGUpfWFzeW5jIGdldEl0ZW1zKGUpe3JldHVybiBhd2FpdCB0aGlzLmdldE1hbnkoZSl9YXN5bmMgc2V0SXRlbShlLHQpe2F3YWl0IHRoaXMuc2V0KGUsdCl9YXN5bmMgc2V0SXRlbXMoZSl7YXdhaXQgYXdhaXQgdGhpcy5zZXRNYW55KGUpfWFzeW5jIHJlbW92ZUl0ZW0oZSl7cmV0dXJuIHRoaXMucmVtb3ZlKGUpfWFzeW5jIHJlbW92ZUl0ZW1zKGUpe3JldHVybiBhd2FpdCB0aGlzLnJlbW92ZU1hbnkoZSl9fSxnPWNsYXNzIGV4dGVuZHMgb3tnZXQ9YXN5bmMgZT0+e2xldCB0PXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKSxzPWF3YWl0IHRoaXMucmF3R2V0KHQpO3JldHVybiB0aGlzLnBhcnNlVmFsdWUocyl9O2dldE1hbnk9YXN5bmMgZT0+e2xldCB0PWUubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSkscz1hd2FpdCB0aGlzLnJhd0dldE1hbnkodCkscj1hd2FpdCBQcm9taXNlLmFsbChPYmplY3QudmFsdWVzKHMpLm1hcCh0aGlzLnBhcnNlVmFsdWUpKTtyZXR1cm4gT2JqZWN0LmtleXMocykucmVkdWNlKChhLGksbik9PihhW3RoaXMuZ2V0VW5uYW1lc3BhY2VkS2V5KGkpXT1yW25dLGEpLHt9KX07c2V0PWFzeW5jKGUsdCk9PntsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSkscj10aGlzLnNlcmRlLnNlcmlhbGl6ZXIodCk7cmV0dXJuIHRoaXMucmF3U2V0KHMscil9O3NldE1hbnk9YXN5bmMgZT0+e2xldCB0PU9iamVjdC5lbnRyaWVzKGUpLnJlZHVjZSgocyxbcixhXSk9PihzW3RoaXMuZ2V0TmFtZXNwYWNlZEtleShyKV09dGhpcy5zZXJkZS5zZXJpYWxpemVyKGEpLHMpLHt9KTtyZXR1cm4gYXdhaXQgdGhpcy5yYXdTZXRNYW55KHQpfTtyZW1vdmU9YXN5bmMgZT0+e2xldCB0PXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKTtyZXR1cm4gdGhpcy5yYXdSZW1vdmUodCl9O3JlbW92ZU1hbnk9YXN5bmMgZT0+e2xldCB0PWUubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSk7cmV0dXJuIGF3YWl0IHRoaXMucmF3UmVtb3ZlTWFueSh0KX07c2V0TmFtZXNwYWNlPWU9Pnt0aGlzLmtleU5hbWVzcGFjZT1lfTtwYXJzZVZhbHVlPWFzeW5jIGU9Pnt0cnl7aWYoZSE9PXZvaWQgMClyZXR1cm4gdGhpcy5zZXJkZS5kZXNlcmlhbGl6ZXIoZSl9Y2F0Y2godCl7Y29uc29sZS5lcnJvcih0KX19fTtleHBvcnR7byBhcyBCYXNlU3RvcmFnZSxnIGFzIFN0b3JhZ2V9O1xuIiwiY29uc3QgcHJvY2Vzc0Z1bmN0aW9uID0gKGZ1bmN0aW9uXywgb3B0aW9ucywgcHJveHksIHVud3JhcHBlZCkgPT4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0Y29uc3QgUCA9IG9wdGlvbnMucHJvbWlzZU1vZHVsZTtcblxuXHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGlmIChvcHRpb25zLm11bHRpQXJncykge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKCguLi5yZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZXJyb3JGaXJzdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHRbMF0pIHtcblx0XHRcdFx0XHRcdHJlamVjdChyZXN1bHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuc2hpZnQoKTtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZXJyb3JGaXJzdCkge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKChlcnJvciwgcmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKHJlc29sdmUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzID09PSBwcm94eSA/IHVud3JhcHBlZCA6IHRoaXM7XG5cdFx0UmVmbGVjdC5hcHBseShmdW5jdGlvbl8sIHNlbGYsIGFyZ3VtZW50c18pO1xuXHR9KTtcbn07XG5cbmNvbnN0IGZpbHRlckNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGlmeShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0ge1xuXHRcdGV4Y2x1ZGU6IFsvLisoPzpTeW5jfFN0cmVhbSkkL10sXG5cdFx0ZXJyb3JGaXJzdDogdHJ1ZSxcblx0XHRwcm9taXNlTW9kdWxlOiBQcm9taXNlLFxuXHRcdC4uLm9wdGlvbnMsXG5cdH07XG5cblx0Y29uc3Qgb2JqZWN0VHlwZSA9IHR5cGVvZiBpbnB1dDtcblx0aWYgKCEoaW5wdXQgIT09IG51bGwgJiYgKG9iamVjdFR5cGUgPT09ICdvYmplY3QnIHx8IG9iamVjdFR5cGUgPT09ICdmdW5jdGlvbicpKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYGlucHV0XFxgIHRvIGJlIGEgXFxgRnVuY3Rpb25cXGAgb3IgXFxgT2JqZWN0XFxgLCBnb3QgXFxgJHtpbnB1dCA9PT0gbnVsbCA/ICdudWxsJyA6IG9iamVjdFR5cGV9XFxgYCk7XG5cdH1cblxuXHRjb25zdCBmaWx0ZXIgPSAodGFyZ2V0LCBrZXkpID0+IHtcblx0XHRsZXQgY2FjaGVkID0gZmlsdGVyQ2FjaGUuZ2V0KHRhcmdldCk7XG5cblx0XHRpZiAoIWNhY2hlZCkge1xuXHRcdFx0Y2FjaGVkID0ge307XG5cdFx0XHRmaWx0ZXJDYWNoZS5zZXQodGFyZ2V0LCBjYWNoZWQpO1xuXHRcdH1cblxuXHRcdGlmIChrZXkgaW4gY2FjaGVkKSB7XG5cdFx0XHRyZXR1cm4gY2FjaGVkW2tleV07XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF0Y2ggPSBwYXR0ZXJuID0+ICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpID8ga2V5ID09PSBwYXR0ZXJuIDogcGF0dGVybi50ZXN0KGtleSk7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcblx0XHRjb25zdCB3cml0YWJsZU9yQ29uZmlndXJhYmxlT3duID0gKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCB8fCBkZXNjcmlwdG9yLndyaXRhYmxlIHx8IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlKTtcblx0XHRjb25zdCBpbmNsdWRlZCA9IG9wdGlvbnMuaW5jbHVkZSA/IG9wdGlvbnMuaW5jbHVkZS5zb21lKGVsZW1lbnQgPT4gbWF0Y2goZWxlbWVudCkpIDogIW9wdGlvbnMuZXhjbHVkZS5zb21lKGVsZW1lbnQgPT4gbWF0Y2goZWxlbWVudCkpO1xuXHRcdGNvbnN0IHNob3VsZEZpbHRlciA9IGluY2x1ZGVkICYmIHdyaXRhYmxlT3JDb25maWd1cmFibGVPd247XG5cdFx0Y2FjaGVkW2tleV0gPSBzaG91bGRGaWx0ZXI7XG5cdFx0cmV0dXJuIHNob3VsZEZpbHRlcjtcblx0fTtcblxuXHRjb25zdCBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkoaW5wdXQsIHtcblx0XHRhcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpIHtcblx0XHRcdGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldCh0YXJnZXQpO1xuXG5cdFx0XHRpZiAoY2FjaGVkKSB7XG5cdFx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KGNhY2hlZCwgdGhpc0FyZywgYXJncyk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHBpZmllZCA9IG9wdGlvbnMuZXhjbHVkZU1haW4gPyB0YXJnZXQgOiBwcm9jZXNzRnVuY3Rpb24odGFyZ2V0LCBvcHRpb25zLCBwcm94eSwgdGFyZ2V0KTtcblx0XHRcdGNhY2hlLnNldCh0YXJnZXQsIHBpZmllZCk7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5hcHBseShwaWZpZWQsIHRoaXNBcmcsIGFyZ3MpO1xuXHRcdH0sXG5cblx0XHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtZXh0ZW5kLW5hdGl2ZS9uby11c2UtZXh0ZW5kLW5hdGl2ZVxuXHRcdFx0aWYgKCFmaWx0ZXIodGFyZ2V0LCBrZXkpIHx8IHByb3BlcnR5ID09PSBGdW5jdGlvbi5wcm90b3R5cGVba2V5XSkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChwcm9wZXJ0eSk7XG5cblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0cmV0dXJuIGNhY2hlZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjb25zdCBwaWZpZWQgPSBwcm9jZXNzRnVuY3Rpb24ocHJvcGVydHksIG9wdGlvbnMsIHByb3h5LCB0YXJnZXQpO1xuXHRcdFx0XHRjYWNoZS5zZXQocHJvcGVydHksIHBpZmllZCk7XG5cdFx0XHRcdHJldHVybiBwaWZpZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblx0XHR9LFxuXHR9KTtcblxuXHRyZXR1cm4gcHJveHk7XG59XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuY2YzNWU0MTcuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);