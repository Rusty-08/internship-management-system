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

const LoginForm = () => {
  const { pending } = useFormStatus()
  const [errorMessage, authenticateLogin] = useFormState(
    authenticate,
    undefined,
  )

  return (
    <form action={authenticateLogin} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <div aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <div className="mb-4 flex gap-2 rounded-md bg-red-50 p-4">
              <CustomIcon
                icon="heroicons:exclamation-circle"
                className="h-5 w-5 text-red-500"
              />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </div>
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <CustomIcon
                icon="heroicons:at-symbol"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <CustomIcon
                icon="heroicons:key"
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
              />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full" aria-disabled={pending}>
          Log in{' '}
          <CustomIcon
            icon="heroicons:arrow-right"
            className="ml-auto h-5 w-5 text-gray-50"
          />
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
