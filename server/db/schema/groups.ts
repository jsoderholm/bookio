import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description", { length: 300 }),
  createdAt: timestamp("created_at").defaultNow(),
})

// Schema for inserting a group - can be used to validate API requests
const insertGroupSchema = createInsertSchema(groups)
// Schema for selecting a group - can be used to validate API responses
const selectGroupSchema = createSelectSchema(groups)

export { insertGroupSchema, selectGroupSchema }
