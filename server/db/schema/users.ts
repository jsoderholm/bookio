import { relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { comments } from "./comments"
import { events } from "./events"
import { groups } from "./groups"
import { usersOnGroups } from "./junctions"
import { posts } from "./posts"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const userRelations = relations(users, ({ many }) => ({
  createdEvents: many(events),
  createdGroups: many(groups),
  groups: many(usersOnGroups),
  posts: many(posts),
  comments: many(comments),
}))

// Schema for inserting a user - can be used to validate API requests
const insertUserSchema = createInsertSchema(users)
// Schema for selecting a user - can be used to validate API responses
const selectUserSchema = createSelectSchema(users)

export { insertUserSchema, selectUserSchema }
