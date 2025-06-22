import { useContext } from "react";
import {
  MoondreamContext,
  MoondreamContextState,
} from "../context/moondream.ts";

// Custom hook for easy consumption of the context
export function useMoondream(): MoondreamContextState {
  const context = useContext(MoondreamContext);
  if (context === undefined) {
    throw new Error("useMoondream must be used within a MoondreamProvider");
  }
  return context;
}