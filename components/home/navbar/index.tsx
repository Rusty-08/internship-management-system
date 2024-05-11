import Link from 'next/link'
import Image from 'next/image'
import imsLogo from '@/public/home/ims-logo.svg'

import LoginButton from '@/components/auth/login/login-button'
import { ThemeToggle } from '@/components/providers/theme/theme-toggle'
import NavLinks from './links'

const HomeNavbar = async () => {
  return (
    <div className="h-24 w-full flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image width={40} height={40} alt="ims logo" src={imsLogo} />
        <h1 className="font-bold text-3xl tracking-wide bg-gradient-to-r from-primary to-fuchsia-900 bg-clip-text text-transparent">
          IMS
        </h1>
      </Link>
      <NavLinks />
      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <LoginButton />
      </div>
    </div>
  )
}

export default HomeNavbar
