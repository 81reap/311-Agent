import {
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
  useCallback,
} from "react";
import { WorkerEventData } from "../workers/moondream";
import { MoondreamContext, MoondreamContextState } from "../context/moondream";

// Define the shape of the data sent from the worker
interface WorkerResponse {
  status: "initializing" | "ready" | "complete" | "error";
  output?: string;
  error?: string;
}

// Create the Provider component
export function MoondreamProvider({ children }: PropsWithChildren) {
  const [pipelineStatus, setPipelineStatus] = useState<
    MoondreamContextState["pipelineStatus"]
  >("idle");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to hold the worker instance so it persists across re-renders
  const workerRef = useRef<Worker | null>(null);

  // Initialize the worker and set up listeners only once
  useEffect(() => {
    if (!workerRef.current) {
      setPipelineStatus("initializing");
      const worker = new Worker(
        new URL("../workers/moondream.ts", import.meta.url),
        { type: "module" },
      );
      workerRef.current = worker;

      worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
        const { status, output, error: workerError } = event.data;
        switch (status) {
          case "initializing":
            setPipelineStatus("initializing");
            break;
          case "ready":
            setPipelineStatus("ready");
            break;
          case "complete":
            setResponse(output ?? null);
            setPipelineStatus("ready"); // Ready for the next query
            break;
          case "error":
            setError(workerError ?? "An unknown worker error occurred");
            setPipelineStatus("error");
            break;
        }
      };

      worker.onerror = (err: ErrorEvent) => {
        console.error("Unhandled Worker error:", err);
        setError(err.message);
        setPipelineStatus("error");
      };
    }

    // Cleanup: terminate the worker when the provider unmounts
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once

  // Memoize the query function to prevent unnecessary re-renders
  const query = useCallback(
    (data: WorkerEventData) => {
      if (workerRef.current && pipelineStatus === "ready") {
        setPipelineStatus("working");
        setResponse(null); // Clear previous response
        setError(null); // Clear previous error
        workerRef.current.postMessage(data);
      } else {
        console.warn("Worker not ready or already working.");
      }
    },
    [pipelineStatus],
  );

  const value = { pipelineStatus, response, error, query };

  return (
    <MoondreamContext.Provider value={value}>
      {children}
    </MoondreamContext.Provider>
  );
}