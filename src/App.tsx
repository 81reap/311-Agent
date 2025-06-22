import reactLogo from "./assets/react.svg";
import appLogo from "/logo.svg";
import PWABadge from "./PWABadge.tsx";
import { useMoondream } from "./hooks/moondream.ts";
import { Header } from "./components/header.tsx";
import OfflineAlert from "./components/alerts/offline.tsx";

function App() {
  const { query, response, pipelineStatus, error } = useMoondream();

  const handleQuery = () => {
    query({
      imageUrl:
        "https://huggingface.co/vikhyatk/moondream1/resolve/main/assets/demo-1.jpg",
      prompt: "Describe this image.",
    });
  };

  const getStatusMessage = () => {
    switch (pipelineStatus) {
      case "idle":
        return "Pipeline is idle.";
      case "initializing":
        return "Initializing AI Pipeline... This may take a moment.";
      case "ready":
        return "Pipeline is ready. Click the button to ask a question.";
      case "working":
        return "Thinking...";
      case "error":
        return `Error: ${error}`;
      default:
        return "No response yet.";
    }
  };

  return (
    <>
      <div >
        <Header />
        <OfflineAlert />
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} className="logo" alt="311 Agent logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>311 Agent</h1>
      <div className="card">
        <button onClick={handleQuery} disabled={pipelineStatus !== "ready"}>
          Ask Moondream
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h3>Pipeline Status:</h3>
        <p>{getStatusMessage()}</p>
        {response && (
          <>
            <h3>Response:</h3>
            <p>{response}</p>
          </>
        )}
      </div>
      <PWABadge />
    </>
  );
}

export default App;