import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MoondreamProvider } from "./providers/moondream.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoondreamProvider>
      <App />
    </MoondreamProvider>
  </StrictMode>,
);