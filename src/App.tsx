import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/logo.svg'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { WorkerEventData } from './workers/moondream.query.ts'

function App() {
  const [count, setCount] = useState(0)
  const [response, setResponse] = useState("")

  const pipelineQuery = new Worker(new URL('./workers/moondream.query.ts', import.meta.url), { type: 'module' });
  pipelineQuery.onmessage = (event: MessageEvent) => {
    console.log('Worker response:', event.data);
    setResponse(event.data.output);
  }
  pipelineQuery.onerror = (error: ErrorEvent) => {
    console.error('Worker error:', error);
  };

  return (
    <>
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
        <button onClick={() => {
          setCount((count) => count + 1)
          pipelineQuery.postMessage({
            imageUrl: 'https://huggingface.co/vikhyatk/moondream1/resolve/main/assets/demo-1.jpg',
            prompt: 'Describe this image.',
          } as WorkerEventData);
        }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>
        {response ? `Response: ${response}` : 'No response yet.'}
      </p>
      <PWABadge />
    </>
  )
}

export default App
