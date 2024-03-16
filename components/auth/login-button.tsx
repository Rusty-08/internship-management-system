'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type LoginButtonProps = {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton = ({ mode = 'redirect', ...props }: LoginButtonProps) => {
  const router = useRouter()

  return (
    <Link href="/auth/login">
      <Button {...props}>Sign In</Button>
    </Link>
  )
}
export default LoginButton
