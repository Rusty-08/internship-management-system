'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
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
  const session = useSession()

  const handleClick = () => {
    if (mode === 'modal') {
      // open modal
      return
    } else {
      if (session.status === 'authenticated') {
        signOut()
        return
      }
      router.push('/auth/login')
    }
  }

  return (
    <Button onClick={handleClick} {...props}>
      {session.status === 'authenticated' ? 'Sign Out' : 'Sign in'}
    </Button>
  )
}
export default LoginButton
