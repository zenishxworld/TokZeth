// ============================================================
// desktop/renderer/main.tsx
// React renderer entry point — standalone overlay window
// ────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import { Overlay } from "./components/Overlay";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Overlay />
  </React.StrictMode>
);
