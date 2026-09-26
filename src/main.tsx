import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@designcodeio/threeui/style.css";
import "./styles.css";
import App from "./App";

// The ThreeUI scenes size their WebGL buffers from devicePixelRatio (up to 1.5-2x). They are soft
// background effects, so render them at 1x: on HiDPI laptops that is 2-4x fewer pixels for the GPU to
// shade every frame. DOM text and images are unaffected (the browser does not read this property).
Object.defineProperty(window, "devicePixelRatio", { configurable: true, get: () => 1 });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
