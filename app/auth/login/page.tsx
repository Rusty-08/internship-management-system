// 'use client'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'

// import {
//   Form,
//   FormField,
//   FormControl,
//   FormLabel,
//   FormItem,
//   FormMessage,
// } from '@/components/ui/form'

// import { zodResolver } from '@hookform/resolvers/zod'

// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { LoginSchema } from '@/components/auth/login/login-schema'
// import { CardWrapper } from '@/components/auth/login/card-wrapper'
// import ErrorCard from '@/components/auth/login/error-card'
// import { getUserByEmail } from '@/utils/users'
// import { LoadingSpinner } from '@/components/@core/loading'
// import LoginForm from '../_components/login-form'

// const Login = () => {
// const router = useRouter()
// const [isValidUser, setIsValidUser] = useState(true)
// const form = useForm<z.infer<typeof LoginSchema>>({
//   resolver: zodResolver(LoginSchema),
//   defaultValues: {
//     email: '',
//     password: '',
//   },
// })

// const { errors, isSubmitting } = form.formState

// const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
//   const { email, password } = values
//   const user = await getUserByEmail(email)

//   try {
//     await signIn('credentials', {
//       email,
//       password,
//       redirect: false,
//     })

//     if (user?.isArchived) {
//       setIsValidUser(false)
//     } else {
//       router.push(`/${user?.role?.toLowerCase()}`)
//     }
//   } catch (error) {
//     setIsValidUser(false)
//   }
// }

// return (
//   <CardWrapper
//     headerLabel="Welcome To Internship Portal"
//     subHeaderLabel="Enter your credentials to access your account"
//     backButtonLabel="Don't have an account?"
//     backButtonHref="/"
//   >
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* <form action={authenticateLogin} className="space-y-6"> */}
//         <div className="space-y-4">
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="email"
//                     disabled={isSubmitting}
//                     placeholder="sample@gmail.com"
//                     icon="heroicons:user"
//                   />
//                 </FormControl>
//                 {errors.email && (
//                   <FormMessage>{errors.email.message}</FormMessage>
//                 )}
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     type="password"
//                     disabled={isSubmitting}
//                     placeholder="Password"
//                     icon="heroicons:lock-closed"
//                   />
//                 </FormControl>
//                 {errors.password && (
//                   <FormMessage>{errors.password.message}</FormMessage>
//                 )}
//               </FormItem>
//             )}
//           />
//           {!isValidUser && <ErrorCard>Invalid email or password</ErrorCard>}
//         </div>
//         <Button area-disabled={isSubmitting} className="w-full">
//           {isSubmitting ? <LoadingSpinner /> : 'Login'}
//         </Button>
//       </form>
//     </Form>
//   </CardWrapper>
// )
// }

// export default Login

'use client'

import { CustomIcon } from '@/components/@core/iconify'
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
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

const LoginForm = () => {
  const [errorMessage, authenticateLogin] = useFormState(
    authenticate,
    undefined,
  )
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
          <div className="space-y-4 mb-8">
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
