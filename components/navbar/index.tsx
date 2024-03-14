'use client'
import Link from 'next/link'

import LoginButton from '@/components/auth/login-button'

import { Profile } from './profile'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const { status, data: session } = useSession()

  return (
    <div className="h-20 w-screen flex items-center justify-between px-[10%]">
      <Link href="/">logo</Link>
      {status === 'authenticated' ? (
        <Profile user={session?.user?.name} />
      ) : (
        <LoginButton />
      )}
    </div>
  )
}

export default Navbar
