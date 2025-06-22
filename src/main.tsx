import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { MoondreamProvider } from "./providers/moondream.tsx";
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { ChatProvider } from "./providers/chat.tsx";

const router = createRouter({ routeTree, basepath: '/311-Agent/' });
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MoondreamProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </MoondreamProvider>
  </StrictMode>,
);
