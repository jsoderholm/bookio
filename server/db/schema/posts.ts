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
import { z } from "zod"
import { comments } from "./comments"
import { groups } from "./groups"
import { users } from "./users"

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  text: varchar("text", { length: 300 }).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  groupId: integer("group_id")
    .notNull()
    .references(() => groups.id),
})

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  post: one(groups, {
    fields: [posts.groupId],
    references: [groups.id],
  }),
}))

// Schema for inserting a post - can be used to validate API requests
const insertPostSchema = createInsertSchema(posts, {
  text: z
    .string()
    .trim()
    .min(1, { message: "This field may not be left blank" })
    .max(300, { message: "Text must be less than 300 characters" }),
  groupId: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "This field must not be left blank",
  }),
})
// Schema for selecting a post - can be used to validate API responses
const selectPostSchema = createSelectSchema(posts, {
  createdAt: z.string(),
})

export { insertPostSchema, selectPostSchema }
