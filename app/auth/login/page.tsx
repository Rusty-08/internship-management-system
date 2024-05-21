'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { authenticate } from '../_actions/authenticate'
import { CardWrapper } from '@/components/auth/login/card-wrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ErrorCard from '@/components/auth/login/error-card'
import { LoadingSpinner } from '@/components/@core/loading'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/components/auth/login/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaCircleUser } from 'react-icons/fa6'

const LoginForm = () => {
  const {
    data: errorMessage,
    mutate: authenticateLogin,
    isPending,
  } = useMutation({
    mutationFn: async (formData: FormData) => await authenticate(formData),
  })

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <CardWrapper
      headerLabel="Internship Portal"
      subHeaderLabel="Enter your credentials to access your account"
      backButtonLabel="Go back to home page?"
      backButtonHref="/"
    >
      <Form {...form}>
        <form action={authenticateLogin}>
          <div className="space-y-4 mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      placeholder="sample@gmail.com"
                      icon={FaCircleUser}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="password"
                      placeholder="Password"
                      icon={RiLockPasswordFill}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {errorMessage && <ErrorCard>{errorMessage}</ErrorCard>}
          </div>
          <LoginButton />
        </form>
      </Form>
    </CardWrapper>
  )
}

export const LoginButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} className="w-full">
      {pending ? <LoadingSpinner /> : 'Login'}
    </Button>
  )
}

export default LoginForm
