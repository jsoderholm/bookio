import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/groups")({
  component: () => <div>Hello /_authenticated/groups!</div>,
})
