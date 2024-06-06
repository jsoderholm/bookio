import { zValidator } from "@hono/zod-validator"
import { and, desc, eq } from "drizzle-orm"
import { Hono } from "hono"
import { createGroupSchema } from "../../common/types/group"
import { db } from "../db"
import { insertGroupSchema } from "../db/schema/groups"
import { groups as groupTable } from "../db/schema/groups"
import { getUser } from "../kinde"

export const groupRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user
    const groups = await db
      .select()
      .from(groupTable)
      .where(eq(groupTable.createdBy, user.id))
      .orderBy(desc(groupTable.createdAt))

    return c.json({ groups })
  })
  .post("/", getUser, zValidator("json", createGroupSchema), async (c) => {
    const group = c.req.valid("json")
    const user = c.var.user

    const validatedGroup = insertGroupSchema.parse({
      ...group,
      createdBy: user.id,
    })

    const result = await db
      .insert(groupTable)
      .values(validatedGroup)
      .returning()
      .then((res) => res[0])

    c.status(201)
    return c.json(result)
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const group = await db
      .select()
      .from(groupTable)
      .where(and(eq(groupTable.createdBy, user.id), eq(groupTable.id, id)))
      .then((res) => res[0])

    if (!group) {
      return c.notFound()
    }

    return c.json({ group })
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const group = await db
      .delete(groupTable)
      .where(and(eq(groupTable.createdBy, user.id), eq(groupTable.id, id)))
      .returning()
      .then((res) => res[0])

    if (!group) {
      return c.notFound()
    }
    return c.json({ group })
  })
