import type { z } from "zod"
import {
  insertGroupSchema,
  type selectGroupSchema,
} from "../../server/db/schema/groups"

export const createGroupSchema = insertGroupSchema.omit({
  id: true,
  createdBy: true,
})

export type Group = z.infer<typeof selectGroupSchema>
export type GroupMini = Pick<Group, "name" | "description" | "id">
export type CreateGroup = z.infer<typeof createGroupSchema>
