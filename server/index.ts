import app from "./app"

const server = Bun.serve({
  fetch: app.fetch,
})

console.log("server running on port", server.port)
