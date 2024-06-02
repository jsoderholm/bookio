import { relations } from "drizzle-orm"
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
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
const insertEventSchema = createInsertSchema(events, {
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character" })
    .max(30, { message: "Name must be less than 30 characters" }),
  description: z
    .string()
    .max(250, { message: "Description must be less than 250 characters" }),
  // startDate: z.date({ message: "Start date must be a valid date" }),
  // endDate: z.date({ message: "End date must be a valid date" }),
  location: z
    .string()
    .max(100, { message: "Location must be less than 100 characters" })
    .optional(),
})
// Schema for selecting an event - can be used to validate API responses
const selectEventSchema = createSelectSchema(events)

export { insertEventSchema, selectEventSchema }
