import { relations } from "drizzle-orm"
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { eventsOnGroups, usersOnGroups } from "./junctions"
import { posts } from "./posts"
import { users } from "./users"

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description", { length: 300 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
})

export const groupRelations = relations(groups, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
  }),
  events: many(eventsOnGroups),
  members: many(usersOnGroups),
  posts: many(posts),
}))

// Schema for inserting a group - can be used to validate API requests
const insertGroupSchema = createInsertSchema(groups, {
  name: z
    .string()
    .trim()
    .min(1, { message: "This field may not be left blank" })
    .max(50, { message: "Name must be less than 50 characters" }),
})
// Schema for selecting a group - can be used to validate API responses
const selectGroupSchema = createSelectSchema(groups)

export { insertGroupSchema, selectGroupSchema }
