import type { z } from "zod"
import { insertPostSchema } from "../../server/db/schema/posts"

export const createPostSchema = insertPostSchema.omit({
  id: true,
  authorId: true,
})

export type CreatePost = z.infer<typeof createPostSchema>
