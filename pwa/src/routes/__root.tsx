import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/header.tsx'
import PWAToast from '../components/toasts/pwa.tsx'
import OfflineAlert from '../components/alerts/offline.tsx'
import { useEffect } from 'react'
import { useChat } from '../hooks/chat.ts'
import { useMoondream } from '../hooks/moondream.ts'
import CacheFixAlert from '../components/alerts/cacheFix.tsx'

function Root() {
  const { addMessage, setIsLoading } = useChat();
  const { response, pipelineStatus } = useMoondream();

  // Sync loading state between Moondream and Chat contexts
  useEffect(() => {
    setIsLoading(pipelineStatus === "working");
  }, [pipelineStatus, setIsLoading]);

  // Add AI response to chat when it becomes available
  useEffect(() => {
    if (response) {
      addMessage({
        role: "system",
        content: [{ type: "text", text: response }],
        timestamp: new Date(),
      });
    }
  }, [response, addMessage]);

  return (
    <>
      <Header />
      <PWAToast />
      <OfflineAlert />
      <CacheFixAlert />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: () => Root(),
  notFoundComponent: () => (
    <div className="p-4 text-red-500">
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 underline">
        Go back to home
      </Link>
    </div>
  )
})