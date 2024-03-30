import Link from 'next/link'
import Image from 'next/image'

import LoginButton from '@/components/auth/login-button'

import { Profile } from './profile'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Session } from 'next-auth'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'

const HomeNavbar = async () => {
  const session = await getServerSession(authOptions)
  const { role, name } = (session?.user as Session['user']) || {}

  return (
    <div className="h-20 w-full flex items-center justify-between px-4 md:px-[8%]">
      <Link href="/" className="flex items-center gap-2">
        <Image width={40} height={40} alt="ims logo" src="/home/ims-logo.svg" />
        <h1 className="font-bold text-xl">LOGO</h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        {role ? <Profile user={name} role={role} /> : <LoginButton />}
      </div>
    </div>
  )
}

export default HomeNavbar
