import { RegistrationSchema } from "@/components/@core/ui/table/account-table/registration-schema"
import { InternCourse } from "@prisma/client"
import { z } from "zod"

export const BatchBaseSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  startDate: z.date(),
  endDate: z.date(),
})

export const InternUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is not valid',
  }),
  mentorId: z.string().nullish().optional(),
  course: z.nativeEnum(InternCourse).nullish().optional(),
  totalHours: z.number().nullish().optional(),
})

export const BatchWithUsers = BatchBaseSchema.extend({
  interns: z.array(InternUserSchema).optional()
})

export const internProps: z.infer<typeof InternUserSchema> = {
  name: '',
  email: '',
  mentorId: undefined,
  course: null,
  totalHours: undefined,
}