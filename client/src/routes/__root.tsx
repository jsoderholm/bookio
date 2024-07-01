import AppShell from "@/components/app-shell/app-shell"
import { Toaster } from "@/components/ui/sonner"
import type { QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

interface RouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <AppShell>
      <Outlet />
      {import.meta.env.MODE === "development" && (
        <>
          <ReactQueryDevtools position="right" />
          <TanStackRouterDevtools position="bottom-left" />
        </>
      )}
      <Toaster />
    </AppShell>
  ),
})
