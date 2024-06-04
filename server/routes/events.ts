import { zValidator } from "@hono/zod-validator"
import { and, eq } from "drizzle-orm"
import { Hono } from "hono"
import { createEventSchema } from "../../common/types/event"
import { db } from "../db"
import { events as eventTable, insertEventSchema } from "../db/schema/events"
import { getUser } from "../kinde"

export const eventRoute = new Hono()

  .get("/", getUser, async (c) => {
    const user = c.var.user

    const events = await db
      .select()
      .from(eventTable)
      .where(and(eq(eventTable.createdBy, user.id)))

    return c.json({ events })
  })
  .post("/", getUser, zValidator("json", createEventSchema), async (c) => {
    const event = c.req.valid("json")
    const user = c.var.user

    const validatedEvent = insertEventSchema.parse({
      ...event,
      startDate: event.dateRange.from,
      endDate: event.dateRange.to,
      createdBy: user.id,
    })

    const result = await db
      .insert(eventTable)
      .values(validatedEvent)
      .returning()
      .then((res) => res[0])

    c.status(201)
    return c.json(result)
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const event = await db
      .select()
      .from(eventTable)
      .where(and(eq(eventTable.createdBy, user.id), eq(eventTable.id, id)))
      .then((res) => res[0])

    if (!event) {
      return c.notFound()
    }
    return c.json({ event })
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const event = await db
      .delete(eventTable)
      .where(and(eq(eventTable.createdBy, user.id), eq(eventTable.id, id)))
      .returning()
      .then((res) => res[0])

    if (!event) {
      return c.notFound()
    }
    return c.json({ event })
  })
