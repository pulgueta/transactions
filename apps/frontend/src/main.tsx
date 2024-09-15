import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "sonner";

import { App } from "./App";
import { Providers } from "./providers";

import "./index.css";

const root = document.querySelector("#root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <Providers>
      <Toaster richColors position="top-right" visibleToasts={1} />
      <App />
    </Providers>
  </StrictMode>
);
