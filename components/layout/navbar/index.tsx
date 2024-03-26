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
      style={{ width: 'calc(100% - 22rem)' }}
      className="fixed rounded-full bg-background flex items-center justify-between px-6 h-20 top-4 left-80 ml-4 border"
    >
      <p className="text-text font-thin">
        Welcome back!{' '}
        <span className="text-secondary-foreground font-semibold">{name}</span>
      </p>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {role ? <Profile user={name} role={role} /> : <LoginButton />}
      </div>
    </div>
  )
}

export default Navbar
