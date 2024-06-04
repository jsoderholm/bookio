import { eq } from "drizzle-orm"
import { Hono } from "hono"
import { db } from "../db"
import { users } from "../db/schema/users"
import { getUser, kindeClient, sessionManager } from "../kinde"

export const authRoute = new Hono()
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c))
    return c.redirect(loginUrl.toString())
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c))
    return c.redirect(registerUrl.toString())
  })
  .get("/callback", async (c) => {
    const url = new URL(c.req.url)
    await kindeClient.handleRedirectToApp(sessionManager(c), url)
    return c.redirect("/")
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c))
    return c.redirect(logoutUrl.toString())
  })
  .get("/me", getUser, async (c) => {
    const user = c.var.user

    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .then((res) => res[0])

    if (!dbUser) {
      await db.insert(users).values({
        id: user.id,
        firstName: user.given_name,
        lastName: user.family_name,
        email: user.email,
      })
    }

    return c.json({ user })
  })
