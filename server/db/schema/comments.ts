import { relations } from "drizzle-orm"
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { posts } from "./posts"
import { users } from "./users"

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 150 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
})

export const commentRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}))

// Schema for inserting a comment - can be used to validate API requests
const insertCommentSchema = createInsertSchema(comments)
// Schema for selecting a comment - can be used to validate API responses
const selectCommentSchema = createSelectSchema(comments)

export { insertCommentSchema, selectCommentSchema }
