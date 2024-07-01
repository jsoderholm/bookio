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
import { groups } from "./groups"
import { users } from "./users"

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30 }).notNull(),
  description: varchar("description", { length: 250 }),
  startDate: timestamp("start_date", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
  endDate: timestamp("end_date", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
  location: varchar("location", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),
  groupId: integer("group_id").references(() => groups.id),
})

export const eventRelations = relations(events, ({ one }) => ({
  createdBy: one(users, {
    fields: [events.createdBy],
    references: [users.id],
  }),
  groupId: one(groups, {
    fields: [events.groupId],
    references: [groups.id],
  }),
}))

// Schema for inserting an event - can be used to validate API requests
const insertEventSchema = createInsertSchema(events, {
  name: z
    .string()
    .trim()
    .min(1, { message: "This field may not be left blank" })
    .max(30, { message: "Name must be less than 30 characters" }),
  description: z
    .string()
    .max(250, { message: "Description must be less than 250 characters" })
    .optional(),
  startDate: z
    .string()
    .datetime({ message: "Start date must be a valid date" }),
  endDate: z.string().datetime({ message: "End date must be a valid date" }),
  location: z
    .string()
    .max(100, { message: "Location must be less than 100 characters" })
    .optional(),
})
// Schema for selecting an event - can be used to validate API responses
const selectEventSchema = createSelectSchema(events, {
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export { insertEventSchema, selectEventSchema }
