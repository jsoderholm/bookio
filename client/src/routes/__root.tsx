import AppShell from "@/components/app-shell/app-shell"
import { Toaster } from "@/components/ui/sonner"
import type { QueryClient } from "@tanstack/react-query"
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
        <TanStackRouterDevtools position="bottom-right" />
      )}
      <Toaster />
    </AppShell>
  ),
})
