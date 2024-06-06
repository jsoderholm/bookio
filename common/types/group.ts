import type { z } from "zod"
import { insertGroupSchema } from "../../server/db/schema/groups"

export type Group = {
  id: number
  name: string
}

export const createGroupSchema = insertGroupSchema.omit({
  id: true,
})

export type CreateGroup = z.infer<typeof createGroupSchema>
