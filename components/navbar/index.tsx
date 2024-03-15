'use client'
import Link from 'next/link'

import LoginButton from '@/components/auth/login-button'

import { Profile } from './profile'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from '../theme/theme-toggle'
import { Skeleton } from '@/components/ui/skeleton'

const Navbar = () => {
  const { status, data: session } = useSession()

  return (
    <div className="h-20 w-screen flex items-center justify-between px-[10%]">
      <Link href="/">logo</Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {status === 'authenticated' ? (
          <Profile user={session?.user?.name} />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  )
}

export default Navbar
