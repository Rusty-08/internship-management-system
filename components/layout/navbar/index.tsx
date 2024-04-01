import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import LoginButton from '@/components/auth/login-button'
import { Profile } from '@/components/home/navbar/profile'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  const { role, name } = (session?.user as Session['user']) || {}

  return (
    <div
      style={{ width: 'calc(100% - 20rem)' }}
      className="fixed z-50 bg-background flex items-center justify-center p-4 h-28 top-0 left-80"
    >
      <div className="rounded-full flex items-center justify-between px-6 w-full h-full border">
        <p className="text-text font-thin">
          Welcome back!{' '}
          <span className="text-secondary-foreground font-semibold">
            {name}
          </span>
        </p>
        <div className="flex items-center gap-x-4">
          <ThemeToggle />
          {role ? <Profile user={name} role={role} /> : <LoginButton />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
