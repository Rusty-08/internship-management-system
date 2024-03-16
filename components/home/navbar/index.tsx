'use client'
import Link from 'next/link'

import LoginButton from '@/components/auth/login-button'

import { Profile } from './profile'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from '../../providers/theme/theme-toggle'
import { Skeleton } from '@/components/ui/skeleton'

const Navbar = () => {
  const { status, data: session } = useSession()

  return (
    <div className="h-20 w-full flex items-center justify-between px-4 md:px-[10%]">
      <Link href="/">logo</Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {status === 'authenticated' ? (
          <Profile 
            user={session?.user?.name}
            role={session?.user?.role} />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  )
}

export default Navbar
