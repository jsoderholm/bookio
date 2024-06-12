import { zValidator } from "@hono/zod-validator"
import { and, desc, eq } from "drizzle-orm"
import { Hono } from "hono"
import { createPostSchema } from "../../common/types/post"
import { db } from "../db"
import { insertPostSchema, posts as postTable } from "../db/schema/posts"
import { getUser } from "../kinde"

export const postRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user
    const posts = await db
      .select()
      .from(postTable)
      .where(eq(postTable.authorId, user.id))
      .orderBy(desc(postTable.createdAt))

    return c.json({ posts })
  })
  .post("/", getUser, zValidator("json", createPostSchema), async (c) => {
    const post = c.req.valid("json")
    const user = c.var.user

    const validatedPost = insertPostSchema.parse({
      ...post,
      groupId: Number.parseInt(post.groupId),
      authorId: user.id,
    })

    const result = await db
      .insert(postTable)
      .values(validatedPost)
      .returning()
      .then((res) => res[0])

    c.status(201)
    return c.json(result)
  })
  .get("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const post = await db
      .select()
      .from(postTable)
      .where(and(eq(postTable.authorId, user.id), eq(postTable.id, id)))
      .then((res) => res[0])

    if (!post) {
      return c.notFound()
    }

    return c.json({ post })
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const post = await db
      .delete(postTable)
      .where(and(eq(postTable.authorId, user.id), eq(postTable.id, id)))
      .returning()
      .then((res) => res[0])

    if (!post) {
      return c.notFound()
    }
    return c.json({ post })
  })
