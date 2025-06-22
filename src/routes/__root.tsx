import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../components/header.tsx'
import PWAToast from '../components/toasts/pwa.tsx'
import OfflineAlert from '../components/alerts/offline.tsx'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <PWAToast />
      <OfflineAlert />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
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