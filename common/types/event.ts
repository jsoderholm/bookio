import { z } from "zod"
import { insertEventSchema } from "../../server/db/schema/events"

export const createEventSchema = insertEventSchema
  .omit({
    id: true,
    startDate: true,
    endDate: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
  })
  .extend({
    dateRange: z.object({
      from: insertEventSchema.shape.startDate,
      to: insertEventSchema.shape.endDate,
    }),
  })

export type CreateEvent = z.infer<typeof createEventSchema>
