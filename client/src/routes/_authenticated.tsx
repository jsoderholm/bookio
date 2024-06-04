import Unauthorized from "@/components/unauthorized"
import { userQueryOptions } from "@/lib/api/user"
import { Outlet, createFileRoute } from "@tanstack/react-router"

function Component() {
  const { user } = Route.useRouteContext()

  if (!user) {
    return <Unauthorized />
  }

  return <Outlet />
}

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient

    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (_e) {
      return { user: null }
    }
  },
  component: Component,
})
