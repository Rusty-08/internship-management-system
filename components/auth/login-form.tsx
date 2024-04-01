'use client'
import { LoadingSpinner } from '@/components/@core/spinner/circular'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoginSchema } from './login-schema'

import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ErrorCard from './error-card'

const LoginForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [isValidUser, setIsValidUser] = useState(true)

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const { email, password } = values

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.ok) {
        router.push('/')
      } else {
        setIsValidUser(false)
      }
    } catch (error) {
      setIsValidUser(false)
    }
  }

  return (
    <CardWrapper
      headerLabel="Welcome To Internship Portal"
      subHeaderLabel="Enter your credentials to access your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="sample@gmail.com"
                      icon="heroicons:user"
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
                      type="password"
                      placeholder="Password"
                      icon="heroicons:lock-closed"
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {!isValidUser && <ErrorCard>Invalid email or password</ErrorCard>}
          </div>
          <Button disabled={isSubmitting} className="w-full text-base">
            {isSubmitting ? <LoadingSpinner /> : 'Login'}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
