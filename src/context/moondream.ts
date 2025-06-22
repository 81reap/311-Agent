import { createContext } from "react";
import { WorkerEventData } from "../workers/moondream";

// Define the state and functions our context will provide
export interface MoondreamContextState {
  pipelineStatus: "idle" | "initializing" | "ready" | "error" | "working";
  response: string | null;
  error: string | null;
  query: (data: WorkerEventData) => void;
}

// Create and export the context with a default value
export const MoondreamContext = createContext<
  MoondreamContextState | undefined
>(undefined);