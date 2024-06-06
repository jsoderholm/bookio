import { Hono } from "hono"
import { serveStatic } from "hono/bun"
import { logger } from "hono/logger"
import { authRoute } from "./routes/auth"
import { eventRoute } from "./routes/events"
import { groupRoute } from "./routes/groups"
import { postRoute } from "./routes/posts"

const app = new Hono()

app.use("*", logger())

const apiRoutes = app
  .basePath("/api")
  .route("/events", eventRoute)
  .route("/", authRoute)
  .route("/posts", postRoute)
  .route("/groups", groupRoute)

app.get("*", serveStatic({ root: "./client/dist" }))
app.get("*", serveStatic({ path: "./client/dist/index.html" }))

export default app

export type ApiRoutes = typeof apiRoutes
