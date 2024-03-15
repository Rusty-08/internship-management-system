'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type LoginButtonProps = {
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

const LoginButton = ({
  mode = 'redirect',
  asChild,
  ...props
}: LoginButtonProps) => {
  const router = useRouter()

  const handleClick = () => {
    if (mode === 'modal') {
      // open modal
      return
    } else {
      router.replace('/auth/login')
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      Sign In
    </Button>
  )
}
export default LoginButton
