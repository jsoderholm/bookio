import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
})
