import { z } from 'zod'

export const RegistrationSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Email is not valid',
  }),
})
