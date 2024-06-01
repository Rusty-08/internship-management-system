'use client'

import { Button } from '@/components/ui/button'
import { authenticate } from '../_actions/authenticate'
import { CardWrapper } from '@/components/auth/login/card-wrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ErrorCard from '@/components/auth/login/error-card'
import { LoadingSpinner } from '@/components/@core/loading'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/components/auth/login/login-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { RiLockPasswordFill } from 'react-icons/ri'
import { FaCircleUser } from 'react-icons/fa6'
import { MdOutlineArrowRight } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const LoginForm = () => {
  const [serverError, setServerError] = useState<any>(undefined)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values
    const res = await authenticate({ email, password })
    if (res) {
      setServerError(res)
    }
  }

  const { errors, isSubmitting } = form.formState

  const email = form.watch('email')
  const password = form.watch('password')

  useEffect(() => {
    if (serverError) {
      setServerError(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])

  return (
    <CardWrapper
      headerLabel="Sign in to IMS"
      subHeaderLabel="Welcome back! Please sign in to continue"
      backButtonLabel="Go back"
      backButtonHref="/"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <div className="space-y-4 mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type="email"
                      placeholder="sample@gmail.com"
                      // icon={FaCircleUser}
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage>{errors.email.message}</FormMessage>
                  )}
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
                      disabled={isSubmitting}
                      type="password"
                      placeholder="Password"
                      // icon={RiLockPasswordFill}
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {serverError && <ErrorCard>{serverError}</ErrorCard>}
          </div>
          <Button
            disabled={isSubmitting}
            className={cn('w-full relative gap-1', serverError && 'mt-3')}
          >
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <>
                Login
                <MdOutlineArrowRight size="1.2rem" className="absolute ml-16" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
