import {
  GrantType,
  type SessionManager,
  type UserType,
  createKindeServerClient,
} from "@kinde-oss/kinde-typescript-sdk"
import type { Context } from "hono"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  },
)

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key)
    return result
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions)
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions)
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key)
  },
  async destroySession() {
    const cookies = ["id_token", "access_token", "user", "refresh_token"]
    cookies.forEach((key) => {
      deleteCookie(c, key)
    })
  },
})

type Env = {
  Variables: {
    user: UserType
  }
}

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const sm = sessionManager(c)
    const isAuthenticated = await kindeClient.isAuthenticated(sm)

    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401)
    }
    const user = await kindeClient.getUserProfile(sm)
    c.set("user", user)

    await next()
  } catch (e) {
    return c.json({ error: "Unauthorized" }, 401)
  }
})
