'use client'

import { authenticate } from '@/app/sign-in/_actions/authenticate'
import { LoadingSpinner } from '@/components/@core/loading'
import { CardWrapper } from '@/components/auth/login/card-wrapper'
import ErrorCard from '@/components/auth/login/error-card'
import { LoginSchema } from '@/components/auth/login/login-schema'
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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineArrowRight } from 'react-icons/md'
import { z } from 'zod'

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
    let res = await authenticate({ email, password })
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
    <div className="flex h-full w-full items-center justify-center bg-muted bg-gradient-to-r from-primary/20 to-fuchsia-900/20 backdrop-blur-sm">
      <CardWrapper
        headerLabel="Sign In"
        subHeaderLabel="Welcome back! Please sign in to continue"
        backButtonHref="https://www.ondemand-innovation.com/"
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
              className='w-full relative gap-1'
            >
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  Login
                  <MdOutlineArrowRight
                    size="1.2rem"
                    className="absolute ml-16"
                  />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  )
}

export default LoginForm
