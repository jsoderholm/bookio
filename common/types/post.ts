import type { z } from "zod"
import {
  insertPostSchema,
  type selectPostSchema,
} from "../../server/db/schema/posts"

export const createPostSchema = insertPostSchema.omit({
  id: true,
  authorId: true,
})

export type Post = z.infer<typeof selectPostSchema>
export type CreatePost = z.infer<typeof createPostSchema>
