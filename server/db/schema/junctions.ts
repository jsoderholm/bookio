import { relations } from "drizzle-orm"
import { integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core"
import { groups } from "./groups"
import { users } from "./users"

export const usersOnGroups = pgTable(
  "users_on_groups",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    groupId: integer("group_id")
      .notNull()
      .references(() => groups.id),
  },
  (t) => ({
    // Create a composite primary key for the table
    pk: primaryKey({ columns: [t.userId, t.groupId] }),
  }),
)

export const usersOnGroupsRelations = relations(usersOnGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersOnGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersOnGroups.userId],
    references: [users.id],
  }),
}))
