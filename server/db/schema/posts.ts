import { relations } from "drizzle-orm"
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { comments } from "./comments"
import { users } from "./users"

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  text: varchar("text", { length: 300 }).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
})

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}))

// Schema for inserting a post - can be used to validate API requests
const insertPostSchema = createInsertSchema(posts)
// Schema for selecting a post - can be used to validate API responses
const selectPostSchema = createSelectSchema(posts)

export { insertPostSchema, selectPostSchema }
