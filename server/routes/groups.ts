import { zValidator } from "@hono/zod-validator"
import { and, eq } from "drizzle-orm"
import { Hono } from "hono"
import { createGroupSchema } from "../../common/types/group"
import { db } from "../db"
import { insertGroupSchema } from "../db/schema/groups"
import { groups as groupTable } from "../db/schema/groups"
import { usersOnGroups } from "../db/schema/junctions"
import { getUser } from "../kinde"

export const groupRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user

    const groups = await db.query.usersOnGroups
      .findMany({
        where: (usersOnGroups, { eq }) => eq(usersOnGroups.userId, user.id),
        with: {
          group: {
            columns: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      })
      .then((res) => res.map((group) => group.group))

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

    await db.insert(usersOnGroups).values({
      userId: user.id,
      groupId: result.id,
    })

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
