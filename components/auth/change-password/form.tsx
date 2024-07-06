'use client'

import { signOut } from '@/auth'
import { LoadingSpinner } from '@/components/@core/loading'
import { PasswordSchema } from '@/components/auth/change-password/password-schema'
import { CardWrapper } from '@/components/auth/login/card-wrapper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ChangePasswordForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
    const { password } = values

    try {
      await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      })

      router.push('/sign-in')
    } catch (error) {
      console.error(error)
    }
  }

  const backToLogin = async () => {
    await signOut()
    router.push('/sign-in')
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      <CardWrapper
        headerLabel="Change Password"
        subHeaderLabel="Enter your new password to continue."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Password"
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? <LoadingSpinner /> : 'Change Password'}
            </Button>
            <div className="w-full flex justify-center">
              <Button
                type="button"
                variant="link"
                className="text-muted-foreground"
                onClick={backToLogin}
              >
                Back to Login?
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default ChangePasswordForm
