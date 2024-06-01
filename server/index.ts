import app from "./app"

const server = Bun.serve({
  fetch: app.fetch,
})

console.info("server running on port", server.port)
