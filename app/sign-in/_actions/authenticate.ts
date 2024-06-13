'use server'

import { signIn, signOut } from '@/auth'
import { LoginSchema } from '@/components/auth/login/login-schema'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function authenticate(values: z.infer<typeof LoginSchema>) {
  const { email, password } = values

  try {
    await signIn('credentials', { email, password })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'An error occurred. Please try again.'
      }
    }
    throw error
  }
}

export const logout = async () => {
  await signOut({ redirectTo: '/sign-in' })
}
