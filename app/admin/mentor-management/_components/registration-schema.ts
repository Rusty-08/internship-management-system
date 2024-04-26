import { z } from 'zod'

export const RegistrationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is not valid',
  }),
  expertise: z.string().optional(),
})
