import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/")({
  component: () => <h1 className="text-3xl ">Bookio</h1>,
})
