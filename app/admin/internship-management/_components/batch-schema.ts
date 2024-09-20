import { z } from "zod"

export const BatchBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  startDate: z.date(),
  endDate: z.date(),
})

export const BatchEditSchema = BatchBaseSchema.extend({

})