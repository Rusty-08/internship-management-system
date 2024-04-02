import { z } from 'zod'

export const PasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .refine(
      password =>
        /[A-Z]/.test(password) && // at least one uppercase letter
        /[a-z]/.test(password) && // at least one lowercase letter
        /[0-9]/.test(password) && // at least one number
        /[^a-zA-Z0-9]/.test(password), // at least one special character
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    ),
})
