'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useRouter } from 'next/navigation'
import { CardWrapper } from '@/components/auth/login/card-wrapper'
import { PasswordSchema } from '@/components/auth/change-password/password-schema'
import { LoadingSpinner } from '@/components/@core/loading'
import { signOut } from '@/auth'

const ChangePassword = () => {
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

      router.push('/auth/login')
    } catch (error) {
      console.error(error)
    }
  }

  const backToLogin = async () => {
    await signOut()
    router.push('/auth/login')
  }

  return (
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
                    // icon="heroicons:lock-closed"
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
  )
}

export default ChangePassword
