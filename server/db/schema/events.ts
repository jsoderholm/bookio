import { relations } from "drizzle-orm"
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { eventsOnGroups } from "./junctions"
import { users } from "./users"

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 250 }),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: varchar("location", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
})

export const eventRelations = relations(events, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [events.createdBy],
    references: [users.id],
  }),
  groups: many(eventsOnGroups),
}))

// Schema for inserting an event - can be used to validate API requests
const insertEventSchema = createInsertSchema(events)
// Schema for selecting an event - can be used to validate API responses
const selectEventSchema = createSelectSchema(events)

export { insertEventSchema, selectEventSchema }
