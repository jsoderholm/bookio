import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Schema for inserting a user - can be used to validate API requests
const insertUserSchema = createInsertSchema(users)
// Schema for selecting a user - can be used to validate API responses
const selectUserSchema = createSelectSchema(users)

export { insertUserSchema, selectUserSchema }
