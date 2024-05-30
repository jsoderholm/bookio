import type { ApiRoutes } from "@server/app"
import { hc } from "hono/client"

const client = hc<ApiRoutes>("/api")

export const api = client.api
